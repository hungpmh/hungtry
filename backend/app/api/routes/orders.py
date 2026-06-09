from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.schemas.order import OrderRead, OrderFilter
from app.services.order_service import get_orders
from typing import Optional

router = APIRouter(prefix="/orders", tags=["orders"])


@router.get("/", response_model=dict)
async def list_orders(
    category: Optional[str] = None,
    market: Optional[str] = None,
    shipping_mode: Optional[str] = None,
    late_only: bool = False,
    page: int = Query(1, ge=1),
    page_size: int = Query(50, ge=1, le=200),
    db: AsyncSession = Depends(get_db),
):
    f = OrderFilter(
        category=category, market=market,
        shipping_mode=shipping_mode, late_only=late_only,
        page=page, page_size=page_size,
    )
    orders, total = await get_orders(db, f)
    return {
        "total": total,
        "page": page,
        "page_size": page_size,
        "items": [OrderRead.model_validate(o) for o in orders],
    }
