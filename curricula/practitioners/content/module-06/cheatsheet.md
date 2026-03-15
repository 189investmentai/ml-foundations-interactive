# Ensemble Methods Cheatsheet

## The Core Idea

**One tree:** High variance, overfit-prone
**Many trees:** Average out errors, more stable

---

## Bias-Variance Tradeoff

```
Total Error = Bias² + Variance + Noise
```

| Term | What it means | Caused by |
|------|---------------|-----------|
| **Bias** | Model is systematically wrong | Too simple |
| **Variance** | Predictions change with training data | Too complex |
| **Noise** | Irreducible randomness | The data itself |

**The Dartboard:**
- 🎯 **Low bias, low variance:** Darts clustered on bullseye
- ⬅️ **High bias, low variance:** Darts clustered but off-center
- 💥 **Low bias, high variance:** Darts scattered around bullseye
- 😱 **High bias, high variance:** Scattered and off-center

**Key insight:** Ensembles reduce variance without adding bias.

---

## Two Ensemble Strategies

### Bagging (Random Forest)
- Train trees in **parallel** on bootstrap samples
- **Reduces variance** (smooths boundaries)
- Hard to overfit
- Easy to tune

### Boosting (XGBoost/LightGBM)
- Train trees **sequentially**, each fixing prior errors
- **Reduces bias** (captures complex patterns)
- Can overfit
- Needs careful tuning

---

## When to Use What

| Scenario | Choice |
|----------|--------|
| Starting out | Random Forest |
| Max accuracy needed | Gradient Boosting |
| Interpretability needed | Fewer trees |
| Real-time inference | Limit tree count |

---

## Key Hyperparameters

### Random Forest
```python
RandomForestClassifier(
    n_estimators=100,    # Trees (100-500)
    max_depth=None,      # Let them grow
    min_samples_leaf=5,  # Prevent tiny leaves
)
```

### XGBoost/LightGBM
```python
XGBClassifier(
    n_estimators=100,    # Rounds
    max_depth=4,         # SHALLOW trees!
    learning_rate=0.1,   # Lower = need more rounds
    early_stopping=10,   # Prevent overfit
)
```

---

## Red Flags

| Sign | Problem | Fix |
|------|---------|-----|
| Train >> Test | Overfitting | Fewer trees, lower depth |
| Both low | Underfitting | More trees, higher depth |
| 1000 trees ≈ 100 trees | Diminishing returns | Stop at 100 |

---

## Feature Importance

Both methods rank features:
```python
importances = model.feature_importances_
sorted_idx = np.argsort(importances)[::-1]
```

---

## Business Translation

**Explaining ensembles:**
> "The model combines 100 decision rules and takes a vote. This makes predictions more stable and accurate."

**On accuracy gain:**
> "Using multiple models improved accuracy from 75% to 82%, catching 7% more churners."

**On complexity:**
> "More complex, but the accuracy gain is worth $50K/year in prevented churn."
