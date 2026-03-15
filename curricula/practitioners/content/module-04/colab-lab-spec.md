# Colab Lab Spec: Module 04 - Logistic Regression for Churn Prediction

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/module_04_logistic_regression.ipynb` |
| Runtime | ~45 minutes |
| Dataset | StreamCart customers |
| Target | `churn_30d` |

## Learning Objectives

After completing this lab, learners will be able to:
1. Fit logistic regression and interpret coefficients as odds ratios
2. Understand why accuracy is misleading for imbalanced classes
3. Get and visualize probability distributions by actual class
4. Find the cost-optimal classification threshold given business costs
5. Communicate churn model results to the retention team

## Sections

### 1. Setup + Load Data (5 min)
- Import libraries (sklearn, pandas, matplotlib)
- Load StreamCart customers from GitHub URL
- Check churn rate and class balance
- **Self-check:** Note if churn rate < 20% (imbalanced)

### 2. Train-Test Split (2 min)
- Stratified 70/30 split
- Verify churn rate preserved in train and test

### 3. Baseline: Always Predict Majority Class (3 min)
- Predict "no churn" for everyone
- Compute accuracy, precision, recall, F1
- **Self-check:** Baseline recall is 0%—we catch zero churners

### 4. Fit Logistic Regression (5 min)
- Fit model with features: tenure_days, orders_total, total_spend, support_tickets_total, avg_order_value
- Print intercept and coefficients with odds ratios
- Interpret: positive coef → increases churn probability

### 5. Get Probabilities (5 min)
- Get `predict_proba` for class 1 (churn)
- Histogram: probability distributions by actual class (retained vs churned)
- Threshold line at 0.5
- **Interpretation:** Good model = retained peaks left, churned peaks right

### 6. Evaluate with Default Threshold (0.5) (5 min)
- Predict with threshold 0.5
- Print accuracy, precision, recall, F1, AUC
- Confusion matrix (TN, FP, FN, TP)

### 7. TODO: Find the Optimal Threshold (10 min)
- Business context: FP cost = $50 (wasted offer), FN cost = $200 (lost customer)
- Sweep thresholds 0.1–0.9, compute cost at each
- Find threshold that minimizes total cost
- **TODO:** Run sweep and identify optimal threshold
- **Self-check:** Optimal threshold < 0.5 (since FN costs more than FP)

### 8. Visualize the Tradeoff (3 min)
- Plot precision, recall, F1 vs threshold
- Plot total cost vs threshold with optimal marked

### 9. ROC Curve (3 min)
- Plot ROC curve with AUC
- Compare to random (AUC = 0.5)

### 10. Final Evaluation with Optimal Threshold (2 min)
- Apply optimal threshold to get final predictions
- Classification report
- Business impact comparison: baseline vs default vs optimal cost

### 11. Stakeholder Summary (5 min)
- **TODO:** Write 3-bullet summary (~100 words) for retention team
- Template: What it does, Performance (precision/recall), Recommendation

## Self-Checks

| Check | Assertion |
|-------|-----------|
| Cost function works | `calculate_total_cost(y_test, default_preds) > 0` |
| Optimal threshold found | `optimal_threshold` exists |
| Optimal differs from default | `optimal_threshold != 0.5` |
| Optimal below 0.5 (FN > FP cost) | `optimal_threshold < 0.5` |
| Optimal reduces cost | `optimal_cost <= default_cost` |

## Expected Outputs

- AUC: ~0.6–0.85
- Optimal threshold: typically 0.25–0.45 (below 0.5)
- Cost savings vs default: positive
- Precision/recall tradeoff visible in plots

## TODO Blocks

1. **Find optimal threshold** (section 7): Run threshold sweep, identify cost-minimizing threshold
2. **Stakeholder summary** (section 11): Write 3-bullet summary for retention team

## Dependencies

- pandas
- numpy
- matplotlib
- sklearn (LogisticRegression, train_test_split, metrics: accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, classification_report, roc_auc_score, roc_curve)
