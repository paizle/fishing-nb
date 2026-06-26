# HTML Baseline Fixtures

This directory holds manually captured HTML fragments from the live React UI.
They are used by `HtmlBaselineTest` to verify that the PHP Blade static table
renders the same fish names, season dates, and limit values as the React app.

## File naming

| File                 | Source                                                 |
| -------------------- | ------------------------------------------------------ |
| `{slug}.react.html`  | Copied from the React-rendered table (JS on)           |
| `{slug}.static.html` | Copied from the Blade static block (JS off) — optional |

Current baselines:

| Slug                 | URL                        |
| -------------------- | -------------------------- |
| `chaleur-bass-river` | `/fish/chaleur/bass-river` |
| `chaleur`            | `/fish/chaleur`            |

## How to capture a React baseline

1. Start both dev servers:
    ```
    php artisan serve
    npm run start
    ```
2. Open the target URL in your browser with **JavaScript enabled**.
3. Wait until the React table has fully rendered (the spinner disappears).
4. Open DevTools → Elements panel.
5. Find the `.FishingRestrictions` element (the outermost wrapper of the React table).
6. Right-click → **Copy → Copy outerHTML**.
7. Paste into `tests/fixtures/restrictions-html/{slug}.react.html`.

## How to capture a Blade static baseline

1. Open the same URL with **JavaScript disabled** in your browser.
    - Chrome: DevTools → three-dot menu → Settings → Debugger → Disable JavaScript,
      or use the Command Palette (Ctrl+Shift+P) → "Disable JavaScript".
    - Firefox: about:config → `javascript.enabled = false`.
2. Find `#restrictions-prerender` in the page source.
3. Copy the element's outerHTML and save as `{slug}.static.html`.

## PHPUnit comparison strategy

`HtmlBaselineTest` normalises both sides before comparing:

- Strip `<script>` and `<style>` tags.
- Collapse all whitespace (including newlines) to a single space.
- Compare only text content extracted from specific elements:
    - Fish section headings (`.fish-name`)
    - Season date cells (`.season-start`, `.season-end`)
    - Limit cells (`.bag-limit`, `.hook-limit`, `.min-size`, `.max-size`)

This is intentionally lenient: CSS class names, attribute order, and exact
markup structure are allowed to differ between the React and Blade outputs.
Only the visible data values must match.

## Regenerating JSON golden fixtures

If you change the TypeScript `buildFishTables` pipeline, regenerate the golden
`.viewmodel.json` files before re-running the PHP parity tests:

```
npm run export-restriction-fixtures
```
