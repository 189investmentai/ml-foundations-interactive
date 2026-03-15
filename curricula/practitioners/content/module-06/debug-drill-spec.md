# Debug Drill Spec: Module 06 - The Runaway Booster (Boosting Overfit)

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/debug_drills/drill_06_boosting_overfit.ipynb` |
| Solution | `notebooks/answer_keys/solution_06_boosting_overfit.ipynb` |
| Runtime | ~20 minutes |
| Bug Type | Overfitting |

## Scenario

A colleague trained a gradient boosting model for churn prediction. They followed "best practices" from a blog. "I set n_estimators really high (500) and the training loss keeps going down!" they say proudly. But after deployment, the model performs terribly. The model overfits: too many trees, too deep, learning rate too high—and no early stopping to catch when validation performance plateaus or degrades.

## The Bug

```python
# "I read that more trees is always better!"
# "And higher learning rate makes training faster!"
# "Deep trees capture complex patterns!"

gb_overfit = XGBClassifier(  # or GradientBoostingClassifier
    n_estimators=500,     # <-- BUG: Too many without early stopping
    max_depth=10,         # <-- BUG: Too deep for boosting
    learning_rate=0.5,    # <-- BUG: Too aggressive
    random_state=42
)
gb_overfit.fit(X_train, y_train)  # No validation monitoring!
```

### Why It's Wrong

**n_estimators=500 without early stopping:** Boosting adds trees sequentially. After some point, new trees fit training noise. Validation accuracy peaks then drops. Using all 500 trees uses the overfit ones.

**max_depth=10:** Deep trees in boosting can overfit quickly. Typical values are 3–6. Deeper trees = more capacity = more overfitting when combined with many estimators.

**learning_rate=0.5:** High learning rate makes each tree's contribution large. The model can overshoot and oscillate. Lower LR (e.g., 0.05–0.1) with more trees (and early stopping) is more stable.

**No early stopping:** Without `eval_set` and `early_stopping_rounds`, the model trains all 500 trees even when validation performance has degraded.

### Technical Explanation

Gradient boosting minimizes loss by adding trees. Each tree fits the residual. With high LR and deep trees, later trees often fit noise. Early stopping monitors validation loss and stops when it stops improving (or worsens), preventing overfit trees from being used.

## Investigation Steps

1. **Compare train vs val vs test accuracy** - Train high, val/test low = overfitting
2. **Plot accuracy vs n_estimators** - Find where validation peaks
3. **Try lower learning_rate** - 0.1 or 0.05
4. **Reduce max_depth** - 4 or 5 typical for boosting
5. **Add early stopping** (XGBoost) or use optimal n_estimators from sweep

## The Fix

```python
# XGBoost: Use early stopping + conservative hyperparameters
gb_fixed = XGBClassifier(
    n_estimators=500,
    max_depth=4,              # Shallower trees
    learning_rate=0.1,        # Lower, more stable
    early_stopping_rounds=20,  # Stop when val doesn't improve for 20 rounds
    random_state=42,
    verbosity=0
)
gb_fixed.fit(X_train, y_train, eval_set=[(X_val, y_val)], verbose=False)

# sklearn GradientBoosting: No early stopping—sweep n_estimators
# Use optimal_n from validation sweep, e.g. n_estimators=50-100
gb_fixed = GradientBoostingClassifier(
    n_estimators=optimal_n,
    max_depth=4,
    learning_rate=0.1,
    random_state=42
)
gb_fixed.fit(X_train, y_train)
```

## Self-Checks

| Check | Assertion |
|-------|-----------|
| Val-test gap reduced | `(train_acc - test_acc) < 0.15` |
| Early stopping triggered (XGBoost) | `gb_fixed.best_iteration < 500` |
| Test accuracy improved | `test_acc_fixed > test_acc_overfit` |

## Postmortem Template

### What happened:
- Boosting model had high train accuracy but poor deployment performance
- Colleague used 500 trees, depth 10, LR 0.5 with no early stopping

### Root cause:
- Too many trees without early stopping—later trees overfit
- max_depth=10 and learning_rate=0.5 too aggressive for this dataset

### How to prevent:
- Use early stopping with validation set (XGBoost/LightGBM)
- For sklearn GradientBoosting, sweep n_estimators and pick best validation
- Use conservative max_depth (3–6) and learning_rate (0.05–0.1)
- Always hold out validation for tuning

## Learning Objectives

After completing this drill, learners will be able to:
1. Recognize boosting overfitting from train-val-test gaps
2. Use early stopping (XGBoost) or n_estimators sweep (sklearn) to prevent overfitting
3. Choose appropriate max_depth and learning_rate for gradient boosting
4. Set up train/val/test splits for boosting hyperparameter selection
