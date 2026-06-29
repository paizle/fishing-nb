@php
	$classes = $attributes->get('class');
	$svg = $svgMarkup;

	if ($classes) {
		if (preg_match('/class="/', $svg)) {
			$svg = preg_replace('/class="([^"]*)"/', 'class="' . e($classes) . ' $1"', $svg, 1);
		} else {
			$svg = preg_replace('/<svg/', '<svg class="' . e($classes) . '"', $svg, 1);
		}
	}
@endphp

{!! $svg !!}
