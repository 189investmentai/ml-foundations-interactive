# Module 5: Decision Trees - 20 Questions for ML

**Time:** 30-45 minutes

**Promise:** After this module, you'll understand how decision trees make predictions, why they're interpretable, and how to prevent overfitting.

---

## The Setup

You're a data scientist at StreamCart. The support team wants to know **why** certain customers churn, not just predictions. They need rules they can act on.

Logistic regression gives you a probability, but the PM asks: "Can you give me simple rules like 'If X and Y, then high risk'?"

That's what decision trees do.

---

## The Mental Models

### 1. The 20 Questions Game

A decision tree is like playing 20 Questions:
- "Is tenure less than 30 days?" → Yes
- "Are support tickets > 3?" → Yes  
- "High churn risk!"

Each question splits the data into two groups. After enough splits, you reach a prediction.

**Key insight:** Trees learn WHICH questions to ask and WHERE to put the thresholds by finding splits that best separate the classes.

### 2. The Recursive Partition

Trees divide the feature space into **rectangular regions**:
- First split: One vertical or horizontal line
- Second split: Another line within one region
- Keep splitting until regions are "pure" (mostly one class)

Unlike logistic regression (one diagonal line), trees can capture complex, non-linear patterns with many small rectangles.

### 3. The Purity Seeker

At each split, the tree asks: "Which question maximally separates the classes?"

**Gini Impurity** measures how mixed a group is:
- Gini = 0: Pure (all one class)
- Gini = 0.5: Maximum mix (50/50)

**Worked Example:**

```
Node with 100 customers: 30 churned, 70 retained

Gini = 1 - (p_churn² + p_retained²)
     = 1 - (0.30² + 0.70²)
     = 1 - (0.09 + 0.49)
     = 0.42  ← moderately mixed

Split on "tenure < 30 days":
  Left child (60 customers):  25 churned, 35 retained → Gini = 1 - (0.42² + 0.58²) = 0.49
  Right child (40 customers): 5 churned, 35 retained  → Gini = 1 - (0.125² + 0.875²) = 0.22

Weighted Gini after split = (60/100) × 0.49 + (40/100) × 0.22 = 0.38
Information Gain = 0.42 - 0.38 = 0.04 ← This split helps!
```

The tree greedily picks splits that minimize weighted Gini in the children.

### 4. The Memorization Trap

A deep tree can perfectly fit training data by creating one leaf per sample.

**Result:** 100% train accuracy, terrible test accuracy.

This is **overfitting** — the tree memorized noise instead of learning patterns.

---

## How It Works

### Building the Tree

1. **Start** with all training data at root
2. **Find best split:**
   - Try every feature
   - Try every threshold
   - Calculate Gini after split
   - Pick split with biggest impurity reduction
3. **Recurse** on left and right children
4. **Stop** when: max depth reached, too few samples, or node is pure

### Making Predictions

1. Start at root
2. Answer the question (go left or right)
3. Repeat until you reach a leaf
4. Predict the majority class in that leaf

### The Split Criterion

```
Information Gain = Gini(parent) - weighted_avg(Gini(children))
```

We pick the split that maximizes information gain.

---

## Failure Modes

### 1. Overfitting (The #1 Issue)

**Symptom:** Train accuracy >> Test accuracy (e.g., 98% train, 72% test)

**The Problem:** Tree is too deep. It creates tiny regions that fit noise.

**The Fix:**
- Limit max depth (start with 3-5)
- Require minimum samples per leaf (5-20)
- Prune: remove branches that don't improve test accuracy

### 2. Axis-Aligned Blindness

**Symptom:** Tree needs many splits for a simple diagonal boundary.

**The Problem:** Trees only split parallel to axes. A 45° boundary needs a staircase of splits.

**The Fix:**
- Accept the inefficiency, or
- Use ensemble methods (many trees average out)

### 3. Instability

