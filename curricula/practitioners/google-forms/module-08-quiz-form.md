# Module 8 Quiz: Regression Metrics - Google Forms Setup

## Form Setup

1. Go to https://docs.google.com/forms
2. Click **+ Blank**
3. Settings → Enable **"Make this a quiz"**
4. Enable **"Release grade immediately after submission"**

---

## Form Title & Description

**Title:** Module 8 Quiz: Regression Metrics

**Description:** 
Test your understanding. 8 questions, ~10 minutes.

---

## Questions (Copy-Paste Ready)

### Question 1

**Question:**
You're comparing two models for predicting customer lifetime value:
- Model A: MAE = $45, RMSE = $48
- Model B: MAE = $50, RMSE = $90

What does the large gap between MAE and RMSE in Model B suggest?

**Options:**
- A) Model B is more accurate overall
- B) Model B has some very large errors (outliers) ✓ CORRECT
- C) Model B is better for high-value customers
- D) Model A is overfitting

**Feedback (add to correct answer):**
When RMSE is much larger than MAE, it indicates the presence of large outlier errors. RMSE squares errors before averaging, so big mistakes get amplified. Model B's RMSE being nearly double its MAE suggests some predictions are far off, even though the average absolute error is only slightly higher than Model A.

**Points:** 1

---

### Question 2

**Question:**
Your LTV prediction model has R² = 0.85 on training data and R² = 0.40 on test data. What's happening?

**Options:**
- A) The model is underfitting
- B) The model is overfitting ✓ CORRECT
- C) The test data is from a different distribution
- D) R² is unreliable for this problem

**Feedback (add to correct answer):**
A large gap between training R² and test R² is the classic sign of overfitting. The model has memorized patterns in the training data that don't generalize. Solutions include regularization, fewer features, or more training data.

**Points:** 1

---

### Question 3

**Question:**
You plot residuals vs. predicted values and see a clear U-shaped curve. What does this indicate?

**Options:**
- A) The model has high variance
- B) The model is missing non-linear relationships ✓ CORRECT
- C) There are outliers in the data
- D) The model is biased toward high values

**Feedback (add to correct answer):**
A curved pattern in residuals vs. predictions indicates the model is systematically wrong in a predictable way — it's missing non-linear relationships. The fix is to add polynomial features, use a different transformation, or switch to a model that captures non-linearity.

**Points:** 1

---

### Question 4

**Question:**
Your model predicts house prices. Results:
- R² = 0.95
- MAE = $85,000
- Average house price = $350,000

A stakeholder says "95% accuracy — ship it!" How should you respond?

**Options:**
- A) Agree — R² = 0.95 is excellent
- B) Explain that R² isn't accuracy, and $85K error may be too large for the use case ✓ CORRECT
- C) Suggest switching to RMSE for a better measure
- D) The model is overfitting, need more testing

**Feedback (add to correct answer):**
R² measures variance explained, not prediction accuracy in the everyday sense. An MAE of $85K on $350K homes means typical errors are about 24% of the price — often too large for real estate decisions. Always pair R² with error metrics in business units and discuss whether the error magnitude is acceptable for the use case.

**Points:** 1

---

### Question 5

**Question:**
For a demand forecasting model, you're choosing between MAE and RMSE. Some products occasionally have 10x normal demand during promotions. Which metric should you optimize?

**Options:**
- A) MAE — it's more robust to those spikes
- B) RMSE — it will force the model to handle spikes better ✓ CORRECT
- C) R² — it's scale-independent
- D) MAPE — percentage errors matter more for varying volumes

**Feedback (add to correct answer):**
If accurately predicting demand spikes is important (e.g., to avoid stockouts during promotions), RMSE is better because it heavily penalizes large errors. Optimizing MAE would treat a 10x underestimate the same as 10 small errors, which isn't appropriate when big misses are costly. However, if spikes are rare and you want robust everyday predictions, MAE might be preferred.

**Points:** 1

---

### Question 6

**Question:**
You're explaining model performance to executives. Which statement is most appropriate?

**Options:**
- A) "The model achieves an R-squared of 0.78 with a root mean squared error of 42.5."
- B) "Our predictions are typically within $43 of actual values, capturing about 78% of the variation in customer spending." ✓ CORRECT
- C) "The coefficient of determination indicates 78% explanatory power with residual standard error of 42.5."
- D) "We minimize the L2 loss function to achieve optimal predictive accuracy."

**Feedback (add to correct answer):**
Business stakeholders need metrics translated into impact. "Within $43" is concrete and understandable; "78% of variation" gives context about model quality. The other options use technical jargon that obscures meaning.

**Points:** 1

---

### Question 7

**Question:**
Your residual plot shows a "fan shape" — residuals spread out as predicted values increase. What does this mean and how should you address it?

**Options:**
- A) Model is overfitting; add regularization
- B) Prediction variance increases with magnitude; consider log-transforming the target ✓ CORRECT
- C) Outliers are present; remove them
- D) Model is underfitting; add more features

**Feedback (add to correct answer):**
A fan-shaped residual plot indicates heteroscedasticity — errors get larger for larger predictions. This is common when predicting values that span orders of magnitude (like income or spending). Log-transforming the target variable often fixes this by stabilizing the variance.

**Points:** 1

---

### Question 8

**Question:**
Model A: R² = 0.70, MAE = $30
Model B: R² = 0.85, MAE = $45

For a customer service budget allocation (where over-estimation wastes money and under-estimation causes complaints), which model would you prefer?

**Options:**
- A) Model B — higher R² means better predictions
- B) Model A — lower MAE means smaller average errors
- C) Need more information about the error distribution and business costs ✓ CORRECT
- D) They're equivalent; R² and MAE measure the same thing

**Feedback (add to correct answer):**
The "right" choice depends on the business context. If all errors are equally costly, Model A's lower MAE is better. If large errors are especially costly (causing major complaints), Model B's higher R² might indicate it captures important patterns. You'd also want to know: Are errors symmetric? What's the cost of over vs. under estimation? The metrics alone don't answer these questions.

**Points:** 1

---

