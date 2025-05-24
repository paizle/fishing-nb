<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\FishingRestriction\Boundary;
use App\Models\FishingRestriction\FishingMethod;
use App\Models\FishingRestriction\Tidal;
use App\Models\FishingRestriction\WaterType;

class FishingRestriction extends Model
{
	use HasFactory;

	protected $casts = [
		'boundary' => Boundary::class,
		'tidal' => Tidal::class,
		'water_type' => WaterType::class,
		'method' => FishingMethod::class,
	];

	public static function getOrInitialize(FishingRestriction $fishingRestriction)
	{
		$a = $fishingRestriction->region->id;
		$b = $fishingRestriction->boundary_category->id;
		$c = $fishingRestriction->waters_category->id;
		$d = $fishingRestriction->fish->id;

		$query = FishingRestriction::whereRelation(
			'region',
			'region_id',
			$fishingRestriction->region->id
		)
			->whereRelation(
				'fish_category',
				'fish_category_id',
				$fishingRestriction->fish_category->id
			)
			->whereRelation(
				'boundary_category',
				'boundary_category_id',
				$fishingRestriction->boundary_category->id
			)
			->whereRelation(
				'waters_category',
				'waters_category_id',
				$fishingRestriction->waters_category->id
			);

		if ($fishingRestriction->fish === null) {
			$query->whereNull('fish_id');
		} else {
			$query->whereRelation('fish', 'fish_id', $fishingRestriction->fish->id);
		}

		if ($fishingRestriction->water === null) {
			$query->whereNull('water_id');
		} else {
			$query->whereRelation('water', 'water_id', $fishingRestriction->water->id);
		}

		$record = $query->first();

		if (!$record) {
			$record = new FishingRestriction();
			$record->region()->associate($fishingRestriction->region);
			$record->fish_category()->associate($fishingRestriction->fish_category);
			$record->fish()->associate($fishingRestriction->fish);
			$record->boundary_category()->associate($fishingRestriction->boundary_category);
			$record->waters_category()->associate($fishingRestriction->waters_category);
			$record->water()->associate($fishingRestriction->water);
		}

		$record->season_start = $fishingRestriction->season_start;
		$record->season_end = $fishingRestriction->season_end;
		$record->bag_limit = $fishingRestriction->bag_limit;
		$record->minimum_size = $fishingRestriction->minimum_size;
		$record->maximum_size = $fishingRestriction->maximum_size;

		return $record;
	}

	public function region()
	{
		return $this->belongsTo(Region::class);
	}

	public function fish_category()
	{
		return $this->belongsTo(FishCategory::class);
	}

	public function fish()
	{
		return $this->belongsTo(Fish::class);
	}

	public function water()
	{
		return $this->belongsTo(Water::class);
	}

	protected $fillable = [
		'region',
		'region_id',
		'fish_category',
		'fish_category_id',
		'fish',
		'fish_id',
		'water',
		'water_id',
		'water_description',
		'season_start',
		'season_end',
		'bag_limit',
		'hook_release_limit',
		'minimum_size',
		'maximum_size',
		'note',
		'boundary',
		'method',
		'tidal',
		'water_type',
	];
}
