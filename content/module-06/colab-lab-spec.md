# Module 6: Colab Lab Spec

**Lab Title:** From AUC to Dollars  
**Time:** ~20 minutes  
**Goal:** Calculate business-relevant metrics and translate to value

---

## Lab Structure

### Cell 1: Setup

```python
import numpy as np
import pandas as pd
from sklearn.metrics import roc_auc_score, precision_recall_curve
from sklearn.calibration import calibration_curve
import matplotlib.pyplot as plt

# Load pre-trained model predictions
df = load_streamcart_predictions()  # Has: user_id, y_true, y_prob
y_true = df['y_true']
y_prob = df['y_prob']

print(f"Samples: {len(df)}")
print(f"Churn rate: {y_true.mean():.1%}")
print(f"AUC: {roc_auc_score(y_true, y_prob):.3f}")
```

---

### Cell 2: TODO - Calculate Precision@K

```python
# TODO: Calculate precision@K for K = 100, 250, 500, 1000

def precision_at_k(y_true, y_prob, k):
    """Calculate precision for top K predictions."""
    # Hint: np.argsort gives indices from low to high
    # You want the LAST k indices (highest probabilities)
    pass

# k_values = [100, 250, 500, 1000]
# for k in k_values:
#     p_at_k = precision_at_k(y_true, y_prob, k)
#     print(f"Precision@{k}: {p_at_k:.1%}")
```

---

### Cell 3: Calculate Baselines

```python
# Baseline 1: Random
random_precision = y_true.mean()
print(f"Random baseline: {random_precision:.1%}")

# Baseline 2: Simple heuristic (assume we have support_tickets)
heuristic_precision = y_true[df['support_tickets'] > 0].mean()
print(f"Heuristic (tickets > 0): {heuristic_precision:.1%}")
```

---

### Cell 4: TODO - Calculate Lift

```python
# TODO: Calculate lift over random for each K

# for k in [100, 250, 500, 1000]:
#     model_precision = precision_at_k(y_true, y_prob, k)
#     lift = model_precision / random_precision
#     print(f"Lift@{k}: {lift:.1f}x")
```

---

### Cell 5: Precision-Recall Curve

```python
# Plot precision vs recall at different thresholds
precisions, recalls, thresholds = precision_recall_curve(y_true, y_prob)

plt.figure(figsize=(10, 5))
plt.plot(recalls, precisions)
plt.xlabel('Recall')
plt.ylabel('Precision')
plt.title('Precision-Recall Curve')
plt.axhline(y=random_precision, color='r', linestyle='--', label='Random')
plt.legend()
plt.show()
```

---

### Cell 6: TODO - Calibration Check

```python
# TODO: Plot calibration curve
# Are the predicted probabilities honest?

# prob_true, prob_pred = calibration_curve(y_true, y_prob, n_bins=10)

# plt.figure(figsize=(8, 8))
# plt.plot([0, 1], [0, 1], 'k--', label='Perfect calibration')
# plt.plot(prob_pred, prob_true, 'o-', label='Model')
# plt.xlabel('Predicted probability')
# plt.ylabel('Actual probability')
# plt.legend()
# plt.show()
```

---

### Cell 7: TODO - Business Value Calculation

```python
# Business parameters
CAPACITY = 500          # Can contact 500 customers/week
SAVE_RATE = 0.25        # 25% of contacted churners are saved
CUSTOMER_LTV = 600      # Saved customer worth $600
COST_PER_CONTACT = 20   # $20 per contact

# TODO: Calculate weekly value with model vs random

# With model
# model_churners_reached = ???
# model_saved = ???
# model_revenue = ???
# model_cost = ???
# model_net = ???

# With random
# random_churners_reached = ???
# random_saved = ???
# random_revenue = ???
# random_cost = ???
# random_net = ???

# print(f"Model net value: ${model_net:,.0f}")
# print(f"Random net value: ${random_net:,.0f}")
# print(f"Model adds: ${model_net - random_net:,.0f}/week")
```

---

### Cell 8: Find Optimal Threshold

```python
# What threshold gives best F1?
f1_scores = 2 * precisions * recalls / (precisions + recalls + 1e-10)
best_idx = np.argmax(f1_scores[:-1])
best_threshold = thresholds[best_idx]
best_f1 = f1_scores[best_idx]

print(f"Best threshold: {best_threshold:.2f}")
print(f"Best F1: {best_f1:.3f}")
print(f"At this threshold: Precision={precisions[best_idx]:.1%}, Recall={recalls[best_idx]:.1%}")
```

---

### Cell 9: Reflection

```python
# Answer:
# 1. How much lift does the model provide at your target K?
# 2. Is the model well-calibrated?
# 3. What's the dollar value per week?
```

---

## Expected Outputs

- Precision@500: ~35-45%
- Random baseline: ~12%
- Lift@500: ~3-4x
- Model adds: ~$4,000-6,000/week
