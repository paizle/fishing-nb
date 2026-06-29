<?php

namespace App\Support;

class PopularLocations
{
	/** Curated popular search shortcuts for the homepage. */
	public static function tags(): array
	{
		return [
			[
				'label' => 'Miramichi River',
				'url' => self::searchUrl('Miramichi River', 'waterbody'),
			],
			[
				'label' => 'Grand Lake',
				'url' => self::searchUrl('Grand Lake', 'waterbody'),
			],
			[
				'label' => 'Brook Trout',
				'url' => self::searchUrl('Brook Trout', 'species'),
			],
			[
				'label' => 'Smallmouth Bass',
				'url' => self::searchUrl('Smallmouth Bass', 'species'),
			],
			[
				'label' => 'Chaleur',
				'url' => self::searchUrl('Chaleur', 'region'),
			],
			[
				'label' => 'Miramichi',
				'url' => self::searchUrl('Miramichi', 'region'),
			],
		];
	}

	private static function searchUrl(string $query, string $scope): string
	{
		return route('search.page', [
			'q' => $query,
			'scope' => SearchScope::normalize($scope),
		]);
	}
}
