<?php

namespace Tests\Unit;

use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class WaterNameUniquePerRegionTest extends TestCase
{
	public function test_water_names_are_unique_within_each_region(): void
	{
		$duplicates = DB::table('fishing_restrictions')
			->join('waters', 'fishing_restrictions.water_id', '=', 'waters.id')
			->whereNotNull('fishing_restrictions.water_id')
			->select('fishing_restrictions.region_id', 'waters.name')
			->selectRaw('COUNT(DISTINCT waters.id) as water_count')
			->groupBy('fishing_restrictions.region_id', 'waters.name')
			->having('water_count', '>', 1)
			->get();

		$this->assertTrue(
			$duplicates->isEmpty(),
			'Duplicate water names within a region: ' . $duplicates->toJson()
		);
	}
}
