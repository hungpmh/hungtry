"""
ETL Pipeline: DataCo CSV → cleaned DataFrame → PostgreSQL

Usage:
    python -m app.ml.pipeline
"""
import os
import sys
import pandas as pd
import numpy as np
from sqlalchemy import create_engine, text
from app.core.config import settings

RAW_PATH = os.path.join(settings.DATA_DIR, "raw", "dataco.csv")
PROCESSED_PATH = os.path.join(settings.DATA_DIR, "processed", "orders_clean.parquet")

# Column mapping from DataCo dataset to our model fields
COLUMN_MAP = {
    "Order Id": "order_id",
    "order date (DateOrders)": "order_date",
    "Order Status": "order_status",
    "Product Name": "product_name",
    "Category Name": "category_name",
    "Customer Segment": "customer_segment",
    "Customer Country": "customer_country",
    "Customer State": "customer_state",
    "Customer City": "customer_city",
    "Market": "market",
    "Order Region": "order_region",
    "Shipping Mode": "shipping_mode",
    "Days for shipping (real)": "days_for_shipping_real",
    "Days for shipment (scheduled)": "days_for_shipment_scheduled",
    "Late_delivery_risk": "late_delivery_risk",
    "Delivery Status": "delivery_status",
    "Order Item Quantity": "quantity_ordered",
    "Sales": "sales",
    "Order Profit Per Order": "order_profit_per_order",
    "Product Price": "product_price",
    "Order Item Discount Rate": "discount_rate",
}


def load_and_clean(path: str) -> pd.DataFrame:
    print(f"Loading CSV from {path}...")
    df = pd.read_csv(path, encoding="latin-1", low_memory=False)
    print(f"  Raw shape: {df.shape}")

    # Rename columns
    df = df.rename(columns={k: v for k, v in COLUMN_MAP.items() if k in df.columns})

    # Keep only mapped columns that exist
    cols = [v for v in COLUMN_MAP.values() if v in df.columns]
    df = df[cols].copy()

    # Parse dates
    if "order_date" in df.columns:
        df["order_date"] = pd.to_datetime(df["order_date"], errors="coerce").dt.date

    # Numeric coercion
    for col in ["days_for_shipping_real", "days_for_shipment_scheduled",
                "quantity_ordered", "sales", "order_profit_per_order",
                "product_price", "discount_rate"]:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors="coerce")

    # Boolean
    if "late_delivery_risk" in df.columns:
        df["late_delivery_risk"] = df["late_delivery_risk"].astype(bool)

    # Drop rows missing critical fields
    df = df.dropna(subset=["order_id", "order_date", "sales"])
    df = df.drop_duplicates()

    print(f"  Clean shape: {df.shape}")
    return df


def build_supplier_scorecard(df: pd.DataFrame) -> pd.DataFrame:
    """Derive supplier metrics from order data (category+market as proxy for supplier)."""
    grp = df.groupby(["category_name", "market"]).agg(
        total_orders=("order_id", "count"),
        late_orders=("late_delivery_risk", "sum"),
        avg_lead_time=("days_for_shipping_real", "mean"),
        total_revenue=("sales", "sum"),
        avg_profit=("order_profit_per_order", "mean"),
    ).reset_index()

    grp["on_time_rate"] = 1 - (grp["late_orders"] / grp["total_orders"])
    grp["fill_rate"] = np.clip(grp["on_time_rate"] * 1.05, 0, 1)
    grp["avg_profit_margin"] = grp["avg_profit"] / grp["total_revenue"].replace(0, np.nan)
    grp["avg_profit_margin"] = grp["avg_profit_margin"].fillna(0)

    # Composite performance score (0–100)
    grp["performance_score"] = (
        grp["on_time_rate"] * 40 +
        grp["fill_rate"] * 30 +
        np.clip(grp["avg_profit_margin"] * 100, 0, 30)
    ).round(2)

    grp = grp.rename(columns={"category_name": "category"})
    grp["name"] = grp["category"] + " — " + grp["market"]
    return grp


def load_to_postgres(df: pd.DataFrame, suppliers: pd.DataFrame):
    print("Loading to PostgreSQL...")
    engine = create_engine(settings.SYNC_DATABASE_URL)

    with engine.begin() as conn:
        conn.execute(text("TRUNCATE TABLE orders RESTART IDENTITY CASCADE"))
        conn.execute(text("TRUNCATE TABLE suppliers RESTART IDENTITY CASCADE"))

    df.to_sql("orders", engine, if_exists="append", index=False, chunksize=5000, method="multi")
    print(f"  Inserted {len(df)} orders")

    sup_cols = ["name", "category", "market", "total_orders", "late_orders",
                "on_time_rate", "avg_lead_time", "total_revenue",
                "avg_profit_margin", "fill_rate", "performance_score"]
    suppliers[sup_cols].to_sql("suppliers", engine, if_exists="append", index=False)
    print(f"  Inserted {len(suppliers)} supplier records")


def run():
    if not os.path.exists(RAW_PATH):
        print(f"ERROR: Dataset not found at {RAW_PATH}")
        print("Download from: https://www.kaggle.com/datasets/shashwatwork/dataco-smart-supply-chain-for-big-data-analysis")
        sys.exit(1)

    os.makedirs(os.path.dirname(PROCESSED_PATH), exist_ok=True)

    df = load_and_clean(RAW_PATH)
    df.to_parquet(PROCESSED_PATH, index=False)
    print(f"Saved cleaned data to {PROCESSED_PATH}")

    suppliers = build_supplier_scorecard(df)
    load_to_postgres(df, suppliers)
    print("ETL complete.")


if __name__ == "__main__":
    run()
