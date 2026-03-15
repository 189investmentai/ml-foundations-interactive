# Colab Lab Spec: Module 22 - MLOps

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/module_22_mlops.ipynb` |
| Runtime | ~25 minutes |
| Dataset | Synthetic churn data (tenure, spend, support_tickets, engagement) |
| Target | `churned` |

## Learning Objectives

After completing this lab, learners will be able to:
1. Implement ModelMetadata and ModelRegistry for versioning
2. Build ExperimentTracker to log params, metrics, data_hash
3. Create a TrainingPipeline: load_data → preprocess → train → evaluate → register
4. Run multiple experiments and compare by AUC
5. Implement batch prediction with model version tracking
6. Verify reproducibility with check_reproducibility

## Sections

### 1. Setup (2 min)
- Import numpy, pandas, json, os, hashlib, datetime, joblib, sklearn

### 2. Part 1: Model Versioning (4 min)
- ModelMetadata: version, name, trained_at, data_version, git_commit, config, metrics, features, threshold
- ModelRegistry: register(model, metadata), get_latest, list_versions
- Save model (.joblib) and metadata (.json)
- Initialize registry at ./demo_models

### 3. Part 2: Experiment Tracking (4 min)
- Experiment dataclass: name, timestamp, params, metrics, data_hash, notes
- ExperimentTracker: log, compare(metric)
- hash_data(df) for data versioning
- Initialize tracker at ./demo_experiments

### 4. Part 3: Training Pipeline (5 min)
- Generate sample data: tenure, spend, support_tickets, engagement, churned
- TrainingPipeline: load_data, preprocess, train, evaluate, register, run
- Config: features, target, test_size, model params, threshold
- Run pipeline and register v1.0.0

### 5. Part 4: Running Multiple Experiments (4 min)
- Experiments: baseline (n_estimators=50, max_depth=3), deeper (100, 5), more_trees (200, 4)
- Update config, run pipeline, log experiment
- Compare by AUC

### 6. Part 5: Model Serving (Batch) (3 min)
- batch_predict(model_path, data, features) → DataFrame with churn_probability, predicted_at, model_version
- Load from registry, run on sample data

### 7. Part 6: Reproducibility Check (3 min)
- check_reproducibility(config, data, n_runs=3)
- Verify same AUC across runs with same config

### 8. Part 7: TODO - Create Your Pipeline (3 min)
- **TODO:** Add feature validation, model validation (min thresholds), automated rollback if worse

### 9. Self-Check (1 min)
- **Self-check:** pipeline defined, has metrics, ≥1 model registered, ≥1 experiment logged

### 10. Stakeholder Summary (3 min)
- **TODO:** Write 3-bullet summary (~100 words) for VP of Engineering
- Template: Why MLOps, reproducibility, minimum viable setup

## Self-Checks

| Check | Assertion |
|-------|-----------|
| Pipeline defined | `'pipeline' in dir()` |
| Pipeline has metrics | `hasattr(pipeline, 'metrics')` |
| Model registered | `len(registry.list_versions("churn_model")) >= 1` |
| Experiment logged | `len(tracker.experiments) >= 1` |

## Expected Outputs

- Model registered with metadata
- Experiment comparison table (name, n_estimators, max_depth, auc, precision, recall)
- Batch prediction DataFrame
- Reproducibility: True (identical AUC across runs)

## TODO Blocks

1. **Extend pipeline** (Part 7): Add feature validation, model validation, rollback logic
2. **Stakeholder summary** (Stakeholder section): Write 3-bullet summary for VP of Engineering

## Dependencies

- numpy
- pandas
- json
- os
- hashlib
- joblib
- sklearn (GradientBoostingClassifier, train_test_split, roc_auc_score, precision_score, recall_score)
