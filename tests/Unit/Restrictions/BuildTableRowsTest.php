<?php

namespace Tests\Unit\Restrictions;

use App\Restrictions\BuildTableRows;
use App\Restrictions\NormalizedRecord;
use Carbon\Carbon;
use PHPUnit\Framework\TestCase;

/**
 * Mirrors buildTableRows.test.ts test cases 1-to-1.
 */
class BuildTableRowsTest extends TestCase
{
	private static function d(string $iso): Carbon
	{
		return Carbon::createFromFormat('Y-m-d', $iso, 'UTC')->setTime(12, 0, 0);
	}

	private static function record(array $overrides): NormalizedRecord
	{
		return new NormalizedRecord(
			id: $overrides['id'],
			fishId: array_key_exists('fishId', $overrides) ? $overrides['fishId'] : 1,
			fishName: $overrides['fishName'] ?? 'Atlantic Salmon',
			waterId: array_key_exists('waterId', $overrides) ? $overrides['waterId'] : null,
			exceptionType: $overrides['exceptionType'] ?? null,
			seasonStart: $overrides['seasonStart'],
			seasonEnd: $overrides['seasonEnd'],
			bagLimit: $overrides['bagLimit'] ?? null,
			hookLimit: $overrides['hookLimit'] ?? null,
			minSize: $overrides['minSize'] ?? null,
			maxSize: $overrides['maxSize'] ?? null,
			fishingMethod: $overrides['fishingMethod'] ?? 'fly fishing',
			tidal: $overrides['tidal'] ?? '',
			water: $overrides['water'] ?? '',
			watersCategory: $overrides['watersCategory'] ?? 'rivers, brooks and streams',
			boundary: $overrides['boundary'] ?? '',
			waterDescription: $overrides['waterDescription'] ?? '',
			note: $overrides['note'] ?? null,
			sourcePage: null,
			sourceTable: null,
			sourceRow: null,
		);
	}

	// ── waterGroupContinue ────────────────────────────────────────────────────

	public function test_marks_continued_rows_within_same_water_on_region_page(): void
	{
		$bigDownstream = self::record([
			'id' => 69,
			'waterId' => 3,
			'water' => 'Big Tracadie River',
			'waterDescription' => 'downstream of Lord & Foy Brook',
			'seasonStart' => self::d('2026-05-16'),
			'seasonEnd' => self::d('2026-10-29'),
		]);
		$bigUpstream = self::record([
			'id' => 70,
			'waterId' => 3,
			'water' => 'Big Tracadie River',
			'waterDescription' => 'upstream of Lord & Foy Brook',
			'seasonStart' => self::d('2026-06-01'),
			'seasonEnd' => self::d('2026-10-15'),
		]);
		$little = self::record([
			'id' => 68,
			'waterId' => 4,
			'water' => 'Little Tracadie River',
			'waterDescription' => 'downstream of Lord & Foy Brook',
			'seasonStart' => self::d('2026-04-15'),
			'seasonEnd' => self::d('2026-05-15'),
		]);

		$rows = BuildTableRows::build([$bigDownstream, $bigUpstream, $little], ['onWaterPage' => false]);

		$findDataRow = fn(int $id) => current(array_filter(
			$rows,
			fn($r) => $r['kind'] === 'data' && str_starts_with($r['key'], "data-{$id}"),
		)) ?: null;

		$rowBigDown = $findDataRow(69);
		$rowBigUp = $findDataRow(70);
		$rowLittle = $findDataRow(68);

		$this->assertNotNull($rowBigDown);
		$this->assertFalse($rowBigDown['waterGroupContinue']);
		$this->assertTrue($rowBigUp['waterGroupContinue']);
		$this->assertFalse($rowLittle['waterGroupContinue']);
	}

	public function test_does_not_mark_water_group_continue_on_water_page(): void
	{
		$downstream = self::record([
			'id' => 69,
			'waterId' => 3,
			'water' => 'Big Tracadie River',
			'waterDescription' => 'downstream of Lord & Foy Brook',
			'seasonStart' => self::d('2026-05-16'),
			'seasonEnd' => self::d('2026-10-29'),
		]);
		$upstream = self::record([
			'id' => 70,
			'waterId' => 3,
			'water' => 'Big Tracadie River',
			'waterDescription' => 'upstream of Lord & Foy Brook',
			'seasonStart' => self::d('2026-06-01'),
			'seasonEnd' => self::d('2026-10-15'),
		]);

		$rows = BuildTableRows::build([$downstream, $upstream], ['onWaterPage' => true]);

		foreach ($rows as $row) {
			if (isset($row['waterGroupContinue'])) {
				$this->assertFalse($row['waterGroupContinue']);
			}
		}
	}

	// ── exception limit cells ─────────────────────────────────────────────────

