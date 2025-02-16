<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Middleware\CacheIfModifiedSinceMiddleware;

Route::controller(ApiController::class)
	->middleware(CacheIfModifiedSinceMiddleware::class)
	->group(function () {
		Route::get('/locations', 'locations')->name('locations');
		Route::get('/fishes', 'fishes')->name('fishes');
		Route::get(
			'/fishByLocation/{region_id}/{water_id}/{fish_id}',
			'fishByLocation'
		)->name('fishByLocation');
	});
