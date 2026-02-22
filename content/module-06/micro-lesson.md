# Module 6: Is Your Model Actually Good?

**Time:** 60-90 minutes  
**Prerequisites:** Modules 2-5

---

## The Setup

Your model has 0.78 AUC. Is that good?

"It depends" is the honest but frustrating answer. Good compared to what? Good for what purpose? Good enough to deploy?

This module is about connecting model metrics to business outcomes. Because at the end of the day, nobody cares about AUC. They care about: Did we catch more churners? Did we waste money on false positives? Did the intervention work?

**The question we're answering:** How do we know if a model is actually useful for the business?

---

## The Mental Model

### The Analogy

Think of a spam filter.

**Precision:** Of all emails marked as spam, how many were actually spam?  
→ High precision = You rarely mark real emails as spam

**Recall:** Of all actual spam emails, how many did you catch?  
→ High recall = Very little spam gets through

You can't max out both. A filter that marks EVERYTHING as spam has perfect recall (caught 100% of spam) but terrible precision (most "spam" is actually real email). A filter that's very cautious has high precision but low recall.

The tradeoff is fundamental.

### The Picture

```
                   PREDICTION
                 Spam    Not Spam
              ┌─────────┬─────────┐
       Spam   │   TP    │   FN    │
ACTUAL        │ Caught! │ Missed  │
              ├─────────┼─────────┤
    Not Spam  │   FP    │   TN    │
              │ Oops!   │ Correct │
              └─────────┴─────────┘

    Precision = TP / (TP + FP)  "Of my predictions, how many were right?"
    Recall    = TP / (TP + FN)  "Of actual positives, how many did I find?"

              PRECISION                    RECALL
         "Don't cry wolf"             "Don't miss wolves"
         
    High precision, low recall:     Low precision, high recall:
    Very few false alarms           Catches everything, many false alarms
    but misses real threats         but also lots of noise
```

---

## The Metrics Zoo

### For Ranking: Precision@K and Recall@K

When you can only act on K items, these matter.

**Precision@K:** Of the top K predictions, how many were correct?

```python
# Top 500 customers by churn probability
top_500 = y_test.iloc[np.argsort(probabilities)[-500:]]
precision_500 = top_500.mean()  # What fraction actually churned?
```

**Recall@K:** Of all actual positives, how many are in the top K?

```python
total_churners = y_test.sum()
churners_in_top_500 = top_500.sum()
recall_500 = churners_in_top_500 / total_churners
```

**When to use:**
- Retention team can contact 500 people/week → use precision@500
- Fraud team can review 100 cases/day → use precision@100

### For Thresholds: Precision, Recall, F1

When you're making yes/no decisions at a specific threshold.

```python
# Choose threshold
threshold = 0.5
predictions = (probabilities >= threshold).astype(int)

# Calculate
precision = (predictions & y_test).sum() / predictions.sum()
recall = (predictions & y_test).sum() / y_test.sum()
f1 = 2 * precision * recall / (precision + recall)
```

**When to use:**
- Automated decisions (block this transaction or not)
- Need balance between precision and recall → F1

### For Overall Ranking Quality: AUC

**AUC:** Probability that a random positive is ranked higher than a random negative.

- 0.50 = Random guessing
- 0.70 = Decent
- 0.80 = Good
- 0.90+ = Either excellent or suspicious (check for leakage)

**When to use:**
- Comparing models overall
- No specific K or threshold defined yet

**Limitation:** Doesn't tell you what happens at specific operating points.

---

## Baselines: The Reality Check

A model isn't good in absolute terms. It's good compared to alternatives.

### Baseline 1: Random

```python
random_precision = y_test.mean()  # Just the base rate
print(f"Random baseline: {random_precision:.1%}")
# If 12% of customers churn, random targeting gets 12% precision
```

### Baseline 2: Simple Heuristic

```python
# "Target anyone who filed a support ticket"
heuristic_pred = X_test['support_tickets_30d'] > 0
heuristic_precision = y_test[heuristic_pred].mean()
print(f"Heuristic baseline: {heuristic_precision:.1%}")
```

### Baseline 3: Current Production

```python
# If you already have a model in production
current_model_auc = 0.72
new_model_auc = 0.76
improvement = new_model_auc - current_model_auc
# Is 0.04 AUC improvement worth the deployment effort?
```

### Always report lift

```
Model precision@500:    38%
Random baseline:        12%
Lift:                   3.2x

"The model is 3.2x better than random at identifying churners"
```

---

## Calibration: Are Your Probabilities Honest?

A model might rank customers correctly but give wrong probabilities.

**Well-calibrated:** If the model says 70% churn probability, about 70% of those customers actually churn.

**Poorly calibrated:** Model says 70% but actual rate is 30%.

### Why it matters

If you're using probabilities for decisions (not just rankings), calibration matters:
- "Target everyone with >50% churn probability"
- "Calculate expected cost savings"

### Checking calibration

```python
from sklearn.calibration import calibration_curve

prob_true, prob_pred = calibration_curve(y_test, probabilities, n_bins=10)

# Plot
plt.plot([0, 1], [0, 1], 'k--', label='Perfect')
plt.plot(prob_pred, prob_true, 'o-', label='Model')
plt.xlabel('Predicted probability')
plt.ylabel('Actual probability')
plt.legend()
```

### Fixing calibration

