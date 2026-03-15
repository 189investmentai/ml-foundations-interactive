# Colab Lab Spec: Module 23 - Monitoring

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/module_23_monitoring.ipynb` |
| Runtime | ~25 minutes |
| Dataset | Synthetic churn data with drift (generate_data) |
| Target | `churned` |

## Learning Objectives

After completing this lab, learners will be able to:
1. Generate data with data drift and concept drift
2. Implement PSI (Population Stability Index) and KS test for drift detection
3. Monitor model performance vs baseline (accuracy, AUC, pred_mean)
4. Build an AlertingSystem with warning/critical thresholds
5. Implement RetrainingDecision (accuracy drop, PSI, scheduled)
6. Visualize monitoring dashboard (accuracy, PSI, pred_mean over time)

## Sections

### 1. Setup (2 min)
- Import numpy, pandas, matplotlib, scipy.stats, sklearn, datetime

### 2. Part 1: Generate Data with Drift (4 min)
- generate_data(n_samples, drift_factor, concept_drift)
- drift_factor: shifts tenure, spend, engagement distributions
- concept_drift: changes churn relationship (support tickets less predictive)
- Train (no drift), prod_clean, prod_drift, prod_concept, prod_both

### 3. Part 2: Train Baseline Model (3 min)
- GradientBoostingClassifier on train_data
- baseline_metrics: accuracy, auc, pred_mean, pred_std

### 4. Part 3: Drift Detection (4 min)
- calculate_psi(expected, actual, buckets=10)
- detect_drift(reference, current, features): KS test + PSI per feature
- drift_detected: psi > 0.1 or ks_pvalue < 0.05
- Test on 4 scenarios: No Drift, Data Drift, Concept Drift, Both

### 5. Part 4: Performance Monitoring (3 min)
- monitor_performance(model, data, features, baseline)
- current_metrics, degradation (accuracy_drop, auc_drop, pred_mean_shift)
- alert: accuracy_drop > 0.05 or auc_drop > 0.05

### 6. Part 5: Alerting System (4 min)
- Alert dataclass: level, metric, message, value, threshold, timestamp
- AlertingSystem: check(metrics) against warning/critical config
- Thresholds: accuracy_drop (0.03 warning, 0.05 critical), PSI (0.1, 0.25)
- Test across scenarios

### 7. Part 6: Retraining Decision (3 min)
- RetrainingDecision: should_retrain(metrics)
- Triggers: accuracy_drop > threshold, psi > threshold, days since last retrain > max_days
- Test across scenarios

### 8. Part 7: Visualization (4 min)
- simulate_production(model, baseline, days=30): gradual drift over time
- 3-panel plot: accuracy over time, PSI over time, pred_mean over time
- Baseline and threshold lines

### 9. Part 8: TODO - Build Your Monitoring Dashboard (3 min)
- **TODO:** Add latency monitoring, error rate tracking, custom business metrics, automated reports

### 10. Self-Check (1 min)
- **Self-check:** calculate_psi callable, detect_drift callable, alerting has alerts, retrain_decision has should_retrain

### 11. Stakeholder Summary (3 min)
- **TODO:** Write 3-bullet summary (~100 words) for PM
- Template: What is drift, how we catch it, business impact

## Self-Checks

| Check | Assertion |
|-------|-----------|
| PSI function | `callable(calculate_psi)` |
| Drift function | `callable(detect_drift)` |
| Alerting tracks | `hasattr(alerting, 'alerts')` |
| Retrain decision | `hasattr(retrain_decision, 'should_retrain')` |

## Expected Outputs

- Drift detection results per scenario (drifted features, avg PSI)
- Performance monitoring (current accuracy, degradation, alert status)
- Alert messages for drifted/degraded scenarios
- Retraining decisions (YES/No + reason)
- 3-panel monitoring visualization

## TODO Blocks

1. **Extend monitoring** (Part 8): Add latency, error rate, business metrics, report generation
2. **Stakeholder summary** (Stakeholder section): Write 3-bullet summary on drift, detection, impact

## Dependencies

- numpy
- pandas
- matplotlib
- scipy (stats)
- sklearn (GradientBoostingClassifier, train_test_split, accuracy_score, roc_auc_score)
- datetime
