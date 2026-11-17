# EZpost QA — Phase 2 / M01: Public Navigation and Recovery

Date: November 11, 2026 (America/Los_Angeles). Target: `http://172.16.30.198:5800/`.

**Current execution amendment — November 14, 2026:** The user's new instruction authorizes local setup and non-mutating guest Cypress execution. Appendix C and the dated execution report supersede earlier NOT EXECUTED statements only for the specifically executed subsets. All 30 IDs/parents remain. Design readiness, implementation permission, actual subset outcomes and application findings remain distinct; complete cases are not automatically passed.

**Current authoring amendment — November 11, 2026:** The latest user request authorizes Cypress authoring for supported portions of N05-TC03, N06-TC02–TC04, N08-TC01–TC04 and N09-TC01. Appendix B records the authored subsets and remaining gates. All 30 cases remain **NOT EXECUTED**. The design-only statements and readiness counts in the original review below describe the earlier documentary checkpoint; they do not prohibit the now-authorized partial authoring or imply full implementation readiness. Historical reports/evidence are unchanged.

**Design only. Every case has execution status NOT EXECUTED.** No application tests, browser journeys, external handlers, SMS, cart actions, orders, payments, or account changes were executed in this phase. No Cypress/Playwright test code, configuration or packages were created. This correction updates only the existing M01 Markdown deliverable; the Phase 1 document is unchanged.

## 1. Module scope and objectives

M01 converts N01–N09 into independently reproducible public-navigation cases. It covers guest entry, section links, navigation recovery, public browser history, contact destinations, external trust navigation, missing-product recovery, purchase-stage links, and deployment-content suitability.

The case-level split refines Phase 1: N04's public route/history contract can be proposed while selection/cart retention remains unresolved; N05's display/destination consistency is browser-checkable while native handlers remain manual; N06's exact destination needs a baseline and does not certify the merchant; N08's general guest redirect evidence establishes neither exact routing nor eligibility policy; N09 stays requirement-dependent.

No detailed C/P/A/T/J/U cases are created. A product page, empty cart and login entry are navigation fixtures only: no search/price/quantity/cart editing, OTP, authenticated workflow, form submission, payment, customization or order assertions. P12/T04 retain ownership of retention, T07 the full role×cart gate matrix, A09 post-login return, and U05–U07 the full accessibility audit. Local keyboard/scroll checks below validate only the navigation control in question.

## 2. References and evidence limitations

Sources for this correction: the complete `EZPOST_QA_PHASE1_REVIEW.md`, this complete M01 document, and the independent-review instructions in attachment `8eaa94b6-8c92-49a3-84a3-da64da9b6f8d/Pasted text.txt`. N09 originates in Phase 1. The named original `Pasted markdown(8).md` was not found in the prior workspace/attachments/Desktop/Documents/Downloads search. The inherited account of the original report is useful context, but is not a retained verbatim source for independently proving exact literals. Phase 1's claims about having read that report are provenance statements by its author; they do not supply the missing raw snapshots. No exact value is verified merely because the earlier M01 draft printed it.

The earlier design used the qa-test-planner method; this correction follows the user's independent-review instructions. Generic skill examples are not application requirements. No fresh DOM or browser inspection was performed. Available application evidence is **historical secondary reporting**, not current reproduction, and no locator is presented as verified against today's DOM. Document verification date: November 11, 2026. There is no new DOM observation date or inspected current route to report.

| Evidence | M01-relevant historical observation | Limit |
|---|---|---|
| E1 | Persian/RTL shell; logo/home, product/process/contact anchors, account/cart, skip and top links | Not full keyboard/visual conformance or retention proof |
| E2/E4 | Phase 1 §2.2 and §3.1 N03: public catalog/product pages and breadcrumbs | Exact Black Friday route/title and breadcrumb destinations not independently established here; no fixed product count |
| E3 | Phase 1 §2.2 E3: q/category URL composition | Does not establish exact section fragments; matching/filter assertions outside M01 |
| E6 | Phase 1 §2.2 E6: empty cart, four-step indicator and checkout link | Exact stage labels, product/cart Previous/Next existence, disabled states and destinations are not established by that ledger |
| E7 | Phase 1 §2.2 E7 and §3.4 A09: mobile entry and guest checkout redirect | Exact redirect syntax is inherited, not independently sourced here; login return-store control/label/destination unverified |
| E8 | Mobile menu opening and product bar sampled | No Firefox/device verification or complete menu lifecycle |
| E9 | Telephone/email and external eNAMAD link | Native handlers, external page and certification not inspected |
| E10 | Unknown-product 404 and store-recovery control | No guarantee the old synthetic slug stays nonexistent |
| I2 / N09 | Apparent test/placeholder catalog content | Deployment audience and release policy unresolved |

Original browser coverage was isolated guest Chrome reporting version 157, with sampled desktop 1366×900 and mobile viewport 390×844. Existing user tabs were inaccessible; Firefox was not inspected. This phase adds no browser coverage. Future required coverage is Chrome and Firefox desktop; marked narrow-layout checks are viewport checks, not physical-device proof.

### 2.1 Shared execution prerequisites and data contract

Every case's Preconditions field incorporates **GP**: later execution must use an independently controlled guest context, never an existing administrator/user profile; no copied authentication; a reachable target at the actual private origin; a recorded build/date/browser/viewport; a current read-only baseline of the named controls/fixtures; and separate approval to execute after independent review. A clean context means browser state isolation; it does not prove all server cart state is empty. Cases needing emptiness additionally require an approved verified empty guest state. If unavailable, block rather than deleting stored data.

GP also requires explicit review of the proposed route/content-coherence criteria. They are proposed acceptance rules, not previously approved business requirements. Record an approved finite navigation/readiness timeout before implementation; a route or required page signature absent at that bound is a failure, rather than an indefinite wait. A missing/unapproved fixture is BLOCKED, not an application failure. A baseline must be recorded and reviewed before the test run; never learn an expected destination or exact text from the same action being judged. The evidence ledger in appendix A governs every occurrence of a value below.

The steps describe future user actions, not actions performed now. Ordinary browsing GET/navigation is permitted only in that later approved execution. No direct application API, source, database, hidden state, arbitrary cookie changes or unsupported setup/cleanup is required. On current-baseline drift, report the difference and re-review the affected oracle; do not silently replace fixtures or declare a historical value an immutable business rule.

| Data key | Supported target, quarantined input candidate or missing baseline requirement |
|---|---|
| ROOT | `http://172.16.30.198:5800/` |
| SECTIONS | **UNVERIFIED — CURRENT BASELINE REQUIRED** for the old exact fragments. Supply NAV: a reviewed per-source mapping of semantic section, actual link name, full destination and target heading/signature; header, hero, closing CTA and nested header must be separate entries |
| PRODUCT | Input fixture candidate only: `/products/blackfri-01`, old title `بلک فرایدی`. **UNVERIFIED — CURRENT BASELINE REQUIRED** for these exact values. Before execution, approve a still-public product route/title and its ROOT link; no immutable slug/title assertion |
| CART | Input fixture candidate `/cart`; exact path **UNVERIFIED — CURRENT BASELINE REQUIRED**. Approve current empty-cart route/signature and independently empty guest state |
| LOGIN | Input fixture candidate `/login`; exact path **UNVERIFIED — CURRENT BASELINE REQUIRED**. Approve public mobile-entry route/signature without submission |
| MISSING | Input candidate `/products/qa-missing-984731`; **UNVERIFIED — CURRENT BASELINE REQUIRED** for current nonexistence. Approve route/error signature without deleting a product |
| PHONE / EMAIL | Supply current rendered contact text and actual `tel:`/`mailto:` destination in a dated, reviewed contact baseline. Exact old values are audited in appendix A; no fixed display-format oracle is retained. Comparison proves representation consistency, not authoritative contact ownership |
| TRUST | **UNVERIFIED — CURRENT BASELINE REQUIRED**. Supply a reviewed full public eNAMAD scheme/host/path/query, source link name and route/date; no id/Code value is assumed. Appendix A quarantines the old literal |
| RECOVERY | **UNVERIFIED — CURRENT BASELINE REQUIRED**. Supply missing-page recovery control name and approved destination (ROOT is a proposal, not independently established here); record a distinct error signature without requiring old Persian wording |
| LOGIN-RETURN / BREADCRUMBS / TOP | **UNVERIFIED — CURRENT BASELINE REQUIRED** for exact names and destinations. Supply reviewed source-specific mappings. TOP's proposed same-home top-visibility criterion needs Q03 approval |
| STAGE-NAV | **UNVERIFIED — CURRENT BASELINE REQUIRED**. Independently record indicator labels/order/current state, actual Previous/Next controls, their semantics, and destinations for each specified entry sequence; then obtain policy approval. An indicator is not evidence of any control |
| DESKTOP / NARROW | 1366×900 / 390×844 CSS-pixel sampling candidates, not an approved universal device-support claim |
| CONTENT-POLICY | Missing owner-approved deployment audience, allowed catalog/content and legitimate exceptions; no fabricated manifest |
| GATE-ROW | Missing approved navigation eligibility row: role, cart state, entry route, intended destination/feedback; fixture must be supplied without M01 creating cart/customer data |
| EXTERNAL-FAULT | Missing approved browser-only, external-host-scoped unavailability procedure; must leave ROOT available and restore browser connectivity without modifying application/network services |

### 2.2 Readiness, expected results and counting

Evidence fields distinguish Phase 1's secondary feature evidence, proposed acceptance criteria, and missing exact baselines/requirements. "Observed E#" in an unchanged case means only that secondary feature support, subject to appendix A; it never verifies an exact string. Approval of Phase 1 authorized design, not inferred UX criteria. Exact unsupported destinations are blocked rather than passed off as recorded regression oracles. A fixture-only path/name may remain a GP data gate where the designed assertion is route-independent; an essential missing destination/control policy blocks the whole case.

One primary feasibility per case: **Cypress-ready subset** (counted as Cypress-design-ready), **Partial**, **Manual**, or **Blocked**. These are design dispositions, not assertions that a runner exists or implementation is approved. A child may have a browser-checkable subset even when its broad Phase 1 parent was manual/blocked. No whole parent is silently reclassified.

All cases share basic GP/runner/current-baseline gates. Additional access/environment counts in section 11 cover only special native-handler, external-host/fault, external-identity or role/cart-fixture needs. Business-rule flags cover essential unresolved content, certification and eligibility decisions; these flags can overlap and do not double-count cases in primary feasibility totals.

Blocked proposals specify gates and a conditional comparison against supplied rules. Their missing result is explicitly **not an executable acceptance oracle**. There is no assumed status code, retry control, merchant identity, customer destination or approved catalog where evidence is absent.

## 3. Scenario readiness assessment

| Scenario | Supported behavior / customer action | Missing or uncertain behavior | Design readiness | Automation feasibility | Required prerequisites | Evidence / overlap boundary |
|---|---|---|---|---|---|---|
| N01 | Guest opens/reloads/returns to ROOT; sees public entry points | Current content/build; supported browser versions; no fixed catalog count | Public structure ready for design | Cypress-ready subset | GP and current public baseline | E1/E2; no catalog correctness or speed assertions |
| N02 | E1 supports section anchors generally | Exact labels/fragments and source-specific mappings; Q03 focus/visibility approval | All 5 cases blocked on NAV/criteria | Blocked; later keyboard/manual split | GP and reviewed NAV; no exact labels invented | E1 does not prove every hero/closing/nested control; full U audit excluded |
| N03 | General logo/breadcrumb/top recovery evidence | Exact breadcrumb/login-return targets; current top control and Q03 | Logo design ready; top Partial; two target cases blocked | 1 ready / 1 Partial / 2 Blocked | GP, PRODUCT; BREADCRUMBS/LOGIN-RETURN/TOP | E7 does not prove login return control; no retention promise |
| N04 | Public history and product direct URL/refresh match visible page | Selection/cart retention and authenticated history | Public subset ready; retention excluded/gated in register | Cypress-ready subset | GP and known public PRODUCT | E1/E4; N01 owns root refresh; P12/T04 own retained state |
| N05 | General phone/email links; representation-agreement design | Exact display baseline, contact authority and native handler behavior | Two relational designs ready; safe preview Manual | 2 ready / 1 Manual | GP/current contact fixture; safe preview setup | E9 does not prove exact old displayed strings or mailbox/service validity |
| N06 | General eNAMAD link and verification intent | Exact URL/parameters, real tab flow, faults and merchant evidence | All 4 cases blocked | Blocked; later native/manual boundaries remain | Approved TRUST; EXTERNAL-FAULT/authority where applicable | E9 proves link existence only |
| N07 | General missing-product/recovery evidence | Exact recovery name/destination; old wording unverified | Missing-state/reload designs ready; recovery/history gated | 2 ready / 2 Blocked | GP/MISSING; RECOVERY and native history method for gated cases | No exact Persian text oracle; no history insertion policy invented |
| N08 | E6 four-step indicator; E7 guest redirect generally | Indicator literals, actual controls, disabled states, exact targets and eligibility policies | All 4 cases blocked | Blocked | STAGE-NAV/GATE-ROW and safe fixtures | Separate observed feature from proposed controls and business policy; T07/A09 scope preserved |
| N09 | Guest-visible content can be compared with an approved audience policy | Audience and allowed catalog are absent | Requirement-dependent proposal only | Blocked | CONTENT-POLICY and current guest inventory | E2/I2/Phase 1 N09; no products changed |

## 4. Detailed M01 test cases

Each numbered step has its observable expected result alongside it. Case-local state is established within its preconditions/steps, not by execution of a previous test. Generic GP and appendix A's literal provenance audit apply to every case. Browser coverage codes: **CF** = later Chrome and Firefox desktop; **CF-N** = CF plus the named narrow-layout subcheck when the same control is actually present; **CF-native** = supported desktop browser/OS combinations for manual handlers. No Safari/physical-mobile coverage is implied.

