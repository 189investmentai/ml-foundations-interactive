# Module 5 Quiz: Decision Trees - Google Forms Setup

## Form Setup

1. Go to https://docs.google.com/forms
2. Click **+ Blank**
3. Settings → Enable **"Make this a quiz"**
4. Enable **"Release grade immediately after submission"**

---

## Form Title & Description

**Title:** Module 5 Quiz: Decision Trees

**Description:** 
Test your understanding. 8 questions, ~10 minutes.

---

## Questions (Copy-Paste Ready)

### Question 1

**Question:**
Overfitting Detection

**Options:**
- A) The model is underfitting
- B) The model is overfitting ✓ CORRECT
- C) The test set is too small
- D) The features are not predictive

**Feedback (add to correct answer):**
A large gap between train and test accuracy (95% vs 68% = 27% gap) is the classic sign of overfitting. The tree is memorizing training data, including noise, rather than learning generalizable patterns.

**Points:** 1

---

### Question 2

**Question:**
Fixing Overfitting

**Options:**
- A) Add more features
- B) Increase max_depth
- C) Decrease max_depth ✓ CORRECT
- D) Remove training data

**Feedback (add to correct answer):**
Reducing max_depth limits the tree's complexity, preventing it from creating tiny regions that fit noise. This is the most direct way to reduce overfitting in decision trees.

**Points:** 1

---

### Question 3

**Question:**
Gini Impurity

**Options:**
- A) 0.18 ✓ CORRECT
- B) 0.50
- C) 0.10
- D) 0.90

**Feedback (add to correct answer):**
Gini = 1 - p₀² - p₁² = 1 - (0.9)² - (0.1)² = 1 - 0.81 - 0.01 = 0.18 Low Gini (0.18) means the node is relatively pure — mostly one class.

**Points:** 1

---

### Question 4

**Question:**
Why Trees Beat Logistic Regression

**Options:**
- A) Classes separated by a diagonal line
- B) Classes in a checkerboard/XOR pattern ✓ CORRECT
- C) Classes separated by a horizontal line
- D) Classes that are completely overlapping

**Feedback (add to correct answer):**
The XOR pattern (opposite corners are the same class) cannot be separated by a single line — logistic regression fails here. Trees naturally handle this with two perpendicular splits.

**Points:** 1

---

### Question 5

**Question:**
Feature Importance

**Options:**
- A) X is 4.5x more correlated with the target
- B) X contributes more to the tree's splitting decisions ✓ CORRECT
- C) Removing X will reduce accuracy by 45%
- D) X appears in 45% of the tree nodes

**Feedback (add to correct answer):**
Feature importance in trees is based on how much each feature reduces impurity across all splits. Higher importance = more useful for separating classes. It doesn't directly translate to correlation or accuracy impact.

**Points:** 1

---

### Question 6

**Question:**
Stakeholder Communication

**Options:**
- A) "It uses recursive binary partitioning to minimize Gini impurity"
- B) "It's a flowchart: if tenure < 30 days AND tickets > 2, high churn risk" ✓ CORRECT
- C) "It has a 78% accuracy score"
- D) "The AUC-ROC is 0.82"

**Feedback (add to correct answer):**
Trees are interpretable as flowcharts. Translating the model into simple if-then rules is the best way to explain it to non-technical stakeholders. Metrics alone don't explain HOW the model works.

**Points:** 1

---

### Question 7

**Question:**
Choosing Complexity

**Options:**
- A) Depth 3 — simplest model
- B) Depth 6 — highest test accuracy ✓ CORRECT
- C) Depth 10 — highest train accuracy
- D) Depth 1 — to avoid all overfitting

**Feedback (add to correct answer):**
Always optimize for test accuracy (generalization), not train accuracy. Depth 6 has the best test accuracy (74%). Depth 10 has high train accuracy but overfits (test drops to 69%).

**Points:** 1

---

### Question 8

**Question:**
Limitation Awareness

**Options:**
- A) Trees can only handle binary classification
- B) Trees are more prone to overfitting ✓ CORRECT
- C) Trees cannot handle categorical features
- D) Trees always have lower accuracy

**Feedback (add to correct answer):**
Trees can easily memorize training data if not constrained, leading to overfitting. Logistic regression has a simpler hypothesis space (linear boundary) that's harder to overfit. This is why trees usually need regularization (max_depth, min_samples).

**Points:** 1

---

