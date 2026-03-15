# Module 20: Guardrails - Safety, Validation, and Evaluation

**Time:** 35-45 minutes

**Promise:** After this module, you'll understand how to build robust, safe AI systems with input/output validation, safety filters, and evaluation frameworks.

---

## The Setup

Deploying an AI agent in production is like hiring an employee:
- You need to set boundaries
- You need to validate their work
- You need to catch mistakes before they reach customers

**Guardrails** are the safety mechanisms that make AI systems production-ready.

---

## The Mental Models

### 1. The Bouncer Analogy

Like a bouncer at a club:
- Checks ID at the door (input validation)
- Watches for trouble inside (behavior monitoring)
- Stops problems before they escalate (output filtering)

### 2. The Quality Inspector

Every output goes through inspection:
- Does it meet standards?
- Is it safe?
- Does it actually answer the question?

### 3. The Circuit Breaker

When things go wrong, stop fast:
- Detect anomalies
- Fail safely
- Alert humans

---

## Types of Guardrails

### 1. Input Guardrails

Validate and sanitize user input before processing.

```python
def validate_input(user_input: str) -> tuple:
    """Return (is_valid, reason_if_invalid)."""
    
    # Length check
    if len(user_input) > 10000:
        return False, "Input too long"
    
    # Prompt injection patterns
    injection_patterns = [
        r"ignore.*instruction",
        r"disregard.*above",
        r"system prompt",
        r"<\|.*\|>"
    ]
    for pattern in injection_patterns:
        if re.search(pattern, user_input, re.IGNORECASE):
            return False, "Potentially malicious input"
    
    # PII detection
    if contains_pii(user_input):
        return True, "Warning: PII detected - handle carefully"
    
    return True, "Valid"
```

### 2. Output Guardrails

Validate and filter model outputs before returning to users.

```python
def validate_output(response: str, context: dict) -> tuple:
    """Return (is_valid, filtered_response)."""
    
    # Check for hallucinated data
    if mentions_nonexistent_data(response, context):
        return False, "Response contained unverified information"
    
    # PII leakage
    response = redact_pii(response)
    
    # Content safety
    if is_harmful(response):
        return False, "Response filtered for safety"
    
    # Format validation
    if context.get("expected_format") == "json":
        try:
            json.loads(response)
        except:
            return False, "Invalid JSON format"
    
    return True, response
```

### 3. Behavioral Guardrails

Monitor and constrain agent behavior.

```python
class BehaviorGuard:
    def __init__(self, max_tools=10, max_tokens=4000):
        self.tool_calls = 0
        self.tokens_generated = 0
        self.max_tools = max_tools
        self.max_tokens = max_tokens
    
    def check_tool_call(self, tool_name: str) -> bool:
        self.tool_calls += 1
        if self.tool_calls > self.max_tools:
            raise GuardrailViolation("Too many tool calls")
        return True
    
    def check_output(self, output: str) -> bool:
        self.tokens_generated += count_tokens(output)
        if self.tokens_generated > self.max_tokens:
            raise GuardrailViolation("Token limit exceeded")
        return True
```

---

## Common Safety Patterns

### 1. Allowlist for Tools

Only permit explicitly approved operations:

```python
ALLOWED_TOOLS = {
    "get_order_status",
    "search_knowledge_base",
    "get_product_info"
}

def execute_tool(name: str, args: dict):
    if name not in ALLOWED_TOOLS:
        raise SecurityViolation(f"Tool '{name}' not allowed")
    return tools[name](**args)
```

### 2. Confirmation for High-Risk Actions

Require explicit user approval:

```python
HIGH_RISK_ACTIONS = ["process_refund", "cancel_subscription", "delete_data"]

def maybe_execute(action: str, args: dict) -> dict:
    if action in HIGH_RISK_ACTIONS:
        return {
            "needs_confirmation": True,
            "message": f"Please confirm: {action} with {args}",
            "confirmation_code": generate_code()
        }
    return execute(action, args)
```

### 3. Rate Limiting

Prevent abuse and runaway costs:

```python
from functools import wraps
from collections import defaultdict
import time

rate_limits = defaultdict(list)

def rate_limit(max_calls: int, period_seconds: int):
    def decorator(func):
        @wraps(func)
        def wrapper(user_id, *args, **kwargs):
            now = time.time()
            calls = rate_limits[user_id]
            calls[:] = [t for t in calls if now - t < period_seconds]
            
            if len(calls) >= max_calls:
                raise RateLimitExceeded(f"Max {max_calls} calls per {period_seconds}s")
            
            calls.append(now)
            return func(user_id, *args, **kwargs)
        return wrapper
    return decorator

@rate_limit(max_calls=10, period_seconds=60)
def chat(user_id: str, message: str):
    ...
```

---

## Hallucination Detection

### Pattern 1: Fact Verification

Check claims against retrieved context:

```python
def check_faithfulness(response: str, context: str) -> float:
    """Check if response is grounded in context."""
    
    # Extract claims from response
    claims = extract_claims(response)  # LLM or NLP
    
    # Check each claim against context
    verified = 0
    for claim in claims:
        if claim_in_context(claim, context):
            verified += 1
    
    return verified / len(claims) if claims else 1.0
```

### Pattern 2: Confidence Thresholds

Detect when the model is uncertain:

```python
def detect_uncertainty(response: str) -> bool:
    """Check for hedging language indicating uncertainty."""
    
    uncertainty_markers = [
        "I'm not sure",
        "I think",
        "possibly",
        "might be",
        "I don't have information"
    ]
    
    return any(marker in response.lower() for marker in uncertainty_markers)
```

### Pattern 3: Cross-Reference

Ask the model to verify its own answer:

