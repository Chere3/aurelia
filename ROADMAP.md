# ROADMAP

Portfolio-oriented roadmap for **Aurelia** (desktop productivity assistant).

## Quick wins (0-2 weeks)
- [ ] Replace scaffold CI with real quality gate (install + typecheck).
- [ ] Remove tracked build artifacts (`apps/desktop/dist*`) and keep them ignored.
- [ ] Standardize local commands in root `package.json` (`dev`, `build`, `typecheck`, `check`).
- [ ] Tighten README onboarding (requirements, workspace layout, first run).

## Medium bets (2-6 weeks)
- [ ] Add linting stack (Biome or ESLint) and enforce in CI.
- [ ] Introduce test harness for timer engine and lock policy units.
- [ ] Add architecture decision records (ADR) for lock policy + event model.
- [ ] Package-level scripts for `core`, `integrations`, and `system-lock`.

## Big bets (1-2 months)
- [ ] Implement Stratum Engine v1 (task classification + adaptive lock levels).
- [ ] Google Calendar integration adapter with conflict-safe focus suggestions.
- [ ] Metrics pipeline for focus sessions (streaks, interruption score, daily throughput).
- [ ] Linux hard-focus adapter with explicit allowlist/denylist strategy.

## Strategic rewrites (as needed)
- [ ] Evaluate migration from dual prototype setup to one canonical shell (Electron or Electrobun).
- [ ] Formalize domain boundaries between UI orchestration and timer/policy core packages.
- [ ] Move lock adapters to capability-based interface for cross-platform parity.
