import PageShell, { Section, Pill, StatGrid, AgentCard, Callout, SplitRow } from '../components/PageShell.jsx'
import MermaidDiagram from '../components/MermaidDiagram.jsx'

const architecture = `
flowchart TB
    subgraph Signals["1 · SMB Signal Layer"]
        S1["Job Board Scrapers<br/>LinkedIn · Indeed · ZipRecruiter<br/>e.g. hiring VA · bookkeeper"]
        S2[Growth & Funding<br/>Crunchbase · SEC · Apollo]
        S3[Overload Signals<br/>late-night sends · calendar chaos<br/>slow email replies]
        S4[Site Intent<br/>nexuspt.io pricing · roles pages]
        S5[Community Signals<br/>IndieHackers · Twitter · Reddit]
    end

    subgraph Brain["2 · Targeting Brain"]
        ENR[Enrichment Agent<br/>merges identity<br/>adds stack + firmographics]
        ICP[ICP Fit Scorer<br/>solo · SMB · growing team<br/>14-role taxonomy match]
        TIMING[Timing Predictor<br/>days-until-hire estimate]
        RANK[Priority Queue<br/>fit × intent × timing]
    end

    subgraph Orchestra["3 · Cadence Orchestrator - LangGraph"]
        SUP[Outreach Supervisor<br/>picks channel + message<br/>knows the 14 roles]
        MEM[(Account Memory<br/>Postgres + pgvector)]
        MSG[Message Library<br/>per-role value prop<br/>70% savings · 40hrs back]
    end

    subgraph Channels["4 · Channel Agents"]
        CH1[Email Agent<br/>founder inbox focus]
        CH2[SMS Agent<br/>Twilio 10DLC]
        CH3[Voice Agent<br/>Vapi + Retell<br/>Associate-voice clone]
        CH4[LinkedIn Agent<br/>Unipile · founders live here]
        CH5[WhatsApp Agent<br/>intl SMB founders]
    end

    subgraph Reply["5 · Reply → Discovery Call"]
        RH[Reply Handler<br/>intent classifier]
        HIL{Ready for<br/>Discovery?}
        BOOK[Book Discovery Call<br/>Account Manager calendar]
        NURT[Nurture Loop<br/>re-enqueue in 30d]
    end

    subgraph CRM["6 · Hand-off + Attribution"]
        HUB[HubSpot / Salesforce]
        AM[Account Manager<br/>takes over the thread]
        ATTR[Closed-won attribution<br/>feeds back into ICP]
    end

    Signals --> ENR --> ICP --> TIMING --> RANK --> SUP
    SUP <--> MSG
    SUP --> CH1 & CH2 & CH3 & CH4 & CH5
    CH1 & CH2 & CH3 & CH4 & CH5 --> MEM
    CH1 & CH2 & CH3 & CH4 & CH5 --> RH
    RH --> HIL
    HIL -->|Yes| BOOK --> HUB --> AM
    HIL -->|Not yet| NURT --> SUP
    AM --> ATTR --> ICP
`

const sequence = `
sequenceDiagram
    autonumber
    actor Founder as Founder (8-person agency)
    participant Signal as Signal Layer
    participant ICP as ICP Scorer
    participant Sup as Outreach Supervisor
    participant Email as Email Agent
    participant Voice as Voice Agent
    participant Reply as Reply Handler
    participant AM as Account Manager (Human)

    Founder->>Signal: Posts "hiring part-time EA + bookkeeper" on LinkedIn
    Signal->>ICP: firmographic + role-need signal
    ICP->>Sup: fit 92 · timing 4 days · roles {EA, bookkeeper}
    Sup->>Email: day 0 · personalised opener<br/>("saw the EA + bookkeeper post")
    Email-->>Founder: Gmail send · tracked
    Founder-->>Email: opens 3× · no reply
    Sup->>Voice: day 2 · 45s AI voicemail<br/>("Nexuspoint places both roles in 2–3 wks")
    Voice-->>Founder: voicemail left
    Founder-->>Email: replies "what does it cost?"
    Email->>Reply: intent = PRICE_QUESTION (hot)
    Reply->>AM: Slack thread + brief + calendar link
    AM->>Founder: personal reply + Discovery Call booked
`

