<?php

namespace App\Support;

class SearchScope
{
	public const DEFAULT = 'all';

	public static function labels(): array
	{
		return [
			'all' => 'All',
			'waterbody' => 'Waterbody',
			'species' => 'Species',
			'region' => 'Region',
		];
	}

	public static function normalize(string $scope): string
	{
		return array_key_exists($scope, self::labels()) ? $scope : self::DEFAULT;
	}
}
