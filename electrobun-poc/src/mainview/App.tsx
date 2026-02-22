import { useEffect, useMemo, useState } from "react";
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

const starterTasks: FocusTask[] = [
  { id: "t1", title: "Arquitectura Stratum Engine", requiresComputer: true },
  { id: "t2", title: "Caminar + pensar roadmap", requiresComputer: false },
  { id: "t3", title: "Refactor módulo de sesiones", requiresComputer: true },
];

function phaseLabel(phase: TimerState["phase"]) {
  if (phase === "focus") return "Focus";
  if (phase === "short_break") return "Short Break";
  if (phase === "long_break") return "Long Break";
  return "Ready";
}

export default function App() {
  const [tasks] = useState(starterTasks);
  const [taskId, setTaskId] = useState(starterTasks[0].id);
  const [config, setConfig] = useState<TimerConfig>(defaultTimerConfig);
  const [timer, setTimer] = useState<TimerState>(() => createInitialTimerState(defaultTimerConfig));

  const activeTask = useMemo(() => tasks.find((t) => t.id === taskId) ?? tasks[0], [tasks, taskId]);
  const lockMode = useMemo(() => resolveLockMode(activeTask), [activeTask]);

  useEffect(() => {
    const id = setInterval(() => {
      setTimer((prev) => tick(prev, config));
    }, 1000);
    return () => clearInterval(id);
  }, [config]);

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 px-8 py-10">
      <div className="mx-auto max-w-6xl grid gap-6">
        <header className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 to-slate-950 p-6">
          <h1 className="text-4xl font-semibold tracking-wide">Aurelia</h1>
          <p className="text-slate-400 mt-1">Executive Focus Assistant · Stratum Engine</p>
        </header>

        <section className="grid md:grid-cols-3 gap-4">
          <article className="md:col-span-2 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Session State</span>
              <span className="text-xs uppercase tracking-[0.2em] text-cyan-400">{phaseLabel(timer.phase)}</span>
            </div>
            <div className="mt-4 text-7xl font-semibold tabular-nums">{formatClock(timer.remainingSeconds)}</div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-medium" onClick={() => setTimer((s) => start(s, config))}>
                Start
              </button>
              <button className="px-4 py-2 rounded-lg bg-slate-700" onClick={() => setTimer((s) => pause(s))}>
                Pause
              </button>
              <button className="px-4 py-2 rounded-lg bg-slate-700" onClick={() => setTimer((s) => skip(s, config))}>
                Skip
              </button>
              <button className="px-4 py-2 rounded-lg bg-slate-700" onClick={() => setTimer(reset(config))}>
                Reset
              </button>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-slate-400">Stratum Policy</p>
            <p className="mt-3 text-sm text-slate-300">Task: <span className="font-medium text-white">{activeTask.title}</span></p>
            <div className="mt-4 inline-flex px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-slate-800 text-cyan-300">
              {lockMode.toUpperCase()} LOCK
            </div>
            <p className="mt-3 text-xs text-slate-500">
              {lockMode === "soft"
                ? "Task requires computer: allow productive apps, block distractions."
                : "Task does not require computer: aggressive lock during focus."}
            </p>
          </article>
        </section>

        <section className="grid md:grid-cols-2 gap-4">
          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-lg font-medium">Task Selector</h2>
            <select
              className="mt-4 w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2"
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

          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-lg font-medium">Timer Config</h2>
            <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
              <label className="flex flex-col gap-1 text-slate-400">
                Focus
                <input
                  className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white"
                  type="number"
                  min={1}
                  value={config.focusMinutes}
                  onChange={(e) => setConfig((c) => ({ ...c, focusMinutes: Number(e.target.value) || 1 }))}
                />
              </label>
              <label className="flex flex-col gap-1 text-slate-400">
                Short Break
                <input
                  className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white"
                  type="number"
                  min={1}
                  value={config.shortBreakMinutes}
                  onChange={(e) => setConfig((c) => ({ ...c, shortBreakMinutes: Number(e.target.value) || 1 }))}
                />
              </label>
              <label className="flex flex-col gap-1 text-slate-400">
                Long Break
                <input
                  className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white"
                  type="number"
                  min={1}
                  value={config.longBreakMinutes}
                  onChange={(e) => setConfig((c) => ({ ...c, longBreakMinutes: Number(e.target.value) || 1 }))}
                />
              </label>
              <label className="flex flex-col gap-1 text-slate-400">
                Long Every
                <input
                  className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white"
                  type="number"
                  min={2}
                  value={config.longBreakEvery}
                  onChange={(e) => setConfig((c) => ({ ...c, longBreakEvery: Number(e.target.value) || 2 }))}
                />
              </label>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
