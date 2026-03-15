# Colab Lab Spec: Module 18 - LLM Fundamentals

## Overview

| Property | Value |
|----------|-------|
| Notebook | `notebooks/module_18_llm_fundamentals.ipynb` |
| Runtime | ~25 minutes |
| Dataset | Support ticket classification, knowledge base (in-notebook) |
| Target | N/A (prompting, RAG, evaluation) |

## Learning Objectives

After completing this lab, learners will be able to:
1. Compare zero-shot, few-shot, and chain-of-thought prompting for classification
2. Build a simple RAG pipeline (retrieve → augment prompt → generate)
3. Evaluate LLM outputs for faithfulness (no hallucination)
4. Use the LLM-as-judge pattern for evaluation
5. Apply the RAG vs fine-tuning decision framework
6. Implement a complete RAG flow with retrieval and prompt building
7. Communicate prompting approaches to stakeholders

## Sections

### 1. Setup (2 min)
- Import numpy, pandas, json, TfidfVectorizer, cosine_similarity
- **Self-check:** Libraries load

### 2. Prompt Templates (5 min)
- Zero-shot: classify support ticket without examples
- Few-shot: classify with examples

### 3. Chain-of-Thought Prompt (3 min)
- CoT prompt with step-by-step reasoning
- Simulated responses for each style

### 4. Simulating LLM Responses (2 min)
- Simulated responses (actual API would call GPT/Claude)
- **Self-check:** Responses match expected format

### 5. Building a Simple RAG System (8 min)
- Knowledge base: support docs (Password Reset, Billing, Shipping, Account Security)
- TF-IDF vectorizer + cosine similarity for retrieval
- retrieve(query, k=2): return top-k docs with scores
- build_rag_prompt(query, retrieved_docs): augment prompt with context
- **Self-check:** retrieve returns k results with title and score

### 6. Evaluating LLM Outputs (5 min)
- check_faithfulness(response, context): detect numbers not in context
- Test cases: faithful vs hallucinated response
- **Self-check:** Hallucination detected when response contains unsupported claims

### 7. LLM-as-Judge Pattern (3 min)
- create_judge_prompt(): rate relevance, accuracy, helpfulness, faithfulness
- JSON output format

### 8. RAG vs Fine-Tuning Decision (3 min)
- Scenarios: FAQ changes, brand voice, order status, domain expertise, output format
- **Self-check:** Decision table populated

### 9. TODO: Build a Complete RAG Flow (8 min)
- rag_answer(query): retrieve → build prompt → (simulated) call LLM → return
- **TODO:** Implement rag_answer, test with "How do I get a refund?"
- **Self-check:** retrieve returns 2 docs; build_rag_prompt exists; rag_answer returns query, retrieved_docs, prompt, response

### 10. Stakeholder Summary (3 min)
- **TODO:** Write 3-bullet summary (~100 words) for PM
- Template: Three approaches (prompting, RAG, fine-tuning), When to use each, Evaluation

## Self-Checks

| Check | Assertion |
|-------|-----------|
| retrieve exists | `callable(retrieve)` |
| retrieve returns k results | `len(retrieve("password reset", k=2)) == 2` |
| Results have title and score | `all('title' in r and 'score' in r for r in results)` |
| build_rag_prompt exists | `callable(build_rag_prompt)` |

## Expected Outputs

- Zero-shot, few-shot, CoT prompts printed
- Retrieved docs for "I can't log in after password reset": Password Reset Guide, possibly Account Security
- Faithfulness check: Case 2 (hallucinated) flagged
- RAG pipeline: query → retrieved → prompt → response

## TODO Blocks

1. **Build complete RAG flow** (section 9): Implement rag_answer, test with "How do I get a refund?"
2. **Stakeholder summary** (section 10): Write 3-bullet summary for PM

## Dependencies

- numpy
- pandas
- json
- sklearn (TfidfVectorizer, cosine_similarity)
- re (for faithfulness check)
