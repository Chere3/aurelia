# Aurelia

Desktop assistant de productividad personal (Pomodoro Pro + Integraciones + Hard Focus Lock).

## Vision
Aurelia convierte sesiones de enfoque en un sistema operativo personal de ejecución:

- Timer Pomodoro avanzado con tasks, tags, métricas y streaks.
- Integración con Google Calendar para sugerir bloques reales de enfoque.
- Hard Focus Lock inteligente según tipo de tarea:
  - **PC-required** → lock parcial (bloquea distracciones)
  - **No-PC task** → lock agresivo (interacción del sistema restringida)

## Current stack

- Bun workspaces
- React + TypeScript (desktop app)
- SQLite + Prisma (planned baseline)
- Zustand for client state

## Monorepo layout (target)

```txt
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
└─ .github/
   ├─ workflows/ci.yml
   └─ ISSUE_TEMPLATE/
```

## Quick start

```bash
bun install
bun run dev
```

### Quality checks

```bash
bun run typecheck
bun run lint
bun run build
```

> Note: `lint` is currently a placeholder and will be replaced by a real lint pipeline.

## Planning docs

- High-level roadmap: [`ROADMAP.md`](ROADMAP.md)
- Product details: [`docs/product-spec.md`](docs/product-spec.md)
- Architecture draft: [`docs/architecture.md`](docs/architecture.md)

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

## License

MIT

## Internal architecture codename

- **Stratum Engine**: task classification + lock policy brain.
