"""
Train all ML models on the cleaned DataCo dataset.

Models trained:
  1. XGBoost — late delivery risk classifier
  2. Prophet  — demand forecasting (per category)
  3. K-Means  — customer segmentation (RFM)

Usage:
    python -m app.ml.train
"""
import os
import json
import joblib
import numpy as np
import pandas as pd
from app.core.config import settings

PROCESSED_PATH = os.path.join(settings.DATA_DIR, "processed", "orders_clean.parquet")
MODEL_DIR = settings.MODEL_DIR

os.makedirs(MODEL_DIR, exist_ok=True)


# ─── 1. Late Delivery Risk Classifier ────────────────────────────────────────

def train_risk_model(df: pd.DataFrame):
    from sklearn.pipeline import Pipeline
    from sklearn.preprocessing import LabelEncoder, StandardScaler
    from sklearn.compose import ColumnTransformer
    from sklearn.preprocessing import OneHotEncoder
    from xgboost import XGBClassifier
    from sklearn.model_selection import train_test_split
    from sklearn.metrics import f1_score, roc_auc_score

    print("\n[1/3] Training delivery risk classifier...")

    cat_features = ["shipping_mode", "order_region", "category_name", "market"]
    num_features = ["days_for_shipment_scheduled", "quantity_ordered", "sales", "discount_rate"]
    target = "late_delivery_risk"

    required = cat_features + num_features + [target]
    df_model = df[required].dropna()

    X = df_model[cat_features + num_features]
    y = df_model[target].astype(int)

    preprocessor = ColumnTransformer([
        ("cat", OneHotEncoder(handle_unknown="ignore", sparse_output=False), cat_features),
        ("num", StandardScaler(), num_features),
    ])

    pipeline = Pipeline([
        ("preprocessor", preprocessor),
        ("classifier", XGBClassifier(
            n_estimators=200, max_depth=6, learning_rate=0.1,
            use_label_encoder=False, eval_metric="logloss",
            random_state=42, n_jobs=-1
        )),
    ])

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    pipeline.fit(X_train, y_train)

    y_pred = pipeline.predict(X_test)
    y_prob = pipeline.predict_proba(X_test)[:, 1]
    f1 = f1_score(y_test, y_pred)
    auc = roc_auc_score(y_test, y_prob)
    print(f"  F1: {f1:.4f}  AUC: {auc:.4f}")

    path = os.path.join(MODEL_DIR, "risk_model.pkl")
    joblib.dump(pipeline, path)

    meta = {"f1": round(f1, 4), "auc": round(auc, 4),
            "cat_features": cat_features, "num_features": num_features}
    with open(os.path.join(MODEL_DIR, "risk_meta.json"), "w") as f:
        json.dump(meta, f)
    print(f"  Saved to {path}")


# ─── 2. Demand Forecast (Prophet) ────────────────────────────────────────────

def train_forecast_model(df: pd.DataFrame):
    from prophet import Prophet
    from sklearn.metrics import mean_absolute_percentage_error

    print("\n[2/3] Training demand forecast models (Prophet)...")

    df["order_date"] = pd.to_datetime(df["order_date"])

    categories = df["category_name"].value_counts().head(10).index.tolist()
    mape_scores = {}

    for cat in categories:
        sub = (
            df[df["category_name"] == cat]
            .groupby("order_date")["sales"]
            .sum()
            .reset_index()
            .rename(columns={"order_date": "ds", "sales": "y"})
        )
        sub = sub[sub["y"] > 0].sort_values("ds")

        if len(sub) < 60:
            continue

        cutoff = int(len(sub) * 0.8)
        train, test = sub.iloc[:cutoff], sub.iloc[cutoff:]

        m = Prophet(
            yearly_seasonality=True,
            weekly_seasonality=True,
            daily_seasonality=False,
            changepoint_prior_scale=0.05,
        )
        m.fit(train)

        forecast = m.predict(test[["ds"]])
        mape = mean_absolute_percentage_error(test["y"], forecast["yhat"].clip(lower=0))
        mape_scores[cat] = round(mape, 4)

        # Retrain on full data for production model
        m_full = Prophet(
            yearly_seasonality=True,
            weekly_seasonality=True,
            daily_seasonality=False,
            changepoint_prior_scale=0.05,
        )
        m_full.fit(sub)

        safe_cat = cat.replace("/", "_").replace(" ", "_")
        path = os.path.join(MODEL_DIR, f"forecast_{safe_cat}.pkl")
        joblib.dump({"model": m_full, "history": sub}, path)
        print(f"  {cat}: MAPE={mape:.2%}  saved → {path}")

    with open(os.path.join(MODEL_DIR, "forecast_meta.json"), "w") as f:
        json.dump({"categories": categories, "mape_scores": mape_scores}, f)


# ─── 3. Customer Segmentation (K-Means RFM) ──────────────────────────────────

def train_segmentation_model(df: pd.DataFrame):
    from sklearn.preprocessing import StandardScaler
    from sklearn.cluster import KMeans
    from sklearn.metrics import silhouette_score

    print("\n[3/3] Training customer segmentation (K-Means RFM)...")

    df["order_date"] = pd.to_datetime(df["order_date"])
    snapshot = df["order_date"].max()

    rfm = df.groupby("customer_segment").agg(
        recency=("order_date", lambda x: (snapshot - x.max()).days),
        frequency=("order_id", "count"),
        monetary=("sales", "sum"),
    ).reset_index()

    X = rfm[["recency", "frequency", "monetary"]]
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    best_k, best_score = 4, -1
    for k in range(3, 7):
        km = KMeans(n_clusters=k, random_state=42, n_init=10)
        labels = km.fit_predict(X_scaled)
        score = silhouette_score(X_scaled, labels)
        if score > best_score:
            best_score, best_k = score, k

    km_final = KMeans(n_clusters=best_k, random_state=42, n_init=10)
    km_final.fit(X_scaled)

    print(f"  Best k={best_k}  Silhouette={best_score:.4f}")

    path = os.path.join(MODEL_DIR, "segmentation_model.pkl")
    joblib.dump({"kmeans": km_final, "scaler": scaler, "rfm": rfm}, path)

    with open(os.path.join(MODEL_DIR, "segmentation_meta.json"), "w") as f:
        json.dump({"k": best_k, "silhouette": round(best_score, 4)}, f)
    print(f"  Saved to {path}")


def run():
    if not os.path.exists(PROCESSED_PATH):
        print(f"ERROR: Processed data not found. Run pipeline first: python -m app.ml.pipeline")
        return

    print(f"Loading processed data from {PROCESSED_PATH}...")
    df = pd.read_parquet(PROCESSED_PATH)
    print(f"  Shape: {df.shape}")

    train_risk_model(df)
    train_forecast_model(df)
    train_segmentation_model(df)

    print("\nAll models trained successfully.")


if __name__ == "__main__":
    run()
