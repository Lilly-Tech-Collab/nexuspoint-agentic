import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const loc = useLocation()
  const home = loc.pathname === '/'
  return (
    <header className="relative z-20 hair-b">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="relative inline-flex w-9 h-9 items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-ember-500/60" />
            <span className="absolute inset-[5px] rounded-full bg-ember-500 animate-ember-pulse" />
          </span>
          <span>
            <span className="block mono text-[11px] tracking-[0.22em] text-bone-300 uppercase">Nexuspoint / Bultron</span>
            <span className="block display text-xl text-bone-50">Agentic AI Architecture</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 mono text-[12px] tracking-widest uppercase text-bone-200">
          <Link to="/01-outreach"         className="hover:text-ember-400 transition-colors">01 · Outreach</Link>
          <Link to="/02-support"          className="hover:text-ember-400 transition-colors">02 · Support</Link>
          <Link to="/03-va-replacement"   className="hover:text-ember-400 transition-colors">03 · VA Replacement</Link>
          <Link to="/04-privacy-ml"       className="hover:text-ember-400 transition-colors">04 · Privacy ML</Link>
        </nav>

        {!home ? (
          <Link to="/" className="btn-ghost px-4 py-2 rounded-full mono text-[11px] tracking-[0.22em] uppercase">← Index</Link>
        ) : (
          <a href="https://nexuspt.io" target="_blank" rel="noreferrer" className="btn-ghost hidden md:inline-flex px-4 py-2 rounded-full mono text-[11px] tracking-[0.22em] uppercase">nexuspt.io ↗</a>
        )}
      </div>
    </header>
  )
}
