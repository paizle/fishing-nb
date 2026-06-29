# Instructions for LLM agents — React frontend (SmartFishNB)

**Read this before editing `resources/js/` or changing npm dependencies.**

Parent doc: [`laravel-web-server/AGENTS.md`](../../../AGENTS.md)

## Scope

- **Inertia + React** lives under `resources/js/` (pages, layouts, hooks, components, utils).
- **Blade-only pages** are exceptions — e.g. [`verify-source.blade.php`](../../views/verify-source.blade.php) has no React shell. Document cross-cutting flows here when they touch both stacks.

## Dependency policy

**Never run `npm install <pkg>`, `npm uninstall`, or edit `package.json` / `package-lock.json` without explicit user approval.**

Before proposing a new package, state:

1. **Why** the existing stack cannot solve the problem
2. **Package name**, approximate size, and license
3. **Prod vs dev** — will it ship to users or only build/CI?
4. **Alternatives** — including zero-dependency options (headers, Blade, native browser APIs)

**Do not** add `postinstall` (or similar) scripts that pull assets unless the user approved the underlying package.

### When dependencies are OK

- The user explicitly asks to add or remove a library
- The user approves a written proposal in chat (including approved plans)

### Prefer existing deps

Reuse libraries already in the project before adding new ones:

| Need                    | Existing                           |
| ----------------------- | ---------------------------------- |
| HTTP                    | axios (via `useRest.ts`)           |
| Dates                   | date-fns                           |
| Collections / utilities | lodash                             |
| Maps                    | leaflet, react-leaflet, @turf/turf |
| Combobox / typeahead    | downshift                          |
| Icons                   | @heroicons/react                   |

Same rule applies to **Composer** (`composer.json`) for PHP packages — propose first, install only after approval.

## Verify-source flow

Shareable citation links for regulation rows:

```text
VerifySourceModal (React)
  → link target: VERIFY_SOURCE_WINDOW ("fishnb-verify-source")
  → /verify-source?page=&table=&row=&region=  (Blade)
  → iframe src=/regulations/Fish.pdf#page=N  (Laravel route, Content-Disposition: inline)
```

Key files:

| File                                                                                                       | Role                                                    |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| [`Util/sourceLocation.js`](Util/sourceLocation.js)                                                         | `buildVerifySourceUrl`, `VERIFY_SOURCE_WINDOW`          |
| [`Components/VerifySourceModal/VerifySourceModal.jsx`](Components/VerifySourceModal/VerifySourceModal.jsx) | Modal + "Check Source Document" link                    |
| [`Hooks/useVerifySourceModal.jsx`](Hooks/useVerifySourceModal.jsx)                                         | Hook wiring from restriction tables                     |
| [`app/Http/Controllers/PublicController.php`](../../app/Http/Controllers/PublicController.php)             | `verifySource` and `regulationPdf` route handlers       |
| [`resources/views/verify-source.blade.php`](../../views/verify-source.blade.php)                           | iframe viewer page                                      |
| [`public/regulations/.htaccess`](../../public/regulations/.htaccess)                                       | Rewrites `Fish.pdf` to Laravel; fallback inline headers |

PDF is served with `Content-Type: application/pdf` and `Content-Disposition: inline` via `PublicController::regulationPdf`. Some mobile browsers may still download instead of displaying in an iframe — there is no client-side PDF renderer in this app.

## Blade React islands

Some Blade pages can mount small React trees without Inertia. Enable with `REACT_ISLANDS_ON=true` in `.env` (`config('app.react_islands_on')`).

| Mode                               | Homepage “What’s Open”                                                                                                                                    |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REACT_ISLANDS_ON=false` (default) | Server-rendered Blade card via [`WhatsOpenNowService`](../../app/Services/WhatsOpenNowService.php) + [`WhatsOpenNow`](../../app/Support/WhatsOpenNow.php) |
| `REACT_ISLANDS_ON=true`            | React island on `#whats-open-now-widget`; loads `public-home.jsx`                                                                                         |

| File                                                                                                                                     | Role                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [`resources/js/public-home.jsx`](public-home.jsx)                                                                                        | Vite entry; mounts on `#whats-open-now-widget` when islands on                                      |
| [`Pages/Public/SmartFish/Homepage/sections/WhatsOpenNowCardLive.jsx`](Pages/Public/SmartFish/Homepage/sections/WhatsOpenNowCardLive.jsx) | Live “What’s Open Right Now?” card (React mode)                                                     |
| [`Pages/Public/SmartFish/Homepage/whatsOpenNow.ts`](Pages/Public/SmartFish/Homepage/whatsOpenNow.ts)                                     | Row config + status merge for React mode (shared [`whats_open_now.json`](data/whats_open_now.json)) |

