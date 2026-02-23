# Module 0: Welcome - How to Get the Most from This Course

**Time:** 10-15 minutes

---

## What This Course Is

This is a **concept-deep, math-light** ML course designed for practitioners who want to:

- Build ML intuition that transfers across models and domains
- Debug models confidently when things go wrong
- Communicate ML results to business stakeholders
- Create production-ready, reliable ML systems

You won't memorize formulas. You'll build mental models that stick.

---

## What Makes This Different

### 1. Interactive Playgrounds (Not Just Reading)

Every module includes an HTML playground where you **manipulate parameters and see results live**. This is where real learning happens:

- Drag sliders to change model parameters
- Watch metrics update in real-time
- Try preset scenarios that teach specific lessons
- Build intuition through experimentation

### 2. One Consistent Dataset (StreamCart)

We use a single fictional e-commerce company throughout:
- **StreamCart:** Subscription streaming + marketplace
- Problems: Churn prediction, offer optimization, support triage, recommendations
- Dataset: Customers, orders, support tickets, product catalog

Every concept connects to this shared context. No context-switching.

### 3. Debugging-First Mindset

Each module includes a **Debug Drill** — a broken notebook where you must:
1. Identify the bug from symptoms
2. Diagnose the root cause
3. Fix it
4. Write a postmortem

Real ML work is mostly debugging. We practice it explicitly.

### 4. Business Translation Built-In

Every concept includes scripts for explaining it to non-technical stakeholders:
- "How do I explain precision/recall to the VP of Marketing?"
- "What's the one-sentence summary for the exec team?"

---

## How to Work Through Each Module

### Recommended Flow (60-90 minutes per module)

1. **Micro-lesson** (15-20 min)
   - Read the written lesson
   - Note the mental models and failure modes

2. **Interactive Playground** (15-20 min)
   - Open the HTML file locally
   - Try all presets
   - Experiment with parameters
   - Make sure you understand WHY things change

3. **Notebook Lab** (25-35 min)
   - Run the notebook end-to-end
   - Complete all TODO sections
   - Write the stakeholder summary

4. **Quiz** (5-10 min)
   - Test your understanding
   - Review explanations for wrong answers

5. **Debug Drill** (15-20 min)
   - Find and fix the bug
   - Write the postmortem

---

## Prerequisites

- **Python:** Comfortable with functions, loops, pandas basics
- **Statistics:** Mean, variance, correlation (intuitive level)
- **ML:** No prior ML knowledge required
- **Tools:** Google Colab or local Python environment

---

## Course Map

| Section | Modules | Focus |
|---------|---------|-------|
| Foundation | 0-2 | ML map, problem framing, data leakage |
| Supervised Learning | 3-6 | Regression, classification, trees, ensembles |
| Optimization & Evaluation | 7-11 | Gradient descent, metrics, features, regularization |
| Representations | 12-14 | Embeddings, clustering, retrieval |
| Deep Learning | 15-16 | Neural networks, transformers |
| Agentic AI | 17-20 | Prompting, tool calling, agents, guardrails |
| Production | 21-22 | MLOps, monitoring, drift detection |
| Capstone | Project | End-to-end system |

---

## Setting Up Your Environment

### Option 1: Google Colab (Recommended)

1. Open any notebook in Colab
2. Data files are loaded from the `shared/data/` folder
3. No local setup needed

### Option 2: Local Environment

```bash
# Clone or download the course materials
cd curricula/practitioners

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install pandas numpy scikit-learn matplotlib xgboost lightgbm
```

### For Interactive Playgrounds

Just open the `.html` files in any modern browser. No server needed.

---

## Learning Tips

### Do This

- **Experiment in playgrounds** before reading explanations
- **Predict** what will happen before running code
- **Write** the stakeholder summaries (don't skip them)
- **Do** the debug drills (this is where retention happens)

### Don't Do This

- Rush through to "finish" modules
- Skip the playground and just read
- Copy-paste quiz answers without understanding
- Ignore the "explain it" exercises

---

## Ready?

Start with **Module 1: The ML Map** to see how all the pieces fit together.

Let's build some intuition.
