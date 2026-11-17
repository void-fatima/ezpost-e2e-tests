# EZPost QA and Cypress E2E tests

This repository contains the existing EZPost QA planning, detailed cases,
Cypress implementation, coverage reviews, investigations and recorded evidence.
The project contents live directly at the repository root.

The application currently configured in `cypress.config.cjs` requires access to
the company network: `http://172.16.30.198:5800/`. Cloning this public repository
does not provide application access, test accounts, OTP delivery or payment access.

## Latest complete recorded ordering execution

The recorded interactive execution on **2026-11-14** used Cypress **16.2.1**,
Chrome **157.0.8103.78** and Firefox **160.0**. The ordering inventory contains
**24 tests per browser from 18 detailed case IDs**:

| Browser | Live read-only | Controlled-response | Total |
|---|---|---|---|
| Chrome | 20 passed, 0 failed | 2 passed, 2 failed | **22 passed, 2 failed** |
| Firefox | 20 passed, 0 failed | 2 passed, 2 failed | **22 passed, 2 failed** |

Final pending, skipped and not-run counts were zero. Initial failures, setup
corrections and intermediate reruns are preserved in the execution report.
The two final failures are P10-ORD01 and P10-ORD02: an older controlled quote
completion can restore a stale displayed label total after the newer selection
has rendered correctly. They do not prove a backend, cart, order or payment defect.

See the [ordering execution report](QA/Reports/EZPOST_QA_ORDERING_EXECUTION_2026-11-14.md)
and [detailed cases](QA/Test-Cases/EZPOST_QA_ORDERING_TEST_CASES.md).
Older authoring reports and some test titles retain their historical
`WRITTEN / NOT EXECUTED` checkpoint; the dated execution report records later runs.
This repository does **not** yet provide complete ordering/payment E2E coverage.

The focused **2026-11-17** follow-up visibly reran the four controlled tests in
Chrome and Firefox: **2 passed / 2 failed per browser**. A separate diagnostic
replay with no fetch/response wrapper produced the same result. These are reruns
of four existing cases, not additional ordering coverage or a new full-suite run.
See the [test-correctness review and current results](QA/Reports/EZPOST_QA_P10_TEST_CORRECTNESS_2026-11-17.md)
and [consolidated stale-quote bug](QA/Reports/EZPOST_QA_P10_STALE_QUOTE_BUG_2026-11-17.md).

