# Debug Drill Spec: Module 19 - The Tool Error

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/debug_drills/drill_19_tool_error.ipynb` |
| Solution | `notebooks/answer_keys/solution_19_tool_error.ipynb` |
| Runtime | ~20 minutes |
| Bug Type | Tool Error / Missing Error Handling |

## Scenario

A colleague built an AI agent that uses tools to look up order information. Customers complain: "It said my order shipped yesterday, but when I check the website it says 'pending'!" The agent hallucinates tool results instead of reporting errors properly. When the order lookup tool fails (e.g., order not found), the agent returns a fabricated status instead of admitting the failure.

## The Bug

```python
# Colleague's buggy code
def broken_agent_respond(query: str, order_id: str) -> str:
    """Agent that hallucinates when tool fails."""
    tool_result = get_order_status(order_id)
    
    # BUG: Doesn't check for errors, just generates response anyway
    if "error" in tool_result:
        # BUG: Instead of reporting error, hallucinates!
        return f"Your order {order_id} shipped yesterday and should arrive within 3-5 business days."
    else:
        return f"Your order {order_id} is currently {tool_result['status']} as of {tool_result['date']}."
```

### Why It's Wrong

When the tool returns an error (e.g., `{"error": "Order ORD-003 not found"}`), the agent ignores it and instead returns a confident-sounding hallucination. The agent has no logic to admit when the tool failed. LLMs will fill gaps with plausible-sounding content; without explicit error handling, they fabricate information rather than saying "I couldn't find that."

## Investigation Steps

1. **Understand the problem** - Trace: user asks about ORD-003 → tool returns error → agent ignores error → agent hallucinates "shipped yesterday"
2. **Implement proper error handling** - Check for `"error"` in tool result first; return honest error message to user
3. **Add SafeToolExecutor** - Validate results, format errors clearly for LLM (e.g., "TOOL_ERROR: ... Do not make up information")

## The Fix

```python
# Fixed agent with error handling
def fixed_agent_respond(query: str, order_id: str) -> str:
    """Agent that properly handles tool errors."""
    tool_result = get_order_status(order_id)
    
    # Check for errors FIRST
    if "error" in tool_result:
        return f"I couldn't find order {order_id} in our system. Please double-check the order number."
    
    # Only respond with data when tool succeeds
    return f"Your order {order_id} is currently {tool_result['status']} as of {tool_result['date']}."

# Safe executor that formats errors for LLM
def format_for_llm(self, result: Dict) -> str:
    if not result["success"]:
        return f"TOOL_ERROR: {result['error']}\nDo not make up information."
    return f"TOOL_SUCCESS: {json.dumps({k: v for k, v in result.items() if k != 'success'})}"
```

## Self-Checks

| Check | Assertion |
|-------|-----------|
| No hallucination on error | `"shipped" not in response.lower()` for ORD-003 |
| Agent admits failure | `"couldn't find" in response.lower()` or `"not found" in response.lower()` |

## Postmortem Template

### What happened:
- Agent told users their non-existent order shipped
- Agent gave false information when tool lookup failed

### Root cause:
- No error handling for tool failures
- Agent logic didn't check for error in tool result before generating response
- LLM fills gaps with hallucination when not explicitly told to admit failure

### How to prevent:
- Always check for errors in tool results before using them
- Format errors clearly for LLM (TOOL_ERROR marker)
- Add prompting: "Do not make up information. Tell the user the tool failed."
- Log all tool calls for debugging

## Learning Objectives

After completing this drill, learners will be able to:
1. Recognize when agents hallucinate instead of reporting tool failures
2. Implement error handling that checks tool results before responding
3. Design tool executors that format errors clearly for LLM consumption
