@props([
    'scopeLabels' => null,
    'activeScope' => null,
])

@php
	$scopeLabels = $scopeLabels ?? \App\Support\SearchScope::labels();
	$activeScope = \App\Support\SearchScope::normalize($activeScope ?? \App\Support\SearchScope::DEFAULT);
@endphp

<nav class="SearchScopeChips" aria-label="Search type">
    @foreach ($scopeLabels as $scopeKey => $scopeLabel)
        <a
            href="{{ route('search.page', ['scope' => $scopeKey]) }}"
            class="SearchScopeChips-chip {{ $activeScope === $scopeKey ? 'is-active' : '' }}"
        >
            @if ($scopeKey === 'all')
                <x-ui-icon name="magnifying-glass" class="SearchScopeChips-icon" />
            @elseif ($scopeKey === 'waterbody' || $scopeKey === 'region')
                <x-ui-icon name="map" class="SearchScopeChips-icon" />
            @endif
            {{ $scopeLabel }}
        </a>
    @endforeach
</nav>
