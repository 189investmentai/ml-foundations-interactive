# Module 21 Quiz: MLOps

---

## Question 1

Your model worked perfectly yesterday but gives different results today with the same code. What's the most likely cause?

A) The computer is slower today
B) Random seeds weren't set, or data changed
C) Python updated automatically
D) The model is too complex

**Correct Answer:** B

**Explanation:** Reproducibility failures usually stem from uncontrolled randomness (no fixed seeds) or data changes. Always set random seeds for all libraries (numpy, sklearn, etc.) and version your data to ensure reproducibility.

---

## Question 2

What should you include when saving a trained model for production?

A) Just the model file (.joblib or .pkl)
B) Model file + metadata (version, training date, metrics, features, threshold)
C) Only the code that trained it
D) Just the predictions it made

**Correct Answer:** B

**Explanation:** Model artifacts need metadata for traceability. You need to know when it was trained, on what data, what metrics it achieved, and what configuration it uses. This enables debugging, comparison, and rollback.

---

## Question 3

Why should configuration be externalized (in YAML/JSON files) rather than hardcoded?

A) It's faster to run
B) It allows changing parameters without modifying code, and tracks changes in version control
C) Python requires it
D) It makes the code shorter

**Correct Answer:** B

**Explanation:** Externalized config separates parameters from logic. This means you can change hyperparameters, thresholds, or data paths without code changes, and config changes are tracked in version control for reproducibility.

---

## Question 4

A colleague asks why you're spending time on "MLOps" instead of improving the model. The best response is:

A) "It's what everyone does"

B) "Without proper versioning and pipelines, we can't reliably deploy updates, debug issues, or roll back problems. This ensures our model improvements actually reach production safely."

C) "Management requires it"

D) "It's more interesting than modeling"

**Correct Answer:** B

**Explanation:** MLOps enables model improvements to reach production reliably. Without it, even great models can fail in deployment, cause incidents, or be impossible to debug. It's not overhead—it's infrastructure for delivering value.

---

## Question 5

What's the difference between batch and real-time model serving?

A) Batch is faster
B) Batch runs predictions on a schedule for many records; real-time responds to individual requests immediately
C) Real-time is only for neural networks
D) They're the same thing

**Correct Answer:** B

**Explanation:** Batch prediction runs periodically (e.g., nightly) to score many records at once—good for marketing campaigns or reports. Real-time serving responds to individual requests with low latency—good for user-facing features like recommendations or fraud detection.

---

## Question 6

Your requirements.txt just says "pandas" without a version. Why is this problematic?

A) It's not problematic
B) Different versions may be installed over time, potentially breaking your code
C) Pandas won't install without a version
D) It runs slower

**Correct Answer:** B

**Explanation:** Without pinned versions, `pip install` grabs the latest version, which may differ across environments or over time. This can cause subtle bugs or outright failures. Always pin versions: `pandas==2.0.3`.

---

## Question 7

What information should an experiment log contain?

A) Just the final accuracy
B) Parameters, metrics, artifacts, code version, data version, and timestamp
C) Only the hyperparameters
D) Just the model file

**Correct Answer:** B

**Explanation:** Complete experiment logs enable reproduction and comparison. You need to know what parameters were used, what results were achieved, which code and data versions were used, and when it ran. This makes it possible to reproduce or explain any experiment.

---

## Question 8

A production model is giving bad predictions. With good MLOps practices, you can:

A) Just retrain and hope it's better
B) Check the model version, compare to staging metrics, review recent data changes, and roll back if needed
C) Ask users to be patient
D) Blame the data team

**Correct Answer:** B

**Explanation:** Good MLOps provides the audit trail needed to debug production issues. You can identify exactly what model is running, compare its metrics to testing, check if data changed, and quickly roll back to a known-good version if needed.

---

## Scoring

- 8/8: Expert level — you understand MLOps deeply
- 6-7/8: Solid understanding — review deployment patterns
- 4-5/8: Developing — revisit versioning concepts
- <4/8: Review the full lesson and experiment with the playground
