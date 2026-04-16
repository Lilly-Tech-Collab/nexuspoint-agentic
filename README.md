# Nexuspoint — Agentic AI Architecture

Four-question interview follow-up site tailored to Nexuspoint's actual business: a BPO/staffing firm matching entrepreneurs and SMBs with top-1%-vetted remote professionals across 14 role types (Executive Assistant, Bookkeeper, Social Media Manager, Customer Service, SEO Specialist, Graphic Designer, Video Editor, Project Manager, SDR, Affiliate Manager, eCommerce Analyst, Data Entry & Research, Admin Support, AI-Enhanced Associate).

Each question page is written against that business — not generic AI architecture:
- **Q1** — how agentic outreach finds founders at the moment they post a job for one of those 14 roles
- **Q2** — how agentic support handles the 12 most common requests from 1,000+ existing clients without burning Account Manager hours
- **Q3** — how each of the 14 role types becomes an agent paired with a human Associate ("AI-Enhanced Associate")
- **Q4** — how to build ML on top of what Associates see (client inboxes, QuickBooks, Stripe, CRM) without ever ingesting raw client data

## Run locally

```bash
cd nexuspoint-agentic
npm install
npm run dev
```

Open http://localhost:5173

## Deploy

This is a pure static Vite/React app — any of the following will host it:

- **Vercel**  — `vercel deploy` in this folder.
- **Netlify** — drag-and-drop `dist/` after `npm run build`.
- **Cloudflare Pages** — point at the repo; build command `npm run build`, output `dist`.
- **GitHub Pages** — `npm run build` and push `dist/` to a `gh-pages` branch.

## How to put this on Lovable.ai

Lovable.ai builds from natural-language prompts rather than a folder upload. Two options:

### Option A — Rebuild on Lovable from a prompt
Open [lovable.dev](https://lovable.dev), create a new project, and paste the contents of `LOVABLE_PROMPT.md` as the first message. Lovable will scaffold a near-identical site (Vite + React + Tailwind + shadcn/ui) in minutes and give you a `.lovable.app` URL you can share.

### Option B — Push this repo to GitHub, then "Import to Lovable"
1. Create a GitHub repo and push this folder.
2. In Lovable, use **Connect GitHub** → import → point at your repo.
3. Lovable will pick up the Vite/React project and host it.

## Project structure

```
src/
├── main.jsx
├── App.jsx
├── index.css           · design tokens, grain, grid textures
├── components/
│   ├── PageShell.jsx   · shell + Section, Pill, StatGrid, AgentCard, Callout
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── QuestionCard.jsx
│   └── MermaidDiagram.jsx
└── pages/
    ├── Home.jsx        · 4 numbered cards
    ├── Question1.jsx   · Multi-channel outreach
    ├── Question2.jsx   · Omnichannel support
    ├── Question3.jsx   · Full VA replacement
    └── Question4.jsx   · Privacy-safe ML
```

## Design notes

Editorial + terminal: deep obsidian canvas, warm ember-gold accent, Fraunces serif display, Geist sans body, JetBrains Mono for technical detail. Asymmetric card grid, fine-line dividers, faint noise + dot-grid textures, marquee band on the home page. All diagrams rendered through `mermaid` with a custom dark theme.

Contact: Ganapathy · (678) 464-0189 · Ganapathy_Mca@hotmail.com
