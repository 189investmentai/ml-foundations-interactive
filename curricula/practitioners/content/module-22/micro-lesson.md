# Module 22: Monitoring - Keeping Models Healthy in Production

**Time:** 35-45 minutes

**Promise:** After this module, you'll understand how to detect when models degrade, set up alerts, and know when to retrain.

---

## The Setup

Your model is in production. It worked great at launch. But models don't stay good forever.

**Monitoring** answers:
- Is the model still accurate?
- Has the data changed?
- Should we retrain?
- Is something broken?

---

## The Mental Models

### 1. The Checkup Analogy

Models need regular health checkups:
- **Vital signs**: Are predictions reasonable?
- **Blood tests**: Has data distribution changed?
- **Symptoms**: Is business performance dropping?

### 2. The Canary in the Coal Mine

Early warning signs appear before disaster:
- Input distributions shift
- Prediction confidence drops
- Downstream metrics move

Catch problems early, before users notice.

### 3. The Feedback Loop

Production data is your best teacher:
- Model makes predictions
- Reality happens
- Compare prediction vs outcome
- Learn and improve

---

## What to Monitor

### 1. Input Data (Feature Drift)

Has the distribution of input features changed?

```python
# Compare training vs production distributions
def detect_feature_drift(train_data, prod_data, threshold=0.1):
    """Detect drift using statistical tests."""
    from scipy import stats
    
    drift_detected = {}
    for col in train_data.columns:
        # KS test for continuous features
        stat, p_value = stats.ks_2samp(train_data[col], prod_data[col])
        drift_detected[col] = {
            "statistic": stat,
            "p_value": p_value,
            "drifted": p_value < threshold
        }
    return drift_detected
```

### 2. Output Data (Prediction Drift)

Have the model's predictions changed?

```python
def monitor_predictions(predictions, baseline_mean, baseline_std, threshold=2):
    """Check if predictions have drifted from baseline."""
    current_mean = predictions.mean()
    z_score = abs(current_mean - baseline_mean) / baseline_std
    
    return {
        "current_mean": current_mean,
        "baseline_mean": baseline_mean,
        "z_score": z_score,
        "drifted": z_score > threshold
    }
```

### 3. Model Performance (Accuracy Drift)

Is the model still correct?

```python
def monitor_accuracy(predictions, actuals, min_accuracy=0.7):
    """Monitor model accuracy over time."""
    from sklearn.metrics import accuracy_score
    
    accuracy = accuracy_score(actuals, predictions > 0.5)
    
    return {
        "accuracy": accuracy,
        "threshold": min_accuracy,
        "alert": accuracy < min_accuracy
    }
```

### 4. Business Metrics

Is the model delivering value?

- Conversion rates
- Revenue impact
- User engagement
- Customer satisfaction

---

## Types of Drift

### Data Drift (Covariate Shift)

Input distribution changes, but relationship stays the same.

**Example:** Training data was mostly young users, but now older users are signing up.

**Detection:** Compare feature distributions over time.

### Concept Drift

The relationship between inputs and outputs changes.

**Example:** What made users churn last year doesn't predict churn this year (economy changed, competitor launched).

**Detection:** Monitor model accuracy on labeled data.

### Label Drift

The distribution of outcomes changes.

**Example:** Churn rate was 15% during training, now it's 25%.

**Detection:** Compare prediction distributions and outcome rates.

---

## Drift Detection Methods

### Statistical Tests

**Kolmogorov-Smirnov (KS) Test**
- Compares two distributions
- Low p-value = significant difference

```python
from scipy.stats import ks_2samp

stat, p_value = ks_2samp(reference_data, current_data)
drifted = p_value < 0.05
```

**Population Stability Index (PSI)**
- Common in finance
- PSI > 0.25 = significant drift

```python
def calculate_psi(expected, actual, buckets=10):
    """Calculate Population Stability Index."""
    def get_bins(data, n):
        return np.percentile(data, np.linspace(0, 100, n + 1))
    
    bins = get_bins(expected, buckets)
    expected_counts = np.histogram(expected, bins)[0] / len(expected)
    actual_counts = np.histogram(actual, bins)[0] / len(actual)
    
    # Avoid division by zero
    expected_counts = np.clip(expected_counts, 0.0001, None)
    actual_counts = np.clip(actual_counts, 0.0001, None)
    
    psi = np.sum((actual_counts - expected_counts) * np.log(actual_counts / expected_counts))
    return psi
```

### Sliding Windows

Compare recent data to reference period.

```python
def sliding_window_drift(data, window_size=1000, reference_size=5000):
    """Detect drift using sliding window."""
    reference = data[-reference_size-window_size:-window_size]
    current = data[-window_size:]
    
    return detect_feature_drift(reference, current)
```

---

## Setting Up Alerts

### Alert Levels

| Level | Condition | Action |
|-------|-----------|--------|
| Info | Minor drift detected | Log and continue |
| Warning | Moderate drift | Investigate |
| Critical | Severe drift or accuracy drop | Page on-call, consider rollback |

### Alert Configuration

