<?php
namespace App\Models\FishingRestriction;

enum FishingMethod: string
{
	case DIP_NET = 'dip net';
	case ANGLING = 'angling';
	case FLY_FISHING = 'fly fishing';
	
}
