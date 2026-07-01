# Project 5: Marketing A/B Test Analysis

**Difficulty:** Intermediate → Advanced
**Estimated time:** 8–12 hours

## Business scenario

The growth team at **Flowly** (same app as Project 4) ran a two-week experiment: half
of new visitors saw the existing checkout page (control), half saw a redesigned
one-page checkout (treatment). 14 days in, the team lead pings you: "treatment looks
higher, can we ship it?" Your job is to determine whether the observed lift is real or
noise, and to write the recommendation memo that either ships the change or kills it —
along with catching any experiment design problems before you trust the result at all.

## Dataset

**Kaggle "Marketing A/B Testing" dataset**, or construct your own mock dataset with
columns:

```
user_id, group ('control'/'treatment'), converted (0/1), timestamp
```

If you build it yourself: simulate ~20,000 control users at a ~12% conversion rate and
~20,000 treatment users at a ~13.2% conversion rate (a realistic, modest lift — not an
obvious 2x that any eyeball test would catch), using `numpy.random.binomial`. Document
your true simulated effect size so you can check whether your test correctly detects
it.

## Step-by-step tasks

1. **Sanity-check the experiment before touching the stats**
   - Sample Ratio Mismatch (SRM) check: are control/treatment group sizes close to the
     expected 50/50 split? Use a chi-square goodness-of-fit test. A significant SRM
     means something is broken in randomization and the results below aren't
     trustworthy no matter what they show — this is a real, commonly-skipped step and
     mentioning it in an interview signals you know what you're doing.
   - Check for peeking risk: was the test analyzed mid-flight repeatedly? (For this
     project, just note the practice and don't do it — analyze once, at the planned
     endpoint.)

2. **Compute the core metric**
   - Conversion rate for control and treatment, with a confidence interval for each
     (Wilson or normal approximation).

3. **Run the significance test**
   - Two-proportion z-test (or chi-square test of independence) comparing conversion
     rates. Report the p-value, the 95% CI on the *difference*, and the effect size
     (absolute and relative lift).

4. **Check practical significance, not just statistical significance**
   - A statistically significant 0.3 percentage-point lift might not be worth the
     engineering cost of shipping. State the minimum lift that would justify shipping
     (make an assumption if the business scenario doesn't state one, and say so), and
     compare your result against it.

5. **Segment check (optional but strong)**
   - Does the effect hold across device type or user segment, or is it driven by one
     subgroup? This is the kind of follow-up a good growth analyst does before
     recommending a full rollout.

6. **Write the readout memo**
   - One page: hypothesis, result, statistical significance, practical significance,
     recommendation (ship / don't ship / run longer), and what could invalidate the
     result (SRM, novelty effect, seasonality).

## Tools

- Python: `scipy.stats` (`proportions_ztest` from `statsmodels`, or manual z-test),
  pandas
- Excel as an alternative for the z-test formulas if you want the spreadsheet-stats
  practice (many analyst roles expect you can do this without Python)

## Key skills you'll learn

- Hypothesis testing fundamentals (null/alternative, p-value, confidence interval)
- Two-proportion z-test / chi-square test
- Sample Ratio Mismatch and why it matters
- Statistical vs. practical significance — a real distinction hiring managers probe for
- Writing a decision-oriented memo, not just a stats printout

## Deliverables for your portfolio

- `ab_test_analysis.ipynb` (or `.xlsx` if done in Excel)
- `READOUT_MEMO.md` — the one-pager: hypothesis → result → recommendation → caveats
- GitHub README: business question → method → result → recommendation

This project is a strong one to bring up in behavioral interviews for growth/product
analyst roles specifically — be ready to explain SRM and practical-vs-statistical
significance out loud without notes.

When done, fill in `SUBMISSION_TEMPLATE.md` and let me know it's ready for review.
