# Module 7 Quiz: Optimization

---

## Question 1

You're training a neural network and see this loss curve:

```
Epoch 1: loss = 2.34
Epoch 2: loss = 145.67
Epoch 3: loss = NaN
```

What's the most likely cause?

A) Learning rate is too low
B) Learning rate is too high
C) Not enough training data
D) Model is too simple

**Correct Answer:** B

**Explanation:** Loss exploding to NaN is the classic sign of a learning rate that's too high. The optimizer is overshooting the minimum with each step, making the problem worse instead of better. The fix is to reduce the learning rate by 10x or more.

---

## Question 2

A colleague is training a model on data where:
- Feature 1: Customer age (range: 18-80)
- Feature 2: Annual revenue (range: 10,000-10,000,000)

Training is slow and unstable with vanilla SGD. Which optimizer would most directly address this?

A) SGD with momentum
B) RMSProp or Adam
C) Gradient clipping
D) Batch normalization

**Correct Answer:** B

**Explanation:** The features have vastly different scales (60 range vs 10 million range). Adaptive optimizers like RMSProp and Adam automatically adjust the learning rate per parameter, handling different scales gracefully. While batch normalization could also help, the most direct optimizer-based solution is to use an adaptive method.

---

## Question 3

You're comparing optimizers on a narrow "ravine" loss surface:
- SGD oscillates wildly, making slow progress
- Adding momentum solves the oscillation problem

Why does momentum help in this case?

A) It increases the learning rate automatically
B) It adds regularization to prevent overfitting
C) It accumulates velocity in consistent directions, dampening oscillations perpendicular to the ravine
D) It removes the need for a learning rate entirely

**Correct Answer:** C

**Explanation:** In a narrow ravine, the gradient oscillates back and forth across the valley while slowly progressing along it. Momentum accumulates velocity from past gradients. Oscillating components cancel out (alternating positive/negative), while consistent components (along the ravine) accumulate, leading to faster progress with less zigzagging.

---

## Question 4

Your training shows:
- Training loss: decreasing steadily
- Validation loss: started decreasing, now increasing

What optimization-related change would most directly address this?

A) Increase learning rate
B) Switch from Adam to SGD
C) Add early stopping or L2 regularization
D) Use a larger batch size

**Correct Answer:** C

**Explanation:** This is the classic overfitting pattern: the model performs better on training data but worse on new data. Early stopping (halting when validation loss stops improving) and L2 regularization (penalizing large weights) are the standard optimization-related solutions. While switching to SGD might also help (some studies show it generalizes better), the most direct solutions are early stopping or regularization.

---

## Question 5

You're explaining to a product manager why you switched from SGD to Adam. Which explanation is most appropriate?

A) "Adam uses adaptive moment estimation with exponentially decaying averages of past gradients and squared gradients."

B) "Adam automatically adjusts how fast each part of the model learns, like having cruise control instead of manual transmission."

C) "Adam has β₁=0.9 and β₂=0.999 which gives better convergence properties."

D) "Adam is the optimizer that won ImageNet so we should use it."

**Correct Answer:** B

**Explanation:** Business stakeholders don't need to understand the mathematical details. The cruise control analogy conveys the key benefit (automatic adaptation) without technical jargon. Options A and C are too technical, and option D doesn't explain anything useful.

---

## Question 6

Which statement about L1 vs L2 regularization is correct?

A) L1 shrinks all weights equally; L2 zeros out some weights
B) L1 can push weights to exactly zero; L2 shrinks but rarely zeros
C) L1 and L2 have identical effects, just different magnitudes
D) L1 should always be preferred because it's simpler

**Correct Answer:** B

**Explanation:** L1 (Lasso) regularization can push weights to exactly zero, effectively performing feature selection. L2 (Ridge) regularization shrinks weights toward zero but rarely makes them exactly zero—it spreads the penalty more evenly. This makes L1 useful when you want automatic feature selection, while L2 is better when you want to keep all features but reduce their magnitudes.

---

## Question 7

You're debugging a model that's stuck at a saddle point (gradient ≈ 0, but not at a minimum). Which optimizer is MOST likely to escape?

A) Vanilla SGD
B) SGD with very high learning rate
C) Adam
D) All optimizers will get equally stuck

**Correct Answer:** C

**Explanation:** At a saddle point, the gradient is near zero, so vanilla SGD takes tiny steps. Adam's momentum component helps push through flat regions by accumulating velocity from before reaching the saddle. Its adaptive learning rates also help by scaling up in directions with small gradients. While SGD with very high learning rate might overshoot entirely, it's not a reliable solution.

---

## Question 8

A data scientist shows you these results:

| Optimizer | Final Loss | Training Time |
|-----------|-----------|---------------|
| SGD | 0.052 | 2 hours |
| Adam | 0.048 | 20 minutes |

They conclude "Adam is always better because it's faster and got lower loss." How would you respond?

A) Agree—Adam is the superior choice in all cases
B) Point out that the 0.004 loss difference might not matter for business metrics
C) Point out that SGD sometimes generalizes better to new data, and we should also check test set performance
D) Both B and C

**Correct Answer:** D

**Explanation:** Both points are valid. First, a 0.004 difference in training loss might be negligible in terms of business impact (precision, revenue, etc.). Second, training loss isn't the final metric—test set performance matters more, and some research shows SGD can generalize better than Adam despite higher training loss. Making optimizer choices based solely on training loss and speed can be misleading.

---

## Scoring

- 8/8: Excellent! You understand optimization deeply.
- 6-7/8: Good grasp of the concepts.
- 4-5/8: Review the sections on optimizers and failure modes.
- <4/8: Revisit the lesson and experiment more with the playground.
