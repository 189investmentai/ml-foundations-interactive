# Module 2 Quiz: Data Leakage - Google Forms Setup

## Form Setup

1. Go to https://docs.google.com/forms
2. Click **+ Blank**
3. Settings → Enable **"Make this a quiz"**
4. Enable **"Release grade immediately after submission"**

---

## Form Title & Description

**Title:** Module 2 Quiz: Data Leakage

**Description:** 
Test your understanding. 10 questions, ~12 minutes.

---

## Questions (Copy-Paste Ready)

### Question 1

**Question:**
Leakage Detection

**Options:**
- A) No, high importance means it's predictive
- B) Yes, this feature uses future information you won't have at prediction time ✓ CORRECT
- C) Only if the coefficient is negative
- D) Only if correlation with target exceeds 0.9

**Feedback (add to correct answer):**
"Days until cancel" requires knowing WHEN the customer will cancel — information you can't have at prediction time. This is classic target leakage: the feature is derived from the very thing you're trying to predict. High importance (A) is a red flag here, not a good sign. The correlation threshold (D) doesn't matter if the feature is fundamentally unavailable at prediction time.

**Points:** 1

---

### Question 2

**Question:**
The Timeline Test

**Options:**
- A) Number of orders in the last 30 days (Dec 16 - Jan 15) ✓ CORRECT
- B) Number of orders this month (Jan 1 - Jan 31)
- C) Average monthly orders over the past year (Jan 15 2023 - Jan 15 2024)
- D) Customer satisfaction score from their post-cancellation survey

**Feedback (add to correct answer):**
Option A uses only data from BEFORE the prediction date.  Option B includes future data (Jan 16-31). Option C seems okay but check the end date — if "past year" means Jan 15 2024, it might be safe, but the phrasing is ambiguous. Option D is obviously leakage — you can't have post-cancellation data before cancellation. Always apply the timeline test: draw a line at prediction day, features come from the left only.

**Points:** 1

---

### Question 3

**Question:**
Preprocessing Leakage

**Options:**
- A) Fit the scaler on all data, then split into train/test
- B) Fit the scaler on training data only, transform both train and test ✓ CORRECT
- C) Fit separate scalers on train and test
- D) Standardization doesn't matter for leakage

**Feedback (add to correct answer):**
Fitting on all data (A) leaks test set statistics into training. You're using future information (test set mean/std) to transform training data. Separate scalers (C) would create distribution mismatches between train and test. The correct approach: fit on train, then use those parameters to transform both train and test. Same principle applies to imputation, encoding, and any data-dependent transformation.

**Points:** 1

---

### Question 4

**Question:**
Feature Engineering Leakage

**Options:**
- A) Total spend / Total orders (lifetime)
- B) Total spend as of prediction date / Orders as of prediction date ✓ CORRECT
- C) Total spend / Orders, excluding the prediction month
- D) All of the above are equivalent

**Feedback (add to correct answer):**
Option A uses lifetime data, which includes future orders. Option C explicitly excludes prediction month data but the phrasing "excluding" might still include data after the prediction date depending on implementation. Option B is safest: explicitly compute as-of the prediction date, including only data from before that point. The key is point-in-time computation.

**Points:** 1

---

### Question 5

**Question:**
Split Strategy

**Options:**
- A) Random 80/20 split across all months
- B) Train on Jan-Sep 2023, test on Oct-Dec 2023 ✓ CORRECT
- C) 5-fold cross-validation with random folds
- D) Train on even months, test on odd months

**Feedback (add to correct answer):**
For temporal data, use time-based splits. Random splits (A, C) allow future patterns to leak into training. Alternating months (D) also causes leakage — you'd train on December while testing on November. Train on earlier periods, test on later periods. This simulates the actual deployment scenario where you train on past data to predict the future.

**Points:** 1

---

### Question 6

**Question:**
Red Flag Recognition

**Options:**
- A) Celebrate and deploy immediately
- B) Audit features for potential leakage ✓ CORRECT
- C) Try an even more complex model
- D) Add more features to push AUC higher

**Feedback (add to correct answer):**
Unrealistically high performance is the #1 sign of data leakage. Before celebrating, systematically check each feature: "Would I have this exact value at prediction time?" Common culprits: target-derived features, future aggregations, or features that encode the outcome directly.

**Points:** 1

---

### Question 7

**Question:**
Production vs. Test Gap

**Options:**
- A) The production hardware is slower
- B) Data leakage that inflated test performance ✓ CORRECT
- C) Users behave differently on weekends
- D) The model needs retraining

**Feedback (add to correct answer):**
A 23-point gap between test and production is a classic leakage pattern. The model learned patterns that existed in test data but aren't available in production. Common scenarios: features computed differently in production, data that exists in batch but not real-time, or train/test contamination. Weekend behavior (C) and model staleness (D) cause gradual degradation, not sudden large gaps.

**Points:** 1

---

### Question 8

**Question:**
Prevention Strategy

**Options:**
- A) Yes, signup_date is historical data
- B) No, because signup_date might be missing
- C) It depends — "today" must be the prediction date, not the current date ✓ CORRECT
- D) Only if tenure is less than 365 days

**Feedback (add to correct answer):**
If "today" means the date the code runs (e.g., when generating training data), you're using future information. Tenure should be computed as `prediction_date - signup_date`, where prediction_date is the point-in-time when the prediction would be made. This is a subtle but common bug: running feature engineering code today to generate training labels from last year, but using today's date in calculations.

**Points:** 1

---

### Question 9

**Question:**
Code Debugging 🔧

**Options:**
- A) Line A — tenure calculation
- B) Line B — orders in last 90 days
- C) Line C — total lifetime spend ✓ CORRECT
- D) Line D — support tickets

**Feedback (add to correct answer):**
`get_lifetime_spend()` returns ALL-TIME spend, which includes purchases AFTER the prediction date.  For a Jan 1 prediction:; Customer who doesn't churn → keeps buying in Feb, March → higher total_spend; Customer who churns → stops buying → lower total_spend The feature encodes the outcome it's supposed to predict. **Why other lines are safe:**; (A) Tenure as of prediction date uses only signup_date (past); (B) Explicit 90-day window ending at prediction_date (past only)  ; (D) Explicit end bound

**Points:** 1

---

### Question 10

**Question:**
Severity Assessment

**Options:**
- A) Minor — high correlation means it's predictive
- B) Moderate — 10-15% AUC drop expected
- C) Severe — model will likely fail in production ✓ CORRECT
- D) None — correlation doesn't indicate leakage

**Feedback (add to correct answer):**
A feature with 0.95 correlation to target AND 45% importance is almost certainly leaking. At 0.95 correlation, the feature is essentially the target itself (or derived from it). When this feature is unavailable in production, the model loses its primary signal and will perform close to random. Expected impact:; Current AUC: ~0.95 (inflated); Production AUC: ~0.55-0.65 (baseline-ish); Drop: 30-40 points **Action:** Investigate immediately. Check how `account_status` is defined — it likely encodes

**Points:** 1

---

