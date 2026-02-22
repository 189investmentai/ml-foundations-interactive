# Curriculum Map

## Why 10 modules (not 6, not 20)

I tried different structures. Six modules crammed too much into each one. Twenty felt like homework that never ends. Ten hits the sweet spot—each module has one clear question, and you can finish the whole thing in a month if you do 2-3 per week.

The first six modules cover supervised learning end-to-end. That's where most business value lives. Modules 7-10 branch out into clustering, embeddings, NLP, and LLMs. You can do those in any order after the first six.

---

## Module 1: Is this even an ML problem?

This is where most projects fail—not in the modeling, but in the framing. Someone says "we need ML to reduce churn" and six months later you have a model nobody uses.

**What you'll learn:**
- The difference between problems ML solves and problems that just need a SQL query
- A 7-line template for framing any ML project (problem, action, prediction, label, features, metric, constraints)
- How to spot label leakage before you waste time building

**The StreamCart example:** Marketing wants to "predict churn." But what does that mean? Cancel in 7 days? 30 days? Stop opening emails? You'll work through the actual framing decisions.

**The war story:** A team built a churn model that predicted churn with 0.98 AUC. Incredible, right? Except the model was predicting whether someone *had already churned*—it used features that only existed after cancellation. Useless.

---

## Module 2: Your first prediction model

Logistic regression. Boring? Maybe. But it's the right tool more often than people think, and understanding it makes everything else click.

**What you'll learn:**
- How logistic regression weighs evidence (literally—each feature gets a weight)
- When "just use logistic regression" is the right answer
- How to read coefficients without getting lost in the math

**The StreamCart example:** Predicting which subscribers will accept a retention offer. Logistic regression with 5 features vs. a model that's 10x more complex. Which wins? (Spoiler: the simple one, often.)

**The war story:** A model learned that `customer_id` was the best predictor of churn. Why? Because it memorized which specific customers churned in the training set. Completely useless for new customers.

---

## Module 3: When the pattern isn't a straight line

Decision trees and random forests. This is where ML starts feeling like magic—but it's actually just "if this, then that" stacked a hundred times.

**What you'll learn:**
- How decision trees play "20 questions" to make predictions
- Why single trees overfit and forests don't
- How to read feature importance (and when it lies)

**The StreamCart example:** Some customers churn when they have high tenure AND recent support tickets. Neither feature alone predicts it. Trees catch this interaction automatically.

**The war story:** A tree's first split was "state = Wyoming." The 12 Wyoming customers happened to have 0% churn—by chance. The model treated this random fluke as the most important signal.

---

## Module 4: The models that win Kaggle (and when to use them at work)

Gradient boosting—XGBoost, LightGBM. These win almost every tabular ML competition. But "winning Kaggle" isn't the same as "working in production."

**What you'll learn:**
- The difference between random forests (parallel voters) and boosting (error correctors)
- Which hyperparameters actually matter
- When boosting is overkill

**The StreamCart example:** Fraud detection. XGBoost hits 0.95 AUC. But it takes 45 minutes to score all transactions. The simpler model with 0.88 AUC runs in 20 seconds. Which do you ship?

**The war story:** A team spent two weeks tuning XGBoost to squeeze out 0.01 AUC improvement. The business impact? Zero—they were already above the threshold where more accuracy didn't change any decisions.

---

## Module 5: Features make or break your model

The model is a chef that can't chop its own onions. Feature engineering is the prep work. Get it wrong and no algorithm can save you.

**What you'll learn:**
- The features that almost always help (recency, frequency, tenure)
- How to create features without leaking the future
- Time-based splits (why random splits lie)

**The StreamCart example:** Raw data says "support_ticket_created_at = March 15." Useful feature: "days_since_last_support_ticket." Even more useful: "support_tickets_in_last_30_days." The model can't derive these itself.

