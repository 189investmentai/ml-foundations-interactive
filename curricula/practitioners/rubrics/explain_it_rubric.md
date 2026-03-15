# Explain-It Exercise Rubric (Practitioners)

Use this rubric to grade the "Explain It" stakeholder update exercises at the end of each lab. Practitioners must bridge technical implementation with business context so PMs and leaders can make decisions.

## Scoring: 1-5 Scale

### 5 - Excellent
- Technical explanation AND business context
- Shows trade-offs explicitly
- Includes specific metrics with units
- Mentions limitations
- Stakeholder could make a decision from this

**Example signal:** "We trained a LightGBM churn model with 72% AUC. At top-500, we capture 45% of actual churners (3.8x lift vs random). Trade-off: we tuned for recall because missing at-risk customers costs more than extra calls. Limitation: model doesn't capture recent support escalations. Recommend: add ticket sentiment as a feature in v2."

---

### 4 - Good
- Clear explanation with metrics
- Minor gaps in business translation or trade-off discussion

**Example signal:** "Logistic regression with L2 regularization (C=1.0) achieves 0.72 AUC. Precision at 500 is 45%. We can use this to prioritize retention outreach. Consider adding more features for improvement."

---

### 3 - Satisfactory
- Technical content present but not translated
- Metrics without context
- No trade-offs

**Example signal:** "We built a churn model using logistic regression. AUC is 0.72. Precision at 500 is 45%. Feature importance: tenure, LTV, last_purchase_days."

---

### 2 - Needs Improvement
- Jargon-heavy, no business context
- Metrics dumped without interpretation

**Example signal:** "The logistic regression model achieves an AUC-ROC of 0.72 with hyperparameters C=1.0. We used sklearn's StandardScaler and 80/20 train-test split."

---

### 1 - Incomplete
- Raw output pasted
- No explanation
- No actionable insight

**Example signal:** "AUC: 0.72. Precision: 0.45. Done."

---

## Evaluation Checklist

| Criterion | Points | Notes |
|-----------|--------|-------|
| Technical Accuracy | /1 | Is the explanation correct? |
| Business Translation | /1 | Would a PM understand? |
| Metrics with Context | /1 | Numbers meaningful? |
| Trade-offs & Limitations | /1 | Honest about what model can't do? |
| Actionability | /1 | Clear recommendation? |
| **Total** | **/5** | |

---

## Module-Specific Focus

| Module | Key Element to Check |
|--------|---------------------|
| 03 Linear Regression | Coefficient interpretation, R² meaning |
| 04 Logistic Regression | Threshold choice, probability calibration |
| 05 Decision Trees | Feature importance, interpretability |
| 06 Ensembles | Bias-variance trade-off explained |
| 07 Optimization | Learning rate choice justified |
| 08 Regression Metrics | MAE vs RMSE choice explained |
| 09 Classification Metrics | Precision/recall trade-off for use case |
| 10 Feature Engineering | Feature rationale, leakage prevention |
| 11 Regularization | L1 vs L2 choice justified |
| 12 Embeddings | Similarity metric choice |
| 13 Clustering | Cluster count justified, segments actionable |
| 14 Retrieval | Retrieval quality metrics explained |
| 15 Neural Networks | Architecture choice justified |
| 16 CNNs | Architecture decisions explained |
| 17 Transformers | Context window trade-offs |
| 18 LLM Fundamentals | Prompt vs RAG vs fine-tune decision |
| 19 Tool Calling | Error handling strategy |
| 20 Agent Memory | Memory architecture trade-offs |
| 21 Guardrails | Safety measures justified |
| 22 MLOps | Reproducibility approach |
| 23 Monitoring | Drift detection strategy |

---

## Sample Feedback Templates

### For score 5:
"Excellent - your explanation bridges the technical implementation with business impact. A PM could act on this."

### For score 4:
"Strong work. To reach excellent: add one explicit trade-off or limitation so stakeholders understand the boundaries of the solution."

### For score 3:
"Solid technical content, but needs business translation. Try: 'This means [business impact] because [technical reason].'"

### For score 2:
"Too much jargon for a stakeholder update. Translate each technical term into its business consequence. What does the PM need to know to decide?"

### For score 1-2:
"This reads like code output. Try the template: 'We did [what] to solve [problem]. Result: [metric in business terms]. Recommended next step: [action].'"
