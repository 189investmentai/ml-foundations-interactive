# Debug Drill Spec: Module 13 - The Wrong Clustering

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/debug_drills/drill_13_wrong_clustering.ipynb` |
| Solution | `notebooks/answer_keys/solution_13_wrong_clustering.ipynb` |
| Runtime | ~20 minutes |
| Bug Type | Unscaled Features + Wrong Algorithm |

## Scenario

A colleague segmented customers using K-means clustering. "I found 3 distinct customer segments!" they announce proudly. But the silhouette score is poor, and the clusters don't make business sense. The data has two issues: (1) features are on different scales (monthly_spend ~50–350, engagement_score ~20–80), so spend dominates the distance; (2) the true structure is crescent-shaped (from make_moons), and K-means assumes spherical clusters. The colleague used K=3 on unscaled data with the wrong algorithm.

## The Bug

```python
# ===== COLLEAGUE'S CODE (TWO BUGS!) =====

# BUG 1: No feature scaling (spend and engagement are on different scales)
X = df[['monthly_spend', 'engagement_score']].values  # <-- NOT SCALED!

# BUG 2: Using K-means on non-spherical data (should use DBSCAN)
kmeans = KMeans(n_clusters=3, random_state=42)  # <-- Wrong K and wrong algorithm!
df['cluster'] = kmeans.fit_predict(X)
```

### Why It's Wrong

**Bug 1:** Monthly spend (range ~300) dominates engagement (range ~60). K-means minimizes within-cluster variance; without scaling, the algorithm effectively ignores engagement because its contribution to Euclidean distance is tiny. Clusters will split mainly on spend.

**Bug 2:** The data is generated from `make_moons`—two crescent-shaped groups. K-means assumes spherical, convex clusters. It will cut the crescents incorrectly (e.g., into 3 arbitrary regions) and produce a low silhouette score. DBSCAN can find arbitrary-shaped clusters based on density.

## Investigation Steps

1. **Inspect feature scales** - Check describe(); spend and engagement have very different ranges
2. **Visualize the data** - Plot true segments; notice crescent/non-spherical structure
3. **Check silhouette** - Low score indicates poor cluster cohesion
4. **Fix both issues** - Scale features; use DBSCAN for non-spherical data

## The Fix

```python
# Fix 1: Scale the features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(df[['monthly_spend', 'engagement_score']])

# Fix 2: Use DBSCAN for non-spherical clusters
dbscan = DBSCAN(eps=0.3, min_samples=10)
df['cluster_fixed'] = dbscan.fit_predict(X_scaled)
```

## Self-Checks

| Check | Assertion |
|-------|-----------|
| Silhouette improved | `sil_fixed > sil_broken` |
| Clusters match true structure | 2 clusters found (matching make_moons) |

## Postmortem Template

### What happened:
- K-means produced poor silhouette and nonsensical segments

### Root cause:
- No scaling (spend dominated); K-means used on non-spherical data

### How to prevent:
- Always scale features before distance-based clustering
- Match algorithm to cluster shape: K-means for spherical, DBSCAN for arbitrary shapes

## Learning Objectives

After completing this drill, learners will be able to:
1. Explain why scaling is required for K-means
2. Choose DBSCAN over K-means for non-spherical cluster shapes
3. Interpret silhouette score and validate cluster quality
