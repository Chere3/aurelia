import { useEffect, useMemo, useRef, useState } from "react";
import {
  createInitialTimerState,
  defaultTimerConfig,
  formatClock,
  pause,
  reset,
  skip,
  start,
  tick,
  type TimerConfig,
  type TimerState,
} from "./domain/timerEngine";
import { resolveLockMode, type FocusTask } from "./domain/stratumPolicy";

const API_BASE = "http://127.0.0.1:4187";

const starterTasks: FocusTask[] = [
  { id: "t1", title: "Arquitectura Stratum Engine", requiresComputer: true },
  { id: "t2", title: "Caminar + pensar roadmap", requiresComputer: false },
  { id: "t3", title: "Refactor módulo de sesiones", requiresComputer: true },
];

function phaseLabel(phase: TimerState["phase"]) {
  if (phase === "focus") return "Deep Focus";
  if (phase === "short_break") return "Recovery";
  if (phase === "long_break") return "Long Reset";
  return "Standby";
}

export default function App() {
  const [tasks] = useState(starterTasks);
  const [taskId, setTaskId] = useState(starterTasks[0].id);
  const [config, setConfig] = useState<TimerConfig>(defaultTimerConfig);
  const [timer, setTimer] = useState<TimerState>(() => createInitialTimerState(defaultTimerConfig));
  const [kpis, setKpis] = useState({ focusMinutesToday: 0, completedPomodoros: 0 });
  const prevPhase = useRef<TimerState["phase"]>("idle");

  const activeTask = useMemo(() => tasks.find((t) => t.id === taskId) ?? tasks[0], [tasks, taskId]);
  const lockMode = useMemo(() => resolveLockMode(activeTask), [activeTask]);

  async function refreshKpis() {
    try {
      const res = await fetch(`${API_BASE}/api/kpis/today`);
      if (res.ok) setKpis(await res.json());
    } catch {
      // noop
    }
  }

  async function persistCompletedFocus() {
    try {
      await fetch(`${API_BASE}/api/focus-sessions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phase: "focus",
          taskTitle: activeTask.title,
          requiresComputer: activeTask.requiresComputer,
          lockMode,
          plannedSeconds: config.focusMinutes * 60,
          elapsedSeconds: config.focusMinutes * 60,
          completed: true,
          startedAt: new Date(Date.now() - config.focusMinutes * 60_000).toISOString(),
          endedAt: new Date().toISOString(),
        }),
      });
      await refreshKpis();
    } catch {
      // noop
    }
  }

  useEffect(() => {
    refreshKpis();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setTimer((prev) => tick(prev, config));
    }, 1000);
    return () => clearInterval(id);
  }, [config]);

  useEffect(() => {
    const before = prevPhase.current;
    const after = timer.phase;

    if (before === "focus" && (after === "short_break" || after === "long_break")) {
      void persistCompletedFocus();
    }

    prevPhase.current = after;
  }, [timer.phase]);

  return (
    <main className="min-h-screen px-6 py-8 md:px-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="glass-card rounded-3xl p-7 md:p-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="uppercase tracking-[0.22em] text-xs text-cyan-300/80">Aurelia • Executive Focus Assistant</p>
            <h1 className="text-4xl md:text-5xl font-semibold mt-2">Stratum Command Desk</h1>
            <p className="text-slate-400 mt-2 max-w-2xl">Bloquea ruido, protege atención y mide ejecución real con sesiones trazables.</p>
          </div>
          <div className="rounded-2xl border border-cyan-400/25 bg-cyan-500/10 px-5 py-3 text-sm text-cyan-200">
            {lockMode.toUpperCase()} LOCK · {activeTask.requiresComputer ? "PC TASK" : "OFF-SCREEN TASK"}
          </div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <article className="lg:col-span-8 glass-card rounded-3xl p-6 md:p-8">
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span>Current Phase</span>
              <span className="uppercase tracking-[0.24em] text-cyan-300 font-semibold">{phaseLabel(timer.phase)}</span>
            </div>

            <div className="mt-5 text-[88px] leading-none font-semibold tracking-tight text-white tabular-nums">
              {formatClock(timer.remainingSeconds)}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="btn-primary" onClick={() => setTimer((s) => start(s, config))}>Start</button>
              <button className="btn-muted" onClick={() => setTimer((s) => pause(s))}>Pause</button>
              <button className="btn-muted" onClick={() => setTimer((s) => skip(s, config))}>Skip</button>
              <button className="btn-muted" onClick={() => setTimer(reset(config))}>Reset</button>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-700/70">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Active Mission</p>
              <p className="mt-2 text-xl font-medium text-white">{activeTask.title}</p>
              <p className="mt-2 text-sm text-slate-400">
                {lockMode === "soft"
                  ? "Soft lock: conserva apps productivas, corta distracciones."
                  : "Hard lock: bloquea interacción para enfoque fuera de pantalla."}
              </p>
            </div>
          </article>

          <aside className="lg:col-span-4 space-y-4">
            <article className="kpi-tile">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Focus Minutes Today</p>
              <p className="text-4xl mt-2 font-semibold">{kpis.focusMinutesToday}</p>
            </article>
            <article className="kpi-tile">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Pomodoros Closed</p>
              <p className="text-4xl mt-2 font-semibold">{kpis.completedPomodoros}</p>
            </article>
            <article className="kpi-tile">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Task Channel</p>
              <p className="text-2xl mt-2 font-semibold">{activeTask.requiresComputer ? "Computer" : "Offline"}</p>
            </article>
          </aside>
        </section>

        <section className="grid md:grid-cols-2 gap-5">
          <article className="glass-card rounded-3xl p-6">
            <h2 className="text-lg font-semibold">Task Selector</h2>
            <p className="text-sm text-slate-400 mt-1">El task define lock strategy automáticamente.</p>
            <select
              className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-3"
              value={taskId}
              onChange={(e) => setTaskId(e.target.value)}
            >
              {tasks.map((task) => (
                <option key={task.id} value={task.id}>
                  {task.title} {task.requiresComputer ? "· PC" : "· No PC"}
                </option>
              ))}
            </select>
          </article>

          <article className="glass-card rounded-3xl p-6">
            <h2 className="text-lg font-semibold">Session Configuration</h2>
            <p className="text-sm text-slate-400 mt-1">Afina cadencia de ejecución según energía/carga.</p>
            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
              <label className="flex flex-col gap-1 text-slate-400">Focus
                <input className="rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-white" type="number" min={1} value={config.focusMinutes} onChange={(e) => setConfig((c) => ({ ...c, focusMinutes: Number(e.target.value) || 1 }))} />
              </label>
              <label className="flex flex-col gap-1 text-slate-400">Short Break
                <input className="rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-white" type="number" min={1} value={config.shortBreakMinutes} onChange={(e) => setConfig((c) => ({ ...c, shortBreakMinutes: Number(e.target.value) || 1 }))} />
              </label>
              <label className="flex flex-col gap-1 text-slate-400">Long Break
                <input className="rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-white" type="number" min={1} value={config.longBreakMinutes} onChange={(e) => setConfig((c) => ({ ...c, longBreakMinutes: Number(e.target.value) || 1 }))} />
              </label>
              <label className="flex flex-col gap-1 text-slate-400">Long Every
                <input className="rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-white" type="number" min={2} value={config.longBreakEvery} onChange={(e) => setConfig((c) => ({ ...c, longBreakEvery: Number(e.target.value) || 2 }))} />
              </label>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
