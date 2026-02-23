/**
 * Module 19 Quiz: Agent Memory & Planning
 * 
 * HOW TO RUN:
 * 1. Go to https://script.google.com
 * 2. Create new project (or use existing)
 * 3. Paste this code (replace any existing code)
 * 4. Click Run → createQuiz
 * 5. Authorize when prompted
 * 6. Check your Google Drive for the new form
 * 7. Copy the published URL from the Logs
 */

function createQuiz() {
  // Create the form
  var form = FormApp.create('Module 19 Quiz: Agent Memory & Planning');
  
  // Enable quiz mode
  form.setIsQuiz(true);
  
  // Set description
  form.setDescription('Test your understanding. 8 questions, ~10 minutes.\nYou will see explanations after each answer.');
  
  // Question 1
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('A user says "What\'s the status of my order?" without specifying an order ID. The agent should:')
    .setPoints(1)
    .setChoices([
      q1.createChoice('A) Make up an order ID', false),
      q1.createChoice('B) Check session memory for previously mentioned orders, ask if none found', true),
      q1.createChoice('C) Refuse to answer', false),
      q1.createChoice('D) Search all orders in the database', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Good memory management means checking if the user mentioned an order earlier in the conversation. If they did, use that. If not, ask for clarification. This creates a natural interaction where users don\'t repeat themselves.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 2
  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('Your chatbot\'s context window is 8K tokens. A conversation has grown to 12K tokens. What\'s the best approach?')
    .setPoints(1)
    .setChoices([
      q2.createChoice('A) Truncate from the beginning, keeping only the last 8K tokens', false),
      q2.createChoice('B) Tell the user the conversation is too long', false),
      q2.createChoice('C) Summarize older messages and keep recent ones in full detail', true),
      q2.createChoice('D) Start a new conversation', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Summarization preserves the key information from older messages while keeping recent messages (which are likely most relevant) in full detail. Simple truncation might lose critical context, and ending the conversation is bad UX.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 3
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('What\'s the main purpose of the ReAct (Reasoning + Acting) pattern?')
    .setPoints(1)
    .setChoices([
      q3.createChoice('A) To make agents respond faster', false),
      q3.createChoice('B) To alternate between reasoning steps and actions, allowing the agent to adjust based on results', true),
      q3.createChoice('C) To reduce token usage', false),
      q3.createChoice('D) To eliminate the need for planning', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('ReAct lets agents think about what to do (Thought), take an action (Act), see the result (Observation), and then reason about what to do next. This iterative approach is essential for complex tasks where the next step depends on previous results.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 4
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('An agent keeps calling the same tool repeatedly without making progress. This is likely:')
    .setPoints(1)
    .setChoices([
      q4.createChoice('A) A context overflow problem', false),
      q4.createChoice('B) A planning loop failure', true),
      q4.createChoice('C) A memory confusion issue', false),
      q4.createChoice('D) Normal agent behavior', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Planning loops occur when an agent gets stuck in a cycle without advancing toward the goal. This requires implementing safeguards like iteration limits, loop detection, and forcing concrete actions after reasoning steps.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 5
  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('A support agent needs to access information from past sessions (e.g., "You mentioned last week that..."). This requires:')
    .setPoints(1)
    .setChoices([
      q5.createChoice('A) A larger context window', false),
      q5.createChoice('B) Better prompting', false),
      q5.createChoice('C) Long-term persistent memory (vector storage or database)', true),
      q5.createChoice('D) Session state', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Cross-session information requires persistent storage. Session state and context windows only exist within a session. Long-term memory (often implemented with vector embeddings for retrieval) allows recalling information from previous interactions.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 6
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('Your agent stores conversation history as embeddings for semantic retrieval. A user asks about "my billing issue from yesterday." The best retrieval strategy is:')
    .setPoints(1)
    .setChoices([
      q6.createChoice('A) Retrieve all messages from yesterday', false),
      q6.createChoice('B) Retrieve messages semantically similar to "billing issue"', false),
      q6.createChoice('C) Combine time filter (yesterday) with semantic search (billing issue)', true),
      q6.createChoice('D) Return the entire conversation history', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Effective retrieval often combines multiple signals. Time constraints ("yesterday") and semantic relevance ("billing issue") together will find the most relevant messages. Using just one criterion might miss important context or return irrelevant results.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 7
  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('When summarizing conversation history, what\'s most important to preserve?')
    .setPoints(1)
    .setChoices([
      q7.createChoice('A) The exact wording of all messages', false),
      q7.createChoice('B) Key entities, decisions made, and open questions', true),
      q7.createChoice('C) The timestamps of all messages', false),
      q7.createChoice('D) The token count of the original', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Summaries should preserve actionable information: entities mentioned (order IDs, product names), decisions or commitments made, and questions that remain open. Exact wording is less important than meaning; timestamps may matter but aren\'t primary.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 8
  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('A stakeholder asks why sometimes the AI "forgets" things from earlier in a long conversation. The best explanation is:')
    .setPoints(1)
    .setChoices([
      q8.createChoice('A) "The AI has a memory limit and older information gets compressed into summaries to make room for new information. The key facts are preserved, but some details may be condensed."', true),
      q8.createChoice('B) "The AI is broken"', false),
      q8.createChoice('C) "Users need to write shorter messages"', false),
      q8.createChoice('D) "We need to upgrade to a bigger model"', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('This honestly explains the technical constraint (context limits) and the mitigation (summarization) in accessible terms. It sets appropriate expectations while assuring that important information is preserved.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Log the URLs
  Logger.log('Form created successfully!');
  Logger.log('Edit URL: ' + form.getEditUrl());
  Logger.log('Published URL: ' + form.getPublishedUrl());
  
  return form.getPublishedUrl();
}
