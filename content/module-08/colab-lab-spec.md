# Module 8: Colab Lab Spec

**Lab Title:** Semantic Search for Support  
**Time:** ~20 minutes  
**Goal:** Build embedding-based ticket routing

---

## Lab Structure

### Cell 1: Setup

```python
!pip install sentence-transformers faiss-cpu -q

from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import faiss
import numpy as np
import pandas as pd

model = SentenceTransformer('all-MiniLM-L6-v2')
print("Model loaded!")
```

---

### Cell 2: Sample Data

```python
# Help articles
articles = [
    {"id": 1, "title": "How to reset your password", "content": "Go to settings, click security, select reset password..."},
    {"id": 2, "title": "Canceling your subscription", "content": "Navigate to billing, click cancel subscription..."},
    {"id": 3, "title": "Tracking your order", "content": "Visit order history, click track shipment..."},
    {"id": 4, "title": "Requesting a refund", "content": "Contact support or go to orders, select refund..."},
    {"id": 5, "title": "Updating payment method", "content": "Go to billing, select payment methods..."},
]

# Support tickets
tickets = [
    "I forgot my password and can't login",
    "Where is my package? It's been 2 weeks",
    "I want my money back",
    "How do I stop being charged monthly",
    "Change my credit card on file"
]
```

---

### Cell 3: TODO - Create Article Embeddings

```python
# TODO: Create embeddings for article titles + content
# Hint: Combine title and content for richer representation

# article_texts = ???
# article_embeddings = ???

# print(f"Article embeddings shape: {article_embeddings.shape}")
```

---

### Cell 4: TODO - Build FAISS Index

```python
# TODO: Build a FAISS index for fast similarity search

# index = faiss.IndexFlatL2(???)
# index.add(???)

# print(f"Index size: {index.ntotal}")
```

---

### Cell 5: Search Function

```python
def find_relevant_articles(query, k=3):
    """Find k most relevant articles for a query."""
    query_embedding = model.encode([query])
    
    # Search
    distances, indices = index.search(query_embedding, k)
    
    results = []
    for i, idx in enumerate(indices[0]):
        results.append({
            'article': articles[idx]['title'],
            'distance': distances[0][i]
        })
    return results
```

---

### Cell 6: Test Semantic Search

```python
# Test with each ticket
for ticket in tickets:
    print(f"\nTicket: '{ticket}'")
    results = find_relevant_articles(ticket, k=2)
    for r in results:
        print(f"  → {r['article']} (distance: {r['distance']:.3f})")
```

---

### Cell 7: Cosine vs L2

```python
# TODO: Compare cosine similarity to L2 distance
# Which works better for your tickets?

# ticket_emb = model.encode([tickets[0]])
# cosine_sims = cosine_similarity(ticket_emb, article_embeddings)[0]
# l2_distances = np.linalg.norm(article_embeddings - ticket_emb, axis=1)

# print("Cosine similarities:", cosine_sims)
# print("L2 distances:", l2_distances)
```

---

### Cell 8: Reflection

```python
# Answer:
# 1. Did semantic search correctly match tickets to articles?
# 2. Which ticket had the worst match? Why?
# 3. How would you improve the matching?
```
