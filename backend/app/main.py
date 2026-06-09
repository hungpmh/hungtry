from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.session import engine, Base
from app.models import order, supplier  # noqa: register models
from app.api.routes import orders, kpis, suppliers, forecast, risk


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield


app = FastAPI(
    title="DataCo Smart Supply Chain API",
    description="Supply chain intelligence — KPIs, demand forecasting, delivery risk, supplier scorecard",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(orders.router, prefix="/api/v1")
app.include_router(kpis.router, prefix="/api/v1")
app.include_router(suppliers.router, prefix="/api/v1")
app.include_router(forecast.router, prefix="/api/v1")
app.include_router(risk.router, prefix="/api/v1")


@app.get("/health")
async def health():
    return {"status": "ok"}
