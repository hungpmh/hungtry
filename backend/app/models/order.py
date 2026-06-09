from sqlalchemy import Column, Integer, String, Float, Date, Boolean, Text
from app.db.session import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, index=True)
    order_date = Column(Date)
    order_status = Column(String(50))
    product_name = Column(Text)
    category_name = Column(String(100), index=True)
    customer_segment = Column(String(50))
    customer_country = Column(String(100))
    customer_state = Column(String(100))
    customer_city = Column(String(100))
    market = Column(String(50))
    order_region = Column(String(100))
    shipping_mode = Column(String(50))
    days_for_shipping_real = Column(Integer)
    days_for_shipment_scheduled = Column(Integer)
    late_delivery_risk = Column(Boolean)
    delivery_status = Column(String(50))
    quantity_ordered = Column(Integer)
    sales = Column(Float)
    order_profit_per_order = Column(Float)
    product_price = Column(Float)
    discount_rate = Column(Float)
    # ML scores (populated after inference)
    risk_score = Column(Float, nullable=True)
    predicted_segment = Column(Integer, nullable=True)
