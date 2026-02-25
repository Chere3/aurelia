# Contributing to Aurelia

Thanks for helping improve Aurelia.

## Branch naming
Use descriptive branch names:
- `feat/<scope>-<short-description>`
- `fix/<scope>-<short-description>`
- `chore/<scope>-<short-description>`
- `docs/<scope>-<short-description>`

Examples:
- `feat/core-pomodoro-engine`
- `fix/desktop-tray-crash`
- `docs/onboarding-readme`

## Commit convention
Use Conventional Commits:
- `feat: ...`
- `fix: ...`
- `docs: ...`
- `refactor: ...`
- `chore: ...`
- `test: ...`

## Local validation checklist
Run before opening a PR:

```bash
bun install
bun run lint
bun run typecheck
bun run build
```

Or run the full pipeline:

```bash
bun run check
```

## Pull request checklist
- [ ] PR has a clear title and summary
- [ ] Linked issue/task (if available)
- [ ] `bun run check` passes locally
- [ ] Docs updated (README/ROADMAP/docs) when behavior changed
- [ ] Screenshots or terminal output included for UX/CLI-impacting changes
- [ ] Risks and rollback notes documented for non-trivial changes

## Review expectations
- Keep PRs coherent and easy to review
- Prefer small/medium slices unless a deep refactor is explicitly justified
- Call out architectural trade-offs in PR description

