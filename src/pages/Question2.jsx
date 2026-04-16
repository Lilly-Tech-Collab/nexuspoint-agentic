import PageShell, { Section, Pill, StatGrid, AgentCard, Callout, SplitRow } from '../components/PageShell.jsx'
import MermaidDiagram from '../components/MermaidDiagram.jsx'

const architecture = `
flowchart TB
    subgraph Inbox["1 · Client Channels"]
        I1[Client Portal Chat<br/>nexuspt.io]
        I2[Client Email<br/>support@nexuspt.io]
        I3[Slack Connect<br/>per-client channel]
        I4[WhatsApp / SMS<br/>international clients]
        I5[Voice Line<br/>Twilio + Deepgram]
    end

    subgraph Triage["2 · Triage & Client Context"]
        T1[Triage Agent<br/>intent · sentiment · priority]
        T2[Client Resolver<br/>company + plan + roles placed<br/>active Associates + Account Manager]
        CTX[(Session Context<br/>Postgres + Redis)]
    end

    subgraph Knowledge["3 · Knowledge & Retrieval"]
        KB1[SOPs & Playbooks<br/>onboarding · replacements · billing]
        KB2[Policy Docs<br/>timesheets · overtime · holidays]
        KB3[Prior Resolutions<br/>last 12 months of tickets]
        KB4[Associate Profiles<br/>skills · availability · specialties]
        VEC[(pgvector index<br/>per-tenant)]
        KB1 & KB2 & KB3 & KB4 --> VEC
    end

    subgraph Solve["4 · Solve"]
        SOLVE[Solution Agent<br/>grounded in client context]
        ACT[Action Agent<br/>calls real internal systems]
    end

    subgraph Actions["5 · Real Tools"]
        A1[HubSpot / CRM<br/>update client record]
        A2[Placement System<br/>adjust hours · pause · replace]
        A3[Billing · Stripe<br/>credits · invoices]
        A4[Scheduling<br/>Calendly · shift swaps]
        A5[Slack Bot<br/>notify Associate + AM]
    end

    subgraph Handoff["6 · Escalation"]
        GATE{Sensitive?<br/>Replacement?<br/>Dollar impact?}
        AM[Account Manager<br/>gets a prepped context packet]
        AMGR[Ops Lead<br/>for policy decisions]
    end

    subgraph Loop["7 · Quality Loop"]
        CSAT[Client CSAT / NPS]
        REV[Daily Review<br/>10% sample]
        GOLD[Golden Eval Set]
        TUNE[Playbook · KB · Agent<br/>updates]
    end

    Inbox --> T1 --> T2 --> CTX --> SOLVE
    SOLVE <--> VEC
    SOLVE --> GATE
    GATE -->|low-risk| ACT --> Actions
    GATE -->|scope · money · replacement| AM
    GATE -->|policy exception| AMGR
    ACT --> CSAT
    AM --> CSAT
    CSAT --> REV --> GOLD --> TUNE
    TUNE -.updates.-> SOLVE
    TUNE -.updates.-> VEC
`

const stateDiag = `
stateDiagram-v2
    [*] --> Received
    Received --> Triaging
    Triaging --> Self_Resolved : e.g. invoice sent · hours updated
    Triaging --> AM_Handoff : replacement · scope · dollars
    Triaging --> OpsEscalation : policy exception
    Self_Resolved --> AwaitingCSAT
    AM_Handoff --> HumanHandling
    OpsEscalation --> HumanHandling
    HumanHandling --> AwaitingCSAT
    AwaitingCSAT --> Closed
    Closed --> [*]
`

