"""
StreamCart Synthetic Dataset Generator
======================================
Generates realistic e-commerce subscription data for the ML course.

Usage:
    python generate_streamcart.py
    
Or in Colab:
    exec(open('generate_streamcart.py').read())
    df = generate_customers(n=5000)
"""

import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import random

# Set seed for reproducibility
np.random.seed(42)
random.seed(42)

# ============================================================================
# CONFIGURATION
# ============================================================================

SNAPSHOT_DATE = datetime(2024, 1, 15)
DATA_START_DATE = datetime(2022, 1, 1)

PLAN_TYPES = ['basic', 'premium', 'family']
PLAN_PRICES = {'basic': 29.99, 'premium': 49.99, 'family': 79.99}

CITIES = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
    'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'Austin',
    'San Jose', 'Seattle', 'Denver', 'Boston', 'Portland'
]

CANCEL_REASONS = [
    'too_expensive', 'not_using', 'found_alternative', 
    'quality_issues', 'moving', 'other'
]

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def random_date(start, end):
    """Generate random date between start and end."""
    delta = end - start
    random_days = random.randint(0, delta.days)
    return start + timedelta(days=random_days)


def generate_customer_features(signup_date, snapshot_date, churned, churn_date=None):
    """Generate realistic features for a single customer."""
    
    tenure_days = (snapshot_date - signup_date).days
    tenure_months = tenure_days / 30
    
    # Base engagement varies by tenure (newer customers more variable)
    if tenure_months < 3:
        base_engagement = np.random.uniform(0.3, 1.0)
    elif tenure_months < 12:
        base_engagement = np.random.uniform(0.4, 0.9)
    else:
        base_engagement = np.random.uniform(0.5, 0.8)
    
    # Churners have declining engagement before churn
    if churned and churn_date:
        days_before_churn = (churn_date - snapshot_date).days
        if days_before_churn < 30:
            # Recent churner - engagement was dropping
            base_engagement *= np.random.uniform(0.2, 0.5)
    
    # Logins
    logins_per_month = int(np.random.poisson(8 * base_engagement))
    logins_7d = int(np.random.poisson(2 * base_engagement))
    logins_30d = int(np.random.poisson(8 * base_engagement))
    
    # Orders
    orders_per_month = max(1, int(np.random.poisson(1.5 * base_engagement)))
    orders_total = int(orders_per_month * tenure_months * np.random.uniform(0.8, 1.2))
    orders_30d = int(np.random.poisson(1.5 * base_engagement))
    
    # Average order value
    avg_order_value = np.random.lognormal(mean=3.8, sigma=0.4)  # ~$45 median
    avg_order_value = np.clip(avg_order_value, 15, 200)
    
    # Support tickets (higher for churners)
    if churned:
        support_rate = np.random.uniform(0.3, 0.8)
    else:
        support_rate = np.random.uniform(0.05, 0.3)
    
    support_tickets_total = int(np.random.poisson(tenure_months * support_rate))
    support_tickets_30d = int(np.random.poisson(support_rate * 2))
    
    # Items skipped (subscription boxes)
    items_skipped_total = int(np.random.poisson(tenure_months * 0.2 * (1 - base_engagement)))
    items_skipped_3boxes = min(3, int(np.random.poisson(0.5 * (1 - base_engagement))))
    
    # NPS score (1-10)
    if churned:
        nps_score = np.random.choice([1,2,3,4,5,6,7,8,9,10], 
                                      p=[0.15, 0.15, 0.15, 0.15, 0.1, 0.1, 0.08, 0.05, 0.04, 0.03])
    else:
        nps_score = np.random.choice([1,2,3,4,5,6,7,8,9,10],
                                      p=[0.02, 0.03, 0.05, 0.05, 0.1, 0.1, 0.15, 0.2, 0.15, 0.15])
    
    # Some customers haven't responded to NPS
    if np.random.random() < 0.2:
        nps_score = np.nan
    
    # Days since last activity
    days_since_last_login = int(np.random.exponential(5 / base_engagement))
    days_since_last_order = int(np.random.exponential(15 / base_engagement))
    
    return {
        'tenure_months': round(tenure_months, 1),
        'tenure_days': tenure_days,
        'logins_last_7d': logins_7d,
        'logins_last_30d': logins_30d,
        'logins_per_month_avg': round(logins_per_month, 1),
        'orders_total': orders_total,
        'orders_last_30d': orders_30d,
        'avg_order_value': round(avg_order_value, 2),
        'total_spend': round(orders_total * avg_order_value, 2),
        'support_tickets_total': support_tickets_total,
        'support_tickets_last_30d': support_tickets_30d,
        'items_skipped_total': items_skipped_total,
        'items_skipped_last_3_boxes': items_skipped_3boxes,
        'nps_score': nps_score,
        'days_since_last_login': min(days_since_last_login, tenure_days),
        'days_since_last_order': min(days_since_last_order, tenure_days),
    }


# ============================================================================
# MAIN GENERATOR
# ============================================================================

