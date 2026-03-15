#!/usr/bin/env python3
"""
Generate Google Apps Scripts for all quizzes.
These scripts can be run in Google Apps Script to create Forms automatically.
"""

import re
from pathlib import Path

def escape_js_string(s: str) -> str:
    """Escape string for JavaScript."""
    return s.replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n').replace('\r', '')

def parse_quiz_v1(content: str) -> list:
    """Parse old format: ## Q1. Title with **A)** options."""
    questions = []
    
    q_pattern = r'## Q(\d+)\. (.+?)(?=\n\n## Q|\n---\n\n## Scoring|\Z)'
    q_matches = re.findall(q_pattern, content, re.DOTALL)
    
    for q_num, q_content in q_matches:
        lines = q_content.strip().split('\n\n')
        question_text = lines[0].strip() if lines else ""
        
        options = []
        for line in q_content.split('\n'):
            if line.startswith('**') and ')' in line:
                opt_match = re.match(r'\*\*([A-D])\)\*\* (.+)', line)
                if opt_match:
                    letter = opt_match.group(1)
                    text = opt_match.group(2)
                    is_correct = '✓' in text
                    text = text.replace('✓', '').strip()
                    options.append({
                        'letter': letter,
                        'text': text,
                        'correct': is_correct
                    })
        
        explanation = ""
        details_match = re.search(r'<details>.*?<summary>.*?</summary>\s*(.+?)</details>', 
                                   q_content, re.DOTALL)
        if details_match:
            explanation = details_match.group(1).strip()
            explanation = re.sub(r'\*\*Correct: [A-D]\*\*\s*', '', explanation)
            explanation = re.sub(r'\*\*Decision Receipt:\*\*\s*', '', explanation)
            explanation = re.sub(r'\n\n+', ' ', explanation)
            explanation = re.sub(r'\n- ', '; ', explanation)
            explanation = explanation[:400]
        
        if options:
            questions.append({
                'number': q_num,
                'text': question_text,
                'options': options,
                'explanation': explanation
            })
    
    return questions


def parse_quiz_v2(content: str) -> list:
    """Parse new format: ## Question 1 with A) B) C) D) on separate lines."""
    questions = []
    
    q_pattern = r'## Question (\d+)\s*\n\n(.+?)(?=\n---|\n## Question|\Z)'
    q_matches = re.findall(q_pattern, content, re.DOTALL)
    
    for q_num, q_content in q_matches:
        parts = q_content.strip()
        
        option_start = re.search(r'\n\n?[A-D]\)', parts)
        if option_start:
            question_text = parts[:option_start.start()].strip()
            options_text = parts[option_start.start():]
        else:
            question_text = parts
            options_text = ""
        
        # Clean up code blocks for display
        question_text = re.sub(r'```\n?', '', question_text)
        
        options = []
        opt_matches = re.findall(r'([A-D])\)\s*(.+?)(?=\n[A-D]\)|\n\n\*\*Correct|\Z)', 
                                  options_text, re.DOTALL)
        
        correct_match = re.search(r'\*\*Correct Answer:\*\*\s*([A-D])', q_content)
        correct_letter = correct_match.group(1) if correct_match else None
        
        for letter, text in opt_matches:
            text = text.strip()
            options.append({
                'letter': letter,
                'text': text,
                'correct': letter == correct_letter
            })
        
        explanation = ""
        exp_match = re.search(r'\*\*Explanation:\*\*\s*(.+?)(?=\n---|\Z)', q_content, re.DOTALL)
        if exp_match:
            explanation = exp_match.group(1).strip()
            explanation = re.sub(r'\n+', ' ', explanation)[:400]
        
        if options:
            questions.append({
                'number': q_num,
                'text': question_text,
                'options': options,
                'explanation': explanation
            })
    
    return questions


def parse_quiz(content: str) -> dict:
    """Parse a quiz.md file, auto-detecting format."""
    title_match = re.search(r'^# (.+)$', content, re.MULTILINE)
    title = title_match.group(1) if title_match else "Quiz"
    
    questions = parse_quiz_v1(content)
    if not questions:
        questions = parse_quiz_v2(content)
    
    return {'title': title, 'questions': questions}


