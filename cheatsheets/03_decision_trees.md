# Cheat Sheet: Decision Trees & Random Forests

## Decision Tree: 20 Questions

Each split asks a yes/no question to separate groups.

```python
from sklearn.tree import DecisionTreeClassifier, plot_tree
tree = DecisionTreeClassifier(max_depth=4, min_samples_leaf=50)
tree.fit(X_train, y_train)
```

## Key Hyperparameters

| Parameter | What it does | Typical values |
|---|---|---|
| `max_depth` | Limits tree depth | 3-10 |
| `min_samples_split` | Min samples to split a node | 20-100 |
| `min_samples_leaf` | Min samples in a leaf | 10-50 |

**Rule:** Shallower trees = less overfitting, more bias

## Random Forest: Wisdom of Crowds

Many trees vote together. Each tree sees random subset of data and features.

```python
from sklearn.ensemble import RandomForestClassifier
rf = RandomForestClassifier(
    n_estimators=100,      # Number of trees
    max_depth=6,           # Depth per tree
    min_samples_leaf=20,   # Min samples per leaf
    random_state=42
)
rf.fit(X_train, y_train)
```

## When to Use What

| Use Case | Decision Tree | Random Forest |
|---|---|---|
| Explainability needed | Yes | No |
| Best accuracy | No | Yes |
| Feature interactions | Automatic | Automatic |
| Speed | Fast | Slower |
| Overfitting risk | High | Lower |

## Feature Importance

```python
importance = pd.DataFrame({
    'feature': features,
    'importance': rf.feature_importances_
}).sort_values('importance', ascending=False)
```

**Interpretation:** Higher = feature is used more often in splits

## Overfitting Signs

| Sign | What's happening |
|---|---|
| Train AUC >> Test AUC | Tree memorized training data |
| Very deep trees | Too many specific rules |
| Few samples in leaves | Overfitting to noise |

## Visualization

```python
import matplotlib.pyplot as plt
from sklearn.tree import plot_tree

plt.figure(figsize=(20, 10))
plot_tree(tree, feature_names=features, 
          class_names=['Stay', 'Churn'],
          filled=True, rounded=True)
plt.show()
```

## Quick Comparison

```python
from sklearn.metrics import roc_auc_score

# Decision Tree
tree = DecisionTreeClassifier(max_depth=4)
tree.fit(X_train, y_train)
print(f"Tree AUC: {roc_auc_score(y_test, tree.predict_proba(X_test)[:,1]):.3f}")

# Random Forest
rf = RandomForestClassifier(n_estimators=100, max_depth=6)
rf.fit(X_train, y_train)
print(f"RF AUC: {roc_auc_score(y_test, rf.predict_proba(X_test)[:,1]):.3f}")
```

## Key Insight

Trees find **interactions automatically**:
- "High tenure alone = low risk"
- "High tenure + support tickets = HIGH risk"

Logistic regression can't do this without manual feature engineering.
