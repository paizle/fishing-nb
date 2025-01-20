<?php
namespace App\Http\Controllers;

use App\Models\FishLimit;
use DateTime;
use Illuminate\Http\Request;

class ApiController extends Controller
{
    
    public function locations(Request $request)
    {
        $last_modified = new DateTime();
        $last_modified->setDate(2025, 1, 19);
        $last_modified->setTime(0, 0);

        if ($request->header('If-Modified-Since') === $last_modified->format('D, d M Y H:i:s') . ' GMT') {
            return response('', 304); // No content, not modified
        }

        $limits = FishLimit::query()
            ->with(['water', 'location'])
            ->get();

        $limits_by_location = [];

        // remove duplicate waters
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
            'cache-version' => '13',
            'locations' => $limits_by_location
        ];

        $etag = md5(json_encode($data));

        if ($request->headers->get('If-None-Match') === $etag) {
            // Data has not changed, return a 304 Not Modified response
            return response('', 304);
        }

        

        return response($data, 200)
            ->header('Cache-Control', 'no-cache')
            ->header('Last-Modified', $last_modified->format('D, d M Y H:i:s') . ' GMT');
    }
}
