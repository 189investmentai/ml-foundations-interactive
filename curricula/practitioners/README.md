# ML for Practitioners: Interactive Course

**Build ML intuition through interaction, not equations.**

A premium, asynchronous ML course for practitioners who want deep conceptual understanding without heavy math. Every module features an **interactive HTML playground** where learners manipulate inputs and watch models respond in real-time.

## Target Audience

- Software engineers moving into ML
- Data scientists who want production-ready skills
- ML engineers looking to fill conceptual gaps
- Anyone comfortable with Python/pandas but not advanced math

## Key Differentiators

1. **Interactive HTML Playgrounds** - Browser-based visualizations with sliders, toggles, and live graphs (no build step, no dependencies)
2. **Debugging-First Pedagogy** - Each concept includes failure modes, symptoms, and diagnostic moves
3. **Business Translation Built-In** - Every metric comes with "how to explain this to stakeholders" scripts
4. **Unified Case Study** - All modules use StreamCart data for continuity
5. **Portfolio-Ready Artifacts** - Build demo dashboards you can show employers

## Course Structure

### Foundation (Modules 0-2)
ML Map, Problem Framing, Data Leakage
### Supervised Learning (Modules 3-6)
Linear Regression, Logistic Regression, Decision Trees, Ensembles
### Optimization & Evaluation (Modules 7-11)
Gradient Descent, Regression Metrics, Classification Metrics, Feature Engineering, Regularization
### Representations (Modules 12-14)
Embeddings, Clustering, Retrieval
### Deep Learning (Modules 15-16)
Neural Networks, Transformers
### Agentic AI (Modules 17-20)
LLM Fundamentals, Tool Calling, Agent Memory, Guardrails
### Production (Modules 21-22)
MLOps, Monitoring & Drift Detection
### Capstone
End-to-end portfolio project

## Folder Structure

```
practitioners/
├── content/           # Written lessons and specs
│   ├── 00-course-overview.md
│   ├── 01-curriculum-map.md
│   └── module-XX/     # Per-module content
│       ├── micro-lesson.md
│       ├── cheatsheet.md
│       ├── quiz.md
│       ├── colab-lab-spec.md
│       └── debug-drill-spec.md
├── notebooks/         # Hands-on labs
│   ├── module_XX_topic.ipynb
│   ├── debug_drills/
│   └── answer_keys/
├── playgrounds/       # Interactive HTML visualizations
│   └── playground_topic.html
└── capstone/          # Final project
```

## Per-Module Components

Each module includes:
1. **Micro-lesson** - 30-60 min written narrative with mental models
2. **Interactive Playground** - HTML page with live visualizations
3. **Notebook Lab** - Hands-on coding with StreamCart data
4. **Debug Drill** - Find and fix intentional bugs
5. **Cheatsheet** - 1-page reference
6. **Quiz** - 8 scenario-based questions

## Getting Started

Start with Module 3 (Linear Regression) to experience the full learning flow:
1. Read the micro-lesson
2. Explore the interactive playground
3. Complete the notebook lab
4. Tackle the debug drill
5. Test yourself with the quiz
