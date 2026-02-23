# Data Leakage Cheatsheet

## What Is It?

**Data leakage** = Using future information to predict the past.

Your model "knows the answer" during training but won't have that info in production.

---

## The Timeline Test

```
[----PAST----] | PREDICTION | [----FUTURE----]
      ✅           POINT            ❌
   Available                    Off Limits
```

**Ask:** "On prediction day, would I have this exact value?"

---

## Types of Leakage

| Type | Example | Fix |
|------|---------|-----|
| **Target leakage** | Using `has_churned` to predict churn | Remove target from features |
| **Feature leakage** | `lifetime_value` includes future | Compute as-of prediction date |
| **Preprocessing leakage** | Normalize using all data | Fit on train only |
| **Temporal leakage** | Random split on time data | Use time-based split |

---

## Red Flags

| Sign | What It Means |
|------|---------------|
| 99%+ accuracy on hard problem | Probably leakage |
| One feature dominates importance | Investigate that feature |
| Test great, production terrible | Classic leakage pattern |
| Feature perfectly correlates with target | Feature IS the target |

---

## Prevention Checklist

- [ ] Time-based split for temporal data
- [ ] Fit preprocessing on train only
- [ ] Point-in-time feature computation
- [ ] No target-derived features
- [ ] Same pipeline for train and production

---

## Safe Feature Patterns

```python
# Good: Point-in-time computation
features['orders_past_90d'] = count_before(prediction_date - 90, prediction_date)

# Bad: Uses all data
features['total_orders'] = count_all()
```

---

## Quick Code

```python
# Time-based split
cutoff = '2024-01-01'
train = df[df['date'] < cutoff]
test = df[df['date'] >= cutoff]

# Fit preprocessor on train only
scaler.fit(X_train)
X_train_scaled = scaler.transform(X_train)
X_test_scaled = scaler.transform(X_test)
```

---

## Business Translation

> "The model was accidentally seeing future data during training. That's why it looked 98% accurate but only works 62% of the time in production. We're fixing it."
