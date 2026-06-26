<?php

namespace App\Support;

class RegulationUrl
{
	/**
	 * Build a location URL from a search result row (mirrors searchHelpers.ts buildRegulationUrl).
	 *
	 * @param array{regionSlug: string, waterSlug?: string|null, speciesSlug?: string|null} $result
	 */
	public static function fromSearchResult(array $result): string
	{
		$path = ! empty($result['waterSlug'])
			? route('fish.region.water', [
				'region' => $result['regionSlug'],
				'water' => $result['waterSlug'],
			])
			: route('fish.region', ['region' => $result['regionSlug']]);

		if (! empty($result['speciesSlug'])) {
			return $path . '?species=' . rawurlencode($result['speciesSlug']);
		}

		return $path;
	}

	public static function speciesSearchHref(string $speciesName): string
	{
		return '/search?' . http_build_query(['q' => $speciesName, 'scope' => 'species']);
	}

	public static function searchResultTypeLabel(string $type, ?string $speciesName = null): string
	{
		return match ($type) {
			'region' => 'Region',
			'water' => 'Waterbody',
			default => $speciesName ?? 'Species',
		};
	}
}
