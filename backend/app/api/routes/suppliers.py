from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.schemas.supplier import SupplierRead
from app.services.supplier_service import get_suppliers
from typing import List, Optional

router = APIRouter(prefix="/suppliers", tags=["suppliers"])


@router.get("/", response_model=List[SupplierRead])
async def list_suppliers(
    market: Optional[str] = None,
    db: AsyncSession = Depends(get_db),
):
    return await get_suppliers(db, market)
