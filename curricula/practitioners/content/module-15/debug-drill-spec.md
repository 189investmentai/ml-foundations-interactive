# Debug Drill Spec: Module 15 - The Diverging Neural Network

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/debug_drills/drill_15_diverging_nn.ipynb` |
| Solution | `notebooks/answer_keys/solution_15_diverging_nn.ipynb` |
| Runtime | ~20 minutes |
| Bug Type | Unscaled Features + Learning Rate |

## Scenario

A colleague is training a neural network for customer churn prediction. "The loss keeps going up instead of down!" they say, frustrated. The model diverges during training, producing NaN or exploding loss values, and test accuracy stays near random (~50%). The data has features on vastly different scales (Revenue: 1000s, Orders: 100s, Rate: 0.01). Two bugs cause this: (1) no feature scaling, so gradients are unstable; (2) learning rate of 1.0 is far too high, causing overshooting and divergence.

## The Bug

```python
# ===== COLLEAGUE'S CODE (BUGS: No scaling, high learning rate) =====

# BUG 1: No feature scaling!
# BUG 2: Learning rate too high!

model_broken = MLPClassifier(
    hidden_layer_sizes=(64, 32),
    learning_rate_init=1.0,      # <-- BUG: WAY too high!
    max_iter=100,
    random_state=42,
    verbose=False
)

# Try to train (will fail or produce bad results)
model_broken.fit(X_train, y_train)  # <-- NOT SCALED!
```

### Why It's Wrong

**Bug 1:** Features on different scales (0.01 to 1000) produce gradients of wildly different magnitudes. Large inputs → large activations → exploding gradients. The optimizer cannot find a stable update direction.

**Bug 2:** Learning rate 1.0 means each update moves parameters by the full gradient. For neural nets, typical values are 0.001–0.01. With LR=1.0, the optimizer overshoots the minimum, and loss can explode or oscillate. Combined with unscaled features, training diverges.

## Investigation Steps

1. **Inspect feature scales** - Check min/max; features span orders of magnitude
2. **Check loss curve** - Loss increases or oscillates instead of decreasing
3. **Scale features** - Apply StandardScaler before training
4. **Lower learning rate** - Use 0.001 (or default); add early stopping

## The Fix

```python
# Fix 1: Scale the features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Fix 2: Use a reasonable learning rate
model_fixed = MLPClassifier(
    hidden_layer_sizes=(64, 32),
    learning_rate_init=0.001,  # Fixed: reasonable LR
    max_iter=200,
    random_state=42,
    early_stopping=True,
    validation_fraction=0.1
)

model_fixed.fit(X_train_scaled, y_train)
```

## Self-Checks

| Check | Assertion |
|-------|-----------|
| Loss decreases | `model_fixed.loss_` < 1.0 |
| Test accuracy reasonable | `model_fixed.score(X_test_scaled, y_test) > 0.6` |

## Postmortem Template

### What happened:
- Neural network loss diverged; test accuracy stayed near random

### Root cause:
- No feature scaling (unstable gradients); learning rate 1.0 (overshooting)

### How to prevent:
- Always scale features before training neural networks
- Use typical learning rates (0.001–0.01); tune if needed
- Monitor loss curve; add early stopping

## Learning Objectives

After completing this drill, learners will be able to:
1. Explain why neural networks require scaled inputs
2. Diagnose divergence (loss increasing, NaN)
3. Fix by scaling features and lowering learning rate
