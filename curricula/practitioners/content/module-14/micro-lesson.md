# Module 14: Retrieval - Finding Needles in Haystacks

**Time:** 30-40 minutes

**Promise:** After this module, you'll understand how to build retrieval systems that find relevant information efficiently, including the foundations for RAG (Retrieval-Augmented Generation).

---

## The Setup

You have:
- 100,000 support articles
- 10,000 product descriptions
- 1 million past tickets

A user asks: "How do I cancel my subscription?"

**Retrieval** finds the most relevant documents instantly.

---

## The Mental Models

### 1. The Library Analogy

Traditional search: Look up keywords in an index (like a library catalog)

Semantic search: Find books that are *about* what you need, even if they use different words

Retrieval is building a better library catalog.

### 2. The Two-Stage Pipeline

Most retrieval systems work in two stages:

1. **Retrieval:** Cast a wide net, get ~100 candidates (fast, recall-focused)
2. **Ranking:** Rerank candidates by relevance (slow, precision-focused)

### 3. The Embedding Space Navigation

Retrieval = navigation in embedding space:
- Your query has coordinates
- Find documents with nearby coordinates
- "Nearby" = semantically relevant

---

## How Retrieval Works

### Step 1: Index Documents

```python
# Compute embeddings for all documents
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')
doc_embeddings = model.encode(documents)

# Build index (for fast lookup)
import faiss
index = faiss.IndexFlatIP(doc_embeddings.shape[1])
index.add(doc_embeddings)
```

### Step 2: Query at Runtime

```python
# Encode query
query_embedding = model.encode(["cancel subscription"])

# Find nearest neighbors
distances, indices = index.search(query_embedding, k=10)

# Return top documents
results = [documents[i] for i in indices[0]]
```

---

## Retrieval Methods

### 1. Keyword Search (BM25)

Traditional approach based on term frequency.

```python
from rank_bm25 import BM25Okapi

tokenized_docs = [doc.split() for doc in documents]
bm25 = BM25Okapi(tokenized_docs)

scores = bm25.get_scores(query.split())
```

**Pros:** Fast, interpretable, works with exact terms
**Cons:** Misses synonyms, no semantic understanding

### 2. Dense Retrieval (Embeddings)

Modern approach using neural embeddings.

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')
doc_embs = model.encode(documents)
query_emb = model.encode(query)

# Cosine similarity
sims = cosine_similarity(query_emb, doc_embs)
```

**Pros:** Semantic understanding, handles synonyms
**Cons:** Slower, requires GPU for large scale, less interpretable

### 3. Hybrid Search

Combine keyword + semantic for best of both:

```python
# Get BM25 scores (normalized)
bm25_scores = normalize(bm25.get_scores(query))

# Get embedding scores
emb_scores = normalize(cosine_similarity(query_emb, doc_embs))

# Combine with weights
final_scores = 0.3 * bm25_scores + 0.7 * emb_scores
```

---

## Indexing for Scale

### The Problem

Brute-force search is O(n) — too slow for millions of documents.

### Approximate Nearest Neighbors (ANN)

Trade some accuracy for massive speedup:

| Method | Speed | Accuracy | Memory |
|--------|-------|----------|--------|
| Brute Force | Slow | Perfect | Low |
| IVF | Fast | High | Medium |
| HNSW | Very Fast | High | High |
| PQ | Very Fast | Medium | Very Low |

### Popular Libraries

- **FAISS** (Facebook): GPU support, very fast
- **Annoy** (Spotify): Simple, memory-mapped
- **HNSWlib**: High recall
- **Qdrant/Pinecone/Weaviate**: Managed vector databases

```python
import faiss

# Create index with IVF for faster search
nlist = 100  # Number of clusters
index = faiss.IndexIVFFlat(faiss.IndexFlatIP(dim), dim, nlist)
index.train(doc_embeddings)
index.add(doc_embeddings)

# Set how many clusters to search
index.nprobe = 10
```

---

## Evaluation Metrics

### Recall@K

What fraction of relevant docs are in top K?

```python
def recall_at_k(predictions, ground_truth, k):
    top_k = predictions[:k]
    hits = len(set(top_k) & set(ground_truth))
    return hits / len(ground_truth)
```

### Precision@K

What fraction of top K are relevant?

```python
def precision_at_k(predictions, ground_truth, k):
    top_k = predictions[:k]
    hits = len(set(top_k) & set(ground_truth))
    return hits / k
