<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	public function up(): void
	{
		if (!Schema::hasColumn('fishing_restrictions', 'source_page')) {
			Schema::table('fishing_restrictions', function (Blueprint $table) {
				$table->unsignedInteger('source_page')->nullable();
				$table->string('source_location', 255)->nullable();
			});
		}
	}

	public function down(): void
	{
		if (Schema::hasColumn('fishing_restrictions', 'source_page')) {
			Schema::table('fishing_restrictions', function (Blueprint $table) {
				$table->dropColumn(['source_page', 'source_location']);
			});
		}
	}
};
