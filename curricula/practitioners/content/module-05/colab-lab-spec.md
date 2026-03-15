# Colab Lab Spec: Module 05 - Decision Trees for Interpretable Predictions

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/module_05_decision_trees.ipynb` |
| Runtime | ~45 minutes |
| Dataset | StreamCart customers |
| Target | `churn_30d` |

## Learning Objectives

After completing this lab, learners will be able to:
1. Diagnose overfitting in unconstrained decision trees
2. Find optimal max_depth via train/test comparison
3. Visualize tree structure and extract text rules
4. Interpret feature importance from tree splits
5. Extract human-readable business rules for churn prediction

## Sections

### 1. Setup + Load Data (5 min)
- Import libraries (sklearn tree, LogisticRegression for baseline)
- Load StreamCart customers
- Feature engineering: tenure_days, avg_order_value if missing
- Features: tenure_days, orders_total, total_spend, support_tickets_total, avg_order_value
- Train-test split (70/30, stratified)

### 2. Baseline: Logistic Regression (3 min)
- Fit logistic regression for comparison
- Report train accuracy, test accuracy, gap

### 3. Unconstrained Tree (Overfitting Demo) (5 min)
- Fit DecisionTreeClassifier with no constraints
- Report train vs test accuracy, depth, number of leaves
- **Self-check:** Large train-test gap indicates overfitting

### 4. TODO: Find Optimal Depth (10 min)
- Sweep max_depth 1–14
- For each depth: train accuracy, test accuracy, n_leaves
- Plot: accuracy vs depth (train vs test vs logistic baseline)
- Plot: n_leaves vs depth
- **TODO:** Identify depth that maximizes test accuracy
- **Self-check:** optimal_depth in 1–14

### 5. Train the Optimal Tree (3 min)
- Fit tree with optimal_depth, min_samples_leaf=10
- Report actual depth, leaves, train/test accuracy, gap

### 6. Visualize the Tree (5 min)
- `plot_tree` with feature names, class names, filled colors
- `export_text` for human-readable rules

### 7. Feature Importance (3 min)
- Extract feature_importances_
- Bar chart sorted by importance
- Interpret: which features drive splits most

### 8. Extract Business Rules (5 min)
- Custom `extract_rules` function walks tree
- Display top 5 churn rules with path, prediction, samples, confidence
- Format: "IF tenure_days <= X AND ... → Churned (Y% of N customers)"

### 9. Compare Models (3 min)
- Final comparison: Logistic Regression vs Optimal Tree vs Unconstrained Tree
- Test accuracy and interpretability (coefficients vs N rules)

### 10. Stakeholder Summary (5 min)
- **TODO:** Write 3-bullet summary (~100 words) for support team
- Template: Top rules, Accuracy, How to use

## Self-Checks

| Check | Assertion |
|-------|-----------|
| Optimal depth found | `1 <= optimal_depth <= 14` |
| Tree trained | `tree_optimal` exists |
| Not overfitting | `train_acc - test_acc < 0.20` |
| Fewer leaves than unconstrained | `tree_optimal.get_n_leaves() < tree_deep.get_n_leaves()` |

## Expected Outputs

- Optimal depth: typically 3–7
- Train-test gap: < 20%
- Tree visualization and text rules
- Feature importance ranking (tenure, orders, spend, etc.)

## TODO Blocks

1. **Find optimal depth** (section 4): Sweep depths, identify best test accuracy
2. **Stakeholder summary** (section 10): Write 3-bullet summary for support team

## Dependencies

- pandas
- numpy
- matplotlib
- sklearn (DecisionTreeClassifier, plot_tree, export_text, LogisticRegression, train_test_split, accuracy_score, classification_report, f1_score)
