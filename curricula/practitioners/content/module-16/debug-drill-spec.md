# Debug Drill Spec: Module 16 - CNN Overfitting

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/debug_drills/drill_16_cnn_overfit.ipynb` |
| Solution | `notebooks/answer_keys/solution_16_cnn_overfit.ipynb` |
| Runtime | ~25 minutes |
| Bug Type | Overfitting / No Regularization |

## Scenario

Your colleague built a CNN to classify Fashion-MNIST images. They're excited because training accuracy reached 99%! But when deployed, the model performs poorly on new images (~65–70% test accuracy). Users complain the model misclassifies obvious items. The model has ~1.5M parameters for only 2000 training samples (~750 params per sample). With no regularization (no Dropout, no BatchNormalization, no early stopping), the model memorizes the training set instead of learning generalizable patterns.

## The Bug

```python
# ========================================
# BUGGY CODE - DO NOT MODIFY (yet)
# ========================================

buggy_model = keras.Sequential([
    # Very deep architecture for small dataset
    layers.Conv2D(64, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    
    layers.Conv2D(128, (3, 3), activation='relu'),
    layers.Conv2D(128, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    
    layers.Conv2D(256, (3, 3), activation='relu'),
    
    layers.Flatten(),
    layers.Dense(512, activation='relu'),
    layers.Dense(256, activation='relu'),
    layers.Dense(10, activation='softmax')
])

buggy_model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
# No Dropout, BatchNorm, or early stopping
```

### Why It's Wrong

1. **Too many parameters** - ~1.5M parameters for 2000 samples; ratio ~750:1. A rule of thumb is <10 params per sample for small datasets. The model can memorize.
2. **No regularization** - No Dropout to prevent co-adaptation; no BatchNorm for stability. The model overfits easily.
3. **Too deep for the task** - 5 conv layers + 2 large dense layers is overkill for 28×28 Fashion-MNIST. Simpler architectures generalize better with limited data.

## Investigation Steps

1. **Check params-to-samples ratio** - `buggy_model.count_params() / len(X_train)` >> 10
2. **Observe train-test gap** - Train ~99%, test ~65–70%; large gap indicates overfitting
3. **Add regularization** - Dropout (0.25 after conv, 0.5 after dense), BatchNormalization
4. **Simplify architecture** - Fewer filters (32, 64), smaller dense (64)
5. **Add early stopping** - Monitor val_loss; restore best weights

## The Fix

```python
# FIXED MODEL with proper regularization

fixed_model = keras.Sequential([
    # Simpler architecture
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

fixed_model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Train with early stopping
early_stop = keras.callbacks.EarlyStopping(
    monitor='val_loss',
    patience=3,
    restore_best_weights=True
)

fixed_model.fit(X_train, y_train, epochs=20, batch_size=32,
               validation_split=0.2, callbacks=[early_stop], verbose=1)
```

## Self-Checks

| Check | Assertion |
|-------|-----------|
| Train-test gap reduced | `fixed_gap < buggy_gap * 0.5` |
| Params per sample reasonable | `fixed_model.count_params() / len(X_train) < 100` |

## Postmortem Template

### What happened:
- Training accuracy 99%, test accuracy ~65–70%; model memorized training data

### Root cause:
- 1.5M parameters for 2000 samples; no regularization; architecture too deep

### How to prevent:
- Check params-to-samples ratio (keep <10 for small datasets)
- Use Dropout and BatchNorm by default
- Monitor train-test gap; use early stopping
- Consider data augmentation for image tasks with limited data

## Learning Objectives

After completing this drill, learners will be able to:
1. Diagnose CNN overfitting (high train, low test accuracy)
2. Apply regularization (Dropout, BatchNorm, early stopping)
3. Match architecture complexity to data size
