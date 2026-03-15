# Debug Drill Spec: Module 07 - The Exploding Loss (Diverging Gradient)

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/debug_drills/drill_07_diverging_gradient.ipynb` |
| Solution | `notebooks/answer_keys/solution_07_diverging_gradient.ipynb` |
| Runtime | ~20 minutes |
| Bug Type | Optimization / Hyperparameter |

## Scenario

A colleague is training a model using gradient descent. They're frustrated. "My loss went from 2.5 to 50 to infinity!" they say. "The training is broken!" The loss explodes because the learning rate is too high. With `lr=1.2` on a simple quadratic loss, the optimizer overshoots the minimum and diverges.

## The Bug

```python
# "I want to train faster, so I'll use a big learning rate!"

START_POSITION = [-2.0, 2.0]
LEARNING_RATE = 1.2  # <-- BUG: Way too high!

path_bad, losses_bad = gradient_descent(START_POSITION, LEARNING_RATE, n_steps=20)
# Loss: 2.5 → 50 → infinity (explodes)
```

### Why It's Wrong

Gradient descent updates: `θ_new = θ_old - lr * gradient`. With `lr=1.2` on a quadratic loss `f(x,y) = x² + y²`, the gradient at (-2, 2) is (-4, 4). The update moves the position by `1.2 * (4, 4)` = (4.8, 4.8), overshooting the minimum at (0, 0). The next step is even farther—the optimizer bounces away and the loss explodes.

### Technical Explanation

For convex quadratic loss, convergence requires `lr < 2 / L` where L is the Lipschitz constant of the gradient. For `f = x² + y²`, the gradient has Lipschitz constant 2, so we need `lr < 1`. With `lr=1.2`, the update overshoots and the sequence diverges. A safe choice is `lr=0.1` or smaller.

## Investigation Steps

1. **Observe loss curve** - If loss increases or explodes, suspect learning rate
2. **Plot optimization path** - Path will show overshooting past the minimum
3. **Try smaller learning rate** - 0.1 typically converges for this demo
4. **Verify convergence** - Final loss should be near 0

## The Fix

```python
# SOLUTION: Use a safe learning rate
LEARNING_RATE_FIXED = 0.1  # Safe for this quadratic loss

path_fixed, losses_fixed = gradient_descent(
    START_POSITION, LEARNING_RATE_FIXED, n_steps=50
)

# Loss should decrease and converge
print(f"Final loss: {losses_fixed[-1]:.6f}")
print(f"Converged: {losses_fixed[-1] < 0.01}")
```

## Self-Checks

| Check | Assertion |
|-------|-----------|
| Loss decreases | `losses_fixed[-1] < losses_fixed[0]` |
| Converged to minimum | `losses_fixed[-1] < 0.01` |
| Position near (0,0) | `np.allclose(path_fixed[-1], [0, 0], atol=0.1)` |

## Postmortem Template

### What happened:
- Loss exploded from ~2.5 to infinity during training
- Optimizer appeared "broken"

### Root cause:
- Learning rate 1.2 was too high for the loss landscape
- Updates overshot the minimum and diverged

### How to prevent:
- Start with small learning rates (0.01–0.1) and increase if training is too slow
- Monitor loss—if it increases, reduce learning rate
- Use learning rate schedules or adaptive optimizers (Adam, etc.)
- For convex quadratic, ensure lr < 2/L (L = gradient Lipschitz constant)

## Learning Objectives

After completing this drill, learners will be able to:
1. Recognize diverging gradient descent from exploding loss
2. Diagnose learning rate as the cause
3. Choose appropriate learning rates for convergence
4. Understand the relationship between learning rate and loss landscape