### N01-TC01 — Fresh guest opens the public storefront

| Field | Value |
|---|---|
| Test Case ID | N01-TC01 |
| Parent Scenario | N01 |
| Test Title | Fresh guest opens the public storefront |
| Objective | Establish unauthenticated access to the public entry page and navigation entry points |
| Priority | P1 — loss of entry blocks public journeys |
| Test Type | Positive; Navigation |
| Evidence Basis | Observed E1/E2; Inferred coherent route/content |
| Preconditions | GP; fresh isolated guest; DESKTOP; no existing target tab in this context |
| Test Data | ROOT; recorded logo, product/process/contact, account and cart links; no product-count oracle |
| Automation Feasibility | Cypress-ready subset |
| Dependencies | Reachable independent runner and current public-shell baseline; CF |
| Execution Status | NOT EXECUTED |
| Notes | Guest evidence comes from context isolation/public page, not an auth API or admin session |

| Test Steps | Expected Results |
|---|---|
| 1. Enter ROOT in the isolated browser address bar. | ROOT loads as the public storefront rather than requiring login; the main content can be read. Record an unexpected redirect as baseline drift/failure for review. |
| 2. Inspect the public header and main content without activating purchase/account actions. | EZpost identity and public navigation entry points for products/process/contact, cart and account are present as recorded. Catalog content is not required to contain eight items. |

**Postconditions:** Guest remains on ROOT; no form submission or stored-record mutation performed by the case.

### N01-TC02 — Refresh the root page

| Field | Value |
|---|---|
| Test Case ID | N01-TC02 |
| Parent Scenario | N01 |
| Test Title | Refresh the root page |
| Objective | Verify a root-page refresh preserves public route availability |
| Priority | P1 — refresh must not strand visitors |
| Test Type | Recovery; Navigation |
| Evidence Basis | Observed E1 public route; Inferred refresh consistency |
| Preconditions | GP; ROOT loaded independently; DESKTOP |
| Test Data | ROOT without query or fragment |
| Automation Feasibility | Cypress-ready subset |
| Dependencies | CF; current public identity/header baseline |
| Execution Status | NOT EXECUTED |
| Notes | No assertion about scroll restoration, product ordering, cache, performance or selections |

| Test Steps | Expected Results |
|---|---|
| 1. Confirm ROOT is the current public route, then use browser Refresh. | Reload completes at ROOT with a readable public storefront rather than an unexplained blank/error/login page. |
| 2. Inspect the logo and public navigation after rendering settles. | Entry points remain available and correspond to the root page; no stale product/error content is presented as the page. |

**Postconditions:** ROOT loaded in the guest context; no retained customer state assumed.

### N01-TC03 — Return to the site in the same guest context

| Field | Value |
|---|---|
| Test Case ID | N01-TC03 |
| Parent Scenario | N01 |
| Test Title | Return to the site in the same guest context |
| Objective | Verify public access when revisiting after a prior public visit |
| Priority | P1 — returning visitors need an available entry page |
| Test Type | Positive; Navigation |
| Evidence Basis | Observed E1/E2; Inferred repeat-visit availability |
| Preconditions | GP; DESKTOP; ROOT opened once within this case; no login/cart mutation |
| Test Data | ROOT; LOGIN as another known public page on the same origin; no login form input |
| Automation Feasibility | Cypress-ready subset |
| Dependencies | CF; current public LOGIN entry available without submission |
| Execution Status | NOT EXECUTED |
| Notes | Revisit differs from refresh/history; it does not specify cookie persistence or returning-user personalization |

| Test Steps | Expected Results |
|---|---|
| 1. Navigate directly from the already visited ROOT to LOGIN in the same tab/context, without entering or submitting a number. | Public login entry replaces home content; no SMS, logout, account or cart action has been performed. |
| 2. Enter ROOT again as a direct address. | Public EZpost root content and navigation reappear without authentication. Do not expect the old scroll, catalog order or selections. |

**Postconditions:** ROOT revisited as a guest; no hidden cleanup or persistent-state expectation.

### N02-TC01 — Header links reach their public page or section destinations

| Field | Value |
|---|---|
| Test Case ID | N02-TC01 |
| Parent Scenario | N02 |
| Test Title | Header links reach their public page or section destinations |
| Objective | Verify each header control against its independent page/anchor mapping; record section alignment separately |
| Priority | P1 — primary public discovery |
| Test Type | Positive; Navigation |
| Evidence Basis | Phase 1 section 2.2 E1 supports section anchors only; exact source labels/fragments and per-source mappings are UNVERIFIED — CURRENT BASELINE REQUIRED (appendix A) |
| Preconditions | GP; DESKTOP ROOT reset independently for each data row |
| Test Data | Reviewed NAV entries for this case's source region and semantic section; no old Persian label or exact fragment is an oracle |
| Automation Feasibility | Blocked |
| Dependencies | Missing NAV source/control/destination/target signatures; Q03 approval for focus or unobscured-heading criteria; then CF |
| Execution Status | NOT EXECUTED |
| Notes | Conditional design only. Do not execute or infer the expected fragment from the link activated during the same run. Missing mappings block the case; visual criteria remain proposals until Q03 approval. |

| Test Steps | Expected Results |
|---|---|
| 1. Obtain the reviewed NAV rows for products, process and contact in the home header; independently reset ROOT for each supplied row. | Without those rows retain BLOCKED. Each row must identify the control, full expected destination and distinct target signature in advance. |
| 2. After baseline and case approval, activate the row's header control. | Path and, for an anchor row, fragment equal the independently recorded mapping; the corresponding page/section identity renders. Current baseline regression and approved intended destination remain distinct (Appendix C). |
| 3. Record target geometry and heading visibility after layout settles. | Treat obscured-heading/readability observations as findings for Q03 review; only an explicitly approved visibility criterion is a pass/fail rule. |

**Postconditions:** Guest at the mapped public page or section; no filter/search/selection state asserted.

### N02-TC02 — Home-page call-to-action links reach public pages or sections

| Field | Value |
|---|---|
| Test Case ID | N02-TC02 |
| Parent Scenario | N02 |
| Test Title | Home-page call-to-action links reach public pages or sections |
| Objective | Verify each source CTA against an independently recorded page/anchor destination and distinct main content |
| Priority | P1 — main discovery calls to action |
| Test Type | Positive; Navigation |
| Evidence Basis | Phase 1 section 2.2 E1 supports section anchors only; exact source labels/fragments and per-source mappings are UNVERIFIED — CURRENT BASELINE REQUIRED (appendix A) |
| Preconditions | GP; DESKTOP; independent ROOT per data row; scroll to source control without using the target link first |
| Test Data | Reviewed NAV entries for this case's source region and semantic section; no old Persian label or exact fragment is an oracle |
| Automation Feasibility | Blocked |
| Dependencies | Missing NAV source/control/destination/target signatures; Q03 approval for focus or unobscured-heading criteria; then CF |
| Execution Status | NOT EXECUTED |
| Notes | Conditional design only. Do not execute or infer the expected fragment from the link activated during the same run. Missing mappings block the case; visual criteria remain proposals until Q03 approval. |

| Test Steps | Expected Results |
|---|---|
| 1. Obtain separate reviewed NAV entries for each actual hero and closing CTA; do not presume the old three controls exist. | Missing source/control/destination mapping retains BLOCKED. Reconcile absent controls with scope before implementation. |
| 2. After approval, independently open ROOT and activate each supplied source CTA. | The destination and distinct package/process target signature match the preapproved row. Wrong route, wrong target or no navigation by the readiness bound fails. |
| 3. Record perceived target alignment. | No unobscured-heading or scroll-position pass/fail is imposed until Q03 is approved. |

**Postconditions:** Guest at the mapped page or section; no stored changes.

### N02-TC03 — Open a section fragment directly

| Field | Value |
|---|---|
| Test Case ID | N02-TC03 |
| Parent Scenario | N02 |
| Test Title | Open a section fragment directly |
| Objective | Verify shared direct section links align route, fragment and rendered destination |
| Priority | P1 — visitors may enter through shared links |
| Test Type | Boundary; Navigation |
| Evidence Basis | Phase 1 section 2.2 E1 supports section anchors only; exact source labels/fragments and per-source mappings are UNVERIFIED — CURRENT BASELINE REQUIRED (appendix A) |
| Preconditions | GP; DESKTOP; fresh target tab/state independently for each row |
| Test Data | Reviewed NAV entries for this case's source region and semantic section; no old Persian label or exact fragment is an oracle |
| Automation Feasibility | Blocked |
| Dependencies | Missing NAV source/control/destination/target signatures; Q03 approval for focus or unobscured-heading criteria; then CF |
| Execution Status | NOT EXECUTED |
| Notes | Conditional design only. Do not execute or infer the expected fragment from the link activated during the same run. Missing mappings block the case; visual criteria remain proposals until Q03 approval. |

| Test Steps | Expected Results |
|---|---|
| 1. Obtain the reviewed full direct URLs and target signatures from NAV; use a fresh target entry for each. | No guessed fragment is used; absence of NAV retains BLOCKED. |
| 2. After approval, enter the supplied full URL directly. | Root route/fragment and the independently named target signature match that row at the readiness bound; lost fragment, wrong section or blank/error main content fails. Visual alignment is separately subject to Q03. |

**Postconditions:** Guest at directly linked section; no inferred authentication or persistence.

### N02-TC04 — Nested product header reaches its public page or section destination

| Field | Value |
|---|---|
| Test Case ID | N02-TC04 |
| Parent Scenario | N02 |
| Test Title | Nested product header reaches its public page or section destination |
| Objective | Detect fragment-only navigation accidentally remaining on a nested route |
| Priority | P1 — public navigation must work outside the home page |
| Test Type | Navigation; Recovery |
| Evidence Basis | Phase 1 section 2.2 E1 supports section anchors only; exact source labels/fragments and per-source mappings are UNVERIFIED — CURRENT BASELINE REQUIRED (appendix A) |
| Preconditions | GP; DESKTOP PRODUCT loaded independently for each selected section row |
| Test Data | Reviewed NAV entries for this case's source region and semantic section; no old Persian label or exact fragment is an oracle |
| Automation Feasibility | Blocked |
| Dependencies | Missing NAV source/control/destination/target signatures; Q03 approval for focus or unobscured-heading criteria; then CF |
| Execution Status | NOT EXECUTED |
| Notes | Conditional design only. Do not execute or infer the expected fragment from the link activated during the same run. Missing mappings block the case; visual criteria remain proposals until Q03 approval. |

| Test Steps | Expected Results |
|---|---|
| 1. Obtain nested-header NAV rows; open the independently approved PRODUCT for each row. | Each row specifies page/anchor type, independent destination and distinct main signature in advance; missing intended policy remains unresolved. |
| 2. After approval, activate that product-header control. | Browser reaches the mapped page or section; remaining on PRODUCT or showing stale product main content fails. Current dated baseline runs are reported separately in Appendix C; no retained selection is required. |

**Postconditions:** Guest on the mapped public page or section, without purchasing or changing selections.

### N02-TC05 — Keyboard activates a section link visibly

| Field | Value |
|---|---|
| Test Case ID | N02-TC05 |
| Parent Scenario | N02 |
| Test Title | Keyboard activates a section link visibly |
| Objective | Verify keyboard reachability and activation of the observed header section links |
| Priority | P1 — navigation access for keyboard users |
| Test Type | Accessibility; Navigation; Manual |
| Evidence Basis | Phase 1 section 2.2 E1 supports section anchors only; exact source labels/fragments and per-source mappings are UNVERIFIED — CURRENT BASELINE REQUIRED (appendix A) |
| Preconditions | GP; DESKTOP ROOT per target row; keyboard only; link baseline recorded |
| Test Data | Reviewed NAV entries for this case's source region and semantic section; no old Persian label or exact fragment is an oracle |
| Automation Feasibility | Blocked |
| Dependencies | Missing NAV source/control/destination/target signatures; Q03 approval for focus or unobscured-heading criteria; then CF |
| Execution Status | NOT EXECUTED |
| Notes | Conditional design only. Do not execute or infer the expected fragment from the link activated during the same run. Missing mappings block the case; visual criteria remain proposals until Q03 approval. |

| Test Steps | Expected Results |
|---|---|
| 1. Obtain NAV and explicit Q03 approval of local keyboard/focus criteria plus a supported keyboard/manual method. | Until essential mappings/criteria exist retain BLOCKED; resolving them does not eliminate the human focus-visibility portion. |
| 2. After approval, use Tab/Shift+Tab to reach the supplied header link, then Enter. | Against the approved criterion the link receives perceivable focus and reaches the supplied NAV destination/target. Inability to reach or activate it is a failure; no fixed tab count or heading-focus transfer is prescribed. |

**Postconditions:** Guest at the selected section; keyboard focus behavior recorded for review, no conformance claim.

### N03-TC01 — Product-page logo returns home

| Field | Value |
|---|---|
| Test Case ID | N03-TC01 |
| Parent Scenario | N03 |
| Test Title | Product-page logo returns home |
| Objective | Verify the brand/logo home destination from a nested product page |
| Priority | P2 — secondary recovery navigation |
| Test Type | Positive; Navigation |
| Evidence Basis | Observed E1/E4; Inferred route/content coherence |
| Preconditions | GP; DESKTOP; PRODUCT directly loaded within this case |
| Test Data | Approved PRODUCT fixture; semantic brand/home link; ROOT. Exact old accessible name is UNVERIFIED — CURRENT BASELINE REQUIRED and is not an equality assertion. |
| Automation Feasibility | Cypress-ready subset |
| Dependencies | CF; current accessible logo link |
| Execution Status | NOT EXECUTED |
| Notes | No filter, scroll or package-retention promise; a visual logo without a discoverable link needs baseline review |

