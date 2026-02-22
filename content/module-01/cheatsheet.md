# Module 1 Cheat Sheet: Problem Framing

*Print this. Stick it on your wall. Reference it before every ML project.*

---

## The 7-Line Template

Fill this out before writing any code.

| # | Question | Your Answer |
|---|----------|-------------|
| 1 | **Problem** — What business outcome are we trying to improve? | |
| 2 | **Action** — What will we DO with the prediction? | |
| 3 | **Prediction** — What exactly does the model output? | |
| 4 | **Label** — How do we define this in historical data? | |
| 5 | **Features** — What info is available at prediction time? | |
| 6 | **Metric** — How do we measure if the model helps? | |
| 7 | **Constraints** — What limits exist in production? | |

**If you can't fill out Line 2, stop.** No clear action = no point in building.

---

## ML vs. Rules: Quick Decision

| Use ML when... | Use rules when... |
|----------------|-------------------|
| Complex patterns | Simple logic ("if X then Y") |
| Many signals interact | 1-2 factors matter |
| Pattern changes over time | Pattern is stable |
| Hundreds+ of examples | <100 examples |
| Some errors are OK | 100% accuracy required |

**When in doubt:** Start with rules. Add ML when rules hit their ceiling.

---

## Leakage Red Flags

🚩 **AUC > 0.95** — Almost always leakage. Real models rarely exceed 0.85.

🚩 **Feature from after the event** — `cancel_reason`, `days_until_churn`, `outcome_flag`

🚩 **Perfect predictor** — One feature dominates. Ask: "Why is this so good?"

🚩 **Metric tanks in production** — Model worked on historical data, fails on live data.

**The test:** For every feature, ask: *"Would I know this BEFORE making the prediction?"*

---

## Metric Matching

| If your action is... | Use this metric |
|---------------------|-----------------|
| Contact top N customers | Precision@N |
| Catch all bad cases | Recall |
| Rank everything | AUC |
| Real-time decisions | AUC + latency |
| Minimize cost | Custom cost function |

**Never use accuracy** when the outcome is rare (<10%). Predicting "no" for everything gives high accuracy but catches nothing.

---

## Label Definition Checklist

- [ ] Label matches the prediction you actually want
- [ ] Time window is forward-looking (not "ever happened")
- [ ] Same definition will work in production
- [ ] Validated with stakeholders before building

**Common mistake:** Predicting "inactive" when you want "churned." They're different!

---

## The Mental Model

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   BUSINESS WORLD      →      DATA WORLD      →      ACTION  │
│                                                             │
│   "Churn is up,             P(cancel in            "Send    │
│    fix it"                   30 days)               offer   │
│                              = 0.73                 to top  │
│                                                     500"    │
│                                                             │
└─────────────────────────────────────────────────────────────┘

The model is a translator. It doesn't "fix churn"—it converts
a vague problem into a specific number that enables action.
```

---

## Quick Reference: StreamCart Examples

**Churn Offers:**
- Action: Send $20 retention offer
- Prediction: P(cancel in 14 days)
- Label: canceled within 14 days of snapshot
- Metric: Precision@1000 (can send 1000/week)

**Fraud Review:**
- Action: Flag for manual review
- Prediction: P(transaction is fraud)
- Label: confirmed chargeback within 60 days
- Metric: Recall@100 (can review 100/day)

---

## Before You Build: Final Checklist

- [ ] Filled out 7-line template
- [ ] Line 2 (Action) is specific and actionable
- [ ] Label definition reviewed with stakeholders
- [ ] Every feature passes the "would I know this at prediction time?" test
- [ ] Metric matches the action (not just accuracy)
- [ ] Constraints documented (latency, privacy, etc.)

**If any box is unchecked, you're not ready to build.**
