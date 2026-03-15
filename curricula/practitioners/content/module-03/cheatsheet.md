# Linear Regression Cheatsheet

## The Equation

```
y = β₀ + β₁x₁ + β₂x₂ + ... + ε
```

| Symbol | Name | Meaning |
|--------|------|---------|
| y | Target | What you're predicting |
| β₀ | Intercept | Prediction when all features = 0 |
| β₁, β₂... | Coefficients | Change in y per 1-unit change in x |
| ε | Error term | What the model can't explain |

---

## Key Metrics

| Metric | Formula | Good Values | Business Translation |
|--------|---------|-------------|---------------------|
| **MAE** | mean(\|actual - pred\|) | Lower is better | "Predictions off by $X on average" |
| **RMSE** | √mean((actual - pred)²) | Lower is better | "Typical error (big misses hurt)" |
| **R²** | 1 - (SSE / SST) | 0 to 1 (higher = better) | "X% of variation explained" |

---

## Assumptions (The Contract)

| Assumption | Check | Fix If Violated |
|------------|-------|-----------------|
| **Linearity** | Scatter plot, residual plot | Transform features, use polynomials |
| **Independence** | Domain knowledge | Time-aware splits, mixed models |
| **Homoscedasticity** | Residuals vs predicted plot | Weighted regression, transform target |
| **Normality** | Histogram of residuals | Often okay to ignore, robust SEs |

---

## Red Flags

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| R² < 0 | Model worse than mean | Check for bugs, wrong features |
| R² > 0.95 | Data leakage | Audit features for target info |
| Coefficient sign wrong | Multicollinearity | Remove correlated features |
| Residuals show pattern | Non-linear relationship | Add polynomial terms or use trees |
| Huge coefficients | Scale mismatch | Standardize features |

---

## Quick Code

```python
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, r2_score

# Fit
model = LinearRegression()
model.fit(X_train, y_train)

# Coefficients
print(f"Intercept: {model.intercept_:.2f}")
for name, coef in zip(feature_names, model.coef_):
    print(f"{name}: {coef:+.2f}")

# Evaluate
y_pred = model.predict(X_test)
print(f"MAE: {mean_absolute_error(y_test, y_pred):.2f}")
print(f"R²: {r2_score(y_test, y_pred):.3f}")
```

---

## Business Translation Scripts

**Explaining the model:**
> "This model explains X% of why some customers spend more than others."

**Explaining a coefficient:**
> "Each [unit] increase in [feature] is associated with $Y [more/less] [target], holding other factors constant."

**Explaining accuracy:**
> "Our predictions are typically off by about $MAE."

**Explaining a prediction:**
> "Based on [key features], we estimate this customer will spend around $X."

---

## When to Use / Not Use

| Use Linear Regression When | Don't Use When |
|---------------------------|----------------|
| Target is continuous | Target is binary (use logistic) |
| Need interpretable coefficients | Need max accuracy only |
| Relationships roughly linear | Strong non-linear patterns |
| Quick baseline needed | Complex feature interactions |

---

## Debugging Checklist

- [ ] Baseline established (mean prediction)?
- [ ] Train/test split done correctly?
- [ ] No leaky features (future info)?
- [ ] Residual plot checked (no patterns)?
- [ ] Coefficient signs make sense?
- [ ] R² reasonable for domain (not too high)?
