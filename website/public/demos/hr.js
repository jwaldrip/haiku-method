var P = ".haiku/intents/hire-senior-backend-engineer";
window.HAIKU_DEMO_CONFIG = {
  title: "hr",
  studio: "hr",
  stages: ["requisition","sourcing","screening","interview","offer"],
  completionText: "All 5 stages passed. hire-senior-backend-engineer delivered.",
  steps: [
  // Init
  {delay:800,actions:[function(){addMsg("user","you","/haiku:new")}]},
  {delay:1200,actions:[function(){addTyping()}]},
  {delay:1000,actions:[function(){removeTyping();addMsg("agent","agent","What do you want to accomplish?")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Hire a senior backend engineer for the platform team")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1200,actions:[function(){removeTyping();addMsg("agent","agent","Creating intent: hire-senior-backend-engineer...");addFile(P+"/intent.md")}]},
  {delay:800,actions:[function(){addMsg("system","system","Intent created. Studio: hr. 5 stages: requisition \u2192 sourcing \u2192 screening \u2192 interview \u2192 offer")}]},

  // === REQUISITION (hats: hiring-manager, recruiter | review: ask) ===
  {delay:1000,actions:[function(){activateStage("requisition");addMsg("agent","agent","Entering requisition stage. Hat: hiring-manager.\nLet\u2019s define the role. What\u2019s the primary tech stack?");addFile(P+"/stages/requisition/state.json")}]},
  {delay:2000,actions:[function(){addMsg("user","you","Go, PostgreSQL, gRPC. Must have distributed systems experience. Nice-to-have: Kubernetes, event-driven architecture.")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1200,actions:[function(){removeTyping();addMsg("agent","agent","Got it. What level are we targeting? And is this backfill or growth?");addFile(P+"/stages/requisition/units/unit-01-role-definition.md");addFile(P+"/stages/requisition/units/unit-02-job-description.md");addCard("requisition","role-definition","in-progress");addCard("requisition","job-description","")}]},
  {delay:1800,actions:[function(){addMsg("user","you","Growth. L5/L6 equivalent. 5+ years experience. Remote OK but US time zones only.")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: recruiter. Role definition complete. Compensation benchmarked against 3 sources:\n  Levels.fyi: $185-225K base\n  Glassdoor: $175-215K base\n  Internal band: $180-220K base\nRecommended range: $185-220K + equity. Job spec separates must-have from nice-to-have qualifications.");addFile(P+"/knowledge/JOB-SPEC.md");updateCard("requisition","role-definition","completed");updateCard("requisition","job-description","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("20")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","Job description written. Emphasizes impact over requirements list. Inclusive language verified.");updateCard("requisition","job-description","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Requisition complete. Review gate: ask.")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Approved. Post it.");addMsg("agent","agent","Advancing to sourcing stage.")}]},

  // === SOURCING (hats: sourcer, recruiter | review: auto) ===
  {delay:1000,actions:[function(){activateStage("sourcing");addMsg("agent","agent","Entering sourcing stage. Hat: sourcer.\nLoading requisition outputs...");addFile(P+"/stages/sourcing/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 requisition/job-spec (knowledge/JOB-SPEC.md)");addFile(P+"/stages/sourcing/units/unit-01-channel-sourcing.md");addFile(P+"/stages/sourcing/units/unit-02-outreach.md");addCard("sourcing","channel-sourcing","in-progress");addCard("sourcing","outreach","")}]},
  {delay:500,actions:[function(){addFastForward("40")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: recruiter. Pipeline built from 4 channels:\n  LinkedIn: 12 prospects\n  GitHub (Go contributors): 5 prospects\n  Referrals: 4 prospects\n  Job boards: 6 prospects\n27 total qualified candidates with initial fit assessments.");updateCard("sourcing","channel-sourcing","completed");updateCard("sourcing","outreach","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("25")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Personalized outreach sent. Each message references the candidate\u2019s specific background and our platform challenges. Response rate tracking initiated.");addFile(P+"/knowledge/CANDIDATE-PIPELINE.md");updateCard("sourcing","outreach","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Sourcing complete. Review gate: auto. Pipeline volume sufficient \u2014 advancing.")}]},

  // === SCREENING (hats: screener, assessor | review: auto) ===
  {delay:1000,actions:[function(){activateStage("screening");addMsg("agent","agent","Entering screening stage. Hat: screener.\nLoading upstream outputs...");addFile(P+"/stages/screening/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 sourcing/candidate-pipeline (knowledge/CANDIDATE-PIPELINE.md), requisition/job-spec (knowledge/JOB-SPEC.md)");addFile(P+"/stages/screening/units/unit-01-resume-screening.md");addFile(P+"/stages/screening/units/unit-02-scoring.md");addCard("screening","resume-screening","in-progress");addCard("screening","scoring","")}]},
  {delay:500,actions:[function(){addFastForward("45")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: assessor. 27 candidates scored against must-have criteria:\n  Pass: 14 candidates\n  Fail: 13 candidates (8 insufficient Go experience, 3 no distributed systems, 2 timezone mismatch)\nDisqualification reasons traced to specific job spec requirements.");updateCard("screening","resume-screening","completed");updateCard("screening","scoring","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("20")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","Top 8 ranked by composite fit score. Scoring methodology consistent across all candidates. Top 3:\n  1. Sarah Chen \u2014 92/100 (Go at scale, Kubernetes, 7yr)\n  2. Marcus Rivera \u2014 88/100 (distributed systems lead, 6yr)\n  3. Priya Patel \u2014 85/100 (gRPC expert, event-driven, 5yr)");addFile(P+"/knowledge/SCREENING-REPORT.md");updateCard("screening","scoring","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Screening complete. Review gate: auto. All candidates scored consistently \u2014 advancing.")}]},

  // === INTERVIEW (hats: interviewer, evaluator | review: ask) ===
  {delay:1000,actions:[function(){activateStage("interview");addMsg("agent","agent","Entering interview stage. Hat: interviewer.\nLoading screening results...");addFile(P+"/stages/interview/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 screening/screening-report (knowledge/SCREENING-REPORT.md), requisition/job-spec (knowledge/JOB-SPEC.md)");addFile(P+"/stages/interview/units/unit-01-structured-interviews.md");addFile(P+"/stages/interview/units/unit-02-evaluation.md");addCard("interview","structured-interviews","in-progress");addCard("interview","evaluation","")}]},
  {delay:1200,actions:[function(){addMsg("agent","agent","I\u2019ve prepared structured interview rubrics across 4 competency dimensions:\n  1. Technical depth (system design, Go proficiency)\n  2. Collaboration (cross-team work, code review approach)\n  3. Problem solving (ambiguity handling, debugging)\n  4. Domain fit (distributed systems, scalability thinking)\n\nWant to adjust the dimensions or weights?")}]},
  {delay:2200,actions:[function(){addMsg("user","you","Add a 5th dimension: ownership mentality. We need someone who drives initiatives, not just executes tickets.")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1000,actions:[function(){removeTyping();addMsg("agent","agent","Added ownership mentality as dimension 5 with behavioral anchors. Interview guides updated for all 8 candidates.")}]},
  {delay:500,actions:[function(){addFastForward("50")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: evaluator. Interview scorecards complete for top 8. Synthesized debrief:\n  Strong hire: Sarah Chen (95 avg \u2014 exceptional system design, strong ownership examples)\n  Hire: Marcus Rivera (87 avg \u2014 solid technical, weaker on ownership dimension)\n  Hire: Priya Patel (84 avg \u2014 deep gRPC expertise, growing into leadership)\n  No hire: 5 candidates below threshold");addFile(P+"/knowledge/INTERVIEW-SCORECARD.md");updateCard("interview","structured-interviews","completed");updateCard("interview","evaluation","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("15")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","Each recommendation backed by specific behavioral evidence from interviews. Comparative ranking documented.");updateCard("interview","evaluation","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Interview stage complete. Review gate: ask.")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Agreed on Sarah as #1. Let\u2019s move to offer.");addMsg("agent","agent","Advancing to offer stage with Sarah Chen as primary candidate.")}]},

  // === OFFER (hats: compensator, closer | review: external) ===
  {delay:1000,actions:[function(){activateStage("offer");addMsg("agent","agent","Entering offer stage. Hat: compensator.\nLoading interview results...");addFile(P+"/stages/offer/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 interview/interview-scorecard (knowledge/INTERVIEW-SCORECARD.md), requisition/job-spec (knowledge/JOB-SPEC.md)");addFile(P+"/stages/offer/units/unit-01-compensation-analysis.md");addFile(P+"/stages/offer/units/unit-02-offer-package.md");addCard("offer","comp-analysis","in-progress");addCard("offer","offer-package","")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Compensation analysis for Sarah Chen:\n  Current comp (estimated): $195K base + RSUs\n  Market benchmark: $205K median for L5 in her metro\n  Internal equity: aligns with existing L5 band\n  Recommendation: $210K base + 0.05% equity + $15K signing\n\nPositioned at 75th percentile to reflect strong hire signal. Want to adjust?");updateCard("offer","comp-analysis","completed");updateCard("offer","offer-package","in-progress")}]},
  {delay:2000,actions:[function(){addMsg("user","you","Bump equity to 0.08%. She\u2019s a strong hire and equity is our differentiator.")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1000,actions:[function(){removeTyping();addMsg("agent","agent","Hat: closer. Updated to 0.08% equity. Offer letter drafted with all material terms. Fallback plan: Marcus Rivera as backup with adjusted comp at $195K base.");addFile(P+"/stages/offer/artifacts/offer-letter-sarah-chen.md");updateCard("offer","offer-package","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Offer stage complete. Review gate: external.");addMsg("agent","agent","Sharing offer package for VP Engineering approval...")}]},
  {delay:1000,actions:[function(){showCriteriaReview("Offer","hire-senior-backend-engineer",["Compensation benchmarked against market and internal equity","Offer letter includes all material terms","Equity positioning reflects strong-hire signal","Fallback candidate identified with adjusted package","All approval workflows complete"],"external")}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:2400,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("system","system","External approval received. Offer ready to extend.")}]},

  // === COMPLETE ===
  {delay:1200,actions:[function(){completeAllStages();addMsg("agent","agent","All 5 stages complete for hire-senior-backend-engineer.\n\nDelivered:\n  \u2022 Job spec with must-have/nice-to-have qualifications and comp benchmarks\n  \u2022 27-candidate pipeline from 4 sourcing channels with personalized outreach\n  \u2022 Structured screening with composite scoring \u2014 14 candidates passed\n  \u2022 5-dimension interview rubric with behavioral evidence for all 8 finalists\n  \u2022 Offer package for Sarah Chen: $210K + 0.08% equity + $15K signing\n\nIntent status: complete.")}]},
  {delay:1500,actions:[function(){overlay.classList.add("visible")}]}
]
};
