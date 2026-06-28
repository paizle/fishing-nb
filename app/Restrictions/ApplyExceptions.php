<?php

namespace App\Restrictions;

use Carbon\Carbon;

/**
 * PHP port of applyExceptions.ts.
 * Determines which restriction seasons are affected by dated exceptions
 * (annotateSeasonBoundaries) and which exceptions overlap a set of
 * restrictions (collectMatchingExceptions).
 */
class ApplyExceptions
{
	// ── helpers ──────────────────────────────────────────────────────────────

	private static function isValidSeason(?Carbon $start, ?Carbon $end): bool
	{
		return $start !== null && $end !== null && $start->getTimestamp() <= $end->getTimestamp();
	}

	/** @return array{start: Carbon, end: Carbon}|null */
	private static function interval(NormalizedRecord $record): ?array
	{
		if (!self::isValidSeason($record->seasonStart, $record->seasonEnd)) {
			return null;
		}
		return ['start' => $record->seasonStart, 'end' => $record->seasonEnd];
	}

	/** @param array{start: Carbon, end: Carbon} $a
	 *  @param array{start: Carbon, end: Carbon} $b */
	private static function seasonsOverlap(array $a, array $b): bool
	{
		$start = $a['start']->getTimestamp() >= $b['start']->getTimestamp() ? $a['start'] : $b['start'];
		$end = $a['end']->getTimestamp() <= $b['end']->getTimestamp() ? $a['end'] : $b['end'];
		return $start->getTimestamp() <= $end->getTimestamp();
	}

	private static function exceptionMatchesFish(NormalizedRecord $exception, ?int $fishId): bool
	{
		if ($exception->fishId === null) {
			return true;
		}
		return $exception->fishId === $fishId;
	}

	private static function exceptionAppliesToRestriction(
		NormalizedRecord $exception,
		NormalizedRecord $restriction,
		bool $onWaterPage,
	): bool {
		if ($exception->waterId === null) {
			return true;
		}

		if ($restriction->waterId !== null) {
			return $restriction->waterId === $exception->waterId;
		}

		if ($restriction->watersCategory === '' || $exception->watersCategory === '') {
			return true;
		}

		return $restriction->watersCategory === $exception->watersCategory;
	}

	private static function exceptionOverlapsRestriction(
		NormalizedRecord $exception,
		NormalizedRecord $restriction,
	): bool {
		$exInterval = self::interval($exception);
		$restInterval = self::interval($restriction);
		if (!$exInterval || !$restInterval) {
			return false;
		}
		return self::seasonsOverlap($exInterval, $restInterval);
	}

	/** @param array{start: Carbon, end: Carbon} $a
	 *  @param array{start: Carbon, end: Carbon} $b
	 *  @return array{start: Carbon, end: Carbon}|null */
	private static function overlapInterval(NormalizedRecord $restriction, NormalizedRecord $exception): ?array
	{
		$exInterval = self::interval($exception);
		$restInterval = self::interval($restriction);
		if (!$exInterval || !$restInterval) {
			return null;
		}
		if (!self::seasonsOverlap($exInterval, $restInterval)) {
			return null;
		}
		return [
			'start' => $exInterval['start']->getTimestamp() >= $restInterval['start']->getTimestamp()
				? $exInterval['start'] : $restInterval['start'],
			'end' => $exInterval['end']->getTimestamp() <= $restInterval['end']->getTimestamp()
				? $exInterval['end'] : $restInterval['end'],
		];
	}

	/** @param array{start: Carbon, end: Carbon} $interval */
	private static function dateWithinInterval(Carbon $date, array $interval): bool
	{
		return $date->getTimestamp() >= $interval['start']->getTimestamp()
			&& $date->getTimestamp() <= $interval['end']->getTimestamp();
	}

	/** @param NormalizedRecord[] $candidates */
	private static function earliestSeasonEnd(array $candidates): ?Carbon
	{
		$best = null;
		foreach ($candidates as $c) {
			if (!$c->seasonEnd) {
				continue;
			}
			if ($best === null || $c->seasonEnd->getTimestamp() < $best->getTimestamp()) {
				$best = $c->seasonEnd;
			}
		}
		return $best;
	}

	/** @param NormalizedRecord[] $candidates */
	private static function earliestSeasonStart(array $candidates): ?Carbon
	{
		$best = null;
		foreach ($candidates as $c) {
			if (!$c->seasonStart) {
				continue;
			}
			if ($best === null || $c->seasonStart->getTimestamp() < $best->getTimestamp()) {
				$best = $c->seasonStart;
			}
		}
		return $best;
	}

