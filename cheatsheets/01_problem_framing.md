# Cheat Sheet: Problem Framing

## The 7-Line Framing Template

```
1. Business Goal: [What outcome do we want?]
2. ML Task Type:  [Classification / Regression / Ranking / Clustering]
3. Target (y):    [What exactly are we predicting?]
4. Prediction Point: [When do we make predictions?]
5. Features (X):  [What data is available BEFORE prediction?]
6. Success Metric: [How do we measure model quality?]
7. Business Action: [What do we DO with predictions?]
```

## Task Type Decision Tree

| If you need to... | Use... | Example |
|---|---|---|
| Predict yes/no | Binary Classification | Will customer churn? |
| Predict a number | Regression | How much will they spend? |
| Order items | Ranking | Which products to show first? |
| Find groups | Clustering | What customer segments exist? |

## Data Leakage Red Flags

**DANGER: These features leak the future**
- Anything derived from the target date
- Cancel reason (only known AFTER cancellation)
- "Days until event" calculations
- Future aggregations (next month's data)

**SAFE: Only use what you'd know at prediction time**
- Historical behavior (last 30 days, last 90 days)
- Customer attributes (tenure, plan type)
- Time-lagged features (behavior BEFORE snapshot)

## Quick Leakage Check

Ask: *"Would I have this data at prediction time?"*

| Feature | Safe? | Why |
|---|---|---|
| `logins_last_30d` | Yes | Historical |
| `will_cancel` | NO | Future info |
| `days_since_signup` | Yes | Known at prediction |
| `churn_reason` | NO | Only known after churn |

## Action-First Framing

**Wrong:** "Let's predict churn" (no action defined)

**Right:** "We'll call the top 500 highest-risk customers weekly"

The action determines:
- What metric to optimize (precision@500)
- What threshold to use
- How to measure business impact

## Key Formula

```
ML Problem = Prediction + Action + Measurement
```

If any part is missing, you're not ready to build.
