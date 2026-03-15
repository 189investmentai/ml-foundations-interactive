# Colab Lab Spec: Module 06 - Ensemble Methods for Churn Prediction

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/module_06_ensembles.ipynb` |
| Runtime | ~45 minutes |
| Dataset | StreamCart customers |
| Target | `churn_30d` |

## Learning Objectives

After completing this lab, learners will be able to:
1. Compare single trees, Random Forests, and Gradient Boosting for churn prediction
2. Understand bagging vs boosting and the bias-variance tradeoff
3. Observe diminishing returns as the number of trees increases
4. Use early stopping to prevent boosting overfitting
5. Extract and compare feature importance across ensemble methods
6. Communicate ensemble results to stakeholders

## Sections

### 1. Setup (2 min)
- Import pandas, numpy, matplotlib, sklearn (DecisionTree, RandomForest, GradientBoosting)
- Optional: XGBoost if available
- **Self-check:** Libraries load without error

### 2. Load and Prepare Data (5 min)
- Load StreamCart customers from GitHub URL
- Feature engineering: tenure_days, avg_order_value
- Features: tenure_days, orders_total, total_spend, support_tickets_total, avg_order_value
- Train-validation-test split (stratified)
- **Self-check:** Churn rate preserved in splits

### 3. Baseline: Single Decision Tree (3 min)
- Train DecisionTreeClassifier(max_depth=5)
- Report train, val, test accuracy
- **Self-check:** Note depth and leaves

### 4. Random Forest (5 min)
- Train RandomForestClassifier(n_estimators=100, min_samples_leaf=5)
- Report train, val, test accuracy
- **Self-check:** RF should match or beat single tree

### 5. TODO: Experiment with Number of Trees (10 min)
- Sweep n_trees: [1, 5, 10, 25, 50, 100, 200, 500]
- Plot train/val/test accuracy vs n_trees (log scale)
- **TODO:** Run experiment and observe diminishing returns
- **Self-check:** Accuracy typically plateaus around 50-100 trees

### 6. Gradient Boosting (5 min)
- Train XGBClassifier or GradientBoostingClassifier (n_estimators=100, max_depth=4, learning_rate=0.1)
- Report train, val, test accuracy

### 7. Early Stopping (5 min)
- Demonstrate overfitting: 500 rounds, depth 8, lr 0.3
- Fix with early_stopping_rounds=10 on validation set
- **Self-check:** Early stopping reduces train-test gap

### 8. Feature Importance Comparison (3 min)
- Plot feature importance for single tree, RF, and GB side-by-side
- **Self-check:** All models have non-empty feature_importances_

### 9. Final Model Comparison (3 min)
- Compare all models on test set (accuracy, F1, overfit gap)
- Classification report for best model

### 10. Stakeholder Summary (4 min)
- **TODO:** Write 3-bullet summary (~100 words) for leadership
- Template: Recommendation (RF vs GB), Performance, Key drivers

## Self-Checks

| Check | Assertion |
|-------|-----------|
| RF matches or beats tree | `rf_acc >= tree_acc - 0.02` |
| GB matches or beats tree | `gb_acc >= tree_acc - 0.02` |
| Feature importances exist | `len(rf.feature_importances_) > 0` |
| n_trees experiment complete | `len(rf_results_df) > 0` |

## Expected Outputs

- Single tree: ~70-80% test accuracy
- Random Forest: typically 2-5% improvement over single tree
- Gradient Boosting: comparable or slightly better than RF
- Feature importance: top drivers (e.g., tenure, total_spend, support_tickets)
- n_trees plot: plateau around 50-100 trees

## TODO Blocks

1. **Experiment with number of trees** (section 5): Run n_trees sweep, visualize results
2. **Stakeholder summary** (section 10): Write 3-bullet summary for leadership team

## Dependencies

- pandas
- numpy
- matplotlib
- sklearn (DecisionTreeClassifier, RandomForestClassifier, GradientBoostingClassifier, train_test_split, accuracy_score, f1_score, classification_report)
- xgboost (optional, recommended)
