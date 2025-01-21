<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DateTime;
use App\Models\FishLimit;
use App\Models\Fish;

class ApiController extends Controller
{
    public function createLastModified($year, $month, $day, $hour = 0, $minute = 0, $milli = 0)
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
}
