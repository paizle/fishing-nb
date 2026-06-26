<?php

namespace App\Support;

class PopularLocations
{
	/** Curated popular links (mirrors popularTags.ts). */
	public static function tags(): array
	{
		return [
			[
				'label' => 'Miramichi River',
				'url' => route('fish.region.water', ['region' => 'miramichi', 'water' => 'miramichi-river']),
			],
			[
				'label' => 'Grand Lake',
				'url' => route('fish.region.water', ['region' => 'lower-saint-john', 'water' => 'grand-lake']),
			],
			[
				'label' => 'Brook Trout',
				'url' => '/search?' . http_build_query(['q' => 'Brook Trout', 'scope' => 'species']),
			],
			[
				'label' => 'Smallmouth Bass',
				'url' => '/search?' . http_build_query(['q' => 'Smallmouth Bass', 'scope' => 'species']),
			],
			[
				'label' => 'Chaleur',
				'url' => route('fish.region', ['region' => 'chaleur']),
			],
			[
				'label' => 'Miramichi',
				'url' => route('fish.region', ['region' => 'miramichi']),
			],
		];
	}
}
