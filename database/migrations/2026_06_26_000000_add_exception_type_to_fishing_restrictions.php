<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	public function up(): void
	{
		if (!Schema::hasColumn('fishing_restrictions', 'exception_type')) {
			Schema::table('fishing_restrictions', function (Blueprint $table) {
				$table->enum('exception_type', ['exclusive', 'specifier'])
					->nullable()
					->after('hook_release_limit');
			});
		}

		if (Schema::hasColumn('fishing_restrictions', 'is_restriction')) {
			Schema::table('fishing_restrictions', function (Blueprint $table) {
				$table->dropColumn('is_restriction');
			});
		}

		if (Schema::hasColumn('fishing_restrictions', 'is_exception')) {
			Schema::table('fishing_restrictions', function (Blueprint $table) {
				$table->dropColumn('is_exception');
			});
		}
	}

	public function down(): void
	{
		if (Schema::hasColumn('fishing_restrictions', 'exception_type')) {
			Schema::table('fishing_restrictions', function (Blueprint $table) {
				$table->dropColumn('exception_type');
			});
		}

		if (!Schema::hasColumn('fishing_restrictions', 'is_restriction')) {
			Schema::table('fishing_restrictions', function (Blueprint $table) {
				$table->boolean('is_restriction')->default(false);
			});
		}

		if (!Schema::hasColumn('fishing_restrictions', 'is_exception')) {
			Schema::table('fishing_restrictions', function (Blueprint $table) {
				$table->boolean('is_exception')->default(false);
			});
		}
	}
};
