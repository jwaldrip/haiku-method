var P = ".haiku/intents/api-latency-spike-p1";
window.HAIKU_DEMO_CONFIG = {
  title: "incident-response",
  studio: "incident-response",
  stages: ["triage","investigate","mitigate","resolve","postmortem"],
  completionText: "All 5 stages passed. api-latency-spike-p1 resolved.",
  steps: [
  // User invokes
  {delay:800,actions:[function(){addMsg("user","you","/haiku:new")}]},
  {delay:1000,actions:[function(){addTyping()}]},
  {delay:800,actions:[function(){removeTyping();addMsg("agent","agent","What do you want to accomplish?")}]},
  {delay:1200,actions:[function(){addMsg("user","you","API latency spike \u2014 P1 incident. /orders endpoint p99 jumped from 200ms to 12s five minutes ago.")}]},

  // Intent created
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1000,actions:[function(){removeTyping();addMsg("agent","agent","Creating intent: api-latency-spike-p1...");addFile(P+"/intent.md")}]},
  {delay:800,actions:[function(){addMsg("system","system","Intent created. Studio: incident-response. 5 stages: triage \u2192 investigate \u2192 mitigate \u2192 resolve \u2192 postmortem")}]},

  // === TRIAGE ===
  {delay:800,actions:[function(){activateStage("triage");addMsg("agent","agent","Entering triage stage. Hat: incident-commander.\nAssessing severity and blast radius...");addFile(P+"/stages/triage/state.json")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/triage/units/unit-01-severity-assessment.md");addFile(P+"/stages/triage/units/unit-02-blast-radius.md");addFile(P+"/stages/triage/units/unit-03-comms.md");addCard("triage","severity-assessment","in-progress");addCard("triage","blast-radius","");addCard("triage","comms","")}]},
  {delay:500,actions:[function(){addFastForward("15")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: first-responder. Severity confirmed: SEV-1.\n  \u2022 /orders p99: 12.3s (baseline 200ms)\n  \u2022 Affected: all order creation, 100% of checkout flow\n  \u2022 Error rate: 34% of requests timing out at 30s\n  \u2022 Customer impact: ~2,400 failed checkouts in last 5 minutes");updateCard("triage","severity-assessment","completed");updateCard("triage","blast-radius","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("10")}]},
  {delay:1000,actions:[function(){removeFastForward();addMsg("agent","agent","Blast radius:\n  \u2022 Direct: /orders, /checkout, /payments\n  \u2022 Indirect: inventory reservation service (queue backing up)\n  \u2022 Unaffected: /catalog, /auth, /search\n  \u2022 Regions: all (us-east-1, eu-west-1, ap-southeast-1)");updateCard("triage","blast-radius","completed");updateCard("triage","comms","in-progress")}]},
  {delay:1200,actions:[function(){addMsg("agent","agent","Who should I notify? I see your on-call rotation has @backend-team and @platform-team.")}]},
  {delay:1800,actions:[function(){addMsg("user","you","Notify both teams plus @vp-engineering. This is customer-facing revenue impact.")}]},
  {delay:800,actions:[function(){addMsg("agent","agent","Notifications sent. Incident channel #inc-2024-0847 created.");updateCard("triage","comms","completed");addFile(P+"/knowledge/INCIDENT-BRIEF.md")}]},

  // Triage gate - auto
  {delay:800,actions:[function(){addMsg("system","system","Triage complete. Review gate: auto. All criteria met \u2014 advancing.");addMsg("agent","agent","Advancing to investigate stage.")}]},

  // === INVESTIGATE ===
  {delay:800,actions:[function(){activateStage("investigate");addMsg("agent","agent","Entering investigate stage. Hat: investigator.\nLoading incident brief...");addFile(P+"/stages/investigate/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 triage/incident-brief (knowledge/INCIDENT-BRIEF.md)");addMsg("agent","agent","Starting timeline reconstruction and log analysis...")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/investigate/units/unit-01-timeline.md");addFile(P+"/stages/investigate/units/unit-02-root-cause.md");addCard("investigate","timeline","in-progress");addCard("investigate","root-cause","")}]},
  {delay:500,actions:[function(){addFastForward("45")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: log-analyst. Timeline reconstructed:\n  14:32:15 \u2014 Deploy v2.41.3 rolled out (orders-service)\n  14:32:18 \u2014 Connection pool exhaustion starts\n  14:33:01 \u2014 p99 crosses 5s threshold\n  14:34:22 \u2014 PagerDuty fires SEV-1 alert\n  14:35:00 \u2014 You reported the incident");updateCard("investigate","timeline","completed");updateCard("investigate","root-cause","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Root cause hypothesis: v2.41.3 introduced an N+1 query in the order line-items resolver. Each order now fires a separate DB query per line item instead of a batch fetch. Under load, this exhausts the connection pool (max 50 connections, now seeing 300+ pending).\n\nRuled out:\n  \u2022 Database overload \u2014 DB CPU is only at 15%\n  \u2022 Network issue \u2014 latency between app and DB is normal (0.5ms)\n  \u2022 Traffic spike \u2014 request volume is within normal range")}]},
  {delay:1200,actions:[function(){addMsg("user","you","That matches \u2014 v2.41.3 refactored the order resolver. The N+1 makes sense.")}]},
  {delay:800,actions:[function(){updateCard("investigate","root-cause","completed");addFile(P+"/knowledge/ROOT-CAUSE.md")}]},

  // Investigate gate - auto
  {delay:800,actions:[function(){addMsg("system","system","Investigate complete. Review gate: auto. All criteria met \u2014 advancing.");addMsg("agent","agent","Root cause confirmed. Advancing to mitigate stage.")}]},

  // === MITIGATE ===
  {delay:800,actions:[function(){activateStage("mitigate");addMsg("agent","agent","Entering mitigate stage. Hat: mitigator.\nLoading root cause analysis...");addFile(P+"/stages/mitigate/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 investigate/root-cause (knowledge/ROOT-CAUSE.md)");addMsg("agent","agent","Root cause is an N+1 in v2.41.3. Fastest mitigation: rollback to v2.41.2. Alternatively, we could increase the connection pool, but that\u2019s a band-aid.\n\nRecommendation: rollback. Want me to proceed?")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/mitigate/units/unit-01-rollback.md");addFile(P+"/stages/mitigate/units/unit-02-verification.md");addCard("mitigate","rollback","in-progress");addCard("mitigate","verification","")}]},
  {delay:1800,actions:[function(){addMsg("user","you","Yes, rollback to v2.41.2. Don\u2019t touch the connection pool \u2014 that masks the real problem.")}]},
  {delay:800,actions:[function(){addMsg("agent","agent","Initiating rollback to v2.41.2...")}]},
  {delay:500,actions:[function(){addFastForward("20")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Rollback complete. v2.41.2 deployed across all regions.\n  14:42:31 \u2014 Rollback initiated\n  14:43:15 \u2014 v2.41.2 healthy in us-east-1\n  14:43:28 \u2014 v2.41.2 healthy in eu-west-1\n  14:43:41 \u2014 v2.41.2 healthy in ap-southeast-1");updateCard("mitigate","rollback","completed");updateCard("mitigate","verification","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("15")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: verifier. Verification:\n  \u2022 /orders p99: 180ms (recovered)\n  \u2022 Error rate: 0%\n  \u2022 Connection pool: 12/50 active (healthy)\n  \u2022 Inventory queue: draining, backlog clearing\n\nUser-facing impact has stopped.");updateCard("mitigate","verification","completed");addFile(P+"/knowledge/MITIGATION-LOG.md")}]},

  // Mitigate gate - ask + await
  {delay:800,actions:[function(){addMsg("system","system","Mitigate stage complete. Review gate: ask + await.")}]},
  {delay:800,actions:[function(){showCriteriaReview("Mitigate",INTENT,["Rollback to v2.41.2 executed with timestamps","p99 recovered to 180ms (baseline 200ms)","Error rate at 0%","Connection pool healthy at 12/50","Rollback plan for mitigation documented"],"ask gate")}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:2200,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("user","you","Confirmed \u2014 metrics look clean. Proceed to permanent fix.")}]},

  // === RESOLVE ===
  {delay:800,actions:[function(){activateStage("resolve");addMsg("agent","agent","Entering resolve stage. Hat: engineer.\nLoading mitigation log...");addFile(P+"/stages/resolve/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 mitigate/mitigation-log (knowledge/MITIGATION-LOG.md)");addMsg("agent","agent","Mitigation was a rollback. Now implementing the permanent fix: batch the line-item queries in the order resolver.")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/resolve/units/unit-01-batch-fix.md");addFile(P+"/stages/resolve/units/unit-02-regression-test.md");addFile(P+"/stages/resolve/units/unit-03-canary-deploy.md");addCard("resolve","batch-fix","in-progress");addCard("resolve","regression-test","");addCard("resolve","canary-deploy","")}]},
  {delay:500,actions:[function(){addFastForward("45")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Batch fix implemented. Changed line-item resolver from N+1 individual queries to a single batched IN clause. Also added a query count assertion to prevent N+1 regressions.");updateCard("resolve","batch-fix","completed");updateCard("resolve","regression-test","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: reviewer. Regression test added \u2014 creates an order with 20 line items and asserts total DB queries <= 3. This would have caught the v2.41.3 bug before deploy.");updateCard("resolve","regression-test","completed");updateCard("resolve","canary-deploy","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("20")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","Canary deploy to us-east-1 (10% traffic): p99 at 190ms, 0 errors. Looks clean.");updateCard("resolve","canary-deploy","completed");addFile(P+"/knowledge/RESOLUTION-SUMMARY.md")}]},

  // Resolve gate - ask
  {delay:800,actions:[function(){addMsg("system","system","Resolve stage complete. Review gate: ask.")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Looks good. Roll it out fully and move to postmortem.");addMsg("agent","agent","Full rollout initiated. Advancing to postmortem stage.")}]},

  // === POSTMORTEM ===
  {delay:800,actions:[function(){activateStage("postmortem");addMsg("agent","agent","Entering postmortem stage. Hat: postmortem-author.\nLoading resolution summary...");addFile(P+"/stages/postmortem/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 resolve/resolution-summary (knowledge/RESOLUTION-SUMMARY.md)");addMsg("agent","agent","Building blameless postmortem with timeline, root cause, and action items...")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/postmortem/units/unit-01-postmortem-doc.md");addFile(P+"/stages/postmortem/units/unit-02-action-items.md");addCard("postmortem","postmortem-doc","in-progress");addCard("postmortem","action-items","")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Postmortem draft:\n  Impact: 11 minutes of degraded checkout, ~2,400 failed orders\n  Root cause: N+1 query introduced in v2.41.3 order resolver refactor\n  Detection: PagerDuty alert at 14:34, 2 min after deploy\n  Mitigation: Rollback to v2.41.2 at 14:42\n  Resolution: Batched query fix with regression test\n\nAnything you want to add or change?");updateCard("postmortem","postmortem-doc","completed");updateCard("postmortem","action-items","in-progress")}]},
  {delay:2200,actions:[function(){addMsg("user","you","Add that our deploy pipeline didn\u2019t run the load test suite. That\u2019s how this slipped through.")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1000,actions:[function(){removeTyping();addMsg("agent","agent","Hat: action-item-tracker. Added. Here are the action items:\n  1. [P0] Add query-count regression test to CI (owner: backend-team)\n  2. [P1] Re-enable load test suite in deploy pipeline (owner: platform-team)\n  3. [P2] Add connection pool exhaustion alert at 80% threshold (owner: platform-team)\n  4. [P2] Document N+1 detection patterns in code review checklist (owner: backend-team)\n\nAll items assigned and prioritized.");updateCard("postmortem","action-items","completed");addFile(P+"/knowledge/POSTMORTEM.md")}]},

  // Postmortem gate - external
  {delay:1000,actions:[function(){addMsg("system","system","Postmortem stage complete. Review gate: external.")}]},
  {delay:800,actions:[function(){showCriteriaReview("Postmortem",INTENT,["Blameless narrative with complete timeline","Root cause: N+1 query in v2.41.3","4 action items assigned with owners and priority","Prevention: load test suite re-enabled in pipeline","Connection pool monitoring gap addressed"],"external gate")}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:2400,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("system","system","External review approved. Postmortem distributed to engineering org.")}]},

  // Complete
  {delay:1200,actions:[function(){completeAllStages();addMsg("agent","agent","All 5 stages complete for api-latency-spike-p1.\n\nDelivered:\n  \u2022 Triage: SEV-1 confirmed, blast radius mapped, stakeholders notified\n  \u2022 Investigation: N+1 query root cause with timeline from deploy to detection\n  \u2022 Mitigation: Rollback to v2.41.2, p99 recovered in 11 minutes\n  \u2022 Resolution: Batched query fix with regression test, canary-verified\n  \u2022 Postmortem: 4 action items assigned, load test gap addressed\n\nIncident duration: 11 minutes. Intent status: complete.")}]},
  {delay:1500,actions:[function(){overlay.classList.add("visible")}]}
]
};
