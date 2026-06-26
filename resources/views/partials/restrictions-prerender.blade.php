@if (isset($staticRestrictions) && isset($locationMeta))
    @php
        $heading = $locationMeta['waterName'] ?? null
            ? $locationMeta['waterName'] . ', ' . $locationMeta['regionName']
            : $locationMeta['regionName'];
        $fishTables = $staticRestrictions['fishTables'] ?? [];
        $undatedExceptions = $staticRestrictions['undatedExceptions'] ?? [];
        $fmtDate = fn(string $iso) => \Carbon\Carbon::parse($iso)->format('F j');
        $regionSlug = $locationMeta['regionSlug'] ?? null;
        $waterSlug = $locationMeta['waterSlug'] ?? null;
    @endphp

    <section id="restrictions-prerender" class="static-page-shell restrictions-prerender" aria-label="Fishing restrictions for {{ $heading }}">
        <nav class="static-breadcrumb" aria-label="Breadcrumb">
            <a href="{{ route('smart_fish.page') }}">Home</a>
            @if ($regionSlug)
                &rarr; <a href="{{ route('fish.region', ['region' => $regionSlug]) }}">{{ $locationMeta['regionName'] }}</a>
            @endif
            @if ($waterSlug && !empty($locationMeta['waterName']))
                &rarr; {{ $locationMeta['waterName'] }}
            @endif
        </nav>

        <h1>{{ $heading }} — Fishing restrictions</h1>

        @if (empty($fishTables) && empty($undatedExceptions))
            <p>No restriction records found for this location.</p>
        @else

            @foreach ($fishTables as $fishTable)
                <table class="FishRestrictionsTable">
                    <caption>
                        <strong class="fish-name">{{ $fishTable['fishName'] }}</strong>
                    </caption>
                    <thead>
                        <tr>
                            <th scope="col">Season / Restrictions</th>
                            <th scope="col">Bag Limit</th>
                            <th scope="col">Minimum Size</th>
                            <th scope="col">Maximum Size</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($fishTable['rows'] as $row)
                            @if ($row['kind'] === 'data')
                                @php
                                    $trClass = implode(' ', array_filter([
                                        $row['rowClassName'],
                                        !empty($row['waterGroupContinue']) ? 'water-group-continue' : '',
                                        $row['isExceptionRow'] ? 'exception-row' : '',
                                    ]));
                                @endphp
                                <tr class="{{ $trClass }}">
                                    <td class="season-exception">
                                        @php
                                            $hasOverlapAnnotation = !empty($row['strikeSeasonStart']) || !empty($row['strikeSeasonEnd']);
                                        @endphp
                                        <strong class="date-range season-start {{ $row['isExceptionRow'] ? 'exception-date-range' : '' }}">
                                            <span class="season-start">{{ $fmtDate($row['seasonStart']) }}</span>
                                            &ndash;
                                            <span class="season-end">{{ $fmtDate($row['seasonEnd']) }}</span>
                                            @if ($hasOverlapAnnotation)
                                                <span class="exception-marker" aria-hidden="true">*</span>
                                            @endif
                                            @if (!empty($row['dateTrailingComma']))<span>,</span>@endif
                                        </strong>
                                        @if ($row['showLocationDetail'] && !empty($row['locationDetail']))
                                            <em class="water-description">{{ $row['locationDetail'] }}</em>
                                        @endif
                                        @if (!empty($row['note']) && $row['showLocationDetail'] && !$row['exceptionNoteSpan'])
                                            <span class="note-indicator" title="{{ $row['note'] }}">&#9888;</span>
                                        @endif
                                    </td>

                                    @if ($row['exceptionNoteSpan'])
                                        <td class="exception-limits-note" colspan="3">{{ $row['note'] }}</td>
                                    @else
                                        <td class="bag-limit">
                                            @if (!$row['hideBagLimit'])
                                                @if ($row['showExceptionLimitCells'] && $row['bagLimit'] === null && !$row['hookLimit'])
                                                    <span class="limit-placeholder">-</span>
                                                @elseif ($row['hookLimit'])
                                                    @if ($row['bagLimitShowInfinity'])
                                                        <span class="infinity">&#8734;</span>
                                                    @else
                                                        {{ $row['bagLimit'] }}
                                                    @endif
                                                    <span class="hook-limit" title="Daily Hook and Release Limit: {{ $row['hookLimit'] }}">&#9888; {{ $row['hookLimit'] }}</span>
                                                @elseif ($row['bagLimitShowInfinity'])
                                                    <span class="infinity">&#8734;</span>
                                                @else
                                                    {{ $row['bagLimit'] }}
                                                @endif
                                            @endif
                                        </td>
                                        <td class="min-size">
                                            @if (!$row['hideMinSize'])
                                                @if ($row['minSize'] === '-')
                                                    <span class="limit-placeholder">-</span>
                                                @else
                                                    {{ $row['minSize'] }}
                                                @endif
                                            @endif
                                        </td>
                                        <td class="max-size">
                                            @if (!$row['hideMaxSize'])
                                                @if ($row['maxSize'] === '-')
                                                    <span class="limit-placeholder">-</span>
                                                @else
                                                    {{ $row['maxSize'] }}
                                                @endif
                                            @endif
                                        </td>
                                    @endif
                                </tr>

                            @elseif ($row['kind'] === 'group-footer')
                                @php
                                    $trClass = implode(' ', array_filter([
                                        'group-water-description',
                                        !empty($row['waterGroupContinue']) ? 'water-group-continue' : '',
                                    ]));
                                @endphp
                                <tr class="{{ $trClass }}">
                                    <td colspan="4">
                                        @if (!empty($row['locationDetail']))
                                            <em class="water-description">{{ $row['locationDetail'] }}</em>
                                        @endif
                                        @if (!empty($row['note']))
                                            <span class="note-indicator" title="{{ $row['note'] }}">&#9888;</span>
                                        @endif
                                    </td>
                                </tr>

                            @elseif ($row['kind'] === 'exceptions-heading')
                                @php
                                    $trClass = implode(' ', array_filter([
                                        'exceptions-heading',
                                        !empty($row['waterGroupContinue']) ? 'water-group-continue' : '',
                                    ]));
                                @endphp
                                <tr class="{{ $trClass }}">
                                    <td colspan="4">Exceptions <span class="exception-marker" aria-hidden="true">*</span></td>
                                </tr>
                            @endif
                        @endforeach
                    </tbody>
                </table>
            @endforeach

            @if (!empty($undatedExceptions))
                <section class="undated-exceptions">
                    <h2>Additional exceptions</h2>
                    <ul>
                        @foreach ($undatedExceptions as $exc)
                            @if (!empty($exc['note']))
                                <li>{{ $exc['note'] }}</li>
                            @endif
                        @endforeach
                    </ul>
                </section>
            @endif

        @endif

        @include('partials.site-directory-nav')
    </section>

    @include('partials.static-page-shell-styles')
    <style>
        .restrictions-prerender .FishRestrictionsTable { border-collapse: collapse; width: 100%; margin-bottom: 1.5rem; }
        .restrictions-prerender caption { font-weight: bold; text-align: left; padding: 0.4rem 0; font-size: 1rem; }
        .restrictions-prerender th,
        .restrictions-prerender td { border: 1px solid #ccc; padding: 0.35rem 0.5rem; text-align: left; vertical-align: top; }
        .restrictions-prerender th { background: #f5f5f5; }
        .restrictions-prerender .exceptions-heading td { background: #fff8e1; font-style: italic; }
        .restrictions-prerender .exception-row td { background: #fafafa; }
        .restrictions-prerender .water-group-continue td { border-top: none; }
        .restrictions-prerender .water-description { color: #555; font-style: italic; display: block; font-size: 0.9em; }
        .restrictions-prerender .limit-placeholder { color: #aaa; }
        .restrictions-prerender .exception-marker { color: #e07000; }
        .restrictions-prerender .note-indicator { color: #b55; font-size: 0.9em; cursor: help; }
        .restrictions-prerender .hook-limit { font-size: 0.85em; color: #555; }
    </style>
@endif
