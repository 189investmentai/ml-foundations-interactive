# Module 2: Data Leakage - The Silent Model Killer

**Time:** 30-40 minutes

**Promise:** After this module, you'll recognize and prevent data leakage — the #1 cause of unrealistic ML results.

---

## The Setup

You've built a churn prediction model. Test accuracy is 98%. You're thrilled.

Then you deploy it. Production accuracy is 62%.

What happened? **Data leakage.**

---

## What Is Data Leakage?

**Data leakage** occurs when your model uses information that wouldn't be available at prediction time.

Think of it as **time traveling**:
- You're predicting churn on January 1
- But your features include data from January 15
- The model "knows the future"

### Why It's Deadly

| In Development | In Production |
|----------------|---------------|
| Accuracy looks amazing | Accuracy crashes |
| Model seems valuable | Model is useless |
| Everyone celebrates | Everyone panics |

Leakage makes your model **look better than it actually is**.

---

## The Mental Model: The Prediction Moment

Imagine time frozen at the moment you need to make a prediction:

```
[------PAST------] | PREDICTION | [------FUTURE------]
      ✅              MOMENT              ❌
   Available                          Off Limits
```

**Rule:** Every feature must be computed using ONLY data from the PAST.

The target (what you're predicting) lives in the FUTURE.

If any feature touches future data → **Leakage**.

---

## Types of Data Leakage

### 1. Target Leakage (Obvious)

The target variable directly appears in features.

**Example:**
- Target: Will customer churn?
- Feature: `has_churned` flag

This is like using the answer to predict the answer.

### 2. Feature Leakage (Subtle)

A feature is computed using information from after the prediction time.

**Example:**
- Target: Will they churn in the next 30 days?
- Feature: `lifetime_value` (includes purchases AFTER the prediction)

The feature name sounds innocent, but the calculation leaks.

### 3. Preprocessing Leakage

Data transformations use information from the test set.

**Example:**
- Normalize features using mean/std from the **entire dataset**
- The model has seen test set statistics

**Fix:** Fit transformations on train, then apply to test.

### 4. Temporal Leakage

Time-series data is split randomly instead of by time.

**Example:**
- Predict Monday's sales using Tuesday-Friday data in training
- The model has seen the future

**Fix:** Always use time-based splits for temporal problems.

---

## How to Detect Leakage

### Red Flag 1: Unrealistically High Accuracy

If your model gets 99% accuracy on a problem that domain experts say is hard → suspicious.

**Ask:** "Is this too good to be true?"

### Red Flag 2: Feature Has Perfect Correlation with Target

If one feature predicts the target perfectly → it probably IS the target (or derived from it).

```python
# Check correlations
df[features + [target]].corr()[target].sort_values()
```

### Red Flag 3: Production Performance Crash

Train/test look great, production crashes → classic leakage pattern.

### Red Flag 4: Feature Importance Dominated by One Feature

If one feature has 90%+ importance and it's not obvious why → investigate.

---

## How to Prevent Leakage

### The Timeline Test

For EVERY feature, ask:

> "On prediction day, would I have this exact value?"

- If yes → Safe
- If maybe → Investigate
- If no → Leakage

### Time-Based Splits

For any problem with temporal structure:

```python
# WRONG
X_train, X_test = train_test_split(X, test_size=0.2)

# RIGHT
cutoff_date = '2024-01-01'
X_train = X[X['date'] < cutoff_date]
X_test = X[X['date'] >= cutoff_date]
```

### Feature Engineering Pipeline

```python
# WRONG: Fit on all data
scaler.fit(X)
X_scaled = scaler.transform(X)

# RIGHT: Fit only on train
scaler.fit(X_train)
X_train_scaled = scaler.transform(X_train)
X_test_scaled = scaler.transform(X_test)
```

### Point-in-Time Correctness

For each row, compute features as they would have been at that moment:

```python
# WRONG: Use all data
df['total_orders'] = df.groupby('user_id')['order_id'].count()

# RIGHT: Use only past data
df['orders_before_date'] = df.apply(
    lambda row: len(df[(df['user_id'] == row['user_id']) & 
                       (df['order_date'] < row['prediction_date'])]),
    axis=1
)
```

---

## Common Leaky Features

| Feature | Why It Leaks |
|---------|--------------|
| `lifetime_value` | Includes future purchases |
| `days_since_last_X` | Last X might be after prediction |
| `total_count` | Count might include future events |
| `normalized_value` | Normalization from future stats |
| `moving_average` | Window might include future |

**Safe alternatives:**
- `value_as_of_date`
- `count_before_date`
- `last_90_days_average`

---

## Failure Modes

### 1. The "I'll Fix It Later" Leak

**Symptom:** Leaky feature noticed but ignored during prototyping.

**Problem:** Prototype performance becomes the benchmark.

**Fix:** Fix leakage immediately. Don't establish false baselines.

### 2. The "It's Just Validation" Leak

**Symptom:** Test set used for feature selection, hyperparameter tuning, AND final evaluation.

**Problem:** Model is overfit to test set.

**Fix:** Use three splits: train, validation (for tuning), test (for final eval).

### 3. The "Production Pipeline Drift" Leak

**Symptom:** Training features computed differently than production features.

**Problem:** Train/test looks fine, production fails.

**Fix:** Use the same feature engineering code for training and inference.

---

## Business Translation

### Explaining Leakage to Stakeholders

**Don't say:** "There's train-test contamination in the feature engineering pipeline."

**Do say:** "The model was accidentally given information it won't have when we use it for real predictions. That's why it looked 98% accurate but is only 62% in practice."

### Explaining Why You're Re-doing Work

**Don't say:** "We need to rebuild the feature pipeline to prevent temporal leakage."

**Do say:** "We discovered the model was 'cheating' by seeing future data. We need to rebuild it properly. The new model will have lower accuracy numbers but will actually work in production."

---

## Practice

### Before the Lab

Open the **Interactive Playground** (`playground_data_leakage.html`):

1. Start with "No Leakage" — see features properly placed on the timeline
2. Try "Obvious Leakage" — watch test accuracy spike but production crash
3. Try "Subtle Leakage" — notice how lifetime_value seems innocent
4. Try "Temporal Leakage" — see the timing problem

### Key Observations

- Leaky features boost test accuracy
- Production accuracy crashes with leakage
- Feature position on timeline indicates risk
- "Obvious" leakage is often not obvious in real data

---

## Quick Reference

### Leakage Detection Checklist

- [ ] Any feature with >0.95 correlation to target?
- [ ] Any feature with near-perfect predictive power?
- [ ] Time-based split for temporal data?
- [ ] Preprocessing fit only on training data?
- [ ] Features computed point-in-time correctly?

### Safe Feature Patterns

```python
# Compute features as of prediction_date
features['orders_past_90d'] = count_orders_before(user_id, prediction_date - 90, prediction_date)
features['tenure_days'] = (prediction_date - signup_date).days
features['support_tickets_past_30d'] = count_tickets_before(user_id, prediction_date - 30, prediction_date)
```

---

## Done Checklist

- [ ] Explored the data leakage playground
- [ ] Understand the timeline test
- [ ] Can identify obvious and subtle leakage
- [ ] Know how to use time-based splits
- [ ] Completed the notebook lab
