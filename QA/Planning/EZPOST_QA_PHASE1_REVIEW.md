# EZpost QA — Phase 1 Review

Date: November 11, 2026 (America/Los_Angeles). Target: `http://172.16.30.198:5800/`.

Scope: audit and scenario planning only. Every original and additional scenario has execution status **Not executed**. An audit classification of VALID means the proposal is sound; it does not mean the application passed a test. No Phase 2 detailed test cases are included.

## 1. Executive Summary

The original report is a useful public-storefront inventory, but it is not an approved acceptance specification. It includes 67 proposals, prior Chrome guest observations, provisional pricing examples, and explicit gaps in customer authentication, populated cart, checkout, payment, tracking, and customization.

This review preserves all 67 IDs, audits each individually, assigns one primary review classification and one current Cypress feasibility classification per row, and adds only two distinct scenarios: N09 for deployment/content suitability and T08 for concurrent cart operations. Other omissions are extensions of existing scenario families, not duplicate new scenarios.

The most consequential corrections are to separate recorded behavior from acceptance rules; avoid using the application's quote response as the independent monetary oracle; treat cart editing, registration completion, order pages, and customization controls as unverified; distinguish transient I4 evidence from incorrect-cart/order claims; and replace generic automation promises with explicit access/environment gates.

No new application inspection or execution was performed for this review. No source/backend/database access, application changes, packages, Cypress configuration, test code, SMS, cart mutations, orders, or payments were used. The qa-test-planner skill and its regression guidance informed the review structure; their generic e-commerce examples are not EZpost requirements. Existing workspace files unrelated to this document are outside scope.

The recommended first Phase 2 module is **Public navigation and recovery**. Product quotation is the highest-risk early investigation, but its detailed acceptance design depends on pricing rules and a controlled latency environment. The phase checkpoint is document delivery followed by a stop for explicit approval.

Counts and distributions are reconciled in section 12 against the master matrix in section 6.

## 2. Original Report and Evidence Limitations

### 2.1 Primary source and provenance

The primary source is the complete assistant report in this conversation immediately preceding the Phase 1 request. It was re-read in full: inspection context; inventory; all N01–N08, C01–C12, P01–P14, A01–A12, T01–T07, J01–J04, U01–U10 rows; pricing table; decision/state models; coverage matrix; smoke/regression selections; issues I1–I4; and access/requirements gaps.

The request calls that report `Pasted markdown(8).md`. That named file was not located in the workspace, attachments, Desktop, Documents, or Downloads searches. The complete report remains directly available in the conversation, so there is no missing original-report content requiring an invented reconstruction. This document does not claim access to a separate file version. The Phase 1 instructions were read from the attached `Pasted text.txt`.

All E-label observations below are **previously recorded evidence**, not independently reproduced findings in this phase. Browser-generated evidence artifacts from the original inspection were reported removed; this review has the narrative and quoted values, not an independently retained screenshot/HAR set or a versioned build identifier. Exact wording/values are historical samples and must be refreshed before implementation or defect confirmation.

### 2.2 Evidence ledger

| Evidence | Original report records | What it does not establish |
|---|---|---|
| E1 | Persian/RTL public shell; logo; section anchors; account/cart links; skip link; back-to-top | Full accessibility, ordinary-user navigation, or state retention |
| E2 | Eight catalog products, card fields, categories and counts 6/1/1 | Stable fixtures, intended release content, or current counts |
| E3 | Search max length 80, q/category URL composition, Persian match and no-results recovery | Complete matching/normalization rules, every clear-filter action, server enforcement |
| E4 | Eight product detail pages; gallery; dimensions; package/quantity controls; descriptions | Correct business content, every gallery state, unavailable products, visible customization |
| E5 | Quote responses and sample prices; Black Friday input min 1/max 50; tiers from 1/5/10/15 | Authoritative prices, general quantity limits, rounding policy, server-side financial integrity |
| E6 | Empty cart and four-step indicator; checkout link | Populated-cart controls, cart persistence, completed checkout |
| E7 | Mobile login/registration wording; required tel input, maxlength 11, pattern 09[0-9]{9}; guest checkout redirect | SMS delivery, OTP screen/rules, registration implementation, authenticated customer behavior |
| E8 | Sample mobile menu and bottom product purchase bar | Physical-device behavior, native keyboard, all viewport/browser combinations |
| E9 | Phone/email/address/hours/eNAMAD link | Successful external handlers, trust certification validity, authoritative contact policy |
| E10 | Product 404/recovery; sampled 200 requests and console observations | General reliability, absence of defects, controlled failure/retry behavior |
| E11 | Customization promise; no visible editor found across products; hidden form link at checked locations | Feature absent everywhere, unimplemented, available after login, or approved external workflow |

Evidence notation in subsequent tables: **O/E#** = original recorded observation; **I** = inferred customer-facing requirement awaiting agreement; **G** = missing rule/access or unobserved feature. O never means test passed. I/G rows are relevant risk proposals, not assertions that standard e-commerce functionality exists.

### 2.3 Browser and role limits retained

Original inspection reached the private address in an isolated guest browser-tool context reporting Chrome 157. Existing user tabs were not exposed; CLI Chrome CDP attachment failed. The supported Playwright Firefox runtime was unavailable, although a separate installed Firefox process existed. Firefox website inspection did not occur. Desktop 1366×900 and emulated 390×844 were sampled; no physical mobile device was tested. Administrator sessions were not used or changed. Guest status was recorded by a session response with user null; this is supporting observation, not an API prerequisite for future tests.

Future Chrome/Firefox requirements must not be recast as previous coverage. The future Cypress runner must independently reach `http://172.16.30.198:5800/`; loopback/localhost would address a different machine. Actual runner/browser/Cypress version compatibility remains unverified. This planning phase does not install or initialize that runner.

### 2.4 Interpretation and counting rules

- P0 prioritizes financial integrity or customer authorization/confidentiality; P1 prioritizes core journeys; P2 covers secondary presentation and edge behavior. Priority is risk-based, not evidence of an existing severe defect.
- One primary audit classification is assigned per original row. Secondary problems are explained in its correction/blocker cells.
- “Requires correction” in the final counts means exactly **NEEDS CORRECTION**, not every incomplete/blocked proposal. All non-VALID rows still need the stated refinement or prerequisite resolution.
- One primary feasibility label is assigned per scenario, with secondary restrictions in the master matrix. Blocked scenarios are the union of feasibility labels BLOCKED BY AUTHENTICATION, BLOCKED BY REQUIREMENTS, and BLOCKED BY TEST ENVIRONMENT. They remain Not executed, not failed.
- FULLY AUTOMATABLE is reserved for complete browser-verifiable scope with essential prerequisites established. None is granted prematurely here. PARTIALLY AUTOMATABLE means an identifiable UI subset is suitable; manual checks or unresolved parts remain. It does not authorize implementation.
- Review blockers include requirements and feature/access evidence; feasibility additionally distinguishes unavailable runner, safe state, external-service and failure-control capabilities.

## 3. Complete Audit of All 67 Existing Scenarios

The tables retain each original objective. Each row addresses feature relevance/evidence, customer behavior, unsupported assumptions, clarity/breadth, overlap, missing edges, risk priority, practical browser/Cypress feasibility, and dependencies. Suggested subdivisions are **future case categories**, not detailed cases or new IDs. Feasibility abbreviations are expanded in section 6.

### 3.1 Navigation and public pages — 8 originals

| Scenario ID | Original objective | Evidence level | Review result | Missing coverage | Required correction | Priority | Cypress feasibility | Blockers |
|---|---|---|---|---|---|---|---|---|
| N01 | Direct home entry and refresh without login | O/E1–E2; I availability | VALID | No material scope gap; cold/warm are later categories | Keep public guest contract; avoid asserting eight fixed products or a speed target | P1: entry availability | PA | Future reachable runner/browser baseline; no auth needed |
| N02 | Product/process/contact section links | O/E1; I visibility | VALID | Visual scroll/focus evidence still needed at execution | Keep anchors separate from persistence; manual visibility complements DOM target checks | P1: discovery | PA | Future guest runner; header/focus baseline |
| N03 | Logo, breadcrumbs, store and top recovery | O/E1/E4; I destinations | VALID | Route-dependent return behavior to observe later | Preserve destination checks; do not assume filter retention is part of every home link | P2: secondary navigation | PA | Future guest runner; link inventory refresh |
| N04 | Browser back/forward/refresh through journey | O/E1–E6; I/G retention | NEEDS CORRECTION | Distinguish route history from retained package/cart state | Split future navigation and retention categories; only agreed state policies are expected results; P12 owns product retention and T04 cart retention | P1: state loss | BR | Retention rules; genuine cart states for cart portion |
| N05 | Phone/email handler destinations | O/E9; I user intent | VALID | OS/device handler behavior remains manual | Keep browser destination inspection; external launch must stop before call/send and have later approval | P2: support access | MR | Native handlers/devices; no calls/messages authorized here |
| N06 | eNAMAD verification and shopping return | O/E9; G identity validity | VALID BUT INCOMPLETE | Current external-page ownership, pop-up and return behavior | Separate link/navigation subset from human verification of merchant identity; no certification assertion from logo alone | P2: trust | PA | External availability and authoritative merchant identity |
| N07 | Unknown product 404 and recovery | O/E10; I safe error | VALID | No material scenario-level omission | Own nonexistent-route behavior here; leave changed product availability to P13; error console entry alone is not a defect | P1: broken-link recovery | PA | Current unknown route and guest runner |
| N08 | Purchase previous/next stage links | O/E6/E7; G gating | BLOCKED BY REQUIREMENTS | Eligibility/disabled states and empty-cart routing | Stage indicator does not prove checkout availability; T07 owns role×cart decision table; N08 owns link semantics only | P1: funnel access | BR | Empty-cart and stage eligibility rules |

### 3.2 Catalog, search, filtering — 12 originals

