<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	public function up(): void
	{
		Schema::table('fishing_restrictions', function (Blueprint $table) {
			if (Schema::hasColumn('fishing_restrictions', 'source_location')) {
				$table->dropColumn('source_location');
			}
		});

		Schema::table('fishing_restrictions', function (Blueprint $table) {
			if (!Schema::hasColumn('fishing_restrictions', 'source_table')) {
				$table->text('source_table')->nullable()->after('source_page');
			}
			if (!Schema::hasColumn('fishing_restrictions', 'source_row')) {
				$table->text('source_row')->nullable()->after('source_table');
			}
		});
	}

	public function down(): void
	{
		Schema::table('fishing_restrictions', function (Blueprint $table) {
			if (Schema::hasColumn('fishing_restrictions', 'source_table')) {
				$table->dropColumn('source_table');
			}
			if (Schema::hasColumn('fishing_restrictions', 'source_row')) {
				$table->dropColumn('source_row');
			}
		});

		Schema::table('fishing_restrictions', function (Blueprint $table) {
			if (!Schema::hasColumn('fishing_restrictions', 'source_location')) {
				$table->string('source_location', 255)->nullable()->after('source_page');
			}
		});
	}
};
