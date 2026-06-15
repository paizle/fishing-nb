<?php

namespace App\Http\Controllers;

use App\Support\LocationSlug;
use Inertia\Inertia;
use Inertia\Response;

class SmartFishController extends Controller
{
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
