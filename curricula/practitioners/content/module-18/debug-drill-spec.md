# Debug Drill Spec: Module 18 - The Hallucinating RAG

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/debug_drills/drill_18_rag_hallucination.ipynb` |
| Solution | `notebooks/answer_keys/solution_18_rag_hallucination.ipynb` |
| Runtime | ~20 minutes |
| Bug Type | RAG Hallucination / Faithfulness |

## Scenario

A colleague built a RAG-powered support bot that gives confident but wrong answers. A customer complains: "It told me I have 60 days for a refund, but your policy says 30 days!" Despite having the correct information in the knowledge base, the bot hallucinates details—wrong numbers, extra policies, and fabricated specifics. The weak prompt doesn't constrain the LLM to stick to the retrieved context.

## The Bug

```python
# Colleague's buggy code
def weak_rag_prompt(query: str, context: str) -> str:
    """Weak prompt that allows hallucination."""
    return f"""You are a helpful support agent.

Context: {context}

Question: {query}

Answer:"""

# Simulated LLM that hallucinates (e.g., says 60 days when context says 30)
def simulate_weak_llm(query: str, context: str) -> str:
    hallucinated_responses = {
        "refund": "You have 60 days to request a full refund...",  # WRONG: says 60 days
        "shipping": "Standard shipping is 3-5 days...",  # WRONG: different numbers
        "return": "You can return items... We'll process your refund in 24 hours.",  # WRONG
    }
    for key, response in hallucinated_responses.items():
        if key in query.lower():
            return response
    return "I'm not sure about that. Please contact support."
```

### Why It's Wrong

The prompt doesn't explicitly instruct the LLM to use only the provided context. Without strong constraints, LLMs tend to "fill in" with plausible-sounding but incorrect details—especially numbers and policy specifics. The model may draw from training data or generate confident fabrications. There's also no validation to catch when the response contains numbers or claims not present in the context.

## Investigation Steps

1. **Implement faithfulness checking** - Extract numbers from response and context; flag any in response that aren't in context
2. **Create a stronger prompt** - Add explicit rules: only use context, don't add information, say "I don't know" if unsure, quote numbers exactly
3. **Validate outputs** - Run faithfulness checks on responses before returning to users

## The Fix

```python
# Faithfulness checker
def check_number_faithfulness(response: str, context: str) -> Tuple[bool, List[str]]:
    response_numbers = set(re.findall(r'\d+', response))
    context_numbers = set(re.findall(r'\d+', context))
    hallucinated = response_numbers - context_numbers
    is_faithful = len(hallucinated) == 0
    return is_faithful, list(hallucinated)

# Strong prompt
def strong_rag_prompt(query: str, context: str) -> str:
    return f"""You are a support agent. Answer questions using ONLY the information provided below.

IMPORTANT RULES:
1. Only use facts from the CONTEXT below
2. Do NOT add information that isn't explicitly stated
3. If the context doesn't contain the answer, say "I don't have that information"
4. Quote specific numbers and policies exactly as stated

CONTEXT:
{context}

QUESTION: {query}

ANSWER (using only the context above):"""
```

## Self-Checks

| Check | Assertion |
|-------|-----------|
| Faithfulness checker exists | `callable(check_number_faithfulness)` |
| Strong prompt exists | `callable(strong_rag_prompt)` |
| Faithful response passes | `check_number_faithfulness(faithful_response, context)[0] == True` |

## Postmortem Template

### What happened:
- Bot gave incorrect refund policy (60 days instead of 30)
- Customers received wrong information despite correct knowledge base

### Root cause:
- Weak prompt didn't constrain LLM to use only provided context
- No output validation to catch hallucinated numbers or claims

### How to prevent:
- Use strong prompts: "Only use provided context", "Say I don't know if unsure"
- Implement faithfulness checks (e.g., numbers in response must appear in context)
- Quote exact policy text; validate outputs before returning

## Learning Objectives

After completing this drill, learners will be able to:
1. Identify when RAG responses hallucinate despite correct retrieval
2. Write prompts that constrain LLMs to use only provided context
3. Implement faithfulness validation (e.g., number verification) for RAG outputs
