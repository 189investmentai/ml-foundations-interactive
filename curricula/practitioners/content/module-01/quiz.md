# Module 1 Quiz: The ML Map

Test your understanding of the ML pipeline with these scenario-based questions.

**Typeform Setup Notes:**
- Create as a Typeform quiz with Logic Jump enabled
- Questions marked with 🔀 have branching logic
- Wrong answers on Q1-Q2 should branch to remediation content before continuing
- Display "Decision Receipt" after each answer

---

## Q1. Pipeline Stage Identification 🔀

Your churn model achieves 98% accuracy in testing but only 62% in production. Which pipeline stage most likely contains the bug?

**A)** Model Training — the model is underfitting

**B)** Data/Features — there's likely data leakage ✓

**C)** Deployment — the production code is buggy

**D)** Evaluation — the test metric was calculated wrong

<details>
<summary>Answer & Explanation (Decision Receipt)</summary>

**Correct: B**

**Decision Receipt:** A huge gap between test performance and production performance is the classic sign of data leakage. The model had access to information during training that won't be available in production.

Common causes:
- Using future data in features
- Improper train/test split
- Preprocessing leakage (fitting scaler on all data)

**Why other answers are wrong:**
- (A) Underfitting would show poor performance on BOTH test and production
- (C) Buggy production code is possible but rare — test this theory second
- (D) Test metric errors don't explain production performance gap
</details>

**Typeform Branching:**
- If wrong → Jump to: "Remediation: Test vs Production Gap"
- If correct → Continue to Q2

<details>
<summary>Remediation: Test vs Production Gap</summary>

When test looks great but production fails, work backwards:

1. **What's different?** Test data is known, production data is new
2. **What could the model "know" in test that it won't in production?** Future information
3. **Where does future information sneak in?** Features, preprocessing, or splits

The bug is almost never in the model algorithm itself. It's in the data flowing to the model.

Now try Q1 again with this framing.
</details>

---

## Q2. Problem Framing 🔀

A PM asks you to "predict customer churn." What's the FIRST question you should ask?

**A)** "Which algorithm should I use?"

**B)** "How much historical data do we have?"

**C)** "What exactly counts as churned, and when do we need the prediction?" ✓

**D)** "What features are available?"

<details>
<summary>Answer & Explanation (Decision Receipt)</summary>

**Correct: C**

**Decision Receipt:** Before anything else, you need to define the target precisely.

"Churned" could mean:
- Cancelled subscription
- Inactive for 30 days  
- No purchase in 90 days
- Downgraded plan

And timing matters: predicting churn AFTER they've left is useless.

**Why other answers are wrong:**
- (A) Algorithm choice comes LAST, after data and features are understood
- (B) Data volume matters, but you can't assess "enough" without knowing the target
- (D) Features matter, but you can't evaluate them without knowing what you're predicting
</details>

**Typeform Branching:**
- If wrong → Jump to: "Remediation: Problem Framing First"
- If correct → Continue to Q3

<details>
<summary>Remediation: Problem Framing First</summary>

**The Self-Check Question:** "If this model were perfect, what decision would I make differently?"

If you can't answer this, the problem isn't well-defined.

For churn prediction, good answers include:
- "We'd call the top 200 at-risk customers each month"
- "We'd offer proactive discounts to likely churners"
- "We'd prioritize support tickets from high-churn-risk customers"

Notice how each answer implies:
- A specific target definition (what counts as "at-risk")
- A specific timing (when do we need the score)
- A specific action (what we'll do with predictions)

Now try Q2 again.
</details>

---

## Q3. Split Strategy

You're building a model to predict next month's sales from historical transaction data. Which split strategy is correct?

**A)** Random 80/20 split

**B)** Stratified random split by customer segment

**C)** Time-based split: train on past, test on future ✓

**D)** K-fold cross-validation with random folds

<details>
<summary>Answer & Explanation</summary>

**Correct: C**

