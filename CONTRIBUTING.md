# Contributing

Thanks for helping build Aurelia.

## Workflow

1. Create a branch from `main` using one of:
   - `feat/<topic>`
   - `fix/<topic>`
   - `refactor/<topic>`
   - `chore/<topic>`
2. Use conventional commits (`feat(scope): ...`, `fix(scope): ...`, etc.).
3. Keep each PR focused on one coherent concern.
4. Open PR using the provided template and include risks + validation evidence.

## Local setup

```bash
npm install
npm run dev
```

## Pre-PR verification

Run this before pushing:

```bash
npm run typecheck
npm run build
```

If your change affects docs, update relevant files under `docs/` and `README.md`.

## Architecture and planning discipline

- Check `ROADMAP.md` before proposing major work.
- For large decisions, add context in `docs/architecture.md`.
- Document tradeoffs (not just outcomes) so the next contributor can continue quickly.
