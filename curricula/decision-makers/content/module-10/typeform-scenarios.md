# Module 10: Typeform Scenarios

---

## Scenario 1: Approach Selection

**Setup:**
You want to build a customer support chatbot that answers questions about your company's products and policies. The information is specific to your company and changes quarterly.

**Question:** What's the best approach?

**Options:**
- A) Fine-tune GPT on your documentation
- B) Use RAG with your documentation
- C) Prompt engineering with a few examples
- D) Train a custom model from scratch

**Correct Answer:** B

**Decision Receipt:**
RAG is ideal here: company-specific knowledge that changes over time. Fine-tuning bakes in knowledge at training time (outdated quarterly). Prompting alone can't teach company-specific facts. RAG lets you update documents without retraining.

---

## Scenario 2: Hallucination Risk

**Setup:**
Your LLM support bot told a customer: "You can return opened items within 90 days for a full refund." Your actual policy is 30 days for unopened items only.

**Question:** What's the primary cause?

**Options:**
- A) The model is broken
- B) Hallucination—the model made up a plausible-sounding policy
- C) Training data contamination
- D) Prompt injection attack

**Correct Answer:** B

**Decision Receipt:**
Classic hallucination. The model doesn't "know" your policy—it generated a plausible-sounding answer from its training on general e-commerce patterns. Fix: Use RAG with your actual policy docs. Add "If you're unsure, say so." Always verify policy answers against source.

---

## Scenario 3: When to Use Agents

**Setup:**
You're building a feature for "Check my order status." The user provides an order number, and you look it up in a database and return the status.

**Question:** Do you need an agent?

**Options:**
- A) Yes—agents are best for customer service
- B) No—this is a single-step lookup, just call the API
- C) Yes—the user intent varies
- D) Depends on the LLM used

**Correct Answer:** B

**Decision Receipt:**
This is a simple, single-step task: parse order number → call API → return result. No agent needed. An agent is overkill—adds latency, complexity, and potential for the LLM to call wrong tools. Use agents when the task requires multiple steps or decisions.

---

## Scenario 4: Temperature Setting

**Setup:**
You're using an LLM to classify support tickets into categories. Which temperature should you use?

**Options:**
- A) Temperature = 1.0 (more creative)
- B) Temperature = 0.7 (balanced)
- C) Temperature = 0 (deterministic)
- D) Doesn't matter for classification

**Correct Answer:** C

**Decision Receipt:**
For classification, you want consistent, deterministic outputs. Temperature=0 minimizes randomness. Temperature=1.0 would give different answers for the same input on different runs. Save high temperature for creative tasks like marketing copy.

---

## Scenario 5: Fine-Tuning Decision

**Setup:**
Your company has a very specific brand voice: informal, uses emoji, always starts with the customer's name. You want all LLM-generated responses to match this style consistently.

**Question:** Is fine-tuning justified?

**Options:**
- A) No—prompting can handle style
- B) Yes—consistent style across thousands of responses is hard with prompting alone
- C) No—use RAG instead
- D) Yes—all production LLM use requires fine-tuning

**Correct Answer:** B (or A depending on scale)

**Decision Receipt:**
Style consistency at scale is a reasonable fine-tuning use case. Prompting works but may drift; fine-tuning bakes in the style more reliably. However, start with prompting + good examples. Only fine-tune if prompting proves insufficient after testing.

---

## Scenario 6: Human-in-the-Loop

**Setup:**
Your agent can take these actions:
1. Look up order status
2. Send tracking email
3. Issue $50 refund
4. Escalate to human

**Question:** Which actions should require human approval?

**Options:**
- A) All of them—agents can't be trusted
- B) Only #3 (refund)—it has financial impact
- C) #3 and #4—both have real consequences
- D) None—that defeats the purpose of automation

**Correct Answer:** B (or C)

**Decision Receipt:**
Refunds have direct financial impact and should require human approval. Looking up status and sending emails are lower risk. Escalation to human is inherently human-involved. The principle: automate low-risk, keep humans in the loop for high-consequence actions.

---

## Scoring Summary

**6/6 correct:** You understand LLM deployment tradeoffs well.

**4-5/6 correct:** Good foundation. Review hallucination mitigation and agent decisions.

**<4/6 correct:** Re-read the micro-lesson, especially the RAG and hallucination sections.
