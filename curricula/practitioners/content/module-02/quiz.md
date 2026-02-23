# Module 2 Quiz: Data Leakage

Test your ability to detect and prevent data leakage with these scenario-based questions.

---

## Q1. Leakage Detection

You're predicting 30-day churn. A feature "days_until_cancel" has very high importance. Is this a problem?

**A)** No, high importance means it's predictive

**B)** Yes, this feature uses future information you won't have at prediction time ✓

**C)** Only if the coefficient is negative

**D)** Only if correlation with target exceeds 0.9

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

"Days until cancel" requires knowing WHEN the customer will cancel — information you can't have at prediction time. This is classic target leakage: the feature is derived from the very thing you're trying to predict.

High importance (A) is a red flag here, not a good sign. The correlation threshold (D) doesn't matter if the feature is fundamentally unavailable at prediction time.
</details>

---

## Q2. The Timeline Test

You're predicting whether a customer will churn in the next 30 days. On January 15th, which feature is safe to use?

**A)** Number of orders in the last 30 days (Dec 16 - Jan 15) ✓

**B)** Number of orders this month (Jan 1 - Jan 31)

**C)** Average monthly orders over the past year (Jan 15 2023 - Jan 15 2024)

**D)** Customer satisfaction score from their post-cancellation survey

<details>
<summary>Answer & Explanation</summary>

**Correct: A**

Option A uses only data from BEFORE the prediction date. 

Option B includes future data (Jan 16-31). Option C seems okay but check the end date — if "past year" means Jan 15 2024, it might be safe, but the phrasing is ambiguous. Option D is obviously leakage — you can't have post-cancellation data before cancellation.

Always apply the timeline test: draw a line at prediction day, features come from the left only.
</details>

---

## Q3. Preprocessing Leakage

You standardize features using `StandardScaler`. What's the correct approach?

**A)** Fit the scaler on all data, then split into train/test

**B)** Fit the scaler on training data only, transform both train and test ✓

**C)** Fit separate scalers on train and test

**D)** Standardization doesn't matter for leakage

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

Fitting on all data (A) leaks test set statistics into training. You're using future information (test set mean/std) to transform training data.

Separate scalers (C) would create distribution mismatches between train and test. The correct approach: fit on train, then use those parameters to transform both train and test.

Same principle applies to imputation, encoding, and any data-dependent transformation.
</details>

---

## Q4. Feature Engineering Leakage

You compute "average_order_value" for each customer. Which computation is safe for predicting next-month churn?

**A)** Total spend / Total orders (lifetime)

**B)** Total spend as of prediction date / Orders as of prediction date ✓

**C)** Total spend / Orders, excluding the prediction month

**D)** All of the above are equivalent

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

Option A uses lifetime data, which includes future orders. Option C explicitly excludes prediction month data but the phrasing "excluding" might still include data after the prediction date depending on implementation.

Option B is safest: explicitly compute as-of the prediction date, including only data from before that point. The key is point-in-time computation.
</details>

---

## Q5. Split Strategy

Your data spans Jan 2023 to Dec 2023. You want to predict Feb 2024 churn. Which split is correct?

**A)** Random 80/20 split across all months

**B)** Train on Jan-Sep 2023, test on Oct-Dec 2023 ✓

**C)** 5-fold cross-validation with random folds

**D)** Train on even months, test on odd months

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

For temporal data, use time-based splits. Random splits (A, C) allow future patterns to leak into training. Alternating months (D) also causes leakage — you'd train on December while testing on November.

Train on earlier periods, test on later periods. This simulates the actual deployment scenario where you train on past data to predict the future.
</details>

---

## Q6. Red Flag Recognition

Your model achieves 99.5% AUC on a churn prediction task that typically sees 70-80% AUC. What's your first action?

**A)** Celebrate and deploy immediately

**B)** Audit features for potential leakage ✓

**C)** Try an even more complex model

**D)** Add more features to push AUC higher

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

Unrealistically high performance is the #1 sign of data leakage. Before celebrating, systematically check each feature: "Would I have this exact value at prediction time?"

Common culprits: target-derived features, future aggregations, or features that encode the outcome directly.
</details>

---

## Q7. Production vs. Test Gap

