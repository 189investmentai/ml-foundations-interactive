# Embeddings Cheatsheet

## Core Idea

**Embedding:** Turn anything (text, users, items) into dense vectors where similar things are close together.

---

## Key Models

| Model | Dimensions | Use Case |
|-------|------------|----------|
| all-MiniLM-L6-v2 | 384 | Fast, general text |
| all-mpnet-base-v2 | 768 | Higher quality |
| OpenAI ada-002 | 1536 | API-based, high quality |

---

## Similarity Metrics

**Cosine Similarity (use for text):**
```
sim = (A · B) / (||A|| × ||B||)
Range: -1 to 1
```

**Euclidean Distance:**
```
dist = √Σ(Aᵢ - Bᵢ)²
Range: 0 to ∞
```

---

## Similarity Interpretation

| Cosine | Meaning |
|--------|---------|
| > 0.9 | Near-duplicate |
| 0.7-0.9 | Related |
| 0.5-0.7 | Somewhat related |
| < 0.5 | Different |

---

## Quick Code

```python
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

# Load model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Encode texts
embeddings = model.encode(["text 1", "text 2"])

# Compute similarity
sims = cosine_similarity(embeddings)

# Find top-k nearest
from sklearn.neighbors import NearestNeighbors
nn = NearestNeighbors(n_neighbors=5, metric='cosine')
nn.fit(embeddings)
distances, indices = nn.kneighbors(query_emb)
```

---

## Visualization

```python
from sklearn.manifold import TSNE

tsne = TSNE(n_components=2, random_state=42)
coords = tsne.fit_transform(embeddings)
plt.scatter(coords[:, 0], coords[:, 1])
```

| Method | Speed | Quality |
|--------|-------|---------|
| PCA | Fast | Linear only |
| t-SNE | Slow | Good local |
| UMAP | Medium | Good global |

---

## Common Uses

| Use Case | How |
|----------|-----|
| Semantic search | Find nearest to query |
| Recommendations | Users with similar embeddings |
| Clustering | K-means on embeddings |
| Duplicate detection | High similarity threshold |

---

## Red Flags

| Issue | Cause | Fix |
|-------|-------|-----|
| Bad similarity | Wrong metric | Use cosine for text |
| Domain terms fail | Generic model | Fine-tune or domain model |
| Can't compare | Different models | Use same model |

---

## Business Translation

**Embeddings:** "Coordinates that capture meaning"

**Similarity search:** "Find related items even with different words"

**Clustering:** "Automatically group similar items"
