<?php
namespace App\Http\Controllers;

use App\Services\RestrictionsService;
use App\Util\WatersCategoryName;
use Exception;
use Illuminate\Http\Request;
use App\Models\FishingRestriction;
use App\Models\Fish;
use App\Services\FishService;
use App\Models\Water;
use App\Models\FishingRestriction\WaterType;

class ApiController extends Controller
{
	protected $fishService;

	protected $restrictionsService;

	public function __construct(FishService $fishService, RestrictionsService $restrictionsService)
	{
		$this->fishService = $fishService;
		$this->restrictionsService = $restrictionsService;
	}

	public function fishes(Request $request)
	{
		return response(['fishes' => $this->fishService->getSortedFishesByCategoryAndName()]);
	}

	public function locations(Request $request)
	{
		$restrictionIds = FishingRestriction::query()
    ->selectRaw('MIN(id) as id')
    ->groupBy('region_id', 'water_id')
    ->pluck('id');

    $restrictions = FishingRestriction::query()
      ->whereIn('fishing_restrictions.id', $restrictionIds)
      ->where('is_exception', false)
      ->leftJoin('waters', 'fishing_restrictions.water_id', '=', 'waters.id')
      ->join('regions', 'fishing_restrictions.region_id', '=', 'regions.id')
      ->select('fishing_restrictions.*')
      ->orderBy('regions.name')
      ->orderBy('waters.name')
      ->with(['water', 'region'])
      ->get();

		return response(['locations' => $restrictions]);
	}

	public function fishByLocation(Request $request, $region_id, $water_id = '0', $fish_id = '0')
	{

		if ($water_id) {
			if ($fish_id) {
				$records = $this->restrictionsService->getByRegionFishAndWater($region_id, $fish_id, $water_id);
			} else {
				$records = $this->restrictionsService->getByRegionAndWater($region_id, $water_id);	
			}
		} else {
			if ($fish_id) {
				$records = $this->restrictionsService->getByRegionAndFish($region_id, $fish_id);
			} else {
				$records = $this->restrictionsService->getByRegion($region_id);	
			}
		}

    foreach ($records as $record) {
      if ($record['season_start'] === null || $record['season_end'] === null) {
        $test = true;
      }
      if ($record['is_exception']) {
        $test = true;
      } else {
        $test = false;
      }
    }

		return response(['limits' => $records]);
	}

	protected function getWaterType($water_name)
	{
		$water_category = WatersCategoryName::getByWaterName($water_name);
		if (strtolower($water_category) === strtolower(WaterType::FLOWING->value)) {
			return WaterType::FLOWING;
		} elseif (strtolower($water_category) === strtolower(WaterType::STANDING->value)) {
			return WaterType::STANDING;
		} else {
			return null;
		}
	}
}
