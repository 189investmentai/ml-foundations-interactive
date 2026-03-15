# Module 8: Colab Lab Spec

**Lab Title:** Similarity and Embeddings  
**Time:** ~20 minutes  
**Goal:** Turn text into numbers that capture meaning, build similarity search

---

## Lab Structure

### Cell 1: Setup

```python
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import matplotlib.pyplot as plt

tickets = pd.read_csv('https://raw.githubusercontent.com/189investmentai/ml-foundations-interactive/main/shared/data/streamcart_tickets.csv')
print(f"Loaded {len(tickets):,} support tickets")
```

---

### Cell 2: Explore Tickets

```python
print("=== Sample Tickets ===")
for i, row in tickets.sample(5, random_state=42).iterrows():
    print(f"[{row['category']}] {row['ticket_text']}")
```

---

### Cell 3: TF-IDF Embeddings

```python
tfidf = TfidfVectorizer(
    max_features=500,
    stop_words='english',
    ngram_range=(1, 2)
)

ticket_vectors = tfidf.fit_transform(tickets['ticket_text'])
print(f"After TF-IDF: {ticket_vectors.shape[0]} tickets × {ticket_vectors.shape[1]} dimensions")
```

Inspect top terms by aggregate importance.

---

### Cell 4: TODO - Find Similar Tickets

```python
# TODO: Calculate cosine similarity between a query ticket and all tickets
# 1. Pick a query ticket (index 0)
# 2. Compute cosine_similarity(query_vector, ticket_vectors)
# 3. Sort by similarity descending
# 4. Show top 5 (excluding the query itself)

similarities = None  # Replace with your code
```

**Self-check:** `similarities` has one score per ticket, top results share the query's category.

---

### Cell 5: Semantic Search Function

```python
def search_tickets(query, top_k=5):
    query_vec = tfidf.transform([query])
    sims = cosine_similarity(query_vec, ticket_vectors)[0]
    top_idx = sims.argsort()[::-1][:top_k]
    results = []
    for idx in top_idx:
        results.append({
            'text': tickets.iloc[idx]['ticket_text'],
            'category': tickets.iloc[idx]['category'],
            'similarity': sims[idx]
        })
    return results
```

Test with queries: "refund my money", "package not delivered", "cancel subscription".

---

### Cell 6: TF-IDF Limitations - Synonym Test

```python
test_queries = [
    ("I want a refund", "Give me my money back"),
    ("shipping problem", "delivery issue"),
    ("help with login", "can't access my account")
]

for q1, q2 in test_queries:
    v1 = tfidf.transform([q1])
    v2 = tfidf.transform([q2])
    sim = cosine_similarity(v1, v2)[0][0]
    print(f"'{q1}' ↔ '{q2}': {sim:.2f}")
```

Shows that TF-IDF misses semantic similarity (different words, same meaning).

---

### Cell 7: Neural Embeddings Preview (Read-Only)

Comparison table: TF-IDF vs Word2Vec/GloVe vs Sentence-BERT - when to use each. Optional code block (commented out) shows the sentence-transformers API for learners who want to try it.

---

### Cell 8: Ticket Classifier

```python
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    ticket_vectors, tickets['category'], test_size=0.2, random_state=42
)

clf = LogisticRegression(max_iter=1000)
clf.fit(X_train, y_train)

# Evaluate and classify new tickets
```

---

### Cell 9: Explain It

> The support team asks: "How does the auto-categorization work? Is it just keyword matching?"

**TODO:** Write a 4-5 sentence response explaining embeddings in non-technical terms.

---

## Self-Checks

| Check | Assertion |
|-------|-----------|
| Similarities computed | `similarities is not None` |
| Correct shape | `len(similarities) == len(tickets)` |
| Search returns relevant results | Top result for "refund" query relates to billing |
| Classifier trains | Classification report prints without error |

## Expected Outputs

- TF-IDF matrix: ~N tickets × 500 dimensions
- Synonym test: Low similarity for semantically similar but lexically different pairs
- Classifier: Reasonable per-category precision/recall

## TODO Blocks

1. **Find similar tickets** (cosine similarity calculation)
2. **Explain-it response** (non-technical explanation of embeddings)

## Dependencies

- pandas
- numpy
- matplotlib
- sklearn (TfidfVectorizer, cosine_similarity, LogisticRegression, train_test_split)
