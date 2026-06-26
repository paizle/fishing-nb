<?php

namespace App\Services;

use App\Models\SeasonStatusDaily;
use Carbon\Carbon;
use Carbon\CarbonPeriod;

class SeasonCalendarService
{
	/**
	 * Province-wide season status for every day in the month containing the anchor date.
	 *
	 * @return array{
	 *     anchorDate: string,
	 *     monthLabel: string,
	 *     prevMonthDate: string,
	 *     nextMonthDate: string,
	 *     regulationYear: int,
	 *     days: list<array{
	 *         date: string,
	 *         label: string,
	 *         entries: list<array{
	 *             fishId: int,
	 *             fishName: string,
	 *             status: string,
	 *             statusLabel: string,
	 *             statusClass: string,
	 *         }>
	 *     }>
	 * }
	 */
	public function getMonth(?string $date = null): array
	{
		$anchorDate = $this->resolveAnchorDate($date);
		$regulationYear = (int) config('fishing.regulation_year');
		$monthStart = $anchorDate->copy()->startOfMonth();
		$monthEnd = $anchorDate->copy()->endOfMonth();

		$rowsByDate = SeasonStatusDaily::query()
			->with('fish')
			->join('fish', 'fish.id', '=', 'season_status_daily.fish_id')
			->where('season_status_daily.regulation_year', $regulationYear)
			->whereBetween('season_status_daily.calendar_date', [$monthStart->toDateString(), $monthEnd->toDateString()])
			->orderBy('season_status_daily.calendar_date')
			->orderBy('fish.name')
			->select('season_status_daily.*')
			->get()
			->groupBy(fn (SeasonStatusDaily $row) => $row->calendar_date->toDateString());

		$days = [];
		$period = CarbonPeriod::create($monthStart, '1 day', $monthEnd);

		foreach ($period as $day) {
			/** @var Carbon $day */
			$dateKey = $day->toDateString();
			$entries = $rowsByDate->get($dateKey, collect())->map(
				fn (SeasonStatusDaily $row) => [
					'fishId' => (int) $row->fish_id,
					'fishName' => (string) $row->fish->name,
					'status' => $row->status->value,
					'statusLabel' => $row->status->label(),
					'statusClass' => $row->status->cssClass(),
				],
			)->values()->all();

			$days[] = [
				'date' => $dateKey,
				'label' => $day->format('l, F j'),
				'entries' => $entries,
			];
		}

		return [
			'anchorDate' => $anchorDate->toDateString(),
			'monthLabel' => $anchorDate->format('F Y'),
			'prevMonthDate' => $monthStart->copy()->subMonth()->format('Y-m-d'),
			'nextMonthDate' => $monthStart->copy()->addMonth()->format('Y-m-d'),
			'regulationYear' => $regulationYear,
			'days' => $days,
		];
	}

	private function resolveAnchorDate(?string $date): Carbon
	{
		$raw = trim((string) $date);

		if ($raw === '') {
			return now()->startOfDay();
		}

		$parsed = Carbon::createFromFormat('Y-m-d', $raw);

		if (!$parsed || $parsed->format('Y-m-d') !== $raw) {
			return now()->startOfDay();
		}

		return $parsed->startOfDay();
	}
}
