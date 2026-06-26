<?php

namespace Database\Seeders;

use App\Services\SeasonStatusMaterializer;
use Illuminate\Database\Seeder;

class SeasonStatusDailySeeder extends Seeder
{
	public function run(SeasonStatusMaterializer $materializer): void
	{
		$result = $materializer->materialize();

		$this->command?->info(sprintf(
			'SeasonStatusDailySeeder: %d rows for regulation year %d.',
			$result['rows'],
			$result['year'],
		));
	}
}
