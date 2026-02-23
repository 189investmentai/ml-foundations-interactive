# Module 11: Regularization - Preventing Overfitting

**Time:** 25-35 minutes

**Promise:** After this module, you'll understand how regularization prevents overfitting, when to use L1 vs L2, and how to tune the regularization strength.

---

## The Setup

Your model memorizes training data perfectly but fails on new data. It learned the noise, not the signal.

This is overfitting. Regularization is the cure.

---

## The Mental Models

### 1. The Handcuff Analogy

Regularization puts constraints on model complexity:
- **No regularization:** Model can do anything → overfits
- **Light regularization:** Model has some freedom → learns signal
- **Heavy regularization:** Model is too constrained → underfits

Find the sweet spot where the model learns patterns but not noise.

### 2. The Penalty System

Regularization adds a penalty term to the loss function:

```
Total Loss = Data Loss + λ × Complexity Penalty
```

- **Data Loss:** How well predictions match training data
- **Complexity Penalty:** How "extreme" the model weights are
- **λ (lambda):** How much we care about simplicity

### 3. The Feature Selector (L1) vs. The Shrinker (L2)

**L1 (Lasso):** Pushes weights to exactly zero → feature selection
- Some coefficients become 0
- Model uses fewer features
- Good when many features are irrelevant

**L2 (Ridge):** Shrinks weights toward zero but not exactly → keeps all features
- All coefficients get smaller
- No coefficients become exactly 0
- Good when most features are somewhat useful

---

## The Math (Simplified)

### L1 Regularization (Lasso)

```
Total Loss = Data Loss + λ × Σ|weights|
```

Penalty = sum of absolute values of weights

**Effect:** Creates sparse models (many weights = 0)

### L2 Regularization (Ridge)

```
Total Loss = Data Loss + λ × Σ(weights²)
```

Penalty = sum of squared weights

**Effect:** Shrinks all weights but keeps them non-zero

### Elastic Net (L1 + L2)

```
Total Loss = Data Loss + λ₁ × Σ|weights| + λ₂ × Σ(weights²)
```

**Effect:** Combines benefits of both

---

## When to Use What

### Use L1 (Lasso) When:

- You have many features, suspect only some matter
- You want automatic feature selection
- Interpretability is important (fewer features to explain)
- Building initial models to identify important variables

### Use L2 (Ridge) When:

- Most features are probably useful
- Correlated features exist (L1 picks arbitrarily)
- You want stable coefficients
- Slight prediction accuracy improvement matters

### Use Elastic Net When:

- You're not sure which is better
- You have correlated features AND want sparsity
- You want the benefits of both

---

## Choosing λ (Regularization Strength)

### Too Small (λ → 0)

- Almost no regularization
- Model can overfit
- All features kept

### Too Large (λ → ∞)

- Extreme regularization
- Model underfits
- All weights shrink to near zero

### Just Right

- Balances fit and complexity
- Good generalization
- Found via cross-validation

### Cross-Validation Approach

```python
from sklearn.linear_model import LassoCV, RidgeCV

# Let sklearn find best lambda
model = LassoCV(cv=5)  # 5-fold CV
model.fit(X_train, y_train)
print(f"Best lambda: {model.alpha_}")
```

---

## Regularization in Practice

### For Linear/Logistic Regression

```python
from sklearn.linear_model import Ridge, Lasso, ElasticNet, LogisticRegression

# Ridge (L2)
ridge = Ridge(alpha=1.0)  # alpha = λ

# Lasso (L1)
lasso = Lasso(alpha=0.1)

# Elastic Net
elastic = ElasticNet(alpha=0.1, l1_ratio=0.5)  # mix of L1 and L2

# Logistic with L2 (default)
log_l2 = LogisticRegression(C=1.0)  # C = 1/λ (inverse!)

# Logistic with L1
log_l1 = LogisticRegression(penalty='l1', solver='saga', C=1.0)
```

### For Tree Models

Trees don't use L1/L2 regularization. Instead:
- `max_depth`: Limit tree depth
- `min_samples_leaf`: Require minimum samples per leaf
- `max_features`: Limit features per split
- Early stopping: Stop when validation performance decreases

