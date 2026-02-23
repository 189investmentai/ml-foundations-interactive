/**
 * Module 21 Quiz: MLOps
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
  var form = FormApp.create('Module 21 Quiz: MLOps');
  
  // Enable quiz mode
  form.setIsQuiz(true);
  
  // Set description
  form.setDescription('Test your understanding. 8 questions, ~10 minutes.\nYou will see explanations after each answer.');
  
  // Question 1
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('Your model worked perfectly yesterday but gives different results today with the same code. What\'s the most likely cause?')
    .setPoints(1)
    .setChoices([
      q1.createChoice('A) The computer is slower today', false),
      q1.createChoice('B) Random seeds weren\'t set, or data changed', true),
      q1.createChoice('C) Python updated automatically', false),
      q1.createChoice('D) The model is too complex', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Reproducibility failures usually stem from uncontrolled randomness (no fixed seeds) or data changes. Always set random seeds for all libraries (numpy, sklearn, etc.) and version your data to ensure reproducibility.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 2
  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('What should you include when saving a trained model for production?')
    .setPoints(1)
    .setChoices([
      q2.createChoice('A) Just the model file (.joblib or .pkl)', false),
      q2.createChoice('B) Model file + metadata (version, training date, metrics, features, threshold)', true),
      q2.createChoice('C) Only the code that trained it', false),
      q2.createChoice('D) Just the predictions it made', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Model artifacts need metadata for traceability. You need to know when it was trained, on what data, what metrics it achieved, and what configuration it uses. This enables debugging, comparison, and rollback.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 3
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('Why should configuration be externalized (in YAML/JSON files) rather than hardcoded?')
    .setPoints(1)
    .setChoices([
      q3.createChoice('A) It\'s faster to run', false),
      q3.createChoice('B) It allows changing parameters without modifying code, and tracks changes in version control', true),
      q3.createChoice('C) Python requires it', false),
      q3.createChoice('D) It makes the code shorter', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Externalized config separates parameters from logic. This means you can change hyperparameters, thresholds, or data paths without code changes, and config changes are tracked in version control for reproducibility.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 4
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('A colleague asks why you\'re spending time on "MLOps" instead of improving the model. The best response is:')
    .setPoints(1)
    .setChoices([
      q4.createChoice('A) "It\'s what everyone does"', false),
      q4.createChoice('B) "Without proper versioning and pipelines, we can\'t reliably deploy updates, debug issues, or roll back problems. This ensures our model improvements actually reach production safely."', true),
      q4.createChoice('C) "Management requires it"', false),
      q4.createChoice('D) "It\'s more interesting than modeling"', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('MLOps enables model improvements to reach production reliably. Without it, even great models can fail in deployment, cause incidents, or be impossible to debug. It\'s not overhead—it\'s infrastructure for delivering value.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 5
  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('What\'s the difference between batch and real-time model serving?')
    .setPoints(1)
    .setChoices([
      q5.createChoice('A) Batch is faster', false),
      q5.createChoice('B) Batch runs predictions on a schedule for many records; real-time responds to individual requests immediately', true),
      q5.createChoice('C) Real-time is only for neural networks', false),
      q5.createChoice('D) They\'re the same thing', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Batch prediction runs periodically (e.g., nightly) to score many records at once—good for marketing campaigns or reports. Real-time serving responds to individual requests with low latency—good for user-facing features like recommendations or fraud detection.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 6
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('Your requirements.txt just says "pandas" without a version. Why is this problematic?')
    .setPoints(1)
    .setChoices([
      q6.createChoice('A) It\'s not problematic', false),
      q6.createChoice('B) Different versions may be installed over time, potentially breaking your code', true),
      q6.createChoice('C) Pandas won\'t install without a version', false),
      q6.createChoice('D) It runs slower', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Without pinned versions, `pip install` grabs the latest version, which may differ across environments or over time. This can cause subtle bugs or outright failures. Always pin versions: `pandas==2.0.3`.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 7
  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('What information should an experiment log contain?')
    .setPoints(1)
    .setChoices([
      q7.createChoice('A) Just the final accuracy', false),
      q7.createChoice('B) Parameters, metrics, artifacts, code version, data version, and timestamp', true),
      q7.createChoice('C) Only the hyperparameters', false),
      q7.createChoice('D) Just the model file', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Complete experiment logs enable reproduction and comparison. You need to know what parameters were used, what results were achieved, which code and data versions were used, and when it ran. This makes it possible to reproduce or explain any experiment.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 8
  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('A production model is giving bad predictions. With good MLOps practices, you can:')
    .setPoints(1)
    .setChoices([
      q8.createChoice('A) Just retrain and hope it\'s better', false),
      q8.createChoice('B) Check the model version, compare to staging metrics, review recent data changes, and roll back if needed', true),
      q8.createChoice('C) Ask users to be patient', false),
      q8.createChoice('D) Blame the data team', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Good MLOps provides the audit trail needed to debug production issues. You can identify exactly what model is running, compare its metrics to testing, check if data changed, and quickly roll back to a known-good version if needed.')
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
