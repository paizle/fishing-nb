<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CalendarController;
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
// Smart Fish — Blade marketing pages + Inertia regulations app.
// Location slugs: /regulations/{region}/{water?}. See laravel-web-server/ROUTING.md.
// -------------------------------------------------------------------------
Route::redirect('/home', '/', 301);

Route::controller(SmartFishController::class)->group(function () {
	Route::get('/', 'index')->name('smart_fish.page');
	Route::get('/search', 'search')->name('search.page');
	Route::get('/regulations/{region}/{water}', 'fishLocation')->name('regulations.region.water');
	Route::get('/regulations/{region}', 'fishLocation')->name('regulations.region');
	Route::get('/regulations', 'regulations')->name('regulations.page');
});

Route::get('/fish/{region}/{water}', function (string $region, string $water) {
	return redirect()->route('regulations.region.water', ['region' => $region, 'water' => $water], 301);
});

Route::get('/fish/{region}', function (string $region) {
	return redirect()->route('regulations.region', ['region' => $region], 301);
});

Route::controller(PublicController::class)->group(function () {
	Route::get('/settings', 'settings')->name('settings.edit');
	Route::get('/waters-map', 'waters_map')->name('maps.waters');
});

Route::controller(\App\Http\Controllers\SeoController::class)->group(function () {
	Route::get('/sitemap.xml', 'sitemap')->name('sitemap');
	Route::get('/robots.txt', 'robots')->name('robots');
});

// -------------------------------------------------------------------------
// Non-Inertia web routes — Blade utilities (no React shell).
// -------------------------------------------------------------------------
Route::get('/regulations/Fish.pdf', [PublicController::class, 'regulationPdf'])
	->name('regulations.fish_pdf');

Route::get('/verify-source', [PublicController::class, 'verifySource'])
	->name('verify.source');

Route::get('/calendar', [CalendarController::class, 'index'])
	->name('calendar.page');

require __DIR__ . '/auth.php';
