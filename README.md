# AgentInsightX — GPT‑5 Vendor Intelligence & AI Workflow Analytics

AgentInsightX visualizes, audits, and explains AI decision flows while surfacing real‑time vendor analytics and compliance insights. Built for hackathons and production teams alike, it combines transparent workflow tracing with practical procurement tooling.

> Core model: GPT‑5 (via `OPENAI_API_KEY`). Frontend: React + TypeScript (Vite). Workflow skeleton: Python + LangGraph.

---

## ✨ Key Features

- **Workflow Canvas (XYFlow)**
  - Prompt → Vendor Search → Shortlisting → Weighting & Sorting → Output
  - Hover details per step, side drawer for editing, and a rich final report
- **Analytics Dashboard (UI)**
  - KPIs: Total Vendors, Average Rating, Compliance Rate, Top Category
  - Charts: Category bar chart, Compliance pie chart, Top Locations
- **Vendor Discovery**
  - Search + filters (min rating, max price, location, compliant‑only)
  - Vendor profile drawer with media, reviews, and export to PDF (print)
- **Timeline, Metrics, and Edit History**
  - Per‑step execution time, user action history, and change log
- **Multi‑Agent Branch Compare (basic)**
  - Compare total and average execution time per branch (prototype)
- **Rule Builder (basic)**
  - Compose simple compliance rules (field/operator/value) for future scoring

---

## 🧠 Why AgentInsightX (Hackathon Pitch)

- **Clear user value**: Helps procurement/compliance teams shortlist compliant vendors quickly with full auditability.
- **Application of technology**: Uses GPT‑5 for analysis/summary; transparent workflow + analytics UI for trust.
- **Scalability & market potential**: Extensible datasets, rule builder, multi‑agent support, and exportable audits.
- **Originality**: Practical fusion of agentic transparency and vendor intelligence in a single experience.

---

## 🔧 Tech Stack

- Frontend: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Recharts, XYFlow
- State/Data: TanStack Query (ready), local JSON datasets
- Backend (optional): Python 3.10+, LangGraph, LangChain/OpenAI (GPT‑5)

---

## 📦 Project Structure

```
AgentInsightX/
├─ public/
├─ src/
│  ├─ components/
│  │  ├─ sandbox/
│  │  │  ├─ AIFlowCanvas.tsx          # Workflow canvas + edit/summary drawers
│  │  │  ├─ VendorAnalytics.tsx       # Dashboard widgets
│  │  │  ├─ VendorList.tsx            # Search + filters + profile drawer
│  │  │  ├─ BranchCompare.tsx         # Branch comparison (prototype)
│  │  │  ├─ RuleBuilder.tsx           # Simple compliance rule builder
│  │  │  ├─ MetricChart.tsx           # Step execution time chart
│  │  │  ├─ ActionTimeline.tsx        # User actions timeline
│  │  │  └─ EditHistory.tsx           # Edit history panel
│  │  └─ ui/                          # shadcn/ui primitives
│  ├─ pages/                           # Index (main experience)
│  └─ lib/
├─ synthetic_vendor_data.json          # Demo vendor dataset
├─ vendor_dataset_*.json               # Additional sample datasets
├─ vendor_data_compliance_*.json       # Large compliance datasets (optional)
└─ langgraph_workflow_skeleton.py      # Optional Python workflow runner (GPT‑5)
```

---

## 🚀 Quick Start (Frontend)

1. Install Node.js 18+.
2. Install dependencies and start dev server:

```bash
npm install
npm run dev
```

Then open the local URL printed in your terminal (Vite dev server).

---

## 🧰 Optional Backend (LangGraph + GPT‑5)

1. Python 3.10+ and `pip` installed
2. Create a virtual environment and install requirements (if you add any):

```bash
python -m venv venv
# Windows PowerShell
venv\Scripts\Activate.ps1
# macOS/Linux
# source venv/bin/activate
pip install -r requirements.txt  # if present
```

3. Set your GPT‑5 API key (do NOT commit secrets):

```powershell
# PowerShell
$env:OPENAI_API_KEY="YOUR_GPT5_API_KEY"
```

```bash
# bash/zsh
export OPENAI_API_KEY="YOUR_GPT5_API_KEY"
```

4. Run the workflow skeleton:

```bash
python langgraph_workflow_skeleton.py
```

The Python file uses `ChatOpenAI(model="gpt-5")` and reads `OPENAI_API_KEY` from the environment.

> Note: We intentionally do not hardcode any secrets.

---

## 🔐 Environment Variables

- `OPENAI_API_KEY` — required to call GPT‑5 (for the Python workflow). The frontend currently runs against mock data but can be extended to call your backend.

---

## 🖥️ Usage Guide

- Enter a natural‑language query at the top and click Send to initialize the workflow.
- Explore the workflow canvas; click nodes to edit parameters or open the output summary.
- Open the Analytics tab for the dashboard, vendor list, branch comparison, and rule builder.
- In the vendor list, click “View Profile” to open the vendor drawer and use “Export as PDF” (prints the profile to PDF via your browser’s print dialog).

---

## 📊 Screenshots (placeholders)

- Canvas + Summary
- Analytics Dashboard
- Vendor List & Profile Drawer
- Branch Compare & Rule Builder

_Add images under `public/` and reference them here when ready._

---

## 🧩 Architecture Notes

- UI is modular and data‑agnostic; analytics currently read from `synthetic_vendor_data.json`.
- Canvas nodes compute simple synthetic metrics for real‑time feedback.
- The Python skeleton demonstrates how to orchestrate a vendor workflow with GPT‑5 and can be swapped for your service.

---

## 🛣️ Roadmap

### Next 24 Hours (tracked)
- [x] Multi‑agent branching comparisons (summary view)
- [x] Richer vendor profiles with embedded documentation
- [x] Exportable compliance audit PDFs (via browser print)
- [x] Enhanced visualization polish for decision steps

### Future Enhancements
- [ ] Support additional workflow engines via import adapters
- [ ] Custom compliance rule builder → scoring pipeline
- [ ] Team collaboration (auth, shared projects, realtime cursors)
- [ ] Advanced analytics (cohorts, time trends, drill‑downs)

---

## 🧪 Scripts

```bash
npm run dev       # start Vite dev server
npm run build     # create production build
npm run preview   # preview production build
npm run lint      # run ESLint
```

---

## 🤝 Contributing

Issues and PRs are welcome. Please include a clear description, screenshots (if UI), and testing notes.

---

## 📄 License

MIT — see `LICENSE` if included in your fork. If not, you may add a standard MIT license.

---

 

