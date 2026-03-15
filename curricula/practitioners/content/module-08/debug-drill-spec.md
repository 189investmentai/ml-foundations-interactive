# Debug Drill Spec: Module 08 - The Hidden Segments (Regression Segments)

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/debug_drills/drill_08_regression_segments.ipynb` |
| Solution | `notebooks/answer_keys/solution_08_regression_segments.ipynb` |
| Runtime | ~20 minutes |
| Bug Type | Aggregated Metrics Hide Per-Segment Failures |

## Scenario

A colleague built an LTV prediction model for StreamCart. They're thrilled with the results. "R² = 0.85 and MAE = $40!" they report. "We're ready to deploy!" But when the marketing team uses it, they complain: "Your predictions for our premium customers are terrible!" Overall metrics look good because they average over segments—but the model fails badly on Premium (and possibly Enterprise) customers. Different segments have fundamentally different LTV patterns that a single linear model cannot capture.

## The Bug

```python
# ===== COLLEAGUE'S CODE =====
# Train a simple linear regression on ALL data (ignoring segment structure)
X = df[['tenure_months', 'monthly_spend', 'orders']]
y = df['ltv']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

# Overall metrics look great!
print(f"R²:  {r2_score(y_test, y_pred):.3f}")
print(f"MAE: ${mean_absolute_error(y_test, y_pred):.2f}")
# ✅ Looks good! Ready to deploy... (but Premium segment fails!)
```

### Why It's Wrong

The data has three segments with different LTV patterns:
- **Standard:** Linear relationship — `ltv = 50 + 10*tenure + 2*spend + noise`
- **Premium:** Quadratic relationship — `ltv = 200 + 5*tenure^1.5 + 3*spend + noise` (linear model can't capture tenure^1.5)
- **Enterprise:** Different scale — `ltv = 1000 + 50*tenure + 10*spend + noise`

A single linear model fits the "average" pattern. It does okay on Standard (majority) and may average out Enterprise, but fails on Premium because the relationship is non-linear. Overall R² and MAE hide this—Premium's poor R² is diluted by Standard's good performance.

### Technical Explanation

Aggregated metrics (overall R², MAE) are weighted by segment size. Standard is 70% of data, so it dominates. Premium (20%) and Enterprise (10%) can have terrible per-segment metrics while overall metrics look fine. Always evaluate by business-relevant segments before deployment. When segments have different functional forms, use segment-specific models or add segment interaction features.

## Investigation Steps

1. **Verify overall metrics** - Confirm R² and MAE look good
2. **Compute metrics per segment** - MAE, R² for Standard, Premium, Enterprise separately
3. **Visualize residuals by segment** - Box plots and scatter plots reveal segment-specific failure
4. **Diagnose** - Premium has low R²; linear model can't capture tenure^1.5
5. **Fix** - Train segment-specific models (or add segment interactions / non-linear features)

## The Fix

```python
# SOLUTION: Train separate models per segment
y_pred_fixed = pd.Series(index=X_test.index, dtype=float)

for seg in ['Standard', 'Premium', 'Enterprise']:
    train_mask = df.loc[X_train.index, 'segment'] == seg
    test_mask = df.loc[X_test.index, 'segment'] == seg

    if train_mask.sum() > 10:
        seg_model = LinearRegression()
        seg_model.fit(X_train[train_mask], y_train[train_mask])
        seg_pred = seg_model.predict(X_test[test_mask])
        y_pred_fixed[test_mask] = seg_pred

# Overall MAE improves; Premium segment R² improves dramatically
```

## Self-Checks

| Check | Assertion |
|-------|-----------|
| Segment models beat single model | `mae_fixed < mae_original` |
| Premium segment improves | `r2_premium_fixed > r2_premium_single` |
| Per-segment metrics computed | Metrics reported for each segment |

## Postmortem Template

### What happened:
- Marketing complained predictions for premium/enterprise customers were inaccurate
- Overall R² and MAE looked good, masking segment-level failure

### Root cause:
- Different customer segments have fundamentally different LTV patterns
- Standard: linear; Premium: quadratic (tenure^1.5); Enterprise: different scale
- Single linear model couldn't capture all three

### How to prevent:
- Always analyze performance by relevant business segments before deployment
- When segments have different patterns, use segment-specific models or segment interaction features
- Report per-segment metrics alongside overall metrics

## Learning Objectives

After completing this drill, learners will be able to:
1. Recognize that aggregated metrics can hide segment-level failures
2. Evaluate regression models by business-relevant segments
3. Diagnose when a single model fails on specific segments
4. Apply segment-specific models when segments have different patterns
