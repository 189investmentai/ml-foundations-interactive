function createModule02() {
  var title = 'Module 02: Logistic Regression';
  var desc  = 'Theme: You\'ve trained a logistic regression model and need to interpret the results for stakeholders.\n\n12 questions · ~10 min · Covers: coefficients, scaling, multicollinearity, baselines, interpretability.';

  var questions = [
    {
      q: 'Your logistic regression model has these coefficients:\n\nsupport_tickets: +0.72\ntenure_months: -0.35\nlogins_last_30d: -0.18\n\nWhich statement is TRUE?',
      options: [
        'A) Customers with more support tickets are LESS likely to churn',
        'B) Customers with longer tenure are MORE likely to churn',
        'C) Customers with more support tickets are MORE likely to churn',
        'D) Logins have the strongest effect on churn'
      ],
      correct: 2,
      feedback: 'Positive coefficient = increases churn probability. Negative = decreases. The +0.72 on support_tickets means more tickets → higher churn risk. Tenure and logins are protective (negative).'
    },
    {
      q: 'The coefficient for tenure_months is -0.35. In plain English, this means:',
      options: [
        'A) Tenure causes customers to stay',
        'B) On average, longer tenure is associated with lower churn probability',
        'C) Every month reduces churn by 35%',
        'D) Tenure is the most important feature'
      ],
      correct: 1,
      feedback: 'Coefficients show ASSOCIATION, not causation. The negative sign means longer tenure correlates with lower churn. The magnitude (-0.35) is relative to other features, not a direct percentage.'
    },
    {
      q: 'Your model gives Customer A a probability of 0.73 (73%). This means:',
      options: [
        'A) There\'s a 73% chance the model is correct about this customer',
        'B) 73% of similar customers churned in training data',
        'C) The customer will definitely churn',
        'D) The model is 73% confident in its prediction'
      ],
      correct: 1,
      feedback: 'A probability of 0.73 means: among customers with similar feature values in the training data, about 73% churned. It\'s a statistical estimate, not certainty about this individual.'
    },
    {
      q: 'You notice that orders_last_30d has a POSITIVE coefficient (+0.15), meaning more orders = higher churn. This seems backward. What\'s most likely happening?',
      options: [
        'A) The model is broken',
        'B) Ordering more actually does cause churn',
        'C) There might be multicollinearity with another feature',
        'D) You should remove this feature immediately'
      ],
      correct: 2,
      feedback: 'Counterintuitive coefficients often signal MULTICOLLINEARITY—when two features are highly correlated, their coefficients become unstable. Check if orders correlates strongly with another feature like tenure.'
    },
    {
      q: 'To fix potential multicollinearity, you should:',
      options: [
        'A) Add more features',
        'B) Check correlations between features and remove redundant ones',
        'C) Use a deeper neural network',
        'D) Increase the training data size'
      ],
      correct: 1,
      feedback: 'First, compute a correlation matrix. If two features correlate above ~0.7, consider removing one. This stabilizes coefficients and makes interpretation reliable.'
    },
    {
      q: 'A stakeholder asks: "Which customer attribute matters MOST for churn?"\n\nBased on coefficients support_tickets: +0.72, tenure: -0.35, logins: -0.18, which answer is best?',
      options: [
        'A) "Support tickets—it has the largest positive coefficient"',
        'B) "Tenure—longer tenure means guaranteed retention"',
        'C) "Support tickets has the largest magnitude, suggesting the strongest association"',
        'D) "They all matter equally"'
      ],
      correct: 2,
      feedback: 'Compare MAGNITUDE (absolute value), not just sign. |0.72| > |0.35| > |0.18|. But be careful: this assumes features are on similar scales. If not, use standardized coefficients.'
    },
    {
      q: 'Your features have very different scales:\n\ntenure_months: 0–60\nlogins_last_30d: 0–100\nnps_score: 1–10\n\nBefore training logistic regression, you should:',
      options: [
        'A) Nothing, logistic regression handles this automatically',
        'B) Scale features to have similar ranges (e.g., StandardScaler)',
        'C) Convert all features to percentages',
        'D) Remove the smallest-scale feature'
      ],
      correct: 1,
      feedback: 'Logistic regression coefficients are affected by feature scale. Without scaling, larger-scale features may dominate. StandardScaler (mean=0, std=1) makes coefficients comparable.'
    },
    {
      q: 'After scaling, your coefficient for tenure_months is -0.45. A stakeholder asks what this means in real terms. The best answer is:',
      options: [
        'A) "Each month reduces churn probability by 45%"',
        'B) "A one standard-deviation increase in tenure is associated with lower churn"',
        'C) "Tenure is 45% important"',
        'D) "We need 45 months of tenure to prevent churn"'
      ],
      correct: 1,
      feedback: 'With standardized features, coefficients represent the effect of a one-standard-deviation change. This makes features comparable but loses direct interpretability in original units.'
    },
    {
      q: 'Your model has 70% accuracy on a dataset where 10% of customers churn. A colleague says "70% is decent." What\'s wrong with this assessment?',
      options: [
        'A) Nothing, 70% is good',
        'B) 70% is actually worse than guessing "no churn" for everyone (90% accuracy)',
        'C) We should use 80% as the threshold',
        'D) Accuracy can\'t be used for classification'
      ],
      correct: 1,
      feedback: 'With 10% churn rate, predicting "no one churns" gives 90% accuracy! Your 70% model is worse than this naive baseline. For imbalanced data, use precision, recall, or AUC instead.'
    },
    {
      q: 'You compare two churn models for a regulated market:\n\nModel A (LogReg): AUC 0.74, clear reason codes\nModel B (GBM): AUC 0.79, hard to explain per customer\n\nCompliance requires explainable adverse-action reasons for every flagged customer. Which is best for initial launch?',
      options: [
        'A) Model B, because higher AUC always wins',
        'B) Model A, because explainability is a hard requirement',
        'C) Use either; compliance can be handled later',
        'D) Reject both and collect more data first'
      ],
      correct: 1,
      feedback: 'If explainability is non-negotiable, a slightly weaker but transparent model can be the right business decision. You can iterate to stronger models later with interpretability tooling.'
    },
    {
      q: 'You see this after retraining logistic regression:\n\nTraining AUC: 0.85\nValidation AUC: 0.72\nPrecision@500: unchanged vs previous model\n\nWhat should you do NEXT?',
      options: [
        'A) Ship immediately because training AUC improved',
        'B) Add regularization / simplify features and re-evaluate on validation',
        'C) Increase threshold to 0.9 and ignore validation AUC',
        'D) Switch to a neural network immediately'
      ],
      correct: 1,
      feedback: 'Better training metrics with flat business metrics usually means you\'ve fit noise, not signal. Reduce complexity and judge progress on unseen-data performance plus top-k business impact.'
    },
    {
      q: 'A PM asks: "So support tickets CAUSE churn?" Draft a 2-3 sentence response that is honest and actionable.',
      type: 'short',
      expected: 'Coefficients show association, not proof of causation. Still useful for prediction and prioritization. Suggest a follow-up test/intervention (e.g., improve support response time for high-ticket users and measure impact).',
      feedback: 'Great ML communication balances rigor and action: don\'t overclaim causality, but do convert model signal into testable business steps.'
    }
  ];

  return buildQuizForm(title, desc, questions);
}