| Test Steps | Expected Results |
|---|---|
| 1. Activate the product-page brand/logo home link. | Under the proposed home-navigation contract, browser reaches ROOT. A different destination or no completed navigation at the approved readiness bound fails after case approval. |
| 2. Inspect main content after navigation settles. | Public home content replaces product-detail main content; public navigation remains available. |

**Postconditions:** Guest on ROOT; no purchase or state cleanup.

### N03-TC02 — Product breadcrumbs reach their named destinations

| Field | Value |
|---|---|
| Test Case ID | N03-TC02 |
| Parent Scenario | N03 |
| Test Title | Product breadcrumbs reach their named destinations |
| Objective | Verify each observed clickable breadcrumb destination from PRODUCT |
| Priority | P2 — contextual navigation recovery |
| Test Type | Positive; Navigation |
| Evidence Basis | Phase 1 section 3.1 N03 supports breadcrumbs generally; exact ancestor names and per-link destinations unverified (appendix A) |
| Preconditions | GP; DESKTOP; reload PRODUCT independently for each row |
| Test Data | BREADCRUMBS: reviewed source-specific ancestor control names and destinations; PRODUCT; no assumed clickable current item |
| Automation Feasibility | Blocked |
| Dependencies | Missing BREADCRUMBS destination mapping, then CF; no prior mapping is treated as observed |
| Execution Status | NOT EXECUTED |
| Notes | Only observed linked ancestors are activated; no invented product breadcrumb link or filter preservation |

| Test Steps | Expected Results |
|---|---|
| 1. Obtain approved BREADCRUMBS entries, then independently open PRODUCT for each linked ancestor. | Missing mappings retain BLOCKED; each destination and target identity is known before activation. |
| 2. After approval, activate the supplied ancestor. | Path and, where applicable, fragment and independent page/section identity match that ancestor's row. A third destination, wrong main content or no completed navigation fails; current baseline runs do not approve K1 policy (Appendix C). |

**Postconditions:** Guest on the named public destination; no asserted selection retention.

### N03-TC03 — Login entry offers a store return without submission

| Field | Value |
|---|---|
| Test Case ID | N03-TC03 |
| Parent Scenario | N03 |
| Test Title | Login entry offers a store return without submission |
| Objective | Verify an observed return-to-store control restores public browsing |
| Priority | P2 — escape from the account entry page |
| Test Type | Recovery; Navigation |
| Evidence Basis | Phase 1 E7 supports mobile entry, not exact return-store control/name/destination; UNVERIFIED — CURRENT BASELINE REQUIRED |
| Preconditions | GP; DESKTOP; direct LOGIN loaded; no phone value entered or SMS requested |
| Test Data | LOGIN; missing reviewed LOGIN-RETURN control and destination |
| Automation Feasibility | Blocked |
| Dependencies | Confirm public LOGIN-RETURN presence, name and intended public destination before implementation; then CF |
| Execution Status | NOT EXECUTED |
| Notes | No control or form-button text is an exact oracle. ROOT return is proposed, not confirmed by E7. |

| Test Steps | Expected Results |
|---|---|
| 1. Obtain the dated LOGIN-RETURN mapping and approved intended destination; directly open LOGIN without entering a number. | Absent mapping retains BLOCKED; no SMS-safe submit path is needed for this navigation-only case. |
| 2. After approval, activate only that return link. | Preapproved public destination and page signature render without form submission. Wrong destination, retained login main content or navigation timeout fails. |

**Postconditions:** Guest at ROOT; no SMS, login or registration attempted.

### N03-TC04 — Footer back-to-top restores the home-page top

| Field | Value |
|---|---|
| Test Case ID | N03-TC04 |
| Parent Scenario | N03 |
| Test Title | Footer back-to-top restores the home-page top |
| Objective | Verify the observed top link's destination and visible top-of-page recovery |
| Priority | P2 — recovery after reading a long page |
| Test Type | Recovery; Navigation; Manual |
| Evidence Basis | Phase 1 E1 supports a back-to-top feature; exact label/href unverified; same-home top recovery is a proposed Q03 criterion |
| Preconditions | GP; ROOT independently opened; scroll down until footer top link is visible; DESKTOP and NARROW variants |
| Test Data | Reviewed TOP control on ROOT; exact old label/href is UNVERIFIED — CURRENT BASELINE REQUIRED |
| Automation Feasibility | Partial |
| Dependencies | CF-N; current footer; manual visual scroll confirmation |
| Execution Status | NOT EXECUTED |
| Notes | Partial for the visual/geometry split. Q03 must approve top recovery before a failure is judged; no exact href, scroll pixel, animation or focus policy is asserted. |

| Test Steps | Expected Results |
|---|---|
| 1. Record/review the actual TOP control and obtain Q03 approval, then independently open ROOT and scroll until that footer control is visible. | If baseline/criterion is missing, the affected portion is blocked for execution; do not infer an exact link name or href. |
| 2. After approval, activate the supplied TOP control. | Under the proposed same-home contract the root pathname remains active and header/hero becomes visible after settling. Wrong page or failure to restore top at the approved readiness bound fails only against the approved criterion; exact fragment and scroll offset are not prescribed. |

**Postconditions:** Guest at ROOT; visual position recorded; no persisted scroll guarantee for later visits.

### N04-TC01 — Back and Forward keep home/product history coherent

| Field | Value |
|---|---|
| Test Case ID | N04-TC01 |
| Parent Scenario | N04 |
| Test Title | Back and Forward keep home/product history coherent |
| Objective | Verify browser history restores the matching public route and page identity |
| Priority | P1 — routine browser navigation must not show the wrong page |
| Test Type | Navigation; Recovery |
| Evidence Basis | Observed E1/E4 linked product; Inferred history consistency |
| Preconditions | GP; DESKTOP; ROOT independently loaded; PRODUCT still appears as a public link; no selection/cart edits |
| Test Data | Approved ROOT-linked PRODUCT route and distinct product identity from GP; no old literal title assertion |
| Automation Feasibility | Cypress-ready subset |
| Dependencies | CF; current public product fixture and native history support |
| Execution Status | NOT EXECUTED |
| Notes | Proposed ROOT-to-PRODUCT Back/Forward contract requires case approval. PRODUCT is a fixture-only baseline gate; source-link push versus replace must be reviewed if observed behavior differs. No saved price, quantity, scroll or selection is required. |

| Test Steps | Expected Results |
|---|---|
| 1. Follow the observed PRODUCT link from ROOT. | PRODUCT route and matching product identity display. |
| 2. Use browser Back once. | ROOT returns with home main content, not a stale product page. |
| 3. Use browser Forward once. | PRODUCT route returns with the matching product identity. No saved selection is required. |

**Postconditions:** Guest on PRODUCT; history established entirely within this case.

### N04-TC02 — Direct product link survives Refresh

| Field | Value |
|---|---|
| Test Case ID | N04-TC02 |
| Parent Scenario | N04 |
| Test Title | Direct product link survives Refresh |
| Objective | Verify a nested public route loads and reloads without a prior in-app visit |
| Priority | P1 — shared links and refresh are common entry routes |
| Test Type | Boundary; Navigation; Recovery |
| Evidence Basis | Observed E4 public product; Inferred direct-route/reload consistency |
| Preconditions | GP; DESKTOP; fresh target tab/context with no ROOT navigation in this case |
| Test Data | Full ROOT-origin PRODUCT URL; no package/quantity query or state fixture |
| Automation Feasibility | Cypress-ready subset |
| Dependencies | CF; still-public PRODUCT baseline |
| Execution Status | NOT EXECUTED |
| Notes | This isolates nested-route server/client entry from N01's home refresh and N04-TC01's history. No product-retention test is created |

| Test Steps | Expected Results |
|---|---|
| 1. Enter the full PRODUCT URL directly. | Matching product identity and public page shell appear at PRODUCT without login or home-page initialization. |
| 2. Use browser Refresh. | PRODUCT remains the route and its current matching identity renders again, rather than an unexplained 404, blank page or mismatched route. |

**Postconditions:** Guest on PRODUCT; allowed data changes are not judged by stale hardcoded prices.

### N05-TC01 — Telephone display and destination agree

| Field | Value |
|---|---|
| Test Case ID | N05-TC01 |
| Parent Scenario | N05 |
| Test Title | Telephone display and destination agree |
| Objective | Verify the browser-visible telephone link points to the advertised number without activating it |
| Priority | P2 — wrong destination prevents reaching support |
| Test Type | Positive; Navigation |
| Evidence Basis | Phase 1 E9/N05 supports a phone link; exact old displayed number is UNVERIFIED — CURRENT BASELINE REQUIRED (appendix A) |
| Preconditions | GP; ROOT contact section visible; no native handler activation |
| Test Data | Dated PHONE contact baseline; current displayed number and tel destination; no fixed historical display string |
| Automation Feasibility | Cypress-ready subset |
| Dependencies | CF; current visible phone link and href available for read-only DOM inspection |
| Execution Status | NOT EXECUTED |
| Notes | Compare Persian/Latin digits, separators and documented +98/local-0 equivalence only; never dial. This is representation consistency, not proof the support number is correct. |

| Test Steps | Expected Results |
|---|---|
| 1. Read the visible contact telephone and decoded tel destination without clicking; compare to the separately reviewed contact baseline. | A telephone contact link and readable number are present. Any change from the pre-run baseline is reviewed, not silently accepted. |
| 2. Normalize digits/separators and the approved international/local prefix equivalence, then compare display and destination. | Normalized representations identify the same number. Different digits, a non-tel destination or ambiguous/unsupported conversion fails the consistency check; unknown formatting rules block the comparison rather than guessing. |

**Postconditions:** Guest stays in the contact section; no OS handler or call starts.

### N05-TC02 — Email display and destination agree

| Field | Value |
|---|---|
| Test Case ID | N05-TC02 |
| Parent Scenario | N05 |
| Test Title | Email display and destination agree |
| Objective | Verify the email contact target without opening or sending mail |
| Priority | P2 — misdirected support correspondence |
| Test Type | Positive; Navigation |
| Evidence Basis | Phase 1 E9 supports email contact; exact prior rendered text is UNVERIFIED — CURRENT BASELINE REQUIRED (appendix A) |
| Preconditions | GP; ROOT contact section visible; no email handler activation |
| Test Data | Dated EMAIL contact baseline; readable current address and mailto recipient; no fixed historical display equality |
| Automation Feasibility | Cypress-ready subset |
| Dependencies | CF; visible email link and read-only href inspection |
| Execution Status | NOT EXECUTED |
| Notes | No recipient/address publication is treated as proof the mailbox works or the support hours are correct |

| Test Steps | Expected Results |
|---|---|
| 1. Read the displayed email and decoded mailto recipient without activating it; compare to the separately reviewed baseline. | Readable email contact and mailto link are present; changed address/parameters require review before baseline replacement. |
| 2. Compare the displayed recipient with the decoded destination recipient. | Recipients agree under explicitly documented normalization. A different recipient or non-mailto scheme fails; unknown additional subject/body/recipient rules remain blocked for that scope. No delivery or authoritative mailbox claim follows. |

**Postconditions:** Guest remains on contact section; no draft, message or external handler created.

### N05-TC03 — Native contact handler opens only a safe preview

| Field | Value |
|---|---|
| Test Case ID | N05-TC03 |
| Parent Scenario | N05 |
| Test Title | Native contact handler opens only a safe preview |
| Objective | Manually verify native handoff destination without making a call or sending a message |
| Priority | P2 — platform handoff usability |
| Test Type | Manual; Navigation |
| Evidence Basis | Observed E9 links; Inferred handoff intent; native behavior unverified |
| Preconditions | GP; CF-native; dedicated test profile with a documented non-dialing phone preview and non-sending, non-saving mail preview; operator confirms activation cannot auto-call/send or save a draft. If not established, do not activate and record environment block |
| Test Data | PHONE and EMAIL, each run independently from ROOT contact section |
| Automation Feasibility | Manual |
| Dependencies | Special safe native-handler setup; no remote communications; manual browser/OS evidence |
| Execution Status | NOT EXECUTED |
| Notes | No particular chooser/prompt/client is assumed. No-handler outcomes are platform observations unless requirements specify support |

| Test Steps | Expected Results |
|---|---|
| 1. Reconfirm the selected handler's preview-only safeguard; activate that contact link only if the safeguard is in force. | Safe local preview/chooser, if supported by this configured platform, reflects the advertised number/recipient. No call or email transmission occurs. If safety cannot be guaranteed, stop before activation. |
| 2. Cancel/dismiss the preview without confirming a call or sending/saving a message; return to the browser. | Storefront remains available. Any native unsaved preview is dismissed under the supported cancel flow; no stored draft cleanup is assumed. |

**Postconditions:** Browser remains usable; no call/message or saved draft is authorized. Unavailable safe preview is a manual environment limitation, not an EZpost failure.

### N06-TC01 — Trust link requires a reviewed external destination

| Field | Value |
|---|---|
| Test Case ID | N06-TC01 |
| Parent Scenario | N06 |
| Test Title | Trust link requires a reviewed external destination |
| Objective | Verify discoverable eNAMAD link identity and public destination without certification claims |
| Priority | P2 — trust-navigation accuracy |
| Test Type | Positive; Navigation |
| Evidence Basis | Phase 1 E9/N06 establishes eNAMAD link existence only; exact host/path/id/Code unverified (appendix A) |
| Preconditions | GP; ROOT footer visible; no external navigation required |
| Test Data | Missing approved TRUST full URL and source link baseline |
| Automation Feasibility | Blocked |
| Dependencies | Missing dated independently reviewed TRUST destination; then CF |
| Execution Status | NOT EXECUTED |
| Notes | Compare parsed scheme/host/path/query, not parameter ordering. Merchant identity/validity is N06-TC04, not this case |

