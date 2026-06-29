<?php

namespace Tests\Unit;

use App\Models\FishingRestriction;
use App\Models\SeasonStatusDaily\SeasonStatus;
use App\Services\SeasonStatusMaterializer;
use PHPUnit\Framework\TestCase;

class SeasonStatusMaterializerTest extends TestCase
{
	private function statusFromRestriction(FishingRestriction $rule): SeasonStatus
	{
		$materializer = new SeasonStatusMaterializer();
		$method = new \ReflectionMethod($materializer, 'statusFromRestriction');
		$method->setAccessible(true);

		return $method->invoke($materializer, $rule);
	}

	private function restriction(array $attributes): FishingRestriction
	{
		return (new FishingRestriction())->forceFill($attributes);
	}

	public function test_null_bag_with_hook_limit_is_catch_release(): void
	{
		$rule = $this->restriction([
			'bag_limit' => null,
			'hook_release_limit' => 4,
		]);

		$this->assertSame(SeasonStatus::CATCH_RELEASE, $this->statusFromRestriction($rule));
	}

	public function test_null_bag_without_hook_limit_is_open(): void
	{
		$rule = $this->restriction([
			'bag_limit' => null,
			'hook_release_limit' => null,
		]);

		$this->assertSame(SeasonStatus::OPEN, $this->statusFromRestriction($rule));
	}

	public function test_zero_bag_with_hook_limit_is_catch_release(): void
	{
		$rule = $this->restriction([
			'bag_limit' => 0,
			'hook_release_limit' => 2,
		]);

		$this->assertSame(SeasonStatus::CATCH_RELEASE, $this->statusFromRestriction($rule));
	}
}
