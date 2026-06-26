@extends('layouts.public-site')

@section('content')
    <div class="Homepage">
        {{-- Hero --}}
        <section class="HeroSection" aria-labelledby="hero-heading">
            <div class="HeroSection-backdrop" aria-hidden="true"></div>
            <div class="HeroSection-inner">
                <div class="HeroSection-content">
                    <h1 id="hero-heading" class="HeroSection-heading">
                        New Brunswick Fishing Regulations Made Simple
                    </h1>
                    <p class="HeroSection-subheading">
                        Check seasons, bag limits, size restrictions, and waterbody-specific rules —
                        all in one place. Plan your next trip with confidence.
                    </p>
                    <div class="HeroSection-actions">
                        <a href="#find-regulations" class="HeroSection-btn HeroSection-btn--primary">Search a Waterbody</a>
                        <a href="{{ route('maps.waters') }}" class="HeroSection-btn HeroSection-btn--outline">Open Interactive Map</a>
                    </div>
                    <p class="HeroSection-disclaimer">
                        Data sourced from official NB fishing regulations. Always verify before you fish.
                    </p>
                </div>

                <aside class="WhatsOpenNowCard" aria-labelledby="whats-open-heading">
                    <h2 id="whats-open-heading" class="WhatsOpenNowCard-title">What&apos;s Open Right Now?</h2>
                    <p class="WhatsOpenNowCard-date">{{ now()->format('l, F j, Y') }}</p>
                    <ul class="WhatsOpenNowCard-list">
                        @foreach ([
                            ['Brook Trout', 'open', 'Open'],
                            ['Smallmouth Bass', 'open', 'Open'],
                            ['Chain Pickerel', 'open', 'Open'],
                            ['Landlocked Salmon', 'open', 'Open'],
                            ['Lake Trout', 'open', 'Open'],
                            ['Atlantic Salmon', 'warning', 'Retention prohibited'],
                        ] as [$name, $status, $label])
                            <li class="WhatsOpenNowCard-item is-{{ $status }}">
                                <span class="WhatsOpenNowCard-name">{{ $name }}</span>
                                <span class="WhatsOpenNowCard-status">{{ $label }}</span>
                            </li>
                        @endforeach
                    </ul>
                    <a href="#species" class="WhatsOpenNowCard-link">View All Seasons</a>
                </aside>
            </div>
        </section>

        {{-- Find regulations --}}
        <section id="find-regulations" class="FindRegulationsSection" aria-labelledby="find-regulations-heading">
            <div class="FindRegulationsSection-inner">
                <h2 id="find-regulations-heading" class="FindRegulationsSection-heading">Find Regulations Fast</h2>

                <form class="FindRegulationsSection-search search-page-form" method="get" action="{{ route('search.page') }}">
                    <input type="search" name="q" minlength="2" placeholder="Search waterbodies, species, or regions…" aria-label="Search regulations" required>
                    <input type="hidden" name="scope" value="all">
                    <button type="submit" class="HeroSection-btn HeroSection-btn--primary">Search</button>
                </form>

                <div class="FindRegulationsSection-tags">
                    <span class="FindRegulationsSection-tagsLabel">Popular:</span>
                    @foreach ($popularLocations as $tag)
                        <a href="{{ $tag['url'] }}" class="FindRegulationsSection-tag">{{ $tag['label'] }}</a>
                    @endforeach
                </div>
            </div>
        </section>

        {{-- Map preview --}}
        <section class="MapPreviewSection" aria-labelledby="map-preview-heading">
            <div class="MapPreviewSection-inner">
                <div class="MapPreviewSection-copy">
                    <h2 id="map-preview-heading" class="MapPreviewSection-heading">Explore New Brunswick Waters</h2>
                    <p class="MapPreviewSection-text">
                        Browse hundreds of lakes, rivers, and streams on an interactive map. Select
                        a waterbody to view current regulations for that location.
                    </p>
                    <ul class="MapPreviewSection-features">
                        @foreach (['Open seasons and closed periods', 'Daily bag limits', 'Size restrictions', 'Waterbody-specific rules', 'Special management areas'] as $feature)
                            <li>{{ $feature }}</li>
                        @endforeach
                    </ul>
                    <a href="{{ route('maps.waters') }}" class="MapPreviewSection-cta">Launch Map</a>
                </div>
                <div class="MapPreviewSection-visual">
                    <img src="/images/redesign/map-preview.png" alt="Preview of the New Brunswick waters map" class="MapPreviewSection-image">
                </div>
            </div>
        </section>

        {{-- Species grid --}}
        <section id="species" class="SpeciesGridSection" aria-labelledby="species-heading">
            <div class="SpeciesGridSection-inner">
                <h2 id="species-heading" class="SpeciesGridSection-heading">Regulations by Species</h2>
                <p class="SpeciesGridSection-sub">Select a species to view seasons, limits, and special rules.</p>

                <div class="SpeciesGridSection-grid">
                    @foreach ($speciesList as $name)
                        <article class="SpeciesGridSection-card">
                            <div class="FishIconPlaceholder" aria-hidden="true">
                                <svg viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 16c8-8 20-10 32-6-4 2-6 6-6 10s2 8 6 10C24 26 12 24 4 16z" stroke="currentColor" stroke-width="1.5" fill="none"/>
                                    <circle cx="10" cy="14" r="1.5" fill="currentColor"/>
                                    <path d="M36 10l4 6-4 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                </svg>
                                <span class="FishIconPlaceholder-initial">{{ strtoupper(substr($name, 0, 1)) }}</span>
                            </div>
                            <h3 class="SpeciesGridSection-name">{{ $name }}</h3>
                            <a href="{{ \App\Support\RegulationUrl::speciesSearchHref($name) }}" class="SpeciesGridSection-link">View Regulations</a>
                        </article>
                    @endforeach
                </div>

                <div class="SpeciesGridSection-more">
                    <a href="{{ route('search.page') }}" class="SpeciesGridSection-moreBtn">View All Species</a>
                </div>
            </div>
        </section>

        {{-- How it works --}}
        <section class="HowItWorksSection" aria-labelledby="how-it-works-heading">
            <div class="HowItWorksSection-inner">
                <h2 id="how-it-works-heading" class="HowItWorksSection-heading">How It Works</h2>
                <div class="HowItWorksSection-steps">
                    @foreach ([
                        ['Find Your Water', 'Search by name or explore the interactive map to locate lakes, rivers, and streams across New Brunswick.'],
                        ['View Current Regulations', 'See open seasons, daily bag limits, size restrictions, and special rules for your chosen waterbody.'],
                        ['Fish With Confidence', 'Head out knowing the rules — and always double-check official sources before you cast.'],
                    ] as [$stepTitle, $stepText])
                        <div class="HowItWorksSection-step">
                            <h3 class="HowItWorksSection-stepTitle">{{ $stepTitle }}</h3>
                            <p class="HowItWorksSection-stepText">{{ $stepText }}</p>
                        </div>
                    @endforeach
                </div>
            </div>
        </section>

        @include('partials.site-directory-nav')
    </div>
@endsection
