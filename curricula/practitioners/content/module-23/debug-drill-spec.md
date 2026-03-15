# Debug Drill Spec: Module 23 - The Silent Degradation

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/debug_drills/drill_23_silent_degradation.ipynb` |
| Solution | `notebooks/answer_keys/solution_23_silent_degradation.ipynb` |
| Runtime | ~20 minutes |
| Bug Type | Silent Degradation / No Monitoring |

## Scenario

A colleague deployed a churn model that has been in production for 3 months. Business metrics are declining. "Our retention offers aren't working anymore!" the PM complains. "Customers aren't responding." Nobody noticed the model was degrading because there were no alerts. The production prediction function returns predictions without any monitoring—no drift detection, no performance tracking, no alerts when AUC drops.

## The Bug

```python
# Colleague's buggy code
def broken_predict(model, data, features):
    """Production prediction without any monitoring."""
    X = data[features]
    predictions = model.predict_proba(X)[:, 1]
    return predictions  # Just returns predictions, no monitoring!

# In production loop - BUG: No alerts triggered, even when performance drops!
for week in range(12):
    prod_data = generate_data(500, drift_factor=drift, concept_drift=concept_drift)
    preds = broken_predict(model, prod_data, features)
    actual_auc = roc_auc_score(prod_data['churned'], preds)
    # BUG: No alerts triggered, even when performance drops!
```

### Why It's Wrong

The prediction pipeline has no monitoring. As data drift and concept drift accumulate over weeks, model performance degrades (AUC drops from ~0.70 to ~0.55). But nobody is alerted. There's no PSI (Population Stability Index) to detect feature drift, no AUC tracking, no thresholds. Business metrics suffer before anyone notices the model is broken.

## Investigation Steps

1. **Understand the failure** - Trace: Week 1–4 good → Week 5–8 drift starts → Week 9–12 significant degradation; no monitoring to catch it
2. **Implement monitoring** - Add `ModelMonitor` with PSI for data drift, AUC drop detection, tiered thresholds (warning/critical)
3. **Re-run with monitoring** - Simulate 12 weeks; verify alerts fire when degradation occurs

## The Fix

```python
# Fixed: ModelMonitor with drift detection and alerts
def calculate_psi(expected, actual, buckets=10):
    """Calculate Population Stability Index."""
    bins = np.percentile(expected, np.linspace(0, 100, buckets + 1))
    bins[0], bins[-1] = -np.inf, np.inf
    exp_counts = np.histogram(expected, bins)[0] / len(expected)
    act_counts = np.histogram(actual, bins)[0] / len(actual)
    exp_counts = np.clip(exp_counts, 0.0001, None)
    act_counts = np.clip(act_counts, 0.0001, None)
    return np.sum((act_counts - exp_counts) * np.log(act_counts / exp_counts))

class ModelMonitor:
    """Model monitoring with drift detection and alerts."""
    
    def __init__(self, baseline_data, baseline_auc, thresholds):
        self.baseline_data = baseline_data
        self.baseline_auc = baseline_auc
        self.thresholds = thresholds
        self.alerts = []
    
    def check(self, current_data, predictions, actuals=None):
        alerts = []
        # Check data drift (PSI)
        for feature in ['tenure', 'spend', 'tickets']:
            psi = calculate_psi(self.baseline_data[feature].values, current_data[feature].values)
            if psi > self.thresholds['psi_critical']:
                alerts.append(f"🚨 CRITICAL: {feature} PSI={psi:.2f}")
            elif psi > self.thresholds['psi_warning']:
                alerts.append(f"⚠️ WARNING: {feature} PSI={psi:.2f}")
        # Check performance
        if actuals is not None:
            current_auc = roc_auc_score(actuals, predictions)
            auc_drop = self.baseline_auc - current_auc
            if auc_drop > self.thresholds['auc_critical']:
                alerts.append(f"🚨 CRITICAL: AUC dropped {auc_drop:.2%}")
            elif auc_drop > self.thresholds['auc_warning']:
                alerts.append(f"⚠️ WARNING: AUC dropped {auc_drop:.2%}")
        self.alerts.extend(alerts)
        return alerts

thresholds = {'psi_warning': 0.1, 'psi_critical': 0.25, 'auc_warning': 0.03, 'auc_critical': 0.05}
```

## Self-Checks

| Check | Assertion |
|-------|-----------|
| Monitor catches alerts | `len(monitor.alerts) > 0` |
| Critical alerts fired | `any('CRITICAL' in a for a in monitor.alerts)` |

## Postmortem Template

### What happened:
- Model degraded over 12 weeks (AUC dropped significantly)
- Business metrics declined before anyone noticed

### Root cause:
- No monitoring in production prediction pipeline
- No drift detection (PSI), no performance tracking, no alerts

### How to prevent:
- Track PSI for feature drift; track AUC when ground truth available
- Set tiered thresholds: Warning → investigate, Critical → act
- Alert early, before business metrics decline

## Learning Objectives

After completing this drill, learners will be able to:
1. Identify when models degrade silently without monitoring
2. Implement ModelMonitor with PSI and AUC tracking
3. Set tiered alert thresholds and automate retraining decisions
