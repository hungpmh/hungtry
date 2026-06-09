from sqlalchemy import Column, Integer, String, Float
from app.db.session import Base


class Supplier(Base):
    __tablename__ = "suppliers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), index=True)
    category = Column(String(100))
    market = Column(String(50))
    total_orders = Column(Integer, default=0)
    late_orders = Column(Integer, default=0)
    on_time_rate = Column(Float, default=0.0)
    avg_lead_time = Column(Float, default=0.0)
    total_revenue = Column(Float, default=0.0)
    avg_profit_margin = Column(Float, default=0.0)
    fill_rate = Column(Float, default=0.0)
    # Composite score 0–100
    performance_score = Column(Float, default=0.0)
