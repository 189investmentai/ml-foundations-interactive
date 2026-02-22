# Module 09: Transformers & LLMs - Typeform Scenario

**Theme:** You're evaluating whether to use LLMs for customer support automation.

---

## Q1 (Multiple Choice)
**"Attention" in Transformers means:**

- A) The model requires human attention to work
- B) The model learns which parts of the input are most relevant for each task
- C) The model pays equal attention to all words
- D) The model only processes the first few words

**Correct:** B

**Decision Receipt:** ATTENTION lets the model dynamically focus on relevant parts. For "The customer was frustrated because the package never arrived," it learns that "frustrated," "package," and "arrived" matter most for classification.

---

## Q2 (Multiple Choice)
**Pre-trained models like BERT are useful because:**

- A) They require no data to work
- B) They've learned language patterns from massive text, which transfers to your task
- C) They're smaller than custom models
- D) They don't need GPUs

**Correct:** B

**Decision Receipt:** TRANSFER LEARNING. BERT learned language structure from billions of words. Fine-tuning it on your 1000 tickets leverages that knowledge. You'd need millions of examples to learn this from scratch.

---

## Q3 (Multiple Choice)
**Your support team wants to classify tickets automatically. You have 500 labeled examples. Which approach is best?**

- A) Train GPT-4 from scratch
- B) Fine-tune a small pre-trained model (like DistilBERT)
- C) Use zero-shot prompting with no examples
- D) Build a rule-based system

**Correct:** B

**Decision Receipt:** 500 examples is enough to FINE-TUNE a pre-trained model. Zero-shot might work but fine-tuning is more reliable. Training from scratch needs much more data. Rule-based is fragile.

---

## Q4 (Multiple Choice)
**"Prompting" an LLM means:**

- A) Training it on new data
- B) Giving it instructions and examples in the input to guide its response
- C) Deleting its knowledge
- D) Running it on a GPU

**Correct:** B

**Decision Receipt:** PROMPTING gives the model instructions: "Classify this ticket into: billing, shipping, account. Ticket: [text]." The model uses its knowledge to follow instructions without additional training.

---

## Q5 (Multiple Choice)
**When should you use prompting vs fine-tuning?**

- A) Prompting when you have lots of labeled data
- B) Prompting for quick experiments; fine-tuning when you need consistent, high accuracy
- C) Fine-tuning is always better
- D) Prompting is always better

**Correct:** B

**Decision Receipt:** PROMPTING is fast to try (no training). But results vary and you use API costs per query. FINE-TUNING gives consistent behavior for your specific task but requires data and training effort.

---

## Q6 (Multiple Choice)
**RAG (Retrieval-Augmented Generation) is useful when:**

- A) You want the model to make up information
- B) You need the model to answer questions using YOUR documents
- C) You have no documents
- D) The model already knows everything

**Correct:** B

**Decision Receipt:** RAG retrieves relevant documents from YOUR knowledge base, adds them to the prompt, then the LLM answers based on that context. It GROUNDS responses in your data instead of general knowledge.

---

## Q7 (Multiple Choice)
**Your LLM chatbot says: "Our return policy is 90 days." The actual policy is 30 days. This is called:**

- A) Correct behavior
- B) A hallucination
- C) A feature
- D) Overfitting

**Correct:** B

**Decision Receipt:** HALLUCINATION = confident, plausible-sounding wrong information. The model doesn't "know" your policy; it generates text that sounds reasonable. This is a critical risk for customer-facing LLMs.

---

## Q8 (Multiple Choice)
**To reduce hallucinations, you should:**

- A) Use a larger model
- B) Ground responses in retrieved documents (RAG) and add verification
- C) Remove all prompting
- D) Increase temperature

**Correct:** B

**Decision Receipt:** RAG provides source material. You can also: instruct the model to say "I don't know" when uncertain, verify claims against a knowledge base, and have humans review edge cases.

---

## Q9 (Multiple Choice)
**Your LLM sometimes returns different answers for the same question. This is because:**

- A) The model is broken
- B) LLMs have randomness (temperature); they're not deterministic
- C) Someone changed the model
- D) The question is invalid

**Correct:** B

**Decision Receipt:** LLMs sample from probability distributions. TEMPERATURE controls randomness: higher = more creative/variable, lower = more consistent. For production, use low temperature for reliability.

---

## Q10 (Multiple Choice)
**Comparing approaches for a ticket classification task:**

| Approach | Accuracy | Cost/query | Setup time |
|----------|----------|------------|------------|
| Rules | 60% | Free | High |
| TF-IDF + LogReg | 78% | Free | Medium |
| Fine-tuned BERT | 88% | $0.001 | High |
| GPT-4 prompting | 85% | $0.05 | Low |

**For 10,000 tickets/day, tight budget, and a minimum 85% accuracy requirement, which is best?**

- A) GPT-4 prompting
- B) Fine-tuned BERT
- C) TF-IDF + LogReg
- D) Rules

**Correct:** B

**Decision Receipt:** Constraint-aware decisions need all three dimensions: quality, cost, and scale. Here, TF-IDF misses the required accuracy floor, and GPT-4 is too costly at volume.

---

## Q11 (Multiple Choice)
**A stakeholder wants to use GPT-4 for "everything." Your best response is:**

- A) "Great idea, GPT-4 is the best for all tasks"
- B) "Let's evaluate: what's the task, accuracy requirement, volume, and budget?"
- C) "LLMs are too expensive, we should never use them"
- D) "GPT-4 can't do anything useful"

**Correct:** B

**Decision Receipt:** LLMs are powerful but have trade-offs: cost, latency, hallucination risk, non-determinism. For simple classification, traditional ML might be better. For complex language understanding, LLMs shine. EVALUATE per use case.

---

## Q12 (Short Answer)
**A PM asks whether to use prompting, fine-tuning, or RAG for a new support assistant. Write 3 bullets: one "use when" rule for each approach.**

**Expected Answer (key points):**
- Prompting: fast experiments / low volume / changing tasks
- Fine-tuning: stable task, enough labeled data, need consistent high accuracy and low unit cost
- RAG: answers must be grounded in internal docs and up-to-date policies

**Decision Receipt:** The right LLM pattern depends on problem shape. Strong practitioners choose architecture by constraints, not hype.
