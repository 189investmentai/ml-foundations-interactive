# Module 7: Typeform Scenarios

---

## Scenario 1: Choosing K

**Setup:**
You're clustering customers. Silhouette scores:
- K=2: 0.45
- K=3: 0.52
- K=4: 0.48
- K=5: 0.41

Marketing says they can handle "3-5 segments."

**Question:** What K should you use?

**Options:**
- A) K=2—simpler is better
- B) K=3—best silhouette score
- C) K=4—in the middle of marketing's range
- D) K=5—more segments = more granular

**Correct Answer:** B

**Decision Receipt:**
K=3 has the best silhouette score (0.52) AND falls within marketing's acceptable range. Higher K isn't always better—it can create artificial distinctions. When multiple criteria align (statistical quality + business needs), go with it.

---

## Scenario 2: Scaling Importance

**Setup:**
You cluster customers using: `tenure_months` (1-60), `total_spend` (100-50000), `logins_per_week` (0-20). Without scaling.

**Question:** What will likely happen?

**Options:**
- A) Clusters will be balanced
- B) total_spend will dominate clustering
- C) tenure_months will dominate clustering
- D) All features contribute equally

**Correct Answer:** B

**Decision Receipt:**
K-means uses Euclidean distance. `total_spend` (range: 49,900) will completely dominate `tenure` (range: 59) and `logins` (range: 20). A $100 difference in spend will outweigh years of tenure difference. Always use StandardScaler to put features on equal footing.

---

## Scenario 3: Interpreting Clusters

**Setup:**
K-means found 4 clusters. Cluster 2 has these characteristics:
- High tenure (avg 24 months)
- Low recent orders (avg 0.5/month, used to be 2/month)
- High support tickets (avg 3)

**Question:** What's a reasonable interpretation?

**Options:**
- A) "VIP Customers"
- B) "At-Risk Loyalists"
- C) "New Users"
- D) "Low-Value Segment"

**Correct Answer:** B

**Decision Receipt:**
Long tenure + declining orders + high tickets = someone who WAS loyal but is showing warning signs. They're not new (high tenure), not low-value (history of orders), but they ARE at risk. The cluster profile suggests intervention might save them.

---

## Scenario 4: Anomaly Threshold

**Setup:**
You set Isolation Forest with contamination=0.01 (1%). It flags 50 transactions as anomalies. You review them: 40 are genuine fraud, 10 are false positives.

**Question:** What does this tell you?

**Options:**
- A) Model is broken—80% accuracy isn't enough
- B) Model is working well—80% precision on rare events is good
- C) contamination should be increased
- D) Need more training data

**Correct Answer:** B

**Decision Receipt:**
80% precision (40 true/50 flagged) on anomaly detection is actually quite good. Fraud is rare and takes many forms, so perfect precision is unrealistic. If the fraud team can review 50 cases and catch 40 real frauds, that's valuable. The 10 false positives are the cost of catching the 40.

---

## Scenario 5: Clustering vs Classification

**Setup:**
Marketing wants to predict which customers will respond to a discount offer. They ask: "Can we cluster customers into responders and non-responders?"

**Question:** What's wrong with this approach?

**Options:**
- A) Nothing—clustering is good for this
- B) You have labels—use supervised learning instead
- C) Clustering only works with numeric features
- D) You need more than 2 clusters

**Correct Answer:** B

**Decision Receipt:**
If you know who responded in the past (labels exist), that's a supervised learning problem. Use logistic regression or XGBoost to predict response. Clustering is for discovering groups when you DON'T have labels. Using clustering when labels exist throws away valuable information.

---

## Scenario 6: Cluster Validation

**Setup:**
Your K-means creates 5 clusters. When you profile them:
- Cluster 0: 4,500 customers
- Cluster 1: 12 customers
- Cluster 2: 8 customers
- Cluster 3: 4,470 customers
- Cluster 4: 10 customers

**Question:** What's most likely wrong?

**Options:**
- A) You need more clusters
- B) Outliers are creating tiny clusters
- C) K-means is the wrong algorithm
- D) The data isn't clusterable

**Correct Answer:** B

**Decision Receipt:**
Three clusters with <15 members while two have 4,000+ suggests outliers are being isolated into their own clusters. Fix: remove or cap outliers before clustering, or use an algorithm more robust to outliers (like DBSCAN). Alternatively, those tiny clusters might be legitimate anomalies worth investigating.

---

## Scoring Summary

**6/6 correct:** Strong understanding of clustering and its limitations.

**4-5/6 correct:** Good foundation. Review when to use clustering vs supervised learning.

**<4/6 correct:** Re-read the micro-lesson, especially the scaling and interpretation sections.
