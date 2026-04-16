import { Link } from 'react-router-dom'

export default function QuestionCard({ num, kicker, title, summary, tags, to, align = 'left' }) {
  return (
    <Link
      to={to}
      className={`group relative block corner-mark p-7 md:p-10 bg-obsidian-900/40 backdrop-blur-sm transition-all duration-500 hover:bg-obsidian-800/60 overflow-hidden ${align === 'right' ? 'md:translate-y-16' : ''}`}
    >
      <span></span>

      <div className="flex items-start justify-between mb-8">
        <span className="display text-[110px] md:text-[140px] leading-none text-bone-50/8 group-hover:text-ember-500/30 transition-colors duration-500 -mt-4">
          {num}
        </span>
        <div className="text-right mt-3">
          <span className="eyebrow block text-ember-400">{kicker}</span>
        </div>
      </div>

      <h3 className="display text-3xl md:text-4xl lg:text-[2.7rem] leading-[1.04] text-bone-50 group-hover:text-ember-400 transition-colors">
        {title}
      </h3>

      <p className="mt-6 text-bone-200/80 text-sm md:text-base leading-relaxed max-w-lg">
        {summary}
      </p>

      <div className="mt-7 flex flex-wrap gap-1.5">
        {tags.map(t => (
          <span key={t} className="mono text-[10px] px-2 py-1 border border-bone-300/20 text-bone-100/90 group-hover:border-ember-500/50 transition-colors">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-9 flex items-center justify-between">
        <span className="mono text-[11px] tracking-[0.22em] uppercase text-bone-300">Open architecture</span>
        <span className="mono text-2xl text-ember-500 transition-transform duration-300 group-hover:translate-x-1">⟶</span>
      </div>
    </Link>
  )
}
