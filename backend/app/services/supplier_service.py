from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.supplier import Supplier
from typing import List


async def get_suppliers(db: AsyncSession, market: str = None) -> List[Supplier]:
    q = select(Supplier).order_by(Supplier.performance_score.desc())
    if market:
        q = q.where(Supplier.market == market)
    result = await db.execute(q)
    return result.scalars().all()