| Scenario ID | Original objective | Evidence level | Review result | Missing coverage | Required correction | Priority | Cypress feasibility | Blockers |
|---|---|---|---|---|---|---|---|---|
| C01 | Compare card data with product details | O/E2/E4; G approved content | NEEDS CORRECTION | Data changes; approved starting-price qualification | Treat eight products/current values as examples; consistency alone does not prove correctness. N09 separately owns deployment-content suitability | P1: product/price choice | BR | Approved fixtures, units and starting-price meaning |
| C02 | Full/partial Persian name search | O/E3; G matching | VALID BUT INCOMPLETE | Arabic/Persian kaf/yeh, ZWNJ, diacritics and normalization partitions | Retain observed example only as evidence; add linguistic partitions after matching rules agreed; do not silently mandate normalization | P1: discovery | BR | Searchable fields and Persian equivalence policy |
| C03 | English/mixed-script search | O/E2; I/G case/token rules | BLOCKED BY REQUIREMENTS | Case, token order, punctuation, mixed scripts | Expected membership must come from approved catalog/search rules, not generic search assumptions | P1: mixed catalog access | BR | Case/token matching rules and stable matching data |
| C04 | Search package/name digits | O/E3 placeholder; G semantics | BLOCKED BY REQUIREMENTS | Arabic-Indic digits and counts versus name numbers | Include all three digit systems; determine searchable numeric fields before expecting equivalence | P1: advertised discovery | BR | Numeric normalization/index semantics |
| C05 | Unmatched search and show-all recovery | O/E3; I clear state | VALID | Preserve prerequisite that query truly has no matches | Keep query/data precondition; do not guarantee a hardcoded synthetic term is forever absent | P1: recovery | PA | Current unmatched-query fixture; future runner |
| C06 | Empty, spaces, padded search | O/E3; G trimming | BLOCKED BY REQUIREMENTS | Leading/trailing, repeated and nonbreaking whitespace | Separate empty from normalization classes; do not assume trim-to-all-results behavior | P2: input tolerance | BR | Whitespace and blank-query policy |
| C07 | Search length and special characters | O/E3; I/G limits | NEEDS CORRECTION | Direct URL bypass, Unicode length units, literal output safety | maxlength 80 is a UI observation; specify UTF-16/code-point/grapheme acceptance rule separately. Literal characters are not authorization for intrusive security probing | P2: robust input | BR | Server/URL limit, encoding and rejection/truncation policy |
| C08 | Categories and counts | O/E2/E3; G count meaning | NEEDS CORRECTION | Count scope under search and changing inventory | Remove permanent 6/1/1/8 oracle; use approved current category membership/count rules; preserve all-category recovery | P1: filtered discovery | BR | Stable dataset and count semantics |
| C09 | Combined criteria and independent clears | O/E3; G combination | BLOCKED BY REQUIREMENTS | Clear search only, category only, both; changed category with no matches | Observe real clear controls; use available links/input only; confirm conjunction and retention instead of inventing chips/reset controls | P1: result accuracy | BR | Combination/clear policies and qualifying data |
| C10 | Copied URL, history, refresh | O/E3; I consistency | VALID BUT INCOMPLETE | Rapid successive submissions/filter navigation, encoded state restoration | Add last-visible-navigation consistency; distinguish URL/result synchronization from matching correctness in C02–C09 | P1: repeatable discovery | PA | Current routes; deterministic race portion needs runner controls |
| C11 | Malformed/unknown query parameters | O/E3 route; G policy | BLOCKED BY REQUIREMENTS | Repeated/unknown/empty values and unsupported encodings | Agree precedence and fallback; safe UI error is an inference, not specified status code or redirect | P2: robust links | BR | Query-parameter contract |
| C12 | Failed catalog versus empty catalog | O/E3/E10; I/G failure states | BLOCKED BY ACCESS | Initial versus later failure; recovery retaining criteria; zero-item fixture | Split service failure from valid zero products; controlled response simulation only validates client reaction, not real backend behavior. U09 owns cross-app reconnect | P1: discovery availability | BE | Approved failure controls, empty-catalog fixture; no DB/test-hook assumption |

### 3.3 Product details, packages, pricing — 14 originals

| Scenario ID | Original objective | Evidence level | Review result | Missing coverage | Required correction | Priority | Cypress feasibility | Blockers |
|---|---|---|---|---|---|---|---|---|
| P01 | Product information across eight pages | O/E4; G business correctness | NEEDS CORRECTION | Approved dimensions/content/shipping; absent optional content | Do not treat repeated shipping text as verified fulfillment policy. Separate information consistency, optional-content layout and approved accuracy | P1: informed purchase | BR | Product/content fixture and shipping policy |
| P02 | Gallery image switching | O/E4; I interaction | VALID BUT INCOMPLETE | Broken/slow image, repeated switch, meaningful alternative text | Extend same family for fallback and selected state; visual meaning and image correctness need manual review; do not invent zoom | P2: evaluation | PA | Current multi-image product; visual baseline; controlled failure for fallback |
| P03 | Package-option dependency updates | O/E4/E5; I consistency | VALID BUT INCOMPLETE | Keyboard selection; single-option product; selected state after navigation | Separate final configuration consistency from in-flight behavior owned by P10; quantities/prices require separate approved rules | P1: intended variant | PA | Current package options; monetary oracle remains blocked |
| P04 | Quantity min/max and buttons | O/E5 Black Friday only; G enforcement | BLOCKED BY REQUIREMENTS | Blur/Enter/paste, buttons at both ends, per-product limits | Verify UI and accepted quote/cart limits separately; do not extrapolate 1–50 to all products | P1: quantity integrity | BR | Approved integer/range rules per package/product |
| P05 | Empty, noninteger, unsupported quantities | O/E4 number input; G normalization | BLOCKED BY REQUIREMENTS | Browser sanitization versus application feedback; recovery after invalid input | Keep number-input browser differences; do not require impossible native typing paths or assume normalization/rejection | P1: amount integrity | BR | Accepted numeric grammar and invalid-value policy |
| P06 | Localized digits/whitespace/zeros | O/E4; G acceptance | BLOCKED BY REQUIREMENTS | Mixed scripts, Arabic-Indic, paste and mobile entry | Accepted equivalent inputs and explanatory rejection need agreement; browser refusal is not automatically an app defect | P1: local usability | BR | Localization/input normalization rules |
| P07 | Black Friday tier boundaries | O/E5 historical sample; G authority | NEEDS CORRECTION | Each package's tiers and upper bounds after data change | Use report prices as historical examples only; approve independent price schedule before assertions; tier transitions remain 4/5/6 etc only for that approved fixture | P1: volume pricing | BR | Versioned approved pricing/quantity fixture |
| P08 | Quote arithmetic, labels and rounding | O/E5 sample; G rounding | NEEDS CORRECTION | Display versus raw precision, separators, price per label, round-before/after multiplication | Compute relationships from customer selections and approved schedule. Do not verify API response against the same response; no direct quote-API dependency in future E2E | P0: money correctness | BR | Independent price oracle, currency/rounding/tax basis |
| P09 | Product-specific tiers/no discount | O/E4/E5 hints; G rules | NEEDS CORRECTION | Tier applicability per option and truthful generic discount copy | Missing next-tier hint does not establish no discount. Approve each product schedule and remove any universal quantity-cheaper expectation | P1: correct rule selection | BR | Product-specific schedule including no-tier products |
| P10 | Rapid changes and stale quote responses | O/I4; I current-selection safety | VALID BUT INCOMPLETE | Package+quantity race, pending CTA, failure during latest selection, stable-state reconciliation | Keep one canonical race owner; cover observable pending/final states without invented spinner/disabled-button requirements. P14 owns later cart handoff; do not claim orders affected | P0: stale monetary state | BE | Approved latency/reordering controls and safe handoff environment |
| P11 | Quote failure and retry | O/E5 success only; I/G failure | BLOCKED BY ACCESS | Invalid/missing response data if reproducible, retry of latest selection, old quote visibility | Client fault simulation is evidence of UI handling only; errors and retry affordance must be discovered, not presumed | P1: price recovery | BE | Safe response/network control; approved recovery policy |
| P12 | Selection retention and product isolation | O/E4; G retention | BLOCKED BY REQUIREMENTS | Product A→B→A, refresh and back/forward independently | Distinguish permissible reset from erroneous cross-product carryover; avoid universal persistence expectation | P1: coherent selection | BR | Selection lifetime and navigation policy |
| P13 | Changed product/package availability | O/E10 missing route; G availability | BLOCKED BY ACCESS | Selected item withdrawn, stale link, unavailable package fixture | N07 already owns nonexistent-route 404; retain P13 for availability transitions only and investigate actual availability UI | P1: stale purchase choice | BE | Controlled availability fixture and allowed browser-only setup |
| P14 | Add selected configuration to cart | O/E4 button only; I/G result | BLOCKED BY REQUIREMENTS | Add pending quote; guest policy; exact variant/quantity/amount handoff | Button is not proof of populated-cart semantics. Require approved safe writes; P10 selects race state, P14 verifies handoff, T02 owns final cart reconciliation | P0: purchase integrity | BR | Guest/auth policy, populated-cart evidence, safe data/reset, approved pricing |

### 3.4 Authentication and authorization — 12 originals

| Scenario ID | Original objective | Evidence level | Review result | Missing coverage | Required correction | Priority | Cypress feasibility | Blockers |
|---|---|---|---|---|---|---|---|---|
| A01 | Required mobile/prefix/length validation | O/E7 attributes; I feedback | VALID BUT INCOMPLETE | Paste, native versus custom validation, no-SMS invalid handling | Frontend attributes are evidence, not proof of server checks; later submission needs an approved SMS-safe environment | P1: login entry | PA | Public no-submit subset available in principle; server path blocked |
| A02 | Equivalent mobile digit systems | O/E7; G normalization | BLOCKED BY REQUIREMENTS | Mixed digits and equivalence after normalization | Define accepted scripts without concluding Latin-only pattern proves all input rejected | P1: local login access | BR | Number normalization policy |
| A03 | Formatted/padded/international mobile | O/E7 placeholder; G formats | BLOCKED BY REQUIREMENTS | Placeholder versus maxlength; paste/autofill behavior | Resolve spaces and country-prefix policy; don't treat candidate formatting mismatch as confirmed rejection | P1: login friction | BR | Approved mobile grammar and placeholder intent |
| A04 | Single SMS request | O/E7 control; G next screen | BLOCKED BY ACCESS | Pending/rejection/delivery failure distinction | Real SMS prohibited; use approved non-delivering environment or manual approved process later; no arbitrary numbers | P1: authentication dependency | BE | Controlled number/channel, provider-safe environment, delivery rules |
| A05 | Valid/expired/reused OTP | O/E7 advertised SMS; I/G OTP lifecycle | BLOCKED BY ACCESS | Challenge scope, number-change/back behavior if supported, expiry boundaries | OTP screen and lifecycle are unobserved; specify investigation until discovered. No guessed length/TTL or inaccessible token manipulation | P0: account security | BA | Approved authentication channel/challenge, lifecycle rules and ordinary identities |
| A06 | Empty/malformed/wrong OTP | G unobserved code form; I rejection | BLOCKED BY ACCESS | Attempts limit, digit scripts, boundary lengths only when known | Do not fabricate OTP fields, error wording or lockout. Safe attempts must not lock a real user's account | P0: unauthorized login | BA | OTP access, safe test identity, attempt/lockout rules |
| A07 | Repeated request/resend/recovery | G resend UI; I duplicate safety | BLOCKED BY ACCESS | Cooldown, original-code validity after resend, lost response | Resend is conditional; distinguish deliberate repeated request from transport retry; no real message triggering | P1: access/cost | BE | Approved SMS-safe controls; resend interface/rules |
| A08 | Existing versus new mobile identity | O/E7 wording; G registration | BLOCKED BY ACCESS | Consent, partial registration, data already registered | Login/register heading does not establish auto-provisioning. Require approved synthetic identities and cleanup; do not create accounts in Phase 1 | P1: onboarding | BE | Safe registration environment, consent/profile rules, controlled data |
| A09 | Checkout return after authentication | O/E7 guest redirect; G completion | BLOCKED BY ACCESS | Internal/invalid/external next; preserve intended cart; failed login | Public redirect observed only; authenticate via supported UI/approved session, never admin/cookie fabrication or assumed auth API | P1: funnel continuity | BA | Genuine ordinary-user access, return-target policy, safe cart |
| A10 | Session persistence/expiration | G ordinary session; I privacy | BLOCKED BY ACCESS | Two tabs, server expiry versus browser restart, in-flight private response after expiry | Reopening browser is not proof of server expiration; need natural expiry or approved short-lifetime environment and browser-visible assertions | P0: protected state | BA | Ordinary session, documented lifetime and expiry control |
| A11 | Logout and protected-page revisit | G customer logout control; I privacy | BLOCKED BY ACCESS | Back/forward cache, other tab, logout pending and failure | Discover actual logout; invalidate expectations through visible private access, not token deletion as proof of server logout | P0: shared-device exposure | BA | Customer session/control and logout/cache policy |
| A12 | Guest/customer isolation and privacy | O/E7 guest only; I/G private resources | NEEDS CORRECTION | Two customer ownership fixtures, stale data after user switch, cache/transport scope | Keep UI ownership/isolation; restrict to approved known resources. No guessed admin routes, broad scanning, or claim that black-box UI proves all authorization/backend security | P0: confidentiality | BA | Two genuine customer accounts, approved owned resources, privacy/transport rules |

