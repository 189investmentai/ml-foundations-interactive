# Getting Started: ML for Practitioners

Welcome! This guide will get you up and running in about 5 minutes. No local setup. Everything runs in the browser or Colab.

---

## What you need

**Google account + comfort with Python and pandas.** That's it.

You don't need advanced math. You don't need a GPU. You don't need to install anything. Colab runs in the cloud. Playgrounds run in any browser. The quizzes are Google Forms (or Typeform).

If you can write a pandas DataFrame and run a for-loop, you're ready.

---

## How this course works

Each module has **6 components**. Plan for about **2–3 hours per module**:

| Component | Time | What you do |
|-----------|------|-------------|
| **Micro-lesson** | 30–60 min | Read the concept. Mental models, not equations. |
| **Interactive playground** | 15–20 min | Browser-based. Sliders, toggles, live graphs. No install. |
| **Notebook lab** | 45–60 min | Hands-on coding with StreamCart data. Fill TODOs, run cells. |
| **Debug drill** | 20–30 min | Find and fix the bug. Builds diagnostic intuition. |
| **Cheat sheet** | Reference | One-page summary. Use it anytime. |
| **Quiz** | 10–15 min | 8 scenario-based questions. Test your understanding. |

Do them in order. The playground gives you intuition before you code. The lab applies it. The debug drill teaches you what breaks and why.

---

## How to open notebooks + playgrounds

### Colab notebooks

1. **Click the link** to the notebook (from the module page).
2. **It opens in Colab** in your browser.
3. **Click "Copy to Drive"** (or "Open in Colab") so you have your own editable copy.
4. **Run cells top to bottom.** Shift+Enter to run a cell. Or **Runtime → Run all** to run everything.
5. Always run cells in order. If something breaks, try **Runtime → Restart and run all**.

### Playgrounds

Playgrounds are **standalone HTML files**. They open in any browser—Chrome, Firefox, Safari, Edge.

1. **Click the link** to the playground (e.g. `playground_linear_regression.html`).
2. **It opens in a new tab.** No Colab, no install. Just the page.
3. **Interact.** Move sliders. Toggle options. Watch the model respond in real time.
4. **Refresh** if something looks stuck.

Playgrounds are read-only. You're exploring, not editing. Use them before the notebook to build intuition.

---

## The StreamCart case company

You'll work with **StreamCart**—a fictional subscription e-commerce company—throughout the entire course.

Same company. Same datasets. Same business problems. LTV prediction, churn, support ticket similarity, fraud, recommendations. All modules use shared CSV data hosted on GitHub.

Why one company? Because you'll see the same data schema and business context again and again. You'll build a mental model of how ML fits into a real product.

---

## What to do if something breaks

| Problem | What to do |
|---------|------------|
| **"Runtime disconnected"** | Click "Reconnect." Colab disconnected after idle time. Re-run cells from the top if needed. |
| **"ModuleNotFoundError"** | Run the pip install cell first. Most notebooks have one at the top. |
| **"File not found"** | Run cells in order. Try Runtime → Restart and run all. |
| **Kernel crashed / "Your session crashed"** | Runtime → Restart and run all. If it keeps happening, reduce data size (some notebooks have an option for this). |
| **"CUDA not available"** | You don't need a GPU for this course. CPU is fine. Ignore the warning or set the notebook to CPU-only if it asks. |
| **"Out of memory"** | Restart runtime. If the notebook has a "reduce batch size" or "use sample" option, use it. Free Colab has limits. |

---

## Suggested pace

**3–4 modules per week** = done in about **8 weeks**.

| Phase | Modules | Time | Focus |
|-------|---------|------|-------|
| **Foundation** | 0–2 | 1 week | ML Map, problem framing, data leakage |
| **Core ML** | 3–11 | 3 weeks | Linear/logistic regression, trees, ensembles, optimization, metrics, features, regularization |
| **Representations + Deep Learning** | 12–17 | 2 weeks | Embeddings, clustering, retrieval, neural nets, CNNs, transformers |
| **Agentic AI** | 18–21 | 1 week | LLMs, tool calling, agent memory, guardrails |
| **Production** | 22–23 | 1 week | MLOps, monitoring, drift detection |

---

## Learning path visualization

Dependencies between modules (do them in this order):

```
Module 0 (Welcome)
    ↓
Modules 1–2 (ML Map, Data Leakage)
    ↓
Modules 3–6 (Supervised Learning: Linear, Logistic, Trees, Ensembles)
    ↓
Module 7 (Optimization) ←→ Modules 8–9 (Regression & Classification Metrics)
    ↓
Modules 10–11 (Feature Engineering, Regularization)
    ↓
Modules 12–14 (Embeddings, Clustering, Retrieval)
    ↓
Modules 15–17 (Neural Networks, CNNs, Transformers)
    ↓
Modules 18–21 (Agentic AI: LLMs, Tools, Memory, Guardrails)
    ↓
Modules 22–23 (MLOps, Monitoring)
    ↓
Capstone
```

**Why this order?** Optimization (Module 7) and evaluation (8–9) set you up for deep learning. Representations (12–14) bridge tabular ML to embeddings and retrieval. Agentic AI (18–21) builds on transformers. Production (22–23) assumes you've built something worth deploying.

---

## How to track progress

Each module has a checklist. Mark off:

- [ ] Read micro-lesson
- [ ] Explored playground
- [ ] Finished notebook lab
- [ ] Solved debug drill
- [ ] Reviewed cheat sheet
- [ ] Completed quiz

Don't skip the playground. It's where the "aha" moments happen before you write code.

---

## Ready?

Start with **Module 0** (Welcome) for the full course overview, then **Module 1** (The ML Map) to see the workflow and failure points.

→ [Course Overview](content/00-course-overview.md)  
→ [Curriculum Map](content/01-curriculum-map.md)
