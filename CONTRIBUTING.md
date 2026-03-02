# Contributing

Thanks for improving Aurelia.

## Branch and commit conventions

- Branch from `main` using prefixes:
  - `feat/*` for user-facing improvements
  - `fix/*` for bugs
  - `chore/*` for docs/tooling/infra
- Use [Conventional Commits](https://www.conventionalcommits.org/).
- Keep each PR coherent and reviewable.

## Local setup

```bash
bun install
```

## Quality gate (required before PR)

```bash
bun run typecheck
bun run check
```

## Pull Request expectations

1. Explain *why* the change is needed.
2. Include validation commands and outcomes.
3. Call out risks, migration steps, and follow-ups.
4. Update README/docs/roadmap when behavior or scope changes.

The repository includes a PR template at `.github/pull_request_template.md`.
