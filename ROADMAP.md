# ROADMAP

This file provides an executive view of priorities. Detailed product and architecture notes remain under `docs/`.

## Quick wins (1-2 weeks)

- [ ] Replace placeholder `lint` script with real lint pipeline (ESLint + formatting).
- [ ] Add CI workflow for `typecheck + lint + build`.
- [ ] Add app-level `.env.example` and setup validation script.
- [ ] Add screenshots/GIFs in README for key flows.

## Medium bets (2-6 weeks)

- [ ] Finish `packages/core` extraction for timer and policy engine.
- [ ] Introduce integration contract tests for calendar adapter.
- [ ] Define analytics schema and persistence strategy.
- [ ] Add lock-policy simulation mode for safe testing.

## Big bets (1-2 quarters)

- [ ] Multi-platform lock adapters (Linux/macOS/Windows parity).
- [ ] Adaptive focus recommendations driven by historical outcomes.
- [ ] Team mode (shared focus rooms + accountability layer).

## Strategic rewrites (as justified)

- [ ] Revisit shell architecture (Electrobun vs Electron baseline) based on reliability/perf metrics.
- [ ] Separate policy engine into standalone package with versioned API.
- [ ] Introduce event-sourcing for session analytics if reporting complexity increases.

## Validation checklist

- [ ] Product/engineering rationale captured in PR.
- [ ] Verification steps reproducible.
- [ ] Risks + rollback plan documented.
