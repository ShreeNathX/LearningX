export const analystSqlAdvancedQuestions = [
  {
    id: 'da-sql-10', title: 'Customer Count by Segment', track: 'sql', analystPrep: true,
    difficulty: 'Easy', topic: 'Aggregation',
    description: 'Report the number of customers in each segment. Include segments with zero customers and return segment and customer_count ordered by segment.',
    schemaSql: "CREATE TABLE Segments (segment TEXT); CREATE TABLE Customers (customer_id INT, segment TEXT); INSERT INTO Segments VALUES ('Consumer'),('Business'),('Home Office'); INSERT INTO Customers VALUES (1,'Consumer'),(2,'Business'),(3,'Consumer');",
    schemaDescription: [{ table: 'Segments', columns: ['segment TEXT'] }, { table: 'Customers', columns: ['customer_id INT', 'segment TEXT'] }],
    starterCode: '-- Include segments that currently have no customers\n',
    expectedQuery: 'SELECT s.segment, COUNT(c.customer_id) AS customer_count FROM Segments s LEFT JOIN Customers c ON s.segment = c.segment GROUP BY s.segment ORDER BY s.segment;',
    solution: 'SELECT s.segment, COUNT(c.customer_id) AS customer_count FROM Segments s LEFT JOIN Customers c ON s.segment = c.segment GROUP BY s.segment ORDER BY s.segment;',
    hints: ['Start from the complete Segments table and LEFT JOIN customers.', 'Count a non-null customer key so empty segments return zero.'],
    examples: [
      { input: 'Run against the supplied segments and customers.', output: 'segment | customer_count\nBusiness | 1\nConsumer | 2\nHome Office | 0' },
      { input: 'Why not use COUNT(*) for the empty segment?', output: 'A LEFT JOIN still produces one row for the segment; COUNT(*) would return 1.' }
    ]
  },
  {
    id: 'da-sql-11', title: 'Orders and Revenue by Region', track: 'sql', analystPrep: true,
    difficulty: 'Easy', topic: 'Aggregation',
    description: 'For each region, report distinct order count and total revenue. Exclude cancelled orders and order by revenue descending.',
    schemaSql: "CREATE TABLE Orders (order_id INT, region TEXT, amount REAL, status TEXT); INSERT INTO Orders VALUES (1,'North',100,'complete'),(2,'South',80,'complete'),(3,'North',50,'cancelled'),(4,'South',120,'complete'),(5,'East',30,'complete');",
    schemaDescription: [{ table: 'Orders', columns: ['order_id INT', 'region TEXT', 'amount REAL', 'status TEXT'] }],
    starterCode: '-- Filter first, then aggregate by region\n',
    expectedQuery: "SELECT region, COUNT(DISTINCT order_id) AS order_count, SUM(amount) AS revenue FROM Orders WHERE status = 'complete' GROUP BY region ORDER BY revenue DESC;",
    solution: "SELECT region, COUNT(DISTINCT order_id) AS order_count, SUM(amount) AS revenue FROM Orders WHERE status = 'complete' GROUP BY region ORDER BY revenue DESC;",
    hints: ['Exclude cancelled orders before aggregation.', 'Count distinct order IDs if the source may contain duplicate order rows.'],
    examples: [
      { input: 'Run against the supplied orders.', output: 'region | order_count | revenue\nSouth | 2 | 200.0\nNorth | 1 | 100.0\nEast | 1 | 30.0' },
      { input: 'Should the cancelled North order contribute to either metric?', output: 'No. It is filtered out before grouping.' }
    ]
  },
  {
    id: 'da-sql-12', title: 'Conversion Rate by Acquisition Channel', track: 'sql', analystPrep: true,
    difficulty: 'Medium', topic: 'Aggregation',
    description: 'For each channel, calculate the percentage of users who purchased out of users who visited. Count distinct users and return channel, visitors, purchasers, and conversion_pct.',
    schemaSql: "CREATE TABLE Events (user_id INT, channel TEXT, event_name TEXT); INSERT INTO Events VALUES (1,'Search','visit'),(1,'Search','purchase'),(2,'Search','visit'),(3,'Social','visit'),(3,'Social','purchase'),(4,'Social','visit'),(5,'Email','purchase');",
    schemaDescription: [{ table: 'Events', columns: ['user_id INT', 'channel TEXT', 'event_name TEXT'] }],
    starterCode: '-- Aggregate distinct visitors and purchasers by channel\n',
    expectedQuery: "SELECT channel, COUNT(DISTINCT CASE WHEN event_name = 'visit' THEN user_id END) AS visitors, COUNT(DISTINCT CASE WHEN event_name = 'purchase' THEN user_id END) AS purchasers, ROUND(100.0 * COUNT(DISTINCT CASE WHEN event_name = 'purchase' THEN user_id END) / NULLIF(COUNT(DISTINCT CASE WHEN event_name = 'visit' THEN user_id END), 0), 2) AS conversion_pct FROM Events GROUP BY channel HAVING COUNT(DISTINCT CASE WHEN event_name = 'visit' THEN user_id END) > 0 ORDER BY channel;",
    solution: "SELECT channel, COUNT(DISTINCT CASE WHEN event_name = 'visit' THEN user_id END) AS visitors, COUNT(DISTINCT CASE WHEN event_name = 'purchase' THEN user_id END) AS purchasers, ROUND(100.0 * COUNT(DISTINCT CASE WHEN event_name = 'purchase' THEN user_id END) / NULLIF(COUNT(DISTINCT CASE WHEN event_name = 'visit' THEN user_id END), 0), 2) AS conversion_pct FROM Events GROUP BY channel HAVING COUNT(DISTINCT CASE WHEN event_name = 'visit' THEN user_id END) > 0 ORDER BY channel;",
    hints: ['Count distinct users for each event type conditionally.', 'Exclude channels with no visitors so the denominator is defined.'],
    examples: [
      { input: 'Run against the supplied channel events.', output: 'channel | visitors | purchasers | conversion_pct\nSearch | 2 | 1 | 50.0\nSocial | 2 | 1 | 50.0' },
      { input: 'Should Email appear when it has a purchase but no visit?', output: 'No. The question defines conversion among visitors.' }
    ]
  },
  {
    id: 'da-sql-13', title: 'Profit Margin by Product Category', track: 'sql', analystPrep: true,
    difficulty: 'Medium', topic: 'Aggregation',
    description: 'Calculate profit margin percentage by category using (revenue - cost) / revenue. Return category, revenue, cost, and margin_pct rounded to two decimals. Avoid division by zero.',
    schemaSql: "CREATE TABLE Products (product_id INT, category TEXT); CREATE TABLE Sales (product_id INT, quantity INT, unit_price REAL, unit_cost REAL); INSERT INTO Products VALUES (1,'Hardware'),(2,'Software'),(3,'Hardware'); INSERT INTO Sales VALUES (1,2,50,30),(2,1,100,20),(3,1,40,25);",
    schemaDescription: [{ table: 'Products', columns: ['product_id INT', 'category TEXT'] }, { table: 'Sales', columns: ['product_id INT', 'quantity INT', 'unit_price REAL', 'unit_cost REAL'] }],
    starterCode: '-- Aggregate revenue and cost before calculating the margin\n',
    expectedQuery: 'WITH totals AS (SELECT p.category, SUM(s.quantity * s.unit_price) AS revenue, SUM(s.quantity * s.unit_cost) AS cost FROM Products p JOIN Sales s ON p.product_id = s.product_id GROUP BY p.category) SELECT category, revenue, cost, ROUND(100.0 * (revenue - cost) / NULLIF(revenue, 0), 2) AS margin_pct FROM totals ORDER BY category;',
    solution: 'WITH totals AS (SELECT p.category, SUM(s.quantity * s.unit_price) AS revenue, SUM(s.quantity * s.unit_cost) AS cost FROM Products p JOIN Sales s ON p.product_id = s.product_id GROUP BY p.category) SELECT category, revenue, cost, ROUND(100.0 * (revenue - cost) / NULLIF(revenue, 0), 2) AS margin_pct FROM totals ORDER BY category;',
    hints: ['Calculate both revenue and cost at the same grain.', 'Use NULLIF on revenue to protect against zero.'],
    examples: [
      { input: 'Run against the supplied products and sales.', output: 'category | revenue | cost | margin_pct\nHardware | 140.0 | 85.0 | 39.29\nSoftware | 100.0 | 20.0 | 80.0' },
      { input: 'Why multiply by 100.0?', output: 'It returns the margin as a percentage and avoids integer division.' }
    ]
  },
  {
    id: 'da-sql-14', title: 'Monthly Customer Cohort Retention', track: 'sql', analystPrep: true,
    difficulty: 'Hard', topic: 'CTEs & Advanced SQL',
    description: 'Group customers by the month of their first order. For each cohort and activity month, report cohort_size, active_customers, and retention_pct. A customer is active in a month with at least one order.',
    schemaSql: "CREATE TABLE Orders (customer_id INT, order_date TEXT); INSERT INTO Orders VALUES (1,'2025-01-02'),(1,'2025-02-04'),(1,'2025-02-10'),(2,'2025-01-20'),(3,'2025-02-01'),(3,'2025-03-12');",
    schemaDescription: [{ table: 'Orders', columns: ['customer_id INT', 'order_date TEXT'] }],
    starterCode: '-- Build first-order cohorts, then count active customers by month\n',
    expectedQuery: "WITH customer_months AS (SELECT DISTINCT customer_id, strftime('%Y-%m', order_date) AS activity_month FROM Orders), first_month AS (SELECT customer_id, MIN(activity_month) AS cohort_month FROM customer_months GROUP BY customer_id), cohort_size AS (SELECT cohort_month, COUNT(*) AS cohort_size FROM first_month GROUP BY cohort_month), cohort_activity AS (SELECT f.cohort_month, m.activity_month, COUNT(DISTINCT m.customer_id) AS active_customers FROM first_month f JOIN customer_months m ON f.customer_id = m.customer_id GROUP BY f.cohort_month, m.activity_month) SELECT a.cohort_month, a.activity_month, s.cohort_size, a.active_customers, ROUND(100.0 * a.active_customers / s.cohort_size, 2) AS retention_pct FROM cohort_activity a JOIN cohort_size s ON a.cohort_month = s.cohort_month ORDER BY a.cohort_month, a.activity_month;",
    solution: "WITH customer_months AS (SELECT DISTINCT customer_id, strftime('%Y-%m', order_date) AS activity_month FROM Orders), first_month AS (SELECT customer_id, MIN(activity_month) AS cohort_month FROM customer_months GROUP BY customer_id), cohort_size AS (SELECT cohort_month, COUNT(*) AS cohort_size FROM first_month GROUP BY cohort_month), cohort_activity AS (SELECT f.cohort_month, m.activity_month, COUNT(DISTINCT m.customer_id) AS active_customers FROM first_month f JOIN customer_months m ON f.customer_id = m.customer_id GROUP BY f.cohort_month, m.activity_month) SELECT a.cohort_month, a.activity_month, s.cohort_size, a.active_customers, ROUND(100.0 * a.active_customers / s.cohort_size, 2) AS retention_pct FROM cohort_activity a JOIN cohort_size s ON a.cohort_month = s.cohort_month ORDER BY a.cohort_month, a.activity_month;",
    hints: ['Deduplicate customers to one row per active month.', 'Find each customer’s first active month, then join their monthly activity back to that cohort.', 'Divide active customers by the original cohort size.'],
    examples: [
      { input: 'Run against the supplied order history.', output: 'cohort_month | activity_month | cohort_size | active_customers | retention_pct\n2025-01 | 2025-01 | 2 | 2 | 100.0\n2025-01 | 2025-02 | 2 | 1 | 50.0\n2025-02 | 2025-02 | 1 | 1 | 100.0\n2025-02 | 2025-03 | 1 | 1 | 100.0' },
      { input: 'Does a second order by the same customer in one month count twice?', output: 'No. Each customer counts once per active month.' }
    ]
  },
  {
    id: 'da-sql-15', title: 'Sessionize User Events', track: 'sql', analystPrep: true,
    difficulty: 'Hard', topic: 'CTEs & Advanced SQL',
    description: 'Create a new session when a user has more than 30 minutes between consecutive events. Return user_id, session_number, session_start, session_end, and event_count ordered by user and session.',
    schemaSql: "CREATE TABLE Events (user_id INT, event_time TEXT); INSERT INTO Events VALUES (1,'2025-01-01 09:00:00'),(1,'2025-01-01 09:20:00'),(1,'2025-01-01 10:00:00'),(1,'2025-01-01 10:25:00'),(2,'2025-01-01 11:00:00');",
    schemaDescription: [{ table: 'Events', columns: ['user_id INT', 'event_time TEXT'] }],
    starterCode: '-- Use LAG to find gaps, then a cumulative sum to number sessions\n',
    expectedQuery: "WITH previous_events AS (SELECT user_id, event_time, LAG(event_time) OVER (PARTITION BY user_id ORDER BY event_time) AS previous_time FROM Events), boundaries AS (SELECT user_id, event_time, CASE WHEN previous_time IS NULL OR strftime('%s', event_time) - strftime('%s', previous_time) > 1800 THEN 1 ELSE 0 END AS new_session FROM previous_events), numbered AS (SELECT user_id, event_time, SUM(new_session) OVER (PARTITION BY user_id ORDER BY event_time ROWS UNBOUNDED PRECEDING) AS session_number FROM boundaries) SELECT user_id, session_number, MIN(event_time) AS session_start, MAX(event_time) AS session_end, COUNT(*) AS event_count FROM numbered GROUP BY user_id, session_number ORDER BY user_id, session_number;",
    solution: "WITH previous_events AS (SELECT user_id, event_time, LAG(event_time) OVER (PARTITION BY user_id ORDER BY event_time) AS previous_time FROM Events), boundaries AS (SELECT user_id, event_time, CASE WHEN previous_time IS NULL OR strftime('%s', event_time) - strftime('%s', previous_time) > 1800 THEN 1 ELSE 0 END AS new_session FROM previous_events), numbered AS (SELECT user_id, event_time, SUM(new_session) OVER (PARTITION BY user_id ORDER BY event_time ROWS UNBOUNDED PRECEDING) AS session_number FROM boundaries) SELECT user_id, session_number, MIN(event_time) AS session_start, MAX(event_time) AS session_end, COUNT(*) AS event_count FROM numbered GROUP BY user_id, session_number ORDER BY user_id, session_number;",
    hints: ['Compare each event with the previous event for that user using LAG.', 'Flag the first event and every gap greater than 1800 seconds.', 'A running sum of the flags gives the session number.'],
    examples: [
      { input: 'Run against the supplied timestamps.', output: 'user_id | session_number | session_start | session_end | event_count\n1 | 1 | 2025-01-01 09:00:00 | 2025-01-01 09:20:00 | 2\n1 | 2 | 2025-01-01 10:00:00 | 2025-01-01 10:25:00 | 2\n2 | 1 | 2025-01-01 11:00:00 | 2025-01-01 11:00:00 | 1' },
      { input: 'If the gap is exactly 30 minutes, does a new session start?', output: 'No. The rule starts a new session only when the gap is greater than 30 minutes.' }
    ]
  },
  {
    id: 'da-sql-16', title: 'Seven-Day Rolling Revenue with Missing Dates', track: 'sql', analystPrep: true,
    difficulty: 'Hard', topic: 'CTEs & Advanced SQL',
    description: 'Return each date with a complete seven-calendar-day window, including dates with no sales as zero. Show revenue_7d and average_daily_revenue rounded to two decimals.',
    schemaSql: "CREATE TABLE Sales (sale_date TEXT, revenue REAL); INSERT INTO Sales VALUES ('2025-01-01',100),('2025-01-02',110),('2025-01-04',130),('2025-01-05',110),('2025-01-06',140),('2025-01-07',150),('2025-01-09',80);",
    schemaDescription: [{ table: 'Sales', columns: ['sale_date TEXT', 'revenue REAL'] }],
    starterCode: '-- Generate a calendar, fill missing days with zero, then use a 7-row window\n',
    expectedQuery: "WITH RECURSIVE calendar(day) AS (SELECT MIN(sale_date) FROM Sales UNION ALL SELECT date(day, '+1 day') FROM calendar WHERE day < (SELECT MAX(sale_date) FROM Sales)), daily AS (SELECT c.day, COALESCE(SUM(s.revenue), 0) AS revenue FROM calendar c LEFT JOIN Sales s ON c.day = s.sale_date GROUP BY c.day), rolling AS (SELECT day, SUM(revenue) OVER (ORDER BY day ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS revenue_7d, ROUND(AVG(revenue) OVER (ORDER BY day ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 2) AS average_daily_revenue, ROW_NUMBER() OVER (ORDER BY day) AS day_number FROM daily) SELECT day, revenue_7d, average_daily_revenue FROM rolling WHERE day_number >= 7 ORDER BY day;",
    solution: "WITH RECURSIVE calendar(day) AS (SELECT MIN(sale_date) FROM Sales UNION ALL SELECT date(day, '+1 day') FROM calendar WHERE day < (SELECT MAX(sale_date) FROM Sales)), daily AS (SELECT c.day, COALESCE(SUM(s.revenue), 0) AS revenue FROM calendar c LEFT JOIN Sales s ON c.day = s.sale_date GROUP BY c.day), rolling AS (SELECT day, SUM(revenue) OVER (ORDER BY day ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS revenue_7d, ROUND(AVG(revenue) OVER (ORDER BY day ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 2) AS average_daily_revenue, ROW_NUMBER() OVER (ORDER BY day) AS day_number FROM daily) SELECT day, revenue_7d, average_daily_revenue FROM rolling WHERE day_number >= 7 ORDER BY day;",
    hints: ['Create one row per calendar date with a recursive CTE.', 'Left join sales to the calendar and replace missing revenue with zero.', 'Use a seven-row window only after the calendar is dense.'],
    examples: [
      { input: 'Run against the supplied sales dates.', output: 'day | revenue_7d | average_daily_revenue\n2025-01-07 | 740.0 | 105.71\n2025-01-08 | 640.0 | 91.43\n2025-01-09 | 610.0 | 87.14' },
      { input: 'Why generate missing dates before applying ROWS BETWEEN 6 PRECEDING?', output: 'Without a dense calendar, the window counts seven sale rows rather than seven calendar days.' }
    ]
  }
];
