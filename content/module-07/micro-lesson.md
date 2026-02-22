# Module 7: Finding Structure Without Labels

**Time:** 60-90 minutes  
**Prerequisites:** Modules 2-6 (Supervised Learning)

---

## The Setup

So far, every problem we've tackled has had labels. "Did they churn?" "Is this fraud?" But what about questions like:

- "What types of customers do we have?"
- "Which support tickets are about the same issue?"
- "Are there customers who behave unusually?"

No one has labeled your customers as "Type A" or "Type B." There's no "is_anomaly" column. You need to discover structure in the data without being told what to look for.

That's unsupervised learning. It's not about prediction—it's about discovery.

**The question we're answering:** How do we find patterns when we don't know what we're looking for?

---

## The Mental Model

### The Analogy

Imagine sorting a pile of photos without knowing the people in them.

You don't have labels saying "this is the Smith family" or "this is from the beach trip." But you can still group them: photos with similar backgrounds, similar people, similar lighting.

You're finding structure based on similarity. You don't need labels—you need a good definition of "similar."

### The Picture

```
SUPERVISED                           UNSUPERVISED
═══════════                          ════════════

Input:                               Input:
📊 Features                          📊 Features
🏷️ Labels                           (no labels)

Task:                                Task:
"Learn to predict                    "Find natural
these labels"                        groupings"

Output:                              Output:
"New item → Label"                   "These items
                                     are similar"

     🔴 🔵 🔴                              ?  ?  ?
      ↓ ↓ ↓                               ↓  ↓  ↓
    ┌─────────┐                        ┌─────────┐
    │  Model  │                        │Clustering│
    └─────────┘                        └─────────┘
        ↓                                   ↓
      🔴 or 🔵                          Group A, B, C
```

---

## Clustering: Grouping Similar Things

### K-Means: The Basics

K-means is the most common clustering algorithm. It:
1. Picks K random "centers"
2. Assigns each point to the nearest center
3. Moves each center to the middle of its assigned points
4. Repeats until stable

```
STEP 1: Random centers        STEP 2: Assign points
        
    ×                             × ● ●
      ●  ●                          ● ●
    ● ●                           × ● ●
        ●                             ●
      ×                             ×

STEP 3: Move centers          STEP 4: Reassign

        ×                             × ● ●
      ● ● ●                           ● ●
      ×                             × ● ●
        ●                             ●
        ×                             ×

Repeat until centers stop moving
```

### Choosing K (Number of Clusters)

K-means requires you to specify K upfront. How do you choose?

**Method 1: Elbow Method**

Plot "inertia" (sum of distances to cluster centers) for different K values:

```python
inertias = []
for k in range(1, 11):
    kmeans = KMeans(n_clusters=k)
    kmeans.fit(X)
    inertias.append(kmeans.inertia_)

plt.plot(range(1, 11), inertias, 'o-')
plt.xlabel('K')
plt.ylabel('Inertia')
```

Look for the "elbow" where improvement slows down.

**Method 2: Business Logic**

Sometimes K is determined by business needs:
- "We want 3-5 customer segments for marketing"
- "Product team can handle 4 different personas"

**Method 3: Silhouette Score**

Measures how well-separated clusters are (closer to 1 is better):

```python
from sklearn.metrics import silhouette_score

for k in range(2, 11):
    kmeans = KMeans(n_clusters=k).fit(X)
    score = silhouette_score(X, kmeans.labels_)
    print(f"K={k}: Silhouette={score:.3f}")
```

---

## The StreamCart Segmentation Example

### Setting Up Clustering

```python
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# Features for segmentation
features = ['tenure_months', 'orders_total', 'avg_order_value', 
            'logins_per_month', 'support_tickets_total']

X = df[features].fillna(0)

# IMPORTANT: Scale features first!
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Cluster
kmeans = KMeans(n_clusters=4, random_state=42)
df['segment'] = kmeans.fit_predict(X_scaled)
```

### Interpreting Clusters

```python
# Profile each segment
for segment in range(4):
    subset = df[df['segment'] == segment]
    print(f"\n=== Segment {segment} ({len(subset)} customers) ===")
    for feature in features:
        print(f"  {feature}: {subset[feature].mean():.1f}")
```

**Example output:**
```
=== Segment 0 (1,200 customers) ===
  tenure_months: 18.3
  orders_total: 24.1
  avg_order_value: 85.2
  logins_per_month: 12.5
  support_tickets_total: 0.8

=== Segment 1 (800 customers) ===
  tenure_months: 3.2
  orders_total: 4.1
  avg_order_value: 52.3
  logins_per_month: 8.1
  support_tickets_total: 1.2
...
```

