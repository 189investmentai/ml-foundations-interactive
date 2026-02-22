# Explain-It Exercise Rubric

Use this rubric to grade the "Explain It" PM update exercises at the end of each lab.

## Scoring: 1-5 Scale

### 5 - Excellent
- Clearly states the business problem and why it matters
- Explains model approach in plain English (no jargon)
- Includes specific metrics with business context
- Mentions limitations or next steps
- Stakeholder could act on this update

**Example signal:** "Our churn model identifies 45% of actual churners in the top 500 predictions. This means if the retention team calls those 500 customers, we expect to reach ~225 at-risk customers vs. 60 with random selection (3.8x lift)."

---

### 4 - Good
- States the business problem
- Explains approach clearly
- Includes metrics
- Minor gaps in business context or actionability

**Example signal:** "The model has 72% AUC and 45% precision at 500. We can use it to prioritize retention calls."

---

### 3 - Satisfactory
- Mentions the problem
- Some explanation of approach
- Metrics present but not contextualized
- Missing clear next steps

**Example signal:** "We built a churn model. AUC is 0.72. Precision is 45%."

---

### 2 - Needs Improvement
- Vague problem statement
- Technical jargon without explanation
- Metrics without context
- Unclear what to do with results

**Example signal:** "The logistic regression model achieves an AUC-ROC of 0.72 with hyperparameters C=1.0."

---

### 1 - Incomplete
- Missing key components
- Pure technical output without business translation
- Copy-paste of code output
- No actionable insight

**Example signal:** "AUC: 0.72. Done."

---

## Evaluation Checklist

For each submission, check:

| Criterion | Points | Notes |
|-----------|--------|-------|
| **Problem Statement** | /1 | Is the business problem clear? |
| **Approach Explanation** | /1 | Would a PM understand the method? |
| **Metrics with Context** | /1 | Are numbers meaningful to stakeholders? |
| **Limitations/Caveats** | /1 | Honest about what the model can't do? |
| **Actionability** | /1 | Clear what to do next? |
| **Total** | /5 | |

---

## Module-Specific Focus

| Module | Key Element to Check |
|--------|---------------------|
| 01 Problem Framing | 7-line template completed correctly |
| 02 Logistic Regression | Coefficient interpretation in business terms |
| 03 Decision Trees | Tree rules explained as business logic |
| 04 Boosting | Overfitting prevention explained |
| 05 Features | Feature engineering rationale |
| 06 Evaluation | Threshold choice justified by business constraint |
| 07 Clustering | Segments named and actionable |
| 08 Embeddings | Similarity search use case clear |
| 09 Transformers | LLM limitation acknowledged |
| 10 Agents | Guardrails explained |

---

## Sample Feedback Templates

### For score 5:
"Excellent work! Your explanation clearly connects the model performance to business impact. The retention team can act on this immediately."

### For score 3:
"Good start. To improve: translate the AUC metric into business terms - what does 0.72 mean for the retention team's daily work?"

### For score 1-2:
"This reads like technical output rather than a stakeholder update. Try the format: 'We built [approach] to solve [problem]. It achieves [metric in business terms]. Next step: [action].'"
