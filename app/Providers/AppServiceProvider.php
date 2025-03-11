<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use App\Services\FishService;

class AppServiceProvider extends ServiceProvider
{
	/**
	 * Register any application services.
	 */
	public function register(): void
	{
		$this->app->singleton(FishService::class, function ($app) {
			return new FishService();
		});
	}

	/**
	 * Bootstrap any application services.
	 */
	public function boot(): void
	{
		Schema::defaultStringLength(191);
		Vite::prefetch(concurrency: 3);
	}
}
