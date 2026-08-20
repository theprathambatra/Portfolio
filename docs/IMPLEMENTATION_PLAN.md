# Implementation plan

The phases are ordered to reduce rework. Codex should continue from one phase to the next in the same task while time permits. It must not stop after rewriting this plan.

## Phase 0: Foundation and audit

- Read all source-of-truth files.
- Inspect supplied assets and reference pages.
- Create `docs/BUILD_STATUS.md` with a checklist and current blockers.
- Bootstrap a strict TypeScript Next.js App Router project.
- Add scripts for lint, type-check, unit tests, Playwright and production build.
- Establish accessible route navigation, design tokens, typography and global motion preferences.
- Add `.env.example` without values.

Exit gate: the empty four-route shell builds, has no horizontal overflow and satisfies `WHAT_NOT.md`.

## Phase 1: Home narrative

- Implement the supplied greeting loader with session and reduced-motion behaviour.
- Build the football hero as an authored SVG or sprite system.
- Build the left-right continuous loop and handle bounce.
- Implement the ball-kick camera wipe.
- Build project-led work experience and a GitHub adapter with honest fallback.
- Implement the briefcase convergence and latch transition.
- Build the education scene from structured content.
- Implement the education-to-postcard-to-music transition.
- Add featured Spotify embed support and the home footer.

Exit gate: the entire sequence works forward, remains stable on reverse scroll and has a clean mobile fallback.

## Phase 2: Work Orbit

- Add a capture script for current website previews using Playwright.
- Store generated previews locally and record capture failures.
- Build the desktop website sphere with lazy-loaded 3D.
- Build touch and reduced-motion alternatives.
- Add the semantic project list and project detail panel.
- Build the Swawlambi case study, original logo treatment, office map and required claim disclosure.
- Create Solar, HVAC, Power and Safety Audit postcards.

Exit gate: all 18 URLs are represented and every project is reachable without canvas or hover.

## Phase 3: Music Vault and social adapters

- Build a normalized media data layer.
- Implement Spotify profile, track and playlist adapters.
- Support cursor pagination, search and virtualization for a 5,000-record catalog.
- Limit concurrent embeds to protect performance.
- Add Instagram and LinkedIn adapters that only activate with valid server configuration.
- Build curated fallbacks that never fake a live feed.

Exit gate: the route remains useful without credentials and scales without rendering thousands of nodes.

## Phase 4: Contact and hardening

- Build the full Contact route with supplied photo, direct email, WhatsApp, social links and map.
- Add Cal.com or Topmate embedding only when a public URL is configured.
- Add metadata, favicon and social cards.
- Complete responsive, keyboard, contrast and reduced-motion QA.
- Test broken API, slow network and JavaScript-disabled fallbacks where practical.
- Run type-check, lint, tests and production build.
- Update `docs/BUILD_STATUS.md` with exact outcomes.

Exit gate: every item in `docs/ACCEPTANCE_CRITERIA.md` passes or is explicitly documented as a blocker requiring user input.

## Phase 5: Vercel handoff

- Ensure the app deploys on Vercel without secrets.
- Document every optional environment variable.
- Do not add real secrets to GitHub.
- Provide a post-deployment checklist for domain, OAuth redirect URLs, map, social integrations and booking.
