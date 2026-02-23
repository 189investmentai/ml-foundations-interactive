# Module 21: MLOps - From Notebook to Production

**Time:** 35-45 minutes

**Promise:** After this module, you'll understand how to move ML models from experimentation to production with proper versioning, reproducibility, and deployment practices.

---

## The Setup

Your model works great in a notebook. Now what?

**MLOps** bridges the gap between data science and production systems:
- Version control for models and data
- Reproducible experiments
- Automated training pipelines
- Reliable deployment

---

## The Mental Models

### 1. The Software Factory

Traditional software: Code → Build → Deploy

ML systems: Data + Code + Config → Train → Validate → Deploy

More moving parts = more things that can break.

### 2. The Time Machine

You need to answer: "What model was running on March 15th at 2pm?"

This requires tracking:
- Code version
- Data version
- Model artifacts
- Configuration
- Dependencies

### 3. The Assembly Line

Manual steps don't scale. Pipelines do.

```
Data → Preprocess → Train → Evaluate → Deploy → Monitor
         ↓            ↓         ↓          ↓
      Versioned   Versioned  Logged    Automated
```

---

## The ML Lifecycle

### Phase 1: Experimentation

Where you are now: notebooks, quick iterations, manual tracking.

**Goal:** Find an approach that works.

### Phase 2: Development

Refactor code, add tests, version control.

**Goal:** Code that others can run.

### Phase 3: Staging

Test in production-like environment, validate performance.

**Goal:** Confidence before production.

### Phase 4: Production

Serve predictions, monitor performance, handle failures.

**Goal:** Reliable value delivery.

---

## Versioning Everything

### Code Versioning (Git)

```bash
# Standard git workflow
git add model.py
git commit -m "Add feature engineering for user tenure"
git push origin feature/tenure-features
```

**Best practices:**
- Meaningful commit messages
- Feature branches
- Code review before merge

### Data Versioning

Data changes. Track it like code.

**Option 1: DVC (Data Version Control)**
```bash
dvc init
dvc add data/customers.csv
git add data/customers.csv.dvc
git commit -m "Add customer data v1"
```

**Option 2: Data snapshots with timestamps**
```python
# Save data with metadata
data.to_parquet(f"data/customers_{timestamp}.parquet")

# Metadata file
{
    "version": "2024-01-15",
    "rows": 50000,
    "source": "production_db",
    "query_hash": "abc123"
}
```

### Model Versioning

Track model artifacts with lineage.

```python
# Save model with metadata
import joblib
import json

model_version = "v1.2.0"
model_path = f"models/churn_model_{model_version}.joblib"

# Save model
joblib.dump(model, model_path)

# Save metadata
metadata = {
    "version": model_version,
    "trained_at": "2024-01-15T10:30:00",
    "data_version": "2024-01-15",
    "git_commit": "abc123",
    "metrics": {"auc": 0.85, "precision": 0.72},
    "features": feature_list,
    "threshold": 0.35
}
with open(f"models/churn_model_{model_version}.json", "w") as f:
    json.dump(metadata, f)
```

---

## Reproducibility

### The Reproducibility Checklist

Can someone else run your code and get the same results?

- [ ] **Environment:** Exact package versions
- [ ] **Data:** Same data or clear access instructions
- [ ] **Code:** Version controlled
- [ ] **Config:** Parameters externalized
- [ ] **Random seeds:** Fixed for reproducibility

### Environment Management

**requirements.txt**
```
pandas==2.0.3
scikit-learn==1.3.0
numpy==1.24.3
```

**Better: Conda environment.yml**
```yaml
name: ml-project
channels:
  - defaults
dependencies:
  - python=3.9
  - pandas=2.0.3
  - scikit-learn=1.3.0
  - pip:
    - lightgbm==4.0.0
```

### Configuration Management

**Don't hardcode. Externalize.**

```python
# config.yaml
model:
  type: "gradient_boosting"
  n_estimators: 100
  max_depth: 5
  
training:
  test_size: 0.2
  random_state: 42
  
thresholds:
  churn: 0.35
```

```python
# Load config
import yaml
with open("config.yaml") as f:
    config = yaml.safe_load(f)

model = GradientBoostingClassifier(
    n_estimators=config["model"]["n_estimators"],
    max_depth=config["model"]["max_depth"]
)
```

---

## Training Pipelines

### From Notebook to Script

**Notebook (exploration):**
```python
# Cell 1
df = pd.read_csv("data.csv")
# Cell 5
X = df[features]
# Cell 12
model.fit(X_train, y_train)
```

**Script (production):**
```python
# train.py
import argparse
import yaml

def load_data(config):
    return pd.read_csv(config["data"]["path"])

def prepare_features(df, config):
    return df[config["features"]]

def train_model(X, y, config):
    model = GradientBoostingClassifier(**config["model"])
    model.fit(X, y)
    return model

def main(config_path):
    config = yaml.safe_load(open(config_path))
    df = load_data(config)
    X, y = prepare_features(df, config)
    model = train_model(X, y, config)
    save_model(model, config)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--config", required=True)
    args = parser.parse_args()
    main(args.config)
```

### Pipeline Structure

```
project/
├── data/
│   ├── raw/
│   └── processed/
├── models/
├── src/
│   ├── data/
│   │   └── preprocess.py
│   ├── features/
│   │   └── build_features.py
│   ├── models/
│   │   ├── train.py
│   │   └── predict.py
│   └── evaluation/
│       └── evaluate.py
├── configs/
│   └── config.yaml
├── tests/
├── requirements.txt
└── README.md
```

