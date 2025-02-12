<?php
namespace App\Util;

enum WatersCategoryName: string
{
	case FLOWING_WATERS = 'Rivers, brooks and streams';

	case STANDING_WATERS = 'Lakes, ponds and reservoirs';

	public static function getByWaterName($name)
	{
		$name = strtolower($name);
		if (strpos($name, 'lake') > -1) {
			return self::STANDING_WATERS->value;
		} elseif (strpos($name, 'reservoir')) {
			return self::STANDING_WATERS->value;
		} elseif (strpos($name, 'river')) {
			return self::FLOWING_WATERS->value;
		} elseif (strpos($name, 'stream')) {
			return self::FLOWING_WATERS->value;
		} elseif (strpos($name, 'flowage')) {
			return self::FLOWING_WATERS->value;
		}

		throw new \Exception('Could not find a type for string: ' . $name);
	}
}
