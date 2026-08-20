# Codex instructions for this repository

## Mission

Build a distinctive, production-ready portfolio for Pratham Batra. The result must feel authored, cinematic and precise. It must not resemble a generic AI-generated landing page.

## Required reading order

Before planning or editing any application file, read these files in order:

1. `AGENTS.md`
2. `WHAT_NOT.md`
3. `PORTFOLIO_BRIEF.md`
4. `content/profile.json`
5. `content/websites.json`
6. `content/integrations.json`
7. `docs/IMPLEMENTATION_PLAN.md`
8. `docs/INTEGRATIONS.md`
9. `docs/ACCEPTANCE_CRITERIA.md`

Inspect every file in `public/assets` and `public/reference/byob` before selecting the visual treatment.

## Source precedence

Use this order when sources conflict:

1. The user's newest explicit instruction in the active Codex task
2. `WHAT_NOT.md` for negative design constraints
3. `PORTFOLIO_BRIEF.md` for product intent and behaviour
4. Structured files in `content/` for facts and links
5. Reference images for visual and historical context

Do not silently reinterpret a conflict. Record the decision in `docs/BUILD_STATUS.md`.

## Non-negotiable behaviour

- Do not stop after producing a plan. Plan briefly, then implement.
- Do not invent jobs, dates, licenses, clients, project results, testimonials, song counts or social posts.
- Hide content whose required value is null. Do not publish visible placeholder copy.
- Treat all unverified numbers as unverified. Follow the exact claim labels in `content/profile.json`.
- Never reproduce unsupported metrics found in the BYOB reference pages.
- Never commit a secret, API token, OAuth refresh token, private identifier or raw credential PDF.
- Do not scrape Instagram, LinkedIn or Spotify in ways that violate their platform rules.
- Use graceful, honest fallbacks when an API is not configured.
- Use ASCII punctuation in authored copy. Do not use an em dash.
- Do not replace supplied assets without noting the reason in `docs/BUILD_STATUS.md`.
- Do not remove mobile or reduced-motion support to simplify animation work.
- Do not call the project finished while build, lint, tests or the acceptance checklist fail.

## Technical baseline

- Next.js App Router with TypeScript in strict mode
- Latest stable versions compatible with the build environment
- CSS Modules or a similarly explicit token-based styling approach
- GSAP with ScrollTrigger for the main scroll choreography
- React Three Fiber only where it materially improves the website sphere
- Lottie support for `public/assets/greetings.json`
- Route-level dynamic imports for heavy animation, 3D and media code
- Server-only adapters for authenticated APIs
- Static, curated fallbacks for every external integration
- Playwright for critical journeys and responsive smoke tests
- Vercel as the production deployment target

Do not add a library solely because it is popular. Keep the client bundle disciplined.

## Implementation discipline

1. Create or update `docs/BUILD_STATUS.md` before coding.
2. Implement in the phases defined by `docs/IMPLEMENTATION_PLAN.md`.
3. After each phase, run the relevant tests and record the outcome.
4. Test desktop, tablet and mobile widths.
5. Verify keyboard use, focus states and reduced-motion behaviour.
6. Run `npm run build`, lint, type-check and tests before completion.
7. Report exact remaining blockers. Never describe an unconfigured integration as live.

## Quality bar

The site should be memorable because its narrative and motion are coherent, not because every element moves. Animation must explain transitions between identity, experience, education, music and contact.

If a complex effect performs poorly, preserve the story with a simpler, intentional mobile or reduced-motion treatment. Never ship scroll trapping, unreadable type, overlapping text or a page that depends on a mouse.
