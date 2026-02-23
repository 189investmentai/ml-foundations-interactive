/**
 * Module 22 Quiz: Monitoring
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
  var form = FormApp.create('Module 22 Quiz: Monitoring');
  
  // Enable quiz mode
  form.setIsQuiz(true);
  
  // Set description
  form.setDescription('Test your understanding. 8 questions, ~10 minutes.\nYou will see explanations after each answer.');
  
  // Question 1
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('Your churn model was 85% accurate at launch but is now 78% accurate. What type of drift is most likely?')
    .setPoints(1)
    .setChoices([
      q1.createChoice('A) Data drift only', false),
      q1.createChoice('B) Concept drift (the relationship between features and churn has changed)', true),
      q1.createChoice('C) Label drift only', false),
      q1.createChoice('D) No drift—this is normal variation', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('A 7% accuracy drop indicates concept drift—the relationship between inputs and outputs has changed. Data drift alone would show distributional changes but not necessarily affect accuracy if the underlying relationships held. Concept drift means what predicted churn before doesn\'t predict it as well now.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 2
  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('What does a high PSI (Population Stability Index > 0.25) indicate?')
    .setPoints(1)
    .setChoices([
      q2.createChoice('A) The model is more accurate', false),
      q2.createChoice('B) The feature distribution has significantly shifted from the reference period', true),
      q2.createChoice('C) The model should be rolled back immediately', false),
      q2.createChoice('D) Training was done incorrectly', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('PSI measures how much a distribution has changed from a reference (usually training data). PSI > 0.25 indicates significant distribution shift. This is a signal to investigate—it may or may not affect accuracy, but the data the model sees is different from what it was trained on.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 3
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('Your model predicts user churn, but you only know the true outcome 30 days later. How can you monitor model health in the meantime?')
    .setPoints(1)
    .setChoices([
      q3.createChoice('A) You can\'t—just wait for labels', false),
      q3.createChoice('B) Monitor proxy metrics (prediction distribution, feature drift, leading indicators)', true),
      q3.createChoice('C) Assume the model is fine', false),
      q3.createChoice('D) Retrain every day just in case', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('When ground truth is delayed, monitor leading indicators: prediction distributions (are they stable?), feature drift (is input data changing?), and proxy metrics (engagement, support tickets, other signals that correlate with churn). These give early warning even without labels.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 4
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('Your monitoring system sends 50 alerts per day and the team has started ignoring them. This is called:')
    .setPoints(1)
    .setChoices([
      q4.createChoice('A) Good coverage', false),
      q4.createChoice('B) Alert fatigue', true),
      q4.createChoice('C) Normal operations', false),
      q4.createChoice('D) Data drift', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Alert fatigue happens when too many alerts (especially false positives or low-priority issues) cause teams to ignore or deprioritize them. The fix is to tune thresholds, use severity levels appropriately, batch non-critical alerts, and ensure alerts are actionable.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 5
  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('A model predicts a user will churn, so you give them a discount. They don\'t churn. Was the prediction correct or did the intervention work?')
    .setPoints(1)
    .setChoices([
      q5.createChoice('A) The prediction was wrong', false),
      q5.createChoice('B) The intervention worked', false),
      q5.createChoice('C) You can\'t tell without a control group', true),
      q5.createChoice('D) The model needs retraining', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('This is the feedback loop problem. Without a holdout/control group that didn\'t receive interventions, you can\'t distinguish between "model was wrong" and "intervention changed the outcome." This is why A/B testing and causal inference are important for evaluating models that trigger actions.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 6
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('When should you retrain a model? (Select the best answer)')
    .setPoints(1)
    .setChoices([
      q6.createChoice('A) Every day to be safe', false),
      q6.createChoice('B) Only when users complain', false),
      q6.createChoice('C) When accuracy drops below threshold, significant drift is detected, or on a scheduled basis', true),
      q6.createChoice('D) Never—models should be stable', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Retraining should be triggered by specific conditions: accuracy degradation, detected drift, new data availability, or scheduled intervals. Daily retraining is wasteful and may introduce instability. Waiting for user complaints is too reactive—problems compound before they\'re noticed.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 7
  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('What\'s the difference between monitoring model metrics vs business metrics?')
    .setPoints(1)
    .setChoices([
      q7.createChoice('A) They\'re the same thing', false),
      q7.createChoice('B) Model metrics (accuracy, AUC) measure model quality; business metrics (revenue, retention) measure impact—both are needed', true),
      q7.createChoice('C) Only business metrics matter', false),
      q7.createChoice('D) Only model metrics matter', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Model metrics tell you if the model is technically correct. Business metrics tell you if it\'s delivering value. A model can have high accuracy but low business impact (wrong threshold, not actionable predictions). You need both: model metrics for technical health, business metrics for actual value.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 8
  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('A stakeholder asks why you spend time on monitoring instead of building new models. The best response is:')
    .setPoints(1)
    .setChoices([
      q8.createChoice('A) "It\'s standard practice"', false),
      q8.createChoice('B) "Monitoring catches problems before they impact users. A model that degrades unnoticed can cause more damage than not having a model at all. It protects our investment in the models we\'ve built."', true),
      q8.createChoice('C) "Management requires it"', false),
      q8.createChoice('D) "We don\'t actually need it"', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('This explains the value of monitoring in business terms: protecting investment, preventing user impact, and maintaining trust. Unmonitored models can silently degrade, leading to bad decisions, lost revenue, or damaged customer relationships.')
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
