# Aurelia

Desktop assistant de productividad personal (**Pomodoro Pro + Integraciones + Hard Focus Lock**).

Aurelia convierte sesiones de enfoque en un sistema operativo personal de ejecución.

## Vision
- Timer Pomodoro avanzado con tasks, tags, métricas y streaks.
- Integración con Google Calendar para sugerir bloques reales de enfoque.
- Hard Focus Lock inteligente según tipo de tarea:
  - **PC-required** → lock parcial (bloquea distracciones)
  - **No-PC task** → lock agresivo (interacción del sistema restringida)

## Current status

| Area | Status | Notes |
|---|---|---|
| Product spec | ✅ Drafted | `docs/product-spec.md` |
| Architecture | ✅ Drafted | `docs/architecture.md` |
| Delivery roadmap | ✅ Baseline | `ROADMAP.md` + `docs/roadmap.md` |
| Desktop shell | 🚧 MVP | Electron + React active in `apps/desktop` |
| Core engine | 🚧 In progress | `packages/core` |
| Integrations | 🚧 In progress | `packages/integrations` |
| System lock | 🚧 In progress | NixOS-first in `packages/system-lock` |

## Repository structure

```text
.
├─ apps/
│  └─ desktop/            # Electron + React app
├─ packages/
│  ├─ core/               # timer engine, task policy, analytics
│  ├─ integrations/       # calendar + external integrations
│  └─ system-lock/        # OS lock adapters (linux/mac/windows)
├─ docs/
│  ├─ architecture.md
│  ├─ product-spec.md
│  └─ roadmap.md
├─ ROADMAP.md             # execution-oriented roadmap
└─ .github/workflows/ci.yml
```

## Prerequisites
- **Bun** `>=1.0`
- **Node.js** `>=22` (for ecosystem compatibility and tooling)

## Quick start

```bash
bun install
cp .env.example .env
bun run dev
```

## Workspace commands

```bash
bun run dev         # run desktop app (vite + electron)
bun run typecheck   # workspace typecheck
bun run lint        # temporary quality gate (mirrors typecheck)
bun run build       # production build for desktop app
bun run check       # lint + typecheck + build
```

## Quality gates
Before opening a PR, run:

```bash
bun run check
```

CI validates the same baseline (`install`, `typecheck`, `build`) on pushes and pull requests.

## Documentation
- Product scope: [`docs/product-spec.md`](docs/product-spec.md)
- Architecture: [`docs/architecture.md`](docs/architecture.md)
- Baseline timeline: [`docs/roadmap.md`](docs/roadmap.md)
- Execution backlog: [`ROADMAP.md`](ROADMAP.md)
- Contribution guide: [`CONTRIBUTING.md`](CONTRIBUTING.md)

## License
MIT

## Internal architecture name
- **Stratum Engine**: task classification + lock policy brain.
