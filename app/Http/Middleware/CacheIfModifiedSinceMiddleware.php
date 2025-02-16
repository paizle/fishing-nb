<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CacheIfModifiedSinceMiddleware
{
	public function handle(Request $request, Closure $next)
	{

		$api_last_modified = config('app.api_last_modified');

		if (!$api_last_modified) {
			$response = $next($request);
		} else {

			$cache_date = (new \DateTime())->setTimestamp(strtotime($api_last_modified));
			$etag = md5($cache_date->format('D, d M Y H:i:s') . ' GMT');
			$match = $request->headers->get('If-None-Match');
			if ($match === $etag) {
				return response()->noContent(304)->header('ETag', $etag);
			}

			// Proceed with the request and get the response
			$response = $next($request);

			if ($response->status() === 200) {
				$response->header('Cache-Control', 'public, stale-while-revalidate=86400');
				$response->header('ETag', $etag);
			}
		}

		return $response;
	}
}
