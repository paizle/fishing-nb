<?php

namespace App\Http\Controllers;

use App\Restrictions\RestrictionTableBuilder;
use App\Services\DirectoryNavBuilder;
use App\Services\FishService;
use App\Services\RegulationSearchService;
use App\Services\RestrictionsService;
use App\Services\WhatsOpenNowService;
use App\Support\LocationSlug;
use App\Support\PopularLocations;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Illuminate\View\View as ViewResponse;
use Inertia\Inertia;
use Inertia\Response;

class SmartFishController extends Controller
{
	public function __construct(
		protected RestrictionsService $restrictionsService,
		protected DirectoryNavBuilder $directoryNav,
		protected RegulationSearchService $searchService,
		protected FishService $fishService,
		protected WhatsOpenNowService $whatsOpenNow,
	) {
	}

	public function index(): ViewResponse
	{
		$speciesList = $this->fishService->getSortedFishesByCategoryAndName()
			->pluck('name')
			->take(10)
			->values()
			->all();

		$reactIslandsOn = (bool) config('app.react_islands_on');

		return view('pages.home', [
			'title' => 'Smart Fish — New Brunswick Fishing Regulations',
			'metaDescription' => 'Check seasons, bag limits, size restrictions, and waterbody-specific fishing rules for New Brunswick.',
			'popularLocations' => PopularLocations::tags(),
			'speciesList' => $speciesList,
			'directoryNav' => $this->directoryNav->build(),
			'reactIslandsOn' => $reactIslandsOn,
			'whatsOpenNow' => $reactIslandsOn ? null : $this->whatsOpenNow->forToday(),
		]);
	}

	public function regulations(): Response
	{
		View::share([
			'regulationsEntry' => true,
			'directoryNav' => $this->directoryNav->build(),
			'pageMeta' => [
				'title' => 'Fishing regulations by region — ' . config('app.name'),
				'description' => 'Browse New Brunswick fishing regulations by region. Select a region for seasons, bag limits, and waterbody-specific rules.',
				'canonical' => url('/regulations'),
			],
		]);

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

		$staticRestrictions = RestrictionTableBuilder::build($limits, [
			'waterId' => $waterModel?->id,
		]);

		$heading = $waterModel
			? $waterModel->name . ', ' . $regionModel->name
			: $regionModel->name;

		$canonicalPath = $waterModel
			? route('regulations.region.water', ['region' => $region, 'water' => $water], false)
			: route('regulations.region', ['region' => $region], false);

		View::share([
			'staticRestrictions' => $staticRestrictions,
			'locationMeta' => [
				'regionName' => $regionModel->name,
				'waterName' => $waterModel?->name,
				'regionSlug' => $region,
				'waterSlug' => $water,
			],
			'directoryNav' => $this->directoryNav->build($region, $water),
			'pageMeta' => [
				'title' => $heading . ' — Fishing restrictions · ' . config('app.name'),
				'description' => 'Fishing seasons, bag limits, and size restrictions for ' . $heading . ', New Brunswick.',
				'canonical' => url($canonicalPath),
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

	public function search(Request $request): ViewResponse
	{
		$query = trim((string) $request->query('q', ''));
		$scope = (string) $request->query('scope', 'all');
		$allowedScopes = ['all', 'waterbody', 'species', 'region'];
		if (! in_array($scope, $allowedScopes, true)) {
			$scope = 'all';
		}

		$results = strlen($query) >= 2
			? $this->searchService->search($query, $scope)
			: [];

		return view('pages.search', [
			'title' => 'Search — ' . config('app.name'),
			'metaDescription' => 'Search New Brunswick fishing regulations by waterbody, species, or region.',
			'search' => [
				'query' => $query,
				'scope' => $scope,
				'results' => $results,
				'scopeLabels' => [
					'all' => 'Search All',
					'waterbody' => 'Waterbody',
					'species' => 'Species',
					'region' => 'Region',
				],
			],
			'directoryNav' => $this->directoryNav->build(),
		]);
	}
}
