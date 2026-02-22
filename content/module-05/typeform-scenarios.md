# Module 5: Typeform Scenarios

---

## Scenario 1: Spotting Leakage

**Setup:**
You're building a churn model. A colleague proposes these features:
- tenure_months
- support_tickets_last_30d
- final_order_date
- plan_downgrade_flag

**Question:** Which feature is most likely to cause leakage?

**Options:**
- A) tenure_months
- B) support_tickets_last_30d
- C) final_order_date
- D) plan_downgrade_flag

**Correct Answer:** C

**Decision Receipt:**
"Final order" implies you know they stopped ordering—you only know that AFTER they've churned or you've observed enough future time. At prediction time (before churn), you wouldn't know it's their "final" order. This is future leakage. Tenure and recent tickets are calculated from past. Downgrade flag depends on implementation but is likely safe.

---

## Scenario 2: The Too-Good Model

**Setup:**
Your model achieves 0.97 AUC on test data. The domain expert says "the best models in our industry get 0.80."

**Question:** What's the most likely explanation?

**Options:**
- A) Your features are better than industry standard
- B) There's data leakage somewhere
- C) XGBoost is just that good
- D) The test set is too easy

**Correct Answer:** B

**Decision Receipt:**
When a model dramatically outperforms known benchmarks, leakage is the most likely culprit. Beating industry by 0.17 AUC through better features is rare. The first step is auditing every feature for outcome contamination or future information. Trust but verify—especially when results seem too good.

---

## Scenario 3: Time Splits

**Setup:**
You're predicting March 2024 churn. You have data from Jan 2023 - Mar 2024.

**Question:** Which train/test split is correct?

**Options:**
- A) Random 80/20 split across all data
- B) Train: Jan 2023 - Feb 2024, Test: Mar 2024
- C) Train: Mar 2024, Test: Jan 2023 - Feb 2024
- D) Train: Jan-Jun 2023, Test: Jul 2023 - Mar 2024

**Correct Answer:** B

**Decision Receipt:**
Temporal splits must train on past and test on future. Option B trains on everything before March and tests on March—this mimics production where you predict future churn from past data. Option C is backwards. Option A leaks future data into training. Option D wastes recent data.

---

## Scenario 4: Target Encoding

**Setup:**
You're encoding 500 different cities using mean churn rate. You calculate the means on the full dataset (train + test combined), then train your model.

**Question:** What's wrong with this approach?

**Options:**
- A) Nothing—this is the standard approach
- B) You should use median instead of mean
- C) You're leaking test data into training
- D) 500 categories is too many

**Correct Answer:** C

**Decision Receipt:**
Target encoding using test data means you've contaminated your training with information from the test set. The city averages include test labels, making your test evaluation overly optimistic. Always calculate encodings on training data only, then apply those same values to test data.

---

## Scenario 5: Window Ambiguity

**Setup:**
A feature is documented as `orders_last_month`. The model was trained in February but deployed in March.

**Question:** What's the potential issue?

**Options:**
- A) No issue—last month is clearly defined
- B) "Last month" might mean different time ranges in training vs. production
- C) Monthly features are too coarse
- D) Orders don't predict churn

**Correct Answer:** B

**Decision Receipt:**
"Last month" is ambiguous. In training (Feb), it might mean January. In production (Mar), it means February. If the calculation is "current month - 1" dynamically, it's fine. If it was hardcoded as "January 2024" in training, production will use stale data. Always define time windows relative to a snapshot date, not calendar months.

---

## Scenario 6: Feature Value Investigation

**Setup:**
You notice that `days_since_last_login` is negative for some users in your test set.

**Question:** What's the most likely cause?

**Options:**
- A) Data quality issue—just filter them out
- B) The "last login" date is from AFTER the snapshot date (future leak)
- C) Users who never logged in
- D) Timezone issues

**Correct Answer:** B

**Decision Receipt:**
Negative "days since" typically means the event happened AFTER the reference date—classic future leakage. You're using a "last login" that occurred after the snapshot, which wouldn't be available at prediction time. Fix: ensure last_login_date < snapshot_date, or recalculate properly.

---

## Scoring Summary

**6/6 correct:** Strong understanding of leakage and temporal issues.

**4-5/6 correct:** Good foundation. Review the time-window patterns.

**<4/6 correct:** Re-read the micro-lesson, especially the two deadly sins section.
