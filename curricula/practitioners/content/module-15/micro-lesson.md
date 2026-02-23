# Module 15: Neural Networks - Learning Representations

**Time:** 35-45 minutes

**Promise:** After this module, you'll understand how neural networks learn, why they're powerful, and when to use them vs simpler models.

---

## The Setup

You've seen linear regression, decision trees, and gradient boosting. They work great for tabular data.

But what about:
- Recognizing faces in photos?
- Understanding spoken language?
- Generating realistic text?

**Neural networks** learn the right features automatically from raw data.

---

## The Mental Models

### 1. The Layer Cake

A neural network is a stack of transformations:

```
Input → Layer 1 → Layer 2 → Layer 3 → Output
         ↓          ↓          ↓
     Features   Patterns   Decisions
```

Each layer builds on the previous, creating increasingly abstract representations.

### 2. The Feature Factory

Traditional ML: You engineer features by hand
Neural networks: They learn features automatically

For images:
- Layer 1: Edges, corners
- Layer 2: Textures, shapes
- Layer 3: Parts (eyes, wheels)
- Layer 4: Objects (faces, cars)

### 3. The Universal Approximator

With enough neurons, a neural network can learn *any* function — given enough data and time to train.

---

## How Neural Networks Work

### The Neuron

A single neuron is just weighted linear regression + a non-linearity:

```
output = activation(w₁x₁ + w₂x₂ + ... + wₙxₙ + bias)
```

**Without activation:** Just linear regression (can only learn lines)
**With activation:** Can learn curves and complex patterns

### Key Components

| Component | What It Does |
|-----------|--------------|
| **Input Layer** | Receives raw data |
| **Hidden Layers** | Learn representations |
| **Output Layer** | Produces predictions |
| **Weights** | Strength of connections |
| **Biases** | Offset for each neuron |
| **Activation** | Adds non-linearity |

---

## Activation Functions

The "non-linearity" that makes networks powerful.

### ReLU (Rectified Linear Unit)

```
ReLU(x) = max(0, x)
```

- **Pros:** Fast, avoids vanishing gradients
- **Cons:** "Dying ReLU" problem
- **Use:** Default for hidden layers

### Sigmoid

```
σ(x) = 1 / (1 + e⁻ˣ)
```

- **Range:** 0 to 1
- **Use:** Binary classification output
- **Problem:** Vanishing gradients in deep networks

### Softmax

```
softmax(xᵢ) = eˣⁱ / Σeˣʲ
```

- **Range:** 0 to 1, sums to 1
- **Use:** Multi-class classification output
- **Output:** Probability distribution

### Tanh

```
tanh(x) = (eˣ - e⁻ˣ) / (eˣ + e⁻ˣ)
```

- **Range:** -1 to 1
- **Use:** When you need negative outputs

---

## Forward Pass

How a network makes predictions:

```python
# Simple 2-layer network
def forward(x, W1, b1, W2, b2):
    # Layer 1
    z1 = x @ W1 + b1      # Linear combination
    a1 = relu(z1)          # Activation
    
    # Layer 2 (output)
    z2 = a1 @ W2 + b2
    output = sigmoid(z2)   # For binary classification
    
    return output
```

Data flows left to right, transforming at each layer.

---

## Backpropagation

How networks learn: compute gradients and update weights.

### The Intuition

1. **Forward pass:** Make a prediction
2. **Compute loss:** How wrong were we?
3. **Backward pass:** Propagate error backward through layers
4. **Update weights:** Move in direction that reduces error

### The Chain Rule

Backprop is just the chain rule from calculus:

```
∂Loss/∂w₁ = ∂Loss/∂output × ∂output/∂hidden × ∂hidden/∂w₁
```

Each layer passes gradients to the previous layer.

### Gradient Descent Update

```python
for each weight w:
    w = w - learning_rate * gradient
```

---

## Network Architecture

### Depth vs Width

- **Deep:** Many layers (more abstraction levels)
- **Wide:** Many neurons per layer (more patterns per level)

| Architecture | Good For |
|--------------|----------|
| Shallow + Wide | Simple patterns, faster training |
| Deep + Narrow | Complex hierarchical patterns |
| Deep + Wide | Complex tasks with lots of data |

### Common Architectures

| Type | Structure | Use Case |
|------|-----------|----------|
| **MLP** | Fully connected | Tabular data |
| **CNN** | Convolutional | Images |
| **RNN** | Recurrent | Sequences |
| **Transformer** | Self-attention | Text, vision |

