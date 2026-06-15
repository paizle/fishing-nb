<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Region;
use App\Models\FishingRestriction;
use App\Services\FishService;
use App\Services\RegulationSearchService;

class ApiController extends Controller
{
	public function __construct(
		protected FishService $fishService,
		protected RegulationSearchService $searchService,
	) {
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
		$restrictionIds = FishingRestriction::query()
			->selectRaw('MIN(id) as id')
			->groupBy('region_id', 'water_id')
			->pluck('id');

		$restrictions = FishingRestriction::query()
			->whereIn('fishing_restrictions.id', $restrictionIds)
			->leftJoin('waters', 'fishing_restrictions.water_id', '=', 'waters.id')
			->join('regions', 'fishing_restrictions.region_id', '=', 'regions.id')
			->select('fishing_restrictions.*')
			->orderBy('regions.name')
			->orderBy('waters.name')
			->with(['water', 'region'])
			->get();

		return response(['locations' => $restrictions]);
	}

	public function search(Request $request)
	{
		$query = trim((string) $request->query('q', ''));
		$scope = (string) $request->query('scope', 'all');

		if (strlen($query) < 2) {
			return response([
				'query' => $query,
				'scope' => $scope,
				'results' => [],
			]);
		}

		return response([
			'query' => $query,
			'scope' => $scope,
			'results' => $this->searchService->search($query, $scope),
		]);
	}
}