### For Neural Networks

- **L2 (weight decay):** Shrink weights, prevent explosion
- **Dropout:** Randomly zero out neurons during training
- **Early stopping:** Stop before overfitting

---

## Early Stopping

A different form of regularization: stop training before the model overfits.

**How it works:**
1. Monitor validation loss during training
2. Stop when validation loss starts increasing
3. Use the model from before it started overfitting

```python
from sklearn.ensemble import GradientBoostingClassifier

gb = GradientBoostingClassifier(
    n_estimators=1000,
    validation_fraction=0.2,
    n_iter_no_change=10,  # Stop if no improvement for 10 rounds
    tol=0.001
)
```

---

## Failure Modes

### 1. Forgetting to Scale Features

**Symptom:** L1/L2 penalizes some features way more than others.

**The Problem:** Regularization penalizes large weights. Unscaled features have different coefficient magnitudes.

**Fix:** Always standardize features before applying regularization.

### 2. Using Default λ

**Symptom:** Model overfits or underfits.

**The Problem:** Default regularization strength rarely optimal.

**Fix:** Always tune λ via cross-validation.

### 3. L1 with Correlated Features

**Symptom:** Important correlated features get dropped.

**The Problem:** L1 arbitrarily picks one of correlated features.

**Fix:** Use Elastic Net or L2 when features are correlated.

### 4. Confusing C and Alpha

**Symptom:** Higher C gives worse regularization (it's the inverse!).

**The Problem:** sklearn uses different conventions.
- Ridge/Lasso: `alpha` = λ (higher = more regularization)
- LogisticRegression: `C` = 1/λ (higher = LESS regularization)

**Fix:** Remember: high alpha = high regularization; high C = low regularization.

---

## Business Translation

### Explaining Overfitting

**Don't say:** "The model has high variance and low bias."

**Do say:** "The model memorized the training data too well, including the random noise. Like studying only past exams word-for-word — you ace those exact questions but struggle with new ones."

### Explaining Regularization

**Don't say:** "We added an L2 penalty to the loss function."

**Do say:** "We added a constraint that prevents the model from being too confident about any single feature. It makes the model more robust to noise."

### Explaining L1 vs L2

**Don't say:** "L1 induces sparsity while L2 shrinks weights uniformly."

**Do say:** "L1 completely ignores features that don't help much — like a strict editor cutting unnecessary words. L2 keeps all features but reduces their influence — like an editor who softens rather than cuts."

---

## Practice

### Before the Lab

Open the **Interactive Playground** (`playground_regularization.html`):

1. See how L1 zeros out coefficients while L2 shrinks them
2. Watch the bias-variance tradeoff as you adjust λ
3. Observe train vs test error curves
4. Compare feature selection behavior

### Key Observations

- L1 creates sparse solutions (some weights = 0)
- L2 shrinks all weights but keeps them non-zero
- Too much regularization hurts train AND test error
- Too little regularization shows gap between train/test

---

## Quick Reference

### L1 vs L2 Summary

| Aspect | L1 (Lasso) | L2 (Ridge) |
|--------|------------|------------|
| Penalty | \|w\| | w² |
| Effect | Zeros out weights | Shrinks weights |
| Feature selection | Yes | No |
| Correlated features | Picks one | Keeps all |
| Interpretability | High | Medium |
| sklearn param | `alpha` | `alpha` |

### sklearn Parameters

| Model | Parameter | Higher Value = |
|-------|-----------|----------------|
| Ridge, Lasso | `alpha` | More regularization |
| LogisticRegression | `C` | LESS regularization |
| ElasticNet | `l1_ratio` | More L1 vs L2 |

### Tuning Checklist

1. ✅ Scale features first
2. ✅ Use cross-validation to find λ
3. ✅ Check if features should be selected (use L1)
4. ✅ Compare train vs validation performance
5. ✅ Consider Elastic Net if unsure

---

## Done Checklist

- [ ] Understood L1 vs L2 differences
- [ ] Explored regularization strength in playground
- [ ] Practiced cross-validation tuning
- [ ] Connected to overfitting prevention
- [ ] Completed the notebook lab
- [ ] Passed the quiz
