/**
 * Module 11 Quiz: Regularization
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
  var form = FormApp.create('Module 11 Quiz: Regularization');
  
  // Enable quiz mode
  form.setIsQuiz(true);
  
  // Set description
  form.setDescription('Test your understanding. 8 questions, ~10 minutes.\nYou will see explanations after each answer.');
  
  // Question 1
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('Your linear regression model has high training accuracy but low test accuracy. What\'s happening and what\'s the likely fix?')
    .setPoints(1)
    .setChoices([
      q1.createChoice('A) Underfitting — reduce regularization', false),
      q1.createChoice('B) Overfitting — increase regularization', true),
      q1.createChoice('C) Data leakage — check features', false),
      q1.createChoice('D) Bad data — collect more samples', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('High train, low test is the classic sign of overfitting. The model memorized training data patterns that don\'t generalize. Increasing regularization constrains the model, preventing it from fitting noise.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 2
  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('You have 200 features but suspect only 20-30 matter. Which regularization should you try first?')
    .setPoints(1)
    .setChoices([
      q2.createChoice('A) L2 (Ridge) — it\'s more stable', false),
      q2.createChoice('B) L1 (Lasso) — it performs feature selection', true),
      q2.createChoice('C) No regularization — let the model decide', false),
      q2.createChoice('D) Elastic Net with l1_ratio=0', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('L1 (Lasso) naturally zeros out coefficients for unimportant features, effectively performing feature selection. This is exactly what you need when you suspect most features are irrelevant.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 3
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('You\'re using sklearn\'s LogisticRegression. To increase regularization, you should:')
    .setPoints(1)
    .setChoices([
      q3.createChoice('A) Increase the C parameter', false),
      q3.createChoice('B) Decrease the C parameter', true),
      q3.createChoice('C) Set penalty=\'none\'', false),
      q3.createChoice('D) Increase max_iter', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('In LogisticRegression, C = 1/λ, so higher C means LESS regularization. To increase regularization, decrease C. This is the opposite of Ridge/Lasso where higher alpha means more regularization.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 4
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('You apply L1 regularization and notice it randomly picks between two highly correlated features across different runs. What should you do?')
    .setPoints(1)
    .setChoices([
      q4.createChoice('A) Increase the regularization strength', false),
      q4.createChoice('B) Remove one of the correlated features manually', false),
      q4.createChoice('C) Switch to L2 or Elastic Net', true),
      q4.createChoice('D) This is fine — the model works', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('L1 arbitrarily picks one of correlated features because both provide similar information. This makes results unstable. L2 or Elastic Net distribute weight across correlated features, providing more stable coefficients.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 5
  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('You fit a Lasso model without scaling features. Which problem will likely occur?')
    .setPoints(1)
    .setChoices([
      q5.createChoice('A) Model won\'t converge', false),
      q5.createChoice('B) Features with larger scales get penalized more', true),
      q5.createChoice('C) All coefficients become zero', false),
      q5.createChoice('D) The model runs slower', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Regularization penalizes large weights. Without scaling, features with larger natural scales (e.g., income in dollars vs age in years) have different coefficient magnitudes. The penalty then affects them unequally, potentially removing important features just because of their scale.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 6
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('Your Ridge model with alpha=0.01 still overfits. What should you try?')
    .setPoints(1)
    .setChoices([
      q6.createChoice('A) Decrease alpha to 0.001', false),
      q6.createChoice('B) Increase alpha to 0.1 or higher', true),
      q6.createChoice('C) Switch to L1', false),
      q6.createChoice('D) Add more features', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Higher alpha = more regularization = simpler model = less overfitting. If alpha=0.01 still overfits, increase it. Use cross-validation to find the optimal value.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 7
  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('What does it mean when both training and test errors are high?')
    .setPoints(1)
    .setChoices([
      q7.createChoice('A) Overfitting — need more regularization', false),
      q7.createChoice('B) Underfitting — need less regularization or more features', true),
      q7.createChoice('C) Good generalization — the model is balanced', false),
      q7.createChoice('D) Data leakage — check the pipeline', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('When both train and test errors are high, the model is too simple to capture the underlying patterns — this is underfitting (high bias). Reduce regularization, add more features, or use a more complex model.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 8
  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('A stakeholder asks why you\'re constraining the model when it could fit better. The best explanation is:')
    .setPoints(1)
    .setChoices([
      q8.createChoice('A) "L2 regularization minimizes the sum of squared coefficients"', false),
      q8.createChoice('B) "We\'re preventing the model from being too confident about any single feature, which makes it more reliable on new data"', true),
      q8.createChoice('C) "Regularization adds a penalty term to the loss function"', false),
      q8.createChoice('D) "The bias-variance tradeoff requires us to limit model complexity"', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Business stakeholders need intuitive explanations, not technical definitions. Explaining that regularization prevents over-confidence and improves reliability on new data is concrete and meaningful. The other options are technically correct but not accessible.')
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
