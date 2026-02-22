# Module 2: Typeform Scenarios

---

## Scenario 1: Reading Coefficients

**Setup:**
You trained a logistic regression model to predict churn. Here are the coefficients:

```
tenure_months:           -0.15
support_tickets_30d:     +0.72
logins_last_7d:          -0.38
days_since_last_order:   +0.05
```

**Question:** Which feature is the strongest predictor of churn?

**Options:**
- A) tenure_months (-0.15)
- B) support_tickets_30d (+0.72)
- C) logins_last_7d (-0.38)
- D) days_since_last_order (+0.05)

**Correct Answer:** B

**Decision Receipt:**
The coefficient magnitude tells you how strongly a feature influences the prediction. `support_tickets_30d` at +0.72 has the largest absolute value, making it the strongest predictor. The positive sign means more tickets = higher churn risk. Note: this assumes features are on similar scales. If not, you'd need to standardize before comparing.

---

## Scenario 2: Interpreting Direction

**Setup:**
Same model as above. A new customer has these values:
- tenure_months: 12
- support_tickets_30d: 0
- logins_last_7d: 5
- days_since_last_order: 7

**Question:** Based on the coefficients, what's the overall signal for this customer?

**Options:**
- A) High churn risk—the model would predict a high probability
- B) Low churn risk—the model would predict a low probability
- C) Can't tell without the actual calculation
- D) 50/50—the signals cancel out

**Correct Answer:** B

**Decision Receipt:**
Let's trace through: tenure is high (12 × -0.15 = -1.8, pushing toward "stay"). Support tickets are 0 (0 × 0.72 = 0, neutral). Logins are solid (5 × -0.38 = -1.9, pushing toward "stay"). Days since order is short (7 × 0.05 = 0.35, slight churn signal). Net: strong "stay" signal. This customer looks safe.

---

## Scenario 3: When to Use Logistic Regression

**Setup:**
You're building a churn model for a startup. You have:
- 2,000 subscribers
- 8 features
- Need to explain predictions to the CEO

**Question:** Which approach should you try first?

**Options:**
- A) XGBoost—it's state of the art for tabular data
- B) Neural network—deep learning is more powerful
- C) Logistic regression—simple, interpretable, good for small data
- D) Random forest—good balance of power and simplicity

**Correct Answer:** C

**Decision Receipt:**
With only 2,000 examples, complex models risk overfitting. Logistic regression has fewer parameters, handles small data well, and gives interpretable coefficients—perfect for explaining to the CEO. Start simple. If logistic regression underperforms, then try random forest or boosting.

---

## Scenario 4: The Baseline Question

**Setup:**
Your logistic regression model achieves 0.68 AUC on the test set. Your manager says "That's not good enough, we need at least 0.80."

**Question:** What's the right response?

**Options:**
- A) Switch to XGBoost immediately—it will definitely hit 0.80
- B) Ask what the baseline is—0.68 might actually be good
- C) Add more features—the model needs more information
- D) The model is broken—0.68 is always bad

**Correct Answer:** B

**Decision Receipt:**
AUC is relative to the difficulty of the problem. If churn is nearly random (base rate 50%, no patterns), 0.68 is actually impressive. If there are strong signals and other teams get 0.85, then 0.68 is weak. Always compare to baselines: random (0.50), simple heuristics, and what's achievable in your domain. 0.80 isn't a magic threshold.

---

## Scenario 5: Probability vs. Decision

**Setup:**
Your model outputs these churn probabilities for 5 customers:
- Customer A: 0.73
- Customer B: 0.51
- Customer C: 0.48
- Customer D: 0.82
- Customer E: 0.65

You can only send retention offers to 2 customers.

**Question:** Which customers should get offers?

**Options:**
- A) A and D (highest probabilities)
- B) A and B (above 0.50 threshold)
- C) B and C (closest to 0.50—most persuadable)
- D) D and E (mix of high and medium risk)

**Correct Answer:** A

**Decision Receipt:**
With limited capacity, target the highest-risk customers. A (0.73) and D (0.82) have the highest probabilities. The 0.50 threshold is arbitrary—what matters is relative ranking when you have constraints. Option C's logic (persuadability) is interesting but requires different data (lift from intervention), not raw churn probability.

---

## Scenario 6: Feature Correlation Problem

**Setup:**
You add both `logins_last_7d` and `logins_last_30d` to your model. After training, you notice:
- `logins_last_7d` coefficient: +0.15 (more logins = MORE churn?)
- `logins_last_30d` coefficient: -0.45 (more logins = less churn)

This seems contradictory.

**Question:** What's most likely happening?

**Options:**
- A) The model is broken—retrain it
- B) Multicollinearity—the features are too correlated
- C) 7-day logins actually do predict churn
- D) You need more training data

**Correct Answer:** B

**Decision Receipt:**
When two features are highly correlated (7-day and 30-day logins obviously overlap), logistic regression struggles to assign separate weights. The coefficients become unstable and can flip signs. This is multicollinearity. Fix: drop one feature, or combine them (e.g., `logins_7d_ratio = logins_7d / logins_30d`).

---

## Scoring Summary

**6/6 correct:** Solid understanding. Ready for the lab.

**4-5/6 correct:** Good foundation. Review coefficient interpretation.

**<4/6 correct:** Re-read the micro-lesson, especially the "Reading Coefficients" section.
