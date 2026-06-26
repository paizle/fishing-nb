<script>
    (function () {
        function hideStaticShells() {
            document.querySelectorAll('.static-page-shell').forEach(function (el) {
                el.hidden = true;
            });
        }
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', hideStaticShells);
        } else {
            hideStaticShells();
        }
    })();
</script>
