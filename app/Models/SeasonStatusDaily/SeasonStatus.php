<?php

namespace App\Models\SeasonStatusDaily;

enum SeasonStatus: string
{
	case OPEN = 'open';
	case CATCH_RELEASE = 'catch_release';
	case CLOSED = 'closed';

	public function label(): string
	{
		return match ($this) {
			self::OPEN => 'Open',
			self::CATCH_RELEASE => 'Catch & release',
			self::CLOSED => 'Closed',
		};
	}

	public function cssClass(): string
	{
		return match ($this) {
			self::OPEN => 'open',
			self::CATCH_RELEASE => 'catch-release',
			self::CLOSED => 'closed',
		};
	}
}
