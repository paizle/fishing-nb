<?php

namespace App\Support;

class FishGroups
{
	/**
	 * @return list<string>
	 */
	public static function members(string $groupId): array
	{
		$group = config("fish_groups.groups.{$groupId}");

		if (!is_array($group)) {
			return [];
		}

		return array_values($group['members'] ?? []);
	}

	/**
	 * @return list<array{displayName: string, matchNames: list<string>}>
	 */
	public static function featuredDisplay(): array
	{
		$config = config('fish_groups');
		$groups = $config['groups'] ?? [];
		$featured = $config['featured'] ?? [];
		$rows = [];

		foreach ($featured as $entry) {
			if (isset($entry['group'])) {
				$group = $groups[$entry['group']] ?? null;
				if (!is_array($group)) {
					continue;
				}
				$rows[] = [
					'displayName' => (string) ($group['display_name'] ?? $entry['group']),
					'matchNames' => array_values($group['members'] ?? []),
				];
				continue;
			}

			if (isset($entry['species'])) {
				$species = (string) $entry['species'];
				$rows[] = [
					'displayName' => $species,
					'matchNames' => [$species],
				];
				continue;
			}

			if (isset($entry['match_names'], $entry['display_name'])) {
				$rows[] = [
					'displayName' => (string) $entry['display_name'],
					'matchNames' => array_values($entry['match_names']),
				];
			}
		}

		return $rows;
	}
}
