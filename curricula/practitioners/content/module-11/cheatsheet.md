# Regularization Cheatsheet

## Core Idea

```
Total Loss = Data Loss + λ × Complexity Penalty
```

Higher λ = more regularization = simpler model

---

## L1 vs L2

| Aspect | L1 (Lasso) | L2 (Ridge) |
|--------|------------|------------|
| Penalty | Σ\|w\| | Σw² |
| Effect | Zeros out weights | Shrinks weights |
| Feature selection | Yes | No |
| Correlated features | Picks one arbitrarily | Keeps all |
| Use when | Many irrelevant features | Most features useful |

---

## sklearn Parameters

| Model | Parameter | Higher = |
|-------|-----------|----------|
| Ridge, Lasso | `alpha` | More regularization |
| LogisticRegression | `C` | LESS regularization |

⚠️ **C = 1/lambda** (inverse!)

---

## Quick Code

```python
from sklearn.linear_model import Ridge, Lasso, RidgeCV, LassoCV
from sklearn.preprocessing import StandardScaler

# ALWAYS scale first
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_train)

# Find best alpha via CV
lasso_cv = LassoCV(cv=5)
lasso_cv.fit(X_scaled, y_train)
print(f"Best alpha: {lasso_cv.alpha_}")

# Use best alpha
model = Lasso(alpha=lasso_cv.alpha_)
```

---

## Choosing λ

| λ Value | Effect |
|---------|--------|
| Too small | Overfitting (high variance) |
| Too large | Underfitting (high bias) |
| Just right | Generalization |

**Always use cross-validation!**

---

## Red Flags

| Flag | Cause | Fix |
|------|-------|-----|
| Train >> Test error | Underfitting | Decrease λ |
| Train << Test error | Overfitting | Increase λ |
| Random feature selection | L1 + correlated features | Use L2 or Elastic Net |
| Different feature importances | Unscaled data | Scale first |

---

## Tree Regularization

Trees don't use L1/L2. Instead:
- `max_depth`: Limit depth
- `min_samples_leaf`: Minimum samples per leaf
- `early_stopping`: Stop when validation plateaus

---

## Business Translation

**Overfitting:** "Model memorized training data, can't handle new patterns"

**Regularization:** "Constraint preventing over-confidence in any feature"

**L1:** "Strict editor — cuts features entirely"

**L2:** "Gentle editor — softens all features"
