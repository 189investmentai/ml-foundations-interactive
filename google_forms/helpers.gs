/**
 * Shared helper that builds one Google Form quiz from structured data.
 * Called by each module script (e.g. createModule01()).
 *
 * @param {string} title        - Form title
 * @param {string} description  - Form description / theme
 * @param {Array}  questions    - Array of question objects (see format below)
 * @return {string} URL of the created form
 *
 * Question object format:
 *   MC:    { q, options: [str], correct: 0-based index, feedback }
 *   Short: { q, type: 'short', expected, feedback }
 */
function buildQuizForm(title, description, questions) {
  var form = FormApp.create(title);
  form.setIsQuiz(true);
  form.setDescription(description);
  form.setProgressBar(true);
  form.setConfirmationMessage(
    'Quiz complete! Review your score above, then head back to the course hub for the next module.'
  );

  questions.forEach(function (qObj, idx) {
    var pointValue = 1;

    if (qObj.type === 'short') {
      var item = form.addParagraphTextItem();
      item.setTitle('Q' + (idx + 1) + '. ' + qObj.q);
      item.setRequired(true);
      item.setHelpText('Expected answer direction: ' + qObj.expected);
      var fb = FormApp.createFeedback().setText(qObj.feedback).build();
      item.setGeneralFeedback(fb);
    } else {
      var item = form.addMultipleChoiceItem();
      item.setTitle('Q' + (idx + 1) + '. ' + qObj.q);
      item.setRequired(true);
      item.setPoints(pointValue);

      var choices = qObj.options.map(function (opt, i) {
        return item.createChoice(opt, i === qObj.correct);
      });
      item.setChoices(choices);

      var correctFb = FormApp.createFeedback().setText('✓ Correct. ' + qObj.feedback).build();
      var wrongFb   = FormApp.createFeedback().setText('✗ Not quite. ' + qObj.feedback).build();
      item.setFeedbackForCorrect(correctFb);
      item.setFeedbackForIncorrect(wrongFb);
    }
  });

  Logger.log(title + ' → ' + form.getEditUrl());
  return form.getEditUrl();
}

/**
 * Master function: creates ALL 10 module quizzes at once.
 * Run this if you want everything in one go.
 */
function createAllQuizzes() {
  createModule01();
  createModule02();
  createModule03();
  createModule04();
  createModule05();
  createModule06();
  createModule07();
  createModule08();
  createModule09();
  createModule10();
  Logger.log('=== All 10 quizzes created. Check Logs for edit URLs. ===');
}
