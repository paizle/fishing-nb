@extends('layouts.public-site')

@section('content')
    @php
        $query = $search['query'] ?? '';
        $scope = $search['scope'] ?? 'all';
        $results = $search['results'] ?? [];
        $scopeLabels = $search['scopeLabels'] ?? \App\Support\SearchScope::labels();

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

    <div class="BladePage BladePage--panel BladePage--centered">
        <div class="BladePage-inner">
            @include('partials.public.page-header', [
                'title' => 'Search fishing regulations',
                'lead' => 'Find waterbodies, species, and regions across New Brunswick.',
                'current' => 'Search',
            ])

            @include('partials.public.search-form', [
                'query' => $query,
                'scope' => $scope,
            ])

            @if (strlen($query) >= 2)
                @php $hasResults = false; @endphp

                <p class="BladeResultMeta">
                    Results for &ldquo;{{ $query }}&rdquo; in {{ $scopeLabels[$scope] ?? $scope }}.
                </p>

                @foreach ($grouped as $groupName => $items)
                    @if (!empty($items))
                        @php $hasResults = true; @endphp
                        @include('partials.public.result-group', [
                            'title' => $groupName,
                            'results' => $items,
                        ])
                    @endif
                @endforeach

                @unless ($hasResults)
                    <p class="BladePage-empty">No matches found.</p>
                @endunless
            @else
                <p class="BladePage-hint">Enter at least two characters to search.</p>
            @endif
        </div>

        @include('partials.site-directory-nav')
    </div>
@endsection
