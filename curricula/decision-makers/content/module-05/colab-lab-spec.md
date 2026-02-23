# Module 5: Colab Lab Spec

**Lab Title:** Feature Engineering & Leakage Detection  
**Time:** ~20 minutes  
**Goal:** Build point-in-time features and detect leakage

---

## Lab Structure

### Cell 1: Setup

```python
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import roc_auc_score

# Load event-level data
events = load_streamcart_events()  # user_id, event_date, event_type, details
users = load_streamcart_users()    # user_id, signup_date, cancel_date (if any)

print(f"Events: {len(events):,} rows")
print(f"Users: {len(users):,} rows")
print(f"Date range: {events['event_date'].min()} to {events['event_date'].max()}")
```

---

### Cell 2: TODO - Identify Leaky Features

```python
# This feature set was proposed. Identify which features have leakage.

proposed_features = [
    'tenure_months',              # Days since signup
    'logins_total',               # All-time login count
    'orders_total',               # All-time order count  
    'support_tickets_30d',        # Tickets in last 30 days
    'cancel_reason_encoded',      # Why they canceled (encoded)
    'days_since_last_order',      # Days since most recent order
    'refund_amount_total',        # Total refunds ever
    'plan_type'                   # Current plan
]

# TODO: For each feature, mark as 'safe', 'check', or 'leakage'
# feature_audit = {
#     'tenure_months': '???',
#     'logins_total': '???',
#     ...
# }
```

---

### Cell 3: Define Snapshot Date

```python
# We'll build features as of Jan 1, 2024
# And predict churn in the next 30 days

SNAPSHOT_DATE = datetime(2024, 1, 1)
CHURN_WINDOW = 30  # days

# Label: Did they churn within 30 days of snapshot?
users['churn_30d'] = (
    (users['cancel_date'] > SNAPSHOT_DATE) & 
    (users['cancel_date'] <= SNAPSHOT_DATE + timedelta(days=CHURN_WINDOW))
).astype(int)

print(f"Churn rate: {users['churn_30d'].mean():.1%}")
```

---

### Cell 4: TODO - Build Point-in-Time Features

```python
# TODO: Build features that are safe to use at SNAPSHOT_DATE
# Only use data from BEFORE the snapshot

def build_safe_features(user_id, snapshot_date, events_df):
    """Build features using only historical data."""
    
    # Filter to events before snapshot
    historical = events_df[
        (events_df['user_id'] == user_id) & 
        (events_df['event_date'] < snapshot_date)
    ]
    
    # TODO: Calculate these features safely
    features = {
        # 'logins_30d': ???,       # Logins in 30 days before snapshot
        # 'orders_30d': ???,       # Orders in 30 days before snapshot
        # 'days_since_last_order': ???,  # Days from last order to snapshot
    }
    
    return features
```

---

### Cell 5: Compare Random vs Temporal Split

```python
# Build features for full dataset
X = build_all_features(users, events, SNAPSHOT_DATE)
y = users['churn_30d']

# Random split (WRONG for time series)
X_train_rand, X_test_rand, y_train_rand, y_test_rand = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Temporal split (CORRECT)
# Training: users active before Nov 2023
# Testing: users from Nov 2023 - Dec 2023
temporal_cutoff = datetime(2023, 11, 1)
X_train_temp = X[X['signup_date'] < temporal_cutoff]
X_test_temp = X[X['signup_date'] >= temporal_cutoff]
y_train_temp = y[X['signup_date'] < temporal_cutoff]
y_test_temp = y[X['signup_date'] >= temporal_cutoff]
```

---

### Cell 6: Train and Compare

```python
# Train on random split
model_rand = RandomForestClassifier(n_estimators=100, max_depth=5)
model_rand.fit(X_train_rand[feature_cols], y_train_rand)
auc_rand = roc_auc_score(y_test_rand, model_rand.predict_proba(X_test_rand[feature_cols])[:, 1])

# Train on temporal split
model_temp = RandomForestClassifier(n_estimators=100, max_depth=5)
model_temp.fit(X_train_temp[feature_cols], y_train_temp)
auc_temp = roc_auc_score(y_test_temp, model_temp.predict_proba(X_test_temp[feature_cols])[:, 1])

print(f"Random split AUC:   {auc_rand:.3f}")
print(f"Temporal split AUC: {auc_temp:.3f}")
print(f"Difference:         {auc_rand - auc_temp:.3f}")
```

---

### Cell 7: Build Time-Windowed Features

```python
# TODO: Create features with multiple time windows

# df['logins_7d'] = ???
# df['logins_30d'] = ???
# df['logins_90d'] = ???

# df['login_trend'] = df['logins_7d'] / (df['logins_30d'] / 4 + 0.1)  # Add 0.1 to avoid div by zero
```

---

### Cell 8: Reflection

```python
# Answer in comments:
# 1. Which features had leakage and why?
# 2. How much did the random split overestimate performance?
# 3. Why is temporal splitting more realistic for production?
```

---

## Expected Outputs

- cancel_reason_encoded: LEAKAGE (only exists post-cancel)
- refund_amount_total: LEAKAGE (often coincides with cancel)
- Random split AUC > Temporal split AUC (random is overoptimistic)
