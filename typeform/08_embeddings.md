# Module 08: Embeddings & Similarity Search - Typeform Scenario

**Theme:** Support wants to find similar tickets automatically. You're building a semantic search system.

---

## Q1 (Multiple Choice)
**"Embeddings" convert text into:**

- A) Categories (billing, shipping, etc.)
- B) Numerical vectors where similar texts are close together
- C) Sentiment scores (positive/negative)
- D) Word counts

**Correct:** B

**Decision Receipt:** EMBEDDINGS map text to vectors in a space where DISTANCE = SIMILARITY. "Refund request" and "money back" get nearby vectors because they mean similar things.

---

## Q2 (Multiple Choice)
**You need a v1 semantic search prototype in 2 days on CPU-only infrastructure. Which approach is most practical to start with?**

- A) Train a transformer from scratch
- B) TF-IDF + cosine similarity baseline
- C) Fine-tune a large LLM immediately
- D) Manual keyword rules only

**Correct:** B

**Decision Receipt:** Start with the fastest credible baseline, then upgrade if quality is insufficient. TF-IDF often gives good early signal with very low setup friction.

---

## Q3 (Multiple Choice)
**Users search "money back", but relevant tickets say "refund". TF-IDF retrieval quality is poor. What should you try FIRST?**

- A) Increase random seed
- B) Move to sentence embeddings that capture semantic similarity
- C) Remove stop words again
- D) Lower cosine threshold to zero

**Correct:** B

**Decision Receipt:** TF-IDF is lexical, so synonym mismatch hurts recall. Sentence embeddings are usually the first upgrade when meaning-based matching matters.

---

## Q4 (Multiple Choice)
**For text vectors with variable document lengths, which similarity metric is usually best for nearest-neighbor retrieval?**

- A) Euclidean distance
- B) Cosine similarity
- C) Pearson correlation
- D) Random similarity

**Correct:** B

**Decision Receipt:** Cosine compares direction rather than magnitude, which is usually more stable for text vectors. That makes retrieval less sensitive to document length artifacts.

---

## Q5 (Multiple Choice)
**Cosine similarity of 0.95 between two tickets means:**

- A) They share 95% of words
- B) Their vectors point in almost the same direction (very similar)
- C) They are 95% different
- D) 95% of words are stopwords

**Correct:** B

**Decision Receipt:** Cosine similarity ranges from -1 to 1. 0.95 means vectors are nearly aligned = very similar content. 0 = unrelated. 1 = identical direction.

---

## Q6 (Multiple Choice)
**Your similarity search returns "shipping delay" when the query is "refund request." What's likely wrong?**

- A) The database is empty
- B) You might be using the wrong similarity metric or not enough features
- C) TF-IDF doesn't work for text
- D) The query is too short

**Correct:** B

**Decision Receipt:** Poor results often mean: wrong metric (Euclidean instead of cosine), too few features (max_features too low), or missing preprocessing. Debug by checking what vectors look like.

---

## Q7 (Multiple Choice)
**Which TfidfVectorizer setting would you adjust to capture phrases like "money back" as a unit?**

- A) max_features
- B) ngram_range=(1,2)
- C) stop_words='english'
- D) lowercase=True

**Correct:** B

**Decision Receipt:** ngram_range=(1,2) includes both single words (unigrams) AND two-word phrases (bigrams). "Money back" becomes a single feature rather than separate "money" and "back."

---

## Q8 (Multiple Choice)
**The support team wants to auto-categorize tickets. You have 1000 labeled examples. Should you use:**

- A) TF-IDF + similarity search (find nearest labeled ticket)
- B) Train a classifier on the 1000 examples
- C) Ask an LLM to categorize each ticket
- D) Random assignment

**Correct:** B

**Decision Receipt:** With LABELED DATA, train a classifier (logistic regression, naive bayes). It learns patterns directly. Similarity search works but is slower at inference and less accurate than a trained model.

---

## Q9 (Multiple Choice)
**TF-IDF vs Sentence Transformers (BERT): which captures meaning better?**

- A) TF-IDF - it's more established
- B) Sentence Transformers - they understand context and semantics
- C) They're equivalent
- D) TF-IDF - it's faster therefore better

**Correct:** B

**Decision Receipt:** TF-IDF matches WORDS. Transformers understand MEANING. "The package never arrived" and "My order is missing" mean the same but share few words. Transformers capture this; TF-IDF might miss it.

---

## Q10 (Multiple Choice)
**When should you use TF-IDF instead of Transformer embeddings?**

- A) When you need the best possible quality
- B) When you need speed, simplicity, and "good enough" results
- C) When you have no text data
- D) Never, Transformers are always better

**Correct:** B

**Decision Receipt:** TF-IDF is FAST, simple to implement, and requires no GPU. For quick prototypes or when exact semantic matching isn't critical, TF-IDF is often sufficient. Start simple, upgrade if needed.

---

## Q11 (Short Answer)
**Define a simple evaluation plan for support-ticket retrieval (v1). Include one quality metric and one speed metric.**

**Expected Answer (example):**
"Track Precision@5 on a labeled query set to measure relevance quality, and monitor p95 query latency to ensure usable speed. Regressions in either should block release."

**Decision Receipt:** Retrieval systems are product systems. You need both relevance and latency goals to avoid shipping something accurate-but-slow or fast-but-useless.

---

## Q12 (Multiple Choice)
**Your ticket search works well. A PM asks: "Can we use this for product recommendations too?"**

Best answer:

- A) "No, embeddings only work for text"
- B) "Yes, if we can represent products with useful signals (text, behavior, or interactions), then similarity search can generalize"
- C) "Only if products have text descriptions"
- D) "We need a completely different approach every time"

**Correct:** B

**Decision Receipt:** Embeddings are a general representation idea, not text-only. Success depends on having meaningful product signals and validating recommendation quality against business outcomes.
