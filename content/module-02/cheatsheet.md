# Module 2 Cheat Sheet: Logistic Regression

---

## How It Works

```
Step 1: score = (weight₁ × feature₁) + (weight₂ × feature₂) + ... + bias

Step 2: probability = sigmoid(score) = 1 / (1 + e^(-score))
```

Large positive score → probability near 1 (will happen)  
Large negative score → probability near 0 (won't happen)  
Score near 0 → probability near 0.5 (coin flip)

---

## Reading Coefficients

| Coefficient | Meaning |
|-------------|---------|
| **Positive** (+) | Feature increases probability of outcome |
| **Negative** (-) | Feature decreases probability of outcome |
| **Larger magnitude** | Stronger effect |
| **Near zero** | Weak or no effect |

**Example:**
```
support_tickets:  +0.72  → More tickets = higher churn risk
tenure_months:    -0.25  → Longer tenure = lower churn risk
```

**Warning:** Compare magnitudes only if features are standardized (same scale).

---

## When to Use Logistic Regression

| ✅ Good fit | ❌ Not ideal |
|-------------|--------------|
| Need interpretable coefficients | Complex feature interactions |
| Limited data (<10K rows) | Non-linear patterns |
| Want a simple baseline | Tons of data (1M+ rows) |
| Relationships are roughly linear | Need absolute best accuracy |

**Default approach:** Start with logistic regression. Upgrade only if it's not good enough.

---

## Quick Code Reference

```python
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train
model = LogisticRegression()
model.fit(X_train, y_train)

# Predict probabilities
probs = model.predict_proba(X_test)[:, 1]

# Get coefficients
for feature, coef in zip(features, model.coef_[0]):
    print(f"{feature}: {coef:+.3f}")
```

---

## Common Mistakes

| Mistake | Symptom | Fix |
|---------|---------|-----|
| **Multicollinearity** | Coefficients flip signs unexpectedly | Check correlations, remove redundant features |
| **Unscaled features** | Can't compare coefficient magnitudes | Use StandardScaler |
| **Treating 51% like certainty** | Acting on borderline predictions | Use ranking, not thresholds |
| **Expecting magic** | "Only 0.71 AUC, need better model" | Check baselines first—0.71 might be good |

---

## Precision@K Formula

When you can only act on K customers:

```python
# Sort by probability (highest first)
top_k_indices = np.argsort(probabilities)[-k:]

# What fraction actually had the outcome?
precision_at_k = y_test.iloc[top_k_indices].mean()

# Compare to baseline
lift = precision_at_k / y_test.mean()
```

---

## Linear vs. Logistic

| | Linear Regression | Logistic Regression |
|---|-------------------|---------------------|
| **Predicts** | Continuous number | Probability [0, 1] |
| **Use for** | LTV, revenue, time | Churn yes/no, fraud yes/no |
| **Output** | weighted sum | sigmoid(weighted sum) |

---

## Coefficient Sanity Check

Before trusting coefficients, verify:

- [ ] Feature scales are similar (or standardized)
- [ ] No high correlations between features (< 0.8)
- [ ] Signs match intuition (tenure should be protective)
- [ ] No data leakage in features

If coefficients don't make sense, the model might be right but your intuition wrong—or there's a data problem.

---

## Decision Heuristic

```
Is logistic regression good enough?

       ┌─────────────────────────┐
       │ Does it beat baseline?  │
       └───────────┬─────────────┘
                   │
          ┌───────┴───────┐
          │               │
         YES              NO
          │               │
          ▼               ▼
   ┌──────────────┐  ┌──────────────┐
   │ Is business  │  │ Check data   │
   │ metric met?  │  │ quality &    │
   └──────┬───────┘  │ features     │
          │          └──────────────┘
     ┌────┴────┐
     │         │
    YES        NO
     │         │
     ▼         ▼
   Ship it   Try trees/
             boosting
```
