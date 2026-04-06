var P = ".haiku/intents/platform-v3-launch";
window.HAIKU_DEMO_CONFIG = {
  title: "project-management",
  studio: "project-management",
  stages: ["charter","plan","track","report","close"],
  completionText: "All 5 stages passed. platform-v3-launch delivered.",
  steps: [
  {delay:800,actions:[function(){addMsg("user","you","/haiku:new")}]},
  {delay:1200,actions:[function(){addTyping()}]},
  {delay:1000,actions:[function(){removeTyping();addMsg("agent","agent","What do you want to accomplish?")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Manage the Platform v3 launch program")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1200,actions:[function(){removeTyping();addMsg("agent","agent","Creating intent: platform-v3-launch...");addFile(P+"/intent.md")}]},
  {delay:800,actions:[function(){addMsg("system","system","Intent created. Studio: project-management. 5 stages: charter \u2192 plan \u2192 track \u2192 report \u2192 close")}]},

  // === CHARTER (hats: sponsor, scoper | review: external) ===
  {delay:1000,actions:[function(){activateStage("charter");addMsg("agent","agent","Entering charter stage. Hat: sponsor.\nWhat\u2019s the business driver for v3? And who are the key stakeholders?");addFile(P+"/stages/charter/state.json")}]},
  {delay:2000,actions:[function(){addMsg("user","you","Customer retention is dropping \u2014 v3 addresses the top 5 feature requests. Stakeholders: VP Product, VP Engineering, Head of CS, and the CTO as executive sponsor.")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1200,actions:[function(){removeTyping();addMsg("agent","agent","Hat: scoper. Let me define scope boundaries. What\u2019s explicitly out of scope?");addFile(P+"/stages/charter/units/unit-01-charter.md");addFile(P+"/stages/charter/units/unit-02-scope-definition.md");addCard("charter","charter","in-progress");addCard("charter","scope-definition","")}]},
  {delay:1800,actions:[function(){addMsg("user","you","Mobile app redesign is out \u2014 that\u2019s a separate initiative. Also no pricing changes in v3.")}]},
  {delay:500,actions:[function(){addFastForward("40")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Charter complete:\n  \u2022 5 in-scope features mapped to customer retention metrics\n  \u2022 2 explicit exclusions with rationale\n  \u2022 Success criteria: 15% reduction in churn within 90 days of launch\n  \u2022 Stakeholder map with influence/interest levels and engagement approach\n  \u2022 Governance: bi-weekly steering committee, CTO escalation path");addFile(P+"/knowledge/PROJECT-CHARTER.md");updateCard("charter","charter","completed");updateCard("charter","scope-definition","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("20")}]},
  {delay:1200,actions:[function(){removeFastForward();updateCard("charter","scope-definition","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Charter stage complete. Review gate: external.");addMsg("agent","agent","Sharing charter for CTO sign-off...")}]},
  {delay:1000,actions:[function(){showCriteriaReview("Charter","platform-v3-launch",["Scope boundaries defined with in/out-of-scope rationale","Success criteria quantified with measurement methods","Stakeholder map identifies engagement approach","Governance structure with escalation paths","Resource commitment authorized"],"external")}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:2200,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("system","system","CTO approved charter. Resources authorized.")}]},

  // === PLAN (hats: planner, estimator | review: ask) ===
  {delay:1000,actions:[function(){activateStage("plan");addMsg("agent","agent","Entering plan stage. Hat: planner.\nLoading charter...");addFile(P+"/stages/plan/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 charter/project-charter (knowledge/PROJECT-CHARTER.md)");addFile(P+"/stages/plan/units/unit-01-wbs.md");addFile(P+"/stages/plan/units/unit-02-resource-plan.md");addCard("plan","work-breakdown","in-progress");addCard("plan","resource-plan","")}]},
  {delay:500,actions:[function(){addFastForward("45")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: estimator. WBS decomposes 5 features into 23 work packages, each under 40 hours. Critical path identified through the API migration feature \u2014 it blocks 3 downstream packages.");updateCard("plan","work-breakdown","completed");updateCard("plan","resource-plan","in-progress")}]},
  {delay:1200,actions:[function(){addMsg("agent","agent","Resource allocation: I see 2 backend engineers available full-time, 1 frontend at 50%. Is that accurate? The critical path needs a full-time frontend.")}]},
  {delay:2000,actions:[function(){addMsg("user","you","Pull Alex to full-time on this. I\u2019ll backfill their other work.")}]},
  {delay:500,actions:[function(){addFastForward("20")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Resource plan updated. Alex full-time on frontend. Critical path has 2 buffer days at high-risk junctions. All work packages assigned to named owners with confirmed availability.");addFile(P+"/knowledge/PROJECT-PLAN.md");updateCard("plan","resource-plan","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Plan stage complete. Review gate: ask.")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Plan looks solid. Let\u2019s execute.");addMsg("agent","agent","Advancing to track stage.")}]},

  // === TRACK (hats: tracker, risk-monitor | review: auto) ===
  {delay:1000,actions:[function(){activateStage("track");addMsg("agent","agent","Entering track stage. Hat: tracker.\nLoading project plan...");addFile(P+"/stages/track/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 plan/project-plan (knowledge/PROJECT-PLAN.md)");addFile(P+"/stages/track/units/unit-01-status-tracking.md");addFile(P+"/stages/track/units/unit-02-risk-management.md");addCard("track","status-tracking","in-progress");addCard("track","risk-management","")}]},
  {delay:500,actions:[function(){addFastForward("40")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Status update compiled:\n  On track: 18/23 work packages\n  At risk: 3 packages (API migration delayed by dependency)\n  Blocked: 2 packages (waiting on third-party API key)\n\nVariance: API migration 15% behind plan. Root cause: upstream dependency on auth service refactor.");updateCard("track","status-tracking","completed");updateCard("track","risk-management","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("25")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: risk-monitor. Risk register updated:\n  R1 (High): API migration delay \u2014 probability increased from 30% to 65%. Mitigation: parallel track with mock API.\n  R2 (Medium): Third-party API key \u2014 escalation sent to vendor.\n  R3 (Low): Frontend resource contention if Alex gets pulled \u2014 monitoring.");addFile(P+"/knowledge/STATUS-REPORT.md");updateCard("track","risk-management","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Track stage complete. Review gate: auto. All work packages have current status \u2014 advancing.")}]},

  // === REPORT (hats: reporter, communicator | review: ask) ===
  {delay:1000,actions:[function(){activateStage("report");addMsg("agent","agent","Entering report stage. Hat: reporter.\nLoading tracking data...");addFile(P+"/stages/report/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 track/status-report (knowledge/STATUS-REPORT.md), plan/project-plan (knowledge/PROJECT-PLAN.md), charter/project-charter (knowledge/PROJECT-CHARTER.md)");addFile(P+"/stages/report/units/unit-01-exec-dashboard.md");addFile(P+"/stages/report/units/unit-02-stakeholder-reports.md");addCard("report","exec-dashboard","in-progress");addCard("report","stakeholder-reports","")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Executive dashboard complete:\n  Overall health: AMBER (API migration risk)\n  Completion: 78% of work packages delivered\n  Forecast: On track for launch if API mock parallel track succeeds\n\nRAG indicators backed by quantitative thresholds, not subjective judgment.");updateCard("report","exec-dashboard","completed");updateCard("report","stakeholder-reports","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("20")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: communicator. Stakeholder reports tailored:\n  CTO: 1-page summary with decision needed on API mock approach\n  VP Engineering: Work-package detail with resource reallocation options\n  VP Product: Feature completion status with launch readiness assessment\n  Head of CS: Customer impact analysis and communication timeline");addFile(P+"/stages/report/artifacts/exec-dashboard.md");addFile(P+"/stages/report/artifacts/stakeholder-reports.md");updateCard("report","stakeholder-reports","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Report stage complete. Review gate: ask.")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Good. CTO approved the parallel mock track. Let\u2019s close this phase.");addMsg("agent","agent","Advancing to close stage.")}]},

  // === CLOSE (hats: closer, archivist | review: ask) ===
  {delay:1000,actions:[function(){activateStage("close");addMsg("agent","agent","Entering close stage. Hat: closer.\nLoading project outputs...");addFile(P+"/stages/close/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 report/project-dashboard (stages/report/artifacts/), track/status-report (knowledge/STATUS-REPORT.md), charter/project-charter (knowledge/PROJECT-CHARTER.md)");addFile(P+"/stages/close/units/unit-01-retrospective.md");addFile(P+"/stages/close/units/unit-02-handoff.md");addCard("close","retrospective","in-progress");addCard("close","handoff","")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Retrospective complete:\n  Top 3 wins: Early stakeholder alignment, parallel track saved the timeline, Alex\u2019s full-time allocation was the right call\n  Top 3 improvements: Earlier dependency mapping would have caught API risk sooner, need vendor SLA for third-party keys, risk register should be reviewed weekly not bi-weekly\n\nEach backed by specific examples from the project.");updateCard("close","retrospective","completed");updateCard("close","handoff","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("20")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: archivist. Handoff complete:\n  \u2022 All deliverables transferred to product team\n  \u2022 Documentation archived and indexed\n  \u2022 Support contacts identified for each feature\n  \u2022 Open items transferred with owners and deadlines");addFile(P+"/knowledge/LESSONS-LEARNED.md");updateCard("close","handoff","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Close stage complete. Review gate: ask.")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Great retrospective. Approved.");addMsg("agent","agent","All stages complete.")}]},

  // === COMPLETE ===
  {delay:1200,actions:[function(){completeAllStages();addMsg("agent","agent","All 5 stages complete for platform-v3-launch.\n\nDelivered:\n  \u2022 Project charter with quantified success criteria and governance structure\n  \u2022 WBS with 23 work packages, critical path identified, resources assigned\n  \u2022 Status tracking with risk register and variance analysis\n  \u2022 Executive dashboard with tailored stakeholder reports\n  \u2022 Retrospective with actionable lessons learned and complete handoff\n\nIntent status: complete.")}]},
  {delay:1500,actions:[function(){overlay.classList.add("visible")}]}
]
};