---

## Training in Practice

### Loss Functions

| Task | Loss Function |
|------|---------------|
| Regression | MSE, MAE |
| Binary classification | Binary cross-entropy |
| Multi-class | Categorical cross-entropy |

### Hyperparameters

| Hyperparameter | Typical Values |
|----------------|----------------|
| Learning rate | 0.001, 0.0001 |
| Batch size | 32, 64, 128 |
| Epochs | Until validation plateaus |
| Hidden layers | 2-5 for MLPs |
| Neurons per layer | 64, 128, 256 |

### Regularization

Prevent overfitting:

- **Dropout:** Randomly disable neurons during training
- **L2 regularization:** Penalize large weights
- **Early stopping:** Stop when validation loss plateaus
- **Batch normalization:** Stabilize training

---

## When to Use Neural Networks

### Use Neural Networks When:

- Data is unstructured (images, text, audio)
- You have lots of data (10,000+ examples)
- Feature engineering is hard or impossible
- State-of-the-art performance is needed

### Prefer Simpler Models When:

- Data is tabular and structured
- You have small datasets (<10,000)
- Interpretability is critical
- Training time/resources are limited
- Gradient boosting works well enough

### The Reality Check

For many business problems, gradient boosting on tabular data beats neural networks. Don't use a sledgehammer when a screwdriver works.

---

## Failure Modes

### 1. Overfitting

**Symptom:** Perfect training loss, poor validation loss.

**Fix:** More data, dropout, early stopping, simpler architecture.

### 2. Underfitting

**Symptom:** Poor training AND validation loss.

**Fix:** Bigger network, train longer, lower regularization.

### 3. Vanishing/Exploding Gradients

**Symptom:** Training stops improving or explodes.

**Fix:** Use ReLU, batch normalization, gradient clipping, residual connections.

### 4. Dead ReLU

**Symptom:** Many neurons output exactly 0.

**Fix:** Use Leaky ReLU, lower learning rate, better initialization.

---

## Business Translation

### Explaining Neural Networks

**Don't say:** "We use a 3-layer MLP with ReLU activations trained with Adam."

**Do say:** "We use a system that automatically learns patterns in the data, layer by layer. Early layers find simple patterns, later layers combine them into complex ones."

### Explaining Training

**Don't say:** "We minimize cross-entropy loss using backpropagation."

**Do say:** "The model makes predictions, checks how wrong it was, and adjusts itself to be more accurate next time. We repeat this millions of times until it's accurate enough."

### Explaining Why Not Always Use NN

**Don't say:** "Neural networks have high sample complexity."

**Do say:** "For your customer data with 5,000 rows and clear features like age and purchase amount, simpler models work just as well and are faster to build and easier to explain."

---

## Practice

### Before the Lab

Open the **Interactive Playground** (`playground_neural_nets.html`):

1. Build networks with different layer depths
2. See how activation functions shape decision boundaries
3. Watch training progress with forward/backward passes
4. Compare architectures on different data patterns

### Key Observations

- More layers = more complex boundaries
- ReLU creates sharp boundaries, sigmoid creates smooth ones
- Overfitting happens with too many neurons for the data
- Training dynamics matter as much as architecture

---

## Quick Reference

### PyTorch Basics

```python
import torch.nn as nn

model = nn.Sequential(
    nn.Linear(input_dim, 128),
    nn.ReLU(),
    nn.Dropout(0.3),
    nn.Linear(128, 64),
    nn.ReLU(),
    nn.Linear(64, output_dim),
    nn.Sigmoid()
)

criterion = nn.BCELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

# Training loop
for epoch in range(epochs):
    optimizer.zero_grad()
    outputs = model(X_train)
    loss = criterion(outputs, y_train)
    loss.backward()
    optimizer.step()
```

### Keras Basics

```python
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense, Dropout

model = Sequential([
    Dense(128, activation='relu', input_shape=(input_dim,)),
    Dropout(0.3),
    Dense(64, activation='relu'),
    Dense(output_dim, activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
model.fit(X_train, y_train, epochs=50, validation_split=0.2)
```

---

## Done Checklist

- [ ] Understood layers, weights, and activations
- [ ] Visualized forward pass in the playground
- [ ] Explored different architectures
- [ ] Understood when to use NN vs simpler models
- [ ] Completed the notebook lab
- [ ] Passed the quiz