Your model has AUC 0.85 in testing but only 0.62 in production, after ruling out code bugs. What's the most likely cause?

**A)** The production hardware is slower

**B)** Data leakage that inflated test performance ✓

**C)** Users behave differently on weekends

**D)** The model needs retraining

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

A 23-point gap between test and production is a classic leakage pattern. The model learned patterns that existed in test data but aren't available in production.

Common scenarios: features computed differently in production, data that exists in batch but not real-time, or train/test contamination.

Weekend behavior (C) and model staleness (D) cause gradual degradation, not sudden large gaps.
</details>

---

## Q8. Prevention Strategy

You're reviewing a colleague's feature engineering. They computed "customer_tenure" as `today - signup_date`. Is this safe?

**A)** Yes, signup_date is historical data

**B)** No, because signup_date might be missing

**C)** It depends — "today" must be the prediction date, not the current date ✓

**D)** Only if tenure is less than 365 days

<details>
<summary>Answer & Explanation</summary>

**Correct: C**

If "today" means the date the code runs (e.g., when generating training data), you're using future information. Tenure should be computed as `prediction_date - signup_date`, where prediction_date is the point-in-time when the prediction would be made.

This is a subtle but common bug: running feature engineering code today to generate training labels from last year, but using today's date in calculations.
</details>

---

---

## Q9. Code Debugging 🔧

Review this feature engineering code. Which line contains data leakage?

```python
# Feature engineering for churn prediction (predict on Jan 1)
def create_features(customer_id, prediction_date):
    features = {}
    
    # Line A
    features['tenure'] = (prediction_date - signup_date).days
    
    # Line B  
    features['orders_90d'] = count_orders(
        customer_id, 
        start=prediction_date - timedelta(days=90),
        end=prediction_date
    )
    
    # Line C
    features['total_spend'] = get_lifetime_spend(customer_id)
    
    # Line D
    features['support_tickets'] = count_tickets(
        customer_id,
        end=prediction_date
    )
    
    return features
```

**A)** Line A — tenure calculation

**B)** Line B — orders in last 90 days

**C)** Line C — total lifetime spend ✓

**D)** Line D — support tickets

<details>
<summary>Answer & Explanation (Decision Receipt)</summary>

**Correct: C**

**Decision Receipt:** `get_lifetime_spend()` returns ALL-TIME spend, which includes purchases AFTER the prediction date. 

For a Jan 1 prediction:
- Customer who doesn't churn → keeps buying in Feb, March → higher total_spend
- Customer who churns → stops buying → lower total_spend

The feature encodes the outcome it's supposed to predict.

**Why other lines are safe:**
- (A) Tenure as of prediction date uses only signup_date (past)
- (B) Explicit 90-day window ending at prediction_date (past only)  
- (D) Explicit end bound at prediction_date (past only)

**The fix:**
```python
features['spend_as_of_date'] = get_spend(customer_id, end=prediction_date)
```
</details>

---

## Q10. Severity Assessment

A colleague finds that their feature `account_status` has 0.95 correlation with the churn target. The feature has 45% importance in the model. What's the likely production impact?

**A)** Minor — high correlation means it's predictive

**B)** Moderate — 10-15% AUC drop expected

**C)** Severe — model will likely fail in production ✓

**D)** None — correlation doesn't indicate leakage

<details>
<summary>Answer & Explanation (Decision Receipt)</summary>

**Correct: C**

**Decision Receipt:** A feature with 0.95 correlation to target AND 45% importance is almost certainly leaking.

At 0.95 correlation, the feature is essentially the target itself (or derived from it). When this feature is unavailable in production, the model loses its primary signal and will perform close to random.

Expected impact:
- Current AUC: ~0.95 (inflated)
- Production AUC: ~0.55-0.65 (baseline-ish)
- Drop: 30-40 points

**Action:** Investigate immediately. Check how `account_status` is defined — it likely encodes churn outcome (e.g., "cancelled" status).
</details>

---

## Scoring

- **10/10:** Excellent! You can detect and prevent the most common leakage patterns.
- **8-9/10:** Strong understanding. Review the questions you missed.
- **6-7/10:** Good foundation, but revisit the subtle cases.
- **< 6/10:** This is a critical topic. Complete the debug drill before continuing.
