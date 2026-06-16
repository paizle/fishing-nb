<?php

namespace Tests\Feature;

use Tests\TestCase;

class VerifySourceTest extends TestCase
{
	private const ANDROID_CHROME_UA =
		'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36';

	private const DESKTOP_CHROME_UA =
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

	public function test_verify_source_uses_pdf_js_on_android_chrome(): void
	{
		$response = $this->withHeader('User-Agent', self::ANDROID_CHROME_UA)->get(
			'/verify-source?page=12&table=Table%201&row=Row%20A',
		);

		$response->assertOk();
		$response->assertSee('id="pdf-viewport"', false);
		$response->assertSee('pdf.worker.mjs', false);
		$response->assertSee('Open PDF directly', false);
		$response->assertDontSee('<iframe class="verify-pdf"', false);
	}

	public function test_verify_source_uses_iframe_on_desktop_chrome(): void
	{
		$response = $this->withHeader('User-Agent', self::DESKTOP_CHROME_UA)->get(
			'/verify-source?page=12&table=Table%201&row=Row%20A',
		);

		$response->assertOk();
		$response->assertSee('<iframe class="verify-pdf"', false);
		$response->assertDontSee('id="pdf-viewport"', false);
	}
}
