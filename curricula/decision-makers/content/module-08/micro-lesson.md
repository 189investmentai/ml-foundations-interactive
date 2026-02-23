# Module 8: Teaching Machines What "Similar" Means

**Time:** 60-90 minutes  
**Prerequisites:** Module 7 (Clustering)

---

## The Setup

"Find similar products." "Show customers like this one." "Match support tickets to relevant articles."

These tasks all require the machine to understand similarity. But how do you measure if two things are "similar"? Is a red shirt similar to a blue shirt (same type) or to red pants (same color)?

Embeddings solve this by turning items into numbers (vectors) where similar items are close together. It's like giving everything coordinates on a map—nearby things are similar.

**The question we're answering:** How do we teach machines to understand what "similar" means?

---

## The Mental Model

### The Analogy

Think of GPS coordinates for concepts.

Every city has coordinates: New York (40.7, -74.0), Los Angeles (34.0, -118.2). Nearby coordinates = nearby cities.

Embeddings do the same for *anything*: products, customers, documents, images. Each item gets a "conceptual coordinate" (a vector of 100+ numbers), and nearby vectors = similar items.

### The Picture

```
EMBEDDING SPACE (Simplified to 2D)

    ▲ Dimension 2
    │
    │    ★ "Cancel subscription"
    │    ★ "End my account"
    │    ★ "Stop billing me"
    │                              ● "Shipping delay"
    │                              ● "Where's my order"
    │     ◆ "Reset password"
    │     ◆ "Can't login"
    │
    └──────────────────────────────► Dimension 1

Similar tickets land near each other, even if they use different words.
```

---

## How Embeddings Work

### From Items to Vectors

An embedding model takes an input (text, image, user behavior) and outputs a fixed-size vector:

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

text = "I want to cancel my subscription"
embedding = model.encode(text)

print(f"Shape: {embedding.shape}")  # (384,)
print(f"First 5 values: {embedding[:5]}")  # [-0.03, 0.12, -0.08, ...]
```

### Measuring Similarity

Once you have vectors, similarity is just geometry:

**Cosine Similarity:** Measures angle between vectors (most common for text)
```python
from sklearn.metrics.pairwise import cosine_similarity

sim = cosine_similarity([embedding1], [embedding2])[0][0]
# 1.0 = identical, 0 = unrelated, -1 = opposite
```

**Euclidean Distance:** Measures straight-line distance
```python
import numpy as np
dist = np.linalg.norm(embedding1 - embedding2)
# Lower = more similar
```

---

## Types of Embeddings

### Text Embeddings

Turn sentences/documents into vectors. Similar meanings → similar vectors.

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')

tickets = [
    "I want to cancel my subscription",
    "How do I end my membership",
    "Where is my package",
    "Can you track my order"
]

embeddings = model.encode(tickets)

# Check similarity
from sklearn.metrics.pairwise import cosine_similarity
similarities = cosine_similarity(embeddings)
```

### Product/Item Embeddings

Based on user behavior: products bought together → similar embeddings.

```python
# Simplified: Products that appear in same orders are similar
from gensim.models import Word2Vec

# Treat each order as a "sentence" of product IDs
orders = [['prod_1', 'prod_3', 'prod_5'],
          ['prod_2', 'prod_3'],
          ['prod_1', 'prod_4', 'prod_5']]

model = Word2Vec(orders, vector_size=50, window=5, min_count=1)
prod_embedding = model.wv['prod_1']
similar = model.wv.most_similar('prod_1', topn=5)
```

### User Embeddings

Represent users by their behavior patterns.

---

## Similarity Search at Scale

Finding the most similar items out of millions is expensive. Solutions:

### Approximate Nearest Neighbors (FAISS)

```python
import faiss

# Build index
d = embeddings.shape[1]  # Dimension
index = faiss.IndexFlatL2(d)  # Exact search
index.add(embeddings)

# Search for 5 nearest neighbors
query_embedding = model.encode(["cancel subscription"])
distances, indices = index.search(query_embedding, k=5)

print(f"Most similar indices: {indices[0]}")
```

### Vector Databases

For production: Pinecone, Weaviate, Milvus, Chroma

