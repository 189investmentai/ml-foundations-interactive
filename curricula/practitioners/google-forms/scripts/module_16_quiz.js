/**
 * Module 16 Quiz: CNNs
 * 
 * Run this script in Google Apps Script to create the quiz form.
 * See README.md for instructions.
 */

function createQuiz() {
  var form = FormApp.create('Module 16 Quiz: CNNs');
  form.setIsQuiz(true);
  form.setDescription('Test your understanding of Convolutional Neural Networks');
  
  // Question 1
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('A data scientist trains a CNN on 2,000 images. Training accuracy reaches 98%, but test accuracy is only 65%. What\'s the most likely problem?')
    .setPoints(1)
    .setChoices([
      q1.createChoice('The model is underfitting', false),
      q1.createChoice('The model is overfitting', true),
      q1.createChoice('The learning rate is too high', false),
      q1.createChoice('The images are too small', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! A large gap between training and test accuracy (98% vs 65%) is the classic sign of overfitting. The model needs regularization or a simpler architecture.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('The large gap between training (98%) and test (65%) accuracy indicates overfitting - the model memorized training data instead of learning generalizable patterns.')
      .build());
  
  // Question 2
  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('What does a convolution filter (kernel) detect?')
    .setPoints(1)
    .setChoices([
      q2.createChoice('Global patterns across the entire image', false),
      q2.createChoice('Local patterns in small regions', true),
      q2.createChoice('The overall brightness of the image', false),
      q2.createChoice('The color distribution', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Convolution filters detect local patterns by sliding a small kernel (typically 3x3) over the image. Each filter learns specific patterns like edges or textures.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Convolution filters detect local patterns in small regions. They slide over the image looking for specific patterns like edges, textures, or corners.')
      .build());
  
  // Question 3
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('Why do CNNs typically outperform dense networks on image classification?')
    .setPoints(1)
    .setChoices([
      q3.createChoice('CNNs have more parameters', false),
      q3.createChoice('CNNs preserve spatial structure through local connectivity and weight sharing', true),
      q3.createChoice('CNNs use different activation functions', false),
      q3.createChoice('CNNs train faster', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! CNNs preserve spatial structure and use weight sharing, so the network learns that patterns look the same regardless of position.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('CNNs outperform dense networks because they preserve spatial structure through local connectivity (looking at small regions) and weight sharing (same filter everywhere).')
      .build());
  
  // Question 4
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('What is the primary purpose of max pooling?')
    .setPoints(1)
    .setChoices([
      q4.createChoice('To increase the resolution of feature maps', false),
      q4.createChoice('To add more trainable parameters', false),
      q4.createChoice('To reduce spatial dimensions while keeping strong activations', true),
      q4.createChoice('To normalize the pixel values', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Max pooling reduces spatial dimensions by taking the maximum value in each region, preserving strong activations while reducing computation.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Max pooling reduces spatial dimensions by taking the maximum value in each region (e.g., 2x2). This shrinks the feature map while preserving the strongest activations.')
      .build());
  
  // Question 5
  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('You have a 28x28 input image. After applying a Conv2D layer with 32 filters and a 3x3 kernel (no padding, stride 1), what is the output shape?')
    .setPoints(1)
    .setChoices([
      q5.createChoice('28x28x32', false),
      q5.createChoice('26x26x32', true),
      q5.createChoice('30x30x32', false),
      q5.createChoice('26x26x1', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Output size = input_size - kernel_size + 1 = 28 - 3 + 1 = 26. Depth = number of filters = 32. So 26x26x32.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('With no padding and stride 1: output = input - kernel + 1 = 28 - 3 + 1 = 26. The depth becomes the number of filters (32). Answer: 26x26x32.')
      .build());
  
  // Question 6
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('Which regularization technique randomly sets some neuron outputs to zero during training?')
    .setPoints(1)
    .setChoices([
      q6.createChoice('Batch Normalization', false),
      q6.createChoice('Max Pooling', false),
      q6.createChoice('Dropout', true),
      q6.createChoice('L2 Regularization', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Dropout randomly sets neuron outputs to zero during training, preventing co-adaptation and reducing overfitting.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Dropout randomly sets a fraction of neuron outputs to zero during each training step. This forces the network to learn redundant representations.')
      .build());
  
  // Question 7
  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('When should you NOT use a CNN?')
    .setPoints(1)
    .setChoices([
      q7.createChoice('Classifying photos of products', false),
      q7.createChoice('Predicting customer churn from tabular features', true),
      q7.createChoice('Detecting objects in satellite images', false),
      q7.createChoice('Classifying audio spectrograms', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Tabular data has no spatial structure. For tabular data, gradient boosting methods (XGBoost, LightGBM) typically perform better.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('CNNs are for data with spatial structure. Tabular data (customer features like age, tenure) has no spatial relationships - use gradient boosting instead.')
      .build());
  
  // Question 8
  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('Your CNN has 2 million parameters but only 1,000 training images. What\'s the best first step to improve generalization?')
    .setPoints(1)
    .setChoices([
      q8.createChoice('Add more conv layers', false),
      q8.createChoice('Increase the number of filters', false),
      q8.createChoice('Use transfer learning from a pretrained model', true),
      q8.createChoice('Remove all pooling layers', false)
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Correct! Transfer learning uses a CNN pretrained on millions of images, then fine-tunes on your small dataset. The pretrained layers already know useful patterns.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('With only 1,000 images and 2M parameters, training from scratch will overfit. Use transfer learning - start with a pretrained model and fine-tune on your data.')
      .build());
  
  Logger.log('Quiz created: ' + form.getPublishedUrl());
  Logger.log('Edit URL: ' + form.getEditUrl());
}
