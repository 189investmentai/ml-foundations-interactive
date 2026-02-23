# Module 14 Quiz: Retrieval

---

## Question 1

A user searches for "password reset" but the relevant article is titled "How to Change Your Login Credentials." Keyword search (BM25) returns no results. What approach would solve this?

A) Increase the number of results (K)
B) Use semantic/dense retrieval with embeddings
C) Add more keywords to the query
D) Lower the BM25 threshold

**Correct Answer:** B

**Explanation:** BM25 relies on exact term matching, so "password reset" won't match "login credentials." Semantic retrieval uses embeddings that capture meaning, so semantically similar queries will match even without keyword overlap.

---

## Question 2

You're evaluating a retrieval system. For a test query, the relevant document appears at position 3. What is the Reciprocal Rank?

A) 3
B) 0.5
C) 0.33
D) 1

**Correct Answer:** C

**Explanation:** Reciprocal Rank = 1 / position of first relevant result. If the first relevant document is at position 3, MRR = 1/3 ≈ 0.33. This metric rewards systems that place relevant results earlier.

---

## Question 3

Your semantic search has high recall (finds most relevant docs) but low precision (returns many irrelevant docs). What should you try?

A) Increase K to get more results
B) Add a reranking stage to reorder results by relevance
C) Switch to keyword-only search
D) Remove the embedding model

**Correct Answer:** B

**Explanation:** A two-stage retrieve-then-rerank pipeline is standard. The retrieval stage prioritizes recall (cast a wide net), then a reranking model (often a cross-encoder) improves precision by carefully scoring each candidate for relevance to the query.

---

## Question 4

You're building RAG for a support chatbot. Articles average 3,000 words. What chunking strategy is most appropriate?

A) Use entire articles as chunks (3,000 words each)
B) Split into 300-500 token chunks with 50 token overlap
C) Use individual sentences as chunks
D) Randomly sample paragraphs

**Correct Answer:** B

**Explanation:** 3,000-word chunks are too large for LLM context and may contain irrelevant information. Single sentences lose context. Overlapping chunks of 300-500 tokens provide enough context while ensuring no information is lost at boundaries.

---

## Question 5

Your retrieval system uses FAISS with IVF indexing. You set nprobe=1 and get very fast queries but poor results. What should you do?

A) Rebuild the index with more data
B) Increase nprobe to search more clusters
C) Switch to brute-force search
D) Use a smaller embedding model

**Correct Answer:** B

**Explanation:** IVF (Inverted File Index) clusters vectors and searches only nearby clusters. nprobe controls how many clusters to search — nprobe=1 is very fast but may miss relevant vectors in neighboring clusters. Increasing nprobe improves recall at the cost of some speed.

---

## Question 6

You notice that technical queries with specific product codes (like "Model XR-7500") fail in semantic search but work perfectly in keyword search. The best solution is:

A) Remove keyword search entirely
B) Use hybrid search combining BM25 and semantic scores
C) Train a new embedding model from scratch
D) Ask users to describe products instead of using codes

**Correct Answer:** B

**Explanation:** Hybrid search combines the strengths of both approaches: semantic search handles natural language and synonyms, while keyword search (BM25) handles exact matches like product codes. A weighted combination typically gives the best overall performance.

---

## Question 7

Your RAG system retrieves relevant chunks, but the LLM sometimes ignores them and makes up information. This is called:

A) Retrieval failure
B) Embedding collapse
C) Hallucination / unfaithfulness
D) Index corruption

**Correct Answer:** C

**Explanation:** When an LLM generates information not grounded in the retrieved context, it's called hallucination or unfaithfulness. Even with good retrieval, LLMs may ignore context. Solutions include explicit prompting to use only retrieved information, and faithfulness evaluation metrics.

---

## Question 8

A stakeholder asks why semantic search is better than their existing keyword search. The best explanation is:

A) "Semantic search uses neural networks which are more advanced than keywords"

B) "Semantic search finds relevant content by understanding meaning, so users find what they need even when they phrase questions differently than how articles are written"

C) "Semantic search is faster and cheaper than keyword search"

D) "Semantic search always returns more results"

**Correct Answer:** B

**Explanation:** The key benefit is semantic understanding — finding relevant content based on meaning rather than exact word matches. This addresses real user problems (different phrasing, synonyms) in a way stakeholders can understand and relate to their experience.

---

## Scoring

- 8/8: Expert level — you understand retrieval deeply
- 6-7/8: Solid understanding — review hybrid search
- 4-5/8: Developing — revisit the two-stage pipeline
- <4/8: Review the full lesson and experiment with the playground