### Naming Segments

Don't just call them "Segment 0, 1, 2." Give them meaningful names:

| Segment | Profile | Name |
|---------|---------|------|
| 0 | Long tenure, high orders, few tickets | "Loyal Champions" |
| 1 | New, low orders, some tickets | "Uncertain Newbies" |
| 2 | Medium tenure, declining orders | "At-Risk" |
| 3 | Low tenure, high value, engaged | "Rising Stars" |

---

## Anomaly Detection: Finding Weirdos

Sometimes you don't want groups—you want to find things that don't fit ANY group.

### Isolation Forest

Isolation Forest finds anomalies by asking: "How easy is it to isolate this point?"

Anomalies are isolated quickly (few splits needed). Normal points are surrounded by similar points (many splits needed).

```python
from sklearn.ensemble import IsolationForest

# Fit model
iso_forest = IsolationForest(contamination=0.05)  # Expect 5% anomalies
df['anomaly_score'] = iso_forest.fit_predict(X_scaled)

# -1 = anomaly, 1 = normal
anomalies = df[df['anomaly_score'] == -1]
print(f"Found {len(anomalies)} anomalies")
```

### Use Cases

| Business Problem | Anomaly Detection Approach |
|-----------------|---------------------------|
| Fraud detection | Transactions that don't fit normal patterns |
| Account takeover | Login behavior that's unusual for this user |
| Data quality | Records that look like errors |
| VIP identification | Customers who are unusually valuable |

---

## When to Use What

### Use Clustering When:

- You want to segment customers for different treatments
- You need to summarize a large dataset into groups
- Marketing wants "personas" to target
- You're exploring data and want to find natural groupings

### Use Anomaly Detection When:

- You're looking for fraud, errors, or unusual behavior
- "Normal" is well-defined but "abnormal" can take many forms
- You can't label anomalies in advance
- The positive class is very rare (<1%)

### Don't Use Either When:

- You have labels—use supervised learning instead
- The "clusters" are actually just feature bins (use business rules)
- You need precise predictions (unsupervised is for exploration)

---

## What Goes Wrong

### Mistake 1: Not scaling features

**Symptom:** Clustering is dominated by one feature.

**Example:** `tenure_months` ranges 1-60, `orders` ranges 1-500. Orders dominates.

**Fix:** Always StandardScaler before clustering.

```python
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
```

### Mistake 2: Over-interpreting clusters

**Symptom:** "These clusters prove that customers fall into exactly 4 types!"

**Reality:** K-means WILL find K clusters even if the data is one big blob.

**Fix:** Check silhouette score. Visualize with PCA. Ask: do these groups make business sense?

### Mistake 3: Using clustering for prediction

**Symptom:** "We'll cluster customers and predict churn per cluster."

**Problem:** You're throwing away information. Just predict churn directly.

**Fix:** Use clustering for exploration and segmentation, supervised learning for prediction.

### Mistake 4: Anomaly detection with wrong contamination

**Symptom:** Either too many or too few anomalies flagged.

**Fix:** Start with a reasonable estimate (e.g., fraud is ~1%), tune based on results.

---

## Practice

### 1. Build (Colab Lab)
→ [Link to Colab notebook]

**What you'll do:**
- Cluster StreamCart customers into segments
- Profile each segment
- Find anomalous customer behavior
- Name segments with business meaning

**Time:** ~20 minutes

---

### 2. Decide (Scenario Quiz)
→ [Link to Typeform]

**What you'll do:** 6 scenarios about choosing K, interpreting clusters, and anomaly detection.

**Time:** ~10 minutes

---

### 3. Debug (Find the Bug)
→ [Link to debug Colab]

**What you'll do:** Clustering results are weird—one cluster has almost everyone. Find why.

**Time:** ~15 minutes

---

### 4. Explain (Stakeholder Update)

**The prompt:**  
Marketing asks: "Can we use ML to find customer segments?" Write a brief response explaining what clustering can and can't do, and what you'd need from them to make it useful.

**What good looks like:**
- Sets realistic expectations
- Explains that ML finds patterns, humans give meaning
- Asks clarifying questions (how many segments? what will you do with them?)
- Doesn't oversell

---

## Cheat Sheet

→ [Download: Module 7 Cheat Sheet (PDF)](#)

---

## Done?

- [ ] Read the micro-lesson
- [ ] Completed the scenario quiz  
- [ ] Ran the Colab lab
- [ ] Fixed the debug drill
- [ ] Wrote the stakeholder update

**Next up:** [Module 8: Teaching Machines What "Similar" Means](#)
