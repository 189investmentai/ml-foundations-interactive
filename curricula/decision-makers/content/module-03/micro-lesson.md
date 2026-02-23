# Module 3: When Linear Isn't Enough

**Time:** 60-90 minutes  
**Prerequisites:** Module 2 (Logistic Regression)

---

## The Setup

Your logistic regression model from Module 2 works okay—0.72 AUC, coefficients make sense. But there's a pattern it's missing.

You notice something in the data: customers with high tenure AND recent support tickets churn at 3x the rate of either group alone. These are long-time customers who've suddenly gotten frustrated. Logistic regression treats tenure and support tickets independently—it can't capture "when these two things happen together, everything changes."

That's where decision trees come in. They find these interactions automatically.

**The question we're answering:** What if the relationship between features and outcomes isn't a straight line?

---

## The Mental Model

### The Analogy

A decision tree plays "20 Questions" to guess the outcome.

"Is their tenure more than 6 months?"  
→ Yes: "Did they file a support ticket recently?"  
→ → Yes: "Probably going to churn."  
→ → No: "Probably staying."  
→ No: "How many times did they skip their box?"  
→ → More than 2: "Probably going to churn."  
→ → 2 or less: "Probably staying."

Each question splits the customers into groups with different outcomes. Keep asking questions until you have groups that are mostly churners or mostly stayers.

### The Picture

```
                    ALL CUSTOMERS
                    (12% churn rate)
                          │
                          ▼
              ┌───────────────────────┐
              │ tenure > 6 months?    │
              └───────────┬───────────┘
                    │           │
                   YES          NO
                    │           │
                    ▼           ▼
            ┌─────────────┐  ┌─────────────┐
            │support > 0? │  │skipped > 2? │
            └──────┬──────┘  └──────┬──────┘
               │       │        │       │
              YES      NO      YES      NO
               │       │        │       │
               ▼       ▼        ▼       ▼
            ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
            │ 35% │ │  5% │ │ 28% │ │ 15% │
            │churn│ │churn│ │churn│ │churn│
            └─────┘ └─────┘ └─────┘ └─────┘
            
    The tree finds natural segments with different churn rates.
    "Tenure > 6 months AND support > 0" = 35% churn (high risk!)
```

---

## How It Actually Works

### Building the Tree

The algorithm finds the best questions to ask. "Best" means: after the split, the groups are more pure (more strongly churner or stayer).

**Step 1: Try every possible split**

For each feature, try every possible threshold:
- tenure > 1 month? tenure > 2 months? tenure > 3 months? ...
- support_tickets > 0? support_tickets > 1? ...

**Step 2: Measure impurity reduction**

For each split, measure how much it separates churners from stayers. The split that creates the most homogeneous groups wins.

**Step 3: Repeat recursively**

Take each resulting group and ask: "What's the best split for THIS group?" Keep going until you hit a stopping rule (max depth, minimum samples, etc.).

### Reading a Tree

```python
from sklearn.tree import plot_tree
import matplotlib.pyplot as plt

plt.figure(figsize=(20, 10))
plot_tree(model, feature_names=features, filled=True, rounded=True)
plt.show()
```

Each box shows:
- The split rule (e.g., "tenure_months <= 5.5")
- Number of samples in that node
- Class distribution (e.g., [450, 50] = 450 stayers, 50 churners)
- Predicted class for that node

### Why Trees Capture Interactions

Logistic regression:
```
score = w₁×tenure + w₂×support_tickets + w₃×logins + ...
```

Each feature contributes independently. "Tenure AND support tickets" isn't special.

Decision tree:
```
if tenure > 6:
    if support_tickets > 0:
        → HIGH RISK (the interaction!)
    else:
        → low risk
else:
    → medium risk
```

The tree naturally finds "when X AND Y, then Z"—without you specifying which interactions to look for.

---

## Single Trees vs. Forests

### The Problem with Single Trees

Single decision trees have a weakness: they overfit. Give them enough depth, and they'll create one leaf node per customer, perfectly "predicting" the training data but learning nothing generalizable.

**Example of overfitting:**
```
Is customer_id == 4821?
→ Yes: Churn (because customer 4821 churned in training)
→ No: Is customer_id == 3952? ...
```

The tree memorized the data instead of learning patterns.

### Random Forests: Wisdom of the Crowd

A random forest builds 100+ trees, each slightly different:
- Each tree sees a random sample of the data (with replacement)
- Each tree considers only a random subset of features at each split

Then they vote. The final prediction is the average of all trees.

```
RANDOM FOREST

Tree 1: "Churn"      ─┐
Tree 2: "Stay"        │
Tree 3: "Churn"       ├──► VOTE ──► P(Churn) = 63/100 = 63%
Tree 4: "Stay"        │
...                   │
Tree 100: "Churn"   ─┘

63 trees said "churn", 37 said "stay"
```

**Why this works:** Individual trees might overfit to noise, but different trees overfit to different noise. When you average many trees, the noise cancels out and the signal remains.

---

## Feature Importance

Random forests tell you which features matter most—across all 100+ trees.

```python
importance = model.feature_importances_
for feature, imp in sorted(zip(features, importance), key=lambda x: -x[1]):
    print(f"{feature:30} {imp:.3f}")
```

Output:
```
support_tickets_last_30d       0.312
tenure_months                  0.245
logins_last_7d                 0.198
items_skipped_last_3_boxes     0.156
logins_last_30d                0.089
```

**Interpretation:** Support tickets is used in the most impactful splits (31.2% of the total "splitting power").

**Caution:** Feature importance has limitations:
- Correlated features split the importance (both might look weak when together)
- It shows predictive power, not causal effect
- It doesn't tell you the direction (does tenure increase or decrease churn?)

---

## The StreamCart Example

