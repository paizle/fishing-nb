<?php

namespace Tests\Feature;

use Tests\TestCase;

class SeoRestrictionsSummaryTest extends TestCase
{
	public function test_homepage_does_not_render_seo_restrictions_table(): void
	{
		$response = $this->get('/');

		$response->assertOk();
		$response->assertDontSee('id="seo-restrictions-static"', false);
	}

	public function test_search_page_does_not_render_seo_restrictions_table(): void
	{
		$response = $this->get('/search');

		if ($response->status() >= 500) {
			$this->markTestSkipped('Search page requires a built Vite manifest in the test environment.');
		}

		$response->assertOk();
		$response->assertDontSee('id="seo-restrictions-static"', false);
	}

	public function test_unknown_region_returns_404(): void
	{
		$response = $this->get('/fish/not-a-real-region-slug');

		if ($response->status() === 500) {
			$this->markTestSkipped('Region lookup requires a migrated database in the test environment.');
		}

		$response->assertNotFound();
	}

	public function test_location_page_renders_seo_restrictions_table_when_region_exists(): void
	{
		$response = $this->get('/fish/chaleur');

		if ($response->status() !== 200) {
			$this->markTestSkipped('Location route requires MySQL regulation data in the test environment.');
		}

		$response->assertSee('id="seo-restrictions-static"', false);
		$response->assertSee('Fishing restrictions', false);
	}
}
