# Module 9: Debug Drill Spec

**Title:** The Hallucinating Bot  
**Time:** ~15 minutes  
**Goal:** Detect and prevent LLM hallucinations in a customer support chatbot

---

## The Setup

> A colleague deployed a customer support chatbot. A customer asked about the return policy, and the bot confidently stated:
> "You have 90 days to return any item for a full refund."
>
> The actual policy is 30 days for unopened items, 14 days for opened. This is a hallucination - the bot fabricated a plausible but wrong answer.

---

## The Buggy Code

```python
def get_bot_response(question):
    """Simulated bot - returns response without any verification."""
    # No grounding against knowledge base
    # No confidence scoring
    # No hallucination detection
    return simulated_llm_response(question)

# Test
print(get_bot_response("What is your return policy?"))
# Output: "You have 90 days to return any item for a full refund."
# WRONG - actual policy is 30 days (unopened), 14 days (opened)
```

---

## The Bug

### Problem: No hallucination detection or grounding

The bot generates responses with no verification against ground truth. Hallucination patterns in the test cases include:

1. **Fabricated numbers** - "90 days" instead of 30
2. **Invented capabilities** - Adding Bitcoin and wire transfers as payment methods
3. **Expanded scope** - Claiming international shipping when only US/Canada is supported

All responses sound confident and plausible, which makes hallucinations particularly dangerous.

---

## The Fix

Build a hallucination detection layer that checks responses against a knowledge base:

```python
KNOWLEDGE_BASE = {
    "return_policy": "30-day return window for unopened items. Opened items: 14 days.",
    "payment_methods": "Visa, Mastercard, Amex, PayPal, Apple Pay.",
    "shipping": "We ship to US and Canada only.",
    # ...
}

def detect_hallucination_simple(bot_response, topic):
    """Check response against knowledge base for red flags."""
    issues = []
    ground_truth = KNOWLEDGE_BASE[topic].lower()
    response = bot_response.lower()
    
    # Check for number mismatches
    response_numbers = set(re.findall(r'\d+', response))
    truth_numbers = set(re.findall(r'\d+', ground_truth))
    wrong_numbers = response_numbers - truth_numbers
    if wrong_numbers:
        issues.append(f"Suspicious numbers: {wrong_numbers}")
    
    # Check for superlatives/absolutes often hallucinated
    red_flags = ['all', 'every', 'always', 'never', 'unlimited', 'free', 'guaranteed']
    for flag in red_flags:
        if flag in response and flag not in ground_truth:
            issues.append(f"Added superlative: '{flag}'")
    
    is_safe = len(issues) == 0
    return is_safe, issues

def get_safe_response(question, topic):
    """Get response with hallucination checking - fall back to KB if unsafe."""
    bot_response = get_bot_response(question)
    is_safe, issues = detect_hallucination_simple(bot_response, topic)
    
    if is_safe:
        return bot_response
    else:
        return KNOWLEDGE_BASE.get(topic, "Let me connect you with a human agent.")
```

**After fix:**
```
Q: "What is your return policy?"
→ Falls back to KB: "30-day return window for unopened items. Opened items: 14 days."
```

---

## What Learners Must Do

1. **Identify hallucination patterns:** Review test cases, spot fabricated numbers, invented features, expanded scope

2. **Explain why LLMs hallucinate:** At least 2 reasons

3. **Build detection:** Implement a simple fact-checking function against the knowledge base

4. **Build a safe wrapper:** Response function that falls back to KB when hallucination is detected

5. **Verify:** Confirm hallucinated responses are caught and corrected

6. **Write a 3-bullet postmortem**

---

## Self-Check After Fix

```python
return_result = get_safe_response("What is your return policy?", "return_policy")
assert '30' in return_result, "Should return correct 30-day policy"

cancel_result = get_safe_response("How do I cancel my subscription?", "cancel_subscription")
# Correct response should pass through unchanged

print("✓ Hallucination detection working!")
```

---

## Postmortem Template

**Symptom:**
> Support chatbot told a customer they had 90 days to return items. The actual policy is 30 days (unopened) / 14 days (opened). The bot fabricated a confident but wrong answer.

**Root cause:**
> No grounding or verification layer between the LLM and the user. The bot generated plausible-sounding responses without checking against the actual knowledge base. LLMs hallucinate because they optimize for fluency, not factual accuracy.

**Prevention:**
> Ground LLM responses against a verified knowledge base. Flag responses with mismatched numbers, added superlatives, or claims not present in source material. Fall back to the knowledge base (or a human) when confidence is low. Test with known Q&A pairs before deploying.
