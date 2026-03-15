# Module 10: Working with LLMs

**Time:** 60-90 minutes  
**Prerequisites:** Module 9 (NLP)

---

## The Setup

Large Language Models changed everything. GPT-4, Claude, Gemini-they can write, reason, code, and hold conversations. But they can also confidently make things up, miss obvious context, and fail in unexpected ways.

This module isn't about how LLMs work internally. It's about how to use them effectively: when to prompt vs. fine-tune, how to reduce hallucinations with RAG, and when to reach for agents.

**The question we're answering:** How do we build reliable systems on top of models that sometimes lie?

---

## The Mental Model

### LLMs Are Powerful But Unreliable

Think of an LLM as a brilliant but overconfident colleague. They:
- Know a lot about general topics
- Can synthesize information quickly
- Will confidently bullshit if they don't know something
- Need guardrails for production use

### The Reliability Spectrum

```
MORE RELIABLE ◄────────────────────────► LESS RELIABLE

┌─────────────────────────────────────────────────────┐
│  Formatting      Classification      Open-ended    │
│  text            with examples       reasoning     │
│                                                    │
│  "Convert this   "Is this ticket    "What should  │
│   to JSON"       about billing       we do about  │
│                  or shipping?"       this?"       │
│                                                    │
│  ✓ Easy to       ✓ Works well       ✗ Needs       │
│    verify        with good          careful       │
│                  prompts            verification  │
└─────────────────────────────────────────────────────┘
```

---

## Prompting: Getting What You Want

### Basic Prompting

```python
response = client.chat.completions.create(
    model="gpt-4",
    messages=[
        {"role": "user", "content": "Summarize this support ticket: ..."}
    ]
)
```

### Better Prompting: Add Context and Examples

```python
system_prompt = """You are a support ticket classifier for StreamCart, 
an e-commerce subscription company. Classify tickets into: billing, 
shipping, account, product_issue, or other.

Examples:
- "I was charged twice" → billing
- "Package never arrived" → shipping
- "Can't reset password" → account

Respond with only the category name."""

messages = [
    {"role": "system", "content": system_prompt},
    {"role": "user", "content": f"Classify: {ticket_text}"}
]
```

### Prompting Best Practices

| Technique | Example |
|-----------|---------|
| **Be specific** | "Respond with only JSON" not "Give me structured output" |
| **Give examples** | Show 2-3 input/output pairs |
| **Set constraints** | "Maximum 2 sentences" or "Only use these categories" |
| **Ask for reasoning** | "Think step by step before answering" |
| **Define the persona** | "You are a senior support agent..." |

---

## RAG: Grounding in Your Data

**RAG = Retrieval-Augmented Generation**

Instead of hoping the LLM knows your products/policies, give it the relevant information.

### The RAG Pipeline

```
User Question
     │
     ▼
┌─────────────────┐
│ 1. Embed query  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌───────────────┐
│ 2. Search your  │────►│ Your Knowledge│
│    documents    │     │ Base (vectors)│
└────────┬────────┘     └───────────────┘
         │
         ▼
┌─────────────────┐
│ 3. Add relevant │
│    context to   │
│    prompt       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ 4. LLM generates│
│    answer       │
└────────┬────────┘
         │
         ▼
    Answer (grounded in your data)
```

### RAG Implementation

```python
# 1. Embed the question
question = "What's the return policy for opened items?"
question_embedding = embed_model.encode([question])

# 2. Find relevant documents
indices = vector_index.search(question_embedding, k=3)
relevant_docs = [documents[i] for i in indices]

# 3. Build prompt with context
context = "\n\n".join(relevant_docs)
prompt = f"""Answer based ONLY on the following context:

{context}

Question: {question}

If the answer isn't in the context, say "I don't have information about that."
"""

# 4. Generate answer
response = llm.generate(prompt)
```

### Why RAG Works

| Without RAG | With RAG |
|-------------|----------|
| LLM invents a return policy | LLM quotes your actual policy |
| No source for verification | Can link to source document |
| May be outdated | Updated when documents change |
| Generic answers | Company-specific answers |

---

## Hallucinations: When LLMs Lie

### What Are Hallucinations?

The model confidently states false information as if it were true.

**Example:**
> User: "What's StreamCart's refund policy for subscription boxes?"
> LLM: "StreamCart offers a 60-day no-questions-asked refund policy on all subscription boxes."

This sounds plausible but might be completely made up.

### Reducing Hallucinations

| Technique | How it helps |
|-----------|-------------|
| **RAG** | Grounds answers in actual documents |
| **Temperature=0** | More deterministic, less creative |
| **Ask for citations** | Forces model to reference sources |
| **Constrain outputs** | "Only use information from the context" |
| **Verify programmatically** | Check facts against database |

### Detecting Hallucinations

```python
# Ask for confidence and sources
prompt = """
Answer the question based on the context. After your answer:
1. Rate your confidence (low/medium/high)
2. Quote the specific text you used
3. If unsure, say "I'm not certain about this"

Context: {context}
Question: {question}
"""
```

---

## Fine-Tuning vs. Prompting vs. RAG

### When to Use What

| Approach | Best for | Effort | Example |
|----------|----------|--------|---------|
| **Prompting** | Most tasks | Low | Classify tickets with examples |
| **RAG** | Company-specific knowledge | Medium | Answer policy questions |
| **Fine-tuning** | Consistent style/format | High | Generate product descriptions in brand voice |

