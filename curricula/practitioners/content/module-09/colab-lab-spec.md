# Colab Lab Spec: Module 09 - Classification Metrics

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/module_09_classification_metrics.ipynb` |
| Runtime | ~25 minutes |
| Dataset | Synthetic churn (10% churn rate) |
| Target | `churn` |

## Learning Objectives

After completing this lab, learners will be able to:
1. Recognize why accuracy is misleading on imbalanced data (the accuracy trap)
2. Interpret confusion matrix (TP, TN, FP, FN) and connect to business impact
3. Calculate and interpret precision, recall, and F1
4. Understand the precision-recall tradeoff across thresholds
5. Plot and interpret ROC and PR curves; use ROC-AUC and PR-AUC
6. Find cost-optimal threshold given business costs (FN vs FP)
7. Communicate classification metrics to stakeholders

## Sections

### 1. Setup (2 min)
- Import numpy, pandas, matplotlib, sklearn (LogisticRegression, metrics)
- **Self-check:** Libraries load

### 2. Generate Imbalanced Churn Data (3 min)
- Synthetic data: tenure, monthly_charges, support_tickets, usage_decline
- Churn rate ~10%
- **Self-check:** Churn distribution printed

### 3. Train Model and Get Probabilities (3 min)
- Fit LogisticRegression
- Get predict_proba for class 1; predict with default threshold 0.5
- **Self-check:** Actual vs predicted churner counts

### 4. The Accuracy Trap (3 min)
- Compare model accuracy vs naive "no churn" accuracy
- **Self-check:** Naive baseline gets ~90% accuracy but 0% recall

### 5. Confusion Matrix Deep Dive (3 min)
- Compute TN, FP, FN, TP
- Visualize confusion matrix
- **Self-check:** cm.shape == (2, 2)

### 6. Precision, Recall, and F1 (3 min)
- Calculate at threshold 0.5
- Interpretation: "When we flag, we're right X%"; "We catch X% of churners"
- **Self-check:** classification_report

### 7. The Threshold Effect (5 min)
- Sweep thresholds 0.1–0.9
- Plot precision, recall, F1 vs threshold
- Plot predicted positive count vs threshold
- **Self-check:** Lower threshold → higher recall, lower precision

### 8. ROC Curve and AUC (3 min)
- Plot ROC curve, compute ROC-AUC
- Plot PR curve, compute PR-AUC (Average Precision)
- **Self-check:** 0.5 <= roc_auc <= 1.0; 0 < pr_auc <= 1.0

### 9. TODO: Cost-Based Threshold Optimization (8 min)
- Set cost_fn (missed churner) and cost_fp (wasted outreach)
- Sweep thresholds, compute total cost at each
- Find optimal threshold
- Compare default (0.5) vs optimal
- **TODO:** Run cost sweep, identify optimal threshold
- **Self-check:** optimal_threshold in [0.05, 0.95]; cost reduced

### 10. Stakeholder Summary (3 min)
- **TODO:** Write 3-bullet summary (~100 words) for marketing team
- Template: Model quality (ROC-AUC), Recommended threshold, Expected impact

## Self-Checks

| Check | Assertion |
|-------|-----------|
| ROC-AUC valid | `0.5 <= roc_auc <= 1.0` |
| PR-AUC valid | `0 < pr_auc <= 1.0` |
| Confusion matrix 2x2 | `cm.shape == (2, 2)` |
| Optimal threshold reasonable | `0.05 <= optimal_threshold <= 0.95` |

## Expected Outputs

- ROC-AUC: ~0.6–0.9
- PR-AUC: typically lower than ROC-AUC on imbalanced data
- Optimal threshold: often < 0.5 when FN cost > FP cost
- Cost savings vs default 0.5: positive
- Precision-recall tradeoff visible in plots

## TODO Blocks

1. **Cost-based threshold optimization** (section 9): Set costs, run sweep, find optimal
2. **Stakeholder summary** (section 10): Write 3-bullet summary for marketing team

## Dependencies

- numpy
- pandas
- matplotlib
- sklearn (LogisticRegression, train_test_split, confusion_matrix, classification_report, precision_score, recall_score, f1_score, roc_curve, roc_auc_score, precision_recall_curve, average_precision_score)
