# Retrieval Cheatsheet

## Core Idea

Retrieval = finding relevant documents from a large corpus, fast.

---

## Two-Stage Pipeline

1. **Retrieve:** Get ~100 candidates (fast, recall-focused)
2. **Rerank:** Order by relevance (slow, precision-focused)

---

## Methods Comparison

| Method | Strengths | Weaknesses |
|--------|-----------|------------|
| BM25 (keyword) | Fast, exact matches | No synonyms |
| Dense (embeddings) | Semantic | Slower, GPU |
| Hybrid | Best of both | Complex |

---

## Quick Code

```python
from sentence_transformers import SentenceTransformer
import faiss

# Encode
model = SentenceTransformer('all-MiniLM-L6-v2')
doc_embs = model.encode(docs)

# Index
index = faiss.IndexFlatIP(doc_embs.shape[1])
faiss.normalize_L2(doc_embs)
index.add(doc_embs)

# Search
query_emb = model.encode([query])
faiss.normalize_L2(query_emb)
D, I = index.search(query_emb, k=10)
```

---

## Evaluation Metrics

| Metric | Question |
|--------|----------|
| Recall@K | Relevant in top K? |
| Precision@K | Top K relevant? |
| MRR | First relevant position? |

---

## RAG Chunking

| Content | Chunk Size | Overlap |
|---------|------------|---------|
| FAQs | Full doc | None |
| Articles | 300-500 | 50 |
| Long docs | Paragraph | 1 para |

---

## Common Failures

| Issue | Fix |
|-------|-----|
| Synonyms missed | Use semantic |
| Exact terms missed | Use hybrid |
| Context cut off | Add overlap |
| Domain terms fail | Fine-tune model |

---

## Business Translation

**Semantic search:** "Finds related content by meaning"

**Hybrid:** "Combines keyword + meaning for best results"

**RAG:** "AI looks up relevant info before answering"
