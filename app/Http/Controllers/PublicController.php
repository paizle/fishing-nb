<?php
namespace App\Http\Controllers;

use App\Models\FishLimit;
use App\Models\Location;
use App\Models\Fish;
use App\Models\Water;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;

class PublicController extends Controller
{
    public function index()
    {
        return Inertia::render('Public/Index');
    }

    public function home()
    {
        return Inertia::render('Public/Home/Home');
    }

    public function map()
    {
        $breadcrumb = [$this->getBreadcrumbMap()];

        return Inertia::render('Public/Map/Map', [
            'breadcrumb' => $breadcrumb,
            'locations' => Location::all(),
        ]);
    }

    public function region($id)
    {
        $breadcrumb = [
            $this->getBreadcrumbMap(),
            $this->getBreadcrumbRegion($id),
        ];

        $limits = FishLimit::query()
            ->where('location_id', $id)
            ->with('water')
            ->get()
            ->toArray();

        $limits_by_water_name = [];

        // remove duplicate waters
        foreach ($limits as $limit) {
            $water_name = $limit['water']['name'] ?? '';
            if ($water_name && !($limits_by_water_name[$water_name] ?? false)) {
                $limits_by_water_name[$water_name] = $limit;
            }
        }
        $limits_by_water_name = array_values($limits_by_water_name);
        usort(
            $limits_by_water_name,
            fn($a, $b) => strcmp($a['water']['name'], $b['water']['name'])
        );

        return Inertia::render('Public/Region/Region', [
            'breadcrumb' => $breadcrumb,
            'waters' => $limits_by_water_name,
        ]);
    }

    public function water($id)
    {
        $location_id = null;

        $results_ids = [];

        $limits = FishLimit::query()->where('water_id', $id)->get();

        foreach ($limits->toArray() as $limit) {
            $results_ids[] = $limit['id'];

            if (!$location_id) {
                $location_id = $limit['location_id'];
            }

            $related_limits = FishLimit::query()
                ->where('water_id', null)
                ->where('location_id', $limit['location_id'])
                ->where(function (Builder $query) use ($limit) {
                    $query
                        ->where(
                            'waters_category_id',
                            $limit['waters_category_id']
                        )
                        ->orWhereNull('waters_category_id');
                });

            if ($limit['boundary_id']) {
                $related_limits->where(function (Builder $query) use ($limit) {
                    $query
                        ->where('boundary_id', $limit['boundary_id'])
                        ->orWhereNull('boundary_id');
                });
            }

            $related_limits = $related_limits->get();

            foreach ($related_limits->toArray() as $related_limit) {
                // no specific water so this is a rule for the location
                $results_ids[] = $related_limit['id'];
            }
        }

        $limits_by_water = FishLimit::query()
            ->whereIn('id', $results_ids)
            ->with(['fish', 'water', 'tidal_category', 'fishing_method'])
            ->orderBy(
                Fish::select('name')->whereColumn(
                    'fish.id',
                    'fish_limits.fish_id'
                )
            )
            ->orderBy('season_start')
            ->get()
            ->toArray();

        $breadcrumb = [
            $this->getBreadcrumbMap(),
            $this->getBreadcrumbRegion($location_id),
            $this->getBreadcrumbWater($id),
        ];

        return Inertia::render('Public/Water/Water', [
            'breadcrumb' => $breadcrumb,
            'limits' => $limits_by_water,
        ]);
    }
    public function fishes()
    {
        return Inertia::render('Public/Fishes/Fishes', [
            'breadcrumb' => [$this->getBreadcrumbFishes()],
            'fishes' => Fish::all(),
        ]);
    }

    public function fish($id)
    {
        $fish = Fish::find($id);

        $limits = FishLimit::query()
            ->where('fish_id', $id)
            
            ->get()
            ->toArray();

        $ids = [];
        foreach ($limits as $limit) {
            if (!in_array($limit['id'], $ids)) {
                $ids[] = $limit['id'];
            }
        }

        $ids = array_map(function ($item) {
            return $item['id'];
        }, $limits);

        $limits = FishLimit::query()
            ->whereIn('id', $ids)
            ->with([
                'location',
                'boundary',
                'water',
                'waters_category',
                'tidal_category',
                'fishing_method',
            ])
            ->orderBy(
                Location::select('name')->whereColumn(
                    'id',
                    'fish_limits.location_id'
                )
            )
            ->orderByRaw("
                CASE
                    WHEN fish_limits.water_id IS NULL THEN 0
                    ELSE 1
                END ASC
            ")
            ->get();

        return Inertia::render('Public/Fish/Fish', [
            'fish' => $fish,
            'limits' => $limits,
            'breadcrumb' => [
                $this->getBreadcrumbFishes(),
                [
                    'href' => route('fish.fish', $fish->id),
                    'title' => $fish->name
                ]
            ]
        ]);
    }

    public function settings()
    {
        return Inertia::render('Public/Settings/Settings', [
            'settings' => [],
        ]);
    }

    private function getBreadcrumbMap()
    {
        return [
            'href' => route('location.map'),
            'title' => 'New Brunswick',
            'shortTitle' => 'NB',
        ];
    }

    private function getBreadcrumbFishes()
    {
        return [
            'href' => route('fish.fishes'),
            'title' => 'Fish',
        ];
    }

    private function getBreadcrumbRegion($id)
    {
        $location = Location::find($id);
        return [
            'href' => route('location.region', $id),
            'title' => $location->name,
            'shortTitle' => $this->getAcronym($location->name),
        ];
    }

    private function getAcronym($string)
    {
        $words = explode(' ', $string);
        $acronym = '';
        foreach ($words as $word) {
            $acronym .= substr($word, 0, 1);
        }
        return $acronym;
    }

    private function getBreadcrumbWater($id)
    {
        $water = Water::find($id);

        return [
            'href' => route('location.water', $id),
            'title' => $water->name,
        ];
    }
}
