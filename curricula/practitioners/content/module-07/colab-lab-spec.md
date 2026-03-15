# Colab Lab Spec: Module 07 - Optimization and Gradient Descent

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/module_07_optimization.ipynb` |
| Runtime | ~20 minutes |
| Dataset | Synthetic loss surfaces (no StreamCart for core content); optional StreamCart churn for Part 9 |
| Target | N/A (optimization concepts) |

## Learning Objectives

After completing this lab, learners will be able to:
1. Visualize loss surfaces (3D and contour)
2. Implement vanilla gradient descent from scratch
3. Explain learning rate effects (too slow, just right, divergent)
4. Compare SGD vs Momentum vs Adam on a ravine surface
5. Connect optimizer concepts to real ML training (StreamCart)

## Sections

### 1. Setup (1 min)
- Import numpy, matplotlib, mpl_toolkits.mplot3d
- Set random seed and plot style

### 2. Part 1: Understanding the Loss Surface (3 min)
- Define quadratic loss: x² + y² (bowl shape)
- 3D surface plot and contour plot
- Mark minimum at (0, 0)

### 3. Part 2: Implementing Gradient Descent (3 min)
- Implement `gradient_descent(start, gradient_fn, loss_fn, lr, n_steps)`
- Run with lr=0.1, visualize path on contour and loss over time
- **Self-check:** Loss decreases over steps

### 4. Part 3: The Learning Rate Effect (4 min)
- Run GD with lr = [0.01, 0.1, 0.5, 0.95, 1.1]
- Plot paths and loss curves for each
- **Observations:** 0.01 slow, 0.1 good, 0.5 oscillates, 0.95 barely stable, 1.1 diverges

### 5. Part 4: The Ravine Problem (2 min)
- Define ravine loss: 0.5x² + 10y² (steep in y, flat in x)
- Visualize contour
- Run vanilla SGD → zigzag pattern

### 6. Part 5: Momentum to the Rescue (3 min)
- Implement `gradient_descent_momentum` with velocity accumulation
- Compare SGD vs Momentum on ravine: paths and loss curves
- **Self-check:** Momentum converges closer to minimum

### 7. Part 6: Implementing Adam (3 min)
- Implement Adam (first moment, second moment, bias correction)
- Compare SGD vs Momentum vs Adam on ravine
- Adam typically converges fastest

### 8. Part 7: Regularization Effect (2 min)
- L2 regularized loss: quadratic + λ(x² + y²)
- Visualize: original vs regularized bowl (steeper with L2)

### 9. Part 8: TODO - Find Optimal Learning Rate (5 min)
- Sweep lr: [0.001, 0.01, 0.05, 0.1, 0.2, 0.5]
- For each: final loss, steps to reach loss < 0.01, diverged?
- **TODO:** Print results, identify best lr, write reasoning
- **Self-check:** At least 2 lrs converge; best final_loss < 0.5

### 10. Part 9: Connecting to StreamCart (3 min)
- Load StreamCart (or simulated) churn data
- Scale features with StandardScaler
- Compare SGDClassifier with different learning rates (0.0001–1.0)
- **Insight:** Too high or too low lr hurts test accuracy

### 11. Part 10: Stakeholder Summary (2 min)
- **TODO:** Write 3-bullet summary: What gradient descent does, Why lr matters, When Adam vs SGD

## Self-Checks

| Check | Assertion |
|-------|-----------|
| Loss decreases | `losses[-1] < losses[0]` |
| LR experiment done | `len(results) > 0` |
| At least 2 converge | `len(converged) >= 2` |
| Best reaches low loss | `best['final_loss'] < 0.5` |

## Expected Outputs

- GD path converges to (0, 0) for quadratic
- Learning rate 0.1 converges smoothly; 1.1 diverges
- Momentum/Adam outperform SGD on ravine
- Best lr in experiment: typically 0.05–0.2

## TODO Blocks

1. **Find optimal learning rate** (Part 8): Run sweep, print results, identify best lr and reason
2. **Stakeholder summary** (Part 10): Write 3-bullet explanation for non-technical colleague

## Dependencies

- numpy
- matplotlib (including mpl_toolkits.mplot3d)
- pandas, sklearn (for Part 9: SGDClassifier, StandardScaler, train_test_split)
