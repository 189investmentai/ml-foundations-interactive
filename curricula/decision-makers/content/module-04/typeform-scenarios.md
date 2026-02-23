# Module 4: Typeform Scenarios

---

## Scenario 1: Model Selection

**Setup:**
You're building a churn model. You have 50,000 customers, 15 features, and need the best possible accuracy. Interpretability is secondary.

**Question:** Which model should you try first?

**Options:**
- A) Logistic regression
- B) Random forest  
- C) XGBoost with early stopping
- D) Neural network

**Correct Answer:** C

**Decision Receipt:**
With 50K rows, XGBoost typically outperforms random forests and logistic regression on tabular data. Early stopping prevents overfitting. Neural networks rarely beat boosting for structured tabular data and are harder to tune. Start with XGBoost, use random forest as baseline comparison.

---

## Scenario 2: Learning Rate Tuning

**Setup:**
Your XGBoost model with these settings:
- learning_rate=0.3
- n_estimators=100
- early_stopping_rounds=10

Stopped after 25 trees. Validation AUC: 0.74.

**Question:** What should you try to potentially improve?

**Options:**
- A) Increase learning_rate to 0.5
- B) Decrease learning_rate to 0.05, increase n_estimators to 500
- C) Remove early stopping
- D) The model is already optimal

**Correct Answer:** B

**Decision Receipt:**
Stopping at 25/100 trees suggests the model converged too quickly. A lower learning rate (0.05) with more trees (500) allows finer-grained corrections and often finds a better optimum. It's like taking smaller steps—more steps needed, but you land closer to the target. Early stopping will still prevent overfitting.

---

## Scenario 3: Overfitting Signal

**Setup:**
Your XGBoost training log shows:
```
Round 100: Train AUC=0.92, Val AUC=0.78
Round 200: Train AUC=0.96, Val AUC=0.77
Round 300: Train AUC=0.98, Val AUC=0.75
```

**Question:** What's happening and what should you do?

**Options:**
- A) Model is improving—keep training
- B) Model is overfitting—lower learning rate
- C) Model is overfitting—use early stopping
- D) Model is underfitting—add more features

**Correct Answer:** C

**Decision Receipt:**
Validation AUC is decreasing while training AUC keeps climbing—classic overfitting. The model started memorizing training data around round 100-200. Early stopping with `early_stopping_rounds=20` would have stopped at ~round 100 where validation was highest (0.78).

---

## Scenario 4: Production Latency

**Setup:**
Your XGBoost model has 500 trees and achieves 0.83 AUC. It takes 150ms to score one customer. Your checkout flow requires <50ms latency.

**Question:** What's the best solution?

**Options:**
- A) Use a GPU—it will be faster
- B) Reduce to 100 trees and accept some accuracy loss
- C) Keep the model but batch predictions overnight
- D) Switch to logistic regression

**Correct Answer:** B

**Decision Receipt:**
Fewer trees = faster inference. Going from 500 to 100 trees might drop you from 150ms to 30ms. You'll lose some accuracy (maybe 0.83 → 0.80), but you'll meet latency requirements. Option C doesn't work for real-time checkout decisions. Option D might work but loses more accuracy than reducing trees.

---

## Scenario 5: Marginal Gains

**Setup:**
Current results:
- Random Forest: 0.77 AUC, 30 min to train
- XGBoost (tuned): 0.79 AUC, 4 hours to train (including tuning)

Deploying either model to production requires the same effort.

**Question:** Which model should you deploy?

**Options:**
- A) XGBoost—0.02 AUC improvement is significant
- B) Random Forest—the improvement isn't worth the complexity
- C) Depends on business impact of 0.02 AUC
- D) Neither—you need at least 0.85 AUC

**Correct Answer:** C

**Decision Receipt:**
0.02 AUC could be meaningful or trivial depending on context. If you're targeting 1000 customers/week, 0.02 AUC might mean 20 more churners caught—valuable! If you're targeting 50 customers, it might be <1 extra churner—not worth the complexity. Always translate model metrics to business impact before deciding.

---

## Scenario 6: Forest vs. Boosting

**Setup:**
You have two models for fraud detection:
- Random Forest: 0.88 AUC, stable across different random seeds
- XGBoost: 0.89 AUC, varies from 0.87-0.91 depending on random seed

**Question:** Which model would you deploy?

**Options:**
- A) XGBoost—it has higher average AUC
- B) Random Forest—stability is more important in production
- C) XGBoost with fixed random seed
- D) Run 10 XGBoost models and ensemble them

**Correct Answer:** B (or C)

**Decision Receipt:**
Model stability matters in production. A model that varies 0.87-0.91 could have a "bad day" and miss fraud. The random forest's consistent 0.88 is more predictable. Option C is valid if you fix the seed—but raises questions about why the model is so sensitive to randomness. In practice, either B or C is defensible; A is risky.

---

## Scoring Summary

**6/6 correct:** You understand boosting tradeoffs well.

**4-5/6 correct:** Good foundation. Review early stopping and the production latency tradeoff.

**<4/6 correct:** Re-read the micro-lesson, especially the learning rate and when-to-use sections.