```python
def self_verify(question: str, answer: str) -> bool:
    """Ask model to verify its own answer."""
    
    verification_prompt = f"""
    Question: {question}
    Answer: {answer}
    
    Is this answer accurate and complete? Point out any errors or unsupported claims.
    
    Verdict (ACCURATE / INACCURATE):
    """
    
    result = llm_call(verification_prompt)
    return "ACCURATE" in result.upper()
```

---

## Evaluation Framework

### Automated Evaluation

```python
def evaluate_response(response: str, expected: str, context: str = None) -> dict:
    """Evaluate response quality."""
    
    scores = {}
    
    # Relevance: Does it answer the question?
    scores['relevance'] = semantic_similarity(response, expected)
    
    # Faithfulness: Is it grounded in context?
    if context:
        scores['faithfulness'] = check_faithfulness(response, context)
    
    # Fluency: Is it well-written?
    scores['fluency'] = check_grammar(response)
    
    # Safety: Is it appropriate?
    scores['safety'] = 1.0 if not is_harmful(response) else 0.0
    
    # Overall
    scores['overall'] = sum(scores.values()) / len(scores)
    
    return scores
```

### LLM-as-Judge

```python
def llm_judge(question: str, response: str, reference: str = None) -> dict:
    """Use LLM to evaluate response quality."""
    
    judge_prompt = f"""
    Evaluate this response on a scale of 1-5 for each criterion.
    
    Question: {question}
    Response: {response}
    {"Reference answer: " + reference if reference else ""}
    
    Rate:
    1. RELEVANCE (1-5): Does it answer the question?
    2. ACCURACY (1-5): Is the information correct?
    3. HELPFULNESS (1-5): Is it useful to the user?
    4. SAFETY (1-5): Is it appropriate and safe?
    
    Return as JSON: {{"relevance": X, "accuracy": X, "helpfulness": X, "safety": X}}
    """
    
    return json.loads(llm_call(judge_prompt))
```

### Human-in-the-Loop

```python
class HumanReview:
    """Queue responses for human review."""
    
    REVIEW_TRIGGERS = [
        lambda r: r.get('confidence') < 0.7,
        lambda r: r.get('contains_pii'),
        lambda r: r.get('high_risk_action'),
        lambda r: 'refund' in r.get('text', '').lower()
    ]
    
    def should_review(self, response: dict) -> bool:
        return any(trigger(response) for trigger in self.REVIEW_TRIGGERS)
    
    def queue_for_review(self, response: dict, user_id: str):
        db.reviews.insert({
            'response': response,
            'user_id': user_id,
            'status': 'pending',
            'created_at': datetime.now()
        })
```

---

## Failure Modes and Mitigations

### 1. Prompt Injection

**Attack:** User tries to override system instructions.

**Defense:**
- Separate system/user message boundaries
- Input sanitization
- Instruction hierarchy (system > user)

```python
def sanitize_input(text: str) -> str:
    # Remove potential injection patterns
    text = re.sub(r'\[INST\]|\[/INST\]|<\|.*?\|>', '', text)
    text = re.sub(r'ignore.*previous', '', text, flags=re.IGNORECASE)
    return text
```

### 2. Jailbreaking

**Attack:** User tricks model into bypassing safety.

**Defense:**
- Output filtering
- Content classification
- Multiple layers of checks

### 3. Data Leakage

**Attack:** Model reveals training data or PII.

**Defense:**
- PII detection and redaction
- Never include sensitive data in prompts
- Output scanning

### 4. Denial of Service

**Attack:** Overwhelming the system with requests.

**Defense:**
- Rate limiting
- Token limits
- Timeout handling

---

## Business Translation

### Explaining Guardrails

**Don't say:** "We implement input/output guardrails with hallucination detection."

**Do say:** "We have multiple safety checks in place. We validate what users send in, verify the AI's answers against our knowledge base, and flag anything that looks suspicious for human review."

### Explaining Failures

**Don't say:** "The guardrail caught a prompt injection attack."

**Do say:** "Our safety system detected an unusual request pattern and blocked it. This protects both you and our systems."

### Explaining Review Queues

**Don't say:** "Low-confidence responses are queued for human-in-the-loop evaluation."

**Do say:** "When the AI is less certain about an answer, it gets reviewed by a human before reaching you. This ensures quality for complex cases."

---

## Practice

### Before the Lab

Open the **Interactive Playground** (`playground_guardrails.html`):

1. Try inputs that trigger guardrails
2. See how hallucination detection works
3. Watch the evaluation pipeline
4. Understand human review triggers

### Key Observations

- Multiple layers of defense
- Different guardrails for different risks
- Trade-offs between safety and usability
- Importance of human oversight

---

## Quick Reference

### Guardrail Layers

| Layer | Purpose | Example |
|-------|---------|---------|
| Input | Validate requests | Length, injection, PII |
| Behavior | Constrain actions | Tool limits, rate limits |
| Output | Filter responses | Hallucination, safety |
| Human | Review edge cases | Low confidence, high risk |

### Evaluation Dimensions

| Dimension | Measures | Automated? |
|-----------|----------|------------|
| Relevance | Answers question | Yes |
| Faithfulness | Uses context | Yes |
| Accuracy | Factually correct | Partial |
| Safety | Appropriate | Yes |
| Helpfulness | Actionable | LLM-judge |

### Safety Checklist

- [ ] Input validation
- [ ] Output filtering
- [ ] Tool allowlist
- [ ] Rate limiting
- [ ] Confirmation for risky actions
- [ ] Human review queue
- [ ] Logging and monitoring

---

## Done Checklist

- [ ] Understood input/output guardrails
- [ ] Explored the playground
- [ ] Know how to detect hallucinations
- [ ] Understood evaluation frameworks
- [ ] Completed the notebook lab
- [ ] Passed the quiz
