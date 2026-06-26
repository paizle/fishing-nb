<?php

namespace App\Restrictions;

/**
 * PHP port of buildTableRows.ts.
 * Converts a flat array of NormalizedRecord (for one fish) into a typed sequence
 * of table row arrays for rendering. Row shapes mirror the TypeScript TableRow
 * discriminated union (kind: 'data' | 'group-footer' | 'exceptions-heading').
 */
class BuildTableRows
{
	// ── helpers ──────────────────────────────────────────────────────────────

	private static function locationDetailFor(NormalizedRecord $record, bool $onWaterPage): string
	{
		return FormatRestrictionDetail::format([
			'tidal' => $record->tidal,
			'boundary' => $record->boundary,
			'watersCategory' => $record->watersCategory,
			'water' => $record->water,
			'fishingMethod' => $record->fishingMethod,
			'waterDescription' => $record->waterDescription,
		], $onWaterPage);
	}

	private static function verifySource(NormalizedRecord $record): array
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

	/** @return array|null  DataTableRow array, or null when season dates missing. */
	private static function dataRowFromRecord(
		NormalizedRecord $record,
		string $key,
		bool $dateTrailingComma,
		bool $showLocationDetail,
		string $rowClassName,
		bool $onWaterPage,
		bool $waterGroupContinue,
		bool $asExceptionRow = false,
		array $overlapOptions = [],
	): ?array {
		if (!$record->seasonStart || !$record->seasonEnd) {
			return null;
		}

		$isExceptionRow = $asExceptionRow || $record->isExceptionRow;
		$exceptionHasLimit = $record->bagLimit !== null
			|| $record->hookLimit !== null
			|| $record->minSize !== null
			|| $record->maxSize !== null;
		$exceptionNoteSpan = $isExceptionRow && $record->note !== null && !$exceptionHasLimit;
		$showExceptionLimitCells = $isExceptionRow && $exceptionHasLimit;
		$hideBagLimit = !$exceptionNoteSpan && $isExceptionRow
			&& $record->bagLimit === null && !$record->hookLimit && !$showExceptionLimitCells;
		$hideMinSize = !$exceptionNoteSpan && $isExceptionRow
			&& $record->minSize === null && !$showExceptionLimitCells;
		$hideMaxSize = !$exceptionNoteSpan && $isExceptionRow
			&& $record->maxSize === null && !$showExceptionLimitCells;

		$minSize = $showExceptionLimitCells && $record->minSize === null ? '-' : ($record->minSize ?? 'N/A');
		$maxSize = $showExceptionLimitCells && $record->maxSize === null ? '-' : ($record->maxSize ?? 'N/A');

		$row = [
			'kind' => 'data',
			'key' => $key,
			'verify' => self::verifySource($record),
			'seasonStart' => $record->seasonStart->toISOString(),
			'seasonEnd' => $record->seasonEnd->toISOString(),
			'dateTrailingComma' => $dateTrailingComma,
			'showLocationDetail' => $showLocationDetail,
			'locationDetail' => self::locationDetailFor($record, $onWaterPage),
			'note' => $record->note,
			'bagLimit' => $record->bagLimit,
			'bagLimitShowInfinity' => !$showExceptionLimitCells && !$hideBagLimit && $record->bagLimit === null,
			'hookLimit' => $record->hookLimit,
			'minSize' => $minSize,
			'maxSize' => $maxSize,
			'hideBagLimit' => $hideBagLimit,
			'hideMinSize' => $hideMinSize,
			'hideMaxSize' => $hideMaxSize,
			'exceptionNoteSpan' => $exceptionNoteSpan,
			'showExceptionLimitCells' => $showExceptionLimitCells,
			'isExceptionRow' => $isExceptionRow,
			'hasOverlap' => $isExceptionRow,
			'rowClassName' => $rowClassName,
			'waterGroupContinue' => $waterGroupContinue,
		];

		// Apply overlap/strike annotations for non-exception restriction rows
		if (!$isExceptionRow && !empty($overlapOptions)) {
			$annotation = ApplyExceptions::annotateSeasonBoundaries(
				$record,
				$overlapOptions['overlapExceptions'] ?? [],
				$overlapOptions['fishId'] ?? null,
				$overlapOptions['onWaterPage'] ?? false,
			);
			if ($annotation) {
				$row['strikeSeasonStart'] = $annotation['strikeSeasonStart'];
				$row['strikeSeasonEnd'] = $annotation['strikeSeasonEnd'];
				if (isset($annotation['replacementSeasonStart'])) {
					$row['replacementSeasonStart'] = $annotation['replacementSeasonStart']->toISOString();
				}
				if (isset($annotation['replacementSeasonEnd'])) {
					$row['replacementSeasonEnd'] = $annotation['replacementSeasonEnd']->toISOString();
				}
			}
		}

		return $row;
	}

