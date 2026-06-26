<?php

namespace App\Console\Commands;

use App\Services\SeasonStatusMaterializer;
use Illuminate\Console\Command;

class MaterializeSeasonStatusCommand extends Command
{
	protected $signature = 'season-status:materialize {--year= : Regulation year (defaults to config fishing.regulation_year)}';

	protected $description = 'Populate season_status_daily from primary fishing restrictions';

	public function handle(SeasonStatusMaterializer $materializer): int
	{
		$yearOption = $this->option('year');
		$year = $yearOption !== null && $yearOption !== '' ? (int) $yearOption : null;

		$result = $materializer->materialize($year);

		$this->info(sprintf(
			'Materialized %d rows for %d fish (%d).',
			$result['rows'],
			$result['fish'],
			$result['year'],
		));

		return self::SUCCESS;
	}
}
