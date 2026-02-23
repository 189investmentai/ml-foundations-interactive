/**
 * Module 3 Quiz: Linear Regression
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
  var form = FormApp.create('Module 3 Quiz: Linear Regression');
  
  // Enable quiz mode
  form.setIsQuiz(true);
  
  // Set description
  form.setDescription('Test your understanding. 8 questions, ~10 minutes.\nYou will see explanations after each answer.');
  
  // Question 1
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('Coefficient Interpretation')
    .setPoints(1)
    .setChoices([
      q1.createChoice('A) Customers with 12.5 months tenure spend the most', false),
      q1.createChoice('B) For each additional month of tenure, expected spend increases by $12.50, holding other features constant', true),
      q1.createChoice('C) 12.5% of spend is explained by tenure', false),
      q1.createChoice('D) The model needs 12.5 months of data to work', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Coefficients in linear regression represent the marginal effect—the expected change in Y for a 1-unit change in X, assuming other features stay constant. The coefficient 12.5 means "each additional month of tenure is associated with $12.50 more spend, all else equal." Option A confuses the coefficient with an optimal value. Option C confuses it with R². Option D is nonsensical.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 2
  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('Train-Test Gap')
    .setPoints(1)
    .setChoices([
      q2.createChoice('A) The model is underfitting', false),
      q2.createChoice('B) The model is overfitting', true),
      q2.createChoice('C) The features are not predictive', false),
      q2.createChoice('D) The test data is corrupted', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('A large gap between train and test performance indicates overfitting—the model memorized training patterns that don\'t generalize.  Underfitting (A) would show low R² on *both* train and test. If features weren\'t predictive (C), train R² would also be low. Corrupted test data (D) is possible but unlikely compared to the common overfitting pattern.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 3
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('Residual Patterns')
    .setPoints(1)
    .setChoices([
      q3.createChoice('A) The model is well-calibrated', false),
      q3.createChoice('B) There\'s heteroscedasticity', false),
      q3.createChoice('C) The relationship is non-linear', true),
      q3.createChoice('D) Outliers are present', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Patterns in residual plots indicate systematic errors. A U-shape (or any curve) suggests the true relationship is non-linear—a straight line can\'t capture the curve, so it consistently under/over-predicts in certain ranges. Heteroscedasticity (B) would show residuals fanning out (wider spread at higher values). Outliers (D) would show isolated extreme points, not a pattern.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 4
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('Reporting to Stakeholders')
    .setPoints(1)
    .setChoices([
      q4.createChoice('A) RMSE, because it\'s more mathematically rigorous', false),
      q4.createChoice('B) MAE, because it\'s easier to interpret and more robust to outliers', true),
      q4.createChoice('C) Report both without context', false),
      q4.createChoice('D) Neither—report R² instead', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('MAE is directly interpretable: "predictions are off by $35 on average." It\'s easier for non-technical stakeholders to understand and isn\'t inflated by outliers. RMSE (A) is useful internally but harder to explain ("the square root of the average squared error"). Reporting both without context (C) confuses people. R² (D) doesn\'t answer "how many dollars off" — it answers "how much variance explaine')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 5
  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('Comparing Coefficients')
    .setPoints(1)
    .setChoices([
      q5.createChoice('A) Yes, larger coefficient means more important', false),
      q5.createChoice('B) No, coefficients depend on feature scale—you need standardized coefficients', true),
      q5.createChoice('C) No, you need p-values to compare importance', false),
      q5.createChoice('D) Yes, but only if R² is above 0.5', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Raw coefficients depend on units. If orders range 1-10 but logins range 1-100, the per-unit effect differs by scale. To compare importance fairly, standardize features first (subtract mean, divide by std), then compare coefficients. P-values (C) tell you statistical significance, not relative importance. R² (D) is irrelevant to comparing individual features.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 6
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('Wrong Problem Type')
    .setPoints(1)
    .setChoices([
      q6.createChoice('A) Yes, 95% explained variance is excellent', false),
      q6.createChoice('B) No, linear regression isn\'t appropriate for binary targets', true),
      q6.createChoice('C) Only if MAE is also low', false),
      q6.createChoice('D) Only if the coefficients are all positive', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Churn (yes/no) is a binary classification problem. Linear regression can predict values outside 0-1, violates assumptions for binary data, and doesn\'t produce proper probabilities. Use logistic regression instead. The high R² might even be a sign of data leakage (e.g., using `cancel_reason` as a feature to predict churn).')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 7
  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('Adding Features')
    .setPoints(1)
    .setChoices([
      q7.createChoice('A) Deploy the new model—higher is better', false),
      q7.createChoice('B) Check R² on test data to see if improvement generalizes', true),
      q7.createChoice('C) Add 10 more features', false),
      q7.createChoice('D) Remove features with small coefficients', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Training R² always increases (or stays the same) with more features—even random noise features can slightly improve train R². The real test is whether test R² improves, indicating genuine predictive power rather than overfitting. Never deploy (A) without checking generalization. Adding more features (C) compounds the problem. Removing features by coefficient size (D) is unreliable without standard')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 8
  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('Explainability')
    .setPoints(1)
    .setChoices([
      q8.createChoice('A) "Because R² is 0.8"', false),
      q8.createChoice('B) "The model is 80% confident"', false),
      q8.createChoice('C) "Based on their tenure (24 months) and order history (15 orders), the formula estimates $500"', true),
      q8.createChoice('D) "Neural networks work in mysterious ways"', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Linear regression is interpretable—you can trace predictions back to feature contributions. Saying "24 months tenure contributes $300, 15 orders contribute $150, baseline is $50, total = $500" provides actionable insight. R² (A) doesn\'t explain individual predictions. "80% confident" (B) isn\'t what R² means. "Mysterious ways" (D) is literally the opposite of linear regression\'s strength.')
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
