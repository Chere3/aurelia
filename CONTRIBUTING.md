# Contributing to Aurelia

Thanks for contributing. Keep changes production-minded and easy to review.

## Branching
- Base branch: `main`
- Branch names:
  - `feat/<topic>`
  - `fix/<topic>`
  - `refactor/<topic>`
  - `chore/<topic>`

## Commit style
Use Conventional Commits:
- `feat(scope): ...`
- `fix(scope): ...`
- `refactor(scope): ...`
- `chore(scope): ...`

## Local quality gate
Before opening a PR:

```bash
bun run check
```

This runs lint, typecheck, and build for baseline confidence.

## Pull requests
Include in PR description:
1. What changed
2. Why this change matters
3. How to validate
4. Risk/rollback notes

## Scope guidance
- Prefer one concern per PR.
- Keep refactors separate from behavior changes when possible.
- Do not include unrelated formatting churn.
