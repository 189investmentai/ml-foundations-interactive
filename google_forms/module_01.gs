function createModule01() {
  var title = 'Module 01: Problem Framing';
  var desc  = 'Theme: You\'re an ML practitioner at StreamCart. Leadership wants to reduce churn.\n\n12 questions · ~10 min · Covers: actions, targets, leakage, metrics, data strategy.';

  var questions = [
    {
      q: 'The VP of Customer Success says: "We\'re losing too many customers. Can you build something to help?"\n\nWhat\'s your FIRST response?',
      options: [
        'A) "Sure, I\'ll start training a model on our customer data"',
        'B) "What action would you take if I could identify at-risk customers?"',
        'C) "Let me check what AUC we can achieve"',
        'D) "I\'ll need a bigger GPU cluster"'
      ],
      correct: 1,
      feedback: 'Always start by defining the ACTION. Without knowing what the business will DO with predictions, you can\'t choose the right metric, threshold, or model. "Build a churn model" is not a goal—"call 500 at-risk customers weekly" is.'
    },
    {
      q: 'The VP clarifies: "Our retention team can call 500 customers per week. Each call costs $15. Saved customer value is ~$180."\n\nWhat should the model output FIRST?',
      options: [
        'A) A hard yes/no churn label only',
        'B) A churn risk score (probability) so we can rank top 500',
        'C) A cluster ID for each customer',
        'D) A feature importance chart for leadership'
      ],
      correct: 1,
      feedback: 'You still have a classification problem, but operationally you need a RANKED list under a fixed capacity. Risk scores let you pick top 500 and tune the threshold as costs/capacity change. A hard label is too rigid.'
    },
    {
      q: 'You need to define the target variable (y). Which definition is best?',
      options: [
        'A) churn = 1 if customer ever cancels',
        'B) churn = 1 if customer cancels within 30 days of prediction',
        'C) churn = 1 if customer hasn\'t logged in recently',
        'D) churn = 1 if customer has filed support tickets'
      ],
      correct: 1,
      feedback: 'Your target needs a clear TIME WINDOW. "Ever cancels" is too vague—you need predictions to be actionable. 30 days gives the retention team time to intervene. Options C and D are features, not targets.'
    },
    {
      q: 'A colleague suggests adding this feature: days_until_churn = churn_date - today\n\nWhat\'s wrong with this?',
      options: [
        'A) Nothing, it\'s a useful feature',
        'B) It\'s data leakage — we wouldn\'t know churn_date at prediction time',
        'C) The calculation is incorrect',
        'D) It should be a categorical variable'
      ],
      correct: 1,
      feedback: 'This is DATA LEAKAGE. At prediction time, you don\'t know when (or if) a customer will churn. Using future information gives unrealistically high accuracy that won\'t hold in production.'
    },
    {
      q: 'A colleague proposes these features for churn prediction. Which one has a SUBTLE leakage risk?\n\nA) tenure_months — how long they\'ve been a customer\nB) logins_last_7d — logins in the 7 days before snapshot\nC) days_since_last_login — calculated as (today - last_login_date)\nD) support_tickets_last_30d — tickets filed in past 30 days',
      options: [
        'A) tenure_months',
        'B) logins_last_7d',
        'C) days_since_last_login',
        'D) support_tickets_last_30d'
      ],
      correct: 2,
      feedback: 'Option C is tricky. If "today" means the day you\'re BUILDING the model (not the snapshot date), then days_since_last_login includes information from AFTER the prediction point. Always calculate relative to the snapshot date, not the current date. This is a common bug in production pipelines where "today" shifts between training and scoring.'
    },
    {
      q: 'Given the "500 calls per week" constraint, which metric should you optimize?',
      options: [
        'A) Accuracy',
        'B) AUC-ROC',
        'C) Precision@500',
        'D) F1 Score'
      ],
      correct: 2,
      feedback: 'With a fixed capacity (500 calls), you want the TOP 500 predictions to be as accurate as possible. Precision@K directly measures this. AUC measures overall ranking but doesn\'t account for your specific cutoff.'
    },
    {
      q: 'Your model achieves 95% accuracy. Is this good?',
      options: [
        'A) Yes, 95% is excellent',
        'B) It depends on the base churn rate',
        'C) No, we need at least 99%',
        'D) Accuracy doesn\'t matter, only AUC does'
      ],
      correct: 1,
      feedback: 'If only 5% of customers churn, a model that predicts "no one churns" gets 95% accuracy while being useless. Always compare to the BASE RATE. For imbalanced problems, accuracy is misleading.'
    },
    {
      q: 'The data team offers two options for model development:\n\nDataset A: 18 months of historical snapshots with outcomes\nDataset B: last 7 days of fresh customer features (no finalized outcomes yet)\n\nWhich setup is best for v1?',
      options: [
        'A) Train and validate on Dataset B only because it\'s freshest',
        'B) Train on Dataset A with a time-based split; score weekly on fresh data like Dataset B',
        'C) Randomly merge A and B, then do a random train/test split',
        'D) Train on A, but evaluate on A training rows to move faster'
      ],
      correct: 1,
      feedback: 'You need historical labeled data to learn patterns and a time-based split to simulate real deployment. Then score on fresh operational data. Random mixing can leak time and overstate performance.'
    },
    {
      q: 'A PM asks: "Can the model tell us WHY customers churn?"\n\nWhat\'s the honest answer?',
      options: [
        'A) "Yes, the feature importances tell us exactly why"',
        'B) "The model finds patterns, but correlation isn\'t causation"',
        'C) "No, ML models can\'t provide any insights"',
        'D) "Only deep learning can answer \'why\' questions"'
      ],
      correct: 1,
      feedback: 'ML models find CORRELATIONS that help predict outcomes. They don\'t prove CAUSATION. High support tickets might correlate with churn, but that doesn\'t mean tickets cause churn—both might be caused by a bad product experience.'
    },
    {
      q: 'The retention offer costs $40. A saved customer generates $180 in future revenue. The model predicts Customer X has 55% churn probability. If 25% of at-risk customers who receive offers actually stay, should you send the offer?\n\nExpected value = P(churn) × P(save|offer) × value - cost',
      options: [
        'A) Yes — 55% churn risk is high enough',
        'B) No — the expected value is negative',
        'C) Yes — $180 > $40',
        'D) Need more information about other customers'
      ],
      correct: 1,
      feedback: 'EV = 0.55 × 0.25 × $180 - $40 = $24.75 - $40 = -$15.25. Negative expected value means don\'t send the offer — you\'d lose money on average. Not every "high-risk" customer deserves intervention. This is why you need probabilities, not binary labels — so you can do this math.'
    },
    {
      q: 'Write a 1-sentence ML problem statement for this churn use case. Include: (a) action, (b) prediction window, (c) success metric.',
      type: 'short',
      expected: '"Each week, rank customers by probability of churning in the next 30 days so the retention team can call top 500, and optimize Precision@500 (plus lift vs random)."',
      feedback: 'If your sentence includes action + window + metric, you\'re ready to build. If any piece is missing, you\'ll likely pick the wrong data, target, or evaluation setup.'
    },
    {
      q: 'You test two models for a "top 500 calls/week" program:\n\nModel A: AUC 0.81, Precision@500 = 0.31\nModel B: AUC 0.76, Precision@500 = 0.43\n\nWhich is the better deployment choice right now?',
      options: [
        'A) Model A, because AUC is higher',
        'B) Model B, because top-500 precision aligns with team capacity',
        'C) Both are equal; pick whichever is easier to code',
        'D) Neither; always optimize recall first'
      ],
      correct: 1,
      feedback: 'Under fixed outreach capacity, business impact comes from who is in the top 500. Global AUC matters, but Precision@K is the decisive metric for this workflow.'
    }
  ];

  return buildQuizForm(title, desc, questions);
}
