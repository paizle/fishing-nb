<?php

namespace Tests\Unit\Restrictions;

use App\Restrictions\RecordNormalizer;
use PHPUnit\Framework\TestCase;

class RecordNormalizerTest extends TestCase
{
	// ── normalizeText ───────────────────────────────────────────────────────

	public function test_normalize_text_returns_null_for_null(): void
	{
		$this->assertNull(RecordNormalizer::normalizeText(null));
	}

	public function test_normalize_text_returns_null_for_empty_string(): void
	{
		$this->assertNull(RecordNormalizer::normalizeText(''));
	}

	public function test_normalize_text_collapses_whitespace(): void
	{
		$this->assertSame('hello world', RecordNormalizer::normalizeText("hello  \t world"));
	}

	public function test_normalize_text_replaces_curly_quotes(): void
	{
		// Input: \u2018 (left single quote) + it + \u2019 (right single quote) + s + space + \u201C (left double) + quoted + \u201D (right double)
		// All curly quotes → straight equivalents
		$this->assertSame("'it's \"quoted\"", RecordNormalizer::normalizeText("\u{2018}it\u{2019}s \u{201C}quoted\u{201D}"));
	}

	public function test_normalize_text_replaces_question_mark_artefacts_for_degree(): void
	{
		// ??  between digits → degree symbol
		$this->assertSame("45°30'", RecordNormalizer::normalizeText("45??30'"));
	}

	public function test_normalize_text_replaces_triple_question_for_apostrophe(): void
	{
		$this->assertSame("it's", RecordNormalizer::normalizeText('it???s'));
	}

	// ── formatFishingMethod ─────────────────────────────────────────────────

	public function test_format_fishing_method_fly_fishing(): void
	{
		$this->assertSame('Fly Fishing', RecordNormalizer::formatFishingMethod('fly fishing'));
	}

	public function test_format_fishing_method_angling(): void
	{
		$this->assertSame('Angling', RecordNormalizer::formatFishingMethod('angling'));
	}

	public function test_format_fishing_method_dip_net(): void
	{
		$this->assertSame('Dip Net', RecordNormalizer::formatFishingMethod('dip net'));
	}

	public function test_format_fishing_method_empty(): void
	{
		$this->assertSame('', RecordNormalizer::formatFishingMethod(null));
		$this->assertSame('', RecordNormalizer::formatFishingMethod(''));
	}

	public function test_format_fishing_method_long_fly_fishing_string(): void
	{
		$this->assertSame(
			'Fly Fishing',
			RecordNormalizer::formatFishingMethod(
				'May only be angled by artificial fly or baited barbless hook with a single point',
			),
		);
	}

	// ── groupKey ────────────────────────────────────────────────────────────

	public function test_group_key_includes_note_and_method(): void
	{
		$record = $this->makeRecord(['note' => 'Test note', 'fishingMethod' => 'Fly Fishing']);
		$key = RecordNormalizer::groupKey($record);
		$this->assertStringContainsString('Test note', $key);
		$this->assertStringContainsString('Fly Fishing', $key);
	}

	public function test_group_key_for_exception_row_uses_id_prefix(): void
	{
		$record = $this->makeRecord(['isExceptionRow' => true]);
		$key = RecordNormalizer::groupKey($record);
		$this->assertStringStartsWith('exception-', $key);
	}

	// ── waterGroupKey ───────────────────────────────────────────────────────

	public function test_water_group_key_by_id(): void
	{
		$record = $this->makeRecord(['waterId' => 42]);
		$this->assertSame('id:42', RecordNormalizer::waterGroupKey($record));
	}

	public function test_water_group_key_by_name_when_no_id(): void
	{
		$record = $this->makeRecord(['waterId' => null, 'water' => 'Big River']);
		$this->assertSame('name:Big River', RecordNormalizer::waterGroupKey($record));
	}

	public function test_water_group_key_general(): void
	{
		$record = $this->makeRecord(['waterId' => null, 'water' => '']);
		$this->assertSame('__general__', RecordNormalizer::waterGroupKey($record));
	}

	// ── sortRecords ──────────────────────────────────────────────────────────

	public function test_sort_records_does_not_mutate_input(): void
	{
		$a = $this->makeRecord(['id' => 1, 'seasonStart' => \Carbon\Carbon::parse('2026-06-01 12:00:00', 'UTC')]);
		$b = $this->makeRecord(['id' => 2, 'seasonStart' => \Carbon\Carbon::parse('2026-04-01 12:00:00', 'UTC')]);
		$input = [$a, $b];
		$sorted = RecordNormalizer::sortRecords($input);

		$this->assertSame($a, $input[0], 'Original array not mutated');
		$this->assertSame($b, $sorted[0], 'Earlier start comes first');
	}

	// ── helpers ──────────────────────────────────────────────────────────────

	private function makeRecord(array $overrides = []): \App\Restrictions\NormalizedRecord
	{
		return new \App\Restrictions\NormalizedRecord(
			id: $overrides['id'] ?? 1,
			fishId: $overrides['fishId'] ?? null,
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
			sourcePage: $overrides['sourcePage'] ?? null,
			sourceTable: $overrides['sourceTable'] ?? null,
			sourceRow: $overrides['sourceRow'] ?? null,
			isExceptionRow: $overrides['isExceptionRow'] ?? false,
		);
	}
}
