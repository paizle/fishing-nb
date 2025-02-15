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
        $lastModifiedTime = strtotime('2025-02-15 12:00:00'); 

        // Check if the request contains 'If-Modified-Since' header
        if ($request->hasHeader('If-Modified-Since')) {
            $ifModifiedSince = strtotime($request->header('If-Modified-Since'));

            if ($ifModifiedSince >= $lastModifiedTime) {
                return response(null, Response::HTTP_NOT_MODIFIED);
            }
        }

        // Proceed with the request and get the response
        $response = $next($request);

        // Add 'Last-Modified' header to the response
        if ($response->status() === 200) {
            $response->header('Last-Modified', gmdate('D, d M Y H:i:s', $lastModifiedTime) . ' GMT');
        }

        return $response;
    }
}
