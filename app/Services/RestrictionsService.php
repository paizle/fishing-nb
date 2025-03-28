<?php
namespace App\Services;

use App\Models\FishingRestriction;
use App\Models\Water;


class RestrictionsService
{
	public function getByRegion($region_id) 
	{
		return self::applyOrderBy(
			FishingRestriction::query()
				->where('fishing_restrictions.region_id', $region_id)
				->join('fish', 'fish.id', '=', 'fishing_restrictions.fish_id')
				->with(['fish', 'water'])
				->select([
					'fish.id as fish_id'
				])
				->orderBy('fish.name')
			)->get();
	}

	public function getByRegionAndWater($region_id, $water_id)
	{
		$water_type = Water::find($water_id)->water_type;
		$record_ids = FishingRestriction::query()
			->where('region_id', $region_id)
			->where('water_id', $water_id)
			->pluck('id')
			->toArray();

		$water_type_record_ids = FishingRestriction::query()
			->where('region_id', $region_id)
			->where('water_type', $water_type)
			->where('water_id', null)
			->pluck('id')
			->toArray();

		$region_record_ids = FishingRestriction::query()
			->where('region_id', $region_id)
			->where('water_type', null)
			->where('water_id', null)
			->pluck('id')
			->toArray();
		
		$record_ids = array_merge($record_ids, $water_type_record_ids, $region_record_ids);

		return self::applyOrderBy(
			FishingRestriction::whereIn('fishing_restrictions.id', $record_ids)
				->join('fish', 'fish.id', '=', 'fishing_restrictions.fish_id')
				->with(['fish', 'water'])
				->select([
					'fish.id as fish_id'
				])
				->orderBy('fish.name')
			)->get();
	}

	public function getByRegionAndFish($region_id, $fish_id)
	{
		return self::applyOrderBy(
			FishingRestriction::query()
				->where('fishing_restrictions.region_id', $region_id)
				->where('fishing_restrictions.fish_id', $fish_id)
				->with(['fish', 'water'])
		)->get();
	}

	public function getByRegionFishAndWater($region_id, $fish_id, $water_id)
	{
		$water_type = Water::find($water_id)->water_type;

		$record_ids = FishingRestriction::query()
			->where('region_id', $region_id)
			->where('fish_id', $fish_id)
			->where('water_id', $water_id)
			->pluck('id')
			->toArray();

		$water_type_record_ids = FishingRestriction::query()
			->where('region_id', $region_id)
			->where('fish_id', $fish_id)
			->where('water_type', $water_type)
			->where('water_id', null)
			->pluck('id')
			->toArray();

		$region_record_ids = FishingRestriction::query()
			->where('region_id', $region_id)
			->where('fish_id', $fish_id)
			->where('water_type', null)
			->where('water_id', null)
			->pluck('id')
			->toArray();

		$record_ids = array_merge($record_ids, $water_type_record_ids, $region_record_ids);

		return self::applyOrderBy(
			FishingRestriction::whereIn('fishing_restrictions.id', $record_ids)
				->with(['fish', 'water'])
			)->get();
	}

	public static function applyOrderBy(
		\Illuminate\Database\Eloquent\Builder $query)
	{
		return $query
			->leftJoin('waters', 'fishing_restrictions.water_id', '=', 'waters.id')
			->select([
				'fishing_restrictions.*'
			])
			->orderBy('season_start')
			->orderBy('water_description', 'desc')
			->orderBy('waters.name', 'desc')
			->orderBy('water_type')
			->orderBy('method')
			->orderBy('tidal')
			->orderBy('boundary')
			->orderBy('season_end', 'asc');
	}
}
