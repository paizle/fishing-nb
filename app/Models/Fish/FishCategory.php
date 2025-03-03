<?php
namespace App\Models\Fish;

enum FishCategory: string
{
	case TROUT = 'Trout';
	case ATLANTIC_SALMON = 'Atlantic Salmon';
	case LANDLOCKED_SALMON = 'Landlocked Salmon';
	case SMALLMOUTH_BASS = 'Smallmouth Bass';
	case NON_SPORT_FISH = 'Non-Sport Fish';
}
