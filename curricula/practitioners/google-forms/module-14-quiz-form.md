# Module 14 Quiz: Retrieval - Google Forms Setup

## Form Setup

1. Go to https://docs.google.com/forms
2. Click **+ Blank**
3. Settings → Enable **"Make this a quiz"**
4. Enable **"Release grade immediately after submission"**

---

## Form Title & Description

**Title:** Module 14 Quiz: Retrieval

**Description:** 
Test your understanding. 8 questions, ~10 minutes.

---

## Questions (Copy-Paste Ready)

### Question 1

**Question:**
A user searches for "password reset" but the relevant article is titled "How to Change Your Login Credentials." Keyword search (BM25) returns no results. What approach would solve this?

**Options:**
- A) Increase the number of results (K)
- B) Use semantic/dense retrieval with embeddings ✓ CORRECT
- C) Add more keywords to the query
- D) Lower the BM25 threshold

**Feedback (add to correct answer):**
BM25 relies on exact term matching, so "password reset" won't match "login credentials." Semantic retrieval uses embeddings that capture meaning, so semantically similar queries will match even without keyword overlap.

**Points:** 1

---

### Question 2

**Question:**
You're evaluating a retrieval system. For a test query, the relevant document appears at position 3. What is the Reciprocal Rank?

**Options:**
- A) 3
- B) 0.5
- C) 0.33 ✓ CORRECT
- D) 1

**Feedback (add to correct answer):**
Reciprocal Rank = 1 / position of first relevant result. If the first relevant document is at position 3, MRR = 1/3 ≈ 0.33. This metric rewards systems that place relevant results earlier.

**Points:** 1

---

### Question 3

**Question:**
Your semantic search has high recall (finds most relevant docs) but low precision (returns many irrelevant docs). What should you try?

**Options:**
- A) Increase K to get more results
- B) Add a reranking stage to reorder results by relevance ✓ CORRECT
- C) Switch to keyword-only search
- D) Remove the embedding model

**Feedback (add to correct answer):**
A two-stage retrieve-then-rerank pipeline is standard. The retrieval stage prioritizes recall (cast a wide net), then a reranking model (often a cross-encoder) improves precision by carefully scoring each candidate for relevance to the query.

**Points:** 1

---

### Question 4

**Question:**
You're building RAG for a support chatbot. Articles average 3,000 words. What chunking strategy is most appropriate?

**Options:**
- A) Use entire articles as chunks (3,000 words each)
- B) Split into 300-500 token chunks with 50 token overlap ✓ CORRECT
- C) Use individual sentences as chunks
- D) Randomly sample paragraphs

**Feedback (add to correct answer):**
3,000-word chunks are too large for LLM context and may contain irrelevant information. Single sentences lose context. Overlapping chunks of 300-500 tokens provide enough context while ensuring no information is lost at boundaries.

**Points:** 1

---

### Question 5

**Question:**
Your retrieval system uses FAISS with IVF indexing. You set nprobe=1 and get very fast queries but poor results. What should you do?

**Options:**
- A) Rebuild the index with more data
- B) Increase nprobe to search more clusters ✓ CORRECT
- C) Switch to brute-force search
- D) Use a smaller embedding model

**Feedback (add to correct answer):**
IVF (Inverted File Index) clusters vectors and searches only nearby clusters. nprobe controls how many clusters to search — nprobe=1 is very fast but may miss relevant vectors in neighboring clusters. Increasing nprobe improves recall at the cost of some speed.

**Points:** 1

---

### Question 6

**Question:**
You notice that technical queries with specific product codes (like "Model XR-7500") fail in semantic search but work perfectly in keyword search. The best solution is:

**Options:**
- A) Remove keyword search entirely
- B) Use hybrid search combining BM25 and semantic scores ✓ CORRECT
- C) Train a new embedding model from scratch
- D) Ask users to describe products instead of using codes

**Feedback (add to correct answer):**
Hybrid search combines the strengths of both approaches: semantic search handles natural language and synonyms, while keyword search (BM25) handles exact matches like product codes. A weighted combination typically gives the best overall performance.

**Points:** 1

---

### Question 7

**Question:**
Your RAG system retrieves relevant chunks, but the LLM sometimes ignores them and makes up information. This is called:

**Options:**
- A) Retrieval failure
- B) Embedding collapse
- C) Hallucination / unfaithfulness ✓ CORRECT
- D) Index corruption

**Feedback (add to correct answer):**
When an LLM generates information not grounded in the retrieved context, it's called hallucination or unfaithfulness. Even with good retrieval, LLMs may ignore context. Solutions include explicit prompting to use only retrieved information, and faithfulness evaluation metrics.

**Points:** 1

---

### Question 8

**Question:**
A stakeholder asks why semantic search is better than their existing keyword search. The best explanation is:

**Options:**
- A) "Semantic search uses neural networks which are more advanced than keywords"
- B) "Semantic search finds relevant content by understanding meaning, so users find what they need even when they phrase questions differently than how articles are written" ✓ CORRECT
- C) "Semantic search is faster and cheaper than keyword search"
- D) "Semantic search always returns more results"

**Feedback (add to correct answer):**
The key benefit is semantic understanding — finding relevant content based on meaning rather than exact word matches. This addresses real user problems (different phrasing, synonyms) in a way stakeholders can understand and relate to their experience.

**Points:** 1

---

