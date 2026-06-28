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
				'url' => route('regulations.region.water', ['region' => 'miramichi', 'water' => 'miramichi-river']),
			],
			[
				'label' => 'Grand Lake',
				'url' => route('regulations.region.water', ['region' => 'lower-saint-john', 'water' => 'grand-lake']),
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
				'url' => route('regulations.region', ['region' => 'chaleur']),
			],
			[
				'label' => 'Miramichi',
				'url' => route('regulations.region', ['region' => 'miramichi']),
			],
		];
	}
}
