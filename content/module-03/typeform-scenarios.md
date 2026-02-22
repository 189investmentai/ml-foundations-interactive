# Module 3: Typeform Scenarios

---

## Scenario 1: When to Use Trees

**Setup:**
You're building a churn model. You notice that customers with 2-4 months tenure have unusually high churn—higher than both brand-new customers and long-time customers. It's a "hump" in the middle.

**Question:** Which model is better suited to capture this pattern?

**Options:**
- A) Logistic regression—it handles tenure well
- B) Decision tree—it can find the middle-tenure risk naturally
- C) Either would work equally well
- D) Neither—you need deep learning

**Correct Answer:** B

**Decision Receipt:**
Logistic regression assumes a linear relationship: more tenure = steadily more (or less) churn. It can't capture "middle tenure is uniquely risky." A decision tree can split on "tenure > 2" and then "tenure > 4" to isolate the risky middle group. This is a non-linear pattern that trees handle naturally.

---

## Scenario 2: Reading a Tree

**Setup:**
Your decision tree has this structure:
```
Root: tenure > 6 months?
├── Yes: support_tickets > 0?
│   ├── Yes: 35% churn (Leaf A)
│   └── No: 5% churn (Leaf B)
└── No: logins_7d > 3?
    ├── Yes: 10% churn (Leaf C)
    └── No: 25% churn (Leaf D)
```

A customer has: tenure = 8 months, support_tickets = 2, logins_7d = 5.

**Question:** Which leaf does this customer land in, and what's their predicted churn probability?

**Options:**
- A) Leaf A, 35% churn
- B) Leaf B, 5% churn
- C) Leaf C, 10% churn
- D) Leaf D, 25% churn

**Correct Answer:** A

**Decision Receipt:**
Trace the path: Tenure 8 months > 6? Yes → Support tickets 2 > 0? Yes → Leaf A (35% churn). The tree doesn't even look at logins_7d for this customer because the first two splits already determined the leaf. That's how decision trees work—once you reach a leaf, you stop.

---

## Scenario 3: Overfitting Signal

**Setup:**
You train a decision tree with no depth limit. Results:
- Training AUC: 0.99
- Test AUC: 0.62

**Question:** What's the most likely problem?

**Options:**
- A) You need more features
- B) The tree memorized the training data (overfitting)
- C) There's data leakage
- D) The test set is too small

**Correct Answer:** B

**Decision Receipt:**
A 0.37 gap between train and test AUC screams overfitting. The tree grew so deep it created leaves for tiny groups, memorizing who churned rather than learning patterns. Fix: limit `max_depth` to 3-10, require more samples per leaf (`min_samples_leaf=50`), or use a random forest.

---

## Scenario 4: Feature Importance Interpretation

**Setup:**
Your random forest shows this feature importance:
```
support_tickets:     0.35
tenure_months:       0.25
logins_7d:           0.15
logins_30d:          0.10
nps_score:           0.15
```

Your colleague says: "logins_7d and logins_30d together (0.25) are as important as tenure. We should keep both."

**Question:** What's the flaw in this reasoning?

**Options:**
- A) You can't add feature importance values
- B) Correlated features split importance—they might be more important than they look
- C) Feature importance doesn't measure importance, it measures something else
- D) The features need to be standardized first

**Correct Answer:** B

**Decision Receipt:**
When features are correlated (logins_7d and logins_30d obviously overlap), their importance gets split between them. If you removed logins_7d, logins_30d might jump from 0.10 to 0.20. Feature importance underestimates correlated features. Consider permutation importance or actually test by removing features.

---

## Scenario 5: Tree vs. Forest Tradeoff

**Setup:**
Your stakeholder says: "I need to explain to customers why they were flagged as churn risks. We need a model that can give clear reasons."

You have two models:
- Single decision tree: 0.71 AUC
- Random forest (100 trees): 0.76 AUC

**Question:** What's the right recommendation?

**Options:**
- A) Use the forest—0.76 beats 0.71, accuracy is what matters
- B) Use the tree—interpretability is more important for this use case
- C) Use the forest but add SHAP explanations
- D) Either B or C, depending on whether 0.05 AUC matters

**Correct Answer:** D

**Decision Receipt:**
This is a tradeoff, not a clear answer. If the 0.05 AUC improvement meaningfully changes business outcomes (e.g., catches 50 more churners), option C is attractive—forests with SHAP can explain individual predictions. If the difference is marginal, option B keeps things simple. The "right" answer depends on context.

---

## Scenario 6: Weird First Split

**Setup:**
You train a decision tree on churn. The first split is:
```
signup_source == "referral_campaign_q3"?
├── Yes: 0% churn (12 customers)
└── No: (continue splitting...)
```

Only 12 customers came from this campaign, and coincidentally none churned.

**Question:** What should you do?

**Options:**
- A) Great! This referral campaign produces loyal customers
- B) This is likely noise—increase min_samples_split to prevent tiny leaf nodes
- C) Remove signup_source from the model
- D) The tree is broken—retrain it

**Correct Answer:** B

**Decision Receipt:**
12 customers with 0% churn is almost certainly noise. Any small group can have unusual outcomes by chance. The tree overfit to this random pattern. Fix: set `min_samples_split=100` or `min_samples_leaf=50` to force the tree to only make splits that affect larger groups.

---

## Scoring Summary

**6/6 correct:** You understand trees and their tradeoffs well.

**4-5/6 correct:** Good intuition. Review the overfitting and feature importance sections.

**<4/6 correct:** Re-read the micro-lesson, focusing on single trees vs. forests.
