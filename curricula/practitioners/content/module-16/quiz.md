# Module 16 Quiz: Transformers

---

## Question 1

What is the main advantage of transformers over RNNs for processing text?

A) Transformers use less memory
B) Transformers process all positions in parallel, enabling faster training and better long-range dependencies
C) Transformers have fewer parameters
D) Transformers don't need GPUs

**Correct Answer:** B

**Explanation:** RNNs process sequences one step at a time, which is slow and causes vanishing gradients (forgetting early context). Transformers use attention to process all positions simultaneously, enabling parallel computation and direct connections between any two positions regardless of distance.

---

## Question 2

In the attention mechanism, what do Query (Q), Key (K), and Value (V) represent intuitively?

A) Q is the question, K is the answer, V is the verification
B) Q is "what am I looking for?", K is "what do I offer?", V is "what information do I contain?"
C) Q, K, V are just three copies of the input
D) Q is the first word, K is the last word, V is all words

**Correct Answer:** B

**Explanation:** Each token creates a Query (what it's looking for), Key (what it advertises), and Value (its actual information). Attention computes similarity between Queries and Keys to determine which Values to aggregate. High Q-K similarity means that token's Value is relevant.

---

## Question 3

Your document is 10,000 tokens but your model has a 4,000 token context window. What's the best approach?

A) Just input the first 4,000 tokens
B) Use retrieval to select relevant chunks, or summarize earlier sections
C) Split into random 4,000 token chunks
D) The model will automatically handle it

**Correct Answer:** B

**Explanation:** Simply truncating loses important information. Better strategies include: (1) retrieval-augmented generation to find and include only relevant chunks, (2) summarizing earlier sections to fit more content, or (3) using a sliding window with overlap. The right choice depends on the task.

---

## Question 4

What's the difference between BERT and GPT in terms of architecture?

A) BERT is bigger than GPT
B) BERT is bidirectional (sees all context), GPT is autoregressive (left-to-right only)
C) BERT generates text, GPT classifies text
D) There's no difference — they're the same model

**Correct Answer:** B

**Explanation:** BERT uses bidirectional attention (can see words before AND after) and is trained with masked language modeling. GPT uses causal/autoregressive attention (can only see previous words) and predicts the next token. This makes BERT better for understanding tasks and GPT better for generation.

---

## Question 5

Why do transformers use "multi-head" attention instead of single attention?

A) To use more GPU memory
B) Different heads can learn different types of relationships (syntactic, semantic, etc.)
C) It's required for the math to work
D) To make training faster

**Correct Answer:** B

**Explanation:** Multiple attention heads allow the model to attend to different aspects simultaneously. One head might learn subject-verb relationships, another might track pronouns to their antecedents, another might capture semantic similarity. The outputs are concatenated, giving richer representations.

---

## Question 6

A model processes "The bank was steep and covered with flowers." What word should "bank" attend to most to get correct meaning?

A) "The" — it's the first word
B) "steep" and "flowers" — they indicate riverbank, not financial bank
C) "was" — it's the verb
D) Attention should be equal to all words

**Correct Answer:** B

**Explanation:** The meaning of "bank" is ambiguous (financial institution vs riverbank). "Steep" and "flowers" are context clues indicating the riverbank meaning. Effective attention should assign high weights to these disambiguating words, enabling the model to represent "bank" correctly.

---

## Question 7

What does positional encoding add to a transformer?

A) The sentiment of each word
B) Information about where each token is in the sequence
C) The part of speech of each word
D) The embedding dimension

**Correct Answer:** B

**Explanation:** Unlike RNNs which inherently know position through sequential processing, transformers process all positions in parallel with no inherent sense of order. Positional encodings add information about each token's position (1st, 2nd, etc.) so the model can distinguish "dog bites man" from "man bites dog."

---

## Question 8

A stakeholder asks why your chatbot sometimes "forgets" instructions given at the start of a long conversation. The best explanation is:

A) "The model has a limited working memory — about 3,000 words. In long conversations, early messages get pushed out. We can fix this by summarizing earlier context or using retrieval."

B) "The transformer architecture is fundamentally flawed."

C) "You need to repeat instructions because AI doesn't really understand."

D) "This is a bug we're working on fixing."

**Correct Answer:** A

**Explanation:** Context window limits are a real architectural constraint, not a bug. The explanation correctly frames it as "working memory," uses an accessible word count, and offers practical solutions (summarization, retrieval). This helps stakeholders understand the limitation and know it's addressable.

---

## Scoring

- 8/8: Expert level — you understand transformers deeply
- 6-7/8: Solid understanding — review attention mechanism
- 4-5/8: Developing — revisit encoder/decoder differences
- <4/8: Review the full lesson and experiment with the playground
