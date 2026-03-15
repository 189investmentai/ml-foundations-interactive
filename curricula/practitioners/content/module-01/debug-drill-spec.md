# Debug Drill Spec: Module 01 - The Too-Good Model (Pipeline Leakage)

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/debug_drills/drill_01_pipeline_leakage.ipynb` |
| Solution | `notebooks/answer_keys/solution_01_pipeline_leakage.ipynb` |
| Runtime | ~20 minutes |
| Bug Type | Pipeline Leakage / Preprocessing Leakage |

## Scenario

A colleague built a churn prediction pipeline and is excited because the model achieves 97% AUC on the test set. "This is the best model we've ever built!" they say. "We should ship it immediately!" Typical churn models get 0.70–0.85 AUC, so 97% is suspiciously high. The bug is not in the model training step—it's in the preprocessing pipeline.

## The Bug

```python
# Colleague's preprocessing code (CONTAINS BUG)
X = df_engineered[feature_cols].fillna(0)
y = df_engineered['churn_30d']

# Standardize features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)  # <-- BUG: Fit on ALL data before split!

# THEN split
X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42, stratify=y
)
```

### Why It's Wrong

The StandardScaler is fit on the entire dataset before the train/test split. This means:

1. **Information leakage** - The scaler's mean and std are computed using test-set statistics
2. **Optimistic evaluation** - The model sees "peeked" information about the test distribution
3. **Production mismatch** - In deployment, you'd only fit on training data; the evaluation doesn't reflect that

### Technical Explanation

`fit_transform(X)` computes mean and std across all rows. When you split afterward, the test set's values influenced those statistics. The scaled test features are not "unseen"—they contributed to the scaling. This inflates AUC because the model is evaluated on data that indirectly informed the preprocessing.

## Investigation Steps

1. **Trace the pipeline order** - Notice scaler is fit before split
2. **Ask: "What would production look like?"** - In production, you'd fit scaler on train only
3. **Re-run with correct order** - Split first, then fit scaler on train, transform both

## The Fix

```python
# Step 1: Split FIRST (on raw features)
X_train_raw, X_test_raw, y_train, y_test = train_test_split(
    X_raw, y, test_size=0.2, random_state=42, stratify=y
)

# Step 2: Fit scaler on TRAIN ONLY
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train_raw)  # fit + transform
X_test_scaled = scaler.transform(X_test_raw)       # transform only (no fit!)

# Step 3: Train and evaluate
model.fit(X_train_scaled, y_train)
```

## Self-Checks

| Check | Assertion |
|-------|-----------|
| AUC drops to realistic range | `auc_fixed < 0.90` (typical churn: 0.70–0.85) |
| Scaler fit only on train | `scaler.fit()` called on `X_train_raw` only |

## Postmortem Template

### What happened:
- Model reported 97% AUC—suspiciously high for churn prediction
- Production performance would be much worse

### Root cause:
- StandardScaler was fit on full data before train/test split
- Test set statistics leaked into preprocessing

### How to prevent:
- Always split first, then fit any preprocessor (scaler, imputer, encoder) on train only
- Use sklearn Pipelines to enforce correct order
- Ask: "Would I have this statistic at prediction time?"

## Learning Objectives

After completing this drill, learners will be able to:
1. Recognize pipeline leakage (preprocessing before split)
2. Order pipeline steps correctly: split → fit on train → transform both
3. Use sklearn Pipelines to prevent this class of bugs
