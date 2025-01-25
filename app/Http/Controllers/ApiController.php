<?php
namespace App\Http\Controllers;

use App\Util\WatersCategoryName;
use Illuminate\Http\Request;
use DateTime;
use App\Models\FishLimit;
use App\Models\Fish;
use App\Models\Water;
use App\Models\WatersCategory;
use Illuminate\Database\Eloquent\Builder;
class ApiController extends Controller
{
    private function createLastModified($year, $month, $day, $hour = 0, $minute = 0, $milli = 0)
    {
        $cache_date = new DateTime();
        $cache_date->setDate($year, $month, $day);
        $cache_date->setTime(0, 0, 0);
        $last_modified = $cache_date->format('D, d M Y H:i:s') . ' GMT';

        return $last_modified;
    }

    private function handleLastModifiedRequest(Request $request, $last_modified) {
        $if_modified_since = $request->headers->get('If-Modified-Since');
        if ($if_modified_since === $last_modified) {
            return response('', 304);
        }
    }

    public function fishes(Request $request)
    {
        $last_modified = $this->createLastModified(2025, 1, 20);
        $this->handleLastModifiedRequest($request, $last_modified);

        return response(['fishes' => Fish::all()], 200)
            ->header('Cache-Control', 'no-cache')
            ->header('Last-Modified', $last_modified);
    }

    public function locations(Request $request)
    {
        $last_modified = $this->createLastModified(2025, 1, 20);
        $this->handleLastModifiedRequest($request, $last_modified);

        $limits = FishLimit::query()
            ->with(['water', 'location'])
            ->get();

        $limits_by_location = [];

        foreach ($limits as $limit) {
            $location = $limit->location->name ?? '';
            $water = $limit->water->name ?? '';

            $key = $location;
            if ($water !== '') {
                $key .= ' / ' . $water;
                
                if ($limits_by_location[$key] ?? null === null) {
                    $limits_by_location[$key] = ['locationId' => $limit->location_id, 'waterId' => $limit->water_id];
                }
            } else {
                if ($limits_by_location[$key] ?? null === null) {
                    $limits_by_location[$key] = ['locationId' => $limit->location_id];
                }
            }
        }
        
        ksort($limits_by_location);

        $data = [
            'locations' => $limits_by_location
        ];

        return response($data, 200)
            ->header('Cache-Control', 'no-cache')
            ->header('Last-Modified', $last_modified);
    }

    public function fishByLocation(Request $request, $location_id, $water_id = '0', $fish_id = '0')
    {
        $last_modified = $this->createLastModified(2025, 1, 20);
        $this->handleLastModifiedRequest($request, $last_modified);

        $results_ids = [];
        $limits = FishLimit::query()->where('location_id', $location_id)->get();

        $water_category_id = null;
        if ($water_id !== '0') {
            $water = Water::find($water_id);
            $waters_category_name = WatersCategoryName::getByWaterName($water->name);
            $waters_category = WatersCategory::query()->where('name', $waters_category_name)->first();
            $water_category_id = $waters_category->id;
        }

        foreach ($limits->toArray() as $limit) {

            $add = true;

            if ($fish_id !== '0') {
                if ($limit['fish_id'] !== null && $limit['fish_id'] != $fish_id) {
                    $add = false;
                }
            }

            if ($water_id !== '0') {
                if ($limit['water_id'] === null) {
                    if ($limit['waters_category_id'] !== null && $limit['waters_category_id'] !== $water_category_id) {
                        $add = false;
                    }
                } else if ($limit['water_id'] != $water_id) {
                    $add = false;
                }
            }
            
            if ($add) {
                $results_ids[] = $limit['id'];
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

        return response(['limits' => $limits_by_water], 200)
            ->header('Cache-Control', 'no-cache')
            ->header('Last-Modified', $last_modified);
    }
}
