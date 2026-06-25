@if (isset($seoLimits) && isset($seoLocation))
    @php
        $heading = $seoLocation['waterName'] ?? null
            ? $seoLocation['waterName'] . ', ' . $seoLocation['regionName']
            : $seoLocation['regionName'];
    @endphp
    <section id="seo-restrictions-static" class="seo-restrictions-static" aria-label="Fishing restrictions">
        <h1>{{ $heading }} — Fishing restrictions</h1>
        <p>{{ $seoLimits->count() }} regulation record(s) for this location.</p>

        @if ($seoLimits->isEmpty())
            <p>No restriction records found.</p>
        @else
            <table>
                <thead>
                    <tr>
                        <th scope="col">Fish</th>
                        <th scope="col">Water</th>
                        <th scope="col">Season start</th>
                        <th scope="col">Season end</th>
                        <th scope="col">Bag limit</th>
                        <th scope="col">Hook/release</th>
                        <th scope="col">Min size</th>
                        <th scope="col">Max size</th>
                        <th scope="col">Method</th>
                        <th scope="col">Tidal</th>
                        <th scope="col">Boundary</th>
                        <th scope="col">Water type</th>
                        <th scope="col">Water description</th>
                        <th scope="col">Exception</th>
                        <th scope="col">Note</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($seoLimits as $limit)
                        <tr>
                            <td>{{ $limit->fish?->name ?? '' }}</td>
                            <td>{{ $limit->water?->name ?? '' }}</td>
                            <td>{{ $limit->season_start ?? '' }}</td>
                            <td>{{ $limit->season_end ?? '' }}</td>
                            <td>{{ $limit->bag_limit ?? '' }}</td>
                            <td>{{ $limit->hook_release_limit ?? '' }}</td>
                            <td>{{ $limit->minimum_size ?? '' }}</td>
                            <td>{{ $limit->maximum_size ?? '' }}</td>
                            <td>{{ $limit->method?->value ?? $limit->method ?? '' }}</td>
                            <td>{{ $limit->tidal?->value ?? $limit->tidal ?? '' }}</td>
                            <td>{{ $limit->boundary?->value ?? $limit->boundary ?? '' }}</td>
                            <td>{{ $limit->water_type?->value ?? $limit->water_type ?? '' }}</td>
                            <td>{{ $limit->water_description ?? '' }}</td>
                            <td>{{ ! empty($limit->is_exception) ? 'yes' : 'no' }}</td>
                            <td>{{ $limit->note ?? '' }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        @endif
    </section>
    <style>
        .seo-restrictions-static { font-family: system-ui, sans-serif; font-size: 14px; padding: 1rem; }
        .seo-restrictions-static table { border-collapse: collapse; width: 100%; }
        .seo-restrictions-static th,
        .seo-restrictions-static td { border: 1px solid #ccc; padding: 0.35rem 0.5rem; text-align: left; vertical-align: top; }
        .seo-restrictions-static th { background: #f5f5f5; }
        body.inertia-loaded #seo-restrictions-static { display: none; }
    </style>
@endif
