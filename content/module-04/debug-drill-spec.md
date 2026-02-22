# Module 4: Debug Drill Spec

**Title:** The Model That Wouldn't Stop  
**Time:** ~15 minutes  
**Goal:** Fix an XGBoost configuration that's overfitting

---

## The Setup

> A data scientist trained XGBoost with "best practices" they found online:
>
> Train AUC: 0.96
> Validation AUC: 0.68
>
> The model is overfitting badly. Find the misconfiguration.

---

## The Buggy Code

```python
import xgboost as xgb

# ===== BUGS ARE HERE =====
model = xgb.XGBClassifier(
    n_estimators=1000,
    learning_rate=0.3,     # Bug 1: Too high
    max_depth=10,          # Bug 2: Too deep
    # No early stopping!   # Bug 3: Missing
)

model.fit(X_train, y_train)  # Bug 4: No validation set
# ==========================

# Evaluate
train_auc = roc_auc_score(y_train, model.predict_proba(X_train)[:, 1])
val_auc = roc_auc_score(y_val, model.predict_proba(X_val)[:, 1])

print(f"Train AUC: {train_auc:.3f}")  # 0.962
print(f"Val AUC:   {val_auc:.3f}")    # 0.681
```

---

## The Bugs

### Bug 1: Learning rate too high (0.3)
Large learning rate means each tree has huge influence. Model converges fast but to a suboptimal solution.

### Bug 2: Trees too deep (max_depth=10)
Deep trees memorize training data. XGBoost works best with shallow trees (3-6).

### Bug 3: No early stopping
Without early stopping, all 1000 trees are used—way past the point of overfitting.

### Bug 4: No validation set in fit()
Can't use early stopping without `eval_set`.

---

## The Fix

```python
model = xgb.XGBClassifier(
    n_estimators=1000,
    learning_rate=0.05,        # Fixed: Much lower
    max_depth=4,               # Fixed: Shallow trees
    early_stopping_rounds=20,  # Fixed: Stop when val stops improving
    eval_metric='auc'
)

model.fit(
    X_train, y_train,
    eval_set=[(X_val, y_val)],  # Fixed: Provide validation set
    verbose=False
)
```

**After fix:**
```
Stopped at iteration 127
Train AUC: 0.78
Val AUC:   0.76
```

Much smaller train-val gap!

---

## What Learners Must Do

1. Identify all 4 misconfigurations
2. Fix each one
3. Retrain and verify train-val gap is reduced
4. Write postmortem

---

## Self-Check

```python
gap = train_auc - val_auc
assert gap < 0.1, f"Gap is {gap:.2f}—still overfitting"
assert model.best_iteration < 500, "Early stopping should have triggered"
print(f"✓ Fixed! Gap: {gap:.3f}, Stopped at iteration {model.best_iteration}")
```

---

## Postmortem Template

**Symptoms:**
> Training AUC (0.96) much higher than validation (0.68)—0.28 gap indicating severe overfitting.

**Root causes:**
> Four issues: (1) learning_rate=0.3 too high, (2) max_depth=10 too deep, (3) no early stopping, (4) no validation set provided to fit().

**Prevention:**
> Use sensible defaults: learning_rate=0.05, max_depth=4, always use early_stopping_rounds with eval_set. Monitor train-val gap during development.
