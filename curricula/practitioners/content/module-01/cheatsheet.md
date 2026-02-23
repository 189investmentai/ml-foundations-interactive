# The ML Map Cheatsheet

## The Pipeline

```
Problem → Data → Features → Split → Train → Evaluate → Deploy
```

**Most bugs live at the boundaries, not in the model.**

---

## Stage-by-Stage Quick Reference

| Stage | Key Question | Common Bug |
|-------|--------------|------------|
| **Problem** | What exactly am I predicting? | Vague target definition |
| **Data** | Is this available at prediction time? | Future data leakage |
| **Features** | Computed with only past data? | Leaky aggregations |
| **Split** | Does test simulate the future? | Random split on time data |
| **Train** | Am I beating a baseline? | No baseline comparison |
| **Evaluate** | Does metric match business value? | Wrong metric (e.g., accuracy on imbalanced) |
| **Deploy** | How will I know it's failing? | No monitoring |

---

## Self-Check Questions

| Stage | Ask Yourself |
|-------|--------------|
| Problem | "If this model were perfect, what decision would I make differently?" |
| Data | "For each feature, would I have this value BEFORE making the prediction?" |
| Features | "Is this feature computed using ONLY data available at prediction time?" |
| Split | "Does my test set simulate true future data the model won't see?" |
| Train | "What's my baseline? How much better is the model?" |
| Evaluate | "Does this metric translate to business value?" |
| Deploy | "How will I know if this model is failing in production?" |

---

## Where 90% of Bugs Live

1. **Wrong problem definition** — target unclear or misaligned with business
2. **Data leakage** — using future information
3. **Wrong metric** — optimizing for the wrong thing
4. **Poor evaluation** — no baseline, no slices, overfitting to test

---

## Red Flags by Stage

| Red Flag | Likely Stage | What to Check |
|----------|--------------|---------------|
| 99%+ accuracy on hard problem | Data/Features | Leakage |
| Train great, test terrible | Train/Split | Overfitting, leaky split |
| Model better than business heuristics | Problem | Target definition |
| Production much worse than test | Data/Deploy | Distribution shift, drift |
| One feature dominates importance | Features | Feature IS the target |

---

## Universal Debugging Flow

```
1. Check the problem definition → Is the target right?
2. Check for leakage → Any future data in features?
3. Check the split → Time-based if temporal?
4. Check baseline → Beating heuristics?
5. Check the metric → Matches business value?
6. Check slices → Any hidden failures?
7. THEN look at the model
```

---

## Key Insight

> The model is usually not the problem. Debug the pipeline first.

---

## Common Fixes

| Problem | Fix |
|---------|-----|
| Vague target | Write down exact definition + timing |
| Data leakage | Audit every feature for future info |
| Wrong split | Use time-based split for temporal data |
| No baseline | Start with mean prediction + simple heuristic |
| Wrong metric | Map business cost to precision/recall tradeoff |
| No monitoring | Set up drift detection + feedback loops |
