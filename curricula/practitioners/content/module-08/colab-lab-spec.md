# Colab Lab Spec: Module 08 - Regression Metrics

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/module_08_regression_metrics.ipynb` |
| Runtime | ~20 minutes |
| Dataset | Synthetic LTV (tenure, avg_order_value, orders_per_month) |
| Target | `ltv` |

## Learning Objectives

After completing this lab, learners will be able to:
1. Calculate and interpret MAE, RMSE, R², and MAPE for regression
2. Understand when to use MAE vs RMSE (outlier sensitivity)
3. Perform residual analysis (predicted vs actual, residuals vs predicted, distribution, Q-Q plot)
4. Compare model performance to a naive baseline (predict mean)
5. Analyze how outliers affect MAE vs RMSE differently
6. Conduct segmented analysis by customer value
7. Communicate regression performance to stakeholders

## Sections

### 1. Setup (2 min)
- Import numpy, pandas, matplotlib, sklearn (LinearRegression, metrics)
- **Self-check:** Libraries load

### 2. Generate Sample Data (3 min)
- Synthetic LTV: tenure_months, avg_order_value, orders_per_month
- Add outliers (high-value customers)
- **Self-check:** Dataset shape, describe

### 3. Train a Simple Model (3 min)
- Split train/test
- Fit LinearRegression
- Get predictions for train and test

### 4. Calculate All Metrics (5 min)
- MAE, RMSE, R², MAPE (with zero-division handling)
- RMSE/MAE ratio (flag if > 1.3 for outlier sensitivity)
- **Self-check:** RMSE >= MAE; R² in [-0.5, 1.0]

### 5. Residual Analysis (5 min)
- Four plots: Predicted vs Actual, Residuals vs Predicted, Residual distribution, Q-Q plot
- Mean residual, std, skewness
- **Self-check:** Mean residual near 0

### 6. Compare to Baseline (3 min)
- Baseline: predict training mean for everyone
- Compare MAE, RMSE to model
- **Self-check:** Model MAE < baseline MAE

### 7. Impact of Outliers (3 min)
- Identify outlier errors (> 2 std)
- Compare MAE/RMSE with and without outliers
- **Self-check:** RMSE more affected than MAE by outliers

### 8. TODO: Segmented Analysis (5 min)
- Create LTV segments (Low, Medium, High)
- segment_analysis(): MAE, RMSE, R² per segment
- **TODO:** Run and identify which segment has worst R²
- **Self-check:** Segment results table populated

### 9. Stakeholder Summary (3 min)
- **TODO:** Write 3-bullet summary (~100 words)
- Template: Model accuracy (MAE, R²), Segment performance, Business impact

### 10. Visualization for Stakeholders (3 min)
- MAE by value range; % within threshold ($25, $50, $100, $200)

## Self-Checks

| Check | Assertion |
|-------|-----------|
| MAE reasonable | `0 < test_metrics['mae'] < 500` |
| RMSE >= MAE | `test_metrics['rmse'] >= test_metrics['mae']` |
| R² in range | `-0.5 <= test_metrics['r2'] <= 1.0` |
| Model beats baseline | `test_metrics['mae'] < baseline_mae` |

## Expected Outputs

- MAE: ~$40-80 (depends on synthetic data)
- RMSE > MAE (outliers inflate RMSE)
- R²: ~0.5-0.9
- Model improves over baseline
- Residual plots: scatter, distribution, Q-Q
- Segment analysis: performance varies by LTV tier

## TODO Blocks

1. **Segmented analysis** (section 8): Run segment_analysis, interpret which segment struggles
2. **Stakeholder summary** (section 9): Write 3-bullet summary

## Dependencies

- numpy
- pandas
- matplotlib
- sklearn (LinearRegression, train_test_split, mean_absolute_error, mean_squared_error, r2_score)
- scipy (stats.probplot)
