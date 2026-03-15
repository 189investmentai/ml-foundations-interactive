# Debug Drill Spec: Module 05 - The Memorizing Tree (Overfit Tree)

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/debug_drills/drill_05_overfit_tree.ipynb` |
| Solution | `notebooks/answer_keys/solution_05_overfit_tree.ipynb` |
| Runtime | ~20 minutes |
| Bug Type | Overfitting |

## Scenario

A colleague built a decision tree for churn prediction. They're confused by the results. "The model gets 99% accuracy on training data!" they say. "But in production it's only 65%. What's going on?" The huge gap between train and test accuracy is a classic overfitting symptom. The tree is memorizing training data instead of learning generalizable patterns.

## The Bug

```python
# "I want the most accurate model possible!"
tree_overfit = DecisionTreeClassifier(
    max_depth=20,         # <-- BUG: Way too deep!
    min_samples_leaf=1,   # <-- BUG: Allows single-sample leaves
    min_samples_split=2,  # <-- BUG: Splits even with 2 samples
    random_state=42
)

tree_overfit.fit(X_train, y_train)
# Train: ~99%, Test: ~65% → 30%+ gap!
```

### Why It's Wrong

With `max_depth=20`, `min_samples_leaf=1`, and `min_samples_split=2`, the tree can grow until each leaf has a single training sample. The number of leaves approaches the number of training samples—the tree is essentially memorizing. It achieves near-perfect train accuracy but fails to generalize. Test accuracy collapses because the learned "rules" are noise, not signal.

### Technical Explanation

Decision trees partition the feature space. With no constraints, they can create arbitrarily fine partitions that capture training noise. The ratio `n_leaves / n_train_samples` approaching 1 means most leaves have one sample—pure overfitting. Regularization via `max_depth`, `min_samples_leaf`, and `min_samples_split` limits complexity and forces the tree to learn broader patterns.

## Investigation Steps

1. **Compare train vs test accuracy** - Large gap indicates overfitting
2. **Inspect tree complexity** - `tree.get_n_leaves()` and `tree.get_depth()`
3. **Check leaves/samples ratio** - If `n_leaves ≈ n_train`, the tree is memorizing
4. **Sweep max_depth** - Find depth where test accuracy peaks
5. **Add min_samples_leaf and min_samples_split** - Further regularize

## The Fix

```python
# Option 1: Sweep to find optimal depth
depths = range(1, 21)
for depth in depths:
    tree_temp = DecisionTreeClassifier(max_depth=depth, random_state=42)
    tree_temp.fit(X_train, y_train)
    # Track test_acc, pick depth with best test performance

# Option 2: Fixed tree with proper constraints
tree_fixed = DecisionTreeClassifier(
    max_depth=optimal_depth,   # e.g., 4-6 from sweep
    min_samples_leaf=10,       # Require at least 10 samples per leaf
    min_samples_split=20,      # Require 20 samples to split
    random_state=42
)
tree_fixed.fit(X_train, y_train)
```

## Self-Checks

| Check | Assertion |
|-------|-----------|
| Train-test gap reduced | `(train_acc - test_acc) < 0.15` |
| Leaves << samples | `tree_fixed.get_n_leaves() < len(X_train) / 10` |
| Test accuracy improved | `test_acc_fixed > test_acc_overfit` |

## Postmortem Template

### What happened:
- Tree achieved 99% train accuracy but only 65% test accuracy
- Huge gap indicated memorization, not generalization

### Root cause:
- max_depth=20, min_samples_leaf=1 allowed tree to grow until leaves had single samples
- No regularization to limit complexity

### How to prevent:
- Always compare train vs validation/test metrics
- Use max_depth, min_samples_leaf, min_samples_split to regularize
- Sweep hyperparameters and pick based on validation performance
- For trees, prefer RandomForest or GradientBoosting for built-in regularization

## Learning Objectives

After completing this drill, learners will be able to:
1. Recognize overfitting from train-test accuracy gap
2. Diagnose tree overfitting via n_leaves and depth
3. Apply max_depth, min_samples_leaf, min_samples_split for regularization
4. Use validation-based hyperparameter selection for trees
