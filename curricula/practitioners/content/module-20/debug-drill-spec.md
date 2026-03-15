# Debug Drill Spec: Module 20 - The Forgotten Order (Memory Overflow)

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/debug_drills/drill_20_memory_overflow.ipynb` |
| Solution | `notebooks/answer_keys/solution_20_memory_overflow.ipynb` |
| Runtime | ~20 minutes |
| Bug Type | Memory Overflow / Unbounded Conversation History |

## Scenario

A colleague built a support chatbot that handles long conversations, but users complain: "I told it my order number at the start, but now it's asking me again!" The agent's memory overflows when the conversation exceeds the token limit. The colleague's implementation simply drops the oldest messages, which removes critical information like order IDs that appeared early in the conversation.

## The Bug

```python
# Colleague's buggy code
class BrokenConversationMemory:
    """Memory that loses important info when context overflows."""
    
    def _enforce_limit(self):
        """BUG: Just removes oldest messages, no matter what they contain!"""
        total = sum(m.tokens for m in self.messages)
        while total > self.max_tokens and len(self.messages) > 1:
            removed = self.messages.pop(0)
            total -= removed.tokens
            # BUG: Doesn't check if removed message contains critical info!
    
    def get_order_id(self) -> Optional[str]:
        """Try to find order ID in remaining context."""
        context = self.get_context()
        match = re.search(r'ORD-\d+', context)
        return match.group() if match else None
```

### Why It's Wrong

The memory uses a simple sliding window: when the token limit is exceeded, it drops the oldest message. It never extracts or preserves important entities (order IDs, emails, amounts). Once the message containing "ORD-12345" is evicted, `get_order_id()` returns `None` and the agent has no way to recall it. The agent will incorrectly ask the user for information they already provided.

## Investigation Steps

1. **Understand why entities are lost** - The broken memory only uses a sliding window; it doesn't track important entities separately
2. **Implement entity extraction** - Extract order IDs, emails, amounts from each message as it's added
3. **Build entity-aware memory** - Store entities in a separate dict; prepend entity summary to context so it's always available

## The Fix

```python
# Fixed: Entity-aware memory
class EntityAwareMemory:
    """Memory that preserves critical entities."""
    
    def __init__(self, max_tokens: int = 100):
        self.messages: List[Message] = []
        self.max_tokens = max_tokens
        self.entities = {}  # Track extracted entities
    
    def _extract_entities(self, text: str):
        """Extract and save important entities."""
        orders = re.findall(r'ORD-\d+', text, re.IGNORECASE)
        for order in orders:
            self.entities['order_id'] = order.upper()
        emails = re.findall(r'[\w.-]+@[\w.-]+\.\w+', text)
        for email in emails:
            self.entities['email'] = email
        amounts = re.findall(r'\$[\d,]+\.?\d*', text)
        if amounts:
            self.entities['amount'] = amounts[-1]
    
    def get_context(self) -> str:
        """Get context with preserved entities."""
        entity_summary = ""
        if self.entities:
            entity_summary = "Key facts: " + ", ".join([f"{k}={v}" for k,v in self.entities.items()]) + "\n\n"
        messages = "\n".join([f"{m.role}: {m.content}" for m in self.messages])
        return entity_summary + messages
    
    def get_order_id(self) -> Optional[str]:
        """Get order ID from entity store."""
        return self.entities.get('order_id')
```

## Self-Checks

| Check | Assertion |
|-------|-----------|
| Order ID preserved after long conversation | `memory.get_order_id() == 'ORD-12345'` |
| Context includes entity summary | `'order_id' in memory.entities` |

## Postmortem Template

### What happened:
- Agent forgot order number in long conversations
- Users had to repeat information they'd already provided

### Root cause:
- Memory used naive sliding window; dropped oldest messages without preserving entities
- No separate storage for critical entities (order IDs, emails)

### How to prevent:
- Extract and store important entities when messages are added
- Prepend entity summary to context so it's always available
- Use entity-aware eviction or external memory for long conversations

## Learning Objectives

After completing this drill, learners will be able to:
1. Identify when unbounded conversation history causes critical info loss
2. Implement entity extraction and preservation in conversation memory
3. Build memory systems that keep key facts even when truncating messages
