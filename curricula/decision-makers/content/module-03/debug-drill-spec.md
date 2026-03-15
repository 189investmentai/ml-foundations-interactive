# Module 3: Debug Drill Spec

**Title:** The High-Accuracy Flop  
**Time:** ~15 minutes  
**Goal:** Diagnose why 89% accuracy doesn't translate to business value

---

## The Setup

> A colleague deployed a churn model. "It has 89% accuracy!" they said.
>
> After a month, the retention team is frustrated:
> "We called 500 customers your model flagged as at-risk. Only 30 actually churned. That's worse than random!"

---

## The Buggy Code

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

model = RandomForestClassifier(n_estimators=100, max_depth=3, random_state=42)
model.fit(X_train, y_train)

# ===== BUG IS HERE =====
# Evaluating with accuracy on imbalanced data
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)

print(f"Accuracy: {accuracy:.1%}")
print("Ship it!")
# =======================
```

**Output:**
```
Accuracy: 89.0%
```

---

## The Bug

### Problem: Accuracy is the wrong metric for imbalanced data

Churn rate is ~11%. A dummy model that predicts "no churn" for everyone gets ~89% accuracy - the same as the trained model.

**Evidence:**
```python
dummy_predictions = np.zeros(len(y_test))  # Predict 0 for everyone
dummy_accuracy = accuracy_score(y_test, dummy_predictions)
# ~89% - nearly identical to the "real" model!
```

The business constraint is: the team can only call 500 customers per week. What matters is how many actual churners appear in those 500 calls - that's Precision@K, not accuracy.

---

## The Fix

Evaluate using Precision@K (precision in the top K predictions ranked by churn probability):

```python
def precision_at_k(y_true, y_proba, k):
    """Precision in top K predictions."""
    top_k_idx = np.argsort(y_proba)[-k:]
    return y_true.iloc[top_k_idx].mean()

y_proba = model.predict_proba(X_test)[:, 1]
p_at_500 = precision_at_k(y_test, y_proba, 500)
baseline = y_test.mean()
lift = p_at_500 / baseline

print(f"Precision@500: {p_at_500:.1%}")
print(f"Baseline (random): {baseline:.1%}")
print(f"Lift: {lift:.1f}x")
```

**After fix:**
```
Precision@500: ~18%  (vs 11% random baseline → ~1.6x lift)
```

Now the metric matches the business question: "Of the customers we call, how many are actually at risk?"

---

## What Learners Must Do

1. **Build the dummy baseline:** Predict no-churn for everyone, measure accuracy

2. **Spot the problem:** Dummy accuracy ≈ model accuracy → metric is useless

3. **Calculate the right metric:** Precision@K for the team's capacity

4. **Compare to baseline:** Compute lift over random

5. **Write a 3-bullet postmortem**

---

## Self-Check After Fix

```python
baseline = y_test.mean()
lift = precision_at_500 / baseline

assert lift > 1.5, f"Lift is only {lift:.1f}x - model isn't useful!"
print(f"✓ Precision@500 lift: {lift:.1f}x baseline")
```

---

## Postmortem Template

**Symptom:**
> Model showed 89% accuracy, but the retention team's top-500 call list was barely better than random - only 30 of 500 flagged customers actually churned.

**Root cause:**
> Accuracy is misleading on imbalanced data. With ~11% churn, predicting "no churn" for everyone already gets ~89%. The model was evaluated on a metric that doesn't reflect the business constraint (limited call capacity).

**Prevention:**
> Always match the metric to the business action. When capacity is limited (top-K targeting), use Precision@K and Lift over baseline. Report accuracy alongside a dummy baseline to expose whether the model adds value.
