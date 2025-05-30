<?php
namespace App\Services;

use App\Models\FishingRestriction;
use App\Models\Water;


class RestrictionsService
{
	public function getByRegion($region_id) 
	{
		return self::applyOrderBy(
      // get all restrictions and exceptions
			FishingRestriction::query()
        ->where('fishing_restrictions.region_id', $region_id)
				->leftJoin('fish', 'fish.id', '=', 'fishing_restrictions.fish_id')
				->with(['fish', 'water'])
				->select([
					'fish.id as fish_id'
				])
				->orderBy('fish.name')
			)->get();
	}

	public function getByRegionAndWater($region_id, $water_id)
	{
    // get specific restrictions and exceptions
		$water_type = Water::find($water_id)->water_type;
		$record_ids = FishingRestriction::query()
			->where('region_id', $region_id)
			->where('water_id', $water_id)
			->pluck('id')
			->toArray();
    
    // general restrictions
		$water_type_record_ids = FishingRestriction::query()
      ->where('region_id', $region_id)
			->where('water_type', $water_type)
			->where('water_id', null)
			->pluck('id')
			->toArray();

		$record_ids = array_merge($record_ids, $water_type_record_ids);

		return self::applyOrderBy(
			FishingRestriction::whereIn('fishing_restrictions.id', $record_ids)
        ->leftJoin('fish', 'fish.id', '=', 'fishing_restrictions.fish_id')
				->with(['fish', 'water'])
				->select([
					'fish.id as fish_id'
				])
				->orderBy('fish.name')
			)->get();
	}

	public function getByRegionAndFish($region_id, $fish_id)
	{

    // general and specific restrictions
		$record_ids = FishingRestriction::query()
      ->where('region_id', $region_id)
			->where('fish_id', $fish_id)
			->pluck('id')
			->toArray();


    if (count($record_ids) === 0) {
      // no records for this fish in this region so is it assumed fishing is not allowed
      // possibly this is wrong and it is just open fishing season
      return [];
    } else {
      // add exceptions
      $record_ids = array_merge($record_ids, 
        FishingRestriction::query()
          ->where('region_id', $region_id)
          ->where('is_exception', 1)
          ->pluck('id')
          ->toArray()
        );

        return self::applyOrderBy(
			FishingRestriction::whereIn('fishing_restrictions.id', $record_ids)
          ->with(['fish', 'water'])
        )->get();
    }

    // get all restrictions and exceptions
		return self::applyOrderBy(
			FishingRestriction::query()
				->where('fishing_restrictions.region_id', $region_id)
				->leftJoin('fish', 'fish.id', '=', 'fishing_restrictions.fish_id')
        ->where(function ($query) use ($fish_id) {
          $query
            ->where('fish.id', $fish_id)
            ->orWhere('is_exception', 1);
        })
        ->with(['fish', 'water'])
        ->select([
					'fish.id as fish_id'
				])
				->orderBy('fish.name')
		)->get();
	}

	public function getByRegionFishAndWater($region_id, $fish_id, $water_id)
	{
		$water_type = Water::find($water_id)->water_type;

    // get specific restrictions
		$record_ids = FishingRestriction::query()
			->where('region_id', $region_id)
			->where('fish_id', $fish_id)
			->where('water_id', $water_id)
			->pluck('id')
			->toArray();

    // get general restrictions
		$record_ids = array_merge($record_ids, 
      FishingRestriction::query()
        ->where('region_id', $region_id)
        ->where('fish_id', $fish_id)
        ->where('water_type', $water_type)
        ->where('water_id', null)
        ->pluck('id')
        ->toArray()
    );

    // get exceptions
		$record_ids = array_merge($record_ids, FishingRestriction::query()
			->where('region_id', $region_id)
			->where('water_id', $water_id)
			->where('is_exception', 1)
			->pluck('id')
			->toArray()
    );

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