```python
ALERT_CONFIG = {
    "feature_drift": {
        "psi_threshold": 0.1,
        "level": "warning"
    },
    "prediction_drift": {
        "z_score_threshold": 2.0,
        "level": "warning"
    },
    "accuracy_drop": {
        "threshold": 0.05,  # 5% drop from baseline
        "level": "critical"
    }
}

def evaluate_alerts(metrics, config):
    """Evaluate metrics against alert thresholds."""
    alerts = []
    
    if metrics.get("psi", 0) > config["feature_drift"]["psi_threshold"]:
        alerts.append({
            "type": "feature_drift",
            "level": config["feature_drift"]["level"],
            "value": metrics["psi"]
        })
    
    return alerts
```

### Notification Channels

- **Slack/Teams**: For warnings, team awareness
- **PagerDuty/Opsgenie**: For critical alerts, immediate action
- **Dashboard**: For trends, regular review

---

## When to Retrain

### Triggered Retraining

| Trigger | Threshold | Example |
|---------|-----------|---------|
| Accuracy drop | >5% from baseline | Accuracy went from 82% to 75% |
| Feature drift | PSI > 0.25 | Customer demographics shifted |
| Time-based | Every N days | Monthly refresh |
| Data volume | N new labeled examples | 10,000 new samples |

### Retraining Decision Framework

```python
def should_retrain(metrics, last_retrain_date, config):
    """Decide if model should be retrained."""
    
    # Check accuracy
    if metrics["accuracy"] < config["min_accuracy"]:
        return True, "Accuracy below threshold"
    
    # Check drift
    if metrics["feature_psi"] > config["psi_threshold"]:
        return True, "Feature drift detected"
    
    # Check time since last retrain
    days_since = (datetime.now() - last_retrain_date).days
    if days_since > config["max_days_between_retrain"]:
        return True, "Scheduled retrain"
    
    return False, "Model healthy"
```

---

## Monitoring Dashboard

### Key Metrics to Display

1. **Model Health**
   - Current accuracy
   - Trend over time
   - Comparison to baseline

2. **Data Health**
   - Feature drift indicators
   - Missing value rates
   - Outlier counts

3. **Operational Health**
   - Prediction latency
   - Error rates
   - Request volume

4. **Business Health**
   - Downstream KPIs
   - A/B test results
   - User feedback

---

## Failure Modes

### 1. Silent Degradation

**Symptom:** Model accuracy drops slowly, no alerts fire.

**Fix:**
- Monitor business metrics, not just model metrics
- Set trend-based alerts (X% drop over Y days)
- Regular manual reviews

### 2. Alert Fatigue

**Symptom:** Too many alerts, team ignores them.

**Fix:**
- Tune thresholds based on historical patterns
- Use severity levels appropriately
- Batch non-critical alerts

### 3. Delayed Ground Truth

**Symptom:** Can't measure accuracy because labels take time.

**Example:** Churn prediction—know truth only after 30 days.

**Fix:**
- Monitor proxy metrics
- Use leading indicators
- Sample-based evaluation

### 4. Feedback Loops

**Symptom:** Model predictions affect the outcome being predicted.

**Example:** Model predicts user will churn → user gets retention offer → user doesn't churn. Was the model wrong or did intervention work?

**Fix:**
- Holdout groups
- Causal inference
- A/B testing

---

## Business Translation

### Explaining Drift

**Don't say:** "We're seeing covariate shift in the feature distributions."

**Do say:** "The types of customers we're seeing now are different from who we trained the model on. The model may be less accurate for these new customers."

### Explaining Retraining

**Don't say:** "We need to retrain due to concept drift."

**Do say:** "Customer behavior has changed since we built this model. We need to update it with recent data to maintain accuracy."

### Explaining Monitoring

**Don't say:** "We monitor PSI and KS statistics for drift detection."

**Do say:** "We continuously check if the model is still working well. If it starts making worse predictions, we get alerted automatically."

---

## Practice

### Before the Lab

Open the **Interactive Playground** (`playground_drift.html`):

1. See how data drift develops
2. Watch accuracy degrade
3. Observe alert triggers
4. Understand retraining decisions

### Key Observations

- Models degrade over time
- Drift can be gradual or sudden
- Early detection prevents bigger problems
- Multiple metrics tell the full story

---

## Quick Reference

### Drift Types

| Type | What Changes | How to Detect |
|------|--------------|---------------|
| Data drift | Input distribution | KS test, PSI |
| Concept drift | Input-output relationship | Accuracy monitoring |
| Label drift | Output distribution | Prediction distribution |

### Alert Thresholds (Starting Points)

| Metric | Warning | Critical |
|--------|---------|----------|
| PSI | 0.1 | 0.25 |
| Accuracy drop | 3% | 5% |
| Latency increase | 2x | 5x |

### Monitoring Checklist

- [ ] Feature distributions tracked
- [ ] Prediction distributions tracked
- [ ] Accuracy monitored (if labels available)
- [ ] Business metrics connected
- [ ] Alerts configured
- [ ] Dashboard created
- [ ] Retraining triggers defined

---

## Done Checklist

- [ ] Understood types of drift
- [ ] Explored the playground
- [ ] Know how to detect drift
- [ ] Understood alerting strategies
- [ ] Completed the notebook lab
- [ ] Passed the quiz
