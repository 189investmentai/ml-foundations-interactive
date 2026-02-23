# Module 19: Agent Memory & Planning

**Time:** 35-45 minutes

**Promise:** After this module, you'll understand how to give agents persistent memory, manage context windows, and implement planning for complex tasks.

---

## The Setup

A stateless chatbot forgets everything between messages. Users hate repeating themselves.

An **agent with memory** can:
- Remember past interactions
- Maintain context across sessions
- Plan multi-step tasks
- Learn user preferences

---

## The Mental Models

### 1. The Working Memory vs Long-Term Memory

Just like humans:
- **Working memory** (context window): What's currently "in mind"
- **Short-term memory**: Recent conversation history
- **Long-term memory**: Persistent storage (databases, embeddings)

### 2. The Filing Cabinet

Memory isn't just storage — it's organized retrieval:
- Some memories are "on the desk" (in context)
- Others are "filed away" but retrievable
- The skill is knowing what to retrieve when

### 3. The GPS Navigator

Planning is like navigation:
- Current location (state)
- Destination (goal)
- Turn-by-turn directions (plan)
- Recalculating when things change

---

## Types of Agent Memory

### 1. Context Window (Working Memory)

The text the model sees right now.

```
System prompt
+ Recent messages
+ Tool results
+ Retrieved context
= Total context
```

**Constraint:** Fixed size (8K, 32K, 128K tokens).

### 2. Conversation History

Full history of messages, potentially truncated for context.

```python
conversation = [
    {"role": "user", "content": "My order is ORD-12345"},
    {"role": "assistant", "content": "I see your order..."},
    {"role": "user", "content": "When will it arrive?"},
    # Agent remembers the order ID from earlier
]
```

### 3. Session Memory

Variables persisted within a session.

```python
session_state = {
    "user_id": "user_123",
    "current_order": "ORD-12345",
    "preferences": {"language": "en", "notifications": True},
    "conversation_summary": "User asking about order status"
}
```

### 4. Long-Term Memory (Persistent)

Stored across sessions:
- User profile and preferences
- Past interactions (embeddings)
- Learned facts about the user

---

## Managing Context Windows

### The Problem

Context is limited. You can't fit everything.

### Strategies

#### 1. Sliding Window

Keep most recent N messages:

```python
def sliding_window(messages, max_tokens=4000):
    total = 0
    kept = []
    for msg in reversed(messages):
        tokens = count_tokens(msg)
        if total + tokens > max_tokens:
            break
        kept.insert(0, msg)
        total += tokens
    return kept
```

#### 2. Summarization

Compress old context:

```python
def summarize_history(messages):
    old_messages = messages[:-5]  # Keep last 5
    recent_messages = messages[-5:]
    
    summary = llm_summarize(old_messages)
    
    return [
        {"role": "system", "content": f"Previous context: {summary}"},
        *recent_messages
    ]
```

#### 3. Selective Retrieval

Only include relevant history:

```python
def retrieve_relevant(query, history, k=3):
    # Embed all messages
    embeddings = embed(history)
    query_embedding = embed(query)
    
    # Find most relevant
    similarities = cosine_similarity(query_embedding, embeddings)
    top_k_idx = similarities.argsort()[-k:]
    
    return [history[i] for i in top_k_idx]
```

---

## Planning: Multi-Step Tasks

### Why Planning Matters

Simple query: "What's the weather?" → One tool call.

Complex task: "Plan a trip to Paris including flights, hotels, and restaurants" → Multiple steps, dependencies, decisions.

### ReAct Pattern

**Re**asoning + **Act**ing in alternation:

```
Thought: I need to find flights first, then hotels
Action: search_flights(destination="Paris", dates="March 15-20")
Observation: Found 5 flights...

Thought: Good options. Now I need hotels near the city center
Action: search_hotels(city="Paris", checkin="March 15", checkout="March 20")
Observation: Found 12 hotels...

Thought: I have enough info to present options
Action: respond_to_user(summary=...)
```

### Planning with Subgoals

Break complex goals into steps:

```python
def plan_task(goal: str) -> list:
    """Generate a plan for a complex task."""
    prompt = f"""
    Goal: {goal}
    
    Break this into 3-5 concrete steps. For each step, specify:
    1. What action to take
    2. What information is needed
    3. What the expected output is
    
    Return as JSON: [{{"step": 1, "action": "...", "needs": "...", "output": "..."}}]
    """
    return llm_call(prompt)

# Example
plan = plan_task("Help user book a trip to Paris")
# Returns:
# [
#   {"step": 1, "action": "Ask for travel dates", ...},
#   {"step": 2, "action": "Search flights", ...},
#   {"step": 3, "action": "Search hotels", ...},
#   {"step": 4, "action": "Present options", ...}
# ]
```

