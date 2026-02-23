# Agent Memory & Planning Cheatsheet

## Memory Types

| Type | Scope | Persistence | Use |
|------|-------|-------------|-----|
| Context window | Current call | None | Working memory |
| Conversation | Session | Session | Recent messages |
| Session state | Session | Session | Variables |
| Long-term | User | Persistent | Preferences, history |

---

## Context Management

```
Priority (high to low):
1. System prompt (fixed)
2. Current query (full)
3. Recent messages (full)
4. Retrieved context (relevant)
5. Summarized history (compressed)
```

---

## Strategies

| Strategy | When | Trade-off |
|----------|------|-----------|
| Sliding window | Simple | May lose important |
| Summarization | Long convos | Loses detail |
| Retrieval | Many topics | Needs indexing |
| Entity extraction | Structured data | Complex to build |

---

## Planning Pattern (ReAct)

```
Thought: [Reasoning about what to do]
Action: [Tool call]
Observation: [Result]
Thought: [Next step based on result]
...
Final: [Response to user]
```

---

## Common Failures

| Issue | Fix |
|-------|-----|
| Context overflow | Summarize, retrieve |
| Memory confusion | Isolate by user |
| Stale data | Add timestamps |
| Planning loops | Limit iterations |

---

## Business Translation

**Memory:** "AI remembers past conversations"

**Context limits:** "AI summarizes earlier parts to fit new info"

**Planning:** "AI breaks complex tasks into steps"
