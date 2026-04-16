import PageShell, { Section, Pill, StatGrid, AgentCard, Callout, SplitRow } from '../components/PageShell.jsx'
import MermaidDiagram from '../components/MermaidDiagram.jsx'

const architecture = `
flowchart TB
    CLIENT([Nexuspoint Client<br/>Entrepreneur · SMB])
    CLIENT -->|Slack · Email · Portal · Voice| IO[Unified Client I/O]

    subgraph Brain["1 · Executive Brain"]
        INTENT[Intent Router<br/>which role bucket?]
        PLAN[Planner<br/>decomposes into tasks]
        SUP[Supervisor<br/>LangGraph · per client]
    end

    subgraph Memory["2 · Memory & Identity"]
        STM[(Short-term context)]
        LTM[(Long-term<br/>pgvector · per tenant)]
        PROF[Client Voice Profile<br/>tone · preferences · brand]
        POL[Per-client Policy<br/>what to never do]
    end

    subgraph Crew["3 · 14 Role Agents - one per Nexuspoint service line"]
        R1[Executive Assistant]
        R2[Project Manager]
        R3[Bookkeeper]
        R4[Social Media Manager]
        R5[Graphic Designer]
        R6[Video Editor]
        R7[Customer Service]
        R8[SEO Specialist]
        R9[Sales Support · SDR]
        R10[Affiliate Manager]
        R11[Data Entry & Research]
        R12[eCommerce Analyst]
        R13[Admin Support]
        R14[AI-Enabled Super-Assistant]
    end

    subgraph Human["4 · Human-in-the-Loop"]
        ASSOC[Nexuspoint Associate<br/>reviews · corrects · ships]
        AM[Account Manager<br/>policy + exceptions]
    end

    subgraph Safe["5 · Execution Safety"]
        APP{Approval?<br/>reversible?<br/>in-scope?}
        EXEC[Tool Execution]
        VER[Verifier<br/>did the action land?]
    end

    subgraph Obs["6 · Observability"]
        TR[LangSmith traces]
        LOG[Audit Log<br/>immutable · signed]
        REP[Daily report<br/>to client + AM]
    end

    IO --> INTENT --> PLAN --> SUP
    SUP <--> Memory
    SUP --> Crew
    Crew --> APP
    APP -->|needs review| ASSOC
    APP -->|policy edge| AM
    APP -->|safe + in scope| EXEC
    ASSOC --> EXEC
    AM --> EXEC
    EXEC --> VER
    VER --> Memory
    SUP -.traces.-> Obs
    EXEC -.signed.-> LOG
    LOG --> REP
`

const dayInLife = `
sequenceDiagram
    autonumber
    actor Client as Client (Ecom Founder)
    participant Sup as Supervisor
    participant EA as EA Agent
    participant Book as Bookkeeper Agent
    participant Social as Social Media Agent
    participant Ecom as eCom Analyst Agent
    participant Assoc as Nexuspoint Associate

    Client->>Sup: "Usual Monday — reconcile last week,<br/>plan socials, pull Shopify report"
    Sup->>Book: reconcile transactions · QuickBooks
    Book-->>Sup: 42 tx matched · 3 need review
    Sup->>Social: plan the week across IG / TikTok / LinkedIn
    Social-->>Sup: 5 posts drafted · calendar slotted
    Sup->>Ecom: Shopify weekly summary<br/>+ top / bottom SKUs
    Ecom-->>Sup: report ready · 2 anomalies flagged
    Sup->>Assoc: review pack · 3 tx + 5 posts + 2 anomalies
    Assoc->>Assoc: approve tx · tweak 1 caption · investigate anomaly
    Assoc->>Sup: approved
    Sup-->>Client: "Books closed. Socials queued. Report + flags attached."
`

