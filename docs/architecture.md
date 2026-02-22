# Architecture

## Modules
- `packages/core`: timer-state-machine, task engine, analytics.
- `packages/integrations`: calendar provider interfaces + Google adapter.
- `packages/system-lock`: lock adapter contracts + linux implementation.
- `apps/desktop`: Electron shell + React executive UI.

## Key rule
`requiresComputer` from task drives lock policy:
- true -> soft lock
- false -> hard lock


## Internal Codename
- Core decision/policy subsystem: **Stratum Engine**
