# Capstone Project: StreamCart AI Assistant

**Estimated Time:** 8-12 hours (can be spread across multiple sessions)

**Prerequisites:** Completion of Modules 0-20

---

## Overview

You'll build an end-to-end ML-powered customer support assistant for StreamCart, our fictional e-commerce subscription service. This project integrates concepts from the entire course:

- **Supervised Learning**: Churn prediction model
- **Feature Engineering**: Customer behavior features
- **Evaluation**: Business-aligned metrics
- **Embeddings & Retrieval**: Knowledge base search
- **LLM Integration**: Response generation
- **Guardrails**: Safety and quality checks

---

## The Business Problem

StreamCart's support team is overwhelmed. They need an AI assistant that can:

1. **Predict customer risk** - Identify at-risk customers before they contact support
2. **Search help articles** - Find relevant documentation quickly
3. **Generate responses** - Draft helpful, accurate replies
4. **Ensure quality** - Avoid hallucinations and unsafe content

Your goal: Build a prototype that demonstrates all four capabilities.

---

## Datasets

You'll work with four StreamCart datasets (provided):

### 1. `streamcart_customers.csv`
Customer-level features for churn prediction.

| Column | Description |
|--------|-------------|
| customer_id | Unique identifier |
| tenure_months | Months as customer |
| subscription_tier | basic, premium, enterprise |
| monthly_spend | Average monthly spend |
| support_tickets_90d | Tickets in last 90 days |
| last_purchase_days | Days since last purchase |
| engagement_score | Product usage score (0-100) |
| churned | Target: 1 if churned, 0 if active |

### 2. `streamcart_events.csv`
User behavior events for feature engineering.

| Column | Description |
|--------|-------------|
| customer_id | Customer identifier |
| event_type | login, purchase, support_contact, etc. |
| timestamp | Event timestamp |
| metadata | JSON with event details |

### 3. `streamcart_tickets.csv`
Support tickets for retrieval and response generation.

| Column | Description |
|--------|-------------|
| ticket_id | Ticket identifier |
| customer_id | Customer who submitted |
| category | billing, technical, general, shipping |
| subject | Ticket subject |
| message | Customer message |
| resolution | How ticket was resolved |

### 4. `streamcart_products.csv`
Product catalog for context.

| Column | Description |
|--------|-------------|
| product_id | Product identifier |
| name | Product name |
| category | Product category |
| price | Current price |
| description | Product description |

---

## Deliverables

### Part 1: Churn Prediction Model (30%)

Build a model to predict customer churn.

**Requirements:**
- [ ] Exploratory data analysis
- [ ] Feature engineering from events data
- [ ] Train at least 2 model types (e.g., logistic regression, gradient boosting)
- [ ] Proper train/validation/test split (avoid leakage!)
- [ ] Evaluation with business-aligned metrics (precision@k, expected value)
- [ ] Threshold selection with cost analysis

**Deliverable:** Model that outputs churn probability for each customer.

### Part 2: Knowledge Base Retrieval (25%)

Build a retrieval system for help articles.

**Requirements:**
- [ ] Create embeddings for tickets/resolutions
- [ ] Implement semantic search
- [ ] Evaluate with Recall@K and MRR
- [ ] Handle edge cases (no relevant results)

**Deliverable:** Function that returns top-k relevant tickets given a query.

### Part 3: Response Generation (25%)

Build an LLM-powered response generator.

**Requirements:**
- [ ] RAG pipeline: retrieve context → generate response
- [ ] Effective prompting (system prompt, few-shot examples)
- [ ] Use customer context (churn risk, tier, history)
- [ ] Output structured response with confidence

**Deliverable:** Function that generates customer response given query and context.

### Part 4: Guardrails & Evaluation (20%)

Ensure your system is production-ready.

**Requirements:**
- [ ] Input validation (length, injection detection)
- [ ] Output filtering (PII, safety)
- [ ] Faithfulness checking
- [ ] Human review triggers
- [ ] End-to-end evaluation on test cases

**Deliverable:** Complete pipeline with safety checks and evaluation metrics.

---

## Milestones

### Milestone 1: Data Exploration & Baseline (2-3 hours)
- Load and explore all datasets
- Identify data quality issues
- Build a simple baseline churn model
- Calculate baseline retrieval metrics

### Milestone 2: Feature Engineering & Model (2-3 hours)
- Engineer features from events data
- Build and tune churn model
- Select optimal threshold
- Document feature importance

### Milestone 3: Retrieval System (2-3 hours)
- Create ticket embeddings
- Build retrieval function
- Evaluate retrieval quality
- Handle edge cases

### Milestone 4: Response Generation & Integration (2-3 hours)
- Build RAG pipeline
- Implement guardrails
- Integrate all components
- End-to-end testing

---

## Evaluation Criteria

Your capstone will be evaluated on:

### Technical Quality (40%)
- Code is clean, documented, and runs without errors
- Appropriate techniques chosen for each task
- Proper evaluation methodology (no leakage, correct metrics)

### Business Alignment (30%)
- Models and thresholds optimized for business value
- Trade-offs clearly articulated
- Realistic assumptions documented

### Completeness (20%)
- All four parts implemented
- Edge cases handled
- Tests included

### Communication (10%)
- Clear explanations of approach
- Visualizations support the narrative
- Executive summary included

---

## Submission

Your submission should include:

1. **Jupyter Notebook** (`capstone_submission.ipynb`)
   - All code with explanations
   - Visualizations and analysis
   - Final results and metrics

2. **Executive Summary** (in notebook or separate)
   - 500-word summary for stakeholders
   - Key findings and recommendations
   - Business impact estimate

3. **Self-Assessment**
   - Rubric with your self-scores
   - Reflection on what you learned

---

## Tips for Success

### Do
- Start with the data exploration
- Build incrementally (baseline → improved)
- Test each component before integrating
- Document your decisions and trade-offs
- Ask "what would production look like?"

### Don't
- Skip data exploration
- Use all data for training (remember test sets!)
- Ignore edge cases
- Forget to evaluate against business metrics
- Over-engineer the solution

---

## Resources

- All course notebooks for reference
- Interactive playgrounds for experimentation
- Module cheatsheets for quick reference

---

## Getting Started

1. Open `capstone_starter.ipynb`
2. Load the datasets
3. Follow the milestone structure
4. Refer to course materials as needed

Good luck! This project demonstrates that you can build end-to-end ML systems that solve real business problems.
