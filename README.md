# LearningX

LearningX is a frontend-only coding interview practice platform for Python, data structures and algorithms, and SQL. It provides browser-based execution, immediate test feedback, saved progress, and a structured challenge catalog that can be deployed on GitHub Pages.

## Features

- 185 curated Python, DSA, and SQL challenges
- Python execution through Pyodide in a dedicated Web Worker
- SQLite execution through sql.js WebAssembly
- Quick Run for immediate feedback and Submit for full public-suite verification
- Per-case input, expected output, actual output, runtime errors, and execution time
- Support for Python functions, helper functions, and LeetCode-style `Solution` classes
- SQL validation for column names, row values, and requested ordering
- Monaco editor with Python indentation feedback
- Saved code, notes, bookmarks, solved status, and daily streaks
- JSON export and import for progress backup
- GitHub Pages workflow included

## Technology

| Area | Technology |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS |
| Code editor | Monaco Editor |
| Python runtime | Pyodide WebAssembly |
| SQL runtime | sql.js / SQLite WebAssembly |
| Deployment | GitHub Actions and GitHub Pages |

## Run Locally

Prerequisites:

- Node.js 20 or later
- npm

```bash
npm install
npm run dev
```

Open the address shown in the terminal, normally `http://localhost:5173`.

## Validate and Build

Validate the challenge catalog:

```bash
npm run validate
```

Create a production build:

```bash
npm run build
```

The build validates challenge contracts before creating the `dist` folder. Python and DSA challenges require a valid function signature and at least two tests. SQL challenges require a schema and expected query.

## Execution Model

### Python and DSA

Python runs in a Web Worker to keep the interface responsive. A five-second limit stops runaway code such as infinite loops. LearningX executes the documented entry point against each test case and compares normalized outputs.

Plain functions and LeetCode-style classes are supported:

```python
def reverse_string(value):
    return value[::-1]
```

```python
class Solution:
    def reverse_string(self, value):
        return value[::-1]
```

### SQL

Each SQL challenge creates an in-memory SQLite database from its schema. LearningX runs the learner query and compares returned columns and values with the expected result.

## Progress and Privacy

LearningX has no application backend. Code, notes, solved challenges, and streaks are saved in the browser. Use JSON export to back up progress or move it to another browser or device.

All current test cases are public because they are included in the frontend. Private test cases require a backend execution service.

## Deploy to GitHub Pages

1. Push the project to the `main` branch of [ShreeNathX/LearningX](https://github.com/ShreeNathX/LearningX).
2. In the repository, open **Settings** and then **Pages**.
3. Under **Build and deployment**, select **GitHub Actions**.
4. Open the **Actions** tab and wait for the deployment workflow to complete.

The public site URL is:

```text
https://ShreeNathX.github.io/LearningX/
```

## Project Structure

```text
src/
  components/       Shared interface components
  data/             Python, DSA, and SQL challenge catalogs
  services/         Browser storage and SQL execution services
  utils/            Editor validation helpers
  views/            Challenge catalog and problem workspace
  workers/          Isolated Python execution worker
scripts/            Catalog validation script
.github/workflows/  GitHub Pages deployment workflow
```

## License

This project is intended for learning and interview preparation. Add a license before distributing or accepting external contributions.
