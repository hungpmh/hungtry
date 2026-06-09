from pydantic import BaseModel


class SupplierRead(BaseModel):
    id: int
    name: str
    category: str
    market: str
    total_orders: int
    late_orders: int
    on_time_rate: float
    avg_lead_time: float
    total_revenue: float
    avg_profit_margin: float
    fill_rate: float
    performance_score: float

    model_config = {"from_attributes": True}
