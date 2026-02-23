# Module 13: Clustering - Finding Hidden Groups

**Time:** 30-40 minutes

**Promise:** After this module, you'll understand how to automatically discover groups in data, evaluate cluster quality, and apply clustering to real business problems.

---

## The Setup

You have 10,000 support tickets. You could read them all, or...

You could have an algorithm automatically group similar tickets together, revealing the most common issue types without manual labeling.

**Clustering** finds natural groups in your data.

---

## The Mental Models

### 1. The Party Analogy

Imagine a party where people naturally form groups:
- Sports fans cluster in one corner
- Music lovers in another
- Tech enthusiasts near the gadgets

Clustering algorithms do the same with data points — find natural groupings based on similarity.

### 2. The Distance Game

Clustering is fundamentally about distance:
- Points close together → same cluster
- Points far apart → different clusters

The algorithm's job: draw boundaries that minimize within-cluster distances.

### 3. The Representative Finder

Each cluster has a "centroid" or "representative":
- K-means: The average of all points in the cluster
- K-medoids: An actual data point that's most central

---

## K-Means Clustering

The most popular clustering algorithm.

### How It Works

1. **Initialize:** Pick K random points as initial centers
2. **Assign:** Put each point in the cluster of its nearest center
3. **Update:** Move each center to the average of its points
4. **Repeat:** Until centers stop moving

### The Algorithm

```python
from sklearn.cluster import KMeans

kmeans = KMeans(n_clusters=5, random_state=42)
clusters = kmeans.fit_predict(data)

# Cluster centers
centers = kmeans.cluster_centers_
```

### Strengths
- Fast and scalable
- Easy to interpret
- Works well for spherical clusters

### Weaknesses
- Must specify K in advance
- Assumes spherical clusters
- Sensitive to initialization (use `n_init=10`)
- Sensitive to outliers

---

## Choosing K (Number of Clusters)

### The Elbow Method

Plot "inertia" (within-cluster sum of squares) vs K:

```python
inertias = []
for k in range(1, 11):
    km = KMeans(n_clusters=k, random_state=42)
    km.fit(data)
    inertias.append(km.inertia_)

plt.plot(range(1, 11), inertias, 'bo-')
plt.xlabel('K')
plt.ylabel('Inertia')
```

Look for the "elbow" — where adding more clusters gives diminishing returns.

### Silhouette Score

Measures how similar points are to their own cluster vs other clusters:

```python
from sklearn.metrics import silhouette_score

score = silhouette_score(data, clusters)
```

**Range:** -1 to 1
- **1:** Perfect clustering
- **0:** Overlapping clusters
- **< 0:** Points in wrong clusters

### Business Intuition

Sometimes the best K comes from domain knowledge:
- "We want to segment customers into 3-5 personas"
- "Our team can handle reviewing 10 issue categories"

---

## Other Clustering Algorithms

### Hierarchical Clustering

Builds a tree of clusters:
- **Agglomerative:** Start with each point as a cluster, merge closest pairs
- **Divisive:** Start with one cluster, recursively split

```python
from sklearn.cluster import AgglomerativeClustering

hc = AgglomerativeClustering(n_clusters=5)
clusters = hc.fit_predict(data)
```

**Pros:** No need to specify K; produces a dendrogram
**Cons:** Slow on large datasets

### DBSCAN

Density-based clustering:

```python
from sklearn.cluster import DBSCAN

dbscan = DBSCAN(eps=0.5, min_samples=5)
clusters = dbscan.fit_predict(data)
```

**Pros:** Finds arbitrary shapes; handles outliers (labels them -1)
**Cons:** Sensitive to eps and min_samples; struggles with varying densities

### When to Use What

| Situation | Algorithm |
|-----------|-----------|
| Know K, spherical clusters | K-means |
| Don't know K, want hierarchy | Agglomerative |
| Arbitrary shapes, outliers | DBSCAN |
| Very large data | K-means or Mini-batch K-means |

---

## Evaluating Clusters

### Internal Metrics (No Labels)

| Metric | Measures | Good Value |
|--------|----------|------------|
| **Silhouette** | Cohesion vs separation | Higher |
| **Inertia** | Within-cluster variance | Lower |
| **Calinski-Harabasz** | Ratio of between/within variance | Higher |

