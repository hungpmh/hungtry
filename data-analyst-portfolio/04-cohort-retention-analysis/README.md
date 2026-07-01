# Project 4: Cohort & Retention Analysis

**Difficulty:** Intermediate
**Estimated time:** 10–14 hours

## Business scenario

**Flowly**, a subscription meal-planning app, redesigned its onboarding flow six
months ago (call it the cutover month). The product team believes retention improved
but has no proof — they've been looking at total active users, which is up, but that
conflates growth with retention. You've been asked to build a **cohort retention
analysis** that isolates whether users who signed up *after* the redesign stick around
longer than users who signed up *before* it.

This is one of the most common real analyst deliverables — product and growth teams
live on cohort retention curves.

## Dataset

There's no great public dataset for this shape of problem, so you'll generate
realistic mock data — which is itself a useful skill (you'll do this on the job when
sample data doesn't exist yet).

Build two tables in Python:

```
users
├── user_id
├── signup_date        # spread over ~12 months
└── signup_cohort       # derived: YYYY-MM of signup_date

activity_events
├── user_id
├── event_date          # any active-usage event (login, session, order)
└── event_type
```

Generate ~3,000 users and their activity with `numpy`/`pandas`, deliberately building
in a retention *improvement* after your chosen cutover month (e.g., pre-cutover
cohorts churn faster) so your analysis has something real to detect — but don't make
it too obvious; add noise so the signal isn't trivial to eyeball.

## Step-by-step tasks

1. **Generate the mock data** with a documented random seed (so it's reproducible) and
   a clear, written description of the retention pattern you built in — you'll "forget"
   your own signal on purpose isn't the point; the point is practicing the *method* on
   data you understand end-to-end before you do it on a black-box real dataset later
   in your career.

2. **Build the cohort table**
   - Assign each user to a signup cohort (month).
   - For each user, compute "months since signup" for each active month.
   - Pivot into a cohort × month-since-signup matrix of % of users still active
     (retention rate), in SQL (`GROUP BY` + a period-difference calc) or pandas
     (`pivot_table`).

3. **Visualize as a heatmap**
   - Standard retention heatmap: rows = cohort month, columns = months since signup,
     cell = retention %. Build this in Python (seaborn heatmap) AND in Power BI or
     Tableau — the BI version is what goes on your resume as an interactive artifact.

4. **Compare pre- vs. post-redesign cohorts**
   - Overlay average Month-1, Month-3, Month-6 retention for cohorts before vs. after
     your cutover. State whether the difference looks meaningful, and be honest about
     sample size limits (early post-redesign cohorts won't have 6 months of data yet —
     don't compare a cohort to itself with missing future data as if it churned).

5. **Translate to business terms**
   - Convert retention curves into an implied customer lifetime estimate (simple: sum
     of retention rates ≈ expected active months) and note the LTV implication of the
     redesign if retention did improve.

## Tools

- Python (pandas for cohort table construction, seaborn/matplotlib for heatmap) or SQL
  for the cohort table
- Power BI or Tableau for the polished, interactive heatmap dashboard

## Key skills you'll learn

- Cohort table construction (a genuinely fiddly pivot — expect to get the
  months-since-signup calculation wrong once before it clicks)
- Retention/churn as metrics distinct from raw active-user counts
- Heatmap design for time-based data
- Honest handling of incomplete/censored data (new cohorts lacking future months)
- Basic LTV intuition from retention curves

## Deliverables for your portfolio

- `generate_mock_data.py` (documented, reproducible)
- `cohort_analysis.ipynb` or `cohort_queries.sql`
- Cohort heatmap: both a static image and a Power BI/Tableau interactive version
  (screenshot + published link if using Tableau Public)
- `FINDINGS.md`: pre- vs. post-redesign retention comparison, with the caveat about
  data completeness stated explicitly
- GitHub README: business question → method → heatmap → findings

When done, fill in `SUBMISSION_TEMPLATE.md` and let me know it's ready for review.
