/**
 * Module 8 Quiz: Regression Metrics
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
  var form = FormApp.create('Module 8 Quiz: Regression Metrics');
  
  // Enable quiz mode
  form.setIsQuiz(true);
  
  // Set description
  form.setDescription('Test your understanding. 8 questions, ~10 minutes.\nYou will see explanations after each answer.');
  
  // Question 1
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('You\'re comparing two models for predicting customer lifetime value:\n- Model A: MAE = $45, RMSE = $48\n- Model B: MAE = $50, RMSE = $90\n\nWhat does the large gap between MAE and RMSE in Model B suggest?')
    .setPoints(1)
    .setChoices([
      q1.createChoice('A) Model B is more accurate overall', false),
      q1.createChoice('B) Model B has some very large errors (outliers)', true),
      q1.createChoice('C) Model B is better for high-value customers', false),
      q1.createChoice('D) Model A is overfitting', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('When RMSE is much larger than MAE, it indicates the presence of large outlier errors. RMSE squares errors before averaging, so big mistakes get amplified. Model B\'s RMSE being nearly double its MAE suggests some predictions are far off, even though the average absolute error is only slightly higher than Model A.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 2
  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('Your LTV prediction model has R² = 0.85 on training data and R² = 0.40 on test data. What\'s happening?')
    .setPoints(1)
    .setChoices([
      q2.createChoice('A) The model is underfitting', false),
      q2.createChoice('B) The model is overfitting', true),
      q2.createChoice('C) The test data is from a different distribution', false),
      q2.createChoice('D) R² is unreliable for this problem', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('A large gap between training R² and test R² is the classic sign of overfitting. The model has memorized patterns in the training data that don\'t generalize. Solutions include regularization, fewer features, or more training data.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 3
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('You plot residuals vs. predicted values and see a clear U-shaped curve. What does this indicate?')
    .setPoints(1)
    .setChoices([
      q3.createChoice('A) The model has high variance', false),
      q3.createChoice('B) The model is missing non-linear relationships', true),
      q3.createChoice('C) There are outliers in the data', false),
      q3.createChoice('D) The model is biased toward high values', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('A curved pattern in residuals vs. predictions indicates the model is systematically wrong in a predictable way — it\'s missing non-linear relationships. The fix is to add polynomial features, use a different transformation, or switch to a model that captures non-linearity.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 4
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('Your model predicts house prices. Results:\n- R² = 0.95\n- MAE = $85,000\n- Average house price = $350,000\n\nA stakeholder says "95% accuracy — ship it!" How should you respond?')
    .setPoints(1)
    .setChoices([
      q4.createChoice('A) Agree — R² = 0.95 is excellent', false),
      q4.createChoice('B) Explain that R² isn\'t accuracy, and $85K error may be too large for the use case', true),
      q4.createChoice('C) Suggest switching to RMSE for a better measure', false),
      q4.createChoice('D) The model is overfitting, need more testing', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('R² measures variance explained, not prediction accuracy in the everyday sense. An MAE of $85K on $350K homes means typical errors are about 24% of the price — often too large for real estate decisions. Always pair R² with error metrics in business units and discuss whether the error magnitude is acceptable for the use case.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 5
  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('For a demand forecasting model, you\'re choosing between MAE and RMSE. Some products occasionally have 10x normal demand during promotions. Which metric should you optimize?')
    .setPoints(1)
    .setChoices([
      q5.createChoice('A) MAE — it\'s more robust to those spikes', false),
      q5.createChoice('B) RMSE — it will force the model to handle spikes better', true),
      q5.createChoice('C) R² — it\'s scale-independent', false),
      q5.createChoice('D) MAPE — percentage errors matter more for varying volumes', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('If accurately predicting demand spikes is important (e.g., to avoid stockouts during promotions), RMSE is better because it heavily penalizes large errors. Optimizing MAE would treat a 10x underestimate the same as 10 small errors, which isn\'t appropriate when big misses are costly. However, if spikes are rare and you want robust everyday predictions, MAE might be preferred.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 6
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('You\'re explaining model performance to executives. Which statement is most appropriate?')
    .setPoints(1)
    .setChoices([
      q6.createChoice('A) "The model achieves an R-squared of 0.78 with a root mean squared error of 42.5."', false),
      q6.createChoice('B) "Our predictions are typically within $43 of actual values, capturing about 78% of the variation in customer spending."', true),
      q6.createChoice('C) "The coefficient of determination indicates 78% explanatory power with residual standard error of 42.5."', false),
      q6.createChoice('D) "We minimize the L2 loss function to achieve optimal predictive accuracy."', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Business stakeholders need metrics translated into impact. "Within $43" is concrete and understandable; "78% of variation" gives context about model quality. The other options use technical jargon that obscures meaning.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 7
  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('Your residual plot shows a "fan shape" — residuals spread out as predicted values increase. What does this mean and how should you address it?')
    .setPoints(1)
    .setChoices([
      q7.createChoice('A) Model is overfitting; add regularization', false),
      q7.createChoice('B) Prediction variance increases with magnitude; consider log-transforming the target', true),
      q7.createChoice('C) Outliers are present; remove them', false),
      q7.createChoice('D) Model is underfitting; add more features', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('A fan-shaped residual plot indicates heteroscedasticity — errors get larger for larger predictions. This is common when predicting values that span orders of magnitude (like income or spending). Log-transforming the target variable often fixes this by stabilizing the variance.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 8
  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('Model A: R² = 0.70, MAE = $30\nModel B: R² = 0.85, MAE = $45\n\nFor a customer service budget allocation (where over-estimation wastes money and under-estimation causes complaints), which model would you prefer?')
    .setPoints(1)
    .setChoices([
      q8.createChoice('A) Model B — higher R² means better predictions', false),
      q8.createChoice('B) Model A — lower MAE means smaller average errors', false),
      q8.createChoice('C) Need more information about the error distribution and business costs', true),
      q8.createChoice('D) They\'re equivalent; R² and MAE measure the same thing', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('The "right" choice depends on the business context. If all errors are equally costly, Model A\'s lower MAE is better. If large errors are especially costly (causing major complaints), Model B\'s higher R² might indicate it captures important patterns. You\'d also want to know: Are errors symmetric? What\'s the cost of over vs. under estimation? The metrics alone don\'t answer these questions.')
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
