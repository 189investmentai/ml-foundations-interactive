# Module 7: Colab Lab Spec

**Lab Title:** Customer Segmentation  
**Time:** ~20 minutes  
**Goal:** Cluster customers and find anomalies

---

## Lab Structure

### Cell 1: Setup

```python
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import IsolationForest
from sklearn.metrics import silhouette_score
import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

df = load_streamcart_customers()
features = ['tenure_months', 'orders_total', 'avg_order_value', 
            'logins_per_month', 'support_tickets_total']
X = df[features].fillna(0)
print(f"Customers: {len(df)}")
```

---

### Cell 2: TODO - Scale Features

```python
# TODO: Scale features using StandardScaler
# scaler = ???
# X_scaled = ???
```

**Self-check:**
```python
assert X_scaled.mean(axis=0).max() < 0.01, "Features should be centered"
assert abs(X_scaled.std(axis=0).mean() - 1) < 0.01, "Features should have unit variance"
print("✓ Features scaled correctly")
```

---

### Cell 3: Find Optimal K

```python
# Calculate silhouette scores for different K
silhouette_scores = []
for k in range(2, 10):
    kmeans = KMeans(n_clusters=k, random_state=42)
    labels = kmeans.fit_predict(X_scaled)
    score = silhouette_score(X_scaled, labels)
    silhouette_scores.append(score)
    print(f"K={k}: Silhouette={score:.3f}")

plt.plot(range(2, 10), silhouette_scores, 'o-')
plt.xlabel('K')
plt.ylabel('Silhouette Score')
plt.title('Choosing K')
plt.show()
```

---

### Cell 4: TODO - Cluster with Chosen K

```python
# TODO: Choose K based on silhouette scores and cluster
# kmeans = ???
# df['segment'] = ???
```

---

### Cell 5: Profile Segments

```python
# See what each segment looks like
for segment in sorted(df['segment'].unique()):
    subset = df[df['segment'] == segment]
    print(f"\n=== Segment {segment} ({len(subset)} customers, {len(subset)/len(df):.1%}) ===")
    for feature in features:
        print(f"  {feature}: {subset[feature].mean():.1f}")
```

---

### Cell 6: TODO - Name Segments

```python
# TODO: Based on the profiles above, give each segment a meaningful name

# segment_names = {
#     0: "???",
#     1: "???",
#     2: "???",
#     3: "???"
# }
# df['segment_name'] = df['segment'].map(segment_names)
```

---

### Cell 7: Anomaly Detection

```python
# Find unusual customers
iso_forest = IsolationForest(contamination=0.05, random_state=42)
df['is_anomaly'] = iso_forest.fit_predict(X_scaled) == -1

anomalies = df[df['is_anomaly']]
print(f"Found {len(anomalies)} anomalies ({len(anomalies)/len(df):.1%})")
print("\nAnomaly profiles:")
print(anomalies[features].describe())
```

---

### Cell 8: Visualize with PCA

```python
from sklearn.decomposition import PCA

pca = PCA(n_components=2)
X_2d = pca.fit_transform(X_scaled)

plt.figure(figsize=(10, 8))
scatter = plt.scatter(X_2d[:, 0], X_2d[:, 1], c=df['segment'], cmap='viridis', alpha=0.5)
plt.scatter(X_2d[df['is_anomaly'], 0], X_2d[df['is_anomaly'], 1], c='red', marker='x', s=100, label='Anomalies')
plt.colorbar(scatter, label='Segment')
plt.legend()
plt.title('Customer Segments (PCA)')
plt.show()
```

---

### Cell 9: Reflection

```python
# Answer:
# 1. What K did you choose and why?
# 2. What names did you give each segment?
# 3. What characterizes the anomalies?
```
