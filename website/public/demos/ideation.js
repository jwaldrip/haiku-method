window.HAIKU_DEMO_CONFIG = {
  title: "ideation",
  studio: "ideation",
  stages: ["research","create","review","deliver"],
  completionText: "All 4 stages passed. company-rebrand-strategy delivered.",
  steps: [
  // === User invokes ===
  {delay:800,actions:[function(){addMsg("user","you","/haiku:new")}]},
  {delay:1200,actions:[function(){addMsg("agent","agent","What do you want to accomplish?")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Design a company rebrand strategy")}]},
  {delay:1200,actions:[function(){addMsg("agent","agent","Creating intent: company-rebrand-strategy...");addFile(".haiku/intents/company-rebrand-strategy/intent.md")}]},
  {delay:800,actions:[function(){addMsg("system","system","Intent created. Studio: ideation. 4 stages: research \u2192 create \u2192 review \u2192 deliver")}]},

  // === RESEARCH stage ===
  {delay:1000,actions:[function(){activateStage("research");addMsg("agent","agent","Entering research stage. Hat: researcher.\nWhat\u2019s driving the rebrand? Merger, repositioning, or something else?");addFile(".haiku/intents/company-rebrand-strategy/stages/research/state.json")}]},
  {delay:2000,actions:[function(){addMsg("user","you","Repositioning. We\u2019re moving upmarket from SMB to enterprise. Current brand feels too playful.")}]},
  {delay:1000,actions:[function(){addMsg("agent","agent","SMB-to-enterprise repositioning. Researching competitor strategies, enterprise buyer expectations, and similar transitions.");addFile(".haiku/intents/company-rebrand-strategy/stages/research/units/unit-01-competitor-analysis.md");addFile(".haiku/intents/company-rebrand-strategy/stages/research/units/unit-02-enterprise-brand-patterns.md");addCard("research","competitor-analysis","in-progress");addCard("research","enterprise-patterns","")}]},
  {delay:500,actions:[function(){addFastForward("40")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: analyst. Found 5 competitors who made similar transitions. Key pattern: enterprise buyers want approachable expertise, not stuffy corporate. Three pillars: trust signals, visual maturity, tone shift.");updateCard("research","competitor-analysis","completed");updateCard("research","enterprise-patterns","completed");addFile(".haiku/intents/company-rebrand-strategy/knowledge/RESEARCH-BRIEF.md")}]},
  {delay:800,actions:[function(){addMsg("system","system","Research complete. Review gate: auto. All criteria met \u2014 advancing.")}]},

  // === CREATE stage ===
  {delay:1000,actions:[function(){activateStage("create");addMsg("agent","agent","Entering create stage. Hat: creator.\nLoading research outputs...");addFile(".haiku/intents/company-rebrand-strategy/stages/create/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 research/research-brief (knowledge/RESEARCH-BRIEF.md)");addFile(".haiku/intents/company-rebrand-strategy/stages/create/units/unit-01-brand-positioning.md");addFile(".haiku/intents/company-rebrand-strategy/stages/create/units/unit-02-visual-direction.md");addFile(".haiku/intents/company-rebrand-strategy/stages/create/units/unit-03-messaging-framework.md");addCard("create","brand-positioning","in-progress");addCard("create","visual-direction","");addCard("create","messaging-framework","")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Two positioning directions:\n  A) \"Trusted partner\" \u2014 reliability and depth\n  B) \"Smart ally\" \u2014 intelligence and approachability\nWhich resonates?")}]},
  {delay:2000,actions:[function(){addMsg("user","you","B \u2014 smart ally. But add more credibility signals for enterprise trust.")}]},
  {delay:1000,actions:[function(){addMsg("agent","agent","\"Smart ally with substance.\" Leading with expertise proof points while keeping conversational tone.");updateCard("create","brand-positioning","completed");updateCard("create","visual-direction","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Visual: deeper tones with accent color, humanist typeface. Messaging: three tiers \u2014 executive (ROI), practitioner (capability), developer (technical depth).");updateCard("create","visual-direction","completed");updateCard("create","messaging-framework","completed");addFile(".haiku/intents/company-rebrand-strategy/knowledge/DRAFT-DELIVERABLE.md")}]},
  {delay:1000,actions:[function(){addMsg("system","system","Create stage complete. Review gate: ask.");showCriteriaReview("Create","company-rebrand-strategy",["Brand positioning uses \"smart ally\" direction with credibility signals","Visual direction shifts palette to mature tones with warmth","Messaging framework covers executive, practitioner, and developer tiers"])}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:1800,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("user","you","Approved. The messaging tiers are exactly right.")}]},

  // === REVIEW stage ===
  {delay:1000,actions:[function(){activateStage("review");addMsg("agent","agent","Entering review stage. Hat: critic.\nAdversarial review of draft deliverable...");addFile(".haiku/intents/company-rebrand-strategy/stages/review/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 create/draft-deliverable (knowledge/DRAFT-DELIVERABLE.md)");addCard("review","strategic-review","in-progress");addCard("review","fact-check","")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: fact-checker. Found 2 issues:\n  1. Major: Competitor case study cites pre-launch data only \u2014 no post-launch metrics\n  2. Minor: \"Best-in-class\" used twice \u2014 enterprise buyers find this generic\nVerdict: revise, then approve.");updateCard("review","strategic-review","completed");updateCard("review","fact-check","completed");addFile(".haiku/intents/company-rebrand-strategy/knowledge/REVIEW-REPORT.md")}]},
  {delay:1000,actions:[function(){addMsg("system","system","Review stage complete. Review gate: ask.");showCriteriaReview("Review","company-rebrand-strategy",["Substantive issues identified with remediation suggestions","Factual claims verified against original sources","Each finding includes severity and actionable fix"])}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:1800,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("user","you","Approved. Fair catches.")}]},

  // === DELIVER stage ===
  {delay:1000,actions:[function(){activateStage("deliver");addMsg("agent","agent","Entering deliver stage. Hat: publisher.\nLoading draft and review report...");addFile(".haiku/intents/company-rebrand-strategy/stages/deliver/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 create/draft-deliverable, review/review-report");addCard("deliver","finalize","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("25")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","All review findings addressed. Case study updated with post-launch metrics. Formatted for executive audience.");updateCard("deliver","finalize","completed");addFile(".haiku/intents/company-rebrand-strategy/knowledge/FINAL-DELIVERABLE.md")}]},
  {delay:800,actions:[function(){addMsg("system","system","Deliver complete. Review gate: auto. All criteria met \u2014 advancing.")}]},

  // === Complete ===
  {delay:1200,actions:[function(){completeAllStages();addMsg("agent","agent","All 4 stages complete for company-rebrand-strategy.\n\nDelivered:\n  \u2022 Research brief with competitor analysis and enterprise brand patterns\n  \u2022 Brand positioning: \"smart ally with substance\"\n  \u2022 Visual direction: mature palette, humanist typography\n  \u2022 Messaging framework: executive, practitioner, and developer tiers\n  \u2022 Adversarial review with 2 findings addressed\n  \u2022 Final deliverable formatted for executive audience\n\nIntent status: complete.")}]},
  {delay:1500,actions:[function(){overlay.classList.add("visible")}]}
]
};
