<footer class="RedesignLayout-footer">
    <div class="PublicFooter">
        <div class="PublicFooter-notice">
            <x-ui-icon name="exclamation-triangle" class="PublicFooter-noticeIcon" />
            <p>
                <strong>Important notice:</strong> Smart Fish summarizes fishing regulations from
                official New Brunswick sources. Regulations change — always verify current rules
                with the
                <a href="https://www2.gnb.ca/" target="_blank" rel="noopener noreferrer">Department of Natural Resources</a>
                and
                <a href="https://www.dfo-mpo.gc.ca/" target="_blank" rel="noopener noreferrer">Fisheries and Oceans Canada</a>
                before fishing. Anglers are responsible for compliance.
            </p>
        </div>

        <div class="PublicFooter-grid">
            <div class="PublicFooter-col">
                <h3>Smart Fish</h3>
                <ul>
                    <li><a href="{{ route('maps.waters') }}">Waters Map</a></li>
                    <li><a href="{{ route('regulations.page') }}">Regulations</a></li>
                    <li><a href="{{ route('settings.edit') }}">Settings</a></li>
                </ul>
            </div>
            <div class="PublicFooter-col" id="about">
                <h3>About</h3>
                <p>
                    Smart Fish helps New Brunswick anglers find seasons, bag limits, and
                    waterbody-specific rules quickly.
                </p>
            </div>
            <div class="PublicFooter-col" id="resources">
                <h3>Data sources</h3>
                <ul>
                    <li><a href="https://www2.gnb.ca/" target="_blank" rel="noopener noreferrer">NB Department of Natural Resources</a></li>
                    <li><a href="https://www.dfo-mpo.gc.ca/" target="_blank" rel="noopener noreferrer">Fisheries and Oceans Canada</a></li>
                </ul>
            </div>
        </div>

        <p class="PublicFooter-copy">&copy; {{ date('Y') }} Smart Fish</p>
    </div>
</footer>