### 3.5 Cart and checkout entry — 7 originals

| Scenario ID | Original objective | Evidence level | Review result | Missing coverage | Required correction | Priority | Cypress feasibility | Blockers |
|---|---|---|---|---|---|---|---|---|
| T01 | Empty cart and catalog return | O/E6; I zero-state clarity | VALID | No additional scenario needed for empty text/return | Keep identity/badge/message and recovery under this ID; no mutation to establish initial state without permission | P1: purchase starting state | PA | Independently empty guest context, future runner |
| T02 | Populated lines/badge after adds | O/E4/E6 entry only; G cart model | BLOCKED BY REQUIREMENTS | Same product repeated, distinct variants, badge units, subtotal versus payable total | Distinguish product/package identity and merge rules; count intent cannot be assumed. P14 owns handoff; T02 owns stable cart view | P0: amount/identity integrity | BR | Observed populated cart, approved add/merge/badge/total rules, safe writes |
| T03 | Edit quantities and remove items | G controls not observed; I consistency | BLOCKED BY REQUIREMENTS | Multi-item removal, last removal, zero/negative/above limit, repeated remove | Conditional investigation first; do not invent editable fields/remove controls. Split later quantity and removal categories; T06 owns network retry | P1: correcting purchases | BR | Actual populated UI; edit/removal/range policy and safe reset |
| T04 | Retention and guest/login cart transition | O/E6 empty only; G lifecycle | BLOCKED BY ACCESS | Browser history, expiration, conflicting guest/user carts, session change | No assumed merge or persistence; distinguish same-context retention from shared-state concurrency in T08 | P1: continuity | BA | Ordinary session, both cart fixtures, retention/merge/lifetime rules |
| T05 | Reprice/revalidate changed cart | G changes unobserved; I financial disclosure | BLOCKED BY ACCESS | Price/package changes before checkout, customer acknowledgment | Need approved externally managed fixture; no backend or DB mutation. J01 references revalidation, not duplicate repricing ownership | P0: fair final amount | BE | Controlled repricing fixture, policy and safe populated cart |
| T06 | Duplicate action/lost-response recovery | O/E4 button; I/G mutation semantics | NEEDS CORRECTION | Accepted-but-response-lost versus request-not-sent, repeated remove if supported | Do not require every repeated add to be ignored: it may intentionally increase quantity. Define desired action/operation semantics before assessing duplicates; reconcile visible state | P0: unintended monetary operations | BE | Safe mutation/fault environment plus approved repeat/retry semantics |
| T07 | Role × cart checkout gates | O/E6/E7 one combination; G remainder | OVERLAPPING | Ordinary empty/populated and guest populated rows | Preserve ID as canonical decision table; N08 references link behavior and A09 login return. Do not execute the same empty-guest redirect as three separate cases | P1: checkout eligibility | BA | Ordinary session, populated/empty fixtures, eligibility policy |

### 3.6 Downstream journeys — 4 originals

| Scenario ID | Original objective | Evidence level | Review result | Missing coverage | Required correction | Priority | Cypress feasibility | Blockers |
|---|---|---|---|---|---|---|---|---|
| J01 | Address validation and review | O/E6 stage only; G form/rules | BLOCKED BY ACCESS | Real fields/dependencies, edits, review totals, shipping/tax if present | Investigate actual screen before dividing field and review families; no invented postcode/address lengths, dropdown dependencies or taxes | P0: fulfillment/final amount | BA | Ordinary access, safe cart, actual form and approved rules |
| J02 | Payment outcomes and order reconciliation | O/E6 advertised stage; G provider/states | BLOCKED BY ACCESS | Order creation timing, duplicate return, pending/unknown payment, amount/currency | Need sandbox-approved workflow and visible reconciliation oracle. Cannot claim no duplicate charge from UI alone; provider confirmation may be manual | P0: charges/orders | BE | Payment-safe environment, ordinary access, gateway rules and records visible to tester |
| J03 | Order tracking and ownership | O/E1/E7 advertised tracking; G pages | BLOCKED BY ACCESS | Empty history, pagination only if discovered, statuses/refresh, customer B resource | Do not assume history controls/actions. Separate visible tracking, state transitions and ownership categories after discovery; A12 owns general isolation | P0: privacy/fulfillment | BA | Two ordinary identities, seeded orders/statuses, tracking requirements |
| J04 | Discover and assess customization | O/E11 promise; G entry/editor | BLOCKED BY REQUIREMENTS | Availability by product/role/stage; external request versus in-browser editor | Begin with availability decision, then inspect actual controls. Do not create upload/placement/preview expectations from hidden DOM or marketing alone | P1: advertised capability | BR | Product decision, supported entry, access and customization/print rules |

### 3.7 Responsive, accessibility, compatibility — 10 originals

| Scenario ID | Original objective | Evidence level | Review result | Missing coverage | Required correction | Priority | Cypress feasibility | Blockers |
|---|---|---|---|---|---|---|---|---|
| U01 | Layout across widths/orientations | O/E8 two sampled widths; I/G support | VALID BUT INCOMPLETE | Native keyboard, device touch, supported minimum and actual breakpoints | Width examples are exploratory candidates, not approved supported devices; combine DOM geometry with manual visual review | P1: customer access | PA | Supported device matrix; physical devices for native behavior |
| U02 | Mobile menu behavior | O/E8 opening; I state/focus | VALID BUT INCOMPLETE | Close/reopen/navigation, resize, focus and accessible expanded state | Do not prescribe an overlay, animation or Escape behavior without control semantics/requirements | P1: mobile navigation | PA | Current menu DOM, keyboard/manual review |
| U03 | Bottom purchase bar consistency | O/E8; I shared configuration | VALID BUT INCOMPLETE | Pending/error quote, viewport height, zoom/native keyboard occlusion | P10 owns quote race; U03 owns bar/main coherence and visual reachability; no duplicate action through both controls in read-only checks | P1: mobile amount/action access | PA | Current layout; safe writes for action equivalence; device/manual portions |
| U04 | RTL/mixed scripts and numbers | O/E1/E2/E4/E9; I readability | VALID BUT INCOMPLETE | Long mixed names, punctuation, currency groups, dimensions and fallback fonts | Distinguish DOM logical order from perceived bidi meaning; Persian-language manual review is necessary | P1: comprehension | PA | Language-aware reviewer and supported fonts/devices |
| U05 | Keyboard and focus | O/E1 skip link/controls; I operability | VALID BUT INCOMPLETE | Full sequence, focus after SPA navigation/errors, hidden controls and native widgets | Scripted focus subset only; keyboard input is not proof of screen-reader usability; actual shortcuts depend on widget semantics | P1: access to core flows | PA | Keyboard/browser validation; customer access for private pages |
| U06 | Names, states, errors and announcements | O/E1/E7 labels; I/G accessibility | VALID BUT INCOMPLETE | Live price/results feedback, required/error association, selection state | No accessibility conformance claim without agreed standard and assistive-technology checks; include I3 heading/landmark relationship with U07 | P1: accessible decisions | PA | Accessibility target, manual screen reader, error states |
| U07 | Zoom, contrast, headings | O/I3; I/G conformance | VALID BUT INCOMPLETE | Actual browser zoom, reflow, structure versus visual appearance | Viewport resize is not browser zoom; skipped heading rank is an investigation cue, not automatic WCAG failure. Manual check owns full scope | P2: readability/structure | MR | Agreed target, real zoom/contrast and assistive-technology setup |
| U08 | Customer-visible performance | O/E10 single sample; G limits | BLOCKED BY REQUIREMENTS | Meaningful readiness, cold/warm distributions, rendering/interaction cost | No pass/fail from 292 ms or arbitrary 3-second example; Cypress elapsed timings are synthetic diagnostics, not representative real-user metrics | P1: perceived speed | BR | Approved metrics/thresholds and representative device/network profiles |
| U09 | Disconnect/reconnect across app | O/E10 normal path; I recovery | OVERLAPPING | Cross-route reconnection and state/role continuity | Retain ID for app-level recovery; C12/P11/T06/A07 own feature failures. Browser interception does not reproduce every offline/DNS/TLS/service failure | P1: resilience | BE | Approved network control, state fixtures, recovery rules |
| U10 | Chrome/Firefox parity | O: prior Chrome only; G supported runner | NEEDS CORRECTION | Supported versions, native differences and actual Cypress/browser compatibility | Separate future coverage requirement from prior execution. Real-device/other-browser fidelity cannot be inferred from Chrome viewport emulation | P1: supported browser access | BE | Reachable Cypress runner, supported browser versions and browser policy |

## 4. Missing Scenario Coverage

Coverage here measures the adequacy of the **proposal**, not application behavior. “Adequate” still means Not executed. “Partial” means a necessary refinement fits an existing ID. “Conditional” means the operation/control was not observed and must be discovered before detailed expectations. “Blocked” identifies access/rules preventing a complete oracle. More than one limitation can apply; the primary finding is shown first.

### 4.1 Shopping cart — item-by-item gap check

