# Contributing

## Branches

Use clear prefixes:

- `feat/<topic>`
- `fix/<topic>`
- `refactor/<topic>`
- `docs/<topic>`
- `chore/<topic>`

## Commits

Use conventional commits (e.g., `feat(timer): ...`, `docs(readme): ...`).

## Before opening PR

Run:

```bash
bun run typecheck
bun run lint
bun run build
```

If a check is currently placeholder/non-blocking, mention it explicitly in the PR validation section.

## PR quality bar

Include:

1. Summary of changes
2. Why the change was needed
3. Validation steps and results
4. Risks + rollback notes
5. Follow-up tasks (if any)
