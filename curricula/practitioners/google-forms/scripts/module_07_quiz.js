/**
 * Module 7 Quiz: Optimization
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
  var form = FormApp.create('Module 7 Quiz: Optimization');
  
  // Enable quiz mode
  form.setIsQuiz(true);
  
  // Set description
  form.setDescription('Test your understanding. 8 questions, ~10 minutes.\nYou will see explanations after each answer.');
  
  // Question 1
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('You\'re training a neural network and see this loss curve:\n\nEpoch 1: loss = 2.34\nEpoch 2: loss = 145.67\nEpoch 3: loss = NaN\n\nWhat\'s the most likely cause?')
    .setPoints(1)
    .setChoices([
      q1.createChoice('A) Learning rate is too low', false),
      q1.createChoice('B) Learning rate is too high', true),
      q1.createChoice('C) Not enough training data', false),
      q1.createChoice('D) Model is too simple', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Loss exploding to NaN is the classic sign of a learning rate that\'s too high. The optimizer is overshooting the minimum with each step, making the problem worse instead of better. The fix is to reduce the learning rate by 10x or more.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 2
  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('A colleague is training a model on data where:\n- Feature 1: Customer age (range: 18-80)\n- Feature 2: Annual revenue (range: 10,000-10,000,000)\n\nTraining is slow and unstable with vanilla SGD. Which optimizer would most directly address this?')
    .setPoints(1)
    .setChoices([
      q2.createChoice('A) SGD with momentum', false),
      q2.createChoice('B) RMSProp or Adam', true),
      q2.createChoice('C) Gradient clipping', false),
      q2.createChoice('D) Batch normalization', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('The features have vastly different scales (60 range vs 10 million range). Adaptive optimizers like RMSProp and Adam automatically adjust the learning rate per parameter, handling different scales gracefully. While batch normalization could also help, the most direct optimizer-based solution is to use an adaptive method.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 3
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('You\'re comparing optimizers on a narrow "ravine" loss surface:\n- SGD oscillates wildly, making slow progress\n- Adding momentum solves the oscillation problem\n\nWhy does momentum help in this case?')
    .setPoints(1)
    .setChoices([
      q3.createChoice('A) It increases the learning rate automatically', false),
      q3.createChoice('B) It adds regularization to prevent overfitting', false),
      q3.createChoice('C) It accumulates velocity in consistent directions, dampening oscillations perpendicular to the ravine', true),
      q3.createChoice('D) It removes the need for a learning rate entirely', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('In a narrow ravine, the gradient oscillates back and forth across the valley while slowly progressing along it. Momentum accumulates velocity from past gradients. Oscillating components cancel out (alternating positive/negative), while consistent components (along the ravine) accumulate, leading to faster progress with less zigzagging.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 4
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('Your training shows:\n- Training loss: decreasing steadily\n- Validation loss: started decreasing, now increasing\n\nWhat optimization-related change would most directly address this?')
    .setPoints(1)
    .setChoices([
      q4.createChoice('A) Increase learning rate', false),
      q4.createChoice('B) Switch from Adam to SGD', false),
      q4.createChoice('C) Add early stopping or L2 regularization', true),
      q4.createChoice('D) Use a larger batch size', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('This is the classic overfitting pattern: the model performs better on training data but worse on new data. Early stopping (halting when validation loss stops improving) and L2 regularization (penalizing large weights) are the standard optimization-related solutions. While switching to SGD might also help (some studies show it generalizes better), the most direct solutions are early stopping or reg')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 5
  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('You\'re explaining to a product manager why you switched from SGD to Adam. Which explanation is most appropriate?')
    .setPoints(1)
    .setChoices([
      q5.createChoice('A) "Adam uses adaptive moment estimation with exponentially decaying averages of past gradients and squared gradients."', false),
      q5.createChoice('B) "Adam automatically adjusts how fast each part of the model learns, like having cruise control instead of manual transmission."', true),
      q5.createChoice('C) "Adam has β₁=0.9 and β₂=0.999 which gives better convergence properties."', false),
      q5.createChoice('D) "Adam is the optimizer that won ImageNet so we should use it."', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Business stakeholders don\'t need to understand the mathematical details. The cruise control analogy conveys the key benefit (automatic adaptation) without technical jargon. Options A and C are too technical, and option D doesn\'t explain anything useful.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 6
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('Which statement about L1 vs L2 regularization is correct?')
    .setPoints(1)
    .setChoices([
      q6.createChoice('A) L1 shrinks all weights equally; L2 zeros out some weights', false),
      q6.createChoice('B) L1 can push weights to exactly zero; L2 shrinks but rarely zeros', true),
      q6.createChoice('C) L1 and L2 have identical effects, just different magnitudes', false),
      q6.createChoice('D) L1 should always be preferred because it\'s simpler', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('L1 (Lasso) regularization can push weights to exactly zero, effectively performing feature selection. L2 (Ridge) regularization shrinks weights toward zero but rarely makes them exactly zero—it spreads the penalty more evenly. This makes L1 useful when you want automatic feature selection, while L2 is better when you want to keep all features but reduce their magnitudes.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 7
  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('You\'re debugging a model that\'s stuck at a saddle point (gradient ≈ 0, but not at a minimum). Which optimizer is MOST likely to escape?')
    .setPoints(1)
    .setChoices([
      q7.createChoice('A) Vanilla SGD', false),
      q7.createChoice('B) SGD with very high learning rate', false),
      q7.createChoice('C) Adam', true),
      q7.createChoice('D) All optimizers will get equally stuck', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('At a saddle point, the gradient is near zero, so vanilla SGD takes tiny steps. Adam\'s momentum component helps push through flat regions by accumulating velocity from before reaching the saddle. Its adaptive learning rates also help by scaling up in directions with small gradients. While SGD with very high learning rate might overshoot entirely, it\'s not a reliable solution.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 8
  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('A data scientist shows you these results:\n\n| Optimizer | Final Loss | Training Time |\n|-----------|-----------|---------------|\n| SGD | 0.052 | 2 hours |\n| Adam | 0.048 | 20 minutes |\n\nThey conclude "Adam is always better because it\'s faster and got lower loss." How would you respond?')
    .setPoints(1)
    .setChoices([
      q8.createChoice('A) Agree—Adam is the superior choice in all cases', false),
      q8.createChoice('B) Point out that the 0.004 loss difference might not matter for business metrics', false),
      q8.createChoice('C) Point out that SGD sometimes generalizes better to new data, and we should also check test set performance', false),
      q8.createChoice('D) Both B and C', true),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Both points are valid. First, a 0.004 difference in training loss might be negligible in terms of business impact (precision, revenue, etc.). Second, training loss isn\'t the final metric—test set performance matters more, and some research shows SGD can generalize better than Adam despite higher training loss. Making optimizer choices based solely on training loss and speed can be misleading.')
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
