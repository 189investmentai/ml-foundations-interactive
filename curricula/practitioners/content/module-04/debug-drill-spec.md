# Debug Drill Spec: Module 04 - The Expensive Threshold (Wrong Threshold)

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/debug_drills/drill_04_threshold_costs.ipynb` |
| Solution | `notebooks/answer_keys/solution_04_threshold_costs.ipynb` |
| Runtime | ~20 minutes |
| Bug Type | Wrong Metric / Suboptimal Threshold |

## Scenario

A colleague built a churn prediction model and deployed it with the default threshold of 0.5. "It works great!" they say. "We're catching churners!" But the CFO is unhappy: "Our retention campaign costs are through the roof!" The model uses FP_COST=$50 (wasted offer) and FN_COST=$200 (missed churner). The default 0.5 threshold ignores this cost structure and leads to suboptimal business outcomes.

## The Bug

```python
# Business costs
FP_COST = 50   # Cost of wasted retention offer (sent to non-churner)
FN_COST = 200  # Cost of lost customer (missed churner)

# Colleague uses DEFAULT threshold of 0.5
THRESHOLD = 0.5  # <-- BUG: Not optimized for cost structure!

predictions = (probabilities >= THRESHOLD).astype(int)
```

### Why It's Wrong

The default 0.5 threshold assumes equal cost of false positives and false negatives. Here, missing a churner (FN) costs 4× more than a wasted offer (FP). A 0.5 threshold typically favors precision over recall, meaning we miss many churners and incur high FN costs. The optimal threshold depends on the cost ratio—we should lower the threshold to catch more churners when FN is expensive.

### Technical Explanation

The optimal threshold minimizes expected cost: `Cost = FP × FP_COST + FN × FN_COST`. As threshold decreases, we predict more positives (higher recall, lower FN, higher FP). When FN_COST >> FP_COST, the cost-minimizing threshold is often well below 0.5. Sweeping thresholds and picking the one that minimizes total cost yields the business-optimal decision boundary.

## Investigation Steps

1. **Understand the cost structure** - FN_COST=200 vs FP_COST=50 means we should tolerate more FPs to reduce FNs
2. **Sweep thresholds** - Evaluate cost at thresholds from 0.05 to 0.95
3. **Find cost-minimizing threshold** - Use `results_df['cost'].idxmin()`
4. **Compare** - Show savings from using optimal vs 0.5

## The Fix

```python
# Sweep thresholds and find cost-minimizing one
thresholds = np.arange(0.05, 0.95, 0.05)
results = []

for thresh in thresholds:
    preds = (probabilities >= thresh).astype(int)
    cm = confusion_matrix(y_test, preds)
    tn, fp, fn, tp = cm.ravel()
    cost = fp * FP_COST + fn * FN_COST
    results.append({'threshold': thresh, 'cost': cost, ...})

results_df = pd.DataFrame(results)
optimal_idx = results_df['cost'].idxmin()
optimal_threshold = results_df.loc[optimal_idx, 'threshold']

# Use optimal threshold
predictions = (probabilities >= optimal_threshold).astype(int)
```

## Self-Checks

| Check | Assertion |
|-------|-----------|
| Optimal threshold differs from 0.5 | `optimal_threshold != 0.5` (typically lower) |
| Cost reduced | `cost_optimal < cost_at_05` |
| Recall increases at optimal | Higher recall when FN is expensive |

## Postmortem Template

### What happened:
- Churn model deployed with default threshold 0.5
- Retention campaign costs were high—we missed many churners (high FN)

### Root cause:
- Default 0.5 threshold ignores asymmetric business costs (FN >> FP)
- No threshold optimization for cost structure

### How to prevent:
- Define business costs (FP and FN) before deployment
- Sweep thresholds and minimize expected cost
- Report cost alongside precision/recall
- Revisit threshold when costs or class balance change

## Learning Objectives

After completing this drill, learners will be able to:
1. Recognize when default 0.5 threshold is suboptimal
2. Sweep thresholds to find cost-minimizing cutoff
3. Connect precision-recall tradeoff to business cost
4. Deploy models with business-aligned thresholds