```python
# Conceptual (pseudocode)
vector_db.upsert(items=[
    {"id": "ticket_1", "vector": embedding1, "metadata": {...}},
    {"id": "ticket_2", "vector": embedding2, "metadata": {...}},
])

results = vector_db.query(
    vector=query_embedding,
    top_k=5,
    filter={"category": "billing"}
)
```

---

## The StreamCart Use Cases

### Use Case 1: Similar Product Recommendations

```python
# Find products similar to what customer is viewing
product_id = 'SKU_12345'
product_embedding = product_embeddings[product_id]

# Search for similar
similar_indices = index.search(product_embedding.reshape(1, -1), k=10)
recommended_products = [products[i] for i in similar_indices[0]]
```

### Use Case 2: Support Ticket Routing

```python
# Match incoming ticket to relevant help articles
ticket_text = "I can't access my account"
ticket_embedding = model.encode([ticket_text])

# Find most relevant articles
article_distances, article_indices = article_index.search(ticket_embedding, k=3)
relevant_articles = [articles[i] for i in article_indices[0]]
```

### Use Case 3: Customer Similarity for Marketing

```python
# Find customers similar to your best customers
vip_embedding = np.mean([user_embeddings[uid] for uid in vip_user_ids], axis=0)

# Find lookalikes
_, similar_user_indices = user_index.search(vip_embedding.reshape(1, -1), k=1000)
lookalike_users = [users[i] for i in similar_user_indices[0] if i not in vip_user_ids]
```

---

## What Goes Wrong

### Mistake 1: Wrong embedding model for the task

**Symptom:** Similar items don't have similar embeddings.

**Example:** Using a general text model for code, or an English model for French.

**Fix:** Choose embeddings trained for your domain. Fine-tune if needed.

### Mistake 2: Not normalizing before similarity

**Symptom:** Long texts always seem "more similar" to other long texts.

**Fix:** Normalize embeddings (L2 normalization) or use cosine similarity.

```python
embeddings = embeddings / np.linalg.norm(embeddings, axis=1, keepdims=True)
```

### Mistake 3: Ignoring embedding quality

**Symptom:** Semantic search returns irrelevant results.

**Fix:** Evaluate with labeled examples. Try different models.

```python
# Quick evaluation: Do similar items actually cluster together?
from sklearn.manifold import TSNE
import matplotlib.pyplot as plt

tsne = TSNE(n_components=2)
reduced = tsne.fit_transform(embeddings)
plt.scatter(reduced[:, 0], reduced[:, 1], c=labels)
```

### Mistake 4: Exact search at scale

**Symptom:** Search takes seconds instead of milliseconds.

**Fix:** Use approximate nearest neighbors (FAISS) or a vector database.

---

## Practice

### 1. Build (Colab Lab)
→ [Link to Colab notebook]

**What you'll do:**
- Create text embeddings for support tickets
- Find similar tickets
- Build a simple semantic search for help articles

**Time:** ~20 minutes

---

### 2. Decide (Scenario Quiz)
→ [Scenario Quiz](https://docs.google.com/forms/d/e/1FAIpQLSf_Kxwbgrhk1HwYQscT5OkEPzI0DfJOd4pM3D5r11pM9Ifj5w/viewform?usp=header)

**What you'll do:** 6 scenarios about embedding types, similarity search, and use cases.

**Time:** ~10 minutes

---

### 3. Debug (Find the Bug)
→ [Debug Drill](https://colab.research.google.com/github/189investmentai/ml-foundations-interactive/blob/main/notebooks/debug_drills/drill_08_bad_similarity.ipynb)

**What you'll do:** Semantic search returns terrible results. Find why.

**Time:** ~15 minutes

---

### 4. Explain (Stakeholder Update)

**The prompt:**  
Product asks: "We want a 'similar products' feature. How does that work?" Write a 4-5 sentence explanation that a non-technical PM would understand.

**What good looks like:**
- Avoids jargon (no "vectors" or "embeddings")
- Uses a clear analogy
- Sets realistic expectations
- Mentions what you'd need to build it

---

## Cheat Sheet

→ [Download: Module 8 Cheat Sheet (PDF)](#)

---

## Done?

- [ ] Read the micro-lesson
- [ ] Completed the scenario quiz  
- [ ] Ran the Colab lab
- [ ] Fixed the debug drill
- [ ] Wrote the stakeholder update

**Next up:** [Module 9: From Keywords to Meaning](#)
