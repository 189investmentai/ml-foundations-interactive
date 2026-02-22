# Module 4 Cheat Sheet: Gradient Boosting

---

## Random Forest vs. Boosting

| | Random Forest | Gradient Boosting |
|---|---------------|-------------------|
| **How it works** | Trees vote in parallel | Trees correct errors sequentially |
| **Overfitting** | Resistant | Needs careful tuning |
| **Out-of-box** | Great | Needs early stopping |
| **Best accuracy** | Good | Usually better |
| **Speed** | Faster training | Slower training |

---

## Quick XGBoost Setup

```python
import xgboost as xgb

model = xgb.XGBClassifier(
    n_estimators=500,           # Max trees (early stopping will reduce)
    learning_rate=0.05,         # Lower = more trees needed
    max_depth=4,                # Shallow trees
    min_child_weight=10,        # Regularization
    subsample=0.8,              # Use 80% of rows per tree
    colsample_bytree=0.8,       # Use 80% of features per tree
    early_stopping_rounds=20,   # Stop if no improvement
    eval_metric='auc'
)

model.fit(
    X_train, y_train,
    eval_set=[(X_val, y_val)],
    verbose=False
)
```

---

## Key Hyperparameters

| Parameter | Default | Tune range | Effect |
|-----------|---------|------------|--------|
| `learning_rate` | 0.3 | 0.01-0.1 | Lower = more stable |
| `max_depth` | 6 | 3-8 | Lower = less overfitting |
| `n_estimators` | 100 | 100-1000 | Use with early stopping |
| `min_child_weight` | 1 | 10-100 | Higher = less overfitting |
| `subsample` | 1.0 | 0.6-0.9 | Lower = more regularization |

---

## Tuning Quick Start

```
Step 1: Baseline
  → Default params + early_stopping_rounds=20
  
Step 2: Lower learning rate
  → learning_rate=0.05, n_estimators=500
  
Step 3: Tune depth (if overfitting)
  → Try max_depth = 3, 4, 5, 6
  
Step 4: Add regularization (if still overfitting)
  → subsample=0.8, colsample_bytree=0.8
```

---

## Early Stopping

**Always use it.**

```python
# This prevents overfitting automatically
model.fit(
    X_train, y_train,
    eval_set=[(X_val, y_val)],
    early_stopping_rounds=20  # Stop if no improvement for 20 rounds
)

print(f"Stopped at {model.best_iteration} trees")
```

---

## XGBoost vs. LightGBM

| Scenario | Recommendation |
|----------|----------------|
| Quick experiment | LightGBM (faster) |
| Small data (<10K) | XGBoost (often better) |
| Large data (>100K) | LightGBM (much faster) |
| Kaggle competition | Try both |

---

## Production Considerations

| Concern | Solution |
|---------|----------|
| Latency too high | Reduce n_estimators, accept some accuracy loss |
| Model too large | Use fewer trees, shallower depth |
| Need explanations | Add SHAP values |

```python
# Check inference time
import time
start = time.time()
for _ in range(1000):
    model.predict_proba(X_test[:1])
print(f"Avg inference: {(time.time()-start)}ms per sample")
```

---

## When NOT to Use Boosting

- ❌ Need coefficient interpretation → Use logistic regression
- ❌ Tiny dataset (<1000 rows) → Risk of overfitting
- ❌ Extreme latency constraints → Single model is faster
- ❌ Quick baseline needed → Random forest is more forgiving
