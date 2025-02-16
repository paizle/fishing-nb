<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CacheIfModifiedSinceMiddleware
{
	public function handle(Request $request, Closure $next)
	{
		// Define the last modification time (can be dynamic based on your data)

		$cache_date = new \DateTime();
		$cache_date->setDate(2025, 2, 16);
		$cache_date->setTime(1, 0, 0);

		// Check if the request contains 'If-Modified-Since' header
		if ($request->hasHeader('If-Modified-Since')) {
			$header = $request->header('If-Modified-Since');
			$modified_since = (new \DateTime())->setTimestamp(
				strtotime($header)
			);

			if ($cache_date == $modified_since) {
				return response(null, Response::HTTP_NOT_MODIFIED);
			}
		}

		// Proceed with the request and get the response
		$response = $next($request);

		$last_modified = $cache_date->format('D, d M Y H:i:s') . ' GMT';
		// Add 'Last-Modified' header to the response
		if ($response->status() === 200) {
			$response->header('Cache-Control', 'no-cache');
			$response->header('Last-Modified', $last_modified);
		}

		return $response;
	}
}
