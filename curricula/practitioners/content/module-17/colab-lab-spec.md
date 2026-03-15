# Colab Lab Spec: Module 17 - Transformers

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/module_17_transformers.ipynb` |
| Runtime | ~25 minutes |
| Dataset | Synthetic (tokens, embeddings) |
| Target | N/A (conceptual) |

## Learning Objectives

After completing this lab, learners will be able to:
1. Implement scaled dot-product attention from scratch (Q, K, V)
2. Visualize attention patterns and interpret how tokens attend to each other
3. Explain how attention resolves ambiguity (e.g., "bank" in river context)
4. Implement multi-head attention and understand different head roles
5. Generate sinusoidal positional encodings and understand context window limits

## Sections

### 1. Setup (2 min)
- Import numpy, pandas, matplotlib, seaborn
- Set random seed and figure size

### 2. Part 1: The Attention Mechanism from Scratch (5 min)
- Implement `softmax` and `attention(Q, K, V)` functions
- Formula: `Attention(Q, K, V) = softmax(QK^T / √d_k) × V`
- Run example with 4 tokens ("The", "cat", "sat", "down"), d_model=8
- **Self-check:** Output shape matches input; weights sum to 1 per row

### 3. Part 2: Visualizing Attention Patterns (3 min)
- Heatmap of attention weights (tokens × tokens)
- Interpret: each row shows what one token attends to

### 4. Part 3: How Attention Captures Meaning (3 min)
- Simulate ambiguous sentence: "The bank by the river had many fish"
- Mock attention showing "bank" attending to "river" and "fish"
- Visualize disambiguation via attention heatmap

### 5. Part 4: Multi-Head Attention (4 min)
- Implement `multi_head_attention(X, num_heads=4)`
- Each head has separate Q, K, V projections
- Visualize 4 heads with different pattern labels (Syntactic, Semantic, Local, Mixed)

### 6. Part 5: Positional Encoding (3 min)
- Implement `sinusoidal_positional_encoding(seq_len, d_model)`
- Visualize PE matrix (position × dimension)
- Explain: sine/cosine waves give each position a unique pattern

### 7. Part 6: Using Pre-trained Transformers (2 min)
- Code examples for HuggingFace pipelines (sentiment, generation, zero-shot, NER)
- Installation and model references (distilbert, gpt2, etc.)

### 8. Part 7: Context Window Limitations (2 min)
- Bar chart of context windows (GPT-2 to Claude-3)
- Discuss O(n²) attention complexity

### 9. Self-Check (1 min)
- **Self-check:** `weights.shape` square; rows sum to 1; output shape correct

### 10. Part 8: Stakeholder Summary (3 min)
- **TODO:** Write 3-bullet summary (~100 words) for PM
- Template: What attention does, why transformers win, context window impact

## Self-Checks

| Check | Assertion |
|-------|-----------|
| Attention weights square | `weights.shape[0] == weights.shape[1]` |
| Weights normalized | `np.allclose(weights.sum(axis=1), 1.0)` |
| Output dimensions | `output.shape == (len(tokens), d_model)` |

## Expected Outputs

- Attention heatmap for 4-token example
- Disambiguation heatmap for "bank" sentence
- Multi-head attention visualization (4 subplots)
- Positional encoding heatmap
- Context window bar chart

## TODO Blocks

1. **Stakeholder summary** (Part 8): Write 3-bullet summary for PM on attention, transformers, and context windows

## Dependencies

- numpy
- pandas
- matplotlib
- seaborn