### External Metrics (With Labels)

If you have some labeled examples:

| Metric | Measures |
|--------|----------|
| **Adjusted Rand Index** | Agreement with true labels |
| **Normalized Mutual Info** | Shared information |

### Business Validation

The most important validation:
- Do clusters make sense to domain experts?
- Can you describe each cluster in plain language?
- Are clusters actionable?

---

## Practical Applications

### 1. Customer Segmentation

```python
# Cluster customers by behavior
features = ['recency', 'frequency', 'monetary']
kmeans = KMeans(n_clusters=4)
df['segment'] = kmeans.fit_predict(df[features])
```

Segments might reveal: "High-value loyalists", "At-risk churners", "New customers", "Bargain hunters"

### 2. Ticket Categorization

```python
# Cluster support tickets by embeddings
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')
embeddings = model.encode(ticket_texts)

kmeans = KMeans(n_clusters=10)
df['topic'] = kmeans.fit_predict(embeddings)
```

### 3. Anomaly Detection

Points far from all cluster centers may be anomalies:

```python
distances = kmeans.transform(data)  # Distance to each center
min_distances = distances.min(axis=1)
anomalies = min_distances > threshold
```

---

## Failure Modes

### 1. Wrong K

**Symptom:** Clusters are too broad (mixed topics) or too granular (split single topics).

**Fix:** Use elbow method + silhouette score + business intuition.

### 2. Scale Issues

**Symptom:** Features with larger scales dominate clustering.

**The Problem:** K-means uses Euclidean distance.

**Fix:** Standardize features before clustering.

### 3. Non-Spherical Clusters

**Symptom:** Poor silhouette scores despite visible structure.

**The Problem:** K-means assumes spherical clusters.

**Fix:** Use DBSCAN or spectral clustering.

### 4. Random Initialization

**Symptom:** Different results on each run.

**Fix:** Use `n_init=10` (default) or `init='k-means++'`.

---

## Business Translation

### Explaining Clustering

**Don't say:** "We used K-means with K=5 based on silhouette optimization."

**Do say:** "We automatically grouped customers into 5 segments based on their behavior patterns. Each segment has distinct characteristics we can target differently."

### Explaining Evaluation

**Don't say:** "The silhouette score is 0.45."

**Do say:** "Our segments are well-separated — customers in each group are more similar to each other than to other groups. The groupings make business sense when we examine them."

### Presenting Results

For each cluster, provide:
1. **Size:** How many items
2. **Name:** A descriptive label
3. **Profile:** Key characteristics
4. **Action:** Recommended treatment

---

## Practice

### Before the Lab

Open the **Interactive Playground** (`playground_clustering.html`):

1. Generate different data patterns (blobs, moons, circles)
2. Apply K-means and see cluster assignments
3. Adjust K and watch silhouette score
4. Try DBSCAN on non-spherical data

### Key Observations

- K-means struggles with non-spherical shapes
- Elbow method gives guidance but isn't definitive
- Silhouette score helps compare different K values
- Business context matters as much as metrics

---

## Quick Reference

### K-Means Quick Start

```python
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score

# 1. Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# 2. Find optimal K
for k in range(2, 11):
    km = KMeans(n_clusters=k, random_state=42)
    labels = km.fit_predict(X_scaled)
    print(f"K={k}: silhouette={silhouette_score(X_scaled, labels):.3f}")

# 3. Fit final model
kmeans = KMeans(n_clusters=best_k, random_state=42)
clusters = kmeans.fit_predict(X_scaled)
```

### Silhouette Interpretation

| Score | Interpretation |
|-------|----------------|
| 0.7+ | Strong structure |
| 0.5-0.7 | Reasonable structure |
| 0.25-0.5 | Weak structure |
| < 0.25 | No substantial structure |

---

## Done Checklist

- [ ] Understood K-means algorithm
- [ ] Applied elbow method and silhouette score
- [ ] Explored clustering in the playground
- [ ] Connected clusters to business segments
- [ ] Completed the notebook lab
- [ ] Passed the quiz
