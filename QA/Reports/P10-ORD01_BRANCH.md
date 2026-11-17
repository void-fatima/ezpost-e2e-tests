# P10-ORD01 — independent regression branch

Branch: test/p10-ord01-stale-quantity. Parent: original published main 6c666ece589f4af1eab45fa886afa2874e5ed9b8.

Only the P10-ORD01 test body is updated; the other three controlled case bodies remain the original baseline. Shared lifecycle and atomic presentation helpers are included. The unchanged legacy observeQuoteConsumption helper remains available for the other original stale-response case.

Contract: package49/quantity3 must retain360 labels after older package49/quantity2 terminates. Reject240 and the older captured monetary presentation.

Source: S1 in the ordering cases and the explicit user test-correctness instruction. Captured prices verify presentation only; no independent pricing, cart, order or payment conclusion.

The exact target body was visibly executed in the combined reviewed spec in Chrome157 and Firefox160, with and without the fetch observer, and correctly FAILED on the stale240 result. This newly isolated branch combination has only been statically validated; it was not separately rerun. No assertion was weakened and no skip or application mutation added.

Complete reports and preserved execution evidence: https://github.com/void-fatima/ezpost-e2e-tests/tree/69ffc119aa0f64ef32e16a2de1ddf1777e05f5e8/QA/Reports
Review report: https://github.com/void-fatima/ezpost-e2e-tests/blob/69ffc119aa0f64ef32e16a2de1ddf1777e05f5e8/QA/Reports/EZPOST_QA_P10_TEST_CORRECTNESS_2026-11-17.md