```python
from sklearn.calibration import CalibratedClassifierCV

calibrated_model = CalibratedClassifierCV(model, method='isotonic')
calibrated_model.fit(X_train, y_train)
calibrated_probs = calibrated_model.predict_proba(X_test)[:, 1]
```

---

## Choosing the Right Metric

### Decision Framework

```
What's your constraint?
│
├── Limited capacity (can only act on K)
│   └── Use Precision@K or Recall@K
│
├── Automated decision (yes/no)
│   └── Use Precision, Recall, or F1 at your threshold
│
├── Probability-based decisions
│   └── Check calibration + use expected value
│
└── Just comparing models (no specific use case)
    └── Use AUC as tiebreaker
```

### Matching Metric to Business Problem

| Problem | Metric | Why |
|---------|--------|-----|
| Retention team targets 500/week | Precision@500 | Limited capacity |
| Fraud blocks transactions | Precision (+ monitor recall) | False positives annoy customers |
| Medical screening | Recall | Missing a disease is worse than extra tests |
| General model comparison | AUC | No specific threshold yet |
| Cost optimization | Expected value | Different costs for FP vs FN |

---

## The StreamCart Example

### Choosing the right metric

StreamCart's retention team can call 100 customers per week.

```python
# Model predictions
probs = model.predict_proba(X_test)[:, 1]

# Precision@100: Of top 100 predictions, how many churn?
top_100_idx = np.argsort(probs)[-100:]
precision_100 = y_test.iloc[top_100_idx].mean()

# Baseline: What if we targeted randomly?
random_baseline = y_test.mean()

# Lift
lift = precision_100 / random_baseline

print(f"Precision@100: {precision_100:.1%}")
print(f"Random: {random_baseline:.1%}")
print(f"Lift: {lift:.1f}x")
```

**Output:**
```
Precision@100: 42%
Random: 12%
Lift: 3.5x
```

**Interpretation:** By calling the model's top 100, we reach 3.5x more churners than random calling.

### Business value calculation

```python
# Assumptions
cost_per_call = 5           # Labor cost
success_rate = 0.30         # 30% of at-risk customers saved if called
customer_ltv = 500          # Saved customer worth $500

# Without model (random 100 calls)
random_churners_reached = 100 * 0.12  # 12 churners
random_saved = random_churners_reached * 0.30  # 3.6 customers
random_value = random_saved * customer_ltv - 100 * cost_per_call
print(f"Random: ${random_value:.0f} net value")

# With model (targeted 100 calls)
model_churners_reached = 100 * 0.42  # 42 churners
model_saved = model_churners_reached * 0.30  # 12.6 customers
model_value = model_saved * customer_ltv - 100 * cost_per_call
print(f"Model: ${model_value:.0f} net value")

print(f"Model adds ${model_value - random_value:.0f} per week")
```

**Output:**
```
Random: $1,300 net value
Model: $5,800 net value
Model adds $4,500 per week
```

Now you can justify the model in dollars.

---

## What Goes Wrong

### Mistake 1: Optimizing the wrong metric

**Symptom:** Model has great AUC but business impact is flat.

**Example:** You optimized for AUC but the business can only act on 50 customers. Your model is great overall but maybe not better in the top 50.

**Fix:** Optimize for the metric that matches your constraint (precision@K, recall@K).

### Mistake 2: Ignoring calibration

**Symptom:** Using raw probabilities for expected value calculations gives wrong answers.

**Example:** Model says average churn probability is 30%, but actual churn rate is 12%.

**Fix:** Calibrate probabilities before using them for calculations.

### Mistake 3: No baseline comparison

**Symptom:** "Our model has 75% precision!" Sounds good, but if the base rate is 80%, the model is useless.

**Fix:** Always report lift over random and any existing heuristics.

### Mistake 4: Threshold without business context

**Symptom:** Using 0.5 as threshold because it's the default.

**Fix:** Set threshold based on business tradeoffs (cost of FP vs FN, capacity limits).

---

## Practice

### 1. Build (Colab Lab)
→ [Link to Colab notebook]

**What you'll do:**
- Calculate precision@K for different K
- Compare to baselines (random, heuristic)
- Check calibration
- Translate to business value

**Time:** ~20 minutes

---

### 2. Decide (Scenario Quiz)
→ [Link to Typeform]

**What you'll do:** 6 scenarios about metric selection, baseline comparison, and business value.

**Time:** ~10 minutes

---

### 3. Debug (Find the Bug)
→ [Link to debug Colab]

**What you'll do:** A model looks great on AUC but the business isn't seeing results. Find what metric was wrong.

**Time:** ~15 minutes

---

### 4. Explain (Stakeholder Update)

**The prompt:**  
Your VP asks: "Our model has 78% AUC. Is that good?" Write a response that explains what this means in business terms.

**What good looks like:**
- Translates AUC to something concrete
- Includes baseline comparison
- Gives a recommendation (good enough to deploy, or not)
- Uses dollars or customer counts, not just percentages

---

## Cheat Sheet

→ [Download: Module 6 Cheat Sheet (PDF)](#)

---

## Done?

- [ ] Read the micro-lesson
- [ ] Completed the scenario quiz  
- [ ] Ran the Colab lab
- [ ] Fixed the debug drill
- [ ] Wrote the stakeholder update

**Next up:** [Module 7: Finding Structure Without Labels](#)
