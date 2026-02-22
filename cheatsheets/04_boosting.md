# Cheat Sheet: Gradient Boosting (LightGBM)

## Core Idea

Each tree fixes the mistakes of previous trees. Like an orchestra where each musician fills gaps.

```python
import lightgbm as lgb
model = lgb.LGBMClassifier(
    n_estimators=1000,
    learning_rate=0.05,
    max_depth=6,
    num_leaves=31
)
```

## Key Hyperparameters

| Parameter | What it does | Start with |
|---|---|---|
| `n_estimators` | Number of trees | 1000 (use early stopping) |
| `learning_rate` | How much each tree contributes | 0.05-0.1 |
| `max_depth` | Depth per tree | 4-8 |
| `num_leaves` | Complexity per tree | 31 |
| `min_child_samples` | Min samples in leaf | 20 |

## The Golden Rule: Early Stopping

**Never train without a validation set and early stopping.**

```python
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2)

model.fit(
    X_train, y_train,
    eval_set=[(X_val, y_val)],
    callbacks=[lgb.early_stopping(stopping_rounds=50, verbose=False)]
)

print(f"Best iteration: {model.best_iteration_}")
```

## Overfitting Prevention

| Risk Factor | Solution |
|---|---|
| Too many trees | Early stopping |
| Trees too deep | Lower `max_depth` (4-6) |
| Learning too fast | Lower `learning_rate` (0.01-0.05) |
| Too few samples | Increase `min_child_samples` |

## Quick Diagnostic

```
Train AUC: 0.95
Val AUC:   0.72  ← Big gap = OVERFITTING
Test AUC:  0.70
```

**Healthy gap:** < 0.05 between train and val/test

## LightGBM vs XGBoost

| Aspect | LightGBM | XGBoost |
|---|---|---|
| Speed | Faster | Slower |
| Memory | Less | More |
| Accuracy | Similar | Similar |
| Categorical features | Native support | Needs encoding |

## Full Training Template

```python
import lightgbm as lgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score

# Split
X_temp, X_test, y_temp, y_test = train_test_split(X, y, test_size=0.2)
X_train, X_val, y_train, y_val = train_test_split(X_temp, y_temp, test_size=0.2)

# Train with early stopping
model = lgb.LGBMClassifier(
    n_estimators=1000,
    learning_rate=0.05,
    max_depth=6,
    num_leaves=31,
    min_child_samples=20,
    random_state=42,
    verbose=-1
)

model.fit(
    X_train, y_train,
    eval_set=[(X_val, y_val)],
    callbacks=[lgb.early_stopping(stopping_rounds=50, verbose=False)]
)

# Evaluate
print(f"Trees used: {model.best_iteration_}")
print(f"Train AUC: {roc_auc_score(y_train, model.predict_proba(X_train)[:,1]):.3f}")
print(f"Val AUC:   {roc_auc_score(y_val, model.predict_proba(X_val)[:,1]):.3f}")
print(f"Test AUC:  {roc_auc_score(y_test, model.predict_proba(X_test)[:,1]):.3f}")
```

## When to Use Boosting

**Best for:**
- Tabular/structured data
- When accuracy matters most
- Medium to large datasets
- Kaggle competitions

**Not ideal for:**
- Need for interpretability
- Very small datasets
- Real-time predictions with strict latency
