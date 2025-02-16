<?php
namespace App\Http\Controllers;

use App\Util\WatersCategoryName;
use Illuminate\Http\Request;
use App\Models\FishingRestriction;
use App\Models\Fish;
use App\Models\Water;
use App\Models\WatersCategory;

class ApiController extends Controller
{
	public function fishes(Request $request)
	{
		return response(['fishes' => Fish::all()]);
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

		$water_category_id = null;
		if ($water_id !== '0') {
			$water = Water::find($water_id);
			$waters_category_name = WatersCategoryName::getByWaterName(
				$water->name
			);
			$waters_category = WatersCategory::query()
				->where('name', $waters_category_name)
				->first();
			$water_category_id = $waters_category->id;
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
					if (
						$restriction['waters_category_id'] !== null &&
						$restriction['waters_category_id'] !==
							$water_category_id
					) {
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
				'tidal_category',
				'fishing_method',
				'waters_category',
				'boundary_category',
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
}
