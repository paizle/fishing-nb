<?php

namespace Tests\Unit;

use App\Support\FishGroups;
use Tests\TestCase;

class FishGroupsTest extends TestCase
{
	public function test_trout_group_has_five_members(): void
	{
		$this->assertCount(5, FishGroups::members('trout'));
	}

	public function test_non_sport_group_has_twelve_members(): void
	{
		$this->assertCount(12, FishGroups::members('non_sport_fish'));
	}

	public function test_featured_display_returns_five_rows(): void
	{
		$featured = FishGroups::featuredDisplay();

		$this->assertCount(5, $featured);
		$this->assertSame([
			'Trout',
			'Smallmouth Bass',
			'Non-Sport Fish',
			'Landlocked Salmon',
			'Atlantic Salmon',
		], array_column($featured, 'displayName'));
	}
}
