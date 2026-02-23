# Module 4: Combining Many Weak Learners

**Time:** 60-90 minutes  
**Prerequisites:** Module 3 (Trees & Forests)

---

## The Setup

Random forests work well. But there's another approach that often does better: instead of building independent trees and voting, what if each new tree focused specifically on fixing the mistakes of the previous trees?

That's gradient boosting. It's the algorithm behind XGBoost and LightGBM—the tools that win most tabular data competitions. If random forests are "wisdom of independent crowds," boosting is "iterative error correction."

**The question we're answering:** How do we squeeze more accuracy out of tree-based models?

---

## The Mental Model

### The Analogy

Imagine a relay race, but each runner's job is to correct the previous runner's drift.

**Random Forest:** 100 runners race independently. At the end, average their positions. Individual errors cancel out.

**Gradient Boosting:** Runner 1 runs, ends up 10 meters off course. Runner 2's entire job is to correct that 10-meter error—they run just that correction. Runner 3 corrects Runner 2's remaining error. And so on.

After 100 runners, each making small corrections, you're very close to the target.

### The Picture

```
RANDOM FOREST (Parallel)              GRADIENT BOOSTING (Sequential)
═══════════════════════               ══════════════════════════════

🌲 → prediction                        🌲₁ → prediction₁ (rough)
🌲 → prediction                              │
🌲 → prediction         VS                   ▼
🌲 → prediction                        🌲₂ → +correction₂ (fixes errors)
🌲 → prediction                              │
      ↓                                      ▼
   AVERAGE                             🌲₃ → +correction₃ (finer tune)
      ↓                                      │
  Final Prediction                           ▼
                                       ... 100 more corrections ...
                                             │
                                             ▼
                                       Final = Σ(all corrections)

Trees work independently              Each tree fixes previous mistakes
```

---

## How It Actually Works

### Step-by-Step

**Round 1:**
1. Train a simple tree on the data
2. Make predictions
3. Calculate errors (residuals): `error = actual - predicted`

**Round 2:**
1. Train a NEW tree, but instead of predicting churn, predict the ERRORS from Round 1
2. Add this tree's predictions to Round 1's predictions
3. Calculate new errors (smaller now)

**Round 3-100:**
1. Keep training trees on the remaining errors
2. Keep adding corrections
3. Stop when validation error stops improving

### The Learning Rate

Each tree's contribution is scaled by a "learning rate" (typically 0.01-0.3):

```
final_prediction = tree1 + 0.1×tree2 + 0.1×tree3 + 0.1×tree4 + ...
```

**Lower learning rate = more trees needed, but more stable**

It's like taking baby steps toward the target instead of giant leaps. More steps, but less likely to overshoot.

### Early Stopping

Keep adding trees until validation error stops improving:

```
Round 50:  Validation AUC = 0.782
Round 51:  Validation AUC = 0.784
Round 52:  Validation AUC = 0.785
Round 53:  Validation AUC = 0.784  ← Started getting worse
Round 54:  Validation AUC = 0.783
→ Stop at Round 52 (best validation performance)
```

This prevents overfitting automatically.

---

## XGBoost vs. LightGBM

Both implement gradient boosting with optimizations. The differences are mostly technical:

| | XGBoost | LightGBM |
|---|---------|----------|
| **Tree growth** | Level-wise (balanced) | Leaf-wise (faster) |
| **Speed** | Slower | Faster |
| **Memory** | More | Less |
| **Small data** | Often better | Can overfit |
| **Large data** | Slower | Better |

**In practice:** Try both. LightGBM is usually faster. XGBoost sometimes edges out on accuracy. The difference is often tiny.

---

## The StreamCart Example

### Basic XGBoost

```python
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score

# Prepare data
X = df[features].fillna(0)
y = df['churn_30d']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train XGBoost
model = xgb.XGBClassifier(
    n_estimators=100,       # Up to 100 trees
    learning_rate=0.1,      # Each tree contributes 10%
    max_depth=4,            # Shallow trees
    early_stopping_rounds=10,  # Stop if no improvement for 10 rounds
    eval_metric='auc'
)

model.fit(
    X_train, y_train,
    eval_set=[(X_test, y_test)],  # Monitor validation during training
    verbose=False
)

# Evaluate
probs = model.predict_proba(X_test)[:, 1]
auc = roc_auc_score(y_test, probs)
print(f"XGBoost AUC: {auc:.3f}")
print(f"Best iteration: {model.best_iteration}")
```

### Basic LightGBM

```python
import lightgbm as lgb

model = lgb.LGBMClassifier(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=4,
    early_stopping_round=10
)

model.fit(
    X_train, y_train,
    eval_set=[(X_test, y_test)],
    eval_metric='auc'
)
```

---

## Hyperparameter Tuning

### The Parameters That Matter

| Parameter | What it does | Start with | Tune toward |
|-----------|--------------|------------|-------------|
| `n_estimators` | Max trees | 100 | 500-1000 with early stopping |
| `learning_rate` | Step size | 0.1 | 0.01-0.05 (smaller = more trees) |
| `max_depth` | Tree depth | 4 | 3-8 |
| `min_child_weight` | Min samples per leaf | 1 | 10-100 |
| `subsample` | % of rows per tree | 1.0 | 0.7-0.9 |
| `colsample_bytree` | % of features per tree | 1.0 | 0.7-0.9 |

