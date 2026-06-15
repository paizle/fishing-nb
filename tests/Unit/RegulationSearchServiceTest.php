<?php

namespace Tests\Unit;

use App\Models\Fish;
use App\Services\RegulationSearchService;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class RegulationSearchServiceTest extends TestCase
{
	public function test_search_burbot_returns_species_locations_when_data_exists(): void
	{
		if (! Schema::hasTable('fish')) {
			$this->markTestSkipped('Fish table not available in test database.');
		}

		if (! Fish::query()->where('name', 'Burbot')->exists()) {
			$this->markTestSkipped('No Burbot fish in database.');
		}

		$service = app(RegulationSearchService::class);
		$results = $service->search('burbot', 'species');

		$this->assertNotEmpty($results);

		$first = $results[0];
		$this->assertSame('speciesLocation', $first['type']);
		$this->assertSame('burbot', $first['speciesSlug']);
		$this->assertSame('Burbot', $first['speciesName']);
		$this->assertNotEmpty($first['regionSlug']);
		$this->assertNotEmpty($first['regionName']);
		$this->assertNotEmpty($first['label']);
	}

	public function test_short_query_returns_empty_results(): void
	{
		$service = app(RegulationSearchService::class);

		$this->assertSame([], $service->search('a', 'all'));
	}
}
