# Cheat Sheet: Logistic Regression

## What It Does

Predicts probability (0-1) by weighing evidence for/against an outcome.

```python
from sklearn.linear_model import LogisticRegression
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)
probabilities = model.predict_proba(X_test)[:, 1]
```

## Interpreting Coefficients

| Coefficient | Meaning |
|---|---|
| Positive (+) | Increases probability of class 1 |
| Negative (-) | Decreases probability of class 1 |
| Larger magnitude | Stronger effect |
| Near zero | Weak or no effect |

```python
for feat, coef in zip(features, model.coef_[0]):
    direction = "increases" if coef > 0 else "decreases"
    print(f"{feat}: {coef:+.3f} ({direction} churn)")
```

## The Evidence Scale Mental Model

```
           CHURN                    STAY
    ←───────────────┼───────────────→
    [+] tickets     │     [-] tenure
    [+] low_nps     │     [-] logins
```

Positive weights push toward churn. Negative weights push toward stay.

## Key Assumptions

1. **Linear relationship** between features and log-odds
2. **No multicollinearity** (features shouldn't be highly correlated)
3. **Independent observations** (one customer = one row)

## Common Pitfalls

| Problem | Symptom | Fix |
|---|---|---|
| Multicollinearity | Coefficients flip sign, unstable | Remove correlated features |
| Unscaled features | Large features dominate | Use StandardScaler |
| Class imbalance | Predicts all majority class | Use `class_weight='balanced'` |

## When to Use Logistic Regression

**Good for:**
- Interpretability is important
- Need to explain to stakeholders
- Baseline model
- Small/medium datasets

**Not good for:**
- Complex non-linear patterns
- Feature interactions (unless manually created)
- Maximum predictive accuracy

## Quick Code Template

```python
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import roc_auc_score

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train
model = LogisticRegression(max_iter=1000, class_weight='balanced')
model.fit(X_train_scaled, y_train)

# Evaluate
probs = model.predict_proba(X_test_scaled)[:, 1]
print(f"AUC: {roc_auc_score(y_test, probs):.3f}")
```
