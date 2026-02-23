# Module 2: Colab Lab Spec

**Lab Title:** Your First Churn Model  
**Time:** ~20 minutes  
**Goal:** Train a logistic regression model and interpret what it learned

---

## Dataset

Same StreamCart dataset from Module 1 (5,000 subscribers with the `churn_30d` label created in Module 1).

---

## Lab Structure

### Cell 1: Setup

```python
# Load data and prepare features
import pandas as pd
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import roc_auc_score

# Load StreamCart data (pre-loaded)
df = load_streamcart_data()

# Features we'll use (no leakage!)
features = [
    'tenure_months',
    'logins_last_7d',
    'logins_last_30d',
    'support_tickets_last_30d',
    'items_skipped_last_3_boxes'
]

# Handle missing values
X = df[features].fillna(0)
y = df['churn_30d']

print(f"Dataset: {len(df)} customers, {y.mean():.1%} churn rate")
```

---

### Cell 2: Train/Test Split

```python
# Split the data: 80% train, 20% test
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print(f"Training set: {len(X_train)} customers")
print(f"Test set: {len(X_test)} customers")
```

---

### Cell 3: TODO - Train the Model

**Instructions:**
> Train a logistic regression model on the training data.

```python
# TODO: Create and train a LogisticRegression model
# model = ???
# model.fit(???, ???)
```

**Self-check:**

```python
assert hasattr(model, 'coef_'), "Model not trained—did you call .fit()?"
print("✓ Model trained!")
```

---

### Cell 4: TODO - Get Predictions

**Instructions:**
> Get predicted probabilities for the test set. Use `predict_proba` not `predict`.

```python
# TODO: Get churn probabilities for test set
# y_pred_proba = ???

# Hint: predict_proba returns two columns: [P(not churn), P(churn)]
# You want the second column (index 1)
```

**Self-check:**

```python
assert len(y_pred_proba) == len(y_test), "Wrong number of predictions"
assert y_pred_proba.min() >= 0 and y_pred_proba.max() <= 1, "Probabilities should be between 0 and 1"
print(f"✓ Predictions generated! Range: {y_pred_proba.min():.2f} to {y_pred_proba.max():.2f}")
```

---

### Cell 5: Evaluate with AUC

```python
# Calculate AUC
auc = roc_auc_score(y_test, y_pred_proba)
print(f"AUC: {auc:.3f}")

# Baseline comparison
baseline_auc = 0.50  # Random guessing
print(f"Improvement over random: {auc - baseline_auc:.3f}")
```

**Expected output:** AUC around 0.70-0.75

---

### Cell 6: TODO - Interpret Coefficients

**Instructions:**
> Print out the coefficients and interpret them. Which features push toward churn? Which push away?

```python
# TODO: Create a dataframe showing feature names and their coefficients
# Sort by coefficient value to see most important features

# coefficients_df = pd.DataFrame({
#     'feature': ???,
#     'coefficient': ???
# }).sort_values('coefficient', ascending=False)

# print(coefficients_df)
```

**Questions to answer in comments:**
1. Which feature has the strongest positive coefficient (increases churn)?
2. Which feature has the strongest negative coefficient (decreases churn)?
3. Do the directions make intuitive sense?

---

### Cell 7: Look at Specific Customers

```python
# Find a high-risk and low-risk customer
high_risk_idx = y_pred_proba.argmax()
low_risk_idx = y_pred_proba.argmin()

print("HIGH RISK CUSTOMER:")
print(X_test.iloc[high_risk_idx])
print(f"Churn probability: {y_pred_proba[high_risk_idx]:.1%}")
print()
print("LOW RISK CUSTOMER:")
print(X_test.iloc[low_risk_idx])
print(f"Churn probability: {y_pred_proba[low_risk_idx]:.1%}")
```

---

### Cell 8: TODO - Calculate Precision@500

**Instructions:**
> If we can only target 500 customers, how many would actually churn?

```python
# TODO: 
# 1. Sort test set by predicted probability (highest first)
# 2. Take top 500
# 3. Calculate what percentage actually churned

# top_500_indices = ???
# precision_at_500 = ???

# print(f"Precision@500: {precision_at_500:.1%}")
# print(f"Baseline (random): {y_test.mean():.1%}")
# print(f"Lift: {precision_at_500 / y_test.mean():.1f}x")
```

**Self-check:**

```python
assert precision_at_500 > y_test.mean(), \
    "Precision@500 should be higher than random baseline!"
print(f"✓ Your model is {precision_at_500 / y_test.mean():.1f}x better than random at top 500")
```

---

### Cell 9: Compare Customer Profiles

```python
# Create two hypothetical customers and compare predictions

customer_1 = pd.DataFrame([{
    'tenure_months': 2,
    'logins_last_7d': 0,
    'logins_last_30d': 2,
    'support_tickets_last_30d': 3,
    'items_skipped_last_3_boxes': 2
}])

customer_2 = pd.DataFrame([{
    'tenure_months': 18,
    'logins_last_7d': 5,
    'logins_last_30d': 20,
    'support_tickets_last_30d': 0,
    'items_skipped_last_3_boxes': 0
}])

prob_1 = model.predict_proba(customer_1)[0, 1]
prob_2 = model.predict_proba(customer_2)[0, 1]

print(f"Customer 1 (new, inactive, complaints): {prob_1:.1%} churn risk")
print(f"Customer 2 (veteran, engaged, happy): {prob_2:.1%} churn risk")
```

---

### Cell 10: Reflection

**Instructions:**
> Answer these questions in comments:

```python
# 1. Was logistic regression a good choice for this problem? Why or why not?
# 
# 2. What's one feature you would ADD to improve the model?
# 
# 3. If you could only look at one coefficient to explain churn, which would it be?
# 
```

---

## Expected Completion State

1. ✓ Model trained on training data
2. ✓ Probabilities generated for test data
3. ✓ AUC calculated (~0.70-0.75)
4. ✓ Coefficients interpreted (support tickets positive, tenure negative)
5. ✓ Precision@500 calculated (should be 2-3x baseline)
6. ✓ Compared two customer profiles

---

## Solution Key Notes

**Model training:**
```python
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)
```

**Predictions:**
```python
y_pred_proba = model.predict_proba(X_test)[:, 1]
```

**Precision@500:**
```python
top_500_indices = np.argsort(y_pred_proba)[-500:]
precision_at_500 = y_test.iloc[top_500_indices].mean()
```
