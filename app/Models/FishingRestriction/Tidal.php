<?php
namespace App\Models\FishingRestriction;

enum Tidal: string
{
	case TIDAL = 'tidal';
	case NON_TIDAL = 'non-tidal';
}
