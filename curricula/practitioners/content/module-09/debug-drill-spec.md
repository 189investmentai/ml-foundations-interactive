# Debug Drill Spec: Module 09 - The Accuracy Trap

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/debug_drills/drill_09_accuracy_trap.ipynb` |
| Solution | `notebooks/answer_keys/solution_09_accuracy_trap.ipynb` |
| Runtime | ~20 minutes |
| Bug Type | Using accuracy on imbalanced data instead of cost-sensitive metrics |

## Scenario

A colleague built a fraud detection model. They're celebrating.

"99.5% accuracy!" they announce. "Best model I've ever built!"

But the fraud team is angry: "We're catching fewer fraudsters than before!"

**Your Task:**
1. Run the model and verify the high accuracy
2. Investigate why the fraud team is upset
3. Find the right metric and fix the threshold
4. Write a 3-bullet postmortem

## The Bug

```python
# Using default threshold of 0.5
y_pred = model.predict(X_test)  # <-- BUG: Default threshold for imbalanced data!

accuracy = accuracy_score(y_test, y_pred)

print("🎉 Accuracy: {accuracy:.1%}")
print("✅ Deploying to production...")
```

### Why It's Wrong

With only 0.5% fraud rate, predicting "no fraud" for everyone gets 99.5% accuracy. The model has learned something (AUC > 0.5), but the default 0.5 threshold is inappropriate when:
- Missing fraud (FN) costs $1000 (chargebacks + reputation)
- False alarm (FP) costs $10 (manual review)

The optimal threshold is approximately FP_cost / (FP_cost + FN_cost) = 10/1010 ≈ 0.01. Using 0.5 means we miss almost all fraudsters—high accuracy but useless recall.

## Investigation Steps

1. **Compare to naive baseline** - Predict "no fraud" for everyone; see it gets ~99.5% accuracy
2. **Inspect confusion matrix** - TN, FP, FN, TP; show we're catching very few fraudsters (low recall)
3. **Check the right metrics** - Precision, recall, F1, ROC-AUC; model has learned (AUC > 0.5) but threshold is wrong
4. **Compute theoretical optimal** - COST_FP / (COST_FP + COST_FN) ≈ 0.01
5. **Sweep thresholds** - Find cost-minimizing threshold
6. **Compare original vs optimized** - Show recall improvement and cost savings

## The Fix

```python
# Business costs
COST_FN = 1000  # Missing fraud
COST_FP = 10    # False alarm

# Sweep thresholds
thresholds = np.arange(0.001, 0.5, 0.005)
results = []

for thresh in thresholds:
    preds = (y_prob >= thresh).astype(int)
    cm_t = confusion_matrix(y_test, preds)
    tn_t, fp_t, fn_t, tp_t = cm_t.ravel()
    
    cost = fn_t * COST_FN + fp_t * COST_FP
    recall = recall_score(y_test, preds)
    precision = precision_score(y_test, preds, zero_division=0)
    
    results.append({
        'threshold': thresh, 'cost': cost,
        'recall': recall, 'precision': precision,
        'fn': fn_t, 'fp': fp_t
    })

results_df = pd.DataFrame(results)
optimal_idx = results_df['cost'].idxmin()
optimal_threshold = results_df.loc[optimal_idx, 'threshold']

# Use optimal threshold
y_pred_fixed = (y_prob >= optimal_threshold).astype(int)
```

## Self-Checks

| Check | Assertion |
|-------|-----------|
| Optimal threshold below 0.5 | `optimal_threshold < 0.5` |
| Recall improves | `recall_score(y_test, y_pred_fixed) > recall_score(y_test, y_pred)` |
| Cost reduced | `optimal_cost < original_cost` |

## Postmortem Template

### What happened:
- Model had 99.5% accuracy but caught very few actual fraudsters, leading to increased fraud losses.

### Root cause:
- With only 0.5% fraud rate, predicting "no fraud" for everyone gets 99.5% accuracy. The default 0.5 threshold is inappropriate when FN costs (missed fraud: $1000) vastly exceed FP costs (false alarm: $10).

### How to prevent:
- Never use accuracy alone on imbalanced data. Use recall (to catch fraud) and precision (to avoid wasted reviews).
- Set threshold based on business costs: optimal ≈ FP_cost / (FP_cost + FN_cost) = 0.01.
- Report PR-AUC instead of ROC-AUC for highly imbalanced problems.

## Learning Objectives

After completing this drill, learners will be able to:
1. Recognize why accuracy is misleading on imbalanced data (the accuracy trap)
2. Use recall and precision instead of accuracy for rare-event classification
3. Find cost-optimal threshold given business costs (FN vs FP)
4. Sweep thresholds to minimize total expected cost
5. Write a postmortem that explains the bug and prevention steps
