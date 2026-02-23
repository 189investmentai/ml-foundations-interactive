# Cheat Sheet: Experiments, Uplift, and Production

---

## Impact Measurement

| Question | Answer |
|----------|--------|
| **How do I prove my model works?** | A/B test with random holdout |
| **What should I measure?** | Business outcome (churn rate), not model metric (AUC) |
| **How big a holdout?** | 10-20% minimum for statistical power |
| **How long to run?** | Until outcome manifests (e.g., 30-day churn needs 4+ weeks) |

### Experiment Design Checklist

```
□ Hypothesis written down
□ Primary metric defined (business outcome)
□ Randomization unit chosen (customer, not session)
□ Treatment/Control split defined
□ Duration and sample size calculated
□ Guardrails identified (contamination, quality)
```

---

## Risk vs. Uplift

**Risk model:** Who is likely to churn?
**Uplift model:** Who will churn *unless* we intervene?

### The Four Quadrants

```
                    Would Churn Without Action?
                         YES         NO
    Responds to      ┌──────────┬──────────┐
    Intervention?    │ PERSUADE │  WASTED  │  ← Only top-left
         YES         │  (value) │  EFFORT  │    creates value
                     ├──────────┼──────────┤
         NO          │   LOST   │ SLEEPING │
                     │  CAUSE   │   DOGS   │
                     └──────────┴──────────┘
```

### Decision Tree

```
Do I have randomized historical data (Treatment + Control)?
├── YES → Consider uplift modeling
└── NO → Use hybrid heuristic:
         Score = Risk × Engagement
         (filters out lost causes)
```

---

## Production Monitoring

### What to Track (Weekly)

| Layer | Metric | Red Flag |
|-------|--------|----------|
| **Data** | Freshness | >24h since update |
| **Data** | Nulls | Rate doubled |
| **Data** | Distribution | Feature mean shifted >2σ |
| **Model** | Score spread | 80%+ in one bin |
| **Model** | Calibration | Slope <0.8 or >1.2 |
| **Business** | Precision@K | Dropped >10% vs. baseline |

### When to Retrain

```
Scheduled: Monthly (safe default)
Triggered: When monitoring flags drift
Emergency: Precision drops >15%
```

---

## Quick Templates

### Template: Experiment Plan

```
Hypothesis: If we [action], [metric] will [change] by [X].
Metric: _______________
Population: _______________
Split: ___% Treatment / ___% Control
Duration: ___ weeks
Guardrails: _______________
```

### Template: Targeting Policy

```
Capacity: K = ___ actions/week
Cost/action: $___
Value/save: $___
Save rate: ___%

Break-even P = Cost / (SaveRate × Value) = ___%

Rule: Top K by model score where P > break-even
```

### Template: Monitoring Plan

```
Daily: □ Pipeline ran  □ No nulls  □ Schema OK
Weekly: □ Distributions stable  □ Precision@K > ___
Retrain if: □ Drift on >3 features  □ Precision drops >15%
Owner: _______________
```

---

## One-Liner Reminders

- **Offline metrics prove ranking, not impact.** Run an experiment.
- **High risk ≠ high value.** Some churners can't be saved.
- **Models decay.** Monitor weekly, retrain monthly.
- **Always keep a holdout.** Your only source of ground truth.
