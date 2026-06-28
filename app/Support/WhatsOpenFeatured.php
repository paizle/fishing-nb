<?php

namespace App\Support;

class WhatsOpenFeatured
{
	/** @var list<string> */
	private const STATUS_PRECEDENCE = ['open', 'catch_release', 'closed'];

	/**
	 * @param  list<array{fishId?: int, fishName: string, status: string, statusLabel: string, statusClass: string}>  $entries
	 * @return list<array{fishName: string, statusLabel: string, statusClass: string}>
	 */
	public static function pickFeaturedRows(array $entries): array
	{
		$rows = [];

		foreach (FishGroups::featuredDisplay() as $featured) {
			$matched = array_values(array_filter(
				$entries,
				fn (array $entry) => in_array($entry['fishName'], $featured['matchNames'], true),
			));
			$winner = count($featured['matchNames']) === 1
				? ($matched[0] ?? null)
				: self::mergeStatuses($matched);

			if ($winner === null) {
				$rows[] = [
					'fishName' => $featured['displayName'],
					'statusLabel' => 'Closed',
					'statusClass' => 'closed',
				];
				continue;
			}

			$rows[] = [
				'fishName' => $featured['displayName'],
				'statusLabel' => $winner['statusLabel'],
				'statusClass' => $winner['statusClass'],
			];
		}

		return $rows;
	}

	/**
	 * @param  list<array{fishId?: int, fishName: string, status: string, statusLabel: string, statusClass: string}>  $entries
	 * @return array{fishId?: int, fishName: string, status: string, statusLabel: string, statusClass: string}|null
	 */
	public static function mergeStatuses(array $entries): ?array
	{
		if ($entries === []) {
			return null;
		}

		foreach (self::STATUS_PRECEDENCE as $status) {
			foreach ($entries as $entry) {
				if ($entry['status'] === $status) {
					return $entry;
				}
			}
		}

		return $entries[0];
	}
}
