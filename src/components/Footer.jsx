import { Link } from 'react-router-dom'

export default function Footer({ next }) {
  return (
    <footer className="relative z-10 mt-24">
      {next && (
        <Link to={next.to} className="block group">
          <div className="relative hair-t hair-b py-16 md:py-24 overflow-hidden">
            <div className="mx-auto max-w-[1400px] px-6 md:px-10 flex items-center justify-between gap-8">
              <div>
                <span className="eyebrow block mb-3">Next · {next.num}</span>
                <h3 className="display text-5xl md:text-7xl text-bone-50 group-hover:text-ember-400 transition-colors">
                  {next.title}
                </h3>
              </div>
              <div className="mono text-ember-500 text-2xl md:text-4xl shrink-0 group-hover:translate-x-2 transition-transform">
                ⟶
              </div>
            </div>
          </div>
        </Link>
      )}
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="mono text-[11px] tracking-[0.22em] uppercase text-bone-300">
          Prepared by Ganapathy · Product Architect Candidate · Bultron
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mono text-[11px] tracking-[0.22em] uppercase text-bone-300">
          <span>(678) 464-0189</span>
          <span className="text-ember-500">·</span>
          <a href="mailto:Ganapathy_Mca@hotmail.com" className="hover:text-ember-400">Ganapathy_Mca@hotmail.com</a>
          <span className="text-ember-500">·</span>
          <a href="https://nexuspt.io" target="_blank" rel="noreferrer" className="hover:text-ember-400">nexuspt.io ↗</a>
        </div>
      </div>
    </footer>
  )
}