| Requested behavior | Existing coverage | Assessment | Correction or dependency |
|---|---|---|---|
| Open empty cart | T01 | Adequate | Independent empty guest state |
| Correct empty message | T01 | Adequate | Recorded text is historical, not immutable approved wording |
| Return to catalog | T01/N03 | Adequate | T01 owns empty-state recovery; avoid duplicate cases |
| Add single product | P14/T02 | Blocked by rules/environment | Guest policy, safe writes, result/price oracle |
| Add different products | T02 | Partial; blocked | Explicit distinct lines and reconciliation; actual populated model first |
| Same product multiple times | T02/T06 | Partial; blocked | Merge/increment/separate-line intent; deliberate add versus lost-response retry |
| Different package variants | P14/T02 | Partial; blocked | Product identity alone must not substitute for package identity |
| Update quantity | T03 | Conditional | No populated-cart edit control observed |
| Increase quantity | T03 | Conditional | Actual buttons/field and accepted range |
| Decrease quantity | T03 | Conditional | Actual controls and lower-limit behavior |
| Quantity zero | T03 | Conditional; blocked by rule | Reject, remove or normalize cannot be assumed |
| Negative quantity | T03 | Conditional; blocked by rule | Browser entry versus application validation |
| Exceed limit | T03 | Conditional; blocked by rule | Cart limit may differ from product input limit |
| Remove one of multiple items | T03 | Conditional; partial | Preserve unaffected lines and coherent totals |
| Remove last item | T03/T01 | Conditional; partial | T03 owns transition; T01 owns resulting empty presentation |
| Return to empty-cart state | T03/T01 | Adequate as conditional transition | No automatic setup through unauthorized deletes |
| Repeated remove | T03/T06 | Partial; conditional | Stable line identity; absent-line behavior; request result unknown versus repeat intent |
| Repeated add | P14/T06 | Partial; blocked | No universal ignore-double-click expectation without intent semantics |
| Badge consistency | T02/T03 | Blocked by rules | Meaning: lines, packages, labels, or another unit? |
| Subtotal/total consistency | T02/T05/J01 | Partial; blocked | Distinguish merchandise subtotal and payable total; shipping/tax only if present |
| Refresh retention | T04 | Blocked by rules/access | Lifetime, context and guest/customer policies |
| Back/Forward retention | N04/T04 | Partial; blocked | Browser cache/history must not show stale authoritative totals |
| Persistence after login | T04 | Blocked by access/rules | Genuine customer and approved retention policy |
| Guest-to-authenticated transition | T04/A09 | Blocked by access/rules | Guest cart versus existing customer cart conflict |
| Failure during update | T06/U09 | Partial; conditional | Request-not-sent versus accepted-response-lost; recovery cannot be inferred from a toast |
| Duplicate requests/operations | T06 | Partial; blocked | UI observation cannot prove backend exactly-once semantics; visible reconciliation plus approved records needed |
| Cart/display-price synchronization | P10/P14/T02/T05 | Partial; blocked | Tie selected package/quantity to final visible cart; pricing change policy independent |
| Concurrent shared cart operations | No explicit original owner | Missing; add T08 | Separate from T04 persistence: competing stale reads/writes across tabs/sessions can lose or duplicate intent |

T03 is not evidence that update/remove exists. If subsequent discovery finds immutable cart lines or a different correction workflow, revise T03 as an investigation result while preserving its ID; do not fail the application for absent assumed controls.

### 4.2 Product details and monetary integrity

| Coverage topic | Original owner | Assessment and needed refinement |
|---|---|---|
| Product information consistency | C01/P01 | Present; distinguish consistency from approved accuracy and release-content suitability (N09) |
| Package variants and galleries | P02/P03 | Present; extend image failure/slow state and accessible selected state; no assumed zoom/editor |
| Quantity validation, minimum/maximum | P04–P06 | Present but rules blocked; distinguish product-specific limits, browser sanitization, paste/blur/Enter, and localized digits |
| Volume prices and threshold boundaries | P07/P09 | Present; historical tiers need an independently approved price schedule for each package |
| Mathematical calculations and rounding | P08 | Present but correction needed; total labels, unit price, per-label price, line total, currency and rounding are separate future categories |
| Rapid quantity changes | P10 | Partial; latest selection must be reconciled after controlled completion, not asserted during an unspecified debounce period |
| Rapid package changes | P03/P10 | Partial; include combined package-and-quantity changes and non-overwrite by older responses |
| Asynchronous/stale quote responses | P10 | Present; deterministic ordering control needed; do not assume endpoint naming or response schema |
| Loading indicator and quote readiness | P10/U06 | Partial; assess actual pending feedback and meaningful readiness; no requirement for a specific spinner |
| Calculation failure/retry | P11 | Blocked; UI failure and latest-selection retry, including response loss and malformed data only under approved simulation |
| Add while pricing pending | P10/P14 | Already proposed; refine handoff without adding a duplicate pricing ID |
| Incorrect carryover between products | P12 | Already proposed; separate reset/retention policy from forbidden association with another product |

No new product ID is required: P10 already explicitly covers I4's race, and P14 already covers the later cart handoff. P08's maximum priority remains P0 despite unavailable business rules.

### 4.3 Catalog/search/filter completeness

| Coverage topic | Original owner | Assessment and needed refinement |
|---|---|---|
| Full/partial Persian and English names | C02/C03 | Present; matching and case/token rules blocked |
| Persian/Arabic/Latin digits | C04 | Partial; add Arabic-Indic and mixed-script partitions; define package-count versus name-digit search |
| Persian/Arabic letter equivalence | C02/C03 | Missing partition, absorbed into existing families: kaf/yeh variants, ZWNJ and diacritics require product policy |
| Empty/whitespace | C06 | Present; nonbreaking spaces/padded terms extend same family |
| Special characters and length | C07 | Present; direct URL bypass, Unicode length and encoding require correction |
| Category selection/combined filters | C08/C09 | Present; fixture counts and conjunction semantics unresolved |
| Clear each criterion/clear all | C09/C05 | Partial; show-all recovery observed; other clear controls not observed, so no invented reset affordance |
| No results | C05/C12 | Present; distinguish valid empty response from loading/failure |
| Invalid query parameters | C11 | Present but precedence/fallback rules blocked |
| URL synchronization/history/refresh | C10/N04 | Present; add rapid navigation response ordering as refinement, without assuming SPA internals |
| Customer-visible network failure | C12/U09 | Present; feature failure belongs to C12, broader reconnection to U09 |

### 4.4 Authentication/session completeness

| Coverage topic | Original owner | Assessment and needed refinement |
|---|---|---|
| Mobile required/format/length | A01/A03 | Present; HTML attributes are frontend evidence; server behavior untested |
| Persian versus Latin and Arabic-Indic digits | A02 | Present; approved normalization missing |
| SMS request behavior | A04 | Blocked by SMS-safe environment; no request may be triggered here |
| Invalid/expired/reused OTP | A05/A06 | Present, screen/rules unobserved; lengths/attempt limits cannot be invented |
| Repeated request/resend/cooldown | A07 | Present but resend itself unobserved; approved safe delivery channel required |
| Existing login/new registration | A08 | Present, wording only; account creation/consent steps unknown |
| Redirect after login | A09 | Guest half observed; authenticated half requires real customer identity/channel |
| Session persistence/expiration | A10 | Present; natural or approved short expiry, multi-tab and in-flight private UI must be clarified |
| Logout | A11 | Conditional customer control; back-cache/other-tab states need refinement |
| Unauthorized access/isolation | A12/J03 | Present; two owned customer fixtures and authorized URLs required; no admin substitution |

A09–A12 require genuine ordinary-user sessions for completion. A05/A06 also need an approved authentication challenge/channel; A04/A07/A08 require a non-delivering or explicitly approved identity environment. No OTP bypass, guessed cookie, fabricated session, live SMS, or registration execution is authorized in Phase 1.

### 4.5 Checkout/payment/order completeness

| Coverage topic | Original owner | Assessment and needed refinement |
|---|---|---|
| Empty versus populated checkout eligibility | T07/N08 | Present, only empty guest outcome observed; other three role×cart combinations blocked |
| Required address fields/formats/dependencies | J01 | Conditional and access blocked; first inspect actual form, then define limits and field categories |
| Order review and corrections | J01 | Advertised stage only; actual fields/totals/edit controls unobserved |
| Price changes before checkout | T05/J01 | Present; controlled external fixture and disclosure policy needed |
| Shipping/tax calculation | J01/P08 | Conditional: do not assert taxes, fees, free shipping or address-dependent rates exist |
| Payment success/failure/cancel/pending | J02 | Present; approved sandbox and visible state model required; no payments even in sandbox in this phase |
| Duplicate payment/order prevention | J02/T06 | Present; browser display alone cannot prove absence of a second charge/order |
| Order creation timing | J02 | Partial; before/after payment and retry semantics unresolved; define from requirements, not convention |
| Order status/history | J03 | Advertised tracking only; list/history/status UI must be discovered |
| Ownership/privacy | J03/A12 | Present; customer-owned and customer-B fixtures, authorized access scope |

### 4.6 General application quality

| Coverage topic | Original owner | Assessment and needed refinement |
|---|---|---|
| Desktop/mobile responsiveness | U01–U03 | Sampled Chrome viewports only; actual devices, keyboard, touch, orientation remain manual/environment dependent |
| Navigation/broken links/error pages | N01–N08/N07 | Relevant observed links covered; outgoing handlers/external failures require separate manual portions |
| RTL/mixed Persian-English | U04 | Present; visual/linguistic correctness cannot be reduced to a dir attribute |
| Keyboard/form accessibility | U05–U07/A01 | Present; screen reader, labels, announcements and real zoom needed |
| Visual consistency | U01/U03/U04/U07 | Partial; approved visual baseline and product image/content expectations missing; no speculative pixel-perfect design oracle |
| Chrome/Firefox | U10 and all modules | Future requirement only; no Firefox coverage from original report |
| Loading/errors/recovery | C12/P10/P11/A07/T06/U09 | Present but mostly unobserved; explicit ownership avoids duplicate scenario IDs |
| User-visible performance | U08 | Present but blocked by metric/threshold and representative environment; no arbitrary timing pass |
| Deployment content audience | C01 insufficient | Add N09: catalog consistency does not decide whether QA products are appropriate for intended audience |

Sorting, pagination, downloads, password login, and additional customer actions remain **not discovered**. They are explicit investigation gaps, not scenarios asserting those features exist. Add future IDs only if discovery establishes a distinct uncovered behavior.

## 5. Newly Proposed Scenarios

Both additions are Not executed and retain conditional expectations. There are no detailed action sequences, fixtures or implementation instructions here.

