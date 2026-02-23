# Module 16 Quiz: Transformers - Google Forms Setup

## Form Setup

1. Go to https://docs.google.com/forms
2. Click **+ Blank**
3. Settings → Enable **"Make this a quiz"**
4. Enable **"Release grade immediately after submission"**

---

## Form Title & Description

**Title:** Module 16 Quiz: Transformers

**Description:** 
Test your understanding. 8 questions, ~10 minutes.

---

## Questions (Copy-Paste Ready)

### Question 1

**Question:**
What is the main advantage of transformers over RNNs for processing text?

**Options:**
- A) Transformers use less memory
- B) Transformers process all positions in parallel, enabling faster training and better long-range dependencies ✓ CORRECT
- C) Transformers have fewer parameters
- D) Transformers don't need GPUs

**Feedback (add to correct answer):**
RNNs process sequences one step at a time, which is slow and causes vanishing gradients (forgetting early context). Transformers use attention to process all positions simultaneously, enabling parallel computation and direct connections between any two positions regardless of distance.

**Points:** 1

---

### Question 2

**Question:**
In the attention mechanism, what do Query (Q), Key (K), and Value (V) represent intuitively?

**Options:**
- A) Q is the question, K is the answer, V is the verification
- B) Q is "what am I looking for?", K is "what do I offer?", V is "what information do I contain?" ✓ CORRECT
- C) Q, K, V are just three copies of the input
- D) Q is the first word, K is the last word, V is all words

**Feedback (add to correct answer):**
Each token creates a Query (what it's looking for), Key (what it advertises), and Value (its actual information). Attention computes similarity between Queries and Keys to determine which Values to aggregate. High Q-K similarity means that token's Value is relevant.

**Points:** 1

---

### Question 3

**Question:**
Your document is 10,000 tokens but your model has a 4,000 token context window. What's the best approach?

**Options:**
- A) Just input the first 4,000 tokens
- B) Use retrieval to select relevant chunks, or summarize earlier sections ✓ CORRECT
- C) Split into random 4,000 token chunks
- D) The model will automatically handle it

**Feedback (add to correct answer):**
Simply truncating loses important information. Better strategies include: (1) retrieval-augmented generation to find and include only relevant chunks, (2) summarizing earlier sections to fit more content, or (3) using a sliding window with overlap. The right choice depends on the task.

**Points:** 1

---

### Question 4

**Question:**
What's the difference between BERT and GPT in terms of architecture?

**Options:**
- A) BERT is bigger than GPT
- B) BERT is bidirectional (sees all context), GPT is autoregressive (left-to-right only) ✓ CORRECT
- C) BERT generates text, GPT classifies text
- D) There's no difference — they're the same model

**Feedback (add to correct answer):**
BERT uses bidirectional attention (can see words before AND after) and is trained with masked language modeling. GPT uses causal/autoregressive attention (can only see previous words) and predicts the next token. This makes BERT better for understanding tasks and GPT better for generation.

**Points:** 1

---

### Question 5

**Question:**
Why do transformers use "multi-head" attention instead of single attention?

**Options:**
- A) To use more GPU memory
- B) Different heads can learn different types of relationships (syntactic, semantic, etc.) ✓ CORRECT
- C) It's required for the math to work
- D) To make training faster

**Feedback (add to correct answer):**
Multiple attention heads allow the model to attend to different aspects simultaneously. One head might learn subject-verb relationships, another might track pronouns to their antecedents, another might capture semantic similarity. The outputs are concatenated, giving richer representations.

**Points:** 1

---

### Question 6

**Question:**
A model processes "The bank was steep and covered with flowers." What word should "bank" attend to most to get correct meaning?

**Options:**
- A) "The" — it's the first word
- B) "steep" and "flowers" — they indicate riverbank, not financial bank ✓ CORRECT
- C) "was" — it's the verb
- D) Attention should be equal to all words

**Feedback (add to correct answer):**
The meaning of "bank" is ambiguous (financial institution vs riverbank). "Steep" and "flowers" are context clues indicating the riverbank meaning. Effective attention should assign high weights to these disambiguating words, enabling the model to represent "bank" correctly.

**Points:** 1

---

### Question 7

**Question:**
What does positional encoding add to a transformer?

**Options:**
- A) The sentiment of each word
- B) Information about where each token is in the sequence ✓ CORRECT
- C) The part of speech of each word
- D) The embedding dimension

**Feedback (add to correct answer):**
Unlike RNNs which inherently know position through sequential processing, transformers process all positions in parallel with no inherent sense of order. Positional encodings add information about each token's position (1st, 2nd, etc.) so the model can distinguish "dog bites man" from "man bites dog."

**Points:** 1

---

### Question 8

**Question:**
A stakeholder asks why your chatbot sometimes "forgets" instructions given at the start of a long conversation. The best explanation is:

**Options:**
- A) "The model has a limited working memory — about 3,000 words. In long conversations, early messages get pushed out. We can fix this by summarizing earlier context or using retrieval." ✓ CORRECT
- B) "The transformer architecture is fundamentally flawed."
- C) "You need to repeat instructions because AI doesn't really understand."
- D) "This is a bug we're working on fixing."

**Feedback (add to correct answer):**
Context window limits are a real architectural constraint, not a bug. The explanation correctly frames it as "working memory," uses an accessible word count, and offers practical solutions (summarization, retrieval). This helps stakeholders understand the limitation and know it's addressable.

**Points:** 1

---

