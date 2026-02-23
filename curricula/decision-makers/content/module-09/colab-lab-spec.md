# Module 9: Colab Lab Spec

**Lab Title:** NLP Pipelines for Support  
**Time:** ~20 minutes  
**Goal:** Apply transformers to support ticket analysis

---

## Lab Structure

### Cell 1: Setup

```python
!pip install transformers -q

from transformers import pipeline
import pandas as pd

print("Loading models...")
sentiment = pipeline("sentiment-analysis")
classifier = pipeline("zero-shot-classification")
qa = pipeline("question-answering")
print("Ready!")
```

---

### Cell 2: Sample Tickets

```python
tickets = [
    "My order SC-123456 never arrived. This is the third time!",
    "Hi, just wondering when the new products will be in stock?",
    "UNSUBSCRIBE ME NOW. YOUR SPAM IS RIDICULOUS.",
    "Love the quality! Already ordered more for gifts.",
    "Can't login to my account. Reset password not working.",
]
```

---

### Cell 3: TODO - Sentiment Analysis

```python
# TODO: Classify sentiment of each ticket
# Identify which tickets need priority handling

# for ticket in tickets:
#     result = sentiment(ticket)[0]
#     priority = ???
#     print(f"{priority}: {ticket[:40]}... ({result['label']}: {result['score']:.2f})")
```

---

### Cell 4: Zero-Shot Classification

```python
categories = ["billing", "shipping", "account", "product_question", "feedback"]

for ticket in tickets:
    result = classifier(ticket, categories)
    top_category = result['labels'][0]
    confidence = result['scores'][0]
    print(f"{top_category} ({confidence:.2f}): {ticket[:40]}...")
```

---

### Cell 5: TODO - Question Answering

```python
# FAQ document
faq = """
Our return policy allows returns within 30 days of purchase. 
Refunds are processed within 5-7 business days.
Free shipping is available on orders over $50.
Customer support hours are 9am-5pm EST Monday through Friday.
"""

# TODO: Answer these questions from the FAQ
questions = [
    "How long do I have to return something?",
    "When can I reach customer support?",
    "Is there free shipping?"
]

# for q in questions:
#     answer = qa(question=q, context=faq)
#     print(f"Q: {q}")
#     print(f"A: {answer['answer']} (confidence: {answer['score']:.2f})")
#     print()
```

---

### Cell 6: Combine for Routing

```python
def route_ticket(ticket_text):
    """Full routing pipeline."""
    # 1. Get sentiment
    sent = sentiment(ticket_text)[0]
    
    # 2. Get category
    cat = classifier(ticket_text, categories)
    
    # 3. Determine priority
    priority = "HIGH" if (sent['label'] == 'NEGATIVE' and sent['score'] > 0.8) else "NORMAL"
    
    return {
        'category': cat['labels'][0],
        'sentiment': sent['label'],
        'priority': priority
    }

# Test
for ticket in tickets:
    result = route_ticket(ticket)
    print(f"{result['priority']} | {result['category']}: {ticket[:35]}...")
```

---

### Cell 7: Reflection

```python
# Answer:
# 1. Which tickets were hardest to classify correctly?
# 2. Did sentiment and category together help with prioritization?
# 3. What would you need to improve accuracy?
```
