# Classification Metrics Cheatsheet

## The Confusion Matrix

|  | Pred + | Pred - |
|--|--------|--------|
| **Actual +** | TP ✅ | FN 😱 |
| **Actual -** | FP 🙄 | TN ✅ |

---

## Core Metrics

| Metric | Formula | Plain English |
|--------|---------|---------------|
| **Precision** | TP/(TP+FP) | "Of my alerts, how many real?" |
| **Recall** | TP/(TP+FN) | "Of all positives, how many caught?" |
| **F1** | 2PR/(P+R) | Harmonic mean of P and R |
| **Accuracy** | (TP+TN)/All | Overall correct rate ⚠️ |

---

## When to Use What

| Situation | Primary Metric |
|-----------|----------------|
| Balanced classes | Accuracy, F1 |
| Imbalanced (care about minority) | PR-AUC, Recall |
| False positives costly | Precision |
| False negatives costly | Recall |
| Overall ranking ability | ROC-AUC |

---

## The Threshold Lever

```
Lower threshold → More positives → ↑Recall ↓Precision
Higher threshold → Fewer positives → ↓Recall ↑Precision
```

**Optimal threshold by cost:**
```
threshold = Cost(FP) / (Cost(FP) + Cost(FN))
```

---

## AUC Interpretation

| AUC | Quality |
|-----|---------|
| 0.5 | Random |
| 0.6-0.7 | Poor |
| 0.7-0.8 | OK |
| 0.8-0.9 | Good |
| 0.9+ | Excellent |

---

## ROC vs PR Curves

**ROC:** Plots TPR vs FPR
- Good for balanced data
- AUC = ranking ability

**PR:** Plots Precision vs Recall
- Better for imbalanced data
- More sensitive to improvements

---

## Common Traps

| Trap | Fix |
|------|-----|
| High accuracy, 0% minority recall | Use F1 or recall |
| Optimizing F1 when business cares about precision | Define business cost |
| Using default 0.5 threshold | Optimize for your use case |
| High AUC but bad at any threshold | Check precision@K |

---

## Business Translation

**Precision:** "Of 100 flagged customers, 85 actually churn"

**Recall:** "We catch 90% of all churners"

**AUC:** "Model ranks a churner above a non-churner 85% of the time"

**Threshold tradeoff:** "Catch more churners = more false alarms"

---

## Code Snippets

```python
from sklearn.metrics import (
    precision_score, recall_score, f1_score,
    roc_auc_score, average_precision_score,
    confusion_matrix, classification_report
)

# At threshold 0.5
y_pred = (y_prob >= 0.5).astype(int)

precision = precision_score(y_true, y_pred)
recall = recall_score(y_true, y_pred)
f1 = f1_score(y_true, y_pred)

# Threshold-independent
roc_auc = roc_auc_score(y_true, y_prob)
pr_auc = average_precision_score(y_true, y_prob)

# Full report
print(classification_report(y_true, y_pred))
```
