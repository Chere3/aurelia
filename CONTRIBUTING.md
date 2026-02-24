# Contributing

Thanks for improving Aurelia.

## Workflow standards
- Use conventional commits.
- Keep PRs coherent and reviewable.
- Open PRs against the default branch with a clear validation section.

## Local setup
```bash
bun install
bun run dev
```

## Pre-PR checks
```bash
bun run typecheck
bun run build
bun run lint
```

## PR checklist
- [ ] Scope is explicit and tied to roadmap/spec.
- [ ] Updated docs when behavior, setup, or architecture changed.
- [ ] Added/updated tests where feasible.
- [ ] Included risk notes and rollback plan for system-lock changes.

## Branch naming
- `feat/<topic>`
- `fix/<topic>`
- `refactor/<topic>`
- `chore/<topic>`