| Test Steps | Expected Results |
|---|---|
| 1. Obtain the approved full TRUST destination, route/date and source-link name before comparing DOM. | Until supplied retain BLOCKED. No id/Code is copied from the prior M01 draft as authority. |
| 2. After approval, locate the actual footer verification link and inspect without clicking. | Discoverable link and parsed scheme/host/path/query match that approved baseline. Changed host/path/parameter value fails the regression comparison; query ordering alone does not. No certification judgment follows. |

**Postconditions:** Guest remains on ROOT; no external navigation or certification assertion.

### N06-TC02 — Follow trust navigation and return safely

| Field | Value |
|---|---|
| Test Case ID | N06-TC02 |
| Parent Scenario | N06 |
| Test Title | Follow trust navigation and return safely |
| Objective | Verify the actual external handoff and return to the same public storefront context |
| Priority | P2 — visitors should recover from external trust browsing |
| Test Type | Navigation; Recovery; Manual |
| Evidence Basis | Phase 1 E9 supports outgoing trust navigation generally; initial exact destination and actual tab/redirect behavior unverified |
| Preconditions | GP; ROOT footer; external TRUST service reachable in the dedicated browser; actual target behavior inspected; no login or external forms |
| Test Data | TRUST and ROOT; record actual same-tab/new-tab behavior, without prescribing it |
| Automation Feasibility | Blocked |
| Dependencies | Missing TRUST baseline; external-origin access and actual tab behavior; later manual/Cypress capability review |
| Execution Status | NOT EXECUTED |
| Notes | Currently Blocked on TRUST. After resolution, reassess as Partial for real tab/origin/return behavior; do not rewrite targets or treat arbitrary redirects as approved. |

| Test Steps | Expected Results |
|---|---|
| 1. Only after TRUST baseline and case approval, activate the visible trust link in the dedicated guest browser and record the handoff. | Initial navigation matches the independently approved TRUST destination in the actual browsing context. An initial destination mismatch fails that comparison; missing external access blocks the external portion. Redirects/errors are recorded separately, with no guessed approved final destination or certificate status. |
| 2. If the original tab navigated, use browser Back through entries created by this handoff; if a new tab opened, close only that inspection tab and reselect the original. | Original public storefront context is recoverable at ROOT; no user-owned tab is closed. Unexpected service redirects are documented rather than silently accepted. |
| 3. Inspect the restored storefront header/main content. | Public EZpost content is usable; no login, cart mutation or external data entry occurred. No precise scroll restoration required. |

**Postconditions:** Dedicated guest ROOT is active; only inspection-created external tabs may be closed.

### N06-TC03 — Recover when the external trust service is unavailable

| Field | Value |
|---|---|
| Test Case ID | N06-TC03 |
| Parent Scenario | N06 |
| Test Title | Recover when the external trust service is unavailable |
| Objective | Specify safe storefront recovery from externally unavailable navigation |
| Priority | P2 — external outage should not strand public browsing |
| Test Type | Negative; Recovery; Manual |
| Evidence Basis | Observed E9 link; Inferred browser recovery; Missing controlled failure procedure |
| Preconditions | GP plus approved EXTERNAL-FAULT procedure and known actual tab behavior; otherwise remain blocked |
| Test Data | TRUST; EXTERNAL-FAULT scoped only to the external host; ROOT remains reachable |
| Automation Feasibility | Blocked |
| Dependencies | Missing browser-only fault setup; CF; later manual external/new-tab boundary |
| Execution Status | NOT EXECUTED |
| Notes | No custom EZpost retry/error UI, external error text or specific failure code is assumed; not a real external-service availability test |

| Test Steps | Expected Results |
|---|---|
| 1. Obtain/review EXTERNAL-FAULT and record how to restore it. Do not continue if unavailable. | Case remains BLOCKED until a reproducible browser-only, external-host-scoped procedure is approved; no application environment is changed. |
| 2. In the later approved environment, enable that procedure and follow the trust link. | Intended external unavailability is observable through the actual browser outcome; ROOT is not intentionally disabled. Exact native error wording is not an oracle. |
| 3. Restore the scoped browser setting; return via actual same-tab Back or inspection-tab close, then open ROOT. | Public storefront is reachable and usable after recovery; fault control is restored. A service failure is recorded separately from an application navigation defect. |

**Postconditions:** Until dependencies are supplied, no execution; after later authorized execution, guest ROOT available and browser-only fault setting restored explicitly.

### N06-TC04 — Compare verification identity with approved merchant evidence

| Field | Value |
|---|---|
| Test Case ID | N06-TC04 |
| Parent Scenario | N06 |
| Test Title | Compare verification identity with approved merchant evidence |
| Objective | Prevent a link/logo check from being mistaken for merchant/certification validation |
| Priority | P2 — customer trust and misleading verification risk |
| Test Type | Manual; Positive; Negative (requirement-dependent) |
| Evidence Basis | Phase 1 E9 link existence only; exact TRUST destination, approved identity/status policy and external evidence missing |
| Preconditions | GP; owner supplies authoritative merchant/domain association, status/date criteria and approved verification source; otherwise blocked |
| Test Data | TRUST; missing approved identity/status record; actual external response at later execution date |
| Automation Feasibility | Blocked |
| Dependencies | Owner/authority requirements and reachable independent external evidence; later human verification |
| Execution Status | NOT EXECUTED |
| Notes | Do not infer name/domain/status from EZpost branding, logo, URL id or hidden data; no authority/admin login assumed |

| Test Steps | Expected Results |
|---|---|
| 1. Obtain the approved identity/domain/status criteria and evidence source. | If absent, retain BLOCKED; no valid/invalid certification conclusion is available. |
| 2. After approval, open the actual verification through its public link and compare what is displayed with the supplied authoritative record. | Displayed association/status is either consistent with the approved dated criteria or a discrepancy is recorded. Required fields/status values come only from that supplied policy. |
| 3. Return to guest ROOT using the actual tab behavior. | Public storefront is restored; no external form or account action was performed. |

**Postconditions:** Blocked until authority is available; eventual result is a dated manual comparison, not permanent certification inferred from navigation.

### N07-TC01 — Missing product opens a recognizable Persian recovery page

| Field | Value |
|---|---|
| Test Case ID | N07-TC01 |
| Parent Scenario | N07 |
| Test Title | Missing product opens a recognizable Persian recovery page |
| Objective | Verify unknown-product navigation yields a recognizable recovery state |
| Priority | P1 — broken product links need understandable recovery |
| Test Type | Negative; Navigation |
| Evidence Basis | Phase 1 E10/N07 supports missing-product recovery generally; exact Persian wording UNVERIFIED — CURRENT BASELINE REQUIRED |
| Preconditions | GP; DESKTOP; MISSING independently confirmed nonexistent on the current deployment |
| Test Data | Verified MISSING input fixture; pre-reviewed distinct Persian missing-product signature and discoverable recovery control; no old exact wording equality |
| Automation Feasibility | Cypress-ready subset |
| Dependencies | CF; runner must allow intentional non-success page navigation; no guessed new fixture |
| Execution Status | NOT EXECUTED |
| Notes | Semantic missing-state oracle is proposed for approval; exact message wording is not tested. Record current literal text for a later reviewed baseline. HTTP 404 is diagnostic only. |

| Test Steps | Expected Results |
|---|---|
| 1. Enter the full MISSING URL directly. | Recorded missing-product recovery page appears rather than a real product or an unexplained blank page; route corresponds to the missing address. |
| 2. Inspect customer-facing heading, explanation and recovery control. | Persian not-found meaning and a discoverable return-to-store control are visible/readable. Record raw internal/debug material if visible, but do not assert an exhaustive absence of backend leaks from this UI check. |

**Postconditions:** Guest remains on missing-product recovery view; no inventory mutation establishes this fixture.

### N07-TC02 — Missing-product recovery control returns to the store

| Field | Value |
|---|---|
| Test Case ID | N07-TC02 |
| Parent Scenario | N07 |
| Test Title | Missing-product recovery control returns to the store |
| Objective | Verify the observed error-page recovery action restores public browsing |
| Priority | P1 — visitor escape from a broken link |
| Test Type | Recovery; Navigation |
| Evidence Basis | Phase 1 E10 supports recovery generally; exact control name and destination are not independently established |
| Preconditions | GP; directly open verified MISSING within this case; not dependent on N07-TC01 |
| Test Data | MISSING; missing approved RECOVERY source/control/destination mapping; ROOT is a proposed destination |
| Automation Feasibility | Blocked |
| Dependencies | Missing RECOVERY mapping/approval, then CF |
| Execution Status | NOT EXECUTED |
| Notes | No exact Persian return label is assumed; scope the actual supplied control to the error main region. |

| Test Steps | Expected Results |
|---|---|
| 1. Obtain approved RECOVERY mapping and distinct destination signature; directly open MISSING within this case. | Missing input retains BLOCKED. Destination must be known before activating recovery, not learned from that same action. |
| 2. After approval, activate the supplied error-view recovery control. | The approved route and distinct public-storefront signature render, replacing the missing main state. Wrong route, stale error content or no completed navigation fails. No product count is required. |

**Postconditions:** Guest on ROOT; no additional back-history expectations in this case.

### N07-TC03 — Refresh on a missing product remains recoverable

| Field | Value |
|---|---|
| Test Case ID | N07-TC03 |
| Parent Scenario | N07 |
| Test Title | Refresh on a missing product remains recoverable |
| Objective | Verify reload does not change a known missing route into incoherent page content |
| Priority | P1 — error recovery must survive reload |
| Test Type | Negative; Recovery |
| Evidence Basis | Observed E10 initial 404; Inferred reload consistency |
| Preconditions | GP; DESKTOP; MISSING freshly opened and still nonexistent |
| Test Data | MISSING and its current reviewed recovery baseline |
| Automation Feasibility | Cypress-ready subset |
| Dependencies | CF; intentional error-route navigation handling |
| Execution Status | NOT EXECUTED |
| Notes | Distinct from root/product refresh: verifies persisted error-route handling, not internal error implementation |

| Test Steps | Expected Results |
|---|---|
| 1. Refresh the already displayed MISSING route. | Browser remains at MISSING and displays its recognizable missing-product state. |
| 2. Inspect the recovery control after rendering. | Return-to-store control remains available; no stale home/product content is shown under the missing route. |

**Postconditions:** Guest remains in a recoverable not-found state; no assumption that a refresh fixes nonexistent inventory.

### N07-TC04 — Browser history remains coherent across missing-route recovery

| Field | Value |
|---|---|
| Test Case ID | N07-TC04 |
| Parent Scenario | N07 |
| Test Title | Browser history remains coherent across missing-route recovery |
| Objective | Verify a deliberately established post-recovery history suffix against independently known ROOT, PRODUCT and MISSING identities; keep recovery insertion policy separate |
| Priority | P1 — history must not trap or misidentify the page |
| Test Type | Recovery; Navigation |
| Evidence Basis | Phase 1 E10 supports recovery generally; exact RECOVERY destination missing; native-history coherence is a proposed criterion; push/replace policy unverified |
| Preconditions | GP; DESKTOP; approved RECOVERY destination ROOT for this proposed sequence, otherwise revise before approval; reviewed distinct ROOT home, PRODUCT title/detail and MISSING not-found/recovery signatures; supported native same-tab document navigation that creates history entries |
| Test Data | Known distinct ROOT, PRODUCT and MISSING paths with pre-run reviewed signatures; no fragment-only setup and no history API injection |
| Automation Feasibility | Blocked |
| Dependencies | Missing RECOVERY baseline and approval; CF native same-tab history capability; no requirement that the application recovery action pushes rather than replaces |
| Execution Status | NOT EXECUTED |
| Notes | A runner method must reproduce actual user same-tab document navigation with new entries; visit helpers that reset history are unsuitable. If unsupported, retain environment block. The original recovery Back target is not judged without push/replace policy. |

| Test Steps | Expected Results |
|---|---|
| 1. Review RECOVERY as ROOT and the three distinct route/signature pairs before starting. In a dedicated tab navigate natively to PRODUCT, then MISSING; activate the supplied recovery control. | Without RECOVERY approval retain BLOCKED. Once approved, recovery must reach ROOT and the reviewed home signature. Wrong recovery destination is a failure against that approved mapping, not an inferred historical fact. |
| 2. From recovered ROOT, enter PRODUCT as a new same-tab document navigation; after its reviewed signature renders, enter MISSING in the same way and wait for its reviewed error signature. | This deliberately creates the known final history suffix ROOT -> PRODUCT -> MISSING, independently of whether recovery previously pushed or replaced. Reusing a context from another case, replacing entries or entering only fragments is invalid setup. |
| 3. Use native Back once, then Back once, waiting for each route/signature. | First Back must reach PRODUCT with its reviewed product identity; second must reach ROOT with the reviewed home identity. An unexpected route/login, missing Back entry after valid setup, error main content at ROOT or stale product content at MISSING is a failure. |
| 4. Use native Forward once, then Forward once, waiting after each. | First Forward must reach PRODUCT with its distinct signature; second must reach MISSING with its not-found/recovery signature. Missing Forward entries after valid setup, wrong route, wrong main identity or readiness timeout fails. |
| 5. Record the policy boundary separately. | No conclusion is made about the Back target immediately after the original recovery action, its push/replace behavior, duplicate historical ROOT entries, or retention/scroll. Those require policy; the deliberately created suffix above has fixed expectations. |

**Postconditions:** Still NOT EXECUTED/blocked until RECOVERY and capability are approved. After a later approved run the dedicated tab ends on MISSING; no inventory or cart change is required.

