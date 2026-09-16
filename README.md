# DataCo Smart Supply Chain Intelligence Platform

A full-stack supply chain analytics and forecasting platform built on the [DataCo Smart Supply Chain dataset](https://www.kaggle.com/datasets/shashwatwork/dataco-smart-supply-chain-for-big-data-analysis).

## HQT Group Website

The `hqt-website/` directory contains a separate, bilingual (EN/VI) static
marketing site for **HQT Group — Import · Export · Cold-Chain Logistics**.
It is built with Vite + React + Tailwind and published to GitHub Pages by
`.github/workflows/deploy-pages.yml` (Pages must be enabled once under
*Settings → Pages → Source: GitHub Actions*). See `hqt-website/README.md`.

## Business Problem

Supply chain managers lack a single view to answer:
- **When will orders be late?** → Late delivery risk classifier (XGBoost, F1 > 0.85)
- **How much stock do I need next month?** → Demand forecast (Prophet/ARIMA, MAPE < 15%)
- **Which suppliers are underperforming?** → Supplier scorecard (lead time, fill rate, cost)
- **Who are my best customers?** → RFM segmentation (K-Means clustering)

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                 React Dashboard (Vite)               │
│  KPI Cards │ Forecast Chart │ Risk Table │ Scorecard │
└──────────────────────┬──────────────────────────────┘
                       │ REST/JSON
┌──────────────────────▼──────────────────────────────┐
│              FastAPI Backend (Python 3.12)           │
│  /orders  /forecast  /risk  /suppliers  /kpis       │
└───────┬──────────────┬──────────────────────────────┘
        │              │
┌───────▼──────┐ ┌─────▼──────────────────────────────┐
│  PostgreSQL  │ │         ML Models (.pkl)             │
│  + Alembic   │ │  Prophet → demand forecast           │
│  migrations  │ │  XGBoost → delivery risk score       │
└──────────────┘ │  K-Means → customer segments         │
                 └────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + TypeScript + Tailwind CSS + Recharts |
| Backend | FastAPI + SQLAlchemy + Alembic + Pydantic v2 |
| Database | PostgreSQL 16 |
| ML | scikit-learn, XGBoost, Prophet, pandas |
| Infra | Docker Compose, GitHub Actions CI |

## Quick Start

```bash
# 1. Clone and enter project
git clone https://github.com/hungpmh/hungtry.git && cd hungtry

# 2. Download dataset from Kaggle → place CSV in data/raw/dataco.csv

# 3. Start all services
docker-compose up --build

# 4. Run ETL pipeline
docker-compose exec backend python -m app.ml.pipeline

# 5. Train ML models
docker-compose exec backend python -m app.ml.train

# 6. Open dashboard
open http://localhost:5173
# API docs: http://localhost:8000/docs
```

## Project Structure

```
hungtry/
├── backend/          # FastAPI application
│   ├── app/
│   │   ├── api/      # Route handlers
│   │   ├── core/     # Config, security
│   │   ├── db/       # Database session
│   │   ├── models/   # SQLAlchemy ORM models
│   │   ├── schemas/  # Pydantic schemas
│   │   ├── services/ # Business logic
│   │   └── ml/       # ML pipeline + training
│   └── tests/
├── frontend/         # React + Vite app
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       └── services/
├── data/
│   ├── raw/          # Original DataCo CSV (gitignored)
│   ├── processed/    # Cleaned data
│   └── scripts/      # EDA notebooks
├── infra/            # Docker configs
└── .github/workflows/
```

## Key Metrics (after training on DataCo dataset)

| Model | Metric | Target |
|---|---|---|
| Demand Forecast | MAPE | < 15% |
| Delivery Risk | F1-Score | > 0.85 |
| Customer Segments | Silhouette Score | > 0.4 |
