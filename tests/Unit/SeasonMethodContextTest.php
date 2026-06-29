<?php

namespace Tests\Unit;

use App\Models\SeasonStatusDaily\SeasonStatus;
use App\Restrictions\NormalizedRecord;
use App\Support\SeasonMethodContext;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use PHPUnit\Framework\TestCase;

class SeasonMethodContextTest extends TestCase
{
	private static function d(string $iso): Carbon
	{
		return Carbon::createFromFormat('Y-m-d', $iso, 'UTC')->setTime(12, 0, 0);
	}

	private static function record(array $overrides): NormalizedRecord
	{
		return new NormalizedRecord(
			id: $overrides['id'],
			fishId: $overrides['fishId'] ?? null,
			fishName: $overrides['fishName'] ?? '',
			waterId: $overrides['waterId'] ?? null,
			exceptionType: $overrides['exceptionType'] ?? null,
			seasonStart: $overrides['seasonStart'] ?? null,
			seasonEnd: $overrides['seasonEnd'] ?? null,
			bagLimit: $overrides['bagLimit'] ?? null,
			hookLimit: $overrides['hookLimit'] ?? null,
			minSize: $overrides['minSize'] ?? null,
			maxSize: $overrides['maxSize'] ?? null,
			fishingMethod: $overrides['fishingMethod'] ?? '',
			tidal: $overrides['tidal'] ?? '',
			water: $overrides['water'] ?? '',
			watersCategory: $overrides['watersCategory'] ?? '',
			boundary: $overrides['boundary'] ?? '',
			waterDescription: $overrides['waterDescription'] ?? '',
			note: $overrides['note'] ?? null,
			sourcePage: null,
			sourceTable: null,
			sourceRow: null,
		);
	}

	public function test_returns_fly_fishing_when_matching_exception_is_active(): void
	{
		$primary = self::record([
			'id' => 69,
			'fishId' => 1,
			'seasonStart' => self::d('2026-05-16'),
			'seasonEnd' => self::d('2026-10-29'),
			'waterId' => 3,
			'bagLimit' => 0,
			'hookLimit' => 2,
			'fishingMethod' => 'Fly Fishing',
		]);

		$exception = self::record([
			'id' => 107,
			'fishId' => 1,
			'exceptionType' => 'specifier',
			'seasonStart' => self::d('2026-05-01'),
			'seasonEnd' => self::d('2026-09-15'),
			'waterId' => 3,
			'fishingMethod' => 'Fly Fishing',
		]);

		$context = SeasonMethodContext::fromCollections(
			collect([1 => [$primary]]),
			collect([1 => [$exception]]),
		);

		$label = $context->methodLabelFor(1, self::d('2026-06-01'), SeasonStatus::CATCH_RELEASE);

		$this->assertSame('Fly Fishing', $label);
	}

	public function test_returns_null_when_status_is_closed(): void
	{
		$context = SeasonMethodContext::fromCollections(collect(), collect());

		$this->assertNull($context->methodLabelFor(1, self::d('2026-06-01'), SeasonStatus::CLOSED));
	}

	public function test_null_bag_with_hook_limit_counts_as_catch_release(): void
	{
		$primary = self::record([
			'id' => 250,
			'fishId' => 1,
			'seasonStart' => self::d('2026-01-01'),
			'seasonEnd' => self::d('2026-12-31'),
			'waterId' => 98,
			'bagLimit' => null,
			'hookLimit' => 4,
		]);

		$context = SeasonMethodContext::fromCollections(
			collect([1 => [$primary]]),
			collect(),
		);

		$label = $context->methodLabelFor(1, self::d('2026-06-29'), SeasonStatus::CATCH_RELEASE);

		$this->assertNull($label);
	}
}
