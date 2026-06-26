<?php

namespace Tests\Unit\Restrictions;

use App\Restrictions\FormatRestrictionDetail;
use PHPUnit\Framework\TestCase;

class FormatRestrictionDetailTest extends TestCase
{
	public function test_empty_source_returns_empty_string(): void
	{
		$this->assertSame('', FormatRestrictionDetail::format([]));
	}

	public function test_tidal_only_appends_waters_suffix(): void
	{
		$this->assertSame(' Tidal waters', FormatRestrictionDetail::format(['tidal' => 'tidal']));
	}

	public function test_tidal_with_water_appends_portions_of(): void
	{
		$result = FormatRestrictionDetail::format(['tidal' => 'tidal', 'water' => 'Big River']);
		$this->assertSame(' Tidal portions of Big River', $result);
	}

	public function test_fishing_method_prepends_in(): void
	{
		$result = FormatRestrictionDetail::format(['fishingMethod' => 'Fly Fishing', 'water' => 'Big River']);
		$this->assertSame(' Fly Fishing in Big River', $result);
	}

	public function test_fishing_method_alone(): void
	{
		$result = FormatRestrictionDetail::format(['fishingMethod' => 'Angling']);
		$this->assertSame(' Angling', $result);
	}

	public function test_on_water_page_omits_water_and_category(): void
	{
		$result = FormatRestrictionDetail::format(
			['tidal' => 'tidal', 'water' => 'Big River', 'watersCategory' => 'rivers'],
			onWaterPage: true,
		);
		// On water page, water and watersCategory are suppressed
		$this->assertSame(' Tidal waters', $result);
	}

	public function test_boundary_with_waters_category(): void
	{
		$result = FormatRestrictionDetail::format([
			'boundary' => 'non-boundary waters',
			'watersCategory' => 'lakes, ponds and reservoirs',
		]);
		$this->assertSame(' Non-boundary waters of lakes, ponds and reservoirs', $result);
	}

	public function test_water_description_appended(): void
	{
		$result = FormatRestrictionDetail::format([
			'fishingMethod' => 'Fly Fishing',
			'waterDescription' => 'downstream of a line',
		]);
		$this->assertSame(' Fly Fishing downstream of a line', $result);
	}

	public function test_first_character_uppercased(): void
	{
		$result = FormatRestrictionDetail::format(['water' => 'small brook']);
		$this->assertStringStartsWith(' S', $result);
	}
}
