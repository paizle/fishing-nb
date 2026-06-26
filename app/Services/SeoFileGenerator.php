<?php

namespace App\Services;

class SeoFileGenerator
{
	public function sitemapPath(): string
	{
		return public_path('sitemap.xml');
	}

	public function robotsPath(): string
	{
		return public_path('robots.txt');
	}

	public function ensureSitemap(DirectoryNavBuilder $directoryNav): string
	{
		$path = $this->sitemapPath();

		if (! is_file($path)) {
			$this->writeSitemap($directoryNav, $path);
		}

		return $path;
	}

	public function ensureRobots(): string
	{
		$path = $this->robotsPath();

		if (! is_file($path)) {
			$this->writeRobots($path);
		}

		return $path;
	}

	public function writeSitemap(DirectoryNavBuilder $directoryNav, ?string $path = null): void
	{
		$path ??= $this->sitemapPath();
		$entries = $directoryNav->sitemapEntries();

		$xml = view('seo.sitemap', ['entries' => $entries])->render();

		file_put_contents($path, $xml);
	}

	public function writeRobots(?string $path = null): void
	{
		$path ??= $this->robotsPath();

		$content = view('seo.robots', [
			'sitemapUrl' => url('/sitemap.xml'),
		])->render();

		file_put_contents($path, $content);
	}
}
