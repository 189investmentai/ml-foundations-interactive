"""
Data loader for StreamCart course notebooks (Practitioners).

For LOCAL development: Set USE_LOCAL = True
For COLAB/production: Set USE_LOCAL = False and update GITHUB_BASE_URL
"""

import pandas as pd

USE_LOCAL = True

GITHUB_BASE_URL = "https://raw.githubusercontent.com/189investmentai/ml-foundations-interactive/main/shared/data/"

LOCAL_PATH = "../../../shared/data/"

def get_data_url(filename):
    if USE_LOCAL:
        return LOCAL_PATH + filename
    else:
        return GITHUB_BASE_URL + filename

def load_customers():
    url = get_data_url("streamcart_customers.csv")
    return pd.read_csv(url)

def load_events():
    url = get_data_url("streamcart_events.csv")
    return pd.read_csv(url)

def load_tickets():
    url = get_data_url("streamcart_tickets.csv")
    return pd.read_csv(url)

def load_products():
    url = get_data_url("streamcart_products.csv")
    return pd.read_csv(url)

def load_all():
    """Load all StreamCart datasets, returning a dict."""
    return {
        'customers': load_customers(),
        'events': load_events(),
        'tickets': load_tickets(),
        'products': load_products()
    }

if __name__ == "__main__":
    print("Testing data loader...")
    print(f"Mode: {'LOCAL' if USE_LOCAL else 'GITHUB'}")
    for name, loader in [('customers', load_customers), ('events', load_events),
                          ('tickets', load_tickets), ('products', load_products)]:
        df = loader()
        print(f"  {name}: {len(df):,} rows, {len(df.columns)} columns")
