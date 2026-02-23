# Module 1 Quiz: The ML Map - Google Forms Setup

## Form Setup

1. Go to https://docs.google.com/forms
2. Click **+ Blank**
3. Settings → Enable **"Make this a quiz"**
4. Enable **"Release grade immediately after submission"**

---

## Form Title & Description

**Title:** Module 1 Quiz: The ML Map

**Description:** 
Test your understanding. 8 questions, ~10 minutes.

---

## Questions (Copy-Paste Ready)

### Question 1

**Question:**
Pipeline Stage Identification 🔀

**Options:**
- A) Model Training — the model is underfitting
- B) Data/Features — there's likely data leakage ✓ CORRECT
- C) Deployment — the production code is buggy
- D) Evaluation — the test metric was calculated wrong

**Feedback (add to correct answer):**
A huge gap between test performance and production performance is the classic sign of data leakage. The model had access to information during training that won't be available in production. Common causes:; Using future data in features; Improper train/test split; Preprocessing leakage (fitting scaler on all data) **Why other answers are wrong:**; (A) Underfitting would show poor performance on BOTH test and production; (C) Buggy production code is possible but rare — test this theory second; (D

**Points:** 1

---

### Question 2

**Question:**
Problem Framing 🔀

**Options:**
- A) "Which algorithm should I use?"
- B) "How much historical data do we have?"
- C) "What exactly counts as churned, and when do we need the prediction?" ✓ CORRECT
- D) "What features are available?"

**Feedback (add to correct answer):**
Before anything else, you need to define the target precisely. "Churned" could mean:; Cancelled subscription; Inactive for 30 days  ; No purchase in 90 days; Downgraded plan And timing matters: predicting churn AFTER they've left is useless. **Why other answers are wrong:**; (A) Algorithm choice comes LAST, after data and features are understood; (B) Data volume matters, but you can't assess "enough" without knowing the target; (D) Features matter, but you can't evaluate them without knowing wha

**Points:** 1

---

### Question 3

**Question:**
Split Strategy

**Options:**
- A) Random 80/20 split
- B) Stratified random split by customer segment
- C) Time-based split: train on past, test on future ✓ CORRECT
- D) K-fold cross-validation with random folds

**Feedback (add to correct answer):**
For temporal data (time series, transactions over time), you MUST use time-based splits. Random splits (A, D) allow information from the future to leak into training. Stratified splits (B) help with class balance but don't solve the temporal leakage problem. The test set should simulate the actual future you're trying to predict.

**Points:** 1

---

### Question 4

**Question:**
Baseline Importance

**Options:**
- A) You need to try more hyperparameters first
- B) You need to compare to a baseline (random, heuristic, simpler model) ✓ CORRECT
- C) AUC isn't the right metric — use accuracy instead
- D) You need more training data

**Feedback (add to correct answer):**
Without a baseline, you can't know if 0.75 is good. If random guessing achieves 0.50 and a simple "customers with no orders in 30 days" heuristic achieves 0.72, then your model adds only marginal value over a free heuristic. Always establish baselines: (1) random/majority class, (2) business heuristic, (3) simple model before declaring success.

**Points:** 1

---

### Question 5

**Question:**
Debugging Priority

**Options:**
- A) Try a more complex model
- B) Collect more training data
- C) Check for data leakage or improper train/test split ✓ CORRECT
- D) Tune hyperparameters

**Feedback (add to correct answer):**
A 40-point gap between train and test is a red flag for overfitting OR improper evaluation. Before adding complexity (A), data (B), or tuning (D), verify that your train/test split is correct and there's no leakage. The debugging flow starts with data and splitting issues, not model issues.

**Points:** 1

---

### Question 6

**Question:**
Metric Selection

**Options:**
- A) Maximize accuracy
- B) Maximize AUC-ROC
- C) Optimize threshold using cost-weighted analysis ✓ CORRECT
- D) Maximize recall regardless of precision

**Feedback (add to correct answer):**
When false positive and false negative costs differ significantly, you need cost-weighted evaluation. Pure accuracy (A) treats all errors equally. AUC (B) summarizes across all thresholds but doesn't pick one. Maximizing recall (D) ignores the $10 FP cost entirely. The optimal threshold balances the asymmetric costs: threshold ≈ Cost(FP) / (Cost(FP) + Cost(FN)) = 10 / 1010 ≈ 0.01.

**Points:** 1

---

### Question 7

**Question:**
Feature Suspicion

**Options:**
- A) This feature is legitimately very predictive
- B) The feature likely contains future information (leakage) ✓ CORRECT
- C) The model is now overfitting
- D) The AUC calculation is wrong

**Feedback (add to correct answer):**
A single feature causing a massive jump to near-perfect performance is a red flag for leakage. "Lifetime value" likely includes future purchases that happen AFTER the prediction point. At prediction time, you wouldn't know their full lifetime value. Always ask: "Would I have this exact value at prediction time?"

**Points:** 1

---

### Question 8

**Question:**
Deployment Readiness

**Options:**
- A) A/B testing framework
- B) Monitoring for data drift and model performance ✓ CORRECT
- C) Automatic retraining pipeline
- D) Load balancing for high traffic

**Feedback (add to correct answer):**
Without monitoring, you won't know when the model starts failing. Data distributions change, user behavior shifts, and model performance degrades silently. Monitoring catches these issues before they cause business damage. A/B testing (A) is valuable but optional. Automatic retraining (C) helps but only if you know WHEN to retrain. Load balancing (D) is infrastructure, not ML-specific.

**Points:** 1

---

