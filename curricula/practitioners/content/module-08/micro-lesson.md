# Module 8: Regression Metrics - Measuring Prediction Quality

**Time:** 25-35 minutes

**Promise:** After this module, you'll know which regression metric to use when, how to interpret residuals, and how to communicate model performance to stakeholders.

---

## The Setup

You've built a model to predict customer lifetime value (LTV). It outputs predictions like $247.50, $1,892.00, $45.80.

But how good are these predictions? "Good" depends on:
- How far off are you on average?
- Are big errors worse than small ones?
- Are you systematically over or under-predicting?

Different metrics answer different questions.

---

## The Mental Models

### 1. The Ruler vs. The Penalty System

**MAE (Mean Absolute Error):** A ruler measuring average distance
- Every dollar of error counts equally
- Miss by $10 or $100 → both cost the same per dollar of error

**MSE/RMSE (Mean Squared Error / Root MSE):** A penalty system
- Big errors are penalized more
- Miss by $10 costs 100, miss by $100 costs 10,000
- RMSE brings it back to original units

**When this matters:**
- Predicting shipping times? MAE — missing by 2 days is twice as bad as 1 day
- Predicting financial risk? RMSE — big misses are catastrophic

### 2. The Explained Variance Meter

**R² (R-squared):** How much better than just guessing the average?

```
R² = 1 - (Your errors / Baseline errors)
```

| R² Value | Interpretation |
|----------|----------------|
| 1.0 | Perfect predictions |
| 0.8 | Explains 80% of variance |
| 0.5 | Explains 50% — decent |
| 0.0 | No better than predicting the mean |
| < 0 | Worse than predicting the mean! |

**The baseline test:** Always compare to "just predict the average."

### 3. The Residual Detective

**Residual = Actual - Predicted**

Residuals tell you *how* your model is wrong:
- Randomly scattered → Good! Errors are noise
- Curved pattern → Model is missing non-linear relationships
- Fan shape → Errors grow with predictions (heteroscedasticity)
- Clusters → Subgroups the model handles differently

---

## The Metrics

### MAE (Mean Absolute Error)

```python
MAE = (1/n) × Σ|actual - predicted|
```

**Interpretation:** "On average, predictions are off by $X"

**Pros:**
- Intuitive, in original units
- Robust to outliers
- Direct business interpretation

**Cons:**
- Doesn't penalize big errors extra
- Not differentiable at zero (optimization issue)

**Use when:** All errors matter equally, outliers shouldn't dominate.

### MSE (Mean Squared Error)

```python
MSE = (1/n) × Σ(actual - predicted)²
```

**Interpretation:** Average squared error (not in original units)

**Pros:**
- Mathematically convenient
- Penalizes large errors heavily
- Differentiable everywhere

**Cons:**
- Not in original units
- Sensitive to outliers
- Hard to interpret directly

**Use when:** Big errors are disproportionately bad; for optimization.

### RMSE (Root Mean Squared Error)

```python
RMSE = √MSE = √[(1/n) × Σ(actual - predicted)²]
```

**Interpretation:** "Typical" error magnitude, back in original units

**Pros:**
- In original units
- Penalizes large errors
- Standard deviation interpretation

**Cons:**
- Still sensitive to outliers
- RMSE ≥ MAE always (equality only if all errors identical)

**Use when:** You want squared-error behavior but interpretable units.

### R² (Coefficient of Determination)

```python
R² = 1 - (SS_residual / SS_total)
   = 1 - Σ(actual - predicted)² / Σ(actual - mean)²
```

**Interpretation:** Fraction of variance explained by the model

**Pros:**
- Scale-independent
- Intuitive (0 to 1 usually)
- Compares to baseline automatically

**Cons:**
- Can be negative (worse than baseline)
- Increases with more features (use Adjusted R² instead)
- Doesn't tell you if predictions are useful

**Use when:** Comparing models on the same data; communicating to stakeholders.

### MAPE (Mean Absolute Percentage Error)

```python
MAPE = (1/n) × Σ|actual - predicted| / |actual| × 100%
```

**Interpretation:** Average percentage error

**Pros:**
- Scale-independent
- Intuitive for business ("off by 15%")

**Cons:**
- Undefined when actual = 0
- Asymmetric (over-predicting by 50% ≠ under-predicting by 50%)

**Use when:** Predictions span orders of magnitude; percentages make sense.

