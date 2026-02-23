# Capstone Grading Rubric

## Overview

**Total Points:** 100
- 90+: Distinction (exceeds expectations)
- 70-89: Pass (meets expectations)
- <70: Revise and resubmit

---

## Part 1: Problem Framing (20 points)

### 5 - Excellent (18-20 pts)
- All 7 lines completed with specific, actionable answers
- Target includes clear time window (30 days)
- Success metric aligns with constraint (Precision@500)
- Action is concrete (call top 500, offer discount)
- Baseline calculated correctly with clear reasoning

### 4 - Good (14-17 pts)
- Most lines completed correctly
- Minor gaps (e.g., vague success metric)
- Baseline calculated but interpretation weak

### 3 - Satisfactory (10-13 pts)
- Template filled but some answers generic
- Missing time window or unclear target
- Baseline present but calculation has errors

### 2 - Needs Work (5-9 pts)
- Multiple lines incomplete or incorrect
- Wrong task type or irrelevant success metric
- No baseline calculation

### 1 - Insufficient (0-4 pts)
- Template largely empty
- Fundamental misunderstanding of problem

---

## Part 2: Feature Engineering (20 points)

### 5 - Excellent (18-20 pts)
- 3+ meaningful engineered features
- Each feature has clear business logic
- Complete leakage audit with reasoning
- No features use future information
- Features show creativity (interactions, trends)

### 4 - Good (14-17 pts)
- 3 features created
- Leakage audit complete
- Features are reasonable but standard

### 3 - Satisfactory (10-13 pts)
- 2 features created
- Partial leakage audit
- Features are basic (just ratios)

### 2 - Needs Work (5-9 pts)
- Only 1 feature or features don't make sense
- No leakage audit
- Possible leakage in features

### 1 - Insufficient (0-4 pts)
- No feature engineering
- Clear leakage present
- Uses churn_date or cancel_reason as features

---

## Part 3: Model Training (20 points)

### 5 - Excellent (18-20 pts)
- Both models trained correctly
- Proper train/val/test split (with stratification)
- Early stopping implemented
- Overfitting checked and discussed
- Hyperparameters are reasonable

### 4 - Good (14-17 pts)
- Both models trained
- Early stopping used
- Minor issues (e.g., no stratification)

### 3 - Satisfactory (10-13 pts)
- Models trained but only train/test split
- No early stopping
- Some overfitting present

### 2 - Needs Work (5-9 pts)
- Only one model trained
- Severe overfitting (train AUC >> test AUC)
- No validation set

### 1 - Insufficient (0-4 pts)
- Models don't run
- Fundamental errors in training

---

## Part 4: Evaluation (20 points)

### 5 - Excellent (18-20 pts)
- Precision@K calculated correctly
- Lift calculated and interpreted
- Business impact in dollars
- Clear comparison table
- Recommendation justified with trade-offs

### 4 - Good (14-17 pts)
- Precision@K present
- Business impact calculated
- Comparison table present
- Minor interpretation gaps

### 3 - Satisfactory (10-13 pts)
- Uses AUC but not Precision@K
- Business impact attempted
- Comparison incomplete

### 2 - Needs Work (5-9 pts)
- Only reports accuracy
- No business metrics
- No comparison to baseline

### 1 - Insufficient (0-4 pts)
- No evaluation metrics
- Uses training set for final evaluation

---

## Part 5: Communication (20 points)

### 5 - Excellent (18-20 pts)
- Clear, concise PM update (150-250 words)
- Business metrics prominently featured
- Specific recommendation with reasoning
- Concrete next steps
- Appropriate tone (no jargon)

### 4 - Good (14-17 pts)
- Complete PM update
- Includes key metrics
- Recommendation present
- Minor issues (too technical, vague next steps)

### 3 - Satisfactory (10-13 pts)
- PM update attempted
- Missing specific numbers
- Generic recommendation

### 2 - Needs Work (5-9 pts)
- Very brief or very long
- Focuses on technical details
- No actionable recommendation

### 1 - Insufficient (0-4 pts)
- No PM update
- Completely off-topic

---

## Bonus Points (up to +10)

- Customer segmentation with named segments: +3
- Threshold sensitivity analysis: +2
- Feature importance interpretation: +2
- Multiple model comparison beyond LR/LightGBM: +2
- Deployment considerations (latency, retraining): +1

---

## Optional Add-On: Impact Validation & Monitoring (+5 to +10)

Complete `capstone_impact_validation_addon.ipynb` for additional bonus points:

| Criterion | Points | Description |
|-----------|--------|-------------|
| Experiment Design | +3 | Clear hypothesis, randomization, duration, guardrails |
| Break-Even / Uplift | +2 | Correct calculation, understands risk vs uplift |
| Monitoring Plan | +3 | Specific checks, thresholds, retrain triggers |
| PM Update (Add-On) | +2 | Communicates validation + monitoring plan |

**Scoring:**
- +10: Excellent across all criteria
- +7-9: Strong in most areas, minor gaps
- +5-6: Meets basic requirements
- <5: Incomplete or significant errors

---

## Common Deductions

| Issue | Deduction |
|-------|-----------|
| Data leakage in features | -10 |
| Using test set for validation | -5 |
| No early stopping with boosting | -3 |
| Accuracy instead of Precision@K | -5 |
| No baseline comparison | -5 |
| PM update > 500 words | -2 |
| Technical jargon in PM update | -2 |
| Code doesn't run | -10 |

---

## Feedback Templates

### Pass with Distinction
"Excellent work! Your problem framing clearly connects ML to business action, and your evaluation correctly uses Precision@500 to match the capacity constraint. The PM update effectively communicates value without technical jargon. Consider adding [improvement area] to make this even stronger."

### Pass
"Good job completing all required elements. Your model training and evaluation are solid. To improve: [specific feedback]. The PM update could be strengthened by [specific suggestion]."

### Needs Revision
"Your submission shows understanding of the concepts but has critical issues that need addressing: [list issues]. Please revise [specific sections] and resubmit. Focus particularly on [most important fix]."
