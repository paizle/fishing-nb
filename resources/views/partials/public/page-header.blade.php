@props([
    'title',
    'lead' => null,
    'current' => null,
])

<header class="BladePage-header">
    @if ($current)
        <nav class="static-breadcrumb" aria-label="Breadcrumb">
            <a href="{{ route('smart_fish.page') }}">Home</a>
            <span class="static-breadcrumb-separator" aria-hidden="true">/</span>
            <span>{{ $current }}</span>
        </nav>
    @endif

    <h1 class="BladePage-title">{{ $title }}</h1>

    @if ($lead)
        <p class="BladePage-lead">{{ $lead }}</p>
    @endif
</header>
