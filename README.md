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

- [x] [n1-01 — _Invoice calculator_](courses-1-2/n1-01/)
- [x] [n1-02 — _Credit rating classifier_](courses-1-2/n1-02/)
- [ ] n1-03 — _Savings plan_
- [ ] n1-04 — _Price series statistics_
- [ ] n1-05 — _Reusable functions_
- [ ] n1-06 — _Immutable portfolio_

### Level 2 — DOM Manipulation

- [ ] n2-01 — _Choose your favorite_
- [ ] n2-02 — _Dark mode and font size_
- [ ] n2-03 — _Converter with validation_
- [ ] n2-04 — _Priority task list_

### Level 3 — Events, Callbacks and Scope

- [ ] n3-01 — _Post box with shortcuts_
- [ ] n3-02 — _Stopwatch with laps_
- [ ] n3-03 — _Transaction table with event delegation_
- [ ] n3-04 — _Custom context menu_
- [ ] n3-05 — _Predict the output_

### Level 4 — Asynchronous Code and External Data

- [ ] n4-01 — _Handcrafted promises_
- [ ] n4-02 — _First fetch: ECB exchange rates_
- [ ] n4-03 — _Currency converter with query strings_
- [ ] n4-04 — _Parallel requests_
- [ ] n4-05 — _Async/await refactoring_

### Level 5 — Animation and SVG

- [ ] n5-01 — _CSS transitions_
- [ ] n5-02 — _Animation engine with easing_
- [ ] n5-03 — _Keyframes and Web Animations API_
- [ ] n5-04 — _Bar chart with SVG_
- [ ] n5-05 — _Sparkline with path_

### Level 6 — Integrative Challenges

- [ ] n6-01 — _Memory game_
- [ ] n6-02 — _Trivia quiz with an API_

### Final Project — Currency Monitor

- [ ] **Final project** — _Currency monitor_

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
