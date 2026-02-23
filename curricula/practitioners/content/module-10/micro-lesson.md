# Module 10: Feature Engineering - Making Data Speak

**Time:** 30-40 minutes

**Promise:** After this module, you'll know how to transform raw data into features that models can actually use, and avoid the common traps that destroy model performance.

---

## The Setup

You have raw data: timestamps, text, categories, numbers. But models need features — numerical representations that capture signal.

The gap between raw data and good features is where most ML projects succeed or fail.

---

## The Mental Models

### 1. The Translation Layer

Raw data → Features → Model

Think of feature engineering as translation:
- Model speaks "numbers"
- Raw data speaks "anything"
- Features are the dictionary

### 2. The Signal Concentration

Good features concentrate signal:
- Raw: `purchase_date = "2024-01-15"`
- Better: `days_since_last_purchase = 45`
- Best: `recency_bucket = "at_risk"` (if that's what matters)

### 3. The Leakage Detector

**Golden Rule:** Features must only use information available at prediction time.

If you're predicting churn for tomorrow:
- ✅ OK: Average of past 30 days' activity
- ❌ LEAKAGE: Whether they churned next week

---

## Types of Features

### Numerical Transformations

**Scaling:** Put features on similar ranges
```
Standardization: (x - mean) / std  → mean=0, std=1
Min-Max: (x - min) / (max - min)   → range [0, 1]
```

**When to use:**
- Tree models: Usually don't need scaling
- Linear/neural models: Almost always need scaling

**Log Transform:** Handle skewed distributions
```
log(x + 1)  # +1 to handle zeros
```

**When to use:**
- Right-skewed data (income, counts, prices)
- Values spanning orders of magnitude

**Binning:** Create categories from numbers
```
age_group = pd.cut(age, bins=[0, 25, 45, 65, 100])
```

**When to use:**
- Non-linear relationships
- Interpretability needed
- Reducing outlier impact

### Categorical Encoding

**One-Hot Encoding:** Binary columns for each category
```
color_red, color_blue, color_green = 1, 0, 0
```

**When to use:**
- Low cardinality (< 20 categories)
- No ordinal relationship

**Ordinal Encoding:** Integer mapping
```
size_small=1, size_medium=2, size_large=3
```

**When to use:**
- Clear ordering exists
- Tree models (they handle it well)

**Target Encoding:** Replace category with mean target
```
city → average churn rate for that city
```

**When to use:**
- High cardinality categories
- ⚠️ High leakage risk — use cross-validation encoding

### Temporal Features

**From timestamps:**
```python
df['hour'] = df['timestamp'].dt.hour
df['day_of_week'] = df['timestamp'].dt.dayofweek
df['is_weekend'] = df['timestamp'].dt.dayofweek >= 5
df['month'] = df['timestamp'].dt.month
df['quarter'] = df['timestamp'].dt.quarter
```

**Time-based aggregations:**
```python
df['orders_last_7d'] = df.groupby('user').rolling('7d')['orders'].sum()
df['avg_spend_last_30d'] = df.groupby('user').rolling('30d')['spend'].mean()
```

**Recency features:**
```python
df['days_since_signup'] = (today - df['signup_date']).dt.days
df['days_since_last_order'] = (today - df['last_order_date']).dt.days
```

### Interaction Features

**Ratios:**
```python
df['revenue_per_visit'] = df['revenue'] / df['visits']
df['conversion_rate'] = df['purchases'] / df['sessions']
```

**Products:**
```python
df['tenure_x_frequency'] = df['tenure'] * df['order_frequency']
```

**Differences:**
```python
df['spend_vs_avg'] = df['monthly_spend'] - df['avg_monthly_spend']
```

### Text Features

**Simple counts:**
```python
df['word_count'] = df['text'].str.split().str.len()
df['char_count'] = df['text'].str.len()
df['has_exclamation'] = df['text'].str.contains('!').astype(int)
```

**TF-IDF:** (For later modules on NLP)

---

## Feature Engineering Workflow

### 1. Understand the Problem

**Ask:**
- What am I predicting?
- When will predictions be made?
- What actions will be taken?

### 2. Explore Raw Data

**Check:**
- Data types (numeric, categorical, text, dates)
- Missing values
- Distributions (skewed? outliers?)
- Cardinality of categories

### 3. Create Feature Candidates

**Generate many, then select:**
- Domain-inspired features
- Standard transformations
- Interactions that make business sense

### 4. Validate No Leakage

**For each feature, ask:**
- Would I have this information at prediction time?
- Is this calculated correctly for the training/test split?

### 5. Select Features

- Remove correlated duplicates
- Use importance scores
- Consider interpretability needs

---

## Failure Modes

### 1. Future Information Leakage

**Symptom:** Suspiciously high AUC on test set.

**The Problem:** Feature uses information from after the prediction point.

**Example:**
```python
# WRONG: includes future orders
df['total_orders'] = df.groupby('user')['order_id'].count()

# RIGHT: orders before cutoff
df['orders_before_cutoff'] = df[df['date'] < cutoff].groupby('user')['order_id'].count()
```

**Fix:** Always be explicit about time boundaries.

### 2. Target Leakage

**Symptom:** Perfect training performance, random test performance.

**The Problem:** Feature is derived from the target or a proxy.

**Example:**
```python
# WRONG: directly related to churn
df['has_cancellation_request'] = ...  # This IS churn

# RIGHT: behavior before decision
df['support_tickets_last_30d'] = ...
```

**Fix:** Review each feature for causal relationship with target.

### 3. Train-Test Contamination

**Symptom:** Great validation metrics, poor production results.

**The Problem:** Encoding/scaling fit on full data including test.

**Example:**
```python
# WRONG: fit on all data
scaler.fit(X)
X_train_scaled = scaler.transform(X_train)

# RIGHT: fit only on train
scaler.fit(X_train)
X_train_scaled = scaler.transform(X_train)
X_test_scaled = scaler.transform(X_test)
```

**Fix:** All transformations fit only on training data.

### 4. High-Cardinality Explosion

**Symptom:** Model trains forever, memory errors.

**The Problem:** One-hot encoding category with thousands of values.

**Example:**
```python
# WRONG: 10,000 columns
pd.get_dummies(df['product_id'])

# RIGHT: target encode or embed
from category_encoders import TargetEncoder
encoder = TargetEncoder()
df['product_encoded'] = encoder.fit_transform(df['product_id'], df['target'])
```

**Fix:** Use target encoding, hashing, or embeddings for high cardinality.

---

## Business Translation

### Explaining Feature Importance

**Don't say:** "Feature X has importance 0.23."

**Do say:** "Whether a customer contacted support is the strongest predictor — support contacts increase churn probability by 3x."

### Explaining Transformations

**Don't say:** "We log-transformed revenue."

**Do say:** "We adjusted for the fact that spending differences matter more at lower amounts — going from $10 to $100 is a bigger signal than $1000 to $1090."

### Explaining Time Features

**Don't say:** "We used a 30-day rolling window."

**Do say:** "We look at customer behavior over the past month, which balances recent patterns with enough data to be reliable."

---

## Practice

### Before the Lab

Open the **Interactive Playground** (`playground_feature_engineering.html`):

1. See how different transformations change data distributions
2. Compare model performance with raw vs engineered features
3. Explore how interaction features capture non-linear relationships
4. Watch what happens when you introduce leakage

### Key Observations

- Scaling dramatically affects linear models
- Log transforms help with skewed data
- Interaction features can boost tree models
- Leakage makes everything look too good

---

## Quick Reference

### Transformation Cheat Sheet

| Data Type | Common Transformations |
|-----------|----------------------|
| Numeric (normal) | Standardization |
| Numeric (skewed) | Log, Box-Cox |
| Numeric (outliers) | Clipping, binning |
| Categorical (low card) | One-hot |
| Categorical (high card) | Target encode, embed |
| Datetime | Extract parts, calculate deltas |
| Text | Counts, TF-IDF, embeddings |

### Leakage Checklist

| Check | Question |
|-------|----------|
| Time | Is this available before prediction? |
| Target | Is this derived from what we're predicting? |
| Encoding | Was this fit only on training data? |
| Aggregation | Does the window only look backward? |

---

## Done Checklist

- [ ] Understood main feature transformation types
- [ ] Explored transformations in the playground
- [ ] Identified leakage scenarios
- [ ] Completed the notebook lab
- [ ] Passed the quiz
