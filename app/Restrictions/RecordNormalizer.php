<?php

namespace App\Restrictions;

use App\Models\FishingRestriction;
use Carbon\Carbon;

/**
 * PHP port of FishingRestrictionsTransformers.ts:
 *   normalizeExportText, formatFishingMethod, normalizeApiRow,
 *   sortNormalizedRecords, groupKey, waterGroupKey, waterGroupSortName.
 */
class RecordNormalizer
{
	/** Ports normalizeExportText: normalise PDF mojibake and whitespace. */
	public static function normalizeText(mixed $value): ?string
	{
		if ($value === null) {
			return null;
		}

		$text = (string) $value;

		// Curly quotes → straight
		$text = str_replace(["\u{2019}", "\u{2018}"], "'", $text);
		$text = str_replace(["\u{201D}", "\u{201C}"], '"', $text);

		// Non-breaking space → regular space
		$text = str_replace("\u{00A0}", ' ', $text);

		// Collapse whitespace
		$text = (string) preg_replace('/\s+/', ' ', $text);
		$text = trim($text);

		if ($text === '') {
			return null;
		}

		// PDF extraction artefacts
		$text = str_replace('???', "'", $text);
		$text = (string) preg_replace('/(?<=\d)\?\?(?=\d|\'|\s|")/', '°', $text);
		$text = (string) preg_replace('/(?<=[A-Za-z])\?\?(?=\s|[A-Za-z])/', 'é', $text);
		$text = str_replace('??', '°', $text);

		return $text !== '' ? $text : null;
	}

	/**
	 * Ports formatFishingMethod.
	 * Accepts the raw method value (enum, string, or null).
	 */
	public static function formatFishingMethod(mixed $method): string
	{
		// Enum cast → get the string value
		$raw = $method instanceof \BackedEnum ? $method->value : (string) ($method ?? '');

		if ($raw === '') {
			return '';
		}

		if (
			$raw === 'fly fishing' ||
			$raw === 'May only be angled by artificial fly or baited barbless hook with a single point'
		) {
			return 'Fly Fishing';
		}

		if ($raw === 'angling') {
			return 'Angling';
		}

		if ($raw === 'dip net') {
			return 'Dip Net';
		}

		return $raw;
	}

	/**
	 * Ports normalizeApiRow.
	 * Parses dates at noon UTC to produce a deterministic timestamp for comparisons.
	 */
	public static function fromModel(FishingRestriction $model): NormalizedRecord
	{
		$seasonStart = $model->season_start
			? Carbon::createFromFormat('Y-m-d', $model->season_start, 'UTC')?->setTime(12, 0, 0)
			: null;
		$seasonEnd = $model->season_end
			? Carbon::createFromFormat('Y-m-d', $model->season_end, 'UTC')?->setTime(12, 0, 0)
			: null;

		$fish = $model->fish;
		$water = $model->water;

		$tidalValue = $model->tidal instanceof \BackedEnum ? $model->tidal->value : ($model->tidal ?? '');
		$boundaryValue = $model->boundary instanceof \BackedEnum ? $model->boundary->value : ($model->boundary ?? '');
		$waterTypeValue = $model->water_type instanceof \BackedEnum ? $model->water_type->value : ($model->water_type ?? '');

		$exceptionType = $model->exception_type instanceof \BackedEnum
			? $model->exception_type->value
			: ($model->exception_type ?? null);

		return new NormalizedRecord(
			id: $model->id,
			fishId: $fish?->id,
			fishName: self::normalizeText($fish?->name) ?? '',
			waterId: $water?->id ?? $model->water_id,
			exceptionType: self::normalizeText($exceptionType),
			seasonStart: $seasonStart,
			seasonEnd: $seasonEnd,
			bagLimit: $model->bag_limit !== null ? (int) $model->bag_limit : null,
			hookLimit: $model->hook_release_limit !== null ? (int) $model->hook_release_limit : null,
			minSize: self::normalizeText($model->minimum_size),
			maxSize: self::normalizeText($model->maximum_size),
			fishingMethod: self::formatFishingMethod($model->method),
			tidal: self::normalizeText($tidalValue) ?? '',
			watersCategory: self::normalizeText($waterTypeValue) ?? '',
			boundary: self::normalizeText($boundaryValue) ?? '',
			water: self::normalizeText($water?->name) ?? '',
			waterDescription: self::normalizeText($model->water_description) ?? '',
			note: self::normalizeText($model->note),
			sourcePage: $model->source_page !== null ? (int) $model->source_page : null,
			sourceTable: $model->source_table,
			sourceRow: $model->source_row,
		);
	}

