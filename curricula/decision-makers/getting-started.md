# Getting Started: ML for Decision Makers

Welcome! This guide will get you up and running in about 5 minutes. No installs. No setup. Just you and the material.

---

## What you need

**Just a Google account.** That's it.

You'll use Google Colab (free) to run the hands-on labs. You'll use Google Forms (or Typeform) for the scenario quizzes. Everything runs in the browser. No Python on your laptop. No GPU. No cloud credits.

---

## How this course works

Each module follows the same rhythm. Plan for about **60 minutes per module**:

| Component | Time | What you do |
|-----------|------|-------------|
| **Micro-lesson** | 15 min | Read the concept. One clear question per module. |
| **Scenario quiz** | 10 min | Make decisions. Get feedback on each answer. |
| **Colab lab** | 20 min | Hands-on with real data. Fill in TODOs, run cells. |
| **Debug drill** | 15 min | Find and fix the bug. This is where it clicks. |
| **Cheat sheet** | Reference | One-page summary. Use it anytime. |

Do them in order. The lab and debug drill build on the micro-lesson. The quiz tests whether you can apply what you learned.

---

## How to open a Colab notebook

1. **Click the link** to the notebook (from the module page or course hub).
2. **It opens in Colab** in your browser. You're viewing a copy on Google's servers.
3. **Click "Copy to Drive"** (or "Open in Colab") so you have your own editable copy. Otherwise your changes won't save.
4. **Run cells top to bottom.** Click a cell, then press Shift+Enter to run it and move to the next. Or use **Runtime → Run all** to run everything in order.
5. **"Run All"** means: execute every cell from top to bottom automatically. Use it when you've made changes and want to re-run the whole notebook. It's faster than clicking through each cell.

**Pro tip:** Always run cells in order. Later cells often depend on variables created in earlier ones. If something breaks, try "Runtime → Restart and run all" to start fresh.

---

## The StreamCart case company

You'll work with **StreamCart**—a fictional subscription e-commerce company—throughout the entire course.

Same company. Same datasets. Same business problems. Churn, fraud, support tickets, recommendations. By the end, you'll know StreamCart's data inside out.

Why one company? Because concepts stick when you see them applied to the *same* business repeatedly. You'll build intuition for when ML helps and when it doesn't.

---

## What to do if something breaks

| Problem | What to do |
|---------|------------|
| **"Runtime disconnected"** | Colab disconnected your session (often after idle time). Click "Reconnect" or "Connect" to get a new runtime. Your notebook is saved; you may need to re-run cells. |
| **"ModuleNotFoundError: No module named 'lightgbm'"** | Run the pip install cell first. Most notebooks have a cell at the top that installs packages. Run it, wait for it to finish, then continue. |
| **"File not found"** | You probably skipped a cell or ran them out of order. Go to Runtime → Restart and run all. That resets everything and runs from the top. |
| **Kernel crashed / "Your session crashed"** | The notebook ran out of memory. Go to Runtime → Restart and run all. If it keeps happening, the notebook may be using too much data—check if there's a "reduce data size" option in the first cell. |

Don't panic. These happen to everyone. Restart and run all usually fixes it.

---

## Suggested pace

**2–3 modules per week** = done in about a month.

- **Modules 1–6:** Do these in order. Each builds on the previous. This is the core.
- **Modules 7–10:** Do these in any order after 1–6. Pick based on what you need: clustering, embeddings, NLP, or LLMs.

Take breaks. The debug drills are meant to make you think. If you're stuck for 15 minutes, that's the point—then check the answer key.

---

## How to track progress

Each micro-lesson ends with a **checklist**. Check off each component as you complete it:

- [ ] Read micro-lesson
- [ ] Completed scenario quiz
- [ ] Finished Colab lab
- [ ] Solved debug drill
- [ ] Reviewed cheat sheet

Use the checklist at the bottom of each module page. Or keep your own list. The goal is to finish each component before moving on—don't skip the debug drill. That's where the learning happens.

---

## Ready?

Start with **Module 1: Is this even an ML problem?**

You'll learn the 7-line framing template that separates projects that ship from projects that waste six months.

→ [Start Module 1](content/module-01/micro-lesson.md)
