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

	public function test_regulation_pdf_is_served_before_region_route(): void
	{
		$pdfPath = storage_path('app/regulations/Fish.pdf');

		if (! is_file($pdfPath)) {
			$this->markTestSkipped('Fish.pdf not present at storage/app/regulations/Fish.pdf');
		}

		$response = $this->get('/regulations/Fish.pdf');

		$response->assertOk();
		$response->assertHeader('content-type', 'application/pdf');
	}
}
