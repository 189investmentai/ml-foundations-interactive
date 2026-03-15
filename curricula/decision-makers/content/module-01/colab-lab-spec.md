# Module 1: Colab Lab Spec

**Lab Title:** Framing Your First ML Problem  
**Time:** ~20 minutes  
**Goal:** Practice the 7-line framing template on real data

---

## Dataset: StreamCart Subscribers

Pre-load a synthetic dataset with ~5,000 subscribers.

### Schema

| Column | Type | Description |
|--------|------|-------------|
| user_id | int | Unique subscriber ID |
| signup_date | date | When they subscribed |
| subscription_status | str | "active", "canceled", "paused" |
| cancel_date | date | Date of cancellation (null if active) |
| cancel_reason | str | "too_expensive", "not_using", "competitor", etc. (null if active) |
| tenure_months | int | Months since signup |
| logins_last_7d | int | Login count in past 7 days |
| logins_last_30d | int | Login count in past 30 days |
| support_tickets_last_30d | int | Support tickets filed in past 30 days |
| items_skipped_last_3_boxes | int | Products skipped (subscription box feature) |
| nps_score | int | Last NPS survey response (1-10, null if never responded) |
| revenue_ltv | float | Total revenue from this customer |
| last_order_date | date | Most recent order |

### Generate with:

```python
import pandas as pd
import numpy as np
from datetime import datetime, timedelta

np.random.seed(42)
n = 5000

# Base data
signup_dates = [datetime(2023, 1, 1) + timedelta(days=np.random.randint(0, 500)) for _ in range(n)]
tenure = [(datetime(2024, 6, 1) - d).days // 30 for d in signup_dates]

# Churn logic: higher churn for low tenure, low logins, high support tickets
churn_prob = np.clip(0.1 + 0.3 * (np.array(tenure) < 3) + 0.2 * np.random.random(n), 0, 0.6)
churned = np.random.random(n) < churn_prob

df = pd.DataFrame({
    'user_id': range(1, n+1),
    'signup_date': signup_dates,
    'subscription_status': ['canceled' if c else 'active' for c in churned],
    'cancel_date': [s + timedelta(days=np.random.randint(30, 180)) if c else None 
                    for s, c in zip(signup_dates, churned)],
    'cancel_reason': [np.random.choice(['too_expensive', 'not_using', 'competitor', 'other']) if c else None 
                      for c in churned],
    'tenure_months': tenure,
    'logins_last_7d': np.random.poisson(3, n),
    'logins_last_30d': np.random.poisson(12, n),
    'support_tickets_last_30d': np.random.poisson(0.5, n),
    'items_skipped_last_3_boxes': np.random.poisson(1, n),
    'nps_score': [np.random.choice([None] + list(range(1, 11)), p=[0.3] + [0.07]*10) for _ in range(n)],
    'revenue_ltv': np.random.exponential(200, n),
    'last_order_date': [datetime(2024, 6, 1) - timedelta(days=np.random.randint(1, 60)) for _ in range(n)]
})
```

---

## Lab Structure

### Cell 1: Setup and Data Loading

```python
# Run this cell to load the StreamCart subscriber data
# (Code to load/generate data)

print(f"Loaded {len(df)} subscribers")
print(f"Churn rate: {(df['subscription_status'] == 'canceled').mean():.1%}")
```

**Expected output:** ~5,000 subscribers, ~20-25% churn rate

---

### Cell 2: Explore the Data

**Instructions:**
> Take 5 minutes to explore. Run `df.head()`, `df.describe()`, check column types.
> Answer these questions in comments:
> - What's the average tenure?
> - What percentage of subscribers have filed support tickets?
> - What's the most common cancel reason?

**Self-check:** None (exploration)

---

### Cell 3: TODO - Frame Problem 1 (Churn Prediction)

**Instructions:**
> Fill out the 7-line template for a churn prediction problem.
> The retention team can contact 500 subscribers per week.

```python
# TODO: Fill in the 7-line template

problem_1 = {
    "problem": "",      # What business outcome are we improving?
    "action": "",       # What will we DO with predictions?
    "prediction": "",   # What does the model output?
    "label": "",        # How do we define this in historical data?
    "features": [],     # List 5 features you'd use
    "metric": "",       # How do we measure success?
    "constraints": ""   # Any production limits?
}
```

**Self-check:**

