# Module 15 Quiz: Neural Networks - Google Forms Setup

## Form Setup

1. Go to https://docs.google.com/forms
2. Click **+ Blank**
3. Settings → Enable **"Make this a quiz"**
4. Enable **"Release grade immediately after submission"**

---

## Form Title & Description

**Title:** Module 15 Quiz: Neural Networks

**Description:** 
Test your understanding. 8 questions, ~10 minutes.

---

## Questions (Copy-Paste Ready)

### Question 1

**Question:**
Why do neural networks need activation functions?

**Options:**
- A) To speed up training
- B) To add non-linearity, allowing the network to learn complex patterns ✓ CORRECT
- C) To reduce the number of parameters
- D) To prevent overfitting

**Feedback (add to correct answer):**
Without activation functions, a neural network is just a series of linear transformations, which collapses to a single linear function. Activation functions add non-linearity, enabling the network to learn complex, non-linear patterns and decision boundaries.

**Points:** 1

---

### Question 2

**Question:**
Your neural network achieves 99% training accuracy but only 65% validation accuracy. What is happening?

**Options:**
- A) The network is underfitting
- B) The network is overfitting ✓ CORRECT
- C) The learning rate is too high
- D) The activation functions are wrong

**Feedback (add to correct answer):**
High training accuracy with low validation accuracy is the classic sign of overfitting — the model has memorized the training data but doesn't generalize. Solutions include dropout, early stopping, more data, or a simpler architecture.

**Points:** 1

---

### Question 3

**Question:**
You're deciding between a neural network and gradient boosting for predicting customer churn with 8,000 rows and 20 well-defined features. Which is likely better?

**Options:**
- A) Neural network — it's always more powerful
- B) Gradient boosting — tabular data with clear features and moderate size ✓ CORRECT
- C) Neural network — more neurons means better predictions
- D) Neither — the dataset is too small for ML

**Feedback (add to correct answer):**
For tabular data with well-defined features and moderate dataset size, gradient boosting typically performs as well or better than neural networks, trains faster, and is more interpretable. Neural networks shine on unstructured data (images, text) with large datasets.

**Points:** 1

---

### Question 4

**Question:**
During training, your loss decreases for 10 epochs then stops improving while remaining high. What should you try?

**Options:**
- A) Use stronger regularization to prevent overfitting
- B) Increase network capacity (more layers or neurons) — likely underfitting ✓ CORRECT
- C) Reduce the learning rate
- D) Switch to a different loss function

**Feedback (add to correct answer):**
If training loss stops improving while still high, the network likely doesn't have enough capacity to model the data complexity — this is underfitting. Solutions include adding more layers, more neurons, or training longer. Regularization would make this worse.

**Points:** 1

---

### Question 5

**Question:**
What does backpropagation do?

**Options:**
- A) Propagates data forward through the network
- B) Computes gradients to determine how to update weights ✓ CORRECT
- C) Removes unnecessary neurons
- D) Normalizes the input data

**Feedback (add to correct answer):**
Backpropagation computes the gradient of the loss with respect to each weight by propagating the error backward through the network using the chain rule. These gradients tell the optimizer how to update weights to reduce the loss.

**Points:** 1

---

### Question 6

**Question:**
You're using ReLU activation and notice many neurons always output 0 ("dead neurons"). What might help?

**Options:**
- A) Switch to sigmoid activation
- B) Use Leaky ReLU or reduce learning rate ✓ CORRECT
- C) Add more dropout
- D) Remove the activation functions entirely

**Feedback (add to correct answer):**
"Dead ReLU" occurs when neurons get stuck outputting 0 and never recover (gradients are 0 when ReLU output is 0). Leaky ReLU allows small negative gradients, preventing this. A lower learning rate also helps by making smaller updates that are less likely to push neurons into the dead zone.

**Points:** 1

---

### Question 7

**Question:**
A stakeholder asks why you need so much data to train a neural network. The best explanation is:

**Options:**
- A) "Neural networks have millions of parameters that each need to learn from examples. With too little data, they memorize rather than generalize, like a student who only sees 5 math problems and can't solve new ones." ✓ CORRECT
- B) "The algorithm specification requires at least 100,000 samples."
- C) "Neural networks are inefficient algorithms that waste computational resources."
- D) "We need data to test the network after training."

**Feedback (add to correct answer):**
Neural networks have many parameters (weights) that need to be learned. With insufficient data, they can simply memorize the training examples instead of learning general patterns. The analogy of learning math from few examples makes this concrete for non-technical stakeholders.

**Points:** 1

---

### Question 8

**Question:**
For a binary classification task, which output layer configuration is correct?

**Options:**
- A) 2 neurons with ReLU activation
- B) 1 neuron with softmax activation
- C) 1 neuron with sigmoid activation ✓ CORRECT
- D) 2 neurons with no activation

**Feedback (add to correct answer):**
For binary classification, use 1 output neuron with sigmoid activation (outputs probability between 0 and 1). Softmax is for multi-class (2+ classes with mutually exclusive labels). ReLU or no activation don't produce valid probabilities.

**Points:** 1

---

