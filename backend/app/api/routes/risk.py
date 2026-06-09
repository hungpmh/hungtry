from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.ml.predictor import predict_delivery_risk
from typing import List

router = APIRouter(prefix="/risk", tags=["risk"])


class RiskInput(BaseModel):
    shipping_mode: str
    days_for_shipment_scheduled: int
    order_region: str
    category_name: str
    market: str
    quantity_ordered: int
    sales: float
    discount_rate: float


class RiskOutput(BaseModel):
    risk_score: float
    is_late: bool
    confidence: float


@router.post("/predict", response_model=RiskOutput)
async def predict_risk(payload: RiskInput):
    try:
        return predict_delivery_risk(payload.model_dump())
    except FileNotFoundError:
        raise HTTPException(
            status_code=503,
            detail="Risk model not trained yet. Run: python -m app.ml.train"
        )
