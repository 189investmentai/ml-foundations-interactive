# Module 2: Your First Prediction Model

**Time:** 60-90 minutes  
**Prerequisites:** Module 1 (Problem Framing)

---

## The Setup

You've framed the problem. You know you want to predict which subscribers will churn in the next 30 days so you can send them retention offers. You've defined your label, picked your features, and chosen precision@500 as your metric.

Now what?

You need a model—something that takes customer data and outputs a probability. And here's the thing: the simplest model that could possibly work is often the right place to start.

That model is logistic regression. It's not sexy. It won't win Kaggle competitions. But it's interpretable, fast, and surprisingly effective for a lot of business problems. Before you reach for XGBoost, you should understand what logistic regression does and why it works.

**The question we're answering:** How do I turn customer features into a churn probability?

---

## The Mental Model

### The Analogy

Imagine a scale—the old-fashioned kind with two sides.

On the left side, you pile up evidence that a customer will churn: they haven't logged in recently, they've filed support tickets, they skipped their last box.

On the right side, you pile up evidence they'll stay: long tenure, high engagement, good NPS score.

The scale tips toward whichever side has more evidence. If it tips hard left, churn probability is high. Tips hard right, probability is low. Perfectly balanced, it's 50/50.

That's logistic regression. Each feature adds or subtracts weight. The model learns how much weight each feature should have by looking at historical examples.

### The Picture

```
                     EVIDENCE SCALE
                          
    CHURN SIGNALS                    STAY SIGNALS
    ─────────────                    ────────────
                          ▲
    [support_tickets: +2.3]         [tenure: -1.8]
    [days_inactive: +1.5]           [nps_score: -0.9]  
    [items_skipped: +0.8]           [logins_7d: -0.6]
                          │
                   ═══════╪═══════
                          │
                    ┌─────┴─────┐
                    │   TIPS    │
                    │   LEFT    │
                    └───────────┘
                          │
                          ▼
                    P(churn) = 0.73
                    
    The weights (coefficients) determine how much each 
    feature contributes. Positive = tips toward churn.
    Negative = tips toward staying.
```

---

## How It Actually Works

### From Features to Probability

Logistic regression does this in two steps:

**Step 1: Add up the weighted evidence**

```
score = (weight₁ × feature₁) + (weight₂ × feature₂) + ... + bias
```

For our churn example:
```
score = (2.3 × support_tickets) + (1.5 × days_inactive) + (-1.8 × tenure) + ...
```

If a customer has 3 support tickets, 14 days inactive, and 8 months tenure:
```
score = (2.3 × 3) + (1.5 × 14) + (-1.8 × 8) + ...
score = 6.9 + 21 - 14.4 + ...
score = 13.5 + (other features)
```

**Step 2: Convert score to probability**

The score can be any number (positive, negative, huge). We need a probability between 0 and 1.

The sigmoid function does this conversion:

```
probability = 1 / (1 + e^(-score))
```

