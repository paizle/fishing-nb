<?php

namespace App\Restrictions;

/**
 * PHP port of formatRestrictionDetail.ts.
 * Builds a human-readable location detail string from restriction fields.
 */
class FormatRestrictionDetail
{
	/**
	 * @param  array{tidal?: string, boundary?: string, watersCategory?: string, water?: string, fishingMethod?: string, waterDescription?: string}  $source
	 */
	public static function format(array $source, bool $onWaterPage = false): string
	{
		$water = $onWaterPage ? '' : ($source['water'] ?? '');
		$watersCategory = $onWaterPage ? '' : ($source['watersCategory'] ?? '');
		$tidal = $source['tidal'] ?? '';
		$boundary = $source['boundary'] ?? '';
		$fishingMethod = $source['fishingMethod'] ?? '';
		$waterDescription = $source['waterDescription'] ?? '';

		$text = '';

		if ($tidal !== '') {
			$text .= $tidal;
			if ($water !== '' || $watersCategory !== '' || $boundary !== '') {
				$text .= ' portions of ';
			} else {
				$text .= ' waters';
			}
		}

		if ($boundary !== '') {
			$text .= $boundary;
		}

		if ($water === '' && $watersCategory !== '') {
			if ($boundary !== '') {
				$text .= ' of ';
			}
			$text .= $watersCategory;
		}

		if ($water !== '') {
			if ($watersCategory !== '') {
				$text .= $text !== '' ? ' in ' : '';
			} elseif ($boundary !== '') {
				$text .= ' of ';
			}
			$text .= $water;
		}

		if ($fishingMethod !== '') {
			$text = $text !== '' ? $fishingMethod . ' in ' . $text : $fishingMethod;
		}

		if ($waterDescription !== '') {
			$text .= $text !== '' ? ' ' : '';
			$text .= $waterDescription;
		}

		if ($text === '') {
			return '';
		}

		return ' ' . mb_strtoupper(mb_substr($text, 0, 1)) . mb_substr($text, 1);
	}
}
