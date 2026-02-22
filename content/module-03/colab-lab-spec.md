# Module 3: Colab Lab Spec

**Lab Title:** Trees and Forests  
**Time:** ~20 minutes  
**Goal:** Train trees, visualize decisions, compare to logistic regression

---

## Lab Structure

### Cell 1: Setup

```python
import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier, plot_tree
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score
import matplotlib.pyplot as plt

df = load_streamcart_data()

features = ['tenure_months', 'logins_last_7d', 'logins_last_30d',
            'support_tickets_last_30d', 'items_skipped_last_3_boxes']

X = df[features].fillna(0)
y = df['churn_30d']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
```

---

### Cell 2: TODO - Train a Single Decision Tree

```python
# TODO: Train a decision tree with max_depth=3
# tree_model = ???
```

**Self-check:**
```python
assert hasattr(tree_model, 'tree_'), "Model not trained"
print(f"✓ Tree trained with {tree_model.tree_.node_count} nodes")
```

---

### Cell 3: Visualize the Tree

```python
plt.figure(figsize=(20, 10))
plot_tree(tree_model, feature_names=features, filled=True, rounded=True, fontsize=10)
plt.title("Churn Decision Tree")
plt.tight_layout()
plt.show()
```

---

### Cell 4: TODO - Interpret the First Split

```python
# Look at your tree visualization and answer:
# 1. What feature did the tree split on first?
# 2. What was the threshold?
# 3. Why do you think this was chosen?

# YOUR ANSWERS:
# first_split_feature = "???"
# first_split_threshold = ???
```

---

### Cell 5: TODO - Train a Random Forest

```python
# TODO: Train a random forest with 100 trees, max_depth=5
# rf_model = ???
```

**Self-check:**
```python
assert len(rf_model.estimators_) == 100, "Should have 100 trees"
print("✓ Random forest with 100 trees trained")
```

---

### Cell 6: Compare Models

```python
# Get predictions from each model
tree_probs = tree_model.predict_proba(X_test)[:, 1]
rf_probs = rf_model.predict_proba(X_test)[:, 1]

# Calculate AUC
tree_auc = roc_auc_score(y_test, tree_probs)
rf_auc = roc_auc_score(y_test, rf_probs)

print(f"Single Tree AUC:   {tree_auc:.3f}")
print(f"Random Forest AUC: {rf_auc:.3f}")
print(f"Improvement:       {rf_auc - tree_auc:.3f}")
```

---

### Cell 7: TODO - Feature Importance

```python
# TODO: Print feature importance from the random forest, sorted by importance

# for feature, importance in sorted(zip(features, rf_model.???), key=lambda x: -x[1]):
#     print(f"{feature:30} {importance:.3f}")
```

---

### Cell 8: Find High-Risk Segments

```python
# Which leaf nodes have highest churn?
# For single tree, look at each leaf

def get_leaf_stats(tree, X, y, feature_names):
    """Get churn rate for each leaf node"""
    leaf_ids = tree.apply(X)
    results = []
    for leaf_id in np.unique(leaf_ids):
        mask = leaf_ids == leaf_id
        count = mask.sum()
        churn_rate = y[mask].mean()
        results.append({'leaf_id': leaf_id, 'count': count, 'churn_rate': churn_rate})
    return pd.DataFrame(results).sort_values('churn_rate', ascending=False)

leaf_stats = get_leaf_stats(tree_model, X_train, y_train, features)
print("Leaf nodes by churn rate:")
print(leaf_stats.head())
```

---

### Cell 9: TODO - Precision@500

```python
# TODO: Calculate precision@500 for the random forest
# How many of the top 500 highest-probability customers actually churned?

# top_500_idx = ???
# precision_500 = ???

# print(f"Precision@500: {precision_500:.1%}")
# print(f"Baseline: {y_test.mean():.1%}")
# print(f"Lift: {precision_500 / y_test.mean():.1f}x")
```

---

### Cell 10: Reflection

```python
# Answer in comments:
# 1. Did the random forest beat the single tree? By how much?
# 2. Which feature was most important?
# 3. Look at the tree visualization—does the logic make business sense?
```

---

## Expected Outputs

- Single tree AUC: ~0.68-0.72
- Random forest AUC: ~0.73-0.77
- Top feature: likely support_tickets or tenure
- Precision@500: ~2.5-3x baseline
