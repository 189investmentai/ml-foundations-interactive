# Debug Drill Spec: Module 22 - The Unreproducible Model (Reproducibility)

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/debug_drills/drill_22_reproducibility.ipynb` |
| Solution | `notebooks/answer_keys/solution_22_reproducibility.ipynb` |
| Runtime | ~20 minutes |
| Bug Type | Reproducibility / Missing Random Seeds |

## Scenario

A colleague built a training pipeline that performed great in testing but poorly in production. "I can't reproduce the training results!" they say. "Every run gives different metrics!" The training pipeline has reproducibility bugs—no random seeds in `train_test_split` or the model. This makes debugging impossible and prevents reliable comparison of experiments.

## The Bug

```python
# Colleague's buggy code
def broken_train_pipeline(df):
    """Training pipeline with reproducibility bugs."""
    features = ['feature_1', 'feature_2', 'feature_3']
    X = df[features]
    y = df['target']
    
    # BUG 1: No random_state in train_test_split!
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2
    )  # <-- Missing random_state!
    
    # BUG 2: No random_state in model!
    model = GradientBoostingClassifier(
        n_estimators=100,
        max_depth=3
    )  # <-- Missing random_state!
    
    model.fit(X_train, y_train)
    y_prob = model.predict_proba(X_test)[:, 1]
    auc = roc_auc_score(y_test, y_prob)
    return auc
```

### Why It's Wrong

**BUG 1**: `train_test_split` without `random_state` creates a different train/test split on every run. The model sees different data each time, so metrics vary.

**BUG 2**: `GradientBoostingClassifier` has randomness in tree building (e.g., subsampling). Without `random_state`, the same data can produce different models.

**Combined effect**: AUC varies across runs. You can't tell if a code change helped or hurt. Debugging and experiment comparison become impossible.

## Investigation Steps

1. **Identify the reproducibility bugs** - Check `train_test_split` and model constructors for missing `random_state`
2. **Fix the pipeline** - Add `random_state=42` (or configurable) to both
3. **Verify reproducibility** - Run pipeline 5 times; assert all AUC values are identical

## The Fix

```python
# Fixed: Reproducible pipeline
def fixed_train_pipeline(df, random_state=42):
    """Reproducible training pipeline."""
    features = ['feature_1', 'feature_2', 'feature_3']
    X = df[features]
    y = df['target']
    
    # FIX 1: Add random_state to train_test_split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=random_state
    )
    
    # FIX 2: Add random_state to model
    model = GradientBoostingClassifier(
        n_estimators=100,
        max_depth=3,
        random_state=random_state
    )
    
    model.fit(X_train, y_train)
    y_prob = model.predict_proba(X_test)[:, 1]
    return roc_auc_score(y_test, y_prob)
```

## Self-Checks

| Check | Assertion |
|-------|-----------|
| Results identical across runs | `len(set([fixed_train_pipeline(data) for _ in range(5)])) == 1` |
| AUC consistent | `results = [fixed_train_pipeline(data) for _ in range(3)]; assert len(set(results)) == 1` |

## Postmortem Template

### What happened:
- Training metrics varied between runs
- Could not reproduce or compare experiments

### Root cause:
- `train_test_split` without `random_state` → different splits each run
- Model without `random_state` → different model each run

### How to prevent:
- Set `random_state` in `train_test_split`, `KFold`, and all models
- Use config files to store seeds and hyperparameters
- Run pipeline multiple times and verify identical results

## Learning Objectives

After completing this drill, learners will be able to:
1. Identify sources of non-reproducibility in ML pipelines
2. Add `random_state` to data splits and models
3. Verify reproducibility by running pipelines multiple times
