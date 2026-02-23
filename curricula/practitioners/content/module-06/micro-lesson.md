# Module 6: Ensemble Methods - The Wisdom of Crowds

**Time:** 30-45 minutes

**Promise:** After this module, you'll understand why ensembles outperform single models, when to use Random Forests vs Gradient Boosting, and how to tune them for production.

---

## The Setup

You've built a decision tree for churn prediction. It gets 75% test accuracy, but management wants 80%+.

You could:
1. Engineer more features (time-consuming)
2. Collect more data (expensive)
3. **Combine multiple models** (ensemble methods)

Ensemble methods consistently win ML competitions and power production systems. Here's why.

---

## The Mental Models

### 1. The Wisdom of Crowds

Ask 100 random people to guess the number of jellybeans in a jar. Most guesses are wrong, but the **average** is remarkably accurate.

**Why it works:**
- Individual errors are random
- Random errors cancel out
- Average converges to truth

Ensembles work the same way: each tree makes different mistakes, but averaging smooths them out.

### 2. Bias vs. Variance Decomposition

Model error comes from two sources:

**Bias:** Model is systematically wrong (underfit)
- A shallow tree can't capture complex patterns
- "Too simple"

**Variance:** Model is sensitive to training data (overfit)
- A deep tree changes wildly with different samples
- "Too reactive"

**The Dartboard Mental Model:**

Imagine throwing darts at a target. The bullseye is the true answer.

| Pattern | Bias | Variance | Description |
|---------|------|----------|-------------|
| Clustered on bullseye | Low | Low | Perfect model |
| Clustered off-center | High | Low | Consistent but wrong (underfit) |
| Scattered around bullseye | Low | High | Right on average but unreliable (overfit) |
| Scattered off-center | High | High | Wrong and unreliable |

**The Mathematical Truth:**

```
Total Error = Bias² + Variance + Irreducible Noise
```

You can't eliminate noise (it's in the data), but you can trade bias for variance:
- **Simple models:** High bias, low variance
- **Complex models:** Low bias, high variance
- **Ensembles:** Low bias, low variance (the sweet spot!)

Ensembles reduce variance without increasing bias much. This is why they consistently outperform single models.

### 3. Bagging: Reduce Variance by Averaging

**Random Forest = Bagging + Random Feature Selection**

1. Create N bootstrap samples (random samples with replacement)
2. Train one tree on each sample
3. Average predictions

**Why it reduces variance:**
- Each tree sees different data
- Each tree makes different errors
- Averaging cancels random errors

### 4. Boosting: Reduce Bias by Focusing

**Gradient Boosting = Sequential Error Correction**

1. Train a weak model
2. Calculate residuals (errors)
3. Train next model on residuals
4. Add to ensemble
5. Repeat

**Why it reduces bias:**
- Each tree fixes what previous trees got wrong
- Gradually builds a strong model from weak ones

---

## Random Forest vs. Gradient Boosting

| Aspect | Random Forest | Gradient Boosting |
|--------|---------------|-------------------|
| Training | Parallel (fast) | Sequential (slower) |
| Main benefit | Reduces variance | Reduces bias |
| Overfitting risk | Low | Higher |
| Tuning difficulty | Easy | Harder |
| Default choice | Yes, for simplicity | Yes, for max performance |

**Rule of thumb:**
- Start with Random Forest (robust, hard to mess up)
- Graduate to Gradient Boosting when you need every % of accuracy

---

## How They Work

### Random Forest Algorithm

```python
for i in range(n_trees):
    # 1. Bootstrap sample
    sample = random_sample_with_replacement(train_data)
    
    # 2. Train tree with random feature subset
    tree = DecisionTree()
    tree.fit(sample, max_features='sqrt')
    
    trees.append(tree)

# Predict: majority vote
prediction = mode([tree.predict(x) for tree in trees])
```

### Gradient Boosting Algorithm

```python
# Initialize with constant prediction
F = initial_prediction

for i in range(n_rounds):
    # 1. Calculate residuals (gradient)
    residuals = y - F
    
    # 2. Fit tree to residuals
    tree = DecisionTree(max_depth=3)
    tree.fit(X, residuals)
    
    # 3. Update predictions
    F = F + learning_rate * tree.predict(X)
```

---

## Failure Modes

### 1. Boosting Overfitting

**Symptom:** Train accuracy 99%, test accuracy 78%, and it's getting worse each round.

**The Problem:** Boosting keeps fitting residuals, eventually fitting noise.

