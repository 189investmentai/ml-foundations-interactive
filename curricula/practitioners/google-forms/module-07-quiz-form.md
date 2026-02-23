# Module 7 Quiz: Optimization - Google Forms Setup

## Form Setup

1. Go to https://docs.google.com/forms
2. Click **+ Blank**
3. Settings → Enable **"Make this a quiz"**
4. Enable **"Release grade immediately after submission"**

---

## Form Title & Description

**Title:** Module 7 Quiz: Optimization

**Description:** 
Test your understanding. 8 questions, ~10 minutes.

---

## Questions (Copy-Paste Ready)

### Question 1

**Question:**
You're training a neural network and see this loss curve:


```
Epoch 1: loss = 2.34
Epoch 2: loss = 145.67
Epoch 3: loss = NaN

```

What's the most likely cause?

**Options:**
- A) Learning rate is too low
- B) Learning rate is too high ✓ CORRECT
- C) Not enough training data
- D) Model is too simple

**Feedback (add to correct answer):**
Loss exploding to NaN is the classic sign of a learning rate that's too high. The optimizer is overshooting the minimum with each step, making the problem worse instead of better. The fix is to reduce the learning rate by 10x or more.

**Points:** 1

---

### Question 2

**Question:**
A colleague is training a model on data where:
- Feature 1: Customer age (range: 18-80)
- Feature 2: Annual revenue (range: 10,000-10,000,000)

Training is slow and unstable with vanilla SGD. Which optimizer would most directly address this?

**Options:**
- A) SGD with momentum
- B) RMSProp or Adam ✓ CORRECT
- C) Gradient clipping
- D) Batch normalization

**Feedback (add to correct answer):**
The features have vastly different scales (60 range vs 10 million range). Adaptive optimizers like RMSProp and Adam automatically adjust the learning rate per parameter, handling different scales gracefully. While batch normalization could also help, the most direct optimizer-based solution is to use an adaptive method.

**Points:** 1

---

### Question 3

**Question:**
You're comparing optimizers on a narrow "ravine" loss surface:
- SGD oscillates wildly, making slow progress
- Adding momentum solves the oscillation problem

Why does momentum help in this case?

**Options:**
- A) It increases the learning rate automatically
- B) It adds regularization to prevent overfitting
- C) It accumulates velocity in consistent directions, dampening oscillations perpendicular to the ravine ✓ CORRECT
- D) It removes the need for a learning rate entirely

**Feedback (add to correct answer):**
In a narrow ravine, the gradient oscillates back and forth across the valley while slowly progressing along it. Momentum accumulates velocity from past gradients. Oscillating components cancel out (alternating positive/negative), while consistent components (along the ravine) accumulate, leading to faster progress with less zigzagging.

**Points:** 1

---

### Question 4

**Question:**
Your training shows:
- Training loss: decreasing steadily
- Validation loss: started decreasing, now increasing

What optimization-related change would most directly address this?

**Options:**
- A) Increase learning rate
- B) Switch from Adam to SGD
- C) Add early stopping or L2 regularization ✓ CORRECT
- D) Use a larger batch size

**Feedback (add to correct answer):**
This is the classic overfitting pattern: the model performs better on training data but worse on new data. Early stopping (halting when validation loss stops improving) and L2 regularization (penalizing large weights) are the standard optimization-related solutions. While switching to SGD might also help (some studies show it generalizes better), the most direct solutions are early stopping or regularization.

**Points:** 1

---

### Question 5

**Question:**
You're explaining to a product manager why you switched from SGD to Adam. Which explanation is most appropriate?

**Options:**
- A) "Adam uses adaptive moment estimation with exponentially decaying averages of past gradients and squared gradients."
- B) "Adam automatically adjusts how fast each part of the model learns, like having cruise control instead of manual transmission." ✓ CORRECT
- C) "Adam has β₁=0.9 and β₂=0.999 which gives better convergence properties."
- D) "Adam is the optimizer that won ImageNet so we should use it."

**Feedback (add to correct answer):**
Business stakeholders don't need to understand the mathematical details. The cruise control analogy conveys the key benefit (automatic adaptation) without technical jargon. Options A and C are too technical, and option D doesn't explain anything useful.

**Points:** 1

---

### Question 6

**Question:**
Which statement about L1 vs L2 regularization is correct?

**Options:**
- A) L1 shrinks all weights equally; L2 zeros out some weights
- B) L1 can push weights to exactly zero; L2 shrinks but rarely zeros ✓ CORRECT
- C) L1 and L2 have identical effects, just different magnitudes
- D) L1 should always be preferred because it's simpler

**Feedback (add to correct answer):**
L1 (Lasso) regularization can push weights to exactly zero, effectively performing feature selection. L2 (Ridge) regularization shrinks weights toward zero but rarely makes them exactly zero—it spreads the penalty more evenly. This makes L1 useful when you want automatic feature selection, while L2 is better when you want to keep all features but reduce their magnitudes.

**Points:** 1

---

### Question 7

**Question:**
You're debugging a model that's stuck at a saddle point (gradient ≈ 0, but not at a minimum). Which optimizer is MOST likely to escape?

**Options:**
- A) Vanilla SGD
- B) SGD with very high learning rate
- C) Adam ✓ CORRECT
- D) All optimizers will get equally stuck

**Feedback (add to correct answer):**
At a saddle point, the gradient is near zero, so vanilla SGD takes tiny steps. Adam's momentum component helps push through flat regions by accumulating velocity from before reaching the saddle. Its adaptive learning rates also help by scaling up in directions with small gradients. While SGD with very high learning rate might overshoot entirely, it's not a reliable solution.

**Points:** 1

---

### Question 8

**Question:**
A data scientist shows you these results:

| Optimizer | Final Loss | Training Time |
|-----------|-----------|---------------|
| SGD | 0.052 | 2 hours |
| Adam | 0.048 | 20 minutes |

They conclude "Adam is always better because it's faster and got lower loss." How would you respond?

**Options:**
- A) Agree—Adam is the superior choice in all cases
- B) Point out that the 0.004 loss difference might not matter for business metrics
- C) Point out that SGD sometimes generalizes better to new data, and we should also check test set performance
- D) Both B and C ✓ CORRECT

**Feedback (add to correct answer):**
Both points are valid. First, a 0.004 difference in training loss might be negligible in terms of business impact (precision, revenue, etc.). Second, training loss isn't the final metric—test set performance matters more, and some research shows SGD can generalize better than Adam despite higher training loss. Making optimizer choices based solely on training loss and speed can be misleading.

**Points:** 1

---

