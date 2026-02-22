# Module 04: Gradient Boosting - Typeform Scenario

**Theme:** You're tuning a LightGBM model and explaining boosting concepts to your team.

---

## Q1 (Multiple Choice)
**Boosting builds trees sequentially. What does each new tree focus on?**

- A) Random samples of the data
- B) The errors (residuals) from previous trees
- C) Different features than the previous tree
- D) The easiest examples to classify

**Correct:** B

**Decision Receipt:** Boosting is ERROR-FOCUSED. Each tree tries to fix what previous trees got wrong. Tree 1 gets the big picture, Tree 2 fixes Tree 1's mistakes, and so on.

---

## Q2 (Multiple Choice)
**Your LightGBM model has these settings: `n_estimators=2000, max_depth=-1, min_child_samples=1`**

What's the risk?

- A) Model will be too simple
- B) Model will severely overfit
- C) Training will be too slow
- D) No risk, these are optimal settings

**Correct:** B

**Decision Receipt:** 2000 trees with unlimited depth and 1-sample leaves = recipe for overfitting. The model can memorize individual training examples. Always use constraints and early stopping.

---

## Q3 (Multiple Choice)
**What does `learning_rate` control in boosting?**

- A) How fast the model trains (wall clock time)
- B) How much each tree contributes to the final prediction
- C) The number of trees used
- D) The depth of each tree

**Correct:** B

**Decision Receipt:** Learning rate (0.01-0.3 typically) scales each tree's contribution. Lower = each tree contributes less, but you need more trees. It's a trade-off: lower learning rate often gives better results but trains slower.

---

## Q4 (Multiple Choice)
**You set `learning_rate=0.01` instead of `learning_rate=0.3`. What should you also change?**

- A) Decrease n_estimators
- B) Increase n_estimators (and use early stopping)
- C) Increase max_depth
- D) Nothing else needs to change

**Correct:** B

**Decision Receipt:** Lower learning rate = smaller steps = need more trees to reach the same performance. Always pair low learning rate with high n_estimators + early stopping.

---

## Q5 (Multiple Choice)
**Your training shows:**
```
Iteration 100: Train AUC 0.85, Val AUC 0.80
Iteration 500: Train AUC 0.95, Val AUC 0.82
Iteration 1000: Train AUC 0.99, Val AUC 0.79
```

**What should you do?**

- A) Use the model at iteration 1000 (highest train AUC)
- B) Use the model around iteration 500 (best val AUC)
- C) Train for 2000 iterations
- D) Start over with different data

**Correct:** B

**Decision Receipt:** Validation AUC peaked around 500, then DECREASED. This is overfitting—the model started memorizing training data. Early stopping would catch this automatically.

---

## Q6 (Multiple Choice)
**What does early stopping do?**

- A) Stops training when training accuracy reaches 100%
- B) Stops training when validation performance stops improving
- C) Stops training after a fixed number of iterations
- D) Stops training when memory is full

**Correct:** B

**Decision Receipt:** Early stopping monitors VALIDATION (not training) performance. When it hasn't improved for N rounds, training stops. This prevents overfitting automatically.

---

## Q7 (Multiple Choice)
**Your validation metric is noisy and evaluated every 10 boosting rounds. Which early stopping setup is most reasonable for v1?**

- A) `stopping_rounds=1` - stop at first dip
- B) `stopping_rounds=5` - stop very aggressively
- C) `stopping_rounds=50` - allow fluctuations but still prevent long overfit runs
- D) `stopping_rounds=1000` - effectively disable early stopping

**Correct:** C

**Decision Receipt:** With noisy validation, tiny patience values can stop too early due to random wiggles. Moderate patience is safer. The exact number is context-dependent, but the principle is to avoid both knee-jerk stopping and no stopping at all.

---

## Q8 (Multiple Choice)
**Your colleague says: "I set n_estimators=100 without early stopping because I don't want to overfit."**

What's the problem?

- A) Nothing, this is a good approach
- B) 100 trees might not be enough; early stopping would find the optimal number
- C) They should use 50 trees instead
- D) Early stopping causes overfitting

**Correct:** B

**Decision Receipt:** Fixed n_estimators is arbitrary—maybe 80 is enough, maybe you need 200. Early stopping FINDS the right number automatically based on actual performance.

---

## Q9 (Multiple Choice)
**`num_leaves` in LightGBM controls:**

- A) The number of trees
- B) The maximum number of terminal nodes per tree
- C) The number of features used
- D) The learning rate

**Correct:** B

**Decision Receipt:** num_leaves determines tree complexity. More leaves = more complex tree = more capacity to fit data (and overfit). Default 31 is reasonable; reduce if overfitting.

---

## Q10 (Multiple Choice)
**Which hyperparameter combination is MOST likely to overfit?**

- A) `max_depth=4, num_leaves=15, min_child_samples=50`
- B) `max_depth=-1, num_leaves=256, min_child_samples=1`
- C) `max_depth=6, num_leaves=31, min_child_samples=20`
- D) `max_depth=3, num_leaves=8, min_child_samples=100`

**Correct:** B

**Decision Receipt:** Unlimited depth (-1), many leaves (256), and single-sample splits (1) = maximum complexity = maximum overfitting risk. Option D is most constrained/safest.

---

## Q11 (Multiple Choice)
**You're selecting a boosting library for churn scoring at scale. Which statement is the most practical?**

- A) "Pick whichever is popular on social media"
- B) "LightGBM and XGBoost are both strong; benchmark both on validation metric, latency, and memory in your environment"
- C) "XGBoost is always more accurate"
- D) "LightGBM is always better in every case"

**Correct:** B

**Decision Receipt:** Real-world tool choice is empirical. Different datasets and constraints can flip the winner. Benchmarking against business metrics and runtime constraints beats blanket rules.

---

## Q12 (Short Answer)
**Write a 2-3 sentence recommendation to a PM after this experiment:**
- Logistic Regression: AUC 0.72, easy to explain
- LightGBM: AUC 0.78, harder to explain
- Retention team can contact only top 500 customers/week

**Expected Answer (key points):**
- Recommend based on top-500 business impact, not AUC alone
- Acknowledge interpretability trade-off and mitigation (e.g., reason codes/SHAP)
- Propose pilot + monitoring before full rollout

**Decision Receipt:** Strong recommendations tie model quality to operational constraints and rollout risk, not just abstract performance gains.
