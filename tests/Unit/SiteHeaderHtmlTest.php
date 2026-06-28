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
}
