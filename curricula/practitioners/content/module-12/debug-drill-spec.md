# Debug Drill Spec: Module 12 - The Wrong Distance (Similarity Metric)

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/debug_drills/drill_12_wrong_similarity.ipynb` |
| Solution | `notebooks/answer_keys/solution_12_wrong_similarity.ipynb` |
| Runtime | ~20 minutes |
| Bug Type | Wrong Distance Metric for Embeddings |

## Scenario

A colleague built a support ticket similarity system to find duplicate tickets. "I'm using Euclidean distance like we learned in school!" they say. But the results are terrible: completely unrelated tickets are matched. Queries like "password problem" return shipping or refund tickets instead of login-related ones. The issue is that Euclidean distance is a poor choice for sparse, high-dimensional text embeddings (e.g., TF-IDF). Cosine similarity (or cosine distance) is appropriate for directional similarity in high dimensions.

## The Bug

```python
# ===== COLLEAGUE'S CODE (BUG: WRONG METRIC) =====

# Using Euclidean distance (wrong for sparse high-dim text!)
nn_euclidean = NearestNeighbors(n_neighbors=3, metric='euclidean')  # <-- BUG!
nn_euclidean.fit(embeddings)

def search_euclidean(query):
    query_emb = vectorizer.transform([query]).toarray()
    distances, indices = nn_euclidean.kneighbors(query_emb)
    # ...
```

### Why It's Wrong

TF-IDF produces sparse, high-dimensional vectors. Euclidean distance is sensitive to magnitude: longer documents have larger vectors and can be "far" from shorter ones even when they're about the same topic. Cosine similarity measures the angle between vectors—it's magnitude-invariant and captures semantic direction. For text, we care about "same topic" (similar direction), not "same length." Euclidean also suffers in high dimensions (curse of dimensionality) and with sparse vectors where most dimensions are zero.

## Investigation Steps

1. **Run the broken search** - Observe that queries return wrong-topic matches
2. **Understand the embedding space** - TF-IDF is sparse and high-dimensional
3. **Switch to cosine** - Use `metric='cosine'` in NearestNeighbors
4. **Evaluate retrieval quality** - Check % of nearest neighbors from same topic; cosine should outperform

## The Fix

```python
# Fix: Use cosine similarity
nn_cosine = NearestNeighbors(n_neighbors=3, metric='cosine')
nn_cosine.fit(embeddings)

def search_cosine(query):
    query_emb = vectorizer.transform([query]).toarray()
    distances, indices = nn_cosine.kneighbors(query_emb)
    # Cosine distance = 1 - similarity; display as similarity for interpretability
    for dist, idx in zip(distances[0], indices[0]):
        similarity = 1 - dist
        # ...
```

## Self-Checks

| Check | Assertion |
|-------|-----------|
| Cosine outperforms Euclidean for text | `acc_cosine > acc_euclidean` |
| Cosine retrieval quality is good | `acc_cosine > 0.7` |

## Postmortem Template

### What happened:
- Similarity search returned unrelated tickets; Euclidean distance gave bad matches

### Root cause:
- Euclidean distance is wrong for sparse, high-dimensional text embeddings; magnitude dominates direction

### How to prevent:
- Use cosine similarity (or cosine distance) for text embeddings and high-dimensional sparse vectors
- Evaluate retrieval with domain-specific metrics (e.g., same-topic rate)

## Learning Objectives

After completing this drill, learners will be able to:
1. Explain why Euclidean distance fails for sparse text embeddings
2. Choose cosine similarity for text and high-dimensional vectors
3. Evaluate retrieval quality with appropriate metrics
