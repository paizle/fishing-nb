<?php

namespace App\Services;

use App\Models\Fish;
use App\Models\FishingRestriction;
use App\Models\Region;
use Illuminate\Support\Str;

class RegulationSearchService
{
	private const int LIMIT = 50;

	private const int MIN_QUERY_LENGTH = 2;

	/** @var list<string> */
	private const array SCOPES = ['all', 'waterbody', 'species', 'region'];

	public function search(string $query, string $scope = 'all'): array
	{
		$q = trim($query);
		if (strlen($q) < self::MIN_QUERY_LENGTH) {
			return [];
		}

		$scope = in_array($scope, self::SCOPES, true) ? $scope : 'all';

		$results = [];

		if ($scope === 'all' || $scope === 'region') {
			$results = array_merge($results, $this->searchRegions($q));
		}

		if ($scope === 'all' || $scope === 'waterbody') {
			$results = array_merge($results, $this->searchWaters($q));
		}

		if ($scope === 'all' || $scope === 'species') {
			$results = array_merge($results, $this->searchSpeciesLocations($q));
		}

		$results = $this->dedupeResults($results);

		usort(
			$results,
			fn (array $a, array $b) => ($a['rank'] ?? 99) <=> ($b['rank'] ?? 99)
				?: strcmp($a['label'], $b['label']),
		);

		$results = array_slice($results, 0, self::LIMIT);

		return array_map(fn (array $row) => $this->toPublicResult($row), $results);
	}

	/** @return list<array<string, mixed>> */
	private function searchRegions(string $q): array
	{
		return Region::query()
			->where('name', 'LIKE', '%' . $q . '%')
			->orderBy('name')
			->get()
			->map(function (Region $region) use ($q) {
				return [
					'type' => 'region',
					'regionSlug' => Str::slug($region->name),
					'regionName' => $region->name,
					'waterSlug' => null,
					'waterName' => null,
					'speciesSlug' => null,
					'speciesName' => null,
					'label' => $region->name,
					'rank' => $this->rankMatch($region->name, $q),
				];
			})
			->all();
	}

	/** @return list<array<string, mixed>> */
	private function searchWaters(string $q): array
	{
		$restrictionIds = FishingRestriction::query()
			->selectRaw('MIN(id) as id')
			->whereNotNull('water_id')
			->groupBy('region_id', 'water_id')
			->pluck('id');

		return FishingRestriction::query()
			->whereIn('fishing_restrictions.id', $restrictionIds)
			->join('waters', 'fishing_restrictions.water_id', '=', 'waters.id')
			->join('regions', 'fishing_restrictions.region_id', '=', 'regions.id')
			->where('waters.name', 'LIKE', '%' . $q . '%')
			->select('fishing_restrictions.*')
			->with(['water', 'region'])
			->orderBy('regions.name')
			->orderBy('waters.name')
			->get()
			->map(function (FishingRestriction $row) use ($q) {
				$regionName = $row->region->name;
				$waterName = $row->water->name;

				return [
					'type' => 'water',
					'regionSlug' => Str::slug($regionName),
					'regionName' => $regionName,
					'waterSlug' => Str::slug($waterName),
					'waterName' => $waterName,
					'speciesSlug' => null,
					'speciesName' => null,
					'label' => $regionName . ', ' . $waterName,
					'rank' => $this->rankMatch($waterName, $q),
				];
			})
			->all();
	}

	/** @return list<array<string, mixed>> */
	private function searchSpeciesLocations(string $q): array
	{
		$fishes = Fish::query()
			->where('name', 'LIKE', '%' . $q . '%')
			->orderBy('name')
			->get();

		if ($fishes->isEmpty()) {
			return [];
		}

		$fishById = $fishes->keyBy('id');
		$fishIds = $fishes->pluck('id');

		$rows = FishingRestriction::query()
			->whereIn('fish_id', $fishIds)
			->whereNotNull('fish_id')
			->join('regions', 'fishing_restrictions.region_id', '=', 'regions.id')
			->leftJoin('waters', 'fishing_restrictions.water_id', '=', 'waters.id')
			->select([
				'fishing_restrictions.region_id',
				'fishing_restrictions.water_id',
				'fishing_restrictions.fish_id',
				'regions.name as region_name',
				'waters.name as water_name',
			])
			->distinct()
			->orderBy('regions.name')
			->orderBy('waters.name')
			->get();

		$results = [];

		foreach ($rows as $row) {
			/** @var Fish $fish */
			$fish = $fishById[$row->fish_id];
			$regionName = $row->region_name;
			$regionSlug = Str::slug($regionName);
			$speciesSlug = Str::slug($fish->name);

			if ($row->water_id) {
				$waterName = $row->water_name;
				$waterSlug = Str::slug($waterName);
				$label = $regionName . ', ' . $waterName . ' — ' . $fish->name;
			} else {
				$waterName = null;
				$waterSlug = null;
				$label = $regionName . ' — ' . $fish->name;
			}

			$results[] = [
				'type' => 'speciesLocation',
				'regionSlug' => $regionSlug,
				'regionName' => $regionName,
				'waterSlug' => $waterSlug,
				'waterName' => $waterName,
				'speciesSlug' => $speciesSlug,
				'speciesName' => $fish->name,
				'label' => $label,
				'rank' => $this->rankMatch($fish->name, $q),
			];
		}

		return $results;
	}

	private function rankMatch(string $name, string $q): int
	{
		$lower = strtolower($name);
		$qLower = strtolower($q);

		if ($lower === $qLower) {
			return 0;
		}

		if (str_starts_with($lower, $qLower)) {
			return 1;
		}

		return 2;
	}

	/**
	 * @param list<array<string, mixed>> $results
	 * @return list<array<string, mixed>>
	 */
	private function dedupeResults(array $results): array
	{
		$seen = [];
		$deduped = [];

		foreach ($results as $row) {
			$key = implode('|', [
				$row['type'],
				$row['regionSlug'],
				$row['waterSlug'] ?? '',
				$row['speciesSlug'] ?? '',
			]);

			if (isset($seen[$key])) {
				continue;
			}

			$seen[$key] = true;
			$deduped[] = $row;
		}

		return $deduped;
	}

	/** @param array<string, mixed> $row */
	private function toPublicResult(array $row): array
	{
		unset($row['rank']);

		return $row;
	}
}
