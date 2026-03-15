/**
 * playground-guided.js — Shared guided walkthrough engine for all playgrounds
 * 
 * Usage:
 *   PlaygroundGuided.init({
 *     key: 'linear_regression',
 *     steps: [...],
 *     selfCheck: [...],
 *     onStepEnter: (stepIndex, stepConfig) => { ... },
 *     onModeChange: (mode) => { ... },
 *     onComplete: () => { ... }
 *   });
 */

const PlaygroundGuided = (function() {
    let config = null;
    let currentStep = 0;
    let isComplete = false;

    // ── Storage helpers ──────────────────────────────────────────

    function getStorageKey(suffix) {
        return `pg_${config.key}_${suffix}`;
    }

    function isGuidedComplete() {
        return localStorage.getItem(getStorageKey('complete')) === 'true';
    }

    function setGuidedComplete() {
        localStorage.setItem(getStorageKey('complete'), 'true');
        isComplete = true;
        saveStepIndex(0);
        broadcastProgress();
    }

    function getCurrentMode() {
        const hash = window.location.hash.replace('#', '');
        if (hash === 'guided' || hash === 'sandbox') return hash;
        const stored = localStorage.getItem(getStorageKey('mode'));
        if (stored) return stored;
        return isGuidedComplete() ? 'sandbox' : 'guided';
    }

    function setCurrentMode(mode) {
        localStorage.setItem(getStorageKey('mode'), mode);
    }

    function saveStepIndex(idx) {
        localStorage.setItem(getStorageKey('step'), String(idx));
    }

    function loadStepIndex() {
        const stored = localStorage.getItem(getStorageKey('step'));
        return stored ? parseInt(stored, 10) : 0;
    }

    function broadcastProgress() {
        const all = getAllPlaygroundKeys();
        const completed = all.filter(k => localStorage.getItem(`pg_${k}_complete`) === 'true');
        localStorage.setItem('pg_completed_keys', JSON.stringify(completed));
    }

    function getAllPlaygroundKeys() {
        return [
            'linear_regression', 'logistic_regression', 'decision_trees',
            'ensembles', 'gradient_descent', 'regularization',
            'regression_metrics', 'classification_metrics', 'feature_engineering', 'data_leakage',
            'clustering', 'embeddings', 'retrieval',
            'neural_nets', 'cnns', 'attention',
            'prompting', 'tool_calling', 'agent_memory', 'guardrails',
            'ml_pipeline', 'mlops', 'drift'
        ];
    }

    // ── HTML injection ───────────────────────────────────────────

    function injectModeTabsHTML() {
        const container = document.querySelector('.container');
        const header = container.querySelector('header');

        const tabsDiv = document.createElement('div');
        tabsDiv.className = 'mode-tabs';
        tabsDiv.id = 'modeTabs';
        tabsDiv.setAttribute('role', 'tablist');
        tabsDiv.setAttribute('aria-label', 'Playground mode');
        tabsDiv.innerHTML = `
            <button class="mode-tab" data-mode="guided" role="tab" aria-selected="false" aria-controls="pgStepCard" id="tab-guided">Guided</button>
            <button class="mode-tab" data-mode="sandbox" role="tab" aria-selected="false" id="tab-sandbox">Sandbox</button>
            <button class="pg-restart-btn" id="pgRestartBtn" title="Restart guided walkthrough" aria-label="Restart guided walkthrough">↺ Restart</button>
        `;
        header.after(tabsDiv);

        tabsDiv.querySelectorAll('.mode-tab').forEach(btn => {
            btn.addEventListener('click', () => switchMode(btn.dataset.mode));
        });

        document.getElementById('pgRestartBtn').addEventListener('click', () => {
            resetProgress();
        });
    }

    function injectProgressBarHTML() {
        const tabsEl = document.getElementById('modeTabs');
        const totalSteps = config.steps.length;

        const progressDiv = document.createElement('div');
        progressDiv.className = 'pg-progress guided-only';
        progressDiv.id = 'pgProgress';
        progressDiv.setAttribute('role', 'progressbar');
        progressDiv.setAttribute('aria-valuemin', '0');
        progressDiv.setAttribute('aria-valuemax', String(totalSteps));
        progressDiv.setAttribute('aria-valuenow', '1');
        progressDiv.setAttribute('aria-label', 'Walkthrough progress');
        progressDiv.innerHTML = `
            <span class="pg-progress-label" id="pgProgressLabel">Step 1 of ${totalSteps}</span>
            <div class="pg-progress-track">
                <div class="pg-progress-fill" id="pgProgressFill"></div>
            </div>
            <div class="pg-progress-steps" id="pgProgressDots"></div>
            <span class="pg-skip-link" id="pgSkipLink" tabindex="0" role="button">Skip to sandbox</span>
        `;
        tabsEl.after(progressDiv);

        const skipLink = document.getElementById('pgSkipLink');
        skipLink.addEventListener('click', skipToSandbox);
        skipLink.addEventListener('keydown', e => { if (e.key === 'Enter') skipToSandbox(); });
    }

    function injectStepCardHTML() {
        const progressEl = document.getElementById('pgProgress');

        const stepCard = document.createElement('div');
        stepCard.className = 'pg-step-card guided-only hidden';
        stepCard.id = 'pgStepCard';
        stepCard.setAttribute('role', 'tabpanel');
        stepCard.setAttribute('aria-labelledby', 'tab-guided');
        stepCard.innerHTML = `
            <div class="pg-step-header">
                <div class="pg-step-badge" id="pgStepBadge" aria-hidden="true">1</div>
                <div class="pg-step-title" id="pgStepTitle">Step title</div>
            </div>
            <div class="pg-step-body">
                <div class="pg-step-context" id="pgStepContext"></div>
                <div class="pg-step-question" id="pgStepQuestion"></div>
                <div class="pg-predict-options" id="pgPredictOptions" role="group" aria-label="Prediction options"></div>
                <div class="pg-reveal" id="pgReveal" aria-live="polite">
                    <div id="pgRevealText"></div>
                    <button class="pg-next-btn" id="pgNextBtn">Next Step</button>
                </div>
            </div>
        `;
        progressEl.after(stepCard);

        document.getElementById('pgNextBtn').addEventListener('click', nextStep);
    }

    function injectCompleteBannerHTML() {
        const stepCard = document.getElementById('pgStepCard');

        const banner = document.createElement('div');
        banner.className = 'pg-complete-banner';
        banner.id = 'pgCompleteBanner';
        banner.setAttribute('role', 'alert');
        banner.innerHTML = `
            <h2>Walkthrough Complete</h2>
            <p>You've built the core intuitions. Now explore freely -- try the scenarios, tweak every slider, break things.</p>
        `;
        stepCard.after(banner);
    }

    function injectSelfCheckHTML() {
        if (!config.selfCheck || config.selfCheck.length === 0) return;

        const container = document.querySelector('.container');

        const panel = document.createElement('div');
        panel.className = 'self-check-panel sandbox-only';
        panel.id = 'selfCheckPanel';
        panel.innerHTML = `
            <div class="self-check-header" id="selfCheckHeader" tabindex="0" role="button" aria-expanded="false" aria-controls="selfCheckBody">
                <span class="self-check-title">Self-Check Questions</span>
                <span class="self-check-toggle" id="selfCheckToggle">Show</span>
            </div>
            <div class="self-check-body" id="selfCheckBody" role="region" aria-label="Self-check questions"></div>
        `;
        container.appendChild(panel);

        const hdr = document.getElementById('selfCheckHeader');
        hdr.addEventListener('click', toggleSelfCheck);
        hdr.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSelfCheck(); } });
        renderSelfCheckQuestions();
    }

    // ── Progress bar rendering ───────────────────────────────────

    function renderProgressBar() {
        const total = config.steps.length;
        const dotsEl = document.getElementById('pgProgressDots');
        if (!dotsEl) return;

        dotsEl.innerHTML = '';
        for (let i = 0; i < total; i++) {
            const dot = document.createElement('div');
            dot.className = 'pg-progress-dot';
            if (i < currentStep) dot.classList.add('done');
            if (i === currentStep) dot.classList.add('active');
            dotsEl.appendChild(dot);
        }

        const fillEl = document.getElementById('pgProgressFill');
        if (fillEl) fillEl.style.width = ((currentStep / total) * 100) + '%';

        const labelEl = document.getElementById('pgProgressLabel');
        if (labelEl) labelEl.textContent = currentStep < total ? `Step ${currentStep + 1} of ${total}` : 'Complete';

        const progressEl = document.getElementById('pgProgress');
        if (progressEl) progressEl.setAttribute('aria-valuenow', String(currentStep + 1));
    }

    // ── Step management ──────────────────────────────────────────

    function enterStep(idx) {
        currentStep = idx;
        saveStepIndex(idx);
        const step = config.steps[idx];

        if (!step) {
            completeGuided();
            return;
        }

        if (config.onStepEnter) {
            config.onStepEnter(idx, step);
        }

        const card = document.getElementById('pgStepCard');
        card.classList.add('pg-step-exit');

        requestAnimationFrame(() => {
            card.classList.remove('hidden', 'pg-step-exit');
            card.classList.add('pg-step-enter');

            document.getElementById('pgStepBadge').textContent = idx + 1;
            document.getElementById('pgStepTitle').textContent = step.title;
            document.getElementById('pgStepContext').innerHTML = step.context;

            const optionsEl = document.getElementById('pgPredictOptions');
            const revealEl = document.getElementById('pgReveal');
            revealEl.classList.remove('visible');

            if (step.freeExplore) {
                document.getElementById('pgStepQuestion').textContent = step.question || '';
                optionsEl.innerHTML = '';
                const doneBtn = document.createElement('button');
                doneBtn.className = 'pg-next-btn';
                doneBtn.textContent = step.buttonText || 'Finish Walkthrough';
                doneBtn.onclick = () => enterStep(idx + 1);
                optionsEl.appendChild(doneBtn);
                doneBtn.focus();
            } else {
                document.getElementById('pgStepQuestion').textContent = step.question;
                optionsEl.innerHTML = '';
                step.options.forEach((opt, oi) => {
                    const btn = document.createElement('button');
                    btn.className = 'pg-predict-btn';
                    btn.textContent = opt.label;
                    btn.onclick = () => handlePredict(idx, opt.id, btn);
                    optionsEl.appendChild(btn);
                });
                const firstBtn = optionsEl.querySelector('.pg-predict-btn');
                if (firstBtn) firstBtn.focus();
            }

            renderProgressBar();

            setTimeout(() => card.classList.remove('pg-step-enter'), 300);
        });
    }

    function handlePredict(stepIdx, chosenId, btnEl) {
        const step = config.steps[stepIdx];
        const buttons = document.querySelectorAll('#pgPredictOptions .pg-predict-btn');

        buttons.forEach(b => {
            b.disabled = true;
            const optId = step.options.find(o => o.label === b.textContent)?.id;
            if (optId === step.correctId) {
                b.classList.add('correct');
            } else {
                b.classList.add('incorrect');
            }
        });
        btnEl.classList.add('selected');

        const revealText = (chosenId === step.correctId)
            ? step.reveal
            : `<strong>Not quite.</strong> ${step.reveal}`;
        document.getElementById('pgRevealText').innerHTML = revealText;
        document.getElementById('pgReveal').classList.add('visible');

        const nextBtn = document.getElementById('pgNextBtn');
        if (nextBtn) nextBtn.focus();
    }

    function nextStep() {
        enterStep(currentStep + 1);
    }

    function skipToSandbox() {
        completeGuided();
    }

    function completeGuided() {
        setGuidedComplete();

        const banner = document.getElementById('pgCompleteBanner');
        if (banner) {
            banner.classList.add('visible');
            setTimeout(() => banner.classList.remove('visible'), 6000);
        }

        if (config.onComplete) {
            config.onComplete();
        }

        switchMode('sandbox');
    }

    // ── Mode switching ───────────────────────────────────────────

    function switchMode(mode) {
        setCurrentMode(mode);

        document.body.classList.remove('mode-guided', 'mode-sandbox');
        document.body.classList.add('mode-' + mode);

        document.querySelectorAll('.mode-tab').forEach(tab => {
            const isActive = tab.dataset.mode === mode;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', String(isActive));
        });

        if (mode === 'guided') {
            const stepCard = document.getElementById('pgStepCard');
            if (stepCard) stepCard.classList.remove('hidden');
            enterStep(currentStep);
        } else {
            const stepCard = document.getElementById('pgStepCard');
            if (stepCard) stepCard.classList.add('hidden');
        }

        document.querySelectorAll('.pg-lockable').forEach(el => {
            if (mode === 'sandbox') {
                el.classList.remove('locked');
            }
        });

        if (config.onModeChange) {
            config.onModeChange(mode);
        }
    }

    // ── Self-check ───────────────────────────────────────────────

    function renderSelfCheckQuestions() {
        const body = document.getElementById('selfCheckBody');
        if (!body || !config.selfCheck) return;

        body.innerHTML = '';
        config.selfCheck.forEach((q, qi) => {
            const div = document.createElement('div');
            div.className = 'sc-question';
            div.innerHTML = `
                <div class="sc-prompt">${qi + 1}. ${q.prompt}</div>
                <div class="sc-options" id="sc-opts-${qi}" role="group" aria-label="Question ${qi + 1} options"></div>
                <div class="sc-explanation" id="sc-exp-${qi}" aria-live="polite">${q.explanation}</div>
            `;
            body.appendChild(div);

            const optsEl = div.querySelector('.sc-options');
            q.options.forEach(opt => {
                const btn = document.createElement('div');
                btn.className = 'sc-option';
                btn.setAttribute('role', 'button');
                btn.setAttribute('tabindex', '0');
                btn.textContent = opt.label;
                btn.onclick = () => handleSelfCheck(qi, opt.id, btn);
                btn.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSelfCheck(qi, opt.id, btn); } };
                optsEl.appendChild(btn);
            });
        });
    }

    function handleSelfCheck(qi, chosenId, btnEl) {
        const q = config.selfCheck[qi];
        const opts = document.querySelectorAll(`#sc-opts-${qi} .sc-option`);

        opts.forEach(o => {
            o.classList.add('disabled');
            o.setAttribute('tabindex', '-1');
            const optData = q.options.find(op => op.label === o.textContent);
            if (optData && optData.id === q.correctId) {
                o.classList.add('correct-reveal');
            }
        });

        btnEl.classList.add(chosenId === q.correctId ? 'correct-chosen' : 'incorrect-chosen');
        document.getElementById(`sc-exp-${qi}`).classList.add('visible');
    }

    function toggleSelfCheck() {
        const body = document.getElementById('selfCheckBody');
        const toggle = document.getElementById('selfCheckToggle');
        const header = document.getElementById('selfCheckHeader');
        const isVisible = body.classList.toggle('visible');
        toggle.textContent = isVisible ? 'Hide' : 'Show';
        header.setAttribute('aria-expanded', String(isVisible));
    }

    // ── Auto-classify existing DOM elements ──────────────────────

    function markElementsWithModeClasses() {
        document.querySelectorAll('.scenarios-bar').forEach(el => {
            if (!el.classList.contains('sandbox-only')) el.classList.add('sandbox-only');
        });
        document.querySelectorAll('.help-panel').forEach(el => {
            if (!el.classList.contains('sandbox-only')) el.classList.add('sandbox-only');
        });
    }

    // ── Keyboard navigation ──────────────────────────────────────

    function initKeyboardNav() {
        document.addEventListener('keydown', handleGlobalKeydown);
    }

    function handleGlobalKeydown(e) {
        if (!config) return;
        const mode = document.body.classList.contains('mode-guided') ? 'guided' : 'sandbox';
        if (mode !== 'guided') return;

        const tag = e.target.tagName.toLowerCase();
        if (tag === 'input' || tag === 'textarea' || tag === 'select' || e.target.isContentEditable) return;

        const revealVisible = document.getElementById('pgReveal')?.classList.contains('visible');

        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                if (revealVisible) {
                    e.preventDefault();
                    nextStep();
                }
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                if (currentStep > 0 && revealVisible) {
                    e.preventDefault();
                    enterStep(currentStep - 1);
                }
                break;
            case 'Enter':
                if (revealVisible) {
                    e.preventDefault();
                    nextStep();
                }
                break;
            case 'Escape':
                e.preventDefault();
                skipToSandbox();
                break;
        }
    }

    // ── Progress dashboard ─────────────────────────────────────

    const PLAYGROUND_LABELS = {
        linear_regression: 'Linear Regression',
        logistic_regression: 'Logistic Regression',
        decision_trees: 'Decision Trees',
        ensembles: 'Ensembles',
        gradient_descent: 'Gradient Descent',
        regularization: 'Regularization',
        regression_metrics: 'Regression Metrics',
        classification_metrics: 'Classification Metrics',
        feature_engineering: 'Feature Engineering',
        data_leakage: 'Data Leakage',
        clustering: 'Clustering',
        embeddings: 'Embeddings',
        retrieval: 'Retrieval',
        neural_nets: 'Neural Networks',
        cnns: 'CNNs',
        attention: 'Attention',
        prompting: 'Prompting',
        tool_calling: 'Tool Calling',
        agent_memory: 'Agent Memory',
        guardrails: 'Guardrails',
        ml_pipeline: 'ML Pipeline',
        mlops: 'MLOps',
        drift: 'Drift'
    };

    function injectProgressDashboard() {
        const container = document.querySelector('.container');
        if (!container) return;

        const keys = getAllPlaygroundKeys();
        const completedKeys = keys.filter(k => localStorage.getItem(`pg_${k}_complete`) === 'true');
        const pct = Math.round((completedKeys.length / keys.length) * 100);

        const panel = document.createElement('div');
        panel.className = 'pg-dashboard';
        panel.id = 'pgDashboard';
        panel.innerHTML = `
            <div class="pg-dash-header" id="pgDashHeader" tabindex="0" role="button" aria-expanded="false" aria-controls="pgDashBody">
                <div class="pg-dash-summary">
                    <span class="pg-dash-title">Your Progress</span>
                    <span class="pg-dash-count">${completedKeys.length} / ${keys.length} walkthroughs</span>
                </div>
                <div class="pg-dash-bar-mini">
                    <div class="pg-dash-bar-fill" style="width:${pct}%"></div>
                </div>
                <span class="pg-dash-toggle" id="pgDashToggle">Show</span>
            </div>
            <div class="pg-dash-body" id="pgDashBody">
                <div class="pg-dash-grid" id="pgDashGrid"></div>
            </div>
        `;
        container.appendChild(panel);

        const grid = panel.querySelector('#pgDashGrid');
        keys.forEach(k => {
            const done = localStorage.getItem(`pg_${k}_complete`) === 'true';
            const isCurrent = config && config.key === k;
            const item = document.createElement('a');
            item.className = 'pg-dash-item' + (done ? ' done' : '') + (isCurrent ? ' current' : '');
            item.href = `playground_${k}.html`;
            item.innerHTML = `
                <span class="pg-dash-check">${done ? '&#10003;' : ''}</span>
                <span class="pg-dash-label">${PLAYGROUND_LABELS[k] || k}</span>
            `;
            grid.appendChild(item);
        });

        const hdr = document.getElementById('pgDashHeader');
        hdr.addEventListener('click', toggleDashboard);
        hdr.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleDashboard(); } });
    }

    function toggleDashboard() {
        const body = document.getElementById('pgDashBody');
        const toggle = document.getElementById('pgDashToggle');
        const header = document.getElementById('pgDashHeader');
        const isVisible = body.classList.toggle('visible');
        toggle.textContent = isVisible ? 'Hide' : 'Show';
        header.setAttribute('aria-expanded', String(isVisible));
    }

    // ── Init ─────────────────────────────────────────────────────

    function init(cfg) {
        config = cfg;

        if (!config.key || !config.steps || config.steps.length === 0) {
            console.error('PlaygroundGuided: config.key and config.steps are required');
            return;
        }

        isComplete = isGuidedComplete();
        currentStep = isComplete ? 0 : loadStepIndex();

        injectModeTabsHTML();
        injectProgressBarHTML();
        injectStepCardHTML();
        injectCompleteBannerHTML();
        injectSelfCheckHTML();
        markElementsWithModeClasses();
        initKeyboardNav();
        injectProgressDashboard();

        const initialMode = getCurrentMode();
        switchMode(initialMode);

        broadcastProgress();
    }

    function getCurrentStepIndex() {
        return currentStep;
    }

    function getTotalSteps() {
        return config ? config.steps.length : 0;
    }

    function resetProgress() {
        localStorage.removeItem(getStorageKey('complete'));
        localStorage.removeItem(getStorageKey('mode'));
        localStorage.removeItem(getStorageKey('step'));
        currentStep = 0;
        isComplete = false;
        switchMode('guided');
        enterStep(0);
        broadcastProgress();
    }

    // ── Static helpers (no init needed) ──────────────────────────

    function getProgress() {
        const keys = getAllPlaygroundKeys();
        const completed = keys.filter(k => localStorage.getItem(`pg_${k}_complete`) === 'true');
        return { total: keys.length, completed: completed.length, keys, completedKeys: completed };
    }

    return {
        init,
        enterStep,
        nextStep,
        skipToSandbox,
        switchMode,
        getCurrentStep: getCurrentStepIndex,
        getTotalSteps,
        resetProgress,
        renderProgressBar,
        getProgress
    };
})();
