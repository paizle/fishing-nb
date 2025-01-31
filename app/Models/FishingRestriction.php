<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FishingRestriction extends Model
{
    use HasFactory;

    public static function getOrInitialize(FishingRestriction $fishingRestriction) {

        $a = $fishingRestriction->region->id;
        $b = $fishingRestriction->boundary_category->id;
        $c = $fishingRestriction->waters_category->id;
        $d = $fishingRestriction->fish->id;

        $query = FishingRestriction::whereRelation("region", "region_id", $fishingRestriction->region->id)
            ->whereRelation("fish_category", "fish_category_id", $fishingRestriction->fish_category->id)
            ->whereRelation("boundary_category", "boundary_category_id", $fishingRestriction->boundary_category->id)
            ->whereRelation("waters_category", "waters_category_id", $fishingRestriction->waters_category->id);

        if ($fishingRestriction->fish === null) {
            $query->whereNull('fish_id');
        } else {
            $query->whereRelation("fish", "fish_id", $fishingRestriction->fish->id);
        }

        if ($fishingRestriction->water === null) {
            $query->whereNull('water_id');
        } else {
            $query->whereRelation("water", "water_id", $fishingRestriction->water->id);
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

    /**
     * Gets the existing entry from the DB or creates one.
     * 
     * @param \App\Models\Region $region
     * @param \App\Models\FishCategory $fish_category
     * @param \App\Models\Fish|null $fish
     * @param \App\Models\BoundaryCategory|null $boundary_category
     * @param \App\Models\WatersCategory|null $waters_category
     * @param \App\Models\Water|null $water
     * @param \App\Models\TidalCategory|null $tidal_category
     * @param \App\Models\FishingMethod|null $fishing_method
     * @return FishingRestriction
     */
    public static function getOrCreate(
        Region $region,
        FishCategory $fish_category,
        Fish $fish = null,
        BoundaryCategory $boundary_category = null,
        WatersCategory $waters_category = null,
        Water $water = null, 
        TidalCategory $tidal_category = null, 
        FishingMethod $fishing_method = null
    ) {

        $query = FishingRestriction
            ::whereRelation("region", "region_id", $region->id)
            ->whereRelation("fish_category", "fish_category_id", $fish_category->id);

        if ($boundary_category === null) {
            $query->whereNull('boundary_category_id');
        } else {
            $query->whereRelation('boundary_category', 'boundary_category_id', $boundary_category->id);
        }

        if ($fish === null) {
            $query->whereNull('fish_id');
        } else {
            $query->whereRelation("fish", "fish_id", $fish->id);
        }

        if ($waters_category === null) {
            $query->whereNull('waters_category_id');
        } else {
            $query->whereRelation("waters_category", "waters_category_id", $waters_category->id);
        }

        if ($water === null) {
            $query->whereNull('water_id');
        } else {
            $query->whereRelation("water", "water_id", $water->id);
        }

        if ($tidal_category === null) {
            $query->whereNull('tidal_category_id');
        } else {
            $query->whereRelation("tidal_category", "tidal_category_id", $tidal_category->id);
        }

        if ($fishing_method === null) {
            $query->whereNull('fishing_method_id');
        } else {
            $query->whereRelation("fishing_method", "fishing_method_id", $fishing_method->id);
        }

        $record = $query->first();
        
        if (!$record) {
            $record = new FishingRestriction();
            $record->region()->associate($region);
            $record->fish_category()->associate($fish_category);
            $record->fish()->associate($fish);
            $record->boundary_category()->associate($boundary_category);
            $record->waters_category()->associate($waters_category);
            $record->water()->associate($water);
            $record->tidal_category()->associate($tidal_category);
            $record->fishing_method()->associate($fishing_method);
        }

        return $record;
    }

    public function region() {
        return $this->belongsTo(Region::class);
    }

    public function fish_category() {
        return $this->belongsTo(FishCategory::class);
    }

    public function fish() {
        return $this->belongsTo(Fish::class);
    }

    public function boundary_category() {
        return $this->belongsTo(BoundaryCategory::class);
    }

    public function waters_category() {
        return $this->belongsTo(WatersCategory::class);
    }

    public function water() {
        return $this->belongsTo(Water::class);
    }

    public function tidal_category() {
        return $this->belongsTo(TidalCategory::class);
    }

    public function fishing_method() {
        return $this->belongsTo(FishingMethod::class);
    }

    protected $fillable = [
        'region', 'region_id',
        'fish_category', 'fish_category_id',
        'fish', 'fish_id',
        'boundary_category', 'boundary_category_id',
        'waters_category', 'waters_category_id',
        'water', 'water_id',
        'water_description',
        'tidal_category', 'tidal_category_id',
        'fishing_method',
        'fishing_method_id',
        'season_start', 'season_end', 'bag_limit', 'minimum_size', 'maximum_size', 'note'
    ];
}
