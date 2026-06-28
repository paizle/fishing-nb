<?php



namespace Tests\Feature;



use Tests\Concerns\UsesMySqlDatabase;

use Tests\TestCase;



class SeoDirectoryTest extends TestCase

{

	use UsesMySqlDatabase;



	public function test_robots_txt_points_to_sitemap_and_disallows_search_queries(): void

	{

		@unlink(public_path('robots.txt'));



		$response = $this->get('/robots.txt');



		$response->assertOk();

		$this->assertFileExists(public_path('robots.txt'));



		$content = file_get_contents(public_path('robots.txt'));

		$this->assertStringContainsString('User-agent: *', $content);

		$this->assertStringContainsString('Disallow: /search?', $content);

		$this->assertStringContainsString('Sitemap:', $content);

		$this->assertStringContainsString('/sitemap.xml', $content);

	}



	public function test_sitemap_includes_home_search_and_location_urls(): void

	{

		@unlink(public_path('sitemap.xml'));



		$response = $this->get('/sitemap.xml');



		$response->assertOk();

		$response->assertHeader('Content-Type', 'application/xml; charset=UTF-8');

		$this->assertFileExists(public_path('sitemap.xml'));



		$content = file_get_contents(public_path('sitemap.xml'));

		$this->assertStringContainsString(url('/'), $content);

		$this->assertStringContainsString(url('/regulations'), $content);

		$this->assertStringContainsString(url('/search'), $content);

		$this->assertStringContainsString('/regulations/chaleur', $content);

	}



	public function test_homepage_is_static_with_design_and_crawlable_links(): void

	{

		$response = $this->get('/');



		$response->assertOk();

		$response->assertSee('New Brunswick Fishing Regulations Made Simple', false);

		$response->assertSee('Find Regulations Fast', false);

		$response->assertSee('Regulations by Species', false);

		$response->assertSee('Browse by region', false);

		$response->assertSee('href="' . url('/regulations/chaleur') . '"', false);

		$response->assertDontSee('@inertia', false);

	}



	public function test_regulations_page_lists_regions_and_loads_spa(): void

	{

		$response = $this->get('/regulations');



		$response->assertOk();

		$response->assertSee('id="regulations-entry"', false);

		$response->assertSee('Fishing regulations by region', false);

		$response->assertSee('href="' . url('/regulations/chaleur') . '"', false);

		$response->assertSee('id="app"', false);

		$response->assertSee('&quot;component&quot;:&quot;Public\/SmartFish\/SmartFish&quot;', false);

	}



	public function test_search_page_is_standalone_blade_with_form_and_directory_nav(): void

	{

		$response = $this->get('/search');



		$response->assertOk();

		$response->assertSee('Search fishing regulations', false);

		$response->assertSee('method="get"', false);

		$response->assertSee('action="' . url('/search') . '"', false);

		$response->assertSee('Browse by region', false);

		$response->assertDontSee('@inertia', false);

	}



	public function test_search_with_query_renders_result_links(): void

	{

		$response = $this->get('/search?q=chaleur&scope=region');



		$response->assertOk();

		$response->assertSee('Results for', false);

		$response->assertSee('/regulations/chaleur', false);

	}



	public function test_region_page_includes_breadcrumb_and_water_links(): void

	{

		$response = $this->get('/regulations/chaleur');



		$response->assertOk();

		$response->assertSee('id="restrictions-prerender"', false);

		$response->assertSee('static-breadcrumb', false);

		$response->assertSee('Waterbodies in Chaleur', false);

		$response->assertSee('rel="canonical"', false);

	}

}


