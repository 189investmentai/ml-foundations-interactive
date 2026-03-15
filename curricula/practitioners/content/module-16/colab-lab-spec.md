# Colab Lab Spec: Module 16 - CNNs

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/module_16_cnns.ipynb` |
| Runtime | ~25 minutes |
| Dataset | Fashion-MNIST (60K train, 10K test, 28×28 grayscale) |
| Target | 10 classes (T-shirt, Trouser, Pullover, Dress, Coat, Sandal, Shirt, Sneaker, Bag, Boot) |

## Learning Objectives

After completing this lab, learners will be able to:
1. Explain why CNNs exploit spatial structure better than dense networks
2. Apply convolution filters (edge detection, sharpen) and understand learned filters
3. Use max pooling to reduce spatial dimensions
4. Build a CNN: Conv2D → MaxPool → Conv2D → MaxPool → Conv2D → Flatten → Dense
5. Visualize feature maps and learned filters
6. Compare CNN vs dense network accuracy and parameter count
7. Add regularization (Dropout, BatchNormalization) to reduce overfitting

## Sections

### 1. Setup (1 min)
- Import keras, layers, fashion_mnist, classification_report, confusion_matrix

### 2. Part 1: Why Spatial Structure Matters (3 min)
- Load Fashion-MNIST
- Visualize sample images and class names
- Normalize to [0,1]; reshape for CNN (28,28,1) vs dense (784,)
- **Self-check:** CNN input (28,28,1), dense (784,)

### 3. Part 2: The Convolution Operation (4 min)
- Apply horizontal_edge, vertical_edge, sharpen filters via scipy.ndimage.convolve
- Visualize original, filter, filtered output
- **Self-check:** CNNs learn these filters automatically

### 4. Part 3: Pooling and Downsampling (3 min)
- Implement visualize_pooling (2×2 max pooling)
- Show size reduction (28×28 → 14×14)
- **Self-check:** ~75% fewer values after pooling

### 5. Part 4: Build a CNN (3 min)
- Conv2D(32,3×3) → MaxPool(2×2) → Conv2D(64,3×3) → MaxPool(2×2) → Conv2D(64,3×3) → Flatten → Dense(64) → Dense(10, softmax)
- Compile with Adam, sparse_categorical_crossentropy
- **Self-check:** model.summary() shows layer shapes

### 6. Part 5: Train and Evaluate (5 min)
- Train for 5 epochs, batch_size=64, validation_split=0.1
- Plot loss and accuracy curves
- Evaluate on test set; print classification_report, confusion_matrix
- **Self-check:** `test_acc > 0.85`

### 7. Part 6: Visualize Learned Filters and Feature Maps (4 min)
- Extract first conv layer weights; plot 32 filters
- Create activation model; plot feature maps for sample image
- **Self-check:** Filters and feature maps visualized

### 8. Part 7: CNN vs Dense Network Comparison (4 min)
- Build dense model (Flatten → Dense(128) → Dense(64) → Dense(10))
- Train both; compare test accuracy and parameter count
- **Self-check:** CNN accuracy > dense; CNN params < dense

### 9. Part 8: TODO - Experiment with Regularization (3 min)
- **TODO:** Build regularized CNN with BatchNormalization and Dropout(0.25, 0.5)
- **TODO:** Train and compare to original CNN
- **Self-check:** Regularization may improve or maintain accuracy

### 10. Part 9: When to Use CNNs (2 min)
- Decision heuristic table: images→CNN, tabular→GBM, text→Transformers
- **Self-check:** Understand use cases

### 11. Stakeholder Summary (2 min)
- **TODO:** Write 3-bullet summary: what CNNs do, why they work, when to use

## Self-Checks

| Check | Assertion |
|-------|-----------|
| CNN accuracy > 85% | `test_acc > 0.85` |
| CNN beats dense | `test_acc > dense_test_acc` |
| CNN fewer params | `cnn_model.count_params() < dense_model.count_params()` |

## Expected Outputs

- CNN test accuracy: ~88–92%
- Dense test accuracy: ~87–90%
- CNN parameters: ~50–100K; Dense: ~100–200K
- Common confusions: Shirt vs T-shirt, Pullover vs Coat

## TODO Blocks

1. **Build regularized CNN** (Part 8) – Add BatchNormalization, Dropout after conv and dense
2. **Train regularized model and compare** (Part 8) – Uncomment fit and evaluate
3. **Write 3-bullet stakeholder summary** (Part 10) – Template: what CNNs do, why they work, when to use

## Dependencies

- numpy, matplotlib
- tensorflow (keras)
- scipy (ndimage.convolve for filter demo)
- sklearn: metrics (classification_report, confusion_matrix)
