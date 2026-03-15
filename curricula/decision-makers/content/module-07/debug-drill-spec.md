# Module 7: Debug Drill Spec

**Title:** The Wrong K  
**Time:** ~15 minutes  
**Goal:** Diagnose why K=20 clusters produce redundant, unusable segments

---

## The Setup

> A colleague ran K-Means with K=20 clusters. Marketing is confused:
> "Cluster 7 and Cluster 12 look identical! Half these segments overlap.
> We can't build 20 different campaigns - give us something actionable."

---

## The Buggy Code

```python
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

features = ['tenure_months', 'logins_last_30d', 'orders_last_30d', 'support_tickets_last_30d']
X = df[features].fillna(0)

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# ===== BUG IS HERE =====
# "More clusters = more granular = better!"
k = 20
kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
df['cluster'] = kmeans.fit_predict(X_scaled)
# =======================

print(f"Created {k} clusters")
print(df['cluster'].value_counts().sort_index())
```

**Output:**
```
20 clusters, many with near-identical profiles
```

---

## The Bug

### Problem: K chosen arbitrarily - way too many clusters

With K=20 on a dataset with only 4 features, many clusters split the same natural group into fragments. The result is redundant segments that can't be distinguished or actioned differently.

**Evidence:**
```python
profiles = df.groupby('cluster')[features].mean().round(1)
# Multiple clusters have nearly identical tenure, login, order, and ticket averages
```

---

## The Fix

Use the Elbow Method to find the right K, then validate that clusters are meaningfully different:

```python
inertias = []
k_range = range(2, 15)

for k in k_range:
    km = KMeans(n_clusters=k, random_state=42, n_init=10)
    km.fit(X_scaled)
    inertias.append(km.inertia_)

# Plot elbow
plt.plot(k_range, inertias, 'bo-')
plt.xlabel('K')
plt.ylabel('Inertia')
plt.title('Elbow Method')
plt.show()

# Elbow suggests K ≈ 4
k_optimal = 4
kmeans_fixed = KMeans(n_clusters=k_optimal, random_state=42, n_init=10)
df['cluster_fixed'] = kmeans_fixed.fit_predict(X_scaled)
```

**After fix:**
```
4 clusters with distinct profiles and different churn rates
```

Each cluster maps to an actionable segment that marketing can target differently.

---

## What Learners Must Do

1. **Inspect profiles:** Spot near-identical clusters in the K=20 output

2. **Run the Elbow Method:** Plot inertia vs K, find the bend

3. **Choose a better K:** Rerun clustering with the elbow-suggested K

4. **Validate:** Confirm clusters have meaningfully different churn rates

5. **Name the segments:** Give each cluster a business-friendly label

6. **Write a 3-bullet postmortem**

---

## Self-Check After Fix

```python
assert k_optimal < 10, "K is still too high"
assert k_optimal >= 3, "K is too low to be useful"

churn_rates = df.groupby('cluster_fixed')['churn_30d'].mean()
churn_spread = churn_rates.max() - churn_rates.min()
assert churn_spread > 0.05, "Clusters should have different churn rates"

print(f"✓ Fixed! {k_optimal} distinct, actionable segments")
```

---

## Postmortem Template

**Symptom:**
> K=20 produced redundant segments - multiple clusters had near-identical profiles, making the segmentation unusable for marketing campaigns.

**Root cause:**
> K was chosen arbitrarily ("more is better") without validating that clusters are distinct. With only 4 features, the data doesn't support 20 natural groups, so K-Means split real segments into indistinguishable fragments.

**Prevention:**
> Use the Elbow Method (or silhouette score) to choose K. After clustering, always check that segments have meaningfully different profiles and different business outcomes (e.g., churn rates). If you can't name a segment or explain how to treat it differently, you have too many.
