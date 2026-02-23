# Module 7: Optimization - How Models Learn

**Time:** 30-45 minutes

**Promise:** After this module, you'll understand how gradient descent finds optimal parameters, why learning rate matters so much, and when to use different optimizers (SGD, Momentum, Adam).

---

## The Setup

You've built models that work. But how do they actually *learn*?

When you call `model.fit()`, there's a hidden loop running:
1. Make predictions
2. Calculate error (loss)
3. Adjust parameters to reduce error
4. Repeat

That adjustment step is **optimization**. Understanding it helps you:
- Debug training that won't converge
- Choose appropriate learning rates
- Pick the right optimizer for your problem

---

## The Mental Models

### 1. The Blindfolded Hiker

Imagine you're dropped on a mountainous terrain. Your goal: find the lowest valley. The catch: you're blindfolded.

**Your strategy:**
1. Feel the slope under your feet
2. Take a step downhill
3. Repeat until flat

This is gradient descent:
- **Slope** = gradient (tells you which direction is downhill)
- **Step size** = learning rate
- **Valley** = minimum loss

**What can go wrong:**
- Steps too big → overshoot the valley
- Steps too small → take forever to arrive
- Local minimum → stuck in a small dip, missing the deeper valley

### 2. The Learning Rate Dial

| Learning Rate | Behavior |
|--------------|----------|
| Too high (0.1+) | Overshoots, oscillates, diverges |
| Just right (0.001-0.01) | Smooth convergence |
| Too low (0.0001-) | Painfully slow, might not finish |

**The key insight:** There's no universally "correct" learning rate. It depends on:
- Loss surface shape
- Parameter scale
- Batch size

### 3. The Momentum Ball

Instead of walking, imagine rolling a ball down the hill.

- A ball has **momentum** — it remembers its previous direction
- This helps it roll through small bumps
- It accelerates in consistent directions

**Without momentum:** Zigzag down a narrow ravine (slow)
**With momentum:** Smooth path, faster convergence

### 4. The Adaptive Ruler

Different dimensions of your problem have different scales:
- Feature 1: values range 0-1
- Feature 2: values range 0-10000

A single learning rate struggles. Adaptive methods (RMSProp, Adam) use **different learning rates for different parameters**.

---

## The Optimizers

### Vanilla SGD (Stochastic Gradient Descent)

```
θ = θ - lr × gradient
```

**What it does:** Follow the gradient directly.

**Pros:**
- Simple, predictable
- Low memory usage
- Sometimes generalizes better

**Cons:**
- Sensitive to learning rate
- Slow on ill-conditioned problems (narrow ravines)
- Can oscillate

**When to use:** Simple problems, when you want interpretable training dynamics.

### SGD + Momentum

```
velocity = β × velocity - lr × gradient
θ = θ + velocity
```

**What it does:** Accumulate velocity from past gradients.

**Key parameter:** `β` (typically 0.9) — how much past velocity to keep.

**Pros:**
- Accelerates through flat regions
- Dampens oscillations
- Faster convergence than vanilla SGD

**Cons:**
- Can overshoot if β is too high
- One more hyperparameter to tune

**When to use:** Most supervised learning tasks; your default "upgrade" from SGD.

### RMSProp

```
cache = decay × cache + (1-decay) × gradient²
θ = θ - lr × gradient / √(cache + ε)
```

**What it does:** Scale each parameter's learning rate by its recent gradient magnitude.

**Key insight:** If a parameter's gradients have been large, take smaller steps for it.

**Pros:**
- Handles different feature scales
- Works well on non-stationary problems
- Adapts during training

**Cons:**
- Can be sensitive to decay rate
- Less interpretable

**When to use:** RNNs, problems with varying feature scales.

### Adam (Adaptive Moment Estimation)

```
m = β₁ × m + (1-β₁) × gradient           # Momentum
v = β₂ × v + (1-β₂) × gradient²          # RMSProp-like
θ = θ - lr × m / √(v + ε)
```

**What it does:** Combines momentum AND adaptive learning rates.

**Key parameters:**
- `β₁` = 0.9 (momentum decay)
- `β₂` = 0.999 (RMSProp decay)
- `lr` = 0.001 (default starting point)

**Pros:**
- Works well out of the box
- Handles sparse gradients
- Fast convergence

**Cons:**
- Sometimes generalizes worse than SGD
- More hyperparameters (though defaults usually work)

**When to use:** Deep learning default. Start here and only change if needed.

---

## Quick Comparison