---

## Experiment Tracking

### What to Track

For every experiment:
- Parameters (hyperparameters, config)
- Metrics (train, validation, test)
- Artifacts (models, plots)
- Code version
- Data version
- Notes

### Simple Tracking

```python
import json
from datetime import datetime

def log_experiment(name, params, metrics, artifacts=None):
    experiment = {
        "name": name,
        "timestamp": datetime.now().isoformat(),
        "params": params,
        "metrics": metrics,
        "artifacts": artifacts or [],
        "git_commit": get_git_commit()
    }
    
    with open(f"experiments/{name}_{datetime.now():%Y%m%d_%H%M%S}.json", "w") as f:
        json.dump(experiment, f, indent=2)
    
    return experiment

# Usage
log_experiment(
    name="churn_model_v2",
    params={"n_estimators": 100, "max_depth": 5},
    metrics={"auc": 0.85, "precision": 0.72},
    artifacts=["models/churn_v2.joblib"]
)
```

### MLflow (Industry Standard)

```python
import mlflow

mlflow.set_experiment("churn_prediction")

with mlflow.start_run():
    # Log parameters
    mlflow.log_params({"n_estimators": 100, "max_depth": 5})
    
    # Train model
    model.fit(X_train, y_train)
    
    # Log metrics
    mlflow.log_metrics({"auc": 0.85, "precision": 0.72})
    
    # Log model
    mlflow.sklearn.log_model(model, "model")
```

---

## Model Serving

### Batch Prediction

Run predictions on a schedule.

```python
# batch_predict.py
def batch_predict(model_path, data_path, output_path):
    model = joblib.load(model_path)
    data = pd.read_csv(data_path)
    
    predictions = model.predict_proba(data)[:, 1]
    
    results = data[["customer_id"]].copy()
    results["churn_probability"] = predictions
    results["predicted_at"] = datetime.now()
    
    results.to_csv(output_path, index=False)
```

**Schedule with cron:**
```bash
# Run daily at 6am
0 6 * * * python batch_predict.py --model models/latest.joblib --data data/daily.csv
```

### Real-Time Prediction (API)

```python
# app.py
from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)
model = joblib.load("models/churn_model.joblib")
scaler = joblib.load("models/scaler.joblib")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    features = preprocess(data)
    scaled = scaler.transform([features])
    probability = model.predict_proba(scaled)[0, 1]
    
    return jsonify({
        "customer_id": data["customer_id"],
        "churn_probability": float(probability),
        "model_version": "v1.2.0"
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
```

---

## Failure Modes

### 1. Works on My Machine

**Symptom:** Code runs locally but fails in production.

**Fix:** 
- Pin all dependency versions
- Use containers (Docker)
- Test in staging environment

### 2. Can't Reproduce Results

**Symptom:** Model trained today differs from last week.

**Fix:**
- Set random seeds everywhere
- Version data, not just code
- Log all parameters

### 3. Stale Models

**Symptom:** Model performance degrades over time.

**Fix:**
- Automated retraining pipelines
- Performance monitoring
- Alerts on drift

### 4. Configuration Drift

**Symptom:** Production config differs from tested config.

**Fix:**
- Config as code
- Environment-specific overrides
- Validation on deployment

---

## Business Translation

### Explaining MLOps

**Don't say:** "We need MLOps infrastructure with CI/CD pipelines and artifact versioning."

**Do say:** "We need to ensure our models are reliable and reproducible. This means tracking what version is running, being able to roll back if something breaks, and automating the update process."

### Explaining Versioning

**Don't say:** "We use DVC for data versioning and MLflow for experiment tracking."

**Do say:** "We track every change to data and models, like version history in Google Docs. This lets us understand exactly what's running and go back if needed."

### Explaining Pipelines

**Don't say:** "We need to refactor notebooks into modular DAGs."

**Do say:** "We're automating the model training process. Instead of running things manually, the system will automatically update models with fresh data and alert us if anything looks wrong."

---

## Practice

### Before the Lab

Open the **Interactive Playground** (`playground_mlops.html`):

1. See the ML lifecycle stages
2. Explore versioning concepts
3. Understand pipeline structure
4. View experiment tracking

### Key Observations

- Production ML has many more moving parts
- Versioning enables debugging and rollback
- Automation reduces human error
- Good structure enables team collaboration

---

## Quick Reference

### MLOps Checklist

- [ ] Code in version control (git)
- [ ] Dependencies pinned (requirements.txt)
- [ ] Data versioned or documented
- [ ] Config externalized
- [ ] Random seeds set
- [ ] Experiments logged
- [ ] Models versioned with metadata
- [ ] Tests written
- [ ] Documentation updated

### Project Structure

```
project/
├── data/           # Data files (versioned)
├── models/         # Trained models
├── src/            # Source code
├── configs/        # Configuration files
├── tests/          # Unit tests
├── experiments/    # Experiment logs
└── README.md       # Documentation
```

---

## Done Checklist

- [ ] Understood MLOps lifecycle
- [ ] Explored the playground
- [ ] Know how to version code, data, and models
- [ ] Understood experiment tracking
- [ ] Completed the notebook lab
- [ ] Passed the quiz