export default function Question3() {
  return (
    <PageShell next={{ num: '04', title: 'Building ML for the Bultron product — without training on client data.', to: '/04-privacy-ml' }}>
      {/* HERO */}
      <section className="relative overflow-hidden hair-b">
        <div className="absolute inset-0 dotgrid opacity-50" />
        <div className="absolute -top-32 right-20 w-[580px] h-[580px] ember-glow" />
        <div className="absolute bottom-10 -left-20 w-[420px] h-[420px] ember-glow opacity-70" />
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="flex items-center gap-3 mb-8">
            <span className="mono text-ember-400 text-sm">Q3</span>
            <span className="w-8 h-px bg-ember-500" />
            <span className="eyebrow">Core Product · AI-Enhanced Associate</span>
          </div>

          <h1 className="display text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.94] text-bone-50 animate-fade-up max-w-[18ch]">
            The 14 Nexuspoint roles,<br/>
            <span className="display-italic text-ember-400">re-built as a crew of agents.</span>
          </h1>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-10 animate-fade-up" style={{ animationDelay: '120ms' }}>
            <div className="md:col-span-7">
              <p className="text-lg md:text-xl leading-relaxed text-bone-100/85 max-w-2xl">
                Nexuspoint already places top-1% talent across <em className="display-italic text-bone-50">14 role types</em> — executive assistant, project manager, bookkeeper,
                social media manager, graphic designer, video editor, customer service rep, SEO specialist, SDR, affiliate manager, eCommerce analyst,
                data entry & research, administrative support, and the "AI-enabled assistant" product itself.
              </p>
              <p className="mt-5 text-bone-200/75 text-base leading-relaxed max-w-2xl">
                The AI-Enhanced Associate product turns each of those roles into an <span className="under-ember text-ember-400">agent with a narrow, deep specialty</span>,
                a shared supervisor that routes work, and a human Nexuspoint Associate who reviews, corrects, and ships.
                The client still gets <em className="display-italic text-bone-50">a person</em> they can talk to — but that person now gets 2–4× leverage from the agent crew behind them.
              </p>
              <p className="mt-5 text-bone-200/75 text-base leading-relaxed max-w-2xl">
                Three things separate this from "give every Associate ChatGPT": per-client <em className="display-italic text-bone-50">durable memory</em> so the system behaves like it’s known the client for years;
                real <em className="display-italic text-bone-50">tool execution</em> with a verifier; and crisp <em className="display-italic text-bone-50">approval gates</em> so nothing that touches money, a brand voice, or an external stakeholder ships without a human nod.
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="flex flex-wrap gap-2 mb-5">
                <Pill>Supervisor + 14 agents</Pill>
                <Pill>Per-client memory</Pill>
                <Pill>Associate-in-the-loop</Pill>
                <Pill>Daily reports preserved</Pill>
                <Pill>Signed audit log</Pill>
              </div>
              <div className="hair p-5 bg-obsidian-900/60">
                <div className="mono text-[10px] tracking-[0.22em] uppercase text-bone-300 mb-3">Target outcome</div>
                <div className="display text-3xl text-bone-50 leading-tight mb-2">
                  2–4× Associate leverage<br/>
                  <span className="display-italic text-ember-400">at the same quality bar.</span>
                </div>
                <div className="text-sm text-bone-200/75 leading-relaxed mt-3">
                  One Associate can now responsibly serve 3–4 clients instead of 1–2 — and the client still gets a human name, voice, and relationship.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatGrid stats={[
        { label: 'Role agents',           value: '14',     hint: 'one per Nexuspoint service line' },
        { label: 'Associate leverage',    value: '2–4×',   hint: 'clients per Associate' },
        { label: 'Memory per client',     value: 'Tenant-isolated', hint: 'pgvector + preferences' },
        { label: 'Audit coverage',        value: 'Signed', hint: 'every write-op hashed + logged' },
      ]} />

      {/* ARCHITECTURE */}
      <Section eyebrow="Architecture · six layers" title="Executive brain. 14 specialist agents. Associate in the loop." subtitle="The supervisor plans and routes. The 14 agents — one per Nexuspoint service line — execute. The Nexuspoint Associate reviews and ships. The Account Manager handles policy exceptions. Every side-effect is verified, signed, and mirrored into the daily client report." accent>
        <MermaidDiagram chart={architecture} id="q3-arch" />
      </Section>

      {/* 14 ROLE AGENT ROSTER */}
      <Section eyebrow="Role crew" title="One agent per Nexuspoint role type.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AgentCard
            n="01"
            name="Executive Assistant Agent"
            role="Calendar, inbox triage, travel booking, task management, meeting prep. Learns the founder’s reply style per contact. Never sends first-time emails without Associate approval."
            tools={['Gmail · Outlook', 'Google Calendar', 'Notion · ClickUp', 'Duffel / TripActions']}
            guardrails={['Flags legal / finance threads for Associate', 'Quiet hours enforced', 'No one-off calendar moves for ≥ 3 attendees']}
          />
          <AgentCard
            n="02"
            name="Project Manager Agent"
            role="Keeps tasks, teams, and deadlines aligned. Auto-updates status across tools, chases overdue items (politely), surfaces the one thing the founder should unblock today."
            tools={['Asana · ClickUp · Linear', 'Notion', 'Slack', 'Gantt generator']}
            guardrails={['Never closes someone else’s task without evidence', 'Escalates blocked dependencies to Associate', 'Daily digest not a firehose']}
          />
          <AgentCard
            n="03"
            name="Bookkeeper Agent"
            role="Reconciles transactions, categorises expenses, drafts invoices, follows up on AR, flags anomalies. Books are closed weekly with an Associate on final sign-off."
            tools={['QuickBooks · Xero', 'Stripe', 'Plaid', 'OCR for receipts', 'Ramp · Brex']}
            guardrails={['Dual approval on bills > threshold', 'Never auto-pays a new payee', 'Anomaly-detector gates monthly close']}
          />
          <AgentCard
            n="04"
            name="Social Media Manager Agent"
            role="Plans the content calendar in the client’s brand voice, drafts posts per platform, schedules, engages with comments within tone policy. Cross-platform analytics weekly."
            tools={['Buffer · Later · Metricool', 'Meta Graph', 'LinkedIn · X APIs', 'Canva']}
            guardrails={['All first-time posts reviewed by Associate', 'Brand-voice linter required', 'No political / controversial topics without approval']}
          />
          <AgentCard
            n="05"
            name="Graphic Designer Agent"
            role="Produces branded visuals from briefs — social tiles, slide decks, one-pagers, ad creatives — aligned to the client’s brand kit. Always paired with a designer Associate for taste review."
            tools={['Figma · Canva', 'Brand kit store', 'Generative image APIs (with rights management)']}
            guardrails={['No stock misuse', 'Brand kit is source of truth', 'Human taste pass before delivery']}
          />
          <AgentCard
            n="06"
            name="Video Editor Agent"
            role="Cuts long-form into shorts, auto-captions, generates reels/TikToks from podcast or webinar footage, produces descriptions + hashtags. Associate approves before publish."
            tools={['Descript', 'Captions.ai', 'Opus Clip', 'CapCut API', 'YouTube / TikTok APIs']}
            guardrails={['No unauthorised music use', 'Caption accuracy check', 'Publishing requires human click']}
          />
          <AgentCard
            n="07"
            name="Customer Service Agent"
            role="Handles tier-1 support tickets for the client’s end-customers: order status, refund requests (to approval), how-to questions. Hands off nuanced cases to the Associate."
            tools={['Intercom · Zendesk · Gorgias', 'Shopify · Stripe', 'Knowledge base']}
            guardrails={['Refunds above threshold → human', 'Angry-ticket auto-escalate', 'Tone calibrated to brand']}
          />
          <AgentCard
            n="08"
            name="SEO Specialist Agent"
            role="Keyword research, content-gap analysis, on-page audits, internal linking plans, weekly rank monitoring, Schema / meta updates. Writes briefs the Associate or content team executes."
            tools={['Ahrefs · Semrush · Search Console', 'Screaming Frog', 'WordPress / Webflow APIs']}
            guardrails={['No black-hat techniques', 'All changes logged to CMS audit', 'Robots + canonical rules enforced']}
          />
          <AgentCard
            n="09"
            name="Sales Support / SDR Agent"
            role="For clients that buy Nexuspoint SDRs — runs the outbound for their product, not Nexuspoint’s own. Follows their scripts, their TAM, their tone. (Technically the same engine as Q1, tuned per client.)"
            tools={['Apollo · Clay', 'Gmail · SendGrid', 'Twilio · Vapi', 'Client CRM']}
            guardrails={['Per-client ICP & suppression lists', 'Strict brand-voice lint', 'Daily volume caps per seat']}
          />
          <AgentCard
            n="10"
            name="Affiliate Manager Agent"
            role="Onboards new affiliates, tracks performance, answers partner questions, computes commissions, sends payout reports. Escalates contract changes to Associate + AM."
            tools={['PartnerStack · Impact · Rewardful', 'Stripe payouts', 'Affiliate portal']}
            guardrails={['No unilateral contract edits', 'Payout totals require Associate sign-off', 'Fraud-pattern detector']}
          />
          <AgentCard
            n="11"
            name="Data Entry & Research Agent"
            role="Research briefs with cited sources, list building, data cleaning, format conversion, structured extraction from PDFs. Good at ‘give me a two-page brief with 10 citations.’"
            tools={['Tavily · Exa · Perplexity', 'PDF OCR', 'Airtable · Sheets', 'Structured extraction']}
            guardrails={['Must cite every factual claim', 'Flags low-confidence sources', 'Never fabricates missing data']}
          />
          <AgentCard
            n="12"
            name="eCommerce Analyst Agent"
            role="Monitors sales performance across Shopify / Amazon / marketplaces, optimises product listings, runs PDP experiments, flags SKU anomalies, produces the weekly commerce report."
            tools={['Shopify · Amazon SP-API', 'Triple Whale · Lifetimely', 'Google Analytics 4']}
            guardrails={['Price changes require approval', 'Ad-spend caps enforced', 'No bulk SKU edits without dry-run']}
          />
          <AgentCard
            n="13"
            name="Administrative Support Agent"
            role="General admin: form-filling, vendor back-and-forth, meeting scheduling, data capture, document organisation. The ‘long tail’ of tasks a good EA quietly handles."
            tools={['Browserbase', 'Google Workspace', 'DocuSign', 'Zapier / Make']}
            guardrails={['Password vault scoped', 'Captcha → human', 'No external doc signatures without approval']}
          />
          <AgentCard
            n="14"
            name="AI-Enabled Super-Assistant"
            role="Nexuspoint’s flagship product — a single front door for the client, routing to any of the 13 specialists behind the scenes. This IS the Supervisor, made visible. Learns the client’s voice and preferences over time."
            tools={['LangGraph supervisor', 'Memory store', 'All 13 downstream agents']}
            guardrails={['Single source of truth for active plan', 'Refuses actions outside policy', 'Explains its routing decisions on request']}
          />
        </div>
      </Section>

      {/* DAY IN LIFE */}
      <Section eyebrow="Monday morning" title='"Reconcile books. Plan socials. Pull the Shopify report."' subtitle="One natural-language request. Three agents run in parallel. One Associate reviews the pack. Client gets a single clean summary before the meeting.">
        <MermaidDiagram chart={dayInLife} id="q3-seq" />
      </Section>

      {/* MEMORY + POLICY */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <SplitRow
          left={(
            <>
              <span className="eyebrow text-ember-400">Memory design</span>
              <h3 className="display text-4xl text-bone-50 mt-4 mb-6 leading-[1.05]">Per-client, <em className="display-italic">year-over-year</em>.</h3>
              <ul className="space-y-4 text-bone-200/85 text-sm leading-relaxed">
                <li><span className="text-bone-50">Short-term.</span> Current conversation, plan, tool outputs — Redis. Cheap to read, cheap to drop.</li>
                <li><span className="text-bone-50">Long-term facts.</span> Vendors, recurring events, brand voice, tone by channel, past decisions — pgvector, time-decayed, <em className="display-italic">per-tenant isolated</em>.</li>
                <li><span className="text-bone-50">Preference store.</span> Structured JSON: quiet hours, brand kit pointers, payment terms, never-contact list, preferred platforms. Editable by the Associate and client.</li>
                <li><span className="text-bone-50">Feedback memory.</span> Every "do it this way" from the Associate or client becomes a rule with reason + sunset. Explains its behaviour on request.</li>
                <li><span className="text-bone-50">Erasure-ready.</span> When a client offboards, a single DSAR call purges memory, vector rows, and triggers unlearning where models were touched.</li>
              </ul>
            </>
          )}
          right={(
            <>
              <span className="eyebrow text-ember-400">Policy & approval</span>
              <h3 className="display text-4xl text-bone-50 mt-4 mb-6 leading-[1.05]">Automatic for the reversible. <em className="display-italic">Always human</em> for the irreversible.</h3>
              <div className="space-y-4">
                <Callout title="Auto-execute">Reversible, low-stakes actions — draft a social post, categorise a transaction, schedule a routine check-in, categorise an invoice, update an internal tracker.</Callout>
                <Callout title="Associate review">External comms, brand-voice artefacts, month-end reconciliations, customer replies, ad-spend changes. Associate is the final human signature.</Callout>
                <Callout title="Account Manager only">Cancellations, replacements, scope renegotiations, anything with contractual implications. Always goes to the AM with a pre-built context pack.</Callout>
                <Callout title="Audit" tone="teal">Every write-operation is signed, hashed, and appended to an immutable log. The client gets the daily report Nexuspoint already promises — now auto-generated.</Callout>
              </div>
            </>
          )}
        />
      </section>

      {/* KPIs */}
      <Section eyebrow="What ‘good’ looks like" title="KPIs we’d ship with.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ['Clients per Associate',            '2–4× prior'],
            ['Task automation rate (per role)',  '60–85%'],
            ['Associate review acceptance',      '≥ 85% (first pass)'],
            ['Daily report delivery',            '100% (SLA)'],
            ['Client NPS',                       '≥ prior human-only baseline'],
            ['Reversal / undo rate',             '< 1.5%'],
            ['Audit coverage',                   '100% of write-ops'],
            ['Tenant-boundary violations',       '0 (enforced)'],
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
