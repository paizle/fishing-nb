<?php
namespace App\Http\Controllers;

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

	public function __construct(FishService $fishService)
	{
			$this->fishService = $fishService;
	}

	public function fishes(Request $request)
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

	public function fishByLocation(
		Request $request,
		$region_id,
		$water_id = '0',
		$fish_id = '0'
	) {
		$results_ids = [];
		$restrictions = FishingRestriction::query()
			->where('region_id', $region_id)
			->get();

		$water_type = null;
		if ($water_id !== '0') {
			$water = Water::find($water_id);
			$water_type = $this->getWaterType($water->name);
			if ($water_type === null) {
				throw new Exception('Water type not found.');
			}
		}

		foreach ($restrictions->toArray() as $restriction) {
			$add = true;

			if ($fish_id !== '0') {
				if (
					$restriction['fish_id'] !== null &&
					$restriction['fish_id'] != $fish_id
				) {
					$add = false;
				}
			}

			if ($water_id !== '0') {
				if ($restriction['water_id'] === null) {
					$test = true;
					if (
						$restriction['water_type'] !== null &&
						$restriction['water_type'] !== $water_type->value) {
							$add = false;
						}
				} elseif ($restriction['water_id'] != $water_id) {
					$add = false;
				}
			}

			if ($add) {
				$results_ids[] = $restriction['id'];
			}
		}

		$restrictions_by_water = FishingRestriction::query()
			->whereIn('id', $results_ids)
			->with([
				'fish',
				'water',
			])
			->orderBy(
				Fish::select('name')->whereColumn(
					'fish.id',
					'fishing_restrictions.fish_id'
				)
			)
			->orderBy('season_start')
			->get()
			->toArray();

		return response(['limits' => $restrictions_by_water]);
	}

	protected function getWaterType($water_name)
	{
		$water_category = WatersCategoryName::getByWaterName($water_name);
		if (strtolower($water_category) === strtolower(WaterType::FLOWING->value)) {
			return WaterType::FLOWING;
		} else if (strtolower($water_category) === strtolower(WaterType::STANDING->value)) {
			return WaterType::STANDING;
		} else {
			return null;
		}
	}
}
