# Build status

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
- The orbital presentation is a lazy-loaded CSS 3D scene, with the complete semantic list as the primary accessible source. This avoids adding a WebGL dependency and keeps the client bundle disciplined.

## Integration state and genuine external blockers

- Spotify live catalog: blocked until `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` and `SPOTIFY_REFRESH_TOKEN` are added in Vercel. The refresh token must belong to an authorized Spotify application.
- GitHub contribution calendar: blocked until `GITHUB_TOKEN` is added in Vercel. The fallback makes no contribution-count claim.
- Instagram and LinkedIn feeds: intentionally link-only until authorized platform credentials and approved records exist. No scraping is performed.
- Booking embed: intentionally absent until `NEXT_PUBLIC_CALCOM_URL` or `NEXT_PUBLIC_TOPMATE_URL` contains a public booking URL. Email and WhatsApp remain fully usable.
- Website preview capture outcomes are written by `npm run capture:sites` to `public/previews/capture-status.json`. Unavailable sites retain an authored domain card rather than a misleading or broken image.

## Verification log

- `node` structured-content check: passed. All JSON parsed and exactly 18 approved sites were found.
- Secret-pattern scan and `git diff --check`: passed.
- `npm install`: blocked by the execution environment's HTTP 403 response from the npm registry. No dependency lockfile could be produced.
- `npm run type-check`, `npm run lint`, `npm test`, `npm run test:e2e` and `npm run build`: attempted, but blocked because dependencies could not be installed. The global TypeScript and ESLint installations consequently reported missing project modules; Vitest, Playwright and Next were unavailable.
- The 360, 430, 768, 1024 and 1440 Playwright matrix is committed in `tests/smoke.spec.ts`, but could not execute for the same registry restriction.
- A visual screenshot could not be captured because the application could not start without the blocked Next.js installation.

## Vercel handoff

1. Run `npm install` in a network-enabled environment and commit the generated lockfile.
2. Run `npx playwright install chromium`, then `npm run capture:sites` to create current local website previews and review `public/previews/capture-status.json`.
3. Run `npm run type-check`, `npm run lint`, `npm test`, `npm run test:e2e` and `npm run build`; resolve any dependency-version issues before release.
4. Import the repository in Vercel using the Next.js preset. The application deploys without optional integration variables and displays truthful fallbacks.
5. Add only the desired variables listed in `.env.example` to Vercel. Never expose Spotify, GitHub, Instagram or LinkedIn secrets as `NEXT_PUBLIC_*` values.
6. After the production URL exists, register authorized OAuth redirect URLs with each enabled provider, supply a public Cal.com or Topmate URL if booking is desired, and repeat the responsive smoke suite against production.
