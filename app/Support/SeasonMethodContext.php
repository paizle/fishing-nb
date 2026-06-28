<?php

namespace App\Support;

use App\Models\FishingRestriction;
use App\Models\SeasonStatusDaily\SeasonStatus;
use App\Restrictions\ApplyExceptions;
use App\Restrictions\NormalizedRecord;
use App\Restrictions\RecordNormalizer;
use Carbon\Carbon;
use Illuminate\Support\Collection;

/**
 * Preloads primary restrictions and dated exceptions for method-label resolution.
 */
class SeasonMethodContext
{
	/** @var Collection<int, list<NormalizedRecord>> */
	private Collection $primariesByFishId;

	/** @var Collection<int, list<NormalizedRecord>> */
	private Collection $exceptionsByFishId;

	private function __construct(Collection $primariesByFishId, Collection $exceptionsByFishId)
	{
		$this->primariesByFishId = $primariesByFishId;
		$this->exceptionsByFishId = $exceptionsByFishId;
	}

	/**
	 * @param  Collection<int, list<NormalizedRecord>>  $primariesByFishId
	 * @param  Collection<int, list<NormalizedRecord>>  $exceptionsByFishId
	 */
	public static function fromCollections(Collection $primariesByFishId, Collection $exceptionsByFishId): self
	{
		return new self($primariesByFishId, $exceptionsByFishId);
	}

	public static function forRegulationYear(int $regulationYear): self
	{
		$restrictions = FishingRestriction::query()
			->with(['fish', 'water'])
			->whereNotNull('fish_id')
			->where(function ($query) use ($regulationYear) {
				$query->whereYear('season_start', $regulationYear)
					->orWhereYear('season_end', $regulationYear);
			})
			->get();

		$primariesByFishId = [];
		$exceptionsByFishId = [];

		foreach ($restrictions as $model) {
			$record = RecordNormalizer::fromModel($model);
			$fishId = $record->fishId;

			if ($fishId === null) {
				continue;
			}

			if ($record->exceptionType === null) {
				if (!$record->seasonStart || !$record->seasonEnd) {
					continue;
				}
				$primariesByFishId[$fishId] ??= [];
				$primariesByFishId[$fishId][] = $record;
				continue;
			}

			if (!$record->seasonStart || !$record->seasonEnd) {
				continue;
			}

			$exceptionsByFishId[$fishId] ??= [];
			$exceptionsByFishId[$fishId][] = $record;
		}

		return new self(collect($primariesByFishId), collect($exceptionsByFishId));
	}

	public function methodLabelFor(int $fishId, Carbon $date, SeasonStatus $status): ?string
	{
		if ($status === SeasonStatus::CLOSED) {
			return null;
		}

		$primaries = $this->activePrimariesOn($fishId, $date);
		$contributors = $this->contributorsForStatus($primaries, $status);

		foreach ($contributors as $primary) {
			foreach ($this->activeExceptionsOn($fishId, $date) as $exception) {
				if ($exception->fishingMethod === '') {
					continue;
				}

				if (!ApplyExceptions::exceptionMatchesRestriction($primary, $exception, $fishId, false)) {
					continue;
				}

				return $exception->fishingMethod;
			}
		}

		return null;
	}

	/**
	 * @return list<NormalizedRecord>
	 */
	private function activePrimariesOn(int $fishId, Carbon $date): array
	{
		$records = $this->primariesByFishId->get($fishId, []);
		$active = [];

		foreach ($records as $record) {
			if ($record->seasonStart && $record->seasonEnd
				&& SeasonDate::isActiveOn($date, $record->seasonStart, $record->seasonEnd)) {
				$active[] = $record;
			}
		}

		return $active;
	}

	/**
	 * @return list<NormalizedRecord>
	 */
	private function activeExceptionsOn(int $fishId, Carbon $date): array
	{
		$records = $this->exceptionsByFishId->get($fishId, []);
		$active = [];

		foreach ($records as $record) {
			if ($record->seasonStart && $record->seasonEnd
				&& SeasonDate::isActiveOn($date, $record->seasonStart, $record->seasonEnd)) {
				$active[] = $record;
			}
		}

		return $active;
	}

	/**
	 * @param  list<NormalizedRecord>  $primaries
	 * @return list<NormalizedRecord>
	 */
	private function contributorsForStatus(array $primaries, SeasonStatus $status): array
	{
		$contributors = [];

		foreach ($primaries as $primary) {
			if ($status === SeasonStatus::OPEN && $this->primaryIsOpen($primary)) {
				$contributors[] = $primary;
			}

			if ($status === SeasonStatus::CATCH_RELEASE && $this->primaryIsCatchRelease($primary)) {
				$contributors[] = $primary;
			}
		}

		return $contributors;
	}

	private function primaryIsOpen(NormalizedRecord $record): bool
	{
		return $record->bagLimit === null || $record->bagLimit > 0;
	}

	private function primaryIsCatchRelease(NormalizedRecord $record): bool
	{
		return $record->bagLimit === 0 && ($record->hookLimit ?? 0) > 0;
	}
}
