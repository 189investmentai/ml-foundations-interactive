# Colab Lab Spec: Module 20 - Agent Memory

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/module_20_agent_memory.ipynb` |
| Runtime | ~25 minutes |
| Dataset | Synthetic conversation data |
| Target | N/A (memory, planning) |

## Learning Objectives

After completing this lab, learners will be able to:
1. Implement ConversationMemory with sliding window and token limits
2. Build EntityMemory to extract and track orders, amounts, dates
3. Implement SummaryMemory that compresses old messages
4. Create a PlanningAgent that breaks goals into steps
5. Use the ReAct pattern (Thought → Action → Observation)
6. Combine memory types in a CompleteAgent

## Sections

### 1. Setup (2 min)
- Import json, re, typing, dataclasses, datetime

### 2. Part 1: Conversation Memory (4 min)
- Message dataclass (role, content, timestamp, tokens)
- ConversationMemory: add, _enforce_limit (sliding window), get_context
- Test: add user/assistant messages, check total_tokens

### 3. Part 2: Entity Memory (4 min)
- EntityMemory: extract orders (ORD-xxx), amounts ($), dates
- Track first_seen, mentions per entity
- get_recent_order() for most-discussed order
- Test on sample texts with order IDs and amounts

### 4. Part 3: Summary Memory (4 min)
- SummaryMemory: recent_limit, _summarize_oldest when exceeded
- _mock_summarize extracts topics (order status, return, help)
- get_context: summary + recent messages

### 5. Part 4: Planning Agent (4 min)
- PlanStep dataclass (step_num, action, status, result)
- PlanningAgent: create_plan(goal), execute_step, run
- Goal-based plans: return/refund (5 steps), order status (3 steps)
- Test: "Help me return order ORD-12345"

### 6. Part 5: ReAct Pattern (3 min)
- ReActAgent: think, act, observe, run
- Loop: Thought → Action → Observation until respond_to_user
- Test: "Where is my order ORD-12345?"

### 7. Part 6: Complete Agent with Memory (4 min)
- CompleteAgent: conversation + entities + session_state
- process(user_input): add to memory, extract entities, generate response
- _generate_response uses current_order from entities
- Test multi-turn: order question → when arrive → tracking → return

### 8. Part 7: TODO - Build Your Memory System (3 min)
- **TODO:** Design memory for: support bot (past issues), assistant (preferences), tech support (troubleshooting steps)
- Consider: entities to track, summarize vs full, session state

### 9. Self-Check (1 min)
- **Self-check:** memory has messages, token count > 0, entity_mem has entities, CompleteAgent has conversation and entities

### 10. Part 8: Stakeholder Summary (3 min)
- **TODO:** Write 3-bullet summary (~100 words) for PM
- Template: Why memory matters, memory types, planning benefits

## Self-Checks

| Check | Assertion |
|-------|-----------|
| Messages in memory | `len(memory.messages) > 0` |
| Token tracking | `memory.total_tokens() > 0` |
| Entity memory | `hasattr(entity_mem, 'entities')` |
| Complete agent | `hasattr(agent, 'conversation') and hasattr(agent, 'entities')` |

## Expected Outputs

- Conversation memory with token count
- Extracted entities (orders, amounts, dates)
- Summary memory context
- Planning agent step execution
- ReAct trace (Thought, Action, Observation)
- Complete agent multi-turn responses

## TODO Blocks

1. **Design memory system** (Part 7): Choose scenario, define entities, summarization strategy, session state
2. **Stakeholder summary** (Part 8): Write 3-bullet summary on memory, types, planning

## Dependencies

- json
- re
- typing (Dict, List, Any, Optional)
- dataclasses
- datetime
