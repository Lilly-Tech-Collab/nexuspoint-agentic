import PageShell, { Section, Pill, StatGrid, AgentCard, Callout, SplitRow } from '../components/PageShell.jsx'
import MermaidDiagram from '../components/MermaidDiagram.jsx'

const architecture = `
flowchart TB
    subgraph Edge["1 · Client Tenant Edge"]
        RAW[What the Associate sees<br/>client email · QuickBooks · Stripe<br/>CRM · Slack · customer records]
        DLP[DLP + PII Scanner<br/>Presidio · NER · regex<br/>per-tenant rules]
        CLS[Data Classifier<br/>public · internal · sensitive · regulated]
        TOKEN[Tokenization Vault<br/>FPE · tenant-isolated keys]
    end

    subgraph Pipe["2 · Ingress Pipeline"]
        POL[Policy Engine<br/>OPA / Rego]
        ROUTE{Sensitivity<br/>+ consent?}
        SYNTH[Synthetic Generator<br/>SDV · Gretel<br/>for training signal]
        REDACT[Redacted transcripts]
        AGG[Aggregated signals only<br/>no raw records]
    end

    subgraph Train["3 · Three Training Paths"]
        PATH1[Path A<br/>Prompt + RAG<br/>NO training]
        PATH2[Path B<br/>Fine-tune on synthetic<br/>+ tokenized redacted]
        PATH3[Path C<br/>Federated Learning<br/>+ Differential Privacy]
        ENC[Confidential Compute<br/>AWS Nitro · Azure CC]
        PATH2 --> ENC
        PATH3 --> ENC
    end

    subgraph Reg["4 · Model Registry"]
        REG[(Model Registry<br/>lineage · approvals)]
        CARD[Model Cards<br/>+ eval + consent basis]
    end

    subgraph Serve["5 · Inference"]
        GW[Inference Gateway<br/>per-tenant routing]
        RED2[In-flight PII Redactor]
        MODEL[Model Ensemble]
        OUT[Detokenize for client]
        POST[Output Leak Detector]
    end

    subgraph Gov["6 · Governance"]
        AUDIT[Immutable Audit<br/>signed · tamper-evident]
        SOC[SOC 2 · HIPAA · GDPR<br/>per-tenant control mapping]
        DSAR[DSAR · Right-to-Erasure<br/>per-client offboarding]
    end

    RAW --> DLP --> CLS --> TOKEN --> POL --> ROUTE
    ROUTE -->|public| PATH1
    ROUTE -->|internal · consented| SYNTH --> PATH2
    ROUTE -->|sensitive · consented| REDACT --> PATH2
    ROUTE -->|regulated| AGG --> PATH3
    ENC --> REG --> CARD
    GW --> RED2 --> MODEL --> POST --> OUT
    Serve -.logs.-> AUDIT --> SOC
    DSAR -.purge.-> REG
    DSAR -.purge.-> Edge
`

const dataFlow = `
flowchart LR
    A[Client email to Associate] --> B{PII / secrets?}
    B -->|Yes| C[Tokenize<br/>Acme Corp → CUST_a1b2<br/>$4,281 → AMT_x9y2]
    B -->|No| D[Pass-through]
    C --> E[Model sees tokens only]
    D --> E
    E --> F[Draft response]
    F --> G[Detokenize for Associate<br/>back to Acme / $4,281]
    G --> H[Associate approves · sends]
    C -.vault mapping.-> V[(Token Vault<br/>per-tenant KMS)]
    G -.vault lookup.-> V
`

