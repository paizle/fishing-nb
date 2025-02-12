<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

Route::controller(ApiController::class)->group(function () {
	Route::get('/locations', 'locations')->name('locations');
	Route::get('/fishes', 'fishes')->name('fishes');

	Route::get(
		'/fishByLocation/{region_id}/{water_id}/{fish_id}',
		'fishByLocation'
	)->name('fishByLocation');
});
