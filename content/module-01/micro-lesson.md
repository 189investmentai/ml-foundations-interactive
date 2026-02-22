# Module 1: Is This Even an ML Problem?

**Time:** 60-90 minutes  
**Prerequisites:** None

---

## The Setup

Your VP walks into the room. "Churn is up 15%. We need a machine learning model to fix it."

Sounds reasonable. But here's what happens next in most companies: a data scientist disappears for three months, builds something impressive-looking, and then... nothing. The model sits unused. The churn rate doesn't budge. Everyone's frustrated.

Why? Because nobody stopped to ask the basic questions. What does "fix churn" actually mean? What decision will this model inform? What data do we have? What does success look like?

This module is about those questions. Before you build anything, before you write a single line of code, you need to frame the problem correctly. Get this wrong and no algorithm can save you. Get it right and sometimes you realize you don't even need ML.

**The question we're answering:** How do I know if this is an ML problem, and how do I frame it so it actually gets used?

---

## The Mental Model

### The Analogy

Think of ML as hiring a new employee and training them by showing examples of past decisions.

"Here's a customer who churned. Here's one who didn't. Here's another churner. Here's a loyal customer. Now—look at this new customer. What do you think they'll do?"

The employee learns patterns from examples. They can't follow explicit rules you give them (that's traditional programming). They can't know things you don't show them. And if you show them misleading examples—say, labeled incorrectly, or with information that wouldn't exist in the real world—they'll learn the wrong patterns.

This is exactly what ML does. Show it examples, it learns patterns, it makes predictions on new cases.

So the question becomes: Can I show it good examples? And will its predictions lead to useful actions?

### When ML Is Overkill

Before reaching for ML, ask these questions:

| Question | If yes... |
|----------|-----------|
| Do I have fewer than ~100 labeled examples? | Start with rules. ML needs data to learn. |
| Does a simple rule already achieve 90%+ of the value? | Keep the rule. Complexity has costs. |
| Is the pattern fixed and won't change? | Write the rule explicitly. ML is for patterns that drift. |
| Do I need 100% accuracy? | ML won't give you that. Consider rule-based systems with human review. |

**The heuristic:** Start with the simplest thing that works. Add ML when rules hit their ceiling and you have data to learn from.

