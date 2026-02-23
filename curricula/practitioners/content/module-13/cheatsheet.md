# Clustering Cheatsheet

## Core Idea

Clustering = finding natural groups in data based on similarity.

---

## K-Means Quick Start

```python
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# Always scale first!
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Fit
kmeans = KMeans(n_clusters=5, random_state=42)
clusters = kmeans.fit_predict(X_scaled)
```

---

## Choosing K

### Elbow Method
```python
inertias = []
for k in range(1, 11):
    km = KMeans(n_clusters=k).fit(X)
    inertias.append(km.inertia_)
plt.plot(range(1,11), inertias, 'bo-')
# Look for the "elbow"
```

### Silhouette Score
```python
from sklearn.metrics import silhouette_score
score = silhouette_score(X, clusters)
# Range: -1 to 1, higher = better
```

---

## Silhouette Interpretation

| Score | Meaning |
|-------|---------|
| 0.7+ | Strong clusters |
| 0.5-0.7 | Good |
| 0.25-0.5 | Weak |
| < 0.25 | Poor/overlapping |

---

## Algorithm Selection

| Situation | Use |
|-----------|-----|
| Know K, spherical | K-means |
| Unknown K | Agglomerative |
| Arbitrary shapes | DBSCAN |
| Very large data | Mini-batch K-means |

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Unscaled features | StandardScaler first |
| Random results | Set `random_state=42` |
| Wrong K | Use elbow + silhouette |
| K-means on weird shapes | Use DBSCAN |

---

## Cluster Profiles

For each cluster, report:
1. **Size:** N items
2. **Name:** Descriptive label
3. **Profile:** Key stats
4. **Action:** What to do

---

## Business Translation

**K-means:** "Automatic grouping based on similarity"

**Silhouette:** "How distinct the groups are"

**Cluster:** "A segment with shared characteristics"