### Building a Random Forest

```python
from sklearn.ensemble import RandomForestClassifier

# Same features as before
features = [
    'tenure_months',
    'logins_last_7d',
    'logins_last_30d',
    'support_tickets_last_30d',
    'items_skipped_last_3_boxes'
]

X = df[features].fillna(0)
y = df['churn_30d']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train random forest
model = RandomForestClassifier(
    n_estimators=100,      # 100 trees
    max_depth=5,           # Limit depth to prevent overfitting
    random_state=42
)
model.fit(X_train, y_train)
```

### Comparing to Logistic Regression

```python
from sklearn.metrics import roc_auc_score

# Random Forest predictions
rf_probs = model.predict_proba(X_test)[:, 1]
rf_auc = roc_auc_score(y_test, rf_probs)

# Logistic Regression (from Module 2)
lr_probs = lr_model.predict_proba(X_test)[:, 1]
lr_auc = roc_auc_score(y_test, lr_probs)

print(f"Logistic Regression AUC: {lr_auc:.3f}")
print(f"Random Forest AUC:       {rf_auc:.3f}")
print(f"Improvement:             {rf_auc - lr_auc:.3f}")
```

**Typical result:** Random forest often beats logistic regression by 0.02-0.05 AUC when there are interactions or non-linear patterns.

---

## When to Use Trees vs. Logistic Regression

### Use a single decision tree when:

- **Interpretability is paramount.** You need to show stakeholders a flowchart they can follow.
- **Data is small.** Trees with limited depth are less prone to overfit than logistic regression on tiny datasets.
- **You want segments.** The tree naturally creates customer segments (each leaf is a segment).

### Use random forests when:

- **Accuracy matters more than interpretability.** You can't easily explain "100 trees voted."
- **Non-linear patterns exist.** Tenure thresholds, interaction effects.
- **You have medium-sized data.** 1K-100K rows.
- **You want robustness.** Forests are hard to screw up (few hyperparameters).

### Stick with logistic regression when:

- **Features are truly linear.** No thresholds, no interactions.
- **You need coefficient interpretation.** "Each support ticket adds 0.4 to the log-odds."
- **Model needs to be dead simple.** Compliance, auditing, extreme latency requirements.

---

## What Goes Wrong

### Mistake 1: Letting trees grow too deep

**Symptom:** Amazing training accuracy, terrible test accuracy. AUC = 0.99 on train, 0.65 on test.

**Cause:** Tree has hundreds of leaves, many with just a few samples. It memorized the training data.

**Fix:** Limit `max_depth` (try 3-10), set `min_samples_leaf` (try 20-100).

```python
model = RandomForestClassifier(
    max_depth=5,
    min_samples_leaf=50  # Each leaf must have at least 50 samples
)
```

### Mistake 2: Overfitting to one weird group

**Symptom:** The tree's first split is something bizarre like "state == Wyoming."

**Cause:** There happen to be 12 Wyoming customers, all of whom stayed. The tree thinks Wyoming is the most important signal.

**Fix:** More trees (random forest), limit depth, or require larger sample sizes per split.

### Mistake 3: Trusting feature importance blindly

**Symptom:** You remove the "most important" feature and the model doesn't get worse.

**Cause:** Feature importance doesn't account for correlation. If `logins_7d` and `logins_30d` are correlated, removing one doesn't hurt because the other carries the signal.

**Fix:** Use permutation importance (more reliable) or test by actually removing features.

```python
from sklearn.inspection import permutation_importance

perm_importance = permutation_importance(model, X_test, y_test, n_repeats=10)
for feature, imp in sorted(zip(features, perm_importance.importances_mean), key=lambda x: -x[1]):
    print(f"{feature}: {imp:.3f}")
```

---

## Practice

### 1. Build (Colab Lab)
→ [Link to Colab notebook]

**What you'll do:**
- Train a decision tree and visualize it
- Train a random forest and compare AUC
- Calculate feature importance
- Find the most "at-risk" segment (leaf with highest churn)

**Time:** ~20 minutes

---

### 2. Decide (Scenario Quiz)
→ [Scenario Quiz](https://docs.google.com/forms/d/e/1FAIpQLScU4xMZMsezvjiSfqRsyYsKyudxGu2KyPc-q7rTTUE_FhFUBg/viewform?usp=header)

**What you'll do:** 6 scenarios about choosing trees vs. regression, interpreting splits, and diagnosing overfitting.

**Time:** ~10 minutes

---

### 3. Debug (Find the Bug)
→ [Debug Drill](https://colab.research.google.com/github/189investmentai/ml-foundations-interactive/blob/main/notebooks/debug_drills/drill_03_wrong_metric.ipynb)

**What you'll do:** A random forest has perfect training accuracy but fails on test data. Find out why.

**Time:** ~15 minutes

---

### 4. Explain (Stakeholder Update)

**The prompt:**  
Your PM sees the random forest beat logistic regression by 0.03 AUC and wants to use it. But now they're asking "Why did it predict this customer would churn?"

Write a 4-5 sentence Slack message explaining the interpretability tradeoff and how you'd approach the "why" question with a random forest.

**What good looks like:**
- Acknowledges the tradeoff honestly (accuracy vs. interpretability)
- Offers practical alternatives (feature importance, sample explanations, SHAP)
- Doesn't oversell either approach
- Sounds like a human, not a textbook

---

## Cheat Sheet

→ [Download: Module 3 Cheat Sheet (PDF)](#)

---

## Done?

- [ ] Read the micro-lesson
- [ ] Completed the scenario quiz  
- [ ] Ran the Colab lab
- [ ] Fixed the debug drill
- [ ] Wrote the stakeholder update

**Next up:** [Module 4: Combining Many Weak Learners](#)
