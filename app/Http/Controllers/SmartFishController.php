<?php

namespace App\Http\Controllers;

use App\Services\RestrictionsService;
use App\Support\LocationSlug;
use Illuminate\Support\Facades\View;
use Inertia\Inertia;
use Inertia\Response;

class SmartFishController extends Controller
{
	public function __construct(protected RestrictionsService $restrictionsService)
	{
	}

	public function index(): Response
	{
		return Inertia::render('Public/SmartFish/SmartFish', [
			'apiLastModified' => config('app.api_last_modified'),
		]);
	}

	public function fishLocation(string $region, ?string $water = null): Response
	{
		$regionModel = LocationSlug::findRegion($region) ?? abort(404);
		$waterModel = $water
			? LocationSlug::findWater($water, $regionModel->id) ?? abort(404)
			: null;

		$limits = $waterModel
			? $this->restrictionsService->getByRegionAndWater($regionModel->id, $waterModel->id)
			: $this->restrictionsService->getByRegion($regionModel->id);

		View::share([
			'seoLimits' => $limits,
			'seoLocation' => [
				'regionName' => $regionModel->name,
				'waterName' => $waterModel?->name,
			],
		]);

		return Inertia::render('Public/SmartFish/SmartFish', [
			'apiLastModified' => config('app.api_last_modified'),
			'regionSlug' => $region,
			'waterSlug' => $water,
			'regionId' => $regionModel->id,
			'waterId' => $waterModel?->id,
			'regionName' => $regionModel->name,
			'waterName' => $waterModel?->name,
		]);
	}

	public function search(): Response
	{
		return Inertia::render('Public/SmartFish/Search/SearchResults', [
			'apiLastModified' => config('app.api_last_modified'),
		]);
	}
}
