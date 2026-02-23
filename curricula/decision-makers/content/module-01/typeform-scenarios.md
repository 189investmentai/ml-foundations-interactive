# Module 1: Typeform Scenarios

**Instructions for Typeform setup:**
- Create one Typeform with 7 scenarios
- Each scenario is multiple choice
- After each answer, show the "Decision Receipt" as a thank-you screen or logic jump
- Use branching: if they get Q1-Q2 wrong, add a remediation note before Q3

---

## Scenario 1: Is This an ML Problem?

**Setup:**
Your company's support team wants to reduce response time. They ask: "Can we use ML to answer customer emails automatically?"

You have:
- 50,000 historical support tickets with responses
- 15 categories of issues (billing, shipping, returns, etc.)
- Average response time is currently 4 hours

**Question:** What's the right first step?

**Options:**
- A) Start building an email classification model immediately
- B) Ask what action they'll take with the classification
- C) Tell them ML can't help with this problem
- D) Ask for more training data

**Correct Answer:** B

**Decision Receipt:**
Before building anything, you need to know the action. Will classification auto-respond? Route to specialists? Prioritize the queue? Each requires a different model. Option A skips this critical step. Option C is wrong—ML can definitely help here. Option D is premature—50K examples is plenty; the problem is framing, not data volume.

---

## Scenario 2: Defining the Label

**Setup:**
StreamCart wants to predict churn. The data team proposes this label definition:

"Churned = 1 if the customer hasn't logged in for 30 days"

**Question:** What's the problem with this label?

**Options:**
- A) 30 days is too short; should be 60 days
- B) "Hasn't logged in" isn't the same as "canceled subscription"
- C) The label should be continuous, not binary
- D) There's no problem; this is a good label

**Correct Answer:** B

**Decision Receipt:**
"Inactive" and "churned" are different things. A customer might not log in for 30 days but still be subscribed (and still paying). If you want to predict subscription cancellation, the label should be "canceled subscription," not "inactive." This is one of the most common labeling mistakes—optimizing for a proxy instead of the actual outcome you care about.

---

## Scenario 3: Spotting Leakage

**Setup:**
A data scientist built a churn model with these features:
- tenure_months
- support_tickets_last_30d
- cancellation_reason
- logins_last_7d
- nps_score

The model has 0.97 AUC on the test set.

**Question:** Which feature is causing leakage?

**Options:**
- A) tenure_months
- B) support_tickets_last_30d
- C) cancellation_reason
- D) logins_last_7d

**Correct Answer:** C

**Decision Receipt:**
`cancellation_reason` only exists AFTER someone cancels. It's literally the reason they gave when they churned. Using it to predict churn is circular—you're using the outcome to predict itself. The 0.97 AUC is a dead giveaway that something is wrong. Real churn models typically achieve 0.70-0.85 AUC. Suspiciously high metrics almost always mean leakage.

---

## Scenario 4: Matching Metric to Action

**Setup:**
StreamCart's retention team can make 500 phone calls per week to at-risk subscribers. They want a churn model to identify who to call.

**Question:** Which metric should you optimize for?

**Options:**
- A) Overall accuracy
- B) AUC (area under ROC curve)
- C) Precision@500
- D) F1 score

**Correct Answer:** C

**Decision Receipt:**
You can only act on 500 customers per week. You need to know: "Of the 500 highest-scored customers, how many would actually churn?" That's precision@500. AUC tells you about overall ranking quality but not specifically about the top 500. Accuracy is misleading when churn is rare (e.g., if 8% churn, predicting "no churn" for everyone gives 92% accuracy). F1 doesn't account for your capacity constraint.

---

## Scenario 5: Subtle Leakage Detection

**Setup:**
A colleague proposes these features for churn prediction:
- tenure_months — how long they've been a customer
- logins_last_7d — logins in the 7 days before snapshot
- days_since_last_login — calculated as (today - last_login_date)
- support_tickets_last_30d — tickets filed in past 30 days

**Question:** Which one has a SUBTLE leakage risk?

**Options:**
- A) tenure_months
- B) logins_last_7d
- C) days_since_last_login
- D) support_tickets_last_30d

**Correct Answer:** C

**Decision Receipt:**
Option C is tricky. If "today" means the day you're BUILDING the model (not the snapshot date), then days_since_last_login includes information from AFTER the prediction point. Always calculate relative to the snapshot date, not the current date. This is a common bug in production pipelines where "today" shifts between training and scoring.

---

## Scenario 6: The 7-Line Template

**Setup:**
Your PM wants to "use ML to improve customer lifetime value."

**Question:** What's wrong with this problem statement?

**Options:**
- A) Nothing—it's a clear ML problem
- B) LTV is too hard to predict; should focus on something easier
- C) There's no clear action tied to the prediction
- D) You need more data before defining the problem

**Correct Answer:** C

**Decision Receipt:**
"Improve LTV" is a goal, not an action. What will you DO differently for high-LTV vs. low-LTV customers? Send different offers? Prioritize support? Change pricing? Until you define the action, building a model is pointless. This is Line 2 of the 7-line template—and it's where most ML projects fail. They predict something without knowing what they'll do with the prediction.

---

## Scenario 7: Cost-Based Decision

**Setup:**
The retention offer costs $40. A saved customer generates $180 in future revenue. The model predicts Customer X has 55% churn probability. Historical data shows 25% of at-risk customers who receive offers actually stay.

Expected value formula: P(churn) × P(save|offer) × value - cost

**Question:** Should you send the offer to Customer X?

**Options:**
- A) Yes—55% churn risk is high enough
- B) No—the expected value is negative
- C) Yes—$180 > $40
- D) Need more information about other customers

**Correct Answer:** B

**Decision Receipt:**
EV = 0.55 × 0.25 × $180 - $40 = $24.75 - $40 = -$15.25. Negative expected value means don't send the offer—you'd lose money on average. Not every "high-risk" customer deserves intervention. This is why you need probabilities, not binary labels—so you can do this cost-benefit math.

---

## Scoring Summary

Show at end of Typeform:

**7/7 correct:** You've got strong problem-framing instincts. Move on to the Colab lab.

**5-6/7 correct:** Good foundation. Review the ones you missed—these mistakes are common in real projects.

**<5/7 correct:** Re-read the micro-lesson, especially the 7-line template section. Problem framing is the foundation; getting it wrong makes everything else harder.
