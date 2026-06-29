<?php

namespace Tests\Unit;

use App\Support\WhatsOpenNow;
use Tests\TestCase;

class WhatsOpenNowTest extends TestCase
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

	public function test_rows_returns_five_labels_in_config_order(): void
	{
		$this->assertSame([
			'Atlantic Salmon',
			'Landlocked Salmon',
			'Trout',
			'Smallmouth Bass',
			'Non-Sport Fish',
		], array_column(WhatsOpenNow::rows(), 'label'));
	}

	public function test_pick_rows_returns_labels_in_config_order(): void
	{
		$rows = WhatsOpenNow::pickRows([
			self::entry('Lake Trout', 'open', 'Open', 'open', 20),
			self::entry('Brook Trout', 'closed', 'Closed', 'closed', 18),
			self::entry('Smallmouth Bass', 'open', 'Open', 'open', 16),
		]);

		$this->assertSame([
			'Atlantic Salmon',
			'Landlocked Salmon',
			'Trout',
			'Smallmouth Bass',
			'Non-Sport Fish',
		], array_column($rows, 'fishName'));
	}

	public function test_trout_row_merges_member_species(): void
	{
		$rows = WhatsOpenNow::pickRows([
			self::entry('Lake Trout', 'open', 'Open', 'open', 20),
			self::entry('Brook Trout', 'closed', 'Closed', 'closed', 18),
		]);

		$this->assertSame('Open', $rows[2]['statusLabel']);
		$this->assertSame('open', $rows[2]['statusClass']);
	}

	public function test_merge_statuses_prefers_open_over_catch_release_and_closed(): void
	{
		$merged = WhatsOpenNow::mergeStatuses([
			self::entry('Bright Salmon', 'closed', 'Closed', 'closed', 1),
			self::entry('Spring Kelt', 'catch_release', 'Catch & release', 'catch-release', 2),
			self::entry('Brook Trout', 'open', 'Open', 'open', 18),
		]);

		$this->assertSame('open', $merged['status']);
	}

	public function test_merge_statuses_prefers_catch_release_over_closed(): void
	{
		$merged = WhatsOpenNow::mergeStatuses([
			self::entry('Bright Salmon', 'closed', 'Closed', 'closed', 1),
			self::entry('Spring Kelt', 'catch_release', 'Catch & release', 'catch-release', 2),
		]);

		$this->assertSame('catch_release', $merged['status']);
	}

	public function test_atlantic_salmon_row_uses_merged_status(): void
	{
		$rows = WhatsOpenNow::pickRows([
			self::entry('Bright Salmon', 'closed', 'Closed', 'closed', 1),
			self::entry('Spring Kelt', 'catch_release', 'Catch & release', 'catch-release', 2),
		]);

		$this->assertSame('Catch & release', $rows[0]['statusLabel']);
		$this->assertSame('catch-release', $rows[0]['statusClass']);
	}

	public function test_atlantic_salmon_row_uses_method_label_from_winning_entry(): void
	{
		$rows = WhatsOpenNow::pickRows([
			self::entry('Bright Salmon', 'catch_release', 'Fly Fishing', 'catch-release', 1),
			self::entry('Spring Kelt', 'closed', 'Closed', 'closed', 2),
		]);

		$this->assertSame('Fly Fishing', $rows[0]['statusLabel']);
	}

	public function test_missing_entries_default_to_closed(): void
	{
		$rows = WhatsOpenNow::pickRows([]);

		$this->assertCount(5, $rows);
		$this->assertSame('Closed', $rows[0]['statusLabel']);
		$this->assertSame('closed', $rows[0]['statusClass']);
	}
}
