# Aurelia

Desktop assistant de productividad personal (**Pomodoro Pro + Integraciones + Hard Focus Lock**).

[![CI](https://github.com/Chere3/aurelia/actions/workflows/ci.yml/badge.svg)](https://github.com/Chere3/aurelia/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

## Vision
Aurelia convierte sesiones de enfoque en un sistema operativo personal de ejecución:
- Timer Pomodoro avanzado con tasks, tags, métricas y streaks
- Integración con Google Calendar para sugerir bloques reales de enfoque
- Hard Focus Lock inteligente según tipo de tarea:
  - **PC-required** → lock parcial (bloquea distracciones)
  - **No-PC task** → lock agresivo (interacción del sistema restringida)

## Monorepo layout

```text
.
├─ apps/
│  └─ desktop/            # Electron + React app
├─ packages/
│  ├─ core/               # timer engine, task policy, analytics
│  ├─ integrations/       # google calendar, spotify (post-MVP)
│  └─ system-lock/        # OS adapters (linux/mac/windows)
├─ docs/
│  ├─ architecture.md
│  ├─ roadmap.md
│  └─ product-spec.md
└─ ROADMAP.md             # portfolio-facing roadmap (this repo)
```

## Requirements
- [Bun](https://bun.sh/) `>=1.0`
- Node.js `22` (for compatibility with tooling/CI)

## Quick start

```bash
bun install
bun run dev
```

## Quality checks

```bash
bun run typecheck
bun run check
```

## Scripts
- `bun run dev` — start desktop app in development mode
- `bun run build` — build renderer + electron main bundles
- `bun run typecheck` — TypeScript validation for desktop app
- `bun run check` — CI-friendly quality gate

## Roadmap
- Product and architecture details: [`docs/roadmap.md`](docs/roadmap.md)
- Portfolio execution plan: [`ROADMAP.md`](./ROADMAP.md)

## Contributing
Read [`CONTRIBUTING.md`](./CONTRIBUTING.md) before submitting changes.

## License
MIT
