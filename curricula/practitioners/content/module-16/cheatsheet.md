# Module 16 Cheatsheet: CNNs

## Core Concepts

| Concept | What It Does |
|---------|--------------|
| **Convolution** | Slides a filter over the image, detecting local patterns |
| **Filter/Kernel** | Small weight matrix (3x3, 5x5) that learns patterns |
| **Feature Map** | Output of applying one filter to the input |
| **Pooling** | Reduces spatial size while keeping strong activations |
| **Stride** | How many pixels to skip when sliding the filter |
| **Padding** | Adding zeros around the image to control output size |

---

## Standard CNN Architecture

```
Input (H, W, C)
    ↓
Conv2D(filters, kernel_size) → ReLU
    ↓
MaxPooling2D(pool_size)
    ↓
[Repeat Conv → Pool blocks]
    ↓
Flatten
    ↓
Dense → ReLU
    ↓
Dense(num_classes) → Softmax
    ↓
Output (class probabilities)
```

---

## Keras Layer Reference

```python
# Convolution
layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1))

# Pooling
layers.MaxPooling2D((2, 2))

# Regularization
layers.BatchNormalization()
layers.Dropout(0.25)

# Classification head
layers.Flatten()
layers.Dense(64, activation='relu')
layers.Dense(10, activation='softmax')
```

---

## Output Size Formulas

**Convolution (no padding):**
```
output_size = input_size - kernel_size + 1
Example: 28 - 3 + 1 = 26
```

**Convolution (same padding):**
```
output_size = input_size (with zero padding)
```

**Pooling:**
```
output_size = input_size / pool_size
Example: 26 / 2 = 13
```

---

## Hyperparameter Defaults

| Parameter | Typical Values |
|-----------|----------------|
| Filters (early layers) | 32, 64 |
| Filters (deeper layers) | 64, 128, 256 |
| Kernel size | 3x3 (most common), 5x5, 7x7 |
| Pool size | 2x2 |
| Stride | 1 (conv), 2 (pool) |
| Dropout (conv) | 0.25 |
| Dropout (dense) | 0.5 |

---

## When to Use CNNs

| Data Type | Use CNN? |
|-----------|----------|
| Images | Yes |
| Spectrograms (audio) | Yes |
| Time series (1D) | Maybe (Conv1D) |
| Tabular data | No (use gradient boosting) |
| Text | Maybe (but transformers better) |

---

## Common Architectures

| Name | Depth | Use Case |
|------|-------|----------|
| LeNet | 5 layers | Simple, educational |
| VGG | 16-19 layers | Clean architecture |
| ResNet | 50-152 layers | Deep with skip connections |
| MobileNet | Light | Mobile/edge devices |
| EfficientNet | Varies | Best accuracy/compute tradeoff |

---

## Regularization Checklist

- [ ] BatchNormalization after conv layers
- [ ] Dropout(0.25) after pooling
- [ ] Dropout(0.5) before final dense
- [ ] Data augmentation (flip, rotate, shift)
- [ ] Early stopping on validation loss
- [ ] L2 regularization (kernel_regularizer)

---

## Debugging Overfitting

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| Train 99%, Test 70% | Too complex for data | Add dropout, simplify |
| Gap grows over epochs | Training too long | Early stopping |
| High variance | Not enough data | Data augmentation |

---

## Quick Code Template

```python
from tensorflow import keras
from tensorflow.keras import layers

model = keras.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    layers.BatchNormalization(),
    layers.MaxPooling2D((2, 2)),
    layers.Dropout(0.25),
    
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.BatchNormalization(),
    layers.MaxPooling2D((2, 2)),
    layers.Dropout(0.25),
    
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(10, activation='softmax')
])

model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

model.fit(X_train, y_train, epochs=10, validation_split=0.1,
          callbacks=[keras.callbacks.EarlyStopping(patience=3)])
```

---

## Key Equations

**Convolution output:**
```
output[i,j] = sum(input[i:i+k, j:j+k] * kernel)
```

**Number of parameters in Conv2D:**
```
params = (kernel_h * kernel_w * input_channels + 1) * num_filters
Example: (3 * 3 * 1 + 1) * 32 = 320 params
```
