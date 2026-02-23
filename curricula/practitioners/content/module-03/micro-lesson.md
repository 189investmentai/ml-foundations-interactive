# Module 3: Linear Regression - Predicting with Straight Lines

**Time:** 30-45 minutes

**Promise:** After this module, you'll understand how linear models make predictions, why they fail, and how to communicate results to stakeholders.

---

## The Setup

You're a data scientist at StreamCart, a subscription e-commerce company. The product team wants to predict **customer lifetime value (LTV)** — how much a customer will spend over their relationship with the company.

Why? To prioritize high-value customers for retention campaigns, personalize pricing, and forecast revenue.

You need a model that:
1. Predicts a number (not a category)
2. Is interpretable (stakeholders want to know *why*)
3. Can be explained in a board meeting

Linear regression is the starting point.

---

## The Mental Models

### 1. The Best-Fit Ruler

Imagine you have a scatter plot of customers — X-axis is tenure (months as a customer), Y-axis is total spend. You want to lay a ruler across the points.

The **best-fit ruler** is the straight line that minimizes the total gap between the points and the line. Linear regression finds this ruler automatically.

**What it's doing:** Finding the slope (steepness) and intercept (starting point) that minimize total squared error.

**Why squared?** We want to penalize big mistakes more than small ones. A prediction that's off by $100 is worse than ten predictions that are each off by $10.

### 2. Residuals as Receipts

Every prediction leaves a receipt called a **residual**.

```
Residual = Actual Value - Predicted Value
```

- **Positive residual:** You underestimated (customer spent more than you predicted)
- **Negative residual:** You overestimated (customer spent less)
- **Zero residual:** Perfect prediction (rare!)

The residual is proof of where your model was wrong. Collect enough receipts and you'll see patterns — maybe you're always wrong for high-tenure customers, or always wrong in December.

### 3. Coefficients as Multipliers

The linear regression equation looks like:

```
y = β₀ + β₁x₁ + β₂x₂ + ... + ε
```

Each **coefficient (β)** is a multiplier that answers: "For every 1-unit increase in this feature, how much does the prediction change?"

Example:
- If `β₁ = 12.5` for `tenure_months`
- Then each additional month of tenure → $12.50 more predicted spend

**The key phrase:** "Holding all else constant."

When you have multiple features, each coefficient tells you the effect of *that feature alone*, assuming the other features don't change.

### 4. The Assumption Contract

Linear regression works well when certain assumptions hold. Think of it as a contract:

| Assumption | Plain English | What Breaks If Violated |
|------------|---------------|------------------------|
| **Linearity** | The relationship is roughly a straight line | Model can't capture curves |
| **Independence** | Each data point is independent | Correlated errors (e.g., time series) |
| **Homoscedasticity** | Residuals have constant spread | Unreliable confidence intervals |
| **Normality** | Residuals are bell-shaped | Unreliable hypothesis tests |

You don't need perfect assumptions — but you need to know when they're badly broken.

---

## How It Works

### The Equation

For a single feature:
```
predicted_spend = intercept + (coefficient × tenure_months)
```

For multiple features:
```
predicted_spend = intercept + (β₁ × tenure) + (β₂ × logins) + (β₃ × orders) + ...
```

### What the Algorithm Does

1. Start with some initial line (any line)
2. Calculate total squared error
3. Adjust slope and intercept to reduce error
4. Repeat until improvement stops

The math finds the optimal solution directly (no iteration needed for basic linear regression), but understanding the "adjust to minimize" intuition helps.

### Interpreting Coefficients (With Units!)

Bad: "The tenure coefficient is 12.5"

Good: "Each additional month of tenure is associated with $12.50 more total spend, holding other features constant."

Always include:
- The feature name
- The unit change (1 month, 1 login, $1, etc.)
- The direction (increase/decrease)
- The "holding all else constant" caveat

---

## Failure Modes

### 1. Non-Linear Relationships

**Symptom:** Low R², residuals show a U-shape or pattern.

**The Problem:** Some relationships are curved. If spend grows exponentially with tenure, a straight line will always underestimate early and late tenure while overestimating the middle.

**The Fix:** 
- Transform features (log, square root)
- Add polynomial terms (tenure²)
- Use a different model (trees, splines)

**Detection:** Plot residuals vs. predicted. Random scatter = good. Patterns = bad.

