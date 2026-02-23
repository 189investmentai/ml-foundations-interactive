# Module 8: Typeform Scenarios

---

## Scenario 1: Embedding Use Case

**Setup:**
Your support team wants to automatically route tickets to the right help article. You have 500 help articles and thousands of incoming tickets daily.

**Question:** What's the best approach?

**Options:**
- A) Keyword matching—search for exact words in articles
- B) Embed tickets and articles, find nearest article for each ticket
- C) Classify tickets into categories, then show category articles
- D) Let GPT-4 read and answer each ticket

**Correct Answer:** B

**Decision Receipt:**
Embeddings capture semantic meaning, so "can't access account" matches "login troubleshooting" even without shared words. Keyword matching fails when users phrase things differently. Classification adds a labeling burden. LLM for every ticket is slow and expensive.

---

## Scenario 2: Similarity Metric

**Setup:**
You have text embeddings for support tickets. Some tickets are 2 words ("refund please"), others are 200 words (detailed complaint with history).

**Question:** What similarity metric handles this best?

**Options:**
- A) Euclidean distance—standard for any vectors
- B) Cosine similarity—ignores vector length
- C) Dot product—amplifies longer vectors
- D) Manhattan distance—more robust to outliers

**Correct Answer:** B

**Decision Receipt:**
Cosine similarity measures angle between vectors, ignoring their lengths. A long and short ticket about the same topic will have similar direction but different magnitudes. Cosine handles this; Euclidean doesn't. This is why cosine is standard for text embeddings.

---

## Scenario 3: Scale Considerations

**Setup:**
You're building product recommendations. You have 50,000 products and need to find similar products in <100ms for each page load.

**Question:** What infrastructure do you need?

**Options:**
- A) Just loop through all products and calculate similarity
- B) Use FAISS or a vector database for approximate nearest neighbor search
- C) Cache all similarities (50K × 50K matrix)
- D) Use a smaller embedding dimension

**Correct Answer:** B

**Decision Receipt:**
Brute force (50K comparisons) is too slow for <100ms latency. Caching all pairs (2.5B similarities) is impractical. Smaller dimensions might hurt quality. FAISS enables sub-millisecond search through approximate nearest neighbors with acceptable accuracy loss.

---

## Scenario 4: Embedding Quality

**Setup:**
You embedded your help articles with a general text model. When testing, "password reset" matches "account security policy" as #1 result instead of "how to reset your password."

**Question:** What's most likely wrong?

**Options:**
- A) The model is broken
- B) You need more articles
- C) General embeddings miss domain-specific meaning
- D) Cosine similarity is wrong for this

**Correct Answer:** C

**Decision Receipt:**
General embedding models learn from internet text. They might see "password" and "security" as conceptually close (they often appear together). Domain-specific fine-tuning or a model trained on support data would better capture that "password reset" should match action-oriented how-to articles, not policy documents.

---

## Scenario 5: Product Embeddings

**Setup:**
You want to recommend similar products. You have no text descriptions—just purchase history.

**Question:** How do you create product embeddings?

**Options:**
- A) Can't—you need text for embeddings
- B) Use collaborative filtering—embed products by co-purchase patterns
- C) Manually describe each product
- D) Use image embeddings from product photos

**Correct Answer:** B

**Decision Receipt:**
Products that appear in the same orders are "contextually similar" to users. Treat each order as a sequence and train Word2Vec-style embeddings. "prod_A and prod_B bought together often" → similar embeddings. This is collaborative filtering logic turned into embeddings.

---

## Scenario 6: Vector Database Selection

**Setup:**
You need semantic search for your knowledge base. Requirements: 100K documents, 10 queries/second, needs to run in your existing cloud.

**Question:** What's a reasonable approach?

**Options:**
- A) Build your own with numpy
- B) Use FAISS with in-memory index
- C) Set up a managed vector database (Pinecone, Weaviate)
- D) Store embeddings in PostgreSQL with pgvector

**Correct Answer:** B or D (both reasonable)

**Decision Receipt:**
At 100K documents and 10 QPS, you don't need massive infrastructure. FAISS in-memory can handle this easily. PostgreSQL with pgvector keeps everything in one database you already manage. Managed vector databases are great but might be overkill for this scale. Pick based on your team's comfort.

---

## Scoring Summary

**6/6 correct:** Strong understanding of embeddings and their applications.

**4-5/6 correct:** Good foundation. Review the scaling and domain-specific considerations.

**<4/6 correct:** Re-read the micro-lesson, especially the use cases section.