### N08-TC01 — Product-stage indicator and navigation require separate baselines

| Field | Value |
|---|---|
| Test Case ID | N08-TC01 |
| Parent Scenario | N08 |
| Test Title | Product-stage indicator and navigation require separate baselines |
| Objective | Verify product-stage navigation semantics without adding a product |
| Priority | P1 — public purchase-stage navigation |
| Test Type | Positive; Navigation; Boundary |
| Evidence Basis | Phase 1 E6 supports four-step indicator only; exact labels, Previous presence/disabled state and product Next destination UNVERIFIED — CURRENT BASELINE REQUIRED |
| Preconditions | GP; DESKTOP PRODUCT; independently empty guest cart; no add-to-cart/quantity action |
| Test Data | PRODUCT; missing STAGE-NAV indicator labels/order/current state and independent Previous/Next semantics/destination mapping |
| Automation Feasibility | Blocked |
| Dependencies | Missing STAGE-NAV observations and approved stage-control policy; verified empty guest; then CF |
| Execution Status | NOT EXECUTED |
| Notes | A proposed disabled Previous in the original scenario is not a raw DOM observation or an approved requirement. Do not infer a control from the indicator. |

| Test Steps | Expected Results |
|---|---|
| 1. Obtain the dated PRODUCT STAGE-NAV record, separately listing indicator labels/order/current marker, actual navigation controls, enabled/disabled semantics and intended destinations. | Retain BLOCKED until each item has evidence and the relevant policy is approved; four displayed stages alone establish none of the control facts. |
| 2. After approval, inspect indicator and each actual control without activating purchase actions. | Compare each independent property with the reviewed record. Previous is required to be disabled only if that policy was approved; absence is not equivalent to native disabled. Wrong indicator/current state or a policy mismatch fails its specific assertion. |
| 3. Only when the approved record establishes a navigation-only Next control to CART, activate that control with add-to-cart untouched. | Approved CART path and independently empty-cart signature appear. A different destination or unexpected cart line fails the approved navigation contract; without this mapping no cart destination is asserted. |

**Postconditions:** Currently blocked; future final route is the supplied approved navigation destination. No cart addition is authorized.

### N08-TC02 — Cart Previous uses an independently approved sequence-specific destination

| Field | Value |
|---|---|
| Test Case ID | N08-TC02 |
| Parent Scenario | N08 |
| Test Title | Cart Previous uses an independently approved sequence-specific destination |
| Objective | Assess actual cart Previous presence and destination without assuming a last-product rule |
| Priority | P1 — correcting navigation before checkout |
| Test Type | Navigation; Recovery |
| Evidence Basis | Phase 1 E6 does not establish cart Previous or return to the last visited product; UNVERIFIED — CURRENT BASELINE REQUIRED |
| Preconditions | GP; DESKTOP; verified empty guest; start PRODUCT independently within this case |
| Test Data | PRODUCT and CART fixtures; missing sequence-specific STAGE-NAV control/target rule; no assumed completed-stage link |
| Automation Feasibility | Blocked |
| Dependencies | Approved product-to-cart navigation, actual cart Previous control and sequence-specific destination; then CF |
| Execution Status | NOT EXECUTED |
| Notes | Returning to PRODUCT is one unverified candidate, not a guaranteed result even after that product was visited. Direct-cart and other-product rules remain outside this case. |

| Test Steps | Expected Results |
|---|---|
| 1. Obtain the approved STAGE-NAV record for PRODUCT -> CART, including actual Previous control and its destination; establish the empty guest fixture. | If control presence, entry path or destination is missing retain BLOCKED. Do not fill the gap with browser Back or a guessed last-product rule. |
| 2. After approval, follow the supplied navigation-only path to CART and inspect actual Previous semantics. | Control and enabled/disabled state match the independently reviewed sequence-specific policy. Indicator existence does not satisfy control presence. |
| 3. If approved as actionable, activate Previous and compare route/content with the supplied target. | That exact preapproved destination and distinct signature render. PRODUCT is expected only when the approved rule explicitly specifies it; another target, stale content or timeout fails. |

**Postconditions:** Currently blocked; future route is the supplied Previous target, without saved package/cart-state assertions.

### N08-TC03 — Empty-guest stage routing requires an approved redirect policy

| Field | Value |
|---|---|
| Test Case ID | N08-TC03 |
| Parent Scenario | N08 |
| Test Title | Empty-guest stage routing requires an approved redirect policy |
| Objective | Compare empty-guest stage routing with a separately evidenced and approved redirect policy |
| Priority | P1 — public checkout-entry routing |
| Test Type | Navigation; Boundary |
| Evidence Basis | Phase 1 E6/E7 and A09 support guest redirect generally; exact /checkout -> /login?next=/checkout is inherited but not independently substantiated here |
| Preconditions | GP; DESKTOP; CART directly loaded with independently verified zero-item guest state; no authentication |
| Test Data | Missing reviewed empty-guest CART next-link and redirect path/query mapping; inherited exact values are quarantined in appendix A |
| Automation Feasibility | Blocked |
| Dependencies | Current dated redirect evidence and explicit empty-guest routing policy approval; verified empty fixture; then CF |
| Execution Status | NOT EXECUTED |
| Notes | Blocked rather than treating a provisional redirect as an approved empty-cart policy. T07 owns the full decision table and A09 the post-login return. |

| Test Steps | Expected Results |
|---|---|
| 1. Obtain the reviewed empty-guest STAGE-NAV link/redirect mapping and intended policy; independently open the verified empty CART fixture. | Absent mapping or policy retains BLOCKED. No hardcoded redirect is learned from this test's own navigation. |
| 2. After approval, inspect and follow only the supplied navigation-only stage link. | Link destination and resulting semantic path/query match the approved row; the public mobile-entry signature renders if that row specifies login. Wrong route/return target or stale cart content fails; query order/percent encoding alone does not. |
| 3. Stop on the landing page without entering or submitting a number. | No SMS, authentication, address, order or payment action is attempted. |

**Postconditions:** Blocked until baseline/policy is supplied; eventual landing route is rule-dependent, with no authentication performed.

### N08-TC04 — Other checkout eligibility rows require approved navigation rules

| Field | Value |
|---|---|
| Test Case ID | N08-TC04 |
| Parent Scenario | N08 |
| Test Title | Other checkout eligibility rows require approved navigation rules |
| Objective | Keep unverified purchase-stage navigation gates visible without inventing authenticated checkout behavior |
| Priority | P1 — wrong eligibility routes can block customer progress |
| Test Type | Boundary; Navigation (requirement-dependent) |
| Evidence Basis | Missing approved GATE-ROW; E6/E7 supports guest redirect generally, not exact routing or the other role/cart policies |
| Preconditions | GP plus owner-approved GATE-ROW and externally supplied safe role/cart fixture; no M01 cart/customer setup or OTP |
| Test Data | Explicit requirement needed for guest+populated, ordinary+empty and ordinary+populated rows; known entry control/destination must be supplied |
| Automation Feasibility | Blocked |
| Dependencies | Eligibility rules; genuine ordinary sessions where relevant; prearranged safe fixtures. Full decision table belongs T07 |
| Execution Status | NOT EXECUTED |
| Notes | A gated proposal, not three invented authenticated cases. No address/cart/form implementation or post-login flow is designed here |

| Test Steps | Expected Results |
|---|---|
| 1. Request the approved rule and safe pre-established fixture for one unverified row. | Without both, retain BLOCKED. No expected login/checkout/error destination is supplied by this document. |
| 2. Only after scope review, inspect and follow the actual stage-navigation entry in that supplied fixture; stop before any form submission. | Observed route/feedback must match the supplied GATE-ROW. If no real control exists, investigate/revise rather than inventing one. No downstream detailed workflow is executed. |

**Postconditions:** Still blocked until row/access is approved; future navigation-only result recorded without customer/cart/order changes.

### N09-TC01 — Compare public content with the intended deployment policy

| Field | Value |
|---|---|
| Test Case ID | N09-TC01 |
| Parent Scenario | N09 |
| Test Title | Compare public content with the intended deployment policy |
| Objective | Distinguish legitimate QA fixtures from content inappropriate for the intended audience |
| Priority | P2 — misleading public release content and customer confidence |
| Test Type | Positive; Negative; Manual (requirement-dependent) |
| Evidence Basis | Observed E2/I2; Missing owner-approved audience/catalog policy |
| Preconditions | GP; CONTENT-POLICY supplied by the environment/content owner with date/version and allowed exceptions; otherwise blocked |
| Test Data | Current guest inventory and owner-approved content/exception manifest; no historical product-name equality or forbidden-name heuristic |
| Automation Feasibility | Blocked |
| Dependencies | Deployment-audience decision and content manifest; human semantic/content review; no administrator workflow |
| Execution Status | NOT EXECUTED |
| Notes | QA products can be acceptable on a QA deployment. Do not derive policy from the private IP, delete products, or enforce forbidden-name heuristics |

| Test Steps | Expected Results |
|---|---|
| 1. Obtain the approved deployment audience and allowed content/exception policy. | Missing policy leaves BLOCKED; neither historical QA content nor new content is declared a defect merely by name. |
| 2. After approval, read the current guest-visible catalog and relevant public product descriptions; compare against that supplied policy. | Each reviewed item is allowed, an approved exception, or a documented policy discrepancy. No fixed item count or unsupported production-only rule applies. |
| 3. Record any discrepancy with visible content, route, policy reference and inspection date; leave content unchanged. | Evidence distinguishes intentional QA data from a customer-facing policy violation and identifies the exact basis for any finding. |

**Postconditions:** Policy-dependent review remains blocked until inputs arrive; any later inspection is read-only with no catalog changes.

## 5. Positive, negative, boundary and recovery coverage

Data rows within a case are parameter variations, not additional unique test-case IDs. Later execution must report each row/browser outcome; the counts here measure designed case definitions only.

| Parent | Positive / navigation coverage | Negative / boundary / recovery coverage | Explicitly unresolved or excluded |
|---|---|---|---|
| N01 | TC01 fresh public entry; TC03 same-context revisit | TC02 root refresh | No product-count, cache, timing or customer persistence rule |
| N02 | Conditional header/CTA source rows in TC01/TC02 | TC03 direct-fragment; TC04 nested source; TC05 keyboard proposal | All blocked on reviewed NAV; source counts/labels not assumed. Unknown-fragment fallback and full U audit excluded |
| N03 | TC01 logo; TC02 supplied breadcrumb ancestors, blocked | TC03 login escape, blocked; TC04 top proposal, Partial | No assumed two-ancestor mapping, literal label or current-item link; Q03 gates visual pass/fail |
| N04 | TC01 history; TC02 direct product entry | TC01 Back/Forward route/content; TC02 nested-route Refresh | P12/T04 retention not expanded; query matching belongs C; auth history belongs A |
| N05 | TC01 phone href/display; TC02 email href/display | TC03 safe native preview/cancel or stop on unsafe environment | No test calls/email, saved drafts, assumed chooser, mailbox availability or support-hours accuracy |
| N06 | TC01 destination comparison and TC02 handoff, both blocked | TC02 return; TC03 failure, blocked | TC04 authority review blocked; all require approved TRUST first |
| N07 | TC02 recovery action, blocked on target | TC01 missing state; TC03 refresh; TC04 fixed history suffix proposal, blocked | ROOT recovery and history capability must be approved for TC04; original push/replace policy unjudged |
| N08 | TC01 separate indicator/control baseline; TC02 sequence-specific Previous proposal | Disabled state and destinations conditional; TC03 guest redirect and TC04 other rows gated | All 4 blocked; no guaranteed disabled Previous, last-product destination or exact login redirect |
| N09 | Allowed content can be compared once policy exists | Disallowed content/exception decision remains in TC01 blocked proposal | Test products are not automatically defects; no hardcoded forbidden names/counts |

Nonmeaningful numeric field boundaries are not invented for navigation-only M01. Meaningful boundaries are fresh/revisited context, direct versus in-app route, first purchase stage, empty guest state, unavailable external destination, nonexistent product, and desktop/narrow top-link presentation. Actual performance thresholds, unsupported devices and unapproved retention policies are not assigned expected values.

### 5.1 Canonical case inventory and flags

This table is the counting authority. Rule? flags an essential missing stage-navigation/business/authority policy, excluding common approval of proposed coherence/UX criteria. Extra access/env? flags special native/external/fault/identity/role fixtures, excluding common GP and baseline evidence. Missing evidence also blocks cases without either flag. Each row has one parent/class; every case is NOT EXECUTED.

| Case ID | Parent | Priority | Primary feasibility | Rule? | Extra access/env? |
|---|---|---|---|---|---|
| N01-TC01 | N01 | P1 | Cypress-ready subset | No | No |
| N01-TC02 | N01 | P1 | Cypress-ready subset | No | No |
| N01-TC03 | N01 | P1 | Cypress-ready subset | No | No |
| N02-TC01 | N02 | P1 | Blocked | No | No |
| N02-TC02 | N02 | P1 | Blocked | No | No |
| N02-TC03 | N02 | P1 | Blocked | No | No |
| N02-TC04 | N02 | P1 | Blocked | No | No |
| N02-TC05 | N02 | P1 | Blocked | No | No |
| N03-TC01 | N03 | P2 | Cypress-ready subset | No | No |
| N03-TC02 | N03 | P2 | Blocked | No | No |
| N03-TC03 | N03 | P2 | Blocked | No | No |
| N03-TC04 | N03 | P2 | Partial | No | No |
| N04-TC01 | N04 | P1 | Cypress-ready subset | No | No |
| N04-TC02 | N04 | P1 | Cypress-ready subset | No | No |
| N05-TC01 | N05 | P2 | Cypress-ready subset | No | No |
| N05-TC02 | N05 | P2 | Cypress-ready subset | No | No |
| N05-TC03 | N05 | P2 | Manual | No | Yes |
| N06-TC01 | N06 | P2 | Blocked | No | No |
| N06-TC02 | N06 | P2 | Blocked | No | Yes |
| N06-TC03 | N06 | P2 | Blocked | No | Yes |
| N06-TC04 | N06 | P2 | Blocked | Yes | Yes |
| N07-TC01 | N07 | P1 | Cypress-ready subset | No | No |
| N07-TC02 | N07 | P1 | Blocked | No | No |
| N07-TC03 | N07 | P1 | Cypress-ready subset | No | No |
| N07-TC04 | N07 | P1 | Blocked | No | No |
| N08-TC01 | N08 | P1 | Blocked | Yes | No |
| N08-TC02 | N08 | P1 | Blocked | Yes | No |
| N08-TC03 | N08 | P1 | Blocked | Yes | No |
| N08-TC04 | N08 | P1 | Blocked | Yes | Yes |
| N09-TC01 | N09 | P2 | Blocked | Yes | No |

