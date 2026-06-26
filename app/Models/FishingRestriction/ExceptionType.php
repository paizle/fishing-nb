<?php

namespace App\Models\FishingRestriction;

enum ExceptionType: string
{
	case EXCLUSIVE = 'exclusive';
	case SPECIFIER = 'specifier';
}
