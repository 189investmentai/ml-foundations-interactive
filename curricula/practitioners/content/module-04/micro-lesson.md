# Module 4: Logistic Regression - Classification with Probabilities

**Time:** 30-45 minutes

**Promise:** After this module, you'll understand how logistic regression predicts probabilities, why threshold choice matters, and how to communicate classification results to stakeholders.

---

## The Setup

You're a data scientist at StreamCart. The retention team wants to predict **which customers will churn** so they can send targeted retention offers.

This is different from Module 3:
- **Regression:** Predict a number (how much will they spend?)
- **Classification:** Predict a category (will they churn? yes/no)

You need a model that:
1. Outputs a probability (0-100% chance of churning)
2. Lets you control the tradeoff between catching churners vs. false alarms
3. Can be explained to the retention team

Logistic regression is the starting point for classification.

---

## The Mental Models

### 1. The Probability Machine

Linear regression outputs any number (-∞ to +∞). But for classification, we need probabilities (0 to 1).

**The sigmoid function** squashes any number into the 0-1 range:

```
                    Sigmoid: σ(z) = 1 / (1 + e^(-z))
                    
        1.0 |                          ●●●●●●●●●●●
            |                      ●●●
            |                   ●●
        0.5 |                 ●         ← z=0 → P=0.5
            |               ●●
            |            ●●●
        0.0 |●●●●●●●●●●●●
            +------|---------|---------|---------|---→ z
                  -4        -2         0         2         4
                  
    z << 0: P ≈ 0 (certain no churn)
    z >> 0: P ≈ 1 (certain churn)
    z = 0:  P = 0.5 (uncertain)
```

Think of it as a "certainty dial" — the more evidence for churn, the higher the probability.

### 2. The Threshold Decision

The model outputs a probability. But the business needs a decision: **Yes or No**.

**You choose the threshold:**
- If P(churn) ≥ 0.5 → Predict "Will Churn"
- If P(churn) < 0.5 → Predict "Won't Churn"

But 0.5 isn't magical! You can set ANY threshold:
- **Low threshold (0.2):** Catch more churners, but more false alarms
- **High threshold (0.8):** Fewer false alarms, but miss more churners

The right threshold depends on the **cost of mistakes**.

### 3. The Confusion Quadrant

Every prediction falls into one of four boxes:

|  | Predicted: No | Predicted: Yes |
|--|---------------|----------------|
| **Actual: No** | ✅ True Negative | ⚠️ False Positive |
| **Actual: Yes** | ❌ False Negative | ✅ True Positive |

- **True Positive (TP):** Correctly caught a churner
- **True Negative (TN):** Correctly identified a stayer
- **False Positive (FP):** Said "churn" but they stayed (wasted offer)
- **False Negative (FN):** Said "stay" but they churned (lost customer)

### 4. The Precision-Recall Seesaw

You can't maximize both. There's a fundamental tradeoff:

**Precision:** "Of the customers I flagged as churners, how many actually churned?"
- High precision = few false alarms
- Formula: TP / (TP + FP)

**Recall:** "Of all the customers who actually churned, how many did I catch?"
- High recall = catch most churners
- Formula: TP / (TP + FN)

Lower your threshold → Recall goes UP, Precision goes DOWN.

---

## How It Works

### The Equation

```
P(churn) = sigmoid(β₀ + β₁x₁ + β₂x₂ + ...)
         = 1 / (1 + e^(-(β₀ + β₁x₁ + ...)))
```

Inside the sigmoid is a linear combination (just like linear regression). The sigmoid wraps it to produce a probability.

### Interpreting Coefficients

In logistic regression, coefficients affect the **log-odds**:
- Positive coefficient → increases probability of churn
- Negative coefficient → decreases probability of churn

**Odds ratio interpretation:**
If coefficient for `support_tickets` = 0.3, then:
> "Each additional support ticket multiplies the odds of churning by e^0.3 ≈ 1.35 (35% higher odds)"

### The Decision Boundary

In 2D feature space, the decision boundary is a straight line where P(churn) = threshold.
- Points on one side → Predict "churn"
- Points on other side → Predict "stay"

---

## Failure Modes

### 1. Ignoring Class Imbalance

**Symptom:** 95% accuracy but model predicts "No" for everyone.

**The Problem:** If only 5% of customers churn, predicting "No" always gets 95% accuracy — but catches zero churners!

**The Fix:**
- Don't use accuracy for imbalanced classes
- Use precision, recall, F1, or AUC instead
- Consider resampling or class weights

### 2. Using Default Threshold

**Symptom:** Precision/recall don't match business needs.

**The Problem:** The default threshold (0.5) isn't optimal for your cost structure.

**The Fix:**
- Calculate cost of FP vs FN
- Find threshold that minimizes total cost
- Or maximize F1 if costs are roughly equal

### 3. Linearity Assumption

**Symptom:** Poor predictions despite good features.

**The Problem:** Decision boundary is a straight line. If the true boundary is curved, logistic regression can't capture it.

**The Fix:**
- Add polynomial features
- Use a more flexible model (trees, neural nets)

---

## Business Translation

### Talking About Probability

**Don't say:** "The model predicts 0.73"

**Do say:** "This customer has a 73% chance of churning — they're high risk"

### Explaining the Threshold

**Don't say:** "We use threshold 0.3"

**Do say:** "We flag anyone with more than 30% churn risk. This catches 80% of churners, though 40% of flags are false alarms. At $50 per retention offer and $200 per lost customer, this is cost-optimal."

### Communicating Tradeoffs

**Don't say:** "Precision is 60%"

**Do say:** "Of every 10 customers we target for retention, about 6 would actually have churned. The other 4 get an offer they didn't need — but that's cheaper than losing the 6."

---

## Practice

### Before the Lab

Open the **Interactive Playground** (`playground_logistic_regression.html`):

1. Start with the "Balanced" preset. Move the threshold slider and watch precision/recall change.
2. Try "Imbalanced (5% churn)". Notice how accuracy is misleading!
3. Try "Overlapping Classes". See why no threshold is perfect.
4. Challenge: Find the threshold that maximizes F1 score.

### Key Observations

- Lower threshold → more True Positives AND more False Positives
- Sigmoid converts any score to 0-1 probability
- Confusion matrix shows exactly where the model succeeds/fails
- Class imbalance makes accuracy useless

---

## Quick Reference

### Key Metrics

| Metric | Formula | When to Use |
|--------|---------|-------------|
| Accuracy | (TP+TN) / Total | Balanced classes only |
| Precision | TP / (TP+FP) | When FP is costly (spam filter) |
| Recall | TP / (TP+FN) | When FN is costly (disease screening) |
| F1 | 2 × P × R / (P+R) | Balance precision and recall |

### Red Flags

- High accuracy but zero recall → model predicts majority class only
- Precision = 100% with low recall → threshold too high
- Coefficients explode → perfect separation or multicollinearity

### Threshold Selection Guide

| Scenario | Priority | Threshold |
|----------|----------|-----------|
| Fraud detection | Catch fraud (recall) | Lower (0.2-0.3) |
| Spam filter | Avoid false positives (precision) | Higher (0.7-0.8) |
| Medical screening | Catch disease (recall) | Lower |
| Balanced costs | Maximize F1 | Find optimal |

---

## Done Checklist

- [ ] Explored the interactive playground
- [ ] Understood sigmoid and threshold
- [ ] Experimented with precision/recall tradeoff
- [ ] Tried the imbalanced class scenario
- [ ] Completed the notebook lab
- [ ] Passed the quiz
