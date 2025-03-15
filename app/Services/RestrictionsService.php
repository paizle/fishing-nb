<?php
namespace App\Services;

use App\Models\FishingRestriction;
use App\Models\Water;


class RestrictionsService
{
	/**
	 * Returns all Fish records, sorted first by the order of the enum FishCategory
	 * and sub-sorted by the fish name.
	 * @return \Illuminate\Database\Eloquent\Collection<int, Fish>
	 */
	public function getByRegion($region_id) 
	{
		return FishingRestriction::query()
			->where('region_id', $region_id)
			->join('fish', 'fish.id', '=', 'fishing_restrictions.fish_id')
			->with(['fish', 'water'])
			->select([
        'fishing_restrictions.*', // Keeps fishing_restrictions' ID
        'fish.id as fish_id' // Renames fish.id to avoid conflicts
    	])
			->orderBy('fish.name')
			->orderBy('season_start')
			->orderBy('season_end', 'asc')
			->orderBy('method')
			->orderBy('tidal')
			->get();
	}

	public function getByRegionAndFish($region_id, $fish_id)
	{
		return FishingRestriction::query()
			->where('region_id', $region_id)
			->where('fish_id', $fish_id)
			->with(['fish', 'water'])
			->orderBy('season_start')
			->orderBy('season_end', 'asc')
			->orderBy('method')
			->orderBy('tidal')
			->get();
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

		return FishingRestriction::whereIn('id', $record_ids)
			->with(['fish', 'water'])
			->orderBy('season_start')
			->orderBy('season_end', 'asc')
			->orderBy('method')
			->orderBy('tidal')
			->get();

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

		return FishingRestriction::whereIn('fishing_restrictions.id', $record_ids)
			->join('fish', 'fish.id', '=', 'fishing_restrictions.fish_id')
			->with(['fish', 'water'])
			->select([
        'fishing_restrictions.*', // Keeps fishing_restrictions' ID
        'fish.id as fish_id' // Renames fish.id to avoid conflicts
    	])
			->orderBy('fish.name')
			->orderBy('season_start')
			->orderBy('season_end', 'asc')
			->orderBy('method')
			->orderBy('tidal')
			->get();
	}
}
