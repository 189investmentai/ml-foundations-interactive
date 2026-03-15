# Debug Drill Spec: Module 14 - The Retrieval Failure

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/debug_drills/drill_14_retrieval_failure.ipynb` |
| Solution | `notebooks/answer_keys/solution_14_retrieval_failure.ipynb` |
| Runtime | ~20 minutes |
| Bug Type | Keyword-Only Search / Poor Retrieval Strategy |

## Scenario

Your support team's search system is failing users. "When I search 'get my money back', I get articles about payment methods!" a user complains. The search is keyword-based (TF-IDF), and it fails when users use different words than the documents. "get my money back" has no keyword overlap with "Refund Policy" or "Return an Item." Similarly, "can't remember my login" doesn't match "Password Reset Guide." The fix is semantic search: dense embeddings that capture meaning, so synonyms and paraphrases retrieve the right documents.

## The Bug

```python
# ===== COLLEAGUE'S CODE (BUG: Keyword-only search) =====

# Build TF-IDF index for keyword search
tfidf = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf.fit_transform(df['text'])

def keyword_search(query, k=3):
    """Search using TF-IDF keyword matching."""
    query_vec = tfidf.transform([query])
    scores = cosine_similarity(query_vec, tfidf_matrix).flatten()
    top_k_idx = scores.argsort()[::-1][:k]
    return [(df.iloc[i]['id'], scores[i]) for i in top_k_idx]
```

### Why It's Wrong

TF-IDF is a bag-of-words representation. If the query "get my money back" doesn't contain "refund" or "return," the vector has no overlap with the relevant documents. Keyword search fails on:
- Synonyms (money back ≠ refund)
- Paraphrases (can't remember login ≠ password reset)
- Different phrasing (end my membership ≠ cancel subscription)

Semantic search uses dense embeddings (e.g., from SVD on TF-IDF, or learned embeddings) where similar meanings cluster together. "get my money back" and "refund" are close in embedding space even without shared tokens.

## Investigation Steps

1. **Run test cases** - Verify keyword search fails on synonym/paraphrase queries
2. **Implement semantic search** - Use TruncatedSVD to reduce TF-IDF to dense vectors
3. **Compare recall@k** - Semantic search should improve recall on test queries
4. **Document the improvement** - Average recall@3 should increase

## The Fix

```python
# Create semantic embeddings using SVD
svd = TruncatedSVD(n_components=50, random_state=42)
semantic_embeddings = svd.fit_transform(tfidf_matrix)

def semantic_search(query, k=3):
    """Search using semantic embeddings."""
    query_vec = tfidf.transform([query])
    query_emb = svd.transform(query_vec)
    scores = cosine_similarity(query_emb, semantic_embeddings).flatten()
    top_k_idx = scores.argsort()[::-1][:k]
    return [(df.iloc[i]['id'], scores[i]) for i in top_k_idx]
```

## Self-Checks

| Check | Assertion |
|-------|-----------|
| Semantic search implemented | `semantic_search` returns results |
| Recall improved | `np.mean(semantic_recalls) >= np.mean(keyword_recalls)` |

## Postmortem Template

### What happened:
- Users searching with natural language got wrong documents; keyword search failed on synonyms

### Root cause:
- TF-IDF keyword search requires lexical overlap; no overlap → no match

### How to prevent:
- Use semantic search (dense embeddings, SVD, or learned embeddings) for support/FAQ retrieval
- Evaluate with recall@k on queries that use synonyms and paraphrases

## Learning Objectives

After completing this drill, learners will be able to:
1. Diagnose when keyword search fails (synonym/paraphrase gap)
2. Implement semantic search with SVD or dense embeddings
3. Evaluate retrieval with recall@k on representative queries