def generate_customers(n=5000, churn_rate=0.12, snapshot_date=None):
    """
    Generate synthetic StreamCart customer data.
    
    Parameters:
    -----------
    n : int
        Number of customers to generate
    churn_rate : float
        Target 30-day churn rate (default 12%)
    snapshot_date : datetime
        Point-in-time for feature calculation (default: 2024-01-15)
    
    Returns:
    --------
    pd.DataFrame with customer features and churn labels
    """
    
    if snapshot_date is None:
        snapshot_date = SNAPSHOT_DATE
    
    customers = []
    
    for i in range(n):
        customer_id = f"SC-{100000 + i}"
        
        # Signup date (weighted toward recent)
        days_ago = int(np.random.exponential(365))
        days_ago = min(days_ago, (snapshot_date - DATA_START_DATE).days)
        signup_date = snapshot_date - timedelta(days=days_ago)
        
        # Plan type (weighted)
        plan_type = np.random.choice(PLAN_TYPES, p=[0.5, 0.35, 0.15])
        
        # City
        city = np.random.choice(CITIES)
        
        # Determine churn (with realistic patterns)
        tenure_months = days_ago / 30
        
        # Churn probability varies by tenure (U-shaped: high early, lower mid, slightly higher late)
        if tenure_months < 3:
            base_churn_prob = 0.18
        elif tenure_months < 12:
            base_churn_prob = 0.08
        else:
            base_churn_prob = 0.10
        
        # Adjust to hit target rate
        churn_prob = base_churn_prob * (churn_rate / 0.12)
        
        churned = np.random.random() < churn_prob
        
        # Churn date (within 30 days after snapshot)
        if churned:
            churn_date = snapshot_date + timedelta(days=np.random.randint(1, 31))
            cancel_reason = np.random.choice(CANCEL_REASONS)
        else:
            churn_date = None
            cancel_reason = None
        
        # Generate features
        features = generate_customer_features(signup_date, snapshot_date, churned, churn_date)
        
        customer = {
            'customer_id': customer_id,
            'signup_date': signup_date.strftime('%Y-%m-%d'),
            'plan_type': plan_type,
            'plan_price': PLAN_PRICES[plan_type],
            'city': city,
            'snapshot_date': snapshot_date.strftime('%Y-%m-%d'),
            **features,
            'churn_30d': int(churned),
            'churn_date': churn_date.strftime('%Y-%m-%d') if churn_date else None,
            'cancel_reason': cancel_reason,
        }
        
        customers.append(customer)
    
    df = pd.DataFrame(customers)
    
    # Reorder columns logically
    column_order = [
        'customer_id', 'signup_date', 'snapshot_date', 'plan_type', 'plan_price', 'city',
        'tenure_months', 'tenure_days',
        'logins_last_7d', 'logins_last_30d', 'logins_per_month_avg',
        'orders_total', 'orders_last_30d', 'avg_order_value', 'total_spend',
        'support_tickets_total', 'support_tickets_last_30d',
        'items_skipped_total', 'items_skipped_last_3_boxes',
        'nps_score', 'days_since_last_login', 'days_since_last_order',
        'churn_30d', 'churn_date', 'cancel_reason'
    ]
    
    df = df[column_order]
    
    return df


def generate_events(customers_df, events_per_customer=50):
    """
    Generate event-level data for customers.
    
    Parameters:
    -----------
    customers_df : pd.DataFrame
        Output from generate_customers()
    events_per_customer : int
        Average events per customer
    
    Returns:
    --------
    pd.DataFrame with event-level data
    """
    
    events = []
    event_types = ['login', 'page_view', 'order', 'support_ticket', 'email_open']
    event_weights = [0.4, 0.35, 0.1, 0.05, 0.1]
    
    for _, customer in customers_df.iterrows():
        signup_date = datetime.strptime(customer['signup_date'], '%Y-%m-%d')
        snapshot_date = datetime.strptime(customer['snapshot_date'], '%Y-%m-%d')
        
        n_events = int(np.random.poisson(events_per_customer * (customer['tenure_months'] / 12)))
        n_events = max(5, min(n_events, 500))
        
        for _ in range(n_events):
            event_date = random_date(signup_date, snapshot_date)
            event_type = np.random.choice(event_types, p=event_weights)
            
            event = {
                'customer_id': customer['customer_id'],
                'event_date': event_date.strftime('%Y-%m-%d'),
                'event_type': event_type,
                'event_id': f"E-{np.random.randint(1000000, 9999999)}"
            }
            
            # Add event-specific details
            if event_type == 'order':
                event['order_value'] = round(np.random.lognormal(3.8, 0.4), 2)
            elif event_type == 'support_ticket':
                event['ticket_category'] = np.random.choice(['billing', 'shipping', 'product', 'account', 'other'])
            
            events.append(event)
    
    return pd.DataFrame(events)