---

## Memory Implementation Patterns

### Pattern 1: Entity Memory

Track entities mentioned in conversation:

```python
entity_memory = {
    "orders": {
        "ORD-12345": {
            "first_mentioned": "msg_3",
            "status": "shipped",
            "last_discussed": "msg_7"
        }
    },
    "people": {
        "John": {"relationship": "customer's friend"}
    }
}

def extract_entities(message):
    """Extract entities from a message."""
    # Use NER or pattern matching
    orders = re.findall(r'ORD-\d+', message)
    return {"orders": orders, ...}

def update_memory(message, memory):
    entities = extract_entities(message)
    for order_id in entities.get("orders", []):
        if order_id not in memory["orders"]:
            memory["orders"][order_id] = {"first_mentioned": "now"}
```

### Pattern 2: Summary Memory

Maintain a rolling summary:

```python
class SummaryMemory:
    def __init__(self):
        self.summary = ""
        self.recent_messages = []
    
    def add(self, message):
        self.recent_messages.append(message)
        
        # Summarize when we have too many messages
        if len(self.recent_messages) > 10:
            new_summary = summarize(
                f"Previous summary: {self.summary}\n"
                f"New messages: {self.recent_messages[:5]}"
            )
            self.summary = new_summary
            self.recent_messages = self.recent_messages[5:]
    
    def get_context(self):
        return f"Summary: {self.summary}\nRecent: {self.recent_messages}"
```

### Pattern 3: Vector Memory

Store and retrieve by semantic similarity:

```python
class VectorMemory:
    def __init__(self):
        self.embeddings = []
        self.messages = []
    
    def add(self, message):
        embedding = embed(message)
        self.embeddings.append(embedding)
        self.messages.append(message)
    
    def retrieve(self, query, k=5):
        query_emb = embed(query)
        similarities = [cosine_sim(query_emb, e) for e in self.embeddings]
        top_k = sorted(range(len(similarities)), 
                       key=lambda i: similarities[i], 
                       reverse=True)[:k]
        return [self.messages[i] for i in top_k]
```

---

## Failure Modes

### 1. Context Overflow

**Symptom:** Important information gets pushed out.

**Fix:**
- Implement smart truncation (keep important items)
- Summarize instead of truncate
- Use retrieval for long histories

### 2. Memory Confusion

**Symptom:** Agent mixes up information from different users/sessions.

**Fix:**
- Isolate memory by session/user
- Clear entity references when ambiguous
- Ask for clarification

### 3. Stale Memory

**Symptom:** Agent uses outdated information.

**Fix:**
- Add timestamps to memories
- Refresh from source before using
- Mark volatile information

### 4. Planning Loops

**Symptom:** Agent keeps planning without executing.

**Fix:**
- Limit planning iterations
- Require concrete action after each thought
- Detect repetitive plans

---

## Business Translation

### Explaining Memory

**Don't say:** "The agent uses a vector database for long-term memory with semantic retrieval."

**Do say:** "The AI remembers what you've told it before, so you don't have to repeat yourself. It can recall relevant past conversations when needed."

### Explaining Context Limits

**Don't say:** "We hit the context window limit."

**Do say:** "There's a limit to how much the AI can keep in mind at once. For longer conversations, it summarizes earlier parts to make room for new information."

### Explaining Planning

**Don't say:** "The agent uses the ReAct framework with subgoal decomposition."

**Do say:** "For complex requests, the AI breaks the task into steps and works through them one by one, like following a checklist."

---

## Practice

### Before the Lab

Open the **Interactive Playground** (`playground_agent_memory.html`):

1. See how memory persists across messages
2. Watch context window fill up
3. Observe summarization in action
4. Try planning for complex tasks

### Key Observations

- Memory makes interactions feel natural
- Context limits require smart management
- Planning helps with complex tasks
- Different memory types serve different needs

---

## Quick Reference

### Memory Types

| Type | Scope | Size | Use |
|------|-------|------|-----|
| Context window | Current call | Fixed | Working memory |
| Conversation | Session | Growing | Recent history |
| Session state | Session | Variable | Key-value state |
| Long-term | Persistent | Large | Cross-session |

### Context Management

```python
context = [
    system_prompt,           # Fixed
    *summarized_history,     # Compressed
    *retrieved_relevant,     # Dynamic
    *recent_messages,        # Full detail
    current_query            # Current
]
```

### Planning Checklist

- [ ] Break task into steps
- [ ] Identify dependencies
- [ ] Execute step by step
- [ ] Handle failures
- [ ] Limit iterations

---

## Done Checklist

- [ ] Understood memory types
- [ ] Explored the playground
- [ ] Know how to manage context windows
- [ ] Understood planning patterns
- [ ] Completed the notebook lab
- [ ] Passed the quiz