**Symptom:** Small data changes → completely different tree structure.

**The Problem:** Greedy splitting is sensitive to exact sample positions.

**The Fix:**
- Use Random Forests (Module 6)
- Prune aggressively

### 4. Imbalanced Class Handling

**Symptom:** Tree predicts majority class everywhere.

**The Problem:** Gini is minimized by predicting the majority class.

**The Fix:**
- Use class weights
- Adjust threshold post-hoc
- Use balanced sampling

---

## Business Translation

### Why Trees Are Great for Stakeholders

**Don't say:** "The model uses recursive binary partitioning on Gini impurity."

**Do say:** "The model is basically a flowchart. I can show you the exact rules it uses."

### Explaining a Prediction

**Don't say:** "The customer fell into leaf node 47."

**Do say:** "This customer is high-risk because: tenure < 30 days AND support tickets > 2 AND no purchase in 14 days. We've seen 73% of similar customers churn."

### Communicating the Tradeoff

**Don't say:** "I reduced max depth from 10 to 4."

**Do say:** "I simplified the model from 50 rules to 8 rules. We lost 3% accuracy but gained interpretability — now the support team can memorize the key patterns."

---

## Trees vs. Logistic Regression

| Aspect | Logistic Regression | Decision Trees |
|--------|---------------------|----------------|
| Boundary shape | Single line/plane | Many rectangles |
| Interpretability | Coefficients | Flowchart rules |
| Handles non-linearity | Needs manual features | Automatic |
| Overfitting risk | Low | High |
| Stability | High | Low |
| Feature importance | From coefficients | From split frequency |

**Use trees when:** Non-linear patterns exist, interpretability matters, you'll use ensembles anyway.

**Use logistic when:** Linear boundary works, stability matters, you need calibrated probabilities.

---

## Practice

### Before the Lab

Open the **Interactive Playground** (`playground_decision_trees.html`):

1. Start with "XOR Pattern" — see how trees handle what logistic regression can't.
2. Increase max depth to 10. Watch test accuracy DROP while train stays high. That's overfitting!
3. Try "High Noise" preset. Find the depth that maximizes TEST accuracy.
4. Compare "Linear" vs "Circles" — see how trees approximate curves.

### Key Observations

- Deeper ≠ better (test accuracy has a sweet spot)
- Rectangular decision regions approximate any shape
- Train/test gap signals overfitting
- Trees are visually interpretable

---

## Controlling Complexity

### Hyperparameters to Tune

| Parameter | Effect | Typical Values |
|-----------|--------|----------------|
| `max_depth` | Limits tree height | 3-10 |
| `min_samples_leaf` | Min samples to create leaf | 5-50 |
| `min_samples_split` | Min samples to split node | 10-100 |
| `max_features` | Features to consider per split | sqrt(n), log2(n) |

### Pruning Strategy

1. Grow a full tree (no restrictions)
2. Calculate cost-complexity for each subtree
3. Remove branches that don't improve test accuracy
4. Pick tree with best cross-validation score

---

## Quick Reference

### Key Metrics

| Metric | Formula | Meaning |
|--------|---------|---------|
| Gini | 1 - Σpᵢ² | Impurity (0=pure, 0.5=max) |
| Information Gain | Parent Gini - Child Gini | Improvement from split |
| Depth | Longest root→leaf path | Complexity measure |
| # Leaves | Terminal nodes | Number of rules |

### Red Flags

- Train acc >> Test acc → Overfitting
- Tree has as many leaves as samples → Severe overfit
- All predictions are one class → Tree is useless
- Very different trees on similar data → Instability

---

## Done Checklist

- [ ] Explored the interactive playground
- [ ] Understood the overfitting vs. underfitting tradeoff
- [ ] Found optimal depth for a noisy dataset
- [ ] Can explain a tree's decision to a non-technical person
- [ ] Completed the notebook lab
- [ ] Passed the quiz
