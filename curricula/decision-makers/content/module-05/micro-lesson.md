# Module 5: Features Make or Break Your Model

**Time:** 60-90 minutes  
**Prerequisites:** Modules 2-4 (Models Overview)

---

## The Setup

Here's a secret that competitions won't teach you: in the real world, feature engineering often matters more than model selection.

A logistic regression with great features beats an XGBoost with bad features. Every time.

But feature engineering is also where most ML projects go wrong. The most dangerous mistakes—data leakage, future leakage, distribution shift—all happen at the feature level. A model trained on leaked features will look amazing in training and fail completely in production.

**The question we're answering:** How do we build features that actually help—and avoid the ones that quietly destroy our models?

---

## The Mental Model

### The Analogy

Think of features like ingredients in cooking.

You can have the fanciest kitchen (XGBoost), the best recipe (optimized hyperparameters), and perfect technique (proper cross-validation). But if your ingredients are stale, contaminated, or from the future (tomorrow's groceries for today's dinner), the dish will fail.

Good features are:
- **Fresh:** Available at prediction time
- **Clean:** No contamination from the outcome
- **Predictive:** Actually related to what you're predicting

### The Picture

```
               FEATURE QUALITY HIERARCHY
               
                    ┌─────────────────────┐
                    │   Available at      │
Level 1:            │   prediction time?  │
TIMING              └──────────┬──────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
                   YES                    NO
                    │                     │
                    ▼                     ▼
            ┌──────────────┐      ┌──────────────┐
Level 2:    │ Independent  │      │   LEAKAGE!   │
LEAKAGE     │ of outcome?  │      │   Stop here  │
            └──────┬───────┘      └──────────────┘
                   │
            ┌──────┴──────┐
            │             │
           YES            NO
            │             │
            ▼             ▼
    ┌──────────────┐  ┌──────────────┐
    │  Actually    │  │   LEAKAGE!   │
    │  predictive? │  │   Stop here  │
    └──────┬───────┘  └──────────────┘
           │
    ┌──────┴──────┐
    │             │
   YES            NO
    │             │
    ▼             ▼
┌──────────┐  ┌──────────┐
│  GOOD    │  │  USELESS │
│ FEATURE  │  │ (drop)   │
└──────────┘  └──────────┘
```

---

## The Two Deadly Sins

### Sin #1: Data Leakage (Using the Outcome)

**What it is:** Features that contain information about the outcome you're predicting.

**Example:**
```python
# Predicting churn_30d
features = [
    'tenure_months',
    'support_tickets',
    'cancel_reason',     # ← LEAKAGE! Only exists after they cancel
    'refund_amount'      # ← LEAKAGE! Often happens when canceling
]
```