The complete follow-up reports/evidence are included on
[main](https://github.com/void-fatima/ezpost-e2e-tests/tree/main) and archived on
[qa/p10-review-2026-11-17](https://github.com/void-fatima/ezpost-e2e-tests/tree/qa/p10-review-2026-11-17).
Independent branches
[test/p10-ord01-stale-quantity](https://github.com/void-fatima/ezpost-e2e-tests/tree/test/p10-ord01-stale-quantity)
and [test/p10-ord02-stale-package](https://github.com/void-fatima/ezpost-e2e-tests/tree/test/p10-ord02-stale-package)
isolate each reviewed regression change against the original published baseline.
Each preserves the legacy helper for the other unchanged case. The exact target
test bodies ran in the combined reviewed spec; these isolated branch combinations
have been statically checked and have not been separately rerun.

## Directory structure

| Path | Contents |
|---|---|
| `cypress/e2e/m01/` | Navigation, contact/trust, stage and gated requirement specs |
| `cypress/e2e/ordering/` | Read-only ordering and controlled quote specs |
| `cypress/e2e/cart/` | Isolated guest-cart handoff and supported edit/remove tests |
| `cypress/support/` | Shared helpers, commands and the mutation guard |
| `cypress/fixtures/` | Observed UI/quote fixtures and unresolved requirement inputs |
| `scripts/` | Existing interactive launchers, historical runners and static checks |
| `QA/Planning/` | Phase 1 scenario review |
| `QA/Test-Cases/` | M01 and ordering case definitions |
| `QA/Reports/` | Decisions, audits, coverage matrices and execution reports |
| `QA/Evidence/` | Reviewed historical artifacts and recorded results |

## Install

Some preserved historical screenshot filenames are long. On Windows, enable
long paths for the clone and this repository only:

```powershell
git -c core.longpaths=true clone https://github.com/void-fatima/ezpost-e2e-tests
cd ezpost-e2e-tests
git config --local core.longpaths true
```

Use the existing Node **24** setup and a supported installed Chrome/Firefox.
Install the exact dependencies from the committed lockfile, from the clone root:

```powershell
npm.cmd ci
npm.cmd run check:static
```

On a non-Windows shell use `npm` in place of `npm.cmd`. Cypress installation may
download its own application binary; binaries and `node_modules` are not committed.
No package or dependency was upgraded for publication.

## Run ordering tests visibly

The main Cypress configuration defaults to **M01** discovery. The existing
ordering launcher supplies a process-local spec-pattern override:

```powershell
node scripts/open-ordering.cjs live
```

Select `auth-entry.cy.js`, `cart-recovery.cy.js` or `product-selection.cy.js`
in the interactive E2E Specs view. The launcher opens installed Chrome.
Use Cypress's browser picker to select installed Firefox when supported.

For the separate controlled-response suite:

```powershell
node scripts/open-ordering.cjs controlled
```

Select `quote-presentation.cy.js`. Live tests use the application for public
navigation, selection and read-only quotes. Controlled tests use captured quote
replies, completion ordering and reversible browser network-error simulation.
Controlled outcomes do not establish real backend races or company-wide outages.
Opening Cypress alone does not mean a spec loaded or tests executed.

For the existing M01 interactive workflow use `node scripts/open-m01.cjs`;
read [the M01 execution instructions](cypress/README.md) before choosing specs.
Do not run every discovered spec indiscriminately: some policy/reference fixtures
remain null. Historical headless commands in older reports document earlier runs;
they are not a substitute for the current visible-execution workflow.

The shared guard permits GET/HEAD/OPTIONS and only the observed read-only quote
POST. The existing ordering scope does not submit login/OTP, add or edit carts,
create accounts/orders or initiate payments. Extending that scope requires
appropriate safe fixtures, requirements and separate authorization.

## Authorized isolated guest-cart stage — 2026-11-17

The subsequent cart stage has explicit authorization to add, edit and remove
only suite-owned items in a fresh guest session. It verifies `user: null` and
an initially empty cart, uses normal visible controls, and verifies normal
removal cleanup. A nonempty starting cart fails the prerequisite and is never
cleared by the suite. The existing network mutation guard remains unchanged:
the inspected guest cart actions required no additional mutation endpoint.

Run one focused batch visibly with the existing configuration and local Cypress:

```powershell
node scripts/check-cart-static.cjs
node scripts/check-cart-contract.cjs
node scripts/open-cart.cjs handoff chrome
node scripts/open-cart.cjs handoff firefox
node scripts/open-cart.cjs edit-remove chrome
node scripts/open-cart.cjs edit-remove firefox
```

Select the batch's `cart-handoff.cy.js` or `cart-edit-remove.cy.js` in E2E Specs.
Close the previous task-owned Cypress
application before changing browsers; concurrent app instances caused a config
initialization stall during this stage. The launcher writes separate evidence
under `QA/Evidence/Cart-Cypress/2026-11-17/`, preserves prior attempts, and disables
automatic file-change reruns. Opening the application is not test execution.

Cart assertions combine independently specified product/package/quantity intent
with one cart DOM snapshot and its explicit package-count summary. Quote-to-cart
money checks verify presentation transfer only. They do not prove business
pricing, tiers or rounding. Repeated identical-add semantics, badge units,
persistence, availability changes, retry/conflict policies and authenticated
checkout remain separately gated. No OTP, account, customer-detail submission,
order or payment operation belongs to this stage.

See the [cart contracts](QA/Test-Cases/EZPOST_QA_CART_TEST_CASES.md),
[coverage matrix](QA/Reports/EZPOST_QA_CART_COVERAGE_MATRIX.md) and
[handoff execution report](QA/Reports/EZPOST_QA_CART_HANDOFF_EXECUTION_2026-11-17.md)
for actual results, initial setup failures, cleanup and remaining gaps. Earlier
P10 failures remain open; successful settled cart handoff does not resolve them.

| Latest recorded cart batch | Chrome | Firefox |
|---|---|---|
| Handoff `CART-H01…H04` | 4 passed, 0 failed | 4 passed, 0 failed |
| Edit/remove/recovery `CART-E01…E04` | 3 passed, 1 failed | 4 passed, 0 failed |

The Chrome edit failure is `CART-E01`: its second-product quote prerequisite
was not observed within the existing request timeout, before quantity editing.
It remains unresolved and is not classified as a confirmed product defect.
All final batch tests verified normal owned-item cleanup; pending, intentional
skip and not-run counts were zero. Handoff results apply to its published batch
version; later shared-helper hardening was exercised in the edit batch, and
handoff was not rerun after that change. These are results from two focused
batches, not a single full-suite run on the final commit. See the
[edit/remove execution report](QA/Reports/EZPOST_QA_CART_EDIT_REMOVE_EXECUTION_2026-11-17.md)
for the exact attempts and evidence.

## Public evidence and local originals

The original publication included 90 reviewed screenshots; later batches have
their own dated publication audits for additional text and images.
Local account names in historical Windows paths are replaced with `LOCAL_USER`
in published metadata. Original local files are preserved without rewriting.
Invalid/black historical captures remain labelled or documented as unusable
evidence; no failure has been replaced by success.

See [publication provenance and exclusions](QA/Reports/PUBLICATION_MANIFEST.md)
for the original-to-public hash mapping and artifact limitations.

The committed `.gitattributes` marks historical metadata for a deterministic
publication clean filter. Before staging newly generated local evidence, enable
it **for this repository only**:

```powershell
git config --local filter.ezpost-public.clean "node scripts/publication-sanitize.cjs"
git config --local filter.ezpost-public.required true
```

This preserves private local originals while Git stores sanitized copies at
the same paths. The filter removes local account path components only; it is
not a credential scanner. Review every new artifact before any public push.
No filter is applied to runnable specs, support, fixtures, config or lockfiles.

Historical preservation manifests describe original local bytes. Sanitized public
copies legitimately have different hashes; keep those historical hashes as
provenance. Use `npm.cmd run check:static` for the current read-only static check.
`scripts/check-ordering-static.cjs` is an archival audit checker: it validates
original private-file hashes and writes historical audit outputs, so do not run
it against a sanitized clone as a current publication check.

Dependencies, caches, downloaded drivers, browser profiles, credentials and the
private publication audit directory remain local and are ignored. No browser
tests or application inspection were performed while publishing this repository.

## Authentication entry: latest focused batch

The 2026-11-17 authentication slice ran visibly in Cypress 16.2.1 using Chrome
157.0.8103.78 and Firefox 160.0: nine live read-only tests passed per browser
(seven reused native-form checks and two new desktop shopping-entry checks).
These results cover reaching the blank login form and native validation without
submission. Real OTP, manual-assisted login and post-login checks were not
executed because an existing ordinary account was not confirmed. Authentication
POSTs remain blocked; do not enter or submit a phone number or OTP in this slice.

Company-network access is required. Reuse the installed project dependencies:

```powershell
node scripts/check-authentication-static.cjs
node scripts/open-authentication.cjs chrome <fresh-run-label>
node scripts/open-authentication.cjs firefox <fresh-run-label>
```

The launcher opens interactive E2E mode for the two selected specs. Screenshots
and video are disabled; raw process output remains in ignored local runtime
directories. See the [authentication cases](QA/Test-Cases/EZPOST_QA_AUTHENTICATION_TEST_CASES.md)
and [execution report](QA/Reports/EZPOST_QA_AUTHENTICATION_EXECUTION_2026-11-17.md)
for exact coverage, source hashes and remaining prerequisites. This batch does
not complete authentication, the ordering journey or payment E2E coverage.

## Manual-assisted ordinary authentication: latest execution

The later 2026-11-17 batch exercised real OTP sign-in, with ordinary account
creation authorized if needed and the account retained. One assisted journey
passed in visible Chrome and one in visible Firefox on identical source bytes.
The user entered phone/OTP directly; automated checks then verified the intended
ordinary identity, account UI, immediate reload continuity and unchanged cart.
This is not unattended or fully automated OTP coverage. The observed cart was
empty; checkout returned to cart and the customer/address form was not observed.
The evidence does not distinguish new-account creation from existing-account
sign-in. Historical public-only results above remain separate.

```powershell
node scripts/check-authenticated-session-static.cjs
node scripts/open-authenticated-session.cjs chrome <fresh-run-label>
node scripts/open-authenticated-session.cjs firefox <fresh-run-label>
```

This dedicated configuration selects only `authenticated-session.cy.js` and
requires direct user interaction in the visible runner. Its separate guard
allows exactly one correlated OTP start/verify pair per browser plus the
previously established read-only product quote; cart, profile, address, order,
payment and logout mutations remain blocked. Existing read-only guards are
unchanged. Screenshots/video are disabled, raw process output is discarded,
and private browser runtime stays ignored under the EZPost evidence directory.

See the [authenticated-session contracts](QA/Test-Cases/EZPOST_QA_AUTHENTICATED_SESSION_TEST_CASES.md)
and [actual execution report](QA/Reports/EZPOST_QA_AUTHENTICATED_SESSION_EXECUTION_2026-11-17.md).
Company-network access is required. Return/merge rules, negative OTP lifecycle,
customer/address submission, ordering and payment coverage remain incomplete.
