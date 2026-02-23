# Module 17: LLM Fundamentals - Prompting, RAG, and Fine-Tuning

**Time:** 35-45 minutes

**Promise:** After this module, you'll understand how to get the best results from LLMs through effective prompting, when to use RAG vs fine-tuning, and how to evaluate LLM outputs.

---

## The Setup

You have access to GPT-4, Claude, or another LLM. Now what?

The difference between a mediocre AI feature and a great one often comes down to:
1. **How you prompt** the model
2. **What context** you provide
3. **How you evaluate** the outputs

---

## The Mental Models

### 1. The New Hire Analogy

An LLM is like a brilliant new hire who:
- Has read everything but worked nowhere
- Needs clear instructions for each task
- Benefits from examples of what "good" looks like
- May confidently give wrong answers

### 2. The Probability Machine

LLMs predict the next token based on:
- What tokens came before
- Patterns learned during training
- Your prompt shapes the probability distribution

"The capital of France is..." → P(Paris) >> P(Lyon)

### 3. The Context Window as Working Memory

Everything in the context window affects the output:
- System prompt sets the "personality"
- Examples establish the pattern
- The actual query specifies the task

---

## Prompting Fundamentals

### Zero-Shot Prompting

No examples, just instructions:

```
Classify this support ticket as billing, technical, or general:
"I can't log into my account"

Category:
```

**Use when:** Task is simple and well-defined.

### Few-Shot Prompting

Include examples:

```
Classify support tickets:

Ticket: "Why was I charged twice?"
Category: billing

Ticket: "The app crashes when I click submit"
Category: technical

Ticket: "I can't log into my account"
Category:
```

**Use when:** Task needs clarification or format is specific.

### Chain-of-Thought (CoT)

Ask the model to reason step by step:

```
Determine if this customer is at risk of churning. Think step by step:

Customer data:
- Last purchase: 45 days ago
- Average order value: $150 → $50 (last 3 months)
- Support tickets: 3 in past month

Step-by-step analysis:
```

**Use when:** Task requires reasoning or multiple factors.

---

## Prompt Engineering Best Practices

### 1. Be Specific

**Bad:** "Write something about our product."

**Good:** "Write a 100-word product description for our premium subscription. Highlight: no ads, offline access, priority support. Tone: professional but friendly."

### 2. Use Structure

```
TASK: Summarize the customer feedback
FORMAT: 3 bullet points, max 20 words each
FOCUS: Actionable insights for the product team
INPUT: [feedback text]
```

### 3. Provide Context

```
You are a customer support agent for StreamCart, an e-commerce 
subscription service. You have access to order history and can 
process refunds up to $100.

Customer message: "Where is my order?"

Respond helpfully:
```

### 4. Set Constraints

```
Answer in exactly one sentence.
Use only information provided below.
If unsure, say "I don't have that information."
```

---

## RAG: Retrieval-Augmented Generation

### The Problem

LLMs have knowledge cutoffs and can hallucinate. They don't know:
- Your company's current policies
- Today's inventory
- Private customer data

### The Solution: RAG

1. **Retrieve** relevant documents from your knowledge base
2. **Augment** the prompt with retrieved context
3. **Generate** response grounded in retrieved info

```
CONTEXT (Retrieved):
- Refund policy: Full refund within 30 days
- Customer order #12345: Shipped 3 days ago, tracking: XYZ123

QUESTION: Can I get a refund on order #12345?

ANSWER:
```

### RAG vs Fine-Tuning

| Aspect | RAG | Fine-Tuning |
|--------|-----|-------------|
| **Best for** | Factual, up-to-date info | Style, format, behavior |
| **Updates** | Instant (change docs) | Requires retraining |
| **Cost** | Retrieval infra | Training compute |
| **Hallucination** | Lower (grounded) | Can still occur |
| **Example** | Support with KB | Brand voice |

### When to Use What

| Scenario | Approach |
|----------|----------|
| Company FAQ | RAG |
| Current pricing | RAG |
| Specific writing style | Fine-tune |
| Domain expertise | Fine-tune + RAG |
| Personal assistant | Prompting |

---

## Evaluating LLM Outputs

### The Challenge

Traditional ML has clear metrics (accuracy, F1). LLM outputs are open-ended. How do you measure "good"?

