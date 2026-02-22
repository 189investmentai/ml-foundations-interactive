# Module 06: Model Evaluation - Typeform Scenario

**Theme:** You're choosing metrics and thresholds for your churn model based on business constraints.

---

## Q1 (Multiple Choice)
**Your model's AUC is 0.75. A stakeholder asks: "Is that good?" The best answer is:**

- A) "Yes, anything above 0.7 is good"
- B) "It depends on the baseline and business context"
- C) "No, we need at least 0.9"
- D) "AUC doesn't matter, only accuracy does"

**Correct:** B

**Decision Receipt:** AUC of 0.75 means the model ranks a random positive above a random negative 75% of the time. Whether that's "good" depends on: What's the baseline? What's achievable? What business impact does 0.75 enable?

---

## Q2 (Multiple Choice)
**The retention team says: "We can only call 500 customers per week."**

Which metric should you optimize?

- A) Overall accuracy
- B) Recall (find all churners)
- C) Precision@500 (accuracy in top 500)
- D) F1 score

**Correct:** C

**Decision Receipt:** With CAPACITY CONSTRAINTS, you want the top K predictions to be as accurate as possible. Precision@500 directly measures: "Of the 500 customers we flag, how many actually churn?"

---

## Q3 (Multiple Choice)
**Precision@500 = 40% means:**

- A) The model is 40% accurate overall
- B) Of the top 500 flagged customers, about 200 will actually churn
- C) 40% of all churners are in the top 500
- D) The model finds 40% of customers

**Correct:** B

**Decision Receipt:** Precision@K = true positives in top K / K. If 40% of your top 500 are true churners, that's 200 people the retention team can meaningfully help—much better than random calling.

---

## Q4 (Multiple Choice)
**The fraud team says: "We CANNOT miss fraudulent transactions, even if we flag some legitimate ones."**

Which metric should they optimize?

- A) Precision
- B) Recall
- C) Accuracy
- D) AUC

**Correct:** B

**Decision Receipt:** When MISSING POSITIVES is costly (fraud, safety, medical), optimize RECALL. Recall = true positives / all actual positives. High recall means you catch most fraud, even if some false alarms.

---

## Q5 (Multiple Choice)
**If you increase the prediction threshold from 0.3 to 0.6, what happens?**

- A) Both precision and recall increase
- B) Precision increases, recall decreases
- C) Precision decreases, recall increases
- D) Both precision and recall decrease

**Correct:** B

**Decision Receipt:** Higher threshold = stricter criteria = fewer predictions. You flag only the most confident cases (higher precision) but miss more true positives (lower recall). It's always a trade-off.

---

## Q6 (Multiple Choice)
**Your model outputs churn probabilities for 50,000 customers. The retention team can call only 500 this week. What is the best decision rule for now?**

- A) Call everyone with probability > 0.5
- B) Call the top 500 by predicted risk (equivalent to a dynamic threshold)
- C) Ignore probabilities and use random sampling
- D) Use the same threshold from last quarter regardless of current scores

**Correct:** B

**Decision Receipt:** Under fixed capacity, top-k ranking is usually cleaner than a hard universal threshold. The implied threshold can move as model calibration and score distributions change.

---

## Q7 (Multiple Choice)
**Scenario: Each retention call costs $15. Saving a churner is worth $200. Success rate is 30%.**

For a customer with 60% churn probability, should you call?

- A) Yes, 60% > 50%
- B) Calculate expected value: 0.60 × 0.30 × $200 - $15 = $21 > 0, so YES
- C) No, 60% isn't high enough
- D) Need more information

**Correct:** B

**Decision Receipt:** Use EXPECTED VALUE. Probability they churn × probability you save them × value = expected benefit. Subtract cost. If positive, the call is worth it. This is cost-based optimization.

---

## Q8 (Multiple Choice)
**Using the same costs ($15/call, $200 value, 30% success), what's the break-even churn probability?**

We need: P × 0.30 × $200 = $15

- A) 10%
- B) 25%
- C) 50%
- D) 75%

**Correct:** B

**Decision Receipt:** Solving: P × 60 = 15 → P = 0.25 (25%). Customers with >25% churn probability are profitable to call. This becomes your optimal threshold if you have unlimited calling capacity.

---

## Q9 (Multiple Choice)
**Your model predicts 30% churn probability for Customer A. In reality, either they churn (100%) or they don't (0%). Is the model wrong?**

- A) Yes, the model should predict 0% or 100%
- B) No, 30% reflects uncertainty based on similar historical customers
- C) Yes, probabilities should be binary
- D) The model needs calibration

**Correct:** B

**Decision Receipt:** Probabilities represent UNCERTAINTY, not certainty. 30% means: among similar customers in training, 30% churned. We don't know which bucket this specific customer falls into.

---

## Q10 (Multiple Choice)
**"Calibration" in ML means:**

- A) Tuning hyperparameters
- B) Checking if predicted probabilities match actual frequencies
- C) Scaling features before training
- D) Splitting data into train/test

**Correct:** B

**Decision Receipt:** A calibrated model's probabilities are TRUSTWORTHY. If it says 70% churn, then ~70% of such customers actually churn. Calibration curves plot predicted vs actual probabilities.

---

## Q11 (Multiple Choice)
**Your baseline is random selection (12% base churn rate). Your model achieves Precision@500 = 45%. What's the LIFT?**

- A) 45% / 12% = 3.75x
- B) 45% - 12% = 33%
- C) 12% / 45% = 0.27x
- D) 45% × 12% = 5.4%

**Correct:** A

**Decision Receipt:** LIFT = model precision / baseline precision. Your model is 3.75× better than random. This is compelling for stakeholders: "Instead of 60 churners in 500 random calls, we'd reach 225 with the model."

---

## Q12 (Short Answer)
**A PM asks: "Give me one deployment threshold recommendation by Friday." Write 2-3 sentences explaining how you'd choose it.**

**Expected Answer (key points):**
- Use business constraints (capacity/cost) to define objective
- Evaluate candidate thresholds on validation data using Precision@K/recall/expected value
- Recommend threshold with expected impact plus a monitoring plan

**Decision Receipt:** Thresholding is a business decision wrapped in statistics. Good answers connect model outputs to operations, economics, and post-launch monitoring.