| ID | Scenario-level objective | Why existing coverage is insufficient / traceability | Evidence and expected-result basis | Priority | Current feasibility | Access/dependencies |
|---|---|---|---|---|---|---|
| N09 | Assess public catalog/content suitability for the deployment's intended audience | I2 shows apparent QA content; C01 checks card/detail consistency and P01 product information, neither establishes whether intentionally consistent test content should be visible to actual customers | O/E2/I2; G audience/content-release policy. Expected: content matches the approved audience and release catalog; QA records are not automatically defects on a QA deployment | P2 | BLOCKED BY REQUIREMENTS | Guest view plus environment owner's audience decision and approved content manifest; no product deletion/change |
| T08 | Investigate reconciliation of concurrent cart operations in separate views of the same customer/cart | T04 covers persistence/login transition; T06 repeated/retried operations from one action context. Neither explicitly covers conflicting stale updates or removal versus update from two views | O/E6 empty cart only; I lost/duplicated customer intent risk; G shared-cart model and conflict policy. Expected only after policy: observable final state follows the documented conflict rule and discloses unresolved actions | P0 | BLOCKED BY TEST ENVIRONMENT | Discover populated/shared-cart behavior; approved safe writes/reset and multi-view capability; genuine customer if carts are customer-scoped. True multi-tab concurrency needs manual/specialized browser support beyond ordinary single-tab Cypress |

N09 is a requirements-validation scenario, not a direction to remove products. T08 is an investigation until actual cart sharing/edit controls exist; if they do not, record non-applicability with evidence while preserving traceability.

## 6. Corrected Master Coverage Matrix

This is the authoritative countable inventory: exactly one row per unique scenario. All rows are **Not executed**. Section 3 carries the original audit/correction detail; section 5 supplies new-ID rationale. Required access here does not mean it is currently granted. Dependencies include section 11 blocker keys.

Feasibility legend (one primary label per row):

| Code | Classification | Interpretation |
|---|---|---|
| FA | FULLY AUTOMATABLE | Full proposed scope and essential prerequisites established; no row assigned |
| PA | PARTIALLY AUTOMATABLE | Browser-observable subset suitable; manual verification or unresolved scope remains |
| MR | MANUAL TEST REQUIRED | Essential native/human assessment in the current scenario scope |
| BA | BLOCKED BY AUTHENTICATION | Genuine customer identity, approved challenge, session or private UI unavailable |
| BR | BLOCKED BY REQUIREMENTS | Essential expected rule/feature contract unresolved, even if a public UI exists |
| BE | BLOCKED BY TEST ENVIRONMENT | Safe mutable fixtures, external-service sandbox, deterministic fault/concurrency setup, or compatible runner unavailable |

| ID | Reviewed coverage / traceability | Evidence | Priority | Feasibility | Required access | Dependencies / blockers |
|---|---|---|---|---|---|---|
| N01 | Public entry/refresh | O/E1/E2 + I | P1 | PA | Guest | B01 runner; current public baseline |
| N02 | Section links and visibility | O/E1 + I | P1 | PA | Guest | B01; manual focus/scroll subset |
| N03 | Home/breadcrumb/top destinations | O/E1/E4 + I | P2 | PA | Guest | B01; N04 owns retention |
| N04 | History/navigation; P12/T04 retain state ownership | O/E1–E6 + I/G | P1 | BR | Guest; customer for private portion | B04/B05 retention policy |
| N05 | Phone/email link and native handler | O/E9 + I | P2 | MR | Guest + native handlers | B10 device/handler; no call/send |
| N06 | Trust destination, merchant verification | O/E9 + G | P2 | PA | Guest + external page | B10 external identity/availability |
| N07 | Unknown product recovery; P13 availability distinct | O/E10 + I | P1 | PA | Guest | B01; known nonexistent URL |
| N08 | Stage-link semantics; T07 gate owner | O/E6/E7 + G | P1 | BR | Guest initially | B05 checkout eligibility |
| C01 | Card/detail consistency; N09 content audience distinct | O/E2/E4 + G | P1 | BR | Guest | B03 approved catalog/price meaning |
| C02 | Persian names and equivalence partitions | O/E3 + G | P1 | BR | Guest | B03 matching/linguistic rules |
| C03 | English/mixed-name matching | O/E2 + G | P1 | BR | Guest | B03 case/token rules |
| C04 | Name/count numeric search | O/E3 + G | P1 | BR | Guest | B03 three digit systems/index policy |
| C05 | Unmatched results and clear-all recovery | O/E3 + I | P1 | PA | Guest | B01; verified unmatched query |
| C06 | Blank/whitespace query | O/E3 + G | P2 | BR | Guest | B03 trimming/blank policy |
| C07 | UI/URL length, encoding, literal characters | O/E3 + I/G | P2 | BR | Guest | B03 length units/server policy |
| C08 | Category membership/counts | O/E2/E3 + G | P1 | BR | Guest | B03 fixture/count scope |
| C09 | Combined criteria and individual clears | O/E3 + G | P1 | BR | Guest | B03 conjunction/clear controls |
| C10 | URL/result/history and rapid navigation coherence | O/E3 + I | P1 | PA | Guest | B01; B06 for controlled ordering |
| C11 | Invalid/duplicate query parameters | O/E3 + G | P2 | BR | Guest | B03 fallback/precedence |
| C12 | Catalog failure versus empty dataset; U09 app recovery | O/E3/E10 + I/G | P1 | BE | Guest + controlled failure/data | B06 nonmutating controls/empty fixture |
| P01 | Product content/optional sections | O/E4 + G | P1 | BR | Guest | B03 approved content/shipping |
| P02 | Gallery/selection/image fallback | O/E4 + I | P2 | PA | Guest | B01 visual baseline; B06 fallback control |
| P03 | Package-to-summary dependencies | O/E4/E5 + I | P1 | PA | Guest | B01 current options; P08 money oracle |
| P04 | Product-specific quantity range | O/E5 + G | P1 | BR | Guest | B03 accepted limits/enforcement |
| P05 | Invalid quantity grammar/recovery | O/E4 + G | P1 | BR | Guest | B03 integer/normalization policy |
| P06 | Quantity digit systems/formatting | O/E4 + G | P1 | BR | Guest | B03 localized input rules |
| P07 | Tier threshold boundaries | O/E5 + G | P1 | BR | Guest | B03 approved per-package schedule |
| P08 | Labels/amounts/rounding independent oracle | O/E5 + G | P0 | BR | Guest | B03 versioned schedule/currency/rounding |
| P09 | Product/option-specific discount rules | O/E4/E5 + G | P1 | BR | Guest | B03 no extrapolation from hints |
| P10 | Quote race/pending/final state; I4 owner | O/I4 + I | P0 | BE | Guest; safe handoff later | B06 controlled timing; P14 for cart boundary |
| P11 | Quote failure/current-selection retry | O/E5 + I/G | P1 | BE | Guest + fault control | B06; B03 recovery contract |
| P12 | Selection retention and cross-product isolation | O/E4 + G | P1 | BR | Guest | B03/B04 retention; N04 navigation |
| P13 | Availability transition; excludes N07 404 duplication | O/E10 + G | P1 | BE | Guest + controlled fixture | B06 externally provisioned availability |
| P14 | Exact configured product→cart handoff | O/E4 + I/G | P0 | BR | Approved guest/customer cart writes | B03/B05/B06 policy, price, state/reset |
| A01 | Frontend mobile constraints/feedback | O/E7 + I | P1 | PA | Guest; no SMS submission | B01; B07 for any server path |
| A02 | Mobile digit normalization | O/E7 + G | P1 | BR | Guest | B04 supported number scripts |
| A03 | Mobile formatting/placeholder agreement | O/E7 + G | P1 | BR | Guest | B04 number grammar |
| A04 | Request/delivery-state investigation | O/E7 + G | P1 | BE | Approved controlled number/channel | B07 no live SMS |
| A05 | OTP eligibility/expiry/reuse | G + I; E7 advertises SMS only | P0 | BA | Approved challenge and ordinary identity | B02/B04/B07 lifecycle/safe channel |
| A06 | Invalid OTP/attempt handling | G + I | P0 | BA | Approved code screen/test identity | B02/B04/B07 no real lockout |
| A07 | Repeated request/resend/cooldown | G + I | P1 | BE | Approved SMS-safe flow | B07; B04 resend existence/rules |
| A08 | Existing/new identity onboarding | O/E7 wording + G | P1 | BE | Approved existing/new synthetic identities | B07 consent/provision/reset; B04 |
| A09 | Return after login; T07 prerequisite | O/E7 guest half + G | P1 | BA | Ordinary session + safe cart | B02/B04/B05 internal-return policy |
| A10 | Session lifetime/expiry/multi-tab | G + I | P0 | BA | Genuine customer session | B02/B04 natural/controlled expiry |
| A11 | Logout/private revisit | G + I | P0 | BA | Genuine session + actual logout | B02/B04 cache/logout policy |
| A12 | UI ownership/privacy scope; J03 order-specific | O/E7 guest only + I/G | P0 | BA | Two customers + approved resources | B02/B04/B09 privacy fixtures |
| T01 | Empty cart and selection recovery | O/E6 + I | P1 | PA | Independently empty guest | B01; no destructive setup |
| T02 | Lines/variants/repeated intent/badge/totals | O/E4/E6 entry only + G | P0 | BR | Approved populated guest/customer cart | B05/B06 actual model and reset |
| T03 | Conditional cart edits/removal→T01 | G + I | P1 | BR | Discover populated correction controls | B05/B06 existence/limits/removal |
| T04 | Cart lifetime/refresh/history/login transition | O/E6 empty only + G | P1 | BA | Guest and ordinary customer carts | B02/B05 retention/merge; T08 concurrency distinct |
| T05 | Reprice/revalidate before commitment | G + I | P0 | BE | Safe cart + managed price fixture | B03/B05/B06 external provisioning |
| T06 | Repeated intent versus lost-response retry | O/E4 entry + I/G | P0 | BE | Safe mutable cart/fault controls | B05/B06 operation semantics; no DB assumption |
| T07 | Canonical role×cart gate decision table | O/E6/E7 one row + G | P1 | BA | Guest/ordinary; empty/populated carts | B02/B05; N08/A09 references |
| J01 | Actual address/review and final components | O/E6 stage only + G | P0 | BA | Customer checkout + safe cart | B02/B05 actual form/totals; T05 repricing |
| J02 | Payment/order reconciliation lifecycle | O/E6 stage only + G | P0 | BE | Customer + approved payment sandbox | B02/B08 safe payment/independent reconciliation |
| J03 | Conditional history/tracking/ownership | Advertised E1/E7 + G | P0 | BA | Two customers + seeded owned orders | B02/B09 statuses/actual controls; A12 |
| J04 | Customization availability before controls | O/E11 + G | P1 | BR | Guest; customer only if justified | B11 feature decision/entry/print policy |
| U01 | Responsive/physical-device distinctions | O/E8 + I/G | P1 | PA | Guest; customer for private scope | B10 device/breakpoint matrix |
| U02 | Menu states/focus/navigation | O/E8 opening + I | P1 | PA | Guest | B10 keyboard/native control review |
| U03 | Sticky summary coherence/reachability | O/E8 + I | P1 | PA | Guest; safe cart later | B10 device/zoom; P10 quote owner |
| U04 | RTL/bidi/content readability | O/E1/E2/E4/E9 + I | P1 | PA | Guest + language-aware reviewer | B10 linguistic/visual baseline |
| U05 | Keyboard/focus/skip/navigation | O/E1 + I | P1 | PA | Guest; customer for private scope | B10 manual keyboard; B02 private pages |
| U06 | Labels/states/errors/announcements | O/E1/E7 + I/G | P1 | PA | Guest + assistive technology | B10 target/manual screen reader; B06 errors |
| U07 | Real zoom/contrast/heading structure | O/I3 + I/G | P2 | MR | Browser/device + human accessibility review | B10 standard/tools; not resize-as-zoom |
| U08 | Meaningful readiness/performance | O/E10 sample + G | P1 | BR | Representative user-device/network profile | B10 metrics/thresholds; profiling not arbitrary Cypress time |
| U09 | App-level reconnect/state recovery | O/E10 + I | P1 | BE | Isolated controlled network and state | B06; feature failures stay with own IDs |
| U10 | Actual supported Chrome/Firefox runs | O prior Chrome only + G | P1 | BE | Reachable independent runner/browsers | B01/B10 exact version/support policy |
| N09 | NEW: audience/content suitability; I2/C01/P01 | O/E2/I2 + G | P2 | BR | Guest + owner's approved release content | B12 deployment purpose/content manifest |
| T08 | NEW: conflicting shared-cart views; T04/T06 | O/E6 empty only + I/G | P0 | BE | Safe shared-cart fixture/multiple views | B02 if customer-scoped; B05/B06 conflict policy; manual concurrency |

