# Debug Drill Spec: Module 17 - The Forgotten Context (Context Window)

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/debug_drills/drill_17_context_window.ipynb` |
| Solution | `notebooks/answer_keys/solution_17_context_window.ipynb` |
| Runtime | ~20 minutes |
| Bug Type | Context Window / Truncation |

## Scenario

A colleague built a support chatbot that gives inconsistent answers. Users complain: "I told it my order number at the start, but then it asked me for it again!" The bot seems to "forget" information from earlier in the conversation. Long conversations cause the model to lose critical context—order numbers, emails, and issue details—because the colleague used naive truncation when the conversation exceeds the context window.

## The Bug

```python
# Colleague's buggy code
def naive_chat(messages, max_tokens=MAX_CONTEXT_TOKENS):
    """Naive approach: just truncate from the beginning."""
    formatted = format_conversation(messages)
    total_tokens = count_tokens(formatted)
    
    # Simple truncation: drop early messages
    while count_tokens(format_conversation(messages)) > max_tokens and len(messages) > 2:
        messages = messages[1:]  # Drop oldest message
    
    return messages
```

### Why It's Wrong

The naive approach drops the oldest messages first when the context overflows. This loses critical information that often appears early in support conversations: order numbers, customer emails, and the original issue description. The model has no way to retain these facts—they're simply discarded. When the user later asks "When will my replacement arrive?", the bot no longer has the order ID in context and incorrectly asks for it again.

## Investigation Steps

1. **Understand context window limitations** - Transformers have a fixed context window; when conversation exceeds it, something must be dropped
2. **Implement smart context management** - Extract key facts (order IDs, emails, issues) from the full conversation before truncation
3. **Build context with preserved facts** - Add extracted facts to a system message, then fill remaining space with recent messages

## The Fix

```python
# Fixed: Extract key facts and preserve in system context
def extract_key_facts(messages):
    """Extract important facts that should never be forgotten."""
    facts = {}
    for msg in messages:
        content = msg['content']
        order_match = re.search(r'ORD-\d+', content)
        if order_match:
            facts['order_id'] = order_match.group()
        email_match = re.search(r'[\w.-]+@[\w.-]+\.\w+', content)
        if email_match:
            facts['email'] = email_match.group()
        if 'damaged' in content.lower():
            facts['issue'] = 'damaged item'
        if 'replacement' in content.lower():
            facts['resolution'] = 'replacement requested'
    return facts

def smart_context(messages, facts, max_tokens=MAX_CONTEXT_TOKENS):
    """Build context that preserves key facts."""
    facts_summary = "Key facts from this conversation:\n"
    for key, value in facts.items():
        facts_summary += f"- {key}: {value}\n"
    system_msg = {"role": "system", "content": facts_summary}
    system_tokens = count_tokens(facts_summary)
    remaining_tokens = max_tokens - system_tokens
    recent_messages = []
    for msg in reversed(messages):
        msg_tokens = count_tokens(msg['content'])
        if msg_tokens <= remaining_tokens:
            recent_messages.insert(0, msg)
            remaining_tokens -= msg_tokens
        else:
            break
    return [system_msg] + recent_messages
```

## Self-Checks

| Check | Assertion |
|-------|-----------|
| Order ID extracted | `'order_id' in facts` and `facts['order_id'] == 'ORD-12345'` |
| Smart context preserves order | `'ORD-12345' in ' '.join([m['content'] for m in smart])` |

## Postmortem Template

### What happened:
- Users reported the bot asked for order numbers they had already provided
- Bot "forgot" early context in long conversations

### Root cause:
- Naive truncation dropped oldest messages when context exceeded limit
- Order numbers and other key facts were in early messages and got lost

### How to prevent:
- Extract and preserve key facts (order IDs, emails, issues) before truncation
- Add facts to system prompt so they're always in context
- Use sliding window with summary or external memory for long conversations

## Learning Objectives

After completing this drill, learners will be able to:
1. Explain why transformers "forget" early conversation context
2. Implement fact extraction and preservation for context management
3. Build smart context that keeps critical entities even when truncating
