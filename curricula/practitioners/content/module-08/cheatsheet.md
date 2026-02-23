# Regression Metrics Cheatsheet

## The Big Three

| Metric | Formula | Interpretation |
|--------|---------|----------------|
| **MAE** | `(1/n) × Σ\|actual - pred\|` | Average absolute error |
| **RMSE** | `√[(1/n) × Σ(actual - pred)²]` | Typical error, penalizes big misses |
| **R²** | `1 - (residual SS / total SS)` | % variance explained (0-1) |

---

## When to Use What

| Situation | Use This |
|-----------|----------|
| All errors equally bad | MAE |
| Big errors are catastrophic | RMSE |
| Comparing to baseline | R² |
| Business communication | MAE + R² |
| Different scales/magnitudes | MAPE |

---

## Quick Interpretations

**MAE = $50** → "On average, we're off by $50"

**RMSE = $75** → "Typical error is $75; big misses exist"

**R² = 0.80** → "Model explains 80% of the variance"

**MAPE = 15%** → "On average, we're off by 15%"

---

## Key Relationships

```
RMSE ≥ MAE  (always)
RMSE = MAE  (only if all errors are identical)
RMSE >> MAE (you have outlier errors)
```

---

## R² Quick Guide

| R² | Meaning |
|----|---------|
| 1.0 | Perfect |
| 0.9+ | Excellent |
| 0.7-0.9 | Good |
| 0.5-0.7 | Moderate |
| < 0.5 | Weak |
| < 0 | Worse than baseline! |

---

## Residual Analysis

**What to plot:** `residual = actual - predicted`

| Pattern | Problem | Fix |
|---------|---------|-----|
| Random scatter | ✅ Good | None needed |
| Curved | Missing non-linearity | Add polynomial/transforms |
| Fan shape | Heteroscedasticity | Log transform target |
| Clusters | Subgroup differences | Segment or add features |

---

## Code Snippets

```python
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np

mae = mean_absolute_error(y_true, y_pred)
mse = mean_squared_error(y_true, y_pred)
rmse = np.sqrt(mse)
r2 = r2_score(y_true, y_pred)

# Residuals
residuals = y_true - y_pred
```

---

## Business Translation

**Technical:** "RMSE = 47.3, R² = 0.78"

**Business:** "Predictions typically within $50; explains 78% of variation"

---

## Red Flags

| Flag | Meaning |
|------|---------|
| R² < 0 | Model worse than guessing mean |
| RMSE >> MAE | Large outlier errors |
| Train R² >> Test R² | Overfitting |
| Residual patterns | Model missing relationships |