### Tuning Strategy

1. **Start simple:** Default parameters, early stopping
2. **Lower learning rate, increase trees:** `learning_rate=0.01, n_estimators=1000`
3. **Tune depth:** Try 3, 4, 5, 6—find the sweet spot
4. **Add regularization:** If overfitting, increase `min_child_weight`, decrease `subsample`

Most gains come from #1-2. Don't spend days on #3-4 unless you're in a competition.

---

## When to Use Boosting

### Use XGBoost/LightGBM when:

- **Accuracy is the priority.** Boosting usually beats random forests by 1-5% on tabular data.
- **You have time to tune.** A well-tuned booster beats an untuned one significantly.
- **Data is medium-large.** 10K-10M rows is the sweet spot.
- **You're okay with less interpretability.** Harder to explain than logistic regression.

### Stick with Random Forest when:

- **You want quick results.** Random forests work well out of the box.
- **Robustness matters.** Forests are harder to screw up.
- **Data is small.** Boosting can overfit on <5K rows.

### Stick with Logistic Regression when:

- **Interpretability is critical.** Stakeholders need to understand coefficients.
- **Features are basically linear.** No need for complexity.
- **Latency is extreme.** Single model is faster than 100-tree ensemble.

---

## What Goes Wrong

### Mistake 1: Not using early stopping

**Symptom:** Training keeps improving, but test performance degrades after a point.

**Fix:** Always use `early_stopping_rounds` with a validation set:

```python
model.fit(X_train, y_train, 
         eval_set=[(X_val, y_val)],
         early_stopping_rounds=10)
```

### Mistake 2: Learning rate too high

**Symptom:** Model converges quickly but doesn't reach best performance. Validation loss is jumpy.

**Fix:** Lower learning rate, increase max trees:

```python
# Instead of:
learning_rate=0.3, n_estimators=50

# Try:
learning_rate=0.05, n_estimators=500
```

### Mistake 3: Ignoring latency

**Symptom:** Model is accurate but too slow for production.

**Example:** XGBoost with 500 trees takes 200ms to score. Your checkout needs <50ms.

**Fix:** Either reduce trees (accept lower accuracy), or use model distillation, or choose a different approach.

### Mistake 4: Over-tuning

**Symptom:** Spent 3 days tuning hyperparameters. Improved AUC by 0.003.

**Fix:** Set a time budget. Most gains come in the first hour. Diminishing returns hit fast.

---

## Model Selection Summary

```
TABULAR DATA MODEL SELECTION

                    Interpretability
                          │
          HIGH ◄──────────┼──────────► LOW
                          │
    ┌─────────────────────┼───────────────────────┐
    │                     │                       │
    │  Logistic          │       Random          │
    │  Regression        │       Forest          │
    │                    │                       │
    │  - Coefficients    │    - Feature          │
    │  - Fast            │      importance       │
    │  - Linear only     │    - Robust           │
    │                    │    - Non-linear       │
    │                    │                       │
    │                    │                       │
    │                    │       XGBoost/        │
    │                    │       LightGBM        │
    │                    │                       │
    │                    │    - Best accuracy    │
    │                    │    - Needs tuning     │
    │                    │    - Black box        │
    │                    │                       │
    └─────────────────────┴───────────────────────┘
                          │
           ACCURACY ──────┼─────► HIGHER
```

---

## Practice

### 1. Build (Colab Lab)
→ [Link to Colab notebook]

**What you'll do:**
- Train XGBoost with early stopping
- Compare to random forest
- Tune learning rate and observe effect
- Check feature importance

**Time:** ~20 minutes

---

### 2. Decide (Scenario Quiz)
→ [Scenario Quiz](https://docs.google.com/forms/d/e/1FAIpQLSdAWq5nOd0u0-A6WOYp2I5kb-FN3fgIRaKKPBixAyaMpkz5fQ/viewform?usp=header)

**What you'll do:** 6 scenarios about choosing between models, tuning tradeoffs, and production constraints.

**Time:** ~10 minutes

---

### 3. Debug (Find the Bug)
→ [Debug Drill](https://colab.research.google.com/github/189investmentai/ml-foundations-interactive/blob/main/notebooks/debug_drills/drill_04_overfitting.ipynb)

**What you'll do:** An XGBoost model is overfitting badly. Find the configuration mistake.

**Time:** ~15 minutes

---

### 4. Explain (Stakeholder Update)

**The prompt:**  
Your data science team wants to switch from random forest to XGBoost for the churn model. The PM asks: "What's the business case for switching? Is the extra complexity worth it?"

Write a 4-5 sentence response that honestly assesses the tradeoffs.

**What good looks like:**
- Quantifies the expected improvement (if any)
- Acknowledges increased complexity/maintenance
- Gives a clear recommendation
- Doesn't oversell the fancy algorithm

---

## Cheat Sheet

→ [Download: Module 4 Cheat Sheet (PDF)](#)

---

## Done?

- [ ] Read the micro-lesson
- [ ] Completed the scenario quiz  
- [ ] Ran the Colab lab
- [ ] Fixed the debug drill
- [ ] Wrote the stakeholder update

**Next up:** [Module 5: Features Make or Break Your Model](#)
