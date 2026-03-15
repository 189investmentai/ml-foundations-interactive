# Colab Lab Spec: Module 10 - Feature Engineering

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/module_10_feature_engineering.ipynb` |
| Runtime | ~25 minutes |
| Dataset | Synthetic e-commerce (generated in-lab) |
| Target | `churn` |

## Learning Objectives

After completing this lab, learners will be able to:
1. Apply numeric transformations (log, standardization, min-max) to skewed and scaled features
2. Encode categorical variables (one-hot, ordinal, target encoding) and avoid leakage
3. Create engineered features (ratios, rates, derived indicators)
4. Detect and avoid data leakage in feature pipelines
5. Fit scalers and encoders on train only, then transform test

## Sections

### 1. Setup (1 min)
- Import numpy, pandas, matplotlib, sklearn (StandardScaler, MinMaxScaler, LabelEncoder, LogisticRegression, RandomForestClassifier, train_test_split, roc_auc_score)
- Set random seed and figure size

### 2. Part 1: Generate Sample E-commerce Data (3 min)
- Create 1000-row synthetic dataset with tenure_days, revenue, sessions, support_tickets, plan_type, region
- Generate churn target from logistic function of features
- **Self-check:** Print shape and churn rate

### 3. Part 2: Numeric Transformations (4 min)
- Visualize revenue distribution: original, log, standardized, min-max
- Compare skewness before/after log transform
- **Self-check:** Log transform reduces skewness

### 4. Part 3: Categorical Encoding (5 min)
- One-hot encode plan_type and region
- Ordinal encode plan_type (Basic=1, Premium=2, Enterprise=3)
- Demonstrate naive target encoding (leakage warning)
- Implement CV-based target encoding to avoid leakage
- **TODO:** Understand why CV target encoding is correct

### 5. Part 4: Feature Creation (3 min)
- Create revenue_per_session, ticket_rate, log_revenue, is_high_value, tenure_months
- **Self-check:** Describe engineered features

### 6. Part 5: Impact on Model Performance (4 min)
- Compare raw vs engineered features for Logistic Regression and Random Forest
- Split, scale (fit on train only), train, evaluate
- **Self-check:** Engineered features should add columns; results DataFrame exists

### 7. Part 6: Data Leakage Demo (3 min)
- Add fake "future_activity" feature that correlates with churn
- Train model with leaky feature, show suspiciously high AUC
- **Self-check:** `test_auc_leaky > 0.85`

### 8. Part 7: TODO - Correct Scaling Pipeline (3 min)
- **TODO:** Compare WRONG (fit scaler on all data before split) vs RIGHT (split first, fit scaler on train only)
- Run both pipelines and compare test AUC

### 9. Part 8: Stakeholder Summary (2 min)
- **TODO:** Write 3-bullet summary (~100 words) for PM: what we did, leakage avoided, impact

## Self-Checks

| Check | Assertion |
|-------|-----------|
| Engineered features add columns | `X_eng_train.shape[1] > X_raw_train.shape[1]` |
| Model comparison results exist | `'results' in dir() and len(results) >= 4` |
| Leaky model has suspicious AUC | `test_auc_leaky > 0.85` |

## Expected Outputs

- Churn rate: ~20–40%
- Log transform: skewness reduced (e.g., 2+ → <1)
- Leaky model AUC: >0.85 (suspicious)
- Raw vs engineered: typically improved AUC for logistic regression

## TODO Blocks

1. **Compare correct vs incorrect scaling** (cell after Part 7) – Implement WRONG (fit on all) vs RIGHT (fit on train) pipelines
2. **Write 3-bullet stakeholder summary** (Part 8) – Template: what we did, leakage avoided, impact

## Dependencies

- numpy, pandas, matplotlib
- sklearn: preprocessing (StandardScaler, MinMaxScaler, LabelEncoder), linear_model (LogisticRegression), ensemble (RandomForestClassifier), model_selection (train_test_split, KFold), metrics (roc_auc_score)
