# ROADMAP

Execution-oriented roadmap for turning **Aurelia** into a production-ready desktop productivity assistant.

## Quick wins (0-2 weeks)
- [ ] **QW-1** Replace placeholder lint flow with a real quality gate (temporary alias to typecheck until ESLint stack is added)
- [ ] **QW-2** Add contributor-ready onboarding docs (README + CONTRIBUTING + environment setup)
- [ ] **QW-3** Harden CI to run install, typecheck and build on every PR
- [ ] **QW-4** Add architecture ownership notes linking apps and packages

## Medium bets (2-6 weeks)
- [ ] **MB-1** Implement core Pomodoro state machine in `packages/core`
- [ ] **MB-2** Ship task CRUD + persistence contracts (SQLite + Prisma)
- [ ] **MB-3** Implement first Linux lock adapter in `packages/system-lock`
- [ ] **MB-4** Expose calendar block suggestions in `packages/integrations`

## Big bets (6-12 weeks)
- [ ] **BB-1** Production desktop packaging (Linux first, macOS/Windows follow-up)
- [ ] **BB-2** Metrics layer (streaks, deep-focus score, time-to-start)
- [ ] **BB-3** Policy engine v1 for adaptive lock intensity by task type
- [ ] **BB-4** End-to-end test harness for desktop + lock behavior

## Strategic rewrites (as needed)
- [ ] **SR-1** Migrate from MVP shell to stable architecture boundaries (`apps/desktop` thin, logic in packages)
- [ ] **SR-2** Replace ad-hoc lock scripts with capability-driven adapter interface
- [ ] **SR-3** Introduce domain event model for timer/task/lock transitions
- [ ] **SR-4** Split product and technical docs into ADR + product discovery tracks

## Delivery phases
1. **Foundation**: quality gates, docs, CI reliability
2. **Core Product**: timer engine + tasks + lock engine primitives
3. **Integrations**: calendar + analytics + adaptive behavior
4. **Scale & Harden**: packaging, E2E tests, reliability and telemetry

See also: `docs/roadmap.md`, `docs/architecture.md`, `docs/product-spec.md`.
