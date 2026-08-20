# Build status

> PR #1 has been repaired in a network-enabled review environment. The earlier root-only lock manifest was not deployable. This pass replaces it with the resolved npm lockfile and verifies the real release commands without weakening a rule.

## PR #1 repair scope

- [x] Hydrate a reproducible npm lockfile from the existing `package.json`.
- [x] Add a GitHub Actions release gate so a conflict-free PR is not mistaken for a tested PR.
- [x] Replace the single-ring project orbit with a pointer-draggable spherical projection and retain keyboard/mobile alternatives.
- [x] Crop supplied portfolio references so unsupported result claims are never visible.
- [x] Replace generic Swawlambi service cards with distinct Solar, HVAC, Power and Safety Audit postcards.
- [x] Surface the existing GitHub adapter in the interface and keep the token-free state truthful.
- [x] Keep Music Vault to one bounded page of records while preserving cursor pagination and search.
- [x] Re-run type-check, lint, unit tests, production build and route checks. Browser smoke is delegated to the committed GitHub Actions job because the local Chromium download endpoint was unavailable.

## Build plan

- [x] Phase 0: audit source material, establish the application shell and visual system.
- [x] Phase 1: build the complete Home narrative and motion alternatives.
- [x] Phase 2: build Work Orbit, its semantic fallback and the Swawlambi case file.
- [x] Phase 3: build the paginated Music Vault and honest integration adapters.
- [x] Phase 4: build Contact and complete responsive and accessibility hardening.
- [x] Phase 5: document the Vercel handoff.

## Source decisions

- The purple BYOB styling and every performance, ROI, ranking, tenure and client claim in the reference pages are excluded. The references are used only as historical evidence of website work.
- The supplied contact photograph and Swawlambi logo are used unchanged. The footballer is an original inline SVG illustration, not a cutout of the photograph.
- No Spotify track URIs were supplied. The credential-free fallback therefore links to Pratham's Spotify profile and explains that no playable selection is configured, rather than inventing favorite tracks.
- Exact Swawlambi role and dates and MAIMS dates remain hidden because the structured data does not provide them.
- The orbit is a lazy-loaded spherical projection built from semantic buttons, with pointer drag, arrow-key control, reduced-motion behavior and a horizontal mobile index. The complete numbered manifest remains the durable accessible source.
- Five supplied portfolio references are shown only through reviewed left-side crops. Thirteen projects retain explicit preview-pending cards until current website captures are generated. Unsupported result claims are never used as thumbnails.

## Integration state and genuine external blockers

- Spotify live catalog: blocked until `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` and `SPOTIFY_REFRESH_TOKEN` are added in Vercel. The refresh token must belong to an authorized Spotify application.
- GitHub contribution calendar: blocked until `GITHUB_TOKEN` is added in Vercel. The fallback makes no contribution-count claim.
- Instagram and LinkedIn feeds: intentionally link-only until authorized platform credentials and approved records exist. No scraping is performed.
- Booking embed: intentionally absent until `NEXT_PUBLIC_CALCOM_URL` or `NEXT_PUBLIC_TOPMATE_URL` contains a public booking URL. Email and WhatsApp remain fully usable.
- Website preview capture outcomes are written by `npm run capture:sites` to `public/previews/capture-status.json`. Unavailable sites retain an authored domain card rather than a misleading or broken image.

## Verification log

- Clean install: `npm ci --no-audit --no-fund` passed and installed the exact resolved dependency graph.
- Type-check: `tsc --noEmit` passed.
- Lint: `eslint .` passed.
- Unit tests: Vitest passed two files and four tests, including the 5,000-record pagination fixture and hostile page-size cap.
- Production build: Next.js 15.5 compiled successfully and generated all application routes.
- Runtime route check: `/`, `/work`, `/music`, `/contact`, `/api/music` and `/api/integrations` each returned HTTP 200 from the production server.
- Credential-free API behavior: Music returned an empty, labelled curated fallback; GitHub returned a labelled fallback with no invented contribution count.
- Static release checks: all source JSON parsed, exactly 18 approved website records were present, `git diff --check` passed and no committed secret pattern was found.
- Local browser smoke: the Playwright package is installed, but the Chromium archive could not be downloaded from the browser CDN in this environment. The committed GitHub Actions browser job installs Chromium and owns the 360, 430, 768, 1024 and 1440 release matrix.

## Vercel handoff

1. Require the GitHub Actions quality and responsive-browser jobs to pass on PR #1.
2. Import the repository in Vercel using the Next.js preset. The application deploys without optional integration variables and displays truthful fallbacks.
3. Add only the desired variables listed in `.env.example` to Vercel. Never expose Spotify, GitHub, Instagram or LinkedIn secrets as `NEXT_PUBLIC_*` values.
4. On a machine with Chromium available, run `npm run capture:sites`, review every image and `public/previews/capture-status.json`, then commit only approved captures.
5. After the production URL exists, register authorized OAuth redirect URLs with each enabled provider, supply a public Cal.com or Topmate URL if booking is desired, and repeat the responsive smoke suite against production.

## Spotify OAuth activation

1. Create a Spotify application in the Spotify developer dashboard and register its exact server-side OAuth redirect URL.
2. Authorize the application for the library scope required by the chosen catalog source and exchange the authorization code server-side for a refresh token.
3. Add `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` and `SPOTIFY_REFRESH_TOKEN` only to Vercel environment variables.
4. Redeploy and verify that `/api/music` reports `source: "spotify"`. The credential-free response remains explicitly labelled `curated` and contains no invented songs.
