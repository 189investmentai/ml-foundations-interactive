# Module 13 Quiz: Clustering - Google Forms Setup

## Form Setup

1. Go to https://docs.google.com/forms
2. Click **+ Blank**
3. Settings → Enable **"Make this a quiz"**
4. Enable **"Release grade immediately after submission"**

---

## Form Title & Description

**Title:** Module 13 Quiz: Clustering

**Description:** 
Test your understanding. 8 questions, ~10 minutes.

---

## Questions (Copy-Paste Ready)

### Question 1

**Question:**
You're using K-means to segment customers. The features are: annual_income ($10K-$500K) and age (18-80). What should you do before clustering?

**Options:**
- A) Nothing — K-means handles different scales automatically
- B) Standardize both features to have mean=0, std=1 ✓ CORRECT
- C) Remove outliers first
- D) Use log transform on income

**Feedback (add to correct answer):**
K-means uses Euclidean distance, which is dominated by features with larger scales. Income (range ~490K) would completely overshadow age (range ~62). Standardizing ensures both features contribute equally to clustering.

**Points:** 1

---

### Question 2

**Question:**
Your elbow plot shows inertia decreasing smoothly with no clear elbow. What does this suggest?

**Options:**
- A) Your data has no natural clusters
- B) You should use more features
- C) The data may not have distinct spherical clusters, or there's gradual structure ✓ CORRECT
- D) K-means isn't working properly

**Feedback (add to correct answer):**
A smooth curve without an elbow suggests the data doesn't have clearly separated spherical clusters. The structure might be gradual, non-spherical, or truly continuous. Consider DBSCAN, exploring the data visually, or accepting that discrete clusters may not be the right model.

**Points:** 1

---

### Question 3

**Question:**
Your K-means clustering gives silhouette scores: K=3 (0.45), K=4 (0.52), K=5 (0.48), K=6 (0.41). Which K would you choose?

**Options:**
- A) K=3 — fewer clusters are easier to interpret
- B) K=4 — highest silhouette score ✓ CORRECT
- C) K=5 — more granular segments
- D) K=6 — more detail is always better

**Feedback (add to correct answer):**
The silhouette score measures cluster quality — higher is better. K=4 has the highest score (0.52), indicating the best separation between clusters. However, you should also consider business requirements and interpretability.

**Points:** 1

---

### Question 4

**Question:**
You cluster support tickets and find one cluster has 80% of all tickets while 4 other clusters have 5% each. What might this indicate?

**Options:**
- A) K-means failed — try again with different initialization
- B) The dominant cluster might contain multiple sub-topics that should be split ✓ CORRECT
- C) This is expected — some issues are more common
- D) You should use equal-size clustering

**Feedback (add to correct answer):**
While imbalanced clusters can be natural (some issues are common), an 80% cluster likely contains heterogeneous content. You should examine this cluster to see if it makes sense as a single category or should be further subdivided with a larger K.

**Points:** 1

---

### Question 5

**Question:**
Your data has crescent-shaped and circular clusters (like two moons). K-means gives poor results. What algorithm should you try?

**Options:**
- A) Agglomerative clustering with more clusters
- B) DBSCAN — it can find arbitrary cluster shapes ✓ CORRECT
- C) K-means with more iterations
- D) Increase K to 10

**Feedback (add to correct answer):**
K-means assumes spherical clusters and fails on crescent/moon shapes. DBSCAN is density-based and can discover clusters of arbitrary shapes by connecting nearby points, making it ideal for non-spherical patterns.

**Points:** 1

---

### Question 6

**Question:**
DBSCAN labels some points as -1. What does this mean?

**Options:**
- A) These points couldn't be processed
- B) These are noise/outlier points not belonging to any cluster ✓ CORRECT
- C) These points should be in cluster 0
- D) The algorithm needs more iterations

**Feedback (add to correct answer):**
DBSCAN identifies points in low-density regions as noise and labels them -1. This is a feature, not a bug — it automatically handles outliers rather than forcing them into clusters where they don't belong.

**Points:** 1

---

### Question 7

**Question:**
You've clustered customers into 5 segments. A stakeholder asks "How do we know these segments are real?" The best response is:

**Options:**
- A) "The silhouette score is 0.55, which indicates good separation"
- B) "Let me show you the profile of each segment — they have distinct behaviors, and the segments align with how your sales team thinks about customers" ✓ CORRECT
- C) "K-means is a proven algorithm used by many companies"
- D) "We ran the algorithm multiple times and got consistent results"

**Feedback (add to correct answer):**
Business stakeholders need to see that clusters are interpretable and actionable. Showing distinct profiles (with concrete differences in behavior) and relating to business intuition is more convincing than citing statistical scores or algorithm credentials.

**Points:** 1

---

### Question 8

**Question:**
When should you consider using hierarchical clustering instead of K-means?

**Options:**
- A) When you have more than 10,000 data points
- B) When you don't know K in advance and want to explore different levels of grouping ✓ CORRECT
- C) When clusters must be spherical
- D) When you need the fastest possible runtime

**Feedback (add to correct answer):**
Hierarchical clustering produces a dendrogram showing clusters at all levels, letting you choose K after seeing the structure. It's useful for exploration when you're unsure about K. However, it's slower than K-means, so it's not ideal for very large datasets.

**Points:** 1

---

