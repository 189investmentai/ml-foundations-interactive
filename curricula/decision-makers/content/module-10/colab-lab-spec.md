# Module 10: Colab Lab Spec

**Lab Title:** RAG for Policy Questions  
**Time:** ~20 minutes  
**Goal:** Build a RAG system and compare to prompting alone

---

## Lab Structure

### Cell 1: Setup

```python
!pip install openai sentence-transformers faiss-cpu -q

from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

embed_model = SentenceTransformer('all-MiniLM-L6-v2')
print("Ready!")
```

---

### Cell 2: Policy Documents

```python
policies = [
    {
        "title": "Return Policy",
        "content": "Items can be returned within 30 days of purchase. Items must be unopened and in original packaging. Opened items cannot be returned except for defects. Refunds are processed within 5-7 business days."
    },
    {
        "title": "Shipping Policy", 
        "content": "Standard shipping takes 5-7 business days. Express shipping (2-3 days) is available for $9.99. Free shipping on orders over $50. We ship to all 50 US states."
    },
    {
        "title": "Subscription Policy",
        "content": "Subscriptions can be paused or canceled anytime before the next billing date. No refunds for partial months. Pause for up to 3 months maximum. Reactivation is instant."
    },
    {
        "title": "Privacy Policy",
        "content": "We collect email, name, and shipping address. Payment info is processed by Stripe and not stored by us. You can request data deletion by emailing privacy@streamcart.com."
    }
]
```

---

### Cell 3: Build Vector Index

```python
# Embed policy documents
policy_texts = [f"{p['title']}: {p['content']}" for p in policies]
policy_embeddings = embed_model.encode(policy_texts)

# Build FAISS index
index = faiss.IndexFlatL2(policy_embeddings.shape[1])
index.add(policy_embeddings.astype('float32'))

print(f"Indexed {index.ntotal} policies")
```

---

### Cell 4: Retrieval Function

```python
def retrieve_relevant(question, k=2):
    """Find most relevant policies for a question."""
    q_embedding = embed_model.encode([question])
    distances, indices = index.search(q_embedding.astype('float32'), k)
    
    results = []
    for idx in indices[0]:
        results.append(policies[idx])
    return results
```

---

### Cell 5: TODO - Test Retrieval

```python
# TODO: Test retrieval with different questions

test_questions = [
    "Can I return an item I already opened?",
    "How long does shipping take?",
    "How do I cancel my subscription?"
]

# for q in test_questions:
#     relevant = retrieve_relevant(q, k=1)
#     print(f"Q: {q}")
#     print(f"Retrieved: {relevant[0]['title']}")
#     print()
```

---

### Cell 6: LLM Integration (Simulated)

```python
# Simulated LLM response (replace with real API call in practice)
def simulate_llm(prompt):
    """Simulated LLM that extracts answer from context."""
    # In production: call openai.chat.completions.create()
    if "30 days" in prompt:
        return "Items can be returned within 30 days if unopened."
    elif "5-7 business days" in prompt:
        return "Standard shipping takes 5-7 business days."
    else:
        return "I don't have specific information about that."
```

---

### Cell 7: TODO - RAG Pipeline

```python
def answer_with_rag(question):
    """Complete RAG pipeline."""
    # 1. Retrieve
    relevant = retrieve_relevant(question, k=2)
    
    # 2. Build prompt with context
    context = "\n\n".join([f"{p['title']}: {p['content']}" for p in relevant])
    
    prompt = f"""Answer the question using ONLY the following policies:

{context}

Question: {question}

If the answer isn't in the policies, say "I don't have information about that."
Answer:"""
    
    # 3. Generate (simulated)
    return simulate_llm(prompt), relevant

# TODO: Test the RAG pipeline
# for q in test_questions:
#     answer, sources = answer_with_rag(q)
#     print(f"Q: {q}")
#     print(f"A: {answer}")
#     print(f"Sources: {[s['title'] for s in sources]}")
#     print()
```

---

### Cell 8: Compare With/Without RAG

```python
def answer_without_rag(question):
    """Just prompt, no context."""
    # Without RAG, model might hallucinate
    return "I believe the return policy is 60 days..."  # Simulated hallucination

# Compare
question = "What's the return policy?"
print("Without RAG:", answer_without_rag(question))
answer, _ = answer_with_rag(question)
print("With RAG:", answer)
```

---

### Cell 9: Reflection

```python
# Answer:
# 1. Did RAG retrieve the right documents?
# 2. What happens if no relevant document exists?
# 3. How would you handle follow-up questions?
```
