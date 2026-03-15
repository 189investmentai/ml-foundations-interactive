# Transformers Cheatsheet

## Core Idea

Transformers use **attention** to process all positions in parallel, learning which parts of the input are most relevant to each other.

---

## Attention Formula

```
Attention(Q, K, V) = softmax(QKᵀ / √d) × V
```

- Q: What am I looking for?
- K: What do I offer?
- V: What information do I contain?

---

## Model Types

| Type | Direction | Use | Examples |
|------|-----------|-----|----------|
| Encoder | Bidirectional | Understanding | BERT, RoBERTa |
| Decoder | Left-to-right | Generation | GPT, LLaMA |
| Enc-Dec | Both | Translation | T5, BART |

---

## Context Windows

| Model | Tokens | ~Words |
|-------|--------|--------|
| GPT-3.5 | 4K | 3,000 |
| GPT-4 | 8K-128K | 6K-96K |
| Claude | 100K-200K | 75K-150K |

---

## Key Components

| Component | Purpose |
|-----------|---------|
| Embedding | Tokens → Vectors |
| Positional Encoding | Add position info |
| Self-Attention | Relate tokens |
| Feed-Forward | Transform |
| Layer Norm | Stabilize |

---

## Training Objectives

| Method | Task | Direction |
|--------|------|-----------|
| MLM (BERT) | Predict [MASK] | Bidirectional |
| CLM (GPT) | Predict next | Left-to-right |

---

## Long Document Strategies

| Length | Strategy |
|--------|----------|
| <4K tokens | Direct input |
| 4K-100K | Chunk + summarize |
| Very long | Retrieval + top-K |

---

## Business Translation

**Attention:** "Model figures out which parts are relevant to each word"

**Context window:** "How much text the model can 'remember' at once"

**Transformer:** "Architecture that reads everything at once with perfect memory"
