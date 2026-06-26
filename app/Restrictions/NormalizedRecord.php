<?php

namespace App\Restrictions;

use Carbon\Carbon;

/**
 * PHP equivalent of the TypeScript NormalizedRecord type.
 * Produced by RecordNormalizer::fromModel() from a FishingRestriction Eloquent model.
 */
class NormalizedRecord
{
	public function __construct(
		public readonly int $id,
		public readonly ?int $fishId,
		public readonly string $fishName,
		public readonly ?int $waterId,
		public readonly ?string $exceptionType,
		public readonly ?Carbon $seasonStart,
		public readonly ?Carbon $seasonEnd,
		public readonly ?int $bagLimit,
		public readonly ?int $hookLimit,
		public readonly ?string $minSize,
		public readonly ?string $maxSize,
		public readonly string $fishingMethod,
		public readonly string $tidal,
		public readonly string $water,
		public readonly string $watersCategory,
		public readonly string $boundary,
		public readonly string $waterDescription,
		public readonly ?string $note,
		public readonly ?int $sourcePage,
		public readonly ?string $sourceTable,
		public readonly ?string $sourceRow,
		public bool $isExceptionRow = false,
		public bool $hasOverlap = false,
		public ?int $pairedRestrictionId = null,
	) {}

	public function isOverlay(): bool
	{
		return $this->exceptionType !== null;
	}
}
