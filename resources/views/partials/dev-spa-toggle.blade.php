@if (app()->environment('local'))
    <label id="dev-spa-toggle-static" class="dev-spa-toggle" hidden>
        <input type="checkbox">
        Show SPA
    </label>
    <script>
        (function () {
            var STORAGE_KEY = 'fishnb-dev-show-spa';

            function getShowSpa() {
                return localStorage.getItem(STORAGE_KEY) !== 'false';
            }

            function applyShowSpa(showSpa) {
                document.querySelectorAll('.static-site-chrome').forEach(function (el) {
                    el.hidden = showSpa;
                });
                var app = document.getElementById('app');
                var staticToggle = document.getElementById('dev-spa-toggle-static');

                if (app) {
                    app.hidden = !showSpa;
                }
                if (staticToggle) {
                    staticToggle.hidden = showSpa;
                    var input = staticToggle.querySelector('input[type="checkbox"]');
                    if (input) {
                        input.checked = showSpa;
                    }
                }
            }

            function setShowSpa(showSpa) {
                localStorage.setItem(STORAGE_KEY, showSpa ? 'true' : 'false');
                applyShowSpa(showSpa);
                window.dispatchEvent(new CustomEvent('fishnb-dev-spa-toggle'));
            }

            function boot() {
                if (!document.querySelector('.static-site-chrome')) {
                    return;
                }

                applyShowSpa(getShowSpa());

                var staticToggle = document.getElementById('dev-spa-toggle-static');
                if (staticToggle) {
                    var input = staticToggle.querySelector('input[type="checkbox"]');
                    if (input) {
                        input.addEventListener('change', function () {
                            setShowSpa(input.checked);
                        });
                    }
                }
            }

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', boot);
            } else {
                boot();
            }
        })();
    </script>
    <style>
        .dev-spa-toggle {
            position: fixed;
            top: 0.75rem;
            left: 0.75rem;
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 0.4rem;
            padding: 0.35rem 0.6rem;
            border: 1px solid #ccc;
            border-radius: 0.35rem;
            background: #fff;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
            font-family: system-ui, sans-serif;
            font-size: 0.85rem;
            color: #333;
            cursor: pointer;
            user-select: none;
        }
        .dev-spa-toggle input { margin: 0; cursor: pointer; }
    </style>
@endif
