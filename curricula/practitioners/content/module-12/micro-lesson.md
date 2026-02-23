# Module 12: Embeddings - Turning Anything into Numbers

**Time:** 30-40 minutes

**Promise:** After this module, you'll understand how embeddings work, why they're the foundation of modern ML, and how to use them for similarity search.

---

## The Setup

How do you compare:
- Two support tickets?
- Two products?
- Two customers?

You can't feed "I need help with my subscription" directly into math. You need to turn it into numbers that capture meaning.

**Embeddings** are those numbers.

---

## The Mental Models

### 1. The Map Analogy

Embeddings are coordinates in a "meaning space":
- Similar things have nearby coordinates
- Different things are far apart

Just like cities on a map:
- Paris and Lyon are close (both in France)
- Paris and Tokyo are far (different continents)

### 2. The Compression Analogy

Embeddings compress complex objects into dense vectors:
- Text → 768 numbers
- Images → 512 numbers
- Users → 64 numbers

The key insight: they preserve *relationships* after compression.

### 3. The Feature Extraction View

Embeddings are learned features:
- Traditional ML: You design features manually
- Embeddings: Neural network learns features from data
- Result: Features that capture semantic meaning

---

## What Embeddings Capture

### For Text

```
"The quick brown fox" → [0.23, -0.14, 0.87, ...]
```

Similar embeddings for:
- "A fast dark fox" (similar meaning)
- "The rapid russet canine" (similar meaning)

Different embeddings for:
- "Stock market predictions" (different topic)

### For Users/Items

```
user_123 → [0.5, 0.2, -0.3, ...]
```

Similar embeddings for users who:
- Buy similar products
- Have similar behavior patterns
- Respond to similar content

---

## How Embeddings Are Created

### Pre-trained Models (Most Common)

Use someone else's trained model:

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer('all-MiniLM-L6-v2')
embedding = model.encode("Support ticket text")
```

**Pros:** Fast, no training needed, works well
**Cons:** May not capture domain-specific meaning

### Learned from Your Data

Train embeddings on your specific task:

```python
from sklearn.decomposition import TruncatedSVD

# From user-item interactions
svd = TruncatedSVD(n_components=50)
user_embeddings = svd.fit_transform(user_item_matrix)
```

**Pros:** Captures your domain's patterns
**Cons:** Requires data and training

### Word2Vec / GloVe (Classic)

Train on word co-occurrence:
- "king" - "man" + "woman" ≈ "queen"
- Words used in similar contexts get similar vectors

---

## Key Properties

### 1. Dimensionality

**Typical sizes:**
- Word embeddings: 100-300 dimensions
- Sentence embeddings: 384-768 dimensions
- Image embeddings: 512-2048 dimensions

**More dimensions:**
- Capture more nuance
- More storage/compute
- Risk of overfitting

### 2. Similarity Metrics

**Cosine Similarity (Most Common)**
```
sim(A, B) = (A · B) / (||A|| × ||B||)
```
Range: -1 to 1 (1 = identical direction)

**Euclidean Distance**
```
dist(A, B) = √Σ(Aᵢ - Bᵢ)²
```
Range: 0 to ∞ (0 = identical)

**When to use which:**
- Cosine: Magnitude doesn't matter (text similarity)
- Euclidean: Magnitude matters (physical distance)

### 3. Nearest Neighbors

Find the K most similar items:

```python
from sklearn.neighbors import NearestNeighbors

nn = NearestNeighbors(n_neighbors=5, metric='cosine')
nn.fit(all_embeddings)

distances, indices = nn.kneighbors(query_embedding)
```

---

## Practical Applications

### 1. Semantic Search

Find documents by meaning, not keywords:

```python
query_embedding = model.encode("password reset")
# Finds: "how to change my login credentials"
# Even though no word overlap!
```

### 2. Recommendation

"Users like you also liked...":

```python
similar_users = find_nearest(user_embedding, all_user_embeddings)
recommended_items = aggregate_items(similar_users)
```

### 3. Clustering

Group similar items automatically:

```python
from sklearn.cluster import KMeans

