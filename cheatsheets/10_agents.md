# Cheat Sheet: AI Agents

## The Agent Loop

```
THINK → ACT → OBSERVE → REPEAT
  ↑_________________________|
```

1. **Think:** Decide what to do next
2. **Act:** Call a tool
3. **Observe:** See the result
4. **Repeat:** Until task complete or limit reached

## Tool Definition

```python
TOOLS = {
    "lookup_customer": {
        "description": "Get customer details by ID",
        "parameters": {"customer_id": "string"}
    },
    "issue_refund": {
        "description": "Issue a refund for an order",
        "parameters": {"order_id": "string", "amount": "float"}
    }
}
```

## Essential Guardrails

| Guardrail | Why | Example |
|---|---|---|
| Max iterations | Prevent infinite loops | `max_steps=5` |
| Spending limits | Financial safety | `max_refund=$50` |
| Allowed tools | Restrict actions | No delete_account |
| Human approval | High-risk actions | Refunds > $100 |
| Timeout | Prevent hangs | `timeout=30s` |

## Guardrail Implementation

```python
GUARDRAILS = {
    "max_iterations": 5,
    "max_refund_single": 50.00,
    "max_refund_total": 100.00,
    "require_human_above": 100.00,
    "allowed_tools": ["lookup", "refund", "email"]
}

def check_guardrails(state, action, params):
    if state.iterations >= GUARDRAILS["max_iterations"]:
        return False, "Max iterations reached"
    
    if action == "refund" and params["amount"] > GUARDRAILS["max_refund_single"]:
        return False, "Amount exceeds limit"
    
    return True, "OK"
```

## Stop Conditions

```python
def should_stop(state):
    return (
        state.task_complete or
        state.error is not None or
        state.iterations >= MAX_ITERATIONS or
        state.needs_human_approval
    )
```

## Agent vs Workflow

| Use Agent When | Use Workflow When |
|---|---|
| Dynamic decision path | Fixed steps |
| Unknown number of steps | Predictable flow |
| Reasoning required | Simple logic |
| Exploration needed | Deterministic |

## Agent Architecture

```
┌─────────────────────────────────────┐
│              AGENT                  │
│  ┌─────────┐    ┌──────────────┐   │
│  │ PLANNER │────│  GUARDRAILS  │   │
│  └────┬────┘    └──────────────┘   │
│       │                             │
│       ▼                             │
│  ┌─────────┐    ┌──────────────┐   │
│  │ EXECUTOR│────│    TOOLS     │   │
│  └────┬────┘    └──────────────┘   │
│       │                             │
│       ▼                             │
│  ┌─────────┐                        │
│  │ MEMORY  │                        │
│  └─────────┘                        │
└─────────────────────────────────────┘
```

## Common Failure Modes

| Failure | Cause | Prevention |
|---|---|---|
| Infinite loop | No stop condition | Max iterations |
| Runaway costs | No spending limit | Budget cap |
| Wrong tool choice | Ambiguous descriptions | Clear tool docs |
| Hallucinated tools | LLM invents actions | Strict tool validation |

## Quick Template

```python
def agent_loop(task, max_iterations=5):
    state = {"iterations": 0, "done": False, "results": []}
    
    while not state["done"] and state["iterations"] < max_iterations:
        state["iterations"] += 1
        
        # 1. Think: Decide action
        action, params = decide_action(task, state)
        
        # 2. Check guardrails
        allowed, reason = check_guardrails(state, action, params)
        if not allowed:
            return {"error": reason, "state": state}
        
        # 3. Act: Execute tool
        result = execute_tool(action, params)
        state["results"].append(result)
        
        # 4. Check if done
        state["done"] = is_task_complete(task, state)
    
    return state
```

## Key Insight

Agents are powerful but dangerous without guardrails.

**Always implement:**
- Iteration limits
- Spending caps
- Human escalation
- Clear stop conditions

**Test with adversarial inputs before deploying.**
