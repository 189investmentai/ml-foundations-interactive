# Appendix: From Model to Business Impact

You built a churn model. It has 0.78 AUC and 3.5x lift@500. Great offline metrics.

But here's the uncomfortable truth: **offline metrics don't prove business impact.** A model that ranks churners correctly might still waste money if those customers would have stayed anyway—or if the intervention doesn't work.

This appendix covers the three topics that bridge "good model" to "proven business value":

1. **Impact Measurement** — How to prove your model actually moved a business metric
2. **Uplift vs. Risk** — Why targeting high-risk customers can backfire
3. **Production Basics** — How to keep your model healthy after launch

---

## Part 1: Impact Measurement

### The Problem with Offline Metrics

Your churn model has precision@500 = 40%. You call those 500 customers. Churn drops.

Did the model cause that? Or would those customers have stayed anyway? Or did something else change (a product update, seasonality, a competitor stumbling)?

**Offline metrics tell you the model ranks well. They don't tell you the intervention works.**

### Online vs. Offline Evaluation

| Evaluation Type | What it measures | Limitation |
|-----------------|------------------|------------|
| **Offline** (train/test split) | Model ranking quality | Doesn't measure intervention effect |
| **Online** (A/B test) | Actual business outcome | Requires live traffic and patience |

You need both. Offline first (is the model worth testing?), then online (does it actually help?).

### The Holdout Design

The simplest way to measure impact: **hold out a random control group.**

```
ALL ELIGIBLE CUSTOMERS
        │
        ▼
┌───────────────────────────────────────────┐
│           Random Split                    │
│                                           │
│   80% Treatment          20% Control      │
│   (use model to          (random          │
│    select who             selection or    │
│    to call)               no calls)       │
│                                           │
└───────────────────────────────────────────┘
        │                       │
        ▼                       ▼
   Measure churn           Measure churn
   in Treatment            in Control
        │                       │
        └───────────┬───────────┘
                    ▼
            COMPARE OUTCOMES
            (Treatment - Control)
```

**Why random control?** Because it's the only way to isolate the effect of your targeting. If churn is lower in Treatment than Control, AND the groups were randomly assigned, the model-based targeting caused the difference.

### What to Measure

| Metric | What it tells you |
|--------|-------------------|
| **Churn rate** (Treatment vs. Control) | Did targeting reduce churn overall? |
| **Churn rate among called customers** | Did calls work for the people you reached? |
| **Incremental saves** | Treatment saves - Control saves = model value |
| **Cost per incremental save** | Is it worth the intervention cost? |

### Minimum Viable Experiment Plan

Before launching, fill this out:

```
EXPERIMENT: [Name]

1. Hypothesis
   If we use the churn model to target retention calls, we will reduce 
   churn by [X]% compared to random targeting.

2. Primary Metric
   30-day churn rate (subscription cancellations / eligible customers)

3. Population
   Active subscribers with tenure > 30 days, excluding [exclusions]

4. Randomization Unit
   Customer (not household, not session)

5. Treatment vs. Control
   - Treatment (80%): Top 400 by model score get calls
   - Control (20%): Random 100 get calls (or no calls)

6. Duration
   4 weeks minimum (enough for churn to manifest)

7. Sample Size / Power
   With 500 calls/week and ~12% baseline churn, we need ~4 weeks 
   to detect a 3pp difference with 80% power.

8. Guardrails
   - Watch for spillover (are control customers getting calls?)
   - Monitor call quality (are calls actually happening?)
   - Check balance (are Treatment/Control similar on observables?)
```

### Common Pitfalls

**Pitfall 1: No control group**
> "We launched the model and churn dropped 2%!"

You can't attribute that to the model. Seasonality, product changes, or regression to the mean could explain it.

**Fix:** Always hold out a random control, even if it's just 10-20%.

**Pitfall 2: Contaminated control**
> "Our control group accidentally got some model-targeted calls."

Now your Treatment vs. Control comparison is polluted.

**Fix:** Implement assignment at the start. Flag customers in your database. Enforce the assignment in your calling system.

**Pitfall 3: Wrong metric**
> "Model precision went up! Success!"

Precision is an offline metric. It doesn't prove business impact.

**Fix:** Measure business outcomes (churn rate, revenue, NPS) in Treatment vs. Control.

**Pitfall 4: Peeking too early**
> "After 3 days, Treatment is down 0.5pp. Let's call it!"

Statistical noise can look like a result early on. You'll make wrong decisions.

**Fix:** Pre-commit to a sample size and duration. Don't peek.

---

## Part 2: Uplift vs. Risk

### The Hidden Assumption

Your churn model answers: **"Who is likely to churn?"**

But the business question is: **"Who should we intervene on?"**

These are not the same question.

### The Four Customer Quadrants

When you target someone for a retention offer, four things can happen:

```
                    WOULD THEY CHURN WITHOUT INTERVENTION?
                           YES              NO
                    ┌─────────────────┬─────────────────┐
         YES        │   PERSUADABLE   │    WASTED       │
    WILL THEY       │   (True value)  │   EFFORT        │
    RESPOND TO      │                 │   (They'd stay  │
    INTERVENTION?   │   Model +       │    anyway)      │
                    │   Offer = Save  │                 │
                    ├─────────────────┼─────────────────┤
         NO         │   LOST CAUSE    │   SLEEPING      │
                    │   (They'll      │   DOGS          │
                    │    churn no     │   (Don't wake   │
                    │    matter what) │    them up!)    │
                    └─────────────────┴─────────────────┘
```

**Your churn model finds the left column** (people likely to churn). But only the top-left quadrant (Persuadables) creates value.

- **Wasted Effort:** You spent money on someone who would have stayed anyway.
- **Lost Cause:** You spent money on someone who was going to leave no matter what.
- **Sleeping Dogs:** Worst case—your outreach reminds them they could cancel!

### When Risk Models Fail

Imagine two customers with identical 70% churn probability:

- **Customer A:** Frustrated with a fixable issue. A discount call would save them.
- **Customer B:** Already decided to leave. Nothing will change their mind.

A risk model ranks them the same. But A is valuable to call; B is a waste.

**High risk ≠ high impact.** You want to target people whose behavior you can *change*, not just people who are likely to churn.

### The Uplift Modeling Idea

Uplift modeling (also called "incremental response modeling" or "treatment effect modeling") directly estimates:

```
Uplift = P(churn | no intervention) - P(churn | intervention)
```

Instead of "who will churn," it asks "for whom does the intervention make a difference?"

