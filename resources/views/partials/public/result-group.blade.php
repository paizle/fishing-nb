@props([
    'title',
    'results',
])

<section class="BladeResultGroup">
    <h2 class="BladeResultGroup-title">{{ $title }}</h2>
    <ul class="BladeResultList">
        @foreach ($results as $result)
            <li class="BladeResultItem">
                <a href="{{ \App\Support\RegulationUrl::fromSearchResult($result) }}" class="BladeResultLink">
                    {{ $result['label'] }}
                </a>
                <span class="BladeResultBadge">
                    {{ \App\Support\RegulationUrl::searchResultTypeLabel($result['type'], $result['speciesName'] ?? null) }}
                </span>
            </li>
        @endforeach
    </ul>
</section>
