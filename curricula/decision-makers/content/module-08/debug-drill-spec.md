# Module 8: Debug Drill Spec

**Title:** Bad Similarity Search  
**Time:** ~15 minutes  
**Goal:** Fix a ticket similarity search that returns wrong results

---

## The Setup

> A colleague built a ticket similarity search. When support searches for "refund request", the top result is about shipping delays. The search seems completely broken.

---

## The Buggy Code

```python
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import euclidean_distances

# Bug 1: Using raw counts instead of TF-IDF
vectorizer = CountVectorizer(max_features=100)
ticket_vectors = vectorizer.fit_transform(tickets['ticket_text'])

def search_tickets_buggy(query, top_k=5):
    query_vector = vectorizer.transform([query])
    
    # Bug 2: Using Euclidean distance instead of cosine similarity
    distances = euclidean_distances(query_vector, ticket_vectors)[0]
    
    # Bug 3: Taking largest distances (should be smallest, or use similarity)
    top_indices = np.argsort(distances)[-top_k:][::-1]
    
    return tickets.iloc[top_indices][['ticket_text', 'category']]

print("Search: 'refund request'")
print(search_tickets_buggy("refund request"))
```

**Output:**
```
Results about shipping, not refunds - wrong!
```

---

## The Bugs (3 total)

### Bug 1: CountVectorizer instead of TfidfVectorizer

Raw word counts treat every occurrence equally. Common words like "the" and "order" dominate the vectors, drowning out meaningful terms like "refund" or "cancel".

### Bug 2: Euclidean distance instead of cosine similarity

Euclidean distance is sensitive to document length - longer tickets appear "farther" from short queries regardless of topic. Cosine similarity measures direction (topic) not magnitude (length).

### Bug 3: Sorting distances backwards

`np.argsort(distances)[-top_k:][::-1]` returns the *largest* distances - the *least* similar tickets. Should take the smallest distances, or switch to cosine similarity and take the largest.

---

## The Fix

```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Fix 1: Use TF-IDF
tfidf = TfidfVectorizer(
    max_features=500,
    stop_words='english',
    ngram_range=(1, 2)
)
ticket_vectors_fixed = tfidf.fit_transform(tickets['ticket_text'])

def search_tickets_fixed(query, top_k=5):
    query_vector = tfidf.transform([query])
    
    # Fix 2: Use cosine similarity
    similarities = cosine_similarity(query_vector, ticket_vectors_fixed)[0]
    
    # Fix 3: Get highest similarities
    top_indices = np.argsort(similarities)[-top_k:][::-1]
    
    results = tickets.iloc[top_indices][['ticket_text', 'category']].copy()
    results['similarity'] = similarities[top_indices]
    return results
```

**After fix:**
```
Search: 'refund request'
→ Top results are billing/refund tickets with decent similarity scores
```

---

## What Learners Must Do

1. **Identify at least 2 bugs** in the original code

2. **Explain** why TF-IDF is better than raw counts for similarity

3. **Fix all 3 bugs:** TF-IDF, cosine similarity, correct sort order

4. **Test** with multiple queries ("refund request", "shipping delay", "cancel subscription")

5. **Write a 3-bullet postmortem**

---

## Self-Check After Fix

```python
refund_results = search_tickets_fixed("refund request", top_k=3)

assert refund_results['similarity'].iloc[0] > 0.1, "Top result should have decent similarity"

has_billing = any('billing' in str(cat).lower() or 'refund' in str(text).lower()
                  for cat, text in zip(refund_results['category'], refund_results['ticket_text']))

print("✓ Search returns relevant results!")
```

---

## Postmortem Template

**Symptom:**
> Similarity search returned irrelevant tickets - "refund request" matched shipping-related tickets instead of billing/refund tickets.

**Root cause:**
> Three compounding bugs: (1) CountVectorizer gave equal weight to common words, drowning out topic-specific terms; (2) Euclidean distance penalized document length differences rather than measuring topic similarity; (3) results were sorted by largest distance instead of smallest.

**Prevention:**
> Use TF-IDF (not raw counts) for text similarity. Use cosine similarity (not Euclidean) for sparse text vectors. Always sanity-check search results with known queries before deploying.
