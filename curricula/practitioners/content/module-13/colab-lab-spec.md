# Colab Lab Spec: Module 13 - Clustering

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/module_13_clustering.ipynb` |
| Runtime | ~25 minutes |
| Dataset | Synthetic RFM (500 customers, 4 segments) |
| Target | N/A (unsupervised) |

## Learning Objectives

After completing this lab, learners will be able to:
1. Prepare features for clustering (scale before K-means)
2. Use the elbow method and silhouette score to choose K
3. Fit K-means and interpret cluster profiles
4. Compare K-means vs DBSCAN on non-spherical data
5. Create actionable cluster names and stakeholder summaries

## Sections

### 1. Setup (1 min)
- Import KMeans, DBSCAN, StandardScaler, silhouette_score, silhouette_samples, make_blobs, make_moons

### 2. Part 1: Generate Customer Data (3 min)
- Create 500 customers with RFM (recency_days, frequency, monetary)
- 4 true segments: loyal_high_value, loyal_low_value, at_risk, new
- Visualize by true segment (algorithm doesn't see labels)
- **Self-check:** 4 segments in data

### 3. Part 2: Prepare Features (2 min)
- Select recency_days, frequency, monetary
- Scale with StandardScaler (mean=0, std=1)
- **Self-check:** Without scaling, monetary would dominate

### 4. Part 3: Elbow Method (3 min)
- Fit K-means for K=2..10, record inertia
- Plot elbow curve; mark elbow at K=4
- **Self-check:** Curve bends around K=4

### 5. Part 4: Silhouette Analysis (4 min)
- Compute silhouette score for each K
- Plot bar chart; best K by silhouette
- **Self-check:** `best_k == 4` for this data

### 6. Part 5: Fit K-Means with Best K (3 min)
- Fit KMeans(n_clusters=4)
- Assign cluster labels to df
- Visualize clusters in 2D projections
- **Self-check:** 4 clusters assigned

### 7. Part 6: Cluster Profiles (4 min)
- Aggregate by cluster: mean, std for recency, frequency, monetary
- Name clusters: Loyal High-Value, Loyal Low-Value, At-Risk, New/Developing
- **Self-check:** Profiles describe all 4 clusters; sizes sum to total

### 8. Part 7: Compare to True Segments (2 min)
- Cross-tabulate true_segment vs cluster
- **Self-check:** K-means recovers structure similar to true segments

### 9. Part 8: TODO - K-Means on Non-Spherical Data (4 min)
- **TODO:** Generate make_moons data
- Compare K-means vs DBSCAN; K-means fails, DBSCAN finds moon shapes
- **Self-check:** DBSCAN silhouette > K-means on moons

### 10. Stakeholder Summary (2 min)
- **TODO:** Write 3-bullet summary: segments discovered, key profiles, recommended actions

## Self-Checks

| Check | Assertion |
|-------|-----------|
| Cluster column exists | `'cluster' in df.columns` |
| 4 clusters | `df['cluster'].nunique() == 4` |
| Silhouette in [0,1] | `0 <= silhouette_score(X_scaled, df['cluster']) <= 1` |
| Best K is 4 | `best_k == 4` |
| Profiles for 4 clusters | `len(profiles) == 4` |
| Cluster sizes sum to total | `profiles['size'].sum() == len(df)` |

## Expected Outputs

- Best K (elbow + silhouette): 4
- Silhouette score: ~0.4–0.6
- Cluster profiles: Loyal High-Value, Loyal Low-Value, At-Risk, New/Developing
- DBSCAN on moons: better silhouette than K-means

## TODO Blocks

1. **K-means on moon-shaped data** (Part 8) – Run K-means and DBSCAN on make_moons; compare
2. **Write 3-bullet stakeholder summary** (Part 9) – Template: segments, profiles, recommended actions

## Dependencies

- numpy, pandas, matplotlib
- sklearn: cluster (KMeans, DBSCAN), preprocessing (StandardScaler), metrics (silhouette_score, silhouette_samples), datasets (make_blobs, make_moons)
