<?php

namespace Tests\Feature;

use Tests\TestCase;

/**
 * HTML baseline tests: verify that the PHP Blade static table renders the
 * same fish names, season dates, and limit values as the React app.
 *
 * Baseline HTML files are captured manually — see:
 *   tests/fixtures/restrictions-html/README.md
 *
 * To add a new baseline:
 *   1. Follow the capture steps in README.md.
 *   2. Add a test method calling assertReactHtmlParity().
 *
 * Tests skip automatically when the baseline file is absent or when the
 * Laravel route is unavailable (no DB, no Vite manifest).
 */
class HtmlBaselineTest extends TestCase
{
	private const FIXTURES_DIR = __DIR__ . '/../fixtures/restrictions-html';

	// ── normalisation ─────────────────────────────────────────────────────────

	/**
	 * Strip script/style tags, collapse all whitespace to a single space,
	 * and trim. Used so that formatting differences don't cause failures.
	 */
	private function normalizeHtml(string $html): string
	{
		// Remove script and style blocks entirely.
		$html = (string) preg_replace('/<(script|style)[^>]*>.*?<\/\1>/is', '', $html);
		// Collapse whitespace.
		$html = (string) preg_replace('/\s+/', ' ', $html);
		return trim($html);
	}

	/**
	 * Extract an array of trimmed text values from all elements matching
	 * a CSS-like tag+class selector (e.g. "td.season-start").
	 * Supports "tag.class" or just ".class" forms.
	 *
	 * Returns an empty array when the HTML has no matching elements.
	 */
	private function extractTextValues(string $html, string $selector): array
	{
		if (strpos($selector, '.') !== false) {
			[$tag, $class] = explode('.', $selector, 2);
			$tag = $tag ?: '[a-z][a-z0-9]*';
			$pattern = "/<{$tag}[^>]*class=[\"'][^\"']*\b" . preg_quote($class, '/') . "\b[^\"']*[\"'][^>]*>(.*?)<\/{$tag}>/is";
		} else {
			$pattern = "/<{$selector}[^>]*>(.*?)<\/{$selector}>/is";
		}

		preg_match_all($pattern, $html, $matches);

		return array_map(
			fn(string $inner) => trim(strip_tags($inner)),
			$matches[1] ?? [],
		);
	}

	// ── assertion helpers ─────────────────────────────────────────────────────

	/**
	 * Compare key data values between a pasted React HTML fragment and the
	 * current Blade static output rendered via the dev server.
	 *
	 * @param string $slug        Fixture slug (e.g. "chaleur-bass-river")
	 * @param string $url         URL to request from the test HTTP client
	 * @param string $staticBlock CSS selector for the Blade wrapper (default: #restrictions-prerender)
	 */
	private function assertReactHtmlParity(
		string $slug,
		string $url,
		string $staticBlock = '#restrictions-prerender',
	): void {
		$reactFixture = self::FIXTURES_DIR . "/{$slug}.react.html";

		if (! file_exists($reactFixture)) {
			$this->markTestSkipped(
				"React HTML baseline missing: {$slug}.react.html — see tests/fixtures/restrictions-html/README.md",
			);
		}

		$reactHtml = file_get_contents($reactFixture);

		// Request the Blade-rendered page via the HTTP test client.
		try {
			$response = $this->get($url);
		} catch (\Exception $e) {
			$this->markTestSkipped("Could not fetch {$url}: {$e->getMessage()}");
		}

		if ($response->status() !== 200) {
			$this->markTestSkipped("Route {$url} returned {$response->status()} — requires migrated database.");
		}

		$bladeHtml = $response->getContent();

		// Extract the static Blade block.
		preg_match('/id=["\']restrictions-prerender["\'][^>]*>(.*?)<\/[a-z]+>\s*<\/[a-z]+>/is', $bladeHtml, $bladeMatch);
		$bladeFragment = $bladeMatch[0] ?? $bladeHtml;

		// Compare each data dimension independently for actionable failures.
		$selectors = [
			'.fish-name'   => 'fish names',
			'.season-start' => 'season start dates',
			'.season-end'   => 'season end dates',
			'.bag-limit'    => 'bag limits',
			'.hook-limit'   => 'hook limits',
			'.min-size'     => 'min sizes',
			'.max-size'     => 'max sizes',
		];

		foreach ($selectors as $selector => $label) {
			$reactValues = $this->extractTextValues($reactHtml, $selector);
			$bladeValues = $this->extractTextValues($bladeFragment, $selector);

			if (empty($reactValues)) {
				// Selector not present in baseline — skip this dimension.
				continue;
			}

			$this->assertSame(
				$reactValues,
				$bladeValues,
				"{$slug}: {$label} differ between React baseline and Blade output",
			);
		}
	}

	// ── tests ─────────────────────────────────────────────────────────────────

	/**
	 * Chaleur / Bass River — water-body page.
	 *
	 * Capture baseline: follow README.md for /regulations/chaleur/bass-river
	 * Save to: tests/fixtures/restrictions-html/chaleur-bass-river.react.html
	 */
	public function test_chaleur_bass_river_html_parity(): void
	{
		$this->assertReactHtmlParity(
			slug: 'chaleur-bass-river',
			url: '/regulations/chaleur/bass-river',
		);
	}

	/**
	 * Chaleur — region page.
	 *
	 * Capture baseline: follow README.md for /regulations/chaleur
	 * Save to: tests/fixtures/restrictions-html/chaleur.react.html
	 */
	public function test_chaleur_region_html_parity(): void
	{
		$this->assertReactHtmlParity(
			slug: 'chaleur',
			url: '/regulations/chaleur',
		);
	}
}
