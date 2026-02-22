# Cheat Sheet: Transformers & LLMs

## What Makes Transformers Special

**Attention:** The model learns which words to focus on for each task.

```
"The customer was frustrated because the package never arrived"
                    ↑ attention ↑           ↑ attention ↑
```

## Using Pre-trained Models

```python
from transformers import pipeline

# Sentiment analysis
sentiment = pipeline("sentiment-analysis")
result = sentiment("I love your service!")
# {'label': 'POSITIVE', 'score': 0.99}

# Text classification
classifier = pipeline("zero-shot-classification")
result = classifier("I want a refund", ["billing", "shipping", "account"])
```

## LLM Decision Framework

| Need | Solution | When |
|---|---|---|
| General task | Prompting | Quick, no training data |
| Domain knowledge | RAG | Have docs, need accuracy |
| Specific behavior | Fine-tuning | Have labeled examples |

## Prompting Best Practices

```python
prompt = """
You are a customer support classifier.

Classify this ticket into one category: billing, shipping, account, product.

Ticket: "{ticket_text}"

Category:
"""
```

**Tips:**
- Be specific about the task
- Give examples (few-shot)
- Specify output format
- Set constraints

## RAG (Retrieval-Augmented Generation)

```
1. User asks question
2. Search knowledge base for relevant docs
3. Add docs to prompt as context
4. LLM generates answer grounded in docs
```

```python
# Pseudocode
relevant_docs = search_knowledge_base(user_question)
prompt = f"""
Context: {relevant_docs}

Question: {user_question}

Answer based only on the context above:
"""
response = llm(prompt)
```

## Hallucination Red Flags

| Sign | Example |
|---|---|
| Confident specifics | "90 days" when policy is 30 |
| Added information | Bitcoin support (doesn't exist) |
| Plausible but wrong | Made-up product names |

## Hallucination Prevention

1. **Ground in knowledge base** (RAG)
2. **Verify against facts** (fact-checking)
3. **Request citations** ("cite your source")
4. **Confidence thresholds** (reject low confidence)
5. **Human in the loop** (escalate uncertain cases)

## Cost Considerations

| Model | Cost | Speed | Quality |
|---|---|---|---|
| GPT-4 | $$$ | Slow | Best |
| GPT-3.5 | $ | Fast | Good |
| Open source (Llama) | Free | Varies | Good |
| Fine-tuned small | $ | Fast | Task-specific |

## When NOT to Use LLMs

- Structured data problems (use ML)
- Simple classification (use traditional models)
- Latency-critical applications
- When you need deterministic outputs
- Cost-sensitive high-volume tasks

## Quick Evaluation

```python
# For classification tasks
from sklearn.metrics import classification_report

# Test on held-out examples
predictions = [classify(text) for text in test_texts]
print(classification_report(test_labels, predictions))
```

## Key Insight

LLMs are powerful but:
- Can hallucinate
- Are expensive at scale
- Need grounding for accuracy

**Start with prompting, add RAG if needed, fine-tune as last resort.**
