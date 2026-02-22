# Cheat Sheet: Model Evaluation

## The Big Picture

**AUC alone is not enough.** You need business-aligned metrics.

## Metric Selection Guide

| Constraint | Metric | Example |
|---|---|---|
| Limited capacity | Precision@K | "We can only call 500 people" |
| Can't miss positives | Recall | "Must catch fraud" |
| Known costs | Net Value | "$15/call, $200 value if saved" |
| Probability accuracy | Calibration | "Is 70% really 70%?" |

## Precision vs Recall

```
Precision = TP / (TP + FP)  → "Of those I flagged, how many were right?"
Recall    = TP / (TP + FN)  → "Of all positives, how many did I find?"
```

**The Tradeoff:**
- Higher threshold → Higher precision, lower recall
- Lower threshold → Lower precision, higher recall

## Precision@K (Capacity-Constrained)

```python
def precision_at_k(y_true, y_prob, k):
    # Sort by probability, take top K
    top_k_idx = np.argsort(y_prob)[-k:]
    return y_true.iloc[top_k_idx].mean()

# Example: Top 500 customers
prec_500 = precision_at_k(y_test, probs, k=500)
print(f"Precision@500: {prec_500:.1%}")
```

## Cost-Based Evaluation

```python
COST_PER_CALL = 15
VALUE_IF_SAVED = 200
SUCCESS_RATE = 0.30  # 30% of called churners are saved

def net_value(y_true, y_pred):
    tp = ((y_pred == 1) & (y_true == 1)).sum()
    fp = ((y_pred == 1) & (y_true == 0)).sum()
    
    calls = tp + fp
    saves = tp * SUCCESS_RATE
    
    cost = calls * COST_PER_CALL
    value = saves * VALUE_IF_SAVED
    return value - cost
```

## Threshold Selection

```python
thresholds = np.arange(0.1, 0.9, 0.05)

for t in thresholds:
    preds = (probs >= t).astype(int)
    prec = precision_score(y_test, preds)
    rec = recall_score(y_test, preds)
    n_flagged = preds.sum()
    print(f"t={t:.2f}: Prec={prec:.2%}, Rec={rec:.2%}, N={n_flagged}")
```

## Calibration Check

"When my model says 70% probability, does it happen 70% of the time?"

```python
from sklearn.calibration import calibration_curve

prob_true, prob_pred = calibration_curve(y_test, probs, n_bins=10)

# Perfect calibration: points on diagonal
plt.plot([0, 1], [0, 1], 'k--', label='Perfect')
plt.plot(prob_pred, prob_true, 'bo-', label='Model')
plt.xlabel('Mean predicted probability')
plt.ylabel('Fraction of positives')
```

## Always Include Baselines

| Baseline | What it is |
|---|---|
| Random | Predict base rate for everyone |
| Heuristic | Simple rule ("tenure < 3 months") |
| Previous model | Last version in production |

```python
# Random baseline
random_auc = 0.50

# Heuristic baseline
heuristic_preds = (df['tenure_months'] < 3).astype(int)
heuristic_auc = roc_auc_score(y_test, heuristic_preds)

print(f"Random: {random_auc:.3f}")
print(f"Heuristic: {heuristic_auc:.3f}")
print(f"Model: {model_auc:.3f}")
```

## Quick Decision Framework

```
IF capacity-limited (can only act on K items):
    → Optimize Precision@K
    
ELIF missing positives is costly (fraud, safety):
    → Optimize Recall, accept low precision
    
ELIF costs are known ($X per action, $Y per miss):
    → Optimize Expected Net Value
    
ELSE:
    → Use AUC for model comparison, then pick threshold
```
