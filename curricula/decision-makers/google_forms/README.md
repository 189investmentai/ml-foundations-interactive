# Google Forms Quiz Generator

Creates 10 auto-graded Google Forms quizzes (one per module) from a single Apps Script run.

**Cost: $0.** Google Forms is free with any Google account.

## Files

| File | What it does |
|------|-------------|
| `helpers.gs` | Shared `buildQuizForm()` function + `createAllQuizzes()` master runner |
| `module_01.gs` | Problem Framing (12 Qs) |
| `module_02.gs` | Logistic Regression (12 Qs) |
| `module_03.gs` | Decision Trees & Random Forests (12 Qs) |
| `module_04.gs` | Gradient Boosting (12 Qs) |
| `module_05.gs` | Feature Engineering (12 Qs) |
| `module_06.gs` | Model Evaluation (12 Qs) |
| `module_07.gs` | Clustering & Segmentation (12 Qs) |
| `module_08.gs` | Embeddings & Similarity Search (12 Qs) |
| `module_09.gs` | Transformers & LLMs (12 Qs) |
| `module_10.gs` | AI Agents (12 Qs) |

**Total: 120 questions across 10 forms**

## Setup (one-time, ~5 minutes)

### 1. Open Google Apps Script
Go to [script.google.com](https://script.google.com) → **New project**.

### 2. Add the script files
- Rename the default `Code.gs` to `helpers` and paste the contents of `helpers.gs`.
- Click **+** (add file) → **Script** for each module file (`module_01`, `module_02`, ... `module_10`).
- Paste the contents of each `.gs` file into its corresponding script file.

### 3. Run

**Option A — Create all 10 quizzes at once:**
- Select `createAllQuizzes` from the function dropdown → click **Run**.

**Option B — Create one at a time:**
- Select `createModule01` (or any module) → click **Run**.

### 4. Authorize
On first run, Google will ask you to authorize the script to create Forms. Click **Review permissions** → choose your account → **Allow**.

### 5. Get the form URLs
After the script runs, click **View → Logs** (or **Execution log**). Each form's edit URL is printed there. Open each link to review and share.

## What you get

Each generated form includes:
- **Quiz mode** enabled (auto-grading for multiple choice)
- **Answer key** with correct answers pre-set
- **Decision Receipt feedback** shown after submission (correct and incorrect)
- **Progress bar** enabled
- **All questions required**
- **1 point per multiple-choice question** (short answers need manual review)
- **Custom confirmation message** directing learners back to the course hub

## Customization

### Change point values
Edit `var pointValue = 1;` in `helpers.gs`.

### Add section breaks / branching
After generating, open any form in the Google Forms editor → add **Sections** and **Go to section based on answer** for remediation paths.

### Suggested branching points
- Module 01: Q4 (leakage), Q6 (Precision@K)
- Module 04: Q5 (early stopping)
- Module 06: Q7 (expected value)
- Module 09: Q7 (hallucination)
- Module 10: Q4 (guardrails)

### Sharing with learners
- Click **Send** in each form to get a shareable link.
- Embed links in Notion course hub or email.
- Enable **See score immediately after submission** in form Settings → Quizzes.

## Question format

Each module contains:
- 11 Multiple Choice questions (decision-focused, auto-graded)
- 1 Short Answer question (requires manual review, expected answer shown as help text)
- Decision Receipt feedback on every question
