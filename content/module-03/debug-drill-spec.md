# Module 3: Debug Drill Spec

**Title:** The Perfect Training Score  
**Time:** ~15 minutes  
**Goal:** Diagnose and fix overfitting in a decision tree

---

## The Setup

> A data scientist trained a decision tree to predict churn. They're excited:
> "Training AUC is 1.0—perfect predictions!"
>
> But when you check the test set, it's 0.61. Something is very wrong.

---

## The Buggy Code

```python
from sklearn.tree import DecisionTreeClassifier

# Load data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# ===== BUG IS HERE =====
# Train with no restrictions
tree = DecisionTreeClassifier()  # No max_depth, no min_samples
tree.fit(X_train, y_train)
# =======================

# Evaluate
train_probs = tree.predict_proba(X_train)[:, 1]
test_probs = tree.predict_proba(X_test)[:, 1]

train_auc = roc_auc_score(y_train, train_probs)
test_auc = roc_auc_score(y_test, test_probs)

print(f"Train AUC: {train_auc:.3f}")  # 1.000
print(f"Test AUC:  {test_auc:.3f}")   # 0.612
```

**Output:**
```
Train AUC: 1.000
Test AUC:  0.612
```

---

## The Bug

### Problem: Unrestricted tree depth causes overfitting

With no `max_depth` or `min_samples_leaf`, the tree grows until every training example is in its own leaf (or very small leaves). It memorized the training data perfectly.

**Evidence:**
```python
print(f"Number of leaves: {tree.get_n_leaves()}")
# Output: 2,847 leaves for 4,000 training samples!
```

That's nearly one leaf per customer. Not learning patterns—memorizing.

---

## The Fix

Add regularization to prevent overfitting:

```python
# Fixed: Add constraints to prevent overfitting
tree = DecisionTreeClassifier(
    max_depth=5,           # Limit tree depth
    min_samples_leaf=50,   # Require at least 50 samples per leaf
    min_samples_split=100  # Require 100 samples to make a split
)
tree.fit(X_train, y_train)
```

**After fix:**
```
Train AUC: 0.731
Test AUC:  0.708
Number of leaves: 18
```

The gap between train and test is now small—the tree learned generalizable patterns.

---

## What Learners Must Do

1. **Identify the symptom:** Perfect train, poor test = overfitting

2. **Find the cause:** No depth limit → tree memorized data

3. **Apply the fix:** Add `max_depth`, `min_samples_leaf`

4. **Verify:** Check that train/test gap is reduced

5. **Write a 3-bullet postmortem**

---

## Self-Check After Fix

```python
train_auc = roc_auc_score(y_train, tree.predict_proba(X_train)[:, 1])
test_auc = roc_auc_score(y_test, tree.predict_proba(X_test)[:, 1])

gap = train_auc - test_auc

assert gap < 0.1, f"Train-test gap is {gap:.2f}—still overfitting!"
assert tree.get_n_leaves() < 50, f"Too many leaves ({tree.get_n_leaves()})—still overfitting!"

print(f"✓ Overfitting fixed! Train: {train_auc:.3f}, Test: {test_auc:.3f}, Gap: {gap:.3f}")
```

---

## Postmortem Template

**Symptom:**
> Training AUC was perfect (1.0) but test AUC was poor (0.61)—a 0.39 gap indicating severe overfitting.

**Root cause:**
> DecisionTreeClassifier with no constraints grew until nearly every training sample had its own leaf. The tree memorized individual customers rather than learning patterns.

**Prevention:**
> Always set regularization parameters: `max_depth` (3-10 for most problems), `min_samples_leaf` (20-100), `min_samples_split`. Monitor train/test gap—if >0.1, you're probably overfitting.
