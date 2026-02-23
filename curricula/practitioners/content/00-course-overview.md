# ML for Practitioners: Course Overview

## The Real Problem

You've shipped ML models to production. Some worked. Some didn't. And when they failed, you weren't sure why.

Was it the data? The features? The evaluation? Something else?

**This uncertainty is expensive.** It leads to wasted sprints, missed deadlines, and the creeping fear that you're building on shaky foundations.

This course exists because most ML problems aren't algorithm problems — they're pipeline problems. And debugging a pipeline requires understanding how the pieces fit together, where the boundaries leak, and what "good" actually looks like at each stage.

**You'll learn to build ML systems you can trust — and debug the ones you can't.**

---

## The Promise

After completing this course, you will:
- Understand how ML models actually work (not just how to call `.fit()`)
- Know when models fail and how to diagnose problems
- Communicate ML results to stakeholders in plain language
- Build and evaluate agentic AI systems with confidence
- Have portfolio-ready artifacts including interactive dashboards

## Who This Is For

**You're a good fit if you:**
- Are comfortable with Python basics and pandas
- Want to understand ML deeply without drowning in math
- Need to debug models, not just build them
- Work with or will work with ML systems in production
- Want to explain ML to non-technical stakeholders

**This is NOT for you if you:**
- Want to derive algorithms from scratch
- Need a PhD-level mathematical treatment
- Are looking for a quick API tutorial

## The StreamCart Case Study

Every module uses data from **StreamCart**, a fictional subscription e-commerce company. You'll work with:

| Dataset | Rows | Use Case |
|---------|------|----------|
| `streamcart_customers.csv` | 5,000 | Churn prediction, LTV regression |
| `streamcart_events.csv` | 45,000 | Feature engineering, time series |
| `streamcart_products.csv` | 200 | Recommendations, embeddings |
| `streamcart_tickets.csv` | 1,000 | Text classification, semantic search |

## The Interactive Playground Difference

Unlike video courses where you passively watch, this course puts you in the driver's seat.

Every module includes an **HTML playground** where you:
- Adjust sliders and watch metrics change in real-time
- Toggle settings to see how assumptions affect predictions
- Load challenge presets that demonstrate failure modes
- Build intuition through experimentation

**No installation required.** Open the HTML file in any browser.

## Learning Path

### Foundation (Modules 0-2)
Build your mental map of ML and understand how things break.

### Core Supervised Learning (Modules 3-6)
Master regression, classification, trees, and ensembles.

### Optimization & Evaluation (Modules 7-11)
Learn how models learn and how to evaluate and tune them systematically.

### Representations (Modules 12-14)
Understand embeddings, retrieval, and modern ML beyond tabular data.

### Deep Learning (Modules 15-16)
Build intuition for neural networks and transformers.

### Agentic AI (Modules 17-20)
Build and evaluate tool-using agents with guardrails.

### Production (Modules 21-22)
Ship ML systems with MLOps, monitoring, and drift detection.

### Capstone
Combine everything into a portfolio project.

## Why This Order?

The modules build on each other deliberately:

1. **Foundation first (0-2):** You can't debug what you don't understand. The pipeline map and leakage concepts inform everything else.

2. **Classic ML before deep learning (3-11):** Linear models teach you coefficients, trees teach you feature importance, ensembles teach you tradeoffs. These intuitions transfer to neural networks.

3. **Evaluation before deployment (7-11):** Knowing *how* to measure lets you know *what* to optimize. Many production failures trace back to wrong metrics chosen early.

4. **Representations before generation (12-16):** Embeddings and retrieval are the backbone of modern AI systems. Understanding similarity search makes RAG and agents click.

5. **Agents after fundamentals (17-20):** Tool calling and guardrails make sense once you understand how models fail and how to evaluate them.

6. **Production last (21-22):** MLOps patterns depend on understanding what you're monitoring and why.

**Skip at your own risk:** Later modules assume you've internalized earlier concepts.

## The Capstone Preview

You'll build a **StreamCart AI Assistant** — an end-to-end ML system that:

| Component | What You'll Build | Modules Used |
|-----------|-------------------|--------------|
| **Churn Prediction** | Model that identifies at-risk customers | 3-6, 8-11 |
| **Knowledge Base** | Semantic search over support articles | 12-14 |
| **Response Generation** | RAG pipeline with LLM | 15-17 |
| **Guardrails** | Safety checks and human review triggers | 18-20 |

The result: A portfolio-ready project demonstrating supervised learning, embeddings, retrieval, LLM integration, and production safety — all working together.

**Estimated time:** 8-12 hours across multiple sessions.

## Time Commitment

- **Per module:** 1-2 hours (lesson + playground + lab)
- **Full course:** 40-50 hours
- **Recommended pace:** 2-3 modules per week

## How to Succeed

1. **Use the playgrounds first** - Build intuition before reading theory
2. **Do the debug drills** - Finding bugs teaches more than building from scratch
3. **Write the "Explain It" sections** - If you can't explain it simply, you don't understand it
4. **Complete the quizzes honestly** - Wrong answers reveal gaps
5. **Build the capstone** - Synthesis cements learning
