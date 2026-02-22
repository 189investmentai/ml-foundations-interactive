# Module 10: Debug Drill Spec

**Title:** The Wrong Policy  
**Time:** ~15 minutes  
**Goal:** Fix a RAG system returning irrelevant documents

---

## The Setup

> Your RAG system for policy questions gives wrong answers:
>
> Q: "Can I return an opened item?"
> Retrieved: "Shipping Policy" (wrong!)
> Answer: "Standard shipping takes 5-7 days..." (irrelevant!)
>
> It should retrieve Return Policy.

---

## The Buggy Code

```python
# Policy documents
policies = [
    {"title": "Return Policy", "content": "Items can be returned within 30 days..."},
    {"title": "Shipping Policy", "content": "Standard shipping takes 5-7 days..."},
    # ...
]

# ===== BUG IS HERE =====
# Only embedding titles, not content!
policy_texts = [p['title'] for p in policies]
policy_embeddings = embed_model.encode(policy_texts)
# =======================

# Search
def retrieve(question):
    q_emb = embed_model.encode([question])
    distances, indices = index.search(q_emb, k=1)
    return policies[indices[0][0]]
```

---

## The Bug

### Problem: Only embedding titles, not content

"Return Policy" as text doesn't contain "opened item". The search can't find it because "Return Policy" ≠ "opened item" semantically.

When we embed the full content ("Items can be returned within 30 days... Opened items cannot be returned except for defects..."), the match works.

---

## The Fix

```python
# Embed title + content together
policy_texts = [f"{p['title']}: {p['content']}" for p in policies]
policy_embeddings = embed_model.encode(policy_texts)
```

**After fix:**
```
Q: "Can I return an opened item?"
Retrieved: Return Policy ✓
Answer: "Opened items cannot be returned except for defects."
```

---

## What Learners Must Do

1. **Identify the symptom:** Wrong documents retrieved

2. **Find the cause:** Only titles were embedded

3. **Fix it:** Include content in embeddings

4. **Verify:** Correct documents now retrieved

---

## Self-Check

```python
# After fixing
result = retrieve("Can I return an opened item?")
assert "return" in result['title'].lower(), "Should retrieve Return Policy"
print(f"✓ Fixed! Retrieved: {result['title']}")
```

---

## Postmortem Template

**Symptom:**
> RAG returned irrelevant documents (Shipping Policy for a returns question).

**Root cause:**
> Only policy titles were embedded, not content. "Return Policy" as a phrase doesn't semantically match "opened item"—the match requires the actual policy text.

**Prevention:**
> Always embed the content you want to search, not just labels. Include title + content. Test retrieval with diverse queries before deploying.
