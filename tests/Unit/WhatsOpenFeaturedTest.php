<?php

namespace Tests\Unit;

use App\Support\WhatsOpenFeatured;
use Tests\TestCase;

class WhatsOpenFeaturedTest extends TestCase
{
	private static function entry(
		string $fishName,
		string $status,
		string $statusLabel,
		string $statusClass,
		int $fishId = 1,
	): array {
		return [
			'fishId' => $fishId,
			'fishName' => $fishName,
			'status' => $status,
			'statusLabel' => $statusLabel,
			'statusClass' => $statusClass,
		];
	}

	public function test_pick_featured_rows_returns_five_groups_in_fixed_order(): void
	{
		$rows = WhatsOpenFeatured::pickFeaturedRows([
			self::entry('Lake Trout', 'open', 'Open', 'open', 20),
			self::entry('Brook Trout', 'closed', 'Closed', 'closed', 18),
			self::entry('Smallmouth Bass', 'open', 'Open', 'open', 16),
		]);

		$this->assertSame([
			'Trout',
			'Smallmouth Bass',
			'Non-Sport Fish',
			'Landlocked Salmon',
			'Atlantic Salmon',
		], array_column($rows, 'fishName'));
	}

	public function test_trout_group_rollup_prefers_open_over_closed(): void
	{
		$rows = WhatsOpenFeatured::pickFeaturedRows([
			self::entry('Lake Trout', 'open', 'Open', 'open', 20),
			self::entry('Brook Trout', 'closed', 'Closed', 'closed', 18),
		]);

		$this->assertSame('Open', $rows[0]['statusLabel']);
		$this->assertSame('open', $rows[0]['statusClass']);
	}

	public function test_merge_statuses_prefers_open_over_catch_release_and_closed(): void
	{
		$merged = WhatsOpenFeatured::mergeStatuses([
			self::entry('Bright Salmon', 'closed', 'Closed', 'closed', 1),
			self::entry('Spring Kelt', 'catch_release', 'Catch & release', 'catch-release', 2),
			self::entry('Brook Trout', 'open', 'Open', 'open', 18),
		]);

		$this->assertSame('open', $merged['status']);
	}

	public function test_merge_statuses_prefers_catch_release_over_closed(): void
	{
		$merged = WhatsOpenFeatured::mergeStatuses([
			self::entry('Bright Salmon', 'closed', 'Closed', 'closed', 1),
			self::entry('Spring Kelt', 'catch_release', 'Catch & release', 'catch-release', 2),
		]);

		$this->assertSame('catch_release', $merged['status']);
	}

	public function test_atlantic_salmon_rollup_uses_winning_status_labels(): void
	{
		$rows = WhatsOpenFeatured::pickFeaturedRows([
			self::entry('Bright Salmon', 'closed', 'Closed', 'closed', 1),
			self::entry('Spring Kelt', 'catch_release', 'Catch & release', 'catch-release', 2),
		]);

		$this->assertSame('Catch & release', $rows[4]['statusLabel']);
		$this->assertSame('catch-release', $rows[4]['statusClass']);
	}

	public function test_atlantic_salmon_rollup_uses_method_label_from_winning_entry(): void
	{
		$rows = WhatsOpenFeatured::pickFeaturedRows([
			self::entry('Bright Salmon', 'catch_release', 'Fly Fishing', 'catch-release', 1),
			self::entry('Spring Kelt', 'closed', 'Closed', 'closed', 2),
		]);

		$this->assertSame('Fly Fishing', $rows[4]['statusLabel']);
	}

	public function test_missing_fish_defaults_to_closed(): void
	{
		$rows = WhatsOpenFeatured::pickFeaturedRows([]);

		$this->assertCount(5, $rows);
		$this->assertSame('Closed', $rows[0]['statusLabel']);
		$this->assertSame('closed', $rows[0]['statusClass']);
	}
}
