# Module 19 Quiz: Agent Memory & Planning - Google Forms Setup

## Form Setup

1. Go to https://docs.google.com/forms
2. Click **+ Blank**
3. Settings → Enable **"Make this a quiz"**
4. Enable **"Release grade immediately after submission"**

---

## Form Title & Description

**Title:** Module 19 Quiz: Agent Memory & Planning

**Description:** 
Test your understanding. 8 questions, ~10 minutes.

---

## Questions (Copy-Paste Ready)

### Question 1

**Question:**
A user says "What's the status of my order?" without specifying an order ID. The agent should:

**Options:**
- A) Make up an order ID
- B) Check session memory for previously mentioned orders, ask if none found ✓ CORRECT
- C) Refuse to answer
- D) Search all orders in the database

**Feedback (add to correct answer):**
Good memory management means checking if the user mentioned an order earlier in the conversation. If they did, use that. If not, ask for clarification. This creates a natural interaction where users don't repeat themselves.

**Points:** 1

---

### Question 2

**Question:**
Your chatbot's context window is 8K tokens. A conversation has grown to 12K tokens. What's the best approach?

**Options:**
- A) Truncate from the beginning, keeping only the last 8K tokens
- B) Tell the user the conversation is too long
- C) Summarize older messages and keep recent ones in full detail ✓ CORRECT
- D) Start a new conversation

**Feedback (add to correct answer):**
Summarization preserves the key information from older messages while keeping recent messages (which are likely most relevant) in full detail. Simple truncation might lose critical context, and ending the conversation is bad UX.

**Points:** 1

---

### Question 3

**Question:**
What's the main purpose of the ReAct (Reasoning + Acting) pattern?

**Options:**
- A) To make agents respond faster
- B) To alternate between reasoning steps and actions, allowing the agent to adjust based on results ✓ CORRECT
- C) To reduce token usage
- D) To eliminate the need for planning

**Feedback (add to correct answer):**
ReAct lets agents think about what to do (Thought), take an action (Act), see the result (Observation), and then reason about what to do next. This iterative approach is essential for complex tasks where the next step depends on previous results.

**Points:** 1

---

### Question 4

**Question:**
An agent keeps calling the same tool repeatedly without making progress. This is likely:

**Options:**
- A) A context overflow problem
- B) A planning loop failure ✓ CORRECT
- C) A memory confusion issue
- D) Normal agent behavior

**Feedback (add to correct answer):**
Planning loops occur when an agent gets stuck in a cycle without advancing toward the goal. This requires implementing safeguards like iteration limits, loop detection, and forcing concrete actions after reasoning steps.

**Points:** 1

---

### Question 5

**Question:**
A support agent needs to access information from past sessions (e.g., "You mentioned last week that..."). This requires:

**Options:**
- A) A larger context window
- B) Better prompting
- C) Long-term persistent memory (vector storage or database) ✓ CORRECT
- D) Session state

**Feedback (add to correct answer):**
Cross-session information requires persistent storage. Session state and context windows only exist within a session. Long-term memory (often implemented with vector embeddings for retrieval) allows recalling information from previous interactions.

**Points:** 1

---

### Question 6

**Question:**
Your agent stores conversation history as embeddings for semantic retrieval. A user asks about "my billing issue from yesterday." The best retrieval strategy is:

**Options:**
- A) Retrieve all messages from yesterday
- B) Retrieve messages semantically similar to "billing issue"
- C) Combine time filter (yesterday) with semantic search (billing issue) ✓ CORRECT
- D) Return the entire conversation history

**Feedback (add to correct answer):**
Effective retrieval often combines multiple signals. Time constraints ("yesterday") and semantic relevance ("billing issue") together will find the most relevant messages. Using just one criterion might miss important context or return irrelevant results.

**Points:** 1

---

### Question 7

**Question:**
When summarizing conversation history, what's most important to preserve?

**Options:**
- A) The exact wording of all messages
- B) Key entities, decisions made, and open questions ✓ CORRECT
- C) The timestamps of all messages
- D) The token count of the original

**Feedback (add to correct answer):**
Summaries should preserve actionable information: entities mentioned (order IDs, product names), decisions or commitments made, and questions that remain open. Exact wording is less important than meaning; timestamps may matter but aren't primary.

**Points:** 1

---

### Question 8

**Question:**
A stakeholder asks why sometimes the AI "forgets" things from earlier in a long conversation. The best explanation is:

**Options:**
- A) "The AI has a memory limit and older information gets compressed into summaries to make room for new information. The key facts are preserved, but some details may be condensed." ✓ CORRECT
- B) "The AI is broken"
- C) "Users need to write shorter messages"
- D) "We need to upgrade to a bigger model"

**Feedback (add to correct answer):**
This honestly explains the technical constraint (context limits) and the mitigation (summarization) in accessible terms. It sets appropriate expectations while assuring that important information is preserved.

**Points:** 1

---

