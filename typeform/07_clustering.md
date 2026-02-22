# Module 07: Clustering - Typeform Scenario

**Theme:** Marketing wants customer segments for targeted campaigns. You're using K-Means clustering.

---

## Q1 (Multiple Choice)
**Marketing asks: "Can you group customers for differentiated campaigns?" You also have historical churn labels and can only contact 500 users/week. What should you do FIRST?**

- A) Run clustering only; labels are irrelevant
- B) Build a supervised churn ranking model first, then use clustering for messaging strategy
- C) Use regression to predict customer IDs
- D) Skip modeling and send one generic campaign

**Correct:** B

**Decision Receipt:** If you have labels and a hard intervention capacity, supervised ranking usually drives targeting impact. Clustering still helps personalize treatment within prioritized groups.

---

## Q2 (Multiple Choice)
**K-Means requires you to specify K (number of clusters). How should you choose it?**

- A) Always use K=2 (binary)
- B) Use the Elbow method to find where adding clusters stops helping
- C) Always use K=10 (more is better)
- D) K should equal the number of features

**Correct:** B

**Decision Receipt:** The ELBOW METHOD plots inertia (within-cluster distance) vs K. Find the "bend" where additional clusters provide diminishing returns. There's no universal "right" K—it depends on your data.

---

## Q3 (Multiple Choice)
**Your elbow plot shows the "bend" at K=4. A colleague insists on K=20 "for more granularity." What's the problem?**

- A) Nothing, more clusters is always better
- B) Too many clusters leads to redundant segments that aren't actionable
- C) K=20 is the maximum allowed
- D) The elbow method is unreliable

**Correct:** B

**Decision Receipt:** With K=20, many clusters will be nearly identical—not useful for marketing. Segments should be DISTINCT and ACTIONABLE. If cluster 7 and cluster 12 look the same, you've over-segmented.

---

## Q4 (Multiple Choice)
**Before running K-Means, you should:**

- A) Remove all features with zeros
- B) Scale features to have similar ranges
- C) Convert all features to categories
- D) Sort the data by customer ID

**Correct:** B

**Decision Receipt:** K-Means uses DISTANCE calculations. If `tenure_months` (0-60) isn't scaled alongside `orders_total` (0-500), orders will dominate. Use StandardScaler for fair clustering.

---

## Q5 (Multiple Choice)
**Your 4 clusters have these average churn rates:**
```
Cluster 0: 3% churn
Cluster 1: 8% churn
Cluster 2: 22% churn
Cluster 3: 45% churn
```

**What does this tell you?**

- A) The clusters are useless
- B) The clusters capture meaningful differences in churn risk
- C) Cluster 3 is an error
- D) You should retrain with different K

**Correct:** B

**Decision Receipt:** Different outcomes across clusters = VALUABLE segmentation. You can now target Cluster 3 with aggressive retention while ignoring Cluster 0. The clusters are actionable.

---

## Q6 (Multiple Choice)
**You profile Cluster 2 (22% churn):**
```
Avg tenure: 8 months
Avg logins: 3/month
Avg orders: 1/month
Avg support tickets: 2
```

**A good name for this segment is:**

- A) "Power Users"
- B) "At-Risk Mid-Tenure"
- C) "New Customers"
- D) "Loyal Veterans"

**Correct:** B

**Decision Receipt:** Medium tenure, low engagement, some support issues, elevated churn = "At-Risk Mid-Tenure." Naming clusters helps stakeholders understand and act on segments.

---

## Q7 (Multiple Choice)
**Marketing wants to send different campaigns to each segment. Which mapping makes sense?**

- A) Cluster 0 (3% churn, loyal) → Aggressive discounts
- B) Cluster 0 (3% churn, loyal) → Referral program
- C) Cluster 3 (45% churn, high risk) → Ignore them
- D) All clusters → Same generic email

**Correct:** B

**Decision Receipt:** Match ACTION to SEGMENT. Loyal customers → referral/upsell (don't waste discounts). High-risk → retention offers. The whole point of segmentation is differentiated treatment.

---

## Q8 (Multiple Choice)
**Anomaly detection finds:**

- A) The largest cluster
- B) The cluster with most churn
- C) Unusual data points that don't fit any cluster
- D) Missing values

**Correct:** C

**Decision Receipt:** ANOMALIES (outliers) are points far from any cluster center. These might be fraud, data errors, or genuinely unusual customers worth investigating.

---

## Q9 (Multiple Choice)
**You use Isolation Forest for anomaly detection. It flags 5% of customers as anomalies. These customers might be:**

- A) Your most loyal customers
- B) Fraudulent accounts, bots, or data entry errors
- C) Average customers
- D) Customers who will churn

**Correct:** B

**Decision Receipt:** Anomalies are UNUSUAL patterns. In e-commerce, this often means fraud (impossible purchase patterns), bots, or data quality issues. Always investigate flagged anomalies.

---

## Q10 (Multiple Choice)
**A PM asks: "Why did the model put Customer X in Cluster 2?"**

The best answer is:

- A) "The math said so"
- B) "Customer X's features are closest to Cluster 2's center"
- C) "Random chance"
- D) "Cluster 2 had room for more customers"

**Correct:** B

**Decision Receipt:** K-Means assigns each point to the NEAREST CENTER. You can explain: "Customer X has 8 months tenure, 3 logins/month—that's closest to Cluster 2's average profile."

---

## Q11 (Multiple Choice)
**Which statement about clustering is TRUE?**

- A) Clusters always correspond to meaningful business segments
- B) The algorithm guarantees the "correct" segmentation
- C) Clusters are mathematical groupings that YOU must interpret for business meaning
- D) K-Means always finds the globally optimal clusters

**Correct:** C

**Decision Receipt:** Clustering finds MATHEMATICAL structure. It's YOUR job to interpret: "Does Cluster 2 represent a real, actionable customer type?" Sometimes clusters are noise. Validate with domain knowledge.

---

## Q12 (Short Answer)
**You have 4 clusters with clearly different churn rates and behaviors. Write a 3-bullet action plan for marketing (one action type per cluster group).**

**Expected Answer (key points):**
- Different action by segment (e.g., referral for loyal, retention offer for high-risk)
- Success metric per action (conversion, retention lift, churn reduction)
- Guardrail to avoid waste (e.g., don't discount low-risk loyal segment)

**Decision Receipt:** Clustering creates value only when it changes decisions. The output should be a segment-to-action playbook, not just a chart.
