# Colab Lab Spec: Module 11 - Regularization

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/module_11_regularization.ipynb` |
| Runtime | ~20 minutes |
| Dataset | Synthetic (200 samples, 20 features, 5 informative) |
| Target | Continuous (regression) |

## Learning Objectives

After completing this lab, learners will be able to:
1. Explain why scaling is required before L1/L2 regularization
2. Compare L1 (Lasso) vs L2 (Ridge) coefficient behavior and sparsity
3. Use cross-validation (RidgeCV, LassoCV) to find optimal alpha
4. Interpret regularization paths and train vs test error curves
5. Use Elastic Net to combine L1 and L2 benefits

## Sections

### 1. Setup (1 min)
- Import Ridge, Lasso, ElasticNet, RidgeCV, LassoCV, StandardScaler, train_test_split, mean_squared_error, r2_score

### 2. Part 1: Generate Data with Known Sparsity (2 min)
- Create 200×20 feature matrix; only first 5 features have non-zero true coefficients
- Generate target as linear combination + noise
- **Self-check:** Print true coefficients

### 3. Part 2: Split and Scale (2 min)
- Train/test split (70/30)
- Fit StandardScaler on train, transform both
- **Self-check:** Features scaled (mean=0, std=1)

### 4. Failure Mode Demo: Lasso Without Scaling (2 min)
- Show Lasso on unscaled data with varied feature scales
- Demonstrate wrong coefficients (scale affects which get zeroed)
- **Self-check:** Understand why scaling matters

### 5. Part 3: Compare L1 vs L2 (3 min)
- Fit Ridge and Lasso with alpha=0.1
- Visualize coefficient bars: Ridge keeps all, Lasso zeros some
- **Self-check:** Lasso has fewer non-zero coefficients

### 6. Part 4: Regularization Path (3 min)
- Sweep alphas from 1e-3 to 1e2
- Plot coefficient paths: Lasso hits zero; Ridge shrinks toward zero
- **Self-check:** Observe path behavior

### 7. Part 5: Finding Optimal Alpha via Cross-Validation (3 min)
- Use RidgeCV and LassoCV with 5-fold CV
- Report optimal alpha and test R²
- **Self-check:** Lasso selects subset of features

### 8. Part 6: Train vs Test Error Curve (3 min)
- Plot MSE vs alpha for Ridge and Lasso
- Mark CV-optimal alpha; show overfit (low alpha) vs underfit (high alpha)
- **Self-check:** Sweet spot minimizes test error

### 9. Part 7: TODO - Compare Feature Recovery (2 min)
- **TODO:** Compare Ridge vs Lasso recovery of true informative features
- Show true nonzero set vs Lasso selected set (correct, false positives, missed)

### 10. Part 8: TODO - Elastic Net (2 min)
- **TODO:** Try ElasticNetCV with l1_ratio in [0.1, 0.5, 0.9]
- Report features selected, R², optimal alpha for each

### 11. Stakeholder Summary (2 min)
- **TODO:** Write 3-bullet summary: what regularization does, recommendation, how we tuned

## Self-Checks

| Check | Assertion |
|-------|-----------|
| Ridge fitted | `hasattr(ridge, 'coef_')` |
| Lasso fitted | `hasattr(lasso, 'coef_')` |
| Lasso zeros coefficients | `(np.abs(lasso.coef_) < 0.01).sum() > 0` |

## Expected Outputs

- Ridge optimal alpha: typically 0.01–10
- Lasso optimal alpha: typically 0.01–10
- Lasso: 5–10 non-zero coefficients (of 20)
- Test R²: ~0.7–0.95 depending on alpha

## TODO Blocks

1. **Compare feature recovery** (Part 7) – Show true vs Ridge vs Lasso coefficients; analyze correct/incorrect selections
2. **Try Elastic Net with different l1_ratio** (Part 8) – Run ElasticNetCV for 0.1, 0.5, 0.9
3. **Write 3-bullet stakeholder summary** (Part 9) – Template: what regularization does, recommendation, tuning results

## Dependencies

- numpy, pandas, matplotlib
- sklearn: linear_model (Ridge, Lasso, ElasticNet, RidgeCV, LassoCV, ElasticNetCV), preprocessing (StandardScaler), model_selection (train_test_split), metrics (mean_squared_error, r2_score)