def generate_support_tickets(n=1000):
    """
    Generate support ticket text data for NLP modules.
    
    Returns:
    --------
    pd.DataFrame with ticket text and categories
    """
    
    ticket_templates = {
        'billing': [
            "I was charged twice for my subscription this month",
            "Why did my price increase? I didn't authorize this",
            "Please refund my last payment, I meant to cancel",
            "There's an unknown charge on my account from StreamCart",
            "Can I switch to a cheaper plan?",
            "When is my next billing date?",
            "I want to dispute this charge",
        ],
        'shipping': [
            "My package never arrived",
            "Where is my order? It's been 2 weeks",
            "The tracking number doesn't work",
            "My box was damaged when it arrived",
            "Can I change my shipping address?",
            "Why is shipping taking so long?",
            "I received the wrong items in my box",
        ],
        'account': [
            "I can't log into my account",
            "How do I reset my password?",
            "I want to update my email address",
            "Can I pause my subscription?",
            "How do I cancel my membership?",
            "I forgot my username",
            "My account seems to be hacked",
        ],
        'product': [
            "The product quality has really gone down",
            "I'm allergic to something in the box, what ingredients are used?",
            "Can I customize what I receive?",
            "The items don't match what was advertised",
            "How do I skip next month's box?",
            "I keep getting duplicates of items I already have",
        ],
        'other': [
            "Just wanted to say I love your service!",
            "Do you have a referral program?",
            "Can I gift a subscription to someone?",
            "What's coming in next month's box?",
            "Do you ship internationally?",
        ]
    }
    
    tickets = []
    for _ in range(n):
        category = np.random.choice(list(ticket_templates.keys()), 
                                    p=[0.2, 0.25, 0.25, 0.2, 0.1])
        template = np.random.choice(ticket_templates[category])
        
        # Add some variation
        if np.random.random() < 0.3:
            template = template.upper()  # Angry customer
        if np.random.random() < 0.2:
            template = template + "!!!"
        if np.random.random() < 0.1:
            template = "URGENT: " + template
        
        tickets.append({
            'ticket_id': f"TKT-{np.random.randint(100000, 999999)}",
            'ticket_text': template,
            'category': category,
            'priority': np.random.choice(['low', 'medium', 'high'], p=[0.5, 0.35, 0.15]),
            'created_date': random_date(DATA_START_DATE, SNAPSHOT_DATE).strftime('%Y-%m-%d')
        })
    
    return pd.DataFrame(tickets)


def generate_products(n=200):
    """
    Generate product catalog for embeddings/recommendations modules.
    
    Returns:
    --------
    pd.DataFrame with product info
    """
    
    categories = ['skincare', 'snacks', 'accessories', 'wellness', 'home']
    
    products = []
    for i in range(n):
        category = np.random.choice(categories)
        
        product = {
            'product_id': f"PROD-{1000 + i}",
            'product_name': f"{category.title()} Item {i+1}",
            'category': category,
            'price': round(np.random.lognormal(2.5, 0.5), 2),
            'rating': round(np.random.uniform(3.0, 5.0), 1),
            'review_count': int(np.random.exponential(50)),
        }
        products.append(product)
    
    return pd.DataFrame(products)


# ============================================================================
# CONVENIENCE FUNCTIONS FOR COLAB
# ============================================================================

def load_streamcart_data():
    """Load or generate StreamCart customer data."""
    return generate_customers(n=5000)


def load_streamcart_events():
    """Load or generate StreamCart event data."""
    customers = generate_customers(n=1000)
    return generate_events(customers)


def load_streamcart_tickets():
    """Load or generate support ticket data."""
    return generate_support_tickets(n=1000)


# ============================================================================
# MAIN
# ============================================================================

if __name__ == "__main__":
    print("Generating StreamCart synthetic data...")
    
    # Generate main customer dataset
    customers = generate_customers(n=5000)
    print(f"\nCustomers: {len(customers)} rows")
    print(f"Churn rate: {customers['churn_30d'].mean():.1%}")
    print(f"Columns: {list(customers.columns)}")
    
    # Save to CSV
    customers.to_csv('streamcart_customers.csv', index=False)
    print("\nSaved: streamcart_customers.csv")
    
    # Generate events
    events = generate_events(customers.head(1000))
    events.to_csv('streamcart_events.csv', index=False)
    print(f"Saved: streamcart_events.csv ({len(events)} rows)")
    
    # Generate tickets
    tickets = generate_support_tickets(n=1000)
    tickets.to_csv('streamcart_tickets.csv', index=False)
    print(f"Saved: streamcart_tickets.csv ({len(tickets)} rows)")
    
    # Generate products
    products = generate_products(n=200)
    products.to_csv('streamcart_products.csv', index=False)
    print(f"Saved: streamcart_products.csv ({len(products)} rows)")
    
    print("\n✓ All datasets generated!")
    
    # Show sample
    print("\n--- Sample Customer Data ---")
    print(customers[['customer_id', 'tenure_months', 'logins_last_30d', 
                    'support_tickets_last_30d', 'churn_30d']].head(10))
