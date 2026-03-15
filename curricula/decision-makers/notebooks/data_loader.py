"""
Data loader for StreamCart course notebooks.

For LOCAL development: Set USE_LOCAL = True
For COLAB/production: Set USE_LOCAL = False and update GITHUB_BASE_URL
"""

import pandas as pd

# ============================================================
# CONFIGURATION - Update this when hosting data
# ============================================================

USE_LOCAL = True  # Set to False when deploying to Colab

# GitHub raw URL for the public data repo
GITHUB_BASE_URL = "https://raw.githubusercontent.com/189investmentai/ml-foundations-interactive/main/shared/data/"

# ============================================================
# DO NOT EDIT BELOW THIS LINE
# ============================================================

LOCAL_PATH = "../../../shared/data/"

def get_data_url(filename):
    """Get the appropriate URL/path for a data file."""
    if USE_LOCAL:
        return LOCAL_PATH + filename
    else:
        return GITHUB_BASE_URL + filename

def load_customers():
    """Load the StreamCart customers dataset."""
    url = get_data_url("streamcart_customers.csv")
    return pd.read_csv(url)

def load_events():
    """Load the StreamCart events dataset."""
    url = get_data_url("streamcart_events.csv")
    return pd.read_csv(url)

def load_tickets():
    """Load the StreamCart support tickets dataset."""
    url = get_data_url("streamcart_tickets.csv")
    return pd.read_csv(url)

def load_products():
    """Load the StreamCart products dataset."""
    url = get_data_url("streamcart_products.csv")
    return pd.read_csv(url)

# Quick test
if __name__ == "__main__":
    print("Testing data loader...")
    print(f"Mode: {'LOCAL' if USE_LOCAL else 'GITHUB'}")
    
    df = load_customers()
    print(f"Loaded {len(df)} customers")
    print(df.head())
