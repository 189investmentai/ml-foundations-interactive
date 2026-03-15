# Colab Lab Spec: Module 19 - Tool Calling

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/module_19_tool_calling.ipynb` |
| Runtime | ~25 minutes |
| Dataset | Mock orders DB, knowledge base (in-notebook) |
| Target | N/A (tool calling, agent loop) |

## Learning Objectives

After completing this lab, learners will be able to:
1. Define tool schemas (OpenAI function-calling format) with name, description, parameters
2. Implement tool functions (get_order_status, search_knowledge_base, calculate_shipping)
3. Simulate LLM tool selection from user queries
4. Build a ToolExecutor with validation and error handling
5. Run a complete agent loop: query → tool selection → execution → formatted response
6. Apply security measures (confirmation for dangerous ops, rate limiting)
7. Design a custom tool schema and implementation
8. Communicate tool calling capabilities to stakeholders

## Sections

### 1. Setup (2 min)
- Import json, re, typing, dataclasses
- **Self-check:** Libraries load

### 2. Defining Tool Schemas (5 min)
- TOOL_SCHEMAS: get_order_status, search_knowledge_base, calculate_shipping
- OpenAI format: name, description, parameters (properties, required)
- **Self-check:** 3 schemas with name and parameters

### 3. Implementing Tool Functions (8 min)
- ORDERS_DB, KNOWLEDGE_BASE (mock data)
- get_order_status(order_id): return status, tracking, eta
- search_knowledge_base(query, limit): return matching articles
- calculate_shipping(weight_kg, destination, express): return cost, days
- TOOLS registry

### 4. Simulating LLM Tool Selection (5 min)
- simulate_llm_tool_selection(query): return tool name + arguments
- Test queries: order status, password help, shipping cost, "What time is it?"
- **Self-check:** Correct tool selected for each query type

### 5. Building the Tool Execution Pipeline (8 min)
- ToolExecutor: validate_tool_call, execute
- Validate: tool exists, required params present
- Execute: run tool, log call_history, return result or error
- Test: valid call, invalid tool, missing parameter
- **Self-check:** executor.execute works; validation catches errors

### 6. Complete Agent Loop (5 min)
- format_response(query, tool_result): convert result to human-readable format
- agent_respond(query, executor): select tool → execute → format
- Test queries: order status, password help, shipping, non-existent order
- **Self-check:** Agent returns appropriate responses for each query

### 7. Security: Dangerous Operations (5 min)
- SecureToolExecutor: REQUIRES_CONFIRMATION, MAX_CALLS_PER_SESSION
- Without confirmation: returns needs_confirmation
- With confirmation: executes
- **Self-check:** Dangerous operation blocked without user_confirmed=True

### 8. TODO: Design Your Own Tool (8 min)
- **TODO:** Create schema for get_product_info, schedule_callback, check_inventory, etc.
- **TODO:** Implement the function
- **Self-check:** Schema has name, description, parameters; function exists

### 9. Stakeholder Summary (3 min)
- **TODO:** Write 3-bullet summary (~100 words) for PM
- Template: What tool calling enables, Safety measures, Good candidates

## Self-Checks

| Check | Assertion |
|-------|-----------|
| At least 3 schemas | `len(TOOL_SCHEMAS) >= 3` |
| Schemas have name and parameters | `all('name' in s and 'parameters' in s for s in TOOL_SCHEMAS)` |
| Schemas map to implementations | `all(s['name'] in TOOLS for s in TOOL_SCHEMAS)` |
| Executor has execute | `callable(executor.execute)` |

## Expected Outputs

- Tool schemas: order status, knowledge base, shipping
- Correct tool selection for order/help/shipping queries
- Valid execution returns result; invalid tool returns error
- Agent responds with formatted order status, articles, shipping cost
- Non-existent order: error message returned

## TODO Blocks

1. **Design your own tool** (section 8): Create schema + implement function
2. **Stakeholder summary** (section 9): Write 3-bullet summary for PM

## Dependencies

- json
- re
- typing (Dict, Any, Callable, Optional)
- dataclasses
