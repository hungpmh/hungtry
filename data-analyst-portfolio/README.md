# Data Analyst Portfolio Roadmap

This is your project-based path to a job-ready Data Analyst portfolio. It lives in this
repo so every project has a real GitHub home, a commit history, and a written trail an
interviewer (or a hiring manager screening your GitHub) can follow.

## How this works

1. Work through the projects in order — each one adds a skill the next one assumes you have.
2. Each project folder has a `README.md` (the brief) and a `SUBMISSION_TEMPLATE.md`
   (what you fill in and hand back to me when done).
3. When you finish a project, drop your files in that project's folder (SQL scripts,
   notebooks, dashboard exports, screenshots) and fill in `SUBMISSION_TEMPLATE.md`.
   Tell me it's ready — I'll review it like a manager doing a work review: what's solid,
   what a hiring manager would push back on, and what to fix before it goes on your resume.
3. Track overall progress in [`PROGRESS.md`](./PROGRESS.md).
4. Once a project passes review, use
   [`resume-and-case-studies/`](./resume-and-case-studies) to turn it into a resume bullet
   and a case study write-up.

I will not just say "looks good." Expect real feedback: wrong chart choice, a metric
that's technically correct but answers the wrong business question, a query that would
time out on a real table, a dashboard with no clear "so what." That's the point — this
is what a first performance review looks like, except it happens before you're hired,
not after.

## Skill philosophy

Real Data Analyst job postings ask for three things, in this order of frequency:
**SQL**, **Excel/spreadsheets**, and **a BI tool (Power BI or Tableau)**. Python shows up
less often but differentiates you. Stats/A-B testing shows up in growth/product-analyst
roles specifically. This roadmap weights time accordingly — you'll spend more time in SQL
and dashboards than in Python notebooks.

Every project also forces **business framing**: you don't just "analyze data," you answer
a stakeholder's question and make a recommendation. That's what separates a portfolio
piece that gets you hired from a notebook full of charts nobody asked for.

## The 7 projects

| # | Project | Difficulty | Primary tools | Core skill added |
|---|---|---|---|---|
| 1 | [Retail Sales Performance Dashboard](./01-retail-sales-dashboard-excel) | Beginner | Excel (Power Query, PivotTables, Power Pivot) | Data cleaning, pivot analysis, dashboard basics |
| 2 | [SQL Business Analysis — E-Commerce](./02-sql-ecommerce-analysis) | Beginner→Intermediate | SQL (PostgreSQL/BigQuery) | Joins, aggregation, CTEs, window functions |
| 3 | [Customer Segmentation (RFM)](./03-customer-segmentation-rfm) | Intermediate | Python (pandas), SQL | Customer analytics, segmentation logic |
| 4 | [Cohort & Retention Analysis](./04-cohort-retention-analysis) | Intermediate | SQL/Python, Power BI or Tableau | Cohort tables, retention/churn metrics, heatmaps |
| 5 | [Marketing A/B Test Analysis](./05-marketing-ab-testing) | Intermediate→Advanced | Python (scipy), Excel | Hypothesis testing, experiment design |
| 6 | [HR People Analytics Dashboard](./06-hr-people-analytics-dashboard) | Intermediate | Power BI or Tableau | DAX/calculated fields, interactive dashboard UX |
| 7 | [Capstone: Supply Chain Analytics](./07-capstone-supply-chain-analytics) | Advanced | SQL + Python + Power BI/Tableau | End-to-end analyst workflow, data modeling |

Projects 1–2 are your foundation. Projects 3–6 can be reordered to your taste once 1–2
are done, but do the capstone last — it deliberately reuses skills from all six.

> Note on Project 7: this repo already contains an unrelated, previously-scaffolded
> full-stack engineering project (`backend/`, `frontend/`) built on the **DataCo Smart
> Supply Chain** dataset. Project 7 uses the same dataset but from an **analyst's**
> vantage point (SQL data model + BI dashboard, not a FastAPI app). Once you finish the
> analyst version, you're welcome to poke at that scaffold for a stretch goal — but don't
> start there; it's not part of this roadmap and isn't beginner-friendly.

## Suggested timeline (part-time, ~8–10 hrs/week)

| Phase | Weeks | Focus |
|---|---|---|
| Foundation | 1–3 | Projects 1–2 (Excel + SQL fundamentals) |
| Analytics depth | 4–7 | Projects 3–5 (Python, segmentation, experiments) |
| BI polish | 8–10 | Project 6 (dashboard UX, DAX) |
| Capstone | 11–13 | Project 7 + resume/case studies |
| Job push | 14+ | Applications, mock interviews, LinkedIn/portfolio site polish |

Adjust freely — the point is momentum, not the calendar. If a project is taking 3x the
estimate, that's a signal to ask me for help rather than push through alone.

## Tool setup (all free)

- **Excel**: Microsoft 365 (free via most universities/employers) or **Google Sheets**
  as a substitute for Project 1 — the concepts transfer, just not every feature name.
- **SQL**: [PostgreSQL](https://www.postgresql.org/download/) locally, or skip install
  entirely with **Google BigQuery's free sandbox** (no credit card, generous free tier)
  or [DB Fiddle](https://www.db-fiddle.com/) for quick practice.
- **Python**: [Anaconda](https://www.anaconda.com/download) or just `pip install pandas
  matplotlib seaborn scikit-learn scipy jupyterlab`. VS Code + Jupyter extension works too.
- **Power BI**: [Power BI Desktop](https://powerbi.microsoft.com/desktop/) (Windows only,
  free) — use a Windows VM or Tableau Public if you're on Mac/Linux.
- **Tableau**: [Tableau Public](https://public.tableau.com/) (free, cross-platform,
  publishes dashboards to a public link you can put on your resume).

You don't need both Power BI and Tableau — pick one as your "main" BI tool (check job
postings in your target market; Power BI dominates in most regions outside a few
Tableau-heavy industries) and use it consistently so your portfolio looks cohesive.

## Job-readiness checklist (revisit after the capstone)

- [ ] 5+ projects with clean GitHub READMEs (business question → approach → insight)
- [ ] At least one published/interactive dashboard (Power BI Service or Tableau Public link)
- [ ] Resume with quantified bullets pulled from `resume-and-case-studies/`
- [ ] LinkedIn "Featured" section linking to 2–3 best projects
- [ ] Can explain any project's "why" out loud in under 2 minutes (practice this — it's
      the actual interview question, not "walk me through your SQL")
- [ ] Comfortable with common SQL interview patterns: joins, window functions, GROUP BY
      + HAVING, self-joins, date truncation
- [ ] Comfortable explaining one project's business impact in dollar/percentage terms

When you're ready, tell me and we'll do a mock interview pass on your weakest project.
