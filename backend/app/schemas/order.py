from pydantic import BaseModel
from datetime import date
from typing import Optional


class OrderBase(BaseModel):
    order_id: int
    order_date: date
    order_status: str
    product_name: str
    category_name: str
    customer_segment: str
    customer_country: str
    customer_state: str
    customer_city: str
    market: str
    order_region: str
    shipping_mode: str
    days_for_shipping_real: int
    days_for_shipment_scheduled: int
    late_delivery_risk: bool
    delivery_status: str
    quantity_ordered: int
    sales: float
    order_profit_per_order: float


class OrderRead(OrderBase):
    id: int
    risk_score: Optional[float] = None
    predicted_segment: Optional[int] = None

    model_config = {"from_attributes": True}


class OrderFilter(BaseModel):
    category: Optional[str] = None
    market: Optional[str] = None
    shipping_mode: Optional[str] = None
    late_only: bool = False
    page: int = 1
    page_size: int = 50