### The Picture

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│   BUSINESS PROBLEM         ML TASK              ACTION           │
│   "Reduce churn"    →    "Predict who will   →  "Send offer     │
│                           churn in 30 days"      to top 500"     │
│                                                                  │
│         │                      │                     │           │
│         ▼                      ▼                     ▼           │
│                                                                  │
│   ┌─────────────┐       ┌─────────────┐       ┌─────────────┐   │
│   │   LABEL     │       │ PREDICTION  │       │  OUTCOME    │   │
│   │ "Did they   │       │ "73% likely │       │ "Customer   │   │
│   │  cancel?"   │       │  to churn"  │       │  stayed"    │   │
│   └─────────────┘       └─────────────┘       └─────────────┘   │
│                                                                  │
│   This is what you       This is what the      This is what      │
│   teach the model        model outputs         matters to        │
│                                                the business      │
└──────────────────────────────────────────────────────────────────┘
```

The model doesn't "reduce churn." It predicts who might churn so you can take action. If there's no action you can take, or if the prediction doesn't improve your action, the model is useless.

---

## How It Actually Works

### The 7-Line Framing Template

Before anyone builds anything, fill this out. If you can't, you're not ready.

| Line | Question | What it means |
|------|----------|---------------|
| 1. Problem | What business outcome are we trying to improve? | The thing the CEO cares about |
| 2. Action | What will we DO with the prediction? | No action = no point in predicting |
| 3. Prediction | What exactly does the model output? | Be precise—probability? Score? Category? |
| 4. Label | How do we define this in historical data? | This is what you train on |
| 5. Features | What info is available at prediction time? | Only stuff you'd know BEFORE the outcome |
| 6. Metric | How do we measure if the model helps? | Tie to the action, not just accuracy |
| 7. Constraints | What limits exist in production? | Latency, legal, data freshness, etc. |

Let's walk through each one.

---

### Line 1: The Business Problem

"Reduce churn" is not specific enough. Reduce it by how much? Over what time period? For which customers?

Better: "Reduce monthly subscriber churn rate from 8% to 6%."

Even better: "Reduce voluntary churn (excludes payment failures) among subscribers in their first 90 days."

The more specific, the better. Vague problems lead to vague solutions.

---

### Line 2: The Action

This is where most ML projects die. Someone builds a model but nobody knows what to do with it.

Ask: "If the model tells us Customer X has high churn risk, what will we actually DO?"

Possible actions:
- Send a retention offer
- Trigger a customer success call
- Show different onboarding content
- Adjust pricing
- Do nothing (if cost of action > benefit)

If you can't name the action, stop. You don't need ML yet. You need a decision about what you'd do with the information.

---

### Line 3: The Prediction

Be painfully specific.

Bad: "Predict churn"

Good: "Predict the probability that a subscriber cancels their subscription within the next 30 days"

Why does precision matter?
- "Churn" could mean cancel, pause, go dormant, reduce plan, not open emails...
- "Next 30 days" is different from "next 7 days" or "ever"
- "Probability" is different from "yes/no classification"

The prediction must match the action. If you can only act 2 weeks before someone churns, a 30-day prediction might be too early.

---

### Line 4: The Label

Here's where things get tricky. The label is how you define the outcome in your historical data. It's what you teach the model.

If your prediction is "cancel within 30 days," your label should be: "Did this customer cancel within 30 days of [some snapshot date]?"

Common mistakes:
- **Label doesn't match prediction:** You want to predict future churn but label based on "ever churned"
- **Label is too broad:** "Inactive" (no login) vs. "Churned" (canceled subscription)—very different
- **Label window is wrong:** 30-day prediction but 7-day label

The label is the most important decision you'll make. Get it wrong and your model optimizes for the wrong thing.

---

### Line 5: The Features

Features are the inputs to your model. The information it uses to make predictions.

Critical rule: **You can only use information that exists BEFORE the prediction is made.**

Sounds obvious. It's not.

Example of leakage:
- You're predicting 30-day churn
- You include the feature "cancellation_reason"
- But cancellation_reason only exists AFTER someone cancels
- Your model learns "if cancellation_reason = 'too expensive', then churn = true"
- In production, you don't have this feature yet
- Model breaks

More subtle leakage:
- "Support ticket text contains 'cancel'" — does this ticket exist before you make the prediction?
- "Days until subscription ends" — does the customer know their end date before you predict?
- "Number of orders in prediction month" — if you predict on day 1, you don't know this yet

Always ask: "At the moment I make this prediction, would this information exist?"

---

### Line 6: The Metric

Don't default to accuracy. Match the metric to the action.

**Scenario 1: Retention offers (limited budget)**
You can afford to call 500 customers per week. You don't care about overall accuracy. You care about: "Of the 500 I call, how many would actually churn?"

That's **precision@500**. Or equivalently, lift@500 (how much better than random?).

**Scenario 2: Fraud detection (can't miss fraud)**
Missing a fraudster is expensive. You'd rather review extra legitimate transactions than miss fraud.

That's **recall**. Of all the fraudsters, what percentage did you catch?

**Scenario 3: Real-time scoring (latency matters)**
A model with 0.95 AUC but 2-second latency might be worse than 0.80 AUC with 50ms latency if you need to score at checkout.

That's **AUC + latency**. Business constraints are part of the metric.

---

### Line 7: Constraints

Production is different from a notebook. What limits exist?

- **Latency:** Real-time fraud detection needs <100ms. Batch churn prediction can take hours.
- **Data freshness:** Can you use yesterday's data? Last hour? Last month?
- **Privacy:** Can you use location? Age? Payment method? Check with legal.
- **Interpretability:** Does a human need to explain why this customer was flagged?
- **Volume:** How many predictions per day/hour/second?

Don't ignore these. Many models work great in notebooks and fail in production because of constraints nobody thought about.

---

## The StreamCart Examples

### Example 1: Churn Retention Offers

StreamCart wants to reduce churn by sending $20 retention offers. They can afford 1,000 offers per week. Let's fill out the template.

| Line | Answer |
|------|--------|
| 1. Problem | Reduce voluntary churn rate from 8% to 6% among first-year subscribers |
| 2. Action | Send $20 retention offer via email |
| 3. Prediction | Probability of voluntary cancellation in next 14 days |
| 4. Label | 1 if subscription_status changed to "canceled" (not "payment_failed") within 14 days of snapshot |
| 5. Features | tenure_months, logins_last_14d, support_tickets_last_30d, items_skipped_last_3_boxes, nps_score |
| 6. Metric | Precision@1000 (of top 1000 scores, how many would actually churn?) |
| 7. Constraints | Predictions needed by Monday 8am; can't use demographic features (policy); no real-time requirement |

Why 14 days? Because the retention team needs time to send the offer and have it work. A 7-day prediction might be too late.

Why precision@1000? Because they can only send 1000 offers. The model needs to find the 1000 most likely churners, not just rank everyone.

---

### Example 2: Fraud Review Queue

StreamCart's fraud team can review 100 transactions per day. They want to catch the most fraud with that limited capacity.

| Line | Answer |
|------|--------|
| 1. Problem | Reduce fraud losses while keeping review volume at 100/day |
| 2. Action | Flag transaction for manual review |
| 3. Prediction | Probability that transaction is fraudulent |
| 4. Label | 1 if transaction resulted in confirmed chargeback OR was manually flagged as fraud within 60 days |
| 5. Features | order_amount, shipping_billing_mismatch, device_fingerprint, account_age_days, orders_last_24h |
| 6. Metric | Recall@100 (of the top 100 scores, how many actual frauds did we catch?) plus total fraud dollars captured |
| 7. Constraints | Score must return in <200ms (checkout flow); can't use IP address (privacy policy); model must update weekly |

Why recall@100? Because missing fraud is expensive. Of all the fraud that happened, what percentage landed in the top 100 scores?

Why fraud dollars? Because a $500 fraud matters more than a $20 fraud. Might weight by dollar amount.

---

## What Goes Wrong

### Mistake 1: No clear action

**Symptom:** Model is built, nobody uses it.

**Example:** "We predicted customer lifetime value!" Great—what do you do differently for a high-LTV customer vs. low-LTV?

**Fix:** Start with Line 2. If you can't name the action, you're not ready for ML.

---

### Mistake 2: Label leakage

**Symptom:** Incredible test metrics (0.95+ AUC), terrible production performance.

**Example:** A churn model included "cancellation_reason" as a feature. Worked great on historical data where that field was filled in. Useless in production where you're predicting BEFORE cancellation.

**Fix:** For every feature, ask "Would I have this at prediction time?" Assume the answer is no until proven yes.

---

### Mistake 3: Wrong label definition

**Symptom:** Model predicts the wrong thing.

**Example:** You want to predict "will cancel subscription" but your label is "hasn't logged in for 30 days." Those are different! Someone can be inactive but not cancel. Someone can be active and still cancel.

**Fix:** Make sure the label exactly matches the prediction you care about. Validate the label definition with stakeholders before building.

---

### Mistake 4: Metric doesn't match action

**Symptom:** Model improves metrics but not business outcomes.

**Example:** Churn model improves AUC from 0.75 to 0.82. But you can only call 500 customers. Precision@500 went from 35% to 36%. You're catching 5 more churners per week. Worth the effort?

**Fix:** Pick a metric that directly measures the action you'll take. If you can only act on top 500, measure performance on top 500.

---

## Practice

You're not done until you do all four.

### 1. Build (Colab Lab)
→ [Link to Colab notebook]

**What you'll do:** 
- Explore the StreamCart dataset
- Fill out the 7-line template for 2 different problems
- Identify 3 features that would leak the label
- Create a proper label column for churn prediction

**Time:** ~20 minutes  
**Self-checks included:** The notebook will verify your label column and flag if you picked leaky features.

---

### 2. Decide (Scenario Quiz)
→ [Link to Typeform]

**What you'll do:** 6 real scenarios. For each, decide: Is this an ML problem? What's the right framing? Where's the bug in this setup?

**Time:** ~10 minutes

---

### 3. Debug (Find the Bug)
→ [Link to debug Colab]

**What you'll do:** A data scientist framed a churn problem. The model has 0.97 AUC. Something is very wrong. Find the two bugs.

**Hints:**
- One bug is leakage
- One bug is a label definition problem

**Time:** ~15 minutes

---

### 4. Explain (Stakeholder Update)

**The prompt:**  
Your PM asks: "Why can't we just write rules to identify at-risk customers instead of building an ML model?"

Write a 4-5 sentence Slack message explaining when ML adds value over rules, using churn as the example.

**What good looks like:**
- Acknowledges when rules ARE sufficient (simple patterns, small scale)
- Explains when ML helps (complex patterns, many signals, patterns change over time)
- Uses a concrete example from the churn context
- Doesn't oversell ML or dismiss rules

---

## Cheat Sheet

→ [Download: Module 1 Cheat Sheet (PDF)](#)

---

## Done?

- [ ] Read the micro-lesson
- [ ] Completed the scenario quiz  
- [ ] Ran the Colab lab (all self-checks passed)
- [ ] Fixed the debug drill
- [ ] Wrote the stakeholder update

**Next up:** [Module 2: Your First Prediction Model](#)