### 2. Outliers Pulling the Line

**Symptom:** One or two extreme points. Coefficients seem wrong.

**The Problem:** Linear regression minimizes squared error. Squaring amplifies the influence of outliers. One customer who spent $50,000 can pull the entire line toward them.

**The Fix:**
- Investigate outliers (are they data errors?)
- Use robust regression (less sensitive to outliers)
- Consider removing or capping extreme values

**Detection:** Look at the scatter plot. One point far from the rest? Check it.

### 3. Multicollinearity

**Symptom:** Coefficients have wrong signs or unstable values. Adding/removing one feature changes other coefficients dramatically.

**The Problem:** When features are highly correlated (e.g., `orders_total` and `total_spend`), the model can't tell which feature is actually driving the outcome. It might give all credit to one and none to the other.

**The Fix:**
- Remove one of the correlated features
- Use regularization (Ridge regression)
- Combine features (principal components)

**Detection:** Check correlation matrix. Correlations > 0.8 are suspicious.

### 4. Wrong Target

**Symptom:** Great metrics on training data, useless predictions in practice.

**The Problem:** You're predicting the wrong thing. If you want to predict *future* spend but trained on *total* spend (which includes the future you're predicting), you've leaked information.

**The Fix:** Be precise about what you're predicting and when you'd have the features in production.

**Detection:** Ask "Would I have this information at prediction time?"

---

## Business Translation

### Talking to PMs

**Don't say:** "The model has R² of 0.72 and RMSE of $45."

**Do say:** "Our model explains about 70% of why some customers spend more than others. Typical predictions are off by about $45."

### The Coefficient Story

**Don't say:** "β₁ = 12.5"

**Do say:** "Each month a customer stays with us is worth about $12.50 in additional spend. A customer who's been with us for 2 years has spent roughly $300 more than a brand new customer with similar behavior."

### Communicating Uncertainty

**Don't say:** "Customer #12345 will spend $500."

**Do say:** "We estimate Customer #12345 will spend around $500, plus or minus $45. They're a high-value customer worth prioritizing for retention."

### Actionable Insights

Connect coefficients to decisions:

- "Logins are strongly associated with spend. Consider prompts to increase login frequency."
- "Support tickets show negative correlation with spend. Reducing ticket volume might improve retention."
- "Tenure is the strongest predictor. Early churn prevention has the highest ROI."

---

## Practice

### Before the Lab

Open the **Interactive Playground** (`playground_linear_regression.html`):

1. Move the slope slider. Watch how the line rotates and metrics change.
2. Try the "Perfect Fit" preset. What does R² = 1.0 look like?
3. Try the "Outlier Problem" preset. See how one point affects the line.
4. Try "Non-Linear Data". Look at the residual plot — see the pattern?
5. Challenge: Turn off auto-fit and manually minimize RMSE.

### The Lab

Complete the Jupyter notebook (`module_03_linear_regression.ipynb`):
- Load StreamCart data
- Build baseline, simple, and multiple regression models
- Analyze residuals
- Interpret coefficients
- Write a PM summary

### Debug Drill

Find and fix the bug in `drill_03_regression_diagnostics.ipynb`.

---

## Quick Reference

### Key Metrics

| Metric | Formula | Business Translation |
|--------|---------|---------------------|
| MAE | mean(\|actual - predicted\|) | "Predictions are off by $X on average" |
| RMSE | √mean((actual - predicted)²) | "Typical error, big misses penalized more" |
| R² | 1 - (model error / baseline error) | "X% of variation explained" |

### Red Flags

- R² negative → Model worse than mean baseline
- Coefficient sign flipped → Multicollinearity
- Residuals show pattern → Non-linear relationship
- Huge coefficients → Feature scaling issue

### When to Use Linear Regression

✅ Target is continuous (numbers, not categories)
✅ Relationships are roughly linear
✅ Interpretability matters
✅ You need a simple baseline

❌ Target is binary (use logistic regression)
❌ Strong non-linear patterns
❌ Lots of feature interactions
❌ You need maximum accuracy over interpretability

---

## Done Checklist

- [ ] Explored the interactive playground
- [ ] Completed the Jupyter notebook lab
- [ ] Wrote the PM update (in notebook)
- [ ] Completed the debug drill
- [ ] Reviewed the cheatsheet
- [ ] Passed the quiz
