# Module 6 Quiz: Ensemble Methods - Google Forms Setup

## Form Setup

1. Go to https://docs.google.com/forms
2. Click **+ Blank**
3. Settings → Enable **"Make this a quiz"**
4. Enable **"Release grade immediately after submission"**

---

## Form Title & Description

**Title:** Module 6 Quiz: Ensemble Methods

**Description:** 
Test your understanding. 8 questions, ~10 minutes.

---

## Questions (Copy-Paste Ready)

### Question 1

**Question:**
Why Ensembles Work

**Options:**
- A) Each tree is perfectly accurate
- B) Individual random errors cancel out when averaged ✓ CORRECT
- C) More trees always mean more accuracy
- D) Trees communicate during training

**Feedback (add to correct answer):**
Ensemble methods work because individual trees make different errors (due to different training samples and feature subsets). When averaged, these random errors tend to cancel out, leaving the signal. This is the "wisdom of crowds" effect.

**Points:** 1

---

### Question 2

**Question:**
Bagging vs Boosting

**Options:**
- A) Random Forest trains sequentially, Boosting trains in parallel
- B) Random Forest reduces bias, Boosting reduces variance
- C) Random Forest reduces variance, Boosting reduces bias ✓ CORRECT
- D) Both methods are identical but named differently

**Feedback (add to correct answer):**
Random Forest (bagging) trains trees independently on different samples, which reduces variance by averaging out overfitting. Gradient Boosting trains trees sequentially, with each tree correcting prior errors, which reduces bias by building up model complexity.

**Points:** 1

---

### Question 3

**Question:**
Overfitting in Boosting

**Options:**
- A) Increase the number of rounds to 1000
- B) Use early stopping ✓ CORRECT
- C) Remove features
- D) Increase the learning rate

**Feedback (add to correct answer):**
The large train-test gap (23%) indicates overfitting. Early stopping monitors validation loss and stops training when it stops improving, preventing the model from fitting noise. This is the standard fix for boosting overfitting.

**Points:** 1

---

### Question 4

**Question:**
Diminishing Returns

**Options:**
- A) Keep adding trees until you hit 90%
- B) ~100 trees is sufficient; more gives diminishing returns ✓ CORRECT
- C) The model is broken because accuracy isn't increasing
- D) Switch to boosting immediately

**Feedback (add to correct answer):**
This is a classic diminishing returns curve. Going from 100 to 500 trees (5x compute) only adds 0.2% accuracy. For most applications, ~100 trees is the practical sweet spot balancing accuracy and training time.

**Points:** 1

---

### Question 5

**Question:**
Tree Depth in Boosting

**Options:**
- A) Deep trees are computationally impossible
- B) Each tree only needs to correct small residuals ✓ CORRECT
- C) Shallow trees are more accurate
- D) It's a historical convention with no reason

**Feedback (add to correct answer):**
In boosting, each tree is a "weak learner" that only needs to slightly improve on the previous ensemble. Deep trees would overfit to the current residuals. By using shallow trees and adding many of them, boosting builds complexity gradually and controllably.

**Points:** 1

---

### Question 6

**Question:**
Feature Importance

**Options:**
- A) X is 5x more correlated with the target
- B) X contributed more to impurity reduction across all trees ✓ CORRECT
- C) Removing X will drop accuracy by 25%
- D) X appears in 25% of all nodes

**Feedback (add to correct answer):**
Feature importance in tree ensembles is calculated based on how much each feature reduces impurity (Gini) across all splits in all trees. Higher importance means the feature was more useful for separating classes.

**Points:** 1

---

### Question 7

**Question:**
Model Selection

**Options:**
- A) Start with a highly-tuned XGBoost model
- B) Start with Random Forest with default parameters ✓ CORRECT
- C) Use a single decision tree for interpretability
- D) Skip to neural networks for best accuracy

**Feedback (add to correct answer):**
Random Forest with defaults is the best starting point: it's robust, hard to mess up, provides good accuracy out-of-the-box, and requires minimal tuning. The team can always upgrade to Gradient Boosting later if they need more accuracy.

**Points:** 1

---

### Question 8

**Question:**
Stakeholder Communication

**Options:**
- A) "It's called bagging and uses bootstrap aggregation"
- B) "More models = more accuracy, always"
- C) "Combining predictions from 100 rules gives more stable, accurate results than any single rule" ✓ CORRECT
- D) "Single models are outdated technology"

**Feedback (add to correct answer):**
This explanation is accurate and accessible. It conveys the key insight (stability through aggregation) without jargon. It's honest about the tradeoff (100 rules vs 1) and explains why it's worth it.

**Points:** 1

---

