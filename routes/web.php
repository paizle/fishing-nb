<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name(
        'profile.edit'
    );
    Route::patch('/profile', [ProfileController::class, 'update'])->name(
        'profile.update'
    );
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name(
        'profile.destroy'
    );
});

Route::controller(PublicController::class)->group(function () {
    Route::get('/', 'index')->name('root.page');
    
    Route::get('/map', 'map')->name('location.map');
    Route::get('/region/{id}', 'region')->name('location.region');
    Route::get('/water/{id}', 'water')->name('location.water');

    Route::get('/fishes', 'fishes')->name('fish.fishes');
    Route::get('/fish/{id}', 'fish')->name('fish.fish');

    Route::get('/settings', 'settings')->name('settings.edit');
});

require __DIR__ . '/auth.php';
