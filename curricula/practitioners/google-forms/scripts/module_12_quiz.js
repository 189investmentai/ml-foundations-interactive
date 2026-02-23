/**
 * Module 12 Quiz: Embeddings
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
  var form = FormApp.create('Module 12 Quiz: Embeddings');
  
  // Enable quiz mode
  form.setIsQuiz(true);
  
  // Set description
  form.setDescription('Test your understanding. 8 questions, ~10 minutes.\nYou will see explanations after each answer.');
  
  // Question 1
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('A user searches for "password reset help" and your semantic search returns "how to change login credentials" as a top result, even though no words overlap. Why does this work?')
    .setPoints(1)
    .setChoices([
      q1.createChoice('A) The search engine matched synonyms from a dictionary', false),
      q1.createChoice('B) Both phrases have similar embeddings because they have similar meaning', true),
      q1.createChoice('C) The system used fuzzy string matching', false),
      q1.createChoice('D) Keywords were expanded using rules', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Embeddings capture semantic meaning, not just keywords. "Password reset help" and "change login credentials" end up with similar embedding vectors because they refer to the same concept, allowing semantic search to find relevant results without word overlap.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 2
  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('You\'re comparing support tickets to find duplicates. Which similarity metric should you use?')
    .setPoints(1)
    .setChoices([
      q2.createChoice('A) Euclidean distance — it\'s the most intuitive', false),
      q2.createChoice('B) Cosine similarity — it focuses on direction, not magnitude', true),
      q2.createChoice('C) Manhattan distance — it\'s more robust', false),
      q2.createChoice('D) Jaccard similarity — it compares word sets', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Cosine similarity measures the angle between vectors, ignoring magnitude. This is ideal for text embeddings because the direction captures meaning, while magnitude can vary based on encoding details. Two semantically identical texts should have similar directions even if their vector lengths differ.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 3
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('Your pre-trained embedding model doesn\'t cluster your company\'s internal project names well. What\'s likely the issue?')
    .setPoints(1)
    .setChoices([
      q3.createChoice('A) The embedding dimensions are too high', false),
      q3.createChoice('B) The model wasn\'t trained on your domain-specific terminology', true),
      q3.createChoice('C) Cosine similarity is the wrong metric', false),
      q3.createChoice('D) The model is overfitting', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Pre-trained models learn from general text (web, Wikipedia, etc.) and may not understand domain-specific terminology, acronyms, or internal jargon. Solutions include fine-tuning the model on your data or using a domain-specific model.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 4
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('You have embeddings from Model A (384 dimensions) and want to compare them with embeddings from Model B (768 dimensions). What should you do?')
    .setPoints(1)
    .setChoices([
      q4.createChoice('A) Pad the shorter embeddings with zeros', false),
      q4.createChoice('B) Truncate the longer embeddings', false),
      q4.createChoice('C) Re-encode all texts using the same model', true),
      q4.createChoice('D) Use a dimension-agnostic similarity metric', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Embeddings from different models live in different "spaces" and cannot be directly compared, regardless of dimensionality tricks. The only valid approach is to use the same model for all embeddings you want to compare.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 5
  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('Your nearest neighbor search returns many results with cosine similarity between 0.6-0.7. How should you interpret these?')
    .setPoints(1)
    .setChoices([
      q5.createChoice('A) These are excellent matches — very similar', false),
      q5.createChoice('B) These are somewhat related but not highly similar', true),
      q5.createChoice('C) These are essentially random matches', false),
      q5.createChoice('D) The embedding model is broken', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Cosine similarity of 0.6-0.7 indicates moderate relatedness. For high-quality matches (near-duplicates), you\'d want 0.9+. For clearly related content, 0.7-0.9. Values below 0.5 typically indicate different topics.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 6
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('You\'re visualizing embeddings with t-SNE and notice clear clusters. When you run t-SNE again, the clusters appear in different positions. Is this a problem?')
    .setPoints(1)
    .setChoices([
      q6.createChoice('A) Yes — the embeddings must be inconsistent', false),
      q6.createChoice('B) No — t-SNE positions are arbitrary, only relative distances matter', true),
      q6.createChoice('C) Yes — you should use PCA instead', false),
      q6.createChoice('D) No — t-SNE always produces different results', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('t-SNE is a non-linear dimensionality reduction technique. The absolute positions in 2D have no meaning — only the relative distances (nearby vs far) matter. The same data will cluster the same way; the clusters just might appear rotated or reflected.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 7
  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('You want to build a system that finds similar products based on their descriptions. What\'s the recommended approach?')
    .setPoints(1)
    .setChoices([
      q7.createChoice('A) Count word frequencies and compute Jaccard similarity', false),
      q7.createChoice('B) Encode descriptions with a sentence transformer and use cosine similarity', true),
      q7.createChoice('C) Use edit distance to compare descriptions', false),
      q7.createChoice('D) Extract named entities and match them', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Sentence transformers produce embeddings that capture semantic meaning of entire sentences/descriptions. Cosine similarity then finds products with similar meanings, even if they use different words. This is more robust than keyword-based approaches.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 8
  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('A stakeholder asks why two support tickets with the same issue get different embeddings. The best explanation is:')
    .setPoints(1)
    .setChoices([
      q8.createChoice('A) "The embedding model is inconsistent and needs retraining"', false),
      q8.createChoice('B) "Embeddings capture exact wording, so different phrasing produces different vectors — but similar issues will have similar vectors that cluster together"', true),
      q8.createChoice('C) "We should switch to keyword matching for consistency"', false),
      q8.createChoice('D) "Embeddings only work for short text"', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Embeddings capture the nuance of how something is said, not just the topic. Two tickets about the same issue with different phrasing will have similar (but not identical) embeddings. This is a feature, not a bug — it allows finding related content while preserving nuance.')
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
