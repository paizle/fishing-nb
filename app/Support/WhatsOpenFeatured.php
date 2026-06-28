<?php

namespace App\Support;

class WhatsOpenFeatured
{
	/** @var list<array{displayName: string, matchNames: list<string>}> */
	private const FEATURED_DISPLAY = [
		['displayName' => 'Brook Trout', 'matchNames' => ['Brook Trout']],
		['displayName' => 'Smallmouth Bass', 'matchNames' => ['Smallmouth Bass']],
		['displayName' => 'Chain Pickerel', 'matchNames' => ['Chain Pickerel']],
		['displayName' => 'Landlocked Salmon', 'matchNames' => ['Landlocked Salmon']],
		['displayName' => 'Lake Trout', 'matchNames' => ['Lake Trout']],
		['displayName' => 'Atlantic Salmon', 'matchNames' => ['Bright Salmon', 'Spring Kelt']],
	];

	/** @var list<string> */
	private const STATUS_PRECEDENCE = ['open', 'catch_release', 'closed'];

	/**
	 * @param  list<array{fishId?: int, fishName: string, status: string, statusLabel: string, statusClass: string}>  $entries
	 * @return list<array{fishName: string, statusLabel: string, statusClass: string}>
	 */
	public static function pickFeaturedRows(array $entries): array
	{
		$rows = [];

		foreach (self::FEATURED_DISPLAY as $featured) {
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
