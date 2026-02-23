# Module 5 Cheat Sheet: Feature Engineering & Leakage

---

## The Two Deadly Sins

| Sin | What it is | How to detect |
|-----|------------|---------------|
| **Data Leakage** | Feature contains the outcome | "Would I know this BEFORE the outcome?" |
| **Future Leakage** | Feature uses future data | "As of what date is this calculated?" |

---

## Leakage Red Flags

| Signal | What it means |
|--------|---------------|
| AUC > 0.95 | Too good—probably leakage |
| Feature only exists after outcome | Definite leakage |
| "Total" or "lifetime" values | Check time boundaries |
| Model fails in production | Likely using unavailable features |

---

## Time-Based Splits

```python
# WRONG: Random split (leaks future)
X_train, X_test = train_test_split(X, test_size=0.2)

# RIGHT: Temporal split
train = df[df['date'] < '2024-01-01']
test = df[df['date'] >= '2024-01-01']
```

**Rule:** Train on past, test on future. Never mix.

---

## Point-in-Time Framework

Build every feature as of a specific date:

```python
def get_features(user_id, snapshot_date):
    # Only use data BEFORE snapshot_date
    historical = events[events['date'] < snapshot_date]
    
    return {
        'logins_30d': count_logins(historical, days=30),
        'orders_30d': count_orders(historical, days=30),
        'tenure': (snapshot_date - signup_date).days
    }
```

---

## Feature Patterns

### Time-Windowed Aggregates
```python
df['logins_7d'] = ...   # Recent
df['logins_30d'] = ...  # Medium term
df['logins_90d'] = ...  # Long term
df['login_trend'] = df['logins_7d'] / (df['logins_30d']/4)  # Trend
```

### Recency Features
```python
df['days_since_last_order'] = (snapshot - last_order_date).days
df['days_since_signup'] = (snapshot - signup_date).days
```

### Target Encoding (Careful!)
```python
# Calculate ONLY on training set
train_means = train.groupby('category')['target'].mean()

# Apply to both train and test
train['cat_encoded'] = train['category'].map(train_means)
test['cat_encoded'] = test['category'].map(train_means)
```

---

## Quick Feature Audit

For each feature, ask:

| Question | If No... |
|----------|----------|
| Available at prediction time? | Remove (leakage) |
| Independent of outcome? | Remove (leakage) |
| Calculated from proper time window? | Fix the calculation |
| Not future-looking? | Fix to use only past data |

---

## Common Leaky Features

| Feature | Why it leaks |
|---------|--------------|
| `cancel_reason` | Only exists after cancellation |
| `refund_amount` | Often happens at cancellation |
| `total_orders` (unconstrained) | May include future orders |
| `is_canceled` | Literally the outcome |
| `days_until_cancel` | Time travel |
