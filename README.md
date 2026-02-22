# Executive Focus OS

Desktop MVP de productividad personal (Pomodoro Pro + Integraciones + Hard Focus Lock).

## Vision
Executive Focus OS convierte sesiones de enfoque en un sistema operativo personal de ejecución:
- Timer Pomodoro avanzado con tasks, tags, métricas y streaks.
- Integración con Google Calendar para sugerir bloques reales de enfoque.
- Hard Focus Lock inteligente según tipo de tarea:
  - **PC-required** → lock parcial (bloquea distracciones)
  - **No-PC task** → lock agresivo (interacción del sistema restringida)

## MVP Scope
- Electron + React + TypeScript
- SQLite + Prisma
- Zustand + UI ejecutiva
- Motor de timer + policy engine
- Adaptador de bloqueo Linux (NixOS-first)

## Monorepo Layout (MVP)
```
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

## Quick Start (planned)
```bash
npm install
npm run dev
```

## Roadmap
Consulta [`docs/roadmap.md`](docs/roadmap.md).

## License
MIT
