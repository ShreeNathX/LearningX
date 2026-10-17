export const analystSqlQuestions = [
  {
    id: 'da-sql-01', title: 'Monthly Revenue by Region', track: 'sql', analystPrep: true,
    difficulty: 'Easy', topic: 'Aggregation',
    description: 'For each month and region, report total order revenue. Return month as YYYY-MM, region, and revenue, ordered by month then region.',
    schemaSql: "CREATE TABLE Orders (order_id INT, region TEXT, order_date TEXT, amount REAL); INSERT INTO Orders VALUES (1,'West','2025-01-03',120),(2,'East','2025-01-18',80),(3,'West','2025-02-02',50),(4,'East','2025-02-20',220),(5,'West','2025-02-27',30);",
    schemaDescription: [{ table: 'Orders', columns: ['order_id INT', 'region TEXT', 'order_date TEXT', 'amount REAL'] }],
    starterCode: '-- Write a query for monthly revenue by region\n',
    expectedQuery: "SELECT strftime('%Y-%m', order_date) AS month, region, ROUND(SUM(amount), 2) AS revenue FROM Orders GROUP BY month, region ORDER BY month, region;",
    solution: "SELECT strftime('%Y-%m', order_date) AS month, region, ROUND(SUM(amount), 2) AS revenue FROM Orders GROUP BY month, region ORDER BY month, region;",
    hints: ['Group by both the calendar month and region.', 'Use strftime to extract YYYY-MM from the ISO date.'],
    examples: [
      { input: 'Run against the supplied orders.', output: 'month | region | revenue\n2025-01 | East | 80.0\n2025-01 | West | 120.0\n2025-02 | East | 220.0\n2025-02 | West | 80.0' },
      { input: 'If West has no orders in March, should it appear?', output: 'No. This result includes only month-region pairs present in Orders.' }
    ]
  },
  {
    id: 'da-sql-02', title: 'Month-over-Month Revenue Change', track: 'sql', analystPrep: true,
    difficulty: 'Medium', topic: 'Window Functions',
    description: 'Calculate monthly revenue and percentage change from the previous month. Return month, revenue, and change_pct rounded to two decimals. The first month has no previous month, so its change is NULL.',
    schemaSql: "CREATE TABLE Sales (sale_date TEXT, revenue REAL); INSERT INTO Sales VALUES ('2025-01-02',100),('2025-01-20',50),('2025-02-04',180),('2025-03-11',150);",
    schemaDescription: [{ table: 'Sales', columns: ['sale_date TEXT', 'revenue REAL'] }],
    starterCode: '-- Aggregate by month, then compare with the previous month\n',
    expectedQuery: "WITH monthly AS (SELECT strftime('%Y-%m', sale_date) AS month, SUM(revenue) AS revenue FROM Sales GROUP BY month), compared AS (SELECT month, revenue, LAG(revenue) OVER (ORDER BY month) AS prior_revenue FROM monthly) SELECT month, revenue, ROUND((revenue - prior_revenue) * 100.0 / NULLIF(prior_revenue, 0), 2) AS change_pct FROM compared ORDER BY month;",
    solution: "WITH monthly AS (SELECT strftime('%Y-%m', sale_date) AS month, SUM(revenue) AS revenue FROM Sales GROUP BY month), compared AS (SELECT month, revenue, LAG(revenue) OVER (ORDER BY month) AS prior_revenue FROM monthly) SELECT month, revenue, ROUND((revenue - prior_revenue) * 100.0 / NULLIF(prior_revenue, 0), 2) AS change_pct FROM compared ORDER BY month;",
    hints: ['Aggregate sales to one row per month before using LAG.', 'Use NULLIF to avoid division by zero.'],
    examples: [
      { input: 'Run against the supplied monthly sales.', output: 'month | revenue | change_pct\n2025-01 | 150.0 | NULL\n2025-02 | 180.0 | 20.0\n2025-03 | 150.0 | -16.67' },
      { input: 'If February revenue equals January revenue, what is change_pct?', output: '0.0' }
    ]
  },
  {
    id: 'da-sql-03', title: 'Top Products by Category', track: 'sql', analystPrep: true,
    difficulty: 'Medium', topic: 'Window Functions',
    description: 'Return the top two products by sales revenue within each category. Include ties at rank two. Return category, product, revenue, and sales_rank.',
    schemaSql: "CREATE TABLE Products (product_id INT, product TEXT, category TEXT); CREATE TABLE OrderItems (product_id INT, quantity INT, unit_price REAL); INSERT INTO Products VALUES (1,'Tea','Grocery'),(2,'Coffee','Grocery'),(3,'Rice','Grocery'),(4,'Mug','Home'); INSERT INTO OrderItems VALUES (1,10,3),(2,5,5),(3,4,5),(4,8,4),(1,2,3);",
    schemaDescription: [{ table: 'Products', columns: ['product_id INT', 'product TEXT', 'category TEXT'] }, { table: 'OrderItems', columns: ['product_id INT', 'quantity INT', 'unit_price REAL'] }],
    starterCode: '-- Aggregate product revenue and rank within category\n',
    expectedQuery: "WITH product_sales AS (SELECT p.category, p.product, SUM(i.quantity * i.unit_price) AS revenue FROM Products p JOIN OrderItems i ON p.product_id = i.product_id GROUP BY p.category, p.product), ranked AS (SELECT category, product, revenue, DENSE_RANK() OVER (PARTITION BY category ORDER BY revenue DESC) AS sales_rank FROM product_sales) SELECT category, product, revenue, sales_rank FROM ranked WHERE sales_rank <= 2 ORDER BY category, sales_rank, product;",
    solution: "WITH product_sales AS (SELECT p.category, p.product, SUM(i.quantity * i.unit_price) AS revenue FROM Products p JOIN OrderItems i ON p.product_id = i.product_id GROUP BY p.category, p.product), ranked AS (SELECT category, product, revenue, DENSE_RANK() OVER (PARTITION BY category ORDER BY revenue DESC) AS sales_rank FROM product_sales) SELECT category, product, revenue, sales_rank FROM ranked WHERE sales_rank <= 2 ORDER BY category, sales_rank, product;",
    hints: ['Calculate revenue at product grain first.', 'Use DENSE_RANK partitioned by category to preserve ties.'],
    examples: [
      { input: 'Run against the supplied product and order item rows.', output: 'category | product | revenue | sales_rank\nGrocery | Tea | 36.0 | 1\nGrocery | Coffee | 25.0 | 2\nHome | Mug | 32.0 | 1' },
      { input: 'If two products tie for second, should both be returned?', output: 'Yes. DENSE_RANK assigns both products rank 2.' }
    ]
  },
  {
    id: 'da-sql-04', title: 'Repeat Purchase Rate', track: 'sql', analystPrep: true,
    difficulty: 'Medium', topic: 'Aggregation',
    description: 'Find the percentage of customers who placed more than one distinct order. Return one column named repeat_purchase_pct rounded to two decimals.',
    schemaSql: "CREATE TABLE Orders (order_id INT, customer_id INT); INSERT INTO Orders VALUES (1,10),(2,10),(3,20),(4,30),(5,30),(6,30),(7,40);",
    schemaDescription: [{ table: 'Orders', columns: ['order_id INT', 'customer_id INT'] }],
    starterCode: '-- Count repeat customers and divide by all customers\n',
    expectedQuery: 'WITH customer_orders AS (SELECT customer_id, COUNT(DISTINCT order_id) AS order_count FROM Orders GROUP BY customer_id) SELECT ROUND(100.0 * SUM(CASE WHEN order_count > 1 THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 2) AS repeat_purchase_pct FROM customer_orders;',
    solution: 'WITH customer_orders AS (SELECT customer_id, COUNT(DISTINCT order_id) AS order_count FROM Orders GROUP BY customer_id) SELECT ROUND(100.0 * SUM(CASE WHEN order_count > 1 THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 2) AS repeat_purchase_pct FROM customer_orders;',
    hints: ['First count distinct orders per customer.', 'Use conditional aggregation and multiply by 100.0 for a percentage.'],
    examples: [
      { input: 'Run against the supplied orders.', output: 'repeat_purchase_pct\n50.0' },
      { input: 'If there are no orders, what should happen?', output: 'Return NULL because the rate has no denominator.' }
    ]
  },
  {
    id: 'da-sql-05', title: 'Average Order Value by Customer Segment', track: 'sql', analystPrep: true,
    difficulty: 'Easy', topic: 'Joins & Subqueries',
    description: 'Calculate average order value by customer segment. An order can have multiple line items. Return segment and average_order_value rounded to two decimals.',
    schemaSql: "CREATE TABLE Customers (customer_id INT, segment TEXT); CREATE TABLE OrderItems (order_id INT, customer_id INT, quantity INT, unit_price REAL); INSERT INTO Customers VALUES (1,'Consumer'),(2,'Business'),(3,'Consumer'); INSERT INTO OrderItems VALUES (101,1,2,10),(101,1,1,5),(102,2,1,40),(103,3,1,20);",
    schemaDescription: [{ table: 'Customers', columns: ['customer_id INT', 'segment TEXT'] }, { table: 'OrderItems', columns: ['order_id INT', 'customer_id INT', 'quantity INT', 'unit_price REAL'] }],
    starterCode: '-- Calculate each order total before averaging by segment\n',
    expectedQuery: 'WITH order_totals AS (SELECT order_id, customer_id, SUM(quantity * unit_price) AS order_value FROM OrderItems GROUP BY order_id, customer_id) SELECT c.segment, ROUND(AVG(o.order_value), 2) AS average_order_value FROM order_totals o JOIN Customers c ON o.customer_id = c.customer_id GROUP BY c.segment ORDER BY c.segment;',
    solution: 'WITH order_totals AS (SELECT order_id, customer_id, SUM(quantity * unit_price) AS order_value FROM OrderItems GROUP BY order_id, customer_id) SELECT c.segment, ROUND(AVG(o.order_value), 2) AS average_order_value FROM order_totals o JOIN Customers c ON o.customer_id = c.customer_id GROUP BY c.segment ORDER BY c.segment;',
    hints: ['The grain for the average is one order, not one line item.', 'Aggregate line items into order totals before joining to customer segments.'],
    examples: [
      { input: 'Run against the supplied customers and line items.', output: 'segment | average_order_value\nBusiness | 40.0\nConsumer | 22.5' },
      { input: 'Why should line items be grouped before calculating the average?', output: 'Otherwise multi-item orders would be counted multiple times and skew the average.' }
    ]
  },
  {
    id: 'da-sql-06', title: 'Signup-to-Purchase Funnel', track: 'sql', analystPrep: true,
    difficulty: 'Medium', topic: 'Aggregation',
    description: 'For each event stage, count distinct users and calculate conversion from the previous stage. Stages are visit, signup, purchase. Return stage, users, and conversion_pct in funnel order.',
    schemaSql: "CREATE TABLE Events (user_id INT, event_name TEXT); INSERT INTO Events VALUES (1,'visit'),(1,'signup'),(1,'purchase'),(2,'visit'),(2,'signup'),(3,'visit'),(4,'visit'),(4,'signup'),(4,'purchase'),(5,'signup');",
    schemaDescription: [{ table: 'Events', columns: ['user_id INT', 'event_name TEXT'] }],
    starterCode: '-- Count distinct users at each stage and calculate step conversion\n',
    expectedQuery: "WITH stage_counts AS (SELECT COUNT(DISTINCT CASE WHEN event_name = 'visit' THEN user_id END) AS visits, COUNT(DISTINCT CASE WHEN event_name = 'signup' THEN user_id END) AS signups, COUNT(DISTINCT CASE WHEN event_name = 'purchase' THEN user_id END) AS purchases FROM Events) SELECT 'visit' AS stage, visits AS users, 100.0 AS conversion_pct FROM stage_counts UNION ALL SELECT 'signup', signups, ROUND(100.0 * signups / NULLIF(visits, 0), 2) FROM stage_counts UNION ALL SELECT 'purchase', purchases, ROUND(100.0 * purchases / NULLIF(signups, 0), 2) FROM stage_counts;",
    solution: "WITH stage_counts AS (SELECT COUNT(DISTINCT CASE WHEN event_name = 'visit' THEN user_id END) AS visits, COUNT(DISTINCT CASE WHEN event_name = 'signup' THEN user_id END) AS signups, COUNT(DISTINCT CASE WHEN event_name = 'purchase' THEN user_id END) AS purchases FROM Events) SELECT 'visit' AS stage, visits AS users, 100.0 AS conversion_pct FROM stage_counts UNION ALL SELECT 'signup', signups, ROUND(100.0 * signups / NULLIF(visits, 0), 2) FROM stage_counts UNION ALL SELECT 'purchase', purchases, ROUND(100.0 * purchases / NULLIF(signups, 0), 2) FROM stage_counts;",
    hints: ['Count distinct users because a user may trigger an event more than once.', 'Use conditional COUNT or CASE expressions to produce each stage count.'],
    examples: [
      { input: 'Run against the supplied event rows.', output: 'stage | users | conversion_pct\nvisit | 4 | 100.0\nsignup | 4 | 100.0\npurchase | 2 | 50.0' },
      { input: 'Why can signups exceed visits in this sample?', output: 'The sample includes a signup without a visit event; call out instrumentation or definition issues before interpreting the funnel.' }
    ]
  },
  {
    id: 'da-sql-07', title: 'Monthly Active Users', track: 'sql', analystPrep: true,
    difficulty: 'Easy', topic: 'Aggregation',
    description: 'Count distinct active users per calendar month. Return month as YYYY-MM and active_users in ascending month order.',
    schemaSql: "CREATE TABLE Activity (user_id INT, activity_date TEXT); INSERT INTO Activity VALUES (1,'2025-01-02'),(1,'2025-01-18'),(2,'2025-01-20'),(2,'2025-02-01'),(3,'2025-02-10');",
    schemaDescription: [{ table: 'Activity', columns: ['user_id INT', 'activity_date TEXT'] }],
    starterCode: '-- Count unique active users in each month\n',
    expectedQuery: "SELECT strftime('%Y-%m', activity_date) AS month, COUNT(DISTINCT user_id) AS active_users FROM Activity GROUP BY month ORDER BY month;",
    solution: "SELECT strftime('%Y-%m', activity_date) AS month, COUNT(DISTINCT user_id) AS active_users FROM Activity GROUP BY month ORDER BY month;",
    hints: ['Convert activity dates to a calendar month.', 'A user with multiple events in one month should count once.'],
    examples: [
      { input: 'Run against the supplied activity rows.', output: 'month | active_users\n2025-01 | 2\n2025-02 | 2' },
      { input: 'If user 1 has ten January events, how many times do they count?', output: 'Once for January.' }
    ]
  },
  {
    id: 'da-sql-08', title: 'Find Duplicate Transactions', track: 'sql', analystPrep: true,
    difficulty: 'Easy', topic: 'Aggregation',
    description: 'Find transaction references that appear more than once. Return reference, duplicate_count, ordered by reference.',
    schemaSql: "CREATE TABLE Transactions (transaction_id INT, reference TEXT, amount REAL); INSERT INTO Transactions VALUES (1,'A-100',25),(2,'A-101',40),(3,'A-100',25),(4,'A-102',10),(5,'A-101',40),(6,'A-101',40);",
    schemaDescription: [{ table: 'Transactions', columns: ['transaction_id INT', 'reference TEXT', 'amount REAL'] }],
    starterCode: '-- Group by reference and keep duplicates\n',
    expectedQuery: 'SELECT reference, COUNT(*) AS duplicate_count FROM Transactions GROUP BY reference HAVING COUNT(*) > 1 ORDER BY reference;',
    solution: 'SELECT reference, COUNT(*) AS duplicate_count FROM Transactions GROUP BY reference HAVING COUNT(*) > 1 ORDER BY reference;',
    hints: ['Group by the business reference, not the unique transaction row ID.', 'Use HAVING to filter grouped counts.'],
    examples: [
      { input: 'Run against the supplied transactions.', output: 'reference | duplicate_count\nA-100 | 2\nA-101 | 3' },
      { input: 'Should A-102 appear?', output: 'No. It occurs once.' }
    ]
  },
  {
    id: 'da-sql-09', title: 'First and Repeat Order Revenue', track: 'sql', analystPrep: true,
    difficulty: 'Medium', topic: 'Window Functions',
    description: 'Classify each customer order as First or Repeat by order date, then report order count and revenue by order type.',
    schemaSql: "CREATE TABLE Orders (order_id INT, customer_id INT, order_date TEXT, amount REAL); INSERT INTO Orders VALUES (1,10,'2025-01-01',30),(2,10,'2025-02-01',20),(3,20,'2025-01-03',50),(4,30,'2025-01-05',10),(5,30,'2025-03-01',40);",
    schemaDescription: [{ table: 'Orders', columns: ['order_id INT', 'customer_id INT', 'order_date TEXT', 'amount REAL'] }],
    starterCode: '-- Use ROW_NUMBER to classify each customer order\n',
    expectedQuery: "WITH classified AS (SELECT order_id, amount, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date, order_id) AS order_number FROM Orders) SELECT CASE WHEN order_number = 1 THEN 'First' ELSE 'Repeat' END AS order_type, COUNT(*) AS order_count, SUM(amount) AS revenue FROM classified GROUP BY order_type ORDER BY order_type;",
    solution: "WITH classified AS (SELECT order_id, amount, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date, order_id) AS order_number FROM Orders) SELECT CASE WHEN order_number = 1 THEN 'First' ELSE 'Repeat' END AS order_type, COUNT(*) AS order_count, SUM(amount) AS revenue FROM classified GROUP BY order_type ORDER BY order_type;",
    hints: ['Assign each customer’s orders a sequence number.', 'Use the order date and a stable tie-breaker to define the first order.'],
    examples: [
      { input: 'Run against the supplied orders.', output: 'order_type | order_count | revenue\nFirst | 3 | 90.0\nRepeat | 2 | 60.0' },
      { input: 'A customer has one order. Which group contains it?', output: 'First' }
    ]
  }
];
