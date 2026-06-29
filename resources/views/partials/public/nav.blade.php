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
            <a href="{{ route('maps.waters') }}" class="RedesignNav-link">Waters Map</a>
            <a href="{{ route('regulations.page') }}" class="RedesignNav-link">Regulations</a>
            <a href="{{ route('search.page') }}" class="RedesignNav-link">Search</a>
            <a href="{{ route('calendar.page') }}" class="RedesignNav-link">Calendar</a>
        </div>
    </div>
</nav>
