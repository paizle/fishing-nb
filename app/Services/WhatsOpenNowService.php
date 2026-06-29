<?php

namespace App\Services;

use App\Models\SeasonStatusDaily;
use App\Support\SeasonMethodContext;
use App\Support\SeasonStatusEntryBuilder;
use App\Support\WhatsOpenNow;
use Carbon\Carbon;

class WhatsOpenNowService
{
	/**
	 * @return array{
	 *     dateLabel: string,
	 *     anchorDate: string,
	 *     rows: list<array{fishName: string, statusLabel: string, statusClass: string}>
	 * }
	 */
	public function forToday(?Carbon $date = null): array
	{
		$date = ($date ?? now())->copy()->startOfDay();
		$regulationYear = (int) config('fishing.regulation_year');

		$methodContext = SeasonMethodContext::forRegulationYear($regulationYear);
		$entryBuilder = new SeasonStatusEntryBuilder($methodContext);

		$entries = SeasonStatusDaily::query()
			->with('fish')
			->join('fish', 'fish.id', '=', 'season_status_daily.fish_id')
			->where('season_status_daily.regulation_year', $regulationYear)
			->where('season_status_daily.calendar_date', $date->toDateString())
			->orderBy('fish.name')
			->select('season_status_daily.*')
			->get()
			->map(fn (SeasonStatusDaily $row) => $entryBuilder->fromDailyRow($row))
			->values()
			->all();

		return [
			'dateLabel' => $date->format('l, F j, Y'),
			'anchorDate' => $date->toDateString(),
			'rows' => WhatsOpenNow::pickRows($entries),
		];
	}
}
