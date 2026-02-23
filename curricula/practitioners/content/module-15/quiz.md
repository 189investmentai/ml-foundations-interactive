# Module 15 Quiz: Neural Networks

---

## Question 1

Why do neural networks need activation functions?

A) To speed up training
B) To add non-linearity, allowing the network to learn complex patterns
C) To reduce the number of parameters
D) To prevent overfitting

**Correct Answer:** B

**Explanation:** Without activation functions, a neural network is just a series of linear transformations, which collapses to a single linear function. Activation functions add non-linearity, enabling the network to learn complex, non-linear patterns and decision boundaries.

---

## Question 2

Your neural network achieves 99% training accuracy but only 65% validation accuracy. What is happening?

A) The network is underfitting
B) The network is overfitting
C) The learning rate is too high
D) The activation functions are wrong

**Correct Answer:** B

**Explanation:** High training accuracy with low validation accuracy is the classic sign of overfitting — the model has memorized the training data but doesn't generalize. Solutions include dropout, early stopping, more data, or a simpler architecture.

---

## Question 3

You're deciding between a neural network and gradient boosting for predicting customer churn with 8,000 rows and 20 well-defined features. Which is likely better?

A) Neural network — it's always more powerful
B) Gradient boosting — tabular data with clear features and moderate size
C) Neural network — more neurons means better predictions
D) Neither — the dataset is too small for ML

**Correct Answer:** B

**Explanation:** For tabular data with well-defined features and moderate dataset size, gradient boosting typically performs as well or better than neural networks, trains faster, and is more interpretable. Neural networks shine on unstructured data (images, text) with large datasets.

---

## Question 4

During training, your loss decreases for 10 epochs then stops improving while remaining high. What should you try?

A) Use stronger regularization to prevent overfitting
B) Increase network capacity (more layers or neurons) — likely underfitting
C) Reduce the learning rate
D) Switch to a different loss function

**Correct Answer:** B

**Explanation:** If training loss stops improving while still high, the network likely doesn't have enough capacity to model the data complexity — this is underfitting. Solutions include adding more layers, more neurons, or training longer. Regularization would make this worse.

---

## Question 5

What does backpropagation do?

A) Propagates data forward through the network
B) Computes gradients to determine how to update weights
C) Removes unnecessary neurons
D) Normalizes the input data

**Correct Answer:** B

**Explanation:** Backpropagation computes the gradient of the loss with respect to each weight by propagating the error backward through the network using the chain rule. These gradients tell the optimizer how to update weights to reduce the loss.

---

## Question 6

You're using ReLU activation and notice many neurons always output 0 ("dead neurons"). What might help?

A) Switch to sigmoid activation
B) Use Leaky ReLU or reduce learning rate
C) Add more dropout
D) Remove the activation functions entirely

**Correct Answer:** B

**Explanation:** "Dead ReLU" occurs when neurons get stuck outputting 0 and never recover (gradients are 0 when ReLU output is 0). Leaky ReLU allows small negative gradients, preventing this. A lower learning rate also helps by making smaller updates that are less likely to push neurons into the dead zone.

---

## Question 7

A stakeholder asks why you need so much data to train a neural network. The best explanation is:

A) "Neural networks have millions of parameters that each need to learn from examples. With too little data, they memorize rather than generalize, like a student who only sees 5 math problems and can't solve new ones."

B) "The algorithm specification requires at least 100,000 samples."

C) "Neural networks are inefficient algorithms that waste computational resources."

D) "We need data to test the network after training."

**Correct Answer:** A

**Explanation:** Neural networks have many parameters (weights) that need to be learned. With insufficient data, they can simply memorize the training examples instead of learning general patterns. The analogy of learning math from few examples makes this concrete for non-technical stakeholders.

---

## Question 8

For a binary classification task, which output layer configuration is correct?

A) 2 neurons with ReLU activation
B) 1 neuron with softmax activation
C) 1 neuron with sigmoid activation
D) 2 neurons with no activation

**Correct Answer:** C

**Explanation:** For binary classification, use 1 output neuron with sigmoid activation (outputs probability between 0 and 1). Softmax is for multi-class (2+ classes with mutually exclusive labels). ReLU or no activation don't produce valid probabilities.

---

## Scoring

- 8/8: Expert level — you understand neural networks deeply
- 6-7/8: Solid understanding — review activation functions and regularization
- 4-5/8: Developing — revisit forward/backward pass concepts
- <4/8: Review the full lesson and experiment with the playground
