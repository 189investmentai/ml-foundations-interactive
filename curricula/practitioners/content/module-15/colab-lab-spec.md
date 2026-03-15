# Colab Lab Spec: Module 15 - Neural Networks

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/module_15_neural_networks.ipynb` |
| Runtime | ~30 minutes |
| Dataset | make_moons, make_classification (synthetic) |
| Target | Binary classification |

## Learning Objectives

After completing this lab, learners will be able to:
1. Explain why neural networks can learn non-linear patterns (XOR, moons) that linear models cannot
2. Build and train an MLPClassifier with hidden layers, ReLU, and early stopping
3. Visualize decision boundaries for logistic regression vs neural networks
4. Compare activation functions (ReLU, sigmoid, tanh)
5. Recognize overfitting and compare NN vs gradient boosting on tabular data
6. Tune hyperparameters with GridSearchCV

## Sections

### 1. Setup (1 min)
- Import MLPClassifier, LogisticRegression, GradientBoostingClassifier, StandardScaler, make_circles, make_moons, make_classification

### 2. Part 1: The Need for Neural Networks (3 min)
- Generate XOR-like data (not linearly separable)
- Compare Logistic Regression vs NN accuracy; NN solves XOR
- **Self-check:** NN accuracy >> logistic on XOR

### 3. Part 2: Building a Neural Network (4 min)
- Load make_moons (500 samples), split, scale
- Build MLPClassifier: (16, 8) hidden, ReLU, Adam, early_stopping
- Print architecture and parameter count
- **Self-check:** Model fitted; train/test accuracy reported

### 4. Part 3: Visualizing Decision Boundaries (4 min)
- Plot decision boundaries for Logistic, NN-shallow (4), NN-deep (16,8)
- **Self-check:** NN captures non-linear boundary; logistic is linear

### 5. Part 4: Activation Functions (3 min)
- Plot ReLU, Sigmoid, Tanh, Identity
- **Self-check:** ReLU for hidden; sigmoid/softmax for output

### 6. Part 5: Overfitting Demonstration (4 min)
- Small dataset (100 samples); compare (4), (16,8), (64,32,16)
- Show train-test gap for large networks
- **Self-check:** Larger networks overfit (higher train, lower test)

### 7. Part 6: NN vs Gradient Boosting on Tabular Data (4 min)
- make_classification (1000 samples, 20 features)
- Compare Logistic, Gradient Boosting, NN
- **Self-check:** GBM often matches or beats NN on tabular

### 8. Part 7: TODO - Hyperparameter Tuning (4 min)
- **TODO:** GridSearchCV over hidden_layer_sizes, activation, alpha
- Report best params and test score
- **Self-check:** `hasattr(grid, 'best_params_')`

### 9. Stakeholder Summary (2 min)
- **TODO:** Write 3-bullet summary: when to use NNs, tradeoffs, overfitting signs

## Self-Checks

| Check | Assertion |
|-------|-----------|
| Model fitted | `hasattr(model, 'predict')` |
| Test accuracy reasonable | `0.5 <= model.score(X_test_scaled, y_test) <= 1.0` |
| GridSearch completed | `hasattr(grid, 'best_params_')` |

## Expected Outputs

- XOR: Logistic ~50%, NN ~100%
- Moons: NN test accuracy ~90%+
- Overfitting: Large NN has train-test gap
- Tabular: GBM often similar or better than NN
- GridSearch: Best params vary by data

## TODO Blocks

1. **GridSearchCV for hyperparameters** (Part 7) – hidden_layer_sizes, activation, alpha
2. **Write 3-bullet stakeholder summary** (Part 8) – Template: when to use NNs, tradeoffs, overfitting mitigation

## Dependencies

- numpy, pandas, matplotlib
- sklearn: neural_network (MLPClassifier), linear_model (LogisticRegression), ensemble (GradientBoostingClassifier), preprocessing (StandardScaler), model_selection (train_test_split, GridSearchCV), metrics (accuracy_score, classification_report), datasets (make_circles, make_moons, make_classification)
