# Module 1: Debug Drill Spec

**Title:** The Suspiciously Good Churn Model  
**Time:** ~15 minutes  
**Goal:** Find two bugs in a problem framing that cause unrealistic performance

---

## The Setup

Present learners with this scenario:

> A junior data scientist on your team built a churn prediction model. They're excited because it has **0.97 AUC** on the test set. They want to deploy it immediately.
>
> You're skeptical. Real churn models usually get 0.70-0.85 AUC. Something's off.
>
> Find the bugs.

---

## The Buggy Code

```python
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import roc_auc_score

# Load data (same StreamCart dataset)
df = load_streamcart_data()

# ===== BUG 1 IS HERE =====
# Define the label
df['churned'] = (df['subscription_status'] == 'canceled').astype(int)
# ========================

# ===== BUG 2 IS HERE =====
# Select features
features = [
    'tenure_months',
    'logins_last_7d',
    'logins_last_30d',
    'support_tickets_last_30d',
    'items_skipped_last_3_boxes',
    'cancel_reason_encoded',  # <-- Encoded version of cancel_reason
]
# ========================

# Encode cancel_reason
df['cancel_reason_encoded'] = df['cancel_reason'].fillna('none').astype('category').cat.codes

# Prepare data
X = df[features]
y = df['churned']

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict_proba(X_test)[:, 1]
auc = roc_auc_score(y_test, y_pred)

print(f"AUC: {auc:.3f}")  # Prints: AUC: 0.970
```

---

## The Two Bugs

### Bug 1: Wrong Label Definition

**The bug:**
```python
df['churned'] = (df['subscription_status'] == 'canceled').astype(int)
```

**The problem:**
This labels someone as "churned" if they've EVER canceled. But you want to predict FUTURE churn—who will cancel in the next 30 days. This label includes people who canceled months ago. The model is predicting the past, not the future.

**The fix:**
```python
snapshot_date = datetime(2024, 6, 1)
df['churned'] = (
    (df['subscription_status'] == 'canceled') & 
    (df['cancel_date'] >= snapshot_date) &
    (df['cancel_date'] <= snapshot_date + timedelta(days=30))
).astype(int)
```

**Why it matters:**
In production, you'd make predictions on June 1 and want to know who will cancel by July 1. The original label tells you who already canceled at any point in history—useless for targeting future interventions.

---

### Bug 2: Feature Leakage

**The bug:**
```python
'cancel_reason_encoded',  # <-- Encoded version of cancel_reason
```

**The problem:**
`cancel_reason` only exists AFTER someone cancels. If you're trying to predict whether someone will churn, you can't use information that only exists after they've already churned. This is textbook leakage.

**The fix:**
Remove `cancel_reason_encoded` from the feature list:

```python
features = [
    'tenure_months',
    'logins_last_7d',
    'logins_last_30d',
    'support_tickets_last_30d',
    'items_skipped_last_3_boxes',
    # cancel_reason_encoded REMOVED
]
```

**Why it matters:**
The model learned "if cancel_reason is not null, predict churn = 1." This works perfectly on historical data (because cancel_reason is filled when someone churns) but is useless in production (where you don't know cancel_reason yet).

---

## What Learners Must Do

1. **Identify Bug 1:** The label definition is wrong
   - Should predict future churn (next 30 days), not historical churn (ever canceled)
   
2. **Identify Bug 2:** There's a leaky feature
   - `cancel_reason` doesn't exist at prediction time

3. **Fix both bugs** and re-run the model

4. **Observe the realistic AUC** (~0.72-0.78 after fixes)

5. **Write a 3-bullet postmortem:**
   - What went wrong?
   - How did you detect it?
   - How do you prevent this in the future?

---

## Self-Check After Fixes

```python
# After fixing bugs, run this check:

# Check 1: Label should be forward-looking
assert df['churned'].mean() < 0.15, \
    "30-day churn rate should be much lower than overall churn rate"

# Check 2: No leaky features
assert 'cancel_reason' not in str(features).lower(), \
    "cancel_reason is leakage—remove it"

# Check 3: AUC should be realistic
assert auc < 0.90, \
    f"AUC of {auc:.2f} is suspiciously high. Real churn models typically get 0.70-0.85"

print("✓ Bugs fixed! Your model is now realistic.")
print(f"New AUC: {auc:.3f}")
```

---

## Postmortem Template

After fixing the bugs, learners write:

> **What went wrong?**
> [Their answer]
>
> **How did you detect it?**
> [Their answer—should mention suspiciously high AUC]
>
> **How do you prevent this in the future?**
> [Their answer—should mention checking label definitions and auditing features for leakage]

---

## Expected Output After Fix

- AUC drops from 0.97 to ~0.74
- 30-day churn rate is ~8-12% (vs. overall churn rate of ~25%)
- Model still works, just with realistic performance
