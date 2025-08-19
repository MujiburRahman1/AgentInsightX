---
marp: true
title: AgentInsightX — GPT‑5 Vendor Intelligence & AI Workflow Analytics
paginate: true
theme: default
---

# AgentInsightX
## GPT‑5 Vendor Intelligence & AI Workflow Analytics

- Transparent AI decision tracing
- Real‑time vendor analytics & compliance
- Built for production and hackathons

Notes:
Open with a one‑liner: “We help teams find compliant vendors with full AI auditability.”

---

# Problem

- Vendor selection is slow, opaque, and risky
- Compliance checks are manual and hard to audit
- AI outputs lack traceability for enterprise teams

Notes:
Emphasize risk, governance, and time cost.

---

# Solution

- Visualize and audit every AI decision step
- GPT‑5 powered vendor analysis with compliance signals
- Dashboards, filters, final report, and exportable audits

Notes:
Tie to transparency, speed, and compliance readiness.

---

# Live Demo Flow

1. Enter query → Workflow canvas populates
2. Analytics: KPIs, charts, vendor list + filters
3. Vendor profile drawer → Export to PDF
4. Branch compare + Rule builder (prototype)

Notes:
Keep this slide visible while demoing.

---

# Key Features

- Workflow: Prompt → Search → Shortlist → Weighting → Output
- Analytics: Total vendors, Avg rating, Compliance rate, Top category
- Vendor discovery: Search, filters, compliant‑only toggle
- Final report: Summary, compliance analysis, constraints/weights

---

# Screenshots (placeholders)

![w:1024](../public/placeholder.svg)

- Canvas & Summary
- Dashboard & Charts
- Vendor List & Profile Drawer
- Export PDF

Notes:
Replace with real screenshots before pitch.

---

# Why GPT‑5 (Application of Tech)

- Strong reasoning for vendor analysis and summaries
- Structured outputs → deterministic scoring & reports
- Ready for tool use (RAG/connectors) in next iteration

---

# Architecture (High‑Level)

- Frontend: React + TS, XYFlow, shadcn/ui, Recharts
- Data: JSON datasets → Analytics → UI
- Optional backend: Python (LangGraph) → GPT‑5 via OPENAI_API_KEY

Notes:
Backend optional for demo; GPT‑5 is core.

---

# Business Value

- Faster compliant vendor selection (time‑to‑decision ↓)
- Audit‑ready reports for procurement/compliance
- Extensible: rule packs, connectors, exports

---

# Differentiation (Originality)

- Unifies agentic transparency + vendor intelligence
- End‑to‑end auditability (timeline, history, reports)
- Branch comparisons + rule builder groundwork

---

# Market & GTM (Scalability)

- Target: Mid/large enterprises, regulated industries
- Pilot with procurement/compliance teams
- Land‑and‑expand via connectors + rule packs

---

# Roadmap

Short term:
- True multi‑agent branches, rule‑based scoring, connectors (Sheets/CSV/API)

Mid term:
- Collaboration, roles/permissions, exports/API

Long term:
- Compliance marketplace (rule packs), advanced analytics

---

# Security & Compliance (Optional)

- Env‑based keys; no secrets in code
- PII redaction, audit logs, retention policies (planned)
- SOC2‑friendly architecture (planned)

---

# Demo Instructions (for judges)

- Run frontend: `npm install && npm run dev`
- Optional backend: set `OPENAI_API_KEY` → `python langgraph_workflow_skeleton.py`
- Try: “eco‑friendly paint vendors in Wyoming under $30”

---

# Call to Action

- Looking for pilot users and data partners
- Feedback on rule packs & integrations
- Star the repo / join waitlist

Notes:
End with a crisp ask.

---

# How to Export This Deck

Using Marp CLI (recommended):

```bash
npx @marp-team/marp-cli docs/AgentInsightX_Slides.md -o AgentInsightX_Deck.pptx
```

Then import the PPTX into Google Slides (File → Import slides), or export PDF and upload to Slides.


