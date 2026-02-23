# Curriculum Map

## Module Overview

| Module | Title | Playground | Key Skills |
|--------|-------|------------|------------|
| 0 | Welcome & Setup | *(none)* | Course overview, learning approach |
| 1 | The ML Map | `playground_ml_pipeline.html` | Workflow stages, failure points |
| 2 | Data Leakage | `playground_data_leakage.html` | Train/test splits, temporal leakage |
| 3 | Linear Regression | `playground_linear_regression.html` | Coefficients, residuals, R² |
| 4 | Logistic Regression | `playground_logistic_regression.html` | Sigmoid, thresholds, decision boundaries |
| 5 | Decision Trees | `playground_decision_trees.html` | Splits, depth, interpretability |
| 6 | Ensembles | `playground_ensembles.html` | Bagging, boosting, bias-variance |
| 7 | **Optimization** | `playground_gradient_descent.html` | **SGD, momentum, Adam, learning rate** |
| 8 | Regression Metrics | `playground_regression_metrics.html` | MAE, RMSE, residual analysis |
| 9 | Classification Metrics | `playground_classification_metrics.html` | Precision, recall, ROC, PR curves |
| 10 | Feature Engineering | `playground_feature_engineering.html` | Transformations, interactions |
| 11 | Regularization | `playground_regularization.html` | L1, L2, early stopping |
| 12 | Embeddings | `playground_embeddings.html` | Similarity, nearest neighbors |
| 13 | Clustering | `playground_clustering.html` | K-means, silhouette, elbow |
| 14 | Retrieval | `playground_retrieval.html` | Semantic search, ranking |
| 15 | Neural Networks | `playground_neural_nets.html` | Layers, activation, backprop intuition |
| 16 | Transformers | `playground_attention.html` | Attention, context windows |
| 17 | LLM Fundamentals | `playground_prompting.html` | Prompting, RAG basics |
| 18 | Tool Calling | `playground_tool_calling.html` | Function execution, traces |
| 19 | Agent Memory | `playground_agent_memory.html` | Context, planning |
| 20 | Guardrails | `playground_guardrails.html` | Validation, safety, eval |
| 21 | MLOps | `playground_mlops.html` | Versioning, reproducibility |
| 22 | Monitoring | `playground_drift.html` | Drift detection, alerts |

## Learning Dependencies

```
Module 0 (Welcome)
    ↓
Modules 1-2 (ML Map, Leakage)
    ↓
Modules 3-6 (Supervised Learning)
    ↓
Module 7 (Optimization) ←→ Modules 8-9 (Evaluation)
    ↓
Modules 10-11 (Features, Regularization)
    ↓
Modules 12-14 (Representations)
    ↓
Modules 15-16 (Deep Learning)
    ↓
Modules 17-20 (Agentic AI)
    ↓
Modules 21-22 (Production)
    ↓
Capstone
```

**Why Optimization after Ensembles?**
Understanding gradient descent and learning rates is essential context before diving into deep learning modules. The bias-variance tradeoff in Module 6 naturally leads into optimization concepts.

## StreamCart Use Cases by Module

| Module | StreamCart Task | Target Variable |
|--------|-----------------|-----------------|
| 3 | Predict customer LTV | `total_spend` |
| 4 | Predict churn | `churn_30d` |
| 5-6 | Churn with interpretability | `churn_30d` |
| 7 | Optimizer comparison (illustrative) | Loss surface |
| 8 | LTV error analysis | `total_spend` |
| 9 | Churn threshold optimization | `churn_30d` |
| 10-11 | Feature engineering for churn | `churn_30d` |
| 12-14 | Ticket similarity search | `ticket_text` |
| 17-20 | Support agent with tools | Multi-task |

## Per-Module Artifacts

Each completed module produces:

1. **Understanding** - Mental models for the concept
2. **Code** - Working notebook with StreamCart data
3. **Debugging skill** - Ability to diagnose related failures
4. **Communication** - Plain-language explanation for stakeholders
5. **Reference** - 1-page cheatsheet

## Checkpoints

### Checkpoint 1: Linear Regression (Module 3)
Validates the full learning flow works before building more.

### Checkpoint 2: Core Supervised (Modules 0-6)
Foundation complete - can build and evaluate basic models.

### Checkpoint 3: Optimization & Evaluation (Modules 7-11)
Understands how models learn and how to evaluate them systematically.

### Checkpoint 4: Representations (Modules 12-14)
Understands modern ML beyond tabular data.

### Checkpoint 5: Deep Learning (Modules 15-16)
Intuition for neural networks and transformers.

### Checkpoint 6: Agentic AI (Modules 17-20)
Can build and evaluate tool-using agents.

### Checkpoint 7: Production (Modules 21-22)
Understands MLOps and production monitoring.

### Checkpoint 8: Capstone
Portfolio-ready project combining all skills.