## 7. Cypress Automation Feasibility Assessment

### 7.1 Independent black-box project contract

Future automation must live in an independent test project whose base address is the actual reachable private origin. No import from this WordPress workspace, EZpost source, backend library, database, component mount, private command, application test hook, or invented authentication endpoint is a prerequisite. Existing Cypress-related files in the current workspace were not changed or treated as the EZpost test project.

Assertions should follow visible customer actions and outcomes: route, rendered identity, selected package, accepted quantity, readable totals, feedback, and authorized customer views. Browser-observed traffic may help correlate a UI request and its completion, but an endpoint observed previously is not a supported public API contract. No direct API calls, API-based fixture setup/login, backend instrumentation or internal schema assertions are assumed. Approved browser response simulation is a client-handling diagnostic, kept distinct from a real end-to-end integration result.

Use observable labels, roles, link destinations and the current DOM only after reinspection. No selector inventory has been invented. The prior report recorded labels but does not guarantee stable selectors across builds. A selector stability review must precede implementation. No request index, package database ID, test-product slug, CSS class or data-cy attribute is promised as a durable contract.

### 7.2 Feasibility boundaries

| Capability | Suitable future approach | Limit / gate |
|---|---|---|
| Public navigation/search/forms | UI actions and stable, discoverable visible semantics | Refresh actual DOM/data; confirm acceptance rules; no real SMS |
| Dynamic pricing | Associate current visible selection with completed quote and approved price oracle | No fixed arbitrary sleep; request completion alone is not proof DOM settled; need deterministic race capability for P10 |
| Native number/tel validation | Compare accepted UI values and app feedback in supported browsers | Native bubbles/sanitization and device keyboards need manual checks; HTML attributes do not prove server validation |
| Monetary oracle | Owner-approved versioned schedule; independent calculations from customer selections | Same quote response cannot be both implementation result and independent oracle; currency/rounding/fees must be specified |
| Authentication | Supported UI flow or independently approved session acquisition | No hardcoded/fabricated tokens, admin substitution, assumed login API, live SMS, or provider bypass |
| Session expiry/logout | Visible access/state plus natural/approved expiry conditions | Clearing local browser storage does not prove server logout or revocation; changing client time alone does not expire server sessions |
| Cart/data isolation | Dedicated safe identities, controlled initial state, supported UI setup/reset | Browser state isolation may not reset server cart; no hidden DB cleanup. Do not clean up by deleting real customer records |
| Multiple roles | Supported isolated role contexts where feasible, sequential comparison where equivalent | Sequential customer A/B checks do not establish true simultaneous tabs; approved resource ownership must be known |
| T08 concurrent views | Prefer manual synchronized tabs or later approved multi-context browser capability | Ordinary single-tab Cypress is not native simultaneous tab control. An iframe/new-tab workaround cannot be assumed equivalent |
| External phone/email/trust | DOM destination subset plus manual OS/browser/external review | Cypress cannot certify a merchant, complete native calls/mail, or guarantee external service availability |
| SMS/payment providers | Approved sandbox/non-delivering identity environment and authorized provider evidence | No guaranteed automation of human OTP, external provider UI, cross-origin authentication or payment return; evaluate actual flow later |
| Cross-origin browser pages | Assess actual origins, CSP, frames and supported Cypress version before design | Do not assume an external flow is fully automatable or that same-origin techniques work across origins |
| Accessibility/RTL/visuals | Automated DOM/geometry subset plus human keyboard, screen reader and linguistic review | Automated subset is not accessibility certification; physical zoom, assistive technology, perception and native input remain manual |
| Chrome/Firefox | Explicit supported runner/browser versions and separate executions | Original Chrome tool UA is not Cypress compatibility evidence; Firefox has no prior website inspection |
| Performance/network recovery | Approved measurement profiles, browser-visible readiness, controlled fault tests | Cypress command timing is not a user-performance benchmark; intercepted faults do not prove actual DNS/TLS/offline/provider behavior |

No scenario is classified FULLY AUTOMATABLE before its full scope and essential prerequisites are established. This conservative zero is a readiness conclusion, not a claim that browser automation is impossible. PA scenarios have a concrete automatable subset but still need the listed manual/environment work. BA/BR/BE labels identify the **primary present blocker**, not every possible future obstacle.

### 7.3 Current classification lists

- PARTIALLY AUTOMATABLE: N01–N03, N06–N07, C05, C10, P02–P03, A01, T01, U01–U06.
- MANUAL TEST REQUIRED: N05, U07.
- BLOCKED BY AUTHENTICATION: A05–A06, A09–A12, T04, T07, J01, J03.
- BLOCKED BY REQUIREMENTS: N04, N08–N09; C01–C04, C06–C09, C11; P01, P04–P09, P12, P14; A02–A03; T02–T03; J04; U08.
- BLOCKED BY TEST ENVIRONMENT: C12, P10–P11, P13, A04, A07–A08, T05–T06, T08, J02, U09–U10.

### 7.4 Corrections to original smoke/regression recommendations

The original public smoke included P08 and A09. P08 cannot be a monetary pass/fail gate without an approved independent schedule; A09's post-login part is blocked even though its guest redirect is observed. C01/C02/C08 also need stable data/matching oracles; their recorded values are not permanent smoke fixtures.

The retained **proposed public structural smoke** can select N01–N03, N07, C05, P02–P03, A01's no-submit subset, T01 and U02's public subset once their current baselines are confirmed. This is a selection, not a new scenario set or a ready executable suite. N05/U07 remain manual. Monetary and authenticated smoke selections stay gated by B02–B08. No proposed run duration or pass percentage from generic skill examples is adopted as an EZpost release policy.

## 8. Review of Observed Issues I1–I4

All four remain concerns/investigations, not confirmed defects or executed tests. Severity below is conditional impact; priority is triage urgency. Scenario priority may be higher because it protects a high-impact risk even when the suspected issue's impact is unproven.

| Issue | Currently known | Uncertain | Scenario ownership / additions | Eventual verification approach | Proposed severity / priority |
|---|---|---|---|---|---|
| I1: customization entry not discovered | E11 records customization marketing; no visible editor on eight product pages; hidden form link at checked positions | Role/product/cart-stage eligibility; deferred feature; external request versus in-browser editor; current deployment feature status | J04 canonical investigation; P01 content, N02 discovery; no duplicate new customization ID | Owner supplies supported feature decision, then isolated guest/customer read-only discovery of documented entry. Editor-specific planning follows only if real controls exist; later writes/uploads require approval | Unconfirmed. Potential High customer-journey impact if promised functionality is unavailable; P1 investigation. Do not conclude unimplemented from absence in sampled pages |
| I2: apparent public QA products | E2 records test/placeholder names and a do-not-delete test description | Intentional QA environment or unintended customer-facing catalog; approved release inventory; audience restrictions | NEW N09 owns audience suitability; C01/P01 consistency/content referenced | Obtain environment purpose and approved catalog; compare guest-visible content without altering/deleting products. Confirm intended audience through documented owner decision, not address appearance alone | No defect established. Potential Medium content/trust impact on a customer release; P2. Intentional QA fixture visibility may be acceptable |
| I3: heading hierarchy | Original DOM extraction for test-55 showed H1 followed by H4 for package selection | Actual accessibility tree/landmarks, relationships, affected templates, assistive-tech impact, agreed standard | U06/U07 own semantic/visual/accessibility review; P01 template/content reference; no new ID | Inspect actual heading outline and accessible names/landmarks; distinguish visual size from semantic rank; manual screen-reader heading navigation and keyboard/reflow assessment against approved target | Unconfirmed accessibility defect; likely Low to Medium depending on navigation impact; P2. A skipped rank alone does not prove a specific WCAG failure |
| I4: temporary selection/quote mismatch | Original report records quantity changed 2→5 while prior 240-label total and 9,400,000 IRR remained visible with request pending; add button visible | Debounce duration, accessible loading feedback, whether action is enabled/accepted, stale-response overwrite, final settled correctness, cart/order impact | P10 canonical P0 investigation; P03 selection dependencies, P08 arithmetic, P11 failure, P14 later handoff, T02 final cart, U03 mobile bar, U06 feedback | Controlled separate guest latency/reordering later; observe actual pending/current/failed states and settled UI. Inspect action's visible/semantic availability without activating it. Later safe write environment needed to reconcile actual cart configuration | Transient evidence only; severity **not established**. P1 issue triage; P0 scenario risk. Elevate to High/Critical only if wrong amount/configuration or charge is demonstrated with authorized evidence |

### I4 scenario-level investigation boundaries