## 6. Manual and blocked test-case register

| Case | Primary disposition | Missing input or manual boundary | Resolution |
|---|---|---|---|
| N02-TC01 | Blocked | NAV home-header names, destinations and target signatures missing | Supply/review the named evidence or criterion before execution; no action performed now |
| N02-TC02 | Blocked | NAV hero/closing control existence and destination mappings missing | Supply/review the named evidence or criterion before execution; no action performed now |
| N02-TC03 | Blocked | Exact direct fragment/target mappings missing | Supply/review the named evidence or criterion before execution; no action performed now |
| N02-TC04 | Blocked | Nested-header source/destination mappings missing | Supply/review the named evidence or criterion before execution; no action performed now |
| N02-TC05 | Blocked | NAV plus approved Q03 keyboard/focus criteria; later human portion remains | Supply/review the named evidence or criterion before execution; no action performed now |
| N03-TC02 | Blocked | Exact linked breadcrumb names/destinations missing | Supply/review the named evidence or criterion before execution; no action performed now |
| N03-TC03 | Blocked | LOGIN-RETURN presence/name/intended destination unverified | Supply/review the named evidence or criterion before execution; no action performed now |
| N03-TC04 | Partial | Partial: manual visual top recovery; exact old name/href removed; Q03 approval required | Supply/review the named evidence or criterion before execution; no action performed now |
| N05-TC03 | Manual | Manual: special non-dialing/non-sending/non-saving local preview | Supply/review the named evidence or criterion before execution; no action performed now |
| N06-TC01 | Blocked | TRUST full URL/parameters not independently established | Supply/review the named evidence or criterion before execution; no action performed now |
| N06-TC02 | Blocked | TRUST initial destination missing; later external tab/origin capability remains | Supply/review the named evidence or criterion before execution; no action performed now |
| N06-TC03 | Blocked | TRUST and approved scoped EXTERNAL-FAULT/restoration missing | Supply/review the named evidence or criterion before execution; no action performed now |
| N06-TC04 | Blocked | TRUST and authoritative merchant/domain/status criteria missing | Supply/review the named evidence or criterion before execution; no action performed now |
| N07-TC02 | Blocked | RECOVERY control and independently approved destination missing | Supply/review the named evidence or criterion before execution; no action performed now |
| N07-TC04 | Blocked | RECOVERY-to-ROOT approval plus valid native history-entry method missing | Supply/review the named evidence or criterion before execution; no action performed now |
| N08-TC01 | Blocked | STAGE-NAV indicator/control/disabled/destination evidence and policy missing | Supply/review the named evidence or criterion before execution; no action performed now |
| N08-TC02 | Blocked | Actual Previous and sequence-specific target/policy missing | Supply/review the named evidence or criterion before execution; no action performed now |
| N08-TC03 | Blocked | Exact empty-guest redirect and intended navigation policy missing | Supply/review the named evidence or criterion before execution; no action performed now |
| N08-TC04 | Blocked | Other role/cart GATE-ROW policy and safe access fixtures missing | Supply/review the named evidence or criterion before execution; no action performed now |
| N09-TC01 | Blocked | Deployment audience and approved content/exception manifest missing | Supply/review the named evidence or criterion before execution; no action performed now |

The blocked register includes missing exact evidence, independently of rule/access flags. Resolving a baseline does not automatically make a case fully automatable: N02-TC05 still needs human focus review; N06-TC02 still needs actual tab/origin assessment; N06-TC04 and N09-TC01 still need human judgment. N04 retention remains P12/T04's gap. Full mobile/accessibility/device work stays in the U group. Unknown direct-CART Previous behavior is not covered by a fabricated last-product rule.

## 7. Cypress automation feasibility notes

### 7.1 Shared implementation boundaries

Future code belongs in a separately approved independent Cypress E2E project, not the Tapin WordPress application or this repository's existing Cypress setup. The real private origin must be reachable from that runner; localhost is not a substitute. No implementation, installation, runner discovery or current-browser claims are made here.

All locator descriptions below are **requirements for future DOM reinspection**, not actual selectors. Prefer discoverable link/control roles, accessible names, source region and destination, and match the reviewed actual DOM. Do not invent CSS IDs/classes, data attributes, DOM nesting or plugins. Source scoping matters: the home header, hero, breadcrumbs, login return, error recovery, footer and stage navigation can contain repeated labels. Destination inspection does not by itself prove activation works, hence separate navigation cases where relevant.

Wait for observable route/page identity/target geometry rather than an arbitrary sleep, product-price network response or backend hook. Document navigation can be client-side or full-page; do not assert implementation style. Deliberate non-success pages must be loadable by the runner without treating transport status as the only outcome. Native handlers, human certification judgments and genuine additional tabs are not assumed fully supported by Cypress. No code snippets or Cypress commands are included.

### 7.2 Per-case implementation assessment

| Case | Observable / locator requirement | Assertions and route dependencies | Async / likely flake risks | Browser / fixture | Manual boundary |
|---|---|---|---|---|---|
| N01-TC01 | Public identity/header/main; names and destinations rechecked | ROOT and public entry points, not item count | Initial hydration/fonts; wrong profile falsely authenticated | CF; fresh GP | No physical-device or content certification |
| N01-TC02 | Same public-shell identity | ROOT→reload→ROOT coherent content | Reload lifecycle/stale element references | CF; ROOT | No performance/scroll guarantee |
| N01-TC03 | Public shell after direct revisit | ROOT→LOGIN→direct ROOT; available home | Route/render settling; no reused prior test state | CF; local within-case visit | No form submission/cookie/personalization assertion |
| N02-TC01 | Reviewed home-header NAV row | Blocked: compare independently supplied destination/target; Q03 gates geometry | Missing mappings, duplicate names, layout shifts | CF; NAV | Visual readability only against approved criterion |
| N02-TC02 | Separate hero/closing NAV rows | Blocked: actual source/control and preapproved section target | Unobserved CTA existence, duplicate labels | CF; NAV | No exact old labels |
| N02-TC03 | Reviewed direct URLs and section signatures | Blocked: direct-entry path/fragment/target | Initial layout/anchor readiness | CF; NAV | Q03 for perceived alignment |
| N02-TC04 | Reviewed nested-header NAV row | Blocked: PRODUCT to preapproved root section | Stale main content and missing mapping | CF; PRODUCT/NAV | No retained product state |
| N02-TC05 | Reviewed focusable NAV control | Blocked: approved focus/activation contract | Native key capability and focus perception | CF; NAV/Q03 | Later human portion remains |
| N03-TC01 | Header brand/home link, not arbitrary text | PRODUCT→ROOT home identity | Duplicate brand marks; SPA transition | CF; PRODUCT | Visual brand fidelity outside case |
| N03-TC02 | Reviewed breadcrumb source/name/target | Blocked: compare each supplied target/signature | Missing mapping; repeated generic names | CF; BREADCRUMBS | No fixed ancestor count |
| N03-TC03 | Actual reviewed LOGIN-RETURN link | Blocked: supplied public destination, no submit | Control existence and target unverified | CF; LOGIN-RETURN | No exact old label |
| N03-TC04 | Actual TOP control, no literal name/href | Partial: proposed same-home top recovery after Q03 | Scroll settling and unapproved criterion | CF-N; TOP/Q03 | Human visible top review |
| N04-TC01 | Actual product link and page identity | ROOT→PRODUCT→Back→Forward route/content | Browser cache, duplicate history entries, replaced DOM | CF; current PRODUCT | No retained selection/scroll |
| N04-TC02 | Product identity from independent direct URL | PRODUCT direct/reload correspondence | Route-entry server behavior; product data drift | CF; current PRODUCT | No price/content business accuracy |
| N05-TC01 | Reviewed current phone display/href | Representation agreement after documented normalization | Digit/prefix ambiguity; baseline drift | CF; PHONE | No fixed old display or authoritative number claim |
| N05-TC02 | Reviewed current email display/href | Decoded recipient agreement | Encoding and additional recipients/parameters | CF; EMAIL | No fixed old display or delivery claim |
| N05-TC03 | Actual native handoff from contact link | Correct preview destination and cancel/store usability | OS default app, automatic dialing/draft saving | CF-native; safe previews | Essential full case manual; stop on unsafe setup |
| N06-TC01 | Actual footer link plus preapproved TRUST | Blocked: parsed scheme/host/path/query comparison | No source for old id/Code | CF; TRUST | No certification claim |
| N06-TC02 | Actual external link with reviewed initial URL | Blocked: initial target and recoverable storefront | External uptime, redirects, tabs | CF; TRUST/external access | After baseline, reassess Partial rather than assuming tab support |
| N06-TC03 | Actual external failure outcome + storefront | Recorded scoped failure then ROOT recoverable | Wrong fault scope, unavailable browser controls | CF; EXTERNAL-FAULT | Blocked; native external error text not asserted |
| N06-TC04 | Public authority page and owner-provided identity criteria | Dated association/status comparison | External content/identity drift, invalid authority assumptions | CF; authoritative evidence | Blocked, eventual human certification comparison |
| N07-TC01 | Not-found main region, Persian heading/control | MISSING and visible error/recovery meaning; HTTP diagnostic only | Runner stops on 404; fixture becomes real product | CF; verified MISSING | Text/visibility subset; full language/font review remains U04 |
| N07-TC02 | Reviewed error recovery control/target | Blocked: missing-state to approved public identity | Target source absent; stale error DOM | CF; RECOVERY | No exact old wording |
| N07-TC03 | Error identity/control after reload | MISSING stays coherent/recoverable | 404 runner behavior; page reload settling | CF; verified MISSING | No assumption reload repairs inventory |
| N07-TC04 | Distinct pre-run ROOT/PRODUCT/MISSING signatures | Blocked: controlled suffix R-P-M; Back P,R; Forward P,M | Native entry creation versus runner resets | CF; RECOVERY and same-tab history method | Original recovery push/replace behavior not judged |
| N08-TC01 | Separate indicator and actual navigation controls | Blocked: STAGE-NAV record and approved disabled/target policy | Indicator confused with controls; unsafe assumed Next | CF; PRODUCT/empty fixture | No asserted Previous disabled until approved |
| N08-TC02 | Actual sequence-specific cart Previous | Blocked: independently supplied target/signature | No established last-product behavior | CF; approved sequence/fixture | No PRODUCT destination unless rule supplies it |
| N08-TC03 | Actual cart entry/redirect and landing identity | Blocked: approved semantic path/query row | Unknown exact redirect and empty-guest policy | CF; empty guest/STAGE-NAV | No OTP or post-login assertion |
| N08-TC04 | Supplied actual navigation entry; no locator yet | Compare only against owner-supplied GATE-ROW | Missing role/cart state; undefined destinations | CF; supplied safe role/cart fixture | Blocked; detailed downstream workflows excluded |
| N09-TC01 | Guest-visible cards/descriptions and approved manifest | Item/policy comparison, no fixed count/name heuristic | Content/audience drift; absent policy | CF; CONTENT-POLICY | Blocked, human semantic/content judgment |

## 8. Traceability matrix from N01–N09 to cases

| Parent | Detailed IDs | Count | Ready subset | Partial | Manual | Blocked | Retained scope boundary |
|---|---|---:|---:|---:|---:|---:|---|
| N01 | N01-TC01, N01-TC02, N01-TC03 | 3 | 3 | 0 | 0 | 0 | Original parent mapping preserved; appendix A gates exact literals |
| N02 | N02-TC01, N02-TC02, N02-TC03, N02-TC04, N02-TC05 | 5 | 0 | 0 | 0 | 5 | Original parent mapping preserved; appendix A gates exact literals |
| N03 | N03-TC01, N03-TC02, N03-TC03, N03-TC04 | 4 | 1 | 1 | 0 | 2 | Original parent mapping preserved; appendix A gates exact literals |
| N04 | N04-TC01, N04-TC02 | 2 | 2 | 0 | 0 | 0 | Original parent mapping preserved; appendix A gates exact literals |
| N05 | N05-TC01, N05-TC02, N05-TC03 | 3 | 2 | 0 | 1 | 0 | Original parent mapping preserved; appendix A gates exact literals |
| N06 | N06-TC01, N06-TC02, N06-TC03, N06-TC04 | 4 | 0 | 0 | 0 | 4 | Original parent mapping preserved; appendix A gates exact literals |
| N07 | N07-TC01, N07-TC02, N07-TC03, N07-TC04 | 4 | 2 | 0 | 0 | 2 | Original parent mapping preserved; appendix A gates exact literals |
| N08 | N08-TC01, N08-TC02, N08-TC03, N08-TC04 | 4 | 0 | 0 | 0 | 4 | All stage navigation gated; no authenticated/downstream expansion |
| N09 | N09-TC01 | 1 | 0 | 0 | 0 | 1 | Original parent mapping preserved; appendix A gates exact literals |
| **Total** | **30 unique IDs** | **30** | **10** | **1** | **1** | **18** | **Every case NOT EXECUTED** |

