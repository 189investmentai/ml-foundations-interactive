# Module 4 Quiz: Logistic Regression - Google Forms Setup

## Form Setup

1. Go to https://docs.google.com/forms
2. Click **+ Blank**
3. Settings → Enable **"Make this a quiz"**
4. Enable **"Release grade immediately after submission"**

---

## Form Title & Description

**Title:** Module 4 Quiz: Logistic Regression

**Description:** 
Test your understanding. 8 questions, ~10 minutes.

---

## Questions (Copy-Paste Ready)

### Question 1

**Question:**
Output Interpretation

**Options:**
- A) The customer will definitely churn
- B) The model estimates a 73% probability that the customer will churn ✓ CORRECT
- C) 73% of similar customers churned in the training data
- D) The customer's features are 73% similar to churners

**Feedback (add to correct answer):**
Logistic regression outputs a probability between 0 and 1. An output of 0.73 means the model estimates a 73% chance of the positive class (churn). It's a probability, not a certainty.

**Points:** 1

---

### Question 2

**Question:**
Threshold Impact

**Options:**
- A) Both precision and recall increase
- B) Precision increases, recall decreases
- C) Precision decreases, recall increases ✓ CORRECT
- D) Both precision and recall decrease

**Feedback (add to correct answer):**
Lowering the threshold means more customers get classified as "churn." This catches more actual churners (recall ↑) but also creates more false alarms (precision ↓). It's the fundamental precision-recall tradeoff.

**Points:** 1

---

### Question 3

**Question:**
Imbalanced Classes

**Options:**
- A) Yes, 97% accuracy is excellent
- B) No, the model might just be predicting "no churn" for everyone ✓ CORRECT
- C) Yes, but only if precision is also high
- D) No, because 3% churn rate is too low

**Feedback (add to correct answer):**
With 3% churn rate, predicting "no churn" for every customer gives 97% accuracy — but catches zero churners! Accuracy is misleading for imbalanced classes. Check recall and precision instead.

**Points:** 1

---

### Question 4

**Question:**
Confusion Matrix

**Options:**
- A) 80% ✓ CORRECT
- B) 62%
- C) 94%
- D) 88%

**Feedback (add to correct answer):**
Recall = TP / (TP + FN) = 80 / (80 + 20) = 80/100 = 80% Recall answers: "Of all actual positives (churners), what fraction did we catch?"

**Points:** 1

---

### Question 5

**Question:**
Metric Selection

**Options:**
- A) Precision — minimize false positives
- B) Recall — minimize false negatives ✓ CORRECT
- C) Accuracy — overall correctness
- D) F1 — balance both

**Feedback (add to correct answer):**
Since false negatives ($10,000) are much more costly than false positives ($10), you should prioritize recall — catching as much fraud as possible, even if it means more false alarms.

**Points:** 1

---

### Question 6

**Question:**
Coefficient Interpretation

**Options:**
- A) Each ticket increases churn probability by 40%
- B) Each ticket multiplies the odds of churning by about 1.5 ✓ CORRECT
- C) Customers with 0.4 tickets are most likely to churn
- D) Support tickets explain 40% of churn

**Feedback (add to correct answer):**
In logistic regression, coefficients affect log-odds. The odds ratio is e^0.4 ≈ 1.49. So each additional support ticket multiplies the odds of churning by about 1.5 (50% higher odds).

**Points:** 1

---

### Question 7

**Question:**
Model Selection

**Options:**
- A) Perfect F1 score is achievable with the right threshold
- B) There's an inherent limit to how well any threshold can perform ✓ CORRECT
- C) Logistic regression will fail completely
- D) Accuracy will be higher than F1

**Feedback (add to correct answer):**
When classes overlap, no decision boundary can perfectly separate them. There will always be some errors regardless of threshold. The best you can do is find the threshold that minimizes your cost function.

**Points:** 1

---

### Question 8

**Question:**
Business Communication

**Options:**
- A) "It's 60% accurate"
- B) "We catch 80% of churners, but 40% of our predictions are false alarms" ✓ CORRECT
- C) "The model is 80% confident"
- D) "F1 is about 0.69"

**Feedback (add to correct answer):**
This translates the metrics into actionable terms. Recall=0.80 means "we catch 80% of churners." Precision=0.60 means "60% of predictions are correct, so 40% are false alarms." This helps the PM understand the tradeoff.

**Points:** 1

---