```

### Mean Reciprocal Rank (MRR)

Where does the first relevant result appear?

```python
def mrr(predictions, ground_truth):
    for i, pred in enumerate(predictions):
        if pred in ground_truth:
            return 1.0 / (i + 1)
    return 0
```

### NDCG (Normalized Discounted Cumulative Gain)

Accounts for position and graded relevance.

---

## Retrieval for RAG

Retrieval-Augmented Generation combines retrieval with LLMs:

```
Query → Retrieve relevant docs → Add to LLM context → Generate answer
```

### The Key Challenges

1. **Chunk Size:** How to split documents
2. **Overlap:** How much context at boundaries
3. **Top-K Selection:** How many docs to retrieve
4. **Faithfulness:** Does the answer use retrieved context?

### Chunking Strategies

| Strategy | Pros | Cons |
|----------|------|------|
| Fixed size (512 tokens) | Simple | May cut sentences |
| Paragraph-based | Natural boundaries | Variable sizes |
| Recursive splitting | Respects structure | Complex |
| Semantic chunking | Coherent meaning | Slow |

---

## Failure Modes

### 1. Semantic Gap

**Symptom:** Relevant docs not retrieved.

**The Problem:** Query and document use very different vocabulary.

**Example:** Query "how to get my money back" misses doc titled "Refund Policy."

**Fix:** Use hybrid search (BM25 + embeddings).

### 2. Chunking Artifacts

**Symptom:** Retrieved chunks miss crucial context.

**The Problem:** Answer spans multiple chunks.

**Fix:** Add overlap between chunks, retrieve surrounding chunks.

### 3. Stale Index

**Symptom:** New documents not appearing in results.

**The Problem:** Index not updated after document changes.

**Fix:** Implement incremental indexing or regular rebuilds.

### 4. Embedding Model Mismatch

**Symptom:** Retrieval works poorly on domain-specific queries.

**The Problem:** Generic embedding model doesn't understand your domain.

**Fix:** Fine-tune embeddings on your data or use domain-specific model.

---

## Business Translation

### Explaining Retrieval

**Don't say:** "We use HNSW indexing with ANN search over sentence-BERT embeddings."

**Do say:** "When you search, we find relevant articles based on meaning, not just keywords. So 'cancel subscription' finds our 'How to end your membership' guide."

### Explaining Evaluation

**Don't say:** "We achieved 0.85 Recall@10 and 0.72 MRR."

**Do say:** "In 85% of cases, the answer is in our top 10 results. On average, the best answer appears in position 1-2."

### Explaining RAG

**Don't say:** "We augment the LLM context with retrieved chunks."

**Do say:** "Before answering, the AI searches our knowledge base to find relevant information, then uses that to give accurate, up-to-date answers."

---

## Practice

### Before the Lab

Open the **Interactive Playground** (`playground_retrieval.html`):

1. Enter queries and see retrieved documents
2. Compare keyword vs semantic search
3. Adjust K and see precision/recall tradeoff
4. Explore how chunking affects results

### Key Observations

- Semantic search finds synonyms
- Keyword search is precise for exact terms
- Hybrid often works best
- Chunk size matters for RAG quality

---

## Quick Reference

### Building a Retrieval System

```python
from sentence_transformers import SentenceTransformer
import faiss

# 1. Load model
model = SentenceTransformer('all-MiniLM-L6-v2')

# 2. Encode documents
doc_embeddings = model.encode(documents)

# 3. Build index
index = faiss.IndexFlatIP(doc_embeddings.shape[1])
faiss.normalize_L2(doc_embeddings)  # For cosine similarity
index.add(doc_embeddings)

# 4. Search
query_emb = model.encode([query])
faiss.normalize_L2(query_emb)
D, I = index.search(query_emb, k=10)
```

### Key Metrics

| Metric | Question Answered |
|--------|-------------------|
| Recall@K | Do relevant docs appear in top K? |
| Precision@K | Are top K docs relevant? |
| MRR | Where's the first relevant doc? |
| NDCG | How good is the ranking overall? |

### Chunking Guidance

| Doc Type | Chunk Size | Overlap |
|----------|------------|---------|
| FAQs | Full doc | None |
| Articles | 300-500 tokens | 50 tokens |
| Manuals | Paragraph | 1 paragraph |
| Transcripts | 200-300 tokens | 50 tokens |

---

## Done Checklist

- [ ] Understood retrieval vs search
- [ ] Compared keyword and semantic approaches
- [ ] Explored the playground
- [ ] Understood evaluation metrics
- [ ] Completed the notebook lab
- [ ] Passed the quiz