| Optimizer | Speed | Tuning Difficulty | Best For |
|-----------|-------|------------------|----------|
| SGD | Slow | Hard | Interpretability |
| Momentum | Medium | Medium | Most tasks |
| RMSProp | Fast | Medium | Varying scales |
| Adam | Fast | Easy | Deep learning |

**Rule of thumb:**
1. Start with Adam (lr=0.001)
2. If it works, done
3. If overfitting, try SGD with momentum
4. If underfitting/slow, increase lr or try a different optimizer

---

## Regularization: Keeping Weights Small

While optimizing, we often add a penalty for large weights:

### L2 Regularization (Ridge)

```
Loss = Original Loss + λ × Σ(weights²)
```

**Effect:** Shrinks all weights toward zero. Prevents any single weight from dominating.

**Use when:** You want to keep all features, just reduce their influence.

### L1 Regularization (Lasso)

```
Loss = Original Loss + λ × Σ|weights|
```

**Effect:** Pushes some weights to exactly zero. Automatic feature selection.

**Use when:** You suspect many features are irrelevant.

### Combined: Elastic Net

```
Loss = Original Loss + λ₁ × Σ|weights| + λ₂ × Σ(weights²)
```

**Use when:** You want some feature selection AND weight shrinkage.

---

## Failure Modes

### 1. Divergence (Loss → ∞)

**Symptom:** Loss explodes to NaN or infinity.

**Cause:** Learning rate too high.

**Fix:**
- Reduce learning rate by 10x
- Check for data issues (extreme values)
- Add gradient clipping

### 2. No Progress (Loss Stuck)

**Symptom:** Loss barely changes after many epochs.

**Cause:** Learning rate too low, or stuck at saddle point.

**Fix:**
- Increase learning rate
- Switch to Adam
- Try different initialization

### 3. Oscillation

**Symptom:** Loss bounces up and down.

**Cause:** Learning rate at edge of stability, or ill-conditioned loss surface.

**Fix:**
- Reduce learning rate slightly
- Add momentum
- Try Adam/RMSProp

### 4. Overfitting During Training

**Symptom:** Train loss decreases but validation loss increases.

**Cause:** Model memorizing training data.

**Fix:**
- Early stopping
- Add regularization (L2)
- Reduce model capacity

---

## Business Translation

### Explaining Learning Rate

**Don't say:** "The learning rate controls the step size of gradient descent."

**Do say:** "The learning rate is like a volume dial for how aggressive the model is in updating itself. Too high and it overshoots; too low and training takes forever."

### Explaining Optimization Choices

**Don't say:** "We use Adam with β₁=0.9 and β₂=0.999."

**Do say:** "We use a modern optimizer that automatically adjusts how quickly each part of the model learns. It's like having cruise control instead of manually adjusting speed."

### Explaining Regularization

**Don't say:** "We add L2 regularization with λ=0.01."

**Do say:** "We add a penalty that prevents the model from becoming too confident in any single factor. It's like diversifying a portfolio instead of going all-in on one stock."

---

## Practice

### Before the Lab

Open the **Interactive Playground** (`playground_gradient_descent.html`):

1. **Start simple:** Use Adam on the "Bowl" surface. Watch clean convergence.
2. **Break it:** Set learning rate to 1.0. Watch it explode.
3. **Compare optimizers:** Try SGD vs Adam on the "Ravine" surface.
4. **Saddle point:** See how SGD gets stuck but Adam escapes.

### Key Observations

- Learning rate has dramatic effects — 10x difference can mean convergence vs divergence
- Momentum smooths oscillations in narrow valleys
- Adam is robust to hyperparameter choices
- Different surfaces favor different optimizers

---

## Quick Reference

### Default Starting Points

| Framework | Code |
|-----------|------|
| sklearn | Not applicable (uses closed-form or L-BFGS) |
| PyTorch | `torch.optim.Adam(model.parameters(), lr=0.001)` |
| TensorFlow | `tf.keras.optimizers.Adam(learning_rate=0.001)` |

### Learning Rate Schedule

If training plateaus, reduce learning rate:
```python
scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
    optimizer, patience=5, factor=0.5
)
```

### Gradient Clipping

If gradients explode:
```python
torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
```

---

## Done Checklist

- [ ] Explored gradient descent in the playground
- [ ] Broke training with high learning rate
- [ ] Compared SGD vs Momentum vs Adam
- [ ] Understood when each optimizer shines
- [ ] Completed the notebook lab
- [ ] Passed the quiz
