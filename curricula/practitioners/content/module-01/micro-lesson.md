# Module 1: The ML Map - Where Things Break

**Time:** 25-35 minutes

**Promise:** After this module, you'll see the entire ML pipeline and understand where most bugs occur.

---

## The Setup

You've been asked to "use ML" to predict customer churn. You've heard of XGBoost and want to jump straight to training.

**Stop.**

Most ML projects fail not because of model choice, but because of upstream problems:
- Wrong problem definition
- Bad data
- Leaky features
- Wrong evaluation metric

This module gives you the map. Every other module fills in the details.

---

## The ML Pipeline

Every ML project follows this flow:

```
Problem → Data → Features → Split → Train → Evaluate → Deploy
```

**Most bugs live at the boundaries.** Not in the model.

---

## Stage 1: Problem Framing 🎯

### What You Decide

- **Target variable:** What exactly are you predicting?
- **Prediction timing:** When do you need the answer?
- **Granularity:** Per-user? Per-transaction? Per-day?
- **Error costs:** Is a false positive or false negative worse?

### What Breaks

| Mistake | Example | Consequence |
|---------|---------|-------------|
| Vague target | "Predict churn" without defining churn | Model can't be evaluated |
| Wrong timing | Predict churn after they've already left | Useless predictions |
| Wrong granularity | User-level when you need daily | Can't act on predictions |
| Ignored costs | Treat all errors equally | Suboptimal decisions |

### Self-Check

> "If this model were perfect, what decision would I make differently?"

If you can't answer this, your problem isn't well-defined.

---

## Stage 2: Data Collection 📊

### What You Need

- **Features:** Information available at prediction time
- **Labels:** Ground truth for training
- **Enough samples:** Statistical power for the patterns
- **Representative data:** Matches production distribution

### What Breaks

| Mistake | Example | Consequence |
|---------|---------|-------------|
| Leaky features | Using future data | Overly optimistic evaluation |
| Label errors | Wrong churn definition | Wrong model behavior |
| Too few samples | 50 positives | Unreliable patterns |
| Biased sample | Only recent users | Doesn't generalize |

### Self-Check

> "For each feature, would I have this value BEFORE making the prediction?"

---

## Stage 3: Feature Engineering 🔧

### What You Build

- **Encodings:** Categories → numbers
- **Aggregations:** Counts, sums, averages
- **Recency features:** Days since last X
- **Derived features:** Ratios, differences

### What Breaks

| Mistake | Example | Consequence |
|---------|---------|-------------|
| Leaky aggregation | Average including future | Data leakage |
| Wrong window | Lifetime vs. recent 30 days | Signal mismatch |
| Missing values | NaN handled wrong | Model confusion |
| Multicollinearity | total_spend + avg_spend + n_orders | Unstable coefficients |

### Self-Check

> "Is this feature computed using ONLY data available at prediction time?"

---

## Stage 4: Train/Test Split ✂️

### What You Do

- Split data into train, validation, test sets
- **Time-based** for temporal data (most common)
- **Random** only for cross-sectional snapshots
- **Stratified** to maintain class balance

### What Breaks

| Mistake | Example | Consequence |
|---------|---------|-------------|
| Random split on time data | Split transactions randomly | Leakage via patterns |
| Peeking at test set | Tuning on test data | Overfitting to test |
| Not stratifying | 5% positive → 0% in validation | Unreliable metrics |

### Self-Check

> "Does my test set simulate true future data that the model won't see?"

---

## Stage 5: Model Training 🏋️

### What You Do

- Start with a baseline (heuristic, then simple model)
- Choose algorithm based on problem type
- Tune hyperparameters on validation set
- Use cross-validation for robust estimates

### What Breaks

| Mistake | Example | Consequence |
|---------|---------|-------------|
| No baseline | Jump to XGBoost | Can't measure value added |
| Overfitting | Tree with 10,000 leaves | Train >> Test gap |
| Underfitting | Logistic on XOR pattern | Low train accuracy |
| Tuning on test | Hyperparameter search on test | Biased estimate |

### Self-Check

> "What's my baseline? How much better is the model?"

---

## Stage 6: Evaluation 📈

### What You Measure

- **Primary metric:** Matches business objective
- **Secondary metrics:** Other important properties
- **Sliced metrics:** Performance by segment
- **Calibration:** Probability accuracy

### What Breaks

| Mistake | Example | Consequence |
|---------|---------|-------------|
| Wrong metric | Accuracy on 5% churn | Misleading result |
| No slices | Overall OK, fails on VIPs | Hidden failure |
| No baseline | "AUC 0.75!" vs. "Heuristic is 0.73" | Unknown value |
| Overfit to test | Run evaluation 100 times | Biased estimate |

### Self-Check

> "Does this metric translate to business value? Have I beaten a reasonable baseline?"

---

## Stage 7: Deployment 🚀

### What You Do

- Set decision threshold
- Build inference pipeline
- Set up monitoring
- Plan for retraining

### What Breaks

| Mistake | Example | Consequence |
|---------|---------|-------------|
| Fixed threshold | Always use 0.5 | Suboptimal decisions |
| No monitoring | No drift detection | Silent failures |
| No feedback loop | Never see outcomes | Can't improve |
| Data drift | COVID changes behavior | Model degrades |

### Self-Check

> "How will I know if this model is failing in production?"

---

## The Key Insight

**90% of ML bugs are not about models.**

They're about:
1. Wrong problem definition
2. Data leakage
3. Wrong metric
4. Poor evaluation

Learn to debug the pipeline, not just the algorithm.

---

## Practice

### Before You Continue

Open the **Interactive Playground** (`playground_ml_pipeline.html`):

1. Click each stage to understand what happens there
2. Try the "Data Leakage" scenario — see which stages turn red
3. Try "Wrong Metric" — notice the problem is upstream
4. Try "Overfitting" — it's a training stage problem

### Key Observations

- Most failures cascade downstream
- Fix upstream problems first
- The model is usually not the issue

---

## Quick Reference

### The Universal Debugging Flow

1. **Check the problem definition:** Is the target right?
2. **Check for leakage:** Any future data in features?
3. **Check the split:** Time-based if temporal?
4. **Check baseline:** Beating heuristics?
5. **Check the metric:** Matches business value?
6. **Check slices:** Any hidden failures?
7. **Then** look at the model

---

## Done Checklist

- [ ] Explored the ML Pipeline playground
- [ ] Tried all failure scenarios
- [ ] Understand where most bugs occur
- [ ] Know the self-check questions for each stage
