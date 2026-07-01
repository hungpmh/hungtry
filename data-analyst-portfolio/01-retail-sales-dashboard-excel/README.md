# Project 1: Retail Sales Performance Dashboard (Excel)

**Difficulty:** Beginner
**Estimated time:** 8–12 hours

## Business scenario

You're the analyst supporting the regional sales team at **BrightMart Retail**, a
mid-size furniture/office-supplies retailer with stores across four US regions. The
VP of Sales currently gets a static PDF export once a month and has no way to slice
performance by region, category, or time period between reports. She's asked for a
**self-serve Excel dashboard** she and her regional managers can open, filter, and
present from directly in the monthly business review — no analyst required to answer
"how did the West region do in Q3."

Her actual questions, verbatim from the ask:
- "Which regions/categories are driving revenue growth vs. dragging it down?"
- "Are we discounting our way into losing money on any category?"
- "Who are our top 10 customers and what do they buy?"
- "Show me month-over-month trend, not just a single snapshot."

## Dataset

Use the **Sample Superstore dataset** (~9,800 rows, 3 years of order data: Sales,
Profit, Discount, Region, Category, Sub-Category, Customer, Ship Mode).
- Download: search "Sample Superstore dataset Kaggle" or "Tableau Sample Superstore" —
  it's the standard, widely-used free dataset for exactly this kind of project.
- Alternative if you want to build your own: mock 2,000+ rows with columns
  `OrderID, OrderDate, CustomerName, Region, Category, SubCategory, Sales, Quantity,
  Discount, Profit`.

## Step-by-step tasks

1. **Import & clean** (Power Query)
   - Load the CSV via Power Query (`Data → Get Data → From Text/CSV`), not a raw paste —
     this is how it's done in real jobs and keeps your pipeline refreshable.
   - Fix data types (dates as dates, currency as numbers), remove exact duplicate rows,
     check for negative Quantity/Sales values that indicate returns and decide how to
     handle them (flag separately, don't just delete).
   - Add calculated columns: `Profit Margin = Profit / Sales`, `Order Year-Month`.

2. **Build the data model**
   - Load cleaned data into the Excel Data Model (Power Pivot). Even with one flat
     table, do this — it's the pattern you'll need when a second table (e.g., a
     regional targets table) shows up.

3. **Core analysis (PivotTables)**
   - Revenue and profit by Region and by Category — find at least one category that's
     unprofitable or barely profitable despite decent sales (there is one in this
     dataset — that's your headline insight).
   - Month-over-month sales trend (line chart from a PivotTable).
   - Top 10 customers by revenue, with their top category.
   - Discount vs. profit margin — check whether heavier discounting is correlated with
     thinner or negative margins.

4. **Dashboard assembly**
   - One dashboard sheet, not five scattered tabs. Include: 3–4 KPI cards (Total
     Revenue, Total Profit, Profit Margin %, YoY Growth %), a region/category
     breakdown chart, a trend line, and a top-customers table.
   - Add slicers for Region, Category, and Year so it's genuinely interactive.
   - Use conditional formatting sparingly and meaningfully (e.g., red for negative
     profit margin), not as decoration.

5. **Write the insight, not just the chart**
   - On a separate "Summary" sheet or in your write-up: state the 2–3 things the VP
     should act on, in plain English, backed by a number. "Furniture has a -X% margin
     in the West region, driven by average discounts of Y% — recommend capping
     furniture discounts at Z%" beats "here is a chart of furniture sales."

## Tools

- Excel: Power Query, PivotTables, Power Pivot/Data Model, XLOOKUP or INDEX/MATCH,
  conditional formatting, slicers, basic dashboard layout.

## Key skills you'll learn

- Real-world data cleaning (types, duplicates, negative-value edge cases)
- Power Query as a repeatable ETL step (not manual cleanup you can't redo)
- PivotTable-driven analysis and KPI definition
- Dashboard layout and interactivity (slicers)
- Turning a chart into a business recommendation

## Deliverables for your portfolio

- `.xlsx` file with the Power Query steps intact (don't flatten to values only —
  reviewers and interviewers may check that your query steps are real)
- 1-page written insight summary (can be a sheet in the workbook or a separate
  `INSIGHTS.md`)
- 2–3 screenshots of the dashboard for your GitHub README and resume/LinkedIn
- A GitHub README for this project folder explaining: business question → what you
  did → what you found → what you'd recommend

When done, fill in `SUBMISSION_TEMPLATE.md` in this folder and let me know it's ready
for review.
