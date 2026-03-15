# Debug Drill Spec: Module 11 - The Unscaled Lasso

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/debug_drills/drill_11_unscaled_lasso.ipynb` |
| Solution | `notebooks/answer_keys/solution_11_unscaled_lasso.ipynb` |
| Runtime | ~20 minutes |
| Bug Type | Feature Scaling / L1 Regularization |

## Scenario

A colleague is using Lasso regression for feature selection. "Lasso says tenure is unimportant!" they report. "We should remove it." But you know tenure is a strong predictor of LTV. The data has features on wildly different scales (tenure_days: 30–1000, orders: 0–15, is_premium: 0–1). Lasso's L1 penalty penalizes coefficients equally, so features with larger raw magnitudes get zeroed first—even when they're important. The colleague's conclusion is wrong because they applied Lasso without scaling.

## The Bug

```python
# ===== COLLEAGUE'S CODE (BUG: NO SCALING) =====

feature_cols = ['tenure_days', 'monthly_spend', 'orders', 'is_premium']
X = df[feature_cols]
y = df['ltv']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

# Lasso without scaling (BUG!)
lasso_unscaled = Lasso(alpha=1.0)
lasso_unscaled.fit(X_train, y_train)  # <-- No scaling!
```

### Why It's Wrong

Lasso minimizes `||y - Xβ||² + α||β||₁`. The penalty treats all coefficients equally. But if `tenure_days` ranges 30–1000 and `orders` ranges 0–15, a small coefficient on tenure can explain more variance than a large coefficient on orders. Lasso zeroes the coefficient that gives the smallest reduction in loss per unit of L1 penalty—which favors small-scale features. So tenure_days (important but on a large scale) gets zeroed, while is_premium (0–1) survives. The feature selection is biased by scale, not importance.

## Investigation Steps

1. **Inspect feature scales** - Check mean, std, min, max for each feature
2. **Compare to true coefficients** - Data is generated with known true_coefs; tenure_days is important
3. **Scale and re-run** - Fit StandardScaler on train, transform both; fit Lasso on scaled data
4. **Compare R² and coefficients** - Scaled Lasso should recover tenure_days and improve R²

## The Fix

```python
# Step 1: Scale the features (fit on train only!)
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Step 2: Fit Lasso on scaled data
lasso_scaled = LassoCV(cv=5)  # Use CV to find best alpha
lasso_scaled.fit(X_train_scaled, y_train)
```

## Self-Checks

| Check | Assertion |
|-------|-----------|
| tenure_days not zeroed after scaling | `abs(lasso_scaled.coef_[tenure_idx]) > 0.01` |
| Scaled Lasso has better R² | `r2_scaled > r2_unscaled` |

## Postmortem Template

### What happened:
- Lasso zeroed tenure_days despite it being an important predictor

### Root cause:
- Lasso was applied to unscaled features; L1 penalty biased toward small-scale features

### How to prevent:
- Always scale features before Lasso (or any L1/L2 regularized model)
- Use LassoCV to tune alpha; verify coefficients match domain knowledge

## Learning Objectives

After completing this drill, learners will be able to:
1. Explain why Lasso requires scaled features
2. Apply StandardScaler before Lasso (fit on train only)
3. Use LassoCV for alpha selection and interpret coefficients correctly
