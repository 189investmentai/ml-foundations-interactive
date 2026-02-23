# Module 3 Cheat Sheet: Decision Trees & Random Forests

---

## How Decision Trees Work

```
Ask yes/no questions until you reach a prediction.

        [tenure > 6?]
         /        \
       YES        NO
        |          |
  [tickets > 0?]  [skipped > 2?]
     /    \         /    \
   35%    5%      28%    12%
  churn  churn   churn  churn
```

Each split maximizes separation between classes.

---

## Key Hyperparameters

| Parameter | What it does | Typical values |
|-----------|--------------|----------------|
| `max_depth` | Limits tree depth | 3-10 |
| `min_samples_leaf` | Min samples per leaf | 20-100 |
| `min_samples_split` | Min samples to split | 50-200 |
| `n_estimators` | Number of trees (forest) | 100-500 |

**More restrictive = less overfitting, possibly less accuracy**

---

## Single Tree vs. Random Forest

| | Single Tree | Random Forest |
|---|-------------|---------------|
| **Interpretability** | High (can visualize) | Low (100 trees voting) |
| **Overfitting risk** | High | Low |
| **Accuracy** | Moderate | Higher |
| **Use when** | Need to explain | Need accuracy |

---

## Quick Code

```python
# Single tree
from sklearn.tree import DecisionTreeClassifier
tree = DecisionTreeClassifier(max_depth=5, min_samples_leaf=50)
tree.fit(X_train, y_train)

# Random forest
from sklearn.ensemble import RandomForestClassifier
rf = RandomForestClassifier(n_estimators=100, max_depth=5)
rf.fit(X_train, y_train)

# Feature importance
for feat, imp in zip(features, rf.feature_importances_):
    print(f"{feat}: {imp:.3f}")
```

---

## Overfitting Red Flags

| Signal | What it means |
|--------|---------------|
| Train AUC >> Test AUC | Tree memorized training data |
| Hundreds of leaf nodes | Too many tiny segments |
| First split on tiny group | Fitting to noise |

**Fix:** Increase `min_samples_leaf`, decrease `max_depth`

---

## Feature Importance Caveats

1. **Correlated features split importance** — Two similar features both look weak
2. **Doesn't show direction** — Only magnitude, not "increases or decreases churn"
3. **Can be unstable** — Different random seeds give different rankings

**Better alternative:** Permutation importance

```python
from sklearn.inspection import permutation_importance
perm_imp = permutation_importance(rf, X_test, y_test, n_repeats=10)
```

---

## When to Use What

```
START
  │
  ▼
Need interpretability? ──YES──► Single Tree (max_depth ≤ 5)
  │
  NO
  │
  ▼
Have complex interactions? ──YES──► Random Forest
  │
  NO
  │
  ▼
Logistic Regression might be enough
```

---

## Interaction Detection

Trees automatically find "Feature A AND Feature B" patterns:

```
Logistic regression: tenure + tickets (independent effects)
Decision tree:       tenure > 6 AND tickets > 0 (interaction!)
```

If you suspect interactions, try a tree first.
