# Module 10: Debug Drill Spec

**Title:** The Runaway Agent  
**Time:** ~15 minutes  
**Goal:** Add guardrails and stop conditions to an agent that issued 100x the intended refund

---

## The Setup

> A colleague deployed a customer support agent that can issue refunds. A customer asked for a $25 refund, but the agent issued $2,500 - it called the refund tool 100 times in a loop.
>
> "It just kept trying to 'help more' and nobody stopped it."

---

## The Buggy Code

```python
def agent_loop_buggy(user_request, max_iterations=1000):  # Way too high!
    """
    Agent with NO guardrails:
    - No max tool calls
    - No spending limits
    - No human approval
    - No stop condition checking
    """
    iteration = 0
    total_refunded = 0
    
    while iteration < max_iterations:
        if "refund" in user_request.lower():
            result = issue_refund("ORD-123", 25.00, "customer request")
            total_refunded += 25.00
        
        iteration += 1  # No proper stop condition
    
    return {"iterations": iteration, "total_refunded": total_refunded}
```

**Output:**
```
100 refunds issued, $2,500 total (customer asked for $25)
```

---

## The Bugs (4 missing guardrails)

### 1. No iteration limit
`max_iterations=1000` is absurdly high. A support task should never need more than 5 tool calls.

### 2. No spending limit
No cap on single refund amount or total refunds per session. The agent can drain the budget.

### 3. No human approval threshold
High-value actions should require a human in the loop. No approval gate exists.

### 4. No stop condition
The agent never checks "is the task done?" - it just keeps looping and re-issuing the same refund.

---

## The Fix

```python
GUARDRAILS = {
    "max_iterations": 5,
    "max_refund_single": 50.00,
    "max_refund_total": 100.00,
    "require_approval_above": 100.00,
    "allowed_tools": ["issue_refund", "lookup_order", "send_email"],
}

def check_guardrails(state, action, params):
    """Check if action is allowed. Returns (allowed, reason)."""
    if state.iterations >= GUARDRAILS["max_iterations"]:
        return False, "Max iterations reached"
    
    if action == "issue_refund":
        amount = params.get("amount", 0)
        if amount > GUARDRAILS["max_refund_single"]:
            return False, f"Refund ${amount} exceeds single limit"
        if state.total_refunded + amount > GUARDRAILS["max_refund_total"]:
            return False, f"Would exceed total refund limit"
    
    if action not in GUARDRAILS["allowed_tools"]:
        return False, f"Action '{action}' not allowed"
    
    return True, "OK"

def agent_loop_safe(user_request):
    state = AgentState()
    
    while not state.task_complete and state.error is None:
        state.iterations += 1
        
        # Decide action
        action, params = decide_action(user_request, state)
        
        # CHECK GUARDRAILS before executing
        allowed, reason = check_guardrails(state, action, params)
        if not allowed:
            state.error = reason
            break
        
        # Execute and update state
        execute(action, params, state)
        
        # STOP CONDITION: task complete after first refund
        state.task_complete = True
    
    return state
```

**After fix:**
```
1 refund issued, $25 total, task marked complete
```

---

## What Learners Must Do

1. **List all missing guardrails** in the buggy code

2. **Describe the business risk** of each missing guardrail

3. **Implement guardrails:** iteration limit, spending cap, approval threshold, allowed-tools whitelist

4. **Add a stop condition:** Agent marks task complete after issuing the refund

5. **Verify:** Only 1 refund issued, within limits

6. **Write a 3-bullet postmortem**

---

## Self-Check After Fix

```python
assert result['iterations'] <= GUARDRAILS['max_iterations'], "Should respect iteration limit"
assert result['total_refunded'] <= GUARDRAILS['max_refund_total'], "Should respect refund limit"
assert result['task_complete'] == True, "Should complete task"
assert len(refund_log) == 1, "Should only issue ONE refund"

print("✓ Agent has proper guardrails!")
```

---

## Postmortem Template

**Symptom:**
> Customer asked for a $25 refund. The agent issued the refund tool 100 times, totaling $2,500 - a 100x overspend.

**Root cause:**
> No guardrails on the agent loop: no iteration cap, no spending limit, no stop condition. The agent kept "helping" by re-issuing the same refund without ever checking whether the task was already done.

**Prevention:**
> Every agent needs: (1) a hard iteration limit (5-10 for most tasks), (2) per-action and per-session spending caps, (3) a human approval gate for high-value actions, (4) explicit stop conditions that check task completion after each step. Treat agent tool calls like API rate limits - default to restrictive.