---

## Quick Comparison

| Metric | Units | Outlier Sensitive | Best For |
|--------|-------|-------------------|----------|
| MAE | Original | Low | Robust average error |
| RMSE | Original | High | Penalizing big errors |
| R² | None | Medium | Comparing to baseline |
| MAPE | Percent | Medium | Different scales |

---

## Residual Analysis

The most underused diagnostic tool.

### Residuals vs. Predicted

**What to look for:**
- ✅ Random scatter around zero → Good model
- ❌ Curved pattern → Need non-linear terms
- ❌ Fan shape → Variance changes with prediction

### Residuals vs. Features

**What to look for:**
- ❌ Pattern with a feature → Model missed that relationship
- ❌ Different spread for categories → Subgroup differences

### Residual Distribution

**What to look for:**
- ✅ Bell-shaped, centered at zero → Assumptions met
- ❌ Skewed → Systematic over/under prediction
- ❌ Heavy tails → Outlier sensitivity

---

## Failure Modes

### 1. Optimizing the Wrong Metric

**Symptom:** Model looks great on RMSE, stakeholders are unhappy.

**The Problem:** Business cares about different errors differently.

**Example:** 
- Model minimizes RMSE
- But underestimating high-value customers costs more
- Should use asymmetric loss or weighted MAE

**Fix:** Define business cost of errors, create custom metric.

### 2. Ignoring the Baseline

**Symptom:** Celebrating MAE = $50.

**The Problem:** If the mean is $500 and std is $200, that's great. If mean is $55, that's terrible.

**Fix:** Always report R² or compare to naive baseline.

### 3. Misleading R² 

**Symptom:** R² = 0.95, model still useless.

**The Problem:** High R² doesn't mean predictions are accurate enough.

**Example:** Predicting house prices with R² = 0.95 but RMSE = $100K. For a $300K house, that's ±33% — often unusable.

**Fix:** Always pair R² with MAE/RMSE in business units.

### 4. Residual Patterns Ignored

**Symptom:** Good overall metrics, bad predictions for certain segments.

**The Problem:** Averaging hides systematic errors.

**Fix:** Plot residuals vs. predictions and vs. key features.

---

## Business Translation

### Communicating Error

**Don't say:** "The RMSE is 47.3 and R² is 0.78."

**Do say:** "On average, our predictions are within $50 of actual values, and we explain 78% of the variation in customer spending."

### Communicating Improvement

**Don't say:** "We reduced MSE from 2500 to 1800."

**Do say:** "We reduced typical prediction error from $50 to $42 — a 16% improvement. For 10,000 customers, that's $80K less total prediction error."

### Setting Expectations

**Don't say:** "The model is 78% accurate."

**Do say:** "For most customers, we predict within ±$50. For high spenders (top 10%), predictions can be off by ±$200. We're working on improving the high-value segment."

---

## Practice

### Before the Lab

Open the **Interactive Playground** (`playground_regression_metrics.html`):

1. Generate sample predictions with different error patterns
2. See how MAE vs RMSE respond to outliers
3. Add systematic bias — watch R² drop
4. Explore residual plots for different model failures

### Key Observations

- MAE and RMSE diverge when errors vary widely
- R² = 0 means you're no better than the mean
- Residual patterns reveal fixable model problems
- Same R² can mean very different real-world usefulness

---

## Quick Reference

### When to Use What

| Situation | Primary Metric | Secondary |
|-----------|----------------|-----------|
| All errors equally bad | MAE | R² |
| Big errors catastrophic | RMSE | MAE |
| Comparing models | R² | RMSE |
| Communicating to business | MAE + R² | % within threshold |
| Predictions span magnitudes | MAPE | MAE |

### Red Flags

| Flag | Meaning | Action |
|------|---------|--------|
| R² < 0 | Worse than baseline | Check for bugs, wrong features |
| RMSE >> MAE | Large outlier errors | Investigate extreme cases |
| Residual patterns | Model missing something | Add features or transforms |
| Great train, bad test | Overfitting | Regularize, reduce features |

---

## Done Checklist

- [ ] Understood MAE vs RMSE vs R² tradeoffs
- [ ] Explored metrics in the playground
- [ ] Analyzed residual patterns
- [ ] Connected metrics to business impact
- [ ] Completed the notebook lab
- [ ] Passed the quiz
