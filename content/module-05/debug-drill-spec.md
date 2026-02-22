# Module 5: Debug Drill Spec

**Title:** The 0.97 AUC Model  
**Time:** ~15 minutes  
**Goal:** Find the leaky feature

---

## The Setup

> A data scientist is thrilled: "Our churn model has 0.97 AUC! Best model we've ever built!"
>
> But when deployed, the model performs no better than random.
>
> Find the leaky feature.

---

## The Buggy Code

```python
# Feature engineering
df['tenure_months'] = (df['snapshot_date'] - df['signup_date']).dt.days / 30
df['logins_30d'] = df.groupby('user_id')['login_events_last_30d'].transform('sum')
df['support_tickets_30d'] = df['tickets_last_30d']

# ===== BUG IS HERE =====
df['subscription_status'] = df['current_status']  # Values: 'active', 'canceled', 'paused'
df['status_is_canceled'] = (df['subscription_status'] == 'canceled').astype(int)
# =======================

# Train model
features = ['tenure_months', 'logins_30d', 'support_tickets_30d', 'status_is_canceled']
X = df[features]
y = df['churn_30d']

model = RandomForestClassifier()
model.fit(X_train, y_train)

print(f"AUC: {roc_auc_score(y_test, model.predict_proba(X_test)[:, 1]):.3f}")
# Output: AUC: 0.972
```

---

## The Bug

### Problem: `status_is_canceled` is literally the outcome

`current_status == 'canceled'` means the customer has already churned. Using it to predict churn is circular—you're using the outcome to predict itself.

**Why it happens:** The data was extracted as of "today" (after many customers already canceled). `current_status` reflects their status at extraction time, not at prediction time.

**Why production fails:** At prediction time, you don't know future status. Active customers show `status='active'`, so the model's best feature is missing.

---

## The Fix

```python
# Remove the leaky feature
features = ['tenure_months', 'logins_30d', 'support_tickets_30d']
# DO NOT include status_is_canceled

# Alternative: Use status at snapshot time (if available)
# df['status_at_snapshot'] = get_status_at(df['user_id'], df['snapshot_date'])
```

**After fix:**
```
AUC: 0.742
```

A realistic result. Not as exciting, but actually useful.

---

## What Learners Must Do

1. **Identify the symptom:** 0.97 AUC is suspiciously high

2. **Find the leak:** `status_is_canceled` encodes the outcome

3. **Understand why:** Data reflects current state, not point-in-time state

4. **Fix it:** Remove the feature

5. **Verify:** New AUC is reasonable (0.70-0.80 range)

---

## Self-Check

```python
# After removing the leaky feature
assert 'status_is_canceled' not in features, "Remove the leaky feature!"

new_auc = roc_auc_score(y_test, model.predict_proba(X_test)[:, 1])
assert new_auc < 0.90, f"AUC {new_auc:.2f} is still suspiciously high"

print(f"✓ Leakage fixed. New AUC: {new_auc:.3f}")
```

---

## Postmortem Template

**Symptom:**
> Model achieved 0.97 AUC in testing but performed like random guessing in production.

**Root cause:**
> `status_is_canceled` feature used current subscription status, which equals the label (churn). The model learned "canceled means churn" which is circular—at prediction time, we don't know if they'll cancel.

**Prevention:**
> For every feature, ask: "Would I have this value BEFORE the outcome occurs?" Any feature that changes as a result of the outcome is leakage. Audit features by checking correlation with label—perfect correlation is a red flag.
