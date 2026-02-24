# Aurelia

Desktop assistant de productividad personal (Pomodoro Pro + Integraciones + Hard Focus Lock).

## Vision
Aurelia convierte sesiones de enfoque en un sistema operativo personal de ejecución:
- Timer Pomodoro avanzado con tasks, tags, métricas y streaks
- Integración con Google Calendar para sugerir bloques reales de enfoque
- Hard Focus Lock inteligente según tipo de tarea

## Current repo state
Actualmente el código ejecutable vive en `apps/desktop` y se opera desde scripts raíz.
La estructura monorepo extendida (`packages/*`) está planificada y documentada en roadmap.

## Quick start
```bash
bun install
bun run dev
```

## Quality checks
```bash
bun run typecheck
bun run lint
bun run build
```

## Documentation
- Product spec: [`docs/product-spec.md`](docs/product-spec.md)
- Architecture: [`docs/architecture.md`](docs/architecture.md)
- Development guide: [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md)
- Roadmap: [`ROADMAP.md`](ROADMAP.md)

## License
MIT

## Internal Architecture Name
**Stratum Engine**: task classification + lock policy brain.
