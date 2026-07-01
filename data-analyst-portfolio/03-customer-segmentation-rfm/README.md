# Project 3: Customer Segmentation with RFM Analysis

**Difficulty:** Intermediate
**Estimated time:** 10–14 hours

## Business scenario

The marketing team at **Northwind Home Goods** (an online retailer) has a flat
promotional strategy: everyone gets the same monthly discount email. The CMO suspects
this is wasteful — big spenders don't need a discount to convert, and lapsed customers
probably need something more aggressive than 10% off. She's asked you to segment the
customer base so marketing can run **targeted campaigns**: a retention offer for
at-risk high-value customers, a welcome push for new customers, and a "we miss you"
win-back for lapsed ones.

## Dataset

**Online Retail II** (UCI Machine Learning Repository) — ~1M transaction rows from a
UK-based online retailer, 2009–2011, with `InvoiceNo, InvoiceDate, CustomerID,
Description, Quantity, UnitPrice, Country`. This is the standard dataset for RFM
projects because it's real transactional data with the exact fields RFM needs.
(If you already pulled Olist data for Project 2, you can reuse it here instead —
either works.)

## Step-by-step tasks

1. **Clean the data**
   - Drop rows with missing `CustomerID` (can't segment anonymous transactions).
   - Remove or separately flag returns/cancellations (`InvoiceNo` starting with "C" in
     this dataset, or negative `Quantity`).
   - Compute `Revenue = Quantity * UnitPrice` per line item.

2. **Compute RFM metrics per customer** (SQL or pandas — do it in both if you want the
   practice, but pandas is faster to iterate on for this project)
   - **Recency**: days since each customer's most recent purchase (relative to a fixed
     "analysis date" — usually the day after the dataset's last transaction).
   - **Frequency**: number of distinct orders (invoices) per customer.
   - **Monetary**: total revenue per customer.

3. **Score and segment**
   - Bucket each metric into quintiles (1–5) using `pd.qcut` — watch for ties/skew,
     which is common with Monetary and Frequency in real data; document how you
     handled it.
   - Combine R, F, M scores into named segments: **Champions** (high R, F, M),
     **Loyal Customers**, **At Risk** (were good, haven't bought recently), **New
     Customers** (high R, low F), **Hibernating/Lost** (low everything).
   - Don't just copy a generic segment map — look at your actual score distribution
     and justify your thresholds.

4. **Profile each segment**
   - Segment size (customer count and % of total), average order value, total revenue
     contribution per segment. This is the number that matters to marketing: "At Risk
     is only 12% of customers but 30% of historical revenue" is a much stronger
     argument for a retention budget than a segment chart alone.

5. **Visualize**
   - Bar chart of revenue contribution by segment (not just customer count — the two
     tell different stories).
   - Optional stretch: treemap or scatter of Recency vs. Frequency colored by segment.

6. **Recommend actions per segment**
   - One concrete marketing action per segment, tied to the data (e.g., "At Risk: 900
     customers, avg lifetime spend £340 — targeted win-back offer above generic
     discount tier").

## Tools

- Python: pandas, matplotlib/seaborn (`pd.qcut`, `groupby`, `merge`)
- SQL (optional, for computing R/F/M via `GROUP BY` + date functions instead of pandas)

## Key skills you'll learn

- RFM methodology (an actual named framework you can say in an interview)
- Quantile-based scoring and its pitfalls (ties, skewed distributions)
- pandas data wrangling: `groupby`, `agg`, `merge`, `qcut`
- Turning a segmentation into a business recommendation, not just a label

## Deliverables for your portfolio

- `rfm_analysis.ipynb` — cleaning, RFM computation, segmentation, charts
- `segment_summary.csv` — one row per segment: size, %, avg order value, revenue
  contribution
- `RECOMMENDATIONS.md` — one paragraph per segment: who they are, what the data says,
  what marketing should do
- GitHub README: business question → method → segment table → recommendations

When done, fill in `SUBMISSION_TEMPLATE.md` and let me know it's ready for review.
