# Module 12 Quiz: Embeddings - Google Forms Setup

## Form Setup

1. Go to https://docs.google.com/forms
2. Click **+ Blank**
3. Settings → Enable **"Make this a quiz"**
4. Enable **"Release grade immediately after submission"**

---

## Form Title & Description

**Title:** Module 12 Quiz: Embeddings

**Description:** 
Test your understanding. 8 questions, ~10 minutes.

---

## Questions (Copy-Paste Ready)

### Question 1

**Question:**
A user searches for "password reset help" and your semantic search returns "how to change login credentials" as a top result, even though no words overlap. Why does this work?

**Options:**
- A) The search engine matched synonyms from a dictionary
- B) Both phrases have similar embeddings because they have similar meaning ✓ CORRECT
- C) The system used fuzzy string matching
- D) Keywords were expanded using rules

**Feedback (add to correct answer):**
Embeddings capture semantic meaning, not just keywords. "Password reset help" and "change login credentials" end up with similar embedding vectors because they refer to the same concept, allowing semantic search to find relevant results without word overlap.

**Points:** 1

---

### Question 2

**Question:**
You're comparing support tickets to find duplicates. Which similarity metric should you use?

**Options:**
- A) Euclidean distance — it's the most intuitive
- B) Cosine similarity — it focuses on direction, not magnitude ✓ CORRECT
- C) Manhattan distance — it's more robust
- D) Jaccard similarity — it compares word sets

**Feedback (add to correct answer):**
Cosine similarity measures the angle between vectors, ignoring magnitude. This is ideal for text embeddings because the direction captures meaning, while magnitude can vary based on encoding details. Two semantically identical texts should have similar directions even if their vector lengths differ.

**Points:** 1

---

### Question 3

**Question:**
Your pre-trained embedding model doesn't cluster your company's internal project names well. What's likely the issue?

**Options:**
- A) The embedding dimensions are too high
- B) The model wasn't trained on your domain-specific terminology ✓ CORRECT
- C) Cosine similarity is the wrong metric
- D) The model is overfitting

**Feedback (add to correct answer):**
Pre-trained models learn from general text (web, Wikipedia, etc.) and may not understand domain-specific terminology, acronyms, or internal jargon. Solutions include fine-tuning the model on your data or using a domain-specific model.

**Points:** 1

---

### Question 4

**Question:**
You have embeddings from Model A (384 dimensions) and want to compare them with embeddings from Model B (768 dimensions). What should you do?

**Options:**
- A) Pad the shorter embeddings with zeros
- B) Truncate the longer embeddings
- C) Re-encode all texts using the same model ✓ CORRECT
- D) Use a dimension-agnostic similarity metric

**Feedback (add to correct answer):**
Embeddings from different models live in different "spaces" and cannot be directly compared, regardless of dimensionality tricks. The only valid approach is to use the same model for all embeddings you want to compare.

**Points:** 1

---

### Question 5

**Question:**
Your nearest neighbor search returns many results with cosine similarity between 0.6-0.7. How should you interpret these?

**Options:**
- A) These are excellent matches — very similar
- B) These are somewhat related but not highly similar ✓ CORRECT
- C) These are essentially random matches
- D) The embedding model is broken

**Feedback (add to correct answer):**
Cosine similarity of 0.6-0.7 indicates moderate relatedness. For high-quality matches (near-duplicates), you'd want 0.9+. For clearly related content, 0.7-0.9. Values below 0.5 typically indicate different topics.

**Points:** 1

---

### Question 6

**Question:**
You're visualizing embeddings with t-SNE and notice clear clusters. When you run t-SNE again, the clusters appear in different positions. Is this a problem?

**Options:**
- A) Yes — the embeddings must be inconsistent
- B) No — t-SNE positions are arbitrary, only relative distances matter ✓ CORRECT
- C) Yes — you should use PCA instead
- D) No — t-SNE always produces different results

**Feedback (add to correct answer):**
t-SNE is a non-linear dimensionality reduction technique. The absolute positions in 2D have no meaning — only the relative distances (nearby vs far) matter. The same data will cluster the same way; the clusters just might appear rotated or reflected.

**Points:** 1

---

### Question 7

**Question:**
You want to build a system that finds similar products based on their descriptions. What's the recommended approach?

**Options:**
- A) Count word frequencies and compute Jaccard similarity
- B) Encode descriptions with a sentence transformer and use cosine similarity ✓ CORRECT
- C) Use edit distance to compare descriptions
- D) Extract named entities and match them

**Feedback (add to correct answer):**
Sentence transformers produce embeddings that capture semantic meaning of entire sentences/descriptions. Cosine similarity then finds products with similar meanings, even if they use different words. This is more robust than keyword-based approaches.

**Points:** 1

---

### Question 8

**Question:**
A stakeholder asks why two support tickets with the same issue get different embeddings. The best explanation is:

**Options:**
- A) "The embedding model is inconsistent and needs retraining"
- B) "Embeddings capture exact wording, so different phrasing produces different vectors — but similar issues will have similar vectors that cluster together" ✓ CORRECT
- C) "We should switch to keyword matching for consistency"
- D) "Embeddings only work for short text"

**Feedback (add to correct answer):**
Embeddings capture the nuance of how something is said, not just the topic. Two tickets about the same issue with different phrasing will have similar (but not identical) embeddings. This is a feature, not a bug — it allows finding related content while preserving nuance.

**Points:** 1

---

