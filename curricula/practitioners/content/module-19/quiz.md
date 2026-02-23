# Module 19 Quiz: Agent Memory & Planning

---

## Question 1

A user says "What's the status of my order?" without specifying an order ID. The agent should:

A) Make up an order ID
B) Check session memory for previously mentioned orders, ask if none found
C) Refuse to answer
D) Search all orders in the database

**Correct Answer:** B

**Explanation:** Good memory management means checking if the user mentioned an order earlier in the conversation. If they did, use that. If not, ask for clarification. This creates a natural interaction where users don't repeat themselves.

---

## Question 2

Your chatbot's context window is 8K tokens. A conversation has grown to 12K tokens. What's the best approach?

A) Truncate from the beginning, keeping only the last 8K tokens
B) Tell the user the conversation is too long
C) Summarize older messages and keep recent ones in full detail
D) Start a new conversation

**Correct Answer:** C

**Explanation:** Summarization preserves the key information from older messages while keeping recent messages (which are likely most relevant) in full detail. Simple truncation might lose critical context, and ending the conversation is bad UX.

---

## Question 3

What's the main purpose of the ReAct (Reasoning + Acting) pattern?

A) To make agents respond faster
B) To alternate between reasoning steps and actions, allowing the agent to adjust based on results
C) To reduce token usage
D) To eliminate the need for planning

**Correct Answer:** B

**Explanation:** ReAct lets agents think about what to do (Thought), take an action (Act), see the result (Observation), and then reason about what to do next. This iterative approach is essential for complex tasks where the next step depends on previous results.

---

## Question 4

An agent keeps calling the same tool repeatedly without making progress. This is likely:

A) A context overflow problem
B) A planning loop failure
C) A memory confusion issue
D) Normal agent behavior

**Correct Answer:** B

**Explanation:** Planning loops occur when an agent gets stuck in a cycle without advancing toward the goal. This requires implementing safeguards like iteration limits, loop detection, and forcing concrete actions after reasoning steps.

---

## Question 5

A support agent needs to access information from past sessions (e.g., "You mentioned last week that..."). This requires:

A) A larger context window
B) Better prompting
C) Long-term persistent memory (vector storage or database)
D) Session state

**Correct Answer:** C

**Explanation:** Cross-session information requires persistent storage. Session state and context windows only exist within a session. Long-term memory (often implemented with vector embeddings for retrieval) allows recalling information from previous interactions.

---

## Question 6

Your agent stores conversation history as embeddings for semantic retrieval. A user asks about "my billing issue from yesterday." The best retrieval strategy is:

A) Retrieve all messages from yesterday
B) Retrieve messages semantically similar to "billing issue"
C) Combine time filter (yesterday) with semantic search (billing issue)
D) Return the entire conversation history

**Correct Answer:** C

**Explanation:** Effective retrieval often combines multiple signals. Time constraints ("yesterday") and semantic relevance ("billing issue") together will find the most relevant messages. Using just one criterion might miss important context or return irrelevant results.

---

## Question 7

When summarizing conversation history, what's most important to preserve?

A) The exact wording of all messages
B) Key entities, decisions made, and open questions
C) The timestamps of all messages
D) The token count of the original

**Correct Answer:** B

**Explanation:** Summaries should preserve actionable information: entities mentioned (order IDs, product names), decisions or commitments made, and questions that remain open. Exact wording is less important than meaning; timestamps may matter but aren't primary.

---

## Question 8

A stakeholder asks why sometimes the AI "forgets" things from earlier in a long conversation. The best explanation is:

A) "The AI has a memory limit and older information gets compressed into summaries to make room for new information. The key facts are preserved, but some details may be condensed."

B) "The AI is broken"

C) "Users need to write shorter messages"

D) "We need to upgrade to a bigger model"

**Correct Answer:** A

**Explanation:** This honestly explains the technical constraint (context limits) and the mitigation (summarization) in accessible terms. It sets appropriate expectations while assuring that important information is preserved.

---

## Scoring

- 8/8: Expert level — you understand agent memory and planning deeply
- 6-7/8: Solid understanding — review planning patterns
- 4-5/8: Developing — revisit memory management strategies
- <4/8: Review the full lesson and experiment with the playground