You don't need to memorize the formula. Just know:
- Large positive score → probability near 1 (will churn)
- Large negative score → probability near 0 (won't churn)
- Score near 0 → probability near 0.5 (coin flip)

```
SIGMOID CURVE

probability
    1.0 ─────────────────────────────────██████
    0.9                              ████
    0.8                           ███
    0.7                         ██
    0.6                       ██
    0.5 ──────────────────────█─────────────────
    0.4                      ██
    0.3                    ██
    0.2                  ███
    0.1              ████
    0.0 ██████████████
       -6  -4  -2   0   2   4   6  → score
       
    The S-curve squashes any score into [0, 1]
```

### What the Model Learns

When you train logistic regression, you're not writing rules. You're letting the model learn the weights from data.

The training process:
1. Start with random weights
2. For each training example, predict probability
3. Compare prediction to actual outcome (did they churn?)
4. Adjust weights to reduce error
5. Repeat thousands of times

After training, you have weights that (hopefully) capture the relationship between features and churn.

### Reading the Coefficients

This is where logistic regression shines. The weights tell you something meaningful.

**Example output:**
```
Feature                  Coefficient
─────────────────────────────────────
support_tickets_30d      +0.85
days_since_last_login    +0.12
tenure_months            -0.25
nps_score                -0.31
items_skipped_3mo        +0.44
```

What this tells you:
- `support_tickets_30d` has a positive coefficient → more tickets = higher churn risk
- `tenure_months` has a negative coefficient → longer tenure = lower churn risk
- The magnitude matters: support tickets (+0.85) matter more than items skipped (+0.44)

**Caution:** Don't over-interpret coefficients without normalization. If `tenure_months` ranges from 1-60 and `support_tickets` ranges from 0-3, the raw coefficients aren't directly comparable. Most libraries let you standardize features to make comparisons fair.

---

## When to Use Logistic Regression

### Good fit when:

**You need interpretability.** Stakeholders want to know why. "The model says they'll churn because they have 4 support tickets and haven't logged in for 3 weeks" is something a PM can act on.

**You have limited data.** Logistic regression has fewer parameters to learn than complex models. It won't overfit as easily on small datasets (<10K examples).

**You want a baseline.** Always start here. If logistic regression gets 0.72 AUC and XGBoost gets 0.74, is that extra complexity worth it?

**Features are roughly linear.** If the relationship between "days inactive" and churn risk is roughly proportional (more inactive = more risk, steadily), logistic regression captures it well.

### Not ideal when:

**Complex interactions matter.** "High tenure + recent support ticket" has different meaning than either alone. Logistic regression misses these unless you manually create interaction features.

**Non-linear patterns exist.** If churn risk spikes for customers with exactly 2-4 months tenure (new enough to leave, established enough to know what they're missing), logistic regression won't capture the bump without feature engineering.

**You have tons of data.** With 1M+ examples and hundreds of features, more complex models often win.

### The decision heuristic

```
WHEN TO USE LOGISTIC REGRESSION?

Start here: ──► Logistic Regression
                     │
                     ▼
              Does it work?
             (beats baseline,
              metric acceptable)
                     │
            ┌────────┴────────┐
            │                 │
           YES               NO
            │                 │
            ▼                 ▼
     Ship it, or         Try trees/boosting
     use as baseline     (Module 3-4)
```

---

## The StreamCart Example

### Setting up the model

```python
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

# Our features (from Module 1 framing)
features = [
    'tenure_months',
    'logins_last_7d',
    'logins_last_30d', 
    'support_tickets_last_30d',
    'items_skipped_last_3_boxes',
    'nps_score'
]

X = df[features].fillna(0)  # Handle missing NPS scores
y = df['churn_30d']

# Split: 80% train, 20% test
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train
model = LogisticRegression()
model.fit(X_train, y_train)
```

### Getting predictions

```python
# Predict probabilities
probabilities = model.predict_proba(X_test)[:, 1]

# Look at a specific customer
customer_idx = 0
print(f"Customer features: {X_test.iloc[customer_idx].to_dict()}")
print(f"Churn probability: {probabilities[customer_idx]:.2%}")
```

Output:
```
Customer features: {'tenure_months': 4, 'logins_last_7d': 1, 
                   'logins_last_30d': 5, 'support_tickets_last_30d': 2,
                   'items_skipped_last_3_boxes': 1, 'nps_score': 6}
Churn probability: 67.3%
```

### Reading the coefficients

```python
# See what the model learned
for feature, coef in zip(features, model.coef_[0]):
    direction = "↑ churn" if coef > 0 else "↓ churn"
    print(f"{feature:30} {coef:+.3f}  ({direction})")
```

Output:
```
tenure_months                  -0.089  (↓ churn)
logins_last_7d                 -0.234  (↓ churn)
logins_last_30d                -0.045  (↓ churn)
support_tickets_last_30d       +0.412  (↑ churn)
items_skipped_last_3_boxes     +0.287  (↑ churn)
nps_score                      -0.156  (↓ churn)
```

**Interpretation:** Support tickets matter most (+0.412). Recent logins are protective (-0.234). This matches intuition—engaged customers with no complaints are less likely to leave.

---

## What Goes Wrong

### Mistake 1: Expecting magic from a simple model

**Symptom:** "Logistic regression only got 0.71 AUC, so I need a better algorithm."

**Reality:** Maybe 0.71 is as good as it gets with your features. Before blaming the algorithm, check:
- Are your features actually predictive?
- Is there signal in the data at all?
- What's the baseline (random guessing)?

**Fix:** Compare to baselines. If random is 0.50 AUC and logistic regression is 0.71, you're capturing real signal. A fancier model might squeeze out 0.73-0.75, but the features are the limit.

### Mistake 2: Ignoring feature scale

**Symptom:** One feature dominates and coefficients seem off.

**Example:** `revenue_ltv` ranges from 0-50000, while `support_tickets` ranges from 0-5. The coefficient for revenue will be tiny (because multiplying big numbers) and look unimportant.

**Fix:** Standardize features before training:

```python
from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
```

Now coefficients are comparable.

### Mistake 3: Treating probabilities as decisions

**Symptom:** "The model says 51% churn, so we should target them."

**Reality:** 51% isn't meaningfully different from 49%. You need a threshold strategy.

**Fix:** Think in terms of your action. If you can contact 500 people, take the top 500 scores—don't just target everyone above 50%.

### Mistake 4: Multicollinearity confusion

**Symptom:** Adding a feature makes the model worse, or coefficients flip signs unexpectedly.

**Example:** You add both `logins_last_7d` and `logins_last_30d`. They're highly correlated. The model gets confused about which one matters.

**Fix:** Check correlations between features. If two are >0.8 correlated, consider dropping one or combining them.

---

## Linear Regression (Brief Aside)

Everything above applies to logistic regression (predicting yes/no, outputting probability). 

**Linear regression** is the simpler cousin—it predicts a continuous number without the sigmoid transformation.

```
Logistic regression: P(churn) = sigmoid(weighted sum) → probability [0, 1]
Linear regression:   LTV = weighted sum → any number
```

Use linear regression when predicting amounts: revenue, days until churn, lifetime value, support ticket volume.

The interpretation is even simpler: coefficients directly tell you "for each unit increase in X, Y changes by this much."

---

## Practice

### 1. Build (Colab Lab)
→ [Link to Colab notebook]

**What you'll do:** 
- Train a logistic regression model on StreamCart data
- Interpret the coefficients
- Compare predictions for different customer profiles
- Calculate precision@500 and compare to random baseline

**Time:** ~20 minutes

---

### 2. Decide (Scenario Quiz)
→ [Link to Typeform]

**What you'll do:** 6 scenarios about model interpretation, coefficient reading, and when to use logistic regression vs. alternatives.

**Time:** ~10 minutes

---

### 3. Debug (Find the Bug)
→ [Link to debug Colab]

**What you'll do:** A model has bizarre coefficients (tenure increases churn?). Find out why and fix it.

**Time:** ~15 minutes

---

### 4. Explain (Stakeholder Update)

**The prompt:**  
Your PM asks: "Why are we using such a simple model? Shouldn't we use AI?"

Write a 4-5 sentence Slack message explaining why logistic regression is a good starting point and when you'd consider upgrading.

**What good looks like:**
- Acknowledges the question without being defensive
- Explains the benefits (interpretability, baseline, not overkill)
- Mentions when you WOULD use something more complex
- Avoids jargon

---

## Cheat Sheet

→ [Download: Module 2 Cheat Sheet (PDF)](#)

---

## Done?

- [ ] Read the micro-lesson
- [ ] Completed the scenario quiz  
- [ ] Ran the Colab lab
- [ ] Fixed the debug drill
- [ ] Wrote the stakeholder update

**Next up:** [Module 3: When Linear Isn't Enough](#)