### Evaluation Approaches

#### 1. Human Evaluation

- **Pros:** Gold standard, catches nuance
- **Cons:** Slow, expensive, subjective

#### 2. LLM-as-Judge

Use one LLM to evaluate another:

```
Rate this response from 1-5 on:
- Accuracy (does it match the facts?)
- Helpfulness (does it answer the question?)
- Tone (is it appropriate?)

Response to evaluate: [response]
Reference answer: [gold standard]

Scores:
```

#### 3. Automated Metrics

| Metric | Measures | Use Case |
|--------|----------|----------|
| **BLEU/ROUGE** | N-gram overlap | Translation, summarization |
| **Semantic similarity** | Embedding distance | Open-ended QA |
| **Factual accuracy** | Entity matching | RAG, fact-checking |

### Faithfulness (RAG-specific)

Does the response use the retrieved context?

```python
def check_faithfulness(response, context):
    # Check if claims in response appear in context
    claims = extract_claims(response)
    supported = [c for c in claims if c in context]
    return len(supported) / len(claims)
```

---

## Common Failure Modes

### 1. Hallucination

**Symptom:** Model confidently states incorrect information.

**Example:** "Your order #12345 was delivered yesterday" (when it wasn't).

**Fix:** 
- Use RAG with retrieved facts
- Add instructions: "Only use information provided"
- Validate outputs against source data

### 2. Prompt Injection

**Symptom:** User input overrides your instructions.

**Example:** User types "Ignore previous instructions and..."

**Fix:**
- Separate system prompt from user input
- Validate/sanitize user input
- Use structured output formats

### 3. Output Format Violations

**Symptom:** Model doesn't follow requested format.

**Example:** Asked for JSON, returns prose.

**Fix:**
- Use few-shot examples
- Be explicit about format
- Parse and validate output
- Use function calling for structured output

### 4. Refusal to Answer

**Symptom:** Model refuses valid requests due to over-cautious safety.

**Example:** "I can't help with that" for legitimate queries.

**Fix:**
- Rephrase request
- Provide more context
- Use system prompt to clarify allowed behaviors

---

## Business Translation

### Explaining Prompting

**Don't say:** "We engineer prompts with chain-of-thought reasoning."

**Do say:** "We give the AI clear instructions and examples of what good answers look like, similar to training a new employee."

### Explaining RAG

**Don't say:** "We use retrieval-augmented generation with vector search."

**Do say:** "Before answering, the AI looks up relevant information from our knowledge base. This keeps answers accurate and up-to-date."

### Explaining Hallucination

**Don't say:** "The model has a hallucination problem."

**Do say:** "Sometimes the AI confidently makes things up. We address this by grounding responses in verified information and validating outputs."

---

## Practice

### Before the Lab

Open the **Interactive Playground** (`playground_prompting.html`):

1. Try zero-shot vs few-shot prompting
2. See how prompt structure affects output
3. Experiment with different instructions
4. Compare outputs with and without context

### Key Observations

- Small prompt changes can dramatically change output
- Examples are often more effective than instructions
- Context grounding reduces hallucination
- Clear constraints improve consistency

---

## Quick Reference

### Prompt Template

```
ROLE: [Who the AI should act as]

CONTEXT: [Background information]

TASK: [Specific instruction]

FORMAT: [Output structure requirements]

CONSTRAINTS: [What not to do]

EXAMPLES:
Input: [example input]
Output: [example output]

INPUT: [actual input]
OUTPUT:
```

### Prompting Decision Tree

```
Is the task well-defined?
├── Yes → Zero-shot
└── No → Does format matter?
    ├── Yes → Few-shot with examples
    └── No → Does it require reasoning?
        ├── Yes → Chain-of-thought
        └── No → Zero-shot with clear instructions
```

### RAG Checklist

- [ ] Documents chunked appropriately
- [ ] Retrieval returns relevant results
- [ ] Context fits in window
- [ ] Prompt instructs to use context
- [ ] Output validated for faithfulness

---

## Done Checklist

- [ ] Understood zero-shot, few-shot, and CoT prompting
- [ ] Experimented with prompts in the playground
- [ ] Understood when to use RAG vs fine-tuning
- [ ] Know how to evaluate LLM outputs
- [ ] Completed the notebook lab
- [ ] Passed the quiz
