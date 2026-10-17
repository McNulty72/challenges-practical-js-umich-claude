# Challenges — Practical JavaScript

## Project Description

This repository contains my solutions to coding challenges proposed by Claude. The goal is to practice and consolidate the concepts and skills I learn throughout Coursera's **Practical JavaScript: From Scratch to React** specialization.

## Specialization Courses

The specialization consists of the following courses:

1. **Web Development Fundamentals: HTML, CSS, and JavaScript**
2. **Building Interactive Web Applications with JavaScript**
3. **Developing Full-Stack Applications with JavaScript**
4. **Building Applications with React**

## Challenges and Final Project

The current collection covers the first two courses, which I have already completed.

It includes **27 coding challenges organized into six difficulty levels**, followed by **a final project** designed to put the concepts and skills learned into practice.

Each challenge lives in its own folder under `courses-1-2/`, named after its level and number (for example, `n2-03` is challenge 3 of level 2).

### Level 1 — JavaScript Fundamentals

- [x] [n1-01 — *Invoice calculator*](courses-1-2/n1-01/)
- [ ] n1-02 — *Credit rating classifier*
- [ ] n1-03 — *Savings plan*
- [ ] n1-04 — *Price series statistics*
- [ ] n1-05 — *Reusable functions*
- [ ] n1-06 — *Immutable portfolio*

### Level 2 — DOM Manipulation

- [ ] n2-01 — *Choose your favorite*
- [ ] n2-02 — *Dark mode and font size*
- [ ] n2-03 — *Converter with validation*
- [ ] n2-04 — *Priority task list*

### Level 3 — Events, Callbacks and Scope

- [ ] n3-01 — *Post box with shortcuts*
- [ ] n3-02 — *Stopwatch with laps*
- [ ] n3-03 — *Transaction table with event delegation*
- [ ] n3-04 — *Custom context menu*
- [ ] n3-05 — *Predict the output*

### Level 4 — Asynchronous Code and External Data

- [ ] n4-01 — *Handcrafted promises*
- [ ] n4-02 — *First fetch: ECB exchange rates*
- [ ] n4-03 — *Currency converter with query strings*
- [ ] n4-04 — *Parallel requests*
- [ ] n4-05 — *Async/await refactoring*

### Level 5 — Animation and SVG

- [ ] n5-01 — *CSS transitions*
- [ ] n5-02 — *Animation engine with easing*
- [ ] n5-03 — *Keyframes and Web Animations API*
- [ ] n5-04 — *Bar chart with SVG*
- [ ] n5-05 — *Sparkline with path*

### Level 6 — Integrative Challenges

- [ ] n6-01 — *Memory game*
- [ ] n6-02 — *Trivia quiz with an API*

### Final Project — Currency Monitor

- [ ] **Final project** — *Currency monitor*

## How to Run the Challenges

Each challenge folder contains an `index.html`, a `style.css` and a `script.js`.

- **Levels 1 to 3:** open the challenge's `index.html` in the browser. Level 1 challenges show their output in the browser console (DevTools → Console).
- **Levels 4 to 6 and the final project:** these fetch data from external APIs, so serve the folder with a local web server instead of opening the file directly. For example, from the challenge folder:

  ```bash
  python3 -m http.server
  ```

  Then open `http://localhost:8000` in the browser.

The APIs used (Frankfurter, Open-Meteo and Open Trivia DB) are free and require no API key.

## Technologies

- HTML
- CSS
- JavaScript
