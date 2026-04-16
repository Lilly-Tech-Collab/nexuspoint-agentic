# Lovable.ai Prompt — Paste as First Message

Paste the block below into a fresh Lovable project. Lovable will scaffold Vite + React + Tailwind + shadcn/ui and produce a working `.lovable.app` URL within a minute or two.

---

Build a professional 5-page single-page application called **"Nexuspoint / Bultron — Agentic AI Architecture"**. Dark editorial aesthetic, warm ember-gold accent. Use Tailwind with these colors:

- Background / obsidian: `#07080B`, surface `#0B0D12`, card `#12141B`
- Bone (text): `#F6F1E4`, muted `#B6AA8B`
- Ember accent: `#E5A24A` (primary), `#F4C478` (soft)
- Teal secondary: `#2FB5A2`

Fonts (load from Google):
- Display serif: **Fraunces** (italic variants used for flourishes)
- Body: **Geist**
- Mono: **JetBrains Mono**

Install `mermaid` and `react-router-dom`. Render every diagram with the mermaid library using a dark theme (`theme: 'base'`, dark mode variables, ember primary border, bone text, obsidian background).

## Pages

### `/` — Home
Hero: small eyebrow "Interview Follow-up · Bultron Architecture Walkthrough". Oversized Fraunces headline: **"Four questions, one *agentic* answer."** (the words "one agentic" in italic ember color).  
Short prepared-by block for **Ganapathy — Product Architect Candidate** (phone (678) 464-0189, email Ganapathy_Mca@hotmail.com, U.S. remote/hybrid).  
Marquee band with tech stack tokens: LangGraph, Claude · OpenAI, pgvector RAG, Twilio · Vapi · Retell, HubSpot · Salesforce, Gmail · Slack · Intercom, Supabase · Railway, LangSmith Tracing, SOC 2 · HIPAA · GDPR, Federated Learning, Differential Privacy, Human-in-the-Loop.  
Below: 4 large numbered cards in a 2-column asymmetric grid (alternate cards offset down by ~4rem). Each card has a giant faded "01/02/03/04" number, eyebrow kicker, Fraunces headline, summary paragraph, tag chips, and a "⟶ Open architecture" link.  
Finally: "Three Design Principles" section — Supervisor + Specialists, Durable Resumable State, Humans Where It Counts.

### `/01-outreach` — Agentic customer selection & multi-channel outreach
Hero: **"Selecting the right buyer. *Reaching them everywhere.*"**  
Stats: 5+ channels, 9 agents, durable pause/resume, <15m time-to-first-touch.  
Mermaid architecture with 6 subgraphs: Signal Layer (Segment, Bombora/G2/6sense, Apollo/LinkedIn/BuiltWith, CRM history) → Targeting Brain (ICP Agent, Enrichment Agent, Priority Queue) → Cadence Orchestrator (Supervisor + pgvector memory) → Channel Agents (Email via Gmail/SendGrid, SMS via Twilio, Voice via Vapi+Retell+ElevenLabs, LinkedIn via Unipile, WhatsApp Business) → Reply Intelligence (Reply Handler, Human approval, Book meeting or Nurture loop) → Observability (LangSmith, A/B, Revenue attribution).  
Agent roster of 8 cards: ICP Scorer, Enrichment & Dedupe, Outreach Supervisor, Email, SMS, Voice, LinkedIn/WhatsApp, Reply Handler. Each with tools and guardrails.  
Mermaid sequence diagram showing a prospect getting 4 touches ending with human approval for a meeting.  
Data flow (6 steps) + Guardrails (consent & compliance, deliverability, human-in-the-loop).  
KPIs table: reply rate +35%, connect rate >28%, cost per meeting ≤ $45, etc.

