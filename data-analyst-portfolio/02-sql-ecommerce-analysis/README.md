# Project 2: SQL Business Analysis — E-Commerce

**Difficulty:** Beginner → Intermediate
**Estimated time:** 10–15 hours

## Business scenario

You're the first analyst hired at **Olá Market**, a Brazilian e-commerce marketplace
(multi-seller, multi-category). There's no BI tool yet — every question from
leadership currently gets answered by an engineer running a one-off script, which is
slow and inconsistent. Your job this sprint: build a library of well-documented SQL
queries that answer the recurring business questions, so anyone on the team can run
them (or plug them into a future dashboard).

Leadership's actual questions:
- "What's our monthly revenue trend, and which product categories are driving it?"
- "Who are our best sellers, and are any of them consistently late on delivery?"
- "What fraction of customers order more than once? What's the average time between
  orders for repeat customers?"
- "Which states/regions have the highest average order value vs. the highest order
  volume — are they the same?"
- "Rank customers by lifetime spend within each state."

## Dataset

**Brazilian E-Commerce Public Dataset by Olist** (Kaggle) — a real, anonymized dataset
with ~100k orders across 9 relational tables (orders, order_items, customers, sellers,
products, payments, reviews, geolocation). This is the closest thing to a real
production schema you'll find for free, which is exactly why it's worth using here:
multi-table joins are unavoidable, not optional.

- Load it into PostgreSQL locally, or upload the CSVs to a free **BigQuery** sandbox
  project if you don't want to install anything.

## Step-by-step tasks

1. **Set up the schema**
   - Create tables matching Olist's structure, load the CSVs, and add primary/foreign
     keys. This alone teaches you a lot about relational integrity — expect to find
     orphaned foreign keys and decide how to handle them.

2. **Warm-up queries** (single table)
   - Total orders and revenue by month.
   - Order status breakdown (delivered, canceled, etc.) and cancellation rate.

3. **Join-based queries** (2–4 tables)
   - Revenue by product category (`order_items` + `products`).
   - Top 10 sellers by revenue, with their average review score
     (`order_items` + `sellers` + `order_reviews`).
   - Average delivery delay (actual vs. estimated delivery date) by seller — flag
     sellers whose average delay is a clear outlier.

4. **Window functions & CTEs**
   - Running monthly revenue total (`SUM() OVER (ORDER BY month)`).
   - Rank customers by lifetime spend within each state
     (`RANK() OVER (PARTITION BY state ORDER BY total_spend DESC)`).
   - Repeat purchase rate: % of customers with more than one order, and average days
     between a customer's first and second order (use `LAG()` or a self-join on
     `order_purchase_timestamp`).

5. **One deliberately "hard" query**
   - Month-over-month revenue growth % by category, showing category, current month
     revenue, prior month revenue, and growth % in one result set — this forces you to
     combine a CTE, a window function, and a calculated column in one query, which is
     a very common interview-style ask.

6. **Document it**
   - Every query gets a comment: what business question it answers, and one line on
     what you found.

## Tools

- SQL (PostgreSQL preferred; BigQuery Standard SQL is fine — note syntax differences
  if you switch, e.g. `DATE_TRUNC`, `LIMIT` vs `TOP`)
- Optional: DBeaver or pgAdmin as a GUI client

## Key skills you'll learn

- Multi-table joins (inner/left) and when each is correct
- Aggregation with `GROUP BY` / `HAVING`
- CTEs for readable, layered logic instead of nested subqueries
- Window functions: `RANK()`, `SUM() OVER()`, `LAG()`/`LEAD()`
- Translating an ambiguous business question into a precise query
- Basic query performance awareness (`EXPLAIN`, indexing intuition)

## Deliverables for your portfolio

- `queries.sql` — every query, commented, in this folder
- `FINDINGS.md` — 4–6 bullet insights, each with a number, pulled from your query
  results (e.g., "Repeat purchase rate is only 3% — most of the business is
  first-time buyers, which is a retention red flag")
- A GitHub README for this folder: business question → schema summary → key queries
  → findings

This is the project most SQL interview questions will resemble — treat the queries as
reusable interview prep, not just a one-time exercise.

When done, fill in `SUBMISSION_TEMPLATE.md` and let me know it's ready for review.
