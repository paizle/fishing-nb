<?php

namespace Tests\Unit\Restrictions;

use App\Restrictions\ApplyExceptions;
use App\Restrictions\NormalizedRecord;
use Carbon\Carbon;
use PHPUnit\Framework\TestCase;

/**
 * Mirrors applyExceptions.test.ts test cases 1-to-1.
 * Date helper: d('2026-05-15') → Carbon at noon UTC, matching the TS test d() helper.
 */
class ApplyExceptionsTest extends TestCase
{
	// ── fixtures ─────────────────────────────────────────────────────────────

	private static function d(string $iso): Carbon
	{
		return Carbon::createFromFormat('Y-m-d', $iso, 'UTC')->setTime(12, 0, 0);
	}

	private static function record(array $overrides): NormalizedRecord
	{
		return new NormalizedRecord(
			id: $overrides['id'],
			fishId: array_key_exists('fishId', $overrides) ? $overrides['fishId'] : null,
			fishName: $overrides['fishName'] ?? '',
			waterId: array_key_exists('waterId', $overrides) ? $overrides['waterId'] : null,
			exceptionType: $overrides['exceptionType'] ?? null,
			seasonStart: $overrides['seasonStart'] ?? null,
			seasonEnd: $overrides['seasonEnd'] ?? null,
			bagLimit: $overrides['bagLimit'] ?? null,
			hookLimit: $overrides['hookLimit'] ?? null,
			minSize: $overrides['minSize'] ?? null,
			maxSize: $overrides['maxSize'] ?? null,
			fishingMethod: $overrides['fishingMethod'] ?? '',
			tidal: $overrides['tidal'] ?? '',
			water: $overrides['water'] ?? '',
			watersCategory: $overrides['watersCategory'] ?? '',
			boundary: $overrides['boundary'] ?? '',
			waterDescription: $overrides['waterDescription'] ?? '',
			note: $overrides['note'] ?? null,
			sourcePage: null,
			sourceTable: null,
			sourceRow: null,
		);
	}

	// Shared fixtures (same values as the TS test file)

	private static function exception107(): NormalizedRecord
	{
		return self::record([
			'id' => 107,
			'exceptionType' => 'specifier',
			'seasonStart' => self::d('2026-01-01'),
			'seasonEnd' => self::d('2026-04-30'),
			'waterId' => 3,
			'fishingMethod' => 'fly fishing',
			'waterDescription' => 'upstream of a line',
		]);
	}

	private static function exception108(): NormalizedRecord
	{
		return self::record([
			'id' => 108,
			'exceptionType' => 'specifier',
			'seasonStart' => self::d('2026-09-16'),
			'seasonEnd' => self::d('2026-12-31'),
			'waterId' => 3,
			'fishingMethod' => 'fly fishing',
			'waterDescription' => 'upstream of a line',
		]);
	}

	private static function tidalRestriction(): NormalizedRecord
	{
		return self::record([
			'id' => 98,
			'fishId' => 4,
			'seasonStart' => self::d('2026-01-01'),
			'seasonEnd' => self::d('2026-12-30'),
			'tidal' => 'tidal',
		]);
	}

	private static function nonTidalRestriction(): NormalizedRecord
	{
		return self::record([
			'id' => 97,
			'fishId' => 4,
			'seasonStart' => self::d('2026-01-01'),
			'seasonEnd' => self::d('2026-12-31'),
			'tidal' => 'non-tidal',
		]);
	}

	private static function salmonDownstream(): NormalizedRecord
	{
		return self::record([
			'id' => 69,
			'fishId' => 1,
			'seasonStart' => self::d('2026-05-16'),
			'seasonEnd' => self::d('2026-10-29'),
			'waterId' => 3,
			'water' => 'Big Tracadie River',
			'waterDescription' => 'downstream of Lord & Foy Brook',
			'fishingMethod' => 'fly fishing',
		]);
	}

	private static function littleTracadie(): NormalizedRecord
	{
		return self::record([
			'id' => 68,
			'fishId' => 1,
			'seasonStart' => self::d('2026-04-15'),
			'seasonEnd' => self::d('2026-05-15'),
			'waterId' => 4,
			'water' => 'Little Tracadie River',
			'waterDescription' => 'downstream of Lord & Foy Brook',
			'fishingMethod' => 'fly fishing',
		]);
	}

	private static function littleTracadieException(): NormalizedRecord
	{
		return self::record([
			'id' => 201,
			'exceptionType' => 'specifier',
			'seasonStart' => self::d('2026-01-01'),
			'seasonEnd' => self::d('2026-04-30'),
			'waterId' => 4,
			'fishingMethod' => 'fly fishing',
		]);
	}

	// ── annotateSeasonBoundaries ──────────────────────────────────────────────

	public function test_annotates_tidal_jan1_dec30_with_start_may1_end_sep15(): void
	{
		$exceptions = [self::exception107(), self::exception108()];
		$result = ApplyExceptions::annotateSeasonBoundaries(self::tidalRestriction(), $exceptions, 4, true);

		$this->assertNotNull($result);
		$this->assertTrue($result['strikeSeasonStart']);
		$this->assertTrue($result['strikeSeasonEnd']);
		$this->assertSame('2026-05-01', $result['replacementSeasonStart']->toDateString());
		$this->assertSame('2026-09-15', $result['replacementSeasonEnd']->toDateString());
	}

