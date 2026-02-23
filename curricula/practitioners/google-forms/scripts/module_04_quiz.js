/**
 * Module 4 Quiz: Logistic Regression
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
  var form = FormApp.create('Module 4 Quiz: Logistic Regression');
  
  // Enable quiz mode
  form.setIsQuiz(true);
  
  // Set description
  form.setDescription('Test your understanding. 8 questions, ~10 minutes.\nYou will see explanations after each answer.');
  
  // Question 1
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('Output Interpretation')
    .setPoints(1)
    .setChoices([
      q1.createChoice('A) The customer will definitely churn', false),
      q1.createChoice('B) The model estimates a 73% probability that the customer will churn', true),
      q1.createChoice('C) 73% of similar customers churned in the training data', false),
      q1.createChoice('D) The customer\'s features are 73% similar to churners', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Logistic regression outputs a probability between 0 and 1. An output of 0.73 means the model estimates a 73% chance of the positive class (churn). It\'s a probability, not a certainty.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 2
  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('Threshold Impact')
    .setPoints(1)
    .setChoices([
      q2.createChoice('A) Both precision and recall increase', false),
      q2.createChoice('B) Precision increases, recall decreases', false),
      q2.createChoice('C) Precision decreases, recall increases', true),
      q2.createChoice('D) Both precision and recall decrease', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Lowering the threshold means more customers get classified as "churn." This catches more actual churners (recall ↑) but also creates more false alarms (precision ↓). It\'s the fundamental precision-recall tradeoff.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 3
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('Imbalanced Classes')
    .setPoints(1)
    .setChoices([
      q3.createChoice('A) Yes, 97% accuracy is excellent', false),
      q3.createChoice('B) No, the model might just be predicting "no churn" for everyone', true),
      q3.createChoice('C) Yes, but only if precision is also high', false),
      q3.createChoice('D) No, because 3% churn rate is too low', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('With 3% churn rate, predicting "no churn" for every customer gives 97% accuracy — but catches zero churners! Accuracy is misleading for imbalanced classes. Check recall and precision instead.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 4
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('Confusion Matrix')
    .setPoints(1)
    .setChoices([
      q4.createChoice('A) 80%', true),
      q4.createChoice('B) 62%', false),
      q4.createChoice('C) 94%', false),
      q4.createChoice('D) 88%', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Recall = TP / (TP + FN) = 80 / (80 + 20) = 80/100 = 80% Recall answers: "Of all actual positives (churners), what fraction did we catch?"')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 5
  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('Metric Selection')
    .setPoints(1)
    .setChoices([
      q5.createChoice('A) Precision — minimize false positives', false),
      q5.createChoice('B) Recall — minimize false negatives', true),
      q5.createChoice('C) Accuracy — overall correctness', false),
      q5.createChoice('D) F1 — balance both', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Since false negatives ($10,000) are much more costly than false positives ($10), you should prioritize recall — catching as much fraud as possible, even if it means more false alarms.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 6
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('Coefficient Interpretation')
    .setPoints(1)
    .setChoices([
      q6.createChoice('A) Each ticket increases churn probability by 40%', false),
      q6.createChoice('B) Each ticket multiplies the odds of churning by about 1.5', true),
      q6.createChoice('C) Customers with 0.4 tickets are most likely to churn', false),
      q6.createChoice('D) Support tickets explain 40% of churn', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('In logistic regression, coefficients affect log-odds. The odds ratio is e^0.4 ≈ 1.49. So each additional support ticket multiplies the odds of churning by about 1.5 (50% higher odds).')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 7
  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('Model Selection')
    .setPoints(1)
    .setChoices([
      q7.createChoice('A) Perfect F1 score is achievable with the right threshold', false),
      q7.createChoice('B) There\'s an inherent limit to how well any threshold can perform', true),
      q7.createChoice('C) Logistic regression will fail completely', false),
      q7.createChoice('D) Accuracy will be higher than F1', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('When classes overlap, no decision boundary can perfectly separate them. There will always be some errors regardless of threshold. The best you can do is find the threshold that minimizes your cost function.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 8
  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('Business Communication')
    .setPoints(1)
    .setChoices([
      q8.createChoice('A) "It\'s 60% accurate"', false),
      q8.createChoice('B) "We catch 80% of churners, but 40% of our predictions are false alarms"', true),
      q8.createChoice('C) "The model is 80% confident"', false),
      q8.createChoice('D) "F1 is about 0.69"', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('This translates the metrics into actionable terms. Recall=0.80 means "we catch 80% of churners." Precision=0.60 means "60% of predictions are correct, so 40% are false alarms." This helps the PM understand the tradeoff.')
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
