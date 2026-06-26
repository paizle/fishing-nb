@extends('layouts.public-site')

@section('content')
    @php
        $query = $search['query'] ?? '';
        $scope = $search['scope'] ?? 'all';
        $results = $search['results'] ?? [];
        $scopeLabels = $search['scopeLabels'] ?? [];

        $grouped = ['Regions' => [], 'Waterbodies' => [], 'Species by location' => []];
        foreach ($results as $result) {
            if (($result['type'] ?? '') === 'region') {
                $grouped['Regions'][] = $result;
            } elseif (($result['type'] ?? '') === 'water') {
                $grouped['Waterbodies'][] = $result;
            } else {
                $grouped['Species by location'][] = $result;
            }
        }
    @endphp

    <div class="Homepage">
        <section class="FindRegulationsSection" aria-labelledby="search-heading">
            <div class="FindRegulationsSection-inner">
                <nav class="static-breadcrumb" aria-label="Breadcrumb">
                    <a href="{{ route('smart_fish.page') }}">Home</a> &rarr; Search
                </nav>

                <h1 id="search-heading" class="FindRegulationsSection-heading">Search fishing regulations</h1>
                <p>Find waterbodies, species, and regions across New Brunswick.</p>

                <form class="search-page-form" method="get" action="{{ route('search.page') }}">
                    <label>
                        <span class="sr-only">Search query</span>
                        <input type="search" name="q" value="{{ $query }}" minlength="2" placeholder="Search waterbodies, species, or regions…" required>
                    </label>
                    <label>
                        <span class="sr-only">Search scope</span>
                        <select name="scope">
                            @foreach ($scopeLabels as $scopeKey => $scopeLabel)
                                <option value="{{ $scopeKey }}" @selected($scope === $scopeKey)>{{ $scopeLabel }}</option>
                            @endforeach
                        </select>
                    </label>
                    <button type="submit" class="HeroSection-btn HeroSection-btn--primary">Search</button>
                </form>

                @if (strlen($query) >= 2)
                    <div class="search-page-results">
                        <p>Results for &ldquo;{{ $query }}&rdquo; in {{ $scopeLabels[$scope] ?? $scope }}.</p>

                        @php $hasResults = false; @endphp
                        @foreach ($grouped as $groupName => $items)
                            @if (!empty($items))
                                @php $hasResults = true; @endphp
                                <section>
                                    <h2>{{ $groupName }}</h2>
                                    <ul>
                                        @foreach ($items as $result)
                                            <li>
                                                <a href="{{ \App\Support\RegulationUrl::fromSearchResult($result) }}">{{ $result['label'] }}</a>
                                                <span class="result-badge">{{ \App\Support\RegulationUrl::searchResultTypeLabel($result['type'], $result['speciesName'] ?? null) }}</span>
                                            </li>
                                        @endforeach
                                    </ul>
                                </section>
                            @endif
                        @endforeach

                        @unless ($hasResults)
                            <p>No matches found.</p>
                        @endunless
                    </div>
                @else
                    <p>Enter at least two characters to search.</p>
                @endif
            </div>
        </section>

        @include('partials.site-directory-nav')
    </div>
@endsection
