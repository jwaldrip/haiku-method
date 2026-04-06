var P = ".haiku/intents/security-awareness-training";
window.HAIKU_DEMO_CONFIG = {
  title: "training",
  studio: "training",
  stages: ["needs-analysis","design","develop","deliver","evaluate"],
  completionText: "All 5 stages passed. security-awareness-training delivered.",
  steps: [
  {delay:800,actions:[function(){addMsg("user","you","/haiku:new")}]},{delay:1200,actions:[function(){addTyping()}]},{delay:1000,actions:[function(){removeTyping();addMsg("agent","agent","What do you want to accomplish?")}]},{delay:1500,actions:[function(){addMsg("user","you","Build a company-wide security awareness training program")}]},
  {delay:800,actions:[function(){addTyping()}]},{delay:1200,actions:[function(){removeTyping();addMsg("agent","agent","Creating intent: security-awareness-training...");addFile(P+"/intent.md")}]},{delay:800,actions:[function(){addMsg("system","system","Intent created. Studio: training. 5 stages: needs-analysis \u2192 design \u2192 develop \u2192 deliver \u2192 evaluate")}]},

  // === NEEDS-ANALYSIS (hats: analyst, consultant | review: auto) ===
  {delay:1000,actions:[function(){activateStage("needs-analysis");addMsg("agent","agent","Entering needs-analysis stage. Hat: analyst.\nWhat triggered this training initiative? And what\u2019s the target audience?");addFile(P+"/stages/needs-analysis/state.json")}]},
  {delay:2000,actions:[function(){addMsg("user","you","We had 3 phishing incidents last quarter. All employees need it \u2014 450 people across engineering, sales, and operations. Engineering has decent awareness, sales and ops are the weak spots.")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1200,actions:[function(){removeTyping();addMsg("agent","agent","Got it. Incident-driven with known risk segments. I\u2019ll profile each audience separately.");addFile(P+"/stages/needs-analysis/units/unit-01-gap-analysis.md");addFile(P+"/stages/needs-analysis/units/unit-02-objectives.md");addCard("needs-analysis","gap-analysis","in-progress");addCard("needs-analysis","objectives","")}]},
  {delay:500,actions:[function(){addFastForward("40")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: consultant. Skills gap analysis complete:\n  Engineering: 72% baseline awareness (good on code security, weak on social engineering)\n  Sales: 38% baseline (high phishing susceptibility, poor password hygiene)\n  Operations: 45% baseline (moderate awareness, weak on data handling)\n\nLearning objectives follow Bloom\u2019s taxonomy with observable, measurable outcomes.");addFile(P+"/knowledge/NEEDS-ASSESSMENT.md");updateCard("needs-analysis","gap-analysis","completed");updateCard("needs-analysis","objectives","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("20")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","6 learning objectives defined, mapped to specific gap areas. Stakeholder input incorporated from CISO, department heads, and sample employees.");updateCard("needs-analysis","objectives","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Needs-analysis complete. Review gate: auto. Multiple data sources validated \u2014 advancing.")}]},

  // === DESIGN (hats: designer, subject-expert | review: ask) ===
  {delay:1000,actions:[function(){activateStage("design");addMsg("agent","agent","Entering design stage. Hat: designer.\nLoading needs assessment...");addFile(P+"/stages/design/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 needs-analysis/needs-assessment (knowledge/NEEDS-ASSESSMENT.md)");addFile(P+"/stages/design/units/unit-01-curriculum.md");addFile(P+"/stages/design/units/unit-02-learning-path.md");addCard("design","curriculum","in-progress");addCard("design","learning-path","")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Curriculum structured as 4 modules:\n  M1: Phishing recognition and response (all audiences)\n  M2: Password and authentication best practices (sales/ops focus)\n  M3: Data handling and classification (ops focus)\n  M4: Secure development practices (engineering focus)\n\nModules sequenced by prerequisite knowledge. Each maps to specific needs assessment gaps. Want to adjust the structure?")}]},
  {delay:2200,actions:[function(){addMsg("user","you","Add a module on social engineering beyond just phishing \u2014 pretexting, tailgating, vishing. Sales gets targeted a lot on those.")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1000,actions:[function(){removeTyping();addMsg("agent","agent","Added M5: Social engineering defense (mandatory for sales, optional for others). Curriculum now 5 modules with role-based learning paths.");updateCard("design","curriculum","completed");updateCard("design","learning-path","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("25")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: subject-expert. Assessment strategy defined:\n  Formative: In-module quizzes after each section\n  Summative: Simulated phishing test + knowledge assessment\n  Rubrics defined for each assessment type. Content accuracy validated.");addFile(P+"/knowledge/CURRICULUM-PLAN.md");updateCard("design","learning-path","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Design stage complete. Review gate: ask.")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Approved. Love the simulated phishing test idea.");addMsg("agent","agent","Advancing to develop stage.")}]},

  // === DEVELOP (hats: developer, editor | review: ask) ===
  {delay:1000,actions:[function(){activateStage("develop");addMsg("agent","agent","Entering develop stage. Hat: developer.\nLoading curriculum plan...");addFile(P+"/stages/develop/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 design/curriculum-plan (knowledge/CURRICULUM-PLAN.md), needs-analysis/needs-assessment (knowledge/NEEDS-ASSESSMENT.md)");addFile(P+"/stages/develop/units/unit-01-module-content.md");addFile(P+"/stages/develop/units/unit-02-assessments.md");addCard("develop","module-content","in-progress");addCard("develop","assessments","")}]},
  {delay:500,actions:[function(){addFastForward("60")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","5 modules developed with facilitator guides, participant materials, and exercises. Each module includes:\n  \u2022 Interactive scenarios based on real company incidents\n  \u2022 Role-specific examples (sales demos, engineering code snippets, ops procedures)\n  \u2022 Quick-reference cards for daily use\n\nWant to review any specific module?")}]},
  {delay:2000,actions:[function(){addMsg("user","you","Let me see the phishing module exercises. I want to make sure they\u2019re realistic enough.")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1200,actions:[function(){removeTyping();addMsg("agent","agent","Phishing exercises use 8 simulated emails modeled after actual attack patterns:\n  \u2022 CEO impersonation (business email compromise)\n  \u2022 IT password reset (credential harvesting)\n  \u2022 Invoice attachment (malware delivery)\n  \u2022 LinkedIn connection (social engineering)\nEach with progressive difficulty. Participants must identify the red flags.")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Perfect. Add a time-pressure variant \u2014 some of these should show up as urgent to simulate real-world pressure.");addMsg("agent","agent","Added urgency variants to 3 exercises. Great call \u2014 time pressure is the #1 factor in phishing success.");updateCard("develop","module-content","completed");updateCard("develop","assessments","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: editor. All materials accessible \u2014 screen reader compatible, captioned videos, sufficient color contrast. Assessments validated by subject expert. Simulated phishing test configured with 3 difficulty tiers.");addFile(P+"/stages/develop/artifacts/training-materials-v1.md");addFile(P+"/stages/develop/artifacts/assessment-instruments.md");updateCard("develop","assessments","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Develop stage complete. Review gate: ask.")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Content looks great. Ship it.");addMsg("agent","agent","Advancing to deliver stage.")}]},

  // === DELIVER (hats: facilitator, coordinator | review: auto) ===
  {delay:1000,actions:[function(){activateStage("deliver");addMsg("agent","agent","Entering deliver stage. Hat: facilitator.\nLoading training materials...");addFile(P+"/stages/deliver/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 develop/training-materials (stages/develop/artifacts/), design/curriculum-plan (knowledge/CURRICULUM-PLAN.md)");addFile(P+"/stages/deliver/units/unit-01-session-delivery.md");addFile(P+"/stages/deliver/units/unit-02-logistics.md");addCard("deliver","session-delivery","in-progress");addCard("deliver","logistics","")}]},
  {delay:500,actions:[function(){addFastForward("45")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: coordinator. Delivery log compiled:\n  Sessions delivered: 12 (4 per department)\n  Attendance: 423/450 (94%)\n  Completion rate: 98% of attendees\n  Learner satisfaction: 4.3/5.0\n\nFacilitator notes: Module 1 (phishing) had highest engagement. Module 3 (data handling) needs more interactive elements \u2014 some participants disengaged during the classification exercise.");addFile(P+"/knowledge/DELIVERY-LOG.md");updateCard("deliver","session-delivery","completed");updateCard("deliver","logistics","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Deliver stage complete. Review gate: auto. All sessions delivered as planned \u2014 advancing.")}]},

  // === EVALUATE (hats: evaluator, analyst | review: ask) ===
  {delay:1000,actions:[function(){activateStage("evaluate");addMsg("agent","agent","Entering evaluate stage. Hat: evaluator.\nLoading delivery data and baseline...");addFile(P+"/stages/evaluate/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 deliver/delivery-log (knowledge/DELIVERY-LOG.md), needs-analysis/needs-assessment (knowledge/NEEDS-ASSESSMENT.md), design/curriculum-plan (knowledge/CURRICULUM-PLAN.md)");addFile(P+"/stages/evaluate/units/unit-01-effectiveness.md");addFile(P+"/stages/evaluate/units/unit-02-improvement-recs.md");addCard("evaluate","effectiveness","in-progress");addCard("evaluate","improvement-recs","")}]},
  {delay:500,actions:[function(){addFastForward("40")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Kirkpatrick 4-level evaluation:\n  L1 Reaction: 4.3/5 satisfaction, 89% would recommend\n  L2 Learning: Pre/post knowledge gain +34% average (statistically significant p<0.01)\n  L3 Behavior: Simulated phishing click rate dropped from 31% to 8%\n  L4 Results: Phishing incident reports up 200% (employees reporting suspicious emails \u2014 a positive signal)");updateCard("evaluate","effectiveness","completed");updateCard("evaluate","improvement-recs","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("25")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: analyst. Improvement recommendations prioritized:\n  1. High impact: Revise data handling module with more interactive scenarios\n  2. Medium impact: Add quarterly phishing simulations for reinforcement\n  3. Medium impact: Create manager toolkit for team-level security discussions\n\nOriginal gap analysis compared to outcomes: all 6 learning objectives met or exceeded targets.");addFile(P+"/knowledge/EFFECTIVENESS-REPORT.md");updateCard("evaluate","improvement-recs","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Evaluate stage complete. Review gate: ask.")}]},
  {delay:1500,actions:[function(){addMsg("user","you","31% to 8% click rate is outstanding. Approved.");addMsg("agent","agent","All stages complete.")}]},

  // === COMPLETE ===
  {delay:1200,actions:[function(){completeAllStages();addMsg("agent","agent","All 5 stages complete for security-awareness-training.\n\nDelivered:\n  \u2022 Skills gap analysis across 3 departments with role-specific profiles\n  \u2022 5-module curriculum with role-based learning paths and assessment strategy\n  \u2022 Training materials with simulated phishing exercises and urgency variants\n  \u2022 12 sessions delivered to 423 employees (94% attendance)\n  \u2022 Effectiveness report: phishing click rate 31% \u2192 8%, knowledge gain +34%\n\nIntent status: complete.")}]},
  {delay:1500,actions:[function(){overlay.classList.add("visible")}]}
]
};
