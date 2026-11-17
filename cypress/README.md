# M01 local execution

**Current user requirement (2026-11-14): execution must be visible on Windows.**
Use the installed local Cypress application, interactive E2E, installed Chrome:

```powershell
node scripts/open-m01.cjs
```

This invokes `cypress open --e2e --browser chrome` with the existing project config.
Select `browser/smoke.cy.js` first, then other ready browser/controlled specs.
Opening the app alone is not test execution. Confirm spec loading and actual results;
keep Cypress and Chrome open afterward. Do not select policy-dependent requirements
or fabricated-role tests. No headless run substitutes for this requirement.

Visible session results: `QA/Reports/EZPOST_QA_PHASE2_M01_INTERACTIVE_EXECUTION_2026-11-14.md`.

The commands below document historical headless runs; they are not the current M01
execution method unless the user explicitly changes the visible-execution requirement.

Current dated results: `QA/Reports/EZPOST_QA_PHASE2_M01_CYPRESS_EXECUTION_2026-11-14.md`.

Run from `C:\Users\LOCAL_USER\Desktop\EZPost` using Node 24 and the local Cypress package:

```powershell
node scripts/run-m01.cjs smoke chrome smoke-chrome-next
node scripts/run-m01.cjs safe chrome safe-chrome-next
node scripts/run-m01.cjs safe firefox safe-firefox-next
node scripts/run-m01.cjs controlled chrome controlled-chrome-next
node scripts/run-m01.cjs controlled firefox controlled-firefox-next
node scripts/run-m01.cjs history firefox history-firefox-next
npm.cmd run check:static
```

Each label must be unused; existing results are never overwritten. The runner selects
guest/public specs explicitly, records locally, and clears only its own inherited
`ELECTRON_RUN_AS_NODE` flag. It does not change machine settings or browser security.

`safe` selects real guest browser specs, including narrowly labelled stage UI and
cancelled-click subsets. `controlled` selects explicit cancellation/network-failure
harness checks. Neither selection includes `requirements` or fabricated role sessions.
`history` is a focused reproduction of the Firefox history/asset failure.

Do not run every spec indiscriminately: requirements fixtures remain null. Those tests
need independent policy/reference/fixture inputs. Missing prerequisites are not app bugs.
The policy-dependent role simulations remain unexecuted under the present guest-only scope.

Evidence is under `QA/Evidence/M01-Cypress/2026-11-14/<label>/`. Runtime browser profile
management is performed by Cypress itself; no personal browser profiles are copied.
