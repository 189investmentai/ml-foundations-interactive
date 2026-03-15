# Colab Lab Spec: Module 03 - Linear Regression

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/module_03_linear_regression.ipynb` |
| Runtime | ~45 minutes |
| Dataset | StreamCart customers |
| Target | `total_spend` |

## Learning Objectives

After completing this lab, learners will be able to:
1. Establish a mean baseline for regression
2. Fit simple and multiple linear regression models
3. Interpret coefficients in business terms
4. Analyze residuals for model diagnostics
5. Communicate results to non-technical stakeholders

## Sections

### 1. Setup + Load Data (5 min)
- Import libraries
- Load StreamCart customers from GitHub URL
- Preview key columns: `tenure_months`, `total_spend`, `orders_total`

### 2. Baseline Model (5 min)
- Train/test split (80/20)
- Calculate mean of training target
- Compute baseline MAE and RMSE
- **Self-check:** Baseline MAE between $50-$500

### 3. Simple Linear Regression (10 min)
- Single feature: `tenure_months` → `total_spend`
- Fit with sklearn LinearRegression
- Print and interpret coefficient
- Visualize with scatter plot + regression line
- **Self-check:** Coefficient is positive

### 4. Multiple Linear Regression (10 min)
- Features: `tenure_months`, `logins_last_30d`, `orders_total`, `avg_order_value`
- Fit and compare R² to simple model
- Print all coefficients
- **Self-check:** R² improves over simple model

### 5. Residual Analysis (10 min)
- Calculate residuals (actual - predicted)
- Three plots:
  - Residuals vs predicted (check for patterns)
  - Histogram of residuals (check for normality)
  - Actual vs predicted (check for bias)
- Interpret what each plot tells us

### 6. Coefficient Interpretation Workshop (5 min)
- Create coefficient summary table with units
- Compare raw vs standardized coefficients
- **TODO:** Write business interpretation for one coefficient

### 7. Explain It to a PM (5 min)
- Summary statistics for stakeholders
- **TODO:** Write 150-250 word update including:
  - What the model predicts
  - How accurate it is
  - Key drivers
  - One recommendation

## Self-Checks

| Check | Assertion |
|-------|-----------|
| Baseline sanity | MAE between $50 and $500 |
| Simple model beats baseline | `simple_mae < baseline_mae` |
| Tenure coefficient positive | `model.coef_[0] > 0` |
| Multiple model improves R² | `multi_r2 > simple_r2` |

## Expected Outputs

- Baseline MAE: ~$100-150
- Simple model R²: ~0.3-0.5
- Multiple model R²: ~0.5-0.8
- All coefficients have sensible signs

## TODO Blocks

1. **Coefficient interpretation** (cell after section 6)
2. **PM update** (cell in section 7)

## Dependencies

- pandas
- numpy
- matplotlib
- sklearn (LinearRegression, train_test_split, metrics)
