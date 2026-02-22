export type TimerPhase = "idle" | "focus" | "short_break" | "long_break";

export type TimerConfig = {
  focusMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  longBreakEvery: number;
};

export type TimerState = {
  phase: TimerPhase;
  isRunning: boolean;
  remainingSeconds: number;
  completedFocusSessions: number;
};

export const defaultTimerConfig: TimerConfig = {
  focusMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  longBreakEvery: 4,
};

const toSeconds = (m: number) => m * 60;

const durationFor = (phase: TimerPhase, config: TimerConfig) => {
  if (phase === "focus") return toSeconds(config.focusMinutes);
  if (phase === "short_break") return toSeconds(config.shortBreakMinutes);
  if (phase === "long_break") return toSeconds(config.longBreakMinutes);
  return 0;
};

export function createInitialTimerState(config: TimerConfig = defaultTimerConfig): TimerState {
  return {
    phase: "idle",
    isRunning: false,
    remainingSeconds: durationFor("focus", config),
    completedFocusSessions: 0,
  };
}

export function start(state: TimerState, config: TimerConfig): TimerState {
  const phase = state.phase === "idle" ? "focus" : state.phase;
  return {
    ...state,
    phase,
    isRunning: true,
    remainingSeconds: state.phase === "idle" ? durationFor("focus", config) : state.remainingSeconds,
  };
}

export function pause(state: TimerState): TimerState {
  return { ...state, isRunning: false };
}

export function reset(config: TimerConfig): TimerState {
  return createInitialTimerState(config);
}

function nextPhase(state: TimerState, config: TimerConfig): TimerState {
  if (state.phase === "focus") {
    const completed = state.completedFocusSessions + 1;
    const longBreak = completed % config.longBreakEvery === 0;
    const phase: TimerPhase = longBreak ? "long_break" : "short_break";
    return {
      ...state,
      phase,
      isRunning: true,
      completedFocusSessions: completed,
      remainingSeconds: durationFor(phase, config),
    };
  }

  return {
    ...state,
    phase: "focus",
    isRunning: true,
    remainingSeconds: durationFor("focus", config),
  };
}

export function skip(state: TimerState, config: TimerConfig): TimerState {
  const safe = state.phase === "idle" ? start(state, config) : state;
  return nextPhase(safe, config);
}

export function tick(state: TimerState, config: TimerConfig): TimerState {
  if (!state.isRunning) return state;
  if (state.remainingSeconds > 1) {
    return { ...state, remainingSeconds: state.remainingSeconds - 1 };
  }
  return nextPhase({ ...state, remainingSeconds: 0 }, config);
}

export function formatClock(seconds: number): string {
  const mm = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const ss = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mm}:${ss}`;
}