| Investigation category | Owner | Evidence required before conclusion | Safety gate |
|---|---|---|---|
| Change quantity during pending quote | P10 | Pending selection versus last confirmed amount and customer-visible readiness | Guest read-only selection; approved timing control later |
| Rapid multiple quantity changes | P10 | Settled totals correspond to latest intended quantity; older completion does not overwrite | Controlled completion ordering, no mutation |
| Rapid variants and mixed changes | P03/P10 | Latest package identity, quantity, label total and money agree together | Same as above |
| Detect stale response effects | P10 | UI before/after controlled old/new completion; correlation without internal state access | Observed browser traffic may diagnose; no direct endpoint contract required |
| Loading/error feedback | P10/P11/U06 | Actual visual/accessibility state; retry does not present stale amount as final | No invented spinner, disabled state, debounce threshold or wording |
| CTA available while incoherent | P10/U03 | Visible/semantic disabled/pending state and focusability; “visible” alone is insufficient | Do not click add in this phase; behavior cannot be established by inspection alone |
| Later safe cart handoff | P14/T02 | Selected package/quantity, settled approved price and actual cart contents after authorized action; recover/reset safely | Dedicated non-production-safe cart/identity and explicit later mutation approval; no checkout/order/payment |
| Order/charge consequences | J01/J02 | Independently reconciled approved sandbox records and UI after authorized later execution | Completely outside Phase 1; no present claim of wrong orders/charges |

No additional pricing ID is needed: these categories refine the existing P10/P14 boundary and related owners. If the actual implementation safely blocks/revalidates an action during pending pricing, transient display alone may not constitute a financial defect; clarity still requires assessment against agreed UX rules.

## 9. Prioritized Roadmap for Future Test-Case Design

Each row is a separate **future** design module. No detailed individual cases have been authored. Work on only one selected module after explicit Phase 1 approval; that module's detailed cases require independent review/approval before any Cypress implementation. Completion of a row does not authorize starting the next.

Common implementation gate for every module: Phase 3 approval of that module's detailed cases; supported reachable independent runner; current selector/baseline review; approved oracles; role/data/reset strategy; manual-versus-automated split; and explicit permission for any consequential operation. A blocked scenario may remain a requirements/discovery item while independent public scope is designed, but is never presented as executable/approved.

| Order / module | Included primary scenario IDs | Prerequisites | Required evidence | Main risks | Required future case categories | Expected review deliverable | Additional implementation gate |
|---|---|---|---|---|---|---|---|
| M01 Public navigation and recovery — recommended first | N01–N09 | Reachable guest origin; link/stage inventory; N04/N08/N09 decisions for blocked portions | Current routes, anchors, 404, external destinations, owner audience decision | Broken entry/recovery; false retention/content assumptions | Positive navigation, direct links/history, unknown route, focus/scroll, controlled external/manual | Approved module scope and traceable case proposal with unresolved gated rows | No calls/email; N09 does not authorize content changes |
| M02 Catalog/search/filter | C01–C12 | Search/normalization rules, approved dataset/count scope, safe failure control for C12 | Matching/nonmatching examples, real clear controls, q/category states | Wrong results; unsupported linguistic expectations; data drift | Equivalence partitions, length/Unicode boundaries, combined decisions, state transitions, failures | Rule-to-scenario/case map and stable test-data contract | No direct backend fixture creation; unknown params policy agreed |
| M03 Product details and selection state | P01–P03, P12–P13 | Approved product info, gallery and availability fixture, retention rule | Actual current products/images/options and unavailable state | Misleading content; cross-product selection; inaccessible images | Data consistency, gallery states/fallback, variant selection, navigation/isolation | Product/variant coverage inventory with manual visual split | Availability changes externally provisioned; no source/DB setup |
| M04 Quantity/pricing and I4 | P04–P11 | Independent pricing/rounding/limits; deterministic latency/failure capability | Current UI plus approved schedule and race timeline | Wrong amount/labels; stale response; unsafe pending action | Numeric partitions/boundaries, tier decisions, arithmetic, ordering, failure recovery | Pricing oracle, scenario-to-rule map and I4 investigation design | No cart writes; simulated fault conclusions separated from real integration |
| M05 Authentication/sessions/privacy | A01–A12 | Ordinary identities, approved challenge channel, session/OTP/redirect/privacy rules | Actual post-mobile screens, logout, expiry and owned resource states | Real SMS/account lockout; unauthorized data; false admin-based coverage | Input partitions, challenge/session state transitions, negative authorization, return navigation | Identity/privacy coverage with safe authentication/data policy | SMS-safe environment; no fabricated sessions; two genuine users for isolation |
| M06 Cart/checkout entry | P14, T01–T08 | Populated cart discovery; add/merge/edit/limits/retention/gating rules; safe identities/reset | Actual line/badge/totals/controls, guest/customer transition and concurrency model | Wrong quantity/price, lost/duplicate intent, server-state leakage | Empty/populated, variants/repeat intent, editing/removal if present, persistence, decision table, failures/concurrency | Cart model, state/intent matrix and case proposal with manual T08 split | Explicit safe cart mutations; reset through supported flow only; no orders |
| M07 Customization availability and supported journey | J04 | Owner availability/entry decision; feature access if present | Real editor or approved external-request flow, actual product/role constraints | Invented feature expectations; upload/print mismatch | Discovery/eligibility first; actual controls/limits/persistence only if established | Evidence-based feature scope or documented non-applicability | No uploads/requests until later authorized; no assumed image formats/limits |
| M08 Address/review | J01 | Customer checkout; actual form; approved address/shipping/tax/review rules | Field/label/limit/dependency inventory and visible final components | Invalid delivery details; inaccurate payable amount | Actual field partitions/boundaries, dependencies, correction/navigation, review consistency | Approved form/rule inventory and checkout case proposal | Decide order-creation boundary before any submission; dedicated safe data |
| M09 Payment/reconciliation | J02 | Approved sandbox/provider, reconciliation access, customer/cart/order lifecycle | Actual gateway/return/pending states and independently approved outcomes | Duplicate charge/order; unknown payment outcome; data exposure | Documented success/fail/cancel/pending, repeat/refresh/retry, order timing | Payment state model and evidence/ownership plan | Explicit later payment authorization even for sandbox; no real charge |
| M10 Customer tracking/history | J03 | Two customers, approved seeded orders and status model | Actual tracking/history controls and authorized/unauthorized views | Other-user data exposure; misleading fulfillment state | Empty/owned/other-user, actual statuses/transitions, navigation/refresh | Order visibility/state proposal referencing A12 | No order/status creation or update by tests unless separately approved |
| M11 Responsive/accessibility/RTL | U01–U07 | Supported device/accessibility target, manual assistive tech and language review | Actual layouts, headings, focus paths, readable bidi examples | Inaccessible journeys, hidden controls, false automated conformance | Responsive/zoom, keyboard, labels/status, semantic outline, visual/linguistic | Manual+automated coverage split linked to previously designed module cases | Actual devices/zoom/screen reader; no viewport-only conformance claim |
| M12 Performance/recovery/browser compatibility | U08–U10 | Thresholds, representative profiles, approved fault control and supported browser versions | Meaningful readiness measurements, Chrome/Firefox evidence, recovery states | Misleading timing claims; unsupported runner; unrecoverable state | Distributions, cold/warm, actual browser comparison, app-level recovery | Measurable acceptance plan and versioned browser/environment matrix | Compatible independent runner; distinguish simulations from real network/service behavior |

The order is dependency-aware, not permission to postpone P0 risks silently: resolve M04's pricing/I4 prerequisites early, and request the M05/M06 environments while public design proceeds. If customization affects cart configuration, resolve B11 before finalizing M06/M08. Accessibility and Firefox requirements apply to every module; M11/M12 are primary review owners, not substitutes for per-module checks.

The primary roadmap allocation covers each master ID once; cross-references in earlier tables preserve shared dependencies without inflating the scenario count.

## 10. Three-Pass QA Review and Correction Log

Three separate reviews were performed over the draft, in order: completeness, evidence/correctness, and practical Cypress feasibility. These are separate review passes by the same reviewer, not a claim of independent people/agents or independent live reproduction. After corrections, the affected tables/lists and counts were rechecked. Read-only document parsing was used to reconcile IDs, table widths, distributions and references; this was not an application test suite.

| Pass | What was checked / issue found | Correction made and affected sections | Recheck / unresolved limit |
|---|---|---|---|
| 1 — completeness | Original inventory might lose IDs during consolidation | Retained all 67 individually in section 3 and section 6; OVERLAPPING labels retain T07/U09; N07/P13 roles separated | Exact expected original ID set checked; no deletion/renumbering |
| 1 — completeness | Cart list hid same-product/variant/repeated-remove and total distinctions inside broad rows | Added explicit section 4.1 mappings; extended T02/T03/T06 rather than generating duplicates | Every requested cart bullet mapped; edit/removal remains conditional |
| 1 — completeness | Concurrent stale cart views were not explicitly covered by persistence/retry | Added T08 with distinct shared-state/conflict objective and T04/T06 references | New addition justified; shared-cart operations still unobserved |
| 1 — completeness | I2 could not be resolved by mere card/detail consistency | Added N09 for audience/content policy; retained C01/P01 consistency | Content audience decision remains B12; no QA-product deletion proposed |
| 1 — completeness | Persian normalization and independent clear actions were implicit | Added kaf/yeh/ZWNJ/diacritics to C02, three digit systems to C04, independent clears to C09 | No new duplicate IDs; actual controls/rules unresolved |
| 1 — completeness | Broad downstream families could look like implemented features | Recorded form/payment/history/customization as advertised/conditional; proposed future category decomposition only | All original features plus undiscovered sorting/pagination/downloads have owner or explicit gap |
| 2 — correctness/evidence | Named report file absent despite full conversational original available | Disclosed exact provenance and file-search limit in section 2; used full conversational report | No alternate file version or new browser evidence claimed |
| 2 — correctness/evidence | Fixed 8/6/1/1 counts and historical quote prices could become acceptance constants | C01/C08/P07/P08 corrected to approved current fixtures and independent schedule | Exact original examples remain historical only; no duplicated self-oracle |
| 2 — correctness/evidence | maxlength/range/pattern observations could be treated as server/business rules | C07/P04/A01 revised to separate native UI limits, acceptance rules, Unicode length units and server behavior | No server enforcement or digit-normalization result claimed |
| 2 — correctness/evidence | Repeated add might be incorrectly assumed always ignored | T02/T06 now distinguish deliberate repeated intent, merge policy, transport retry and unknown result | Exact duplicate semantics remain B05; no backend exactly-once proof from UI |
| 2 — correctness/evidence | I4 visible CTA could be called enabled, and transient mismatch called incorrect order | Section 8 distinguishes visibility, semantic availability, actual action acceptance, settled quote, safe cart and order evidence | I4 financial outcome/severity unconfirmed; P10 risk remains P0 |
| 2 — correctness/evidence | Skipped heading rank could be asserted as automatic accessibility violation | I3/U07 changed to semantic outline and assistive-tech investigation against agreed target | No WCAG pass/fail or screen-reader evidence claimed |
| 2 — correctness/evidence | Browser requirements might be confused with past coverage | E-ledger/U10 retain Chrome-only historical guest evidence and unavailable Firefox inspection | No new Chrome/Firefox visit claimed; mobile viewport not physical-device proof |
| 2 — correctness/evidence | Generic smoke could include blocked pricing/auth assertions | Section 7.4 gates P08 and authenticated A09; keeps structural public subset separate | No smoke run, pass rate or duration claimed |
| 3 — feasibility | Traffic observation might lead to assumed direct API setup/login or schemas | Section 7 requires UI-driven black-box flow; observed traffic diagnostic only, no source/hooks/DB dependency | No fabricated selectors, endpoints, auth tokens or direct fixture APIs |
| 3 — feasibility | Full automation could be promised without prerequisites | Assigned one current feasibility label per ID; zero FA; recorded secondary blockers separately | Audit and master labels/counts reconciled; PA does not imply ready implementation |
| 3 — feasibility | Ordinary Cypress might be assumed to reproduce native handlers/multiple tabs/device fidelity | N05/U07 manual; T08 environment-blocked with manual/specialized concurrency plan; U01/U04/U06 partial | Browser/OS/assistive-tech/external-provider limitations explicit |
| 3 — feasibility | Data cleanup could silently rely on DB/admin/destructive operations | B06/B07/B08 require prearranged safe fixtures and supported reset, never real-customer cleanup | No new test data, cart mutation, record change or environment modification performed |
| 3 — feasibility | Local reachability and a reported Chrome version could be taken as runner readiness | B01/U10 require future runner reachability and supported Cypress/browser versions at actual private origin | No localhost substitution; no package installation/browser support claim |
| 3 — final reconciliation | Different interpretations of “corrected” and “blocked” could yield inconsistent totals | Section 2 defines correction count and mutually exclusive primary feasibility; section 12 reports 11 corrections and 50 unique blockers | 67 audit rows; 69 unique master rows; 28 Markdown tables checked for consistent columns; all 69 IDs allocated once in the roadmap; no unknown scenario references; audit/master feasibility and priorities agree |

