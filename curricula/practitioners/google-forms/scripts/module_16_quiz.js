/**
 * Module 16 Quiz: CNNs
 * 
 * HOW TO RUN:
 * 1. Go to https://script.google.com
 * 2. Create new project (or use existing)
 * 3. Paste this code (replace any existing code)
 * 4. Click Run > createQuiz
 * 5. Authorize when prompted
 * 6. Check your Google Drive for the new form
 * 7. Copy the published URL from the Logs
 */

function createQuiz() {
  // Create the form
  var form = FormApp.create('Module 16 Quiz: CNNs');
  
  // Enable quiz mode
  form.setIsQuiz(true);
  
  // Set description
  form.setDescription('Test your understanding of Convolutional Neural Networks. 8 questions, ~10 minutes.\nYou will see explanations after each answer.');
  
  // Question 1
  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('A data scientist trains a CNN on 2,000 images. Training accuracy reaches 98%, but test accuracy is only 65%. What\'s the most likely problem?')
    .setPoints(1)
    .setChoices([
      q1.createChoice('A) The model is underfitting', false),
      q1.createChoice('B) The model is overfitting', true),
      q1.createChoice('C) The learning rate is too high', false),
      q1.createChoice('D) The images are too small', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('A large gap between training and test accuracy (98% vs 65%) is the classic sign of overfitting. The model memorized the training data instead of learning generalizable patterns. With only 2,000 images, the model needs regularization (dropout, batch normalization, data augmentation) or a simpler architecture.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('The large gap between training (98%) and test (65%) accuracy indicates overfitting. The model memorized training data instead of learning generalizable patterns. Solutions: dropout, batch normalization, data augmentation, or a simpler architecture.')
      .build());

  // Question 2
  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('What does a convolution filter (kernel) detect?')
    .setPoints(1)
    .setChoices([
      q2.createChoice('A) Global patterns across the entire image', false),
      q2.createChoice('B) Local patterns in small regions', true),
      q2.createChoice('C) The overall brightness of the image', false),
      q2.createChoice('D) The color distribution', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Convolution filters detect local patterns by sliding a small kernel (typically 3x3 or 5x5) over the image. Each filter learns to detect a specific local pattern like edges, textures, or corners. This is why CNNs are effective: they exploit the fact that nearby pixels are related.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Convolution filters detect local patterns in small regions. They slide a small kernel over the image, computing a weighted sum at each position. Each filter learns a specific pattern (edges, textures, corners).')
      .build());

  // Question 3
  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('Why do CNNs typically outperform dense networks on image classification?')
    .setPoints(1)
    .setChoices([
      q3.createChoice('A) CNNs have more parameters', false),
      q3.createChoice('B) CNNs preserve spatial structure through local connectivity and weight sharing', true),
      q3.createChoice('C) CNNs use different activation functions', false),
      q3.createChoice('D) CNNs train faster', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('CNNs preserve spatial structure by looking at local regions (local connectivity) and applying the same filter everywhere (weight sharing). This means the network learns that an edge looks the same regardless of where it appears. Dense networks flatten the image, losing all spatial relationships between pixels.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('CNNs outperform dense networks on images because they preserve spatial structure. Local connectivity means each neuron looks at a small patch. Weight sharing means the same filter is applied everywhere, so an edge in the top-left is recognized the same as one in the bottom-right.')
      .build());

  // Question 4
  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('What is the primary purpose of max pooling?')
    .setPoints(1)
    .setChoices([
      q4.createChoice('A) To increase the resolution of feature maps', false),
      q4.createChoice('B) To add more trainable parameters', false),
      q4.createChoice('C) To reduce spatial dimensions while keeping strong activations', true),
      q4.createChoice('D) To normalize the pixel values', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Max pooling reduces spatial dimensions by taking the maximum value in each region (e.g., 2x2). This shrinks the feature map while preserving the strongest activations. Benefits include reduced computation, some translation invariance, and fewer parameters to prevent overfitting.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Max pooling takes the maximum value in each region (e.g., 2x2), shrinking the feature map while keeping the strongest activations. This reduces computation, adds translation invariance, and helps prevent overfitting.')
      .build());

  // Question 5
  var q5 = form.addMultipleChoiceItem();
  q5.setTitle('You have a 28x28 input image. After applying a Conv2D layer with 32 filters and a 3x3 kernel (no padding, stride 1), what is the output shape?')
    .setPoints(1)
    .setChoices([
      q5.createChoice('A) 28x28x32', false),
      q5.createChoice('B) 26x26x32', true),
      q5.createChoice('C) 30x30x32', false),
      q5.createChoice('D) 26x26x1', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('With no padding and stride 1, the output size is (input_size - kernel_size + 1). So 28 - 3 + 1 = 26. The depth becomes the number of filters (32). Final output: 26x26x32.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('The formula is: output = input - kernel + 1. So 28 - 3 + 1 = 26. The depth equals the number of filters (32). The correct output shape is 26x26x32.')
      .build());

  // Question 6
  var q6 = form.addMultipleChoiceItem();
  q6.setTitle('Which regularization technique randomly sets some neuron outputs to zero during training?')
    .setPoints(1)
    .setChoices([
      q6.createChoice('A) Batch Normalization', false),
      q6.createChoice('B) Max Pooling', false),
      q6.createChoice('C) Dropout', true),
      q6.createChoice('D) L2 Regularization', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('Dropout randomly sets a fraction of neuron outputs to zero during each training step. This prevents neurons from co-adapting and forces the network to learn redundant representations, reducing overfitting. Common rates: 0.25 after conv layers, 0.5 after dense layers.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Dropout randomly zeroes out a fraction of neuron outputs during training. This forces the network to learn redundant representations rather than relying on specific neurons. Typical rates: 0.25 after conv layers, 0.5 after dense layers.')
      .build());

  // Question 7
  var q7 = form.addMultipleChoiceItem();
  q7.setTitle('When should you NOT use a CNN?')
    .setPoints(1)
    .setChoices([
      q7.createChoice('A) Classifying photos of products', false),
      q7.createChoice('B) Predicting customer churn from tabular features', true),
      q7.createChoice('C) Detecting objects in satellite images', false),
      q7.createChoice('D) Classifying audio spectrograms', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('CNNs are designed for data with spatial structure. Tabular data (customer features like age, tenure, purchase history) has no spatial relationships between columns. For tabular data, gradient boosting methods (XGBoost, LightGBM) typically perform better with less tuning.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('CNNs need spatial structure to be effective. Tabular data (age, tenure, purchase count) has no meaningful spatial relationships between features. Use gradient boosting (XGBoost, LightGBM) for tabular data instead.')
      .build());

  // Question 8
  var q8 = form.addMultipleChoiceItem();
  q8.setTitle('Your CNN has 2 million parameters but only 1,000 training images. What\'s the best first step to improve generalization?')
    .setPoints(1)
    .setChoices([
      q8.createChoice('A) Add more conv layers', false),
      q8.createChoice('B) Increase the number of filters', false),
      q8.createChoice('C) Use transfer learning from a pretrained model', true),
      q8.createChoice('D) Remove all pooling layers', false),
    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('With only 1,000 images and 2M parameters, training from scratch will severely overfit. Transfer learning uses a CNN pretrained on millions of images (like ImageNet), then fine-tunes on your small dataset. The pretrained layers already know how to detect edges, textures, and shapes.')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Training 2M parameters on 1,000 images will severely overfit. Transfer learning is the answer: start with a model pretrained on millions of images (e.g., ResNet on ImageNet), then fine-tune the last layers on your data. The pretrained layers already detect useful patterns.')
      .build());

  // Log the URLs
  Logger.log('Form created successfully!');
  Logger.log('Edit URL: ' + form.getEditUrl());
  Logger.log('Published URL: ' + form.getPublishedUrl());
  
  return form.getPublishedUrl();
}
