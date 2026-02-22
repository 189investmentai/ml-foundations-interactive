function createModule03() {
  var title = 'Module 03: Decision Trees & Random Forests';
  var desc  = 'Theme: You\'re comparing tree-based models to logistic regression and explaining results to your team.\n\n12 questions · ~10 min · Covers: splits, overfitting, ensembles, feature importance, interpretability trade-offs.';

  var questions = [
    {
      q: 'A decision tree\'s first split is support_tickets > 2. What does this tell you?',
      options: [
        'A) Customers with >2 tickets always churn',
        'B) This split best separates churners from non-churners at the root',
        'C) Support tickets is the only important feature',
        'D) The model is overfitting'
      ],
      correct: 1,
      feedback: 'The first split is chosen because it creates the most "pure" groups (highest information gain). It doesn\'t mean it\'s the only important feature—just the best single question to ask first.'
    },
    {
      q: 'Your decision tree has 50 levels deep and achieves 99% training accuracy but 60% test accuracy. What happened?',
      options: [
        'A) The tree found the perfect rules',
        'B) The tree memorized the training data (overfitting)',
        'C) You need more training data',
        'D) Decision trees can\'t work on this problem'
      ],
      correct: 1,
      feedback: 'A very deep tree creates highly specific rules that match training data exactly but don\'t generalize. This is classic OVERFITTING. Limit depth with max_depth parameter.'
    },
    {
      q: 'To prevent overfitting in decision trees, you should:',
      options: [
        'A) Increase max_depth',
        'B) Decrease min_samples_leaf',
        'C) Limit max_depth and increase min_samples_leaf',
        'D) Add more features'
      ],
      correct: 2,
      feedback: 'Limiting depth prevents overly specific rules. Requiring more samples per leaf ensures each rule is based on enough data. Both reduce overfitting.'
    },
    {
      q: 'Your tree shows this rule: "IF tenure > 12 AND support_tickets > 0 THEN high_churn_risk"\n\nWhat does this demonstrate?',
      options: [
        'A) Tenure causes churn',
        'B) The tree found an INTERACTION between features',
        'C) You should remove the tenure feature',
        'D) The tree is too simple'
      ],
      correct: 1,
      feedback: 'Trees automatically discover INTERACTIONS. This rule says: high tenure ALONE isn\'t risky, but high tenure WITH support tickets IS. Logistic regression can\'t find this without manual feature engineering.'
    },
    {
      q: 'A Random Forest uses 100 trees. How does it make predictions?',
      options: [
        'A) Uses the deepest tree',
        'B) Uses the first tree trained',
        'C) Each tree votes, majority wins (or averages probabilities)',
        'D) Uses a weighted average based on tree accuracy'
      ],
      correct: 2,
      feedback: 'Random Forest is an ENSEMBLE. Each tree sees a random subset of data and features, then all trees vote. This reduces overfitting because individual tree errors cancel out.'
    },
    {
      q: 'Random Forest generally outperforms a single decision tree because:',
      options: [
        'A) It uses more memory',
        'B) Individual tree errors are averaged out',
        'C) It trains faster',
        'D) It uses deeper trees'
      ],
      correct: 1,
      feedback: 'Each tree overfits in different ways (different random subsets). When combined, the errors tend to cancel out, leaving the true signal. This is the "wisdom of crowds" effect.'
    },
    {
      q: 'Your Random Forest feature importances show:\n\ntenure_months: 0.35\nsupport_tickets: 0.30\nlogins: 0.20\nnps_score: 0.15\n\nWhat does 0.35 for tenure mean?',
      options: [
        'A) Tenure explains 35% of churn',
        'B) Tenure is used in 35% of tree splits (weighted by improvement)',
        'C) 35% of churners have high tenure',
        'D) Removing tenure would reduce accuracy by 35%'
      ],
      correct: 1,
      feedback: 'Feature importance measures how much each feature contributes to reducing impurity (making predictions better) across all trees. Higher = more useful for splitting.'
    },
    {
      q: 'Compared to logistic regression, Random Forest:',
      options: [
        'A) Is always more accurate',
        'B) Provides clearer coefficient interpretation',
        'C) Handles feature interactions automatically',
        'D) Requires less data'
      ],
      correct: 2,
      feedback: 'Random Forest finds interactions without manual engineering. But you lose interpretability—there are no coefficients to explain. Trade-off: accuracy vs. explainability.'
    },
    {
      q: 'A PM asks: "Why did the model flag Customer X as high risk?"\n\nWith Random Forest, the best answer is:',
      options: [
        'A) "The coefficients for their features are high"',
        'B) "I can provide a local explanation (e.g., SHAP) showing which features pushed this customer\'s risk up"',
        'C) "No explanation is possible with Random Forests"',
        'D) "Random Forests are fully transparent without extra tools"'
      ],
      correct: 1,
      feedback: 'Random Forests are less transparent than a single tree, but not a black box with zero explainability. Use local explanation tools (like SHAP) for per-customer rationale plus global importances for portfolio trends.'
    },
    {
      q: 'When should you choose a single Decision Tree over Random Forest?',
      options: [
        'A) When you need maximum accuracy',
        'B) When you need to explain the exact decision logic to stakeholders',
        'C) When you have lots of data',
        'D) When features have interactions'
      ],
      correct: 1,
      feedback: 'Single trees are INTERPRETABLE—you can draw the flowchart and explain each decision. Use them when stakeholders need to understand and trust the logic, even if accuracy is slightly lower.'
    },
    {
      q: 'Your Random Forest has:\nTraining AUC: 0.95\nTest AUC: 0.91\n\nIs this concerning?',
      options: [
        'A) Yes, the model is overfitting badly',
        'B) No, a small gap (0.04) is normal for Random Forests',
        'C) Yes, test AUC should be higher than training',
        'D) Can\'t tell without more information'
      ],
      correct: 1,
      feedback: 'A gap of ~0.04 is acceptable. Random Forests typically have a small train/test gap because the ensemble averaging reduces overfitting. Gaps > 0.10 would be more concerning.'
    },
    {
      q: 'You must choose between:\n- Single Decision Tree: AUC 0.78, easy to explain\n- Random Forest: AUC 0.84, harder to explain\n\nWrite a 2-sentence recommendation for an executive audience. Include when you\'d pick each.',
      type: 'short',
      expected: 'Random Forest is better if prediction quality is priority. Single Tree is better when transparent, auditable logic is required. Final choice depends on business constraints (compliance, trust, intervention cost).',
      feedback: 'Mature ML choices are trade-offs, not absolutes. The best model depends on context, not leaderboard score alone.'
    }
  ];

  return buildQuizForm(title, desc, questions);
}
