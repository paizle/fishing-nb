<?php

namespace App\Support;

/**
 * Browsers that cannot show PDFs inline in an iframe need PDF.js on verify-source.
 *
 * Add a PCRE pattern to PDF_JS_USER_AGENT_PATTERNS when another browser needs the fallback.
 */
class VerifySourcePdfViewer
{
	/**
	 * @var list<string> Case-insensitive PCRE patterns matched against User-Agent.
	 */
	public const PDF_JS_USER_AGENT_PATTERNS = [
		'/Android.*Chrome/i', // Android Chrome downloads PDFs in iframes
	];

	public static function needsPdfJs(?string $userAgent): bool
	{
		if ($userAgent === null || $userAgent === '') {
			return false;
		}

		foreach (self::PDF_JS_USER_AGENT_PATTERNS as $pattern) {
			if (preg_match($pattern, $userAgent) === 1) {
				return true;
			}
		}

		return false;
	}
}
