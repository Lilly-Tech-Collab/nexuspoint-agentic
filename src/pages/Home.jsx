import PageShell from '../components/PageShell.jsx'
import QuestionCard from '../components/QuestionCard.jsx'

const questions = [
  {
    num: '01',
    kicker: 'Client acquisition · Multi-channel',
    title: 'Finding the founders who are about to hire — and reaching them first.',
    summary: 'Nexuspoint wins when a small-business owner decides they need an executive assistant, a bookkeeper, or a social media manager. Agentic AI watches the signals — job postings, growth triggers, overwhelmed-founder moments — scores fit, and runs a coordinated email · SMS · voice · LinkedIn cadence that ends in a Discovery Call.',
    tags: ['Job-board signals', 'Apollo · Clay · Ocean', 'Email · SMS · Voice · LinkedIn', 'Discovery Call booked'],
    to: '/01-outreach',
  },
  {
    num: '02',
    kicker: 'Client success · Omnichannel',
    title: 'Supporting 1,000+ entrepreneur clients without losing the personal touch.',
    summary: 'Every existing client has requests the human Account Manager shouldn’t burn time on: add 10 hours, pause for a trip, swap a VA, re-train on a new CRM, timesheet question, invoice query. An agentic support layer triages, resolves, acts — and escalates only the moments that need real judgement.',
    tags: ['Client portal · Slack · Email', 'HubSpot · Stripe', 'Action agent', 'Account Manager handoff'],
    to: '/02-support',
    align: 'right',
  },
  {
    num: '03',
    kicker: 'Core product · Bultron',
    title: 'Turning every Nexuspoint role into an AI-Enhanced Associate.',
    summary: 'The 14 roles Nexuspoint places — executive assistant, project manager, bookkeeper, social media manager, customer service, SEO, designer, video editor, data entry, SDR, affiliate manager, eCommerce analyst — re-built as a crew of agents. A supervisor routes work. A human Associate oversees. Output goes up, cost per client goes down.',
    tags: ['14 role agents', 'Supervisor + memory', 'Human-in-the-loop', 'Account Manager cockpit'],
    to: '/03-va-replacement',
  },
  {
    num: '04',
    kicker: 'Governance · Privacy',
    title: 'Building ML for the Bultron product — without training on client data.',
    summary: 'Nexuspoint Associates already see what a VA sees: client inboxes, QuickBooks, CRMs, Slack, customer records. Any ML model we train has to be provably walled off from that raw data. PII redaction at the boundary, synthetic generation, federated learning with differential privacy, confidential compute, per-tenant erasure.',
    tags: ['PII redaction', 'Synthetic data', 'Federated · DP', 'SOC 2 · HIPAA · GDPR', 'Per-tenant erasure'],
    to: '/04-privacy-ml',
    align: 'right',
  },
]

