# Module 9: Classification Metrics - Beyond Accuracy

**Time:** 30-40 minutes

**Promise:** After this module, you'll know why accuracy lies, how to choose the right classification metric, and how to communicate tradeoffs to stakeholders.

---

## The Setup

Your churn model predicts 95% accuracy. Sounds great, right?

But wait — only 5% of customers churn. If you predict "no churn" for everyone, you get 95% accuracy while catching zero churners.

**Accuracy is often meaningless.** This module teaches you the metrics that matter.

---

## The Mental Models

### 1. The Confusion Quadrant

Every prediction falls into one of four buckets:

|                    | Actually Positive | Actually Negative |
|--------------------|-------------------|-------------------|
| **Predicted Positive** | True Positive (TP) | False Positive (FP) |
| **Predicted Negative** | False Negative (FN) | True Negative (TN) |

**Memory trick:** 
- "True/False" = was the prediction correct?
- "Positive/Negative" = what did you predict?

### 2. The Precision-Recall Seesaw

**Precision:** Of those you predicted positive, how many were actually positive?
```
Precision = TP / (TP + FP)
```
"When I say churn, am I right?"

**Recall (Sensitivity):** Of all actual positives, how many did you catch?
```
Recall = TP / (TP + FN)
```
"Did I catch all the churners?"

**The tradeoff:** Raising one typically lowers the other.
- High precision → conservative, miss some positives
- High recall → aggressive, more false alarms

### 3. The Threshold Lever

Classifiers output probabilities. The threshold decides the cutoff:
- Probability > threshold → predict positive
- Probability ≤ threshold → predict negative

**Moving the threshold:**
- Lower threshold (0.3) → more positives → higher recall, lower precision
- Higher threshold (0.7) → fewer positives → higher precision, lower recall

### 4. The Curve Storytellers

**ROC Curve:** Plots True Positive Rate vs False Positive Rate at all thresholds
- Area Under Curve (AUC) = overall ranking ability
- 0.5 = random guessing, 1.0 = perfect

**PR Curve:** Plots Precision vs Recall at all thresholds
- Better for imbalanced data
- Area under = Average Precision (AP)

---

## The Metrics

### Accuracy

```
Accuracy = (TP + TN) / (TP + TN + FP + FN)
```

**When useful:** Balanced classes, all errors equally costly.

**When misleading:** Imbalanced data (99% of one class).

### Precision

```
Precision = TP / (TP + FP)
```

**Interpretation:** "Of my positive predictions, what % were correct?"

**Use when:** False positives are costly (spam filter, fraud alerts).

### Recall (Sensitivity, True Positive Rate)

```
Recall = TP / (TP + FN)
```

**Interpretation:** "Of all actual positives, what % did I catch?"

**Use when:** Missing positives is costly (disease screening, fraud detection).

### F1 Score

```
F1 = 2 × (Precision × Recall) / (Precision + Recall)
```

**Interpretation:** Harmonic mean of precision and recall.

**Use when:** You need a single number balancing both.

**Limitation:** Assumes precision and recall are equally important.

### Specificity (True Negative Rate)

```
Specificity = TN / (TN + FP)
```

**Interpretation:** "Of all negatives, what % did I correctly identify?"

**Use when:** False positives are very costly.

### AUC-ROC

**Interpretation:** Probability that a random positive is ranked higher than a random negative.

| AUC | Interpretation |
|-----|----------------|
| 0.5 | Random guessing |
| 0.6-0.7 | Poor |
| 0.7-0.8 | Acceptable |
| 0.8-0.9 | Good |
| 0.9+ | Excellent |

**Use when:** You want threshold-independent performance measure.

**Limitation:** Can be misleading with severe class imbalance.

### Average Precision (PR-AUC)

**Interpretation:** Summary of PR curve, more sensitive to improvements on minority class.

**Use when:** Imbalanced data, care about positive class.

---

## Choosing the Right Metric

### By Business Context

| Scenario | Primary Metric | Why |
|----------|----------------|-----|
| Churn retention (expensive outreach) | Precision | Don't waste money on non-churners |
| Churn retention (cheap outreach) | Recall | Don't miss any churners |
| Fraud detection | Recall | Missing fraud is costly |
| Email spam filter | Precision | False positives annoy users |
| Medical screening | Recall | Missing disease is dangerous |
| Medical diagnosis | Precision | False alarms cause anxiety |

### By Class Balance

