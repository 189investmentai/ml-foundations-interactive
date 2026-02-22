# Module 7 Cheat Sheet: Clustering & Anomaly Detection

---

## K-Means Quick Reference

```python
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# Always scale first!
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Cluster
kmeans = KMeans(n_clusters=4, random_state=42)
labels = kmeans.fit_predict(X_scaled)
```

---

## Choosing K

| Method | Code | Look for |
|--------|------|----------|
| **Elbow** | Plot inertia vs K | Where curve bends |
| **Silhouette** | `silhouette_score(X, labels)` | Higher is better (max 1) |
| **Business** | Ask stakeholders | "How many segments can you handle?" |

```python
# Silhouette scores
from sklearn.metrics import silhouette_score

for k in range(2, 10):
    labels = KMeans(n_clusters=k).fit_predict(X_scaled)
    print(f"K={k}: {silhouette_score(X_scaled, labels):.3f}")
```

---

## Interpreting Clusters

```python
# Profile each cluster
for cluster in range(k):
    subset = df[df['cluster'] == cluster]
    print(f"\n=== Cluster {cluster} ({len(subset)} items) ===")
    for feature in features:
        print(f"  {feature}: {subset[feature].mean():.1f}")
```

**Give meaningful names:** "Power Users" not "Cluster 2"

---

## Anomaly Detection

```python
from sklearn.ensemble import IsolationForest

iso = IsolationForest(contamination=0.05)  # Expect 5% anomalies
scores = iso.fit_predict(X_scaled)

# -1 = anomaly, 1 = normal
anomalies = df[scores == -1]
```

---

## When to Use What

| Goal | Method |
|------|--------|
| Customer segments | K-Means |
| Find outliers/fraud | Isolation Forest |
| Similar items | K-Means or similarity search |
| Predict something | Use supervised learning instead |

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| No scaling | Always `StandardScaler()` first |
| Over-interpreting | Check silhouette, visualize, validate with business |
| Using for prediction | Clustering is for exploration, not prediction |
| Wrong contamination | Tune based on domain knowledge |

---

## Visualization

```python
from sklearn.decomposition import PCA
import matplotlib.pyplot as plt

# Reduce to 2D for plotting
pca = PCA(n_components=2)
X_2d = pca.fit_transform(X_scaled)

plt.scatter(X_2d[:, 0], X_2d[:, 1], c=labels, cmap='viridis')
plt.title("Clusters (PCA projection)")
```
