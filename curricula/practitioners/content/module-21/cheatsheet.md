# MLOps Cheatsheet

## ML Lifecycle

```
Experiment → Develop → Stage → Production → Monitor
```

---

## Version Everything

| What | How |
|------|-----|
| Code | Git |
| Data | DVC / snapshots |
| Models | Artifacts + metadata |
| Config | YAML files |
| Environment | requirements.txt |

---

## Model Metadata

```json
{
  "version": "v1.2.0",
  "trained_at": "2024-01-15",
  "data_version": "2024-01-15",
  "git_commit": "abc123",
  "metrics": {"auc": 0.85},
  "features": ["f1", "f2"],
  "threshold": 0.35
}
```

---

## Project Structure

```
project/
├── data/
├── models/
├── src/
├── configs/
├── tests/
└── README.md
```

---

## Reproducibility Checklist

- [ ] Dependencies pinned
- [ ] Random seeds set
- [ ] Data versioned
- [ ] Config externalized
- [ ] Code in git

---

## Experiment Tracking

Log for every experiment:
- Parameters
- Metrics
- Artifacts
- Code version
- Data version

---

## Serving Options

| Type | Use Case |
|------|----------|
| Batch | Scheduled, high volume |
| Real-time | Low latency, on-demand |

---

## Business Translation

**MLOps:** "Reliable, reproducible model updates"

**Versioning:** "Track changes like Google Docs"

**Pipelines:** "Automated model updates"
