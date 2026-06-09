from pydantic import BaseModel
from typing import List


class KPISummary(BaseModel):
    total_orders: int
    total_revenue: float
    avg_profit_margin: float
    late_delivery_rate: float
    on_time_rate: float
    avg_days_late: float


class ForecastPoint(BaseModel):
    ds: str  # date string
    yhat: float
    yhat_lower: float
    yhat_upper: float


class ForecastResponse(BaseModel):
    historical: List[ForecastPoint]
    forecast: List[ForecastPoint]
    category: str
    mape: float


class CategoryRevenue(BaseModel):
    category: str
    revenue: float
    orders: int
    profit: float


class RegionMetrics(BaseModel):
    region: str
    orders: int
    revenue: float
    late_rate: float
