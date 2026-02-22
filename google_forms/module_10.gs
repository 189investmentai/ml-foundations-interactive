function createModule10() {
  var title = 'Module 10: AI Agents';
  var desc  = 'Theme: You\'re evaluating whether to build an AI agent for customer support automation.\n\n12 questions · ~10 min · Covers: agents vs chatbots, tool calling, guardrails, stop conditions, escalation, testing.';

  var questions = [
    {
      q: 'An "AI Agent" is different from a chatbot because:',
      options: [
        'A) It uses a larger model',
        'B) It can take ACTIONS (call APIs, update databases) not just generate text',
        'C) It\'s always more accurate',
        'D) It doesn\'t need an LLM'
      ],
      correct: 1,
      feedback: 'AGENTS combine reasoning (LLM) with ACTIONS (tools). A chatbot says "You can get a refund at settings/refund." An agent actually processes the refund by calling the refund API.'
    },
    {
      q: 'The core agent loop is:',
      options: [
        'A) Input → Output → Done',
        'B) Think → Act → Observe → Repeat',
        'C) Train → Test → Deploy',
        'D) Query → Response → Store'
      ],
      correct: 1,
      feedback: 'THINK: What should I do? ACT: Call a tool. OBSERVE: What happened? REPEAT: Do I need more steps? This loop continues until the task is complete or a stop condition is hit.'
    },
    {
      q: 'Your agent has these tools: lookup_customer, check_order, issue_refund. A customer asks for a refund. What\'s the likely sequence?',
      options: [
        'A) issue_refund immediately',
        'B) lookup_customer → check_order → issue_refund',
        'C) check_order → lookup_customer → issue_refund',
        'D) Skip tools, just respond with text'
      ],
      correct: 1,
      feedback: 'The agent should VERIFY before acting: lookup customer (valid account?), check order (eligible for refund?), then issue refund. Rushing to action without verification is risky.'
    },
    {
      q: 'An agent without guardrails is dangerous because:',
      options: [
        'A) It runs too slowly',
        'B) It might take excessive or harmful actions (infinite loops, over-spending)',
        'C) It can\'t use tools',
        'D) It requires too much memory'
      ],
      correct: 1,
      feedback: 'Without limits, an agent might: issue unlimited refunds, loop forever, access unauthorized data, or take irreversible actions. GUARDRAILS are essential safety constraints.'
    },
    {
      q: 'Which guardrail prevents an agent from issuing a $10,000 refund?',
      options: [
        'A) Max iterations',
        'B) Spending limit',
        'C) Timeout',
        'D) Allowed tools list'
      ],
      correct: 1,
      feedback: 'SPENDING LIMITS cap financial impact. You might set: max $50 per refund, max $200 total per session, require human approval above $100. Multiple layers of financial guardrails are best.'
    },
    {
      q: '"Max iterations" guardrail prevents:',
      options: [
        'A) High costs',
        'B) Infinite loops where the agent keeps taking actions forever',
        'C) Slow responses',
        'D) Unauthorized access'
      ],
      correct: 1,
      feedback: 'If the agent gets confused or stuck, it might loop indefinitely. MAX ITERATIONS (e.g., 5 tool calls) forces it to stop. Better to fail safely than run forever.'
    },
    {
      q: 'Your agent should escalate to a human when:',
      options: [
        'A) Every single request',
        'B) The request exceeds guardrail limits or the agent is uncertain',
        'C) Never, agents should handle everything',
        'D) Only for VIP customers'
      ],
      correct: 1,
      feedback: 'HUMAN ESCALATION is a key guardrail. High-value actions (large refunds), edge cases (unusual requests), or low confidence ("I\'m not sure") should go to humans. Agents augment, not replace.'
    },
    {
      q: 'A "stop condition" tells the agent:',
      options: [
        'A) What tools to use',
        'B) When to stop the loop (task complete, error, or limit reached)',
        'C) How to format responses',
        'D) Which customers to ignore'
      ],
      correct: 1,
      feedback: 'STOP CONDITIONS: task_complete (goal achieved), error (something went wrong), max_iterations (limit hit), needs_human (escalation required). Without these, the agent never knows when to stop.'
    },
    {
      q: 'Your agent issued a refund to the wrong customer. What guardrail was missing?',
      options: [
        'A) Spelling checker',
        'B) Verification step (confirm customer ID matches before action)',
        'C) Larger model',
        'D) More training data'
      ],
      correct: 1,
      feedback: 'VERIFICATION before irreversible actions. The agent should confirm: "Found customer John Smith (ID: 12345). Order #67890 total $49.99. Proceed with refund?" — then validate before executing.'
    },
    {
      q: 'When should you use an agent vs a simple workflow?\n\nAgent: ?\nWorkflow: ?',
      options: [
        'A) Agent: fixed steps, Workflow: dynamic reasoning',
        'B) Agent: dynamic reasoning, Workflow: fixed steps',
        'C) Always use agents',
        'D) Always use workflows'
      ],
      correct: 1,
      feedback: 'AGENTS for dynamic paths: "Handle this customer request" (might need refund, or shipping update, or escalation). WORKFLOWS for fixed paths: "Send welcome email → wait 3 days → send follow-up." Don\'t over-engineer.'
    },
    {
      q: 'You\'re preparing a pilot where the agent can issue refunds up to $100. What should you validate FIRST before broad testing?',
      options: [
        'A) UI color theme',
        'B) Guardrail failure cases and adversarial prompts for unsafe actions',
        'C) Marketing copy tone',
        'D) Seasonal discount logic only'
      ],
      correct: 1,
      feedback: 'For action-taking agents, safety failures are highest risk. Validate guardrails and abuse resistance first, then scale into happy-path and load testing.'
    },
    {
      q: 'Write a 3-bullet "safe launch policy" for a refund agent. Include: one financial guardrail, one stop condition, and one human-escalation rule.',
      type: 'short',
      expected: 'Refund cap: max $50/action, human approval above that. Stop condition: max 5 tool calls per request, then fail safe. Escalation: uncertain identity match or policy conflict routes to human queue.',
      feedback: 'Safe agent deployment is policy design, not just model quality. Clear operational rules prevent expensive failures and build trust.'
    }
  ];

  return buildQuizForm(title, desc, questions);
}
