/**
 * Module 6 Quiz: Ensemble Methods
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
  var form = FormApp.create('Module 6 Quiz: Ensemble Methods');
  
  // Enable quiz mode
  form.setIsQuiz(true);
  
  // Set description
  form.setDescription('Test your understanding. 8 questions, ~10 minutes.\nYou will see explanations after each answer.');
  
  // Question 1
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('Why Ensembles Work')
    .setPoints(1)
    .setChoices([
      q1.createChoice('A) Each tree is perfectly accurate', false),
      q1.createChoice('B) Individual random errors cancel out when averaged', true),
      q1.createChoice('C) More trees always mean more accuracy', false),
      q1.createChoice('D) Trees communicate during training', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Ensemble methods work because individual trees make different errors (due to different training samples and feature subsets). When averaged, these random errors tend to cancel out, leaving the signal. This is the "wisdom of crowds" effect.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 2
  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('Bagging vs Boosting')
    .setPoints(1)
    .setChoices([
      q2.createChoice('A) Random Forest trains sequentially, Boosting trains in parallel', false),
      q2.createChoice('B) Random Forest reduces bias, Boosting reduces variance', false),
      q2.createChoice('C) Random Forest reduces variance, Boosting reduces bias', true),
      q2.createChoice('D) Both methods are identical but named differently', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Random Forest (bagging) trains trees independently on different samples, which reduces variance by averaging out overfitting. Gradient Boosting trains trees sequentially, with each tree correcting prior errors, which reduces bias by building up model complexity.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 3
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('Overfitting in Boosting')
    .setPoints(1)
    .setChoices([
      q3.createChoice('A) Increase the number of rounds to 1000', false),
      q3.createChoice('B) Use early stopping', true),
      q3.createChoice('C) Remove features', false),
      q3.createChoice('D) Increase the learning rate', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('The large train-test gap (23%) indicates overfitting. Early stopping monitors validation loss and stops training when it stops improving, preventing the model from fitting noise. This is the standard fix for boosting overfitting.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 4
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('Diminishing Returns')
    .setPoints(1)
    .setChoices([
      q4.createChoice('A) Keep adding trees until you hit 90%', false),
      q4.createChoice('B) ~100 trees is sufficient; more gives diminishing returns', true),
      q4.createChoice('C) The model is broken because accuracy isn\'t increasing', false),
      q4.createChoice('D) Switch to boosting immediately', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('This is a classic diminishing returns curve. Going from 100 to 500 trees (5x compute) only adds 0.2% accuracy. For most applications, ~100 trees is the practical sweet spot balancing accuracy and training time.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 5
  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('Tree Depth in Boosting')
    .setPoints(1)
    .setChoices([
      q5.createChoice('A) Deep trees are computationally impossible', false),
      q5.createChoice('B) Each tree only needs to correct small residuals', true),
      q5.createChoice('C) Shallow trees are more accurate', false),
      q5.createChoice('D) It\'s a historical convention with no reason', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('In boosting, each tree is a "weak learner" that only needs to slightly improve on the previous ensemble. Deep trees would overfit to the current residuals. By using shallow trees and adding many of them, boosting builds complexity gradually and controllably.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 6
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('Feature Importance')
    .setPoints(1)
    .setChoices([
      q6.createChoice('A) X is 5x more correlated with the target', false),
      q6.createChoice('B) X contributed more to impurity reduction across all trees', true),
      q6.createChoice('C) Removing X will drop accuracy by 25%', false),
      q6.createChoice('D) X appears in 25% of all nodes', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Feature importance in tree ensembles is calculated based on how much each feature reduces impurity (Gini) across all splits in all trees. Higher importance means the feature was more useful for separating classes.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 7
  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('Model Selection')
    .setPoints(1)
    .setChoices([
      q7.createChoice('A) Start with a highly-tuned XGBoost model', false),
      q7.createChoice('B) Start with Random Forest with default parameters', true),
      q7.createChoice('C) Use a single decision tree for interpretability', false),
      q7.createChoice('D) Skip to neural networks for best accuracy', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Random Forest with defaults is the best starting point: it\'s robust, hard to mess up, provides good accuracy out-of-the-box, and requires minimal tuning. The team can always upgrade to Gradient Boosting later if they need more accuracy.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 8
  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('Stakeholder Communication')
    .setPoints(1)
    .setChoices([
      q8.createChoice('A) "It\'s called bagging and uses bootstrap aggregation"', false),
      q8.createChoice('B) "More models = more accuracy, always"', false),
      q8.createChoice('C) "Combining predictions from 100 rules gives more stable, accurate results than any single rule"', true),
      q8.createChoice('D) "Single models are outdated technology"', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('This explanation is accurate and accessible. It conveys the key insight (stability through aggregation) without jargon. It\'s honest about the tradeoff (100 rules vs 1) and explains why it\'s worth it.')
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