export default function Home() {
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 dotgrid opacity-60" />
        <div className="absolute -top-40 -right-40 w-[680px] h-[680px] ember-glow" />
        <div className="absolute top-1/3 -left-24 w-[420px] h-[420px] ember-glow opacity-70" />

        <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 pt-20 pb-28 md:pt-28 md:pb-36">
          <div className="flex items-center gap-3 mb-10 animate-fade-in">
            <span className="w-6 h-px bg-ember-500" />
            <span className="eyebrow text-ember-400">Interview Follow-up · Nexuspoint Product Architect</span>
          </div>

          <h1 className="display text-[13vw] md:text-[9.5vw] lg:text-[8rem] leading-[0.9] text-bone-50 animate-fade-up">
            Four questions,<br/>
            <span className="display-italic text-ember-400">one </span>
            <span className="display-italic text-ember-400">agentic</span> answer —<br/>
            shaped to <span className="display-italic text-ember-400">Nexuspoint.</span>
          </h1>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 animate-fade-up" style={{ animationDelay: '120ms' }}>
            <div className="md:col-span-7">
              <p className="text-lg md:text-xl leading-relaxed text-bone-100/85 max-w-2xl">
                Nexuspoint matches <span className="under-ember text-ember-400">solo founders, SMBs and growing teams</span> with vetted remote talent
                across 14 role types — executive assistants, bookkeepers, social media managers, customer service reps, SEO specialists, designers, video editors,
                SDRs, affiliate managers, eCommerce analysts and more. <em className="display-italic text-bone-50">70% cost savings, 40+ hours back per week, top 1% vetting, 2–3 week onboarding.</em>
              </p>
              <p className="mt-5 text-bone-200/80 text-base leading-relaxed max-w-2xl">
                Each card below opens a dedicated architecture page designed against <span className="under-ember text-ember-400">that</span> business:
                how the agentic layer acquires the right founders, supports the 1,000+ existing clients, powers the AI-Enhanced Associate product,
                and keeps client data out of any model training set.
              </p>
            </div>
            <div className="md:col-span-5 md:pl-12 md:border-l md:border-bone-50/10">
              <div className="mono text-[11px] tracking-[0.22em] uppercase text-bone-300 mb-4">Prepared by</div>
              <div className="display text-3xl text-bone-50 mb-1">Ganapathy</div>
              <div className="mono text-xs text-bone-200/75">Product Architect · Agentic Systems</div>
              <div className="mt-5 space-y-1 text-sm text-bone-200/70">
                <div>(678) 464-0189</div>
                <div>Ganapathy_Mca@hotmail.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Running marquee band — Nexuspoint-specific */}
        <div className="relative hair-t hair-b py-4 overflow-hidden bg-obsidian-900/60">
          <div className="flex gap-16 animate-marquee whitespace-nowrap mono text-[11px] tracking-[0.28em] uppercase text-bone-200/70">
            {Array.from({ length: 2 }).flatMap((_, k) => [
              'Executive Assistants',
              'Bookkeepers',
              'Social Media Managers',
              'Customer Service',
              'SEO Specialists',
              'Graphic Designers',
              'Video Editors',
              'Data Entry & Research',
              'Sales Support · SDR',
              'Affiliate Managers',
              'eCommerce Analysts',
              'Project Managers',
              'AI-Enhanced Associates',
              '1,000+ Clients · Top 1% Vetted',
            ].map((txt, i) => (
              <span key={`${k}-${i}`} className="flex items-center gap-16">
                {txt}
                <span className="w-1.5 h-1.5 rounded-full bg-ember-500" />
              </span>
            )))}
          </div>
        </div>
      </section>

      {/* FOUR CARDS */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0 linegrid opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
            <div>
              <span className="eyebrow block mb-4 text-ember-400">Index · 04 architectures</span>
              <h2 className="display text-5xl md:text-7xl text-bone-50 leading-[0.98]">
                Four questions.<br/>
                <span className="display-italic">Four</span> architectures built<br/>for how Nexuspoint works.
              </h2>
            </div>
            <p className="text-bone-200/75 max-w-md text-base md:text-lg leading-relaxed">
              Each card opens a dedicated page — architecture diagram, agent roster, data flow, guardrails, KPIs — sized to the real service lines
              Nexuspoint runs today, not a generic template.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {questions.map(q => (
              <QuestionCard key={q.num} {...q} />
            ))}
          </div>
        </div>
      </section>

      {/* DESIGN PRINCIPLES */}
      <section className="relative py-24 md:py-32 hair-t">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-4">
              <span className="eyebrow text-ember-400">Design philosophy</span>
              <h2 className="display text-4xl md:text-5xl mt-5 leading-[1.02]">
                Three principles<br/>running through <span className="display-italic">every</span><br/>diagram.
              </h2>
            </div>
            <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  n: '01',
                  t: 'Humans stay in the loop',
                  b: 'Nexuspoint’s edge is the human Associate + Account Manager. AI augments them first, replaces the toil second. Every agent has a clear escalation path with a pre-loaded context packet.',
                },
                {
                  n: '02',
                  t: 'Per-client tenant isolation',
                  b: 'Each Nexuspoint client is a hard tenant boundary. Memory, models, secrets, and PII vaults never cross tenants — not even by accident. Right-to-erasure is a first-class operation.',
                },
                {
                  n: '03',
                  t: 'Output per billable hour',
                  b: 'The north star isn’t "automation rate" — it’s hours of value delivered per Associate hour billed. Every architecture here is graded against that single number.',
                },
              ].map(p => (
                <article key={p.n} className="relative">
                  <div className="mono text-ember-400 text-xs tracking-[0.24em] uppercase mb-3">{p.n}</div>
                  <h3 className="display text-2xl text-bone-50 mb-3 leading-tight">{p.t}</h3>
                  <p className="text-bone-200/75 text-sm leading-relaxed">{p.b}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
