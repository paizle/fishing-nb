<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;

Route::controller(ApiController::class)->group(function () {
    Route::get('/locations', 'locations')->name('locations');
});

