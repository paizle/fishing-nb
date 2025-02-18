<?php
namespace App\Http\Controllers;

use App\Models\FishingRestriction;
use App\Models\Region;
use App\Models\Fish;
use App\Models\Water;
use Inertia\Inertia;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Response;
use Illuminate\Http\Request;

class PublicController extends Controller
{
	public function index()
	{
		return Inertia::render('Public/Index');
	}

	public function home(Request $request)
	{
		return Inertia::render('Public/Home/Home', [
			'apiLastModified' => config('app.api_last_modified'),
		]);
	}

	public function map()
	{
		$breadcrumb = [$this->getBreadcrumbMap()];

		return Inertia::render('Public/Map/Map', [
			'breadcrumb' => $breadcrumb,
			'locations' => Region::all(),
		]);
	}

	public function region($id)
	{
		$breadcrumb = [
			$this->getBreadcrumbMap(),
			$this->getBreadcrumbRegion($id),
		];

		$restrictions = FishingRestriction::query()
			->where('region_id', $id)
			->with('water')
			->get()
			->toArray();

		$restrictions_by_water_name = [];

		// remove duplicate waters
		foreach ($restrictions as $restriction) {
			$water_name = $restriction['water']['name'] ?? '';
			if (
				$water_name &&
				!($restrictions_by_water_name[$water_name] ?? false)
			) {
				$restrictions_by_water_name[$water_name] = $restriction;
			}
		}
		$restrictions_by_water_name = array_values($restrictions_by_water_name);
		usort(
			$restrictions_by_water_name,
			fn($a, $b) => strcmp($a['water']['name'], $b['water']['name'])
		);

		return Inertia::render('Public/Region/Region', [
			'breadcrumb' => $breadcrumb,
			'waters' => $restrictions_by_water_name,
		]);
	}

	public function water($id)
	{
		$region_id = null;

		$results_ids = [];

		$restrictions = FishingRestriction::query()
			->where('water_id', $id)
			->get();

		foreach ($restrictions->toArray() as $restriction) {
			$results_ids[] = $restriction['id'];

			if (!$region_id) {
				$region_id = $restriction['region_id'];
			}

			$related_restrictions = FishingRestriction::query()
				->where('water_id', null)
				->where('region_id', $restriction['region_id'])
				->where(function (Builder $query) use ($restriction) {
					$query
						->where(
							'waters_category_id',
							$restriction['waters_category_id']
						)
						->orWhereNull('waters_category_id');
				});

			if ($restriction['boundary_category_id']) {
				$related_restrictions->where(function (Builder $query) use (
					$restriction
				) {
					$query
						->where(
							'boundary_category_id',
							$restriction['boundary_category_id']
						)
						->orWhereNull('boundary_category_id');
				});
			}

			$related_restrictions = $related_restrictions->get();

			foreach ($related_restrictions->toArray() as $related_restriction) {
				// no specific water so this is a rule for the region
				$results_ids[] = $related_restriction['id'];
			}
		}

		$restrictions_by_water = FishingRestriction::query()
			->whereIn('id', $results_ids)
			->with(['fish', 'water', 'tidal_category', 'fishing_method'])
			->orderBy(
				Fish::select('name')->whereColumn(
					'fish.id',
					'fishing_restrictions.fish_id'
				)
			)
			->orderBy('season_start')
			->get()
			->toArray();

		$breadcrumb = [
			$this->getBreadcrumbMap(),
			$this->getBreadcrumbRegion($region_id),
			$this->getBreadcrumbWater($id),
		];

		return Inertia::render('Public/Water/Water', [
			'breadcrumb' => $breadcrumb,
			'limits' => $restrictions_by_water,
		]);
	}
	public function fishes()
	{
		return Inertia::render('Public/Fishes/Fishes', [
			'breadcrumb' => [$this->getBreadcrumbFishes()],
			'fishes' => Fish::all(),
		]);
	}

	public function fish($id)
	{
		$fish = Fish::find($id);

		$restrictions = FishingRestriction::query()
			->where('fish_id', $id)
			->get()
			->toArray();

		$ids = [];
		foreach ($restrictions as $restriction) {
			if (!in_array($restriction['id'], $ids)) {
				$ids[] = $restriction['id'];
			}
		}

		$ids = array_map(function ($item) {
			return $item['id'];
		}, $restrictions);

		$restrictions = FishingRestriction::query()
			->whereIn('id', $ids)
			->with([
				'region',
				'boundary_category',
				'water',
				'waters_category',
				'tidal_category',
				'fishing_method',
			])
			->orderBy(
				Region::select('name')->whereColumn(
					'id',
					'fishing_restrictions.region_id'
				)
			)
			->orderByRaw(
				"
                CASE
                    WHEN fishing_restrictions.water_id IS NULL THEN 0
                    ELSE 1
                END ASC
            "
			)
			->get();

		return Inertia::render('Public/Fish/Fish', [
			'fish' => $fish,
			'limits' => $restrictions,
			'breadcrumb' => [
				$this->getBreadcrumbFishes(),
				[
					'href' => route('fish.fish', $fish->id),
					'title' => $fish->name,
				],
			],
		]);
	}

	public function settings()
	{
		return Inertia::render('Public/Settings/Settings', [
			'settings' => [],
		]);
	}

	private function getBreadcrumbMap()
	{
		return [
			'href' => route('location.map'),
			'title' => 'New Brunswick',
			'shortTitle' => 'NB',
		];
	}

	private function getBreadcrumbFishes()
	{
		return [
			'href' => route('fish.fishes'),
			'title' => 'Fish',
		];
	}

	private function getBreadcrumbRegion($id)
	{
		$region = Region::find($id);
		return [
			'href' => route('location.region', $id),
			'title' => $region->name,
			'shortTitle' => $this->getAcronym($region->name),
		];
	}

	private function getAcronym($string)
	{
		$words = explode(' ', $string);
		$acronym = '';
		foreach ($words as $word) {
			$acronym .= substr($word, 0, 1);
		}
		return $acronym;
	}

	private function getBreadcrumbWater($id)
	{
		$water = Water::find($id);

		return [
			'href' => route('location.water', $id),
			'title' => $water->name,
		];
	}
}
