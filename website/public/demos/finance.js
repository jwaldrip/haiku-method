var P = ".haiku/intents/q4-2026-financial-close";
window.HAIKU_DEMO_CONFIG = {
  title: "finance",
  studio: "finance",
  stages: ["forecast","budget","analysis","reporting","close"],
  completionText: "All 5 stages passed. q4-2026-financial-close delivered.",
  steps: [
  // Step 1: User invokes
  {delay:800,actions:[function(){addMsg("user","you","/haiku:new")}]},
  {delay:1200,actions:[function(){addTyping()}]},
  {delay:1000,actions:[function(){removeTyping();addMsg("agent","agent","What do you want to accomplish?")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Q4 2026 financial close and reporting")}]},

  // Step 2: Intent created
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1200,actions:[function(){removeTyping();addMsg("agent","agent","Creating intent: q4-2026-financial-close...");addFile(P+"/intent.md")}]},
  {delay:800,actions:[function(){addMsg("system","system","Intent created. Studio: finance. 5 stages: forecast \u2192 budget \u2192 analysis \u2192 reporting \u2192 close")}]},

  // === FORECAST (hats: analyst, forecaster | review: ask) ===
  {delay:1000,actions:[function(){activateStage("forecast");addMsg("agent","agent","Entering forecast stage. Hat: analyst.\nAnalyzing market conditions for Q4 revenue projections...");addFile(P+"/stages/forecast/state.json")}]},
  {delay:1200,actions:[function(){addMsg("agent","agent","What revenue streams should I model? I see SaaS subscriptions, professional services, and marketplace fees in your chart of accounts.")}]},
  {delay:2000,actions:[function(){addMsg("user","you","Focus on SaaS and marketplace. Professional services is winding down \u2014 model it at 60% of Q3.")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1200,actions:[function(){removeTyping();addMsg("agent","agent","Got it. Building 3-scenario model: base, optimistic, pessimistic. Professional services at 60% Q3 baseline.");addFile(P+"/stages/forecast/units/unit-01-market-analysis.md");addFile(P+"/stages/forecast/units/unit-02-revenue-projections.md");addCard("forecast","market-analysis","in-progress");addCard("forecast","revenue-projections","")}]},
  {delay:500,actions:[function(){addFastForward("40")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: forecaster. Market analysis shows SaaS churn trending down 0.8% MoM. Marketplace GMV up 12% QoQ. Incorporating into projections...");updateCard("forecast","market-analysis","completed");updateCard("forecast","revenue-projections","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Revenue projections complete:\n  Base: $4.2M  |  Optimistic: $4.8M  |  Pessimistic: $3.6M\nAll assumptions documented with confidence levels and data sources.");addFile(P+"/knowledge/FORECAST-MODEL.md");updateCard("forecast","revenue-projections","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Forecast complete. Review gate: ask.");addMsg("agent","agent","Ready for your review of the forecast model.")}]},
  {delay:1500,actions:[function(){addMsg("user","you","The pessimistic case should account for potential marketplace fee reduction we discussed. Otherwise approved.");addMsg("agent","agent","Updated pessimistic scenario with 15% fee reduction risk. Advancing to budget stage.")}]},

  // === BUDGET (hats: budget-owner, allocator | review: external) ===
  {delay:1000,actions:[function(){activateStage("budget");addMsg("agent","agent","Entering budget stage. Hat: budget-owner.\nLoading forecast stage outputs...");addFile(P+"/stages/budget/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 forecast/forecast-model (knowledge/FORECAST-MODEL.md)");addMsg("agent","agent","Forecast model loaded. Base revenue target: $4.2M. Decomposing budget allocation work...")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/budget/units/unit-01-dept-allocations.md");addFile(P+"/stages/budget/units/unit-02-contingency-planning.md");addCard("budget","dept-allocations","in-progress");addCard("budget","contingency-planning","")}]},
  {delay:1200,actions:[function(){addMsg("agent","agent","Engineering wants 40% of the budget for infrastructure. Sales is requesting 25% for Q4 push. How do you want to prioritize?")}]},
  {delay:2200,actions:[function(){addMsg("user","you","Cap engineering at 35%. Give sales their 25% but tie it to pipeline conversion targets. Rest split between marketing and ops.")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1500,actions:[function(){removeTyping();addMsg("agent","agent","Hat: allocator. Allocations set with performance triggers:\n  Engineering: 35% ($1.47M)\n  Sales: 25% ($1.05M) \u2014 gated on 30% pipeline conversion\n  Marketing: 22% ($924K)\n  Operations: 18% ($756K)\nContingency: 8% of total held in reserve based on historical variance.");addFile(P+"/knowledge/BUDGET-PLAN.md");updateCard("budget","dept-allocations","completed");updateCard("budget","contingency-planning","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("25")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Contingency reserves sized at $336K based on 3-quarter variance patterns. Each line item traces to a forecast assumption.");updateCard("budget","contingency-planning","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Budget stage complete. Review gate: external.");addMsg("agent","agent","Sharing budget plan for CFO review...")}]},
  {delay:1000,actions:[function(){showCriteriaReview("Budget","q4-2026-financial-close",["Allocations sum within 2% of approved envelope","Each line item maps to forecast assumption","Contingency sized on historical variance patterns","Performance triggers defined for conditional allocations"],"external")}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:2200,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("system","system","External review approved by CFO.")}]},

  // === ANALYSIS (hats: analyst, auditor | review: auto) ===
  {delay:1000,actions:[function(){activateStage("analysis");addMsg("agent","agent","Entering analysis stage. Hat: analyst.\nLoading upstream outputs...");addFile(P+"/stages/analysis/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 budget/budget-plan (knowledge/BUDGET-PLAN.md), forecast/forecast-model (knowledge/FORECAST-MODEL.md)");addFile(P+"/stages/analysis/units/unit-01-variance-analysis.md");addFile(P+"/stages/analysis/units/unit-02-performance-tracking.md");addCard("analysis","variance-analysis","in-progress");addCard("analysis","performance-tracking","")}]},
  {delay:500,actions:[function(){addFastForward("45")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Variance analysis found 3 material deviations:\n  1. SaaS revenue +7% vs budget (new enterprise deal closed early)\n  2. Engineering spend +4% (unplanned infrastructure migration)\n  3. Marketing -12% (delayed campaign launch)\nEach categorized: #1 timing, #2 structural, #3 operational.");updateCard("analysis","variance-analysis","completed");updateCard("analysis","performance-tracking","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: auditor. Performance metrics compiled with leading and lagging indicators. 3-period trend analysis confirms SaaS growth trajectory. Methodology verified consistent with prior quarters.");addFile(P+"/knowledge/VARIANCE-REPORT.md");updateCard("analysis","performance-tracking","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Analysis complete. Review gate: auto. All criteria met \u2014 advancing.")}]},

  // === REPORTING (hats: reporter, visualizer | review: ask) ===
  {delay:1000,actions:[function(){activateStage("reporting");addMsg("agent","agent","Entering reporting stage. Hat: reporter.\nLoading upstream outputs...");addFile(P+"/stages/reporting/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 analysis/variance-report, budget/budget-plan, forecast/forecast-model");addFile(P+"/stages/reporting/units/unit-01-exec-summary.md");addFile(P+"/stages/reporting/units/unit-02-dashboard.md");addCard("reporting","exec-summary","in-progress");addCard("reporting","dashboard","")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Executive summary distills 3 headlines:\n  1. Revenue tracking 7% above plan on early enterprise close\n  2. Infrastructure migration requires budget revision request\n  3. Marketing underspend creates reallocation opportunity\n\nEach backed by variance data with recommended actions.");updateCard("reporting","exec-summary","completed");updateCard("reporting","dashboard","in-progress")}]},
  {delay:1200,actions:[function(){addMsg("agent","agent","Hat: visualizer. For the dashboard \u2014 do you want the standard P&L waterfall or the new format with embedded trend sparklines?")}]},
  {delay:2000,actions:[function(){addMsg("user","you","Sparklines format. Board liked it last quarter. Add a cash flow forecast chart too.")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Dashboard complete with sparkline P&L, cash flow forecast, and department-level drill-downs. Consistent scales and labeled axes throughout.");addFile(P+"/stages/reporting/artifacts/exec-summary.md");addFile(P+"/stages/reporting/artifacts/financial-dashboard.md");updateCard("reporting","dashboard","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Reporting stage complete. Review gate: ask.");addMsg("agent","agent","Reports ready for your review.")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Approved. Clean work on the dashboard.");addMsg("agent","agent","Advancing to close stage.")}]},

  // === CLOSE (hats: controller, reconciler | review: external) ===
  {delay:1000,actions:[function(){activateStage("close");addMsg("agent","agent","Entering close stage. Hat: controller.\nLoading upstream outputs...");addFile(P+"/stages/close/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 reporting/financial-reports (stages/reporting/artifacts/), analysis/variance-report (knowledge/VARIANCE-REPORT.md)");addFile(P+"/stages/close/units/unit-01-reconciliation.md");addFile(P+"/stages/close/units/unit-02-close-process.md");addCard("close","reconciliation","in-progress");addCard("close","close-process","")}]},
  {delay:500,actions:[function(){addFastForward("50")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: reconciler. All balance sheet accounts reconciled. Found one $2,400 unexplained difference in accounts receivable \u2014 traced to a timing issue on an invoice posted Dec 31. Adjusting entry documented.");updateCard("close","reconciliation","completed");updateCard("close","close-process","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Close checklist complete:\n  \u2022 Sub-ledgers posted\n  \u2022 Intercompany eliminations verified\n  \u2022 Trial balance ties\n  \u2022 Revenue recognition entries documented with ASC 606 notes\n  \u2022 AR timing adjustment posted");addFile(P+"/knowledge/CLOSE-REPORT.md");updateCard("close","close-process","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Close stage complete. Review gate: external.");addMsg("agent","agent","Sharing close report for controller sign-off...")}]},
  {delay:1000,actions:[function(){showCriteriaReview("Close","q4-2026-financial-close",["All balance sheet accounts reconciled","Revenue recognition ASC 606 compliant","Sub-ledgers posted and intercompany eliminated","Trial balance ties with no unexplained variances","Adjusting entries documented with justification"],"external")}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:2400,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("system","system","External controller sign-off approved.")}]},

  // === COMPLETE ===
  {delay:1200,actions:[function(){completeAllStages();addMsg("agent","agent","All 5 stages complete for q4-2026-financial-close.\n\nDelivered:\n  \u2022 3-scenario revenue forecast with market analysis and documented assumptions\n  \u2022 Department budget allocations with performance triggers and contingency reserves\n  \u2022 Variance analysis with root cause categorization across 3 material deviations\n  \u2022 Executive summary and sparkline dashboard with cash flow forecast\n  \u2022 Period close with full reconciliation, ASC 606 compliance, and balanced trial balance\n\nIntent status: complete.")}]},
  {delay:1500,actions:[function(){overlay.classList.add("visible")}]}
]

// Engine
};
