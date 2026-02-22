# Module 05: Feature Engineering - Typeform Scenario

**Theme:** You're improving model performance by engineering better features from raw data.

---

## Q1 (Multiple Choice)
**You have `orders_total=47` and `tenure_months=14`. Which engineered feature is MOST useful?**

- A) `orders_total + tenure_months = 61`
- B) `orders_total - tenure_months = 33`
- C) `orders_total / tenure_months = 3.4` (orders per month)
- D) `orders_total * tenure_months = 658`

**Correct:** C

**Decision Receipt:** Orders per month NORMALIZES by tenure. A customer with 47 orders over 14 months (3.4/month) behaves differently than one with 47 orders over 2 months (23.5/month). Ratios capture intensity.

---

## Q2 (Multiple Choice)
**You compare two customers:**
- Customer A: 40 orders over 4 months
- Customer B: 40 orders over 20 months

Which feature is most likely to help the model treat them differently?

- A) `orders_total`
- B) `tenure_months`
- C) `orders_per_month = orders_total / tenure_months`
- D) `orders_total * tenure_months`

**Correct:** C

**Decision Receipt:** Raw totals hide intensity. Ratio features reveal behavior rate, which is usually more predictive in subscription businesses than absolute counts alone.

---

## Q3 (Multiple Choice)
**You have `logins_last_7d=2` and `logins_last_30d=15`. Which feature captures BEHAVIOR CHANGE?**

- A) `logins_last_7d + logins_last_30d = 17`
- B) `logins_last_7d / (logins_last_30d / 4)` (recent vs expected)
- C) `logins_last_30d - logins_last_7d = 13`
- D) `max(logins_last_7d, logins_last_30d) = 15`

**Correct:** B

**Decision Receipt:** This is a CHANGE feature. If logins_last_30d is 15, we'd expect ~3.75 in the last 7 days (15/4). Getting only 2 means engagement is DROPPING. The ratio 2/3.75 = 0.53 signals decline.

---

## Q4 (Multiple Choice)
**You suspect churn risk spikes only when BOTH NPS is low and usage is dropping. Which feature best tests this hypothesis?**

- A) `nps_score / tenure_months`
- B) `is_low_nps * is_usage_declining`
- C) `nps_score + logins_last_30d`
- D) `max(nps_score, logins_last_30d)`

**Correct:** B

**Decision Receipt:** Interactions test "combined effect" logic. If the risk appears mainly when two conditions co-occur, a combined feature can capture that pattern better than either feature alone.

---

## Q5 (Multiple Choice)
**Which is a valid interaction feature?**

- A) `nps_score / tenure_months`
- B) `(nps_score < 6) AND (logins_last_30d > 10)` → unhappy_but_active
- C) `logins_last_7d - logins_last_30d`
- D) `tenure_months * 12`

**Correct:** B

**Decision Receipt:** This creates a binary flag (0/1) for customers who are unhappy (low NPS) but still engaging (high logins). This specific combination might be highly predictive of churn.

---

## Q6 (Multiple Choice)
**Your colleague creates this feature: `days_until_churn = churn_date - snapshot_date`**

Is this safe?

- A) Yes, it captures urgency
- B) No, it's data leakage - we don't know churn_date at prediction time
- C) Yes, if we only use it for training
- D) No, because dates shouldn't be features

**Correct:** B

**Decision Receipt:** LEAKAGE. At prediction time, you don't know when (or if) the customer will churn. Any feature derived from future events will inflate training metrics but fail in production.

---

## Q7 (Multiple Choice)
**Before adding a new feature, you should ask:**

- A) "Does it have a high correlation with the target?"
- B) "Would I know this value at the time I make predictions?"
- C) "Is it a continuous variable?"
- D) "Does it improve training accuracy?"

**Correct:** B

**Decision Receipt:** The LEAKAGE CHECK. If the feature depends on information you wouldn't have at prediction time, it's useless (or dangerous) no matter how predictive it appears.

---

## Q8 (Multiple Choice)
**Which feature is SAFE to use when predicting 30-day churn on January 1st?**

- A) `January_orders` (orders in January)
- B) `December_logins` (logins in December)
- C) `churn_reason` (why they churned)
- D) `February_support_tickets` (tickets in February)

**Correct:** B

**Decision Receipt:** Only December data is HISTORICAL relative to the January 1st prediction. January is current (might be okay for some features), but February is FUTURE and churn_reason only exists AFTER churning.

---

## Q9 (Multiple Choice)
**You added 20 new engineered features. Your training AUC went from 0.75 to 0.92, but test AUC stayed at 0.73. What likely happened?**

- A) The new features are highly predictive
- B) Some features might be leaky or causing overfitting
- C) You need more features
- D) The test set is broken

**Correct:** B

**Decision Receipt:** Big training improvement with no test improvement = OVERFITTING or LEAKAGE. Some "engineered" features might inadvertently use future information, or the model is fitting noise in training data.

---

## Q10 (Multiple Choice)
**To avoid division by zero when creating ratio features, you should:**

- A) Remove rows where the denominator is zero
- B) Add a small constant (epsilon) to the denominator
- C) Replace zeros with one
- D) Use multiplication instead

**Correct:** B

**Decision Receipt:** Adding epsilon (e.g., 0.01) prevents division errors while minimally affecting other calculations: `orders / (tenure_months + 0.01)`. This is standard practice for ratio features.

---

## Q11 (Short Answer)
**Propose one new churn feature using existing fields. In 2 sentences, explain:**
1) Why it might help, and  
2) How you'll verify it's not leakage.

**Expected Answer (example):**
"I’d add `login_drop_ratio = logins_last_7d / (logins_last_30d/4 + 0.01)` to capture recent engagement decline. I’ll verify every source value is available at snapshot time and test on a time-based split."

**Decision Receipt:** Great feature engineering is hypothesis-driven and leakage-aware. "Creative" features are only useful if they remain valid at prediction time.

---

## Q12 (Multiple Choice)
**You test three feature sets on the same holdout data:**

- Set A (ratios): AUC +0.03, Precision@500 +0.05  
- Set B (interactions): AUC +0.02, Precision@500 +0.07  
- Set C (polynomials): AUC +0.00, Precision@500 -0.01

With a fixed top-500 retention workflow, which should you prioritize next?

- A) Set A only
- B) Set B first, then combine with A if stable
- C) Set C because it's more advanced mathematically
- D) None; feature engineering usually doesn't help

**Correct:** B

**Decision Receipt:** In capacity-limited decisions, prioritize what improves top-k quality, not just AUC. Interactions may create larger lift for the exact customers you can act on.
