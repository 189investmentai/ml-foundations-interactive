# Module 3 Quiz: Linear Regression - Google Forms Setup

## Form Setup

1. Go to https://docs.google.com/forms
2. Click **+ Blank**
3. Settings → Enable **"Make this a quiz"**
4. Enable **"Release grade immediately after submission"**

---

## Form Title & Description

**Title:** Module 3 Quiz: Linear Regression

**Description:** 
Test your understanding. 8 questions, ~10 minutes.

---

## Questions (Copy-Paste Ready)

### Question 1

**Question:**
Coefficient Interpretation

**Options:**
- A) Customers with 12.5 months tenure spend the most
- B) For each additional month of tenure, expected spend increases by $12.50, holding other features constant ✓ CORRECT
- C) 12.5% of spend is explained by tenure
- D) The model needs 12.5 months of data to work

**Feedback (add to correct answer):**
Coefficients in linear regression represent the marginal effect—the expected change in Y for a 1-unit change in X, assuming other features stay constant. The coefficient 12.5 means "each additional month of tenure is associated with $12.50 more spend, all else equal." Option A confuses the coefficient with an optimal value. Option C confuses it with R². Option D is nonsensical.

**Points:** 1

---

### Question 2

**Question:**
Train-Test Gap

**Options:**
- A) The model is underfitting
- B) The model is overfitting ✓ CORRECT
- C) The features are not predictive
- D) The test data is corrupted

**Feedback (add to correct answer):**
A large gap between train and test performance indicates overfitting—the model memorized training patterns that don't generalize.  Underfitting (A) would show low R² on *both* train and test. If features weren't predictive (C), train R² would also be low. Corrupted test data (D) is possible but unlikely compared to the common overfitting pattern.

**Points:** 1

---

### Question 3

**Question:**
Residual Patterns

**Options:**
- A) The model is well-calibrated
- B) There's heteroscedasticity
- C) The relationship is non-linear ✓ CORRECT
- D) Outliers are present

**Feedback (add to correct answer):**
Patterns in residual plots indicate systematic errors. A U-shape (or any curve) suggests the true relationship is non-linear—a straight line can't capture the curve, so it consistently under/over-predicts in certain ranges. Heteroscedasticity (B) would show residuals fanning out (wider spread at higher values). Outliers (D) would show isolated extreme points, not a pattern.

**Points:** 1

---

### Question 4

**Question:**
Reporting to Stakeholders

**Options:**
- A) RMSE, because it's more mathematically rigorous
- B) MAE, because it's easier to interpret and more robust to outliers ✓ CORRECT
- C) Report both without context
- D) Neither—report R² instead

**Feedback (add to correct answer):**
MAE is directly interpretable: "predictions are off by $35 on average." It's easier for non-technical stakeholders to understand and isn't inflated by outliers. RMSE (A) is useful internally but harder to explain ("the square root of the average squared error"). Reporting both without context (C) confuses people. R² (D) doesn't answer "how many dollars off" — it answers "how much variance explained."

**Points:** 1

---

### Question 5

**Question:**
Comparing Coefficients

**Options:**
- A) Yes, larger coefficient means more important
- B) No, coefficients depend on feature scale—you need standardized coefficients ✓ CORRECT
- C) No, you need p-values to compare importance
- D) Yes, but only if R² is above 0.5

**Feedback (add to correct answer):**
Raw coefficients depend on units. If orders range 1-10 but logins range 1-100, the per-unit effect differs by scale. To compare importance fairly, standardize features first (subtract mean, divide by std), then compare coefficients. P-values (C) tell you statistical significance, not relative importance. R² (D) is irrelevant to comparing individual features.

**Points:** 1

---

### Question 6

**Question:**
Wrong Problem Type

**Options:**
- A) Yes, 95% explained variance is excellent
- B) No, linear regression isn't appropriate for binary targets ✓ CORRECT
- C) Only if MAE is also low
- D) Only if the coefficients are all positive

**Feedback (add to correct answer):**
Churn (yes/no) is a binary classification problem. Linear regression can predict values outside 0-1, violates assumptions for binary data, and doesn't produce proper probabilities. Use logistic regression instead. The high R² might even be a sign of data leakage (e.g., using `cancel_reason` as a feature to predict churn).

**Points:** 1

---

### Question 7

**Question:**
Adding Features

**Options:**
- A) Deploy the new model—higher is better
- B) Check R² on test data to see if improvement generalizes ✓ CORRECT
- C) Add 10 more features
- D) Remove features with small coefficients

**Feedback (add to correct answer):**
Training R² always increases (or stays the same) with more features—even random noise features can slightly improve train R². The real test is whether test R² improves, indicating genuine predictive power rather than overfitting. Never deploy (A) without checking generalization. Adding more features (C) compounds the problem. Removing features by coefficient size (D) is unreliable without standardization.

**Points:** 1

---

### Question 8

**Question:**
Explainability

**Options:**
- A) "Because R² is 0.8"
- B) "The model is 80% confident"
- C) "Based on their tenure (24 months) and order history (15 orders), the formula estimates $500" ✓ CORRECT
- D) "Neural networks work in mysterious ways"

**Feedback (add to correct answer):**
Linear regression is interpretable—you can trace predictions back to feature contributions. Saying "24 months tenure contributes $300, 15 orders contribute $150, baseline is $50, total = $500" provides actionable insight. R² (A) doesn't explain individual predictions. "80% confident" (B) isn't what R² means. "Mysterious ways" (D) is literally the opposite of linear regression's strength.

**Points:** 1

---

