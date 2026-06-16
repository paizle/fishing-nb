<?php

namespace Tests\Unit;

use App\Support\VerifySourcePdfViewer;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class VerifySourcePdfViewerTest extends TestCase
{
	#[DataProvider('pdfJsUserAgents')]
	public function test_needs_pdf_js_for_listed_browsers(string $userAgent): void
	{
		$this->assertTrue(VerifySourcePdfViewer::needsPdfJs($userAgent));
	}

	public static function pdfJsUserAgents(): array
	{
		return [
			'android chrome' => [
				'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
			],
		];
	}

	#[DataProvider('nativePdfUserAgents')]
	public function test_uses_iframe_for_browsers_not_in_list(string $userAgent): void
	{
		$this->assertFalse(VerifySourcePdfViewer::needsPdfJs($userAgent));
	}

	public static function nativePdfUserAgents(): array
	{
		return [
			'desktop chrome' => [
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
			],
			'desktop firefox' => [
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
			],
			'ios safari' => [
				'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
			],
			'android firefox' => [
				'Mozilla/5.0 (Android 14; Mobile; rv:121.0) Gecko/121.0 Firefox/121.0',
			],
		];
	}

	public function test_empty_user_agent_uses_iframe(): void
	{
		$this->assertFalse(VerifySourcePdfViewer::needsPdfJs(null));
		$this->assertFalse(VerifySourcePdfViewer::needsPdfJs(''));
	}
}
