# Module 6: Debug Drill Spec

**Title:** Great AUC, No Impact  
**Time:** ~15 minutes  
**Goal:** Find why a high-AUC model isn't delivering business value

---

## The Setup

> The data science team is confused: "Our model has 0.81 AUC—really good! But the retention team says they're not saving more customers than before."
>
> What's going wrong?

---

## The Investigation

```python
# Model info
print(f"AUC: {roc_auc_score(y_test, probabilities):.3f}")  # 0.812

# Business context
print(f"Retention team capacity: 200 contacts/week")
print(f"Previous method: Contact customers with support tickets")
print(f"New method: Contact model's top 200 predictions")

# Let's compare
```

---

## The Bug

```python
# ===== THE PROBLEM =====

# Model precision@200
top_200_model = y_test.iloc[np.argsort(probabilities)[-200:]]
model_precision = top_200_model.mean()
print(f"Model precision@200: {model_precision:.1%}")  # 28%

# Old heuristic precision
ticket_users = X_test[X_test['support_tickets_30d'] > 0]
heuristic_precision = y_test[ticket_users.index].mean()
print(f"Heuristic precision: {heuristic_precision:.1%}")  # 32%!

# ======================
```

**Output:**
```
Model precision@200: 28%
Heuristic precision: 32%
```

The simple heuristic actually beats the model at K=200!

### Why This Happens

AUC measures ranking across the ENTIRE distribution. The model might be great at distinguishing low-risk from medium-risk, but the business only cares about the top 200.

A model can have:
- Excellent overall AUC
- Mediocre performance in the top K

The heuristic ("has support tickets") is simple but very targeted at high-risk customers.

---

## The Fix

```python
# Option 1: Re-optimize for precision@K
from sklearn.model_selection import cross_val_score

def precision_at_k_scorer(y_true, y_prob, k=200):
    top_k = y_true.iloc[np.argsort(y_prob)[-k:]]
    return top_k.mean()

# Tune model specifically for top-K performance

# Option 2: Combine model with heuristic
# Use model for customers WITH tickets
ticket_customers = X_test[X_test['support_tickets_30d'] > 0]
model_probs_tickets = probabilities[ticket_customers.index]
top_200_combined = ticket_customers.index[np.argsort(model_probs_tickets)[-200:]]
combined_precision = y_test[top_200_combined].mean()
print(f"Combined precision@200: {combined_precision:.1%}")  # 38%!
```

**After fix:**
```
Combined precision@200: 38%
```

By using the model to RANK customers who already have tickets, we get the best of both worlds.

---

## What Learners Must Do

1. **Identify the symptom:** High AUC but no business impact

2. **Find the root cause:** Model underperforms heuristic at relevant K

3. **Understand why:** AUC ≠ precision@K

4. **Fix it:** Either re-optimize for K, or combine with heuristic

5. **Verify:** New approach beats old heuristic

---

## Self-Check

```python
# After implementing fix
assert combined_precision > heuristic_precision, \
    "Combined approach should beat pure heuristic"
assert combined_precision > model_precision, \
    "Combined approach should beat pure model"

print(f"✓ Fixed! Precision@200: {combined_precision:.1%} (was {model_precision:.1%})")
```

---

## Postmortem Template

**Symptom:**
> Model had 0.81 AUC but retention team saw no improvement over their old approach.

**Root cause:**
> AUC measures overall ranking quality, not performance at the specific K (200) the business cares about. The simple heuristic (support tickets) outperformed the model in the top 200 despite lower overall AUC.

**Prevention:**
> Always evaluate at the business's operating point. If capacity is 200, report precision@200 and compare to existing methods. Don't assume AUC translates to every use case.
