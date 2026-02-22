# Module 02: Logistic Regression - Typeform Scenario

**Theme:** You've trained a logistic regression model and need to interpret the results for stakeholders.

---

## Q1 (Multiple Choice)
**Your logistic regression model has these coefficients:**
```
support_tickets: +0.72
tenure_months: -0.35
logins_last_30d: -0.18
```

**Which statement is TRUE?**

- A) Customers with more support tickets are LESS likely to churn
- B) Customers with longer tenure are MORE likely to churn
- C) Customers with more support tickets are MORE likely to churn
- D) Logins have the strongest effect on churn

**Correct:** C

**Decision Receipt:** Positive coefficient = increases churn probability. Negative = decreases. The +0.72 on support_tickets means more tickets → higher churn risk. Tenure and logins are protective (negative).

---

## Q2 (Multiple Choice)
**The coefficient for `tenure_months` is -0.35. In plain English, this means:**

- A) Tenure causes customers to stay
- B) On average, longer tenure is associated with lower churn probability
- C) Every month reduces churn by 35%
- D) Tenure is the most important feature

**Correct:** B

**Decision Receipt:** Coefficients show ASSOCIATION, not causation. The negative sign means longer tenure correlates with lower churn. The magnitude (-0.35) is relative to other features, not a direct percentage.

---

## Q3 (Multiple Choice)
**Your model gives Customer A a probability of 0.73 (73%). This means:**

- A) There's a 73% chance the model is correct about this customer
- B) 73% of similar customers churned in training data
- C) The customer will definitely churn
- D) The model is 73% confident in its prediction

**Correct:** B

**Decision Receipt:** A probability of 0.73 means: among customers with similar feature values in the training data, about 73% churned. It's a statistical estimate, not certainty about this individual.

---

## Q4 (Multiple Choice)
**You notice that `orders_last_30d` has a POSITIVE coefficient (+0.15), meaning more orders = higher churn. This seems backward. What's most likely happening?**

- A) The model is broken
- B) Ordering more actually does cause churn
- C) There might be multicollinearity with another feature
- D) You should remove this feature immediately

**Correct:** C

**Decision Receipt:** Counterintuitive coefficients often signal MULTICOLLINEARITY—when two features are highly correlated, their coefficients become unstable. Check if orders correlates strongly with another feature like tenure.

---

## Q5 (Multiple Choice)
**To fix potential multicollinearity, you should:**

- A) Add more features
- B) Check correlations between features and remove redundant ones
- C) Use a deeper neural network
- D) Increase the training data size

**Correct:** B

**Decision Receipt:** First, compute a correlation matrix. If two features correlate above ~0.7, consider removing one. This stabilizes coefficients and makes interpretation reliable.

---

## Q6 (Multiple Choice)
**A stakeholder asks: "Which customer attribute matters MOST for churn?"**

Based on coefficients `support_tickets: +0.72, tenure: -0.35, logins: -0.18`, which answer is best?

- A) "Support tickets—it has the largest positive coefficient"
- B) "Tenure—longer tenure means guaranteed retention"
- C) "Support tickets has the largest magnitude, suggesting the strongest association"
- D) "They all matter equally"

**Correct:** C

**Decision Receipt:** Compare MAGNITUDE (absolute value), not just sign. |0.72| > |0.35| > |0.18|. But be careful: this assumes features are on similar scales. If not, use standardized coefficients.

---

## Q7 (Multiple Choice)
**Your features have very different scales:**
```
tenure_months: 0-60
logins_last_30d: 0-100
nps_score: 1-10
```

**Before training logistic regression, you should:**

- A) Nothing, logistic regression handles this automatically
- B) Scale features to have similar ranges (e.g., StandardScaler)
- C) Convert all features to percentages
- D) Remove the smallest-scale feature

**Correct:** B

**Decision Receipt:** Logistic regression coefficients are affected by feature scale. Without scaling, larger-scale features may dominate. StandardScaler (mean=0, std=1) makes coefficients comparable.

---

## Q8 (Multiple Choice)
**After scaling, your coefficient for `tenure_months` is -0.45. A stakeholder asks what this means in real terms. The best answer is:**

- A) "Each month reduces churn probability by 45%"
- B) "A one standard-deviation increase in tenure is associated with lower churn"
- C) "Tenure is 45% important"
- D) "We need 45 months of tenure to prevent churn"

**Correct:** B

**Decision Receipt:** With standardized features, coefficients represent the effect of a one-standard-deviation change. This makes features comparable but loses direct interpretability in original units.

---

## Q9 (Multiple Choice)
**Your model has 70% accuracy on a dataset where 10% of customers churn. A colleague says "70% is decent." What's wrong with this assessment?**

- A) Nothing, 70% is good
- B) 70% is actually worse than guessing "no churn" for everyone (90% accuracy)
- C) We should use 80% as the threshold
- D) Accuracy can't be used for classification

**Correct:** B

**Decision Receipt:** With 10% churn rate, predicting "no one churns" gives 90% accuracy! Your 70% model is worse than this naive baseline. For imbalanced data, use precision, recall, or AUC instead.

---

## Q10 (Multiple Choice)
**You compare two churn models for a regulated market:**

Model A (LogReg): AUC 0.74, clear reason codes  
Model B (GBM): AUC 0.79, hard to explain per customer

Compliance requires explainable adverse-action reasons for every flagged customer. Which is best for initial launch?

- A) Model B, because higher AUC always wins
- B) Model A, because explainability is a hard requirement
- C) Use either; compliance can be handled later
- D) Reject both and collect more data first

**Correct:** B

**Decision Receipt:** If explainability is non-negotiable, a slightly weaker but transparent model can be the right business decision. You can iterate to stronger models later with interpretability tooling.

---

## Q11 (Multiple Choice)
**You see this after retraining logistic regression:**

Training AUC: 0.85  
Validation AUC: 0.72  
Precision@500: unchanged vs previous model

What should you do NEXT?

- A) Ship immediately because training AUC improved
- B) Add regularization / simplify features and re-evaluate on validation
- C) Increase threshold to 0.9 and ignore validation AUC
- D) Switch to a neural network immediately

**Correct:** B

**Decision Receipt:** Better training metrics with flat business metrics usually means you've fit noise, not signal. Reduce complexity and judge progress on unseen-data performance plus top-k business impact.

---

## Q12 (Short Answer)
**A PM asks: "So support tickets CAUSE churn?" Draft a 2-3 sentence response that is honest and actionable.**

**Expected Answer (key points):**
- Coefficients show association, not proof of causation
- Still useful for prediction and prioritization
- Suggest a follow-up test/intervention (e.g., improve support response time for high-ticket users and measure impact)

**Decision Receipt:** Great ML communication balances rigor and action: don't overclaim causality, but do convert model signal into testable business steps.
