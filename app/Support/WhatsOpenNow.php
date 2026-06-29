<?php

namespace App\Support;

/**
 * Homepage "What's Open Right Now?" — row definitions and status merge only.
 */
class WhatsOpenNow
{
	/** @var list<string> Best status wins when a row matches multiple calendar species. */
	private const STATUS_PRECEDENCE = ['open', 'catch_release', 'closed'];

	/**
	 * @return list<array{label: string, species: list<string>}>
	 */
	public static function rows(): array
	{
		return config('whats_open_now');
	}

	/**
	 * @param  list<array{fishId?: int, fishName: string, status: string, statusLabel: string, statusClass: string}>  $entries
	 * @return list<array{fishName: string, statusLabel: string, statusClass: string}>
	 */
	public static function pickRows(array $entries): array
	{
		$rows = [];

		foreach (self::rows() as $def) {
			$matched = array_values(array_filter(
				$entries,
				fn (array $entry) => in_array($entry['fishName'], $def['species'], true),
			));
			$winner = self::mergeStatuses($matched);

			if ($winner === null) {
				$rows[] = [
					'fishName' => $def['label'],
					'statusLabel' => 'Closed',
					'statusClass' => 'closed',
				];
				continue;
			}

			$rows[] = [
				'fishName' => $def['label'],
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
