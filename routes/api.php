<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\RulesController;

// -------------------------------------------------------------------------
// Catalog — reference data for combobox, map, fish picker (JSON).
// -------------------------------------------------------------------------
Route::controller(ApiController::class)->group(function () {
	Route::get('/regions', 'regions')->name('api.regions');
	Route::get('/locations', 'locations')->name('api.locations');
	Route::get('/fishes', 'fishes')->name('api.fishes');
});

// -------------------------------------------------------------------------
// Rules — fishing restrictions for a region/water (JSON).
// Query params: region (required slug), water (optional slug).
// -------------------------------------------------------------------------
Route::controller(RulesController::class)->group(function () {
	Route::get('/rules', 'index')->name('api.rules');
	Route::get('/rule/{fish_id}', 'show')->whereNumber('fish_id')->name('api.rule');
});