**When you need it:**
- Interventions are expensive (you can't call everyone)
- You suspect many high-risk customers are "lost causes" or would stay anyway
- You have historical data with random assignment (some customers were called, some weren't)

**When you can skip it:**
- Intervention is cheap (email vs. phone call)
- Your risk model already has high lift and you're capacity-constrained anyway
- You don't have randomized historical data (uplift models need Treatment + Control history)

### Practical Fallback: The Hybrid Approach

If you don't have data for true uplift modeling, use a **hybrid heuristic**:

```
Score = Risk Score × Engagement Score

- Risk Score: Model output (0-1 probability of churn)
- Engagement Score: Recent activity level (proxy for "persuadability")
```

**Intuition:** Target customers who are at risk AND still engaged. Very-low-engagement customers may already be "lost causes." Very-high-engagement customers may not be at risk.

Example:

```python
df['hybrid_score'] = df['churn_prob'] * np.clip(df['logins_last_30d'] / 10, 0.1, 1)
# Call the top 500 by hybrid_score instead of raw churn_prob
```

This isn't true uplift modeling, but it avoids the worst "lost cause" targeting.

### Key Takeaway

**Risk models are a starting point, not the finish line.** To truly maximize value:

1. Run experiments to measure incremental impact (Part 1)
2. If you have randomized history, consider uplift modeling
3. At minimum, layer in engagement signals to avoid "lost causes"

---

## Part 3: Production Basics

### The Model Lifecycle

Deploying a model is not the end—it's the beginning of a new set of problems.

```
BUILD ──► VALIDATE ──► DEPLOY ──► MONITOR ──► RETRAIN ──►┐
                                                          │
  ◄───────────────────────────────────────────────────────┘
```

Most ML courses stop at "Validate." This section covers what happens after.

### What Can Go Wrong After Launch?

| Problem | Symptom | Cause |
|---------|---------|-------|
| **Data drift** | Feature distributions shift | Customer behavior changed, data pipeline broke |
| **Concept drift** | Same features, different outcomes | The world changed (e.g., competitor entered) |
| **Label lag** | Can't evaluate recent predictions | Outcome takes time to manifest (30-day churn) |
| **Feedback loops** | Model performance degrades over time | Model changes behavior which changes training data |
| **Silent failures** | Model outputs but wrong | Upstream schema change, missing data |

### Monitoring Checklist

Track these weekly (or more frequently for high-stakes models):

**Layer 1: Data Health**
```
□ Data freshness — Is the pipeline still running?
□ Schema stability — Did column names/types change?
□ Missing values — Did null rates spike?
□ Distribution shift — Are feature histograms stable?
```

**Layer 2: Model Health**
```
□ Score distribution — Are predictions still spread out or collapsing?
□ Calibration — Does predicted 50% still mean 50% actual?
□ Feature importance stability — Did top features change dramatically?
```

**Layer 3: Business Health**
```
□ Precision@K over time — Is model quality degrading?
□ Lift vs. baseline — Are we still beating random?
□ Business metric — Is churn actually moving?
```

### Simple Alerting Rules

You don't need a complex MLOps platform. Start with basic alerts:

| Condition | Alert |
|-----------|-------|
| Data not refreshed in 24h | Pipeline failure |
| Feature mean shifted >2 std | Possible data drift |
| Precision@500 dropped >10% vs. last month | Model quality issue |
| Score distribution collapsed (>80% in one bin) | Model may be broken |

### When to Retrain

**Scheduled retraining** (simple, predictable):
- Monthly or quarterly, depending on how fast your world changes
- Works well for stable businesses

**Triggered retraining** (more responsive):
- When monitoring detects drift above a threshold
- When business metrics degrade
- When new features become available

**Rule of thumb:** If you can't decide, start with monthly retraining and tighten if you see issues.

### Feedback Loop Awareness

Your model changes behavior → behavior changes data → data changes the next model.

**Example:**
1. Model targets high-risk customers for retention calls
2. Some of them stay (good!)
3. Now "called customers who stayed" are in your training data
4. Next model sees: "customers with these features stayed" — but they stayed *because you called them*
5. Model learns wrong patterns

**Mitigation:**
- Keep a random holdout that never gets model-driven treatment (your "control truth")
- Track model performance on the holdout separately
- Be suspicious if model performance improves suspiciously fast

### Monitoring Template

Copy this for your model:

```
MODEL MONITORING PLAN: [Model Name]

1. Data Checks (daily)
   - [ ] Pipeline ran successfully (data timestamp < 24h old)
   - [ ] No unexpected nulls in key features
   - [ ] Feature distributions within historical range (±3 std)

2. Model Checks (weekly)
   - [ ] Score distribution stable (entropy > threshold)
   - [ ] Calibration curve slope between 0.8 and 1.2
   - [ ] Feature importance top-5 unchanged

3. Business Checks (weekly)
   - [ ] Precision@500 > [baseline threshold]
   - [ ] Lift@500 > [minimum acceptable lift]
   - [ ] Treatment vs. Control churn gap stable

4. Retrain Triggers
   - [ ] Precision@500 drops >15% from baseline
   - [ ] Feature drift detected on >3 features
   - [ ] 90 days since last retrain (scheduled)

5. Escalation
   - Alert: [Slack channel / email]
   - Owner: [Name]
```

---

## Summary: The Full Picture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     MODEL → BUSINESS IMPACT                          │
│                                                                      │
│   1. BUILD MODEL                                                     │
│      └── Offline metrics: AUC, Precision@K, Lift                    │
│                                                                      │
│   2. VALIDATE IMPACT (this appendix)                                │
│      └── Online experiment: Treatment vs. Control                   │
│      └── Measure incremental saves, not just predictions            │
│                                                                      │
│   3. OPTIMIZE TARGETING                                              │
│      └── Risk alone ≠ impact                                        │
│      └── Consider uplift or hybrid scores                           │
│                                                                      │
│   4. MAINTAIN IN PRODUCTION                                          │
│      └── Monitor data, model, business metrics                      │
│      └── Retrain on schedule or trigger                             │
│      └── Watch for feedback loops                                   │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**The goal isn't a good model. The goal is a business outcome you can prove.**

---

## Templates Reference

### Template 1: Experiment Plan

```
EXPERIMENT: _______________

Hypothesis: If we [intervention], then [metric] will [change] by [amount].

Primary Metric: _______________
Population: _______________
Randomization Unit: _______________
Treatment: _______________ (% of population)
Control: _______________ (% of population)
Duration: _______________ weeks
Expected Effect Size: _______________
Guardrails: _______________
Owner: _______________
```

### Template 2: Targeting Policy

```
TARGETING POLICY: _______________

Capacity (K): _______________ actions per week
Cost per Action: $_______________
Value per Success: $_______________
Success Rate (historical): _______________%

Break-Even Probability:
  P × SuccessRate × Value = Cost
  P = Cost / (SuccessRate × Value)
  P = _______________ %

Decision Rule:
  □ Rank by model score, take top K
  □ Apply threshold P > break-even
  □ Hybrid: score × engagement filter

Expected Weekly Value:
  Model targeting: $_______________
  Random targeting: $_______________
  Incremental value: $_______________
```

### Template 3: Monitoring Checklist

```
MODEL: _______________
Last Updated: _______________

DAILY CHECKS
□ Data pipeline ran (timestamp check)
□ No unexpected schema changes
□ Null rates within bounds

WEEKLY CHECKS
□ Feature distributions stable
□ Score distribution not collapsed
□ Precision@K vs. baseline: _____ (target: > _____)
□ Lift vs. random: _____ (target: > _____)

RETRAIN TRIGGERS
□ Precision drops >___% from baseline
□ Drift detected on >___ features
□ _____ days since last retrain

OWNER: _______________
ALERT CHANNEL: _______________
```
