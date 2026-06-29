<?php

namespace App\Services;

use App\Models\Fish;
use App\Models\FishingRestriction;
use App\Models\SeasonStatusDaily;
use App\Models\SeasonStatusDaily\SeasonStatus;
use App\Support\SeasonDate;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Support\Collection;

class SeasonStatusMaterializer
{
	/** @var Collection<int, Collection<int, FishingRestriction>> */
	private Collection $restrictionsByFishId;

	public function __construct()
	{
		$this->restrictionsByFishId = collect();
	}

	/**
	 * @return array{year: int, rows: int, fish: int}
	 */
	public function materialize(?int $regulationYear = null): array
	{
		$year = $regulationYear ?? (int) config('fishing.regulation_year');
		$fishTargets = $this->resolveFishTargets();

		$this->loadPrimaryRestrictions();

		$rows = [];
		$now = now();
		$period = CarbonPeriod::create(
			Carbon::create($year, 1, 1, 12, 0, 0, 'UTC'),
			'1 day',
			Carbon::create($year, 12, 31, 12, 0, 0, 'UTC'),
		);

		foreach ($period as $day) {
			/** @var Carbon $day */
			foreach ($fishTargets as $target) {
				$rows[] = [
					'regulation_year' => $year,
					'calendar_date' => $day->toDateString(),
					'fish_id' => $target['fish_id'],
					'status' => $this->statusForFishOnDate($target['fish_id'], $day)->value,
					'sort_order' => $target['sort_order'],
					'created_at' => $now,
					'updated_at' => $now,
				];
			}
		}

		SeasonStatusDaily::query()->where('regulation_year', $year)->delete();

		foreach (array_chunk($rows, 500) as $chunk) {
			SeasonStatusDaily::query()->insert($chunk);
		}

		return [
			'year' => $year,
			'rows' => count($rows),
			'fish' => count($fishTargets),
		];
	}

	/**
	 * @return list<array{fish_id: int, sort_order: null}>
	 */
	private function resolveFishTargets(): array
	{
		return Fish::query()
			->orderBy('name')
			->orderBy('id')
			->get(['id'])
			->map(fn (Fish $fish) => [
				'fish_id' => (int) $fish->id,
				'sort_order' => null,
			])
			->all();
	}

	private function loadPrimaryRestrictions(): void
	{
		$restrictions = FishingRestriction::query()
			->whereNull('exception_type')
			->whereNotNull('season_start')
			->whereNotNull('season_end')
			->whereNotNull('fish_id')
			->get();

		$this->restrictionsByFishId = $restrictions->groupBy('fish_id');
	}

	private function statusForFishOnDate(int $fishId, Carbon $date): SeasonStatus
	{
		$rules = $this->restrictionsByFishId->get($fishId, collect());
		$statuses = [];

		foreach ($rules as $rule) {
			$start = Carbon::createFromFormat('Y-m-d', $rule->season_start, 'UTC')?->setTime(12, 0, 0);
			$end = Carbon::createFromFormat('Y-m-d', $rule->season_end, 'UTC')?->setTime(12, 0, 0);

			if (!$start || !$end || !SeasonDate::isActiveOn($date, $start, $end)) {
				continue;
			}

			$statuses[] = $this->statusFromRestriction($rule);
		}

		return $this->mergeStatuses($statuses);
	}

	private function statusFromRestriction(FishingRestriction $rule): SeasonStatus
	{
		if ($rule->bag_limit === 0 && ($rule->hook_release_limit ?? 0) > 0) {
			return SeasonStatus::CATCH_RELEASE;
		}

		if ($rule->bag_limit === null) {
			return ($rule->hook_release_limit ?? 0) > 0
				? SeasonStatus::CATCH_RELEASE
				: SeasonStatus::OPEN;
		}

		if ($rule->bag_limit > 0) {
			return SeasonStatus::OPEN;
		}

		return SeasonStatus::CLOSED;
	}

	/**
	 * @param  SeasonStatus[]  $statuses
	 */
	private function mergeStatuses(array $statuses): SeasonStatus
	{
		if ($statuses === []) {
			return SeasonStatus::CLOSED;
		}

		foreach ($statuses as $status) {
			if ($status === SeasonStatus::OPEN) {
				return SeasonStatus::OPEN;
			}
		}

		foreach ($statuses as $status) {
			if ($status === SeasonStatus::CATCH_RELEASE) {
				return SeasonStatus::CATCH_RELEASE;
			}
		}

		return SeasonStatus::CLOSED;
	}
}
