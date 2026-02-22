# Cheat Sheet: Embeddings & Similarity Search

## Core Idea

Convert text/items into vectors where **similar things are close together**.

```
"refund" → [0.2, 0.8, 0.1, ...]
"money back" → [0.25, 0.75, 0.15, ...]  ← Close!
"shipping" → [0.9, 0.1, 0.6, ...]        ← Far
```

## TF-IDF: Quick Text Embeddings

```python
from sklearn.feature_extraction.text import TfidfVectorizer

tfidf = TfidfVectorizer(
    max_features=500,
    stop_words='english',
    ngram_range=(1, 2)
)
vectors = tfidf.fit_transform(texts)
```

**TF-IDF = Term Frequency × Inverse Document Frequency**
- Common words (the, is) → low weight
- Rare but relevant words → high weight

## Cosine Similarity

```python
from sklearn.metrics.pairwise import cosine_similarity

# Compare query to all documents
query_vec = tfidf.transform(["refund request"])
similarities = cosine_similarity(query_vec, vectors)[0]

# Get top matches
top_idx = np.argsort(similarities)[-5:][::-1]
```

**Why cosine?** Measures angle, not magnitude. Works for texts of different lengths.

## Similarity Search Function

```python
def search(query, top_k=5):
    query_vec = tfidf.transform([query])
    sims = cosine_similarity(query_vec, vectors)[0]
    top_idx = np.argsort(sims)[-top_k:][::-1]
    
    results = df.iloc[top_idx].copy()
    results['similarity'] = sims[top_idx]
    return results
```

## Embedding Spectrum

| Method | Captures | Speed | Quality |
|---|---|---|---|
| TF-IDF | Word frequency | Fast | Basic |
| Word2Vec | Word context | Fast | Good |
| Sentence-BERT | Full meaning | Slow | Best |

## When to Use What

| Use Case | Method |
|---|---|
| Quick prototype | TF-IDF |
| Similar tickets | TF-IDF or Sentence-BERT |
| Semantic search | Sentence-BERT |
| Product recommendations | Item embeddings |

## Pre-trained Embeddings (Advanced)

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')
embeddings = model.encode(texts)
```

## Common Mistakes

| Mistake | Fix |
|---|---|
| Using Euclidean distance | Use cosine similarity |
| Forgetting stop words | Set `stop_words='english'` |
| Too few features | Increase `max_features` |
| No preprocessing | Lowercase, remove punctuation |

## Quick Template

```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# 1. Create embeddings
tfidf = TfidfVectorizer(max_features=500, stop_words='english')
vectors = tfidf.fit_transform(df['text'])

# 2. Search function
def find_similar(query, k=5):
    q_vec = tfidf.transform([query])
    sims = cosine_similarity(q_vec, vectors)[0]
    top_k = np.argsort(sims)[-k:][::-1]
    return df.iloc[top_k], sims[top_k]

# 3. Use it
results, scores = find_similar("refund request")
for idx, (_, row) in enumerate(results.iterrows()):
    print(f"{scores[idx]:.2f}: {row['text'][:50]}...")
```

## Key Insight

Embeddings turn **semantic similarity into geometric distance**.

"Similar meaning" becomes "close vectors" → easy to compute!
