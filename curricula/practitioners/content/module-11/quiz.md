# Module 11 Quiz: Regularization

---

## Question 1

Your linear regression model has high training accuracy but low test accuracy. What's happening and what's the likely fix?

A) Underfitting — reduce regularization
B) Overfitting — increase regularization
C) Data leakage — check features
D) Bad data — collect more samples

**Correct Answer:** B

**Explanation:** High train, low test is the classic sign of overfitting. The model memorized training data patterns that don't generalize. Increasing regularization constrains the model, preventing it from fitting noise.

---

## Question 2

You have 200 features but suspect only 20-30 matter. Which regularization should you try first?

A) L2 (Ridge) — it's more stable
B) L1 (Lasso) — it performs feature selection
C) No regularization — let the model decide
D) Elastic Net with l1_ratio=0

**Correct Answer:** B

**Explanation:** L1 (Lasso) naturally zeros out coefficients for unimportant features, effectively performing feature selection. This is exactly what you need when you suspect most features are irrelevant.

---

## Question 3

You're using sklearn's LogisticRegression. To increase regularization, you should:

A) Increase the C parameter
B) Decrease the C parameter
C) Set penalty='none'
D) Increase max_iter

**Correct Answer:** B

**Explanation:** In LogisticRegression, C = 1/λ, so higher C means LESS regularization. To increase regularization, decrease C. This is the opposite of Ridge/Lasso where higher alpha means more regularization.

---

## Question 4

You apply L1 regularization and notice it randomly picks between two highly correlated features across different runs. What should you do?

A) Increase the regularization strength
B) Remove one of the correlated features manually
C) Switch to L2 or Elastic Net
D) This is fine — the model works

**Correct Answer:** C

**Explanation:** L1 arbitrarily picks one of correlated features because both provide similar information. This makes results unstable. L2 or Elastic Net distribute weight across correlated features, providing more stable coefficients.

---

## Question 5

You fit a Lasso model without scaling features. Which problem will likely occur?

A) Model won't converge
B) Features with larger scales get penalized more
C) All coefficients become zero
D) The model runs slower

**Correct Answer:** B

**Explanation:** Regularization penalizes large weights. Without scaling, features with larger natural scales (e.g., income in dollars vs age in years) have different coefficient magnitudes. The penalty then affects them unequally, potentially removing important features just because of their scale.

---

## Question 6

Your Ridge model with alpha=0.01 still overfits. What should you try?

A) Decrease alpha to 0.001
B) Increase alpha to 0.1 or higher
C) Switch to L1
D) Add more features

**Correct Answer:** B

**Explanation:** Higher alpha = more regularization = simpler model = less overfitting. If alpha=0.01 still overfits, increase it. Use cross-validation to find the optimal value.

---

## Question 7

What does it mean when both training and test errors are high?

A) Overfitting — need more regularization
B) Underfitting — need less regularization or more features
C) Good generalization — the model is balanced
D) Data leakage — check the pipeline

**Correct Answer:** B

**Explanation:** When both train and test errors are high, the model is too simple to capture the underlying patterns — this is underfitting (high bias). Reduce regularization, add more features, or use a more complex model.

---

## Question 8

A stakeholder asks why you're constraining the model when it could fit better. The best explanation is:

A) "L2 regularization minimizes the sum of squared coefficients"

B) "We're preventing the model from being too confident about any single feature, which makes it more reliable on new data"

C) "Regularization adds a penalty term to the loss function"

D) "The bias-variance tradeoff requires us to limit model complexity"

**Correct Answer:** B

**Explanation:** Business stakeholders need intuitive explanations, not technical definitions. Explaining that regularization prevents over-confidence and improves reliability on new data is concrete and meaningful. The other options are technically correct but not accessible.

---

## Scoring

- 8/8: Expert level — you understand regularization deeply
- 6-7/8: Solid understanding — review L1/L2 tradeoffs
- 4-5/8: Developing — revisit the sklearn parameter conventions
- <4/8: Review the full lesson and practice with different alphas
