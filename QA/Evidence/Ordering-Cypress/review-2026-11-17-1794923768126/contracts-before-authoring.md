# Contracts recorded before changing tests — 2026-11-17

Both cases start in a new isolated guest product page. Product blackfri-01, package49/120 labels and captured read-only quote fixtures must still match the inspected UI. No cart/auth/order writes.

P10-ORD01: initial49/q1; user increases to q2 (reply held), then native ArrowUp/Tab to q3. Exact latest49/q3 reply must present 3×120=360 before old49/q2 is released. After observable old-response termination and rendering, same product, package49, q3, 360 labels and captured latest monetary presentation must remain together. Reject 240 even if request succeeded.

P10-ORD02: initial49/q1; user increases to q2 (reply held), selects package50/240. Exact latest50/q2 must present 2×240=480 before old49/q2 is released. After observable old-response termination and rendering, same product, uniquely selected package50, q2, 480 labels and captured latest monetary presentation must remain together. Reject 240 and the old package.

Source: approved technical consistency S1 in QA/Test-Cases/EZPOST_QA_ORDERING_TEST_CASES.md, Phase1 P03/P10, and current user instruction. Fixture monetary values verify presentation only; no independent price approval.

Terminal outcomes: completely delivered reply (including discarded unread body), native AbortError cancellation, or completed/aborted body delivery. Generic network failures do not automatically qualify as cancellation.

Negative oracle checks: good selection accepted; wrong product, package, quantity, labels (known240), line total, unit price and per-label presentation rejected using the same final validator. Isolated data, no app state injection.

P08/P11 behavior is preserved; not widened to pricing correctness or real service recovery. All current results remain NOT EXECUTED until visibly verified.

Finite rendering observations cannot exclude arbitrary future scheduled work. No application internal state will be set.
