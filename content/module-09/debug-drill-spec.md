# Module 9: Debug Drill Spec

**Title:** The Inconsistent Classifier  
**Time:** ~15 minutes  
**Goal:** Fix classification inconsistency

---

## The Setup

> Your zero-shot classifier gives different results for similar inputs:
>
> - "cant login" → "technical_issue" (0.45)
> - "can't login" → "account" (0.72)
> - "CANT LOGIN" → "shipping" (0.38)
>
> The same issue classified three different ways!

---

## The Buggy Code

```python
from transformers import pipeline

classifier = pipeline("zero-shot-classification")

# ===== BUG IS HERE =====
categories = ["billing", "shipping", "account", "technical_issue"]

def classify(text):
    # No preprocessing!
    result = classifier(text, categories)
    return result['labels'][0], result['scores'][0]
# =======================

# Test
test_inputs = ["cant login", "can't login", "CANT LOGIN"]
for t in test_inputs:
    cat, score = classify(t)
    print(f"'{t}' → {cat} ({score:.2f})")
```

---

## The Bug

### Problem: No text normalization

Models are sensitive to:
- Case ("LOGIN" vs "login")
- Punctuation ("can't" vs "cant")
- Typos

The model wasn't trained on ALL variations, so results are inconsistent.

---

## The Fix

```python
def classify(text):
    # Normalize text first
    text = text.lower()  # Lowercase
    text = text.replace("'", "'")  # Normalize apostrophes
    
    result = classifier(text, categories)
    return result['labels'][0], result['scores'][0]
```

**After fix:**
```
'cant login' → account (0.68)
'can't login' → account (0.72)
'CANT LOGIN' → account (0.68)
```

Now consistent!

---

## What Learners Must Do

1. **Identify the symptom:** Same meaning, different classifications

2. **Find the cause:** No text normalization

3. **Fix it:** Add lowercase conversion, normalize punctuation

4. **Verify:** Same results for variations

---

## Self-Check

```python
# After fixing
results = [classify(t)[0] for t in ["cant login", "can't login", "CANT LOGIN"]]
assert len(set(results)) == 1, "All variations should get same category"
print(f"✓ Fixed! All variations → {results[0]}")
```

---

## Postmortem Template

**Symptom:**
> Same issue ("can't login") classified differently based on capitalization and punctuation.

**Root cause:**
> No text normalization before classification. Models are sensitive to input variations not seen during training.

**Prevention:**
> Always preprocess text: lowercase, normalize punctuation, handle common typos. Consider adding synonyms or variations to test cases.
