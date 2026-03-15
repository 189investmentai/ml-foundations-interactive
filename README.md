# ML Learning Programs

Multi-audience ML curriculum built around StreamCart, a fictional subscription e-commerce company.

## Curricula

| Audience | Description | Status |
|----------|-------------|--------|
| [Decision Makers](curricula/decision-makers/) | For PMs, analysts, and leaders who work with ML teams but don't build models themselves. Focus on framing, evaluation, and stakeholder communication. | Active |
| [Practitioners](curricula/practitioners/) | For engineers and data scientists who build and deploy models. Hands-on coding and production concerns. | Planned |

## Shared Assets

The `shared/` folder contains assets used across curricula:

- `shared/data/` - StreamCart datasets (customers, events, tickets, products)
- `shared/assets/` - Diagrams and images

## Data Schema

All curricula use the same StreamCart datasets:

| File | Description | Rows |
|------|-------------|------|
| `streamcart_customers.csv` | Customer profiles with churn labels | 5,000 |
| `streamcart_events.csv` | User activity events | ~250,000 |
| `streamcart_tickets.csv` | Support ticket text | 1,000 |
| `streamcart_products.csv` | Product catalog | 200 |

### Usage in Colab

```python
import pandas as pd

BASE_URL = "https://raw.githubusercontent.com/189investmentai/ml-foundations-interactive/main/shared/data/"

customers = pd.read_csv(BASE_URL + "streamcart_customers.csv")
tickets = pd.read_csv(BASE_URL + "streamcart_tickets.csv")
```

---

**Note:** StreamCart is synthetic data generated for educational purposes.
