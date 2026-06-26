<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	public function up(): void
	{
		Schema::create('season_status_daily', function (Blueprint $table) {
			$table->id();
			$table->unsignedSmallInteger('regulation_year');
			$table->date('calendar_date');
			$table->foreignId('fish_id')->constrained('fish')->cascadeOnDelete();
			$table->enum('status', ['open', 'catch_release', 'closed']);
			$table->unsignedTinyInteger('sort_order')->nullable();
			$table->timestamps();

			$table->unique(['calendar_date', 'fish_id'], 'uq_season_status_date_fish');
			$table->index('calendar_date', 'ix_season_status_date');
			$table->index('regulation_year', 'ix_season_status_year');
		});
	}

	public function down(): void
	{
		Schema::dropIfExists('season_status_daily');
	}
};
