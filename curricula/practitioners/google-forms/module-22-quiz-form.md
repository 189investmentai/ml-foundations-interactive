# Module 22 Quiz: Monitoring - Google Forms Setup

## Form Setup

1. Go to https://docs.google.com/forms
2. Click **+ Blank**
3. Settings → Enable **"Make this a quiz"**
4. Enable **"Release grade immediately after submission"**

---

## Form Title & Description

**Title:** Module 22 Quiz: Monitoring

**Description:** 
Test your understanding. 8 questions, ~10 minutes.

---

## Questions (Copy-Paste Ready)

### Question 1

**Question:**
Your churn model was 85% accurate at launch but is now 78% accurate. What type of drift is most likely?

**Options:**
- A) Data drift only
- B) Concept drift (the relationship between features and churn has changed) ✓ CORRECT
- C) Label drift only
- D) No drift—this is normal variation

**Feedback (add to correct answer):**
A 7% accuracy drop indicates concept drift—the relationship between inputs and outputs has changed. Data drift alone would show distributional changes but not necessarily affect accuracy if the underlying relationships held. Concept drift means what predicted churn before doesn't predict it as well now.

**Points:** 1

---

### Question 2

**Question:**
What does a high PSI (Population Stability Index > 0.25) indicate?

**Options:**
- A) The model is more accurate
- B) The feature distribution has significantly shifted from the reference period ✓ CORRECT
- C) The model should be rolled back immediately
- D) Training was done incorrectly

**Feedback (add to correct answer):**
PSI measures how much a distribution has changed from a reference (usually training data). PSI > 0.25 indicates significant distribution shift. This is a signal to investigate—it may or may not affect accuracy, but the data the model sees is different from what it was trained on.

**Points:** 1

---

### Question 3

**Question:**
Your model predicts user churn, but you only know the true outcome 30 days later. How can you monitor model health in the meantime?

**Options:**
- A) You can't—just wait for labels
- B) Monitor proxy metrics (prediction distribution, feature drift, leading indicators) ✓ CORRECT
- C) Assume the model is fine
- D) Retrain every day just in case

**Feedback (add to correct answer):**
When ground truth is delayed, monitor leading indicators: prediction distributions (are they stable?), feature drift (is input data changing?), and proxy metrics (engagement, support tickets, other signals that correlate with churn). These give early warning even without labels.

**Points:** 1

---

### Question 4

**Question:**
Your monitoring system sends 50 alerts per day and the team has started ignoring them. This is called:

**Options:**
- A) Good coverage
- B) Alert fatigue ✓ CORRECT
- C) Normal operations
- D) Data drift

**Feedback (add to correct answer):**
Alert fatigue happens when too many alerts (especially false positives or low-priority issues) cause teams to ignore or deprioritize them. The fix is to tune thresholds, use severity levels appropriately, batch non-critical alerts, and ensure alerts are actionable.

**Points:** 1

---

### Question 5

**Question:**
A model predicts a user will churn, so you give them a discount. They don't churn. Was the prediction correct or did the intervention work?

**Options:**
- A) The prediction was wrong
- B) The intervention worked
- C) You can't tell without a control group ✓ CORRECT
- D) The model needs retraining

**Feedback (add to correct answer):**
This is the feedback loop problem. Without a holdout/control group that didn't receive interventions, you can't distinguish between "model was wrong" and "intervention changed the outcome." This is why A/B testing and causal inference are important for evaluating models that trigger actions.

**Points:** 1

---

### Question 6

**Question:**
When should you retrain a model? (Select the best answer)

**Options:**
- A) Every day to be safe
- B) Only when users complain
- C) When accuracy drops below threshold, significant drift is detected, or on a scheduled basis ✓ CORRECT
- D) Never—models should be stable

**Feedback (add to correct answer):**
Retraining should be triggered by specific conditions: accuracy degradation, detected drift, new data availability, or scheduled intervals. Daily retraining is wasteful and may introduce instability. Waiting for user complaints is too reactive—problems compound before they're noticed.

**Points:** 1

---

### Question 7

**Question:**
What's the difference between monitoring model metrics vs business metrics?

**Options:**
- A) They're the same thing
- B) Model metrics (accuracy, AUC) measure model quality; business metrics (revenue, retention) measure impact—both are needed ✓ CORRECT
- C) Only business metrics matter
- D) Only model metrics matter

**Feedback (add to correct answer):**
Model metrics tell you if the model is technically correct. Business metrics tell you if it's delivering value. A model can have high accuracy but low business impact (wrong threshold, not actionable predictions). You need both: model metrics for technical health, business metrics for actual value.

**Points:** 1

---

### Question 8

**Question:**
A stakeholder asks why you spend time on monitoring instead of building new models. The best response is:

**Options:**
- A) "It's standard practice"
- B) "Monitoring catches problems before they impact users. A model that degrades unnoticed can cause more damage than not having a model at all. It protects our investment in the models we've built." ✓ CORRECT
- C) "Management requires it"
- D) "We don't actually need it"

**Feedback (add to correct answer):**
This explains the value of monitoring in business terms: protecting investment, preventing user impact, and maintaining trust. Unmonitored models can silently degrade, leading to bad decisions, lost revenue, or damaged customer relationships.

**Points:** 1

---

