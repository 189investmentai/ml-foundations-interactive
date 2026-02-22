# Module 4: Colab Lab Spec

**Lab Title:** XGBoost in Action  
**Time:** ~20 minutes  
**Goal:** Train XGBoost, compare to random forest, understand early stopping

---

## Lab Structure

### Cell 1: Setup

```python
import pandas as pd
import numpy as np
import xgboost as xgb
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score
import matplotlib.pyplot as plt

df = load_streamcart_data()
features = ['tenure_months', 'logins_last_7d', 'logins_last_30d',
            'support_tickets_last_30d', 'items_skipped_last_3_boxes']

X = df[features].fillna(0)
y = df['churn_30d']

# Split into train/val/test
X_temp, X_test, y_temp, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
X_train, X_val, y_train, y_val = train_test_split(X_temp, y_temp, test_size=0.25, random_state=42)

print(f"Train: {len(X_train)}, Val: {len(X_val)}, Test: {len(X_test)}")
```

---

### Cell 2: TODO - Train XGBoost with Early Stopping

```python
# TODO: Train an XGBClassifier with:
# - n_estimators=500
# - learning_rate=0.05
# - max_depth=4
# - early_stopping_rounds=20

# xgb_model = ???
```

**Self-check:**
```python
assert xgb_model.best_iteration < 500, "Early stopping should have kicked in"
print(f"✓ Stopped at iteration {xgb_model.best_iteration}")
```

---

### Cell 3: Train Random Forest for Comparison

```python
rf_model = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
rf_model.fit(X_train, y_train)
```

---

### Cell 4: Compare Models

```python
# Predictions
xgb_probs = xgb_model.predict_proba(X_test)[:, 1]
rf_probs = rf_model.predict_proba(X_test)[:, 1]

# AUC comparison
xgb_auc = roc_auc_score(y_test, xgb_probs)
rf_auc = roc_auc_score(y_test, rf_probs)

print(f"Random Forest AUC: {rf_auc:.3f}")
print(f"XGBoost AUC:       {xgb_auc:.3f}")
print(f"Improvement:       {xgb_auc - rf_auc:+.3f}")
```

---

### Cell 5: TODO - Effect of Learning Rate

```python
# TODO: Train two more models with different learning rates
# Compare: learning_rate=0.3 vs 0.01

# model_fast = XGBClassifier(learning_rate=0.3, n_estimators=500, ...)
# model_slow = XGBClassifier(learning_rate=0.01, n_estimators=500, ...)
```

---

### Cell 6: Visualize Learning Curves

```python
# Plot training progress (if evals_result available)
results = xgb_model.evals_result()
plt.figure(figsize=(10, 5))
plt.plot(results['validation_0']['auc'], label='Validation AUC')
plt.xlabel('Number of Trees')
plt.ylabel('AUC')
plt.title('XGBoost Learning Curve')
plt.axvline(xgb_model.best_iteration, color='r', linestyle='--', label='Best iteration')
plt.legend()
plt.show()
```

---

### Cell 7: Feature Importance

```python
# Compare feature importance between models
xgb_imp = xgb_model.feature_importances_
rf_imp = rf_model.feature_importances_

comparison = pd.DataFrame({
    'feature': features,
    'xgboost': xgb_imp,
    'random_forest': rf_imp
}).sort_values('xgboost', ascending=False)

print(comparison)
```

---

### Cell 8: TODO - Precision@500

```python
# TODO: Calculate precision@500 for XGBoost
# Compare to random forest
```

---

### Cell 9: Reflection

```python
# Answer:
# 1. Did XGBoost beat random forest? By how much?
# 2. How many trees did early stopping save you?
# 3. Is the improvement worth the extra complexity for your use case?
```

---

## Expected Outputs

- XGBoost AUC: ~0.75-0.79
- Random Forest AUC: ~0.73-0.77
- Early stopping around iteration 100-200
- XGBoost slight improvement over RF (0.01-0.03)
