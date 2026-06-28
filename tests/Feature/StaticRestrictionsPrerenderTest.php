<?php

namespace Tests\Feature;

use Tests\Concerns\UsesMySqlDatabase;
use Tests\TestCase;

class StaticRestrictionsPrerenderTest extends TestCase
{
	use UsesMySqlDatabase;

	public function test_homepage_does_not_render_restrictions_prerender(): void
	{
		$response = $this->get('/');

		$response->assertOk();
		$response->assertDontSee('id="restrictions-prerender"', false);
	}

	public function test_search_page_does_not_render_restrictions_prerender(): void
	{
		$response = $this->get('/search');

		$response->assertOk();
		$response->assertDontSee('id="restrictions-prerender"', false);
	}

	public function test_unknown_region_returns_404(): void
	{
		$this->get('/regulations/not-a-real-region-slug')->assertNotFound();
	}

	public function test_legacy_fish_url_redirects_to_regulations(): void
	{
		$this->get('/fish/chaleur')
			->assertRedirect('/regulations/chaleur');
	}

	public function test_location_page_renders_restrictions_prerender_when_region_exists(): void
	{
		$response = $this->get('/regulations/chaleur');

		$response->assertOk();
		$response->assertSee('id="restrictions-prerender"', false);
		$response->assertSee('Fishing restrictions', false);
	}
}
