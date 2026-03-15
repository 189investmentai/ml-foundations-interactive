# Module 8 Cheat Sheet: Embeddings & Similarity Search

---

## What Are Embeddings?

Vectors (lists of numbers) that represent items in a way where **similar items have similar vectors**.

```
"Cancel subscription" → [0.12, -0.34, 0.82, ...]
"End my membership"   → [0.15, -0.31, 0.79, ...]  ← Close!
"Track my order"      → [-0.45, 0.23, -0.11, ...] ← Far
```

---

## Quick Setup

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')
embeddings = model.encode(texts)  # Shape: (n_texts, 384)
```

---

## Measuring Similarity

```python
from sklearn.metrics.pairwise import cosine_similarity

# Cosine similarity (1 = same, 0 = unrelated)
sim = cosine_similarity([emb1], [emb2])[0][0]
```

---

## FAISS for Fast Search

```python
import faiss

# Build index
index = faiss.IndexFlatL2(embeddings.shape[1])
index.add(embeddings)

# Search for k nearest
distances, indices = index.search(query_emb, k=5)
```

---

## Use Cases

| Problem | Approach |
|---------|----------|
| Similar products | Product embeddings from co-purchase |
| Ticket routing | Text embeddings, match to articles |
| Customer lookalikes | User embeddings from behavior |
| Semantic search | Text embeddings + vector search |

---

## Common Embedding Models

| Model | Best For | Size |
|-------|----------|------|
| `all-MiniLM-L6-v2` | General text (fast) | 384d |
| `all-mpnet-base-v2` | General text (better) | 768d |
| `text-embedding-ada-002` | OpenAI API | 1536d |
| Word2Vec/FastText | Words, products | 50-300d |

---

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| Wrong model for domain | Use domain-specific or fine-tune |
| Not normalizing | L2 normalize or use cosine similarity |
| Exact search at scale | Use FAISS or vector database |
| No evaluation | Test with known similar pairs |
