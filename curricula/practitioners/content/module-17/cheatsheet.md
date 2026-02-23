# LLM Fundamentals Cheatsheet

## Prompting Styles

| Style | When | Example |
|-------|------|---------|
| Zero-shot | Simple, clear tasks | "Classify as A/B/C:" |
| Few-shot | Format matters | Include 2-3 examples |
| Chain-of-thought | Reasoning needed | "Think step by step:" |

---

## Prompt Template

```
ROLE: [persona]
CONTEXT: [background]
TASK: [instruction]
FORMAT: [output structure]
CONSTRAINTS: [limitations]
EXAMPLES: [input/output pairs]
INPUT: [actual input]
```

---

## RAG vs Fine-Tuning

| Use RAG for | Use Fine-Tuning for |
|-------------|---------------------|
| Facts, policies | Style, tone |
| Current info | Domain behavior |
| Customer data | Format consistency |

---

## Evaluation Methods

| Method | Speed | Quality |
|--------|-------|---------|
| Human eval | Slow | High |
| LLM-as-judge | Medium | Medium |
| Auto metrics | Fast | Variable |

---

## Common Failures

| Issue | Fix |
|-------|-----|
| Hallucination | RAG + "use only provided info" |
| Wrong format | Few-shot examples |
| Prompt injection | Separate system/user, validate |
| Refusal | More context, rephrase |

---

## Key Metrics

| Metric | Measures |
|--------|----------|
| Faithfulness | Uses context correctly |
| Relevance | Answers the question |
| Fluency | Reads naturally |
| Accuracy | Factually correct |

---

## Business Translation

**Prompting:** "Clear instructions + examples"

**RAG:** "AI looks up info before answering"

**Hallucination:** "AI making things up confidently"