**The Fix:**
- Early stopping (stop when validation loss stops improving)
- Lower learning rate (smaller steps)
- Limit tree depth (usually 3-6)

### 2. Random Forest Underfitting

**Symptom:** Neither train nor test accuracy is good.

**The Problem:** Trees are too shallow or too few.

**The Fix:**
- Increase max_depth (or set to None for unlimited)
- Increase n_estimators
- Check if problem is too hard for trees

### 3. Ignoring Class Imbalance

**Symptom:** High accuracy but low recall on minority class.

**The Problem:** Ensembles inherit the class imbalance problem.

**The Fix:**
- Use class_weight='balanced'
- Adjust threshold post-training
- Use balanced sampling

### 4. Too Many Trees (Diminishing Returns)

**Symptom:** Going from 100 to 1000 trees adds 0.1% accuracy but 10x training time.

**The Problem:** Returns diminish rapidly after ~50-100 trees.

**The Fix:**
- Plot learning curve (accuracy vs n_trees)
- Stop when curve flattens
- Typical sweet spot: 100-500 trees

---

## Production Considerations

### Speed vs. Accuracy

| Trees | Training Time | Inference Time | Accuracy |
|-------|---------------|----------------|----------|
| 10 | Fast | Fast | Decent |
| 100 | Moderate | Moderate | Good |
| 1000 | Slow | Slow | Marginally better |

For real-time inference, fewer trees might be necessary.

### Feature Importance

Both methods provide feature importance:
```python
importances = model.feature_importances_
```

- Random Forest: Based on impurity reduction across all trees
- Gradient Boosting: Based on how much each feature reduces loss

### Hyperparameter Guide

**Random Forest (start here):**
```python
RandomForestClassifier(
    n_estimators=100,      # Start with 100, increase if needed
    max_depth=None,        # Let trees grow deep
    min_samples_leaf=5,    # Prevent tiny leaves
    class_weight='balanced'
)
```

**Gradient Boosting (for max performance):**
```python
XGBClassifier(
    n_estimators=100,      # More rounds
    max_depth=4,           # Shallow trees!
    learning_rate=0.1,     # Lower = more rounds needed
    early_stopping_rounds=10
)
```

---

## Business Translation

### Explaining Ensembles

**Don't say:** "We use a bagged ensemble of CART trees with bootstrap aggregation."

**Do say:** "The model combines 100 different decision rules and takes a vote. This makes it more stable and accurate than any single rule."

### Justifying Complexity

**Don't say:** "More trees = better accuracy."

**Do say:** "Using 100 models instead of 1 improved accuracy from 75% to 82%. The extra compute cost is worth $50K/year in reduced churn."

### Explaining Tradeoffs

**Don't say:** "We used XGBoost because it has lower bias."

**Do say:** "We tested two approaches: a simpler model that's easier to explain vs. a more complex one that's 3% more accurate. For this high-stakes decision, we chose accuracy."

---

## Practice

### Before the Lab

Open the **Interactive Playground** (`playground_ensembles.html`):

1. Start with 1 tree vs 10 trees. See how boundaries smooth out.
2. Increase to 50 trees. Watch diminishing returns.
3. Try "High Variance" preset — see how ensembles help.
4. Switch to Boosting mode. Compare with Bagging.
5. **New:** Enable "Show variance across bootstrap samples" toggle
   - Watch the dartboard visualization
   - See how single tree predictions scatter while ensemble predictions cluster
   - Darker regions in the decision boundary = higher variance

### Key Observations

- Ensemble boundaries are smoother than single tree
- Train-test gap (overfit) shrinks with more trees
- Boosting is more sensitive to hyperparameters
- Returns diminish after ~50 trees
- **Bias-Variance:** Single trees have high variance (scattered dartboard), ensembles have low variance (tight cluster)

---

## Quick Reference

### When to Use What

| Scenario | Recommendation |
|----------|----------------|
| First model | Random Forest |
| Need interpretability | Single tree or small forest |
| Max performance | Gradient Boosting (XGBoost/LightGBM) |
| Imbalanced classes | Either with class weights |
| Real-time inference | Fewer trees, or distilled model |

### Red Flags

- Boosting accuracy declining → overfitting, use early stopping
- 1000 trees not better than 100 → diminishing returns
- Train/test gap > 10% → too complex, reduce depth

---

## Done Checklist

- [ ] Explored ensemble vs single tree in playground
- [ ] Understood bias-variance tradeoff
- [ ] Compared Bagging vs Boosting
- [ ] Observed diminishing returns with more trees
- [ ] Completed the notebook lab
- [ ] Passed the quiz