	private static function groupFooterFromRecord(
		NormalizedRecord $record,
		string $key,
		bool $onWaterPage,
		bool $waterGroupContinue,
	): array {
		return [
			'kind' => 'group-footer',
			'key' => $key,
			'verify' => self::verifySource($record),
			'locationDetail' => self::locationDetailFor($record, $onWaterPage),
			'note' => $record->note,
			'waterGroupContinue' => $waterGroupContinue,
		];
	}

	private static function exceptionsHeadingRow(string $waterKey, bool $waterGroupContinue): array
	{
		return [
			'kind' => 'exceptions-heading',
			'key' => "exceptions-heading-{$waterKey}",
			'waterGroupContinue' => $waterGroupContinue,
		];
	}

	/**
	 * Groups records by groupKey, preserving insertion order.
	 * @param  NormalizedRecord[]  $waterRecords
	 * @return NormalizedRecord[][]
	 */
	private static function restrictionGroupsInOrder(array $waterRecords): array
	{
		$groupOrder = [];
		$groups = [];

		foreach ($waterRecords as $record) {
			$key = RecordNormalizer::groupKey($record);
			if (!isset($groups[$key])) {
				$groupOrder[] = $key;
				$groups[$key] = [];
			}
			$groups[$key][] = $record;
		}

		return array_map(fn(string $k) => $groups[$k], $groupOrder);
	}

	/**
	 * @param  NormalizedRecord[]  $members
	 */
	private static function tableRowsFromGroup(
		array $members,
		bool $onWaterPage,
		array $overlapOptions,
		WaterRowEmitter $waterEmitter,
	): array {
		if (count($members) === 0) {
			return [];
		}

		if (count($members) === 1) {
			$row = self::dataRowFromRecord(
				$members[0],
				key: 'data-' . $members[0]->id . '-' . ($members[0]->seasonStart?->getTimestampMs() ?? ''),
				dateTrailingComma: false,
				showLocationDetail: true,
				rowClassName: '',
				onWaterPage: $onWaterPage,
				waterGroupContinue: $waterEmitter->nextContinue(),
				overlapOptions: $overlapOptions,
			);
			return $row ? [$row] : [];
		}

		$rows = [];
		$count = count($members);

		foreach ($members as $index => $record) {
			$ms = $record->seasonStart?->getTimestampMs() ?? '';
			$row = self::dataRowFromRecord(
				$record,
				key: "data-{$record->id}-{$ms}-{$index}",
				dateTrailingComma: $index < $count - 1,
				showLocationDetail: false,
				rowClassName: $index === 0 ? '' : 'group',
				onWaterPage: $onWaterPage,
				waterGroupContinue: $waterEmitter->nextContinue(),
				overlapOptions: $overlapOptions,
			);
			if ($row) {
				$rows[] = $row;
			}
		}

		$rows[] = self::groupFooterFromRecord(
			$members[0],
			key: 'footer-' . $members[0]->id . '-' . RecordNormalizer::groupKey($members[0]),
			onWaterPage: $onWaterPage,
			waterGroupContinue: $waterEmitter->nextContinue(),
		);

		return $rows;
	}

