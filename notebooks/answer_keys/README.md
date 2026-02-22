# Answer Keys: Debug Drill Solutions

This folder contains complete solutions for all 10 debug drills.

## Files

| Solution | Drill Topic | Key Bug | Key Lesson |
|----------|-------------|---------|------------|
| `solution_01_leakage.ipynb` | Data Leakage | Features from future data | "Would I have this at prediction time?" |
| `solution_02_coefficients.ipynb` | Misleading Coefficients | Unscaled features | Scale before interpreting |
| `solution_03_wrong_metric.ipynb` | Wrong Metric | Accuracy on imbalanced data | Use Precision@K, AUC, not accuracy |
| `solution_04_overfitting.ipynb` | Overfitting | Aggressive hyperparameters | Use early stopping + regularization |
| `solution_05_leaky_feature.ipynb` | Leaky Features | Future info in engineering | Audit every derived feature |
| `solution_06_wrong_threshold.ipynb` | Wrong Threshold | Default 0.5 threshold | Align threshold to business constraint |
| `solution_07_wrong_k.ipynb` | Wrong K | Too many clusters | Use Elbow Method |
| `solution_08_bad_similarity.ipynb` | Bad Similarity | Count + Euclidean | Use TF-IDF + Cosine |
| `solution_09_hallucination.ipynb` | Hallucination | No fact-checking | Ground in knowledge base |
| `solution_10_runaway_agent.ipynb` | Runaway Agent | No guardrails | Add limits and stop conditions |

## How to Use

1. **Attempt the drill first** - Work through the original debug drill in `../debug_drills/`
2. **Check your work** - Compare your solution to the answer key
3. **Review the postmortem** - Each solution includes a completed postmortem

## Solution Structure

Each answer key includes:

1. **The Bug** - Shows the original buggy code
2. **Why It's Wrong** - Explains the root cause
3. **The Fix** - Complete corrected code
4. **Self-Check** - Assertions to verify the fix
5. **Postmortem** - Three-bullet summary (what, root cause, prevention)

## For Instructors

These solutions can be:
- Hidden behind a paywall as premium content
- Released after learners submit their drill
- Used for grading rubrics

## Data URLs

Solutions use the GitHub-hosted data:
```
https://raw.githubusercontent.com/189investmentai/ml-foundations-interactive/main/streamcart_customers.csv
```
