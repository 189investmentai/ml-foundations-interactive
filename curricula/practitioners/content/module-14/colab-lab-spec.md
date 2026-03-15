# Colab Lab Spec: Module 14 - Retrieval

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/module_14_retrieval.ipynb` |
| Runtime | ~25 minutes |
| Dataset | 10 support articles + 5 test queries with ground truth |
| Target | N/A (retrieval ranking) |

## Learning Objectives

After completing this lab, learners will be able to:
1. Build keyword search (TF-IDF) and semantic search (TF-IDF + SVD or embeddings)
2. Compare keyword vs semantic retrieval on paraphrase queries
3. Implement hybrid search combining both methods
4. Evaluate retrieval with Precision@K, Recall@K, and MRR
5. Chunk documents for RAG and implement simple reranking

## Sections

### 1. Setup (1 min)
- Import TfidfVectorizer, cosine_similarity, Counter

### 2. Part 1: Create Document Corpus (2 min)
- Load 10 support articles (refund, cancel, password, shipping, etc.)
- Define 5 test queries with relevant doc IDs
- **Self-check:** Corpus has 10 documents

### 3. Part 2: Keyword Search (BM25-style) (3 min)
- Build TF-IDF matrix with bigrams
- Implement keyword_search(query, k)
- Test "reset password"
- **Self-check:** Returns top-k by TF-IDF similarity

### 4. Part 3: Semantic Search (4 min)
- Use TF-IDF + TruncatedSVD for semantic embeddings (or sentence-transformers)
- Implement semantic_search(query, k)
- Compare keyword vs semantic for "how to get my money back" (finds Refund without "refund")
- **Self-check:** Semantic finds relevant docs without exact keyword match

### 5. Part 4: Hybrid Search (4 min)
- Combine keyword and semantic scores with alpha weight
- Test "end my membership" (no "cancel" or "subscription")
- **Self-check:** Hybrid improves over keyword-only for paraphrases

### 6. Part 5: Evaluation Metrics (4 min)
- Implement precision_at_k, recall_at_k, mrr
- Evaluate all 3 methods on test queries
- Aggregate and visualize P@5, R@5, MRR by method
- **Self-check:** Results table has all methods and metrics

### 7. Part 6: Chunking for RAG (3 min)
- Define chunk_by_paragraph with overlap
- Split long document into chunks
- **Self-check:** Chunks created with overlap

### 8. Part 7: TODO - Implement Reranking (4 min)
- **TODO:** Implement rerank(query, candidates, top_k) using word overlap or cross-encoder
- Test: retrieve 10, rerank to top 3
- **Self-check:** rerank returns top_k results

### 9. Stakeholder Summary (2 min)
- **TODO:** Write 3-bullet summary: keyword vs semantic, quality metrics, hybrid recommendation

## Self-Checks

| Check | Assertion |
|-------|-----------|
| semantic_search returns k results | `len(semantic_search("password reset", k=3)) == 3` |
| Scores in [0, 1] | `all(0 <= score <= 1 for _, score in results)` |
| rerank returns top_k | `len(rerank("password reset", results, top_k=3)) == 3` |

## Expected Outputs

- Keyword search: exact match works; paraphrases may miss
- Semantic search: "money back" finds "Refund Policy"
- Hybrid: typically best P@5, R@5, MRR on test set
- Chunking: 4 chunks from sample long doc

## TODO Blocks

1. **Implement reranking function** (Part 7) – Simple word-overlap or cross-encoder; combine with initial score
2. **Write 3-bullet stakeholder summary** (Part 8) – Template: keyword vs semantic, metrics, hybrid alpha recommendation

## Dependencies

- numpy, pandas, matplotlib
- sklearn: feature_extraction.text (TfidfVectorizer), decomposition (TruncatedSVD), metrics.pairwise (cosine_similarity)
- Optional: sentence-transformers (for production semantic search)