### Decision Flow

```
Can you solve it with prompting + examples?
│
├── YES → Use prompting
│
└── NO → Do you need company-specific knowledge?
         │
         ├── YES → Use RAG
         │
         └── NO → Do you need a very specific style/format?
                  │
                  ├── YES → Consider fine-tuning
                  │
                  └── NO → Re-evaluate the problem
```

---

## Agents: LLMs That Take Actions

### What Are Agents?

LLMs that can:
1. Decide what tool to use
2. Call the tool
3. Use the result
4. Decide next step

```
User: "What's the order status for SC-123456?"
     │
     ▼
Agent thinks: "I need to look up order status"
     │
     ▼
Agent calls: lookup_order("SC-123456")
     │
     ▼
Tool returns: {"status": "shipped", "tracking": "1Z999..."}
     │
     ▼
Agent responds: "Your order SC-123456 has shipped! 
                Tracking number: 1Z999..."
```

### When to Use Agents

| Use agents when... | Don't use agents when... |
|--------------------|--------------------------|
| Task requires multiple steps | Single-step task |
| Dynamic information needed | Static response works |
| Actions must be taken | Just generating text |
| User intent varies | Intent is clear |

### Agent Risks

**Agents can:**
- Call wrong tools
- Loop forever
- Take unintended actions
- Leak sensitive data

**Mitigations:**
- Human-in-the-loop for risky actions
- Rate limits and timeouts
- Explicit tool permissions
- Comprehensive logging

---

## The StreamCart Use Cases

### Use Case 1: Support Ticket Response Draft

```python
def draft_response(ticket_text):
    # RAG: Find similar past tickets with good responses
    similar = find_similar_tickets(ticket_text, k=3)
    
    prompt = f"""You are a StreamCart support agent. 
Draft a response to this ticket.

Similar past tickets and responses:
{format_examples(similar)}

Current ticket: {ticket_text}

Be helpful, professional, and concise."""

    return llm.generate(prompt)
```

### Use Case 2: Policy Q&A with RAG

```python
def answer_policy_question(question):
    # Retrieve relevant policies
    relevant_docs = policy_search(question)
    
    prompt = f"""Answer based ONLY on these policies:
{relevant_docs}

Question: {question}

If the answer isn't in the policies, say so."""

    return llm.generate(prompt)
```

### Use Case 3: Order Status Agent

```python
tools = [
    {"name": "lookup_order", "description": "Get order status by ID"},
    {"name": "search_orders", "description": "Search orders by email"},
    {"name": "initiate_refund", "description": "Start refund process"}
]

agent = Agent(
    llm=gpt4,
    tools=tools,
    system_prompt="You help customers with order inquiries..."
)
```

---

## What Goes Wrong

### Mistake 1: Trusting LLM outputs without verification

**Symptom:** LLM gives wrong information, customer gets bad experience.

**Fix:** Use RAG for factual questions. Verify outputs when possible. Add "I'm not sure" as an option.

### Mistake 2: Over-engineering with agents

**Symptom:** Built complex agent for a task that needed simple prompting.

**Fix:** Start simple. Add complexity only when needed.

### Mistake 3: Ignoring latency and cost

**Symptom:** LLM calls take 5 seconds and cost $0.10 each.

**Fix:** Cache common queries. Use smaller models for simple tasks. Batch when possible.

### Mistake 4: No human review for high-stakes outputs

**Symptom:** Agent takes an action that causes real harm.

**Fix:** Human approval for actions with consequences (refunds, cancellations, external communications).

---

## Practice

### 1. Build (Colab Lab)
→ [Link to Colab notebook]

**What you'll do:**
- Build a simple RAG system for policy questions
- Prompt engineer for ticket classification
- Compare responses with and without RAG

**Time:** ~20 minutes

---

### 2. Decide (Scenario Quiz)
→ [Scenario Quiz](https://docs.google.com/forms/d/e/1FAIpQLSdM2Pz4OzZCDRF6cZc6aVfgDwJnzmETE_I9Sk0kHeCeWVnLlQ/viewform?usp=header)

**What you'll do:** 6 scenarios about choosing prompting vs RAG vs fine-tuning, and handling hallucinations.

**Time:** ~10 minutes

---

### 3. Debug (Find the Bug)
→ [Debug Drill](https://colab.research.google.com/github/189investmentai/ml-foundations-interactive/blob/main/notebooks/debug_drills/drill_10_runaway_agent.ipynb)

**What you'll do:** RAG system returns wrong answers. Find the retrieval problem.

**Time:** ~15 minutes

---

### 4. Explain (Stakeholder Update)

**The prompt:**  
Your CEO asks: "Should we use ChatGPT to answer customer questions automatically?" Write a response that honestly assesses the opportunity and risks.

**What good looks like:**
- Acknowledges potential value
- Explains hallucination risk honestly
- Proposes RAG + human review as mitigation
- Suggests a pilot approach

---

## Cheat Sheet

→ [Download: Module 10 Cheat Sheet (PDF)](#)

---

## Done?

- [ ] Read the micro-lesson
- [ ] Completed the scenario quiz  
- [ ] Ran the Colab lab
- [ ] Fixed the debug drill
- [ ] Wrote the stakeholder update

**Congratulations!** You've completed the ML for Decision Makers program. 🎉

**Next steps:**
1. Pick a capstone project
2. Apply these concepts to a real problem at work
3. Keep the cheat sheets handy for reference
