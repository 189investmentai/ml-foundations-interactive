# Logistic Regression Cheatsheet

## The Core Idea

**Linear regression** → predicts numbers
**Logistic regression** → predicts probabilities (0 to 1)

```
P(class=1) = sigmoid(β₀ + β₁x₁ + β₂x₂ + ...)
           = 1 / (1 + e^(-z))
```

---

## The Confusion Matrix

|  | Pred: No | Pred: Yes |
|--|----------|-----------|
| **Actual: No** | TN ✅ | FP ⚠️ |
| **Actual: Yes** | FN ❌ | TP ✅ |

- **TP:** Correctly predicted positive
- **TN:** Correctly predicted negative  
- **FP:** False alarm (Type I error)
- **FN:** Missed positive (Type II error)

---

## Key Metrics

| Metric | Formula | Plain English |
|--------|---------|---------------|
| **Accuracy** | (TP+TN)/Total | % correct overall |
| **Precision** | TP/(TP+FP) | Of predicted Yes, % actually Yes |
| **Recall** | TP/(TP+FN) | Of actual Yes, % we caught |
| **F1** | 2PR/(P+R) | Balance of precision & recall |
| **Specificity** | TN/(TN+FP) | Of actual No, % we got right |

---

## Threshold Rule

```
If P(class=1) ≥ threshold → Predict "Yes"
If P(class=1) < threshold → Predict "No"
```

**Lower threshold:**
- ↑ Recall (catch more positives)
- ↓ Precision (more false alarms)

**Higher threshold:**
- ↑ Precision (fewer false alarms)
- ↓ Recall (miss more positives)

---

## When to Use Each Metric

| Scenario | Priority | Use |
|----------|----------|-----|
| Balanced classes | Overall performance | Accuracy, F1 |
| Imbalanced classes | Catch rare class | Recall, F1, AUC |
| False positives costly | Avoid false alarms | Precision |
| False negatives costly | Don't miss cases | Recall |

---

## Coefficient Interpretation

**Odds ratio:** e^β

If `β_tickets = 0.5`:
> "Each additional ticket multiplies odds of churn by e^0.5 ≈ 1.65"

**Sign matters:**
- Positive β → increases probability
- Negative β → decreases probability

---

## Red Flags

| Symptom | Likely Cause |
|---------|--------------|
| 95%+ accuracy, 0% recall | Predicting majority class only |
| Coefficients = ±∞ | Perfect separation |
| Precision = 100%, recall = 5% | Threshold too high |
| Wildly different train/test metrics | Overfitting |

---

## Quick Code

```python
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import precision_score, recall_score, f1_score

# Fit
model = LogisticRegression()
model.fit(X_train, y_train)

# Probabilities
probs = model.predict_proba(X_test)[:, 1]

# Custom threshold
threshold = 0.3
preds = (probs >= threshold).astype(int)

# Metrics
print(f"Precision: {precision_score(y_test, preds):.2f}")
print(f"Recall: {recall_score(y_test, preds):.2f}")
print(f"F1: {f1_score(y_test, preds):.2f}")
```

---

## Business Translation Scripts

**Probability:**
> "This customer has a 73% chance of churning — high risk."

**Threshold choice:**
> "We flag anyone above 30% risk. This catches 80% of churners, with 40% false alarms."

**Tradeoff:**
> "We can catch more churners by lowering the threshold, but we'll also waste more retention offers on customers who would have stayed anyway."
