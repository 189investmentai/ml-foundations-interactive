# Guardrails Cheatsheet

## Guardrail Layers

| Layer | When | What |
|-------|------|------|
| Input | Before LLM | Validate, sanitize |
| Behavior | During | Limits, allowlists |
| Output | After LLM | Filter, verify |
| Human | Edge cases | Review queue |

---

## Input Checks

```python
# Length
if len(input) > MAX_LENGTH: reject

# Injection patterns
if re.search(r'ignore.*instruction', input): flag

# PII
if contains_pii(input): handle_carefully
```

---

## Output Checks

```python
# Hallucination
if not grounded_in_context(response): reject

# Safety
if is_harmful(response): filter

# Format
if not valid_format(response): retry
```

---

## Safety Patterns

| Pattern | Use |
|---------|-----|
| Allowlist | Only permit known tools |
| Confirmation | User approves risky actions |
| Rate limit | Prevent abuse |
| Circuit breaker | Stop on errors |

---

## Evaluation Metrics

| Metric | Measures |
|--------|----------|
| Faithfulness | Uses context only |
| Relevance | Answers question |
| Safety | No harm |
| Accuracy | Correct facts |

---

## Business Translation

**Guardrails:** "Safety checks at every step"

**Hallucination:** "AI making things up - we verify"

**Human review:** "Complex cases get human eyes"
