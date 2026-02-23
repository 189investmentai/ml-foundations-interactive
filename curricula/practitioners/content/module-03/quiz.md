# Module 3 Quiz: Linear Regression

Test your understanding with these scenario-based questions. Choose the best answer for each.

---

## Q1. Coefficient Interpretation

You fit a linear regression to predict customer spend. The coefficient for `tenure_months` is 12.5. What does this mean?

**A)** Customers with 12.5 months tenure spend the most

**B)** For each additional month of tenure, expected spend increases by $12.50, holding other features constant ✓

**C)** 12.5% of spend is explained by tenure

**D)** The model needs 12.5 months of data to work

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

Coefficients in linear regression represent the marginal effect—the expected change in Y for a 1-unit change in X, assuming other features stay constant. The coefficient 12.5 means "each additional month of tenure is associated with $12.50 more spend, all else equal."

Option A confuses the coefficient with an optimal value. Option C confuses it with R². Option D is nonsensical.
</details>

---

## Q2. Train-Test Gap

Your model has R² = 0.85 on training data but R² = 0.35 on test data. What's most likely happening?

**A)** The model is underfitting

**B)** The model is overfitting ✓

**C)** The features are not predictive

**D)** The test data is corrupted

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

A large gap between train and test performance indicates overfitting—the model memorized training patterns that don't generalize. 

Underfitting (A) would show low R² on *both* train and test. If features weren't predictive (C), train R² would also be low. Corrupted test data (D) is possible but unlikely compared to the common overfitting pattern.
</details>

---

## Q3. Residual Patterns

You plot residuals vs. predicted values and see a U-shaped curve. What does this indicate?

**A)** The model is well-calibrated

**B)** There's heteroscedasticity

**C)** The relationship is non-linear ✓

**D)** Outliers are present

<details>
<summary>Answer & Explanation</summary>

**Correct: C**

Patterns in residual plots indicate systematic errors. A U-shape (or any curve) suggests the true relationship is non-linear—a straight line can't capture the curve, so it consistently under/over-predicts in certain ranges.

Heteroscedasticity (B) would show residuals fanning out (wider spread at higher values). Outliers (D) would show isolated extreme points, not a pattern.
</details>

---

## Q4. Reporting to Stakeholders

A PM asks: "How accurate is the model?" Your RMSE is $50 and MAE is $35. Which should you report and why?

**A)** RMSE, because it's more mathematically rigorous

**B)** MAE, because it's easier to interpret and more robust to outliers ✓

**C)** Report both without context

**D)** Neither—report R² instead

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

MAE is directly interpretable: "predictions are off by $35 on average." It's easier for non-technical stakeholders to understand and isn't inflated by outliers.

RMSE (A) is useful internally but harder to explain ("the square root of the average squared error"). Reporting both without context (C) confuses people. R² (D) doesn't answer "how many dollars off" — it answers "how much variance explained."
</details>

---

## Q5. Comparing Coefficients

You're predicting LTV. Two features have coefficients: `orders_total` = 45.2, `logins_last_30d` = 2.1. A stakeholder concludes "orders matter more than logins." Is this valid?

**A)** Yes, larger coefficient means more important

**B)** No, coefficients depend on feature scale—you need standardized coefficients ✓

**C)** No, you need p-values to compare importance

**D)** Yes, but only if R² is above 0.5

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

Raw coefficients depend on units. If orders range 1-10 but logins range 1-100, the per-unit effect differs by scale. To compare importance fairly, standardize features first (subtract mean, divide by std), then compare coefficients.

P-values (C) tell you statistical significance, not relative importance. R² (D) is irrelevant to comparing individual features.
</details>

---

## Q6. Wrong Problem Type

Your linear regression has R² = 0.95 on a churn prediction task. Should you celebrate?

**A)** Yes, 95% explained variance is excellent

**B)** No, linear regression isn't appropriate for binary targets ✓

**C)** Only if MAE is also low

**D)** Only if the coefficients are all positive

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

Churn (yes/no) is a binary classification problem. Linear regression can predict values outside 0-1, violates assumptions for binary data, and doesn't produce proper probabilities. Use logistic regression instead.

The high R² might even be a sign of data leakage (e.g., using `cancel_reason` as a feature to predict churn).
</details>

---

## Q7. Adding Features

You add 10 new features to your model. R² improves from 0.70 to 0.72 on training data. What's the right next step?

**A)** Deploy the new model—higher is better

**B)** Check R² on test data to see if improvement generalizes ✓

**C)** Add 10 more features

**D)** Remove features with small coefficients

<details>
<summary>Answer & Explanation</summary>

**Correct: B**

Training R² always increases (or stays the same) with more features—even random noise features can slightly improve train R². The real test is whether test R² improves, indicating genuine predictive power rather than overfitting.

Never deploy (A) without checking generalization. Adding more features (C) compounds the problem. Removing features by coefficient size (D) is unreliable without standardization.
</details>

---

## Q8. Explainability

A customer support lead asks: "Why does the model predict this customer will spend $500?" What's the most useful response?

**A)** "Because R² is 0.8"

**B)** "The model is 80% confident"

**C)** "Based on their tenure (24 months) and order history (15 orders), the formula estimates $500" ✓

**D)** "Neural networks work in mysterious ways"

<details>
<summary>Answer & Explanation</summary>

**Correct: C**

Linear regression is interpretable—you can trace predictions back to feature contributions. Saying "24 months tenure contributes $300, 15 orders contribute $150, baseline is $50, total = $500" provides actionable insight.

R² (A) doesn't explain individual predictions. "80% confident" (B) isn't what R² means. "Mysterious ways" (D) is literally the opposite of linear regression's strength.
</details>

---

## Scoring

- **8/8:** Excellent! You've mastered linear regression fundamentals.
- **6-7/8:** Good understanding. Review the questions you missed.
- **4-5/8:** Revisit the micro-lesson and try the playground again.
- **< 4/8:** Spend more time with the interactive playground before the lab.
