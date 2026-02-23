# Module 9: From Keywords to Meaning

**Time:** 60-90 minutes  
**Prerequisites:** Module 8 (Embeddings)

---

## The Setup

Traditional programming treats text as strings—sequences of characters. "Happy" and "joyful" are completely different strings, as unrelated as "happy" and "potato."

NLP (Natural Language Processing) teaches machines that words have meaning, context matters, and "happy" and "joyful" are related even though they share no letters.

This module traces the evolution from keyword matching to modern transformers—the architecture behind ChatGPT, BERT, and every impressive language model.

**The question we're answering:** How did we go from "ctrl+F for keywords" to machines that understand language?

---

## The Mental Model

### The Evolution

```
ERA 1: KEYWORDS (1990s)
──────────────────────
"Does the text contain 'cancel'?"
→ Bags of words, TF-IDF
→ Problem: "terminate" and "end" don't match

ERA 2: WORD MEANINGS (2010s)
────────────────────────────
"What words are similar?"
→ Word2Vec, GloVe
→ Problem: "bank" means different things

ERA 3: CONTEXT (2017+)
──────────────────────
"What does THIS word mean in THIS sentence?"
→ Transformers (BERT, GPT)
→ "Bank robbery" vs "river bank" → different vectors!
```

### The Transformer Insight

The breakthrough: instead of giving each word ONE meaning, let the meaning depend on context.

```
OLD: "bank" → [0.12, 0.34, -0.56, ...]  (always the same)

NEW:
"The bank approved my loan" → [0.82, 0.15, -0.23, ...]
"We walked along the river bank" → [-0.45, 0.72, 0.18, ...]

Same word, different vectors based on surrounding words!
```

---

## How Transformers Work (Intuition)

### Attention: "What should I focus on?"

The key mechanism is **attention**: when processing each word, the model decides how much to "look at" every other word in the sentence.

```
"The customer who filed three complaints yesterday churned"
                                                      ↑
When understanding "churned", attention looks back:
- "customer" → HIGH attention (who churned?)
- "complaints" → HIGH attention (why did they churn?)
- "three" → MEDIUM attention
- "who" → LOW attention
- "The" → VERY LOW attention
```

### Self-Attention in Action

For each word, the model asks: "Which other words in this sentence help me understand this one?"

```
Input: "Apple released new products"

When processing "Apple":
- Is this the fruit or the company?
- Attention looks at "released" and "products"
- Those words make "Apple Inc." much more likely
- Vector shifts toward "technology company"
```

### Why "Transformer"?

The architecture *transforms* each word's representation by mixing in information from all other words, weighted by attention. The output is context-aware embeddings for every word.

---

## BERT vs GPT: Two Flavors

Both use transformers, but differently:

### BERT (Bidirectional)

Looks at words on BOTH sides. Good for understanding/classification.

```
"The [MASK] was delicious" → What word fits?
      ↓      ↓
  (looks left and right)
      ↓
  "meal" or "pizza" likely
```

**Use for:** Classification, entity extraction, sentiment analysis

### GPT (Left-to-Right)

Only looks at previous words. Good for generation.

```
"The meal was" → What comes next?
     ↓
(only looks left)
     ↓
"delicious", "disappointing", "served"
```

**Use for:** Text generation, chatbots, completion

### Quick Comparison

| | BERT | GPT |
|---|------|-----|
| **Direction** | Both directions | Left-to-right |
| **Strength** | Understanding | Generation |
| **Output** | Embeddings | Next word |
| **Use case** | Classification, search | Chatbots, writing |

---

## Practical NLP Tasks

### Task 1: Sentiment Classification

Is this review positive or negative?

```python
from transformers import pipeline

classifier = pipeline("sentiment-analysis")
result = classifier("I love this product! Best purchase ever.")
# {'label': 'POSITIVE', 'score': 0.999}
```

### Task 2: Named Entity Recognition (NER)

Find names, organizations, dates in text.

```python
ner = pipeline("ner", grouped_entities=True)
entities = ner("Apple CEO Tim Cook announced the iPhone in Cupertino.")
# [
#   {'entity_group': 'ORG', 'word': 'Apple', 'score': 0.99},
#   {'entity_group': 'PER', 'word': 'Tim Cook', 'score': 0.98},
#   {'entity_group': 'MISC', 'word': 'iPhone', 'score': 0.95},
#   {'entity_group': 'LOC', 'word': 'Cupertino', 'score': 0.97}
# ]
```

### Task 3: Text Classification

Route support tickets to the right team.

```python
from transformers import pipeline

classifier = pipeline("zero-shot-classification")
result = classifier(
    "My order never arrived and I want a refund",
    candidate_labels=["billing", "shipping", "technical", "general"]
)
# {'labels': ['shipping', 'billing', ...], 'scores': [0.72, 0.23, ...]}
```