export default function Question4() {
  return (
    <PageShell next={{ num: '01', title: 'Finding the founders who are about to hire — and reaching them first.', to: '/01-outreach' }}>
      {/* HERO */}
      <section className="relative overflow-hidden hair-b">
        <div className="absolute inset-0 dotgrid opacity-50" />
        <div className="absolute -top-32 -right-32 w-[620px] h-[620px] ember-glow" />
        <div className="absolute bottom-10 left-1/4 w-[360px] h-[360px] ember-glow opacity-60" />
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="flex items-center gap-3 mb-8">
            <span className="mono text-ember-400 text-sm">Q4</span>
            <span className="w-8 h-px bg-ember-500" />
            <span className="eyebrow">Governance · Privacy-Safe ML</span>
          </div>

          <h1 className="display text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.94] text-bone-50 animate-fade-up max-w-[18ch]">
            Train the model<br/>
            <span className="display-italic text-ember-400">without ingesting what the Associate sees.</span>
          </h1>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-10 animate-fade-up" style={{ animationDelay: '120ms' }}>
            <div className="md:col-span-7">
              <p className="text-lg md:text-xl leading-relaxed text-bone-100/85 max-w-2xl">
                A Nexuspoint Associate already sits inside a client’s most sensitive systems: their inbox, QuickBooks, Stripe, Shopify, HubSpot, Slack, end-customer records.
                When we build the AI-Enhanced Associate product, clients are clear: <em className="display-italic text-bone-50">do not train your models on our data.</em>
              </p>
              <p className="mt-5 text-bone-200/75 text-base leading-relaxed max-w-2xl">
                The answer isn’t a promise in a contract — it’s an architecture that makes it <span className="under-ember text-ember-400">structurally impossible</span> for raw client data
                to reach a training corpus. Three techniques, in combination:
              </p>
              <ul className="mt-4 space-y-2 text-base text-bone-200/85 leading-relaxed max-w-2xl">
                <li>— <span className="text-bone-50">Redact-at-boundary</span> with deterministic format-preserving tokenization (the model sees <em>CUST_a1b2</em>, not <em>Acme Corp</em>).</li>
                <li>— <span className="text-bone-50">Synthetic data generation</span> when we need learning signal at scale without real records.</li>
                <li>— <span className="text-bone-50">Federated learning + differential privacy</span> when we must learn from a real distribution but never see a real row.</li>
              </ul>
              <p className="mt-5 text-bone-200/75 text-base leading-relaxed max-w-2xl">
                All training runs inside confidential compute. Every client is a hard <em className="display-italic text-bone-50">tenant boundary</em>.
                When a client offboards, a single DSAR call purges memory and triggers model unlearning where applicable. The promise becomes a proof.
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="flex flex-wrap gap-2 mb-5">
                <Pill>PII redaction</Pill>
                <Pill>Synthetic data</Pill>
                <Pill>Federated learning</Pill>
                <Pill>Differential privacy</Pill>
                <Pill>Confidential compute</Pill>
                <Pill>Per-tenant erasure</Pill>
              </div>
              <div className="hair p-5 bg-obsidian-900/60">
                <div className="mono text-[10px] tracking-[0.22em] uppercase text-bone-300 mb-3">Commitment to the client</div>
                <div className="display text-3xl text-bone-50 leading-tight mb-2">
                  Zero raw PII in training.<br/>
                  <span className="display-italic text-ember-400">Structural, not rhetorical.</span>
                </div>
                <div className="text-sm text-bone-200/75 leading-relaxed mt-3">
                  Model cards, lineage graphs, and independent eval reports produced for every release. DSAR / right-to-erasure propagates to model weights via unlearning routines.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatGrid stats={[
        { label: 'Raw PII in training',   value: '0',           hint: 'enforced at ingress, not in policy' },
        { label: 'Data paths',            value: '3',           hint: 'prompt · fine-tune · federated' },
        { label: 'Privacy budget (ε)',    value: '≤ 3.0',       hint: 'per-tenant, per-epoch' },
        { label: 'Tenant boundary',       value: 'Hard',        hint: 'keys + index + model + memory' },
      ]} />

      {/* ARCHITECTURE */}
      <Section eyebrow="Architecture · six layers" title="A privacy-first path from a Nexuspoint tenant to a deployable model." subtitle="At the tenant edge: classify, redact, tokenize per-client. In the middle: route by sensitivity to one of three training paths. At the core: confidential compute + a model registry with signed lineage. At serve time: in-flight redaction + output leak detection. Governance wraps everything." accent>
        <MermaidDiagram chart={architecture} id="q4-arch" />
      </Section>

      {/* DATA FLOW */}
      <Section eyebrow="The token trick" title="The model sees tokens. The Associate sees reality." subtitle="Deterministic format-preserving tokenization lets the same entity keep the same placeholder across training and inference — so the model learns relationships (‘CUST_a1b2 usually pays on Net-15’) without ever touching a real identifier.">
        <MermaidDiagram chart={dataFlow} id="q4-flow" />
      </Section>

      {/* COMPONENT ROSTER */}
      <Section eyebrow="Component roster" title="Eight components that make the promise provable.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AgentCard
            n="01"
            name="Data Classifier + DLP"
            role="First gate at the tenant edge. Classifies every record as public / internal / sensitive / regulated. Uses Presidio-style NER plus a regex pack tuned to the systems Nexuspoint Associates touch (Gmail, QuickBooks, Stripe, HubSpot, Shopify)."
            tools={['Microsoft Presidio', 'spaCy NER', 'Per-tenant regex pack', 'Policy versioning']}
            guardrails={['Default-deny on unclassified', 'Out-of-scope data quarantined, not dropped', 'Rule changes peer-reviewed']}
          />
          <AgentCard
            n="02"
            name="Tokenization Vault"
            role="Replaces sensitive values with deterministic, format-preserving tokens. Mappings live in a tenant-isolated vault with per-tenant KMS keys. Training and inference work on tokens; the serving layer is the only surface that detokenizes — and only for the requesting Associate."
            tools={['HashiCorp Vault', 'FPE (FF3-1)', 'Per-tenant KMS', 'Audit log']}
            guardrails={['Keys rotate on schedule', 'Vault lookups audit-logged', 'Model never sees detokenized values']}
          />
          <AgentCard
            n="03"
            name="Synthetic Data Generator"
            role="Produces statistically similar but non-identifiable data for training and stress-testing role agents (inbox triage, bookkeeping categorisation, social-media planning). Validated against privacy metrics before any use."
            tools={['SDV', 'Gretel', 'CTGAN', 'Membership-inference tests']}
            guardrails={['Synthetic-only runs labelled in registry', 'Re-identification test below threshold', 'Per-release privacy report']}
          />
          <AgentCard
            n="04"
            name="Federated Training Coordinator"
            role="For the regulated tier — the model travels to the client, trains on client-side compute, sends back only encrypted gradient updates. Coordinator aggregates with secure aggregation + differential privacy noise."
            tools={['Flower · NVIDIA FLARE', 'Opacus (DP-SGD)', 'Secure aggregation', 'Client runner']}
            guardrails={['Per-round ε budget enforced', 'Clients can revoke consent per round', 'No raw gradient stored centrally']}
          />
          <AgentCard
            n="05"
            name="Confidential Compute Runtime"
            role="Training and high-risk inference run inside hardware enclaves. Remote attestation verifies the approved code is executing before any tenant keys or data are released to the enclave."
            tools={['AWS Nitro Enclaves', 'Azure Confidential VMs', 'Intel TDX', 'Attestation']}
            guardrails={['No plaintext at rest outside enclave', 'Binary hash pinned in model card', 'Ops have no data-plane access']}
          />
          <AgentCard
            n="06"
            name="Model Registry + Lineage"
            role="Every model artifact is signed, linked to its data recipe (tenants used, redaction rules, ε budget, consent basis) and carries a model card with intended use, limitations, eval results, and a human approver."
            tools={['MLflow', 'Weights & Biases', 'Sigstore', 'Lineage graph']}
            guardrails={['No deploy without approved model card', 'Data recipe immutable per version', 'One-click rollback']}
          />
          <AgentCard
            n="07"
            name="Serving Gateway + Output Filter"
            role="At inference: per-tenant routing, in-flight redactor on prompts, the model sees tokens, output passes a leak detector that scans for accidental PII, and only then detokenizes for the Associate."
            tools={['Inference gateway', 'Prompt redactor', 'Leak detector', 'Per-tenant rate limit']}
            guardrails={['Block-on-leak policy', 'Per-tenant token ceiling', 'Every request logged + signed']}
          />
          <AgentCard
            n="08"
            name="Governance Layer"
            role="Cross-cutting. Maps every component to SOC 2 / HIPAA / GDPR controls. Runs the DSAR + right-to-erasure workflow: when a Nexuspoint client offboards, their tokens are forgotten, their vectors are purged, and any model they trained gets an unlearning pass."
            tools={['OPA / Rego', 'DSAR workflow', 'Unlearning routines', 'External auditor portal']}
            guardrails={['Policy-as-code in git', 'Quarterly external audit', 'Public trust report per tenant']}
          />
        </div>
      </Section>

      {/* PRIVACY TRADE-OFFS */}
      <section className="mx-auto max-w-[1400px] px-6 md:px-10 py-20 md:py-28">
        <SplitRow
          left={(
            <>
              <span className="eyebrow text-ember-400">Which path, when?</span>
              <h3 className="display text-4xl text-bone-50 mt-4 mb-6 leading-[1.05]">Three privacy profiles. One router. Sized to Nexuspoint’s actual mix.</h3>
              <div className="space-y-5 text-sm text-bone-200/85 leading-relaxed">
                <div className="hair-l pl-5">
                  <div className="mono text-[11px] tracking-[0.18em] uppercase text-ember-400 mb-1">Path A · Prompt + RAG · no training</div>
                  <p>Most agents start here. The EA, Admin, Research, and Super-Assistant agents run on foundation models with a redacted, per-tenant retrieval index. Zero training, zero data retention, fastest to ship. Default for new tenants.</p>
                </div>
                <div className="hair-l pl-5">
                  <div className="mono text-[11px] tracking-[0.18em] uppercase text-ember-400 mb-1">Path B · Fine-tune on synthetic + tokenized redacted</div>
                  <p>Where prompt engineering isn’t enough — bookkeeping categorisation, social-media voice cloning, customer-service tone adaptation. Train on synthetic records plus tokenized, redacted transcripts. Custom LoRA adapters, no raw PII on GPUs.</p>
                </div>
                <div className="hair-l pl-5">
                  <div className="mono text-[11px] tracking-[0.18em] uppercase text-ember-400 mb-1">Path C · Federated + differential privacy</div>
                  <p>Reserved for the strictest regulated clients (finance, healthcare-adjacent). Model travels to the client, learns in-situ, only noisy aggregated updates come back. Higher infra cost, slower iteration — used sparingly.</p>
                </div>
              </div>
            </>
          )}
          right={(
            <>
              <span className="eyebrow text-ember-400">Hard guarantees</span>
              <h3 className="display text-4xl text-bone-50 mt-4 mb-6 leading-[1.05]">Promises become <em className="display-italic">proofs.</em></h3>
              <div className="space-y-4">
                <Callout title="Provable zero-PII" tone="teal">DLP scanner runs on 100% of ingress per tenant; any leak above threshold quarantines the batch and pages the privacy officer. Independent auditor samples weekly.</Callout>
                <Callout title="Right to erasure">Client offboards → DSAR hits the vault first (forgets the identity), then the retrieval index (purges vectors), then triggers targeted model-unlearning for affected cohorts. Client gets a signed erasure certificate.</Callout>
                <Callout title="Budget-bounded privacy">Every federated round has an explicit ε-budget. Once spent for the period, the client is excluded from aggregation until next window. Privacy treated as a limited resource — not a marketing term.</Callout>
                <Callout title="Model card per release">Intended use, limitations, evaluation metrics, known failure modes, data recipe, consent basis. Shared with the client’s security team before any rollout into their tenant.</Callout>
              </div>
            </>
          )}
        />
      </section>

      {/* Compliance Map */}
      <Section eyebrow="Compliance mapping" title="Each control ties to a concrete component." subtitle="Auditors don’t want narrative — they want a table. Here’s the table.">
        <div className="overflow-x-auto hair">
          <table className="w-full text-sm">
            <thead className="hair-b bg-obsidian-800/60">
              <tr className="mono text-[10px] tracking-[0.22em] uppercase text-bone-300">
                <th className="text-left px-4 py-3">Framework</th>
                <th className="text-left px-4 py-3">Control</th>
                <th className="text-left px-4 py-3">Component</th>
                <th className="text-left px-4 py-3">Evidence</th>
              </tr>
            </thead>
            <tbody className="text-bone-200/90">
              {[
                ['SOC 2',   'CC6.1 Logical access',   'Vault + per-tenant KMS',   'Key rotation log, access review'],
                ['SOC 2',   'CC7.2 Monitoring',       'Signed audit pipeline',    'Tamper-evident log, weekly review'],
                ['HIPAA',   '§164.312(a) Access',     'Confidential compute',     'Attestation per deploy'],
                ['HIPAA',   '§164.312(b) Audit',      'Registry + lineage',       'Immutable model + data lineage'],
                ['GDPR',    'Art. 17 Erasure',        'DSAR + unlearning',        'Erasure certificate + unlearning run'],
                ['GDPR',    'Art. 25 By-design',      'Classifier + tokenizer',   'Default-deny policy + code review'],
                ['GDPR',    'Art. 28 Processor',      'Per-tenant DPA',           'Signed DPA + sub-processor list'],
                ['PCI DSS', '3.4 PAN masking',        'FPE tokenization',         'Tokenized card-like fields in logs'],
                ['ISO 42001', 'AI mgmt system',       'Model cards + approval',   'Signed cards, approver log'],
              ].map(([a, b, c, d]) => (
                <tr key={a+b} className="hair-b">
                  <td className="px-4 py-3 mono text-[11px] text-ember-400">{a}</td>
                  <td className="px-4 py-3">{b}</td>
                  <td className="px-4 py-3">{c}</td>
                  <td className="px-4 py-3 text-bone-200/75">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* KPIs */}
      <Section eyebrow="What ‘good’ looks like" title="KPIs we’d ship with.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ['Raw PII in training corpus',             '0 records (verified)'],
            ['Redaction recall on audit sample',        '≥ 99.5%'],
            ['Membership-inference attack risk',        '< random baseline + 2%'],
            ['ε per training round',                    '≤ 0.5'],
            ['DSAR / erasure SLA',                      '≤ 30 days'],
            ['Model-card coverage',                     '100% of deployed models'],
            ['External audit frequency',                'Quarterly, independent'],
            ['Task accuracy vs. non-private baseline',  '≥ 95% parity'],
            ['Tenant-boundary violations',              '0 (enforced, not promised)'],
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
