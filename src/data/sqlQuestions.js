export const sqlQuestions = [
  {
    "id": "sql-01",
    "title": "Second Highest Salary",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Aggregation",
    "description": "Write a SQL query to find the second highest salary from the Employee table. If there is no second highest salary, return NULL.",
    "schemaSql": "CREATE TABLE Employee (id INT, salary INT);\nINSERT INTO Employee VALUES (1, 100), (2, 200), (3, 300);",
    "schemaDescription": [
      {
        "table": "Employee",
        "columns": [
          "id INT",
          "salary INT"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query below\\n",
    "expectedQuery": "SELECT MAX(salary) AS SecondHighestSalary FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee);",
    "hints": [
      "Check table relationships, joins, aggregation clauses, and column aliases."
    ],
    "solution": "SELECT (SELECT DISTINCT salary FROM Employee ORDER BY salary DESC LIMIT 1 OFFSET 1) AS SecondHighestSalary;",
    "explanation": "Executed against SQLite WASM database with verification against optimal solution query."
  },
  {
    "id": "sql-02",
    "title": "Duplicate Emails",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Aggregation",
    "description": "Write a SQL query to report all the duplicate emails. Note that it is guaranteed that the email field is not NULL.",
    "schemaSql": "CREATE TABLE Person (id INT, email VARCHAR(255));\nINSERT INTO Person VALUES (1, 'a@b.com'), (2, 'c@d.com'), (3, 'a@b.com');",
    "schemaDescription": [
      {
        "table": "Person",
        "columns": [
          "id INT",
          "email VARCHAR"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query below\\n",
    "expectedQuery": "SELECT email FROM Person GROUP BY email HAVING COUNT(email) > 1;",
    "hints": [
      "Check table relationships, joins, aggregation clauses, and column aliases."
    ],
    "solution": "SELECT email FROM Person GROUP BY email HAVING COUNT(*) > 1;",
    "explanation": "Executed against SQLite WASM database with verification against optimal solution query."
  },
  {
    "id": "sql-03",
    "title": "Employees Earning More Than Their Managers",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Joins & Subqueries",
    "description": "Find the employees who earn more than their managers. Return the employee names as 'Employee'.",
    "schemaSql": "CREATE TABLE Employee (id INT, name VARCHAR(50), salary INT, managerId INT);\nINSERT INTO Employee VALUES (1, 'Joe', 70000, 3), (2, 'Henry', 80000, 4), (3, 'Sam', 60000, NULL), (4, 'Max', 90000, NULL);",
    "schemaDescription": [
      {
        "table": "Employee",
        "columns": [
          "id INT",
          "name VARCHAR",
          "salary INT",
          "managerId INT"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query below\\n",
    "expectedQuery": "SELECT e.name AS Employee FROM Employee e JOIN Employee m ON e.managerId = m.id WHERE e.salary > m.salary;",
    "hints": [
      "Check table relationships, joins, aggregation clauses, and column aliases."
    ],
    "solution": "SELECT e1.name AS Employee FROM Employee e1 INNER JOIN Employee e2 ON e1.managerId = e2.id WHERE e1.salary > e2.salary;",
    "explanation": "Executed against SQLite WASM database with verification against optimal solution query."
  },
  {
    "id": "sql-04",
    "title": "Customers Who Never Order",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Joins & Subqueries",
    "description": "Find all customers who never order anything. Return result table with column 'Customers'.",
    "schemaSql": "CREATE TABLE Customers (id INT, name VARCHAR(50));\nCREATE TABLE Orders (id INT, customerId INT);\nINSERT INTO Customers VALUES (1, 'Joe'), (2, 'Henry'), (3, 'Sam'), (4, 'Max');\nINSERT INTO Orders VALUES (1, 3), (2, 1);",
    "schemaDescription": [
      {
        "table": "Customers",
        "columns": [
          "id INT",
          "name VARCHAR"
        ]
      },
      {
        "table": "Orders",
        "columns": [
          "id INT",
          "customerId INT"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query below\\n",
    "expectedQuery": "SELECT c.name AS Customers FROM Customers c LEFT JOIN Orders o ON c.id = o.customerId WHERE o.customerId IS NULL;",
    "hints": [
      "Check table relationships, joins, aggregation clauses, and column aliases."
    ],
    "solution": "SELECT name AS Customers FROM Customers WHERE id NOT IN (SELECT customerId FROM Orders);",
    "explanation": "Executed against SQLite WASM database with verification against optimal solution query."
  },
  {
    "id": "sql-05",
    "title": "Department Highest Salary",
    "track": "sql",
    "difficulty": "Medium",
    "topic": "Window Functions",
    "description": "Find employees who have the highest salary in each of the departments.",
    "schemaSql": "CREATE TABLE Employee (id INT, name VARCHAR(50), salary INT, departmentId INT);\nCREATE TABLE Department (id INT, name VARCHAR(50));\nINSERT INTO Employee VALUES (1, 'Joe', 70000, 1), (2, 'Jim', 90000, 1), (3, 'Henry', 80000, 2), (4, 'Sam', 60000, 2), (5, 'Max', 90000, 1);\nINSERT INTO Department VALUES (1, 'IT'), (2, 'Sales');",
    "schemaDescription": [
      {
        "table": "Employee",
        "columns": [
          "id INT",
          "name VARCHAR",
          "salary INT",
          "departmentId INT"
        ]
      },
      {
        "table": "Department",
        "columns": [
          "id INT",
          "name VARCHAR"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query below\\n",
    "expectedQuery": "SELECT d.name AS Department, e.name AS Employee, e.salary AS Salary FROM Employee e JOIN Department d ON e.departmentId = d.id WHERE (e.departmentId, e.salary) IN (SELECT departmentId, MAX(salary) FROM Employee GROUP BY departmentId);",
    "hints": [
      "Check table relationships, joins, aggregation clauses, and column aliases."
    ],
    "solution": "WITH Ranked AS (SELECT departmentId, name, salary, DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC) as rnk FROM Employee) SELECT d.name as Department, r.name as Employee, r.salary as Salary FROM Ranked r JOIN Department d ON r.departmentId = d.id WHERE r.rnk = 1;",
    "explanation": "Executed against SQLite WASM database with verification against optimal solution query."
  },
  {
    "id": "sql-06",
    "title": "Delete Duplicate Emails",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "CTEs & Advanced SQL",
    "description": "Write a SQL statement to find IDs of Person table to KEEP, maintaining only the smallest id for each unique email.",
    "schemaSql": "CREATE TABLE Person (id INT, email VARCHAR(255));\nINSERT INTO Person VALUES (1, 'john@example.com'), (2, 'bob@example.com'), (3, 'john@example.com');",
    "schemaDescription": [
      {
        "table": "Person",
        "columns": [
          "id INT",
          "email VARCHAR"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query below\\n",
    "expectedQuery": "SELECT MIN(id) AS id, email FROM Person GROUP BY email ORDER BY id;",
    "hints": [
      "Check table relationships, joins, aggregation clauses, and column aliases."
    ],
    "solution": "SELECT id, email FROM Person WHERE id IN (SELECT MIN(id) FROM Person GROUP BY email);",
    "explanation": "Executed against SQLite WASM database with verification against optimal solution query."
  },
  {
    "id": "sql-07",
    "title": "Rising Temperature",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Joins & Subqueries",
    "description": "Write a SQL query to find all dates' Id with higher temperatures compared to its previous dates (yesterday).",
    "schemaSql": "CREATE TABLE Weather (id INT, recordDate DATE, temperature INT);\nINSERT INTO Weather VALUES (1, '2015-01-01', 10), (2, '2015-01-02', 25), (3, '2015-01-03', 20), (4, '2015-01-04', 30);",
    "schemaDescription": [
      {
        "table": "Weather",
        "columns": [
          "id INT",
          "recordDate DATE",
          "temperature INT"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query below\\n",
    "expectedQuery": "SELECT w1.id FROM Weather w1 JOIN Weather w2 ON date(w1.recordDate, '-1 day') = w2.recordDate WHERE w1.temperature > w2.temperature;",
    "hints": [
      "Check table relationships, joins, aggregation clauses, and column aliases."
    ],
    "solution": "SELECT w1.id FROM Weather w1, Weather w2 WHERE date(w1.recordDate, '-1 day') = w2.recordDate AND w1.temperature > w2.temperature;",
    "explanation": "Executed against SQLite WASM database with verification against optimal solution query."
  },
  {
    "id": "sql-08",
    "title": "Big Countries",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Aggregation",
    "description": "A country is big if it has an area of at least 3 million km\u00b2 or a population of at least 25 million. Report name, population, and area of big countries.",
    "schemaSql": "CREATE TABLE World (name VARCHAR(50), continent VARCHAR(50), area INT, population INT, gdp BIGINT);\nINSERT INTO World VALUES ('Afghanistan', 'Asia', 652230, 25500100, 20343000), ('Albania', 'Europe', 28748, 2831741, 12960000), ('Algeria', 'Africa', 2381741, 37100000, 188681000), ('Andorra', 'Europe', 468, 78115, 3712000), ('Angola', 'Africa', 1246700, 20609294, 100990000);",
    "schemaDescription": [
      {
        "table": "World",
        "columns": [
          "name VARCHAR",
          "continent VARCHAR",
          "area INT",
          "population INT",
          "gdp BIGINT"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query below\\n",
    "expectedQuery": "SELECT name, population, area FROM World WHERE area >= 3000000 OR population >= 25000000;",
    "hints": [
      "Check table relationships, joins, aggregation clauses, and column aliases."
    ],
    "solution": "SELECT name, population, area FROM World WHERE area >= 3000000 UNION SELECT name, population, area FROM World WHERE population >= 25000000;",
    "explanation": "Executed against SQLite WASM database with verification against optimal solution query."
  },
  {
    "id": "sql-09",
    "title": "Classes More Than 5 Students",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Aggregation",
    "description": "Report all the classes that have at least five students.",
    "schemaSql": "CREATE TABLE Courses (student VARCHAR(50), class VARCHAR(50));\nINSERT INTO Courses VALUES ('A', 'Math'), ('B', 'English'), ('C', 'Math'), ('D', 'Biology'), ('E', 'Math'), ('F', 'Computer'), ('G', 'Math'), ('H', 'Math'), ('I', 'Math');",
    "schemaDescription": [
      {
        "table": "Courses",
        "columns": [
          "student VARCHAR",
          "class VARCHAR"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query below\\n",
    "expectedQuery": "SELECT class FROM Courses GROUP BY class HAVING COUNT(student) >= 5;",
    "hints": [
      "Check table relationships, joins, aggregation clauses, and column aliases."
    ],
    "solution": "SELECT class FROM Courses GROUP BY class HAVING COUNT(DISTINCT student) >= 5;",
    "explanation": "Executed against SQLite WASM database with verification against optimal solution query."
  },
  {
    "id": "sql-10",
    "title": "Not Boring Movies",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Aggregation",
    "description": "Report movies with an odd numbered ID and a description that is not 'boring', sorted by rating in descending order.",
    "schemaSql": "CREATE TABLE Cinema (id INT, movie VARCHAR(50), description VARCHAR(50), rating FLOAT);\nINSERT INTO Cinema VALUES (1, 'War', 'great 3D', 8.9), (2, 'Science', 'fiction', 8.5), (3, 'irish', 'boring', 6.2), (4, 'Ice song', 'Fantacy', 8.6), (5, 'House card', 'Interesting', 9.1);",
    "schemaDescription": [
      {
        "table": "Cinema",
        "columns": [
          "id INT",
          "movie VARCHAR",
          "description VARCHAR",
          "rating FLOAT"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query below\\n",
    "expectedQuery": "SELECT id, movie, description, rating FROM Cinema WHERE id % 2 = 1 AND description != 'boring' ORDER BY rating DESC;",
    "hints": [
      "Check table relationships, joins, aggregation clauses, and column aliases."
    ],
    "solution": "SELECT * FROM Cinema WHERE (id % 2 = 1) AND description NOT LIKE 'boring' ORDER BY rating DESC;",
    "explanation": "Executed against SQLite WASM database with verification against optimal solution query."
  },
  {
    "id": "sql-11",
    "title": "Swap Salary (Single UPDATE statement)",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "CTEs & Advanced SQL",
    "description": "Write an SQL statement that swaps all 'f' and 'm' values (i.e. change all 'f' to 'm' and vice versa) in a single update or select query.",
    "schemaSql": "CREATE TABLE Salary (id INT, name VARCHAR(50), sex CHAR(1), salary INT);\nINSERT INTO Salary VALUES (1, 'A', 'm', 2500), (2, 'B', 'f', 1500), (3, 'C', 'm', 5500), (4, 'D', 'f', 500);",
    "schemaDescription": [
      {
        "table": "Salary",
        "columns": [
          "id INT",
          "name VARCHAR",
          "sex CHAR",
          "salary INT"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query below\\n",
    "expectedQuery": "SELECT id, name, CASE WHEN sex = 'm' THEN 'f' ELSE 'm' END AS sex, salary FROM Salary;",
    "hints": [
      "Check table relationships, joins, aggregation clauses, and column aliases."
    ],
    "solution": "UPDATE Salary SET sex = CASE WHEN sex = 'm' THEN 'f' ELSE 'm' END;",
    "explanation": "Executed against SQLite WASM database with verification against optimal solution query."
  },
  {
    "id": "sql-12",
    "title": "Product Sales Analysis I",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Joins & Subqueries",
    "description": "Report the product_name, year, and price for each sale_id in the Sales table.",
    "schemaSql": "CREATE TABLE Sales (sale_id INT, product_id INT, year INT, quantity INT, price INT);\nCREATE TABLE Product (product_id INT, product_name VARCHAR(50));\nINSERT INTO Product VALUES (100, 'Nokia'), (200, 'Apple'), (300, 'Samsung');\nINSERT INTO Sales VALUES (1, 100, 2008, 10, 5000), (2, 100, 2009, 12, 5000), (7, 200, 2011, 15, 9000);",
    "schemaDescription": [
      {
        "table": "Sales",
        "columns": [
          "sale_id INT",
          "product_id INT",
          "year INT",
          "price INT"
        ]
      },
      {
        "table": "Product",
        "columns": [
          "product_id INT",
          "product_name VARCHAR"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query below\\n",
    "expectedQuery": "SELECT p.product_name, s.year, s.price FROM Sales s JOIN Product p ON s.product_id = p.product_id;",
    "hints": [
      "Check table relationships, joins, aggregation clauses, and column aliases."
    ],
    "solution": "SELECT p.product_name, s.year, s.price FROM Sales s INNER JOIN Product p USING(product_id);",
    "explanation": "Executed against SQLite WASM database with verification against optimal solution query."
  },
  {
    "id": "sql-13",
    "title": "Average Selling Price",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Aggregation",
    "description": "Find the average selling price for each product. average_price should be rounded to 2 decimal places.",
    "schemaSql": "CREATE TABLE Prices (product_id INT, start_date DATE, end_date DATE, price INT);\nCREATE TABLE UnitsSold (product_id INT, purchase_date DATE, units INT);\nINSERT INTO Prices VALUES (1, '2019-02-17', '2019-02-28', 5), (1, '2019-03-01', '2019-03-22', 20), (2, '2019-02-01', '2019-02-20', 15);\nINSERT INTO UnitsSold VALUES (1, '2019-02-25', 100), (1, '2019-03-01', 15), (2, '2019-02-10', 200);",
    "schemaDescription": [
      {
        "table": "Prices",
        "columns": [
          "product_id INT",
          "start_date DATE",
          "end_date DATE",
          "price INT"
        ]
      },
      {
        "table": "UnitsSold",
        "columns": [
          "product_id INT",
          "purchase_date DATE",
          "units INT"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query below\\n",
    "expectedQuery": "SELECT p.product_id, ROUND(1.0 * SUM(p.price * u.units) / SUM(u.units), 2) AS average_price FROM Prices p JOIN UnitsSold u ON p.product_id = u.product_id AND u.purchase_date BETWEEN p.start_date AND p.end_date GROUP BY p.product_id;",
    "hints": [
      "Check table relationships, joins, aggregation clauses, and column aliases."
    ],
    "solution": "SELECT p.product_id, ROUND(CAST(SUM(p.price * u.units) AS FLOAT) / SUM(u.units), 2) as average_price FROM Prices p INNER JOIN UnitsSold u ON p.product_id = u.product_id AND u.purchase_date BETWEEN p.start_date AND p.end_date GROUP BY p.product_id;",
    "explanation": "Executed against SQLite WASM database with verification against optimal solution query."
  },
  {
    "id": "sql-14",
    "title": "Project Employees I",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Aggregation",
    "description": "Write a SQL query that reports the average experience years of all the employees for each project, rounded to 2 digits.",
    "schemaSql": "CREATE TABLE Project (project_id INT, employee_id INT);\nCREATE TABLE Employee (employee_id INT, name VARCHAR(50), experience_years INT);\nINSERT INTO Project VALUES (1, 1), (1, 2), (1, 3), (2, 1), (2, 4);\nINSERT INTO Employee VALUES (1, 'Khaled', 3), (2, 'Ali', 2), (3, 'John', 1), (4, 'Doe', 2);",
    "schemaDescription": [
      {
        "table": "Project",
        "columns": [
          "project_id INT",
          "employee_id INT"
        ]
      },
      {
        "table": "Employee",
        "columns": [
          "employee_id INT",
          "experience_years INT"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query below\\n",
    "expectedQuery": "SELECT p.project_id, ROUND(AVG(e.experience_years), 2) AS average_years FROM Project p JOIN Employee e ON p.employee_id = e.employee_id GROUP BY p.project_id;",
    "hints": [
      "Check table relationships, joins, aggregation clauses, and column aliases."
    ],
    "solution": "SELECT project_id, ROUND(AVG(experience_years * 1.0), 2) AS average_years FROM Project p JOIN Employee e ON p.employee_id = e.employee_id GROUP BY project_id;",
    "explanation": "Executed against SQLite WASM database with verification against optimal solution query."
  },
  {
    "id": "sql-15",
    "title": "Students and Examinations",
    "track": "sql",
    "difficulty": "Medium",
    "topic": "Joins & Subqueries",
    "description": "Find the number of times each student attended each exam. Order by student_id, subject_name.",
    "schemaSql": "CREATE TABLE Students (student_id INT, student_name VARCHAR(50));\nCREATE TABLE Subjects (subject_name VARCHAR(50));\nCREATE TABLE Examinations (student_id INT, subject_name VARCHAR(50));\nINSERT INTO Students VALUES (1, 'Alice'), (2, 'Bob'), (13, 'John');\nINSERT INTO Subjects VALUES ('Math'), ('Physics'), ('Programming');\nINSERT INTO Examinations VALUES (1, 'Math'), (1, 'Physics'), (1, 'Programming'), (2, 'Programming'), (1, 'Physics'), (1, 'Math');",
    "schemaDescription": [
      {
        "table": "Students",
        "columns": [
          "student_id INT",
          "student_name VARCHAR"
        ]
      },
      {
        "table": "Subjects",
        "columns": [
          "subject_name VARCHAR"
        ]
      },
      {
        "table": "Examinations",
        "columns": [
          "student_id INT",
          "subject_name VARCHAR"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query below\\n",
    "expectedQuery": "SELECT s.student_id, s.student_name, sub.subject_name, COUNT(e.subject_name) AS attended_exams FROM Students s CROSS JOIN Subjects sub LEFT JOIN Examinations e ON s.student_id = e.student_id AND sub.subject_name = e.subject_name GROUP BY s.student_id, s.student_name, sub.subject_name ORDER BY s.student_id, sub.subject_name;",
    "hints": [
      "Check table relationships, joins, aggregation clauses, and column aliases."
    ],
    "solution": "SELECT s.student_id, s.student_name, sub.subject_name, COUNT(e.student_id) as attended_exams FROM Students s CROSS JOIN Subjects sub LEFT JOIN Examinations e ON s.student_id = e.student_id AND sub.subject_name = e.subject_name GROUP BY s.student_id, sub.subject_name ORDER BY s.student_id, sub.subject_name;",
    "explanation": "Executed against SQLite WASM database with verification against optimal solution query."
  },
  {
    "id": "sql-16",
    "title": "Managers with at Least 5 Direct Reports",
    "track": "sql",
    "difficulty": "Medium",
    "topic": "Joins & Subqueries",
    "description": "Find the managers who have at least five direct reports.",
    "schemaSql": "CREATE TABLE Employee (id INT, name VARCHAR(50), department VARCHAR(50), managerId INT);\nINSERT INTO Employee VALUES (101, 'John', 'A', NULL), (102, 'Dan', 'A', 101), (103, 'James', 'A', 101), (104, 'Amy', 'A', 101), (105, 'Anne', 'A', 101), (106, 'Ron', 'B', 101);",
    "schemaDescription": [
      {
        "table": "Employee",
        "columns": [
          "id INT",
          "name VARCHAR",
          "managerId INT"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query below\\n",
    "expectedQuery": "SELECT m.name FROM Employee e JOIN Employee m ON e.managerId = m.id GROUP BY e.managerId HAVING COUNT(e.id) >= 5;",
    "hints": [
      "Check table relationships, joins, aggregation clauses, and column aliases."
    ],
    "solution": "SELECT name FROM Employee WHERE id IN (SELECT managerId FROM Employee GROUP BY managerId HAVING COUNT(*) >= 5);",
    "explanation": "Executed against SQLite WASM database with verification against optimal solution query."
  },
  {
    "id": "sql-17",
    "title": "Confirmation Rate",
    "track": "sql",
    "difficulty": "Medium",
    "topic": "Window Functions",
    "description": "Find the confirmation rate of each user. Confirmation rate is count of 'confirmed' messages divided by total requests (0 if no requests). Round to 2 decimals.",
    "schemaSql": "CREATE TABLE Signups (user_id INT, time_stamp DATETIME);\nCREATE TABLE Confirmations (user_id INT, time_stamp DATETIME, action VARCHAR(20));\nINSERT INTO Signups VALUES (3, '2020-03-21 10:16:13'), (7, '2020-01-04 13:57:59'), (2, '2020-07-29 23:09:44');\nINSERT INTO Confirmations VALUES (3, '2021-01-06 03:30:46', 'timeout'), (3, '2021-07-14 14:00:00', 'confirmed'), (7, '2021-06-12 11:57:29', 'confirmed');",
    "schemaDescription": [
      {
        "table": "Signups",
        "columns": [
          "user_id INT"
        ]
      },
      {
        "table": "Confirmations",
        "columns": [
          "user_id INT",
          "action VARCHAR"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query below\\n",
    "expectedQuery": "SELECT s.user_id, ROUND(AVG(CASE WHEN c.action = 'confirmed' THEN 1.0 ELSE 0.0 END), 2) AS confirmation_rate FROM Signups s LEFT JOIN Confirmations c ON s.user_id = c.user_id GROUP BY s.user_id;",
    "hints": [
      "Check table relationships, joins, aggregation clauses, and column aliases."
    ],
    "solution": "SELECT s.user_id, ROUND(IFNULL(AVG(c.action = 'confirmed'), 0), 2) as confirmation_rate FROM Signups s LEFT JOIN Confirmations c USING (user_id) GROUP BY s.user_id;",
    "explanation": "Executed against SQLite WASM database with verification against optimal solution query."
  },
  {
    "id": "sql-18",
    "title": "Triangle Judgement",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Math & Logic",
    "description": "Report for every three line segments (x, y, z) whether they can form a triangle ('Yes' or 'No').",
    "schemaSql": "CREATE TABLE Triangle (x INT, y INT, z INT);\nINSERT INTO Triangle VALUES (13, 15, 30), (10, 20, 15);",
    "schemaDescription": [
      {
        "table": "Triangle",
        "columns": [
          "x INT",
          "y INT",
          "z INT"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query below\\n",
    "expectedQuery": "SELECT x, y, z, CASE WHEN x + y > z AND x + z > y AND y + z > x THEN 'Yes' ELSE 'No' END AS triangle FROM Triangle;",
    "hints": [
      "Check table relationships, joins, aggregation clauses, and column aliases."
    ],
    "solution": "SELECT *, CASE WHEN x + y > z AND x + z > y AND y + z > x THEN 'Yes' ELSE 'No' END AS triangle FROM Triangle;",
    "explanation": "Executed against SQLite WASM database with verification against optimal solution query."
  },
  {
    "id": "sql-19",
    "title": "Biggest Single Number",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Aggregation",
    "description": "Find the largest single number from MyNumbers table. If there is no single number, report null.",
    "schemaSql": "CREATE TABLE MyNumbers (num INT);\nINSERT INTO MyNumbers VALUES (8), (8), (3), (3), (1), (4), (5), (6);",
    "schemaDescription": [
      {
        "table": "MyNumbers",
        "columns": [
          "num INT"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query below\\n",
    "expectedQuery": "SELECT MAX(num) AS num FROM (SELECT num FROM MyNumbers GROUP BY num HAVING COUNT(num) = 1);",
    "hints": [
      "Check table relationships, joins, aggregation clauses, and column aliases."
    ],
    "solution": "SELECT (SELECT num FROM MyNumbers GROUP BY num HAVING COUNT(*) = 1 ORDER BY num DESC LIMIT 1) AS num;",
    "explanation": "Executed against SQLite WASM database with verification against optimal solution query."
  },
  {
    "id": "sql-20",
    "title": "Consecutive Numbers",
    "track": "sql",
    "difficulty": "Medium",
    "topic": "Window Functions",
    "description": "Find all numbers that appear at least three times consecutively in Logs table.",
    "schemaSql": "CREATE TABLE Logs (id INT, num INT);\nINSERT INTO Logs VALUES (1, 1), (2, 1), (3, 1), (4, 2), (5, 1), (6, 2), (7, 2);",
    "schemaDescription": [
      {
        "table": "Logs",
        "columns": [
          "id INT",
          "num INT"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query below\\n",
    "expectedQuery": "SELECT DISTINCT l1.num AS ConsecutiveNums FROM Logs l1 JOIN Logs l2 ON l1.id = l2.id - 1 JOIN Logs l3 ON l1.id = l3.id - 2 WHERE l1.num = l2.num AND l2.num = l3.num;",
    "hints": [
      "Check table relationships, joins, aggregation clauses, and column aliases."
    ],
    "solution": "WITH CTE AS (SELECT num, LEAD(num, 1) OVER (ORDER BY id) as nxt, LEAD(num, 2) OVER (ORDER BY id) as nxt2 FROM Logs) SELECT DISTINCT num as ConsecutiveNums FROM CTE WHERE num = nxt AND nxt = nxt2;",
    "explanation": "Executed against SQLite WASM database with verification against optimal solution query."
  },
  {
    "id": "sql-21",
    "title": "Rank Scores (Dense Rank)",
    "track": "sql",
    "difficulty": "Medium",
    "topic": "Window Functions",
    "description": "Rank scores. If there is a tie between two scores, both should have the same rank without gaps in numbering.",
    "schemaSql": "CREATE TABLE Scores (id INT, score FLOAT);\nINSERT INTO Scores VALUES (1, 3.50), (2, 3.65), (3, 4.00), (4, 3.85), (5, 4.00), (6, 3.65);",
    "schemaDescription": [
      {
        "table": "Scores",
        "columns": [
          "id INT",
          "score FLOAT"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query below\\n",
    "expectedQuery": "SELECT score, DENSE_RANK() OVER (ORDER BY score DESC) AS rank FROM Scores ORDER BY score DESC;",
    "hints": [
      "Check table relationships, joins, aggregation clauses, and column aliases."
    ],
    "solution": "SELECT score, DENSE_RANK() OVER (ORDER BY score DESC) AS 'rank' FROM Scores;",
    "explanation": "Executed against SQLite WASM database with verification against optimal solution query."
  },
  {
    "id": "sql-22",
    "title": "Count Salary Categories",
    "track": "sql",
    "difficulty": "Medium",
    "topic": "CTEs & Advanced SQL",
    "description": "Calculate the number of bank accounts for each salary category: 'Low Salary' (< 20000), 'Average Salary' (20000 to 50000), 'High Salary' (> 50000).",
    "schemaSql": "CREATE TABLE Accounts (account_id INT, income INT);\nINSERT INTO Accounts VALUES (3, 108939), (2, 12747), (8, 87709), (6, 91796);",
    "schemaDescription": [
      {
        "table": "Accounts",
        "columns": [
          "account_id INT",
          "income INT"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query below\\n",
    "expectedQuery": "SELECT 'Low Salary' AS category, COUNT(CASE WHEN income < 20000 THEN 1 END) AS accounts_count FROM Accounts UNION ALL SELECT 'Average Salary', COUNT(CASE WHEN income >= 20000 AND income <= 50000 THEN 1 END) FROM Accounts UNION ALL SELECT 'High Salary', COUNT(CASE WHEN income > 50000 THEN 1 END) FROM Accounts;",
    "hints": [
      "Check table relationships, joins, aggregation clauses, and column aliases."
    ],
    "solution": "SELECT 'Low Salary' as category, SUM(income < 20000) as accounts_count FROM Accounts UNION SELECT 'Average Salary', SUM(income BETWEEN 20000 AND 50000) FROM Accounts UNION SELECT 'High Salary', SUM(income > 50000) FROM Accounts;",
    "explanation": "Executed against SQLite WASM database with verification against optimal solution query."
  },
  {
    "id": "sql-23",
    "title": "User Activity for the Past 30 Days I",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Aggregation",
    "description": "Find the daily active user count for a period of 30 days ending 2019-07-27 inclusively.",
    "schemaSql": "CREATE TABLE Activity (user_id INT, session_id INT, activity_date DATE, activity_type VARCHAR(50));\nINSERT INTO Activity VALUES (1, 1, '2019-07-20', 'open_session'), (1, 1, '2019-07-20', 'scroll_down'), (2, 4, '2019-07-20', 'open_session'), (2, 4, '2019-07-21', 'send_message'), (3, 2, '2019-07-21', 'open_session'), (4, 3, '2019-06-25', 'open_session');",
    "schemaDescription": [
      {
        "table": "Activity",
        "columns": [
          "user_id INT",
          "activity_date DATE",
          "activity_type VARCHAR"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query below\\n",
    "expectedQuery": "SELECT activity_date AS day, COUNT(DISTINCT user_id) AS active_users FROM Activity WHERE activity_date BETWEEN '2019-06-28' AND '2019-07-27' GROUP BY activity_date;",
    "hints": [
      "Check table relationships, joins, aggregation clauses, and column aliases."
    ],
    "solution": "SELECT activity_date as day, COUNT(DISTINCT user_id) as active_users FROM Activity WHERE activity_date > '2019-06-27' AND activity_date <= '2019-07-27' GROUP BY activity_date;",
    "explanation": "Executed against SQLite WASM database with verification against optimal solution query."
  },
  {
    "id": "sql-24",
    "title": "Find Total Time Spent by Each Employee",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Aggregation",
    "description": "Calculate the total time in minutes spent by each employee on each day at the office (out_time - in_time).",
    "schemaSql": "CREATE TABLE Employees (emp_id INT, event_day DATE, in_time INT, out_time INT);\nINSERT INTO Employees VALUES (1, '2020-11-28', 4, 32), (1, '2020-11-28', 55, 200), (1, '2020-12-03', 1, 42), (2, '2020-11-28', 3, 33), (2, '2020-12-09', 47, 74);",
    "schemaDescription": [
      {
        "table": "Employees",
        "columns": [
          "emp_id INT",
          "event_day DATE",
          "in_time INT",
          "out_time INT"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query below\\n",
    "expectedQuery": "SELECT event_day AS day, emp_id, SUM(out_time - in_time) AS total_time FROM Employees GROUP BY event_day, emp_id;",
    "hints": [
      "Check table relationships, joins, aggregation clauses, and column aliases."
    ],
    "solution": "SELECT event_day AS day, emp_id, SUM(out_time - in_time) AS total_time FROM Employees GROUP BY 1, 2;",
    "explanation": "Executed against SQLite WASM database with verification against optimal solution query."
  },
  {
    "id": "sql-25",
    "title": "Recyclable and Low Fat Products",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Aggregation",
    "description": "Find the ids of products that are both low fat ('Y') and recyclable ('Y').",
    "schemaSql": "CREATE TABLE Products (product_id INT, low_fats CHAR(1), recyclable CHAR(1));\nINSERT INTO Products VALUES (0, 'Y', 'N'), (1, 'Y', 'Y'), (2, 'N', 'Y'), (3, 'Y', 'Y'), (4, 'N', 'N');",
    "schemaDescription": [
      {
        "table": "Products",
        "columns": [
          "product_id INT",
          "low_fats CHAR",
          "recyclable CHAR"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query below\\n",
    "expectedQuery": "SELECT product_id FROM Products WHERE low_fats = 'Y' AND recyclable = 'Y';",
    "hints": [
      "Check table relationships, joins, aggregation clauses, and column aliases."
    ],
    "solution": "SELECT product_id FROM Products WHERE low_fats = 'Y' AND recyclable = 'Y';",
    "explanation": "Executed against SQLite WASM database with verification against optimal solution query."
  },
  {
    "id": "sql-26",
    "title": "Customer Placing the Largest Number of Orders",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Aggregation",
    "description": "Find the customer_number for the customer who has placed the largest number of orders.",
    "schemaSql": "CREATE TABLE Orders (order_number INT, customer_number INT);\nINSERT INTO Orders VALUES (1, 1), (2, 2), (3, 3), (4, 3);",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for Customer Placing the Largest Number of Orders\nSELECT * ;\n",
    "expectedQuery": "SELECT customer_number FROM Orders GROUP BY customer_number ORDER BY COUNT(*) DESC LIMIT 1;",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "SELECT customer_number FROM Orders GROUP BY customer_number ORDER BY COUNT(*) DESC LIMIT 1;",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  },
  {
    "id": "sql-27",
    "title": "Game Play Analysis I",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Aggregation",
    "description": "Report the first login date for each player.",
    "schemaSql": "CREATE TABLE Activity (player_id INT, device_id INT, event_date DATE, games_played INT);\nINSERT INTO Activity VALUES (1, 2, '2016-03-01', 5), (1, 2, '2016-05-02', 6), (2, 3, '2017-06-25', 1);",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for Game Play Analysis I\nSELECT * ;\n",
    "expectedQuery": "SELECT player_id, MIN(event_date) AS first_login FROM Activity GROUP BY player_id;",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "SELECT player_id, MIN(event_date) AS first_login FROM Activity GROUP BY player_id;",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  },
  {
    "id": "sql-28",
    "title": "Game Play Analysis IV (Next Day Retention)",
    "track": "sql",
    "difficulty": "Medium",
    "topic": "Window Functions",
    "description": "Report the fraction of players that logged in again on the day immediately after their first login date, rounded to 2 decimals.",
    "schemaSql": "CREATE TABLE Activity (player_id INT, device_id INT, event_date DATE, games_played INT);\nINSERT INTO Activity VALUES (1, 2, '2016-03-01', 5), (1, 2, '2016-03-02', 6), (2, 3, '2017-06-25', 1), (3, 1, '2016-03-02', 0), (3, 4, '2018-07-03', 5);",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for Game Play Analysis IV (Next Day Retention)\nSELECT * ;\n",
    "expectedQuery": "WITH FirstLogin AS (SELECT player_id, MIN(event_date) AS first_date FROM Activity GROUP BY player_id) SELECT ROUND(1.0 * COUNT(a.player_id) / (SELECT COUNT(*) FROM FirstLogin), 2) AS fraction FROM FirstLogin f JOIN Activity a ON f.player_id = a.player_id AND a.event_date = date(f.first_date, '+1 day');",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "WITH FirstLogin AS (SELECT player_id, MIN(event_date) AS first_date FROM Activity GROUP BY player_id) SELECT ROUND(1.0 * COUNT(a.player_id) / (SELECT COUNT(*) FROM FirstLogin), 2) AS fraction FROM FirstLogin f JOIN Activity a ON f.player_id = a.player_id AND a.event_date = date(f.first_date, '+1 day');",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  },
  {
    "id": "sql-29",
    "title": "Sales Person Without Orders for RED Company",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Joins & Subqueries",
    "description": "Report the names of all the salespersons who did not have any orders related to the company with the name 'RED'.",
    "schemaSql": "CREATE TABLE SalesPerson (sales_id INT, name VARCHAR(50), salary INT);\nCREATE TABLE Company (com_id INT, name VARCHAR(50));\nCREATE TABLE Orders (order_id INT, com_id INT, sales_id INT, amount INT);\nINSERT INTO SalesPerson VALUES (1, 'John', 100000), (2, 'Amy', 120000), (3, 'Mark', 65000);\nINSERT INTO Company VALUES (1, 'RED'), (2, 'ORANGE');\nINSERT INTO Orders VALUES (1, 1, 1, 10000), (2, 2, 2, 5000);",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for Sales Person Without Orders for RED Company\nSELECT * ;\n",
    "expectedQuery": "SELECT name FROM SalesPerson WHERE sales_id NOT IN (SELECT o.sales_id FROM Orders o JOIN Company c ON o.com_id = c.com_id WHERE c.name = 'RED');",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "SELECT name FROM SalesPerson WHERE sales_id NOT IN (SELECT o.sales_id FROM Orders o JOIN Company c ON o.com_id = c.com_id WHERE c.name = 'RED');",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  },
  {
    "id": "sql-30",
    "title": "Product Price at a Given Date",
    "track": "sql",
    "difficulty": "Medium",
    "topic": "Window Functions",
    "description": "Find the prices of all products on 2019-08-16. Assume the price of all products before any change is 10.",
    "schemaSql": "CREATE TABLE Products (product_id INT, new_price INT, change_date DATE);\nINSERT INTO Products VALUES (1, 20, '2019-08-14'), (2, 50, '2019-08-14'), (1, 30, '2019-08-15'), (1, 35, '2019-08-16'), (2, 65, '2019-08-17'), (3, 20, '2019-08-18');",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for Product Price at a Given Date\nSELECT * ;\n",
    "expectedQuery": "WITH Ranked AS (SELECT product_id, new_price, RANK() OVER (PARTITION BY product_id ORDER BY change_date DESC) as rnk FROM Products WHERE change_date <= '2019-08-16') SELECT p.product_id, COALESCE(r.new_price, 10) AS price FROM (SELECT DISTINCT product_id FROM Products) p LEFT JOIN Ranked r ON p.product_id = r.product_id AND r.rnk = 1;",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "WITH Ranked AS (SELECT product_id, new_price, RANK() OVER (PARTITION BY product_id ORDER BY change_date DESC) as rnk FROM Products WHERE change_date <= '2019-08-16') SELECT p.product_id, COALESCE(r.new_price, 10) AS price FROM (SELECT DISTINCT product_id FROM Products) p LEFT JOIN Ranked r ON p.product_id = r.product_id AND r.rnk = 1;",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  },
  {
    "id": "sql-31",
    "title": "Tree Node Type (Root, Leaf, Inner)",
    "track": "sql",
    "difficulty": "Medium",
    "topic": "CTEs & Advanced SQL",
    "description": "Each node in the tree can be 'Root', 'Leaf', or 'Inner'. Report the type of each node in the tree.",
    "schemaSql": "CREATE TABLE Tree (id INT, p_id INT);\nINSERT INTO Tree VALUES (1, NULL), (2, 1), (3, 1), (4, 2), (5, 2);",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for Tree Node Type (Root, Leaf, Inner)\nSELECT * ;\n",
    "expectedQuery": "SELECT id, CASE WHEN p_id IS NULL THEN 'Root' WHEN id IN (SELECT p_id FROM Tree WHERE p_id IS NOT NULL) THEN 'Inner' ELSE 'Leaf' END AS type FROM Tree;",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "SELECT id, CASE WHEN p_id IS NULL THEN 'Root' WHEN id IN (SELECT p_id FROM Tree WHERE p_id IS NOT NULL) THEN 'Inner' ELSE 'Leaf' END AS type FROM Tree;",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  },
  {
    "id": "sql-32",
    "title": "Investments in 2016",
    "track": "sql",
    "difficulty": "Medium",
    "topic": "Window Functions",
    "description": "Report the sum of all total investment values in 2016 (tiv_2016) for all policyholders who have the same tiv_2015 value as one or more other policyholders, and are not in the same city (lat, lon).",
    "schemaSql": "CREATE TABLE Insurance (pid INT, tiv_2015 FLOAT, tiv_2016 FLOAT, lat FLOAT, lon FLOAT);\nINSERT INTO Insurance VALUES (1, 10, 5, 10, 10), (2, 20, 20, 20, 20), (3, 10, 30, 20, 20), (4, 10, 40, 40, 40);",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for Investments in 2016\nSELECT * ;\n",
    "expectedQuery": "SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016 FROM Insurance WHERE tiv_2015 IN (SELECT tiv_2015 FROM Insurance GROUP BY tiv_2015 HAVING COUNT(*) > 1) AND (lat, lon) IN (SELECT lat, lon FROM Insurance GROUP BY lat, lon HAVING COUNT(*) = 1);",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "SELECT ROUND(SUM(tiv_2016), 2) AS tiv_2016 FROM Insurance WHERE tiv_2015 IN (SELECT tiv_2015 FROM Insurance GROUP BY tiv_2015 HAVING COUNT(*) > 1) AND (lat, lon) IN (SELECT lat, lon FROM Insurance GROUP BY lat, lon HAVING COUNT(*) = 1);",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  },
  {
    "id": "sql-33",
    "title": "Department Top Three Salaries",
    "track": "sql",
    "difficulty": "Medium",
    "topic": "Window Functions",
    "description": "A company's executives are interested in seeing who earns the most money in each of the company's departments. Find top 3 unique salaries per department.",
    "schemaSql": "CREATE TABLE Employee (id INT, name VARCHAR(50), salary INT, departmentId INT);\nCREATE TABLE Department (id INT, name VARCHAR(50));\nINSERT INTO Department VALUES (1, 'IT'), (2, 'Sales');\nINSERT INTO Employee VALUES (1, 'Joe', 85000, 1), (2, 'Henry', 80000, 2), (3, 'Sam', 60000, 2), (4, 'Max', 90000, 1), (5, 'Janet', 69000, 1), (6, 'Randy', 85000, 1), (7, 'Will', 70000, 1);",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for Department Top Three Salaries\nSELECT * ;\n",
    "expectedQuery": "WITH Ranked AS (SELECT departmentId, name, salary, DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC) as rnk FROM Employee) SELECT d.name AS Department, r.name AS Employee, r.salary AS Salary FROM Ranked r JOIN Department d ON r.departmentId = d.id WHERE r.rnk <= 3;",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "WITH Ranked AS (SELECT departmentId, name, salary, DENSE_RANK() OVER (PARTITION BY departmentId ORDER BY salary DESC) as rnk FROM Employee) SELECT d.name AS Department, r.name AS Employee, r.salary AS Salary FROM Ranked r JOIN Department d ON r.departmentId = d.id WHERE r.rnk <= 3;",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  },
  {
    "id": "sql-34",
    "title": "Find Cumulative Salary of an Employee",
    "track": "sql",
    "difficulty": "Medium",
    "topic": "Window Functions",
    "description": "Calculate the cumulative salary for 3 months for each employee, excluding the most recent month for each employee.",
    "schemaSql": "CREATE TABLE Employee (id INT, month INT, salary INT);\nINSERT INTO Employee VALUES (1, 1, 20), (1, 2, 30), (1, 3, 40), (1, 4, 60), (2, 1, 20), (2, 2, 30);",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for Find Cumulative Salary of an Employee\nSELECT * ;\n",
    "expectedQuery": "WITH Filtered AS (SELECT id, month, salary, MAX(month) OVER (PARTITION BY id) as max_m FROM Employee) SELECT id, month, SUM(salary) OVER (PARTITION BY id ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS Salary FROM Filtered WHERE month < max_m ORDER BY id, month DESC;",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "WITH Filtered AS (SELECT id, month, salary, MAX(month) OVER (PARTITION BY id) as max_m FROM Employee) SELECT id, month, SUM(salary) OVER (PARTITION BY id ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS Salary FROM Filtered WHERE month < max_m ORDER BY id, month DESC;",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  },
  {
    "id": "sql-35",
    "title": "Monthly Transactions I",
    "track": "sql",
    "difficulty": "Medium",
    "topic": "Aggregation",
    "description": "Find for each month and country, the number of transactions and their total amount, the number of approved transactions and their total amount.",
    "schemaSql": "CREATE TABLE Transactions (id INT, country VARCHAR(50), state VARCHAR(20), amount INT, trans_date DATE);\nINSERT INTO Transactions VALUES (121, 'US', 'approved', 1000, '2018-12-18'), (122, 'US', 'declined', 2000, '2018-12-19'), (123, 'US', 'approved', 2000, '2019-01-01'), (124, 'DE', 'approved', 2000, '2019-01-07');",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for Monthly Transactions I\nSELECT * ;\n",
    "expectedQuery": "SELECT strftime('%Y-%m', trans_date) AS month, country, COUNT(id) AS trans_count, SUM(CASE WHEN state = 'approved' THEN 1 ELSE 0 END) AS approved_count, SUM(amount) AS trans_total_amount, SUM(CASE WHEN state = 'approved' THEN amount ELSE 0 END) AS approved_total_amount FROM Transactions GROUP BY month, country;",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "SELECT strftime('%Y-%m', trans_date) AS month, country, COUNT(id) AS trans_count, SUM(CASE WHEN state = 'approved' THEN 1 ELSE 0 END) AS approved_count, SUM(amount) AS trans_total_amount, SUM(CASE WHEN state = 'approved' THEN amount ELSE 0 END) AS approved_total_amount FROM Transactions GROUP BY month, country;",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  },
  {
    "id": "sql-36",
    "title": "Immediate Food Delivery I",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Aggregation",
    "description": "If the customer's preferred delivery date is the same as the order date, then the order is called immediate; otherwise, scheduled. Find percentage of immediate orders.",
    "schemaSql": "CREATE TABLE Delivery (delivery_id INT, customer_id INT, order_date DATE, customer_pref_delivery_date DATE);\nINSERT INTO Delivery VALUES (1, 1, '2019-08-01', '2019-08-02'), (2, 5, '2019-08-02', '2019-08-02'), (3, 1, '2019-08-11', '2019-08-11'), (4, 3, '2019-08-24', '2019-08-26');",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for Immediate Food Delivery I\nSELECT * ;\n",
    "expectedQuery": "SELECT ROUND(100.0 * SUM(CASE WHEN order_date = customer_pref_delivery_date THEN 1 ELSE 0 END) / COUNT(*), 2) AS immediate_percentage FROM Delivery;",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "SELECT ROUND(100.0 * SUM(CASE WHEN order_date = customer_pref_delivery_date THEN 1 ELSE 0 END) / COUNT(*), 2) AS immediate_percentage FROM Delivery;",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  },
  {
    "id": "sql-37",
    "title": "Last Person to Fit in the Bus",
    "track": "sql",
    "difficulty": "Medium",
    "topic": "Window Functions",
    "description": "There is a queue of people waiting to board a bus with weight limit 1000 kg. Find the person_name of the last person that can fit without exceeding limit.",
    "schemaSql": "CREATE TABLE Queue (person_id INT, person_name VARCHAR(50), weight INT, turn INT);\nINSERT INTO Queue VALUES (5, 'Alice', 250, 1), (4, 'Bob', 175, 2), (3, 'Alex', 350, 3), (6, 'John Cena', 400, 4), (1, 'Winston', 500, 6), (2, 'Marie', 200, 5);",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for Last Person to Fit in the Bus\nSELECT * ;\n",
    "expectedQuery": "WITH RunningWeight AS (SELECT person_name, SUM(weight) OVER (ORDER BY turn) as total FROM Queue) SELECT person_name FROM RunningWeight WHERE total <= 1000 ORDER BY total DESC LIMIT 1;",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "WITH RunningWeight AS (SELECT person_name, SUM(weight) OVER (ORDER BY turn) as total FROM Queue) SELECT person_name FROM RunningWeight WHERE total <= 1000 ORDER BY total DESC LIMIT 1;",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  },
  {
    "id": "sql-38",
    "title": "Market Analysis I",
    "track": "sql",
    "difficulty": "Medium",
    "topic": "Joins & Subqueries",
    "description": "Find for each user, the join date and the number of orders they made as a buyer in 2019.",
    "schemaSql": "CREATE TABLE Users (user_id INT, join_date DATE, favorite_brand VARCHAR(50));\nCREATE TABLE Orders (order_id INT, order_date DATE, item_id INT, buyer_id INT, seller_id INT);\nINSERT INTO Users VALUES (1, '2018-01-01', 'Lenovo'), (2, '2018-02-09', 'Samsung'), (3, '2019-01-19', 'LG');\nINSERT INTO Orders VALUES (1, '2019-08-01', 4, 1, 2), (2, '2018-08-02', 2, 1, 3), (3, '2019-08-03', 3, 2, 3);",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for Market Analysis I\nSELECT * ;\n",
    "expectedQuery": "SELECT u.user_id AS buyer_id, u.join_date, COUNT(o.order_id) AS orders_in_2019 FROM Users u LEFT JOIN Orders o ON u.user_id = o.buyer_id AND strftime('%Y', o.order_date) = '2019' GROUP BY u.user_id, u.join_date;",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "SELECT u.user_id AS buyer_id, u.join_date, COUNT(o.order_id) AS orders_in_2019 FROM Users u LEFT JOIN Orders o ON u.user_id = o.buyer_id AND strftime('%Y', o.order_date) = '2019' GROUP BY u.user_id, u.join_date;",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  },
  {
    "id": "sql-39",
    "title": "Fix Names in a Table",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Strings",
    "description": "Fix the names so that only the first character is uppercase and the rest are lowercase. Order by user_id.",
    "schemaSql": "CREATE TABLE Users (user_id INT, name VARCHAR(50));\nINSERT INTO Users VALUES (1, 'aLice'), (2, 'bOB');",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for Fix Names in a Table\nSELECT * ;\n",
    "expectedQuery": "SELECT user_id, UPPER(SUBSTR(name, 1, 1)) || LOWER(SUBSTR(name, 2)) AS name FROM Users ORDER BY user_id;",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "SELECT user_id, UPPER(SUBSTR(name, 1, 1)) || LOWER(SUBSTR(name, 2)) AS name FROM Users ORDER BY user_id;",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  },
  {
    "id": "sql-40",
    "title": "Patients With a Condition",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Strings",
    "description": "Report the patient_id, patient_name, and conditions of the patients who have Type I Diabetes (starts with DIAB1 prefix).",
    "schemaSql": "CREATE TABLE Patients (patient_id INT, patient_name VARCHAR(50), conditions VARCHAR(100));\nINSERT INTO Patients VALUES (1, 'Daniel', 'YFEV COUGH'), (2, 'Alice', ''), (3, 'Bob', 'DIAB100 MYOP'), (4, 'George', 'ACNE DIAB100'), (5, 'Alain', 'DIAB201');",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for Patients With a Condition\nSELECT * ;\n",
    "expectedQuery": "SELECT patient_id, patient_name, conditions FROM Patients WHERE conditions LIKE 'DIAB1%' OR conditions LIKE '% DIAB1%';",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "SELECT patient_id, patient_name, conditions FROM Patients WHERE conditions LIKE 'DIAB1%' OR conditions LIKE '% DIAB1%';",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  },
  {
    "id": "sql-41",
    "title": "Top Travellers",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Aggregation",
    "description": "Report the distance traveled by each user. Order by travelled_distance in descending order, then name ascending.",
    "schemaSql": "CREATE TABLE Users (id INT, name VARCHAR(50));\nCREATE TABLE Rides (id INT, user_id INT, distance INT);\nINSERT INTO Users VALUES (1, 'Alice'), (2, 'Bob'), (3, 'Alex');\nINSERT INTO Rides VALUES (1, 1, 120), (2, 2, 317), (3, 3, 222), (4, 1, 100);",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for Top Travellers\nSELECT * ;\n",
    "expectedQuery": "SELECT u.name, COALESCE(SUM(r.distance), 0) AS travelled_distance FROM Users u LEFT JOIN Rides r ON u.id = r.user_id GROUP BY u.id, u.name ORDER BY travelled_distance DESC, u.name ASC;",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "SELECT u.name, COALESCE(SUM(r.distance), 0) AS travelled_distance FROM Users u LEFT JOIN Rides r ON u.id = r.user_id GROUP BY u.id, u.name ORDER BY travelled_distance DESC, u.name ASC;",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  },
  {
    "id": "sql-42",
    "title": "Bank Account Summary II",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Aggregation",
    "description": "Report the name and balance of users with a balance higher than 10000.",
    "schemaSql": "CREATE TABLE Users (account INT, name VARCHAR(50));\nCREATE TABLE Transactions (trans_id INT, account INT, amount INT, trans_date DATE);\nINSERT INTO Users VALUES (900001, 'Alice'), (900002, 'Bob');\nINSERT INTO Transactions VALUES (1, 900001, 7000, '2020-08-01'), (2, 900001, 7000, '2020-09-01'), (3, 900002, 1000, '2020-09-07');",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for Bank Account Summary II\nSELECT * ;\n",
    "expectedQuery": "SELECT u.name, SUM(t.amount) AS balance FROM Users u JOIN Transactions t ON u.account = t.account GROUP BY u.account, u.name HAVING SUM(t.amount) > 10000;",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "SELECT u.name, SUM(t.amount) AS balance FROM Users u JOIN Transactions t ON u.account = t.account GROUP BY u.account, u.name HAVING SUM(t.amount) > 10000;",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  },
  {
    "id": "sql-43",
    "title": "Sales Analysis III",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Aggregation",
    "description": "Report the products that were only sold in the first quarter of 2019 (between 2019-01-01 and 2019-03-31 inclusive).",
    "schemaSql": "CREATE TABLE Product (product_id INT, product_name VARCHAR(50));\nCREATE TABLE Sales (seller_id INT, product_id INT, buyer_id INT, sale_date DATE, quantity INT, price INT);\nINSERT INTO Product VALUES (1, 'S8'), (2, 'G4'), (3, 'iPhone');\nINSERT INTO Sales VALUES (1, 1, 1, '2019-01-21', 2, 2000), (1, 2, 2, '2019-02-17', 1, 800), (2, 2, 3, '2019-06-02', 1, 800), (3, 3, 4, '2019-05-13', 2, 2800);",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for Sales Analysis III\nSELECT * ;\n",
    "expectedQuery": "SELECT p.product_id, p.product_name FROM Product p JOIN Sales s ON p.product_id = s.product_id GROUP BY p.product_id, p.product_name HAVING MIN(s.sale_date) >= '2019-01-01' AND MAX(s.sale_date) <= '2019-03-31';",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "SELECT p.product_id, p.product_name FROM Product p JOIN Sales s ON p.product_id = s.product_id GROUP BY p.product_id, p.product_name HAVING MIN(s.sale_date) >= '2019-01-01' AND MAX(s.sale_date) <= '2019-03-31';",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  },
  {
    "id": "sql-44",
    "title": "Find Follower Count",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Aggregation",
    "description": "Write a SQL query that will, for each user, return the number of followers. Order by user_id.",
    "schemaSql": "CREATE TABLE Followers (user_id INT, follower_id INT);\nINSERT INTO Followers VALUES (0, 1), (1, 0), (2, 0), (2, 1);",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for Find Follower Count\nSELECT * ;\n",
    "expectedQuery": "SELECT user_id, COUNT(follower_id) AS followers_count FROM Followers GROUP BY user_id ORDER BY user_id;",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "SELECT user_id, COUNT(follower_id) AS followers_count FROM Followers GROUP BY user_id ORDER BY user_id;",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  },
  {
    "id": "sql-45",
    "title": "Daily Leads and Partners",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Aggregation",
    "description": "For each date_id and make_name, find the number of distinct lead_id's and distinct partner_id's.",
    "schemaSql": "CREATE TABLE DailySales (date_id DATE, make_name VARCHAR(20), lead_id INT, partner_id INT);\nINSERT INTO DailySales VALUES ('2020-12-8', 'toyota', 0, 1), ('2020-12-8', 'toyota', 1, 0), ('2020-12-8', 'toyota', 1, 2), ('2020-12-7', 'toyota', 0, 2), ('2020-12-7', 'honda', 1, 2);",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for Daily Leads and Partners\nSELECT * ;\n",
    "expectedQuery": "SELECT date_id, make_name, COUNT(DISTINCT lead_id) AS unique_leads, COUNT(DISTINCT partner_id) AS unique_partners FROM DailySales GROUP BY date_id, make_name;",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "SELECT date_id, make_name, COUNT(DISTINCT lead_id) AS unique_leads, COUNT(DISTINCT partner_id) AS unique_partners FROM DailySales GROUP BY date_id, make_name;",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  },
  {
    "id": "sql-46",
    "title": "Find Users With Valid E-Mails",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Strings",
    "description": "Find the users who have valid emails ending with '@learningx.com'.",
    "schemaSql": "CREATE TABLE Users (user_id INT, name VARCHAR(50), mail VARCHAR(50));\nINSERT INTO Users VALUES (1, 'Winston', 'winston@learningx.com'), (2, 'Jonathan', 'jonathan@is-great.com'), (3, 'Annabelle', 'bella-@learningx.com');",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for Find Users With Valid E-Mails\nSELECT * ;\n",
    "expectedQuery": "SELECT user_id, name, mail FROM Users WHERE mail LIKE '%@learningx.com';",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "SELECT user_id, name, mail FROM Users WHERE mail LIKE '%@learningx.com';",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  },
  {
    "id": "sql-47",
    "title": "Actors and Directors Who Cooperated At Least Three Times",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Aggregation",
    "description": "Report the pairs (actor_id, director_id) where the actor has cooperated with the director at least three times.",
    "schemaSql": "CREATE TABLE ActorDirector (actor_id INT, director_id INT, timestamp INT);\nINSERT INTO ActorDirector VALUES (1, 1, 0), (1, 1, 1), (1, 1, 2), (1, 2, 3), (1, 2, 4), (2, 1, 5), (2, 1, 6);",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for Actors and Directors Who Cooperated At Least Three Times\nSELECT * ;\n",
    "expectedQuery": "SELECT actor_id, director_id FROM ActorDirector GROUP BY actor_id, director_id HAVING COUNT(*) >= 3;",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "SELECT actor_id, director_id FROM ActorDirector GROUP BY actor_id, director_id HAVING COUNT(*) >= 3;",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  },
  {
    "id": "sql-48",
    "title": "Primary Department for Each Employee",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "CTEs & Advanced SQL",
    "description": "Report all the employees with their primary department (flag = 'Y' or only one department assigned).",
    "schemaSql": "CREATE TABLE Employee (employee_id INT, department_id INT, primary_flag CHAR(1));\nINSERT INTO Employee VALUES (1, 1, 'N'), (2, 1, 'Y'), (2, 2, 'N'), (3, 3, 'N'), (4, 2, 'N'), (4, 3, 'Y'), (4, 4, 'N');",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for Primary Department for Each Employee\nSELECT * ;\n",
    "expectedQuery": "SELECT employee_id, department_id FROM Employee WHERE primary_flag = 'Y' OR employee_id IN (SELECT employee_id FROM Employee GROUP BY employee_id HAVING COUNT(*) = 1);",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "SELECT employee_id, department_id FROM Employee WHERE primary_flag = 'Y' OR employee_id IN (SELECT employee_id FROM Employee GROUP BY employee_id HAVING COUNT(*) = 1);",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  },
  {
    "id": "sql-49",
    "title": "The Number of Employees Which Report to Each Employee",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Joins & Subqueries",
    "description": "For each manager with at least one report, return manager employee_id, name, reports_count, and average_age rounded to nearest integer.",
    "schemaSql": "CREATE TABLE Employees (employee_id INT, name VARCHAR(50), reports_to INT, age INT);\nINSERT INTO Employees VALUES (9, 'Hercy', NULL, 43), (6, 'Alice', 9, 41), (4, 'Bob', 9, 36), (2, 'Winston', NULL, 37);",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for The Number of Employees Which Report to Each Employee\nSELECT * ;\n",
    "expectedQuery": "SELECT m.employee_id, m.name, COUNT(e.employee_id) AS reports_count, ROUND(AVG(e.age)) AS average_age FROM Employees m JOIN Employees e ON m.employee_id = e.reports_to GROUP BY m.employee_id, m.name ORDER BY m.employee_id;",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "SELECT m.employee_id, m.name, COUNT(e.employee_id) AS reports_count, ROUND(AVG(e.age)) AS average_age FROM Employees m JOIN Employees e ON m.employee_id = e.reports_to GROUP BY m.employee_id, m.name ORDER BY m.employee_id;",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  },
  {
    "id": "sql-50",
    "title": "Triangle Side Validator",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Math & Logic",
    "description": "Given a table with sides x, y, and z, determine if valid triangles can be formed.",
    "schemaSql": "CREATE TABLE Sides (id INT, x INT, y INT, z INT);\nINSERT INTO Sides VALUES (1, 3, 4, 5), (2, 1, 2, 3), (3, 5, 5, 5);",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for Triangle Side Validator\nSELECT * ;\n",
    "expectedQuery": "SELECT id, CASE WHEN x + y > z AND x + z > y AND y + z > x THEN 'Valid' ELSE 'Invalid' END AS status FROM Sides;",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "SELECT id, CASE WHEN x + y > z AND x + z > y AND y + z > x THEN 'Valid' ELSE 'Invalid' END AS status FROM Sides;",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  },
  {
    "id": "sql-51",
    "title": "Group Sold Products By The Date",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Aggregation",
    "description": "Find for each date the number of different products sold and their names comma-separated (GROUP_CONCAT).",
    "schemaSql": "CREATE TABLE Activities (sell_date DATE, product VARCHAR(50));\nINSERT INTO Activities VALUES ('2020-05-30', 'Headphone'), ('2020-06-01', 'Pencil'), ('2020-06-02', 'Mask'), ('2020-05-30', 'Basketball'), ('2020-06-01', 'Bible');",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for Group Sold Products By The Date\nSELECT * ;\n",
    "expectedQuery": "SELECT sell_date, COUNT(DISTINCT product) AS num_sold, GROUP_CONCAT(DISTINCT product) AS products FROM Activities GROUP BY sell_date ORDER BY sell_date;",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "SELECT sell_date, COUNT(DISTINCT product) AS num_sold, GROUP_CONCAT(DISTINCT product) AS products FROM Activities GROUP BY sell_date ORDER BY sell_date;",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  },
  {
    "id": "sql-52",
    "title": "Reformat Department Table (Pivot Quarters)",
    "track": "sql",
    "difficulty": "Medium",
    "topic": "Aggregation",
    "description": "Reformat the table such that there is a department id column and revenue columns for Jan, Feb, and Mar.",
    "schemaSql": "CREATE TABLE Department (id INT, revenue INT, month VARCHAR(10));\nINSERT INTO Department VALUES (1, 8000, 'Jan'), (2, 9000, 'Jan'), (3, 10000, 'Feb'), (1, 7000, 'Feb'), (1, 6000, 'Mar');",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for Reformat Department Table (Pivot Quarters)\nSELECT * ;\n",
    "expectedQuery": "SELECT id, SUM(CASE WHEN month = 'Jan' THEN revenue ELSE NULL END) AS Jan_Revenue, SUM(CASE WHEN month = 'Feb' THEN revenue ELSE NULL END) AS Feb_Revenue, SUM(CASE WHEN month = 'Mar' THEN revenue ELSE NULL END) AS Mar_Revenue FROM Department GROUP BY id;",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "SELECT id, SUM(CASE WHEN month = 'Jan' THEN revenue ELSE NULL END) AS Jan_Revenue, SUM(CASE WHEN month = 'Feb' THEN revenue ELSE NULL END) AS Feb_Revenue, SUM(CASE WHEN month = 'Mar' THEN revenue ELSE NULL END) AS Mar_Revenue FROM Department GROUP BY id;",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  },
  {
    "id": "sql-53",
    "title": "Article Views I",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Aggregation",
    "description": "Find all the authors that viewed at least one of their own articles. Order by id ascending.",
    "schemaSql": "CREATE TABLE Views (article_id INT, author_id INT, viewer_id INT, view_date DATE);\nINSERT INTO Views VALUES (1, 3, 5, '2019-08-01'), (2, 7, 7, '2019-08-01'), (2, 7, 6, '2019-08-02'), (4, 7, 1, '2019-07-22');",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for Article Views I\nSELECT * ;\n",
    "expectedQuery": "SELECT DISTINCT author_id AS id FROM Views WHERE author_id = viewer_id ORDER BY id ASC;",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "SELECT DISTINCT author_id AS id FROM Views WHERE author_id = viewer_id ORDER BY id ASC;",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  },
  {
    "id": "sql-54",
    "title": "Customer Who Visited but Did Not Make Any Transactions",
    "track": "sql",
    "difficulty": "Easy",
    "topic": "Joins & Subqueries",
    "description": "Find the IDs of the users who visited without making any transactions and the number of times they made these types of visits.",
    "schemaSql": "CREATE TABLE Visits (visit_id INT, customer_id INT);\nCREATE TABLE Transactions (transaction_id INT, visit_id INT, amount INT);\nINSERT INTO Visits VALUES (1, 23), (2, 9), (4, 30), (5, 54), (6, 96), (7, 54), (8, 54);\nINSERT INTO Transactions VALUES (2, 5, 310), (3, 5, 300), (9, 5, 200), (12, 1, 910), (13, 2, 970);",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for Customer Who Visited but Did Not Make Any Transactions\nSELECT * ;\n",
    "expectedQuery": "SELECT v.customer_id, COUNT(v.visit_id) AS count_no_trans FROM Visits v LEFT JOIN Transactions t ON v.visit_id = t.visit_id WHERE t.transaction_id IS NULL GROUP BY v.customer_id;",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "SELECT v.customer_id, COUNT(v.visit_id) AS count_no_trans FROM Visits v LEFT JOIN Transactions t ON v.visit_id = t.visit_id WHERE t.transaction_id IS NULL GROUP BY v.customer_id;",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  },
  {
    "id": "sql-55",
    "title": "Restaurant Growth (7-Day Moving Average)",
    "track": "sql",
    "difficulty": "Medium",
    "topic": "Window Functions",
    "description": "Compute the moving average of how much the customer paid in a 7 days window (current day + 6 days before).",
    "schemaSql": "CREATE TABLE Customer (customer_id INT, name VARCHAR(50), visited_on DATE, amount INT);\nINSERT INTO Customer VALUES (1, 'Jhon', '2019-01-01', 100), (2, 'Daniel', '2019-01-02', 110), (3, 'Jade', '2019-01-03', 120), (4, 'Khaled', '2019-01-04', 130), (5, 'Winston', '2019-01-05', 110), (6, 'Elvis', '2019-01-06', 140), (7, 'Anna', '2019-01-07', 150), (8, 'Maria', '2019-01-08', 80);",
    "schemaDescription": [
      {
        "table": "Database Tables",
        "columns": [
          "Refer to Schema SQL"
        ]
      }
    ],
    "starterCode": "-- Write your SQL query for Restaurant Growth (7-Day Moving Average)\nSELECT * ;\n",
    "expectedQuery": "WITH Daily AS (SELECT visited_on, SUM(amount) AS amount FROM Customer GROUP BY visited_on), Moving AS (SELECT visited_on, SUM(amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS amount, ROUND(AVG(amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 2) AS average_amount, ROW_NUMBER() OVER (ORDER BY visited_on) AS rn FROM Daily) SELECT visited_on, amount, average_amount FROM Moving WHERE rn >= 7;",
    "hints": [
      "Consider standard GROUP BY, WINDOW functions, or subquery filtering."
    ],
    "solution": "WITH Daily AS (SELECT visited_on, SUM(amount) AS amount FROM Customer GROUP BY visited_on), Moving AS (SELECT visited_on, SUM(amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS amount, ROUND(AVG(amount) OVER (ORDER BY visited_on ROWS BETWEEN 6 PRECEDING AND CURRENT ROW), 2) AS average_amount, ROW_NUMBER() OVER (ORDER BY visited_on) AS rn FROM Daily) SELECT visited_on, amount, average_amount FROM Moving WHERE rn >= 7;",
    "explanation": "Evaluated using in-browser WebAssembly SQLite test suite."
  }
];
