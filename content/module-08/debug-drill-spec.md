# Module 8: Debug Drill Spec

**Title:** The Broken Semantic Search  
**Time:** ~15 minutes  
**Goal:** Fix a semantic search that returns wrong results

---

## The Setup

> You built semantic search for support articles. Testing shows terrible results:
> - "Can't login" → "Shipping policy" (wrong!)
> - "Want a refund" → "Company history" (wrong!)
>
> The matches make no sense.

---

## The Buggy Code

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

# Articles
articles = [
    "How to reset your password and login",
    "Canceling your subscription",
    "Requesting a refund for orders",
    "Shipping policy and tracking",
    "About our company history"
]

# ===== BUG IS HERE =====
# Create embeddings
article_embeddings = model.encode(articles)

# Search
query = "Can't login to my account"
query_embedding = model.encode(query)  # Bug: Missing brackets!

# Find most similar
distances = np.linalg.norm(article_embeddings - query_embedding, axis=1)
best_idx = np.argmin(distances)
# =======================

print(f"Query: {query}")
print(f"Match: {articles[best_idx]}")
```

**Output:**
```
Query: Can't login to my account
Match: Shipping policy and tracking
```

---

## The Bug

### Problem: Query embedding shape mismatch

```python
query_embedding = model.encode(query)  # Shape: (384,)
query_embedding = model.encode([query])  # Shape: (1, 384) - Correct!
```

When you pass a string directly (not in a list), the output is 1D. The distance calculation `article_embeddings - query_embedding` broadcasts incorrectly, producing garbage distances.

---

## The Fix

```python
# Fix: Wrap query in a list
query_embedding = model.encode([query])  # Shape: (1, 384)

# Now distance calculation works correctly
distances = np.linalg.norm(article_embeddings - query_embedding, axis=1)
```

**After fix:**
```
Query: Can't login to my account
Match: How to reset your password and login
```

---

## What Learners Must Do

1. **Identify the symptom:** Matches are random/wrong

2. **Find the bug:** Shape mismatch in embeddings

3. **Fix it:** Add brackets around query

4. **Verify:** Correct article is now matched

---

## Self-Check

```python
# After fixing
query_embedding = model.encode([query])
assert query_embedding.shape == (1, 384), f"Shape should be (1, 384), got {query_embedding.shape}"

distances = np.linalg.norm(article_embeddings - query_embedding, axis=1)
best_match = articles[np.argmin(distances)]
assert "password" in best_match.lower() or "login" in best_match.lower(), \
    "Should match password/login article"

print(f"✓ Fixed! '{query}' → '{best_match}'")
```

---

## Postmortem Template

**Symptom:**
> Semantic search returned completely wrong articles (login query matched shipping policy).

**Root cause:**
> `model.encode(query)` returns shape (384,) for a string, but (1, 384) for a list. The distance calculation broadcasted incorrectly, producing meaningless results.

**Prevention:**
> Always pass inputs to encode() as a list: `model.encode([text])`. Or use `model.encode([text])[0]` to get back to 1D if needed. Check embedding shapes during development.
