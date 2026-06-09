import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app


@pytest.mark.asyncio
async def test_health():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        resp = await client.get("/health")
    assert resp.status_code == 200
    assert resp.json()["status"] == "ok"


@pytest.mark.asyncio
async def test_kpi_summary_empty_db():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        resp = await client.get("/api/v1/kpis/summary")
    # Returns 200 even on empty DB (zeros)
    assert resp.status_code == 200


@pytest.mark.asyncio
async def test_orders_pagination():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        resp = await client.get("/api/v1/orders/?page=1&page_size=10")
    assert resp.status_code == 200
    data = resp.json()
    assert "total" in data
    assert "items" in data