kmeans = KMeans(n_clusters=10)
clusters = kmeans.fit_predict(embeddings)
```

### 4. Duplicate Detection

Find near-duplicates in support tickets:

```python
for i, emb in enumerate(embeddings):
    similar = find_nearest(emb, embeddings, threshold=0.95)
    if len(similar) > 1:
        print(f"Potential duplicates: {similar}")
```

---

## Embedding Visualization

High-dimensional embeddings can be visualized:

### t-SNE
- Good for visualizing clusters
- Non-linear, preserves local structure
- Slow on large datasets

### UMAP
- Faster than t-SNE
- Better global structure
- Good for exploration

### PCA
- Fast and deterministic
- Linear, may miss non-linear patterns
- Good for first look

```python
from sklearn.manifold import TSNE

tsne = TSNE(n_components=2, random_state=42)
coords_2d = tsne.fit_transform(embeddings)

plt.scatter(coords_2d[:, 0], coords_2d[:, 1])
```

---

## Failure Modes

### 1. Wrong Similarity Metric

**Symptom:** Similar items scored as different.

**The Problem:** Using Euclidean when vectors have different magnitudes.

**Fix:** Use cosine similarity for text/semantic embeddings.

### 2. Out-of-Domain Embeddings

**Symptom:** Domain-specific terms don't cluster well.

**The Problem:** Pre-trained model doesn't know your terminology.

**Example:** Medical terms, company-specific jargon.

**Fix:** Fine-tune embeddings or use domain-specific models.

### 3. Dimensionality Mismatch

**Symptom:** Can't compare embeddings from different models.

**The Problem:** Model A produces 384-d vectors, Model B produces 768-d.

**Fix:** Always use the same model for embeddings you'll compare.

### 4. Scale Issues

**Symptom:** Nearest neighbor search returns wrong results.

**The Problem:** Some embedding dimensions have very different scales.

**Fix:** Normalize embeddings before indexing.

---

## Business Translation

### Explaining Embeddings

**Don't say:** "We encode text into a 768-dimensional latent space."

**Do say:** "We convert text into coordinates that capture meaning. Similar phrases get similar coordinates, so we can find related content even without keyword matches."

### Explaining Similarity Search

**Don't say:** "We compute cosine similarity in embedding space."

**Do say:** "When a customer submits a ticket, we find similar past tickets and their solutions. This works even if they phrase things differently."

### Explaining Clustering

**Don't say:** "We cluster embeddings using k-means."

**Do say:** "We automatically group similar support tickets together. Each group represents a common issue type, helping us identify trending problems."

---

## Practice

### Before the Lab

Open the **Interactive Playground** (`playground_embeddings.html`):

1. Enter text and see its position in 2D embedding space
2. Find nearest neighbors for a query
3. See how changing text changes position
4. Explore different similarity thresholds

### Key Observations

- Synonyms have similar embeddings
- Context changes meaning (and embedding)
- Threshold choice affects recall vs precision
- Visualization helps understand embedding quality

---

## Quick Reference

### Common Embedding Models

| Task | Model | Dimensions |
|------|-------|------------|
| General text | all-MiniLM-L6-v2 | 384 |
| Better quality | all-mpnet-base-v2 | 768 |
| Multi-language | paraphrase-multilingual | 768 |
| OpenAI | text-embedding-ada-002 | 1536 |

### Similarity Quick Check

| Cosine Similarity | Interpretation |
|-------------------|----------------|
| > 0.9 | Very similar / near-duplicate |
| 0.7 - 0.9 | Related |
| 0.5 - 0.7 | Somewhat related |
| < 0.5 | Different |

### Code Template

```python
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

model = SentenceTransformer('all-MiniLM-L6-v2')

# Encode
embeddings = model.encode(texts)

# Find similar
sims = cosine_similarity(query_emb.reshape(1,-1), embeddings)
top_k = sims[0].argsort()[-5:][::-1]
```

---

## Done Checklist

- [ ] Understood what embeddings represent
- [ ] Explored similarity in the playground
- [ ] Used cosine similarity for nearest neighbors
- [ ] Visualized embeddings with t-SNE/UMAP
- [ ] Completed the notebook lab
- [ ] Passed the quiz
