# Development Guide

## Prerequisites
- Bun `1.0.3`
- Node.js `>=20` (for ecosystem tooling)

## Setup
```bash
bun install
```

## Local development
```bash
bun run dev
```

## Quality checks
```bash
bun run typecheck
bun run lint
bun run build
```

## Contribution flow
1. Create a feature branch from `main`.
2. Make focused changes with docs/tests when relevant.
3. Run quality checks locally.
4. Open a PR with:
   - context/problem
   - implementation summary
   - verification checklist
   - follow-up items

## Current implementation note
The repository currently runs from `apps/desktop` scripts while the broader monorepo plan is still being rolled out.
