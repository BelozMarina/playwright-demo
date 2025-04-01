## Description

This repository contains automated tests for a web application using Playwright. The tests cover end-to-end scenarios, UI testing, and API testing.

## Requirements

- Node.js (v16 or later)
- VSCode

## Setup

```
git clone https://github.com/BelozMarina/playwright-demo.git
cd playwright-demo
npm install
npx playwright install
```

## Running Tests

- All tests: `npx playwright test`

- Specific test: `npx playwright test tests/example.spec.ts`

- Headed mode: `npx playwright test --headed`

- Debug mode: `npx playwright test --debug`

- Specific browser: `npx playwright test --browser=chromium`

## View Reports

```
npx playwright show-report
```

## Contact

For questions, email: mar.belozerova@gmail.com.
