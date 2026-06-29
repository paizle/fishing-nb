@props([
    'query' => '',
    'scope' => null,
    'scopeLabels' => null,
])

@php
	$scopeLabels = $scopeLabels ?? \App\Support\SearchScope::labels();
	$scope = \App\Support\SearchScope::normalize($scope ?? \App\Support\SearchScope::DEFAULT);
@endphp

<form {{ $attributes->merge(['class' => 'BladeSearchForm']) }} method="get" action="{{ route('search.page') }}">
    <div class="BladeSearchBar">
        <div class="BladeSearchBar-query">
            <x-ui-icon name="magnifying-glass" class="BladeSearchBar-icon" />
            <label class="sr-only" for="search-q">Search query</label>
            <input
                type="search"
                id="search-q"
                name="q"
                value="{{ $query }}"
                class="BladeSearchBar-input"
                minlength="2"
                placeholder="Search waterbodies, species, or regions…"
                required
            >
        </div>

        <label class="sr-only" for="search-scope">Search scope</label>
        <select id="search-scope" name="scope" class="BladeSearchBar-select">
            @foreach ($scopeLabels as $scopeKey => $scopeLabel)
                <option value="{{ $scopeKey }}" @selected($scope === $scopeKey)>{{ $scopeLabel }}</option>
            @endforeach
        </select>

        <button type="submit" class="BladeSearchBar-submit">Search</button>
    </div>
</form>
