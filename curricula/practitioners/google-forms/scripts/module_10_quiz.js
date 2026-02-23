/**
 * Module 10 Quiz: Feature Engineering
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
  var form = FormApp.create('Module 10 Quiz: Feature Engineering');
  
  // Enable quiz mode
  form.setIsQuiz(true);
  
  // Set description
  form.setDescription('Test your understanding. 8 questions, ~10 minutes.\nYou will see explanations after each answer.');
  
  // Question 1
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('You\'re building a churn model to predict who will cancel next month. Which feature has data leakage?')
    .setPoints(1)
    .setChoices([
      q1.createChoice('A) Number of support tickets in the last 30 days', false),
      q1.createChoice('B) Whether the customer requested a cancellation', true),
      q1.createChoice('C) Average monthly spend over the past year', false),
      q1.createChoice('D) Days since last login', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('"Whether the customer requested a cancellation" is essentially the target — it directly indicates they\'re about to churn. The other features describe past behavior that would be available at prediction time.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 2
  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('You have a "revenue" column that is heavily right-skewed (most values small, some very large). Which transformation is most appropriate?')
    .setPoints(1)
    .setChoices([
      q2.createChoice('A) Standardization (z-score)', false),
      q2.createChoice('B) Min-max scaling', false),
      q2.createChoice('C) Log transformation', true),
      q2.createChoice('D) One-hot encoding', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Log transformation compresses the range of heavily right-skewed data, making the distribution more symmetric. Standardization and min-max still preserve the skew. One-hot is for categorical data.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 3
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('You fit a StandardScaler on your full dataset, then split into train/test. What\'s wrong?')
    .setPoints(1)
    .setChoices([
      q3.createChoice('A) Nothing — this is the correct approach', false),
      q3.createChoice('B) The scaler should be fit only on training data to avoid test data leakage', true),
      q3.createChoice('C) StandardScaler shouldn\'t be used before splitting', false),
      q3.createChoice('D) The test set should be scaled differently', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Fitting the scaler on all data means test set statistics influence the transformation. This leaks information from test to train. Always fit transformations on training data only, then apply to test.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 4
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('You have a "city" column with 5,000 unique values. What\'s the best encoding approach?')
    .setPoints(1)
    .setChoices([
      q4.createChoice('A) One-hot encoding — it preserves all information', false),
      q4.createChoice('B) Ordinal encoding — assign 1-5000', false),
      q4.createChoice('C) Target encoding with cross-validation', true),
      q4.createChoice('D) Drop the column — too many values', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('One-hot encoding creates 5,000 columns — computationally expensive and causes sparsity. Ordinal encoding implies false ordering. Target encoding replaces each city with its average target value, compressing to one column. Use CV to prevent leakage.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 5
  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('You\'re creating a feature "total_orders" by counting all orders for each user. You\'ll use this to predict churn next week. What\'s the issue?')
    .setPoints(1)
    .setChoices([
      q5.createChoice('A) No issue — total orders is a valid feature', false),
      q5.createChoice('B) The aggregation might include future orders (after the prediction date)', true),
      q5.createChoice('C) Counts should always be log-transformed', false),
      q5.createChoice('D) You should use median instead of sum', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('If you count ALL orders without a time filter, you include orders that happen after your prediction point — future leakage. You need: `total_orders_before_cutoff` that only counts orders up to the prediction date.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 6
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('For a linear regression predicting house prices, which features MOST need scaling?')
    .setPoints(1)
    .setChoices([
      q6.createChoice('A) number_of_rooms (range 1-10) and square_feet (range 500-5000)', true),
      q6.createChoice('B) has_garage (0 or 1) and has_pool (0 or 1)', false),
      q6.createChoice('C) neighborhood_type (A, B, C) after one-hot encoding', false),
      q6.createChoice('D) All of the above equally', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Features with very different scales affect linear model coefficients. square_feet (500-5000) would dominate number_of_rooms (1-10) without scaling. Binary features (0/1) and one-hot encoded features are already on the same scale.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 7
  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('Which statement about tree-based models and feature engineering is correct?')
    .setPoints(1)
    .setChoices([
      q7.createChoice('A) Trees require all features to be scaled', false),
      q7.createChoice('B) Trees can handle missing values natively', true),
      q7.createChoice('C) Trees require one-hot encoding for all categorical features', false),
      q7.createChoice('D) Trees cannot learn interaction effects', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Tree-based models (Random Forest, XGBoost, etc.) handle missing values by finding optimal split points around them. They also don\'t require scaling and can use ordinal encoding for categories. Trees naturally capture interactions through splits.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 8
  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('You create `revenue_per_visit = revenue / visits`. Some users have 0 visits. What should you do?')
    .setPoints(1)
    .setChoices([
      q8.createChoice('A) Replace with 0 — no visits means no revenue per visit', false),
      q8.createChoice('B) Replace with the mean revenue_per_visit', false),
      q8.createChoice('C) Add a small constant: revenue / (visits + 1)', false),
      q8.createChoice('D) Create a flag for zero visits and fill with median', true),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Division by zero creates infinity. Replacing with 0 loses information about revenue. Adding 1 artificially changes ratios for everyone. Best practice: create a binary flag `has_visits` and fill zero-visit cases with a sensible default (like median) for the ratio.')
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