### `/02-support` — Agentic customer support that resolves, not deflects
Hero: **"Support that *actually resolves.*"**  
Stats: 6 channels, 70%+ auto-resolve, <30s first-response, +6pts CSAT.  
Mermaid architecture with 7 subgraphs: Omnichannel Ingest (chat, email, ticket, Slack, voice, WhatsApp) → Triage & Context (Triage Agent, Identity Resolver, session context in Postgres+Redis) → Knowledge & Retrieval (product docs, past tickets, runbooks, pgvector) → Solve (Solution Agent, Action Agent) → Real Tools (Stripe, Auth, Subscriptions, Logistics, internal CRUD) → Escalation (confidence+policy gate, human agent) → Quality Loop (CSAT, review queue, golden eval set, tuning).  
8 agent cards: Triage, Identity Resolver, Knowledge Retriever (RAG), Solution, Action, Escalation, Follow-up, Quality Reviewer.  
Mermaid stateDiagram-v2 for the ticket lifecycle (Received → Triaging → Self_Solved / Acting / Escalated → Verifying → AwaitingCSAT → Closed).  
Split: Knowledge freshness (continuous ingestion, deprecation gate, source of truth per domain, bad-answer backflow) + Guardrails (dollar ceiling, regulated accounts, ambiguous intent, reversibility test).  
KPIs table.

### `/03-va-replacement` — Full VA replacement
Hero: **"Your Virtual Assistant, *rebuilt as a crew.*"**  
Stats: 9 agents, ~15% human approval, years of memory, signed audit.  
Mermaid architecture: Unified I/O (Slack, Email, Voice, Web) → Executive Brain (Intent Router, Planner, Supervisor) → Memory & Identity (short-term, long-term pgvector, preference store, policy store) → Specialist Agents (Inbox, Calendar, Research, Document, Travel, Finance, CRM, Meeting, Browser) → Execution Safety (approval gate, human Slack approval, tool execution, verifier) → Observability (LangSmith, immutable audit log, weekly digest).  
10 agent cards (the 9 specialists + Supervisor+Memory).  
Mermaid sequence: "Plan my NYC trip + clear my inbox" — multi-agent, one human approval on spend.  
Split: Memory design (short-term, long-term, preference, feedback) + Policy & approval (auto-execute, approve in Slack, human-only, audit).  
KPIs table.

### `/04-privacy-ml` — Privacy-safe ML for VA automation
Hero: **"Train the model *without seeing the secrets.*"**  
Stats: 0 raw PII, 3 data paths, privacy budget ε ≤ 3.0, SOC 2 / HIPAA / GDPR.  
Mermaid architecture with 6 subgraphs: Client Edge (raw data → DLP/PII scanner → classifier → tokenizer/vault) → Ingress Pipeline (policy engine → sensitivity router) branching to three training paths: **Path A** Prompt+RAG (no training), **Path B** fine-tune on synthetic + redacted (SDV/Gretel), **Path C** federated learning + differential privacy. All training paths feed Confidential Compute (AWS Nitro, Azure CC) → Model Registry + lineage + model cards → Inference Gateway with in-flight PII redactor + output leak filter → Governance (immutable audit, compliance mapping, DSAR/right-to-erasure).  
Second mermaid diagram: deterministic format-preserving tokenization flow ("John Doe → CUST_a1b2" → model → detokenize on response).  
8 component cards: Data Classifier+DLP, Tokenization Vault, Synthetic Data Generator, Federated Training Coordinator, Confidential Compute Runtime, Model Registry+Lineage, Serving Gateway+Output Filter, Governance Layer.  
Split: "Which path, when?" (Path A/B/C descriptions) + "Hard guarantees" (provable zero-PII, right to erasure, budget-bounded privacy, model cards per release).  
Compliance mapping table: SOC 2 / HIPAA / GDPR / ISO 42001 — control, component, evidence.  
KPIs table.

## Shared layout

- Top navbar: brand mark (pulsing ember dot + "Nexuspoint / Bultron · Agentic AI Architecture"), section links to the 4 question pages, ghost "Index" button when not on home.
- Footer with a "Next →" giant hover link to the next question, and a contact strip.
- Fine hairline borders (`rgba(246,241,228,0.12)`) everywhere.
- Faint dot-grid and line-grid backgrounds, subtle radial ember glow, film-grain overlay (SVG fractalNoise filter, 8% opacity).
- Corner crop marks around cards (decorative `::before`/`::after`).
- Tiny "eyebrow" all-caps mono labels, oversized Fraunces headlines with optical sizing, italic Fraunces for emphasis in ember color.
- Hover: ember glow on buttons, slight lift, underline grows on links.
- Use `mermaid.initialize({ theme: 'base', darkMode: true })` with obsidian/ember/bone theme variables so the diagrams match the page.

Make it production-grade, responsive, accessible. Credit in footer: "Prepared by Ganapathy · Product Architect Candidate · Bultron".

---

After Lovable finishes, share the generated `.lovable.app` URL with the Nexuspoint team.
