<?php

namespace Tests\Unit;

use App\Support\SiteHeaderHtml;
use Tests\TestCase;

class SiteHeaderHtmlTest extends TestCase
{
	public function test_render_includes_redesign_nav(): void
	{
		$html = SiteHeaderHtml::render();

		$this->assertStringContainsString('RedesignNav', $html);
		$this->assertStringNotContainsString('PublicFooter', $html);
	}

	public function test_render_includes_mobile_menu_markup(): void
	{
		$html = SiteHeaderHtml::render();

		$this->assertStringContainsString('RedesignNav-menuBtn', $html);
		$this->assertStringContainsString('RedesignNav-mobile', $html);
		$this->assertStringContainsString('data-redesign-nav-toggle', $html);
		$this->assertStringContainsString('aria-expanded="false"', $html);
		$this->assertStringContainsString('Waters Map', $html);
		$this->assertStringContainsString('Regulations', $html);
		$this->assertStringContainsString('Search', $html);
		$this->assertStringContainsString('Calendar', $html);
	}
}