No case was removed or renumbered. N01 owns home refresh; N04 owns product refresh/ordinary history; N07-TC04 owns the deliberately established history suffix after recovery. N08-TC03 remains the sole M01 empty-guest redirect proposal, now blocked. T07 and A09 retain the wider decision-table and post-login scopes.

## 9. Three final verification passes

The following documentation reviews were performed sequentially after the independent-review corrections. They replace the earlier draft's self-review conclusions. These are reviews by one reviewer, not multiple independent people or application executions.

| Pass | Scope and finding | Correction / result | Remaining limit |
|---|---|---|---|
| A - Evidence integrity | Checked every exact expected label/value/path against available sources; E-labels often established features only | Appendix A quarantines unsupported literals, removes text equality where unnecessary, and blocks essential destination/control gaps | No original file/raw snapshots or current DOM inspection; exact baseline status is explicit |
| B - Case correctness | Reviewed preconditions, setup, numbered actions/results and distinguishable failures across all 30 cases | N07-TC04 now builds a fixed native history suffix; N08 separates indicator, controls, semantics, targets and policy; GP requires approved criteria and bounded readiness | Missing data/policy produces BLOCKED, not failed; inferred geometry/focus/top criteria need explicit approval |
| C - Feasibility and consistency | Reconciled definitions with inventory, register, assessment, traceability and summary; checked black-box/native/external limits | 30 preserved unique IDs, all 13 metadata fields plus action/result/postcondition structure; 73 Markdown tables with consistent columns; 10 ready, 1 Partial, 1 Manual, 18 Blocked; priorities 0/18/12; flags 6/5 | Runner/current fixtures remain unverified; native history method and external tabs need later capability review; no source/API/selector/test-hook dependency |

Read-only parsing checks document structure and distributions; it does not execute application scenarios. Appendix A records individual corrections and source gaps.

## 10. Outstanding questions and dependencies

| Key | Question / required evidence | Affected cases or scope | Current treatment |
|---|---|---|---|
| Q01 | Which build/browser/Cypress versions and isolated runner can reach the private origin? | All cases; CF coverage | Common execution gate; no new network/browser compatibility evidence |
| Q02 | What dated evidence establishes the candidate labels, PRODUCT/MISSING fixtures and contact/trust values? | Route/destination cases throughout | Appendix A distinguishes secondary feature evidence from unverified literals; missing essential targets are blocked |
| Q03 | Which header/scroll/focus expectations are approved? Is the top link expected to restore visible top? | N02 cases, N03-TC04 | Proposed criteria require explicit approval before pass/fail; recording visibility is not approval |
| Q04 | What retention/history policy applies beyond public route consistency? | N04 remainder; cross-reference P12/T04 | No M01 retained selection/cart case; no assumption about push/replace, scroll or saved package |
| Q05 | Is a preview-only native handler environment available with no dialing, sending or saved draft? | N05-TC03 | Manual and environment-gated; otherwise stop before activation |
| Q06 | What is the actual eNAMAD tab/redirect flow and supported external access from the runner? | N06-TC02 | Blocked on TRUST baseline; later reassess external/tab manual split without rewriting target |
| Q07 | Can a browser-only external-failure procedure be approved and restored without affecting ROOT? | N06-TC03 | Blocked environment; no fault injection in this phase |
| Q08 | What authoritative identity/domain/status/date criteria validate the merchant verification? | N06-TC04 | Blocked requirements and external evidence; eventual human comparison |
| Q09 | What exact empty-guest routing is currently observed and intended, and what rules apply to all stage controls and other role/cart rows? | N08-TC01–TC04 blocked | Record indicator/control/semantics/target separately; T07 remains full decision-table owner |
| Q10 | Can safe role/cart fixtures be supplied without M01 adding items, authenticating via SMS or altering customer data? | N08-TC04 | Additional access/setup required; genuine ordinary account only when applicable |
| Q11 | What deployment audience and approved catalog/exception manifest applies? | N09-TC01 | Blocked; apparent QA names are not automatically defects |
| Q12 | What narrow-device and full accessibility standards are supported? | N03-TC04 and cross-references U01–U07 | Narrow top check is a sample; full device/conformance tests outside M01 |

Essential stage-navigation/business/authority policies are flagged for N06-TC04, N08-TC01 through N08-TC04 and N09-TC01 (6 cases). Missing exact source/destination evidence also blocks other cases, without being a business-rule flag. Q03 approval gates inferred visual/focus criteria; no criterion is silently accepted.

## 11. Final module summary and readiness assessment

| Metric | Count / result |
|---|---|
| Total detailed case definitions / unique IDs / primary mappings | 30 / 30 / 30 |
| Included parents | 9 of 9: N01–N09 |
| N01 / N02 / N03 | 3 / 5 / 4 |
| N04 / N05 / N06 | 2 / 3 / 4 |
| N07 / N08 / N09 | 4 / 4 / 1 |
| Cypress-design-ready cases (Cypress-ready subset) | 10 |
| Partial / Manual / Blocked | 1 / 1 / 18 |
| P0 / P1 / P2 | 0 / 18 / 12 |
| Essential stage-navigation/business/authority-rule flags | 6 |
| Special extra access/environment flags | 5 |
| Cases associated with unverified exact baseline candidates, including fixture-only values | 27; see appendix A |
| Executed / passed / failed | 0 / 0 / 0 |

Ready subsets: **N01-TC01, N01-TC02, N01-TC03, N03-TC01, N04-TC01, N04-TC02, N05-TC01, N05-TC02, N07-TC01, N07-TC03**. Partial: **N03-TC04**. Manual: **N05-TC03**. The 18 blocked IDs appear individually in section 6 and the authoritative inventory. Totals reconcile: 10 + 1 + 1 + 18 = 30. Parameter rows/browser runs do not add IDs.

Rule flags: **N06-TC04, N08-TC01, N08-TC02, N08-TC03, N08-TC04, N09-TC01**. Extra access/environment: **N05-TC03, N06-TC02, N06-TC03, N06-TC04, N08-TC04**. These overlap in N06-TC04/N08-TC04; neither set is a blocked-case count. All cases need GP and a reviewed current fixture baseline.

The corrected document is ready for final review of its scope and explicit gates. **M01 is not ready for unconditional approval as an implementation-ready module:** essential source/destination evidence and navigation policies are unresolved. The 10 ready designs use feature/representation/route-coherence assertions with replaceable input fixtures; they do not require unsupported historical exact text. Case approval must explicitly accept the proposed coherence criteria. Evidence-blocked cases must be resolved or explicitly excluded from an approved implementation scope; a signature or destination must not be learned from the same action being tested.

Before any Cypress implementation, confirm the exact source/target baselines in appendix A, approve the proposed UX/coherence and stage policies, establish safe isolated fixtures and finite readiness criteria, review actual DOM selectors, verify independent-runner reachability/browser versions, and assess native history/handler/external-origin capabilities. No source/backend/API setup is assumed. Final case approval and later execution authorization are still required.

Save/checkpoint: this existing M01 file only. Stop here and await explicit approval. No M02, automation code/configuration, package installation, application mutation or test execution is authorized by delivery of this correction.

## Appendix A — Independent Review Corrections and Evidence Verification

Verification date: November 11, 2026 (America/Los_Angeles). This was a documentary verification against Phase 1, the existing M01 draft and the independent-review request. No current guest DOM inspection occurred; consequently there is **no new application observation date/route**. The original named report file and old raw browser snapshots were unavailable. An inherited summary or a repeated claim in M01 cannot independently establish an exact value. Every candidate below is **UNVERIFIED — CURRENT BASELINE REQUIRED**, except the explicitly supported ROOT and viewport inputs. A new observation must record date/time, build if available, route, source region, actual control/text/attributes and evidence reference; approval of intended behavior is a separate step.

### A.1 Exact-value provenance audit

This ledger covers all exact application literals previously used in expected results or identifying test data, including occurrences through shared data keys. Quarantined values below are audit records only; they are not active expected results. Standard browser actions/schemes and the symbolic ROOT/PRODUCT/etc. keys are not claims about exact UI wording.

| Value / affected cases | Supporting source found and its limit | Verification / corrected oracle |
|---|---|---|
| ROOT `http://172.16.30.198:5800/`; all cases | User's target and Phase 1 opening target line establish the intended origin | Supported target input, not proof of current reachability. Use this origin; never substitute localhost |
| `/#products`, `/#how-it-works`, `/#contact`; N02-TC01–TC05 and former N03-TC02 mapping | Phase 1 §2.2 E1 / §3.1 N02 establishes section anchors generally; E3 establishes q/category, not these exact fragments | **UNVERIFIED — CURRENT BASELINE REQUIRED**. NAV must supply independently reviewed source-to-target mappings before execution |
| Header `انتخاب بسته`, `چطور کار میکند؟`, `ارتباط با ما`; N02-TC01/TC04/TC05 | No exact source quotation available; E1's feature list is insufficient | **UNVERIFIED — CURRENT BASELINE REQUIRED**. Removed exact names; use supplied header-region NAV rows |
| Hero `دیدن بسته‌ها`, `آشنایی با فرایند`; closing `بسته‌ها را ببینید`; N02-TC02 | Earlier draft cited an “original home snapshot”; that snapshot is not retained here. General section evidence does not prove these controls | **UNVERIFIED — CURRENT BASELINE REQUIRED**. Confirm actual control existence, source, name and target; do not presume three rows |
| Logo accessible name `EZpost، صفحهٔ اصلی`; N03-TC01 | Phase 1 E1/N03 supports logo/home navigation, not this accessible-name string | **UNVERIFIED — CURRENT BASELINE REQUIRED**. Removed name equality; semantic brand/home-to-ROOT proposal remains reviewable |
| Breadcrumb `خانه` → ROOT; `فروشگاه` → `/#products`; N03-TC02 | Phase 1 §3.1 N03 names breadcrumbs but does not substantiate these exact linked ancestors/targets | **UNVERIFIED — CURRENT BASELINE REQUIRED**. Blocked until BREADCRUMBS independently defines each actual linked ancestor and target |
| Login `بازگشت به فروشگاه` → ROOT; incidental SMS button `دریافت کد پیامکی`; N03-TC03 | Phase 1 E7 establishes mobile entry/guest redirect, not this return link/target or exact button wording | **UNVERIFIED — CURRENT BASELINE REQUIRED**. Removed exact labels and claimed ROOT result; require LOGIN-RETURN. Never activate a submit/SMS control |
| Footer `بازگشت به بالا ↑` and exact href ROOT; N03-TC04 | Phase 1 E1 establishes a top link, not its exact name/href | **UNVERIFIED — CURRENT BASELINE REQUIRED**. Partial visual design uses semantic TOP; proposed same-home visible-top behavior requires Q03 approval |
| PRODUCT `/products/blackfri-01`, title `بلک فرایدی`; N03-TC01/TC02, N04-TC01/TC02, N07-TC04, N08-TC01/TC02 | Inherited summary attributes this fixture to the original report; available Phase 1 E4 only supports product pages generally | **UNVERIFIED — CURRENT BASELINE REQUIRED**. Fixture-only candidate; approve still-public route/distinct identity and ROOT link before execution. No equality to old title/slug is required |
| LOGIN `/login`, CART `/cart`; N01-TC03, N03-TC03, N08-TC01–TC04 | Public login/cart features are supported by Phase 1 E6/E7; exact path syntax is inherited without retained primary quotation | **UNVERIFIED — CURRENT BASELINE REQUIRED**. Approve current route/signature as fixtures; fixtures alone do not establish control destinations |
| Displayed phone `۰۲۱-۹۲۱۲۷`; `tel:+982192127`; N05-TC01/TC03 | Phase 1 E9 records contact existence without exact number. Inherited summary attributes the tel URI to original N05, but not the display; original exact quotation unavailable | **UNVERIFIED — CURRENT BASELINE REQUIRED**. Removed fixed display/URI equality; compare separately reviewed visible and decoded representations. Agreement does not establish the correct support number |
| Displayed `ezpost@tapin.ir`; `mailto:ezpost@tapin.ir`; N05-TC02/TC03 | Phase 1 E9 records email existence; inherited summary attributes mailto URI to original N05. Exact rendered text is not independently available | **UNVERIFIED — CURRENT BASELINE REQUIRED**. Use reviewed current display/recipient baseline and relational comparison, with no message/delivery claim |
| TRUST `https://trustseal.enamad.ir/?id=8080557&Code=iQSgAIZTBHxXc01FzMx9C4KFkoRxjUTt`; N06-TC01–TC04 | Phase 1 E9/N06 establishes eNAMAD link existence only. No available original narrative quotation/raw snapshot proves full URL, host/path or id/Code | **UNVERIFIED — CURRENT BASELINE REQUIRED**. All four cases blocked on a reviewed full destination plus their own additional gates; do not copy these parameters into a test |
| MISSING `/products/qa-missing-984731`; N07-TC01–TC04 | Inherited summary attributes slug to original E10; Phase 1 E10 supports missing-product recovery generally. Current nonexistence cannot be inferred from old wording | **UNVERIFIED — CURRENT BASELINE REQUIRED**. Input candidate only; approve current nonexistent fixture and distinct semantic error signature without withdrawing a product |
| Error `این صفحه پیدا نشد.`, `محصول پیدا نشد.`, recovery `بازگشت به فروشگاه` → ROOT; N07-TC01–TC04 | Phase 1 E10/N07 supports 404/recovery generally, not these literal messages/control/target. No retained raw error-page snapshot | **UNVERIFIED — CURRENT BASELINE REQUIRED**. Removed old wording equality; semantic error/reload design stays ready. RECOVERY target/control-dependent TC02/TC04 are blocked |
| Four stage labels `محصول`, `سبد خرید`, `نشانی و بازبینی`, `پرداخت`; product Previous disabled; product Next → CART; N08-TC01 | Phase 1 E6 confirms four-step indicator only. Inherited report description/scenario proposal is insufficient to prove every literal, actual control and disabled property | **UNVERIFIED — CURRENT BASELINE REQUIRED**. Blocked. Independently verify indicator labels/order/current marker, control presence, disabled semantics, destinations and intended policy |
| Cart Previous → previously visited PRODUCT, completed product-stage link; N08-TC02 | No independently available observation or approved last-product requirement. E6's indicator/cart evidence cannot establish this behavior | **UNVERIFIED — CURRENT BASELINE REQUIRED**. Removed guaranteed PRODUCT return and presumed stage link; blocked pending sequence-specific control/target policy |
| Empty-cart Next `/checkout` → `/login?next=/checkout`; N08-TC03/TC04 | Phase 1 E7/A09 supports guest checkout redirect generally. Exact paths/query and empty-cart policy are not independently established by that text | **UNVERIFIED — CURRENT BASELINE REQUIRED**. TC03 now blocked on dated exact routing evidence and intended policy; TC04 remains gated for other role/cart rows |
| 1366×900 / 390×844; CF Chrome/Firefox coverage | Phase 1 §2.3 explicitly records sampled dimensions and Chrome-only past inspection; no Firefox inspection | Supported historical viewport inputs and proposed future browser coverage only. No universal device support or execution claim |

