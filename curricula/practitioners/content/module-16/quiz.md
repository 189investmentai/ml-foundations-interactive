# Module 16 Quiz: CNNs

## Question 1

A data scientist trains a CNN on 2,000 images. Training accuracy reaches 98%, but test accuracy is only 65%. What's the most likely problem?

A) The model is underfitting
B) The model is overfitting
C) The learning rate is too high
D) The images are too small

**Correct Answer:** B

**Explanation:** A large gap between training and test accuracy (98% vs 65%) is the classic sign of overfitting. The model memorized the training data instead of learning generalizable patterns. With only 2,000 images, the model needs regularization (dropout, batch normalization, data augmentation) or a simpler architecture.

---

## Question 2

What does a convolution filter (kernel) detect?

A) Global patterns across the entire image
B) Local patterns in small regions
C) The overall brightness of the image
D) The color distribution

**Correct Answer:** B

**Explanation:** Convolution filters detect local patterns by sliding a small kernel (typically 3x3 or 5x5) over the image. Each filter learns to detect a specific local pattern like edges, textures, or corners. This is why CNNs are effective: they exploit the fact that nearby pixels are related.

---

## Question 3

Why do CNNs typically outperform dense networks on image classification?

A) CNNs have more parameters
B) CNNs preserve spatial structure through local connectivity and weight sharing
C) CNNs use different activation functions
D) CNNs train faster

**Correct Answer:** B

**Explanation:** CNNs preserve spatial structure by looking at local regions (local connectivity) and applying the same filter everywhere (weight sharing). This means the network learns that an edge looks the same regardless of where it appears. Dense networks flatten the image, losing all spatial relationships between pixels.

---

## Question 4

What is the primary purpose of max pooling?

A) To increase the resolution of feature maps
B) To add more trainable parameters
C) To reduce spatial dimensions while keeping strong activations
D) To normalize the pixel values

**Correct Answer:** C

**Explanation:** Max pooling reduces spatial dimensions by taking the maximum value in each region (e.g., 2x2). This shrinks the feature map while preserving the strongest activations. Benefits include reduced computation, some translation invariance, and fewer parameters to prevent overfitting.

---

## Question 5

You have a 28x28 input image. After applying a Conv2D layer with 32 filters and a 3x3 kernel (no padding, stride 1), what is the output shape?

A) 28x28x32
B) 26x26x32
C) 30x30x32
D) 26x26x1

**Correct Answer:** B

**Explanation:** With no padding and stride 1, the output size is (input_size - kernel_size + 1). So 28 - 3 + 1 = 26. The depth becomes the number of filters (32). Final output: 26x26x32.

---

## Question 6

Which regularization technique randomly sets some neuron outputs to zero during training?

A) Batch Normalization
B) Max Pooling
C) Dropout
D) L2 Regularization

**Correct Answer:** C

**Explanation:** Dropout randomly sets a fraction of neuron outputs to zero during each training step. This prevents neurons from co-adapting and forces the network to learn redundant representations, reducing overfitting. Common rates: 0.25 after conv layers, 0.5 after dense layers.

---

## Question 7

When should you NOT use a CNN?

A) Classifying photos of products
B) Predicting customer churn from tabular features
C) Detecting objects in satellite images
D) Classifying audio spectrograms

**Correct Answer:** B

**Explanation:** CNNs are designed for data with spatial structure. Tabular data (customer features like age, tenure, purchase history) has no spatial relationships. For tabular data, gradient boosting methods (XGBoost, LightGBM) typically perform better with less tuning.

---

## Question 8

Your CNN has 2 million parameters but only 1,000 training images. What's the best first step to improve generalization?

A) Add more conv layers
B) Increase the number of filters
C) Use transfer learning from a pretrained model
D) Remove all pooling layers

**Correct Answer:** C

**Explanation:** With only 1,000 images and 2M parameters, training from scratch will severely overfit. Transfer learning uses a CNN pretrained on millions of images (like ImageNet), then fine-tunes on your small dataset. The pretrained layers already know how to detect edges, textures, and shapes.
