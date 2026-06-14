<?php

namespace App\Support;

use App\Models\FishingRestriction;
use App\Models\Region;
use App\Models\Water;
use Illuminate\Support\Str;

class LocationSlug
{
	public static function slug(string $name): string
	{
		return Str::slug($name);
	}

	public static function findRegion(string $slug): ?Region
	{
		return Region::all()->first(fn (Region $region) => self::slug($region->name) === $slug);
	}

	public static function findWater(string $slug, int $regionId): ?Water
	{
		$waterIds = FishingRestriction::query()
			->where('region_id', $regionId)
			->whereNotNull('water_id')
			->pluck('water_id')
			->unique();

		return Water::query()
			->whereIn('id', $waterIds)
			->get()
			->first(fn (Water $water) => self::slug($water->name) === $slug);
	}
}
