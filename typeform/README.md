# Quiz Scenario Content

This folder contains the **source-of-truth question content** for all 10 module quizzes.

> **Recommended delivery:** Use the Google Apps Script in `../google_forms/` to auto-generate
> free Google Forms quizzes. See `../google_forms/README.md` for setup instructions.

## Files

| File | Module | Questions |
|------|--------|-----------|
| `01_problem_framing.md` | ML Problem Framing | 12 |
| `02_logistic_regression.md` | Logistic Regression | 12 |
| `03_decision_trees.md` | Decision Trees & Random Forests | 12 |
| `04_boosting.md` | Gradient Boosting | 12 |
| `05_feature_engineering.md` | Feature Engineering | 12 |
| `06_evaluation.md` | Model Evaluation | 12 |
| `07_clustering.md` | Clustering & Segmentation | 12 |
| `08_embeddings.md` | Embeddings & Similarity | 12 |
| `09_transformers_llms.md` | Transformers & LLMs | 12 |
| `10_agents.md` | AI Agents | 12 |

**Total: 120 questions**

## How to Deploy as Google Forms (free)

See `../google_forms/README.md` for full instructions. Quick version:

1. Go to [script.google.com](https://script.google.com) → New project
2. Paste the `.gs` files from `../google_forms/`
3. Run `createAllQuizzes()` — creates all 10 forms with answer keys + feedback
4. Share form links via Notion course hub

## Question Distribution

Each module contains:
- 11 Multiple Choice questions (decision-focused)
- 1 Short Answer question (explain rationale, usually near the end)
- Clear correct answer marked
- Decision receipt explaining WHY the answer is correct

## Design Principles

1. **Scenario-Based:** Questions present realistic workplace situations
2. **Decision-Focused:** "What should you do?" not "What is the definition of..."
3. **Immediate Feedback:** Decision receipts explain reasoning, not just "correct/incorrect"
4. **Business Context:** All scenarios use the StreamCart e-commerce case company
