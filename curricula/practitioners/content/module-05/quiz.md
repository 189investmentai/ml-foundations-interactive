# Module 5 Quiz: Decision Trees

Test your understanding with these scenario-based questions.

---

## Q1. Overfitting Detection

Your decision tree has 95% training accuracy but only 68% test accuracy. What's happening?

**A)** The model is underfitting
**B)** The model is overfitting ✓
**C)** The test set is too small
**D)** The features are not predictive

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

A large gap between train and test accuracy (95% vs 68% = 27% gap) is the classic sign of overfitting. The tree is memorizing training data, including noise, rather than learning generalizable patterns.
</details>

---

## Q2. Fixing Overfitting

What's the BEST first step to fix an overfit decision tree?

**A)** Add more features
**B)** Increase max_depth
**C)** Decrease max_depth ✓
**D)** Remove training data

<details>
<summary>Answer & Explanation</summary>

**Correct: C**

Reducing max_depth limits the tree's complexity, preventing it from creating tiny regions that fit noise. This is the most direct way to reduce overfitting in decision trees.
</details>

---

## Q3. Gini Impurity

A node contains 100 samples: 90 class A, 10 class B. What's the Gini impurity?

**A)** 0.18 ✓
**B)** 0.50
**C)** 0.10
**D)** 0.90

<details>
<summary>Answer & Explanation</summary>

**Correct: A**

Gini = 1 - p₀² - p₁² = 1 - (0.9)² - (0.1)² = 1 - 0.81 - 0.01 = 0.18

Low Gini (0.18) means the node is relatively pure — mostly one class.
</details>

---

## Q4. Why Trees Beat Logistic Regression

For which pattern would a decision tree significantly outperform logistic regression?

**A)** Classes separated by a diagonal line
**B)** Classes in a checkerboard/XOR pattern ✓
**C)** Classes separated by a horizontal line
**D)** Classes that are completely overlapping

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

The XOR pattern (opposite corners are the same class) cannot be separated by a single line — logistic regression fails here. Trees naturally handle this with two perpendicular splits.
</details>

---

## Q5. Feature Importance

In a decision tree, feature X has importance 0.45 and feature Y has importance 0.10. What does this mean?

**A)** X is 4.5x more correlated with the target
**B)** X contributes more to the tree's splitting decisions ✓
**C)** Removing X will reduce accuracy by 45%
**D)** X appears in 45% of the tree nodes

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

Feature importance in trees is based on how much each feature reduces impurity across all splits. Higher importance = more useful for separating classes. It doesn't directly translate to correlation or accuracy impact.
</details>

---

## Q6. Stakeholder Communication

A PM asks you to explain how the churn model works. What's the BEST response?

**A)** "It uses recursive binary partitioning to minimize Gini impurity"
**B)** "It's a flowchart: if tenure < 30 days AND tickets > 2, high churn risk" ✓
**C)** "It has a 78% accuracy score"
**D)** "The AUC-ROC is 0.82"

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

Trees are interpretable as flowcharts. Translating the model into simple if-then rules is the best way to explain it to non-technical stakeholders. Metrics alone don't explain HOW the model works.
</details>

---

## Q7. Choosing Complexity

You're tuning max_depth for a noisy dataset. You try depths 1-10 and observe:
- Depth 3: Train 75%, Test 73%
- Depth 6: Train 88%, Test 74%
- Depth 10: Train 98%, Test 69%

Which depth should you choose?

**A)** Depth 3 — simplest model
**B)** Depth 6 — highest test accuracy ✓
**C)** Depth 10 — highest train accuracy
**D)** Depth 1 — to avoid all overfitting

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

Always optimize for test accuracy (generalization), not train accuracy. Depth 6 has the best test accuracy (74%). Depth 10 has high train accuracy but overfits (test drops to 69%).
</details>

---

## Q8. Limitation Awareness

What is a fundamental limitation of decision trees compared to logistic regression?

**A)** Trees can only handle binary classification
**B)** Trees are more prone to overfitting ✓
**C)** Trees cannot handle categorical features
**D)** Trees always have lower accuracy

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

Trees can easily memorize training data if not constrained, leading to overfitting. Logistic regression has a simpler hypothesis space (linear boundary) that's harder to overfit. This is why trees usually need regularization (max_depth, min_samples).
</details>

---

## Scoring

- **8/8:** Excellent! Ready for ensembles.
- **6-7/8:** Good understanding. Review the tradeoffs.
- **4-5/8:** Revisit the overfitting concepts in the playground.
- **< 4/8:** Spend more time experimenting with different depths and noise levels.
