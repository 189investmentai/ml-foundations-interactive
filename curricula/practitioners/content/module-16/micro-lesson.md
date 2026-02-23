# Module 16: Transformers - The Architecture Behind Modern AI

**Time:** 35-45 minutes

**Promise:** After this module, you'll understand how transformers work, why they revolutionized AI, and how attention enables models to understand context.

---

## The Setup

Before 2017, processing text meant reading word by word, in order. Models forgot the beginning by the time they reached the end.

Then came the transformer: "Attention Is All You Need."

Now the same architecture powers:
- GPT (text generation)
- BERT (understanding)
- DALL-E (images)
- Whisper (speech)

---

## The Mental Models

### 1. The Spotlight Analogy

Attention is like a spotlight on a stage:
- Traditional: Scan everything in order, dim memory of what came before
- Attention: Shine a spotlight on the most relevant parts, all at once

For "The bank by the river had many fish":
- When processing "fish", attention shines on "river" (not "bank")
- Word meaning depends on context

### 2. The Party Conversation

At a party with 20 people talking:
- Traditional RNN: Listen to one person at a time, forget earlier conversations
- Transformer: Hear everyone at once, focus on whoever is most relevant to your current question

### 3. The Lookup Table

Self-attention is like looking up related words:
- Each word asks: "Who in this sentence is relevant to understanding me?"
- Then aggregates information from relevant words
- Creates context-aware representations

---

## Why Transformers Changed Everything

### Before Transformers: RNNs

**Recurrent Neural Networks** processed sequences one step at a time:

```
Input:  The  →  cat  →  sat  →  on  →  the  →  mat
State:  h₁  →  h₂   →  h₃  →  h₄  →  h₅   →  h₆
```

**Problems:**
1. **Sequential:** Can't parallelize
2. **Vanishing gradients:** Forgets long-range context
3. **Slow:** Must process in order

### After Transformers: Attention

**Transformers** process all positions simultaneously:

```
Input:  [The, cat, sat, on, the, mat]
              ↓ All at once ↓
Output: [The*, cat*, sat*, on*, the*, mat*]
        (each enriched with context)
```

**Benefits:**
1. **Parallel:** Train much faster on GPUs
2. **Long-range:** Attend to any position equally
3. **Scalable:** Stack layers for more power

---

## The Attention Mechanism

### Self-Attention in Plain English

For each word, attention answers:
1. **Query (Q):** "What am I looking for?"
2. **Key (K):** "What do I have to offer?"
3. **Value (V):** "What information do I contain?"

The algorithm:
1. Each word compares its Query to all Keys
2. Similar Q-K pairs get high attention scores
3. Each word aggregates Values, weighted by attention

### The Math (Simplified)

```
Attention(Q, K, V) = softmax(QKᵀ / √d) × V
```

- `QKᵀ`: How much each query matches each key
- `√d`: Scaling factor (prevents extreme values)
- `softmax`: Converts to probabilities (sum to 1)
- `× V`: Weighted sum of values

### Multi-Head Attention

Instead of one attention pattern, use multiple "heads":

```
Head 1: Focuses on syntax (subject-verb relationships)
Head 2: Focuses on semantics (meaning relationships)
Head 3: Focuses on coreference (pronouns to nouns)
...
```

Each head learns different patterns. Outputs are combined.

---

## Transformer Architecture

### The Full Picture

```
Input Tokens
     ↓
Embedding + Positional Encoding
     ↓
┌─────────────────────────┐
│ Multi-Head Self-Attention│ ×N layers
│     + Add & Normalize    │
│ Feed-Forward Network     │
│     + Add & Normalize    │
└─────────────────────────┘
     ↓
Output
```

### Key Components

| Component | Purpose |
|-----------|---------|
| **Embedding** | Convert tokens to vectors |
| **Positional Encoding** | Add position information |
| **Self-Attention** | Relate tokens to each other |
| **Feed-Forward** | Transform representations |
| **Layer Norm** | Stabilize training |
| **Residual Connections** | Help gradients flow |

### Encoder vs Decoder

| Type | Examples | Use |
|------|----------|-----|
| **Encoder-only** | BERT | Understanding, classification |
| **Decoder-only** | GPT | Generation |
| **Encoder-Decoder** | T5, BART | Translation, summarization |

---

## Tokenization

Transformers don't see words — they see **tokens**.

### Subword Tokenization (BPE)