export default function Question1() {
  return (
    <PageShell next={{ num: '02', title: 'Supporting 1,000+ entrepreneur clients without losing the personal touch.', to: '/02-support' }}>
      {/* HERO */}
      <section className="relative overflow-hidden hair-b">
        <div className="absolute inset-0 dotgrid opacity-50" />
        <div className="absolute -top-32 -right-20 w-[560px] h-[560px] ember-glow" />
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="flex items-center gap-3 mb-8 animate-fade-in">
            <span className="mono text-ember-400 text-sm">Q1</span>
            <span className="w-8 h-px bg-ember-500" />
            <span className="eyebrow">Client Acquisition · Multi-channel Outreach</span>
          </div>

          <h1 className="display text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.94] text-bone-50 animate-fade-up max-w-[18ch]">
            Find the founder<br/>
            <span className="display-italic text-ember-400">at the exact moment they need a hire.</span>
          </h1>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-10 animate-fade-up" style={{ animationDelay: '120ms' }}>
            <div className="md:col-span-7">
              <p className="text-lg md:text-xl leading-relaxed text-bone-100/85 max-w-2xl">
                Nexuspoint sells to a very specific buyer: the solo founder, SMB owner, or fractional operator who has just decided
                <em className="display-italic text-bone-50"> "I need help."</em> The winning move is to be in their inbox or on their phone
                <span className="under-ember text-ember-400"> before the third job board refresh.</span>
              </p>
              <p className="mt-5 text-bone-200/75 text-base leading-relaxed max-w-2xl">
                The agentic outreach stack watches <em className="display-italic text-bone-50">real hiring signals</em> — public job posts for the 14 roles Nexuspoint
                already places, funding events, growth triggers, even overload signals — scores fit × timing, and runs a coordinated
                email · SMS · voice · LinkedIn · WhatsApp cadence. Every message is wrapped around the same promise that closes Nexuspoint deals today:
                <span className="under-ember text-ember-400"> top-1% vetted talent, 2–3 weeks to onboard, 70% cost savings, 40+ hours returned per week.</span>
              </p>
              <p className="mt-5 text-bone-200/75 text-base leading-relaxed max-w-2xl">
                When a founder is ready, a human <em className="display-italic text-bone-50">Account Manager</em> takes over the thread
                with a pre-built brief — no "pass-off" awkwardness, no context loss.
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="flex flex-wrap gap-2 mb-5">
                <Pill>Claude · OpenAI</Pill>
                <Pill>LangGraph</Pill>
                <Pill>Twilio · Vapi · Retell</Pill>
                <Pill>Apollo · Clay · Ocean.io</Pill>
                <Pill>HubSpot / Salesforce</Pill>
              </div>
              <div className="hair p-5 bg-obsidian-900/60">
                <div className="mono text-[10px] tracking-[0.22em] uppercase text-bone-300 mb-3">Target outcome</div>
                <div className="display text-3xl text-bone-50 leading-tight mb-2">
                  3× Discovery Calls / week<br/>
                  <span className="display-italic text-ember-400">at half the CAC.</span>
                </div>
                <div className="text-sm text-bone-200/75 leading-relaxed mt-3">
                  Without hurting domain reputation, without sounding robotic — Nexuspoint’s voice is warm, founder-to-founder. Every send passes a tone + deliverability gate.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatGrid stats={[
        { label: 'Role types targeted', value: '14', hint: 'EA · Bookkeeper · Social · CS · SEO · …' },
        { label: 'Outbound channels',   value: '5',  hint: 'email · SMS · voice · LinkedIn · WhatsApp' },
        { label: 'Signal-to-touch',     value: '< 15m', hint: 'from hiring signal to personalised outbound' },
        { label: 'Human step',          value: 'Account Manager', hint: 'takes the thread when founder is ready' },
      ]} />

      {/* ARCHITECTURE */}
      <Section eyebrow="Architecture · six layers" title="From a ‘hiring EA’ LinkedIn post to a Discovery Call — on one graph." subtitle="SMB-specific signal layer. A targeting brain that knows Nexuspoint’s 14 roles. A cadence orchestrator that speaks five channels. A clean hand-off to the human Account Manager when the founder is ready." accent>
        <MermaidDiagram chart={architecture} id="q1-arch" />
      </Section>

      {/* AGENT ROSTER */}
      <Section eyebrow="Agent roster" title="Nine agents. One shared memory. One goal: a Discovery Call.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AgentCard
            n="01"
            name="SMB Signal Collector"
            role="Watches public job boards (LinkedIn, Indeed, ZipRecruiter, Wellfound), funding feeds, growth triggers and overload signals. Specifically looks for the 14 role types Nexuspoint already places — and catches adjacent phrasing (‘need admin help’, ‘looking for someone to handle my books’)."
            tools={['LinkedIn Jobs API', 'Indeed scraper', 'Crunchbase', 'Apollo.io', 'Clay', 'Ocean.io']}
            guardrails={['Respects robots.txt + ToS', 'Ignores enterprise-scale posts', 'De-dupes recurring / template posts']}
          />
          <AgentCard
            n="02"
            name="Enrichment & ICP Scorer"
            role="Consolidates signals into a single account view: company size, stage, stack, geography, current team composition. Scores fit against Nexuspoint’s ICP (solo founder, SMB, growing team) and tags which of the 14 roles the prospect is likely to need."
            tools={['ZeroBounce', 'Hunter', 'BuiltWith', 'HubSpot', 'Postgres']}
            guardrails={['Filters current customers & competitors', 'GDPR / CCPA lawful-basis check', 'Rejects > 200-employee accounts']}
          />
          <AgentCard
            n="03"
            name="Timing Predictor"
            role="Estimates ‘days until hire.’ A fresh job post gets T-minus-0; a recent funding round + no hire yet gets T+14. The supervisor uses this to compress or stretch the cadence so touches land when the founder actually has time to read them."
            tools={['Custom regression model', 'Job-post freshness index', 'Funding-date index']}
            guardrails={['Decays stale signals after 60d', 'Never predicts past 90d — re-enqueues to nurture']}
          />
          <AgentCard
            n="04"
            name="Outreach Supervisor"
            role="The router. Per founder, per touch: which channel, which message archetype (the role-specific value props), which time zone, which local-hour window. Reads account memory so nothing is repeated. Knows when to stop."
            tools={['LangGraph', 'pgvector memory', 'Time-zone resolver', 'Experiment bandit']}
            guardrails={['Max 2 channels / day / contact', 'Quiet hours respected', 'Hard-stop after 5 unanswered touches']}
          />
          <AgentCard
            n="05"
            name="Email Agent"
            role="Drafts founder-to-founder openers. Name-drops the exact role signal (‘saw your EA post on LinkedIn’), leads with the outcome (‘40 hours back per week’), short, no jargon, no attachments on first touch. Warm-up pool for cold sends, Gmail for 1-to-1."
            tools={['Gmail API', 'Instantly', 'Smartlead', 'SendGrid', 'MXToolbox']}
            guardrails={['SPF · DKIM · DMARC verified', 'Spam-score gate (< 2)', 'Max 40 cold / day / inbox']}
          />
          <AgentCard
            n="06"
            name="SMS Agent"
            role="Only fires after explicit consent or a prior positive touch. Short, personal, always offers STOP / HELP. Used mainly for reminder / confirmation follow-ups around a pending Discovery Call."
            tools={['Twilio 10DLC', 'TCR registration', 'Consent store']}
            guardrails={['Opt-in on consent store', 'Quiet hours by state', 'Never sends first touch via SMS']}
          />
          <AgentCard
            n="07"
            name="Voice Agent"
            role="Places 40–60 second personalised calls in a cloned-but-approved Associate voice. Opens with the signal (‘I saw your bookkeeper post’), states the outcome (‘we place top 1% bookkeepers in 2–3 weeks’), offers one clear CTA — a Discovery Call link."
            tools={['Vapi', 'Retell AI', 'ElevenLabs TTS', 'Deepgram ASR', 'Twilio voice']}
            guardrails={['Discloses AI identity where required', 'DNC registry checked', 'Hands off to human on any ambiguity']}
          />
          <AgentCard
            n="08"
            name="LinkedIn + WhatsApp Agent"
            role="Founders live on LinkedIn; international SMB founders live on WhatsApp. Connection requests and DMs are templated per persona, rate-limited per seat, and shaped around the job-post they actually wrote."
            tools={['Unipile / HeyReach', 'Meta WhatsApp Business', 'Rate limiter']}
            guardrails={['< 20 connect / day / seat', 'No scraping of non-public fields', 'Opt-in template for WhatsApp']}
          />
          <AgentCard
            n="09"
            name="Reply Handler + AM Hand-off"
            role="Watches every channel for replies. Classifies intent (hot, price question, objection, not-now, unsubscribe). When hot, builds a brief (company, signal, touches tried, suggested fit role) and pings the Account Manager in Slack with a one-click Calendly booking link."
            tools={['Gmail / Twilio / LinkedIn webhooks', 'Claude classifier', 'Slack', 'Calendly']}
            guardrails={['Auto-pause cadence on any reply', 'Unsubscribe in < 60s across channels', 'Never auto-books without AM confirmation']}
          />
        </div>
      </Section>

      {/* SEQUENCE DIAGRAM */}
      <Section eyebrow="Example flow" title="One founder. Three touches. One warm hand-off." subtitle="The agentic stack works the lead. The Account Manager closes it.">
        <MermaidDiagram chart={sequence} id="q1-seq" />
      </Section>

      {/* DATA + GUARDRAILS */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <SplitRow
          left={(
            <>
              <span className="eyebrow text-ember-400">Data flow</span>
              <h3 className="display text-4xl text-bone-50 mt-4 mb-6 leading-[1.05]">From a job post in the wild to a Discovery Call on the calendar.</h3>
              <ol className="space-y-4 text-bone-200/85 text-sm leading-relaxed list-decimal list-inside">
                <li><span className="text-bone-50">Signal ingestion.</span> Job-board scrapers + Apollo + Clay + site intent run hourly. De-duped by company domain.</li>
                <li><span className="text-bone-50">Enrichment.</span> Every account gets size, stage, stack, geography, current team. Stored in Postgres + pgvector.</li>
                <li><span className="text-bone-50">Scoring.</span> ICP Scorer returns fit (0–100) + ranked list of the 14 Nexuspoint roles this account is most likely to need.</li>
                <li><span className="text-bone-50">Timing.</span> Timing Predictor sets a hire-by window so the cadence lands at the right cadence density.</li>
                <li><span className="text-bone-50">Orchestration.</span> LangGraph starts or resumes a per-account cadence; memory prevents duplicate messages across channels.</li>
                <li><span className="text-bone-50">Hand-off.</span> On positive reply, a brief is built and posted to the Account Manager’s Slack queue with a one-click Calendly link.</li>
                <li><span className="text-bone-50">Attribution.</span> Closed-won deals flow back; the ICP weights retrain weekly from actual won / lost outcomes.</li>
              </ol>
            </>
          )}
          right={(
            <>
              <span className="eyebrow text-ember-400">Guardrails</span>
              <h3 className="display text-4xl text-bone-50 mt-4 mb-6 leading-[1.05]">Automation that never<br/>makes the Account Manager <em className="display-italic">apologize.</em></h3>
              <div className="space-y-4">
                <Callout title="Consent & compliance">CAN-SPAM + GDPR unsubscribe handling, TCPA-compliant SMS with 10DLC, DNC checks on voice, consent-only WhatsApp, and a unified suppression list that fires across every channel in under a minute.</Callout>
                <Callout title="Deliverability">Warm-up pool, per-domain quotas, tone + spam-score gate before every send, bounce-rate circuit breaker that pauses a cohort automatically if reputation drops.</Callout>
                <Callout title="Brand voice">Every message is tested against a Nexuspoint tone rubric (founder-to-founder, warm, outcomes-first, no jargon). Anything that fails never ships.</Callout>
                <Callout title="Human-in-the-loop">Any price, contract, or scoping question auto-pauses the cadence and hands the thread — with the full history — to the Account Manager, who decides the next step.</Callout>
              </div>
            </>
          )}
        />
      </section>

      {/* KPIs */}
      <Section eyebrow="What ‘good’ looks like" title="KPIs we’d ship with." subtitle="North-star: Discovery Calls that convert to signed clients, per agent-hour.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ['Discovery Calls booked / wk',      '3× prior baseline'],
            ['Signal → first touch',             '< 15 min'],
            ['Reply rate (email, founder ICP)',  '≥ 12%'],
            ['Voicemail → callback',             '≥ 6%'],
            ['LinkedIn connect-to-reply',        '≥ 18%'],
            ['Cost per Discovery Call',          '≤ $40'],
            ['CAC (closed-won)',                 '-45% vs. prior'],
            ['Unsubscribe / complaint rate',     '< 0.2%'],
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
