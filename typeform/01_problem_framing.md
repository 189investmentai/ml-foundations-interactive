# Module 01: Problem Framing - Typeform Scenario

**Theme:** You're an ML practitioner at StreamCart. Leadership wants to reduce churn.

---

## Q1 (Multiple Choice)
**The VP of Customer Success says: "We're losing too many customers. Can you build something to help?"**

What's your FIRST response?

- A) "Sure, I'll start training a model on our customer data"
- B) "What action would you take if I could identify at-risk customers?"
- C) "Let me check what AUC we can achieve"
- D) "I'll need a bigger GPU cluster"

**Correct:** B

**Decision Receipt:** Always start by defining the ACTION. Without knowing what the business will DO with predictions, you can't choose the right metric, threshold, or model. "Build a churn model" is not a goal—"call 500 at-risk customers weekly" is.

---

## Q2 (Multiple Choice)
**The VP clarifies: "Our retention team can call 500 customers per week. Each call costs $15. Saved customer value is ~$180."**

What should the model output FIRST?

- A) A hard yes/no churn label only
- B) A churn risk score (probability) so we can rank top 500
- C) A cluster ID for each customer
- D) A feature importance chart for leadership

**Correct:** B

**Decision Receipt:** You still have a classification problem, but operationally you need a RANKED list under a fixed capacity. Risk scores let you pick top 500 and tune the threshold as costs/capacity change. A hard label is too rigid.

---

## Q3 (Multiple Choice)
**You need to define the target variable (y). Which definition is best?**

- A) `churn = 1` if customer ever cancels
- B) `churn = 1` if customer cancels within 30 days of prediction
- C) `churn = 1` if customer hasn't logged in recently
- D) `churn = 1` if customer has filed support tickets

**Correct:** B

**Decision Receipt:** Your target needs a clear TIME WINDOW. "Ever cancels" is too vague—you need predictions to be actionable. 30 days gives the retention team time to intervene. Options C and D are features, not targets.

---

## Q4 (Multiple Choice)
**A colleague suggests adding this feature: `days_until_churn = churn_date - today`**

What's wrong with this?

- A) Nothing, it's a useful feature
- B) It's data leakage - we wouldn't know churn_date at prediction time
- C) The calculation is incorrect
- D) It should be a categorical variable

**Correct:** B

**Decision Receipt:** This is DATA LEAKAGE. At prediction time, you don't know when (or if) a customer will churn. Using future information gives unrealistically high accuracy that won't hold in production.

---

## Q5 (Multiple Choice)
**Which of these features is SAFE to use?**

- A) `cancel_reason` - the reason they gave when canceling
- B) `tenure_months` - how long they've been a customer
- C) `days_until_churn` - days between prediction and churn
- D) `refund_amount` - refund given after they complained about cancellation

**Correct:** B

**Decision Receipt:** Only `tenure_months` is available at prediction time. The others all depend on events that happen AFTER the customer decides to churn (or involve future data).

---

## Q6 (Multiple Choice)
**Given the "500 calls per week" constraint, which metric should you optimize?**

- A) Accuracy
- B) AUC-ROC
- C) Precision@500
- D) F1 Score

**Correct:** C

**Decision Receipt:** With a fixed capacity (500 calls), you want the TOP 500 predictions to be as accurate as possible. Precision@K directly measures this. AUC measures overall ranking but doesn't account for your specific cutoff.

---

## Q7 (Multiple Choice)
**Your model achieves 95% accuracy. Is this good?**

- A) Yes, 95% is excellent
- B) It depends on the base churn rate
- C) No, we need at least 99%
- D) Accuracy doesn't matter, only AUC does

**Correct:** B

**Decision Receipt:** If only 5% of customers churn, a model that predicts "no one churns" gets 95% accuracy while being useless. Always compare to the BASE RATE. For imbalanced problems, accuracy is misleading.

---

## Q8 (Multiple Choice)
**The data team offers two options for model development:**

Dataset A: 18 months of historical snapshots with outcomes  
Dataset B: last 7 days of fresh customer features (no finalized outcomes yet)

Which setup is best for v1?

- A) Train and validate on Dataset B only because it's freshest
- B) Train on Dataset A with a time-based split; score weekly on fresh data like Dataset B
- C) Randomly merge A and B, then do a random train/test split
- D) Train on A, but evaluate on A training rows to move faster

**Correct:** B

**Decision Receipt:** You need historical labeled data to learn patterns and a time-based split to simulate real deployment. Then score on fresh operational data. Random mixing can leak time and overstate performance.

---

## Q9 (Multiple Choice)
**A PM asks: "Can the model tell us WHY customers churn?"**

What's the honest answer?

- A) "Yes, the feature importances tell us exactly why"
- B) "The model finds patterns, but correlation isn't causation"
- C) "No, ML models can't provide any insights"
- D) "Only deep learning can answer 'why' questions"

**Correct:** B

**Decision Receipt:** ML models find CORRELATIONS that help predict outcomes. They don't prove CAUSATION. High support tickets might correlate with churn, but that doesn't mean tickets cause churn—both might be caused by a bad product experience.

---

## Q10 (Multiple Choice)
**You've built the model. Before deploying, you should verify:**

- A) The training AUC is above 0.9
- B) The model performs well on data it hasn't seen (test set)
- C) The code runs without errors
- D) The PM approves the feature list

**Correct:** B

**Decision Receipt:** The key validation is HOLDOUT PERFORMANCE. A model that performs well on training data but fails on unseen data is useless. Always reserve a test set the model never sees during development.

---

## Q11 (Short Answer)
**Write a 1-sentence ML problem statement for this churn use case. Include: (a) action, (b) prediction window, (c) success metric.**

**Expected Answer (example):** "Each week, rank customers by probability of churning in the next 30 days so the retention team can call top 500, and optimize Precision@500 (plus lift vs random)."

**Decision Receipt:** If your sentence includes action + window + metric, you're ready to build. If any piece is missing, you'll likely pick the wrong data, target, or evaluation setup.

---

## Q12 (Multiple Choice)
**You test two models for a "top 500 calls/week" program:**

Model A: AUC 0.81, Precision@500 0.31  
Model B: AUC 0.76, Precision@500 0.43

Which is the better deployment choice right now?

- A) Model A, because AUC is higher
- B) Model B, because top-500 precision aligns with team capacity
- C) Both are equal; pick whichever is easier to code
- D) Neither; always optimize recall first

**Correct:** B

**Decision Receipt:** Under fixed outreach capacity, business impact comes from who is in the top 500. Global AUC matters, but Precision@K is the decisive metric for this workflow.
