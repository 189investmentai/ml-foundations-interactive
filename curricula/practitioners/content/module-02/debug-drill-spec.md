# Debug Drill Spec: Module 02 - The Leaky Features (Data Leakage)

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/debug_drills/drill_02_data_leakage.ipynb` |
| Solution | `notebooks/answer_keys/solution_02_data_leakage.ipynb` |
| Runtime | ~20 minutes |
| Bug Type | Target Leakage / Temporal Leakage |

## Scenario

Your team built a churn prediction model. A colleague is proud of the feature engineering. "I created some amazing features!" they say. "The model gets 0.96 AUC!" You're suspicious—typical churn models get 0.70–0.85 AUC. There are two leaky features to find and remove.

## The Bug

```python
# BUG 1: Target leakage - uses the target directly in the formula!
df_feat['churn_risk_score'] = (
    df_feat['days_since_last_order'] / 30 +
    (1 - df_feat['churn_30d']) * 0.5  # <-- Uses the target directly!
)

# BUG 2: Temporal leakage - uses future information!
# "Lifetime value" includes ALL purchases, even ones AFTER the prediction date
df_feat['customer_value'] = df_feat['total_spend']  # <-- Includes future spend
```

### Why It's Wrong

**Bug 1 (churn_risk_score):** The formula `(1 - churn_30d) * 0.5` directly uses the target. The model learns "if churn_risk_score is high, they didn't churn"—which is circular. At prediction time you don't know churn status.

**Bug 2 (customer_value):** `total_spend` includes purchases made after the prediction date. Customers who don't churn keep buying (higher value); customers who churn stop buying (lower value). The feature encodes the outcome.

### Technical Explanation

Target leakage: Any feature derived from the target gives the model a shortcut. The model doesn't need to learn patterns—it can just read the leaked signal. Temporal leakage: For a prediction at time T, you must only use information available at T. `total_spend` at "end of observation" includes post-T purchases, which are caused by not churning.

## Investigation Steps

1. **Check feature correlations with target** - Leaky features often have suspiciously high correlation
2. **Check feature importances** - Leaky features often dominate (e.g., >0.2)
3. **Trace each feature** - Ask: "Would I have this at prediction time?" and "Does this use future info?"

## The Fix

```python
# Remove both leaky features from the feature list
feature_cols_fixed = [
    'tenure_months', 'orders_total', 'logins_last_30d',
    'orders_per_month', 'login_frequency',
    # 'churn_risk_score',  # REMOVED - target leakage
    # 'customer_value',    # REMOVED - temporal leakage
    'support_tickets_total', 'avg_order_value'
]
```

For `churn_risk_score`: Remove the `(1 - churn_30d) * 0.5` term—use only `days_since_last_order / 30` if that's valid at prediction time. For `customer_value`: Use spend-to-date (e.g., `spend_before_prediction_date`) instead of lifetime total.

## Self-Checks

| Check | Assertion |
|-------|-----------|
| AUC drops to realistic range | `auc_fixed < 0.90` |
| No target-derived features | `'churn_30d'` not in any feature formula |
| No future info in features | `total_spend` replaced with point-in-time spend |

## Postmortem Template

### What happened:
- Model showed 0.96 AUC—inflated by leaky features
- Would fail in production when leaky info is unavailable

### Root cause:
- `churn_risk_score` used the target directly in the formula
- `customer_value` used `total_spend` which includes future purchases

### How to prevent:
- Never create features from the target
- For temporal data, use point-in-time features only (info available at prediction time)
- Check correlations and feature importances for suspicious dominance
- Ask: "Would I have this at prediction time?"

## Learning Objectives

After completing this drill, learners will be able to:
1. Identify target leakage (features derived from the target)
2. Identify temporal leakage (features using future information)
3. Use correlation matrix and feature importance to diagnose leakage
4. Apply the "prediction time" test to validate features