**The war story:** A support routing model used the "ticket_category" field—which was filled in by humans *after* reading the ticket. The model was 99% accurate on historical data and 0% useful in production.

---

## Module 6: Is your model actually good?

AUC, precision, recall, F1, confusion matrices. Everyone knows these words. Most people can't answer: "We have 0.82 AUC—should we ship?"

**What you'll learn:**
- Which metric to use (it depends on what you're optimizing)
- How to set thresholds based on business constraints
- Why accuracy is almost always the wrong metric

**The StreamCart example:** Fraud review. You can review 100 transactions per day. What matters isn't overall accuracy—it's precision@100. Of the 100 highest-scored transactions, how many are actually fraud?

**The war story:** A fraud model had 99.2% accuracy. Sounds great. But it predicted "not fraud" for everything. 99.2% of transactions *are* legitimate—so predicting "not fraud" for all of them is technically accurate. And completely useless.

---

## Module 7: Finding patterns without labels

Clustering and anomaly detection. Sometimes you don't know what you're looking for until you find it.

**What you'll learn:**
- How K-means groups customers (and why picking k is hard)
- When to use clustering vs. supervised learning
- Anomaly detection as "what doesn't fit?"

**The StreamCart example:** Marketing wants "customer segments." They can't define them upfront. Clustering reveals three natural groups nobody expected: "power users," "bargain hunters," and "dormant whales" (high LTV but haven't ordered in 6 months).

**The war story:** A team clustered customers and found one cluster was "people in California who signed up in January." Technically a cluster. Operationally meaningless.

---

## Module 8: How machines understand "similar"

Embeddings. This is the bridge from traditional ML to modern AI. Once you get embeddings, everything about LLMs makes more sense.

**What you'll learn:**
- How to represent products/customers/text as vectors
- Why "nearby in embedding space" means "similar"
- Building a similarity search (recommendations, semantic search)

**The StreamCart example:** Customer asks "do you have something like that red dress I bought?" Search can't find "like." But with embeddings, you find items that are semantically similar—even if they don't share keywords.

**The war story:** Semantic search for "red dress" returned "crimson evening gown" (great!) and also "red paint" (oops). Embeddings found "red" but not "clothing." Had to add category filters.

---

## Module 9: Making sense of text

NLP fundamentals and transformers. Most business text is short (tickets, reviews, chat) and transformers are overkill. But you need to understand them to use LLMs effectively.

**What you'll learn:**
- From bag-of-words to attention (the conceptual journey)
- When TF-IDF beats BERT (yes, this happens)
- Pre-trained models: what they give you and what they don't

**The StreamCart example:** Classifying support tickets. 500 labeled examples. Fine-tuned BERT vs. TF-IDF + logistic regression. The simpler approach wins—not enough data for transformers to shine.

**The war story:** A sentiment model learned that "not bad" was negative because "not" usually preceded negative words. Context matters—word-level models miss it.

---

## Module 10: LLMs in production

Prompting, RAG, fine-tuning, hallucinations, guardrails. This is where everyone's head is right now, and most people are doing it wrong.

**What you'll learn:**
- When to prompt vs. RAG vs. fine-tune (there's a simple decision tree)
- How to catch hallucinations before customers do
- Building guardrails that actually work

**The StreamCart example:** Customer support chatbot. It needs to answer questions about refund policies. Do you fine-tune? No—you use RAG with the actual policy documents. Fine-tuning would just hallucinate policies that sound plausible.

**The war story:** A chatbot was asked about refunds. It confidently said "full refund within 90 days, no questions asked." That policy didn't exist. Customers screenshotted it. The company honored 200+ refunds before catching the bug. $50K mistake.

---

## The sequence matters (mostly)

**Must do in order:** Modules 1-6. Each builds on the previous.

**Can do in any order:** Modules 7-10 after completing 1-6. Pick based on what you need.

**The capstone:** Optional. Three tracks depending on what area you want to go deeper. Churn model, semantic search, or LLM guardrails.
