@if (!empty($regulationsEntry) && !empty($directoryNav['regions']))
    <section id="regulations-entry" class="static-page-shell regulations-entry" aria-label="Browse fishing regulations by region">
        <nav class="static-breadcrumb" aria-label="Breadcrumb">
            <a href="{{ route('smart_fish.page') }}">Home</a>
            <span class="static-breadcrumb-separator" aria-hidden="true">/</span>
            <span>Regulations</span>
        </nav>

        <h1 class="BladePage-title">Fishing regulations by region</h1>
        <p class="BladePage-lead">Select a region to view seasons, bag limits, and waterbody-specific rules.</p>

        <ul class="regulations-entry__list">
            @foreach ($directoryNav['regions'] as $region)
                <li>
                    <a href="{{ $region['url'] }}">{{ $region['name'] }}</a>
                </li>
            @endforeach
        </ul>
    </section>
@endif
