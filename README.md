# Pratham Batra Portfolio

This repository is the implementation source for Pratham Batra's personal portfolio.

The project starts with a source-of-truth package so Codex can build from verified content and supplied assets instead of guessing from a separate chat.

## Read before coding

1. `AGENTS.md`
2. `WHAT_NOT.md`
3. `PORTFOLIO_BRIEF.md`
4. `content/profile.json`
5. `content/websites.json`
6. `content/integrations.json`
7. `docs/IMPLEMENTATION_PLAN.md`
8. `docs/ACCEPTANCE_CRITERIA.md`

The ready-to-use Codex Cloud instruction is stored at `docs/CODEX_BUILD_PROMPT.md`.

## Source status

- The repository intentionally contains no production application code yet.
- Raw credential PDFs were not committed because the repository is public and those files expose private identifiers, dates of birth, home addresses and student numbers.
- Sanitized education and language-result facts are recorded in `content/profile.json`.
- The file supplied as `Public Relations.pdf` was byte-for-byte identical to the Digital and Content Marketing completion letter. The Public Relations qualification is recorded from Pratham's direct written confirmation, not from that duplicate PDF.
- The BYOB PDF contained unsupported marketing metrics. Its seven pages are included only as visual and website-reference images. Those metrics are not approved portfolio copy.

## Deployment target

Build with Next.js, commit through GitHub and deploy on Vercel. Secrets must only exist in Vercel environment variables. Never put a token or key in source code, a public JSON file or a client-side bundle.
