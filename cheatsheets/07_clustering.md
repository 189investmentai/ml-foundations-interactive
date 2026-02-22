# Cheat Sheet: Clustering

## Core Idea

Find natural groups in data without labels. Customers "cluster" around similar behaviors.

## K-Means Quick Start

```python
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# Always scale first!
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Cluster
kmeans = KMeans(n_clusters=4, random_state=42, n_init=10)
df['cluster'] = kmeans.fit_predict(X_scaled)
```

## Choosing K: Elbow Method

```python
inertias = []
for k in range(2, 15):
    km = KMeans(n_clusters=k, random_state=42, n_init=10)
    km.fit(X_scaled)
    inertias.append(km.inertia_)

plt.plot(range(2, 15), inertias, 'bo-')
plt.xlabel('K')
plt.ylabel('Inertia')
plt.title('Find the elbow')
```

**Pick K where the curve bends** (diminishing returns).

## Profiling Clusters

```python
# What makes each cluster different?
profiles = df.groupby('cluster')[features + ['churn_30d']].mean()
print(profiles.round(2))
```

**Good clusters should:**
- Have different averages across features
- Have different outcome rates (e.g., churn)
- Be interpretable ("high tenure, low engagement")

## Naming Clusters

| Profile | Name | Action |
|---|---|---|
| High tenure, high logins, low churn | Loyal | Referral program |
| New, high activity, medium churn | Promising | Onboarding nurture |
| Medium tenure, declining logins | At Risk | Retention offer |
| Low engagement, high support | Churning | Win-back campaign |

## Common Mistakes

| Mistake | Fix |
|---|---|
| Forgot to scale | Use StandardScaler |
| Too many clusters | Use elbow method |
| Clusters not actionable | Profile and name each one |
| Using with labels | Use classification instead |

## When to Use Clustering

**Good for:**
- Customer segmentation
- Finding natural groups
- Exploratory analysis
- No labels available

**Not good for:**
- When you have labels (use classification)
- When segments are predefined
- Real-time predictions

## Anomaly Detection: Isolation Forest

Find outliers (fraud, unusual behavior).

```python
from sklearn.ensemble import IsolationForest

iso = IsolationForest(contamination=0.05, random_state=42)
df['is_anomaly'] = iso.fit_predict(X_scaled)
# -1 = anomaly, 1 = normal

anomalies = df[df['is_anomaly'] == -1]
print(f"Found {len(anomalies)} anomalies")
```

## Quick Template

```python
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# 1. Prepare
features = ['tenure_months', 'logins_last_30d', 'orders_last_30d']
X = df[features].fillna(0)
X_scaled = StandardScaler().fit_transform(X)

# 2. Find K (elbow method)
# ... run loop, find bend ...

# 3. Cluster
kmeans = KMeans(n_clusters=4, random_state=42, n_init=10)
df['segment'] = kmeans.fit_predict(X_scaled)

# 4. Profile
print(df.groupby('segment')[features + ['churn_30d']].mean().round(2))

# 5. Name and act
segment_names = {0: 'Loyal', 1: 'At Risk', 2: 'New', 3: 'Churning'}
df['segment_name'] = df['segment'].map(segment_names)
```
