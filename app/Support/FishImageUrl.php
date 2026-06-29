<?php

namespace App\Support;

class FishImageUrl
{
	/**
	 * Public fish illustration URL. Slug logic matches resources/js/Util/getFishImageSrc.js.
	 */
	public static function fromName(string $fishName): string
	{
		$slug = strtolower(str_replace(' ', '-', $fishName));

		return asset("images/fish/{$slug}.png");
	}
}
