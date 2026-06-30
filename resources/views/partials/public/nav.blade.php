@php
    $navLinks = [
        ['label' => 'Waters Map', 'route' => 'maps.waters'],
        ['label' => 'Regulations', 'route' => 'regulations.page'],
        ['label' => 'Calendar', 'route' => 'calendar.page'],
        ['label' => 'Search', 'route' => 'search.page']
    ];
@endphp

<nav class="RedesignNav" aria-label="Main navigation">
    <div class="RedesignNav-inner">
        <a href="{{ route('smart_fish.page') }}" class="RedesignNav-brand">
            <img src="/images/redesign/logo.png" alt="" class="RedesignNav-logo">
            <div class="RedesignNav-brandText">
                <span class="RedesignNav-title">Smart Fish</span>
                <span class="RedesignNav-tagline">New Brunswick Fishing Regulations</span>
            </div>
        </a>

        <div class="RedesignNav-links RedesignNav-links--desktop">
            @foreach ($navLinks as $link)
                <a href="{{ route($link['route']) }}" class="RedesignNav-link">{{ $link['label'] }}</a>
            @endforeach
        </div>

        <button
            type="button"
            class="RedesignNav-menuBtn"
            data-redesign-nav-toggle
            aria-controls="RedesignNav-mobile-panel"
            aria-expanded="false"
            aria-label="Open menu"
        >
            <span class="RedesignNav-menuIcon" aria-hidden="true"></span>
        </button>
    </div>

    <div
        id="RedesignNav-mobile-panel"
        class="RedesignNav-mobile"
        role="group"
        aria-label="Mobile navigation"
    >
        @foreach ($navLinks as $link)
            <a href="{{ route($link['route']) }}" class="RedesignNav-mobileLink">{{ $link['label'] }}</a>
        @endforeach
    </div>
</nav>
