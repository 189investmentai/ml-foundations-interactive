# Module 1: The ML Map - Where Things Break

**Duration:** 25-35 minutes | **Difficulty:** Beginner

---

## 📖 Overview

After this module, you'll see the entire ML pipeline and understand where most bugs occur. Learn the map before diving into algorithms.

---

## 🎯 Learning Objectives

- [ ] Understand the 7 stages of the ML pipeline
- [ ] Know where most ML bugs actually occur (hint: not in the model)
- [ ] Apply the universal debugging flow to diagnose problems
- [ ] Use self-check questions at each pipeline stage

---

## 📚 Lesson Content

> **Key Insight:** 90% of ML bugs are not about models. They're about wrong problem definition, data leakage, wrong metrics, and poor evaluation.

### The ML Pipeline

```
Problem → Data → Features → Split → Train → Evaluate → Deploy
```

**Most bugs live at the boundaries.** Not in the model.

### The 7 Stages

| Stage | What You Decide | Self-Check Question |
|-------|-----------------|---------------------|
| **1. Problem** | Target variable, timing, costs | "If this model were perfect, what decision would I make differently?" |
| **2. Data** | Features, labels, sample size | "For each feature, would I have this value BEFORE making the prediction?" |
| **3. Features** | Encodings, aggregations | "Is this feature computed using ONLY data available at prediction time?" |
| **4. Split** | Train/val/test strategy | "Does my test set simulate true future data?" |
| **5. Train** | Algorithm, hyperparameters | "What's my baseline? How much better is the model?" |
| **6. Evaluate** | Metrics, slices | "Does this metric translate to business value?" |
| **7. Deploy** | Threshold, monitoring | "How will I know if this model is failing in production?" |

---

## 🎮 Interactive Playground

Explore the ML pipeline visually. Click each stage to understand what happens there, then try the failure scenarios.

**→ [Open ML Pipeline Playground](https://htmlpreview.github.io/?https://github.com/189investmentai/ml-foundations-interactive/blob/main/curricula/practitioners/playgrounds/playground_ml_pipeline.html)**

### Playground Exercises

1. Click each stage to understand what happens there
2. Try the "Data Leakage" scenario — see which stages turn red
3. Try "Wrong Metric" — notice the problem is upstream
4. Try "Overfitting" — it's a training stage problem

---

## 💻 Hands-On Lab

This module focuses on concepts. The main notebook is Module 3 (Linear Regression) where you'll apply these principles.

---

## 🔧 Debug Drill

A colleague's model gets 97% AUC — suspiciously high. Find where in the pipeline the bug lives.

**→ [Open Debug Drill in Colab](https://colab.research.google.com/github/189investmentai/ml-foundations-interactive/blob/main/curricula/practitioners/notebooks/debug_drills/drill_01_pipeline_leakage.ipynb)**

### What You'll Practice
- Identifying data leakage symptoms
- Tracing bugs upstream in the pipeline
- Writing a postmortem

---

## ✅ Knowledge Check Quiz

Test your understanding with 8 scenario-based questions.

**→ [Take the Quiz](#)** *(Google Form link - to be added)*

---

## 📋 Cheatsheet

**→ [Download Cheatsheet (PDF)](#)** *(link to be added)*

### Quick Reference: The Universal Debugging Flow

1. ✓ Check the problem definition — Is the target right?
2. ✓ Check for leakage — Any future data in features?
3. ✓ Check the split — Time-based if temporal?
4. ✓ Check baseline — Beating heuristics?
5. ✓ Check the metric — Matches business value?
6. ✓ Check slices — Any hidden failures?
7. Then look at the model

---

## ✅ Completion Checklist

- [ ] Read the micro-lesson above
- [ ] Explored the ML Pipeline playground
- [ ] Tried all failure scenarios in playground
- [ ] Completed the debug drill notebook
- [ ] Passed the quiz (≥70%)

---

## ⏭️ Next Steps

Continue to **Module 2: Data Leakage** to dive deep into the most common ML bug.

---

## 📎 Resources

| Resource | Link |
|----------|------|
| Full Micro-Lesson | [GitHub](https://github.com/189investmentai/ml-foundations-interactive/blob/main/curricula/practitioners/content/module-01/micro-lesson.md) |
| Playground (HTML) | [View](https://htmlpreview.github.io/?https://github.com/189investmentai/ml-foundations-interactive/blob/main/curricula/practitioners/playgrounds/playground_ml_pipeline.html) |
| Debug Drill | [Colab](https://colab.research.google.com/github/189investmentai/ml-foundations-interactive/blob/main/curricula/practitioners/notebooks/debug_drills/drill_01_pipeline_leakage.ipynb) |
| Solution Key | [Colab](https://colab.research.google.com/github/189investmentai/ml-foundations-interactive/blob/main/curricula/practitioners/notebooks/answer_keys/solution_01_pipeline_leakage.ipynb) |
