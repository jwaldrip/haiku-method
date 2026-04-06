var P = ".haiku/intents/payment-integration-qa";
window.HAIKU_DEMO_CONFIG = {
  title: "quality-assurance",
  studio: "quality-assurance",
  stages: ["plan","design-tests","execute-tests","analyze","certify"],
  completionText: "All 5 stages passed. payment-integration-qa delivered.",
  steps: [
  {delay:800,actions:[function(){addMsg("user","you","/haiku:new")}]},
  {delay:1200,actions:[function(){addTyping()}]},
  {delay:1000,actions:[function(){removeTyping();addMsg("agent","agent","What do you want to accomplish?")}]},
  {delay:1500,actions:[function(){addMsg("user","you","QA the new payment processing integration with Stripe")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1200,actions:[function(){removeTyping();addMsg("agent","agent","Creating intent: payment-integration-qa...");addFile(P+"/intent.md")}]},
  {delay:800,actions:[function(){addMsg("system","system","Intent created. Studio: quality-assurance. 5 stages: plan \u2192 design-tests \u2192 execute-tests \u2192 analyze \u2192 certify")}]},

  // === PLAN (hats: strategist, planner | review: ask) ===
  {delay:1000,actions:[function(){activateStage("plan");addMsg("agent","agent","Entering plan stage. Hat: strategist.\nWhat payment flows need coverage? And what\u2019s the risk tolerance?");addFile(P+"/stages/plan/state.json")}]},
  {delay:2000,actions:[function(){addMsg("user","you","Card payments, refunds, webhooks, and subscription billing. Zero tolerance for double-charges \u2014 that\u2019s a P0.")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1200,actions:[function(){removeTyping();addMsg("agent","agent","Hat: planner. Decomposing into coverage areas...");addFile(P+"/stages/plan/units/unit-01-test-strategy.md");addFile(P+"/stages/plan/units/unit-02-coverage-matrix.md");addCard("plan","test-strategy","in-progress");addCard("plan","coverage-matrix","")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Test strategy: 4 payment flows, 12 edge cases (expired cards, insufficient funds, webhook retries, idempotency keys). Coverage matrix maps each flow to test types: unit, integration, E2E, load.");updateCard("plan","test-strategy","completed");updateCard("plan","coverage-matrix","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("20")}]},
  {delay:1200,actions:[function(){removeFastForward();addFile(P+"/knowledge/TEST-STRATEGY.md");updateCard("plan","coverage-matrix","completed");addMsg("agent","agent","Strategy complete. 87% coverage target with P0 double-charge scenario at 100%.")}]},
  {delay:800,actions:[function(){addMsg("system","system","Plan complete. Review gate: ask.");addMsg("agent","agent","Review the test strategy?")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Add webhook failure replay testing \u2014 Stripe retries up to 3 times.")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1000,actions:[function(){removeTyping();addMsg("agent","agent","Added webhook retry scenarios (1x, 2x, 3x) with idempotency verification. Approved.")}]},

  // === DESIGN-TESTS (hats: designer, automator | review: auto) ===
  {delay:1000,actions:[function(){activateStage("design-tests");addMsg("agent","agent","Entering design-tests stage. Hat: designer.\nLoading test strategy...");addFile(P+"/stages/design-tests/state.json")}]},
  {delay:600,actions:[function(){addMsg("system","system","Resolved inputs \u2192 plan/test-strategy (knowledge/TEST-STRATEGY.md)")}]},
  {delay:800,actions:[function(){addMsg("agent","agent","Designing test cases for each payment flow...");addFile(P+"/stages/design-tests/units/unit-01-payment-tests.md");addFile(P+"/stages/design-tests/units/unit-02-webhook-tests.md");addCard("design-tests","payment-tests","in-progress");addCard("design-tests","webhook-tests","")}]},
  {delay:500,actions:[function(){addFastForward("40")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: automator. 34 test cases designed. Payment tests: happy path, decline, 3DS, partial refund, full refund. Webhook tests: success, retry 1-3, payload signature verification.");updateCard("design-tests","payment-tests","completed");updateCard("design-tests","webhook-tests","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("25")}]},
  {delay:1200,actions:[function(){removeFastForward();addFile(P+"/knowledge/TEST-SUITE-SPEC.md");updateCard("design-tests","webhook-tests","completed");addMsg("agent","agent","All test cases designed and automation framework selected (Playwright + Stripe test mode). Review agents passed.")}]},

  // === EXECUTE-TESTS (hats: tester, reporter | review: auto) ===
  {delay:1000,actions:[function(){activateStage("execute-tests");addMsg("agent","agent","Entering execute-tests stage. Hat: tester.\nLoading test suite spec...");addFile(P+"/stages/execute-tests/state.json")}]},
  {delay:600,actions:[function(){addMsg("system","system","Resolved inputs \u2192 design-tests/test-suite-spec, plan/test-strategy")}]},
  {delay:800,actions:[function(){addMsg("agent","agent","Executing 34 test cases against Stripe test mode...");addFile(P+"/stages/execute-tests/units/unit-01-run-payments.md");addFile(P+"/stages/execute-tests/units/unit-02-run-webhooks.md");addCard("execute-tests","run-payments","in-progress");addCard("execute-tests","run-webhooks","")}]},
  {delay:500,actions:[function(){addFastForward("60")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: reporter. 31/34 passed. 3 failures:\n\u2022 Partial refund on subscriptions returns wrong amount\n\u2022 Webhook retry #3 creates duplicate event\n\u2022 3DS timeout doesn\u2019t clean up pending charge");updateCard("execute-tests","run-payments","completed");updateCard("execute-tests","run-webhooks","in-progress")}]},
  {delay:2000,actions:[function(){addMsg("user","you","The partial refund bug \u2014 is that our code or Stripe\u2019s?")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1000,actions:[function(){removeFastForward();removeTyping();addMsg("agent","agent","Our code. We\u2019re calculating refund amount on the original charge, not the prorated subscription amount. Logging as P1 defect.");updateCard("execute-tests","run-webhooks","completed");addFile(P+"/stages/execute-tests/artifacts/TEST-RESULTS.md")}]},

  // === ANALYZE (hats: analyst, statistician | review: ask) ===
  {delay:1000,actions:[function(){activateStage("analyze");addMsg("agent","agent","Entering analyze stage. Hat: analyst.\nLoading test results...");addFile(P+"/stages/analyze/state.json")}]},
  {delay:600,actions:[function(){addMsg("system","system","Resolved inputs \u2192 execute-tests/test-results, plan/test-strategy")}]},
  {delay:800,actions:[function(){addMsg("agent","agent","Analyzing quality metrics...");addFile(P+"/stages/analyze/units/unit-01-results-analysis.md");addCard("analyze","results-analysis","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: statistician. Quality report:\n\u2022 Pass rate: 91.2% (31/34)\n\u2022 P0 double-charge: PASS (0 occurrences)\n\u2022 P1 defects: 2 (refund calc, webhook dedup)\n\u2022 P2 defects: 1 (3DS timeout cleanup)\n\u2022 Coverage: 89% of mapped flows");addFile(P+"/knowledge/QUALITY-REPORT.md");updateCard("analyze","results-analysis","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Analyze complete. Review gate: ask.")}]},
  {delay:1500,actions:[function(){addMsg("user","you","The P1s need to be fixed before we certify. Can we proceed with the P2 as known issue?")}]},
  {delay:800,actions:[function(){addMsg("agent","agent","Agreed. P1s flagged as blockers for certification. P2 added to known issues with workaround documented. Approved.")}]},

  // === CERTIFY (hats: certifier, reviewer | review: external) ===
  {delay:1000,actions:[function(){activateStage("certify");addMsg("agent","agent","Entering certify stage. Hat: certifier.\nLoading quality report...");addFile(P+"/stages/certify/state.json")}]},
  {delay:600,actions:[function(){addMsg("system","system","Resolved inputs \u2192 analyze/quality-report, execute-tests/test-results")}]},
  {delay:800,actions:[function(){addMsg("agent","agent","Preparing certification report...");addFile(P+"/stages/certify/units/unit-01-certification.md");addCard("certify","certification","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("25")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: reviewer. Certification assessment:\n\u2022 P0 criteria: MET (no double-charges)\n\u2022 P1 criteria: BLOCKED (2 open defects)\n\u2022 Recommendation: Conditional pass pending P1 fixes\n\u2022 Known issue: 3DS timeout cleanup (P2, workaround documented)");addFile(P+"/knowledge/CERTIFICATION-REPORT.md");updateCard("certify","certification","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Certify complete. Review gate: external.");addMsg("agent","agent","Sharing certification report for QA lead sign-off...")}]},
  {delay:800,actions:[function(){showCriteriaReview("Certify","payment-integration-qa",["P0 double-charge: 0 occurrences across all test runs","P1 partial refund: fix verified in re-test (31/34 \u2192 33/34)","P1 webhook dedup: fix verified with idempotency key check","P2 3DS timeout: documented as known issue with workaround","Coverage target: 89% achieved (target 87%)"],"external")}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:2200,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("system","system","External review approved \u2014 QA lead signed off.");addMsg("agent","agent","Payment integration certified. Conditional release approved.")}]},

  // === COMPLETE ===
  {delay:1000,actions:[function(){completeAllStages()}]}
  ]
};
