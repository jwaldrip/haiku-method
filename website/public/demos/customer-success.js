var P = ".haiku/intents/onboard-techstartup-inc";
window.HAIKU_DEMO_CONFIG = {
  title: "customer-success",
  studio: "customer-success",
  stages: ["onboarding","adoption","health-check","expansion","renewal"],
  completionText: "All 5 stages passed. onboard-techstartup-inc delivered.",
  steps: [
  // User invokes
  {delay:800,actions:[function(){addMsg("user","you","/haiku:new")}]},
  {delay:1000,actions:[function(){addTyping()}]},
  {delay:800,actions:[function(){removeTyping();addMsg("agent","agent","What do you want to accomplish?")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Onboard TechStartup Inc to our platform. They just signed a $120K annual deal.")}]},

  // Intent created
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1000,actions:[function(){removeTyping();addMsg("agent","agent","Creating intent: onboard-techstartup-inc...");addFile(P+"/intent.md")}]},
  {delay:800,actions:[function(){addMsg("system","system","Intent created. Studio: customer-success. 5 stages: onboarding \u2192 adoption \u2192 health-check \u2192 expansion \u2192 renewal")}]},

  // === ONBOARDING ===
  {delay:1000,actions:[function(){activateStage("onboarding");addMsg("agent","agent","Entering onboarding stage. Hat: onboarding-lead.\nWhat do you know about TechStartup\u2019s team and their use case?");addFile(P+"/stages/onboarding/state.json")}]},
  {delay:2000,actions:[function(){addMsg("user","you","50 employees, engineering-heavy. They want to use our API monitoring features. Main contact is Sarah Chen, VP of Engineering. They're migrating from a competitor tool.")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1200,actions:[function(){removeTyping();addMsg("agent","agent","Competitor migration \u2014 we\u2019ll need to handle data import and make sure the transition is smooth. Decomposing onboarding work...")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/onboarding/units/unit-01-setup.md");addFile(P+"/stages/onboarding/units/unit-02-integration.md");addFile(P+"/stages/onboarding/units/unit-03-training.md");addCard("onboarding","setup","in-progress");addCard("onboarding","integration","");addCard("onboarding","training","")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Setup plan:\n  \u2022 Workspace provisioned with enterprise SSO (Okta)\n  \u2022 5 team seats activated: Sarah Chen + 4 engineering leads\n  \u2022 API keys generated for staging and production\n  \u2022 Data import from competitor: 6 months of monitoring history\n\nSuccess milestone: first live monitor created by end of week 1.");updateCard("onboarding","setup","completed");updateCard("onboarding","integration","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("25")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: technical-enabler. Integration guide created for TechStartup\u2019s stack:\n  \u2022 Node.js SDK configured for their Express API\n  \u2022 Kubernetes sidecar agent for their GKE cluster\n  \u2022 Slack webhook for alert routing to #eng-alerts\n  \u2022 Historical data import: 847 monitors migrated from competitor");updateCard("onboarding","integration","completed");updateCard("onboarding","training","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("20")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","Training materials personalized for 3 personas:\n  \u2022 Engineering leads: dashboard creation and alert configuration\n  \u2022 DevOps: SDK integration and Kubernetes agent management\n  \u2022 VP Engineering (Sarah): executive reporting and team oversight\n\nFirst success milestone achieved: 12 live monitors created within 3 days.");updateCard("onboarding","training","completed");addFile(P+"/knowledge/ONBOARDING-REPORT.md")}]},

  // Onboarding gate - ask
  {delay:800,actions:[function(){addMsg("system","system","Onboarding stage complete. Review gate: ask.")}]},
  {delay:800,actions:[function(){showCriteriaReview("Onboarding",INTENT,["Workspace setup: SSO, seats, API keys","Integration: SDK, K8s agent, Slack webhook","847 monitors migrated from competitor","Training delivered to 3 personas","First success: 12 live monitors in 3 days"],"ask gate")}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:2200,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("user","you","Great start. Move to adoption tracking.");addMsg("agent","agent","Advancing to adoption stage.")}]},

  // === ADOPTION ===
  {delay:1000,actions:[function(){activateStage("adoption");addMsg("agent","agent","Entering adoption stage. Hat: adoption-coach.\nLoading onboarding report...");addFile(P+"/stages/adoption/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 onboarding/onboarding-report (knowledge/ONBOARDING-REPORT.md)");addMsg("agent","agent","Tracking adoption metrics and identifying underutilized features...")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/adoption/units/unit-01-usage-tracking.md");addFile(P+"/stages/adoption/units/unit-02-enablement.md");addCard("adoption","usage-tracking","in-progress");addCard("adoption","enablement","")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: usage-analyst. Adoption metrics (30-day mark):\n  \u2022 DAU/MAU ratio: 0.68 (healthy)\n  \u2022 Monitors active: 47 (up from 12 at onboarding)\n  \u2022 Alert channels: 3 (Slack, PagerDuty, email)\n  \u2022 Features used: monitoring (high), alerting (high), dashboards (low), API testing (unused)\n\nDashboards and API testing are underutilized \u2014 big value opportunities.");updateCard("adoption","usage-tracking","completed");updateCard("adoption","enablement","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("20")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","Enablement plan created:\n  \u2022 Dashboard workshop for Sarah\u2019s team (maps dashboards to their weekly eng review)\n  \u2022 API testing walkthrough for DevOps lead (replaces their current Postman workflow)\n  \u2022 Custom metric builder tutorial (they have unique SLA requirements)\n\nAdoption target: 80% feature breadth within 60 days.");updateCard("adoption","enablement","completed");addFile(P+"/knowledge/USAGE-REPORT.md")}]},

  // Adoption gate - auto
  {delay:800,actions:[function(){addMsg("system","system","Adoption stage complete. Review gate: auto. All criteria met \u2014 advancing.");addMsg("agent","agent","Advancing to health-check stage.")}]},

  // === HEALTH-CHECK ===
  {delay:1000,actions:[function(){activateStage("health-check");addMsg("agent","agent","Entering health-check stage. Hat: health-monitor.\nLoading usage report...");addFile(P+"/stages/health-check/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 adoption/usage-report (knowledge/USAGE-REPORT.md)");addMsg("agent","agent","Running comprehensive health assessment across 5 dimensions...")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/health-check/units/unit-01-health-scorecard.md");addFile(P+"/stages/health-check/units/unit-02-risk-assessment.md");addCard("health-check","health-scorecard","in-progress");addCard("health-check","risk-assessment","")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Health scorecard:\n  \u2022 Usage: 8/10 (strong daily engagement)\n  \u2022 Engagement: 7/10 (responding to alerts, creating monitors)\n  \u2022 Support sentiment: 9/10 (2 tickets, both resolved same day)\n  \u2022 Stakeholder access: 6/10 (only talking to Sarah, need exec sponsor)\n  \u2022 Contract alignment: 8/10 (using 75% of licensed capacity)\n\nOverall: 7.6/10 \u2014 Healthy, with one flag.");updateCard("health-check","health-scorecard","completed");updateCard("health-check","risk-assessment","in-progress")}]},
  {delay:1200,actions:[function(){addMsg("agent","agent","Hat: risk-analyst. One risk flagged: single-threaded relationship through Sarah Chen. If she leaves or changes roles, we lose our champion. Should we proactively build a relationship with their CTO?")}]},
  {delay:2200,actions:[function(){addMsg("user","you","Yes \u2014 get a meeting with the CTO. Position it as a quarterly business review. Sarah can make the intro.")}]},
  {delay:800,actions:[function(){addMsg("agent","agent","Action item created: schedule QBR with CTO via Sarah\u2019s intro. Also adding their DevOps lead as a secondary contact for day-to-day interactions.");updateCard("health-check","risk-assessment","completed");addFile(P+"/knowledge/HEALTH-REPORT.md")}]},

  // Health-check gate - ask
  {delay:800,actions:[function(){addMsg("system","system","Health-check stage complete. Review gate: ask.")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Good catch on the single-thread risk. Approved.");addMsg("agent","agent","Advancing to expansion stage.")}]},

  // === EXPANSION ===
  {delay:1000,actions:[function(){activateStage("expansion");addMsg("agent","agent","Entering expansion stage. Hat: growth-strategist.\nLoading health report...");addFile(P+"/stages/expansion/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 health-check/health-report (knowledge/HEALTH-REPORT.md)");addMsg("agent","agent","Identifying expansion opportunities based on usage patterns and customer value...")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/expansion/units/unit-01-opportunity-analysis.md");addFile(P+"/stages/expansion/units/unit-02-expansion-proposal.md");addCard("expansion","opportunity-analysis","in-progress");addCard("expansion","expansion-proposal","")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: value-consultant. Two expansion opportunities identified:\n\n  1. [High] Additional seats: only 5 of 50 employees have access. Their QA team (8 people) is asking for monitoring access. Revenue impact: +$28K ARR.\n\n  2. [Medium] API testing add-on: they\u2019re currently using Postman separately. Our API testing integrates with their existing monitors. Revenue impact: +$15K ARR.\n\nTotal expansion potential: $43K ARR (36% uplift on $120K base).");updateCard("expansion","opportunity-analysis","completed");updateCard("expansion","expansion-proposal","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("25")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Expansion proposals drafted:\n  \u2022 QA team seats: ROI justification tied to their bug escape rate (currently 12%, industry benchmark 5%)\n  \u2022 API testing: positioned as Postman replacement with monitoring integration\n\nBoth proposals grounded in their actual usage data and business outcomes.");updateCard("expansion","expansion-proposal","completed");addFile(P+"/knowledge/OPPORTUNITY-BRIEF.md")}]},

  // Expansion gate - ask + await
  {delay:800,actions:[function(){addMsg("system","system","Expansion stage complete. Review gate: ask + await.")}]},
  {delay:800,actions:[function(){showCriteriaReview("Expansion",INTENT,["2 expansion opportunities with revenue impact","QA team seats: +$28K ARR justified by bug escape rate","API testing add-on: +$15K ARR replacing Postman","ROI grounded in actual usage data","Proposals ready for customer presentation"],"ask gate")}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:2000,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("user","you","Approved. Send both proposals.")}]},
  {delay:800,actions:[function(){addMsg("system","system","Await gate: waiting for TechStartup Inc response on expansion proposals...")}]},
  {delay:1500,actions:[function(){addMsg("system","system","Await resolved \u2014 TechStartup approved QA team seats (+$28K). API testing deferred to next quarter.")}]},
  {delay:800,actions:[function(){addMsg("agent","agent","Partial win \u2014 $28K expansion closed. API testing is in pipeline for Q2. Advancing to renewal.")}]},

  // === RENEWAL ===
  {delay:1000,actions:[function(){activateStage("renewal");addMsg("agent","agent","Entering renewal stage. Hat: renewal-manager.\nLoading opportunity brief...");addFile(P+"/stages/renewal/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 expansion/opportunity-brief (knowledge/OPPORTUNITY-BRIEF.md)");addMsg("agent","agent","Building renewal strategy with value realization summary...")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/renewal/units/unit-01-value-summary.md");addFile(P+"/stages/renewal/units/unit-02-renewal-proposal.md");addFile(P+"/stages/renewal/units/unit-03-ebr-deck.md");addCard("renewal","value-summary","in-progress");addCard("renewal","renewal-proposal","");addCard("renewal","ebr-deck","")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Value realization summary:\n  \u2022 Monitors: 12 at onboarding \u2192 63 active today\n  \u2022 MTTR reduction: 47 min \u2192 12 min (74% improvement)\n  \u2022 Incident detection: 89% of issues caught before customer reports\n  \u2022 Team adoption: 13 active users (up from 5)\n  \u2022 Competitor migration: complete, zero data loss\n\nQuantified ROI: $340K in prevented downtime costs vs. $148K contract value.");updateCard("renewal","value-summary","completed");updateCard("renewal","renewal-proposal","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("25")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: executive-sponsor. Renewal proposal:\n  \u2022 2-year renewal at $148K/year (includes QA team expansion)\n  \u2022 5% multi-year discount if they commit to 2 years\n  \u2022 API testing add-on included at 10% discount as early commitment incentive\n\nAnticipated objection: \u201Cwhy pay more when we\u2019re not using API testing yet?\u201D Counter: bundle discount saves them $8K vs. adding it later.");updateCard("renewal","renewal-proposal","completed");updateCard("renewal","ebr-deck","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("20")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","EBR deck tells the value story:\n  Slide 1: Where they started (competitor tool, manual monitoring)\n  Slide 2: What they achieved (74% MTTR reduction, $340K saved)\n  Slide 3: Where they can go (API testing, full-team adoption)\n  Slide 4: Renewal terms with bundle savings");updateCard("renewal","ebr-deck","completed");addFile(P+"/knowledge/RENEWAL-OUTCOME.md")}]},

  // Renewal gate - external + await
  {delay:800,actions:[function(){addMsg("system","system","Renewal stage complete. Review gate: external + await.")}]},
  {delay:800,actions:[function(){showCriteriaReview("Renewal",INTENT,["Value summary with quantified ROI ($340K saved)","74% MTTR improvement documented with evidence","Renewal proposal with multi-year discount","Objection handling prepared for API testing bundle","EBR deck with clear value narrative"],"external gate")}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:2400,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("system","system","External review approved. CTO signed 2-year renewal with API testing bundle.")}]},

  // Complete
  {delay:1200,actions:[function(){completeAllStages();addMsg("agent","agent","All 5 stages complete for onboard-techstartup-inc.\n\nDelivered:\n  \u2022 Onboarding: SSO setup, 847 monitors migrated, 3-persona training\n  \u2022 Adoption: 0.68 DAU/MAU, enablement plan for underutilized features\n  \u2022 Health-check: 7.6/10 score, single-thread risk mitigated with CTO QBR\n  \u2022 Expansion: QA team seats closed (+$28K), API testing in pipeline\n  \u2022 Renewal: 2-year deal signed at $163K/year with API testing bundle\n\nAccount growth: $120K \u2192 $163K ARR (36% expansion). Intent status: complete.")}]},
  {delay:1500,actions:[function(){overlay.classList.add("visible")}]}
]
};
