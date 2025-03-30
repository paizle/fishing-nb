<?php
namespace App\Http\Controllers;

use App\Services\RestrictionsService;
use App\Util\WatersCategoryName;

use Illuminate\Http\Request;
use App\Models\Region;
use App\Models\FishingRestriction;
use App\Services\FishService;
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

	public function regions()
	{
		return response(['regions' => Region::all()]);
	}

	public function fishes()
	{
		return response(['fishes' => $this->fishService->getSortedFishesByCategoryAndName()]);
	}

	public function locations(Request $request)
	{
		$restrictions = FishingRestriction::query()
			->with(['water', 'region'])
			->get();

		$restrictions_by_region = [];

		foreach ($restrictions as $restriction) {
			$region = $restriction->region->name ?? '';
			$water = $restriction->water->name ?? '';

			$key = $region;
			if ($water !== '') {
				$key .= ' / ' . $water;

				if ($restrictions_by_region[$key] ?? null === null) {
					$restrictions_by_region[$key] = [
						'regionId' => $restriction->region_id,
						'waterId' => $restriction->water_id,
					];
				}
			} else {
				if ($restrictions_by_region[$key] ?? null === null) {
					$restrictions_by_region[$key] = [
						'regionId' => $restriction->region_id,
					];
				}
			}
		}

		ksort($restrictions_by_region);

		return response(['locations' => $restrictions_by_region]);
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
