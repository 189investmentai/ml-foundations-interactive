# Capstone Projects

You've finished the modules. Now pick one track and build something real.

Each track takes 4-6 hours and results in a portfolio-ready project. You'll use everything you learned—framing, modeling, evaluation, and stakeholder communication.

---

## Track 1: Churn Targeting Model

**The scenario:**

StreamCart's retention team can contact 500 at-risk subscribers per week. Currently, they pick randomly from anyone who hasn't ordered in 30+ days. They want a model that identifies the 500 most likely to cancel so they can offer retention deals before it's too late.

**What you'll build:**

An end-to-end churn prediction system that:
- Frames the problem correctly (14-day or 30-day prediction window)
- Engineers features from subscriber behavior data
- Compares at least 2 model approaches (logistic regression vs. gradient boosting)
- Evaluates using precision@500 (not just AUC)
- Recommends a threshold for production deployment

**The dataset:**

Extended StreamCart data with 20,000 subscribers, 6 months of history, and these additional fields:
- Email open/click history
- Product preferences
- Referral source
- Payment method

**Required deliverables:**

1. **7-line framing document** — Clearly define the problem, action, label, features, metric, and constraints

2. **Feature engineering notebook** — Create at least 10 features, document your reasoning, show which ones matter

3. **Model comparison** — Train and evaluate at least 2 approaches. Show learning curves, feature importance, and precision@k curves

4. **Threshold analysis** — What score cutoff gives you exactly 500 users? How does precision change at different thresholds?

5. **Executive summary** (300 words max) — What did you build, how well does it work, and what should the retention team do next?

**What good looks like:**

- Precision@500 of 2.5x or higher vs. random baseline (if base churn is 10%, you should hit 25%+ in top 500)
- Clear explanation of why you chose your features (and which ones you rejected)
- Honest assessment of model limitations
- Actionable recommendation, not just "the model works"

---

## Track 2: Semantic Support Assistant

**The scenario:**

StreamCart's support team handles 200 tickets per day. Many questions are already answered in the help center, but customers don't search effectively—they write "my box didn't arrive" instead of searching "shipping status." 

The team wants a tool that takes an incoming ticket and finds the 3 most relevant help center articles to suggest to the customer (or use as an answer template for agents).

**What you'll build:**

A semantic search system that:
- Embeds help center articles into vector space
- Takes a customer question and retrieves relevant articles
- Evaluates retrieval quality on a test set
- Handles edge cases (questions with no good match)

**The dataset:**

- 50 help center articles (shipping, billing, returns, products, account management)
- 100 test tickets with human-labeled relevant articles
- Sample customer questions covering common issues

**Required deliverables:**

1. **Problem framing document** — Why is this an ML problem? What's the action? How do you define "relevant"?

2. **Embedding strategy** — Which model did you use? Why? What alternatives did you consider?

3. **Retrieval system notebook** — Code that takes a question and returns top 3 articles with similarity scores

4. **Evaluation** — On the 100 test tickets, what's your top-3 hit rate? What's mean reciprocal rank?

5. **Error analysis** — Show 5 failure cases. Why did they fail? What would fix them?

6. **Executive summary** (300 words max) — How well does this work? What should the support team expect? What's the rollout recommendation?

**What good looks like:**

- Top-3 hit rate of 60% or higher (relevant article appears in top 3 for 60%+ of tickets)
- Clear explanation of embedding model tradeoffs (speed, quality, cost)
- Honest error analysis with specific examples
- Practical deployment recommendation (auto-suggest vs. agent tool vs. chatbot)

---

## Track 3: Offer Copy Assistant

**The scenario:**

StreamCart sends retention offers to at-risk subscribers, but the emails are generic. They want personalized copy that references the customer's history—their favorite products, how long they've been a member, what they last ordered.

They've tried ChatGPT but it sometimes invents product names, makes up discounts that don't exist, or sounds too salesy. They need guardrails.

**What you'll build:**

An LLM-powered system that:
- Takes customer context and generates personalized retention email copy
- Has guardrails against hallucinated products, prices, and policies
- Stays on-brand (friendly but professional, not pushy)
- Fails gracefully when unsure

**The inputs:**

For each customer, you have:
- Name, tenure, subscription tier
- Top 3 purchased products
- Last order date
- Current retention offer ($10, $20, or free box)

**Required deliverables:**

1. **Problem framing document** — Why prompting vs. RAG vs. fine-tuning? What's the action? What does success look like?

2. **Prompt design** — Your system prompt, customer context injection, and output format specification

3. **Guardrails implementation** — How do you catch hallucinated products? How do you enforce brand voice? What happens when confidence is low?

4. **Evaluation notebook** — Generate 20 sample emails. Rate each on accuracy (facts correct), tone (on-brand), and personalization (uses context)

5. **Failure mode analysis** — Show 3 examples where the system failed or almost failed. What triggered it? How did guardrails help (or not)?

6. **Executive summary** (300 words max) — Is this ready for production? What human oversight is needed? What's the risk?

**What good looks like:**

- 80%+ of generated copy is factually accurate and on-brand
- Clear guardrail logic (not just "I added a system prompt")
- Honest assessment of where it fails and why
- Realistic deployment plan with human-in-the-loop recommendation

---

## Rubric (All Tracks)

Each deliverable is scored 1-5 on five dimensions:

| Dimension | 1 (Poor) | 3 (Acceptable) | 5 (Excellent) |
|-----------|----------|----------------|---------------|
| **Framing** | No clear problem statement | Problem stated but action vague | Clear 7-line framing; action directly tied to prediction |
| **Correctness** | Major errors (leakage, broken code, wrong approach) | Minor issues, core logic sound | Clean implementation, edge cases handled |
| **Evaluation** | Wrong metric or no evaluation | Appropriate metric, basic baseline | Business-aligned metric, threshold analysis, honest limitations |
| **Business Relevance** | Technical exercise only | Mentions business context | Quantifies impact, actionable recommendation |
| **Clarity** | Disorganized, hard to follow | Readable, some structure | Clear narrative, would share with stakeholder |

**Scoring:**

- **20-25 points:** Excellent work. Portfolio-ready.
- **15-19 points:** Good work. Minor improvements needed.
- **10-14 points:** Acceptable. Revisit weak areas.
- **<10 points:** Needs significant revision.

---

## Submission Guidelines

**What to submit:**
- All notebooks (runnable, with outputs visible)
- Framing document and executive summary
- Any additional documentation

**Format:**
- Share as Google Colab links or GitHub repo
- Executive summary as PDF or Google Doc

**Optional: Graded Review ($99)**

Submit your capstone for written feedback:
- Detailed comments on each rubric dimension
- Specific suggestions for improvement
- One round of revision feedback included
- Turnaround: 5 business days

---

## Which Track Should You Choose?

**Choose Track 1 (Churn Model) if:**
- You want classic supervised ML experience
- You're interested in marketing/growth roles
- You want the most "traditional" ML portfolio piece

**Choose Track 2 (Semantic Search) if:**
- You're interested in NLP and embeddings
- You want to work on search/recommendations
- You prefer a more modern ML stack

**Choose Track 3 (LLM Guardrails) if:**
- You're most interested in LLMs and generative AI
- You want experience with prompt engineering
- You're comfortable with more ambiguity (LLMs are less predictable)

All three are valid portfolio pieces. Pick based on what you want to learn more about or what's most relevant to your target role.
