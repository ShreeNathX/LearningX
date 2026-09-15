# LearningX 🚀
### Minimalist & High-Performance Coding Interview Preparation Platform
**Practice Python, Data Structures & Algorithms, and SQL — 100% in your browser with zero server setup.**

![LearningX Platform](https://img.shields.io/badge/Platform-GitHub%20Pages%20Ready-0284c7?style=for-the-badge)
![Curriculum](https://img.shields.io/badge/Questions-185%2B%20Curated-10b981?style=for-the-badge)
![Execution](https://img.shields.io/badge/Engines-Pyodide%20%7C%20sql.js%20WASM-f59e0b?style=for-the-badge)

---

## 🌟 Overview

**LearningX** is an interview preparation environment engineered to help you master core programming in **Python**, solve algorithmic challenges in **Data Structures & Algorithms (DSA)**, and write production-grade **SQL** queries.

Unlike traditional platforms that require paid subscriptions or complex backend servers, **LearningX is 100% serverless and client-side**, running WebAssembly engines directly in your browser. It is fully pre-configured for **GitHub Pages**.

---

## 🎯 What's Included

### 1. 185+ Curated Job-Ready Challenges
- **Core Programming (75 Questions)**: Python fundamentals (Strings, Numbers, Math, Bit Manipulation, Palindromes, Roman numerals, Lists, OOP).
- **Data Structures & Algorithms (55 Questions)**: Blind 75 / LeetCode style problems (Arrays, Two Pointers, Sliding Window, Monotonic Stack, Linked Lists, Trees & BST, Dynamic Programming, Backtracking, Graphs).
- **SQL & Databases (55 Questions)**: Real-world database queries (SELECT, GROUP BY, Aggregate functions, Multi-table JOINs, Subqueries, Window Functions like `DENSE_RANK`/`LEAD`/`LAG`, and CTEs).

### 2. Zero-Backend Browser Execution
- **SQL Execution**: Powered by `sql.js` (SQLite compiled to WebAssembly). Automatically initializes real database tables and compares query results with expected outputs.
- **Python Execution**: Powered by `Pyodide` (CPython 3 compiled to WebAssembly) running with isolated test harness and stdout interception.
- **Test feedback**: Run checks a quick subset of public tests; Submit verifies the complete public suite before marking a challenge solved.

### 3. Minimalist & Aesthetic Interface
- Inspired by modern tools like **Linear** and **Raycast** (deep slate tones, subtle glassmorphism, glowing status badges).
- Industry-standard **Monaco Editor** (VS Code's editor) with syntax highlighting, autocomplete, and keyboard shortcuts (`Ctrl+Enter` to run code).
- Interactive schema table viewer for SQL tables.
- Daily streak tracker, progress analytics, bookmarked challenges, and notes tab.
- **Data Backup & Restore**: One-click JSON export/import to keep your progress synced across multiple browsers and devices.

---

## 🚀 One-Click GitHub Pages Deployment

LearningX includes an automated GitHub Actions workflow (`.github/workflows/deploy.yml`).

### Steps to Deploy on Your GitHub Account:
1. Create a new repository on GitHub (e.g., `LearningX`).
2. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: LearningX platform"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   git push -u origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. The workflow will automatically build and publish your site! Your platform will be live at:
   `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`

---

## 💻 Running Locally

To run LearningX on your local machine:

```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

To generate a static production build:
```bash
npm run build
```
The optimized bundle will be created in the `dist/` directory.

Before every production build, LearningX validates the question catalog. You can run that check alone with:

```bash
npm run validate
```

---

## 🛠️ Tech Stack
- **Framework**: React 18 + Vite 6
- **Editor**: `@monaco-editor/react` (VS Code Editor Engine)
- **Styling**: Tailwind CSS + Custom CSS Variables
- **Icons**: Lucide React
- **WASM Runtimes**: Pyodide (Python 3) & sql.js (SQLite)
- **Deployment**: GitHub Actions + GitHub Pages
