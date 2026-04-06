var P = ".haiku/intents/apac-market-expansion";
window.HAIKU_DEMO_CONFIG = {
  title: "executive-strategy",
  studio: "executive-strategy",
  stages: ["landscape","options","evaluate","decide","communicate"],
  completionText: "All 5 stages passed. apac-market-expansion delivered.",
  steps: [
  {delay:800,actions:[function(){addMsg("user","you","/haiku:new")}]},
  {delay:1200,actions:[function(){addTyping()}]},
  {delay:1000,actions:[function(){removeTyping();addMsg("agent","agent","What do you want to accomplish?")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Evaluate and plan market expansion into APAC")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1200,actions:[function(){removeTyping();addMsg("agent","agent","Creating intent: apac-market-expansion...");addFile(P+"/intent.md")}]},
  {delay:800,actions:[function(){addMsg("system","system","Intent created. Studio: executive-strategy. 5 stages: landscape \u2192 options \u2192 evaluate \u2192 decide \u2192 communicate")}]},

  // === LANDSCAPE (hats: strategist, analyst | review: auto) ===
  {delay:1000,actions:[function(){activateStage("landscape");addMsg("agent","agent","Entering landscape stage. Hat: strategist.\nWhich APAC markets are you considering? And what\u2019s your current footprint there?");addFile(P+"/stages/landscape/state.json")}]},
  {delay:2000,actions:[function(){addMsg("user","you","Japan, Singapore, and Australia are the top 3. We have zero presence today. Our competitors launched in Singapore last year.")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1200,actions:[function(){removeTyping();addMsg("agent","agent","Noted. Zero-base entry with competitive pressure in Singapore. Let me map the landscape.");addFile(P+"/stages/landscape/units/unit-01-market-analysis.md");addFile(P+"/stages/landscape/units/unit-02-competitive-intel.md");addCard("landscape","market-analysis","in-progress");addCard("landscape","competitive-intel","")}]},
  {delay:500,actions:[function(){addFastForward("50")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: analyst. Market analysis complete. Key findings:\n  Japan: $2.8B TAM, enterprise-dominant, requires local partnerships\n  Singapore: $680M TAM, tech-forward, competitor has 12% share\n  Australia: $1.4B TAM, English-speaking, regulatory alignment with US\n\n5 macro trends identified with evidence-based impact assessment.");updateCard("landscape","market-analysis","completed");updateCard("landscape","competitive-intel","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Competitive intelligence mapped:\n  Competitor A: Singapore office, 15 enterprise clients, pricing 20% below us\n  Competitor B: Japan partnership with NTT, strong mid-market\n  Competitor C: Australia-only, acquired local player last quarter\nSWOT analysis connected to verifiable market data.");addFile(P+"/knowledge/LANDSCAPE-ANALYSIS.md");updateCard("landscape","competitive-intel","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Landscape complete. Review gate: auto. Data sources verified \u2014 advancing.")}]},

  // === OPTIONS (hats: ideator, modeler | review: ask) ===
  {delay:1000,actions:[function(){activateStage("options");addMsg("agent","agent","Entering options stage. Hat: ideator.\nLoading landscape analysis...");addFile(P+"/stages/options/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 landscape/landscape-analysis (knowledge/LANDSCAPE-ANALYSIS.md)");addFile(P+"/stages/options/units/unit-01-option-generation.md");addFile(P+"/stages/options/units/unit-02-financial-modeling.md");addCard("options","option-generation","in-progress");addCard("options","financial-modeling","")}]},
  {delay:500,actions:[function(){addFastForward("40")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","3 distinct strategic options generated:\n  Option A: Singapore-first \u2014 direct entry, compete head-on ($2.5M investment)\n  Option B: Japan-first \u2014 partnership model with local SI ($4M investment)\n  Option C: Australia-first \u2014 organic growth, use as APAC HQ ($1.8M investment)\n\nEach has a differentiated value proposition and risk profile.");updateCard("options","option-generation","completed");updateCard("options","financial-modeling","in-progress")}]},
  {delay:1200,actions:[function(){addMsg("agent","agent","Hat: modeler. What\u2019s the maximum investment you\u2019d consider for year 1? And what\u2019s your target payback period?")}]},
  {delay:2200,actions:[function(){addMsg("user","you","$3M max year 1. Payback within 24 months. We can go higher if the ROI justifies it.")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Financial models complete. Under $3M constraint:\n  Option A (Singapore): 18-month payback, 2.1x ROI at 3yr\n  Option B (Japan): 28-month payback \u2014 exceeds target, but 3.4x ROI at 3yr\n  Option C (Australia): 14-month payback, 1.6x ROI at 3yr\nAll assumptions stated with sensitivity analysis.");addFile(P+"/knowledge/OPTIONS-MATRIX.md");updateCard("options","financial-modeling","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Options stage complete. Review gate: ask.")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Good options. Japan\u2019s ROI is interesting even with the longer payback. Let\u2019s evaluate all three.");addMsg("agent","agent","Advancing to evaluate stage.")}]},

  // === EVALUATE (hats: evaluator, risk-analyst | review: ask) ===
  {delay:1000,actions:[function(){activateStage("evaluate");addMsg("agent","agent","Entering evaluate stage. Hat: evaluator.\nLoading options and landscape...");addFile(P+"/stages/evaluate/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 options/options-matrix (knowledge/OPTIONS-MATRIX.md), landscape/landscape-analysis (knowledge/LANDSCAPE-ANALYSIS.md)");addFile(P+"/stages/evaluate/units/unit-01-tradeoff-analysis.md");addFile(P+"/stages/evaluate/units/unit-02-scenario-modeling.md");addCard("evaluate","tradeoff-analysis","in-progress");addCard("evaluate","scenario-modeling","")}]},
  {delay:1200,actions:[function(){addMsg("agent","agent","I\u2019ll score each option against weighted criteria. How would you weight these factors?\n  1. Speed to revenue\n  2. Strategic positioning\n  3. Risk level\n  4. Competitive response\n  5. Talent availability")}]},
  {delay:2200,actions:[function(){addMsg("user","you","Strategic positioning highest \u2014 40%. Speed to revenue 25%. Risk 20%. Competitive response 10%. Talent 5%.")}]},
  {delay:500,actions:[function(){addFastForward("40")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Weighted scoring complete:\n  Option A (Singapore): 78/100 \u2014 strong on speed, moderate strategic value\n  Option B (Japan): 85/100 \u2014 highest strategic value, longer timeline\n  Option C (Australia): 71/100 \u2014 lowest risk but limited strategic upside\n\nExplicit reasoning documented for each score.");updateCard("evaluate","tradeoff-analysis","completed");updateCard("evaluate","scenario-modeling","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: risk-analyst. Scenario modeling under 3 market conditions:\n  Bull: All options viable, Japan dominates at 4.2x ROI\n  Base: Singapore and Japan viable, Australia marginal\n  Bear: Only Australia survives within risk tolerance\n\nTop risks per option quantified with probability estimates and mitigations.");addFile(P+"/knowledge/EVALUATION-REPORT.md");updateCard("evaluate","scenario-modeling","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Evaluate stage complete. Review gate: ask.")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Japan as primary with Singapore as a fast-follow makes sense to me. Send the recommendation to the board.");addMsg("agent","agent","Advancing to decide stage.")}]},

  // === DECIDE (hats: advisor, facilitator | review: external) ===
  {delay:1000,actions:[function(){activateStage("decide");addMsg("agent","agent","Entering decide stage. Hat: advisor.\nLoading evaluation and options...");addFile(P+"/stages/decide/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 evaluate/evaluation-report (knowledge/EVALUATION-REPORT.md), options/options-matrix (knowledge/OPTIONS-MATRIX.md)");addFile(P+"/stages/decide/units/unit-01-decision-brief.md");addFile(P+"/stages/decide/units/unit-02-board-package.md");addCard("decide","decision-brief","in-progress");addCard("decide","board-package","")}]},
  {delay:500,actions:[function(){addFastForward("40")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Decision brief complete:\n  Recommendation: Japan-first with Singapore fast-follow (phased approach)\n  Supporting: Highest weighted score, best 3yr ROI, strongest strategic positioning\n  Counter-arguments: Longer payback, partnership dependency, cultural complexity\n  Dissenting view documented: CFO may prefer Australia for faster payback");updateCard("decide","decision-brief","completed");updateCard("decide","board-package","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("25")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: facilitator. Board package prepared with executive summary, financial projections, risk matrix, and competitive positioning rationale. Decision criteria weights and stakeholder input documented transparently.");addFile(P+"/knowledge/DECISION-BRIEF.md");updateCard("decide","board-package","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Decide stage complete. Review gate: external.");addMsg("agent","agent","Sharing decision brief for board approval...")}]},
  {delay:1000,actions:[function(){showCriteriaReview("Decide","apac-market-expansion",["Clear recommendation with 3 supporting arguments","Counter-arguments and dissenting views documented","Decision framework criteria and weights transparent","Financial projections validated under 3 scenarios","All stakeholder perspectives considered"],"external")}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:2400,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("system","system","Board approved Japan-first strategy with Singapore fast-follow.")}]},

  // === COMMUNICATE (hats: communicator, planner | review: ask) ===
  {delay:1000,actions:[function(){activateStage("communicate");addMsg("agent","agent","Entering communicate stage. Hat: communicator.\nLoading decision brief...");addFile(P+"/stages/communicate/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 decide/decision-brief (knowledge/DECISION-BRIEF.md)");addFile(P+"/stages/communicate/units/unit-01-stakeholder-comms.md");addFile(P+"/stages/communicate/units/unit-02-rollout-plan.md");addCard("communicate","stakeholder-comms","in-progress");addCard("communicate","rollout-plan","")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Communication plan tailored to 4 stakeholder groups:\n  Board: Strategic rationale and financial commitment\n  Leadership team: Operational implications and resource needs\n  All-hands: Vision narrative and growth opportunity\n  Partners: Partnership framework and mutual value proposition\n\nEach with specific channels, timing, and key messages.");updateCard("communicate","stakeholder-comms","completed");updateCard("communicate","rollout-plan","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("25")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: planner. Rollout plan sequenced:\n  Phase 1: Japan partnership negotiations + legal entity setup\n  Phase 2: Singapore market entry preparation\n  Phase 3: Regional operations consolidation\n\nFAQ document covers top 10 anticipated questions with pre-approved responses. Dependencies mapped, owners assigned, milestones measurable.");addFile(P+"/stages/communicate/artifacts/comms-package.md");addFile(P+"/stages/communicate/artifacts/rollout-plan.md");addFile(P+"/stages/communicate/artifacts/faq-document.md");updateCard("communicate","rollout-plan","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Communicate stage complete. Review gate: ask.")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Approved. Excellent work on the stakeholder messaging.");addMsg("agent","agent","All stages complete.")}]},

  // === COMPLETE ===
  {delay:1200,actions:[function(){completeAllStages();addMsg("agent","agent","All 5 stages complete for apac-market-expansion.\n\nDelivered:\n  \u2022 Competitive landscape analysis across Japan, Singapore, and Australia\n  \u2022 3 strategic options with financial models and sensitivity analysis\n  \u2022 Weighted tradeoff evaluation with 3-scenario stress testing\n  \u2022 Board-ready decision brief recommending Japan-first with Singapore fast-follow\n  \u2022 4-audience communication plan with phased rollout and FAQ\n\nIntent status: complete.")}]},
  {delay:1500,actions:[function(){overlay.classList.add("visible")}]}
]
};
