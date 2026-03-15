# Decision Trees Cheatsheet

## The Core Idea

**Decision Tree = A flowchart of yes/no questions**

Each question splits data. Leaves = predictions.

---

## How Splits Are Chosen

**Gini Impurity:** How mixed is a node?
```
Gini = 1 - p₀² - p₁²
```
- Gini = 0: Pure (all one class)
- Gini = 0.5: Maximum mix (50/50)

**Best split** = maximizes information gain:
```
Gain = Gini(parent) - weighted_avg(Gini(children))
```

---

## Key Parameters

| Parameter | What It Does | Start With |
|-----------|--------------|------------|
| `max_depth` | Limits tree height | 3-5 |
| `min_samples_leaf` | Min samples in leaf | 5-20 |
| `min_samples_split` | Min samples to split | 10-50 |

**Rule of thumb:** Start shallow, increase depth until test accuracy stops improving.

---

## Overfitting Signals

| Sign | What It Means |
|------|---------------|
| Train 98%, Test 72% | Memorizing noise |
| # leaves ≈ # samples | Way too complex |
| Tree changes with small data changes | Unstable |

**Fix:** Reduce `max_depth`, increase `min_samples_leaf`

---

## Trees vs Logistic Regression

| Trees | Logistic |
|-------|----------|
| Non-linear boundaries | Linear only |
| Interpretable rules | Coefficients |
| High overfit risk | Low overfit risk |
| Unstable | Stable |

---

## Quick Code

```python
from sklearn.tree import DecisionTreeClassifier
from sklearn.tree import plot_tree
import matplotlib.pyplot as plt

# Fit
tree = DecisionTreeClassifier(
    max_depth=4,
    min_samples_leaf=10
)
tree.fit(X_train, y_train)

# Evaluate
train_acc = tree.score(X_train, y_train)
test_acc = tree.score(X_test, y_test)
print(f"Train: {train_acc:.1%}, Test: {test_acc:.1%}")

# Visualize
plt.figure(figsize=(20, 10))
plot_tree(tree, feature_names=X.columns, 
          class_names=['No', 'Yes'], filled=True)
plt.show()

# Feature importance
for name, imp in zip(X.columns, tree.feature_importances_):
    print(f"{name}: {imp:.3f}")
```

---

## Business Translation Scripts

**Explaining predictions:**
> "This customer is high-risk because: tenure < 30 days AND support tickets > 2. We've seen 73% of similar customers churn."

**Justifying complexity:**
> "The model uses 8 rules. More rules would catch a few more churners but make it impossible for the team to remember the patterns."

**On accuracy:**
> "The model correctly identifies 78% of churners. It works like a checklist the support team can follow."
