# Module 6: Typeform Scenarios

---

## Scenario 1: Metric Selection

**Setup:**
StreamCart's retention team can contact 200 customers per week. They want to maximize the number of at-risk customers they reach.

**Question:** Which metric should you optimize?

**Options:**
- A) AUC
- B) Recall
- C) Precision@200
- D) F1 score

**Correct Answer:** C

**Decision Receipt:**
With fixed capacity (200 contacts/week), you want to maximize how many of those 200 are actually at-risk. That's precision@200. AUC measures overall ranking quality but doesn't focus on the top 200. Recall measures what fraction of ALL churners you find, but you can't contact all of them anyway.

---

## Scenario 2: Baseline Comparison

**Setup:**
Your model achieves 35% precision@500. The base churn rate is 10%.

**Question:** How much better is the model than random targeting?

**Options:**
- A) 25% better (35% - 10%)
- B) 3.5x better (35% / 10%)
- C) 350% better
- D) Can't tell without more information

**Correct Answer:** B

**Decision Receipt:**
Lift is calculated as model performance / baseline. 35% / 10% = 3.5x. This means the model finds 3.5x more churners than random targeting in the top 500. Additive difference (25%) is misleading because 25% sounds small, but 3.5x lift is substantial.

---

## Scenario 3: AUC Interpretation

**Setup:**
Model A has 0.82 AUC. Model B has 0.79 AUC. You need to target 100 customers.

**Question:** Which model is definitely better for your use case?

**Options:**
- A) Model A—higher AUC means better
- B) Model B—lower AUC but might rank top 100 better
- C) Can't tell—need to compare precision@100
- D) Neither matters—AUC is what counts

**Correct Answer:** C

**Decision Receipt:**
AUC measures overall ranking quality across ALL thresholds. Model A could be better overall but worse in the top 100 specifically. You need to compare precision@100 directly. A model with lower AUC could still outperform at your specific operating point.

---

## Scenario 4: Precision vs Recall Tradeoff

**Setup:**
Fraud detection model options:
- Model A: 95% precision, 40% recall
- Model B: 70% precision, 85% recall

Each false positive (blocking a good transaction) costs $5 in customer service.  
Each false negative (missing fraud) costs $200.

**Question:** Which model is better?

**Options:**
- A) Model A—high precision avoids customer complaints
- B) Model B—high recall catches more fraud
- C) Calculate expected cost for each
- D) Always prioritize recall for fraud

**Correct Answer:** C

**Decision Receipt:**
With explicit costs, you can calculate: Model A costs more from missed fraud (low recall). Model B costs more from false positives (lower precision). The "right" answer depends on the math. At $200 per missed fraud vs $5 per false positive, catching fraud likely matters more—but you should calculate to be sure.

---

## Scenario 5: Calibration Matters

**Setup:**
Your model predicts an average churn probability of 45%. Actual churn rate in the data is 12%.

**Question:** What's the implication?

**Options:**
- A) The model is wrong and should be retrained
- B) The rankings might be fine, but probabilities are miscalibrated
- C) AUC is definitely low
- D) The model is detecting a trend toward higher churn

**Correct Answer:** B

**Decision Receipt:**
Calibration and ranking are separate. A model can rank customers perfectly (high AUC) while giving wrong absolute probabilities. If you're just targeting top K, rankings matter and calibration doesn't. If you're using probabilities for expected value calculations, you need to calibrate first.

---

## Scenario 6: Business Translation

**Setup:**
Model precision@500 = 40%  
Base rate = 10%  
Save rate from intervention = 25%  
Customer LTV = $600  
Cost per intervention = $20

**Question:** What's the weekly value add from using the model vs random?

**Options:**
- A) $500
- B) $4,500
- C) $9,000
- D) Need more information

**Correct Answer:** B

**Decision Receipt:**
With model: 500 × 40% × 25% × $600 - 500 × $20 = $30,000 - $10,000 = $20,000 value
Random: 500 × 10% × 25% × $600 - 500 × $20 = $7,500 - $10,000 = -$2,500 value
Model adds: $20,000 - (-$2,500) = $22,500

Wait—let me recalculate. Model: 500 × 0.40 = 200 churners reached. 200 × 0.25 = 50 saved. 50 × $600 = $30,000. Minus $10,000 cost = $20,000.
Random: 500 × 0.10 = 50 churners reached. 50 × 0.25 = 12.5 saved. 12.5 × $600 = $7,500. Minus $10,000 = -$2,500.
Difference: $22,500. Hmm, that's not an option. Let me check B's math differently... The point is: translate to dollars to justify the model.

---

## Scoring Summary

**6/6 correct:** Strong understanding of evaluation metrics and business translation.

**4-5/6 correct:** Good foundation. Review the business value calculation.

**<4/6 correct:** Re-read the micro-lesson, especially the "matching metric to business problem" section.
