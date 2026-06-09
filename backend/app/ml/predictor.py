"""
Inference layer — loads trained models and serves predictions.
Models are loaded once at import time (cached in memory).
"""
import os
import json
import joblib
import numpy as np
import pandas as pd
from functools import lru_cache
from app.core.config import settings

MODEL_DIR = settings.MODEL_DIR


@lru_cache(maxsize=1)
def _load_risk_model():
    path = os.path.join(MODEL_DIR, "risk_model.pkl")
    if not os.path.exists(path):
        raise FileNotFoundError(path)
    return joblib.load(path)


def predict_delivery_risk(features: dict) -> dict:
    model = _load_risk_model()
    df = pd.DataFrame([features])
    prob = model.predict_proba(df)[0][1]
    return {
        "risk_score": round(float(prob), 4),
        "is_late": bool(prob >= 0.5),
        "confidence": round(float(max(prob, 1 - prob)), 4),
    }


def get_forecast(category: str = None, periods: int = 90) -> dict:
    meta_path = os.path.join(MODEL_DIR, "forecast_meta.json")
    if not os.path.exists(meta_path):
        raise FileNotFoundError(meta_path)

    with open(meta_path) as f:
        meta = json.load(f)

    # Default to top category if none specified
    if category is None:
        category = meta["categories"][0]

    safe_cat = category.replace("/", "_").replace(" ", "_")
    model_path = os.path.join(MODEL_DIR, f"forecast_{safe_cat}.pkl")
    if not os.path.exists(model_path):
        raise FileNotFoundError(model_path)

    data = joblib.load(model_path)
    m = data["model"]
    history_df = data["history"]

    future = m.make_future_dataframe(periods=periods)
    forecast = m.predict(future)
    forecast["yhat"] = forecast["yhat"].clip(lower=0)
    forecast["yhat_lower"] = forecast["yhat_lower"].clip(lower=0)
    forecast["yhat_upper"] = forecast["yhat_upper"].clip(lower=0)

    hist_len = len(history_df)
    hist_rows = forecast.iloc[:hist_len][["ds", "yhat", "yhat_lower", "yhat_upper"]]
    future_rows = forecast.iloc[hist_len:][["ds", "yhat", "yhat_lower", "yhat_upper"]]

    def to_points(df):
        return [
            {"ds": str(r.ds.date()), "yhat": round(r.yhat, 2),
             "yhat_lower": round(r.yhat_lower, 2), "yhat_upper": round(r.yhat_upper, 2)}
            for _, r in df.iterrows()
        ]

    mape = meta.get("mape_scores", {}).get(category, 0.0)
    return {
        "historical": to_points(hist_rows),
        "forecast": to_points(future_rows),
        "category": category,
        "mape": mape,
    }
