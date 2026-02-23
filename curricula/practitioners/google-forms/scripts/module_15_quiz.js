/**
 * Module 15 Quiz: Neural Networks
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
  var form = FormApp.create('Module 15 Quiz: Neural Networks');
  
  // Enable quiz mode
  form.setIsQuiz(true);
  
  // Set description
  form.setDescription('Test your understanding. 8 questions, ~10 minutes.\nYou will see explanations after each answer.');
  
  // Question 1
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('Why do neural networks need activation functions?')
    .setPoints(1)
    .setChoices([
      q1.createChoice('A) To speed up training', false),
      q1.createChoice('B) To add non-linearity, allowing the network to learn complex patterns', true),
      q1.createChoice('C) To reduce the number of parameters', false),
      q1.createChoice('D) To prevent overfitting', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Without activation functions, a neural network is just a series of linear transformations, which collapses to a single linear function. Activation functions add non-linearity, enabling the network to learn complex, non-linear patterns and decision boundaries.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 2
  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('Your neural network achieves 99% training accuracy but only 65% validation accuracy. What is happening?')
    .setPoints(1)
    .setChoices([
      q2.createChoice('A) The network is underfitting', false),
      q2.createChoice('B) The network is overfitting', true),
      q2.createChoice('C) The learning rate is too high', false),
      q2.createChoice('D) The activation functions are wrong', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('High training accuracy with low validation accuracy is the classic sign of overfitting — the model has memorized the training data but doesn\'t generalize. Solutions include dropout, early stopping, more data, or a simpler architecture.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 3
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('You\'re deciding between a neural network and gradient boosting for predicting customer churn with 8,000 rows and 20 well-defined features. Which is likely better?')
    .setPoints(1)
    .setChoices([
      q3.createChoice('A) Neural network — it\'s always more powerful', false),
      q3.createChoice('B) Gradient boosting — tabular data with clear features and moderate size', true),
      q3.createChoice('C) Neural network — more neurons means better predictions', false),
      q3.createChoice('D) Neither — the dataset is too small for ML', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('For tabular data with well-defined features and moderate dataset size, gradient boosting typically performs as well or better than neural networks, trains faster, and is more interpretable. Neural networks shine on unstructured data (images, text) with large datasets.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 4
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('During training, your loss decreases for 10 epochs then stops improving while remaining high. What should you try?')
    .setPoints(1)
    .setChoices([
      q4.createChoice('A) Use stronger regularization to prevent overfitting', false),
      q4.createChoice('B) Increase network capacity (more layers or neurons) — likely underfitting', true),
      q4.createChoice('C) Reduce the learning rate', false),
      q4.createChoice('D) Switch to a different loss function', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('If training loss stops improving while still high, the network likely doesn\'t have enough capacity to model the data complexity — this is underfitting. Solutions include adding more layers, more neurons, or training longer. Regularization would make this worse.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 5
  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('What does backpropagation do?')
    .setPoints(1)
    .setChoices([
      q5.createChoice('A) Propagates data forward through the network', false),
      q5.createChoice('B) Computes gradients to determine how to update weights', true),
      q5.createChoice('C) Removes unnecessary neurons', false),
      q5.createChoice('D) Normalizes the input data', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Backpropagation computes the gradient of the loss with respect to each weight by propagating the error backward through the network using the chain rule. These gradients tell the optimizer how to update weights to reduce the loss.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 6
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('You\'re using ReLU activation and notice many neurons always output 0 ("dead neurons"). What might help?')
    .setPoints(1)
    .setChoices([
      q6.createChoice('A) Switch to sigmoid activation', false),
      q6.createChoice('B) Use Leaky ReLU or reduce learning rate', true),
      q6.createChoice('C) Add more dropout', false),
      q6.createChoice('D) Remove the activation functions entirely', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('"Dead ReLU" occurs when neurons get stuck outputting 0 and never recover (gradients are 0 when ReLU output is 0). Leaky ReLU allows small negative gradients, preventing this. A lower learning rate also helps by making smaller updates that are less likely to push neurons into the dead zone.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 7
  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('A stakeholder asks why you need so much data to train a neural network. The best explanation is:')
    .setPoints(1)
    .setChoices([
      q7.createChoice('A) "Neural networks have millions of parameters that each need to learn from examples. With too little data, they memorize rather than generalize, like a student who only sees 5 math problems and can\'t solve new ones."', true),
      q7.createChoice('B) "The algorithm specification requires at least 100,000 samples."', false),
      q7.createChoice('C) "Neural networks are inefficient algorithms that waste computational resources."', false),
      q7.createChoice('D) "We need data to test the network after training."', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Neural networks have many parameters (weights) that need to be learned. With insufficient data, they can simply memorize the training examples instead of learning general patterns. The analogy of learning math from few examples makes this concrete for non-technical stakeholders.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

  // Question 8
  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('For a binary classification task, which output layer configuration is correct?')
    .setPoints(1)
    .setChoices([
      q8.createChoice('A) 2 neurons with ReLU activation', false),
      q8.createChoice('B) 1 neuron with softmax activation', false),
      q8.createChoice('C) 1 neuron with sigmoid activation', true),
      q8.createChoice('D) 2 neurons with no activation', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('For binary classification, use 1 output neuron with sigmoid activation (outputs probability between 0 and 1). Softmax is for multi-class (2+ classes with mutually exclusive labels). ReLU or no activation don\'t produce valid probabilities.')
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
