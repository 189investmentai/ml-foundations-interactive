/**
 * Module 9 Quiz: Classification Metrics
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
  var form = FormApp.create('Module 9 Quiz: Classification Metrics');
  
  // Enable quiz mode
  form.setIsQuiz(true);
  
  // Set description
  form.setDescription('Test your understanding. 8 questions, ~10 minutes.\nYou will see explanations after each answer.');
  
  // Question 1
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('Your fraud detection model on imbalanced data (2% fraud) shows:\n- Accuracy: 98%\n- Precision: 50%\n- Recall: 10%\n\nWhat does this tell you?')
    .setPoints(1)
    .setChoices([
      q1.createChoice('A) The model is excellent — 98% accuracy!', false),
      q1.createChoice('B) The model is nearly useless — it catches only 10% of fraud despite high accuracy', true),
      q1.createChoice('C) The 50% precision means half of all transactions are flagged as fraud', false),
      q1.createChoice('D) The model is overfitting', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('With 2% fraud, predicting "not fraud" for everyone gives 98% accuracy. This model catches only 10% of actual fraud (recall). The 50% precision means half of flagged transactions are real fraud, but with such low recall, most fraud goes undetected. High accuracy is meaningless here.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 2
  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('A marketing team can afford to contact 1,000 predicted churners per month. Your model predicts 5,000 customers will churn. What metric matters most?')
    .setPoints(1)
    .setChoices([
      q2.createChoice('A) Overall accuracy', false),
      q2.createChoice('B) Recall', false),
      q2.createChoice('C) Precision at 1,000 (Precision@K)', true),
      q2.createChoice('D) F1 score', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('With a capacity constraint of 1,000 contacts, you\'ll take the top 1,000 predictions by probability. What matters is: of those 1,000, how many are actual churners? That\'s Precision@K. High recall is nice but irrelevant if you can only act on 1,000.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 3
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('You\'re building a medical screening test for a rare but serious disease. Which metric should you prioritize?')
    .setPoints(1)
    .setChoices([
      q3.createChoice('A) Precision — avoid scaring healthy people', false),
      q3.createChoice('B) Recall — don\'t miss anyone with the disease', true),
      q3.createChoice('C) F1 — balance both', false),
      q3.createChoice('D) Accuracy — maximize correct predictions', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('For medical screening (not diagnosis), the cost of missing someone with a serious disease far outweighs the cost of follow-up tests on healthy people. High recall is critical. A separate diagnostic test with high precision can be used for those who screen positive.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 4
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('Moving your classification threshold from 0.5 to 0.3 will typically:')
    .setPoints(1)
    .setChoices([
      q4.createChoice('A) Increase precision and decrease recall', false),
      q4.createChoice('B) Decrease precision and increase recall', true),
      q4.createChoice('C) Increase both precision and recall', false),
      q4.createChoice('D) Have no effect on precision or recall', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('A lower threshold means more samples are predicted positive. More positives → you catch more true positives (higher recall) but also more false positives (lower precision). This is the fundamental precision-recall tradeoff.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 5
  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('Your model has:\n- ROC-AUC: 0.92\n- PR-AUC: 0.45\n\nThe data is highly imbalanced (1% positive class). What does this suggest?')
    .setPoints(1)
    .setChoices([
      q5.createChoice('A) The model is excellent — 0.92 AUC is great', false),
      q5.createChoice('B) ROC-AUC is inflated by the large negative class; the model struggles with positives', true),
      q5.createChoice('C) There\'s a bug in the PR-AUC calculation', false),
      q5.createChoice('D) The model needs more training data', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('On highly imbalanced data, ROC-AUC can be deceivingly high because it\'s dominated by the large negative class (lots of true negatives inflate the curve). PR-AUC focuses on the positive class and reveals the model\'s true weakness. A PR-AUC of 0.45 on 1% positive rate isn\'t necessarily bad, but the gap shows ROC-AUC was overly optimistic.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 6
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('The cost of a false positive (FP) is $50 (wasted marketing). The cost of a false negative (FN) is $500 (lost customer). What\'s the optimal threshold?')
    .setPoints(1)
    .setChoices([
      q6.createChoice('A) 0.50', false),
      q6.createChoice('B) 0.91', false),
      q6.createChoice('C) 0.09', true),
      q6.createChoice('D) 0.10', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Optimal threshold = Cost(FP) / (Cost(FP) + Cost(FN)) = 50 / (50 + 500) = 50/550 ≈ 0.09. Since FN is much more costly, we should be aggressive (low threshold) to catch more positives, accepting more false positives.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 7
  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('Which statement about F1 score is correct?')
    .setPoints(1)
    .setChoices([
      q7.createChoice('A) F1 is always better than accuracy for imbalanced data', false),
      q7.createChoice('B) F1 assumes precision and recall are equally important', true),
      q7.createChoice('C) F1 is the arithmetic mean of precision and recall', false),
      q7.createChoice('D) F1 is threshold-independent like AUC', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('F1 is the harmonic mean (not arithmetic) of precision and recall, which implicitly weights them equally. If your business values one over the other, F1 may not be the right choice. F1 is also threshold-dependent — it\'s calculated at a specific threshold.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 8
  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('A stakeholder asks: "What does AUC = 0.85 mean in plain English?" The best response is:')
    .setPoints(1)
    .setChoices([
      q8.createChoice('A) "The model is 85% accurate"', false),
      q8.createChoice('B) "If we randomly pick one churner and one non-churner, the model ranks the churner higher 85% of the time"', true),
      q8.createChoice('C) "85% of our predictions are correct"', false),
      q8.createChoice('D) "The model catches 85% of churners"', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('AUC measures the probability that a randomly chosen positive example is ranked higher than a randomly chosen negative example. It\'s about ranking ability, not accuracy or recall. This explanation makes it intuitive for non-technical stakeholders.')
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
