# Module 12 Quiz: Embeddings

---

## Question 1

A user searches for "password reset help" and your semantic search returns "how to change login credentials" as a top result, even though no words overlap. Why does this work?

A) The search engine matched synonyms from a dictionary
B) Both phrases have similar embeddings because they have similar meaning
C) The system used fuzzy string matching
D) Keywords were expanded using rules

**Correct Answer:** B

**Explanation:** Embeddings capture semantic meaning, not just keywords. "Password reset help" and "change login credentials" end up with similar embedding vectors because they refer to the same concept, allowing semantic search to find relevant results without word overlap.

---

## Question 2

You're comparing support tickets to find duplicates. Which similarity metric should you use?

A) Euclidean distance — it's the most intuitive
B) Cosine similarity — it focuses on direction, not magnitude
C) Manhattan distance — it's more robust
D) Jaccard similarity — it compares word sets

**Correct Answer:** B

**Explanation:** Cosine similarity measures the angle between vectors, ignoring magnitude. This is ideal for text embeddings because the direction captures meaning, while magnitude can vary based on encoding details. Two semantically identical texts should have similar directions even if their vector lengths differ.

---

## Question 3

Your pre-trained embedding model doesn't cluster your company's internal project names well. What's likely the issue?

A) The embedding dimensions are too high
B) The model wasn't trained on your domain-specific terminology
C) Cosine similarity is the wrong metric
D) The model is overfitting

**Correct Answer:** B

**Explanation:** Pre-trained models learn from general text (web, Wikipedia, etc.) and may not understand domain-specific terminology, acronyms, or internal jargon. Solutions include fine-tuning the model on your data or using a domain-specific model.

---

## Question 4

You have embeddings from Model A (384 dimensions) and want to compare them with embeddings from Model B (768 dimensions). What should you do?

A) Pad the shorter embeddings with zeros
B) Truncate the longer embeddings
C) Re-encode all texts using the same model
D) Use a dimension-agnostic similarity metric

**Correct Answer:** C

**Explanation:** Embeddings from different models live in different "spaces" and cannot be directly compared, regardless of dimensionality tricks. The only valid approach is to use the same model for all embeddings you want to compare.

---

## Question 5

Your nearest neighbor search returns many results with cosine similarity between 0.6-0.7. How should you interpret these?

A) These are excellent matches — very similar
B) These are somewhat related but not highly similar
C) These are essentially random matches
D) The embedding model is broken

**Correct Answer:** B

**Explanation:** Cosine similarity of 0.6-0.7 indicates moderate relatedness. For high-quality matches (near-duplicates), you'd want 0.9+. For clearly related content, 0.7-0.9. Values below 0.5 typically indicate different topics.

---

## Question 6

You're visualizing embeddings with t-SNE and notice clear clusters. When you run t-SNE again, the clusters appear in different positions. Is this a problem?

A) Yes — the embeddings must be inconsistent
B) No — t-SNE positions are arbitrary, only relative distances matter
C) Yes — you should use PCA instead
D) No — t-SNE always produces different results

**Correct Answer:** B

**Explanation:** t-SNE is a non-linear dimensionality reduction technique. The absolute positions in 2D have no meaning — only the relative distances (nearby vs far) matter. The same data will cluster the same way; the clusters just might appear rotated or reflected.

---

## Question 7

You want to build a system that finds similar products based on their descriptions. What's the recommended approach?

A) Count word frequencies and compute Jaccard similarity
B) Encode descriptions with a sentence transformer and use cosine similarity
C) Use edit distance to compare descriptions
D) Extract named entities and match them

**Correct Answer:** B

**Explanation:** Sentence transformers produce embeddings that capture semantic meaning of entire sentences/descriptions. Cosine similarity then finds products with similar meanings, even if they use different words. This is more robust than keyword-based approaches.

---

## Question 8

A stakeholder asks why two support tickets with the same issue get different embeddings. The best explanation is:

A) "The embedding model is inconsistent and needs retraining"

B) "Embeddings capture exact wording, so different phrasing produces different vectors — but similar issues will have similar vectors that cluster together"

C) "We should switch to keyword matching for consistency"

D) "Embeddings only work for short text"

**Correct Answer:** B

**Explanation:** Embeddings capture the nuance of how something is said, not just the topic. Two tickets about the same issue with different phrasing will have similar (but not identical) embeddings. This is a feature, not a bug — it allows finding related content while preserving nuance.

---

## Scoring

- 8/8: Expert level — you understand embeddings deeply
- 6-7/8: Solid understanding — review similarity metrics
- 4-5/8: Developing — revisit embedding properties
- <4/8: Review the full lesson and experiment with the playground
