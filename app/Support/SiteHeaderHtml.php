<?php

namespace App\Support;

class SiteHeaderHtml
{
	public static function render(): string
	{
		return view('partials.public.nav')->render();
	}
}
