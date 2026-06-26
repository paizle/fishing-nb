<?php

namespace App\Services;

use App\Models\FishingRestriction;
use App\Models\Region;
use App\Models\Water;
use App\Support\LocationSlug;

class DirectoryNavBuilder
{
	/**
	 * @return array{
	 *     regions: list<array{name: string, slug: string, url: string}>,
	 *     waters: list<array{name: string, slug: string, url: string, regionSlug: string, regionName: string}>,
	 *     currentRegion: array{name: string, slug: string, url: string}|null,
	 *     currentWater: array{name: string, slug: string, url: string, regionSlug: string, regionName: string}|null,
	 * }
	 */
	public function build(?string $regionSlug = null, ?string $waterSlug = null): array
	{
		$tree = $this->regionWaterTree();

		$currentRegion = null;
		$currentWater = null;
		$waters = [];

		if ($regionSlug !== null) {
			foreach ($tree['regions'] as $region) {
				if ($region['slug'] === $regionSlug) {
					$currentRegion = $region;
					break;
				}
			}

			if ($currentRegion !== null) {
				$waters = array_values(array_filter(
					$tree['waters'],
					fn (array $water) => $water['regionSlug'] === $regionSlug,
				));

				if ($waterSlug !== null) {
					foreach ($waters as $water) {
						if ($water['slug'] === $waterSlug) {
							$currentWater = $water;
							break;
						}
					}
				}
			}
		}

		return [
			'regions' => $tree['regions'],
			'waters' => $waters,
			'currentRegion' => $currentRegion,
			'currentWater' => $currentWater,
		];
	}

	/**
	 * @return list<array{loc: string, lastmod: string|null}>
	 */
	public function sitemapEntries(): array
	{
		$entries = [
			['loc' => url('/'), 'lastmod' => null],
			['loc' => url('/regulations'), 'lastmod' => null],
			['loc' => url('/search'), 'lastmod' => null],
		];

		foreach ($this->regionWaterTree()['regions'] as $region) {
			$entries[] = ['loc' => url($region['url']), 'lastmod' => null];
		}

		foreach ($this->regionWaterTree()['waters'] as $water) {
			$entries[] = ['loc' => url($water['url']), 'lastmod' => null];
		}

		return $entries;
	}

	/**
	 * @return array{
	 *     regions: list<array{name: string, slug: string, url: string}>,
	 *     waters: list<array{name: string, slug: string, url: string, regionSlug: string, regionName: string}>,
	 * }
	 */
	public function regionWaterTree(): array
	{
		$regions = Region::query()->orderBy('name')->get();
		$regionEntries = $regions->map(fn (Region $region) => [
			'name' => $region->name,
			'slug' => LocationSlug::slug($region->name),
			'url' => route('fish.region', ['region' => LocationSlug::slug($region->name)]),
		])->values()->all();

		$restrictionIds = FishingRestriction::query()
			->selectRaw('MIN(id) as id')
			->whereNotNull('water_id')
			->groupBy('region_id', 'water_id')
			->pluck('id');

		$restrictions = FishingRestriction::query()
			->whereIn('fishing_restrictions.id', $restrictionIds)
			->join('waters', 'fishing_restrictions.water_id', '=', 'waters.id')
			->join('regions', 'fishing_restrictions.region_id', '=', 'regions.id')
			->select('fishing_restrictions.*')
			->orderBy('regions.name')
			->orderBy('waters.name')
			->with(['water', 'region'])
			->get();

		$waterEntries = $restrictions->map(function (FishingRestriction $row) {
			$regionSlug = LocationSlug::slug($row->region->name);
			$waterSlug = LocationSlug::slug($row->water->name);

			return [
				'name' => $row->water->name,
				'slug' => $waterSlug,
				'regionSlug' => $regionSlug,
				'regionName' => $row->region->name,
				'url' => route('fish.region.water', ['region' => $regionSlug, 'water' => $waterSlug]),
			];
		})->values()->all();

		return [
			'regions' => $regionEntries,
			'waters' => $waterEntries,
		];
	}
}