Remaining assumptions are listed as unresolved in section 11, not papered over by an “all reviewed successfully” claim. Structural review validates document consistency; it does not validate EZpost functionality.

## 11. Open Questions, Assumptions, and Blockers

| Key | Required decision/access | Scenario impact | Safe resolution boundary |
|---|---|---|---|
| B01 — runner and baseline | Which approved independent Cypress/browser versions can reach the actual private origin? Which build/current UI is under review? | All implementation; U10 primary | Later connectivity/version check; no installation/configuration in Phase 1; never use localhost as target |
| B02 — genuine customer access | Provide approved ordinary-user access and two ownership identities where needed; is approved non-admin session acquisition available? | BA: A05/A06/A09–A12/T04/T07/J01/J03; secondary T08/J02 | Supported login/session only; no copied admin credentials/session substitution |
| B03 — catalog/product/price rules | Approved catalog, searchable fields/normalization/count semantics; quantity grammar/maxima, tier schedules, currency/rounding, shipping copy | C01–C04/C06–C09/C11; P01/P04–P09/P12/P14; T05 | Owner-supplied versioned requirements/public business evidence; no backend source or quote self-oracle |
| B04 — identity/session/state policy | Number formats, OTP length/TTL/retries/resend, registration/consent, safe next targets, session expiry/logout/cache, retained selection | A01–A12; N04/P12 | No real OTP messages/account lockout; do not guess lifetime/automatic registration |
| B05 — cart/checkout model | Does guest add work? Are lines merged? Badge unit? Editable/removable controls? Quantity-zero meaning? Subtotal/total? Retention/merge/conflict/gating? Actual address/review and fees? | N08/P14/T01–T08/J01 | Discover actual UI later and approve rules; no conventional cart/fee assumptions |
| B06 — safe data/fault environment | Dedicated cart fixtures, initial/reset state via supported means, controlled price/availability/empty datasets, timing/failure/concurrency controls | C12/P10/P11/P13/T05/T06/T08/U09 | Externally provisioned or approved customer UI setup later; no direct DB/API hooks, source changes, real-record cleanup or cart changes now |
| B07 — SMS-safe authentication | Controlled identities, non-delivering/safe channel, actual challenge/resend and registration access | A04–A08; secondary other auth flows | No live SMS or new-account creation in this phase; no bypass assumed |
| B08 — payment-safe reconciliation | Actual provider, approved sandbox/outcomes, order-creation timing, pending/retry/dedup rules, independent authorized records | J02; monetary downstream gates | No real or test payment now; later explicit approval required; UI alone insufficient to rule out duplicate charge |
| B09 — customer orders/privacy | Actual order/history/tracking pages/statuses, seeded owned/other-user orders and authorized scope | J03/A12 | No guessed URLs, scanning, real customer data exposure or status/order mutation |
| B10 — quality/browser/device targets | Supported Chrome/Firefox versions, viewport/device baseline, accessibility target, Persian review, native zoom/handlers, metrics/thresholds | U01–U10; N05/N06 | Manual/physical-device portions declared; no generic WCAG/performance pass claims |
| B11 — customization decision | Is the advertised capability active? Which product/role/stage? Editor or external request? Actual limits, preview/print requirements? | J04; I1; potential P14/J01 dependency | Marketing/hidden DOM alone is not implementation evidence; no form request/upload |
| B12 — deployment audience | QA-only environment or actual customer release? Which catalog/content is approved for it? | N09/I2; C01/P01 | Document audience before labelling test data a defect; do not remove it |

Primary authentication-blocked IDs: **A05, A06, A09, A10, A11, A12, T04, T07, J01, J03**. This is not the full set with any authentication dependency: J02 also needs a customer but is primarily environment-blocked; T08 needs one if sharing is account-scoped; A04/A07/A08 need approved identity-channel/test data.

Primary requirements-blocked IDs: **N04, N08, N09; C01–C04, C06–C09, C11; P01, P04–P09, P12, P14; A02–A03; T02–T03; J04; U08**. Other scenarios still have secondary rule questions even when access/environment is their primary blocker.

Primary environment-blocked IDs: **C12, P10, P11, P13, A04, A07, A08, T05, T06, T08, J02, U09, U10**. Some public subsets of these broad scenarios could later be designed independently; the full scenario is not ready.

Unresolved business rules remain explicit. In particular, empty-cart→login is an observation, not approved eligibility; absent tier hint is not no-discount evidence; no discovered editor is not proof of no implementation; “login/register” is not proof of automatic account creation; and browser-visible consistency is not proof of all backend authorization/financial properties.

## 12. Final Phase 1 Summary

### 12.1 Reconciled inventory and review totals

| Metric | Count / result |
|---|---|
| Original scenarios | 67 |
| Original scenarios individually reviewed | 67 |
| Original IDs omitted, deleted, or renumbered | 0 |
| Original scenarios with primary NEEDS CORRECTION classification | 11 |
| Other original rows requiring refinement, overlap handling, or blocker resolution | 49 |
| VALID original proposals | 7 |
| All non-VALID original proposals | 60 |
| Proposed new scenarios | 2: N09, T08 |
| Total unique master scenarios | 69 |
| Scenarios blocked by a primary BA/BR/BE feasibility label | 50 |
| P0 scenarios among those 50 blocked proposals | 15 of 15 P0 scenarios |
| Unblocked-primary PA/MR proposals | 19, still Not executed and not necessarily implementation-ready |
| Executed / passed / failed application scenarios in this phase | 0 / 0 / 0 |

| Original audit classification | Count |
|---|---:|
| VALID | 7 |
| VALID BUT INCOMPLETE | 14 |
| NEEDS CORRECTION | 11 |
| OVERLAPPING | 2 |
| BLOCKED BY REQUIREMENTS | 17 |
| BLOCKED BY ACCESS | 16 |
| **Total originals** | **67** |

NEEDS CORRECTION IDs: N04, C01, C07, C08, P01, P07, P08, P09, A12, T06, U10. Audit classification counts differ from feasibility blocker counts because they describe different things; for example, a valid-but-incomplete proposal can have an unresolved essential requirement, and an access-blocked proposal can primarily need a safe environment rather than an authenticated session.

| Current Cypress feasibility | Count |
|---|---:|
| FULLY AUTOMATABLE | 0 |
| PARTIALLY AUTOMATABLE | 17 |
| MANUAL TEST REQUIRED | 2 |
| BLOCKED BY AUTHENTICATION | 10 |
| BLOCKED BY REQUIREMENTS | 27 |
| BLOCKED BY TEST ENVIRONMENT | 13 |
| **Total master scenarios** | **69** |

| Priority | Original 67 | New 2 | Master total |
|---|---:|---:|---:|
| P0 | 14 | 1 | 15 |
| P1 | 45 | 0 | 45 |
| P2 | 8 | 1 | 9 |
| **Total** | **67** | **2** | **69** |

Original priorities were individually reviewed and retained: none needed a forced rank change. The correction is to clarify risk rationale and blocked scope, not to imply that every P0 proposal is a confirmed critical defect. N09 adds P2 content-audience risk; T08 adds P0 monetary concurrency risk. Parent priority is the highest credible customer impact; later detailed cases may have distinct priorities without renumbering their parent scenario.

| Group | Original count | New IDs | Master count |
|---|---:|---|---:|
| Navigation/public content | 8 | N09 | 9 |
| Catalog/search/filter | 12 | None | 12 |
| Product/package/pricing | 14 | None | 14 |
| Authentication/authorization | 12 | None | 12 |
| Cart/checkout entry | 7 | T08 | 8 |
| Downstream journeys | 4 | None | 4 |
| Responsive/accessibility/compatibility | 10 | None | 10 |
| **Total** | **67** | **2 additions** | **69** |

### 12.2 Remaining risk and next checkpoint

The leading unresolved risks are I4's pending/stale quote and later cart boundary; the lack of an independent pricing/rounding oracle; unknown populated-cart intent/merge/conflict semantics; unavailable ordinary-user/session/order-isolation evidence; unknown payment/order reconciliation; and the customization promise without a discovered supported entry. Firefox compatibility and representative device/accessibility/performance evidence remain outstanding.

The recommended FIRST Phase 2 module is **M01 — Public navigation and recovery**, with N04/N08/N09 explicitly gated until their rules are supplied. Resolve M04 pricing/I4 prerequisites early as a decision/environment preparation topic, while keeping detailed test-case design to one approved module at a time.

Phase 1 is complete as a documentary review, not product certification. The deliverable is `EZPOST_QA_PHASE1_REVIEW.md` in the current workspace. Stop here: await explicit user approval before selecting one module for detailed test-case design. No Phase 2 cases, Cypress implementation/configuration, package installation or application test execution has begun.