	private static function restrictionMatchesException(
		NormalizedRecord $restriction,
		NormalizedRecord $exception,
		?int $fishId,
		bool $onWaterPage,
	): bool {
		return self::exceptionMatchesFish($exception, $fishId)
			&& self::exceptionAppliesToRestriction($exception, $restriction, $onWaterPage)
			&& self::exceptionOverlapsRestriction($exception, $restriction);
	}

	/**
	 * Whether a dated exception applies to a restriction (province-wide species context).
	 */
	public static function exceptionMatchesRestriction(
		NormalizedRecord $restriction,
		NormalizedRecord $exception,
		?int $fishId,
		bool $onWaterPage = false,
	): bool {
		return self::restrictionMatchesException($restriction, $exception, $fishId, $onWaterPage);
	}

	// ── public API ───────────────────────────────────────────────────────────

	/**
	 * Ports annotateSeasonBoundaries.
	 * Returns null when no exceptions affect the restriction's season boundaries.
	 *
	 * @param  NormalizedRecord[]  $exceptions
	 * @return array{strikeSeasonStart: bool, strikeSeasonEnd: bool, replacementSeasonStart?: Carbon, replacementSeasonEnd?: Carbon}|null
	 */
	public static function annotateSeasonBoundaries(
		NormalizedRecord $restriction,
		array $exceptions,
		?int $fishId,
		bool $onWaterPage,
	): ?array {
		if (!$restriction->seasonStart || !$restriction->seasonEnd) {
			return null;
		}

		$startCandidates = [];
		$endCandidates = [];

		foreach ($exceptions as $exception) {
			if (!self::restrictionMatchesException($restriction, $exception, $fishId, $onWaterPage)) {
				continue;
			}

			$overlap = self::overlapInterval($restriction, $exception);
			if (!$overlap) {
				continue;
			}

			if (self::dateWithinInterval($restriction->seasonStart, $overlap)) {
				$startCandidates[] = $exception;
			}

			if (self::dateWithinInterval($restriction->seasonEnd, $overlap)) {
				$endCandidates[] = $exception;
			}
		}

		$strikeStart = count($startCandidates) > 0;
		$strikeEnd = count($endCandidates) > 0;

		if (!$strikeStart && !$strikeEnd) {
			return null;
		}

		$result = [
			'strikeSeasonStart' => $strikeStart,
			'strikeSeasonEnd' => $strikeEnd,
		];

		if ($strikeStart) {
			$end = self::earliestSeasonEnd($startCandidates);
			if ($end) {
				$result['replacementSeasonStart'] = $end->copy()->addDay();
			}
		}

		if ($strikeEnd) {
			$start = self::earliestSeasonStart($endCandidates);
			if ($start) {
				$result['replacementSeasonEnd'] = $start->copy()->subDay();
			}
		}

		return $result;
	}

	/**
	 * Ports collectMatchingExceptions.
	 * Returns dated exceptions that overlap at least one restriction for the given fish.
	 *
	 * @param  NormalizedRecord[]  $restrictions
	 * @param  NormalizedRecord[]  $exceptions
	 * @return NormalizedRecord[]
	 */
	public static function collectMatchingExceptions(
		array $restrictions,
		array $exceptions,
		?int $fishId,
		bool $onWaterPage,
	): array {
		$datedExceptions = array_filter(
			$exceptions,
			fn(NormalizedRecord $e) => self::isValidSeason($e->seasonStart, $e->seasonEnd),
		);

		$seen = [];
		$matched = [];

		foreach ($datedExceptions as $exception) {
			if (!self::exceptionMatchesFish($exception, $fishId) || in_array($exception->id, $seen, true)) {
				continue;
			}

			$overlaps = false;
			foreach ($restrictions as $restriction) {
				if (self::restrictionMatchesException($restriction, $exception, $fishId, $onWaterPage)) {
					$overlaps = true;
					break;
				}
			}

			if (!$overlaps) {
				continue;
			}

			$seen[] = $exception->id;
			$matched[] = $exception;
		}

		// Sort by season start (ascending), then season end (ascending)
		usort($matched, function (NormalizedRecord $a, NormalizedRecord $b): int {
			if (!$a->seasonStart || !$b->seasonStart) {
				return 0;
			}
			$cmp = $a->seasonStart->getTimestamp() <=> $b->seasonStart->getTimestamp();
			if ($cmp !== 0) {
				return $cmp;
			}
			if (!$a->seasonEnd || !$b->seasonEnd) {
				return 0;
			}
			return $a->seasonEnd->getTimestamp() <=> $b->seasonEnd->getTimestamp();
		});

		return $matched;
	}
}
