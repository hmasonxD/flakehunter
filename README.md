# Flakehunter — Playwright + TypeScript Test Automation Suite

An end-to-end automated test suite for a live e-commerce application
([automationexercise.com](https://automationexercise.com)), built with Playwright
and TypeScript. It demonstrates the full range of automated testing an SDET owns:
API, UI functional, end-to-end, and negative-path coverage, structured for
maintainability and wired for CI.

## What it covers

- **API testing** — hits the live REST endpoints directly via Playwright's `request` fixture (no browser): product list, brand list, and search, asserting on response bodies and status.
- **Negative-path testing** — verifies the API rejects unsupported methods (405) and missing required parameters (400), not just the happy paths.
- **UI functional testing** — product search and cart behaviour, driven through the browser.
- **End-to-end testing** — a full purchase journey: register → add to cart → checkout → pay → confirm, with the test creating and deleting its own account so it stays isolated and repeatable.
- **Regression testing** — the whole suite runs in CI on every push, catching breakage before release.

## Engineering approach

- **Page Object Model** — selectors and page actions live in `pages/`, so tests read by intent (`products.search('tshirt')`) and a markup change is a one-file fix, not a find-and-replace across the suite.
- **Stable, non-flaky tests** — actions wait on conditions (e.g. the add-to-cart confirmation modal) rather than fixed delays, eliminating race conditions. The guiding rule: wait on a condition, never on a timer.
- **Resilient locators** — favours role- and text-based locators (`getByRole`) over brittle CSS, which also keeps tests unambiguous under Playwright strict mode.
- **CI-aware config** — retries and trace-on-retry are enabled only in CI, so a genuine transient failure is retried and fully traced for diagnosis, while local runs fail fast.

## Structure

```
pages/                   Page Object Model classes
  ProductsPage.ts
  CartPage.ts
  CheckoutFlow.ts
tests/
  api/                   API tests (request fixture, no browser)
  ui/                    UI functional tests
  e2e/                   full end-to-end purchase journey
utils/
  testData.ts            unique per-run test data
playwright.config.ts     CI-aware config: retries, traces, HTML report
```

## Running it

```
npm install
npx playwright install chromium
npx playwright test            # full suite
npx playwright test tests/api  # just the API tests
npx playwright show-report     # open the HTML report
```

## Reporting

Every run produces a Playwright HTML report with step-by-step traces, and on failure, a screenshot and a full trace you can step through — the actionable defect reporting an SDET hands back to developers.
