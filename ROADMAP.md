# ROADMAP

## Quick wins (1-2 weeks)
- Replace placeholder lint script with real ESLint execution and CI gate.
- Add `.env.example` for desktop app and document required variables.
- Add architecture decision log (ADR-lite) for lock policy and calendar sync boundaries.
- Harden onboarding with reproducible setup steps for NixOS + non-NixOS.

## Medium (2-6 weeks)
- Implement end-to-end Pomodoro session persistence with analytics snapshots.
- Deliver Google Calendar read integration with conflict-aware focus block suggestions.
- Build lock policy simulator for dry-run testing without system-level enforcement.
- Add integration tests for timer engine + policy transitions.

## Big bets (1-3 months)
- Production-grade Hard Focus Lock adapters for Linux/macOS/Windows.
- Intelligent task classification pipeline to auto-suggest lock intensity.
- Executive dashboard with weekly throughput, deep-work ratio, and streak health.
- Offline-first sync strategy for calendar/task state reconciliation.

## Strategic rewrites
- Isolate `packages/core` as framework-agnostic domain module with strict API contracts.
- Move side effects (DB, OS lock, calendar APIs) behind ports/adapters for testability.
- Introduce event-driven state transitions to reduce implicit coupling in timer lifecycle.
- Standardize telemetry events to support product analytics and future ML recommendations.
