# Capstone Project: StreamCart Retention System

## The Scenario

You've just been hired as the first ML practitioner at StreamCart, a subscription e-commerce company. The VP of Customer Success calls you into a meeting:

> "We're losing customers faster than we can acquire them. Our retention team can make 500 outbound calls per week to offer personalized discounts, but they're basically calling people at random. Can you help us be smarter about who we call?"

Your mission: Build an end-to-end ML system that identifies which customers to call.

---

## What You'll Build

This capstone ties together everything you've learned:

| Module | Capstone Application |
|--------|---------------------|
| 01: Problem Framing | Define the ML task, target, and success metric |
| 02: Logistic Regression | Build an interpretable baseline |
| 03: Decision Trees | Explore feature interactions |
| 04: Boosting | Train a production-grade model |
| 05: Feature Engineering | Create predictive signals from raw data |
| 06: Evaluation | Choose the right threshold for 500 calls |
| 07: Clustering | Segment customers for campaign targeting |
| 08-10: (Bonus) | Add similarity search or explain decisions |

---

## Deliverables

### Required (Pass/Fail)

1. **Framing Document** - Complete the 7-line ML problem framing template
2. **Feature Engineering** - Create at least 3 meaningful derived features
3. **Model Training** - Train at least 2 models (baseline + advanced)
4. **Evaluation** - Report Precision@500, Lift, and business impact
5. **Recommendation** - Write a 200-word PM update recommending action

### Bonus (Distinction)

- Customer segmentation with actionable segment profiles
- Model comparison table with trade-off analysis
- Threshold sensitivity analysis
- Feature importance interpretation

### Optional Extension: Impact Validation & Monitoring

Want to go further? Complete [capstone_impact_validation_addon.ipynb](capstone_impact_validation_addon.ipynb) after finishing the main capstone. You'll:

1. Design an A/B test or holdout experiment to prove the model actually reduces churn
2. Calculate break-even thresholds and understand why risk ≠ uplift
3. Write a production monitoring plan

This add-on is graded separately (+5 to +10 bonus points) and is recommended if you want to understand how ML models prove business impact.

---

## Constraints

- **Runtime:** Must run top-to-bottom in <15 minutes on free Colab
- **Libraries:** pandas, numpy, sklearn, lightgbm only (no custom installs)
- **Data:** Use the provided StreamCart dataset
- **Capacity:** Retention team can call exactly 500 customers/week

---

## Grading Rubric

| Criterion | Points | Description |
|-----------|--------|-------------|
| Problem Framing | 20 | Clear target, prediction point, features, action |
| Feature Engineering | 20 | Meaningful features, no leakage |
| Model Quality | 20 | Proper train/val/test, early stopping, no overfitting |
| Evaluation | 20 | Correct metrics, comparison to baseline |
| Communication | 20 | Clear PM update, business-oriented |

**Total: 100 points**
- 90+: Distinction
- 70-89: Pass
- <70: Revise and resubmit

---

## Timeline

Estimated completion: 2-3 hours

1. **Part 1: Framing & Data** (30 min) - Understand the problem and data
2. **Part 2: Feature Engineering** (45 min) - Create predictive features
3. **Part 3: Modeling** (45 min) - Train and tune models
4. **Part 4: Evaluation & Deployment** (30 min) - Choose threshold, measure impact
5. **Part 5: Communication** (30 min) - Write PM update

---

## Getting Started

Open `capstone_project.ipynb` and follow the instructions. Each section has:
- Context explaining what you're doing and why
- TODO blocks for you to complete
- Self-check cells to verify your work
- Hints if you get stuck

Good luck! This is your chance to prove you can deliver real ML value.
