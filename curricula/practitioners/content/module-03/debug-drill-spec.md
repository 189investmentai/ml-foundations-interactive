# Debug Drill Spec: Module 03 - The Backwards Coefficients

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/debug_drills/drill_03_regression_diagnostics.ipynb` |
| Solution | `notebooks/answer_keys/solution_03_regression_diagnostics.ipynb` |
| Runtime | ~20 minutes |
| Bug Type | Multicollinearity / Target Leakage |

## Scenario

A colleague built a linear regression model to predict customer spend. The model performs well (decent R²), but the coefficients don't make sense — `orders_total` has a negative coefficient, implying "more orders = less spend."

## The Bug

```python
# Colleague's buggy feature engineering
df['spend_per_order'] = df['total_spend'] / (df['orders_total'] + 1)

features = [
    'tenure_months',
    'logins_last_30d', 
    'orders_total',
    'avg_order_value',
    'spend_per_order'  # <-- BUG: Derived from target!
]
```

### Why It's Wrong

`spend_per_order` is mathematically derived from `total_spend` (the target). This creates:

1. **Target leakage** — The feature contains information about the target
2. **Severe multicollinearity** — Features become mathematically dependent
3. **Unstable coefficients** — Signs flip to "balance" the equation

### Technical Explanation

The model is essentially solving:
```
total_spend ≈ β₀ + β₁×tenure + ... + β₄×(total_spend/orders) 
```

To make this equation work, the model assigns:
- Large positive weight to `spend_per_order`
- Negative weight to `orders_total` to compensate

This produces correct predictions but nonsensical explanations.

## Investigation Steps

1. **Check correlation matrix** — `spend_per_order` has ~1.0 correlation with target
2. **Trace the feature derivation** — See that it contains the target
3. **Recognize the pattern** — Features derived from target = bad

## The Fix

```python
# Remove the target-derived feature
features_fixed = [
    'tenure_months',
    'logins_last_30d', 
    'orders_total',
    'avg_order_value'
    # spend_per_order REMOVED
]
```

## Self-Checks

| Check | Assertion |
|-------|-----------|
| orders_total coefficient positive | `model_fixed.coef_[orders_idx] > 0` |
| tenure_months coefficient positive | `model_fixed.coef_[tenure_idx] > 0` |

## Postmortem Template

### What happened:
- Model showed negative coefficient for `orders_total`
- Implies "more orders = less spend" — contradicts domain knowledge

### Root cause:
- Feature `spend_per_order` derived from target variable
- Created multicollinearity that destabilized coefficients

### How to prevent:
- Never create features from the target
- Check correlation matrix for suspicious values (> 0.9)
- Verify coefficient signs before deployment
- Ask: "Would I have this at prediction time?"

## Learning Objectives

After completing this drill, learners will be able to:
1. Recognize symptoms of multicollinearity (wrong coefficient signs)
2. Identify features derived from the target variable
3. Use correlation matrix to diagnose multicollinearity
4. Understand why good predictions don't guarantee good explanations
