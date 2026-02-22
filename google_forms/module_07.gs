function createModule07() {
  var title = 'Module 07: Clustering & Segmentation';
  var desc  = 'Theme: Marketing wants customer segments for targeted campaigns. You\'re using K-Means clustering.\n\n12 questions · ~10 min · Covers: supervised vs unsupervised, K selection, scaling, segment profiling, anomaly detection.';

  var questions = [
    {
      q: 'Marketing asks: "Can you group customers for differentiated campaigns?" You also have historical churn labels and can only contact 500 users/week. What should you do FIRST?',
      options: [
        'A) Run clustering only; labels are irrelevant',
        'B) Build a supervised churn ranking model first, then use clustering for messaging strategy',
        'C) Use regression to predict customer IDs',
        'D) Skip modeling and send one generic campaign'
      ],
      correct: 1,
      feedback: 'If you have labels and a hard intervention capacity, supervised ranking usually drives targeting impact. Clustering still helps personalize treatment within prioritized groups.'
    },
    {
      q: 'K-Means requires you to specify K (number of clusters). How should you choose it?',
      options: [
        'A) Always use K=2 (binary)',
        'B) Use the Elbow method to find where adding clusters stops helping',
        'C) Always use K=10 (more is better)',
        'D) K should equal the number of features'
      ],
      correct: 1,
      feedback: 'The ELBOW METHOD plots inertia (within-cluster distance) vs K. Find the "bend" where additional clusters provide diminishing returns. There\'s no universal "right" K—it depends on your data.'
    },
    {
      q: 'Your elbow plot shows the "bend" at K=4. A colleague insists on K=20 "for more granularity." What\'s the problem?',
      options: [
        'A) Nothing, more clusters is always better',
        'B) Too many clusters leads to redundant segments that aren\'t actionable',
        'C) K=20 is the maximum allowed',
        'D) The elbow method is unreliable'
      ],
      correct: 1,
      feedback: 'With K=20, many clusters will be nearly identical—not useful for marketing. Segments should be DISTINCT and ACTIONABLE. If cluster 7 and cluster 12 look the same, you\'ve over-segmented.'
    },
    {
      q: 'Before running K-Means, you should:',
      options: [
        'A) Remove all features with zeros',
        'B) Scale features to have similar ranges',
        'C) Convert all features to categories',
        'D) Sort the data by customer ID'
      ],
      correct: 1,
      feedback: 'K-Means uses DISTANCE calculations. If tenure_months (0–60) isn\'t scaled alongside orders_total (0–500), orders will dominate. Use StandardScaler for fair clustering.'
    },
    {
      q: 'Your 4 clusters have these average churn rates:\n\nCluster 0: 3% churn\nCluster 1: 8% churn\nCluster 2: 22% churn\nCluster 3: 45% churn\n\nWhat does this tell you?',
      options: [
        'A) The clusters are useless',
        'B) The clusters capture meaningful differences in churn risk',
        'C) Cluster 3 is an error',
        'D) You should retrain with different K'
      ],
      correct: 1,
      feedback: 'Different outcomes across clusters = VALUABLE segmentation. You can now target Cluster 3 with aggressive retention while ignoring Cluster 0. The clusters are actionable.'
    },
    {
      q: 'You profile Cluster 2 (22% churn):\n\nAvg tenure: 8 months\nAvg logins: 3/month\nAvg orders: 1/month\nAvg support tickets: 2\n\nA good name for this segment is:',
      options: [
        'A) "Power Users"',
        'B) "At-Risk Mid-Tenure"',
        'C) "New Customers"',
        'D) "Loyal Veterans"'
      ],
      correct: 1,
      feedback: 'Medium tenure, low engagement, some support issues, elevated churn = "At-Risk Mid-Tenure." Naming clusters helps stakeholders understand and act on segments.'
    },
    {
      q: 'Marketing wants to send different campaigns to each segment. Which mapping makes sense?',
      options: [
        'A) Cluster 0 (3% churn, loyal) → Aggressive discounts',
        'B) Cluster 0 (3% churn, loyal) → Referral program',
        'C) Cluster 3 (45% churn, high risk) → Ignore them',
        'D) All clusters → Same generic email'
      ],
      correct: 1,
      feedback: 'Match ACTION to SEGMENT. Loyal customers → referral/upsell (don\'t waste discounts). High-risk → retention offers. The whole point of segmentation is differentiated treatment.'
    },
    {
      q: 'Anomaly detection finds:',
      options: [
        'A) The largest cluster',
        'B) The cluster with most churn',
        'C) Unusual data points that don\'t fit any cluster',
        'D) Missing values'
      ],
      correct: 2,
      feedback: 'ANOMALIES (outliers) are points far from any cluster center. These might be fraud, data errors, or genuinely unusual customers worth investigating.'
    },
    {
      q: 'You use Isolation Forest for anomaly detection. It flags 5% of customers as anomalies. These customers might be:',
      options: [
        'A) Your most loyal customers',
        'B) Fraudulent accounts, bots, or data entry errors',
        'C) Average customers',
        'D) Customers who will churn'
      ],
      correct: 1,
      feedback: 'Anomalies are UNUSUAL patterns. In e-commerce, this often means fraud (impossible purchase patterns), bots, or data quality issues. Always investigate flagged anomalies.'
    },
    {
      q: 'A PM asks: "Why did the model put Customer X in Cluster 2?"\n\nThe best answer is:',
      options: [
        'A) "The math said so"',
        'B) "Customer X\'s features are closest to Cluster 2\'s center"',
        'C) "Random chance"',
        'D) "Cluster 2 had room for more customers"'
      ],
      correct: 1,
      feedback: 'K-Means assigns each point to the NEAREST CENTER. You can explain: "Customer X has 8 months tenure, 3 logins/month—that\'s closest to Cluster 2\'s average profile."'
    },
    {
      q: 'Which statement about clustering is TRUE?',
      options: [
        'A) Clusters always correspond to meaningful business segments',
        'B) The algorithm guarantees the "correct" segmentation',
        'C) Clusters are mathematical groupings that YOU must interpret for business meaning',
        'D) K-Means always finds the globally optimal clusters'
      ],
      correct: 2,
      feedback: 'Clustering finds MATHEMATICAL structure. It\'s YOUR job to interpret: "Does Cluster 2 represent a real, actionable customer type?" Sometimes clusters are noise. Validate with domain knowledge.'
    },
    {
      q: 'You have 4 clusters with clearly different churn rates and behaviors. Write a 3-bullet action plan for marketing (one action type per cluster group).',
      type: 'short',
      expected: 'Different action by segment (e.g., referral for loyal, retention offer for high-risk). Success metric per action (conversion, retention lift, churn reduction). Guardrail to avoid waste (e.g., don\'t discount low-risk loyal segment).',
      feedback: 'Clustering creates value only when it changes decisions. The output should be a segment-to-action playbook, not just a chart.'
    }
  ];

  return buildQuizForm(title, desc, questions);
}
