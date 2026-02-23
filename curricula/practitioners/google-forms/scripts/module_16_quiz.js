/**
 * Module 16 Quiz: Transformers
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
  var form = FormApp.create('Module 16 Quiz: Transformers');
  
  // Enable quiz mode
  form.setIsQuiz(true);
  
  // Set description
  form.setDescription('Test your understanding. 8 questions, ~10 minutes.\nYou will see explanations after each answer.');
  
  // Question 1
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('What is the main advantage of transformers over RNNs for processing text?')
    .setPoints(1)
    .setChoices([
      q1.createChoice('A) Transformers use less memory', false),
      q1.createChoice('B) Transformers process all positions in parallel, enabling faster training and better long-range dependencies', true),
      q1.createChoice('C) Transformers have fewer parameters', false),
      q1.createChoice('D) Transformers don\'t need GPUs', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('RNNs process sequences one step at a time, which is slow and causes vanishing gradients (forgetting early context). Transformers use attention to process all positions simultaneously, enabling parallel computation and direct connections between any two positions regardless of distance.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 2
  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('In the attention mechanism, what do Query (Q), Key (K), and Value (V) represent intuitively?')
    .setPoints(1)
    .setChoices([
      q2.createChoice('A) Q is the question, K is the answer, V is the verification', false),
      q2.createChoice('B) Q is "what am I looking for?", K is "what do I offer?", V is "what information do I contain?"', true),
      q2.createChoice('C) Q, K, V are just three copies of the input', false),
      q2.createChoice('D) Q is the first word, K is the last word, V is all words', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Each token creates a Query (what it\'s looking for), Key (what it advertises), and Value (its actual information). Attention computes similarity between Queries and Keys to determine which Values to aggregate. High Q-K similarity means that token\'s Value is relevant.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 3
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('Your document is 10,000 tokens but your model has a 4,000 token context window. What\'s the best approach?')
    .setPoints(1)
    .setChoices([
      q3.createChoice('A) Just input the first 4,000 tokens', false),
      q3.createChoice('B) Use retrieval to select relevant chunks, or summarize earlier sections', true),
      q3.createChoice('C) Split into random 4,000 token chunks', false),
      q3.createChoice('D) The model will automatically handle it', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Simply truncating loses important information. Better strategies include: (1) retrieval-augmented generation to find and include only relevant chunks, (2) summarizing earlier sections to fit more content, or (3) using a sliding window with overlap. The right choice depends on the task.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 4
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('What\'s the difference between BERT and GPT in terms of architecture?')
    .setPoints(1)
    .setChoices([
      q4.createChoice('A) BERT is bigger than GPT', false),
      q4.createChoice('B) BERT is bidirectional (sees all context), GPT is autoregressive (left-to-right only)', true),
      q4.createChoice('C) BERT generates text, GPT classifies text', false),
      q4.createChoice('D) There\'s no difference — they\'re the same model', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('BERT uses bidirectional attention (can see words before AND after) and is trained with masked language modeling. GPT uses causal/autoregressive attention (can only see previous words) and predicts the next token. This makes BERT better for understanding tasks and GPT better for generation.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 5
  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('Why do transformers use "multi-head" attention instead of single attention?')
    .setPoints(1)
    .setChoices([
      q5.createChoice('A) To use more GPU memory', false),
      q5.createChoice('B) Different heads can learn different types of relationships (syntactic, semantic, etc.)', true),
      q5.createChoice('C) It\'s required for the math to work', false),
      q5.createChoice('D) To make training faster', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Multiple attention heads allow the model to attend to different aspects simultaneously. One head might learn subject-verb relationships, another might track pronouns to their antecedents, another might capture semantic similarity. The outputs are concatenated, giving richer representations.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 6
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('A model processes "The bank was steep and covered with flowers." What word should "bank" attend to most to get correct meaning?')
    .setPoints(1)
    .setChoices([
      q6.createChoice('A) "The" — it\'s the first word', false),
      q6.createChoice('B) "steep" and "flowers" — they indicate riverbank, not financial bank', true),
      q6.createChoice('C) "was" — it\'s the verb', false),
      q6.createChoice('D) Attention should be equal to all words', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('The meaning of "bank" is ambiguous (financial institution vs riverbank). "Steep" and "flowers" are context clues indicating the riverbank meaning. Effective attention should assign high weights to these disambiguating words, enabling the model to represent "bank" correctly.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 7
  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('What does positional encoding add to a transformer?')
    .setPoints(1)
    .setChoices([
      q7.createChoice('A) The sentiment of each word', false),
      q7.createChoice('B) Information about where each token is in the sequence', true),
      q7.createChoice('C) The part of speech of each word', false),
      q7.createChoice('D) The embedding dimension', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Unlike RNNs which inherently know position through sequential processing, transformers process all positions in parallel with no inherent sense of order. Positional encodings add information about each token\'s position (1st, 2nd, etc.) so the model can distinguish "dog bites man" from "man bites dog."')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 8
  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('A stakeholder asks why your chatbot sometimes "forgets" instructions given at the start of a long conversation. The best explanation is:')
    .setPoints(1)
    .setChoices([
      q8.createChoice('A) "The model has a limited working memory — about 3,000 words. In long conversations, early messages get pushed out. We can fix this by summarizing earlier context or using retrieval."', true),
      q8.createChoice('B) "The transformer architecture is fundamentally flawed."', false),
      q8.createChoice('C) "You need to repeat instructions because AI doesn\'t really understand."', false),
      q8.createChoice('D) "This is a bug we\'re working on fixing."', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Context window limits are a real architectural constraint, not a bug. The explanation correctly frames it as "working memory," uses an accessible word count, and offers practical solutions (summarization, retrieval). This helps stakeholders understand the limitation and know it\'s addressable.')
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