```python
# Run this to check your framing
assert "churn" in problem_1["problem"].lower() or "cancel" in problem_1["problem"].lower(), \
    "Problem should mention churn or cancellation"
assert "500" in problem_1["metric"] or "precision" in problem_1["metric"].lower(), \
    "Metric should account for the 500/week capacity"
assert "cancel_reason" not in str(problem_1["features"]).lower(), \
    "cancel_reason is leakage! It only exists after someone cancels"
print("✓ Problem 1 framing looks reasonable!")
```

---

### Cell 4: TODO - Frame Problem 2 (High-Value Identification)

**Instructions:**
> The marketing team wants to identify "high-value" customers for a VIP program.
> They can offer VIP perks to 200 customers.

```python
# TODO: Fill in the 7-line template

problem_2 = {
    "problem": "",
    "action": "",
    "prediction": "",
    "label": "",        # Hint: How do you DEFINE "high-value"?
    "features": [],
    "metric": "",
    "constraints": ""
}
```

**Self-check:**

```python
# Run this to check your framing
assert problem_2["label"] != "", "You need to define what 'high-value' means!"
assert "revenue" in problem_2["label"].lower() or "ltv" in problem_2["label"].lower(), \
    "High-value should probably relate to revenue or LTV"
print("✓ Problem 2 framing looks reasonable!")
```

---

### Cell 5: TODO - Identify Leaky Features

**Instructions:**
> Look at this list of potential features for churn prediction.
> Mark which ones are SAFE vs. LEAKY.

```python
candidate_features = [
    "tenure_months",           # Safe or Leaky?
    "logins_last_7d",          # Safe or Leaky?
    "cancel_reason",           # Safe or Leaky?
    "support_tickets_last_30d",# Safe or Leaky?
    "days_until_cancel",       # Safe or Leaky?
    "nps_score",               # Safe or Leaky?
    "subscription_status",     # Safe or Leaky?
]

# TODO: Create lists of safe and leaky features
safe_features = []    # Add feature names here
leaky_features = []   # Add feature names here
```

**Self-check:**

```python
expected_leaky = {"cancel_reason", "days_until_cancel", "subscription_status"}
your_leaky = set(leaky_features)

if your_leaky == expected_leaky:
    print("✓ Perfect! You identified all leaky features.")
elif len(your_leaky & expected_leaky) >= 2:
    print("⚠ Close! You got most of them. Think about what info exists BEFORE vs AFTER cancellation.")
else:
    print("✗ Review the leakage section. Ask: 'Would I know this at prediction time?'")
```

---

### Cell 6: TODO - Create the Label Column

**Instructions:**
> Create a label column for 30-day churn prediction.
> Label = 1 if the subscriber canceled within 30 days of a snapshot date (June 1, 2024)

```python
snapshot_date = datetime(2024, 6, 1)

# TODO: Create the label column
# df['churn_30d'] = ???

# Hint: 
# - Only canceled subscribers can have churn_30d = 1
# - Check if cancel_date is within 30 days of snapshot_date
```

**Self-check:**

```python
assert 'churn_30d' in df.columns, "Create a column called 'churn_30d'"
assert df['churn_30d'].isin([0, 1]).all(), "Label should be 0 or 1"
assert df['churn_30d'].mean() < df['subscription_status'].eq('canceled').mean(), \
    "30-day churn should be less than overall churn rate"
print(f"✓ Label created! 30-day churn rate: {df['churn_30d'].mean():.1%}")
```

---

### Cell 7: Reflection

**Instructions:**
> Write 2-3 sentences: What's the most important thing you learned about problem framing?

```python
# Your reflection (just write in a comment, no code needed):
# 
# 
# 
```

---

## Expected Completion State

At the end, learners should have:
1. ✓ Explored the dataset and understood its shape
2. ✓ Framed churn prediction with correct metric (precision@500)
3. ✓ Framed high-value identification with explicit label definition
4. ✓ Identified 3 leaky features
5. ✓ Created a correct 30-day churn label column

---

## Solution Key (Separate Notebook)

Include a solutions notebook with:
- Completed templates for both problems
- Explanation of why each feature is safe/leaky
- Correct label column code:

```python
df['churn_30d'] = (
    (df['subscription_status'] == 'canceled') & 
    (df['cancel_date'] <= snapshot_date + timedelta(days=30)) &
    (df['cancel_date'] >= snapshot_date)
).astype(int)
```
