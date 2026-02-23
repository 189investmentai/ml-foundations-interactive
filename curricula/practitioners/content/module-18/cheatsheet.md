# Tool Calling Cheatsheet

## Core Flow

```
User Query → LLM → Tool Selection → Execute → Result → LLM → Response
```

---

## Tool Schema

```json
{
    "name": "get_order",
    "description": "Look up order status by ID",
    "parameters": {
        "type": "object",
        "properties": {
            "order_id": {"type": "string"}
        },
        "required": ["order_id"]
    }
}
```

---

## Design Principles

| Principle | Do | Don't |
|-----------|-----|-------|
| Descriptions | Clear, specific | Vague ("get data") |
| Parameters | Typed, constrained | Free-form strings |
| Scope | Single responsibility | Multi-purpose |
| Defaults | Safe values | Unlimited |

---

## Common Tool Types

| Type | Example | Use |
|------|---------|-----|
| Retrieval | `search_kb()` | Find information |
| Lookup | `get_order()` | Specific record |
| Action | `send_email()` | Side effects |
| Calculate | `calc_shipping()` | Computation |

---

## Security Checklist

- [ ] Validate tool names
- [ ] Validate parameters
- [ ] Sanitize inputs
- [ ] Confirm destructive actions
- [ ] Rate limit
- [ ] Log calls

---

## Failure Modes

| Issue | Fix |
|-------|-----|
| Tool hallucination | Validate against allowlist |
| Param hallucination | Validate before execute |
| Infinite loops | Set max calls |
| Injection | Sanitize + confirm |

---

## Business Translation

**Tool calling:** "AI can look things up and take actions in our systems"

**Validation:** "We verify everything before acting"

**Confirmation:** "Important actions need your approval"
