export type LockMode = 'soft' | 'hard'

export interface FocusTask {
  id: string
  title: string
  requiresComputer: boolean
}

export function resolveLockMode(task: FocusTask): LockMode {
  return task.requiresComputer ? 'soft' : 'hard'
}