	/**
	 * Ports normalizeApiRow for plain JSON arrays (e.g. from raw API fixture files).
	 * Accepts the same shape as the TypeScript normalizeApiRow input.
	 */
	public static function fromArray(array $row): NormalizedRecord
	{
		$seasonStart = !empty($row['season_start'])
			? Carbon::createFromFormat('Y-m-d', $row['season_start'], 'UTC')?->setTime(12, 0, 0)
			: null;
		$seasonEnd = !empty($row['season_end'])
			? Carbon::createFromFormat('Y-m-d', $row['season_end'], 'UTC')?->setTime(12, 0, 0)
			: null;

		$fish = $row['fish'] ?? null;
		$water = $row['water'] ?? null;

		$tidalValue = is_array($row['tidal'] ?? null) ? ($row['tidal']['value'] ?? '') : ($row['tidal'] ?? '');
		$boundaryValue = is_array($row['boundary'] ?? null) ? ($row['boundary']['value'] ?? '') : ($row['boundary'] ?? '');
		$waterTypeValue = is_array($row['water_type'] ?? null) ? ($row['water_type']['value'] ?? '') : ($row['water_type'] ?? '');
		$methodValue = is_array($row['method'] ?? null) ? ($row['method']['value'] ?? '') : ($row['method'] ?? '');

		$exceptionType = is_array($row['exception_type'] ?? null)
			? ($row['exception_type']['value'] ?? null)
			: ($row['exception_type'] ?? null);

		return new NormalizedRecord(
			id: (int) $row['id'],
			fishId: isset($fish['id']) ? (int) $fish['id'] : (isset($row['fish_id']) ? (int) $row['fish_id'] : null),
			fishName: self::normalizeText($fish['name'] ?? null) ?? '',
			waterId: isset($water['id']) ? (int) $water['id'] : (isset($row['water_id']) ? (int) $row['water_id'] : null),
			exceptionType: self::normalizeText($exceptionType),
			seasonStart: $seasonStart,
			seasonEnd: $seasonEnd,
			bagLimit: $row['bag_limit'] !== null && $row['bag_limit'] !== '' ? (int) $row['bag_limit'] : null,
			hookLimit: $row['hook_release_limit'] !== null && $row['hook_release_limit'] !== '' ? (int) $row['hook_release_limit'] : null,
			minSize: self::normalizeText($row['minimum_size'] ?? null),
			maxSize: self::normalizeText($row['maximum_size'] ?? null),
			fishingMethod: self::formatFishingMethod($methodValue),
			tidal: self::normalizeText($tidalValue) ?? '',
			watersCategory: self::normalizeText($waterTypeValue) ?? '',
			boundary: self::normalizeText($boundaryValue) ?? '',
			water: self::normalizeText($water['name'] ?? null) ?? '',
			waterDescription: self::normalizeText($row['water_description'] ?? null) ?? '',
			note: self::normalizeText($row['note'] ?? null),
			sourcePage: isset($row['source_page']) && $row['source_page'] !== null ? (int) $row['source_page'] : null,
			sourceTable: $row['source_table'] ?? null,
			sourceRow: $row['source_row'] ?? null,
		);
	}

	private const GROUP_KEY_FIELDS = [
		'note',
		'fishingMethod',
		'tidal',
		'waterDescription',
		'water',
		'boundary',
		'watersCategory',
	];

	/** Ports groupKey. */
	public static function groupKey(NormalizedRecord $record): string
	{
		if ($record->isExceptionRow) {
			$start = $record->seasonStart?->getTimestamp() * 1000 ?? '';
			$end = $record->seasonEnd?->getTimestamp() * 1000 ?? '';
			$paired = $record->pairedRestrictionId ?? '';
			return "exception-{$record->id}-{$paired}-{$start}-{$end}";
		}

		$parts = array_map(
			fn(string $field) => (string) ($record->$field ?? ''),
			self::GROUP_KEY_FIELDS,
		);

		return implode('-', $parts);
	}

	/** Ports waterGroupKey. */
	public static function waterGroupKey(NormalizedRecord $record): string
	{
		if ($record->waterId !== null) {
			return "id:{$record->waterId}";
		}
		if ($record->water !== '') {
			return "name:{$record->water}";
		}
		return '__general__';
	}

	/** Ports waterGroupSortName. */
	public static function waterGroupSortName(NormalizedRecord $record): string
	{
		return $record->water !== '' ? $record->water : $record->watersCategory;
	}

	/**
	 * Ports sortNormalizedRecords.
	 * Returns a new sorted array without mutating the input.
	 */
	public static function sortRecords(array $records): array
	{
		$sorted = $records;
		usort($sorted, function (NormalizedRecord $a, NormalizedRecord $b): int {
			$startComparison = null;

			if ($a->fishingMethod !== '') {
				$startComparison = strcmp($a->fishingMethod, $b->fishingMethod);
			}

			if (!$startComparison && $a->seasonStart && $b->seasonStart) {
				$startComparison = $a->seasonStart->getTimestamp() <=> $b->seasonStart->getTimestamp();
			}

			if (!$startComparison && $a->boundary !== '') {
				$startComparison = strcmp($b->boundary, $a->boundary);
			}

			if (!$startComparison) {
				if ($a->water !== '' || $a->fishingMethod !== '' || $a->tidal !== '' || $a->waterDescription !== '') {
					return 1;
				}
				if ($a->seasonEnd && $b->seasonEnd) {
					return $b->seasonEnd->getTimestamp() <=> $a->seasonEnd->getTimestamp();
				}
			}

			return $startComparison ?? 0;
		});

		return $sorted;
	}
}
