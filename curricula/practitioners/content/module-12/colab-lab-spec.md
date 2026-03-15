# Colab Lab Spec: Module 12 - Embeddings

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/module_12_embeddings.ipynb` |
| Runtime | ~25 minutes |
| Dataset | 12 support tickets (hardcoded) |
| Target | N/A (similarity/retrieval) |

## Learning Objectives

After completing this lab, learners will be able to:
1. Convert text to embeddings using TF-IDF (or sentence-transformers in production)
2. Compute cosine similarity and Euclidean distance between vectors
3. Build a nearest-neighbor search for semantic similarity
4. Visualize embeddings in 2D (PCA)
5. Use similarity thresholds for duplicate detection

## Sections

### 1. Setup (1 min)
- Import numpy, pandas, matplotlib, cosine_similarity, euclidean_distances, TSNE, PCA, NearestNeighbors, TfidfVectorizer

### 2. Part 1: What Are Embeddings? (3 min)
- Load 12 support tickets (password, shipping, refund topics)
- Fit TfidfVectorizer, produce embeddings matrix
- **Self-check:** Print embedding shape (12 × vocab_size)

### 3. Part 2: Similarity Metrics (4 min)
- Compute cosine similarity matrix
- Visualize heatmap; similar tickets (same topic) have higher similarity
- Compare cosine vs Euclidean for similar vs different text pairs
- **Self-check:** Similar texts have higher cosine similarity

### 4. Part 3: Nearest Neighbor Search (4 min)
- Build NearestNeighbors index with cosine metric
- Implement search(query, k) function
- Test: "login issue", "where is my package", "I want my money back"
- **Self-check:** Results match semantic intent

### 5. Part 4: Embedding Visualization (4 min)
- Reduce to 2D with PCA
- Scatter plot colored by topic (password, shipping, refund)
- **Self-check:** Similar tickets cluster in 2D

### 6. Part 5: Pre-trained Embeddings (2 min)
- Document sentence-transformers usage for production
- Recommend all-MiniLM-L6-v2, all-mpnet-base-v2

### 7. Part 6: TODO - Build Duplicate Detector (4 min)
- **TODO:** Find pairs with similarity > threshold (e.g., 0.7)
- **TODO:** Experiment with different thresholds

### 8. Part 7: TODO - Threshold Selection (3 min)
- **TODO:** Plot number of pairs above threshold vs threshold value
- Discuss precision/recall trade-off

### 9. Stakeholder Summary (2 min)
- **TODO:** Write 3-bullet summary: what embeddings do, business application, threshold trade-off

## Self-Checks

| Check | Assertion |
|-------|-----------|
| One embedding per ticket | `embeddings.shape[0] == len(tickets)` |
| Positive dimensionality | `embeddings.shape[1] >= 1` |
| Similarity matrix shape | `sim_matrix.shape == (len(tickets), len(tickets))` |

## Expected Outputs

- Embedding dimensions: varies (TF-IDF vocab size)
- Similar tickets (e.g., password-related): cosine similarity > 0.3
- Different topics: cosine similarity < 0.2
- Duplicate pairs: depends on threshold (e.g., 2–4 at 0.7)

## TODO Blocks

1. **Find potential duplicate tickets** (Part 6) – Loop over pairs, report those above threshold
2. **Try different thresholds** (Part 6) – Observe how threshold affects pair count
3. **Analyze threshold vs pair count** (Part 7) – Bar chart of pairs above threshold
4. **Write 3-bullet stakeholder summary** (Part 8) – Template: embeddings, business use, threshold recommendation

## Dependencies

- numpy, pandas, matplotlib
- sklearn: metrics.pairwise (cosine_similarity, euclidean_distances), manifold (TSNE), decomposition (PCA), neighbors (NearestNeighbors), feature_extraction.text (TfidfVectorizer)
- Optional: sentence-transformers (for production)
