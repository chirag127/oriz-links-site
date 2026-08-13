# oriz-links-site

> Curated, 2026-verified editorial directory of 100+ hand-picked developer sites.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/chirag127/oriz-links-site?style=social)](https://github.com/chirag127/oriz-links-site/stargazers)
[![last commit](https://img.shields.io/github/last-commit/chirag127/oriz-links-site)](https://github.com/chirag127/oriz-links-site/commits/main)
[![Astro](https://img.shields.io/badge/built%20with-Astro-ff5d01?logo=astro&logoColor=white)](https://astro.build)

Astro source for **[links.oriz.in](https://links.oriz.in)** — 100+ hand-picked, 2026-verified dev sites, presented as a curated editorial magazine ("The Directory"). Each entry carries a short review and a "why it's here" note, all searchable client-side.

- **Live app:** https://links.oriz.in _(canonical — Cloudflare Pages)_
- **About / info:** https://chirag127.github.io/oriz-links-site/ _(GitHub Pages landing)_
- **Repo:** https://github.com/chirag127/oriz-links-site

**⭐ If this is useful, please [star the repo](https://github.com/chirag127/oriz-links-site/stargazers) — it helps others find it.**

## How it works

```mermaid
flowchart LR
    Data["src/data/sites-2026.json"] -->|Zod validate at build| Astro[Astro 5 SSG]
    Astro --> HTML[Static pages]
    HTML --> Search["FlexSearch (client)<br/>name · review · why"]
    HTML --> Theme[React island<br/>theme toggle]
    Astro -->|astro build + wrangler| CF[(Cloudflare Pages)]
    Push[push to main] -.publish.yml.-> CF
```

## Features

- **Curated directory** — 100+ dev sites, each with a review and rationale, grouped by category/tier.
- **Instant client-side search** — FlexSearch over names, reviews, and "why" notes; no backend.
- **Editorial design** — deep-navy magazine layout with gold/blush accents.
- **Build-time validation** — content JSON validated by a Zod schema at build, so a bad entry fails the build instead of shipping.
- **Static + fast** — pure static output, no server round-trips.

## Tech stack

- **Astro 5** — static-site generation
- **Tailwind v4** — utility CSS
- **React 19** — islands (search, theme toggle)
- **FlexSearch** — client-side full-text search
- **Zod** — build-time content validation
- **Shared `@chirag127/oz-*` fleet packages** — wordmark, footer, fonts, AI (mechanism/tokens only; this site keeps its own visual identity)
- **Content:** `src/data/sites-2026.json`

## Design

"The Directory" — deep-navy editorial magazine. Palette:

- `#0a1929` navy bg · `#122b45` surface panel · `#f5efe0` cream text
- `#ffb700` gold accent (active tabs, stack picks, hover underlines)
- `#ff8a95` blush accent (tier badges only)

Fonts (Bunny): Fraunces (variable, editorial serif) · Inter (body) · JetBrains Mono (mono).

Per [`per-app-distinctive-frontend-design`](https://knowledge.oriz.in/rules/design/per-app-distinctive-frontend-design.html).

## Repo structure

```
src/
  data/sites-2026.json   # curated content (Zod-validated at build)
  ...                    # Astro pages, layouts, React islands
public/                  # static assets, CNAME
.github/workflows/
  publish.yml            # auto-deploy to Cloudflare Pages on push to main
astro.config.mjs         # site: https://links.oriz.in
```

## Develop

```bash
npm install --legacy-peer-deps   # use npm on Windows, not pnpm
npm run dev                      # local dev
npm run build                    # static build → dist/
npm run deploy                   # astro build + wrangler pages deploy dist
```

> Windows: use **npm**, not pnpm (pnpm skips `@esbuild/win32-x64` and the Astro build crashes).

Auto-deploys to Cloudflare Pages (`oriz-links-site`) on push to `main` via `.github/workflows/publish.yml`.

## Configuration

| Env var | Purpose |
|---|---|
| `PUBLIC_CLERK_PUBLISHABLE_KEY` | Optional Clerk client key — gates paid/account features only; public content reads without auth. Client-side, never a `PUBLIC_*_SECRET`. |

No secrets in the repo; `PUBLIC_*` are client-only.

## Part of the oriz family

One of ~80 small, fast, single-purpose tools and sites in the **oriz** fleet — see [blog.oriz.in](https://blog.oriz.in) for how the whole thing is built and run solo. Sibling tools: [json.oriz.in](https://json.oriz.in) · [diagram.oriz.in](https://diagram.oriz.in) · [name.oriz.in](https://name.oriz.in) · [case.oriz.in](https://case.oriz.in).

**Cost:** $0 — static build hosted free on Cloudflare Pages.

## Contributing

Suggest a site or fix an entry via issue or PR — edits go in `src/data/sites-2026.json`. Conventional commits are the changelog.

## Author

Chirag Singhal · chirag@oriz.in

## Status

Stable.

## License

MIT © 2026 Chirag Singhal
