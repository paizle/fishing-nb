<?php
namespace App\Models\FishingRestriction;

enum Boundary: string
{
	case NON_BOUNDARY = 'non-boundary waters';

	case BOUNDARY_NB_MAINE = 'boundary waters between New Brunswick and Maine';
}
