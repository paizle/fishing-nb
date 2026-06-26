{{-- Shared styles for server-rendered page shells and directory navigation. --}}
<style>
    .static-page-shell {
        font-family: system-ui, sans-serif;
        font-size: 14px;
        padding: 1rem;
        max-width: 960px;
        margin: 0 auto;
    }
    .static-page-shell h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
    .static-page-shell h2 { font-size: 1.1rem; margin-top: 1rem; margin-bottom: 0.35rem; }
    .static-page-shell p { line-height: 1.5; margin: 0.5rem 0; }
    .static-page-shell a { color: #1a5fb4; }
    .static-breadcrumb { font-size: 0.9rem; margin-bottom: 0.75rem; color: #555; }
    .static-breadcrumb a { color: #1a5fb4; text-decoration: none; }
    .static-breadcrumb a:hover { text-decoration: underline; }
    .site-directory-nav { margin: 1.25rem 0; padding-top: 1rem; border-top: 1px solid #ddd; }
    .site-directory-nav__heading { font-size: 1rem; margin: 0 0 0.35rem; }
    .site-directory-nav__list {
        list-style: none;
        padding: 0;
        margin: 0 0 0.75rem;
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem 1rem;
    }
    .site-directory-nav__list a { text-decoration: none; }
    .site-directory-nav__list a:hover { text-decoration: underline; }
    .popular-locations { margin: 1rem 0; }
    .popular-locations__list { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 0.35rem 0.75rem; }
    .static-search-form { margin: 1rem 0; display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; }
    .static-search-form input[type="search"],
    .static-search-form select { padding: 0.35rem 0.5rem; font-size: 1rem; }
    .static-search-results { margin-top: 1rem; }
    .static-search-results ul { list-style: none; padding: 0; margin: 0; }
    .static-search-results li { margin: 0.35rem 0; }
    .static-search-results .result-badge { font-size: 0.8rem; color: #666; margin-left: 0.35rem; }
</style>
