# Module 9 Quiz: Classification Metrics - Google Forms Setup

## Form Setup

1. Go to https://docs.google.com/forms
2. Click **+ Blank**
3. Settings → Enable **"Make this a quiz"**
4. Enable **"Release grade immediately after submission"**

---

## Form Title & Description

**Title:** Module 9 Quiz: Classification Metrics

**Description:** 
Test your understanding. 8 questions, ~10 minutes.

---

## Questions (Copy-Paste Ready)

### Question 1

**Question:**
Your fraud detection model on imbalanced data (2% fraud) shows:
- Accuracy: 98%
- Precision: 50%
- Recall: 10%

What does this tell you?

**Options:**
- A) The model is excellent — 98% accuracy!
- B) The model is nearly useless — it catches only 10% of fraud despite high accuracy ✓ CORRECT
- C) The 50% precision means half of all transactions are flagged as fraud
- D) The model is overfitting

**Feedback (add to correct answer):**
With 2% fraud, predicting "not fraud" for everyone gives 98% accuracy. This model catches only 10% of actual fraud (recall). The 50% precision means half of flagged transactions are real fraud, but with such low recall, most fraud goes undetected. High accuracy is meaningless here.

**Points:** 1

---

### Question 2

**Question:**
A marketing team can afford to contact 1,000 predicted churners per month. Your model predicts 5,000 customers will churn. What metric matters most?

**Options:**
- A) Overall accuracy
- B) Recall
- C) Precision at 1,000 (Precision@K) ✓ CORRECT
- D) F1 score

**Feedback (add to correct answer):**
With a capacity constraint of 1,000 contacts, you'll take the top 1,000 predictions by probability. What matters is: of those 1,000, how many are actual churners? That's Precision@K. High recall is nice but irrelevant if you can only act on 1,000.

**Points:** 1

---

### Question 3

**Question:**
You're building a medical screening test for a rare but serious disease. Which metric should you prioritize?

**Options:**
- A) Precision — avoid scaring healthy people
- B) Recall — don't miss anyone with the disease ✓ CORRECT
- C) F1 — balance both
- D) Accuracy — maximize correct predictions

**Feedback (add to correct answer):**
For medical screening (not diagnosis), the cost of missing someone with a serious disease far outweighs the cost of follow-up tests on healthy people. High recall is critical. A separate diagnostic test with high precision can be used for those who screen positive.

**Points:** 1

---

### Question 4

**Question:**
Moving your classification threshold from 0.5 to 0.3 will typically:

**Options:**
- A) Increase precision and decrease recall
- B) Decrease precision and increase recall ✓ CORRECT
- C) Increase both precision and recall
- D) Have no effect on precision or recall

**Feedback (add to correct answer):**
A lower threshold means more samples are predicted positive. More positives → you catch more true positives (higher recall) but also more false positives (lower precision). This is the fundamental precision-recall tradeoff.

**Points:** 1

---

### Question 5

**Question:**
Your model has:
- ROC-AUC: 0.92
- PR-AUC: 0.45

The data is highly imbalanced (1% positive class). What does this suggest?

**Options:**
- A) The model is excellent — 0.92 AUC is great
- B) ROC-AUC is inflated by the large negative class; the model struggles with positives ✓ CORRECT
- C) There's a bug in the PR-AUC calculation
- D) The model needs more training data

**Feedback (add to correct answer):**
On highly imbalanced data, ROC-AUC can be deceivingly high because it's dominated by the large negative class (lots of true negatives inflate the curve). PR-AUC focuses on the positive class and reveals the model's true weakness. A PR-AUC of 0.45 on 1% positive rate isn't necessarily bad, but the gap shows ROC-AUC was overly optimistic.

**Points:** 1

---

### Question 6

**Question:**
The cost of a false positive (FP) is $50 (wasted marketing). The cost of a false negative (FN) is $500 (lost customer). What's the optimal threshold?

**Options:**
- A) 0.50
- B) 0.91
- C) 0.09 ✓ CORRECT
- D) 0.10

**Feedback (add to correct answer):**
Optimal threshold = Cost(FP) / (Cost(FP) + Cost(FN)) = 50 / (50 + 500) = 50/550 ≈ 0.09. Since FN is much more costly, we should be aggressive (low threshold) to catch more positives, accepting more false positives.

**Points:** 1

---

### Question 7

**Question:**
Which statement about F1 score is correct?

**Options:**
- A) F1 is always better than accuracy for imbalanced data
- B) F1 assumes precision and recall are equally important ✓ CORRECT
- C) F1 is the arithmetic mean of precision and recall
- D) F1 is threshold-independent like AUC

**Feedback (add to correct answer):**
F1 is the harmonic mean (not arithmetic) of precision and recall, which implicitly weights them equally. If your business values one over the other, F1 may not be the right choice. F1 is also threshold-dependent — it's calculated at a specific threshold.

**Points:** 1

---

### Question 8

**Question:**
A stakeholder asks: "What does AUC = 0.85 mean in plain English?" The best response is:

**Options:**
- A) "The model is 85% accurate"
- B) "If we randomly pick one churner and one non-churner, the model ranks the churner higher 85% of the time" ✓ CORRECT
- C) "85% of our predictions are correct"
- D) "The model catches 85% of churners"

**Feedback (add to correct answer):**
AUC measures the probability that a randomly chosen positive example is ranked higher than a randomly chosen negative example. It's about ranking ability, not accuracy or recall. This explanation makes it intuitive for non-technical stakeholders.

**Points:** 1

---

