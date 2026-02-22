# Module 2: Debug Drill Spec

**Title:** The Backwards Coefficient  
**Time:** ~15 minutes  
**Goal:** Find why a coefficient has the wrong sign

---

## The Setup

Present learners with this scenario:

> A data scientist trained a logistic regression model to predict churn. When they print the coefficients, something looks wrong:
>
> ```
> tenure_months:           +0.34  (more tenure = MORE churn??)
> logins_last_7d:          -0.28
> support_tickets_last_30d: +0.65
> ```
>
> Tenure should be protective—longer customers should be LESS likely to churn. But the coefficient is positive, suggesting the opposite.
>
> Find the bug.

---

## The Buggy Code

```python
import pandas as pd
from sklearn.linear_model import LogisticRegression

# Load data
df = load_streamcart_data()

# ===== BUG IS HERE =====
# Define features
features = [
    'tenure_months',
    'logins_last_7d',
    'support_tickets_last_30d',
    'months_until_anniversary'  # <-- This is the problem
]
# =======================

X = df[features].fillna(0)
y = df['churn_30d']

# Train model
model = LogisticRegression()
model.fit(X, y)

# Print coefficients
for feature, coef in zip(features, model.coef_[0]):
    print(f"{feature:30} {coef:+.3f}")
```

**Output:**
```
tenure_months                  +0.342
logins_last_7d                 -0.281
support_tickets_last_30d       +0.654
months_until_anniversary       -0.558
```

---

## The Bug

### Problem: Multicollinearity from redundant features

`tenure_months` and `months_until_anniversary` are perfectly correlated (inversely). If someone has 12 months tenure and subscriptions are annual, they have 0 months until anniversary. If they have 1 month tenure, they have 11 months until anniversary.

```
tenure_months + months_until_anniversary = 12 (always, for annual subscriptions)
```

When two features are perfectly (or highly) correlated, logistic regression can't separate their effects. The coefficients become unstable and can flip signs.

**What happened:**
- The model "decided" to give `months_until_anniversary` a negative coefficient (-0.558)
- To compensate, it flipped `tenure_months` to positive (+0.342)
- The net effect is similar, but individual coefficients are misleading

---

## The Fix

Remove one of the correlated features:

```python
# Fixed features - removed months_until_anniversary
features = [
    'tenure_months',
    'logins_last_7d',
    'support_tickets_last_30d',
    # 'months_until_anniversary'  # REMOVED - redundant with tenure
]
```

After fixing:
```
tenure_months                  -0.189  ← Now correctly negative!
logins_last_7d                 -0.281
support_tickets_last_30d       +0.654
```

---

## What Learners Must Do

1. **Identify the bug:** Recognize that `months_until_anniversary` is redundant with `tenure_months`

2. **Understand why it happens:** Multicollinearity causes unstable coefficients

3. **Fix it:** Remove the redundant feature

4. **Verify:** Confirm tenure coefficient is now negative (as expected)

5. **Write a 3-bullet postmortem:**
   - What was the symptom?
   - What was the root cause?
   - How do you prevent this in the future?

---

## Self-Check After Fix

```python
# After removing months_until_anniversary, run this check:

tenure_coef = model.coef_[0][features.index('tenure_months')]

assert tenure_coef < 0, \
    f"Tenure coefficient should be negative, got {tenure_coef:.3f}"
    
print("✓ Bug fixed! Tenure now correctly shows negative relationship with churn.")
```

---

## Bonus Challenge

**How to detect multicollinearity before it causes problems:**

```python
# Check correlation matrix
import seaborn as sns
import matplotlib.pyplot as plt

correlation_matrix = df[features].corr()
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0)
plt.title("Feature Correlations")
plt.show()

# Flag correlations > 0.8 or < -0.8
high_corr = (correlation_matrix.abs() > 0.8) & (correlation_matrix != 1.0)
if high_corr.any().any():
    print("⚠️ Warning: High correlations detected!")
```

---

## Postmortem Template

**Symptom:**
> Tenure coefficient was positive (+0.34) when it should be negative (longer tenure = lower churn risk).

**Root cause:**
> Multicollinearity between `tenure_months` and `months_until_anniversary`. They're perfectly inversely correlated, so the model couldn't separate their effects and assigned unstable coefficients.

**Prevention:**
> Before training, check the correlation matrix for features with |correlation| > 0.8. Remove or combine redundant features. Use VIF (variance inflation factor) for systematic detection.
