# Neural Networks Cheatsheet

## Core Idea

Neural networks learn feature representations automatically through layers of transformations.

---

## Key Components

| Part | Role |
|------|------|
| Layer | Transformation step |
| Weights | Connection strengths |
| Bias | Offset per neuron |
| Activation | Adds non-linearity |

---

## Activation Functions

| Function | Range | Use |
|----------|-------|-----|
| ReLU | [0, ∞) | Hidden layers |
| Sigmoid | [0, 1] | Binary output |
| Softmax | [0, 1], sum=1 | Multi-class |
| Tanh | [-1, 1] | Hidden layers |

---

## Quick Code (Keras)

```python
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense, Dropout

model = Sequential([
    Dense(128, activation='relu', input_shape=(n_features,)),
    Dropout(0.3),
    Dense(64, activation='relu'),
    Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy')
model.fit(X_train, y_train, epochs=50, validation_split=0.2)
```

---

## When to Use NN

| Use NN | Use Simpler |
|--------|-------------|
| Images, text, audio | Tabular data |
| 10,000+ samples | <10,000 samples |
| Feature eng hard | Clear features |
| SOTA needed | Interpretability needed |

---

## Common Issues

| Problem | Symptom | Fix |
|---------|---------|-----|
| Overfit | Train good, val bad | Dropout, early stop |
| Underfit | Both bad | Bigger network |
| Vanishing grad | Training stuck | ReLU, batch norm |

---

## Hyperparameters

| Param | Typical |
|-------|---------|
| Learning rate | 0.001 |
| Batch size | 32-128 |
| Hidden layers | 2-4 |
| Neurons | 64-256 |

---

## Business Translation

**Neural network:** "System that learns patterns automatically"

**Training:** "Repeatedly improves by checking its mistakes"

**Deep learning:** "Networks with many layers that learn complex patterns"
