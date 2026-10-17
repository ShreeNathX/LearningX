export const dataAnalystQuestions = [
  {
    id: 'da-sql-ranking', category: 'SQL', title: 'Find the second-highest salary',
    prompt: 'A company asks for the second-highest distinct salary. How would you handle ties and the case where no second salary exists?',
    answer: 'Rank distinct salaries with DENSE_RANK() ordered descending, then select rank 2. DENSE_RANK keeps ties at the same rank. If no row has rank 2, return NULL or an empty result according to the requested output.',
    followUp: 'Explain when you would use ROW_NUMBER, RANK, or DENSE_RANK.'
  },
  {
    id: 'da-sql-topn', category: 'SQL', title: 'Top 3 products in each category',
    prompt: 'Given products and sales, return the three best-selling products per category, including ties at third place.',
    answer: 'Aggregate sales by category and product first. Apply DENSE_RANK() over each category ordered by total sales descending, then keep ranks up to 3. Clarify whether ties may produce more than three rows.',
    followUp: 'What changes if the business requires exactly three rows per category?'
  },
  {
    id: 'da-sql-retention', category: 'SQL', title: 'Calculate next-day retention',
    prompt: 'For each signup date, calculate the share of users who returned the next day.',
    answer: 'Deduplicate user activity by user and date. Self-join each activity date to the same user’s date plus one day, count returning users per cohort date, and divide by the cohort size with a decimal cast and a zero-denominator guard.',
    followUp: 'How would you change the definition to seven-day retention?'
  },
  {
    id: 'da-sql-mom', category: 'SQL', title: 'Month-over-month revenue change',
    prompt: 'How do you calculate monthly revenue and its percentage change from the previous month?',
    answer: 'Aggregate net revenue by calendar month, then use LAG(revenue) over months in ascending order. Compute (current - previous) / NULLIF(previous, 0) and decide how to display the first month and months with zero prior revenue.',
    followUp: 'How would you ensure months with no transactions still appear?'
  },
  {
    id: 'da-sql-joins', category: 'SQL', title: 'Why did a join inflate my totals?',
    prompt: 'A revenue report doubled after joining orders to order_items. How do you diagnose and fix it?',
    answer: 'Check the grain and key cardinality of both tables. One order can have many items, so joining duplicates order-level values. Aggregate at a consistent grain before joining, or sum item-level revenue from the detail table. Validate row counts and totals before and after each join.',
    followUp: 'What does “grain” mean in a data model?'
  },
  {
    id: 'da-sql-null', category: 'SQL', title: 'COUNT(*) versus COUNT(column)',
    prompt: 'What is the difference between COUNT(*), COUNT(column), and COUNT(DISTINCT column)?',
    answer: 'COUNT(*) counts rows. COUNT(column) counts non-NULL values in that column. COUNT(DISTINCT column) counts distinct non-NULL values. NULL comparisons require IS NULL / IS NOT NULL because NULL represents unknown.',
    followUp: 'Why can NOT IN behave unexpectedly when the subquery contains NULL?'
  },
  {
    id: 'da-excel-lookup', category: 'Excel', title: 'Choose a lookup method',
    prompt: 'When would you use XLOOKUP versus INDEX/MATCH or VLOOKUP?',
    answer: 'Prefer XLOOKUP when available: it supports either lookup direction, exact match by default, and an explicit not-found result. INDEX/MATCH works in older Excel versions and separates the return range from the lookup position. VLOOKUP is familiar but depends on a leftmost lookup column and a fragile column index.',
    followUp: 'How would you handle duplicate lookup keys?'
  },
  {
    id: 'da-excel-pivot', category: 'Excel', title: 'Summarize a large sales sheet',
    prompt: 'A manager needs revenue by region and month with product filters. How would you build this in Excel?',
    answer: 'Use a clean tabular source with one header row, convert it to an Excel Table, then create a PivotTable with region and month as rows, revenue as values, and product as a filter or slicer. Check that revenue is summed, dates group correctly, and blanks or duplicate records are understood.',
    followUp: 'When would Power Query be more appropriate than formulas?'
  },
  {
    id: 'da-excel-sumifs', category: 'Excel', title: 'Calculate conditional totals safely',
    prompt: 'How would you total sales for one region and a date range, and what would you check if the result is wrong?',
    answer: 'Use SUMIFS with the amount range and criteria ranges for region and inclusive start / exclusive next-day end dates. Confirm dates are real date values, ranges have matching dimensions, and the source has no duplicate rows or text-formatted amounts.',
    followUp: 'Why is an exclusive end date often safer when a timestamp includes time?'
  },
  {
    id: 'da-excel-clean', category: 'Excel', title: 'Clean inconsistent text values',
    prompt: 'A customer column contains extra spaces, inconsistent casing, and non-printing characters. What is your approach?',
    answer: 'Preserve the raw column, then create a cleaned field using TRIM and CLEAN, standardize case where appropriate, and normalize known aliases with a mapping table. Check how many values changed and inspect unmatched categories before replacing source data.',
    followUp: 'How would you make this repeatable for a monthly file?'
  },
  {
    id: 'da-stats-median', category: 'Statistics', title: 'Mean or median for income?',
    prompt: 'A few very high incomes pull up the average. Which measure would you report and why?',
    answer: 'Report the median as a robust measure of a typical person’s income because it is less affected by extreme values. You may also report the mean when total-per-person arithmetic matters, alongside the distribution and clear context.',
    followUp: 'What chart would help explain the skew?'
  },
  {
    id: 'da-stats-test', category: 'Statistics', title: 'Explain a p-value',
    prompt: 'An A/B test reports p = 0.03. Explain what that does and does not mean to a business stakeholder.',
    answer: 'Assuming the null hypothesis and test assumptions are true, a p-value of 0.03 means results at least this extreme would occur about 3% of the time by chance. It is not the probability the null is true, nor proof the change matters. Check effect size, confidence interval, sample design, and practical impact.',
    followUp: 'What would you check before trusting the test result?'
  },
  {
    id: 'da-stats-corr', category: 'Statistics', title: 'Correlation is not causation',
    prompt: 'Ad spend and sales rise together. Can you conclude that increasing ad spend caused the increase?',
    answer: 'No. A third factor such as seasonality, pricing, or demand may affect both. Use a randomized experiment when possible, or a credible quasi-experimental design; control for confounders and state assumptions and limitations.',
    followUp: 'What is one confounder you would investigate in this example?'
  },
  {
    id: 'da-powerbi-model', category: 'Power BI', title: 'Design a model for sales reporting',
    prompt: 'How would you model orders, products, customers, and dates for a Power BI report?',
    answer: 'Use a star schema: a fact table at a clearly defined transaction or order-line grain, linked to descriptive dimensions such as Date, Product, and Customer with one-to-many relationships. Keep keys and filter direction clear, and avoid unnecessary many-to-many relationships.',
    followUp: 'Why is a star schema usually easier to analyze than one wide flat table?'
  },
  {
    id: 'da-powerbi-measures', category: 'Power BI', title: 'Measure versus calculated column',
    prompt: 'Explain the difference between a DAX measure and a calculated column, and when you would use each.',
    answer: 'A calculated column is evaluated for each row during model refresh and stored in the model. A measure is evaluated at query time in the current filter context. Use measures for aggregations such as revenue and margin; use columns for row-level categories or relationship keys when necessary.',
    followUp: 'What does filter context mean for a measure?'
  },
  {
    id: 'da-powerbi-kpi', category: 'Power BI', title: 'Build a useful KPI dashboard',
    prompt: 'What would you ask before building a sales performance dashboard for leadership?',
    answer: 'Clarify the decisions, audience, KPI definitions, targets, time grain, data freshness, and required breakdowns. Show a small set of actionable metrics with trends and comparisons, provide filters that answer real questions, and validate every measure with stakeholders against a trusted source.',
    followUp: 'How would you prevent a dashboard from encouraging a misleading comparison?'
  },
  {
    id: 'da-python-missing', category: 'Python / Pandas', title: 'Handle missing data in Pandas',
    prompt: 'A dataset has missing values in revenue, region, and optional comments. How do you decide what to do?',
    answer: 'Profile missingness and its pattern first. Do not fill every column the same way: investigate missing revenue, consider an explicit Unknown category for region if appropriate, and leave optional comments missing. Document exclusions or imputations and compare results with and without them.',
    followUp: 'How could non-random missingness bias your analysis?'
  },
  {
    id: 'da-python-merge', category: 'Python / Pandas', title: 'Merge two Pandas tables safely',
    prompt: 'How do you combine customer and order data without accidentally multiplying rows?',
    answer: 'Inspect the key uniqueness and expected grain first. Use merge with an explicit key and validate cardinality such as one-to-many, then compare row counts, unmatched keys, and key totals. Use an indicator column when you need to audit unmatched rows.',
    followUp: 'What would validate="many_to_one" help catch?'
  },
  {
    id: 'da-python-groupby', category: 'Python / Pandas', title: 'Summarize sales by month and region',
    prompt: 'Describe a clean Pandas workflow to produce monthly revenue by region.',
    answer: 'Parse and validate the date column, handle invalid records explicitly, derive a month period, then group by month and region and aggregate revenue. Check null groups, duplicate transaction IDs, and reconcile the grand total to the source before exporting or plotting.',
    followUp: 'When would you use resample instead of groupby?'
  },
  {
    id: 'da-case-drop', category: 'Business case', title: 'Investigate a sudden conversion drop',
    prompt: 'The signup conversion rate fell 15% yesterday. Walk through how you would investigate it.',
    answer: 'First verify the metric definition, data freshness, and tracking changes. Compare the funnel step by step and segment by device, channel, geography, and new versus returning users. Check releases, outages, and traffic mix; quantify impact, identify the likely driver, and recommend a test or fix with a monitoring plan.',
    followUp: 'What guardrail metric would you watch while fixing the issue?'
  },
  {
    id: 'da-case-revenue', category: 'Business case', title: 'Revenue is up but orders are down',
    prompt: 'Revenue increased 10% while order count fell 8%. What could explain this and what would you analyze?',
    answer: 'Average order value may have risen, or product, customer, discount, or channel mix changed. Validate revenue and order definitions, then decompose revenue into order count × average order value and segment the change. Check returns, cancellations, and timing before concluding.',
    followUp: 'How would you distinguish a sustainable mix change from a one-off event?'
  },
  {
    id: 'da-sql-funnel-dedup', category: 'SQL', title: 'Build a funnel with repeated events',
    prompt: 'An event table can contain many visits and purchases per user. How would you calculate unique-user conversion for each funnel step?',
    answer: 'Define the funnel order and time window first. Reduce each user to whether they reached each step (and, if required, the first timestamp for each step), then count distinct users by stage. Check that later stages occur after earlier stages and use the same eligible-user denominator throughout.',
    followUp: 'How would the result change if users can enter the funnel at different steps?'
  },
  {
    id: 'da-sql-dates', category: 'SQL', title: 'Handle date ranges and time zones',
    prompt: 'A daily report is missing late-night events and sometimes double-counts events near midnight. What would you check?',
    answer: 'Confirm the timestamp time zone, convert events to the agreed reporting zone before deriving the date, and use a half-open filter (start inclusive, next-day start exclusive). Check timestamp precision, daylight-saving transitions, and whether the source stores UTC or local time.',
    followUp: 'Why can a filter using BETWEEN on two dates miss timestamp values on the end date?'
  },
  {
    id: 'da-sql-reconciliation', category: 'SQL', title: 'Reconcile a query to a trusted total',
    prompt: 'Your query returns revenue that differs from the finance dashboard. How do you find the cause?',
    answer: 'Align metric definitions and date boundaries first, then compare at a small shared grain such as day and region. Check cancelled orders, refunds, currency, duplicate keys, join cardinality, NULL handling, and refresh times. Reconcile each transformation step and document the agreed definition.',
    followUp: 'What would you do if finance and product intentionally use different revenue definitions?'
  },
  {
    id: 'da-excel-powerquery', category: 'Excel', title: 'Choose Power Query or worksheet formulas',
    prompt: 'A weekly report requires combining and cleaning several files. Would you use formulas or Power Query?',
    answer: 'Use Power Query for repeatable import, append, merge, type conversion, and cleanup steps, then refresh when new files arrive. Use worksheet formulas for transparent calculations or interactive analysis on the prepared data. Keep raw inputs unchanged and validate row counts and totals after refresh.',
    followUp: 'How would you handle a new column appearing in one weekly file?'
  },
  {
    id: 'da-excel-errors', category: 'Excel', title: 'Debug a spreadsheet total that looks wrong',
    prompt: 'A SUMIFS total is lower than expected. What checks would you make before changing the formula?',
    answer: 'Check that amount cells are numeric, dates are real dates, criteria match hidden spaces or inconsistent labels, and all criteria ranges have the same shape. Test the date boundaries with a few known rows, look for duplicate or missing records, and compare the filtered row count with the total.',
    followUp: 'When can wrapping the formula in IFERROR hide a data problem?'
  },
  {
    id: 'da-stats-confidence', category: 'Statistics', title: 'Explain a confidence interval',
    prompt: 'A conversion estimate is 8% with a 95% confidence interval from 7% to 9%. How would you explain it?',
    answer: 'Describe 8% as the sample estimate and 7–9% as a range of values reasonably compatible with the data under the method’s assumptions. In repeated comparable studies, 95% of intervals constructed this way would contain the true parameter. The interval does not mean there is a 95% probability this specific fixed parameter lies inside it.',
    followUp: 'What happens to the interval width when the sample size increases?'
  },
  {
    id: 'da-stats-sampling', category: 'Statistics', title: 'Spot selection bias in a survey',
    prompt: 'A customer survey reports very high satisfaction, but response rates are low. How would you assess whether it is representative?',
    answer: 'Compare respondents with the full customer population on available traits such as tenure, region, channel, and activity. Check who was invited, who responded, and whether response differs across groups. Weighting may help observed imbalances, but it cannot fix unmeasured differences; report limitations and consider follow-up sampling.',
    followUp: 'Why does a larger sample not automatically remove selection bias?'
  },
  {
    id: 'da-powerbi-relationships', category: 'Power BI', title: 'Diagnose an ambiguous relationship',
    prompt: 'A Power BI model has several many-to-many relationships and totals change when a slicer is used. What would you inspect?',
    answer: 'Confirm the grain and uniqueness of each key, then prefer dimension tables with unique keys and one-to-many relationships to facts. Inspect filter direction, inactive relationships, duplicate dimension keys, and measures that depend on ambiguous paths. Verify totals at row, category, and grand-total levels.',
    followUp: 'When is a bridge table a better option than a direct many-to-many relationship?'
  },
  {
    id: 'da-powerbi-time', category: 'Power BI', title: 'Make time comparisons reliable',
    prompt: 'A year-over-year Power BI measure returns unexpected values for the current month. What would you validate?',
    answer: 'Use a complete, unique Date table marked as the date table and relate it to the fact date. Confirm the measure’s filter context, whether the current month is partial, and how missing dates are handled. Compare the result to a small table of dates and base values before trusting a visual.',
    followUp: 'How would you distinguish year-to-date from same-period-last-year comparisons?'
  },
  {
    id: 'da-python-outliers', category: 'Python / Pandas', title: 'Investigate extreme values',
    prompt: 'A few unusually large order values dominate your summary. How would you handle them in Pandas?',
    answer: 'Check source records, units, duplicates, and business rules before labeling values as errors. Compare distributions and robust statistics, retain valid high-value orders, and use a documented correction or exclusion rule only when evidence supports it. Show how the conclusion changes with and without influential values.',
    followUp: 'Why is automatically removing every value beyond three standard deviations risky?'
  },
  {
    id: 'da-python-validation', category: 'Python / Pandas', title: 'Make an analysis reproducible',
    prompt: 'A notebook produces a report that another analyst cannot reproduce. What would you improve?',
    answer: 'Make inputs and date ranges explicit, pin or record dependencies, keep transformations in a clear order, and avoid hidden state from out-of-order notebook execution. Add assertions for expected columns, key uniqueness, row counts, null rates, and reconciled totals. Save the output and document assumptions.',
    followUp: 'Which checks should stop the report from being published?'
  },
  {
    id: 'da-case-prioritize', category: 'Business case', title: 'Prioritize competing stakeholder requests',
    prompt: 'Two teams need urgent analysis, but you can only complete one today. How would you decide what to do first?',
    answer: 'Clarify the decision and deadline for each request, expected impact, risk of delay, dependencies, and effort. Agree on priority with the stakeholders or manager, communicate what can be delivered now, and offer a smaller interim answer if it is reliable. Record the trade-off and next delivery time.',
    followUp: 'What would you do if both requests are tied to a critical business decision?'
  },
  {
    id: 'da-project', category: 'Project discussion', title: 'Present an analytics project clearly',
    prompt: 'Give a concise structure for explaining an analytics project you personally completed.',
    answer: 'State the business problem and who needed the answer; describe the data and its quality limits; explain your method and why you chose it; share the result and its measurable impact; then explain what you owned, what you would improve, and how the work was validated. Be precise about your contribution.',
    followUp: 'What would you do if you cannot share the original company data?'
  }
];
