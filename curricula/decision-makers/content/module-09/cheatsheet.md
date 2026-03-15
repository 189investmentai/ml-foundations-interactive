# Module 9 Cheat Sheet: NLP & Transformers

---

## Evolution of NLP

| Era | Approach | Limitation |
|-----|----------|------------|
| Keywords | Count word occurrences | Synonyms don't match |
| Word2Vec | Static word vectors | Context ignored |
| Transformers | Context-aware embeddings | Resource intensive |

---

## BERT vs GPT

| | BERT | GPT |
|---|------|-----|
| Direction | Bidirectional | Left-to-right |
| Best for | Understanding | Generation |
| Use cases | Classification, NER | Chatbots, writing |

---

## Quick Pipelines (Hugging Face)

```python
from transformers import pipeline

# Sentiment
classifier = pipeline("sentiment-analysis")
classifier("I love this!") # {'label': 'POSITIVE', 'score': 0.99}

# Zero-shot classification
classifier = pipeline("zero-shot-classification")
classifier("Can't login", candidate_labels=["billing", "account", "shipping"])

# NER
ner = pipeline("ner", grouped_entities=True)
ner("Tim Cook announced iPhone")

# QA
qa = pipeline("question-answering")
qa(question="What's the policy?", context="Returns within 30 days...")
```

---

## Task → Model Mapping

| Task | Approach |
|------|----------|
| Sentiment/Category | BERT classifier or zero-shot |
| Similar texts | Embeddings (Module 8) |
| Generate text | GPT / LLMs |
| Extract entities | NER pipeline |
| Q&A from docs | QA pipeline or RAG |

---

## Common Limits

| Limit | Typical | Implication |
|-------|---------|-------------|
| Token limit | 512 (BERT) | Long docs truncated |
| Inference time | 10-100ms | May need batching |
| Memory | 1-10GB | GPU recommended |

---

## Transformer Intuition

**Attention:** Each word looks at all other words to understand context.

```
"Apple released new products"
       ↑
   "Apple" attends to "released" and "products"
   → Understands it's the company, not fruit
```