For temporal data (time series, transactions over time), you MUST use time-based splits. Random splits (A, D) allow information from the future to leak into training. Stratified splits (B) help with class balance but don't solve the temporal leakage problem.

The test set should simulate the actual future you're trying to predict.
</details>

---

## Q4. Baseline Importance

Your gradient boosting model achieves AUC 0.75 on the churn task. A colleague says "that's good, ship it!" What's missing?

**A)** You need to try more hyperparameters first

**B)** You need to compare to a baseline (random, heuristic, simpler model) ✓

**C)** AUC isn't the right metric — use accuracy instead

**D)** You need more training data

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

Without a baseline, you can't know if 0.75 is good. If random guessing achieves 0.50 and a simple "customers with no orders in 30 days" heuristic achieves 0.72, then your model adds only marginal value over a free heuristic.

Always establish baselines: (1) random/majority class, (2) business heuristic, (3) simple model before declaring success.
</details>

---

## Q5. Debugging Priority

Your model's test accuracy is 55% and train accuracy is 95%. Which should you investigate FIRST?

**A)** Try a more complex model

**B)** Collect more training data

**C)** Check for data leakage or improper train/test split ✓

**D)** Tune hyperparameters

<details>
<summary>Answer & Explanation</summary>

**Correct: C**

A 40-point gap between train and test is a red flag for overfitting OR improper evaluation. Before adding complexity (A), data (B), or tuning (D), verify that your train/test split is correct and there's no leakage.

The debugging flow starts with data and splitting issues, not model issues.
</details>

---

## Q6. Metric Selection

You're building a fraud detection model where:
- False positive cost: $10 (wasted investigation)
- False negative cost: $1000 (undetected fraud)

Which evaluation approach is best?

**A)** Maximize accuracy

**B)** Maximize AUC-ROC

**C)** Optimize threshold using cost-weighted analysis ✓

**D)** Maximize recall regardless of precision

<details>
<summary>Answer & Explanation</summary>

**Correct: C**

When false positive and false negative costs differ significantly, you need cost-weighted evaluation. Pure accuracy (A) treats all errors equally. AUC (B) summarizes across all thresholds but doesn't pick one. Maximizing recall (D) ignores the $10 FP cost entirely.

The optimal threshold balances the asymmetric costs: threshold ≈ Cost(FP) / (Cost(FP) + Cost(FN)) = 10 / 1010 ≈ 0.01.
</details>

---

## Q7. Feature Suspicion

You add a feature "customer_lifetime_value" to predict churn. The model's AUC jumps from 0.72 to 0.98. What should you suspect?

**A)** This feature is legitimately very predictive

**B)** The feature likely contains future information (leakage) ✓

**C)** The model is now overfitting

**D)** The AUC calculation is wrong

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

A single feature causing a massive jump to near-perfect performance is a red flag for leakage. "Lifetime value" likely includes future purchases that happen AFTER the prediction point. At prediction time, you wouldn't know their full lifetime value.

Always ask: "Would I have this exact value at prediction time?"
</details>

---

## Q8. Deployment Readiness

Your model passes all offline tests. What's the MOST important thing to set up before deployment?

**A)** A/B testing framework

**B)** Monitoring for data drift and model performance ✓

**C)** Automatic retraining pipeline

**D)** Load balancing for high traffic

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

Without monitoring, you won't know when the model starts failing. Data distributions change, user behavior shifts, and model performance degrades silently. Monitoring catches these issues before they cause business damage.

A/B testing (A) is valuable but optional. Automatic retraining (C) helps but only if you know WHEN to retrain. Load balancing (D) is infrastructure, not ML-specific.
</details>

---

## Scoring

- **8/8:** Excellent! You understand the full ML pipeline and where bugs occur.
- **6-7/8:** Good grasp. Review the stages you're less confident about.
- **4-5/8:** Revisit the micro-lesson and explore the pipeline playground.
- **< 4/8:** Spend more time with the interactive playground before continuing.
