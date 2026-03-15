# Monitoring Cheatsheet

## Drift Types

| Type | What Changes | Detection |
|------|--------------|-----------|
| Data drift | Input distribution | KS test, PSI |
| Concept drift | Input→Output relationship | Accuracy |
| Label drift | Output distribution | Prediction stats |

---

## Detection Methods

**KS Test:** `p_value < 0.05` = drift

**PSI:**
- < 0.1: No drift
- 0.1-0.25: Moderate
- > 0.25: Significant

---

## Alert Levels

| Level | Action |
|-------|--------|
| Info | Log only |
| Warning | Investigate |
| Critical | Page on-call |

---

## Retraining Triggers

| Trigger | Threshold |
|---------|-----------|
| Accuracy drop | >5% |
| Feature PSI | >0.25 |
| Time-based | Every N days |
| New data | N new samples |

---

## Monitor These

1. **Inputs**: Feature distributions
2. **Outputs**: Prediction distributions
3. **Performance**: Accuracy, latency
4. **Business**: Downstream KPIs

---

## Business Translation

**Drift:** "Model accuracy may drop for new customer types"

**Retraining:** "Update model with recent behavior"

**Monitoring:** "Automatic checks that model is working"
