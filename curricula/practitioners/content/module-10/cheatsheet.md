# Feature Engineering Cheatsheet

## Golden Rule

**Features must only use information available at prediction time.**

---

## Transformation Quick Reference

| Data Type | Transformation | When to Use |
|-----------|---------------|-------------|
| Numeric (normal) | Standardize | Linear/neural models |
| Numeric (skewed) | Log(x+1) | Right-skewed data |
| Numeric (outliers) | Clip or bin | Extreme values |
| Categorical (low) | One-hot | < 20 categories |
| Categorical (high) | Target encode | High cardinality |
| Datetime | Extract parts | Hour, day, month |
| Text | Counts, TF-IDF | Simple NLP features |

---

## Scaling Formulas

**Standardization:**
```
z = (x - mean) / std
```

**Min-Max:**
```
x_scaled = (x - min) / (max - min)
```

**Log transform:**
```
x_log = log(x + 1)
```

---

## Temporal Features

```python
# From timestamps
df['hour'] = df['ts'].dt.hour
df['dayofweek'] = df['ts'].dt.dayofweek
df['is_weekend'] = df['ts'].dt.dayofweek >= 5

# Recency
df['days_since'] = (today - df['date']).dt.days

# Rolling windows
df['sum_7d'] = df.groupby('id').rolling('7d')['x'].sum()
```

---

## Encoding Categories

**One-hot:**
```python
pd.get_dummies(df['category'], prefix='cat')
```

**Target encoding (with CV):**
```python
from category_encoders import TargetEncoder
enc = TargetEncoder()
df['cat_encoded'] = enc.fit_transform(df['cat'], df['target'])
```

---

## Interaction Features

```python
# Ratios
df['rate'] = df['count'] / df['total']

# Products  
df['x_times_y'] = df['x'] * df['y']

# Differences
df['delta'] = df['current'] - df['avg']
```

---

## Leakage Checklist

| Type | Question | Example |
|------|----------|---------|
| **Time** | Available before prediction? | Future aggregations |
| **Target** | Derived from label? | Cancellation request → churn |
| **Encoding** | Fit on train only? | Scaler fit on all data |
| **Window** | Looking backward only? | Rolling sum includes future |

---

## Correct Pipeline

```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

# WRONG: fit on all data
scaler.fit(X)

# RIGHT: fit only on train
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('model', LogisticRegression())
])
pipe.fit(X_train, y_train)
```

---

## Red Flags

| Flag | Likely Cause |
|------|--------------|
| AUC > 0.99 | Leakage |
| Train >> Test | Overfitting or encoding leak |
| Memory errors | High cardinality one-hot |
| Features >> samples | Need regularization |

---

## Model-Specific Needs

| Model | Scaling | One-hot | Missing |
|-------|---------|---------|---------|
| Linear | Required | Required | Fill |
| Tree | Optional | Optional | Can handle |
| Neural | Required | Required | Fill |
| XGBoost | Optional | Optional | Can handle |
