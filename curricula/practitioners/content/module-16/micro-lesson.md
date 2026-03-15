# Module 16: CNNs - Learning from Spatial Structure

**Time:** 30-45 minutes

---

## What Are CNNs?

Convolutional Neural Networks (CNNs) are specialized neural networks designed to process data with spatial structure, like images. While dense networks flatten an image into a long vector (losing spatial relationships), CNNs preserve the 2D structure and learn local patterns.

**The key insight:** Nearby pixels are related. A CNN exploits this by looking at small regions at a time.

---

## Why CNNs Beat Dense Networks on Images

### The Problem with Dense Networks

A 28x28 image has 784 pixels. A dense network treats these as 784 independent features, ignoring that:
- Pixel (10, 10) is related to pixel (10, 11)
- An edge in the top-left corner looks the same as an edge in the bottom-right
- Spatial patterns (shapes, textures) matter

### How CNNs Solve This

CNNs use three key ideas:

1. **Local connectivity**: Each neuron looks at a small patch, not the whole image
2. **Weight sharing**: The same filter is applied everywhere (translation invariance)
3. **Hierarchical features**: Early layers detect edges, later layers detect shapes and objects

---

## The Convolution Operation

A convolution slides a small filter (kernel) over the image, computing a weighted sum at each position.

### Example: 3x3 Edge Detection Filter

```
Filter:        Image patch:      Output:
[-1 -1 -1]     [10  50  80]      (-1*10) + (-1*50) + (-1*80) +
[ 0  0  0]  *  [30  60  90]  =   ( 0*30) + ( 0*60) + ( 0*90) +
[ 1  1  1]     [80 100 120]      ( 1*80) + ( 1*100) + ( 1*120)
                                = -140 + 0 + 300 = 160
```

High output = the filter pattern was found at that location.

### What Filters Detect

| Filter Type | Detects |
|-------------|---------|
| Horizontal edge | Boundaries between top/bottom |
| Vertical edge | Boundaries between left/right |
| Blur | Smooth regions, reduce noise |
| Sharpen | Enhance edges and details |

**CNNs learn filters automatically.** You don't hand-code them; the network discovers what patterns help for the task.

---

## Pooling: Shrinking While Preserving

After convolution, pooling reduces the spatial dimensions while keeping important information.

### Max Pooling (Most Common)

For each 2x2 region, take the maximum value:

```
[4 2]
[1 3]  -> Max = 4

[7 9]
[5 1]  -> Max = 9
```

**Why pool?**
- Reduces computation (fewer pixels to process)
- Adds translation invariance (object can shift slightly)
- Prevents overfitting (fewer parameters)

---

## CNN Architecture Pattern

Most CNNs follow this structure:

```
[Conv -> ReLU -> Pool] x N -> Flatten -> Dense -> Output

Example for image classification:
- Conv2D(32 filters) -> ReLU -> MaxPool
- Conv2D(64 filters) -> ReLU -> MaxPool
- Conv2D(64 filters) -> ReLU
- Flatten
- Dense(64) -> ReLU
- Dense(num_classes) -> Softmax
```

### Layer-by-Layer Intuition

| Layer | Input | Output | What Happens |
|-------|-------|--------|--------------|
| Conv2D(32) | 28x28x1 | 26x26x32 | 32 filters detect 32 patterns |
| MaxPool | 26x26x32 | 13x13x32 | Halve spatial size |
| Conv2D(64) | 13x13x32 | 11x11x64 | Combine patterns into shapes |
| MaxPool | 11x11x64 | 5x5x64 | Halve again |
| Flatten | 5x5x64 | 1600 | Convert to 1D for classification |
| Dense(10) | 1600 | 10 | Class probabilities |

---

## When to Use CNNs

### Use CNNs When:
- Data has spatial structure (images, spectrograms, maps)
- Position relationships matter (nearby pixels are related)
- You have thousands of labeled examples
- Translation invariance is desirable (object can be anywhere)

### Don't Use CNNs When:
- Data is tabular (use gradient boosting)
- Dataset is very small (<1000 samples)
- Interpretability is critical
- Features are not spatially related

---

## CNN vs Dense: The Numbers

On Fashion-MNIST (28x28 clothing images):

| Model | Test Accuracy | Parameters |
|-------|---------------|------------|
| Dense (128-64) | ~87% | ~100K |
| CNN (32-64-64) | ~91% | ~60K |

**CNN wins with fewer parameters.** Spatial structure is that important for images.

---

## Common CNN Failure Modes

### 1. Overfitting on Small Datasets

**Symptoms:** 99% train accuracy, 70% test accuracy

**Causes:**
- Too many parameters for data size
- No regularization

**Fixes:**
- Add Dropout after conv and dense layers
- Add BatchNormalization
- Use data augmentation (flip, rotate, crop)
- Try a smaller architecture

### 2. Underfitting

**Symptoms:** Both train and test accuracy are low

**Causes:**
- Architecture too simple
- Not enough training

**Fixes:**
- Add more filters or layers
- Train longer
- Reduce regularization

### 3. Slow Convergence

**Symptoms:** Loss decreases very slowly

**Causes:**
- Learning rate too low
- No batch normalization

**Fixes:**
- Increase learning rate
- Add BatchNormalization after conv layers

---

## Regularization Techniques for CNNs

### Dropout

Randomly set some activations to zero during training.

```python
layers.Dropout(0.25)  # After conv layers
layers.Dropout(0.5)   # After dense layers
```

### BatchNormalization

Normalize activations to have mean 0 and variance 1.

```python
layers.Conv2D(32, (3, 3), activation='relu')
layers.BatchNormalization()
layers.MaxPooling2D((2, 2))
```

### Data Augmentation

Create variations of training images:
- Horizontal flip
- Small rotations
- Zoom in/out
- Shift left/right/up/down

---

## Transfer Learning (For Small Datasets)

If you have few images, don't train from scratch. Use a pretrained CNN:

1. Take a CNN trained on ImageNet (millions of images)
2. Remove the final classification layer
3. Add your own classification layer
4. Fine-tune on your data

**Popular pretrained models:** ResNet, VGG, EfficientNet, MobileNet

---

## Key Takeaways

1. **CNNs preserve spatial structure** that dense networks ignore
2. **Convolution filters** detect local patterns (learned automatically)
3. **Pooling** reduces size while keeping important features
4. **CNNs beat dense networks** on images with fewer parameters
5. **Regularization is essential** for small datasets (dropout, batch norm, augmentation)
6. **Use transfer learning** when data is limited

---

## Next Steps

- Explore the interactive CNN playground
- Complete the notebook lab on Fashion-MNIST
- Try the debug drill on CNN overfitting
- Move to Module 17: Transformers
