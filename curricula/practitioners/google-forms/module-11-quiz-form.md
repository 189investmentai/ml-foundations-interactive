# Module 11 Quiz: Regularization - Google Forms Setup

## Form Setup

1. Go to https://docs.google.com/forms
2. Click **+ Blank**
3. Settings → Enable **"Make this a quiz"**
4. Enable **"Release grade immediately after submission"**

---

## Form Title & Description

**Title:** Module 11 Quiz: Regularization

**Description:** 
Test your understanding. 8 questions, ~10 minutes.

---

## Questions (Copy-Paste Ready)

### Question 1

**Question:**
Your linear regression model has high training accuracy but low test accuracy. What's happening and what's the likely fix?

**Options:**
- A) Underfitting — reduce regularization
- B) Overfitting — increase regularization ✓ CORRECT
- C) Data leakage — check features
- D) Bad data — collect more samples

**Feedback (add to correct answer):**
High train, low test is the classic sign of overfitting. The model memorized training data patterns that don't generalize. Increasing regularization constrains the model, preventing it from fitting noise.

**Points:** 1

---

### Question 2

**Question:**
You have 200 features but suspect only 20-30 matter. Which regularization should you try first?

**Options:**
- A) L2 (Ridge) — it's more stable
- B) L1 (Lasso) — it performs feature selection ✓ CORRECT
- C) No regularization — let the model decide
- D) Elastic Net with l1_ratio=0

**Feedback (add to correct answer):**
L1 (Lasso) naturally zeros out coefficients for unimportant features, effectively performing feature selection. This is exactly what you need when you suspect most features are irrelevant.

**Points:** 1

---

### Question 3

**Question:**
You're using sklearn's LogisticRegression. To increase regularization, you should:

**Options:**
- A) Increase the C parameter
- B) Decrease the C parameter ✓ CORRECT
- C) Set penalty='none'
- D) Increase max_iter

**Feedback (add to correct answer):**
In LogisticRegression, C = 1/λ, so higher C means LESS regularization. To increase regularization, decrease C. This is the opposite of Ridge/Lasso where higher alpha means more regularization.

**Points:** 1

---

### Question 4

**Question:**
You apply L1 regularization and notice it randomly picks between two highly correlated features across different runs. What should you do?

**Options:**
- A) Increase the regularization strength
- B) Remove one of the correlated features manually
- C) Switch to L2 or Elastic Net ✓ CORRECT
- D) This is fine — the model works

**Feedback (add to correct answer):**
L1 arbitrarily picks one of correlated features because both provide similar information. This makes results unstable. L2 or Elastic Net distribute weight across correlated features, providing more stable coefficients.

**Points:** 1

---

### Question 5

**Question:**
You fit a Lasso model without scaling features. Which problem will likely occur?

**Options:**
- A) Model won't converge
- B) Features with larger scales get penalized more ✓ CORRECT
- C) All coefficients become zero
- D) The model runs slower

**Feedback (add to correct answer):**
Regularization penalizes large weights. Without scaling, features with larger natural scales (e.g., income in dollars vs age in years) have different coefficient magnitudes. The penalty then affects them unequally, potentially removing important features just because of their scale.

**Points:** 1

---

### Question 6

**Question:**
Your Ridge model with alpha=0.01 still overfits. What should you try?

**Options:**
- A) Decrease alpha to 0.001
- B) Increase alpha to 0.1 or higher ✓ CORRECT
- C) Switch to L1
- D) Add more features

**Feedback (add to correct answer):**
Higher alpha = more regularization = simpler model = less overfitting. If alpha=0.01 still overfits, increase it. Use cross-validation to find the optimal value.

**Points:** 1

---

### Question 7

**Question:**
What does it mean when both training and test errors are high?

**Options:**
- A) Overfitting — need more regularization
- B) Underfitting — need less regularization or more features ✓ CORRECT
- C) Good generalization — the model is balanced
- D) Data leakage — check the pipeline

**Feedback (add to correct answer):**
When both train and test errors are high, the model is too simple to capture the underlying patterns — this is underfitting (high bias). Reduce regularization, add more features, or use a more complex model.

**Points:** 1

---

### Question 8

**Question:**
A stakeholder asks why you're constraining the model when it could fit better. The best explanation is:

**Options:**
- A) "L2 regularization minimizes the sum of squared coefficients"
- B) "We're preventing the model from being too confident about any single feature, which makes it more reliable on new data" ✓ CORRECT
- C) "Regularization adds a penalty term to the loss function"
- D) "The bias-variance tradeoff requires us to limit model complexity"

**Feedback (add to correct answer):**
Business stakeholders need intuitive explanations, not technical definitions. Explaining that regularization prevents over-confidence and improves reliability on new data is concrete and meaningful. The other options are technically correct but not accessible.

**Points:** 1

---

