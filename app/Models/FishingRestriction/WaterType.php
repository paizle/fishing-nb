<?php
namespace App\Models\FishingRestriction;

enum WaterType: string
{
	case FLOWING = 'rivers, brooks and streams';
	case STANDING = 'lakes, ponds and reservoirs';
}