	public function test_annotates_non_tidal_jan1_dec31_with_start_may1_end_sep15(): void
	{
		$exceptions = [self::exception107(), self::exception108()];
		$result = ApplyExceptions::annotateSeasonBoundaries(self::nonTidalRestriction(), $exceptions, 4, true);

		$this->assertNotNull($result);
		$this->assertTrue($result['strikeSeasonStart']);
		$this->assertTrue($result['strikeSeasonEnd']);
		$this->assertSame('2026-05-01', $result['replacementSeasonStart']->toDateString());
		$this->assertSame('2026-09-15', $result['replacementSeasonEnd']->toDateString());
	}

	public function test_annotates_salmon_downstream_end_with_day_before_exception_start(): void
	{
		$exceptions = [self::exception107(), self::exception108()];
		$result = ApplyExceptions::annotateSeasonBoundaries(self::salmonDownstream(), $exceptions, 1, false);

		$this->assertNotNull($result);
		$this->assertFalse($result['strikeSeasonStart']);
		$this->assertTrue($result['strikeSeasonEnd']);
		$this->assertArrayNotHasKey('replacementSeasonStart', $result);
		$this->assertSame('2026-09-15', $result['replacementSeasonEnd']->toDateString());
	}

	public function test_annotates_little_tracadie_start_with_day_after_exception_end(): void
	{
		$result = ApplyExceptions::annotateSeasonBoundaries(
			self::littleTracadie(),
			[self::littleTracadieException()],
			1,
			false,
		);

		$this->assertNotNull($result);
		$this->assertTrue($result['strikeSeasonStart']);
		$this->assertFalse($result['strikeSeasonEnd']);
		$this->assertSame('2026-05-01', $result['replacementSeasonStart']->toDateString());
		$this->assertArrayNotHasKey('replacementSeasonEnd', $result);
	}

	public function test_uses_earliest_exception_end_plus_one_day_for_multiple_exceptions(): void
	{
		$restriction = self::record([
			'id' => 1,
			'seasonStart' => self::d('2026-03-01'),
			'seasonEnd' => self::d('2026-12-31'),
			'waterId' => 3,
		]);
		$earlyStart = self::record([
			'id' => 10,
			'exceptionType' => 'specifier',
			'seasonStart' => self::d('2026-01-01'),
			'seasonEnd' => self::d('2026-05-31'),
			'waterId' => 3,
		]);
		$laterStart = self::record([
			'id' => 11,
			'exceptionType' => 'specifier',
			'seasonStart' => self::d('2026-02-01'),
			'seasonEnd' => self::d('2026-06-30'),
			'waterId' => 3,
		]);

		$result = ApplyExceptions::annotateSeasonBoundaries($restriction, [$earlyStart, $laterStart], null, false);

		$this->assertSame('2026-06-01', $result['replacementSeasonStart']->toDateString());
	}

	public function test_uses_earliest_exception_start_minus_one_day_for_multiple_exceptions(): void
	{
		$restriction = self::record([
			'id' => 2,
			'seasonStart' => self::d('2026-01-01'),
			'seasonEnd' => self::d('2026-10-15'),
			'waterId' => 3,
		]);
		$earlierEnd = self::record([
			'id' => 12,
			'exceptionType' => 'specifier',
			'seasonStart' => self::d('2026-08-01'),
			'seasonEnd' => self::d('2026-10-31'),
			'waterId' => 3,
		]);
		$laterEnd = self::record([
			'id' => 13,
			'exceptionType' => 'specifier',
			'seasonStart' => self::d('2026-09-01'),
			'seasonEnd' => self::d('2026-12-31'),
			'waterId' => 3,
		]);

		$result = ApplyExceptions::annotateSeasonBoundaries($restriction, [$earlierEnd, $laterEnd], null, false);

		$this->assertSame('2026-07-31', $result['replacementSeasonEnd']->toDateString());
	}

	// ── collectMatchingExceptions ─────────────────────────────────────────────

	public function test_returns_both_exceptions_on_water_page_for_general_restrictions(): void
	{
		$exceptions = [self::exception107(), self::exception108()];
		$matched = ApplyExceptions::collectMatchingExceptions(
			[self::tidalRestriction(), self::nonTidalRestriction()],
			$exceptions,
			4,
			true,
		);

		$this->assertSame([107, 108], array_column($matched, 'id'));
	}

	public function test_matches_nictau_lake_exception_to_regional_lake_rule(): void
	{
		$nictauException = self::record([
			'id' => 701,
			'exceptionType' => 'specifier',
			'fishId' => 18,
			'waterId' => 191,
			'water' => 'Nictau Lake',
			'watersCategory' => 'lakes, ponds and reservoirs',
			'seasonStart' => self::d('2026-01-01'),
			'seasonEnd' => self::d('2026-12-31'),
			'bagLimit' => 2,
			'minSize' => '25cm',
		]);
		$regionalLake = self::record([
			'id' => 749,
			'fishId' => 18,
			'watersCategory' => 'lakes, ponds and reservoirs',
			'boundary' => 'non-boundary waters',
			'seasonStart' => self::d('2026-05-15'),
			'seasonEnd' => self::d('2026-09-15'),
			'bagLimit' => 5,
			'minSize' => '10cm',
		]);
		$regionalRiver = self::record([
			'id' => 752,
			'fishId' => 18,
			'watersCategory' => 'rivers, brooks and streams',
			'boundary' => 'non-boundary waters',
			'seasonStart' => self::d('2026-04-15'),
			'seasonEnd' => self::d('2026-09-30'),
			'bagLimit' => 5,
			'minSize' => '10cm',
		]);

		$matched = ApplyExceptions::collectMatchingExceptions(
			[$regionalLake, $regionalRiver],
			[$nictauException],
			18,
			false,
		);

		$this->assertSame([701], array_column($matched, 'id'));
	}
}
