import { useMemo, useState } from 'react'

type FocusMode = 'soft' | 'hard'

export function App() {
  const [requiresComputer, setRequiresComputer] = useState(true)
  const [task, setTask] = useState('Design Stratum policy engine')

  const lockMode: FocusMode = useMemo(
    () => (requiresComputer ? 'soft' : 'hard'),
    [requiresComputer]
  )

  return (
    <main className="shell">
      <header>
        <h1>Aurelia</h1>
        <p>Executive Focus Assistant · Stratum Engine</p>
      </header>

      <section className="card">
        <h2>Focus Policy Preview</h2>
        <label>
          Task
          <input value={task} onChange={(e) => setTask(e.target.value)} />
        </label>
        <label className="checkbox">
          <input
            type="checkbox"
            checked={requiresComputer}
            onChange={(e) => setRequiresComputer(e.target.checked)}
          />
          Requires computer
        </label>

        <div className="metric">
          <span>Selected lock mode</span>
          <strong>{lockMode.toUpperCase()} LOCK</strong>
        </div>
      </section>
    </main>
  )
}
