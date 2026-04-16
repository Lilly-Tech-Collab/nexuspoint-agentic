import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

export default function PageShell({ children, next }) {
  return (
    <div className="grain relative min-h-screen bg-obsidian-950 text-bone-50 overflow-x-hidden">
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer next={next} />
    </div>
  )
}

export function Section({ eyebrow, title, subtitle, children, accent }) {
  return (
    <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
        <div className="md:col-span-4">
          {eyebrow && <span className="eyebrow block mb-4" style={accent ? { color: 'var(--ember)' } : undefined}>{eyebrow}</span>}
          <h2 className="display text-4xl md:text-5xl text-bone-50 leading-[1.02]">{title}</h2>
          {subtitle && <p className="mt-5 text-bone-200/80 text-base md:text-lg leading-relaxed max-w-md">{subtitle}</p>}
        </div>
        <div className="md:col-span-8">{children}</div>
      </div>
    </section>
  )
}

export function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-ember-500/30 bg-ember-500/5 mono text-[10px] tracking-[0.2em] uppercase text-ember-400">
      <span className="w-1 h-1 rounded-full bg-ember-500" />
      {children}
    </span>
  )
}

export function StatGrid({ stats }) {
  const borderCls = "border-bone-50/10"
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 border-t border-b ${borderCls}`}>
      {stats.map((s, i) => {
        const isLastCol   = (i + 1) % 2 === 0
        const isLastColMd = (i + 1) % 4 === 0
        const isFirstRow  = i < 2
        const isFirstRowMd = i < 4
        return (
          <div
            key={i}
            className={[
              'px-5 md:px-8 py-7',
              !isLastCol ? `border-r ${borderCls}` : '',
              !isLastColMd ? `md:border-r ${borderCls}` : 'md:border-r-0',
              isFirstRow ? `border-b ${borderCls}` : '',
              isFirstRowMd ? 'md:border-b-0' : '',
            ].join(' ')}
          >
            <div className="mono text-[10px] tracking-[0.22em] uppercase text-bone-300 mb-3">{s.label}</div>
            <div className="display text-3xl md:text-4xl text-bone-50">{s.value}</div>
            {s.hint && <div className="mt-2 text-xs text-bone-200/60">{s.hint}</div>}
          </div>
        )
      })}
    </div>
  )
}

export function AgentCard({ n, name, role, tools, guardrails }) {
  return (
    <article className="relative corner-mark p-6 md:p-7 bg-obsidian-900/60 backdrop-blur-sm">
      <span></span>
      <div className="flex items-baseline justify-between mb-4">
        <span className="mono text-[11px] tracking-[0.22em] uppercase text-ember-400">Agent {n}</span>
        <span className="mono text-[10px] tracking-[0.22em] uppercase text-bone-300">autonomous</span>
      </div>
      <h3 className="display text-2xl md:text-3xl text-bone-50 mb-3">{name}</h3>
      <p className="text-bone-200/80 text-sm leading-relaxed mb-5">{role}</p>
      {tools && (
        <div className="mb-4">
          <div className="mono text-[10px] tracking-[0.22em] uppercase text-bone-300 mb-2">Tools</div>
          <div className="flex flex-wrap gap-1.5">
            {tools.map(t => (
              <span key={t} className="mono text-[10px] px-2 py-1 border border-bone-300/20 text-bone-100/90">{t}</span>
            ))}
          </div>
        </div>
      )}
      {guardrails && (
        <div>
          <div className="mono text-[10px] tracking-[0.22em] uppercase text-bone-300 mb-2">Guardrails</div>
          <ul className="text-xs text-bone-200/75 space-y-1 list-disc list-inside">
            {guardrails.map(g => <li key={g}>{g}</li>)}
          </ul>
        </div>
      )}
    </article>
  )
}

export function SplitRow({ left, right }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  )
}

export function Callout({ title, children, tone = 'ember' }) {
  const toneCls = tone === 'teal'
    ? 'border-teal-500/40 bg-teal-500/5 text-teal-400'
    : 'border-ember-500/40 bg-ember-500/5 text-ember-400'
  return (
    <div className={`relative border ${toneCls} p-6 md:p-7`}>
      <div className="mono text-[10px] tracking-[0.22em] uppercase mb-3 opacity-90">{title}</div>
      <div className="text-bone-50/90 text-sm md:text-base leading-relaxed">{children}</div>
    </div>
  )
}
