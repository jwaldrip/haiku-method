var P = ".haiku/intents/select-cloud-infrastructure-vendor";
window.HAIKU_DEMO_CONFIG = {
  title: "vendor-management",
  studio: "vendor-management",
  stages: ["requirements","evaluate","negotiate","onboard","monitor"],
  completionText: "All 5 stages passed. select-cloud-infrastructure-vendor delivered.",
  steps: [
  {delay:800,actions:[function(){addMsg("user","you","/haiku:new")}]},{delay:1200,actions:[function(){addTyping()}]},{delay:1000,actions:[function(){removeTyping();addMsg("agent","agent","What do you want to accomplish?")}]},{delay:1500,actions:[function(){addMsg("user","you","Select a new cloud infrastructure vendor for our platform")}]},
  {delay:800,actions:[function(){addTyping()}]},{delay:1200,actions:[function(){removeTyping();addMsg("agent","agent","Creating intent: select-cloud-infrastructure-vendor...");addFile(P+"/intent.md")}]},{delay:800,actions:[function(){addMsg("system","system","Intent created. Studio: vendor-management. 5 stages: requirements \u2192 evaluate \u2192 negotiate \u2192 onboard \u2192 monitor")}]},

  // === REQUIREMENTS (hats: analyst, specifier | review: ask) ===
  {delay:1000,actions:[function(){activateStage("requirements");addMsg("agent","agent","Entering requirements stage. Hat: analyst.\nWhat\u2019s driving the vendor change? And what are your non-negotiable requirements?");addFile(P+"/stages/requirements/state.json")}]},
  {delay:2000,actions:[function(){addMsg("user","you","Current vendor\u2019s egress costs are killing us \u2014 $40K/month. Need Kubernetes support, multi-region, SOC 2, and data residency in US/EU. Budget: $25K/month max.")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1200,actions:[function(){removeTyping();addMsg("agent","agent","Clear cost driver. Let me structure the RFP.");addFile(P+"/stages/requirements/units/unit-01-requirements.md");addFile(P+"/stages/requirements/units/unit-02-rfp.md");addCard("requirements","requirements-doc","in-progress");addCard("requirements","rfp","")}]},
  {delay:500,actions:[function(){addFastForward("40")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: specifier. RFP structured with weighted evaluation criteria:\n  Mandatory: Kubernetes (managed), multi-region, SOC 2, US/EU data residency\n  Preferred: Terraform provider, >99.95% SLA, DDoS protection included\n  Nice-to-have: Carbon-neutral datacenters, spot instance support\n\nScoring methodology defined before vendor contact. Egress cost given 25% weight.");addFile(P+"/knowledge/RFP-DOCUMENT.md");updateCard("requirements","requirements-doc","completed");updateCard("requirements","rfp","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("20")}]},
  {delay:1200,actions:[function(){removeFastForward();updateCard("requirements","rfp","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Requirements stage complete. Review gate: ask.")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Good RFP. Send it to the shortlist.");addMsg("agent","agent","Advancing to evaluate stage.")}]},

  // === EVALUATE (hats: evaluator, technical-reviewer | review: ask) ===
  {delay:1000,actions:[function(){activateStage("evaluate");addMsg("agent","agent","Entering evaluate stage. Hat: evaluator.\nLoading RFP...");addFile(P+"/stages/evaluate/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 requirements/rfp-document (knowledge/RFP-DOCUMENT.md)");addFile(P+"/stages/evaluate/units/unit-01-vendor-assessment.md");addFile(P+"/stages/evaluate/units/unit-02-poc-testing.md");addCard("evaluate","vendor-assessment","in-progress");addCard("evaluate","poc-testing","")}]},
  {delay:500,actions:[function(){addFastForward("50")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","4 vendors evaluated against RFP criteria:\n  Vendor A (CloudScale): 87/100 \u2014 best egress pricing ($8K/mo est.), strong K8s\n  Vendor B (InfraCore): 82/100 \u2014 best SLA (99.99%), higher egress ($15K/mo)\n  Vendor C (NexCloud): 76/100 \u2014 cheapest overall but weaker multi-region\n  Vendor D (AzureStack): 71/100 \u2014 enterprise features but vendor lock-in risk");updateCard("evaluate","vendor-assessment","completed");updateCard("evaluate","poc-testing","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: technical-reviewer. POC results for top 2:\n  CloudScale: Migration test passed, Terraform provider mature, latency p99 = 12ms\n  InfraCore: Migration test passed, Terraform provider beta, latency p99 = 8ms\n\nTCO analysis over 24 months:\n  CloudScale: $468K (saves $492K vs current)\n  InfraCore: $636K (saves $324K vs current)");addFile(P+"/knowledge/VENDOR-SCORECARD.md");updateCard("evaluate","poc-testing","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Evaluate stage complete. Review gate: ask.")}]},
  {delay:1500,actions:[function(){addMsg("user","you","CloudScale wins on cost. Their Terraform provider being mature is a big plus. Let\u2019s negotiate.");addMsg("agent","agent","Advancing to negotiate stage with CloudScale.")}]},

  // === NEGOTIATE (hats: negotiator, legal-reviewer | review: external) ===
  {delay:1000,actions:[function(){activateStage("negotiate");addMsg("agent","agent","Entering negotiate stage. Hat: negotiator.\nLoading scorecard and RFP...");addFile(P+"/stages/negotiate/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 evaluate/vendor-scorecard (knowledge/VENDOR-SCORECARD.md), requirements/rfp-document (knowledge/RFP-DOCUMENT.md)");addFile(P+"/stages/negotiate/units/unit-01-terms.md");addFile(P+"/stages/negotiate/units/unit-02-sla-review.md");addCard("negotiate","terms","in-progress");addCard("negotiate","sla-review","")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Initial terms from CloudScale:\n  Monthly commitment: $19.5K (below $25K budget)\n  Egress: $0.04/GB (vs current $0.09/GB)\n  SLA: 99.95% with 10% service credits\n\nI recommend pushing for:\n  1. Egress at $0.03/GB (leverage 24-month commitment)\n  2. SLA credits at 25% (industry standard for enterprise)\n  3. Free migration support (they offered paid)")}]},
  {delay:2200,actions:[function(){addMsg("user","you","Push on all three. We\u2019re committing to 24 months \u2014 they should give us migration support at minimum.")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1200,actions:[function(){removeTyping();addMsg("agent","agent","Negotiated terms:\n  Egress: $0.035/GB (compromise from $0.04)\n  SLA credits: 20% (up from 10%)\n  Migration: Included at no cost with dedicated engineer\n\nTotal savings vs current: $516K over 24 months.");updateCard("negotiate","terms","completed");updateCard("negotiate","sla-review","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("25")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: legal-reviewer. Contract reviewed. All risk clauses addressed:\n  \u2022 Data processing addendum aligned with GDPR\n  \u2022 Termination for convenience with 90-day notice\n  \u2022 IP ownership clauses acceptable\n  \u2022 Liability cap at 12 months of fees");addFile(P+"/knowledge/NEGOTIATION-TERMS.md");updateCard("negotiate","sla-review","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Negotiate stage complete. Review gate: external.");addMsg("agent","agent","Sharing terms for CFO and Legal approval...")}]},
  {delay:1000,actions:[function(){showCriteriaReview("Negotiate","select-cloud-infrastructure-vendor",["Pricing within budget with market benchmarks","SLA terms measurable with defined remedies","Contract risks reviewed and addressed","Migration support included in terms","Data processing compliance verified"],"external")}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:2400,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("system","system","CFO and Legal approved. Contract signed.")}]},

  // === ONBOARD (hats: integrator, coordinator | review: auto) ===
  {delay:1000,actions:[function(){activateStage("onboard");addMsg("agent","agent","Entering onboard stage. Hat: integrator.\nLoading negotiation terms...");addFile(P+"/stages/onboard/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 negotiate/negotiation-terms (knowledge/NEGOTIATION-TERMS.md)");addFile(P+"/stages/onboard/units/unit-01-migration.md");addFile(P+"/stages/onboard/units/unit-02-validation.md");addCard("onboard","migration","in-progress");addCard("onboard","validation","")}]},
  {delay:500,actions:[function(){addFastForward("50")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: coordinator. Onboarding checklist progress:\n  \u2713 Account setup and IAM configuration\n  \u2713 Terraform state migration\n  \u2713 Kubernetes cluster provisioned in US-East and EU-West\n  \u2713 DNS and CDN cutover plan ready\n  \u2022 Data migration: 80% complete (large dataset transfer in progress)");updateCard("onboard","migration","completed");updateCard("onboard","validation","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Integration validated end-to-end:\n  \u2022 API latency: p99 = 11ms (within threshold)\n  \u2022 Data flow: verified across all services\n  \u2022 Error handling: failover tested, <30s recovery\n  \u2022 Escalation paths documented with named CloudScale contacts\n  \u2022 All stakeholders provisioned with access and trained on the console");addFile(P+"/knowledge/ONBOARDING-CHECKLIST.md");updateCard("onboard","validation","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Onboard stage complete. Review gate: auto. Integration validated \u2014 advancing.")}]},

  // === MONITOR (hats: monitor, relationship-manager | review: auto) ===
  {delay:1000,actions:[function(){activateStage("monitor");addMsg("agent","agent","Entering monitor stage. Hat: monitor.\nLoading onboarding data and contract terms...");addFile(P+"/stages/monitor/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 onboard/onboarding-checklist (knowledge/ONBOARDING-CHECKLIST.md), negotiate/negotiation-terms (knowledge/NEGOTIATION-TERMS.md)");addFile(P+"/stages/monitor/units/unit-01-performance.md");addFile(P+"/stages/monitor/units/unit-02-relationship.md");addCard("monitor","performance","in-progress");addCard("monitor","relationship","")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","First month performance report:\n  Uptime: 99.97% (above 99.95% SLA)\n  Egress cost: $7,200 (under $8K estimate)\n  Latency: p99 = 10ms (improved from POC)\n  Support tickets: 3 filed, all resolved within SLA\n\nTrend: positive across all metrics.");updateCard("monitor","performance","completed");updateCard("monitor","relationship","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("20")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: relationship-manager. Vendor health assessment:\n  Communication: Responsive, proactive on maintenance windows\n  Issue resolution: Average 4hr turnaround (SLA is 8hr)\n  Strategic alignment: Roadmap includes features we need in Q2\n\nRecommendation: Schedule quarterly business review to maintain relationship quality.");addFile(P+"/knowledge/PERFORMANCE-REPORT.md");updateCard("monitor","relationship","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Monitor stage complete. Review gate: auto. All SLA metrics met \u2014 advancing.")}]},

  // === COMPLETE ===
  {delay:1200,actions:[function(){completeAllStages();addMsg("agent","agent","All 5 stages complete for select-cloud-infrastructure-vendor.\n\nDelivered:\n  \u2022 RFP with weighted criteria and egress cost at 25% weight\n  \u2022 4-vendor evaluation with POC testing and 24-month TCO analysis\n  \u2022 CloudScale selected: $516K savings over 24 months\n  \u2022 Negotiated terms: $0.035/GB egress, 99.95% SLA, free migration\n  \u2022 Full onboarding with end-to-end validation across US and EU regions\n  \u2022 Month-1 performance: 99.97% uptime, $7.2K egress (under estimate)\n\nIntent status: complete.")}]},
  {delay:1500,actions:[function(){overlay.classList.add("visible")}]}
]
};
