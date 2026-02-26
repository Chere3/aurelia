# ROADMAP

This roadmap is intentionally execution-oriented to keep Aurelia shippable and contributor-friendly.

## Quick wins (1-2 weeks)

- [ ] Replace placeholder lint command with a real linter pipeline for the desktop app.
- [ ] Add PR template with validation checklist and risk notes.
- [ ] Add `npm run check` as a single entry point for local quality checks.
- [ ] Expand `CONTRIBUTING.md` with branch strategy + setup + verification flow.
- [ ] Add architecture decision log template in `docs/`.

## Medium (2-6 weeks)

- [ ] Implement first `packages/core` timer engine slice with deterministic unit tests.
- [ ] Add integration boundary contracts between `core`, `integrations`, and `system-lock`.
- [ ] Define persistence schema (SQLite + Prisma) with migration strategy.
- [ ] Add Playwright smoke tests for critical desktop journeys.
- [ ] Harden CI to run lint, typecheck, and test matrix.

## Big bets (6-12 weeks)

- [ ] Ship Stratum Engine v1 policy classifier for lock modes (PC-required vs no-PC).
- [ ] Add calendar-aware focus block recommendations.
- [ ] Build analytics dashboard (streaks, drift, focus quality score).
- [ ] Implement adaptive interruptions shield for deep-work sessions.

## Strategic rewrites (when justified)

- [ ] Evaluate migration path from Electron fallback to Electrobun-first runtime once parity is proven.
- [ ] Rework package boundaries if timer engine and lock policy become tightly coupled.
- [ ] Introduce domain event bus if feature scaling causes cross-package coupling.

## Definition of done for roadmap items

A roadmap item is considered complete only when:

1. Code is merged through PR with clear rationale.
2. README/docs are updated.
3. Validation steps are reproducible locally.
4. Risks and follow-up tasks are explicitly tracked.
