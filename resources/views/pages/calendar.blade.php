@extends('layouts.public-site')

@section('content')
    <div class="BladePage">
        <div class="BladePage-inner">
            @include('partials.public.page-header', [
                'title' => 'Season status — ' . $calendar['monthLabel'],
                'lead' => 'Regulation year ' . $calendar['regulationYear'] . '. Province-wide status from primary seasons.',
                'current' => 'Season calendar',
            ])

            <nav class="CalendarPage-nav" aria-label="Month navigation">
                <a href="{{ route('calendar.page', ['date' => $calendar['prevMonthDate']]) }}" class="CalendarPage-navLink">
                    ← {{ \Carbon\Carbon::createFromFormat('Y-m-d', $calendar['prevMonthDate'])->format('F Y') }}
                </a>

                <form class="BladeForm BladeForm--inline" method="get" action="{{ route('calendar.page') }}">
                    <label for="calendar-date" class="BladeForm-label">Jump to date</label>
                    <input
                        id="calendar-date"
                        type="date"
                        name="date"
                        value="{{ $calendar['anchorDate'] }}"
                        class="BladeForm-date"
                    >
                    <button type="submit" class="btn btn--primary">Go</button>
                </form>

                <a href="{{ route('calendar.page', ['date' => $calendar['nextMonthDate']]) }}" class="CalendarPage-navLink">
                    {{ \Carbon\Carbon::createFromFormat('Y-m-d', $calendar['nextMonthDate'])->format('F Y') }} →
                </a>
            </nav>

            <div class="CalendarPage-days">
                @foreach ($calendar['days'] as $day)
                    <section class="CalendarPage-day" aria-labelledby="calendar-day-{{ $day['date'] }}">
                        <h2 id="calendar-day-{{ $day['date'] }}" class="CalendarPage-dayHeading">
                            {{ $day['label'] }}
                        </h2>

                        @if ($day['entries'] === [])
                            <p class="CalendarPage-empty">No season data for this day.</p>
                        @else
                            <ul class="CalendarPage-list">
                                @foreach ($day['entries'] as $entry)
                                    <li class="CalendarPage-item is-{{ $entry['statusClass'] }}">
                                        <span class="CalendarPage-fish">{{ $entry['fishName'] }}</span>
                                        <span class="CalendarPage-status">{{ $entry['statusLabel'] }}</span>
                                    </li>
                                @endforeach
                            </ul>
                        @endif
                    </section>
                @endforeach
            </div>
        </div>

        @include('partials.site-directory-nav')
    </div>
@endsection