export default function Question2() {
  return (
    <PageShell next={{ num: '03', title: 'Turning every Nexuspoint role into an AI-Enhanced Associate.', to: '/03-va-replacement' }}>
      {/* HERO */}
      <section className="relative overflow-hidden hair-b">
        <div className="absolute inset-0 dotgrid opacity-50" />
        <div className="absolute -top-32 -left-20 w-[560px] h-[560px] ember-glow" />
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="flex items-center gap-3 mb-8">
            <span className="mono text-ember-400 text-sm">Q2</span>
            <span className="w-8 h-px bg-ember-500" />
            <span className="eyebrow">Client Success · Omnichannel Support</span>
          </div>

          <h1 className="display text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.94] text-bone-50 animate-fade-up max-w-[20ch]">
            Support 1,000+ clients<br/>
            <span className="display-italic text-ember-400">without diluting the Account Manager.</span>
          </h1>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-10 animate-fade-up" style={{ animationDelay: '120ms' }}>
            <div className="md:col-span-7">
              <p className="text-lg md:text-xl leading-relaxed text-bone-100/85 max-w-2xl">
                Every Nexuspoint client has a dedicated human Account Manager — and a steady stream of small, operational requests
                that shouldn’t burn that relationship:
                <em className="display-italic text-bone-50"> ‘bump my EA to 30 hours next month,’ ‘pause the bookkeeper for my vacation,’ ‘invoice question,’ ‘can we swap our SDR,’ ‘train my VA on our new CRM.’</em>
              </p>
              <p className="mt-5 text-bone-200/75 text-base leading-relaxed max-w-2xl">
                An agentic support layer sits across every client channel — portal chat, email, Slack Connect, WhatsApp, phone —
                pulls the client’s full context (roles placed, active Associates, plan, history), and either <span className="under-ember text-ember-400">resolves it</span>
                (adjust hours in the placement system, issue a credit, re-send an invoice), or <span className="under-ember text-ember-400">escalates</span> to the Account Manager
                with a complete packet: what the client asked, what’s been tried, a suggested action, one-click approve.
              </p>
              <p className="mt-5 text-bone-200/75 text-base leading-relaxed max-w-2xl">
                The goal isn’t deflection — it’s giving the Account Manager back the hours they should be spending on strategic conversations.
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="flex flex-wrap gap-2 mb-5">
                <Pill>Claude primary</Pill>
                <Pill>pgvector RAG</Pill>
                <Pill>Client portal · Slack · Email</Pill>
                <Pill>HubSpot · Stripe</Pill>
                <Pill>Per-tenant memory</Pill>
              </div>
              <div className="hair p-5 bg-obsidian-900/60">
                <div className="mono text-[10px] tracking-[0.22em] uppercase text-bone-300 mb-3">Target outcome</div>
                <div className="display text-3xl text-bone-50 leading-tight mb-2">
                  60–70% of requests auto-handled<br/>
                  <span className="display-italic text-ember-400">without an AM ever seeing them.</span>
                </div>
                <div className="text-sm text-bone-200/75 leading-relaxed mt-3">
                  The 30–40% that do escalate arrive fully briefed — no context gathering, just a decision.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatGrid stats={[
        { label: 'Channels unified',   value: '5',     hint: 'portal · email · Slack · WhatsApp · voice' },
        { label: 'Common request types', value: '12+', hint: 'hours · pause · replace · billing · training …' },
        { label: 'Auto-resolved',      value: '60–70%',hint: 'with real tool-calls, not deflection' },
        { label: 'AM hand-off time',   value: '< 2 min', hint: 'from client message to AM Slack with brief' },
      ]} />

      {/* ARCHITECTURE */}
      <Section eyebrow="Architecture · seven layers" title="Every channel. Every request type. Real actions on Nexuspoint’s own systems." subtitle="Triage pulls the client’s Nexuspoint context first. RAG grounds the answer in Nexuspoint’s playbooks and SOPs. Action Agent calls the placement system, HubSpot, Stripe directly. Escalation never sends an unprepared ticket to the Account Manager." accent>
        <MermaidDiagram chart={architecture} id="q2-arch" />
      </Section>

      {/* COMMON REQUESTS */}
      <Section eyebrow="What clients actually ask" title="Twelve requests. One pipeline.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { n: '01', name: 'Adjust hours / scope', role: 'Client wants to bump their Associate from 20 → 30 hrs. Action Agent updates the placement record and draft-notifies Associate + Account Manager in Slack.', auto: true },
            { n: '02', name: 'Pause for travel / leave', role: 'Client going on vacation for 2 weeks. Action Agent pauses hours, pro-rates the invoice, pings the Associate.', auto: true },
            { n: '03', name: 'Associate replacement request', role: 'Client asks to swap their VA. Agent builds a brief (role, history, reason) and escalates to the Account Manager — never fires the Associate unilaterally.', auto: false },
            { n: '04', name: 'Training on a new tool', role: 'Client just moved from Xero → QuickBooks. Agent schedules training, shares the right Nexuspoint runbook, notifies the Associate.', auto: true },
            { n: '05', name: 'Timesheet / hours dispute', role: 'Client questions a week of reported hours. Agent pulls timesheet + daily reports from the system, drafts a reply. Escalates if a credit is needed.', auto: 'partial' },
            { n: '06', name: 'Billing / invoice question', role: 'Client asks why this month’s invoice is higher. Agent explains line items, sends the Stripe-linked PDF, offers a payment link. Refunds always human-approved.', auto: 'partial' },
            { n: '07', name: 'Add a new role', role: 'Client wants to add an SEO specialist. Agent triggers the Discovery → Vetting → Matching workflow and books a kickoff with the Account Manager.', auto: true },
            { n: '08', name: 'Performance feedback', role: 'Client shares praise / concern about their Associate. Agent logs it to the Associate’s profile; if negative, escalates to AM same-day with suggested action.', auto: 'partial' },
            { n: '09', name: 'Scope creep / expectation reset', role: 'Client is asking the Associate to do out-of-scope work. Agent flags it, prepares a polite scope-recalibration message, loops in the AM.', auto: false },
            { n: '10', name: 'Compliance / data access', role: 'Client asks what data the Associate has access to. Agent returns the current access map + the Nexuspoint data-handling policy.', auto: true },
            { n: '11', name: 'Cancellation / downgrade', role: 'Client wants to cancel or reduce service. Always a human-first moment — agent builds the save-motion brief and escalates to the AM immediately.', auto: false },
            { n: '12', name: 'Referral / expansion', role: 'Happy client wants to refer another founder. Agent starts a referral record, triggers the outreach supervisor (Q1) for the referred contact.', auto: true },
          ].map(r => (
            <article key={r.n} className="relative corner-mark p-6 md:p-7 bg-obsidian-900/60 backdrop-blur-sm">
              <span></span>
              <div className="flex items-baseline justify-between mb-4">
                <span className="mono text-[11px] tracking-[0.22em] uppercase text-ember-400">Req {r.n}</span>
                <span className={`mono text-[10px] tracking-[0.22em] uppercase ${r.auto === true ? 'text-teal-400' : r.auto === 'partial' ? 'text-ember-400' : 'text-bone-300'}`}>
                  {r.auto === true ? 'Auto-resolved' : r.auto === 'partial' ? 'Hybrid' : 'AM-handled'}
                </span>
              </div>
              <h3 className="display text-xl md:text-2xl text-bone-50 mb-3 leading-tight">{r.name}</h3>
              <p className="text-bone-200/80 text-sm leading-relaxed">{r.role}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* AGENT ROSTER */}
      <Section eyebrow="Agent roster" title="Eight agents. One client conversation.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AgentCard
            n="01"
            name="Triage Agent"
            role="Classifies every inbound in seconds: intent (hours / pause / replace / billing / scope / training / comp / cancel / referral / performance), urgency, sentiment, and whether it implies a regulated or financial action."
            tools={['Claude Haiku (latency)', 'Priority rules', 'Language detect']}
            guardrails={['Never auto-closes tickets about cancellation or dissatisfaction', 'Marks PII / compliance tickets as human-required', 'Logs triage reason on every run']}
          />
          <AgentCard
            n="02"
            name="Client Resolver"
            role="Pulls the full Nexuspoint picture: which roles are placed, which Associates are active, the Account Manager, plan tier, billing status, any open tickets. Per-tenant-scoped memory only."
            tools={['Placement system', 'HubSpot', 'Stripe', 'Associate directory']}
            guardrails={['Strict per-tenant boundary', 'Masks other-tenant data', 'Read-only on closed-lost accounts']}
          />
          <AgentCard
            n="03"
            name="Knowledge Retriever (RAG)"
            role="Hybrid search over Nexuspoint playbooks, onboarding SOPs, policy docs, and the last 12 months of solved tickets. Returns passages with freshness score + source link so every answer is grounded."
            tools={['pgvector', 'BM25', 'Policy index', 'Ticket archive']}
            guardrails={['Never cites deprecated policy', 'Surfaces source URL on every answer', 'Stale passages flagged to ops]']}
          />
          <AgentCard
            n="04"
            name="Solution Agent"
            role="Writes the reply. Grounded strictly in retrieved Nexuspoint policy + the client context. Returns answer + confidence + cited sources. Will refuse to answer policy-ambiguous questions."
            tools={['Claude Sonnet', 'Citation validator', 'Refusal policy']}
            guardrails={['"I don\'t know" allowed', 'Cited sources above policy threshold', 'Refusal on cancellation / legal asks']}
          />
          <AgentCard
            n="05"
            name="Action Agent"
            role="Calls Nexuspoint’s own systems: adjust hours in the placement record, pause a contract, issue a Stripe credit, re-send an invoice, schedule training, log a referral. Always with idempotency keys and a verify step."
            tools={['Placement API', 'HubSpot', 'Stripe', 'Calendly', 'Internal CRUD']}
            guardrails={['Dollar limit per tier', 'Writes dry-run in staging for new playbooks', 'Post-action verification required']}
          />
          <AgentCard
            n="06"
            name="AM Escalation Agent"
            role="Builds a clean hand-off packet for the Account Manager: request, client context, history, tried steps, suggested next step, one-click approve buttons. Posts to the AM’s Slack with an SLA timer."
            tools={['Slack DM', 'HubSpot tasks', 'Action buttons', 'SLA timer']}
            guardrails={['VIP / enterprise skip the queue', 'No context loss across hand-offs', 'SLA breach escalates to Ops Lead']}
          />
          <AgentCard
            n="07"
            name="Proactive Check-in Agent"
            role="Runs the ‘structured check-in / daily report’ cadence Nexuspoint promises. Summarises the week’s Associate output, surfaces blockers, preempts churn signals, nudges CSAT."
            tools={['Scheduler (Celery)', 'CSAT survey', 'Daily report ingestor', 'Churn model']}
            guardrails={['Respects quiet hours', 'Doesn\'t spam clients post-complaint', 'Never re-opens closed tickets silently']}
          />
          <AgentCard
            n="08"
            name="Quality Reviewer"
            role="Samples 10% of auto-resolved conversations daily. Scores grounding, policy compliance, tone. Bad cases go into a golden eval set. No playbook or KB change ships without passing the set."
            tools={['LangSmith evals', 'Human review UI', 'Golden-set harness']}
            guardrails={['Blind to original agent identity', 'Rubric versioned', 'Eval must pass before rollout']}
          />
        </div>
      </Section>

      {/* STATE LIFECYCLE */}
      <Section eyebrow="Ticket lifecycle" title="Every request is a durable state machine." subtitle="LangGraph checkpoints in Postgres make every transition crash-safe — a ticket that’s ‘AwaitingCSAT’ at 2 AM survives a server restart.">
        <MermaidDiagram chart={stateDiag} id="q2-state" />
      </Section>

      {/* GUARDRAILS */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <SplitRow
          left={(
            <>
              <span className="eyebrow text-ember-400">Knowledge as a product</span>
              <h3 className="display text-4xl text-bone-50 mt-4 mb-6 leading-[1.05]">The playbook library is the unfair advantage.</h3>
              <ul className="space-y-4 text-bone-200/85 text-sm leading-relaxed">
                <li><span className="text-bone-50">Continuous ingestion.</span> Every new SOP, policy update, and solved ticket re-indexed nightly. Freshness score decays old content.</li>
                <li><span className="text-bone-50">Deprecation gate.</span> When a policy changes (new rate card, new holiday schedule), old passages are auto-tagged "deprecated" and down-ranked to zero within an hour.</li>
                <li><span className="text-bone-50">Per-tenant overlays.</span> A client with custom terms gets their own policy layer that overrides the default — the retriever merges per request.</li>
                <li><span className="text-bone-50">Bad-answer backflow.</span> Any thumbs-down or AM correction becomes a KB task with a named owner.</li>
              </ul>
            </>
          )}
          right={(
            <>
              <span className="eyebrow text-ember-400">Guardrails</span>
              <h3 className="display text-4xl text-bone-50 mt-4 mb-6 leading-[1.05]">Where the agent <em className="display-italic">will not</em> act alone.</h3>
              <div className="space-y-4">
                <Callout title="Associate welfare">No decision that affects an Associate (replacement, reassignment, hours reduction) is ever auto-executed. Always Account Manager.</Callout>
                <Callout title="Money">Refunds, credits over a tier threshold, contract changes, plan downgrades — all require human approval in Slack before the Stripe call fires.</Callout>
                <Callout title="Cancellation / churn">Any cancellation language triggers an immediate Account Manager page, not a self-serve flow. The goal is a save conversation, not an exit ramp.</Callout>
                <Callout title="Data access">Client-data questions (what the Associate can see, where it\'s stored) go through a fixed, reviewed response template — no improvisation.</Callout>
              </div>
            </>
          )}
        />
      </section>

      {/* KPIs */}
      <Section eyebrow="What ‘good’ looks like" title="KPIs we’d ship with.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ['First-response time (median)',      '< 30s'],
            ['Auto-resolution rate',              '60–70%'],
            ['AM hand-off context quality',       '≥ 4.5 / 5 from AMs'],
            ['Action-Agent success rate',         '≥ 98%'],
            ['Client CSAT (AI-handled)',          '≥ parity with AM'],
            ['Hours AMs get back / week',         '8–12 per AM'],
            ['Hallucination rate (QA review)',    '< 0.5%'],
            ['Cancellation touch → AM',           '≤ 60s'],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between hair-b py-4">
              <span className="text-bone-100">{k}</span>
              <span className="mono text-ember-400 text-sm">{v}</span>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  )
}
