<?php

namespace App\Support;

use Carbon\Carbon;

class SeasonDate
{
	public static function isActiveOn(Carbon $date, Carbon $start, Carbon $end): bool
	{
		$year = (int) $start->year;
		$day = self::normalizeToYear($date, $year);
		$seasonStart = self::normalizeToYear($start, $year);
		$seasonEnd = self::normalizeToYear($end, $year);

		if ($seasonStart->lte($seasonEnd)) {
			return $day->gte($seasonStart) && $day->lte($seasonEnd);
		}

		return $day->gte($seasonStart) || $day->lte($seasonEnd);
	}

	private static function normalizeToYear(Carbon $date, int $year): Carbon
	{
		return Carbon::create($year, $date->month, $date->day, 12, 0, 0, 'UTC');
	}
}
