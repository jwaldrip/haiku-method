var P = ".haiku/intents/close-acme-enterprise-deal";
window.HAIKU_DEMO_CONFIG = {
  title: "sales",
  studio: "sales",
  stages: ["research","qualification","proposal","negotiation","close"],
  completionText: "All 5 stages passed. close-acme-enterprise-deal delivered.",
  steps: [
  // User invokes
  {delay:800,actions:[function(){addMsg("user","you","/haiku:new")}]},
  {delay:1200,actions:[function(){addTyping()}]},
  {delay:1000,actions:[function(){removeTyping();addMsg("agent","agent","What do you want to accomplish?")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Close the enterprise deal with Acme Corp")}]},

  // Intent created
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1200,actions:[function(){removeTyping();addMsg("agent","agent","Creating intent: close-acme-enterprise-deal...");addFile(P+"/intent.md")}]},
  {delay:800,actions:[function(){addMsg("system","system","Intent created. Studio: sales. 5 stages: research \u2192 qualification \u2192 proposal \u2192 negotiation \u2192 close")}]},

  // === RESEARCH ===
  {delay:1000,actions:[function(){activateStage("research");addMsg("agent","agent","Entering research stage. Hat: prospect-researcher.\nWhat do you know about Acme Corp so far?");addFile(P+"/stages/research/state.json")}]},
  {delay:2000,actions:[function(){addMsg("user","you","They're a 2000-person manufacturing company. VP of Engineering reached out after seeing our booth at SaaStr. They're replacing a legacy ERP system.")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1200,actions:[function(){removeTyping();addMsg("agent","agent","Great starting point. I\u2019ll build the full prospect brief. Decomposing research work...")}]},
  {delay:800,actions:[function(){addMsg("agent","agent","3 units: company-profile, stakeholder-map, competitive-landscape");addFile(P+"/stages/research/units/unit-01-company-profile.md");addFile(P+"/stages/research/units/unit-02-stakeholder-map.md");addFile(P+"/stages/research/units/unit-03-competitive-landscape.md");addCard("research","company-profile","in-progress");addCard("research","stakeholder-map","");addCard("research","competitive-landscape","")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Company profile complete. Acme Corp: $450M revenue, 2000 employees, 12 manufacturing plants. Their legacy ERP is SAP R/3 \u2014 end of mainstream support. Key pain: manual inventory reconciliation costing them 40 hours/week per plant.");updateCard("research","company-profile","completed");updateCard("research","stakeholder-map","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("25")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: industry-analyst. Stakeholder map: VP Engineering (champion), CFO (economic buyer), IT Director (technical evaluator), Plant Managers (end users). CFO is the final sign-off.");updateCard("research","stakeholder-map","completed");updateCard("research","competitive-landscape","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("20")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Competitive landscape mapped. Acme evaluated Oracle Cloud ERP and Infor CloudSuite. Oracle was too expensive, Infor lacked manufacturing-specific workflows. We have a clear gap to fill on shop-floor integration.");updateCard("research","competitive-landscape","completed");addFile(P+"/knowledge/PROSPECT-BRIEF.md")}]},

  // Research gate - auto
  {delay:1000,actions:[function(){addMsg("system","system","Research complete. Review gate: auto. All criteria met \u2014 advancing.");addMsg("agent","agent","Advancing to qualification stage.")}]},

  // === QUALIFICATION ===
  {delay:1000,actions:[function(){activateStage("qualification");addMsg("agent","agent","Entering qualification stage. Hat: qualifier.\nLoading research outputs...");addFile(P+"/stages/qualification/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 research/prospect-brief (knowledge/PROSPECT-BRIEF.md)");addMsg("agent","agent","Prospect brief shows a strong fit. Let me run the BANT qualification...")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/qualification/units/unit-01-bant-scoring.md");addFile(P+"/stages/qualification/units/unit-02-icp-fit.md");addCard("qualification","bant-scoring","in-progress");addCard("qualification","icp-fit","");addMsg("agent","agent","2 units: bant-scoring and icp-fit.")}]},
  {delay:500,actions:[function(){addFastForward("25")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","BANT scoring:\n  Budget: $2M allocated for ERP replacement (confirmed)\n  Authority: CFO final sign-off, VP Engineering is champion\n  Need: Legacy SAP R/3 end-of-life, 40hrs/week manual reconciliation\n  Timeline: Want to go live before Q4 plant shutdowns")}]},
  {delay:1200,actions:[function(){addMsg("agent","agent","One concern \u2014 the IT Director may push for Oracle since they have existing Oracle DB licenses. How do you want to handle that?");updateCard("qualification","bant-scoring","completed");updateCard("qualification","icp-fit","in-progress")}]},
  {delay:2200,actions:[function(){addMsg("user","you","Get ahead of it. Build a TCO comparison showing our integration costs are 60% lower than Oracle\u2019s. The IT Director cares about total cost, not just license fees.")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1000,actions:[function(){removeTyping();addMsg("agent","agent","Smart. Hat: deal-strategist. I\u2019ll include the TCO comparison in the deal brief. ICP fit score: 87/100 \u2014 strong match on manufacturing vertical, company size, and tech stack.");updateCard("qualification","icp-fit","completed");addFile(P+"/knowledge/DEAL-BRIEF.md")}]},

  // Qualification gate - ask
  {delay:1000,actions:[function(){addMsg("system","system","Qualification complete. Review gate: ask.")}]},
  {delay:800,actions:[function(){showCriteriaReview("Qualification",INTENT,["BANT criteria scored with evidence","ICP fit: 87/100 with justification","Buying committee mapped with roles","Win plan: champion VP Eng, blocker IT Dir addressed","TCO comparison prepared for Oracle objection"],"ask gate")}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:2200,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("user","you","Approved. Move to proposal.");addMsg("agent","agent","Advancing to proposal stage.")}]},

  // === PROPOSAL ===
  {delay:1000,actions:[function(){activateStage("proposal");addMsg("agent","agent","Entering proposal stage. Hat: proposal-writer.\nLoading deal brief...");addFile(P+"/stages/proposal/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 qualification/deal-brief (knowledge/DEAL-BRIEF.md)");addMsg("agent","agent","Deal brief loaded. Building proposal tailored to Acme\u2019s pain points...")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/proposal/units/unit-01-solution-proposal.md");addFile(P+"/stages/proposal/units/unit-02-business-case.md");addFile(P+"/stages/proposal/units/unit-03-demo-script.md");addCard("proposal","solution-proposal","in-progress");addCard("proposal","business-case","");addCard("proposal","demo-script","")}]},
  {delay:500,actions:[function(){addFastForward("40")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Solution proposal draft ready. Maps each Acme pain point to our capabilities:\n  \u2022 Manual reconciliation \u2192 automated inventory sync\n  \u2022 SAP end-of-life \u2192 modern cloud-native platform\n  \u2022 Multi-plant visibility \u2192 real-time dashboard\n\nWhat pricing tier should I use?");updateCard("proposal","solution-proposal","completed");updateCard("proposal","business-case","in-progress")}]},
  {delay:2200,actions:[function(){addMsg("user","you","Enterprise tier. But offer a 15% multi-year discount if they commit to 3 years. The CFO loves long-term savings.")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1200,actions:[function(){removeTyping();addMsg("agent","agent","Hat: solution-architect. Business case built with 3-year TCO showing 62% cost reduction vs Oracle, 280% ROI over contract term. The multi-year discount is positioned as \u201Cpartnership pricing.\u201D");updateCard("proposal","business-case","completed");updateCard("proposal","demo-script","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Demo script targets the VP Engineering and Plant Managers. Focuses on shop-floor integration and real-time inventory \u2014 the exact workflows their legacy system can\u2019t handle.");updateCard("proposal","demo-script","completed");addFile(P+"/knowledge/PROPOSAL-DOC.md")}]},

  // Proposal gate - ask + await
  {delay:1000,actions:[function(){addMsg("system","system","Proposal stage complete. Review gate: ask + await.");addMsg("agent","agent","Proposal ready for your review, then we\u2019ll send to Acme.")}]},
  {delay:800,actions:[function(){showCriteriaReview("Proposal",INTENT,["Pain points mapped to solution capabilities","Business case with 280% ROI and TCO comparison","Demo script tailored to VP Eng and Plant Managers","Multi-year discount positioned as partnership pricing"],"ask gate")}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:2000,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("user","you","Approved. Send it.")}]},
  {delay:800,actions:[function(){addMsg("system","system","Await gate: waiting for Acme Corp response on proposal...")}]},
  {delay:1500,actions:[function(){addMsg("system","system","Await resolved \u2014 Acme Corp responded. VP Engineering wants to proceed. CFO has questions on implementation timeline.")}]},
  {delay:800,actions:[function(){addMsg("agent","agent","Great signal. Advancing to negotiation stage.")}]},

  // === NEGOTIATION ===
  {delay:1000,actions:[function(){activateStage("negotiation");addMsg("agent","agent","Entering negotiation stage. Hat: negotiator.\nLoading proposal details...");addFile(P+"/stages/negotiation/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 proposal/proposal-doc (knowledge/PROPOSAL-DOC.md)");addMsg("agent","agent","CFO\u2019s implementation timeline concern is common. Preparing objection handling...")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/negotiation/units/unit-01-objection-handling.md");addFile(P+"/stages/negotiation/units/unit-02-contract-terms.md");addCard("negotiation","objection-handling","in-progress");addCard("negotiation","contract-terms","")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Objection brief ready:\n  \u2022 Implementation timeline \u2192 phased rollout: 2 pilot plants first, then remaining 10\n  \u2022 Data migration risk \u2192 parallel-run period with SAP for 30 days\n  \u2022 Training burden \u2192 on-site enablement team included in enterprise tier");updateCard("negotiation","objection-handling","completed");updateCard("negotiation","contract-terms","in-progress")}]},
  {delay:1200,actions:[function(){addMsg("agent","agent","Hat: legal-reviewer. The Acme legal team sent back contract redlines. They want to cap liability at 1x annual contract value and add a 90-day termination clause. How do you want to handle these?")}]},
  {delay:2200,actions:[function(){addMsg("user","you","Liability cap is fine \u2014 that\u2019s standard. Push back on the 90-day termination. Offer 180 days with a mutual clause instead.")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1000,actions:[function(){removeTyping();addMsg("agent","agent","Counter-proposal sent. Liability cap accepted. Termination changed to 180-day mutual.");updateCard("negotiation","contract-terms","completed");addFile(P+"/knowledge/TERMS.md")}]},

  // Negotiation gate - ask + await
  {delay:800,actions:[function(){addMsg("system","system","Negotiation stage complete. Review gate: ask + await.")}]},
  {delay:800,actions:[function(){showCriteriaReview("Negotiation",INTENT,["All objections addressed with evidence","Contract redlines categorized by risk","Liability cap: 1x ACV (accepted)","Termination: 180-day mutual (countered)","Stakeholder alignment confirmed"],"ask gate")}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:2000,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("user","you","Approved.")}]},
  {delay:800,actions:[function(){addMsg("system","system","Await gate: waiting for Acme Corp legal response on counter-terms...")}]},
  {delay:1500,actions:[function(){addMsg("system","system","Await resolved \u2014 Acme legal accepted 180-day mutual termination. Deal terms finalized.")}]},
  {delay:800,actions:[function(){addMsg("agent","agent","All terms agreed. Advancing to close stage.")}]},

  // === CLOSE ===
  {delay:1000,actions:[function(){activateStage("close");addMsg("agent","agent","Entering close stage. Hat: closer.\nLoading negotiation terms...");addFile(P+"/stages/close/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 negotiation/terms (knowledge/TERMS.md)");addMsg("agent","agent","All terms are locked. Preparing close checklist and handoff package...")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/close/units/unit-01-close-checklist.md");addFile(P+"/stages/close/units/unit-02-handoff-package.md");addCard("close","close-checklist","in-progress");addCard("close","handoff-package","")}]},
  {delay:500,actions:[function(){addFastForward("25")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Close checklist:\n  \u2713 Contract signed by CFO\n  \u2713 PO issued: PO-2024-8847\n  \u2713 Payment terms: Net 30\n  \u2713 3-year enterprise tier confirmed\n  \u2713 15% partnership discount applied");updateCard("close","close-checklist","completed");updateCard("close","handoff-package","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: handoff-coordinator. Handoff package built for Customer Success:\n  \u2022 Full prospect history and relationship context\n  \u2022 Key contacts: VP Eng (champion), CFO (sponsor), IT Dir (technical)\n  \u2022 Agreed deliverables: phased rollout, pilot in 2 plants\n  \u2022 Implementation expectations and timeline commitments\n  \u2022 Win/loss analysis: won on TCO advantage and shop-floor integration");updateCard("close","handoff-package","completed");addFile(P+"/knowledge/HANDOFF-PACKAGE.md")}]},

  // Close gate - external + await
  {delay:1000,actions:[function(){addMsg("system","system","Close stage complete. Review gate: external + await.")}]},
  {delay:800,actions:[function(){showCriteriaReview("Close",INTENT,["Contract signed with document references","PO and payment terms captured","Handoff package includes full prospect context","Win/loss analysis with 3 critical success factors","Customer Success team briefed"],"external gate")}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:2400,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("system","system","External review approved. Deal closed.")}]},

  // Complete
  {delay:1200,actions:[function(){completeAllStages();addMsg("agent","agent","All 5 stages complete for close-acme-enterprise-deal.\n\nDelivered:\n  \u2022 Prospect brief with company profile, stakeholder map, and competitive landscape\n  \u2022 BANT qualification (87/100 ICP fit) with TCO comparison vs Oracle\n  \u2022 Enterprise proposal with 280% ROI business case and tailored demo\n  \u2022 Negotiation resolved: 1x ACV liability cap, 180-day mutual termination\n  \u2022 Handoff package ready for Customer Success team\n\nDeal value: $2M / 3 years. Intent status: complete.")}]},
  {delay:1500,actions:[function(){overlay.classList.add("visible")}]}
]
};
