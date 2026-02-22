# Module 10: AI Agents - Typeform Scenario

**Theme:** You're evaluating whether to build an AI agent for customer support automation.

---

## Q1 (Multiple Choice)
**An "AI Agent" is different from a chatbot because:**

- A) It uses a larger model
- B) It can take ACTIONS (call APIs, update databases) not just generate text
- C) It's always more accurate
- D) It doesn't need an LLM

**Correct:** B

**Decision Receipt:** AGENTS combine reasoning (LLM) with ACTIONS (tools). A chatbot says "You can get a refund at settings/refund." An agent actually processes the refund by calling the refund API.

---

## Q2 (Multiple Choice)
**The core agent loop is:**

- A) Input → Output → Done
- B) Think → Act → Observe → Repeat
- C) Train → Test → Deploy
- D) Query → Response → Store

**Correct:** B

**Decision Receipt:** THINK: What should I do? ACT: Call a tool. OBSERVE: What happened? REPEAT: Do I need more steps? This loop continues until the task is complete or a stop condition is hit.

---

## Q3 (Multiple Choice)
**Your agent has these tools: `lookup_customer`, `check_order`, `issue_refund`. A customer asks for a refund. What's the likely sequence?**

- A) issue_refund immediately
- B) lookup_customer → check_order → issue_refund
- C) check_order → lookup_customer → issue_refund
- D) Skip tools, just respond with text

**Correct:** B

**Decision Receipt:** The agent should VERIFY before acting: lookup customer (valid account?), check order (eligible for refund?), then issue refund. Rushing to action without verification is risky.

---

## Q4 (Multiple Choice)
**An agent without guardrails is dangerous because:**

- A) It runs too slowly
- B) It might take excessive or harmful actions (infinite loops, over-spending)
- C) It can't use tools
- D) It requires too much memory

**Correct:** B

**Decision Receipt:** Without limits, an agent might: issue unlimited refunds, loop forever, access unauthorized data, or take irreversible actions. GUARDRAILS are essential safety constraints.

---

## Q5 (Multiple Choice)
**Which guardrail prevents an agent from issuing a $10,000 refund?**

- A) Max iterations
- B) Spending limit
- C) Timeout
- D) Allowed tools list

**Correct:** B

**Decision Receipt:** SPENDING LIMITS cap financial impact. You might set: max $50 per refund, max $200 total per session, require human approval above $100. Multiple layers of financial guardrails are best.

---

## Q6 (Multiple Choice)
**"Max iterations" guardrail prevents:**

- A) High costs
- B) Infinite loops where the agent keeps taking actions forever
- C) Slow responses
- D) Unauthorized access

**Correct:** B

**Decision Receipt:** If the agent gets confused or stuck, it might loop indefinitely. MAX ITERATIONS (e.g., 5 tool calls) forces it to stop. Better to fail safely than run forever.

---

## Q7 (Multiple Choice)
**Your agent should escalate to a human when:**

- A) Every single request
- B) The request exceeds guardrail limits or the agent is uncertain
- C) Never, agents should handle everything
- D) Only for VIP customers

**Correct:** B

**Decision Receipt:** HUMAN ESCALATION is a key guardrail. High-value actions (large refunds), edge cases (unusual requests), or low confidence ("I'm not sure") should go to humans. Agents augment, not replace.

---

## Q8 (Multiple Choice)
**A "stop condition" tells the agent:**

- A) What tools to use
- B) When to stop the loop (task complete, error, or limit reached)
- C) How to format responses
- D) Which customers to ignore

**Correct:** B

**Decision Receipt:** STOP CONDITIONS: task_complete (goal achieved), error (something went wrong), max_iterations (limit hit), needs_human (escalation required). Without these, the agent never knows when to stop.

---

## Q9 (Multiple Choice)
**Your agent issued a refund to the wrong customer. What guardrail was missing?**

- A) Spelling checker
- B) Verification step (confirm customer ID matches before action)
- C) Larger model
- D) More training data

**Correct:** B

**Decision Receipt:** VERIFICATION before irreversible actions. The agent should confirm: "Found customer John Smith (ID: 12345). Order #67890 total $49.99. Proceed with refund?" — then validate before executing.

---

## Q10 (Multiple Choice)
**When should you use an agent vs a simple workflow?**

| Use Agent | Use Workflow |
|-----------|--------------|
| ? | ? |

- A) Agent: fixed steps, Workflow: dynamic reasoning
- B) Agent: dynamic reasoning, Workflow: fixed steps
- C) Always use agents
- D) Always use workflows

**Correct:** B

**Decision Receipt:** AGENTS for dynamic paths: "Handle this customer request" (might need refund, or shipping update, or escalation). WORKFLOWS for fixed paths: "Send welcome email → wait 3 days → send follow-up." Don't over-engineer.

---

## Q11 (Multiple Choice)
**You're preparing a pilot where the agent can issue refunds up to $100. What should you validate FIRST before broad testing?**

- A) UI color theme
- B) Guardrail failure cases and adversarial prompts for unsafe actions
- C) Marketing copy tone
- D) Seasonal discount logic only

**Correct:** B

**Decision Receipt:** For action-taking agents, safety failures are highest risk. Validate guardrails and abuse resistance first, then scale into happy-path and load testing.

---

## Q12 (Short Answer)
**Write a 3-bullet "safe launch policy" for a refund agent. Include: one financial guardrail, one stop condition, and one human-escalation rule.**

**Expected Answer (example):**
- Refund cap: max $50/action, human approval above that
- Stop condition: max 5 tool calls per request, then fail safe
- Escalation: uncertain identity match or policy conflict routes to human queue

**Decision Receipt:** Safe agent deployment is policy design, not just model quality. Clear operational rules prevent expensive failures and build trust.
