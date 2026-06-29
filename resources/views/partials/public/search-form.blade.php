@props([
    'query' => '',
    'scope' => 'all',
    'scopeLabels' => null,
])

<form class="BladeForm" method="get" action="{{ route('search.page') }}">
    <div class="BladeForm-searchWrap">
        <x-ui-icon name="magnifying-glass" class="BladeForm-searchIcon" />
        <label class="sr-only" for="search-q">Search query</label>
        <input
            type="search"
            id="search-q"
            name="q"
            value="{{ $query }}"
            class="BladeForm-input BladeForm-input--withIcon"
            minlength="2"
            placeholder="Search waterbodies, species, or regions…"
            required
        >
    </div>

    @if ($scopeLabels)
        <label class="sr-only" for="search-scope">Search scope</label>
        <select id="search-scope" name="scope" class="BladeForm-select">
            @foreach ($scopeLabels as $scopeKey => $scopeLabel)
                <option value="{{ $scopeKey }}" @selected($scope === $scopeKey)>{{ $scopeLabel }}</option>
            @endforeach
        </select>
    @else
        <input type="hidden" name="scope" value="all">
    @endif

    <button type="submit" class="btn btn--primary">Search</button>
</form>