	public function test_shows_dashes_for_empty_limit_fields_when_another_limit_is_set(): void
	{
		$baseLake = self::record([
			'id' => 749,
			'fishId' => 18,
			'fishName' => 'Brook Trout',
			'watersCategory' => 'lakes, ponds and reservoirs',
			'seasonStart' => self::d('2026-05-15'),
			'seasonEnd' => self::d('2026-09-15'),
			'bagLimit' => 5,
			'minSize' => '10cm',
		]);
		$nictauException = self::record([
			'id' => 701,
			'fishId' => 18,
			'fishName' => 'Brook Trout',
			'exceptionType' => 'specifier',
			'waterId' => 191,
			'water' => 'Nictau Lake',
			'watersCategory' => 'lakes, ponds and reservoirs',
			'seasonStart' => self::d('2026-01-01'),
			'seasonEnd' => self::d('2026-12-31'),
			'bagLimit' => 2,
			'minSize' => '25cm',
			'maxSize' => null,
		]);

		$rows = BuildTableRows::build([$baseLake], [
			'onWaterPage' => false,
			'overlapExceptions' => [$nictauException],
			'fishId' => 18,
		]);

		$exRow = current(array_filter($rows, fn($r) => $r['kind'] === 'data' && str_starts_with($r['key'], 'exc-701')));

		$this->assertNotEmpty($exRow);
		$this->assertFalse($exRow['exceptionNoteSpan']);
		$this->assertTrue($exRow['showExceptionLimitCells']);
		$this->assertSame(2, $exRow['bagLimit']);
		$this->assertSame('25cm', $exRow['minSize']);
		$this->assertSame('-', $exRow['maxSize']);
		$this->assertFalse($exRow['hideBagLimit']);
		$this->assertFalse($exRow['hideMaxSize']);
	}

	public function test_shows_note_text_when_exception_has_no_limit_values(): void
	{
		$baseLake = self::record([
			'id' => 749,
			'fishId' => 18,
			'fishName' => 'Brook Trout',
			'watersCategory' => 'lakes, ponds and reservoirs',
			'seasonStart' => self::d('2026-05-15'),
			'seasonEnd' => self::d('2026-09-15'),
			'bagLimit' => 5,
			'minSize' => '10cm',
		]);
		$closedException = self::record([
			'id' => 688,
			'fishId' => null,
			'fishName' => 'Brook Trout',
			'exceptionType' => 'specifier',
			'waterId' => 191,
			'water' => 'Nictau Lake',
			'watersCategory' => 'lakes, ponds and reservoirs',
			'waterDescription' => 'all brooks flowing into Nictau Lake',
			'fishingMethod' => 'angling',
			'seasonStart' => self::d('2026-01-01'),
			'seasonEnd' => self::d('2026-12-31'),
			'note' => 'Closed to angling',
		]);

		$rows = BuildTableRows::build([$baseLake], [
			'onWaterPage' => false,
			'overlapExceptions' => [$closedException],
			'fishId' => 18,
		]);

		$exRow = current(array_filter($rows, fn($r) => $r['kind'] === 'data' && str_starts_with($r['key'], 'exc-688')));

		$this->assertNotEmpty($exRow);
		$this->assertTrue($exRow['exceptionNoteSpan']);
		$this->assertFalse($exRow['showExceptionLimitCells']);
	}

	public function test_shows_dashes_when_bag_limit_is_zero(): void
	{
		$baseLake = self::record([
			'id' => 740,
			'fishId' => 3,
			'fishName' => 'Landlocked Salmon',
			'watersCategory' => 'lakes, ponds and reservoirs',
			'seasonStart' => self::d('2026-05-15'),
			'seasonEnd' => self::d('2026-09-30'),
			'bagLimit' => 2,
		]);
		$bagZeroException = self::record([
			'id' => 704,
			'fishId' => 3,
			'fishName' => 'Landlocked Salmon',
			'exceptionType' => 'specifier',
			'waterId' => 183,
			'water' => 'First Lake (Green River)',
			'watersCategory' => 'lakes, ponds and reservoirs',
			'seasonStart' => self::d('2026-09-01'),
			'seasonEnd' => self::d('2026-12-31'),
			'bagLimit' => 0,
		]);

		$rows = BuildTableRows::build([$baseLake], [
			'onWaterPage' => false,
			'overlapExceptions' => [$bagZeroException],
			'fishId' => 3,
		]);

		$exRow = current(array_filter($rows, fn($r) => $r['kind'] === 'data' && str_starts_with($r['key'], 'exc-704')));

		$this->assertNotEmpty($exRow);
		$this->assertSame('-', $exRow['minSize']);
		$this->assertSame('-', $exRow['maxSize']);
	}
}
