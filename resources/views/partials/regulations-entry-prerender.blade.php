@if (!empty($regulationsEntry) && !empty($directoryNav['regions']))
    <section id="regulations-entry" class="static-page-shell regulations-entry" aria-label="Browse fishing regulations by region">
        <nav class="static-breadcrumb" aria-label="Breadcrumb">
            <a href="{{ route('smart_fish.page') }}">Home</a> &rarr; Regulations
        </nav>

        <h1>Fishing regulations by region</h1>
        <p>Select a region to view seasons, bag limits, and waterbody-specific rules.</p>

        <ul class="regulations-entry__list">
            @foreach ($directoryNav['regions'] as $region)
                <li>
                    <a href="{{ $region['url'] }}">{{ $region['name'] }}</a>
                </li>
            @endforeach
        </ul>
    </section>

    <style>
        .regulations-entry { font-family: system-ui, sans-serif; font-size: 14px; padding: 1rem; max-width: 960px; margin: 0 auto; }
        .regulations-entry h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
        .regulations-entry__list { list-style: none; padding: 0; margin: 1rem 0; display: flex; flex-wrap: wrap; gap: 0.5rem 1.5rem; }
        .regulations-entry__list a { color: #1a5fb4; text-decoration: none; }
        .regulations-entry__list a:hover { text-decoration: underline; }
        .static-breadcrumb { font-size: 0.9rem; margin-bottom: 0.75rem; color: #555; }
        .static-breadcrumb a { color: #1a5fb4; text-decoration: none; }
    </style>
@endif