Homepage Blade ([`pages/home.blade.php`](../../views/pages/home.blade.php)) uses `@section('vite')` to load `public-home.jsx` only when islands are enabled. Other public Blade pages keep CSS-only via the default layout `@vite`.

React mode data: `GET /api/calendar` (today by default) via [`useRest.ts`](Hooks/useRest.ts).

## Site header in Inertia

The redesign nav partial is rendered server-side and shared as HTML via [`SiteHeaderHtml`](../../app/Support/SiteHeaderHtml.php) → `siteHeader` in [`HandleInertiaRequests`](../../app/Http/Middleware/HandleInertiaRequests.php).

[`Layouts/SiteHeader/SiteHeader.jsx`](Layouts/SiteHeader/SiteHeader.jsx) injects that markup into the SPA header slot. Styles come from [`spa-shell.scss`](../css/spa-shell.scss). Edit links in [`partials/public/nav.blade.php`](../../views/partials/public/nav.blade.php) only.

## Waters map (`/waters-map`)

Ported from [`new-brunswick-waters-8`](../../../../../../projects/wamp/new-brunswick-waters-8). Module lives under [`Pages/Public/WatersMap/nb-waters/`](Pages/Public/WatersMap/nb-waters/).

| Artifact                          | Location                                                          |
| --------------------------------- | ----------------------------------------------------------------- |
| Processed index + geometry shards | `public/data/` (served at `/data/…`)                              |
| Raw GeoJSON (gitignored)          | `data-src/waters.geojson` or `public/waters.geojson`              |
| Rebuild script                    | `npm run prepare-waters-data` → `scripts/prepare-waters-data.mjs` |

The page loads `index.json` (~1 MB) and fetches geometry cells on demand; IndexedDB caches both. Do not ship the raw ~79 MB GeoJSON to production.

## Blade static page styles

Server-rendered public pages (`/`, `/search`, `/calendar`) load a single Vite entry: [`resources/css/public-pages.scss`](../css/public-pages.scss). Partials live under [`resources/css/blade/`](../css/blade/) (layout, homepage sections, calendar). Shared tokens: [`resources/css/redesign-tokens.scss`](../css/redesign-tokens.scss).

Reusable Blade markup lives in [`resources/views/partials/public/`](../views/partials/public/) (`page-header`, `search-form`, `result-group`).

Do not add Blade page styles under `resources/js/` — the Inertia app uses [`resources/css/app.scss`](../css/app.scss) and colocated component SCSS only.

### Blade CSS naming

| Pattern                                                      | Use                                           |
| ------------------------------------------------------------ | --------------------------------------------- |
| `.BladePage`, `.BladePage-inner`                             | Secondary page shell (`/search`, `/calendar`) |
| `.BladePage--panel`                                          | White content panel on off-white layout       |
| `.BladePage--centered`                                       | Centered title, lead, and forms               |
| `.BladePage-title`, `.BladePage-lead`                        | Page heading and intro copy                   |
| `.BladeForm`, `.BladeForm-input`, `.BladeForm-select`        | GET search and date forms                     |
| `.BladeResultGroup`, `.BladeResultLink`, `.BladeResultBadge` | Search result lists                           |
| `.btn.btn--primary`                                          | Actions on Blade pages (non-hero)             |
| `.HeroSection-btn--*`                                        | Hero CTAs only (dark backdrop)                |
| `@include stage`                                             | Horizontal max-width + padding (via layout)   |
| `.static-breadcrumb`                                         | Breadcrumb on secondary pages                 |

Homepage marketing sections keep their own BEM blocks (`HeroSection-*`, `FindRegulationsSection-*`, etc.).

## Conventions

- Match surrounding file style (JS vs TS, SCSS colocated with components).
- **SCSS class names must be written in full** (e.g. `.RedesignNav-inner { … }`). Do not use parent-reference concatenation (`&-inner`, `&--modifier`) — it hides class names from search.
- Minimize scope — no drive-by refactors.
- Tests live next to utils (`*.test.ts`) where they already exist; add tests only when they cover real behavior the user cares about.

## Related docs

- [features/api-data-fetching.md](../../../features/api-data-fetching.md) — REST caching via `useRest.ts`
- [issues/react-anti-patterns/README.md](../../../issues/react-anti-patterns/README.md) — resolved patterns (historical)
- [laravel-web-server/AGENTS.md](../../../AGENTS.md) — branch and deploy policy
