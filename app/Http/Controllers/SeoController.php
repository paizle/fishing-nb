<?php

namespace App\Http\Controllers;

use App\Services\DirectoryNavBuilder;
use App\Services\SeoFileGenerator;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class SeoController extends Controller
{
	public function __construct(
		protected DirectoryNavBuilder $directoryNav,
		protected SeoFileGenerator $seoFiles,
	) {
	}

	public function sitemap(): BinaryFileResponse
	{
		$path = $this->seoFiles->ensureSitemap($this->directoryNav);

		return response()->file($path, [
			'Content-Type' => 'application/xml; charset=UTF-8',
		]);
	}

	public function robots(): BinaryFileResponse
	{
		$path = $this->seoFiles->ensureRobots();

		return response()->file($path, [
			'Content-Type' => 'text/plain; charset=UTF-8',
		]);
	}
}
