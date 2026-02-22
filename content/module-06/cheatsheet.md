# Module 6 Cheat Sheet: Model Evaluation

---

## The Core Metrics

| Metric | Formula | Use When |
|--------|---------|----------|
| **Precision** | TP / (TP + FP) | False positives are costly |
| **Recall** | TP / (TP + FN) | Missing positives is costly |
| **F1** | 2 × P × R / (P + R) | Need balance |
| **Precision@K** | Correct in top K / K | Limited capacity |
| **AUC** | Ranking quality | Comparing models |

---

## Quick Formulas

```python
# Precision@K
top_k = y_test.iloc[np.argsort(probs)[-k:]]
precision_k = top_k.mean()

# Recall@K
recall_k = top_k.sum() / y_test.sum()

# Lift
lift = precision_k / y_test.mean()
```

---

## Always Compare to Baselines

| Baseline | What it is |
|----------|------------|
| **Random** | Base rate (y.mean()) |
| **Heuristic** | Simple rule ("support_tickets > 0") |
| **Current model** | What's in production now |

**Report lift:**
```
Precision@500: 38%
Random: 12%
Lift: 3.2x
```

---

## Choosing the Right Metric

```
Limited capacity (can act on K)
  └── Precision@K

Automated yes/no decision
  └── Precision + Recall at threshold

Using probabilities directly  
  └── Check calibration first

Just comparing models
  └── AUC (but know its limits)
```

---

## Business Value Formula

```python
# Basic ROI calculation
churners_reached = capacity * precision_at_k
customers_saved = churners_reached * save_rate
value_created = customers_saved * ltv - capacity * cost_per_action

# vs random
random_value = capacity * base_rate * save_rate * ltv - capacity * cost_per_action
model_lift_dollars = value_created - random_value
```

---

## Calibration Check

```python
from sklearn.calibration import calibration_curve, CalibratedClassifierCV

# Check
prob_true, prob_pred = calibration_curve(y_test, probs, n_bins=10)

# Fix if needed
cal_model = CalibratedClassifierCV(model, method='isotonic')
cal_model.fit(X_train, y_train)
```

---

## Threshold Selection

Don't use 0.5 by default!

```python
# Option 1: Business-driven
# "We can handle 500 customers" → take top 500

# Option 2: Precision-driven  
# "Need 80% precision minimum"
for thresh in np.arange(0.1, 0.9, 0.05):
    preds = probs >= thresh
    if precision(preds, y_test) >= 0.80:
        break

# Option 3: F1-optimal
from sklearn.metrics import precision_recall_curve
precisions, recalls, thresholds = precision_recall_curve(y_test, probs)
f1s = 2 * precisions * recalls / (precisions + recalls + 1e-10)
best_thresh = thresholds[np.argmax(f1s[:-1])]
```

---

## AUC Reference

| AUC | Meaning |
|-----|---------|
| 0.50 | Random guessing |
| 0.60-0.70 | Weak model |
| 0.70-0.80 | Decent model |
| 0.80-0.90 | Good model |
| 0.90+ | Excellent or suspicious |
