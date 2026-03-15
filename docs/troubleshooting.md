# Troubleshooting FAQ

Quick answers to common issues. If something isn't listed here, try Runtime → Restart and run all (for Colab) or refreshing the page (for playgrounds).

---

## Colab Issues

### "Runtime disconnected"

Colab disconnects your session after idle time (usually 90 minutes) or when the connection drops. Click **Reconnect** or **Connect** to get a new runtime. Your notebook is saved; re-run cells from the top to restore your state.

### "ModuleNotFoundError: No module named 'lightgbm'" (or xgboost, pandas, etc.)

Run the **pip install cell** first. Most notebooks have a cell at the top that runs `!pip install lightgbm` (or similar). Run it, wait for it to finish, then continue. Package installs don't persist across restarts—re-run that cell if you restart the runtime.

### "Your session crashed" / Out of memory (OOM)

The notebook ran out of RAM. Go to **Runtime → Restart and run all**. If it keeps crashing, look for a "reduce data size" or "use sample" option in the first cell. Free Colab has ~12GB RAM—large datasets can exceed that.

### "Cannot connect to runtime"

Try a different browser, clear cookies, or check [Colab's status page](https://status.cloud.google.com/). Sometimes Colab has temporary outages. Incognito mode can help if extensions are interfering.

### Notebook runs but gives different numbers

Small differences are normal. Random seeds, library versions, and hardware can cause slight variation. Focus on whether the *pattern* matches (e.g., AUC in the right ballpark, feature importance order). If results are wildly different, check that you ran all cells in order and didn't skip the data loading step.

---

## Google Forms Issues

### "I can't access the form"

Check the URL—make sure it's correct and not truncated. Try opening in incognito mode. Some organizations block external forms; try from a personal device or network if you're on a work machine.

### "I submitted but don't see my score"

Scores appear after submission only if the quiz creator enabled "release scores." If you don't see them, the form may be set to manual release. Your responses were still recorded.

---

## Data Issues

### "File not found" or 404 when loading data

Check your internet connection. The data is hosted on GitHub. Try the raw URL directly in your browser to confirm it loads. If GitHub is down, wait and retry. Make sure you ran the cell that downloads or loads the data before cells that use it.

### "Data looks different than expected"

Run all cells in order from the top. Earlier cells often load and preprocess the data. Skipping cells can leave you with wrong or missing variables.

---

## General

### "I'm stuck on a debug drill"

That's the point. Spend 15–20 minutes trying to find the bug. Check the symptoms (e.g., unrealistically high AUC, business metric not moving). If you're still stuck, check the answer key. The learning is in the diagnosis, not just the fix.

### "My model gives different numbers than the answer key"

Small differences are normal due to random seeds and library versions. Focus on whether your approach is correct and your metrics are in the right range. Exact reproducibility isn't required.

### "I don't understand the math"

This course avoids heavy math intentionally. If something feels too mathematical, you can skip the formula and focus on the intuition. The micro-lessons and playgrounds are designed to build understanding without proofs.