Historical HTTP 404 in N07 is supported by Phase 1 E10 as a prior narrative observation; it is diagnostic, not an asserted current transport outcome. Q03 geometry/focus/top criteria, ROOT/PRODUCT route coherence and standard link keyboard activation are **proposed acceptance criteria awaiting explicit review**, not invented historical observations. N09 now uses only the supplied content policy; old example product names are not expected values. No exact external error text, merchant identity/status, unknown customer destination or content manifest has been invented.

### A.2 Corrections, readiness and unresolved needs

| Affected IDs | Original problem | Exact correction / revised readiness | Remaining evidence or approval |
|---|---|---|---|
| N02-TC01–TC05 | Exact source labels/fragments and visibility preferences were treated as established | Conditional NAV rows replace literal oracles; all five **Blocked**. Q03 explicitly gates focus/visibility judgments | Dated source-specific control/target evidence; approved local criteria; later keyboard/manual split |
| N03-TC01–TC04 | Exact logo/breadcrumb/login/top labels and destinations overstated | TC01 semantic home design **ready**; TC02/TC03 **Blocked** on targets; TC04 **Partial**, with proposed top behavior | BREADCRUMBS, LOGIN-RETURN, actual TOP and Q03 approval |
| N01-TC03; N04-TC01/TC02 | Fixture paths/titles could look like approved immutable constants | Remain **ready** for route-independent design; exact candidates explicitly unverified, no old title equality | Approved current public fixtures and proposed coherence contract before execution |
| N05-TC01–TC03 | Unsupported exact rendered phone/email strings | TC01/TC02 **ready** representation checks; TC03 **Manual**. Fixed literal oracles removed | Reviewed contact baseline/normalization; safe native preview; contact correctness requires separate owner evidence |
| N06-TC01–TC04 | General eNAMAD evidence used to justify full URL/parameters | TC01/TC02 changed to **Blocked**; TC03/TC04 stay **Blocked**. No historical parameter oracle remains | Full TRUST baseline; actual external flow/capability, scoped fault procedure or authoritative merchant criteria as applicable |
| N07-TC01/TC03 | Exact Persian errors mistaken for retained evidence | Remain **ready** semantic missing/reload proposals; literal equality removed | Verified missing fixture and reviewed semantic signature; language/visual judgment remains bounded |
| N07-TC02/TC04 | Recovery target unsupported; history accepted arbitrary results | Both **Blocked**. TC04 explicitly establishes recovered ROOT → PRODUCT → MISSING, then Back PRODUCT/ROOT and Forward PRODUCT/MISSING with distinct pre-run signatures and failure criteria | Approved RECOVERY-to-ROOT mapping and real native history-entry method. Original recovery push/replace policy remains unjudged |
| N08-TC01–TC04 | Stage existence conflated with controls, disabled state, targets and policy | All four **Blocked**; each property is separate. No guaranteed disabled Previous, last-product return or hardcoded empty-guest redirect | STAGE-NAV observations and policy approval for specified sequences; safe role/cart GATE-ROW for TC04 |
| N09-TC01 | Content policy absent; example names could become constants | Remains **Blocked**; remove historical name examples from test data | Deployment-audience/content-exception manifest |
| All 30 IDs | Readiness/count duplication and inferred UX acceptance | Preserved IDs/parents, explicit pre-run baseline and criteria gate, bounded meaningful failures; all NOT EXECUTED | Independent final case approval and implementation/execution prerequisites in §11 |

### A.3 Unverified-baseline list and final checkpoint

Cases associated with unresolved exact candidates: **N01-TC03; N02-TC01–TC05; N03-TC01–TC04; N04-TC01–TC02; N05-TC01–TC03; N06-TC01–TC04; N07-TC01–TC04; N08-TC01–TC04** — **27 unique IDs**. This inclusive provenance list contains removed text equalities and fixture-only candidates; it does not mean 27 essential exact-text tests remain, or 27 cases are blocked. N01-TC01/TC02 use the user-supported ROOT without exact UI literals; N09-TC01 has no invented content baseline and remains policy-blocked.

Final documentary disposition: **30 cases; 10 Cypress-design-ready subsets; 1 Partial; 1 Manual; 18 Blocked**. The correction is ready for final review with the unresolved scope explicit; the complete M01 module is not ready for unconditional implementation approval. Passes A/B/C are recorded in §9. Resolve or explicitly exclude the blocked scope, confirm the §11 prerequisites, and obtain explicit approval before further work. Stop after saving this document.
## Appendix B — Authorized partial Cypress authoring, 2026-11-11

این الحاقیه توصیهٔ تعویق کاملِ بخش‌های قابل پشتیبانی ۹ کیس را با پوشش تفکیک‌شده جایگزین می‌کند. تعریف‌های اصلی، هر ۳۰ شناسه، نگاشت والدها و حدود نیازمندی‌های مصوب حفظ شده‌اند. هیچ کیس به‌طور کامل automated یا passed اعلام نمی‌شود.

| Case ID | Current authored coverage | Remaining limitation | Execution |
|---|---|---|---|
| N05-TC03 | قرارداد مشترک نمایش/URI و cancellation کنترل‌شدهٔ phone/email | preview/cancel واقعی native و صحت مرجع تماس بررسی نشده | NOT EXECUTED |
| N06-TC02 | baseline لینک، خصوصیات handoff و cancellation کنترل‌شده | تب/redirect/return واقعی خارجی و اعتبار تاجر ثابت نشده | NOT EXECUTED |
| N06-TC03 | forceNetworkError فقط برای fetch آزمایشی مقصد؛ بقای ناوبری داخلی | probe متعلق به harness است؛ بازیابی outage واقعی یا تب خارجی نیست | NOT EXECUTED |
| N06-TC04 | مقایسهٔ URL با مرجع مستقل، پیاده‌سازی‌شده و fixture-gated | مرجع رسمی و صحت هویت/status/date تأمین نشده | NOT EXECUTED |
| N08-TC01 | ترتیب مراحل، disabled semantics اعلام‌شده و href محلی؛ تست مقصد policy-gated | سیاست Next بدون add و Previous مرحلهٔ اول هنوز نیازمند تصمیم است | NOT EXECUTED |
| N08-TC02 | Previous محلی و لغو کنترل‌شده؛ دو sequence ناوبری policy-gated | مقصد محصول قبلی/SHOP و direct-entry fallback تعیین نشده | NOT EXECUTED |
| N08-TC03 | guest واقعی/empty و Next محلی؛ شاخهٔ policy-gated برای navigate یا disabled | سیاست empty-cart eligibility هنوز تعیین نشده | NOT EXECUTED |
| N08-TC04 | سه تست داده‌محور UI با session/storage مصنوعیِ تأمین‌شدنی | fixtures و policy سه ردیف مفقود؛ هیچ اثبات server authorization ندارد | NOT EXECUTED |
| N09-TC01 | مقایسهٔ مجموعهٔ کارت‌های ROOT/SHOP با manifest مستقل، fixture-gated | مخاطب deployment و محتوای مجاز از مالک تأمین نشده | NOT EXECUTED |

جزئیات کامل Case ID → spec/test → assertions → live/simulated → manual → fixture در [گزارش پوشش تألیف](../Reports/EZPOST_QA_PHASE2_M01_AUTOMATION_COVERAGE.md) ثبت است. این جدول و آن گزارش، مرجع وضعیت **تألیف فعلی** هستند؛ شمارش تاریخی ۱۰ ready / ۱ partial / ۱ manual / ۱۸ blocked در بخش‌های قبل، شمارش طراحی کامل پیش از این درخواست است. برای سایر ۲۱ کیس تغییر پوشش یا مجوز جدیدی ثبت نشده است.

پروژهٔ حداقلی محلی با هدف Cypress 16.2.1 ایجاد شده؛ ماژول محلی نصب نشده و runner تأیید نشده است. هیچ Cypress run/open، نصب وابستگی، SMS، call/email، تغییر cart، سفارش یا پرداخت انجام نشده است. inspection خواندنی جدید فقط در QA/Evidence/M01-Authoring-2026-11-11 ثبت شد و اجرای کیس پذیرش نیست؛ این بند وضعیت تاریخی ۱۱ نوامبر است و وضعیت جاری در Appendix C آمده است.

## Appendix C — اجرای مجاز و محدود، ۱۴ نوامبر ۲۰۲۶

درخواست جدید کاربر، setup محلی و اجرای Cypress مهمان/بدون تغییر داده را مجاز کرد. تمام عبارت‌های Design only، NOT EXECUTED و نبود نصب/مجوز در متن پیشین، وضعیت تاریخی checkpoint مربوطه‌اند؛ برای وضعیت جاریِ **زیرمجموعه‌ها** به این الحاقیه و [گزارش اجرای تاریخ‌دار](../Reports/EZPOST_QA_PHASE2_M01_CYPRESS_EXECUTION_2026-11-14.md) مراجعه شود. تعریف معیارهای حل‌نشده، به‌خصوص سیاست checkout، اعتبار اینماد و audience/content، تصویب نشده است.

| مجموعهٔ آخر | موفق | ناموفق | Pending / Skipped |
|---|---:|---:|---|
| Chrome guest، ۳۸ تست | 36 | 2 | 0 / 0 |
| Chrome controlled، ۴ تست | 4 | 0 | 0 / 0 |
| Firefox guest، ۳۸ تست | 35 | 3 | 0 / 0 |
| Firefox controlled، ۴ تست | 4 | 0 | 0 / 0 |

این‌ها تعداد تست/ردیف subset هستند، نه تعداد کیس کامل پاس‌شده. ۲۶ ID در عنوان تست‌های اجراشده‌اند؛ N06-TC01 کنترل مشترک با N06-TC02 دارد و مستقل اجرا نشده؛ N06-TC04، N08-TC04 و N09-TC01 به دلیل نبود reference/fixture/manifest همچنان BLOCKED / NOT EXECUTED هستند. بخش سیاستی N08-TC01–03 نیز اجرا نشده است. ۸ تست requirements عمداً انتخاب نشدند؛ هیچ role ساختگی اجرا نشد.

N02-TC04 در هر دو مرورگر برای دو anchor شکست داشت: URL و main درست‌اند، ولی هدف داخل viewport نیست. inspection مستقل Chrome خارج از Cypress آن را تکرار نکرد؛ علت قطعی runner/app interaction هنوز مشخص نیست و باگ قطعی محصول اعلام نمی‌شود. N07-TC04 در Chrome موفق و در Firefox به دلیل خطای dynamic import CSS/نمای خطای محصول ناموفق شد؛ اجرای متمرکز Firefox نیز همان شکست را ثبت کرد. خطای روش Enter تست با cy.press اصلاح و در هر دو مرورگر موفق شد؛ هیچ assertion برای سبزشدن تضعیف نشد.

چهار اصلاح N02-TC01، N02-TC02، N02-TC04 و N03-TC02 فقط تفکیک page/anchor را درست می‌کنند. مقاصد /shop در تست‌ها baseline صریح ثبت‌شده پیش از کلیک هستند؛ انتخاب نیازمندی K1 هنوز به جای مالک محصول تصویب نشده است. ۳۰ ID و نگاشت والد حفظ شده‌اند.

N05-TC03 و N06-TC02 cancellation harness را دارند، نه OS/native یا تب واقعی. N06-TC03 فقط fetch آزمایشی خراب‌شده و بقای storefront را پوشش می‌دهد. N08ها فقط دامنهٔ guest/semantics و لغو امن دارند؛ سیاست Next/Previous و نقش‌های دیگر همچنان مستقل‌اند. جدول کامل هر ۳۰ کیس، نیازهای همان ۹ کیس، نسخه‌ها، دستورها و شواهد در گزارش اجرا آمده است.

شواهد و stdout/stderr زیر QA/Evidence/M01-Cypress/2026-11-14 حفظ شده‌اند. نصب محلی Cypress 16.2.1 انجام شده؛ config واحد و test isolation حفظ شده‌اند. هیچ SMS، submit، account، cart mutation، سفارش، پرداخت، session شخصی، Git یا M02 انجام نشده است.


