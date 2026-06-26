@if (isset($directoryNav))
    <nav class="site-directory-nav" aria-label="Browse fishing regulations by location">
        <h2 class="site-directory-nav__heading">Browse by region</h2>
        <ul class="site-directory-nav__list">
            @foreach ($directoryNav['regions'] as $region)
                <li>
                    <a href="{{ $region['url'] }}"
                       @if (!empty($directoryNav['currentRegion']['slug']) && $directoryNav['currentRegion']['slug'] === $region['slug']) aria-current="page" @endif>
                        {{ $region['name'] }}
                    </a>
                </li>
            @endforeach
        </ul>

        @if (!empty($directoryNav['waters']))
            <h2 class="site-directory-nav__heading">
                @if (!empty($directoryNav['currentRegion']['name']))
                    Waterbodies in {{ $directoryNav['currentRegion']['name'] }}
                @else
                    Waterbodies
                @endif
            </h2>
            <ul class="site-directory-nav__list">
                @foreach ($directoryNav['waters'] as $water)
                    <li>
                        <a href="{{ $water['url'] }}"
                           @if (!empty($directoryNav['currentWater']['slug']) && $directoryNav['currentWater']['slug'] === $water['slug']) aria-current="page" @endif>
                            {{ $water['name'] }}
                        </a>
                    </li>
                @endforeach
            </ul>
        @endif
    </nav>
@endif
