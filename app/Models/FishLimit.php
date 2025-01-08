<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FishLimit extends Model
{
    use HasFactory;

    public static function getOrInitialize(FishLimit $fishLimit)
    {
        $a = $fishLimit->location->id;
        $b = $fishLimit->boundary->id;
        $c = $fishLimit->waters_category->id;
        $d = $fishLimit->fish->id;

        $query = FishLimit::whereRelation(
            'location',
            'location_id',
            $fishLimit->location->id
        )
            ->whereRelation(
                'fish_category',
                'fish_category_id',
                $fishLimit->fish_category->id
            )
            ->whereRelation('boundary', 'boundary_id', $fishLimit->boundary->id)
            ->whereRelation(
                'waters_category',
                'waters_category_id',
                $fishLimit->waters_category->id
            );

        if ($fishLimit->fish === null) {
            $query->whereNull('fish_id');
        } else {
            $query->whereRelation('fish', 'fish_id', $fishLimit->fish->id);
        }

        if ($fishLimit->water === null) {
            $query->whereNull('water_id');
        } else {
            $query->whereRelation('water', 'water_id', $fishLimit->water->id);
        }

        $record = $query->first();

        if (!$record) {
            $record = new FishLimit();
            $record->location()->associate($fishLimit->location);
            $record->fish_category()->associate($fishLimit->fish_category);
            $record->fish()->associate($fishLimit->fish);
            $record->boundary()->associate($fishLimit->boundary);
            $record->waters_category()->associate($fishLimit->waters_category);
            $record->water()->associate($fishLimit->water);
        }

        $record->season_start = $fishLimit->season_start;
        $record->season_end = $fishLimit->season_end;
        $record->bag_limit = $fishLimit->bag_limit;
        $record->minimum_size = $fishLimit->minimum_size;
        $record->maximum_size = $fishLimit->maximum_size;

        return $record;
    }

    /**
     * Gets the existing entry from the DB or creates one.
     *
     * @param \App\Models\Location $location
     * @param \App\Models\FishCategory $fish_category
     * @param \App\Models\Fish|null $fish
     * @param \App\Models\Boundary|null $boundary
     * @param \App\Models\WatersCategory|null $waters_category
     * @param \App\Models\Water|null $water
     * @param \App\Models\TidalCategory|null $tidal_category
     * @param \App\Models\FishingMethod|null $fishing_method
     * @return FishLimit
     */
    public static function getOrCreate(
        Location $location,
        FishCategory $fish_category,
        Fish $fish = null,
        Boundary $boundary = null,
        WatersCategory $waters_category = null,
        Water $water = null,
        TidalCategory $tidal_category = null,
        FishingMethod $fishing_method = null
    ) {
        $query = FishLimit::whereRelation(
            'location',
            'location_id',
            $location->id
        )->whereRelation(
            'fish_category',
            'fish_category_id',
            $fish_category->id
        );

        if ($boundary === null) {
            $query->whereNull('boundary_id');
        } else {
            $query->whereRelation('boundary', 'boundary_id', $boundary->id);
        }

        if ($fish === null) {
            $query->whereNull('fish_id');
        } else {
            $query->whereRelation('fish', 'fish_id', $fish->id);
        }

        if ($waters_category === null) {
            $query->whereNull('waters_category_id');
        } else {
            $query->whereRelation(
                'waters_category',
                'waters_category_id',
                $waters_category->id
            );
        }

        if ($water === null) {
            $query->whereNull('water_id');
        } else {
            $query->whereRelation('water', 'water_id', $water->id);
        }

        if ($tidal_category === null) {
            $query->whereNull('tidal_category_id');
        } else {
            $query->whereRelation(
                'tidal_category',
                'tidal_category_id',
                $tidal_category->id
            );
        }

        if ($fishing_method === null) {
            $query->whereNull('fishing_method_id');
        } else {
            $query->whereRelation(
                'fishing_method',
                'fishing_method_id',
                $fishing_method->id
            );
        }

        $record = $query->first();

        if (!$record) {
            $record = new FishLimit();
            $record->location()->associate($location);
            $record->fish_category()->associate($fish_category);
            $record->fish()->associate($fish);
            $record->boundary()->associate($boundary);
            $record->waters_category()->associate($waters_category);
            $record->water()->associate($water);
            $record->tidal_category()->associate($tidal_category);
            $record->fishing_method()->associate($fishing_method);
        }

        return $record;
    }

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function fish_category()
    {
        return $this->belongsTo(FishCategory::class);
    }

    public function fish()
    {
        return $this->belongsTo(Fish::class);
    }

    public function boundary()
    {
        return $this->belongsTo(Boundary::class);
    }

    public function waters_category()
    {
        return $this->belongsTo(WatersCategory::class);
    }

    public function water()
    {
        return $this->belongsTo(Water::class);
    }

    public function tidal_category()
    {
        return $this->belongsTo(TidalCategory::class);
    }

    public function fishing_method()
    {
        return $this->belongsTo(FishingMethod::class);
    }

    protected $fillable = [
        'location',
        'location_id',
        'fish_category',
        'fish_category_id',
        'fish',
        'fish_id',
        'boundary',
        'boundary_id',
        'waters_category',
        'waters_category_id',
        'water',
        'water_id',
        'water_description',
        'tidal_category',
        'tidal_category_id',
        'fishing_method',
        'fishing_method_id',
        'season_start',
        'season_end',
        'bag_limit',
        'minimum_size',
        'maximum_size',
        'note',
    ];
}
