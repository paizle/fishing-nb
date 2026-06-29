@props(['statusClass'])

@php
	$iconName = match ($statusClass) {
		'open' => 'check',
		'catch-release', 'warning' => 'exclamation-triangle-solid',
		'closed' => 'x-mark',
		default => 'x-mark',
	};

	$modifier = match ($statusClass) {
		'open' => '--open',
		'catch-release', 'warning' => '--warning',
		'closed' => '--closed',
		default => '--closed',
	};
@endphp

<span {{ $attributes->merge(['class' => "WhatsOpenNowCard-statusIcon WhatsOpenNowCard-statusIcon{$modifier}"]) }} aria-hidden="true">
	<x-ui-icon :name="$iconName" />
</span>
