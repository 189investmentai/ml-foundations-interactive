# Module 6 Quiz: Ensemble Methods

Test your understanding with these scenario-based questions.

---

## Q1. Why Ensembles Work

Why does averaging predictions from 100 trees often beat a single tree?

**A)** Each tree is perfectly accurate
**B)** Individual random errors cancel out when averaged ✓
**C)** More trees always mean more accuracy
**D)** Trees communicate during training

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

Ensemble methods work because individual trees make different errors (due to different training samples and feature subsets). When averaged, these random errors tend to cancel out, leaving the signal. This is the "wisdom of crowds" effect.
</details>

---

## Q2. Bagging vs Boosting

Which statement correctly distinguishes Random Forest (bagging) from Gradient Boosting?

**A)** Random Forest trains sequentially, Boosting trains in parallel
**B)** Random Forest reduces bias, Boosting reduces variance
**C)** Random Forest reduces variance, Boosting reduces bias ✓
**D)** Both methods are identical but named differently

<details>
<summary>Answer & Explanation</summary>

**Correct: C**

Random Forest (bagging) trains trees independently on different samples, which reduces variance by averaging out overfitting. Gradient Boosting trains trees sequentially, with each tree correcting prior errors, which reduces bias by building up model complexity.
</details>

---

## Q3. Overfitting in Boosting

Your XGBoost model has 95% train accuracy but 72% test accuracy after 500 rounds. What should you try FIRST?

**A)** Increase the number of rounds to 1000
**B)** Use early stopping ✓
**C)** Remove features
**D)** Increase the learning rate

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

The large train-test gap (23%) indicates overfitting. Early stopping monitors validation loss and stops training when it stops improving, preventing the model from fitting noise. This is the standard fix for boosting overfitting.
</details>

---

## Q4. Diminishing Returns

You're training a Random Forest. Accuracy improves as you add trees:
- 10 trees: 78% test accuracy
- 50 trees: 82% test accuracy
- 100 trees: 82.5% test accuracy
- 500 trees: 82.7% test accuracy

What's the practical conclusion?

**A)** Keep adding trees until you hit 90%
**B)** ~100 trees is sufficient; more gives diminishing returns ✓
**C)** The model is broken because accuracy isn't increasing
**D)** Switch to boosting immediately

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

This is a classic diminishing returns curve. Going from 100 to 500 trees (5x compute) only adds 0.2% accuracy. For most applications, ~100 trees is the practical sweet spot balancing accuracy and training time.
</details>

---

## Q5. Tree Depth in Boosting

Why do Gradient Boosting implementations typically use shallow trees (depth 3-6)?

**A)** Deep trees are computationally impossible
**B)** Each tree only needs to correct small residuals ✓
**C)** Shallow trees are more accurate
**D)** It's a historical convention with no reason

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

In boosting, each tree is a "weak learner" that only needs to slightly improve on the previous ensemble. Deep trees would overfit to the current residuals. By using shallow trees and adding many of them, boosting builds complexity gradually and controllably.
</details>

---

## Q6. Feature Importance

In a Random Forest, feature X has importance 0.25 and feature Y has importance 0.05. What does this mean?

**A)** X is 5x more correlated with the target
**B)** X contributed more to impurity reduction across all trees ✓
**C)** Removing X will drop accuracy by 25%
**D)** X appears in 25% of all nodes

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

Feature importance in tree ensembles is calculated based on how much each feature reduces impurity (Gini) across all splits in all trees. Higher importance means the feature was more useful for separating classes.
</details>

---

## Q7. Model Selection

You need a churn prediction model for a small e-commerce site. The team has limited ML experience. Which approach is best?

**A)** Start with a highly-tuned XGBoost model
**B)** Start with Random Forest with default parameters ✓
**C)** Use a single decision tree for interpretability
**D)** Skip to neural networks for best accuracy

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

Random Forest with defaults is the best starting point: it's robust, hard to mess up, provides good accuracy out-of-the-box, and requires minimal tuning. The team can always upgrade to Gradient Boosting later if they need more accuracy.
</details>

---

## Q8. Stakeholder Communication

The marketing team asks why you're using 100 models instead of 1. What's the BEST response?

**A)** "It's called bagging and uses bootstrap aggregation"
**B)** "More models = more accuracy, always"
**C)** "Combining predictions from 100 rules gives more stable, accurate results than any single rule" ✓
**D)** "Single models are outdated technology"

<details>
<summary>Answer & Explanation</summary>

**Correct: C**

This explanation is accurate and accessible. It conveys the key insight (stability through aggregation) without jargon. It's honest about the tradeoff (100 rules vs 1) and explains why it's worth it.
</details>

---

## Scoring

- **8/8:** Excellent! Ready for advanced topics.
- **6-7/8:** Good understanding. Review bagging vs boosting.
- **4-5/8:** Revisit the playground, especially overfitting scenarios.
- **< 4/8:** Spend more time with the bias-variance tradeoff concepts.
