# Project 6: HR People Analytics Dashboard

**Difficulty:** Intermediate
**Estimated time:** 10–14 hours

## Business scenario

**Meridian Consulting**, a 1,470-employee professional services firm, has an attrition
problem — HR knows overall turnover is climbing but has no self-serve way to see
*where*. The CHRO wants a dashboard she can open before any leadership meeting to
answer "which department/role is bleeding people, and is it correlated with anything
we control (pay, overtime, tenure, commute distance)?" without emailing HR analytics
for a custom export every time.

## Dataset

**IBM HR Analytics Employee Attrition & Performance** (Kaggle) — 1,470 rows, one row
per employee, with `Attrition, Department, JobRole, MonthlyIncome, OverTime,
YearsAtCompany, DistanceFromHome, JobSatisfaction, WorkLifeBalance`, and more. Widely
used specifically because it's clean enough to focus on dashboard/DAX skills rather
than fighting the data.

## Step-by-step tasks

1. **Import & model**
   - Load into Power BI (or Tableau) via Power Query/data source connector.
   - Fix data types, and if using Power BI, build a simple date table if you want
     time-based analysis (this dataset is a single snapshot, so this is mostly for
     practice — note that limitation in your writeup rather than faking a trend).

2. **Core DAX measures** (Power BI) or calculated fields (Tableau)
   - `Attrition Rate = DIVIDE([Attrited Employees], [Total Employees])`
   - Average tenure, average monthly income by department/role
   - Attrition rate by OverTime flag, by JobSatisfaction level, by DistanceFromHome
     bucket — the goal is finding which factors actually correlate with attrition in
     this data, not assuming which ones do.

3. **Build the dashboard** (2 pages minimum)
   - **Overview page**: headcount, overall attrition rate, attrition rate trend by
     department (bar), top 3 attrition drivers you found in step 2, presented as
     simple comparison charts (not a raw correlation matrix — this is for a CHRO, not
     a data scientist).
   - **Drill-down page**: attrition rate by Department × JobRole (matrix or heatmap),
     with filters for Department, JobRole, Gender, Age band. Add a tooltip or
     drill-through to individual employee-level detail on click, if your tool supports
     it — this is the kind of interactivity that separates a real dashboard from a
     static chart export.

4. **Design pass**
   - Consistent color use (e.g., attrition = red-ish, retention = neutral/blue — not
     rainbow charts), aligned layout, one clear takeaway visible without scrolling.
   - Add a text box or card stating the single biggest finding in plain language.

5. **Publish**
   - Power BI: publish to Power BI Service (free tier) if you have access, or export a
     PDF/screenshots if not.
   - Tableau: publish to **Tableau Public** — this gives you a real interactive link
     to put on your resume/LinkedIn, which is a meaningfully stronger portfolio piece
     than a screenshot.

## Tools

- Power BI Desktop (DAX, Power Query, Power BI Service) **or** Tableau (calculated
  fields, Tableau Public) — pick one as your primary BI tool per the roadmap README

## Key skills you'll learn

- BI tool data modeling and DAX/calculated-field logic
- Multi-page interactive dashboard design with filters/drill-through
- Choosing the right chart for the audience (exec-level clarity over analyst-level
  detail)
- Publishing a dashboard others can actually open and use

## Deliverables for your portfolio

- `.pbix` or `.twbx` file
- Published link (Power BI Service or Tableau Public) — **this is the deliverable
  that matters most for your resume**
- 3–4 screenshots for your GitHub README
- GitHub README: business question → data model → key findings → dashboard link

When done, fill in `SUBMISSION_TEMPLATE.md` and let me know it's ready for review.
