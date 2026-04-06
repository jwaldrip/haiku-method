window.HAIKU_DEMO_CONFIG = {
  title: "product-strategy",
  studio: "product-strategy",
  stages: ["discovery","user-research","prioritization","roadmap","stakeholder-review"],
  completionText: "All 5 stages passed. 2027-product-roadmap delivered.",
  steps: [
  // === User invokes ===
  {delay:800,actions:[function(){addMsg("user","you","/haiku:new")}]},
  {delay:1200,actions:[function(){addMsg("agent","agent","What do you want to accomplish?")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Define the 2027 product roadmap")}]},
  {delay:1200,actions:[function(){addMsg("agent","agent","Creating intent: 2027-product-roadmap...");addFile(".haiku/intents/2027-product-roadmap/intent.md")}]},
  {delay:800,actions:[function(){addMsg("system","system","Intent created. Studio: product-strategy. 5 stages: discovery \u2192 user-research \u2192 prioritization \u2192 roadmap \u2192 stakeholder-review")}]},

  // === DISCOVERY ===
  {delay:1000,actions:[function(){activateStage("discovery");addMsg("agent","agent","Entering discovery stage. Hat: market-explorer.\nWhat market segment are you primarily targeting? Who are the top competitors?");addFile(".haiku/intents/2027-product-roadmap/stages/discovery/state.json")}]},
  {delay:2000,actions:[function(){addMsg("user","you","B2B SaaS for mid-market. Competitors: Acme Corp, Nexus Inc, and Beacon Systems.")}]},
  {delay:1000,actions:[function(){addMsg("agent","agent","Hat: competitive-analyst. Analyzing the B2B mid-market SaaS landscape...");addFile(".haiku/intents/2027-product-roadmap/stages/discovery/units/unit-01-market-landscape.md");addFile(".haiku/intents/2027-product-roadmap/stages/discovery/units/unit-02-competitive-analysis.md");addCard("discovery","market-landscape","in-progress");addCard("discovery","competitive-analysis","")}]},
  {delay:500,actions:[function(){addFastForward("45")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Market landscape mapped. Mid-market B2B SaaS growing 18% YoY. Three underserved segments: compliance-heavy verticals, multi-team orgs needing RBAC, international expansion blocked by localization.\n\nCompetitive gap: Acme has enterprise features but poor UX. Nexus owns SMB. Nobody owns \"easy enterprise.\"");updateCard("discovery","market-landscape","completed");updateCard("discovery","competitive-analysis","completed");addFile(".haiku/intents/2027-product-roadmap/knowledge/MARKET-LANDSCAPE.md")}]},
  {delay:800,actions:[function(){addMsg("system","system","Discovery complete. Review gate: auto. All criteria met \u2014 advancing.")}]},

  // === USER RESEARCH ===
  {delay:1000,actions:[function(){activateStage("user-research");addMsg("agent","agent","Entering user-research stage. Hat: user-researcher.");addFile(".haiku/intents/2027-product-roadmap/stages/user-research/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 discovery/market-landscape (knowledge/MARKET-LANDSCAPE.md)");addFile(".haiku/intents/2027-product-roadmap/stages/user-research/units/unit-01-persona-synthesis.md");addFile(".haiku/intents/2027-product-roadmap/stages/user-research/units/unit-02-jtbd-analysis.md");addCard("user-research","persona-synthesis","in-progress");addCard("user-research","jtbd-analysis","")}]},
  {delay:500,actions:[function(){addFastForward("40")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: insights-synthesizer. Three personas:\n  1. \"Compliance Carol\" \u2014 audit logs, SSO, data residency\n  2. \"Ops Oscar\" \u2014 role-based access, approval workflows\n  3. \"Growth Gina\" \u2014 localization, multi-currency billing\n\nDo these match your customer segments?")}]},
  {delay:2200,actions:[function(){addMsg("user","you","Yes, but Carol is our biggest pain point. We\u2019re losing deals to Acme on compliance.")}]},
  {delay:1000,actions:[function(){addMsg("agent","agent","Weighting compliance highest. Carol\u2019s top job: \"Pass SOC 2 audit without switching tools.\" Current workaround: manual CSV exports.");updateCard("user-research","persona-synthesis","completed");updateCard("user-research","jtbd-analysis","completed");addFile(".haiku/intents/2027-product-roadmap/knowledge/INSIGHTS-REPORT.md")}]},
  {delay:1000,actions:[function(){addMsg("system","system","User-research complete. Review gate: ask.");showCriteriaReview("User Research","2027-product-roadmap",["3 distinct personas with documented pain points","Jobs-to-be-done include frequency, workaround, and satisfaction","Compliance needs weighted per lost-deal feedback"])}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:1800,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("user","you","Approved. The Carol persona is spot on.")}]},

  // === PRIORITIZATION ===
  {delay:1000,actions:[function(){activateStage("prioritization");addMsg("agent","agent","Entering prioritization stage. Hat: prioritizer.");addFile(".haiku/intents/2027-product-roadmap/stages/prioritization/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 user-research/insights-report (knowledge/INSIGHTS-REPORT.md)");addFile(".haiku/intents/2027-product-roadmap/stages/prioritization/units/unit-01-scoring.md");addFile(".haiku/intents/2027-product-roadmap/stages/prioritization/units/unit-02-trade-offs.md");addCard("prioritization","scoring","in-progress");addCard("prioritization","trade-offs","")}]},
  {delay:800,actions:[function(){addMsg("agent","agent","Scoring on 4 dimensions: revenue impact, competitive differentiation, effort, strategic alignment. How would you weight these?")}]},
  {delay:2000,actions:[function(){addMsg("user","you","Revenue 40%, differentiation 25%, effort 20%, alignment 15%.")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: stakeholder-proxy. Priority matrix:\n  1. Compliance suite \u2014 score: 92\n  2. Role-based access controls \u2014 score: 78\n  3. Approval workflows \u2014 score: 71\n  4. Localization framework \u2014 score: 65\n  5. Multi-currency billing \u2014 score: 58\n\nDeprioritized: mobile app (34), AI features (41).");updateCard("prioritization","scoring","completed");updateCard("prioritization","trade-offs","completed");addFile(".haiku/intents/2027-product-roadmap/knowledge/PRIORITY-MATRIX.md")}]},
  {delay:1000,actions:[function(){addMsg("system","system","Prioritization complete. Review gate: ask.");showCriteriaReview("Prioritization","2027-product-roadmap",["Opportunities scored on 4 dimensions with explicit weighting","Top 5 include impact estimates and confidence levels","Trade-off analysis documents what is deprioritized and why"])}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:1800,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("user","you","Approved. The AI deprioritization will be controversial but it\u2019s right.")}]},

  // === ROADMAP ===
  {delay:1000,actions:[function(){activateStage("roadmap");addMsg("agent","agent","Entering roadmap stage. Hat: roadmap-architect.");addFile(".haiku/intents/2027-product-roadmap/stages/roadmap/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 prioritization/priority-matrix (knowledge/PRIORITY-MATRIX.md)");addCard("roadmap","sequencing","in-progress");addCard("roadmap","milestones","")}]},
  {delay:500,actions:[function(){addFastForward("40")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: capacity-planner. 3 phases:\n  Phase 1: Compliance suite (SSO + audit logs + data residency)\n  Phase 2: RBAC + approval workflows (depends on Phase 1 auth primitives)\n  Phase 3: Localization + multi-currency (independent)\n\nBottleneck: compliance requires a dedicated security engineer hire.");updateCard("roadmap","sequencing","completed");updateCard("roadmap","milestones","completed");addFile(".haiku/intents/2027-product-roadmap/knowledge/ROADMAP-DOC.md")}]},
  {delay:1000,actions:[function(){addMsg("system","system","Roadmap complete. Review gate: ask.");showCriteriaReview("Roadmap","2027-product-roadmap",["Initiatives sequenced with explicit dependency chains","Milestones have measurable success criteria","Capacity plan identifies resource bottlenecks"])}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:1800,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("user","you","Approved. Good catch on the security engineer hire.")}]},

  // === STAKEHOLDER REVIEW ===
  {delay:1000,actions:[function(){activateStage("stakeholder-review");addMsg("agent","agent","Entering stakeholder-review stage. Hat: presenter.");addFile(".haiku/intents/2027-product-roadmap/stages/stakeholder-review/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 roadmap/roadmap-doc (knowledge/ROADMAP-DOC.md)");addCard("stakeholder-review","presentation","in-progress");addCard("stakeholder-review","alignment","")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: feedback-synthesizer. Presentation deck and alignment document ready. Decision records for: Phase 1 scope, AI deprioritization, security engineer timeline.");updateCard("stakeholder-review","presentation","completed");updateCard("stakeholder-review","alignment","completed");addFile(".haiku/intents/2027-product-roadmap/knowledge/ALIGNMENT-DOC.md")}]},
  {delay:800,actions:[function(){addMsg("system","system","Stakeholder-review complete. Review gate: external.");addMsg("agent","agent","Sharing browse URL for external stakeholder review...")}]},
  {delay:1000,actions:[function(){showCriteriaReview("Stakeholder Review","2027-product-roadmap",["Presentation includes executive summary and strategic rationale","Alignment document records go/no-go decisions with decision-makers","Roadmap adjustments from feedback reflected back"],"external gate")}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:2000,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("system","system","External stakeholder review approved via browse page.")}]},

  // === Complete ===
  {delay:1200,actions:[function(){completeAllStages();addMsg("agent","agent","All 5 stages complete for 2027-product-roadmap.\n\nDelivered:\n  \u2022 Market landscape with 3 underserved segments and competitive gap analysis\n  \u2022 User research with 3 personas, compliance weighted highest per lost-deal data\n  \u2022 Priority matrix: compliance #1 (score 92), AI/mobile deprioritized\n  \u2022 3-phase roadmap with dependency chains and hiring dependency flagged\n  \u2022 Stakeholder presentation and alignment document with decision records\n\nIntent status: complete.")}]},
  {delay:1500,actions:[function(){overlay.classList.add("visible")}]}
]
};
