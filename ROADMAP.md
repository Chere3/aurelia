# ROADMAP

## Quick wins
- Add CI guardrails for install, typecheck, and baseline lint checks.
- Standardize contributor onboarding with a development guide.
- Align README with the repository's current implementation state.
- Replace `lint` placeholder with ESLint + Prettier workflow in `apps/desktop`.

## Medium bets
- Implement the planned monorepo layout (`apps/`, `packages/`) incrementally.
- Add shared config package for TypeScript, lint, and formatting rules.
- Introduce SQLite + Prisma baseline with migration and seed scripts.
- Add unit tests for timer domain logic and policy engine.

## Big bets
- Build **Stratum Engine** prototype (task classification + lock policy decisions).
- Implement Google Calendar integration adapter with conflict-aware focus recommendations.
- Add observability (structured logs + performance metrics dashboard).
- Build cross-platform system-lock adapter strategy (Linux-first, macOS/Windows next).

## Strategic rewrites
- Move from single-app setup into true workspace boundaries with independent packages.
- Refactor timer and lock logic into framework-agnostic core modules.
- Introduce event-driven architecture for integrations and analytics pipelines.
- Design plugin-style capability model for future assistant extensions.
