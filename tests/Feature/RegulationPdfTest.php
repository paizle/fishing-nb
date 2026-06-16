<?php

namespace Tests\Feature;

use Tests\TestCase;

class RegulationPdfTest extends TestCase
{
	public function test_regulation_pdf_is_served_inline(): void
	{
		$path = public_path('regulations/Fish.pdf');
		if (! is_file($path)) {
			$this->markTestSkipped('Fish.pdf is not present in public/regulations.');
		}

		$response = $this->get('/regulations/Fish.pdf');

		$response->assertOk();
		$response->assertHeader('Content-Type', 'application/pdf');

		$disposition = $response->headers->get('Content-Disposition');
		$this->assertNotNull($disposition);
		$this->assertStringContainsString('inline', $disposition);
		$this->assertStringContainsString('Fish.pdf', $disposition);
	}
}
