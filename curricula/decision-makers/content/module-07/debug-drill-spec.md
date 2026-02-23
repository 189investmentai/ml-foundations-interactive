# Module 7: Debug Drill Spec

**Title:** The Giant Cluster  
**Time:** ~15 minutes  
**Goal:** Fix clustering that puts almost everyone in one group

---

## The Setup

> A data scientist clustered customers into 4 segments. But the results look wrong:
> - Segment 0: 4,850 customers (97%)
> - Segment 1: 75 customers (1.5%)
> - Segment 2: 50 customers (1%)
> - Segment 3: 25 customers (0.5%)
>
> "Almost everyone is in one segment. This isn't useful."

---

## The Buggy Code

```python
features = ['tenure_months', 'total_spend', 'logins_per_month']

# ===== BUG IS HERE =====
X = df[features].fillna(0)

# No scaling!
kmeans = KMeans(n_clusters=4, random_state=42)
df['segment'] = kmeans.fit_predict(X)
# =======================

print(df['segment'].value_counts())
```

**Output:**
```
0    4850
1      75
2      50
3      25
```

---

## The Bug

### Problem: No feature scaling

Look at the feature ranges:
- `tenure_months`: 1-60
- `total_spend`: 50-50,000  ← Dominates!
- `logins_per_month`: 0-30

`total_spend` has a range 1000x larger than other features. K-means uses distance, so spending completely dominates. Most customers have "normal" spending and get grouped together. Only extreme spenders get separated.

---

## The Fix

```python
from sklearn.preprocessing import StandardScaler

# Scale features first!
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

kmeans = KMeans(n_clusters=4, random_state=42)
df['segment'] = kmeans.fit_predict(X_scaled)
```

**After fix:**
```
0    1450
1    1200
2    1350
3    1000
```

Now segments are balanced and meaningful.

---

## What Learners Must Do

1. **Identify the symptom:** One cluster dominates

2. **Find the cause:** Missing StandardScaler

3. **Understand why:** Unscaled features let high-range features dominate

4. **Fix it:** Add StandardScaler

5. **Verify:** Segments are now balanced

---

## Self-Check

```python
# After fixing
counts = df['segment'].value_counts()
max_ratio = counts.max() / counts.min()

assert max_ratio < 5, f"Segments still imbalanced (ratio: {max_ratio:.1f})"
print(f"✓ Fixed! Segment sizes: {dict(counts)}")
```

---

## Postmortem Template

**Symptom:**
> 97% of customers were in one segment, making clustering useless.

**Root cause:**
> Features weren't scaled. `total_spend` (range: 50,000) dominated clustering while `tenure` (range: 60) had no influence.

**Prevention:**
> Always `StandardScaler()` before K-means. Check feature ranges and segment distributions before accepting results.
