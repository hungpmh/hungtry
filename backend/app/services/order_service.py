from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_
from app.models.order import Order
from app.schemas.order import OrderFilter
from typing import List, Tuple


async def get_orders(db: AsyncSession, f: OrderFilter) -> Tuple[List[Order], int]:
    q = select(Order)
    conditions = []
    if f.category:
        conditions.append(Order.category_name == f.category)
    if f.market:
        conditions.append(Order.market == f.market)
    if f.shipping_mode:
        conditions.append(Order.shipping_mode == f.shipping_mode)
    if f.late_only:
        conditions.append(Order.late_delivery_risk == True)
    if conditions:
        q = q.where(and_(*conditions))

    count_q = select(func.count()).select_from(q.subquery())
    total = (await db.execute(count_q)).scalar_one()

    q = q.offset((f.page - 1) * f.page_size).limit(f.page_size)
    result = await db.execute(q)
    return result.scalars().all(), total


async def get_kpi_summary(db: AsyncSession) -> dict:
    result = await db.execute(
        select(
            func.count(Order.id).label("total_orders"),
            func.sum(Order.sales).label("total_revenue"),
            func.avg(Order.order_profit_per_order / func.nullif(Order.sales, 0)).label("avg_profit_margin"),
            func.avg(func.cast(Order.late_delivery_risk, "int")).label("late_delivery_rate"),
            func.avg(
                func.cast(Order.days_for_shipping_real, "float") -
                func.cast(Order.days_for_shipment_scheduled, "float")
            ).label("avg_days_late"),
        )
    )
    row = result.one()
    return {
        "total_orders": row.total_orders or 0,
        "total_revenue": round(row.total_revenue or 0, 2),
        "avg_profit_margin": round((row.avg_profit_margin or 0) * 100, 2),
        "late_delivery_rate": round((row.late_delivery_rate or 0) * 100, 2),
        "on_time_rate": round((1 - (row.late_delivery_rate or 0)) * 100, 2),
        "avg_days_late": round(row.avg_days_late or 0, 2),
    }


async def get_category_revenue(db: AsyncSession) -> List[dict]:
    result = await db.execute(
        select(
            Order.category_name,
            func.sum(Order.sales).label("revenue"),
            func.count(Order.id).label("orders"),
            func.sum(Order.order_profit_per_order).label("profit"),
        ).group_by(Order.category_name).order_by(func.sum(Order.sales).desc()).limit(10)
    )
    return [
        {"category": r.category_name, "revenue": round(r.revenue, 2),
         "orders": r.orders, "profit": round(r.profit, 2)}
        for r in result.all()
    ]


async def get_region_metrics(db: AsyncSession) -> List[dict]:
    result = await db.execute(
        select(
            Order.order_region,
            func.count(Order.id).label("orders"),
            func.sum(Order.sales).label("revenue"),
            func.avg(func.cast(Order.late_delivery_risk, "float")).label("late_rate"),
        ).group_by(Order.order_region).order_by(func.count(Order.id).desc())
    )
    return [
        {"region": r.order_region, "orders": r.orders,
         "revenue": round(r.revenue, 2), "late_rate": round(r.late_rate * 100, 2)}
        for r in result.all()
    ]