**Why it's dangerous:** Model gets 0.98 AUC in training. In production, these features don't exist yet (customer hasn't canceled), so the model falls apart.

**How to detect:** Ask: "Would I have this data BEFORE the outcome occurs?"

### Sin #2: Future Leakage (Time Travel)

**What it is:** Features that include information from AFTER the prediction point.

**Example:**
```python
# Predicting churn as of March 1
# Using data from March 5 (the future!)

features = [
    'logins_last_7d',           # Which 7 days? From March 1 looking back? Or today?
    'total_lifetime_orders',    # Includes orders from March 2-31?
    'days_since_last_order'     # Calculated from today (March 15)?
]
```

**Why it's dangerous:** Model trains on a version of the customer that includes future information. In production, you only have data up to "now."

**How to detect:** For every feature, ask: "As of what date is this calculated?"

---

## Time-Based Splits

The train/test split you learned in bootcamps is wrong for time-series data.

### Wrong Way: Random Split

```python
# Random split—mixes time periods!
X_train, X_test = train_test_split(X, test_size=0.2)

# Training might include January 2024 data
# Testing might include December 2023 data
# Model is "predicting the past"—leakage!
```

### Right Way: Temporal Split

```python
# Time-based split—respects causality
train = df[df['snapshot_date'] < '2024-01-01']
test = df[df['snapshot_date'] >= '2024-01-01']

# Train on 2023, test on 2024
# Model must predict the future from past data
```

### Visual

```
RANDOM SPLIT (Wrong)                TEMPORAL SPLIT (Right)
════════════════════                ═══════════════════════

   Train     Test                      Train          Test
    ▓▓▓░░░▓▓▓░░▓▓░                    ▓▓▓▓▓▓▓▓▓▓ │ ░░░░░░
    ▓░▓░░▓▓░▓▓▓░░▓                    ▓▓▓▓▓▓▓▓▓▓ │ ░░░░░░
    ░▓▓░▓░░▓░░▓▓▓░                    ▓▓▓▓▓▓▓▓▓▓ │ ░░░░░░
    ──────────────►                   ──────────────────►
         Time                            Time
                                              │
                                         Jan 1, 2024
                                       (cutoff date)

Model sees future data in              Model only sees past
training—fake performance!             during training
```

---

## Feature Engineering Patterns

### Pattern 1: Aggregations Over Time Windows

```python
# Good: Multiple time windows reveal trends
df['logins_7d'] = df.groupby('user_id')['login_date'].rolling('7d').count()
df['logins_30d'] = df.groupby('user_id')['login_date'].rolling('30d').count()
df['logins_90d'] = df.groupby('user_id')['login_date'].rolling('90d').count()

# Ratio shows recent engagement trend
df['login_trend_7d_vs_30d'] = df['logins_7d'] / (df['logins_30d'] / 4)
# >1 means recent engagement is higher than average
```

### Pattern 2: Days Since Events

```python
# Good: Recency features
df['days_since_last_login'] = (df['snapshot_date'] - df['last_login_date']).dt.days
df['days_since_last_order'] = (df['snapshot_date'] - df['last_order_date']).dt.days
df['days_since_signup'] = (df['snapshot_date'] - df['signup_date']).dt.days
```

### Pattern 3: Categorical Encoding

```python
# Option 1: One-hot encoding (few categories)
df = pd.get_dummies(df, columns=['plan_type'])
# Creates: plan_type_basic, plan_type_premium, plan_type_enterprise

# Option 2: Target encoding (many categories)
# Mean outcome for each category
category_means = df.groupby('city')['churn'].mean()
df['city_encoded'] = df['city'].map(category_means)
# ⚠️ Must be calculated on training set only to avoid leakage!
```

### Pattern 4: Interaction Features

```python
# Combine features that might interact
df['tenure_x_tickets'] = df['tenure_months'] * df['support_tickets']
df['premium_and_inactive'] = (df['plan_type'] == 'premium') & (df['logins_7d'] == 0)
```

---

## The StreamCart Feature Audit

Let's audit a set of features for churn prediction at StreamCart.

| Feature | Status | Why |
|---------|--------|-----|
| `tenure_months` | ✅ Good | Calculated from signup date, available at prediction time |
| `logins_last_7d` | ⚠️ Check | "Last 7d" from when? Must be from snapshot date |
| `cancel_reason` | ❌ Leakage | Only exists AFTER they cancel |
| `total_orders` | ⚠️ Check | As of snapshot date? Or all-time including future? |
| `avg_order_value` | ⚠️ Check | Same concern—what time window? |
| `days_active` | ⚠️ Check | How is "active" defined? Could include future activity |
| `support_tickets_30d` | ✅ Good | If properly windowed from snapshot date |
| `refund_this_month` | ❌ Leakage | Refunds often happen at cancellation |

---

## The Point-in-Time Framework

To avoid leakage, build features as of a specific "snapshot date."

```python
def build_features(df, snapshot_date):
    """
    Build features as of a specific date.
    Only uses data from BEFORE the snapshot.
    """
    # Filter to data before snapshot
    historical = df[df['event_date'] < snapshot_date]
    
    # Calculate features
    features = {}
    
    # Tenure: days since signup (known at snapshot)
    features['tenure_days'] = (snapshot_date - df['signup_date']).days
    
    # Activity: look back from snapshot
    recent = historical[historical['event_date'] >= snapshot_date - timedelta(days=30)]
    features['logins_30d'] = len(recent[recent['event_type'] == 'login'])
    features['orders_30d'] = len(recent[recent['event_type'] == 'order'])
    
    # Support: look back from snapshot
    features['tickets_30d'] = len(recent[recent['event_type'] == 'support_ticket'])
    
    return features
```

The key: every feature is calculated as of a specific moment, using only data from before that moment.

---

## What Goes Wrong

### Mistake 1: Not checking for leakage systematically

**Symptom:** Model has suspiciously high AUC (>0.90 for a problem where 0.75 would be good).

**Fix:** For every feature, answer: "Would I have this value at prediction time, before the outcome?"

### Mistake 2: Random splits with time-series data

**Symptom:** Great offline metrics, poor production performance.

**Fix:** Always use temporal splits. If you're predicting March churn, train on January-February, test on March.

### Mistake 3: Target encoding on full dataset

**Symptom:** Categorical encoding looks great but causes overfitting.

**Example:**
```python
# WRONG: Uses test data in encoding
df['city_encoded'] = df.groupby('city')['churn'].transform('mean')

# RIGHT: Calculate only on training set
train_means = train_df.groupby('city')['churn'].mean()
train_df['city_encoded'] = train_df['city'].map(train_means)
test_df['city_encoded'] = test_df['city'].map(train_means)  # Use train means!
```

### Mistake 4: Look-ahead bias in aggregates

**Symptom:** "Total" or "average" features work too well.

**Example:**
```python
# WRONG: total_orders might include future orders
df['total_orders'] = df.groupby('user_id')['order_id'].count()

# RIGHT: Only count orders before snapshot
df['orders_as_of_snapshot'] = df.apply(
    lambda row: count_orders_before(row['user_id'], row['snapshot_date']),
    axis=1
)
```

---

## Practice

### 1. Build (Colab Lab)
→ [Link to Colab notebook]

**What you'll do:**
- Audit a feature set for leakage
- Build point-in-time features correctly
- Compare random vs. temporal splits
- Create time-windowed aggregates

**Time:** ~20 minutes

---

### 2. Decide (Scenario Quiz)
→ [Scenario Quiz](https://docs.google.com/forms/d/e/1FAIpQLSe-G_JFVj_J8HisPBAyJKDpMJWmkt_iko92NzNZ2qXC15cQ3Q/viewform?usp=header)

**What you'll do:** 6 scenarios about identifying leakage, choosing features, and time-based splits.

**Time:** ~10 minutes

---

### 3. Debug (Find the Bug)
→ [Debug Drill](https://colab.research.google.com/github/189investmentai/ml-foundations-interactive/blob/main/notebooks/debug_drills/drill_05_leaky_feature.ipynb)

**What you'll do:** A model has 0.97 AUC—too good to be true. Find the feature leakage.

**Time:** ~15 minutes

---

### 4. Explain (Stakeholder Update)

**The prompt:**  
A junior data scientist sends you their model: "AUC is 0.95! Ready to deploy!" You notice they're using `cancellation_date` as a feature to predict churn.

Write a brief Slack message explaining why this is a problem and how they should fix it.

**What good looks like:**
- Clear explanation of why this feature is problematic
- Not condescending
- Offers a concrete next step
- Explains the broader principle

---

## Cheat Sheet

→ [Download: Module 5 Cheat Sheet (PDF)](#)

---

## Done?

- [ ] Read the micro-lesson
- [ ] Completed the scenario quiz  
- [ ] Ran the Colab lab
- [ ] Fixed the debug drill
- [ ] Wrote the stakeholder update

**Next up:** [Module 6: Is Your Model Actually Good?](#)
