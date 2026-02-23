# Module 10 Quiz: Feature Engineering

---

## Question 1

You're building a churn model to predict who will cancel next month. Which feature has data leakage?

A) Number of support tickets in the last 30 days
B) Whether the customer requested a cancellation
C) Average monthly spend over the past year
D) Days since last login

**Correct Answer:** B

**Explanation:** "Whether the customer requested a cancellation" is essentially the target — it directly indicates they're about to churn. The other features describe past behavior that would be available at prediction time.

---

## Question 2

You have a "revenue" column that is heavily right-skewed (most values small, some very large). Which transformation is most appropriate?

A) Standardization (z-score)
B) Min-max scaling
C) Log transformation
D) One-hot encoding

**Correct Answer:** C

**Explanation:** Log transformation compresses the range of heavily right-skewed data, making the distribution more symmetric. Standardization and min-max still preserve the skew. One-hot is for categorical data.

---

## Question 3

You fit a StandardScaler on your full dataset, then split into train/test. What's wrong?

A) Nothing — this is the correct approach
B) The scaler should be fit only on training data to avoid test data leakage
C) StandardScaler shouldn't be used before splitting
D) The test set should be scaled differently

**Correct Answer:** B

**Explanation:** Fitting the scaler on all data means test set statistics influence the transformation. This leaks information from test to train. Always fit transformations on training data only, then apply to test.

---

## Question 4

You have a "city" column with 5,000 unique values. What's the best encoding approach?

A) One-hot encoding — it preserves all information
B) Ordinal encoding — assign 1-5000
C) Target encoding with cross-validation
D) Drop the column — too many values

**Correct Answer:** C

**Explanation:** One-hot encoding creates 5,000 columns — computationally expensive and causes sparsity. Ordinal encoding implies false ordering. Target encoding replaces each city with its average target value, compressing to one column. Use CV to prevent leakage.

---

## Question 5

You're creating a feature "total_orders" by counting all orders for each user. You'll use this to predict churn next week. What's the issue?

A) No issue — total orders is a valid feature
B) The aggregation might include future orders (after the prediction date)
C) Counts should always be log-transformed
D) You should use median instead of sum

**Correct Answer:** B

**Explanation:** If you count ALL orders without a time filter, you include orders that happen after your prediction point — future leakage. You need: `total_orders_before_cutoff` that only counts orders up to the prediction date.

---

## Question 6

For a linear regression predicting house prices, which features MOST need scaling?

A) number_of_rooms (range 1-10) and square_feet (range 500-5000)
B) has_garage (0 or 1) and has_pool (0 or 1)
C) neighborhood_type (A, B, C) after one-hot encoding
D) All of the above equally

**Correct Answer:** A

**Explanation:** Features with very different scales affect linear model coefficients. square_feet (500-5000) would dominate number_of_rooms (1-10) without scaling. Binary features (0/1) and one-hot encoded features are already on the same scale.

---

## Question 7

Which statement about tree-based models and feature engineering is correct?

A) Trees require all features to be scaled
B) Trees can handle missing values natively
C) Trees require one-hot encoding for all categorical features
D) Trees cannot learn interaction effects

**Correct Answer:** B

**Explanation:** Tree-based models (Random Forest, XGBoost, etc.) handle missing values by finding optimal split points around them. They also don't require scaling and can use ordinal encoding for categories. Trees naturally capture interactions through splits.

---

## Question 8

You create `revenue_per_visit = revenue / visits`. Some users have 0 visits. What should you do?

A) Replace with 0 — no visits means no revenue per visit
B) Replace with the mean revenue_per_visit
C) Add a small constant: revenue / (visits + 1)
D) Create a flag for zero visits and fill with median

**Correct Answer:** D

**Explanation:** Division by zero creates infinity. Replacing with 0 loses information about revenue. Adding 1 artificially changes ratios for everyone. Best practice: create a binary flag `has_visits` and fill zero-visit cases with a sensible default (like median) for the ratio.

---

## Scoring

- 8/8: Expert level — you understand feature engineering deeply
- 6-7/8: Solid understanding — review leakage scenarios
- 4-5/8: Developing — revisit transformation types
- <4/8: Review the full lesson and practice in the playground
