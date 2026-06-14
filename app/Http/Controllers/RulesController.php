<?php

namespace App\Http\Controllers;

use App\Services\RestrictionsService;
use App\Support\LocationSlug;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RulesController extends Controller
{
	public function __construct(protected RestrictionsService $restrictionsService)
	{
	}

	public function index(Request $request): JsonResponse
	{
		[$regionId, $waterId] = $this->resolveLocationIds($request);

		if ($waterId) {
			$records = $this->restrictionsService->getByRegionAndWater($regionId, $waterId);
		} else {
			$records = $this->restrictionsService->getByRegion($regionId);
		}

		return response()->json(['limits' => $records]);
	}

	public function show(Request $request, int $fish_id): JsonResponse
	{
		[$regionId, $waterId] = $this->resolveLocationIds($request);

		if ($waterId) {
			$records = $this->restrictionsService->getByRegionFishAndWater($regionId, $fish_id, $waterId);
		} else {
			$records = $this->restrictionsService->getByRegionAndFish($regionId, $fish_id);
		}

		return response()->json(['limits' => $records]);
	}

	/**
	 * @return array{0: int, 1: int|null}
	 */
	private function resolveLocationIds(Request $request): array
	{
		$regionSlug = trim((string) $request->query('region', ''));
		if ($regionSlug === '') {
			abort(422, 'Query parameter "region" is required.');
		}

		$region = LocationSlug::findRegion($regionSlug) ?? abort(404);

		$waterSlug = trim((string) $request->query('water', ''));
		$waterId = null;
		if ($waterSlug !== '') {
			$water = LocationSlug::findWater($waterSlug, $region->id) ?? abort(404);
			$waterId = $water->id;
		}

		return [$region->id, $waterId];
	}
}
