# Optimization Cheatsheet

## The Core Loop

```
θ = θ - learning_rate × gradient
```

**Gradient:** Direction of steepest increase → go opposite direction
**Learning Rate:** Step size → too big = overshoot, too small = slow

---

## Optimizers at a Glance

| Optimizer | Key Idea | Default LR | Best For |
|-----------|----------|------------|----------|
| **SGD** | Follow gradient | 0.01 | Simple, interpretable |
| **Momentum** | Add velocity | 0.01, β=0.9 | Most supervised learning |
| **RMSProp** | Adapt per param | 0.001 | Different feature scales |
| **Adam** | Momentum + Adaptive | 0.001 | Deep learning default |

---

## Quick Formulas

**SGD:**
```
θ = θ - lr × g
```

**Momentum:**
```
v = β×v - lr×g
θ = θ + v
```

**Adam:**
```
m = β₁×m + (1-β₁)×g       # momentum
v = β₂×v + (1-β₂)×g²      # adaptive
θ = θ - lr × m/√(v+ε)
```

---

## Learning Rate Rules

| LR Value | Typical Result |
|----------|----------------|
| 1.0 | Divergence (explosion) |
| 0.1 | Often too aggressive |
| 0.01 | Good for SGD |
| 0.001 | Good for Adam |
| 0.0001 | Often too slow |

**Golden rule:** If loss explodes → reduce LR by 10x

---

## Regularization

**L2 (Ridge):** Shrinks weights → `Loss + λ×Σw²`
- Use when: Keep all features, reduce magnitude

**L1 (Lasso):** Zeros out weights → `Loss + λ×Σ|w|`
- Use when: Want automatic feature selection

---

## Failure Mode Quick Fixes

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| Loss → NaN | LR too high | Reduce LR by 10x |
| Loss stuck | LR too low or saddle | Increase LR, try Adam |
| Loss oscillates | LR borderline | Reduce LR, add momentum |
| Val loss ↑, train ↓ | Overfitting | Early stopping, add L2 |

---

## Decision Flowchart

```
Start with Adam (lr=0.001)
        ↓
    Works? → Done
        ↓ No
  Diverging? → Reduce LR
        ↓ No
   Too slow? → Increase LR or try SGD+Momentum
        ↓ No
  Overfitting? → Add regularization, reduce model size
```

---

## Code Snippets

**PyTorch:**
```python
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
for epoch in range(epochs):
    optimizer.zero_grad()
    loss = criterion(model(X), y)
    loss.backward()
    optimizer.step()
```

**Learning Rate Scheduling:**
```python
scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
    optimizer, patience=5, factor=0.5
)
scheduler.step(val_loss)
```

---

## Business Translation

**Learning rate:** "Volume dial for how aggressively the model updates"

**Adam vs SGD:** "Adam = cruise control. SGD = manual transmission."

**Regularization:** "Penalty that keeps the model from overcommitting to any single factor"
