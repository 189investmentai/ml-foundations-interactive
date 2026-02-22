# ML Foundations - Practice Data

Synthetic e-commerce data for the ML Foundations Interactive course.

## Datasets

| File | Description | Rows |
|------|-------------|------|
| `streamcart_customers.csv` | Customer profiles with churn labels | 5,000 |
| `streamcart_events.csv` | User activity events | ~250,000 |
| `streamcart_tickets.csv` | Support ticket text | 1,000 |
| `streamcart_products.csv` | Product catalog | 200 |

## Usage in Colab

```python
import pandas as pd

BASE_URL = "https://raw.githubusercontent.com/189investmentai/ml-foundations-interactive/main/"

customers = pd.read_csv(BASE_URL + "streamcart_customers.csv")
tickets = pd.read_csv(BASE_URL + "streamcart_tickets.csv")
```

## Data Schema

### streamcart_customers.csv
- `customer_id`: Unique identifier
- `tenure_months`: Months since signup
- `logins_last_30d`: Login count in last 30 days
- `orders_last_30d`: Order count in last 30 days
- `support_tickets_last_30d`: Support tickets filed
- `nps_score`: Net Promoter Score (1-10)
- `churn_30d`: Target variable (1 = churned within 30 days)

### streamcart_tickets.csv
- `ticket_id`: Unique identifier
- `ticket_text`: Customer message text
- `category`: Ticket category (billing, shipping, account, product)

---

**Note:** This is synthetic data generated for educational purposes.
