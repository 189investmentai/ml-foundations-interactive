# Module 22 Quiz: Monitoring

---

## Question 1

Your churn model was 85% accurate at launch but is now 78% accurate. What type of drift is most likely?

A) Data drift only
B) Concept drift (the relationship between features and churn has changed)
C) Label drift only
D) No drift—this is normal variation

**Correct Answer:** B

**Explanation:** A 7% accuracy drop indicates concept drift—the relationship between inputs and outputs has changed. Data drift alone would show distributional changes but not necessarily affect accuracy if the underlying relationships held. Concept drift means what predicted churn before doesn't predict it as well now.

---

## Question 2

What does a high PSI (Population Stability Index > 0.25) indicate?

A) The model is more accurate
B) The feature distribution has significantly shifted from the reference period
C) The model should be rolled back immediately
D) Training was done incorrectly

**Correct Answer:** B

**Explanation:** PSI measures how much a distribution has changed from a reference (usually training data). PSI > 0.25 indicates significant distribution shift. This is a signal to investigate—it may or may not affect accuracy, but the data the model sees is different from what it was trained on.

---

## Question 3

Your model predicts user churn, but you only know the true outcome 30 days later. How can you monitor model health in the meantime?

A) You can't—just wait for labels
B) Monitor proxy metrics (prediction distribution, feature drift, leading indicators)
C) Assume the model is fine
D) Retrain every day just in case

**Correct Answer:** B

**Explanation:** When ground truth is delayed, monitor leading indicators: prediction distributions (are they stable?), feature drift (is input data changing?), and proxy metrics (engagement, support tickets, other signals that correlate with churn). These give early warning even without labels.

---

## Question 4

Your monitoring system sends 50 alerts per day and the team has started ignoring them. This is called:

A) Good coverage
B) Alert fatigue
C) Normal operations
D) Data drift

**Correct Answer:** B

**Explanation:** Alert fatigue happens when too many alerts (especially false positives or low-priority issues) cause teams to ignore or deprioritize them. The fix is to tune thresholds, use severity levels appropriately, batch non-critical alerts, and ensure alerts are actionable.

---

## Question 5

A model predicts a user will churn, so you give them a discount. They don't churn. Was the prediction correct or did the intervention work?

A) The prediction was wrong
B) The intervention worked
C) You can't tell without a control group
D) The model needs retraining

**Correct Answer:** C

**Explanation:** This is the feedback loop problem. Without a holdout/control group that didn't receive interventions, you can't distinguish between "model was wrong" and "intervention changed the outcome." This is why A/B testing and causal inference are important for evaluating models that trigger actions.

---

## Question 6

When should you retrain a model? (Select the best answer)

A) Every day to be safe
B) Only when users complain
C) When accuracy drops below threshold, significant drift is detected, or on a scheduled basis
D) Never—models should be stable

**Correct Answer:** C

**Explanation:** Retraining should be triggered by specific conditions: accuracy degradation, detected drift, new data availability, or scheduled intervals. Daily retraining is wasteful and may introduce instability. Waiting for user complaints is too reactive—problems compound before they're noticed.

---

## Question 7

What's the difference between monitoring model metrics vs business metrics?

A) They're the same thing
B) Model metrics (accuracy, AUC) measure model quality; business metrics (revenue, retention) measure impact—both are needed
C) Only business metrics matter
D) Only model metrics matter

**Correct Answer:** B

**Explanation:** Model metrics tell you if the model is technically correct. Business metrics tell you if it's delivering value. A model can have high accuracy but low business impact (wrong threshold, not actionable predictions). You need both: model metrics for technical health, business metrics for actual value.

---

## Question 8

A stakeholder asks why you spend time on monitoring instead of building new models. The best response is:

A) "It's standard practice"

B) "Monitoring catches problems before they impact users. A model that degrades unnoticed can cause more damage than not having a model at all. It protects our investment in the models we've built."

C) "Management requires it"

D) "We don't actually need it"

**Correct Answer:** B

**Explanation:** This explains the value of monitoring in business terms: protecting investment, preventing user impact, and maintaining trust. Unmonitored models can silently degrade, leading to bad decisions, lost revenue, or damaged customer relationships.

---

## Scoring

- 8/8: Expert level — you understand production monitoring deeply
- 6-7/8: Solid understanding — review drift detection methods
- 4-5/8: Developing — revisit retraining triggers
- <4/8: Review the full lesson and experiment with the playground
