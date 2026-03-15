# Debug Drill Spec: Module 10 - The Leaky Pipeline (Scaler + Target Leakage)

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/debug_drills/drill_10_scaler_leakage.ipynb` |
| Solution | `notebooks/answer_keys/solution_10_scaler_leakage.ipynb` |
| Runtime | ~20 minutes |
| Bug Type | Pipeline Leakage (Scaler + Target-Derived Feature) |

## Scenario

A colleague built a churn prediction model with impressive performance. "AUC = 0.92!" they say. "Way better than our old model!" But in production, the AUC drops to 0.72. The pipeline has two sources of leakage: the scaler is fit on all data before the split, and a target-derived feature ("average churn rate for similar customers") encodes the label directly. Both inflate evaluation metrics and cause a painful production surprise.

## The Bug

```python
# BUG 1: Scale BEFORE splitting (leaks test statistics into train)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)  # <-- Fitted on ALL data!

# BUG 2: Create a target-derived feature (leaks the label itself)
df['segment'] = pd.qcut(df['tenure_days'], q=5, labels=['New', 'Active', 'Established', 'Loyal', 'Veteran'])
segment_churn_rate = df.groupby('segment')['churn'].transform('mean')  # <-- Uses ALL churn labels!
X_scaled = np.column_stack([X_scaled, segment_churn_rate])

# Now split (too late!)
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.3, ...)
```

### Why It's Wrong

**Bug 1:** The scaler's mean and std are computed using test-set values. The scaled test features are not "unseen"—they influenced the preprocessing. In production, you'd fit the scaler only on training data.

**Bug 2:** `segment_churn_rate` is the average churn for each tenure segment, computed using all labels including the test set. The model is effectively given the answer: it learns "customers in segment X have churn rate Y" where Y comes from the very labels we're trying to predict.

## Investigation Steps

1. **Trace pipeline order** - Notice scaler is fit before split; features are engineered before split
2. **Identify leaky feature** - Check coefficients; segment_churn_rate will have high weight
3. **Ask: "What would production look like?"** - Can't use test labels or test statistics
4. **Re-build pipeline** - Split first, fit scaler on train only, remove target-derived features

## The Fix

```python
# Step 1: Use only safe features (no target-derived)
X_clean = df[feature_cols].copy()
y_clean = df['churn']

# Step 2: Split FIRST
X_train_clean, X_test_clean, y_train_clean, y_test_clean = train_test_split(
    X_clean, y_clean, test_size=0.3, random_state=42, stratify=y_clean
)

# Step 3: Fit scaler on TRAIN only
scaler_clean = StandardScaler()
X_train_scaled = scaler_clean.fit_transform(X_train_clean)  # Fit on train
X_test_scaled = scaler_clean.transform(X_test_clean)         # Transform test (no fit!)

# Step 4: Train model
model_clean = LogisticRegression(max_iter=1000)
model_clean.fit(X_train_scaled, y_train_clean)
```

## Self-Checks

| Check | Assertion |
|-------|-----------|
| Clean pipeline has lower (realistic) AUC | `test_auc_clean < test_auc` |
| Only safe features used | `X_train_scaled.shape[1] == len(feature_cols)` |

## Postmortem Template

### What happened:
- Model reported 0.92 AUC; production dropped to ~0.72

### Root cause:
- Scaler fit on all data before split; target-derived feature (segment_churn_rate) leaked labels

### How to prevent:
- Always split first, then fit any preprocessor on train only
- Never use the target (or aggregates of it) as a feature
- Validate pipeline order matches production flow

## Learning Objectives

After completing this drill, learners will be able to:
1. Identify scaler leakage (fit before split)
2. Identify target-derived feature leakage
3. Build a leak-free pipeline with correct split → fit → transform order