| Situation | Preferred Metrics |
|-----------|-------------------|
| Balanced (50/50) | Accuracy, F1, ROC-AUC |
| Moderate imbalance (80/20) | F1, ROC-AUC, PR-AUC |
| Severe imbalance (99/1) | PR-AUC, Recall@K, Precision@K |

### By Use Case

| Question | Metric |
|----------|--------|
| "Overall how good is the model?" | AUC-ROC or PR-AUC |
| "At this threshold, what's performance?" | Precision, Recall, F1 |
| "If I take action on top K, how many are real?" | Precision@K |
| "What fraction of positives am I catching?" | Recall |

---

## Threshold Optimization

Default threshold (0.5) is rarely optimal.

### By Business Cost

If you know the cost of errors:
```
Optimal threshold = Cost(FP) / (Cost(FP) + Cost(FN))
```

**Example:** 
- Cost of missing a churner (FN): $500 (lost customer)
- Cost of unnecessary outreach (FP): $20 (wasted marketing)
- Optimal threshold: 20 / (20 + 500) = 0.038

Lower threshold → more aggressive → catch more churners.

### By Capacity

If you can only take action on K customers:
- Sort by probability descending
- Take top K
- Report Precision@K

---

## Failure Modes

### 1. Using Accuracy on Imbalanced Data

**Symptom:** 95% accuracy but 0% recall on minority class.

**The Problem:** Model predicts majority class for everything.

**Fix:** Use precision, recall, F1, or PR-AUC instead.

### 2. Optimizing the Wrong Metric

**Symptom:** Great F1 score but stakeholders unhappy.

**The Problem:** Business cares about precision (cost per lead) but you optimized recall.

**Fix:** Define business cost function, optimize accordingly.

### 3. Ignoring Threshold Choice

**Symptom:** Model "works" in development, fails in production.

**The Problem:** Default 0.5 threshold doesn't match business needs.

**Fix:** Explicitly choose threshold based on precision-recall tradeoff.

### 4. AUC Tunnel Vision

**Symptom:** High AUC but predictions aren't useful at any threshold.

**The Problem:** AUC averages over all thresholds; you operate at one.

**Fix:** Report precision/recall at your operating threshold.

---

## Business Translation

### Explaining Precision vs Recall

**Don't say:** "Precision is TP over TP plus FP."

**Do say:** "If we reach out to 100 predicted churners, 85 will actually be about to churn. That's 85% precision."

### Explaining the Tradeoff

**Don't say:** "There's a precision-recall tradeoff."

**Do say:** "We can catch 90% of churners, but 30% of our outreach goes to non-churners. Or we can catch 60% of churners with only 10% wasted outreach. Which fits our budget?"

### Explaining AUC

**Don't say:** "The AUC is 0.85."

**Do say:** "If we randomly pick one churner and one loyal customer, our model ranks the churner higher 85% of the time."

### Explaining Threshold

**Don't say:** "We set threshold to 0.3."

**Do say:** "We're being aggressive — better to have some false alarms than miss churners. With this setting, we catch 80% of churners."

---

## Practice

### Before the Lab

Open the **Interactive Playground** (`playground_classification_metrics.html`):

1. Start with balanced data — see all metrics work well
2. Create class imbalance — watch accuracy become meaningless
3. Move the threshold slider — see precision/recall tradeoff live
4. Compare ROC and PR curves on imbalanced data

### Key Observations

- Accuracy is deceiving on imbalanced data
- Threshold choice dramatically affects real-world performance
- PR curve is more informative than ROC for imbalanced problems
- There's no "best" metric — it depends on business costs

---

## Quick Reference

### Confusion Matrix Cheat

|  | Predicted + | Predicted - |
|--|-------------|-------------|
| **Actual +** | TP ✅ | FN 😱 |
| **Actual -** | FP 🙄 | TN ✅ |

### Formula Cheat

| Metric | Formula | Question Answered |
|--------|---------|-------------------|
| Precision | TP/(TP+FP) | "Of my alerts, how many are real?" |
| Recall | TP/(TP+FN) | "Of all positives, how many caught?" |
| Specificity | TN/(TN+FP) | "Of all negatives, how many correct?" |
| F1 | 2PR/(P+R) | "Balance of precision and recall" |
| Accuracy | (TP+TN)/All | "Overall correct (⚠️ imbalance)" |

---

## Done Checklist

- [ ] Understood why accuracy can be misleading
- [ ] Explored threshold effects in the playground
- [ ] Compared ROC and PR curves
- [ ] Connected metrics to business decisions
- [ ] Completed the notebook lab
- [ ] Passed the quiz
