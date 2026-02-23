# Module 10 Quiz: Feature Engineering - Google Forms Setup

## Form Setup

1. Go to https://docs.google.com/forms
2. Click **+ Blank**
3. Settings → Enable **"Make this a quiz"**
4. Enable **"Release grade immediately after submission"**

---

## Form Title & Description

**Title:** Module 10 Quiz: Feature Engineering

**Description:** 
Test your understanding. 8 questions, ~10 minutes.

---

## Questions (Copy-Paste Ready)

### Question 1

**Question:**
You're building a churn model to predict who will cancel next month. Which feature has data leakage?

**Options:**
- A) Number of support tickets in the last 30 days
- B) Whether the customer requested a cancellation ✓ CORRECT
- C) Average monthly spend over the past year
- D) Days since last login

**Feedback (add to correct answer):**
"Whether the customer requested a cancellation" is essentially the target — it directly indicates they're about to churn. The other features describe past behavior that would be available at prediction time.

**Points:** 1

---

### Question 2

**Question:**
You have a "revenue" column that is heavily right-skewed (most values small, some very large). Which transformation is most appropriate?

**Options:**
- A) Standardization (z-score)
- B) Min-max scaling
- C) Log transformation ✓ CORRECT
- D) One-hot encoding

**Feedback (add to correct answer):**
Log transformation compresses the range of heavily right-skewed data, making the distribution more symmetric. Standardization and min-max still preserve the skew. One-hot is for categorical data.

**Points:** 1

---

### Question 3

**Question:**
You fit a StandardScaler on your full dataset, then split into train/test. What's wrong?

**Options:**
- A) Nothing — this is the correct approach
- B) The scaler should be fit only on training data to avoid test data leakage ✓ CORRECT
- C) StandardScaler shouldn't be used before splitting
- D) The test set should be scaled differently

**Feedback (add to correct answer):**
Fitting the scaler on all data means test set statistics influence the transformation. This leaks information from test to train. Always fit transformations on training data only, then apply to test.

**Points:** 1

---

### Question 4

**Question:**
You have a "city" column with 5,000 unique values. What's the best encoding approach?

**Options:**
- A) One-hot encoding — it preserves all information
- B) Ordinal encoding — assign 1-5000
- C) Target encoding with cross-validation ✓ CORRECT
- D) Drop the column — too many values

**Feedback (add to correct answer):**
One-hot encoding creates 5,000 columns — computationally expensive and causes sparsity. Ordinal encoding implies false ordering. Target encoding replaces each city with its average target value, compressing to one column. Use CV to prevent leakage.

**Points:** 1

---

### Question 5

**Question:**
You're creating a feature "total_orders" by counting all orders for each user. You'll use this to predict churn next week. What's the issue?

**Options:**
- A) No issue — total orders is a valid feature
- B) The aggregation might include future orders (after the prediction date) ✓ CORRECT
- C) Counts should always be log-transformed
- D) You should use median instead of sum

**Feedback (add to correct answer):**
If you count ALL orders without a time filter, you include orders that happen after your prediction point — future leakage. You need: `total_orders_before_cutoff` that only counts orders up to the prediction date.

**Points:** 1

---

### Question 6

**Question:**
For a linear regression predicting house prices, which features MOST need scaling?

**Options:**
- A) number_of_rooms (range 1-10) and square_feet (range 500-5000) ✓ CORRECT
- B) has_garage (0 or 1) and has_pool (0 or 1)
- C) neighborhood_type (A, B, C) after one-hot encoding
- D) All of the above equally

**Feedback (add to correct answer):**
Features with very different scales affect linear model coefficients. square_feet (500-5000) would dominate number_of_rooms (1-10) without scaling. Binary features (0/1) and one-hot encoded features are already on the same scale.

**Points:** 1

---

### Question 7

**Question:**
Which statement about tree-based models and feature engineering is correct?

**Options:**
- A) Trees require all features to be scaled
- B) Trees can handle missing values natively ✓ CORRECT
- C) Trees require one-hot encoding for all categorical features
- D) Trees cannot learn interaction effects

**Feedback (add to correct answer):**
Tree-based models (Random Forest, XGBoost, etc.) handle missing values by finding optimal split points around them. They also don't require scaling and can use ordinal encoding for categories. Trees naturally capture interactions through splits.

**Points:** 1

---

### Question 8

**Question:**
You create `revenue_per_visit = revenue / visits`. Some users have 0 visits. What should you do?

**Options:**
- A) Replace with 0 — no visits means no revenue per visit
- B) Replace with the mean revenue_per_visit
- C) Add a small constant: revenue / (visits + 1)
- D) Create a flag for zero visits and fill with median ✓ CORRECT

**Feedback (add to correct answer):**
Division by zero creates infinity. Replacing with 0 loses information about revenue. Adding 1 artificially changes ratios for everyone. Best practice: create a binary flag `has_visits` and fill zero-visit cases with a sensible default (like median) for the ratio.

**Points:** 1

---

