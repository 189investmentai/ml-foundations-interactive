/**
 * Module 1 Quiz: The ML Map
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
  var form = FormApp.create('Module 1 Quiz: The ML Map');
  
  // Enable quiz mode
  form.setIsQuiz(true);
  
  // Set description
  form.setDescription('Test your understanding. 8 questions, ~10 minutes.\nYou will see explanations after each answer.');
  
  // Question 1
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('Pipeline Stage Identification 🔀')
    .setPoints(1)
    .setChoices([
      q1.createChoice('A) Model Training — the model is underfitting', false),
      q1.createChoice('B) Data/Features — there\'s likely data leakage', true),
      q1.createChoice('C) Deployment — the production code is buggy', false),
      q1.createChoice('D) Evaluation — the test metric was calculated wrong', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('A huge gap between test performance and production performance is the classic sign of data leakage. The model had access to information during training that won\'t be available in production. Common causes:; Using future data in features; Improper train/test split; Preprocessing leakage (fitting scaler on all data) **Why other answers are wrong:**; (A) Underfitting would show poor performance on BO')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 2
  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('Problem Framing 🔀')
    .setPoints(1)
    .setChoices([
      q2.createChoice('A) "Which algorithm should I use?"', false),
      q2.createChoice('B) "How much historical data do we have?"', false),
      q2.createChoice('C) "What exactly counts as churned, and when do we need the prediction?"', true),
      q2.createChoice('D) "What features are available?"', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Before anything else, you need to define the target precisely. "Churned" could mean:; Cancelled subscription; Inactive for 30 days  ; No purchase in 90 days; Downgraded plan And timing matters: predicting churn AFTER they\'ve left is useless. **Why other answers are wrong:**; (A) Algorithm choice comes LAST, after data and features are understood; (B) Data volume matters, but you can\'t assess "enou')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 3
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('Split Strategy')
    .setPoints(1)
    .setChoices([
      q3.createChoice('A) Random 80/20 split', false),
      q3.createChoice('B) Stratified random split by customer segment', false),
      q3.createChoice('C) Time-based split: train on past, test on future', true),
      q3.createChoice('D) K-fold cross-validation with random folds', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('For temporal data (time series, transactions over time), you MUST use time-based splits. Random splits (A, D) allow information from the future to leak into training. Stratified splits (B) help with class balance but don\'t solve the temporal leakage problem. The test set should simulate the actual future you\'re trying to predict.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 4
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('Baseline Importance')
    .setPoints(1)
    .setChoices([
      q4.createChoice('A) You need to try more hyperparameters first', false),
      q4.createChoice('B) You need to compare to a baseline (random, heuristic, simpler model)', true),
      q4.createChoice('C) AUC isn\'t the right metric — use accuracy instead', false),
      q4.createChoice('D) You need more training data', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Without a baseline, you can\'t know if 0.75 is good. If random guessing achieves 0.50 and a simple "customers with no orders in 30 days" heuristic achieves 0.72, then your model adds only marginal value over a free heuristic. Always establish baselines: (1) random/majority class, (2) business heuristic, (3) simple model before declaring success.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 5
  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('Debugging Priority')
    .setPoints(1)
    .setChoices([
      q5.createChoice('A) Try a more complex model', false),
      q5.createChoice('B) Collect more training data', false),
      q5.createChoice('C) Check for data leakage or improper train/test split', true),
      q5.createChoice('D) Tune hyperparameters', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('A 40-point gap between train and test is a red flag for overfitting OR improper evaluation. Before adding complexity (A), data (B), or tuning (D), verify that your train/test split is correct and there\'s no leakage. The debugging flow starts with data and splitting issues, not model issues.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 6
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('Metric Selection')
    .setPoints(1)
    .setChoices([
      q6.createChoice('A) Maximize accuracy', false),
      q6.createChoice('B) Maximize AUC-ROC', false),
      q6.createChoice('C) Optimize threshold using cost-weighted analysis', true),
      q6.createChoice('D) Maximize recall regardless of precision', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('When false positive and false negative costs differ significantly, you need cost-weighted evaluation. Pure accuracy (A) treats all errors equally. AUC (B) summarizes across all thresholds but doesn\'t pick one. Maximizing recall (D) ignores the $10 FP cost entirely. The optimal threshold balances the asymmetric costs: threshold ≈ Cost(FP) / (Cost(FP) + Cost(FN)) = 10 / 1010 ≈ 0.01.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 7
  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('Feature Suspicion')
    .setPoints(1)
    .setChoices([
      q7.createChoice('A) This feature is legitimately very predictive', false),
      q7.createChoice('B) The feature likely contains future information (leakage)', true),
      q7.createChoice('C) The model is now overfitting', false),
      q7.createChoice('D) The AUC calculation is wrong', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('A single feature causing a massive jump to near-perfect performance is a red flag for leakage. "Lifetime value" likely includes future purchases that happen AFTER the prediction point. At prediction time, you wouldn\'t know their full lifetime value. Always ask: "Would I have this exact value at prediction time?"')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 8
  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('Deployment Readiness')
    .setPoints(1)
    .setChoices([
      q8.createChoice('A) A/B testing framework', false),
      q8.createChoice('B) Monitoring for data drift and model performance', true),
      q8.createChoice('C) Automatic retraining pipeline', false),
      q8.createChoice('D) Load balancing for high traffic', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Without monitoring, you won\'t know when the model starts failing. Data distributions change, user behavior shifts, and model performance degrades silently. Monitoring catches these issues before they cause business damage. A/B testing (A) is valuable but optional. Automatic retraining (C) helps but only if you know WHEN to retrain. Load balancing (D) is infrastructure, not ML-specific.')
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