### Task 4: Question Answering

Find answers in documents.

```python
qa = pipeline("question-answering")
result = qa(
    question="What is the return policy?",
    context="You can return items within 30 days. Refunds take 5-7 business days."
)
# {'answer': 'within 30 days', 'score': 0.95}
```

---

## The StreamCart Use Cases

### Use Case 1: Ticket Sentiment

```python
# Detect angry customers for priority handling
classifier = pipeline("sentiment-analysis")

tickets = [
    "Just wondering when my order will ship",
    "THIS IS RIDICULOUS. THIRD TIME THIS MONTH. I WANT A MANAGER"
]

for ticket in tickets:
    sentiment = classifier(ticket)[0]
    priority = "HIGH" if sentiment['label'] == 'NEGATIVE' and sentiment['score'] > 0.9 else "NORMAL"
    print(f"{priority}: {ticket[:50]}...")
```

### Use Case 2: Auto-Categorization

```python
# Zero-shot classification—no training data needed!
classifier = pipeline("zero-shot-classification")

categories = ["billing", "shipping", "product_issue", "account", "other"]

def categorize_ticket(text):
    result = classifier(text, categories)
    return result['labels'][0], result['scores'][0]

ticket = "I can't login to see my order history"
category, confidence = categorize_ticket(ticket)
# ('account', 0.85)
```

### Use Case 3: Extract Order IDs

```python
# Find order numbers mentioned in tickets
import re

def extract_order_id(text):
    # Regex for StreamCart order format
    match = re.search(r'SC-\d{6}', text)
    return match.group() if match else None

# For more complex extraction, use NER fine-tuned for your data
```

---

## When to Use What

| Task | Best Approach |
|------|---------------|
| Classify text (sentiment, category) | BERT-based classifier or zero-shot |
| Find similar texts | Embeddings + similarity search (Module 8) |
| Generate text | GPT / LLMs (Module 10) |
| Extract entities | NER pipeline |
| Answer questions from docs | QA pipeline or RAG (Module 10) |

---

## What Goes Wrong

### Mistake 1: Ignoring pre-trained models

**Symptom:** Building NLP from scratch, poor results.

**Fix:** Start with Hugging Face pipelines. Fine-tune if needed, but don't reinvent.

### Mistake 2: Wrong model for the task

**Symptom:** Using GPT for classification, BERT for generation.

**Fix:** Match model type to task. BERT for understanding, GPT for generating.

### Mistake 3: Context length limits

**Symptom:** Long documents get truncated, losing information.

**Example:** BERT handles 512 tokens (~300-400 words). Longer text is cut off.

**Fix:** Chunk long documents, or use long-context models.

### Mistake 4: Expecting magic

**Symptom:** "The AI should just understand our company's products."

**Reality:** Models know general language, not your specific domain.

**Fix:** Fine-tune on your data, or use RAG with your knowledge base.

---

## Practice

### 1. Build (Colab Lab)
→ [Link to Colab notebook]

**What you'll do:**
- Use sentiment analysis on support tickets
- Apply zero-shot classification
- Try question answering
- Compare model outputs

**Time:** ~20 minutes

---

### 2. Decide (Scenario Quiz)
→ [Scenario Quiz](https://docs.google.com/forms/d/e/1FAIpQLSdKvXp4peVPzEHSnRkKgOE1ZYlcYQLkTi0wClkuUOqd7NyAZw/viewform?usp=header)

**What you'll do:** 6 scenarios about choosing NLP approaches and understanding model limitations.

**Time:** ~10 minutes

---

### 3. Debug (Find the Bug)
→ [Debug Drill](https://colab.research.google.com/github/189investmentai/ml-foundations-interactive/blob/main/notebooks/debug_drills/drill_09_hallucination.ipynb)

**What you'll do:** Classification results are inconsistent. Find why.

**Time:** ~15 minutes

---

### 4. Explain (Stakeholder Update)

**The prompt:**  
Your PM asks: "Can we use AI to automatically categorize support tickets?" Write a response explaining what's possible, what's needed, and realistic expectations.

**What good looks like:**
- Says "yes, with caveats"
- Mentions zero-shot vs fine-tuning tradeoffs
- Sets realistic accuracy expectations
- Suggests a pilot approach

---

## Cheat Sheet

→ [Download: Module 9 Cheat Sheet (PDF)](#)

---

## Done?

- [ ] Read the micro-lesson
- [ ] Completed the scenario quiz  
- [ ] Ran the Colab lab
- [ ] Fixed the debug drill
- [ ] Wrote the stakeholder update

**Next up:** [Module 10: Working with LLMs](#)
