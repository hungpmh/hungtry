from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.schemas.kpi import KPISummary, CategoryRevenue, RegionMetrics
from app.services.order_service import get_kpi_summary, get_category_revenue, get_region_metrics
from typing import List

router = APIRouter(prefix="/kpis", tags=["kpis"])


@router.get("/summary", response_model=KPISummary)
async def kpi_summary(db: AsyncSession = Depends(get_db)):
    return await get_kpi_summary(db)


@router.get("/categories", response_model=List[CategoryRevenue])
async def category_revenue(db: AsyncSession = Depends(get_db)):
    return await get_category_revenue(db)


@router.get("/regions", response_model=List[RegionMetrics])
async def region_metrics(db: AsyncSession = Depends(get_db)):
    return await get_region_metrics(db)
