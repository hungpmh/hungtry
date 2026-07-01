# Project 7 (Capstone): End-to-End Supply Chain Analytics

**Difficulty:** Advanced
**Estimated time:** 20–30 hours

## Business scenario

You're the analyst embedded with the operations team at **DataCo Global**, a
consumer-goods distributor shipping across multiple regions and product categories.
Leadership has three standing questions they currently can't answer without a
multi-day manual pull:

- "Which orders are at risk of shipping late, and is it a carrier problem, a region
  problem, or a specific-category problem?"
- "Which suppliers/regions are costing us the most in late fees and lost repeat
  business?"
- "What does demand look like next quarter by category, so procurement can plan?"

This capstone asks you to go **end-to-end**: raw data → cleaned data model → SQL
analysis → Python deep-dive → a BI dashboard that answers all three questions in one
place. This is deliberately the most open-ended project — you'll make more of your own
scoping decisions here, which is exactly what a real first project at a new job looks
like.

## Dataset

**DataCo Smart Supply Chain dataset** (Kaggle) — ~180k order line items with
customer, order, shipping, and product fields, including `Late_delivery_risk`,
`Days for shipping (real)` vs `(scheduled)`, `Order Region`, `Order Country`,
`Category Name`, `Order Item Profit Ratio`.

> **This repo already has this dataset referenced in `backend/` and `frontend/`** as
> part of an earlier, unrelated full-stack engineering scaffold (FastAPI + React + ML
> models). **Don't start from that code** — it's a different kind of project (a
> production app, not an analyst deliverable) and skips past the SQL/BI skills this
> capstone exists to build. Pull the raw CSV yourself and build your own data model
> from scratch in this folder. Once you've finished your own analyst-first version,
> you're welcome to explore `backend/app/ml/` as a stretch goal to see how the same
> dataset looks in a production ML pipeline — but treat that as bonus reading, not
> part of this project's scope or grading.

## Step-by-step tasks

1. **Data modeling**
   - Design a simple star schema: a fact table (order line items: quantities, sales,
     profit, shipping dates) and dimension tables (customer, product, region/geo,
     date). Load into PostgreSQL.
   - Document your schema decisions — what you denormalized and why.

2. **SQL layer — the three standing questions**
   - **Late delivery risk**: late delivery rate by region, by category, by shipping
     mode. Identify the 2–3 biggest contributors to late deliveries.
   - **Cost of lateness**: relationship between late delivery and profit ratio/order
     value — are late orders costing measurably more (returns, discounts, lost repeat
     purchases)?
   - **Demand trend**: monthly order volume and revenue by category, with
     month-over-month growth, as the input to a forecast.

3. **Python deep-dive** (pick at least one)
   - A lightweight demand forecast per category (moving average or simple linear
     trend is fine — this capstone is about the analyst workflow, not building a
     production forecasting model) with a plain-English confidence caveat.
   - Or: a late-delivery-risk breakdown using logistic regression or a decision tree,
     used for *interpretation* (which features matter most) rather than deployment —
     report feature importance in business terms, not just a model score.

4. **Dashboard** (Power BI or Tableau)
   - One dashboard, 2–3 pages, answering all three standing questions:
     operations/late-delivery page, supplier/region cost page, demand trend page.
   - Include a plain-language executive summary text box per page.

5. **Case study write-up**
   - This is your flagship portfolio piece — write it as a full case study using
     `../resume-and-case-studies/case-study-template.md`: problem, approach,
     trade-offs you made and why, findings, business recommendation, what you'd do
     differently with more time.

## Tools

- SQL (PostgreSQL) for data modeling and the three core analyses
- Python (pandas, plus scikit-learn or statsmodels if you do the modeling stretch)
- Power BI or Tableau for the final dashboard

## Key skills you'll learn

- Star-schema data modeling from a flat raw file
- Scoping an open-ended, multi-part business ask into a structured deliverable
- Combining SQL, Python, and BI in one coherent project (the actual shape of most real
  analyst jobs)
- Writing a case study that explains *decisions*, not just results

## Deliverables for your portfolio

- `schema.sql` + ETL script (SQL or Python) loading raw CSV → modeled tables
- `analysis.sql` / `analysis.ipynb` covering the three standing questions
- Dashboard file + published link/screenshots
- Full case study write-up (this is the piece to lead with in interviews and on
  LinkedIn)
- GitHub README tying it all together

This is your capstone — treat it as the project you'll spend the most interview time
discussing. It should be able to stand alone as "tell me about a project" for a full
5-minute answer.

When done, fill in `SUBMISSION_TEMPLATE.md` and let me know it's ready for review.
