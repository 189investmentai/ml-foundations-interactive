# Capstone Grading Rubric

Use this rubric for self-assessment and peer review.

---

## Part 1: Churn Prediction Model (30 points)

### Data Exploration (5 points)

| Score | Criteria |
|-------|----------|
| 5 | Thorough EDA with insights; data quality issues identified and addressed |
| 4 | Good exploration; most issues identified |
| 3 | Basic exploration; some issues missed |
| 2 | Minimal exploration |
| 1 | No meaningful exploration |

### Feature Engineering (8 points)

| Score | Criteria |
|-------|----------|
| 8 | Creative, well-engineered features from events; clear rationale; no leakage |
| 6-7 | Good features; minor issues or limited creativity |
| 4-5 | Basic features; some leakage risk or poor rationale |
| 2-3 | Minimal feature engineering |
| 0-1 | No feature engineering or major leakage |

### Model Development (10 points)

| Score | Criteria |
|-------|----------|
| 9-10 | Multiple models compared; proper validation; hyperparameter tuning; clear winner selection |
| 7-8 | Good model comparison; mostly proper methodology |
| 5-6 | Basic modeling; some methodology issues |
| 3-4 | Single model; significant issues |
| 0-2 | Model doesn't work or major errors |

### Business Metrics & Threshold (7 points)

| Score | Criteria |
|-------|----------|
| 7 | Clear cost analysis; threshold optimized for business value; trade-offs articulated |
| 5-6 | Good threshold selection; some cost analysis |
| 3-4 | Basic threshold; limited business alignment |
| 1-2 | Arbitrary threshold; no business consideration |
| 0 | No threshold analysis |

---

## Part 2: Knowledge Base Retrieval (25 points)

### Embedding Implementation (8 points)

| Score | Criteria |
|-------|----------|
| 8 | Effective embedding approach; handles text well; appropriate model/method choice |
| 6-7 | Good embeddings; minor issues |
| 4-5 | Basic embeddings work; suboptimal choices |
| 2-3 | Embeddings partially work |
| 0-1 | Embeddings don't work |

### Retrieval Quality (10 points)

| Score | Criteria |
|-------|----------|
| 9-10 | High Recall@K and MRR; retrieves relevant results consistently |
| 7-8 | Good retrieval; some edge cases fail |
| 5-6 | Acceptable retrieval; inconsistent quality |
| 3-4 | Poor retrieval quality |
| 0-2 | Retrieval doesn't work |

### Edge Case Handling (7 points)

| Score | Criteria |
|-------|----------|
| 7 | Handles no-match, ambiguous queries, and out-of-domain gracefully |
| 5-6 | Handles most edge cases |
| 3-4 | Some edge case handling |
| 1-2 | Minimal edge case consideration |
| 0 | No edge case handling |

---

## Part 3: Response Generation (25 points)

### RAG Pipeline (10 points)

| Score | Criteria |
|-------|----------|
| 9-10 | Clean RAG implementation; retrieval integrated with generation; context used effectively |
| 7-8 | Good RAG pipeline; minor issues |
| 5-6 | Basic RAG works; integration issues |
| 3-4 | Partial RAG implementation |
| 0-2 | RAG doesn't work |

### Prompt Engineering (8 points)

| Score | Criteria |
|-------|----------|
| 8 | Excellent prompts; system prompt, few-shot examples, clear instructions; responses are helpful |
| 6-7 | Good prompts; mostly effective |
| 4-5 | Basic prompts; inconsistent results |
| 2-3 | Minimal prompting effort |
| 0-1 | Poor or no prompting |

### Context Utilization (7 points)

| Score | Criteria |
|-------|----------|
| 7 | Uses customer context (churn risk, tier, history) to personalize responses |
| 5-6 | Some context usage |
| 3-4 | Limited context usage |
| 1-2 | Minimal context |
| 0 | No context utilization |

---

## Part 4: Guardrails & Evaluation (20 points)

### Input Validation (5 points)

| Score | Criteria |
|-------|----------|
| 5 | Comprehensive input validation; injection detection; length limits; PII handling |
| 4 | Good validation; most attacks blocked |
| 3 | Basic validation |
| 2 | Minimal validation |
| 1 | No validation |

### Output Safety (5 points)

| Score | Criteria |
|-------|----------|
| 5 | Output filtering; PII redaction; safety checks; hallucination mitigation |
| 4 | Good output safety |
| 3 | Basic safety checks |
| 2 | Minimal output safety |
| 1 | No output safety |

### Evaluation Framework (5 points)

| Score | Criteria |
|-------|----------|
| 5 | Multiple evaluation dimensions; test cases; metrics tracked |
| 4 | Good evaluation |
| 3 | Basic evaluation |
| 2 | Minimal evaluation |
| 1 | No evaluation |

### Human Review Integration (5 points)

| Score | Criteria |
|-------|----------|
| 5 | Clear triggers for human review; queue implementation; appropriate thresholds |
| 4 | Good review triggers |
| 3 | Basic review mechanism |
| 2 | Minimal review consideration |
| 1 | No human review |

---

## Bonus Points (up to 10)

| Bonus | Criteria |
|-------|----------|
| +3 | Exceptional creativity in approach |
| +3 | Production-ready code quality |
| +2 | Novel evaluation metrics |
| +2 | Comprehensive documentation |

---

## Score Interpretation

| Total | Grade | Description |
|-------|-------|-------------|
| 90-100+ | A | Exceptional - production-ready work |
| 80-89 | B | Strong - minor improvements needed |
| 70-79 | C | Satisfactory - several areas for improvement |
| 60-69 | D | Below expectations - significant gaps |
| <60 | F | Incomplete - major components missing |

---

## Self-Assessment Template

Copy this template into your submission:

```
## Self-Assessment

### Part 1: Churn Prediction (X/30)
- Data Exploration: X/5
- Feature Engineering: X/8
- Model Development: X/10
- Business Metrics: X/7

Reflection: [What went well? What would you improve?]

### Part 2: Retrieval (X/25)
- Embeddings: X/8
- Retrieval Quality: X/10
- Edge Cases: X/7

Reflection: [...]

### Part 3: Response Generation (X/25)
- RAG Pipeline: X/10
- Prompt Engineering: X/8
- Context Usage: X/7

Reflection: [...]

### Part 4: Guardrails (X/20)
- Input Validation: X/5
- Output Safety: X/5
- Evaluation: X/5
- Human Review: X/5

Reflection: [...]

### Total: X/100

### Key Learnings:
1. [...]
2. [...]
3. [...]
```
