from fastapi import APIRouter, HTTPException, Query
from app.schemas.kpi import ForecastResponse
from app.ml.predictor import get_forecast
from typing import Optional

router = APIRouter(prefix="/forecast", tags=["forecast"])


@router.get("/demand", response_model=ForecastResponse)
async def demand_forecast(
    category: Optional[str] = Query(None, description="Product category to forecast"),
    periods: int = Query(90, ge=7, le=365, description="Days to forecast ahead"),
):
    try:
        return get_forecast(category=category, periods=periods)
    except FileNotFoundError:
        raise HTTPException(
            status_code=503,
            detail="Forecast model not trained yet. Run: python -m app.ml.train"
        )
