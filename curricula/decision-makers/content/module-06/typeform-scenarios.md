# Module 6: Typeform Scenarios

---

## Scenario 1: Precision vs Recall Tradeoff

**Setup:**
StreamCart's fraud team can manually review 100 transactions per day. Each false positive (blocking a legitimate customer) costs $50 in support time and customer frustration. Each false negative (missing real fraud) costs $200 in chargebacks.

**Question:** Which should the team prioritize?

**Options:**
- A) Maximize recall—catch every fraudster, even if it means more false positives
- B) Maximize precision—only flag high-confidence cases to avoid blocking real customers
- C) Balance both equally using F1
- D) It depends on the cost ratio—here, false negatives cost more, so favor recall

**Correct Answer:** D

**Decision Receipt:**
When costs differ, the optimal choice depends on the cost ratio. Here, a missed fraud ($200) costs 4x more than a false positive ($50). That skews the tradeoff toward recall—you'd rather over-review than miss fraud. Always quantify costs before choosing precision vs recall.

---

## Scenario 2: The Misleading Accuracy

**Setup:**
StreamCart's fraud rate is 0.8%. A colleague built a fraud model that predicts "not fraud" for everyone. The model reports 99.2% accuracy.

**Question:** Why is this accuracy misleading?

**Options:**
- A) 99.2% isn't high enough—we need 99.9%
- B) Accuracy ignores the class imbalance—the model catches zero fraud but looks great
- C) We should use a different random seed
- D) Fraud models should use F1, not accuracy

**Correct Answer:** B

**Decision Receipt:**
With 0.8% fraud, predicting "not fraud" for everyone gives 99.2% accuracy but catches zero fraudsters. Accuracy is dominated by the majority class. For imbalanced problems, use precision, recall, precision@K, or AUC—and always compare to a random or "predict majority" baseline.

---

## Scenario 3: Interpreting Precision@K

**Setup:**
StreamCart's retention team can call 200 customers per week. The base churn rate is 12%. Your model's Precision@200 is 28%.

**Question:** What does this mean in business terms?

**Options:**
- A) 28% of all churners will be in our top 200
- B) Of the 200 customers we call, 28% (56) will actually churn—2.3x better than random
- C) We'll catch 28% of churners overall
- D) The model has 28% accuracy on the top 200

**Correct Answer:** B

**Decision Receipt:**
Precision@K answers: of the top K we act on, how many were correct? Here, 28% of the 200 called will churn (56 customers) vs 12% if we called randomly (24 customers). That's 2.3x lift—the model is helping the team use limited capacity more effectively.

---

## Scenario 4: Threshold Based on Business Cost

**Setup:**
StreamCart uses a churn model to flag customers for retention offers. The default threshold is 0.5. The retention team says: "We're calling too many people who don't churn. We're wasting our time."

**Question:** What should you do?

**Options:**
- A) Retrain the model to improve accuracy
- B) Lower the threshold to 0.3 so we flag fewer people
- C) Raise the threshold so we only call higher-probability churners—fewer calls, higher precision
- D) Use AUC instead—it's threshold-independent

**Correct Answer:** C

**Decision Receipt:**
The default 0.5 threshold is arbitrary. If the team has limited capacity and is wasting calls on non-churners, raise the threshold. That reduces volume and increases precision among those called. Set thresholds based on business constraints (capacity, cost of FP vs FN), not model defaults.

---

## Scenario 5: AUC Alone Is Insufficient

**Setup:**
You're comparing two churn models. Model A has 0.82 AUC; Model B has 0.78 AUC. The retention team can only call 100 customers per week.

**Question:** What should you check before declaring Model A the winner?

**Options:**
- A) Nothing—higher AUC always wins
- B) Precision@100 for both models—Model A might rank poorly in the top 100
- C) The training time—faster is better
- D) Whether Model A has fewer features (simpler is better)

**Correct Answer:** B

**Decision Receipt:**
AUC measures overall ranking quality but doesn't tell you what happens at specific operating points. Model A might be better globally but worse in the top 100—the only region that matters when capacity is 100. Always evaluate at your actual K or threshold before deploying.

---

## Scenario 6: Calibration Matters

**Setup:**
StreamCart uses model probabilities to calculate expected value: "If we offer a $20 retention discount to everyone with >40% churn probability, what's the ROI?" The model says 30% of customers have >40% churn probability. The actual churn rate among those customers is 15%.

**Question:** What's wrong?

**Options:**
- A) The model has low AUC
- B) The model is poorly calibrated—probabilities don't match reality
- C) We need more training data
- D) We should use a different threshold

**Correct Answer:** B

**Decision Receipt:**
Calibration means predicted probabilities match actual rates. Here, the model overstates risk—it says 40%+ but only 15% actually churn. That inflates expected value calculations and leads to bad decisions. For probability-based decisions, check calibration (e.g., calibration curves) and consider isotonic or Platt scaling.

---

## Scoring Summary

**6/6 correct:** Strong understanding of evaluation metrics and business alignment.

**4-5/6 correct:** Good foundation. Review precision vs recall and calibration.

**<4/6 correct:** Re-read the micro-lesson, especially the metrics zoo and calibration sections.
