<?php

namespace Tests\Feature;

use Tests\TestCase;

class VerifySourceTest extends TestCase
{
	public function test_verify_source_renders_pdf_iframe(): void
	{
		$response = $this->get('/verify-source?page=12&table=Table%201&row=Row%20A');

		$response->assertOk();
		$response->assertSee('<iframe class="verify-pdf"', false);
		$response->assertSee('/regulations/Fish.pdf#page=12', false);
	}
}
