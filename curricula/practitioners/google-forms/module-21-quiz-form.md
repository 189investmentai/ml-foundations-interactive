# Module 21 Quiz: MLOps - Google Forms Setup

## Form Setup

1. Go to https://docs.google.com/forms
2. Click **+ Blank**
3. Settings → Enable **"Make this a quiz"**
4. Enable **"Release grade immediately after submission"**

---

## Form Title & Description

**Title:** Module 21 Quiz: MLOps

**Description:** 
Test your understanding. 8 questions, ~10 minutes.

---

## Questions (Copy-Paste Ready)

### Question 1

**Question:**
Your model worked perfectly yesterday but gives different results today with the same code. What's the most likely cause?

**Options:**
- A) The computer is slower today
- B) Random seeds weren't set, or data changed ✓ CORRECT
- C) Python updated automatically
- D) The model is too complex

**Feedback (add to correct answer):**
Reproducibility failures usually stem from uncontrolled randomness (no fixed seeds) or data changes. Always set random seeds for all libraries (numpy, sklearn, etc.) and version your data to ensure reproducibility.

**Points:** 1

---

### Question 2

**Question:**
What should you include when saving a trained model for production?

**Options:**
- A) Just the model file (.joblib or .pkl)
- B) Model file + metadata (version, training date, metrics, features, threshold) ✓ CORRECT
- C) Only the code that trained it
- D) Just the predictions it made

**Feedback (add to correct answer):**
Model artifacts need metadata for traceability. You need to know when it was trained, on what data, what metrics it achieved, and what configuration it uses. This enables debugging, comparison, and rollback.

**Points:** 1

---

### Question 3

**Question:**
Why should configuration be externalized (in YAML/JSON files) rather than hardcoded?

**Options:**
- A) It's faster to run
- B) It allows changing parameters without modifying code, and tracks changes in version control ✓ CORRECT
- C) Python requires it
- D) It makes the code shorter

**Feedback (add to correct answer):**
Externalized config separates parameters from logic. This means you can change hyperparameters, thresholds, or data paths without code changes, and config changes are tracked in version control for reproducibility.

**Points:** 1

---

### Question 4

**Question:**
A colleague asks why you're spending time on "MLOps" instead of improving the model. The best response is:

**Options:**
- A) "It's what everyone does"
- B) "Without proper versioning and pipelines, we can't reliably deploy updates, debug issues, or roll back problems. This ensures our model improvements actually reach production safely." ✓ CORRECT
- C) "Management requires it"
- D) "It's more interesting than modeling"

**Feedback (add to correct answer):**
MLOps enables model improvements to reach production reliably. Without it, even great models can fail in deployment, cause incidents, or be impossible to debug. It's not overhead—it's infrastructure for delivering value.

**Points:** 1

---

### Question 5

**Question:**
What's the difference between batch and real-time model serving?

**Options:**
- A) Batch is faster
- B) Batch runs predictions on a schedule for many records; real-time responds to individual requests immediately ✓ CORRECT
- C) Real-time is only for neural networks
- D) They're the same thing

**Feedback (add to correct answer):**
Batch prediction runs periodically (e.g., nightly) to score many records at once—good for marketing campaigns or reports. Real-time serving responds to individual requests with low latency—good for user-facing features like recommendations or fraud detection.

**Points:** 1

---

### Question 6

**Question:**
Your requirements.txt just says "pandas" without a version. Why is this problematic?

**Options:**
- A) It's not problematic
- B) Different versions may be installed over time, potentially breaking your code ✓ CORRECT
- C) Pandas won't install without a version
- D) It runs slower

**Feedback (add to correct answer):**
Without pinned versions, `pip install` grabs the latest version, which may differ across environments or over time. This can cause subtle bugs or outright failures. Always pin versions: `pandas==2.0.3`.

**Points:** 1

---

### Question 7

**Question:**
What information should an experiment log contain?

**Options:**
- A) Just the final accuracy
- B) Parameters, metrics, artifacts, code version, data version, and timestamp ✓ CORRECT
- C) Only the hyperparameters
- D) Just the model file

**Feedback (add to correct answer):**
Complete experiment logs enable reproduction and comparison. You need to know what parameters were used, what results were achieved, which code and data versions were used, and when it ran. This makes it possible to reproduce or explain any experiment.

**Points:** 1

---

### Question 8

**Question:**
A production model is giving bad predictions. With good MLOps practices, you can:

**Options:**
- A) Just retrain and hope it's better
- B) Check the model version, compare to staging metrics, review recent data changes, and roll back if needed ✓ CORRECT
- C) Ask users to be patient
- D) Blame the data team

**Feedback (add to correct answer):**
Good MLOps provides the audit trail needed to debug production issues. You can identify exactly what model is running, compare its metrics to testing, check if data changed, and quickly roll back to a known-good version if needed.

**Points:** 1

---

