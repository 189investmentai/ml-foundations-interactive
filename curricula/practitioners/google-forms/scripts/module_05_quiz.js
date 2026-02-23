/**
 * Module 5 Quiz: Decision Trees
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
  var form = FormApp.create('Module 5 Quiz: Decision Trees');
  
  // Enable quiz mode
  form.setIsQuiz(true);
  
  // Set description
  form.setDescription('Test your understanding. 8 questions, ~10 minutes.\nYou will see explanations after each answer.');
  
  // Question 1
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('Overfitting Detection')
    .setPoints(1)
    .setChoices([
      q1.createChoice('A) The model is underfitting', false),
      q1.createChoice('B) The model is overfitting', true),
      q1.createChoice('C) The test set is too small', false),
      q1.createChoice('D) The features are not predictive', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('A large gap between train and test accuracy (95% vs 68% = 27% gap) is the classic sign of overfitting. The tree is memorizing training data, including noise, rather than learning generalizable patterns.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 2
  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('Fixing Overfitting')
    .setPoints(1)
    .setChoices([
      q2.createChoice('A) Add more features', false),
      q2.createChoice('B) Increase max_depth', false),
      q2.createChoice('C) Decrease max_depth', true),
      q2.createChoice('D) Remove training data', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Reducing max_depth limits the tree\'s complexity, preventing it from creating tiny regions that fit noise. This is the most direct way to reduce overfitting in decision trees.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 3
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('Gini Impurity')
    .setPoints(1)
    .setChoices([
      q3.createChoice('A) 0.18', true),
      q3.createChoice('B) 0.50', false),
      q3.createChoice('C) 0.10', false),
      q3.createChoice('D) 0.90', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Gini = 1 - p₀² - p₁² = 1 - (0.9)² - (0.1)² = 1 - 0.81 - 0.01 = 0.18 Low Gini (0.18) means the node is relatively pure — mostly one class.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 4
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('Why Trees Beat Logistic Regression')
    .setPoints(1)
    .setChoices([
      q4.createChoice('A) Classes separated by a diagonal line', false),
      q4.createChoice('B) Classes in a checkerboard/XOR pattern', true),
      q4.createChoice('C) Classes separated by a horizontal line', false),
      q4.createChoice('D) Classes that are completely overlapping', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('The XOR pattern (opposite corners are the same class) cannot be separated by a single line — logistic regression fails here. Trees naturally handle this with two perpendicular splits.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 5
  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('Feature Importance')
    .setPoints(1)
    .setChoices([
      q5.createChoice('A) X is 4.5x more correlated with the target', false),
      q5.createChoice('B) X contributes more to the tree\'s splitting decisions', true),
      q5.createChoice('C) Removing X will reduce accuracy by 45%', false),
      q5.createChoice('D) X appears in 45% of the tree nodes', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Feature importance in trees is based on how much each feature reduces impurity across all splits. Higher importance = more useful for separating classes. It doesn\'t directly translate to correlation or accuracy impact.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 6
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('Stakeholder Communication')
    .setPoints(1)
    .setChoices([
      q6.createChoice('A) "It uses recursive binary partitioning to minimize Gini impurity"', false),
      q6.createChoice('B) "It\'s a flowchart: if tenure < 30 days AND tickets > 2, high churn risk"', true),
      q6.createChoice('C) "It has a 78% accuracy score"', false),
      q6.createChoice('D) "The AUC-ROC is 0.82"', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Trees are interpretable as flowcharts. Translating the model into simple if-then rules is the best way to explain it to non-technical stakeholders. Metrics alone don\'t explain HOW the model works.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 7
  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('Choosing Complexity')
    .setPoints(1)
    .setChoices([
      q7.createChoice('A) Depth 3 — simplest model', false),
      q7.createChoice('B) Depth 6 — highest test accuracy', true),
      q7.createChoice('C) Depth 10 — highest train accuracy', false),
      q7.createChoice('D) Depth 1 — to avoid all overfitting', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Always optimize for test accuracy (generalization), not train accuracy. Depth 6 has the best test accuracy (74%). Depth 10 has high train accuracy but overfits (test drops to 69%).')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 8
  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('Limitation Awareness')
    .setPoints(1)
    .setChoices([
      q8.createChoice('A) Trees can only handle binary classification', false),
      q8.createChoice('B) Trees are more prone to overfitting', true),
      q8.createChoice('C) Trees cannot handle categorical features', false),
      q8.createChoice('D) Trees always have lower accuracy', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Trees can easily memorize training data if not constrained, leading to overfitting. Logistic regression has a simpler hypothesis space (linear boundary) that\'s harder to overfit. This is why trees usually need regularization (max_depth, min_samples).')
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
