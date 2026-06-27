@extends('layouts.public-site')



@section('content')

    <div class="CalendarPage">

        <header class="CalendarPage-header">

            <p class="static-breadcrumb">

                <a href="{{ route('smart_fish.page') }}">Home</a>

                <span aria-hidden="true"> / </span>

                Season calendar

            </p>



            <h1 class="CalendarPage-title">Season status — {{ $calendar['monthLabel'] }}</h1>

            <p class="CalendarPage-meta">

                Regulation year {{ $calendar['regulationYear'] }}. Province-wide status from primary seasons.

            </p>



            <nav class="CalendarPage-nav" aria-label="Month navigation">

                <a href="{{ route('calendar.page', ['date' => $calendar['prevMonthDate']]) }}" class="CalendarPage-navLink">

                    ← {{ \Carbon\Carbon::createFromFormat('Y-m-d', $calendar['prevMonthDate'])->format('F Y') }}

                </a>



                <form class="CalendarPage-dateForm" method="get" action="{{ route('calendar.page') }}">

                    <label for="calendar-date" class="CalendarPage-dateLabel">Jump to date</label>

                    <input

                        id="calendar-date"

                        type="date"

                        name="date"

                        value="{{ $calendar['anchorDate'] }}"

                        class="CalendarPage-dateInput"

                    >

                    <button type="submit" class="CalendarPage-dateSubmit">Go</button>

                </form>



                <a href="{{ route('calendar.page', ['date' => $calendar['nextMonthDate']]) }}" class="CalendarPage-navLink">

                    {{ \Carbon\Carbon::createFromFormat('Y-m-d', $calendar['nextMonthDate'])->format('F Y') }} →

                </a>

            </nav>

        </header>



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

@endsection

