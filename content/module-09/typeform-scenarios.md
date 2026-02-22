# Module 9: Typeform Scenarios

---

## Scenario 1: Model Selection

**Setup:**
You need to classify support tickets into 5 categories. You have 50 labeled examples per category.

**Question:** What's the best starting approach?

**Options:**
- A) Train a transformer from scratch
- B) Fine-tune BERT on your 250 examples
- C) Try zero-shot classification first
- D) Use keyword rules

**Correct Answer:** C

**Decision Receipt:**
With only 250 examples, start with zero-shot classification—no training needed. If accuracy is insufficient, then fine-tune BERT. Training from scratch requires millions of examples. Keyword rules miss synonyms and phrasing variations.

---

## Scenario 2: Context Understanding

**Setup:**
Your NLP model classifies these two sentences differently:
- "Apple released iOS 16" → Technology
- "The apple was rotten" → Food

**Question:** What capability enables this?

**Options:**
- A) Larger vocabulary
- B) Attention mechanism in transformers
- C) More training data
- D) Rule-based post-processing

**Correct Answer:** B

**Decision Receipt:**
Attention lets the model understand "Apple" differently based on context. In sentence 1, attention connects "Apple" to "iOS" and "released." In sentence 2, "apple" connects to "rotten." Old models (Word2Vec) gave "apple" one vector regardless of context.

---

## Scenario 3: Token Limits

**Setup:**
You're building a document classifier. Some documents are 2,000 words. Your BERT model has a 512 token limit.

**Question:** What's the best approach?

**Options:**
- A) Just use the first 512 tokens
- B) Split into chunks, classify each, combine results
- C) Use a different non-transformer model
- D) Increase the token limit

**Correct Answer:** B

**Decision Receipt:**
Chunking preserves information from the whole document. Just using the first 512 tokens might miss the main point. Changing the token limit isn't straightforward and can break the model. Chunking with voting/averaging is the standard approach.

---

## Scenario 4: Zero-Shot Trade-offs

**Setup:**
Zero-shot classification achieves 75% accuracy on your ticket categories. Fine-tuning on 500 labeled examples would likely improve it.

**Question:** When should you NOT fine-tune?

**Options:**
- A) When categories might change frequently
- B) When you need the best possible accuracy
- C) When you have the labeled data ready
- D) When inference speed matters

**Correct Answer:** A

**Decision Receipt:**
Fine-tuning bakes in specific categories. If categories change (new issues emerge, teams reorganize), you'd need to relabel and retrain. Zero-shot handles new categories with just a name change. If stability is more important than maximum accuracy, stay with zero-shot.

---

## Scenario 5: BERT vs GPT

**Setup:**
You want to build two features:
1. Detect if a review is positive or negative
2. Generate personalized thank-you messages

**Question:** Which models should you use?

**Options:**
- A) BERT for both
- B) GPT for both
- C) BERT for sentiment, GPT for generation
- D) GPT for sentiment, BERT for generation

**Correct Answer:** C

**Decision Receipt:**
BERT excels at understanding tasks (classification, sentiment). GPT excels at generation (writing text). Using them for their strengths is more effective than forcing one model to do everything.

---

## Scenario 6: Domain Adaptation

**Setup:**
Your general-purpose sentiment model classifies "The installation process was killer" as NEGATIVE (interpreting "killer" literally).

**Question:** What's the best fix?

**Options:**
- A) Add "killer" to a positive words list
- B) Fine-tune on domain-specific examples
- C) Use a larger model
- D) This is unfixable—models can't learn slang

**Correct Answer:** B

**Decision Receipt:**
Fine-tuning on your domain teaches the model that "killer" in tech contexts often means "excellent." A larger model might help but isn't guaranteed. Word lists are brittle and don't generalize. Models absolutely can learn domain-specific language with the right training data.

---

## Scoring Summary

**6/6 correct:** You understand modern NLP well.

**4-5/6 correct:** Good foundation. Review context understanding and model selection.

**<4/6 correct:** Re-read the micro-lesson, especially the BERT vs GPT comparison.