	/**
	 * @param  NormalizedRecord[]  $exceptions
	 */
	private static function exceptionRowsFromRecords(
		array $exceptions,
		bool $onWaterPage,
		WaterRowEmitter $waterEmitter,
	): array {
		$rows = [];

		foreach ($exceptions as $record) {
			$ms = $record->seasonStart?->getTimestampMs() ?? '';
			$row = self::dataRowFromRecord(
				$record,
				key: "exc-{$record->id}-{$ms}",
				dateTrailingComma: false,
				showLocationDetail: true,
				rowClassName: 'exception-section',
				onWaterPage: $onWaterPage,
				waterGroupContinue: $waterEmitter->nextContinue(),
				asExceptionRow: true,
			);
			if ($row) {
				$rows[] = $row;
			}
		}

		return $rows;
	}

	// ── public API ───────────────────────────────────────────────────────────

	/**
	 * Ports buildTableRows.
	 *
	 * @param  NormalizedRecord[]  $records
	 * @param  array{onWaterPage?: bool, overlapExceptions?: NormalizedRecord[], fishId?: int|null}  $options
	 * @return array[]  Mixed array of data/group-footer/exceptions-heading row arrays.
	 */
	public static function build(array $records, array $options = []): array
	{
		$onWaterPage = (bool) ($options['onWaterPage'] ?? false);
		$sorted = RecordNormalizer::sortRecords($records);

		// Group into water buckets
		$waterBuckets = [];
		$waterBucketOrder = [];

		foreach ($sorted as $record) {
			$key = RecordNormalizer::waterGroupKey($record);
			if (!isset($waterBuckets[$key])) {
				$waterBuckets[$key] = [];
				$waterBucketOrder[] = $key;
			}
			$waterBuckets[$key][] = $record;
		}

		// Sort water buckets by sort name (locale-aware)
		usort($waterBucketOrder, function (string $a, string $b) use ($waterBuckets): int {
			$nameA = isset($waterBuckets[$a][0])
				? RecordNormalizer::waterGroupSortName($waterBuckets[$a][0])
				: '';
			$nameB = isset($waterBuckets[$b][0])
				? RecordNormalizer::waterGroupSortName($waterBuckets[$b][0])
				: '';
			return strcmp($nameA, $nameB);
		});

		$rows = [];
		$overlapExceptions = $options['overlapExceptions'] ?? [];
		$fishId = $options['fishId'] ?? null;
		$overlapOptions = [
			'overlapExceptions' => $overlapExceptions,
			'fishId' => $fishId,
			'onWaterPage' => $onWaterPage,
		];

		foreach ($waterBucketOrder as $waterKey) {
			$waterRecords = $waterBuckets[$waterKey];
			$waterEmitter = new WaterRowEmitter($onWaterPage);

			foreach (self::restrictionGroupsInOrder($waterRecords) as $group) {
				foreach (self::tableRowsFromGroup($group, $onWaterPage, $overlapOptions, $waterEmitter) as $row) {
					$rows[] = $row;
				}
			}

			$waterExceptions = ApplyExceptions::collectMatchingExceptions(
				$waterRecords,
				$overlapExceptions,
				$fishId,
				$onWaterPage,
			);

			if (count($waterExceptions) > 0) {
				$rows[] = self::exceptionsHeadingRow($waterKey, $waterEmitter->nextContinue());
				foreach (self::exceptionRowsFromRecords($waterExceptions, $onWaterPage, $waterEmitter) as $row) {
					$rows[] = $row;
				}
			}
		}

		return $rows;
	}
}

/**
 * Tracks whether the next row continues the same water group.
 * Ports the createWaterRowEmitter closure from buildTableRows.ts.
 */
class WaterRowEmitter
{
	private bool $isFirstRowInWater = true;

	public function __construct(private readonly bool $onWaterPage) {}

	public function nextContinue(): bool
	{
		if ($this->onWaterPage) {
			return false;
		}
		$continue = !$this->isFirstRowInWater;
		$this->isFirstRowInWater = false;
		return $continue;
	}
}