```
"unhappiness" → ["un", "happiness"] or ["un", "happ", "iness"]
```

**Why subwords?**
- Fixed vocabulary size
- Handle unknown words
- Balance between characters and words

### Token Limits

Every model has a **context window**:

| Model | Context Window |
|-------|----------------|
| GPT-3.5 | 4K tokens (~3,000 words) |
| GPT-4 | 8K-128K tokens |
| Claude | 100K-200K tokens |

**What happens at the limit?**
- Old context gets truncated
- Model "forgets" early information
- Solutions: summarization, retrieval

---

## Training Objectives

### Masked Language Modeling (BERT)

```
Input:  "The [MASK] sat on the mat"
Output: Predict "cat"
```

Learns to understand context in both directions.

### Causal Language Modeling (GPT)

```
Input:  "The cat sat on"
Output: Predict "the"
```

Learns to predict next token (one direction only).

### Key Differences

| Aspect | BERT | GPT |
|--------|------|-----|
| Direction | Bidirectional | Left-to-right |
| Training | Masked prediction | Next token |
| Use | Understanding | Generation |

---

## Attention Patterns in Practice

### What Attention Learns

Attention heads specialize:
- **Syntactic:** Subject → Verb, Noun → Adjective
- **Positional:** Previous token, Next token
- **Semantic:** Entity → Related entities
- **Coreference:** Pronoun → Antecedent

### Visualizing Attention

```
"The cat, which was hungry, ate the food"

Processing "ate":
  cat     ████████░░  (high attention - subject)
  which   ██░░░░░░░░  (low)
  hungry  ████░░░░░░  (medium - state)
  food    ██████░░░░  (high - object)
```

---

## Failure Modes

### 1. Context Window Limits

**Symptom:** Model ignores early parts of long documents.

**The Problem:** Attention is O(n²) in sequence length.

**Fix:** Chunking, retrieval augmentation, or longer-context models.

### 2. Attention Collapse

**Symptom:** Model attends to same tokens regardless of input.

**The Problem:** Attention patterns become degenerate.

**Fix:** Usually a training issue; use pre-trained models.

### 3. Position Sensitivity

**Symptom:** Same content in different positions gives different results.

**The Problem:** Models learn positional biases.

**Example:** "Lost in the middle" — LLMs pay more attention to start and end.

---

## Business Translation

### Explaining Transformers

**Don't say:** "We use a transformer with multi-head self-attention."

**Do say:** "The model reads the entire document at once and figures out which parts are most relevant to understanding each word. Like having perfect memory of everything you've read."

### Explaining Context Windows

**Don't say:** "The model has a 4096 token context limit."

**Do say:** "The model can 'remember' about 3,000 words at a time. For longer documents, we need to split them up or use summarization."

### Explaining Attention

**Don't say:** "Attention scores determine query-key similarity."

**Do say:** "When processing a word like 'it', the model looks at all other words to figure out what 'it' refers to. It learns these patterns from millions of examples."

---

## Practice

### Before the Lab

Open the **Interactive Playground** (`playground_attention.html`):

1. Enter a sentence and see attention patterns
2. Watch which words attend to which
3. See how context changes word meaning
4. Explore different attention heads

### Key Observations

- Attention patterns reveal what the model "thinks" is related
- Different heads capture different relationships
- Context window limits are real constraints
- Position matters, even with attention

---

## Quick Reference

### Model Selection

| Task | Model Type | Examples |
|------|------------|----------|
| Classification | Encoder | BERT, RoBERTa |
| Generation | Decoder | GPT, LLaMA |
| Translation | Enc-Dec | T5, mBART |
| General | Any | Based on task |

### Context Window Guide

| Scenario | Strategy |
|----------|----------|
| Short text (<4K) | Direct input |
| Long document | Chunk + summarize |
| Multiple docs | Retrieval + top-K |
| Very long | Use long-context model |

### Attention Intuition

| When processing... | Attend to... |
|--------------------|--------------|
| Pronouns | Nouns they refer to |
| Verbs | Subject and object |
| Adjectives | Nouns they modify |
| Technical terms | Definitions/context |

---

## Done Checklist

- [ ] Understood attention mechanism
- [ ] Explored attention patterns in the playground
- [ ] Understood encoder vs decoder
- [ ] Grasped context window implications
- [ ] Completed the notebook lab
- [ ] Passed the quiz
