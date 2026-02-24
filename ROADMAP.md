# ROADMAP

This roadmap is portfolio-facing: it tracks execution quality and production-readiness for **Aurelia**.

## Quick wins (1-2 weeks)
- Replace placeholder `lint` script with real workspace linting.
- Add `check` script (`lint + typecheck + build`) for CI/local parity.
- Improve `CONTRIBUTING.md` with branch, commit, and PR quality guidelines.
- Document environment variables and local setup expectations.

## Medium (2-6 weeks)
- Add unit tests for timer core and lock-policy decision matrix.
- Add architecture decision records (ADRs) for Electron shell and lock adapter boundaries.
- Add release/versioning workflow for desktop builds.
- Add issue templates for bug triage and feature RFCs.

## Big bets (1-2 months)
- Real lock adapter for Linux (NixOS-first) with safe fallback mode.
- Calendar-aware focus planner (task-type based suggested sessions).
- Session analytics dashboard with streak integrity and anti-gaming rules.
- Plugin-style integrations package (calendar/music/notifications) with contract tests.

## Strategic rewrites (when justified)
- Re-evaluate desktop shell boundary (Electron vs Electrobun) based on startup performance and packaging stability.
- Split domain engine (`timer`, `policy`, `analytics`) into separately testable modules with strict ports/adapters.
- Introduce event-sourced session timeline if telemetry complexity outgrows current state model.
