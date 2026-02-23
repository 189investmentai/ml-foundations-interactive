/**
 * Module 2 Quiz: Data Leakage
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
  var form = FormApp.create('Module 2 Quiz: Data Leakage');
  
  // Enable quiz mode
  form.setIsQuiz(true);
  
  // Set description
  form.setDescription('Test your understanding. 10 questions, ~12 minutes.\nYou will see explanations after each answer.');
  
  // Question 1
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('Leakage Detection')
    .setPoints(1)
    .setChoices([
      q1.createChoice('A) No, high importance means it\'s predictive', false),
      q1.createChoice('B) Yes, this feature uses future information you won\'t have at prediction time', true),
      q1.createChoice('C) Only if the coefficient is negative', false),
      q1.createChoice('D) Only if correlation with target exceeds 0.9', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('"Days until cancel" requires knowing WHEN the customer will cancel — information you can\'t have at prediction time. This is classic target leakage: the feature is derived from the very thing you\'re trying to predict. High importance (A) is a red flag here, not a good sign. The correlation threshold (D) doesn\'t matter if the feature is fundamentally unavailable at prediction time.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 2
  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('The Timeline Test')
    .setPoints(1)
    .setChoices([
      q2.createChoice('A) Number of orders in the last 30 days (Dec 16 - Jan 15)', true),
      q2.createChoice('B) Number of orders this month (Jan 1 - Jan 31)', false),
      q2.createChoice('C) Average monthly orders over the past year (Jan 15 2023 - Jan 15 2024)', false),
      q2.createChoice('D) Customer satisfaction score from their post-cancellation survey', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Option A uses only data from BEFORE the prediction date.  Option B includes future data (Jan 16-31). Option C seems okay but check the end date — if "past year" means Jan 15 2024, it might be safe, but the phrasing is ambiguous. Option D is obviously leakage — you can\'t have post-cancellation data before cancellation. Always apply the timeline test: draw a line at prediction day, features come fro')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 3
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('Preprocessing Leakage')
    .setPoints(1)
    .setChoices([
      q3.createChoice('A) Fit the scaler on all data, then split into train/test', false),
      q3.createChoice('B) Fit the scaler on training data only, transform both train and test', true),
      q3.createChoice('C) Fit separate scalers on train and test', false),
      q3.createChoice('D) Standardization doesn\'t matter for leakage', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Fitting on all data (A) leaks test set statistics into training. You\'re using future information (test set mean/std) to transform training data. Separate scalers (C) would create distribution mismatches between train and test. The correct approach: fit on train, then use those parameters to transform both train and test. Same principle applies to imputation, encoding, and any data-dependent transf')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 4
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('Feature Engineering Leakage')
    .setPoints(1)
    .setChoices([
      q4.createChoice('A) Total spend / Total orders (lifetime)', false),
      q4.createChoice('B) Total spend as of prediction date / Orders as of prediction date', true),
      q4.createChoice('C) Total spend / Orders, excluding the prediction month', false),
      q4.createChoice('D) All of the above are equivalent', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Option A uses lifetime data, which includes future orders. Option C explicitly excludes prediction month data but the phrasing "excluding" might still include data after the prediction date depending on implementation. Option B is safest: explicitly compute as-of the prediction date, including only data from before that point. The key is point-in-time computation.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 5
  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('Split Strategy')
    .setPoints(1)
    .setChoices([
      q5.createChoice('A) Random 80/20 split across all months', false),
      q5.createChoice('B) Train on Jan-Sep 2023, test on Oct-Dec 2023', true),
      q5.createChoice('C) 5-fold cross-validation with random folds', false),
      q5.createChoice('D) Train on even months, test on odd months', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('For temporal data, use time-based splits. Random splits (A, C) allow future patterns to leak into training. Alternating months (D) also causes leakage — you\'d train on December while testing on November. Train on earlier periods, test on later periods. This simulates the actual deployment scenario where you train on past data to predict the future.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 6
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('Red Flag Recognition')
    .setPoints(1)
    .setChoices([
      q6.createChoice('A) Celebrate and deploy immediately', false),
      q6.createChoice('B) Audit features for potential leakage', true),
      q6.createChoice('C) Try an even more complex model', false),
      q6.createChoice('D) Add more features to push AUC higher', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Unrealistically high performance is the #1 sign of data leakage. Before celebrating, systematically check each feature: "Would I have this exact value at prediction time?" Common culprits: target-derived features, future aggregations, or features that encode the outcome directly.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 7
  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('Production vs. Test Gap')
    .setPoints(1)
    .setChoices([
      q7.createChoice('A) The production hardware is slower', false),
      q7.createChoice('B) Data leakage that inflated test performance', true),
      q7.createChoice('C) Users behave differently on weekends', false),
      q7.createChoice('D) The model needs retraining', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('A 23-point gap between test and production is a classic leakage pattern. The model learned patterns that existed in test data but aren\'t available in production. Common scenarios: features computed differently in production, data that exists in batch but not real-time, or train/test contamination. Weekend behavior (C) and model staleness (D) cause gradual degradation, not sudden large gaps.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 8
  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('Prevention Strategy')
    .setPoints(1)
    .setChoices([
      q8.createChoice('A) Yes, signup_date is historical data', false),
      q8.createChoice('B) No, because signup_date might be missing', false),
      q8.createChoice('C) It depends — "today" must be the prediction date, not the current date', true),
      q8.createChoice('D) Only if tenure is less than 365 days', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('If "today" means the date the code runs (e.g., when generating training data), you\'re using future information. Tenure should be computed as `prediction_date - signup_date`, where prediction_date is the point-in-time when the prediction would be made. This is a subtle but common bug: running feature engineering code today to generate training labels from last year, but using today\'s date in calcul')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 9
  var q9 = form.addMultipleChoiceItem();
  q9.setTitle('Code Debugging 🔧')
    .setPoints(1)
    .setChoices([
      q9.createChoice('A) Line A — tenure calculation', false),
      q9.createChoice('B) Line B — orders in last 90 days', false),
      q9.createChoice('C) Line C — total lifetime spend', true),
      q9.createChoice('D) Line D — support tickets', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('`get_lifetime_spend()` returns ALL-TIME spend, which includes purchases AFTER the prediction date.  For a Jan 1 prediction:; Customer who doesn\'t churn → keeps buying in Feb, March → higher total_spend; Customer who churns → stops buying → lower total_spend The feature encodes the outcome it\'s supposed to predict. **Why other lines are safe:**; (A) Tenure as of prediction date uses only signup_dat')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 10
  var q10 = form.addMultipleChoiceItem();
  q10.setTitle('Severity Assessment')
    .setPoints(1)
    .setChoices([
      q10.createChoice('A) Minor — high correlation means it\'s predictive', false),
      q10.createChoice('B) Moderate — 10-15% AUC drop expected', false),
      q10.createChoice('C) Severe — model will likely fail in production', true),
      q10.createChoice('D) None — correlation doesn\'t indicate leakage', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('A feature with 0.95 correlation to target AND 45% importance is almost certainly leaking. At 0.95 correlation, the feature is essentially the target itself (or derived from it). When this feature is unavailable in production, the model loses its primary signal and will perform close to random. Expected impact:; Current AUC: ~0.95 (inflated); Production AUC: ~0.55-0.65 (baseline-ish); Drop: 30-40 p')
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
