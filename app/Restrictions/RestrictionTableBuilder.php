<?php

namespace App\Restrictions;

use Illuminate\Support\Collection;

/**
 * PHP port of buildFishTables.ts.
 * Transforms an Eloquent collection from RestrictionsService into the same
 * FishTableViewModel shape that the TypeScript pipeline produces in the browser.
 */
class RestrictionTableBuilder
{
	/**
	 * Build the view model.
	 *
	 * @param  Collection|\App\Models\FishingRestriction[]  $rawRecords  Eloquent collection from RestrictionsService.
	 * @param  array{waterId?: int|null}  $options
	 * @return array{fishTables: array[], undatedExceptions: array[]}
	 */
	public static function build(Collection|array $rawRecords, array $options = []): array
	{
		$records = $rawRecords instanceof Collection ? $rawRecords->all() : $rawRecords;

		if (empty($records)) {
			return ['fishTables' => [], 'undatedExceptions' => []];
		}

		$normalized = array_map(
			fn($model) => RecordNormalizer::fromModel($model),
			$records,
		);

		['restrictions' => $restrictions, 'datedExceptions' => $datedExceptions, 'undatedExceptions' => $undatedExceptions]
			= self::partitionRecords($normalized);

		$restrictionBuckets = self::bucketByFish($restrictions);

		$onWaterPage = isset($options['waterId']) && $options['waterId'] !== null;
		$fishTables = [];

		foreach ($restrictionBuckets as $fishName => $fishRestrictions) {
			if ($fishName === '') {
				continue;
			}

			$fishId = $fishRestrictions[0]?->fishId ?? null;

			$fishTables[] = [
				'fishName' => $fishName,
				'rows' => BuildTableRows::build($fishRestrictions, [
					'onWaterPage' => $onWaterPage,
					'overlapExceptions' => $datedExceptions,
					'fishId' => $fishId,
				]),
			];
		}

		usort($fishTables, fn(array $a, array $b) => strcmp($a['fishName'], $b['fishName']));

		return [
			'fishTables' => $fishTables,
			'undatedExceptions' => array_map(
				fn(NormalizedRecord $r) => self::toLegacyArray($r),
				$undatedExceptions,
			),
		];
	}

	/**
	 * Build from already-normalized records (e.g. produced by RecordNormalizer::fromArray).
	 * Useful for fixture-based tests that bypass the database.
	 *
	 * @param  NormalizedRecord[]  $normalized
	 * @param  array{waterId?: int|null}  $options
	 * @return array{fishTables: array[], undatedExceptions: array[]}
	 */
	public static function buildFromNormalized(array $normalized, array $options = []): array
	{
		if (empty($normalized)) {
			return ['fishTables' => [], 'undatedExceptions' => []];
		}

		['restrictions' => $restrictions, 'datedExceptions' => $datedExceptions, 'undatedExceptions' => $undatedExceptions]
			= self::partitionRecords($normalized);

		$restrictionBuckets = self::bucketByFish($restrictions);

		$onWaterPage = isset($options['waterId']) && $options['waterId'] !== null;
		$fishTables = [];

		foreach ($restrictionBuckets as $fishName => $fishRestrictions) {
			if ($fishName === '') {
				continue;
			}

			$fishId = $fishRestrictions[0]?->fishId ?? null;

			$fishTables[] = [
				'fishName' => $fishName,
				'rows' => BuildTableRows::build($fishRestrictions, [
					'onWaterPage' => $onWaterPage,
					'overlapExceptions' => $datedExceptions,
					'fishId' => $fishId,
				]),
			];
		}

		usort($fishTables, fn(array $a, array $b) => strcmp($a['fishName'], $b['fishName']));

		return [
			'fishTables' => $fishTables,
			'undatedExceptions' => array_map(
				fn(NormalizedRecord $r) => self::toLegacyArray($r),
				$undatedExceptions,
			),
		];
	}

	// ── private helpers ───────────────────────────────────────────────────────

	/**
	 * @param  NormalizedRecord[]  $normalized
	 * @return array{restrictions: NormalizedRecord[], datedExceptions: NormalizedRecord[], undatedExceptions: NormalizedRecord[]}
	 */
	private static function partitionRecords(array $normalized): array
	{
		$restrictions = [];
		$datedExceptions = [];
		$undatedExceptions = [];

		foreach ($normalized as $record) {
			if ($record->isOverlay()) {
				if (self::isValidSeason($record)) {
					$datedExceptions[] = $record;
				} else {
					$undatedExceptions[] = $record;
				}
				continue;
			}
			$restrictions[] = $record;
		}

		return compact('restrictions', 'datedExceptions', 'undatedExceptions');
	}

	private static function isValidSeason(NormalizedRecord $record): bool
	{
		return $record->seasonStart !== null
			&& $record->seasonEnd !== null
			&& $record->seasonStart->getTimestamp() <= $record->seasonEnd->getTimestamp();
	}

	/**
	 * Bucket restrictions by fish name, preserving insertion order.
	 * @param  NormalizedRecord[]  $records
	 * @return array<string, NormalizedRecord[]>
	 */
	private static function bucketByFish(array $records): array
	{
		$fish = [];

		foreach ($records as $record) {
			$name = $record->fishName;
			$fish[$name][] = $record;
		}

		return $fish;
	}

	/** Ports toLegacyRestriction: convert NormalizedRecord to a plain array for undated exceptions. */
	private static function toLegacyArray(NormalizedRecord $record): array
	{
		return [
			'id' => $record->id,
			'isException' => $record->isOverlay(),
			'exceptionType' => $record->exceptionType,
			'seasonStart' => $record->seasonStart?->toISOString(),
			'seasonEnd' => $record->seasonEnd?->toISOString(),
			'bagLimit' => $record->bagLimit,
			'hookLimit' => $record->hookLimit,
			'minSize' => $record->minSize,
			'maxSize' => $record->maxSize,
			'fishingMethod' => $record->fishingMethod,
			'tidal' => $record->tidal,
			'water' => $record->water,
			'watersCategory' => $record->watersCategory,
			'boundary' => $record->boundary,
			'waterDescription' => $record->waterDescription,
			'note' => $record->note,
			'sourcePage' => $record->sourcePage,
			'sourceTable' => $record->sourceTable,
			'sourceRow' => $record->sourceRow,
		];
	}
}
