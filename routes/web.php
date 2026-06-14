<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicController;
use App\Http\Controllers\SmartFishController;

Route::get('/dashboard', function () {
	return Inertia::render('Dashboard');
})
	->middleware(['auth', 'verified'])
	->name('dashboard');

Route::middleware('auth')->group(function () {
	Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
	Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
	Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// -------------------------------------------------------------------------
// Smart Fish — main app page (Inertia + React via SmartFishController).
// Region/water slugs in the path drive page state; see laravel-web-server/ROUTING.md.
// -------------------------------------------------------------------------
Route::controller(SmartFishController::class)->group(function () {
	Route::get('/', 'index')->name('smart_fish.page');
	Route::get('/fish/{region}/{water}', 'fishLocation')->name('fish.region.water');
	Route::get('/fish/{region}', 'fishLocation')->name('fish.region');
});

Route::controller(PublicController::class)->group(function () {
	Route::get('/settings', 'settings')->name('settings.edit');
	Route::get('/waters-map', 'waters_map')->name('maps.waters');
});

// -------------------------------------------------------------------------
// Non-Inertia web routes — Blade utilities (no React shell).
// -------------------------------------------------------------------------
Route::get('/verify-source', [PublicController::class, 'verifySource'])
	->name('verify.source');

require __DIR__ . '/auth.php';
