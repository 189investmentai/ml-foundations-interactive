# Module 4 Quiz: Logistic Regression

Test your understanding with these scenario-based questions.

---

## Q1. Output Interpretation

Your logistic regression model outputs 0.73 for a customer. What does this mean?

**A)** The customer will definitely churn
**B)** The model estimates a 73% probability that the customer will churn ✓
**C)** 73% of similar customers churned in the training data
**D)** The customer's features are 73% similar to churners

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

Logistic regression outputs a probability between 0 and 1. An output of 0.73 means the model estimates a 73% chance of the positive class (churn). It's a probability, not a certainty.
</details>

---

## Q2. Threshold Impact

You lower your classification threshold from 0.5 to 0.3. What happens?

**A)** Both precision and recall increase
**B)** Precision increases, recall decreases
**C)** Precision decreases, recall increases ✓
**D)** Both precision and recall decrease

<details>
<summary>Answer & Explanation</summary>

**Correct: C**

Lowering the threshold means more customers get classified as "churn." This catches more actual churners (recall ↑) but also creates more false alarms (precision ↓). It's the fundamental precision-recall tradeoff.
</details>

---

## Q3. Imbalanced Classes

Your churn model has 97% accuracy on a dataset where only 3% of customers churn. Should you celebrate?

**A)** Yes, 97% accuracy is excellent
**B)** No, the model might just be predicting "no churn" for everyone ✓
**C)** Yes, but only if precision is also high
**D)** No, because 3% churn rate is too low

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

With 3% churn rate, predicting "no churn" for every customer gives 97% accuracy — but catches zero churners! Accuracy is misleading for imbalanced classes. Check recall and precision instead.
</details>

---

## Q4. Confusion Matrix

Your model has: TP=80, TN=900, FP=50, FN=20. What is the recall?

**A)** 80%  ✓
**B)** 62%
**C)** 94%
**D)** 88%

<details>
<summary>Answer & Explanation</summary>

**Correct: A**

Recall = TP / (TP + FN) = 80 / (80 + 20) = 80/100 = 80%

Recall answers: "Of all actual positives (churners), what fraction did we catch?"
</details>

---

## Q5. Metric Selection

You're building a fraud detection system. A false negative (missing fraud) costs $10,000. A false positive (flagging legitimate transaction) costs $10 in review time. Which metric should you prioritize?

**A)** Precision — minimize false positives
**B)** Recall — minimize false negatives ✓
**C)** Accuracy — overall correctness
**D)** F1 — balance both

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

Since false negatives ($10,000) are much more costly than false positives ($10), you should prioritize recall — catching as much fraud as possible, even if it means more false alarms.
</details>

---

## Q6. Coefficient Interpretation

The coefficient for `support_tickets` in your churn model is 0.4. What does this mean?

**A)** Each ticket increases churn probability by 40%
**B)** Each ticket multiplies the odds of churning by about 1.5 ✓
**C)** Customers with 0.4 tickets are most likely to churn
**D)** Support tickets explain 40% of churn

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

In logistic regression, coefficients affect log-odds. The odds ratio is e^0.4 ≈ 1.49. So each additional support ticket multiplies the odds of churning by about 1.5 (50% higher odds).
</details>

---

## Q7. Model Selection

You have a dataset where churners and non-churners overlap significantly in feature space. What should you expect?

**A)** Perfect F1 score is achievable with the right threshold
**B)** There's an inherent limit to how well any threshold can perform ✓
**C)** Logistic regression will fail completely
**D)** Accuracy will be higher than F1

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

When classes overlap, no decision boundary can perfectly separate them. There will always be some errors regardless of threshold. The best you can do is find the threshold that minimizes your cost function.
</details>

---

## Q8. Business Communication

A PM asks: "How good is the churn model?" Your model has precision=0.60 and recall=0.80 at threshold 0.3. What's the best response?

**A)** "It's 60% accurate"
**B)** "We catch 80% of churners, but 40% of our predictions are false alarms" ✓
**C)** "The model is 80% confident"
**D)** "F1 is about 0.69"

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

This translates the metrics into actionable terms. Recall=0.80 means "we catch 80% of churners." Precision=0.60 means "60% of predictions are correct, so 40% are false alarms." This helps the PM understand the tradeoff.
</details>

---

## Scoring

- **8/8:** Excellent! You've mastered classification fundamentals.
- **6-7/8:** Good understanding. Review the questions you missed.
- **4-5/8:** Revisit the micro-lesson and play with the threshold slider more.
- **< 4/8:** Spend more time with the playground exploring precision/recall tradeoffs.
