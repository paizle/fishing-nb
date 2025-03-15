<?php
namespace App\Services;

use App\Models\Fish;
use App\Models\Fish\FishCategory;

class FishService
{
	/**
	 * Returns all Fish records, sorted first by the order of the enum FishCategory
	 * and sub-sorted by the fish name.
	 * @return \Illuminate\Database\Eloquent\Collection<int, Fish>
	 */
	public function getSortedFishesByCategoryAndName(): \Illuminate\Database\Eloquent\Collection
	{
		$orderCases = implode(
			' ',
			array_map(
				fn($index, $case) => "WHEN '{$case->value}' THEN {$index}",
				array_keys(FishCategory::cases()),
				FishCategory::cases()
			)
		);

		return Fish::orderByRaw(
			"
					CASE fish_category
							{$orderCases}
							ELSE 99
					END
			"
		)
			->orderBy('name', 'asc')
			->get();
	}
}