def generate_apps_script(quiz: dict, module_num: str) -> str:
    """Generate Google Apps Script code for a quiz."""
    
    title_escaped = escape_js_string(quiz['title'])
    
    script = f'''/**
 * {quiz['title']}
 * 
 * HOW TO RUN:
 * 1. Go to https://script.google.com
 * 2. Create new project (or use existing)
 * 3. Paste this code (replace any existing code)
 * 4. Click Run → createQuiz
 * 5. Authorize when prompted
 * 6. Check your Google Drive for the new form
 * 7. Copy the published URL from the Logs
 */

function createQuiz() {{
  // Create the form
  var form = FormApp.create('{title_escaped}');
  
  // Enable quiz mode
  form.setIsQuiz(true);
  
  // Set description
  form.setDescription('Test your understanding. {len(quiz["questions"])} questions, ~{len(quiz["questions"]) + 2} minutes.\\nYou will see explanations after each answer.');
  
'''
    
    for i, q in enumerate(quiz['questions'], 1):
        q_text = escape_js_string(q['text'])
        explanation = escape_js_string(q['explanation']) if q['explanation'] else 'Correct!'
        
        script += f'''  // Question {i}
  var q{i} = form.addMultipleChoiceItem();
  q{i}.setTitle('{q_text}')
    .setPoints(1)
    .setChoices([
'''
        
        for opt in q['options']:
            opt_text = escape_js_string(f"{opt['letter']}) {opt['text']}")
            correct_str = 'true' if opt['correct'] else 'false'
            script += f'''      q{i}.createChoice('{opt_text}', {correct_str}),
'''
        
        script += f'''    ])
    .setFeedbackForCorrect(FormApp.createFeedback()
      .setText('{explanation}')
      .build())
    .setFeedbackForIncorrect(FormApp.createFeedback()
      .setText('Review the explanation after submission.')
      .build());

'''
    
    script += '''  // Log the URLs
  Logger.log('Form created successfully!');
  Logger.log('Edit URL: ' + form.getEditUrl());
  Logger.log('Published URL: ' + form.getPublishedUrl());
  
  return form.getPublishedUrl();
}
'''
    
    return script


def main():
    base_path = Path(__file__).parent.parent.parent / "content"
    output_path = Path(__file__).parent
    output_path.mkdir(exist_ok=True)
    
    all_urls = []
    
    for module_dir in sorted(base_path.glob("module-*")):
        quiz_file = module_dir / "quiz.md"
        if quiz_file.exists():
            module_num = module_dir.name.replace("module-", "")
            
            print(f"Processing Module {module_num}...")
            
            content = quiz_file.read_text()
            quiz = parse_quiz(content)
            
            if quiz['questions']:
                script = generate_apps_script(quiz, module_num)
                output_file = output_path / f"module_{module_num}_quiz.js"
                output_file.write_text(script)
                print(f"  -> Created {output_file.name} ({len(quiz['questions'])} questions)")
                all_urls.append(f"Module {module_num}: {quiz['title']}")
            else:
                print(f"  -> No questions found, skipping")
    
    # Create master runner script
    master_script = '''/**
 * MASTER QUIZ RUNNER
 * 
 * This script creates ALL module quizzes at once.
 * Run individual module scripts if you prefer one at a time.
 * 
 * HOW TO RUN:
 * 1. Copy this entire file to script.google.com
 * 2. Also copy all module_XX_quiz.js files as separate .gs files
 * 3. Run createAllQuizzes()
 */

function createAllQuizzes() {
  var urls = [];
  var functions = [
'''
    
    for i in range(1, 23):
        master_script += f'    // module_{str(i).zfill(2)}_quiz.createQuiz,\n'
    
    master_script += '''  ];
  
  Logger.log('To create all quizzes, copy each module script and run individually.');
  Logger.log('Or combine them into one project with separate .gs files.');
}
'''
    
    (output_path / "README.md").write_text(f'''# Google Apps Script Quiz Generators

## Generated Scripts

These scripts automatically create Google Forms quizzes when run in Google Apps Script.

## How to Use

### Option 1: One Quiz at a Time (Recommended)

1. Go to https://script.google.com
2. Click **New Project**
3. Delete the default code
4. Copy-paste the contents of `module_XX_quiz.js`
5. Click **Run** → **createQuiz**
6. Authorize the script when prompted
7. Check the **Logs** (View → Logs) for the form URL
8. Repeat for each module

### Option 2: All at Once

1. Create a new Apps Script project
2. Create separate files for each module (File → New → Script)
3. Name them `module_01.gs`, `module_02.gs`, etc.
4. Paste each module's code into its file
5. Run each `createQuiz()` function

## Files

| File | Module | Questions |
|------|--------|-----------|
''' + '\n'.join([f'| `module_{str(i).zfill(2)}_quiz.js` | Module {i} | 8 |' for i in range(1, 23)]) + '''

## After Creating Forms

1. Copy the "Published URL" from the script logs
2. Update the corresponding Notion module page with the quiz link
''')
    
    print(f"\nCreated README.md with instructions")


if __name__ == "__main__":
    main()
