# Cheat Sheet: Feature Engineering

## Core Principle

Transform raw data into signals the model can use.

```
Raw: orders_total = 47, tenure_months = 14
Engineered: orders_per_month = 3.4 ← Much more informative!
```

## Three Feature Types

### 1. Ratio Features
Normalize by time or tenure.

```python
eps = 0.01  # Avoid division by zero
df['orders_per_month'] = df['orders_total'] / (df['tenure_months'] + eps)
df['logins_per_day'] = df['logins_last_30d'] / 30
df['support_rate'] = df['tickets'] / (df['tenure_months'] + eps)
```

### 2. Change Features
Compare recent vs. historical behavior.

```python
df['login_trend'] = df['logins_last_7d'] / (df['logins_last_30d'] / 4 + eps)
# > 1 = increasing activity
# < 1 = decreasing activity

df['order_change'] = df['orders_last_30d'] - df['orders_prev_30d']
```

### 3. Interaction Features
Combine conditions.

```python
df['unhappy_active'] = ((df['nps_score'] < 6) & (df['logins_last_30d'] > 10)).astype(int)
df['new_high_spender'] = ((df['tenure_months'] < 3) & (df['orders_total'] > 5)).astype(int)
```

## Leakage Checklist

Before adding a feature, ask:

| Question | If No... |
|---|---|
| Would I have this at prediction time? | Remove it |
| Is it derived from the target? | Remove it |
| Does it use future data? | Remove it |

**Red flags:**
- `days_until_churn`
- `cancel_reason`
- `next_month_orders`
- Anything from after the snapshot date

## Feature Ideas by Domain

| Domain | Feature Ideas |
|---|---|
| **Engagement** | logins/day, session_length, pages_viewed |
| **Transactions** | orders/month, avg_order_value, days_since_last |
| **Support** | tickets/month, resolution_time, escalation_rate |
| **Tenure** | days_since_signup, is_new (< 30d), is_veteran (> 365d) |

## Quick Engineering Template

```python
def engineer_features(df):
    eps = 0.01
    out = df.copy()
    
    # Ratios
    out['orders_per_month'] = df['orders_total'] / (df['tenure_months'] + eps)
    out['login_rate'] = df['logins_last_30d'] / 30
    
    # Changes
    out['login_trend'] = df['logins_last_7d'] / (df['logins_last_30d'] / 4 + eps)
    
    # Interactions
    out['unhappy_active'] = ((df['nps_score'] < 6) & 
                             (df['logins_last_30d'] > 5)).astype(int)
    
    # Flags
    out['is_new'] = (df['tenure_months'] < 3).astype(int)
    out['high_support'] = (df['support_tickets_last_30d'] > 2).astype(int)
    
    return out
```

## Measuring Feature Impact

```python
# Before engineering
auc_before = train_and_eval(X_raw, y)

# After engineering
auc_after = train_and_eval(X_engineered, y)

print(f"AUC improvement: {auc_after - auc_before:+.3f}")
```

## Key Insight

Good features encode **domain knowledge**:
- "Orders per month matters more than total orders"
- "Recent behavior change signals risk"
- "Unhappy but active = high churn risk"
