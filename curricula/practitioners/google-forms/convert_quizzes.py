#!/usr/bin/env python3
"""
Convert quiz.md files to Google Forms-ready markdown guides.
Handles multiple quiz formats.
"""

import os
import re
from pathlib import Path

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
            explanation = explanation[:500]
        
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
    
    # Split by question headers
    q_pattern = r'## Question (\d+)\s*\n\n(.+?)(?=\n---|\n## Question|\Z)'
    q_matches = re.findall(q_pattern, content, re.DOTALL)
    
    for q_num, q_content in q_matches:
        # Split question text from options
        parts = q_content.strip()
        
        # Find where options start (A) ...)
        option_start = re.search(r'\n\n?[A-D]\)', parts)
        if option_start:
            question_text = parts[:option_start.start()].strip()
            options_text = parts[option_start.start():]
        else:
            question_text = parts
            options_text = ""
        
        # Parse options
        options = []
        opt_matches = re.findall(r'([A-D])\)\s*(.+?)(?=\n[A-D]\)|\n\n\*\*Correct|\Z)', 
                                  options_text, re.DOTALL)
        
        # Find correct answer
        correct_match = re.search(r'\*\*Correct Answer:\*\*\s*([A-D])', q_content)
        correct_letter = correct_match.group(1) if correct_match else None
        
        for letter, text in opt_matches:
            text = text.strip()
            options.append({
                'letter': letter,
                'text': text,
                'correct': letter == correct_letter
            })
        
        # Find explanation
        explanation = ""
        exp_match = re.search(r'\*\*Explanation:\*\*\s*(.+?)(?=\n---|\Z)', q_content, re.DOTALL)
        if exp_match:
            explanation = exp_match.group(1).strip()
            explanation = re.sub(r'\n+', ' ', explanation)[:500]
        
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
    
    # Extract title
    title_match = re.search(r'^# (.+)$', content, re.MULTILINE)
    title = title_match.group(1) if title_match else "Quiz"
    
    # Try v1 format first (## Q1.)
    questions = parse_quiz_v1(content)
    
    # If no questions found, try v2 format (## Question 1)
    if not questions:
        questions = parse_quiz_v2(content)
    
    return {
        'title': title,
        'questions': questions
    }


def generate_forms_guide(quiz: dict, module_num: str) -> str:
    """Generate a Google Forms-ready markdown guide."""
    
    output = f"""# {quiz['title']} - Google Forms Setup

## Form Setup

1. Go to https://docs.google.com/forms
2. Click **+ Blank**
3. Settings → Enable **"Make this a quiz"**
4. Enable **"Release grade immediately after submission"**

---

## Form Title & Description

**Title:** {quiz['title']}

**Description:** 
Test your understanding. {len(quiz['questions'])} questions, ~{len(quiz['questions']) + 2} minutes.

---

## Questions (Copy-Paste Ready)

"""
    
    for q in quiz['questions']:
        output += f"### Question {q['number']}\n\n"
        
        q_text = q['text'].replace('\n```', '\n\n```').strip()
        output += f"**Question:**\n{q_text}\n\n"
        
        output += "**Options:**\n"
        for opt in q['options']:
            correct_mark = " ✓ CORRECT" if opt['correct'] else ""
            output += f"- {opt['letter']}) {opt['text']}{correct_mark}\n"
        
        if q['explanation']:
            output += f"\n**Feedback (add to correct answer):**\n{q['explanation']}\n"
        
        output += "\n**Points:** 1\n\n---\n\n"
    
    return output


def main():
    base_path = Path(__file__).parent.parent / "content"
    output_path = Path(__file__).parent
    
    # Find all quiz files
    for module_dir in sorted(base_path.glob("module-*")):
        quiz_file = module_dir / "quiz.md"
        if quiz_file.exists():
            module_num = module_dir.name.replace("module-", "")
            
            print(f"Processing Module {module_num}...")
            
            content = quiz_file.read_text()
            quiz = parse_quiz(content)
            
            if quiz['questions']:
                guide = generate_forms_guide(quiz, module_num)
                output_file = output_path / f"module-{module_num}-quiz-form.md"
                output_file.write_text(guide)
                print(f"  -> Created {output_file.name} ({len(quiz['questions'])} questions)")
            else:
                print(f"  -> No questions found, skipping")


if __name__ == "__main__":
    main()
