# Module 10 Cheat Sheet: LLMs in Production

---

## Prompting vs RAG vs Fine-Tuning

| Approach | Use When | Effort |
|----------|----------|--------|
| **Prompting** | General tasks with good examples | Low |
| **RAG** | Need company-specific knowledge | Medium |
| **Fine-tuning** | Need consistent style/format | High |

---

## Prompting Best Practices

```python
system_prompt = """
You are [ROLE] at [COMPANY].
Your task is to [SPECIFIC TASK].

Rules:
- [CONSTRAINT 1]
- [CONSTRAINT 2]

Examples:
Input: [EXAMPLE]
Output: [EXAMPLE]
"""
```

**Key techniques:**
- Be specific and constrain outputs
- Give 2-3 examples (few-shot)
- Ask for step-by-step reasoning
- Set temperature=0 for consistency

---

## RAG Pipeline

```
Question → Embed → Search docs → Add to prompt → LLM answers
```

```python
# Simplified RAG
context = search_documents(question, k=3)
prompt = f"Answer using ONLY this context:\n{context}\n\nQ: {question}"
response = llm.generate(prompt)
```

---

## Reducing Hallucinations

| Technique | How |
|-----------|-----|
| RAG | Ground in your documents |
| temperature=0 | Less creative, more factual |
| Ask for citations | "Quote the text you used" |
| Constrain | "Only use provided context" |
| Verify | Check against database |

---

## Agent Basics

```
User request
    │
    ▼
LLM decides → Tool call → Result → LLM responds
    ▲                        │
    └────────────────────────┘
         (can loop)
```

**Use agents when:** Multi-step, dynamic info needed, actions required

**Mitigations:** Human approval, rate limits, logging

---

## Cost/Latency Considerations

| Model | Speed | Cost | Use for |
|-------|-------|------|---------|
| GPT-4 | Slow | $$$ | Complex reasoning |
| GPT-3.5 | Fast | $ | Simple tasks |
| Claude Haiku | Fast | $ | High volume |

**Tips:**
- Cache common queries
- Use small models for simple tasks
- Batch requests when possible
