var P = ".haiku/intents/saas-enterprise-license-agreement";
window.HAIKU_DEMO_CONFIG = {
  title: "legal",
  studio: "legal",
  stages: ["intake","research","draft","review","execute"],
  completionText: "All 5 stages passed. saas-enterprise-license-agreement delivered.",
  steps: [
  {delay:800,actions:[function(){addMsg("user","you","/haiku:new")}]},
  {delay:1200,actions:[function(){addTyping()}]},
  {delay:1000,actions:[function(){removeTyping();addMsg("agent","agent","What do you want to accomplish?")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Draft a SaaS enterprise license agreement for our platform")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1200,actions:[function(){removeTyping();addMsg("agent","agent","Creating intent: saas-enterprise-license-agreement...");addFile(P+"/intent.md")}]},
  {delay:800,actions:[function(){addMsg("system","system","Intent created. Studio: legal. 5 stages: intake \u2192 research \u2192 draft \u2192 review \u2192 execute")}]},

  // === INTAKE (hats: paralegal, risk-assessor | review: auto) ===
  {delay:1000,actions:[function(){activateStage("intake");addMsg("agent","agent","Entering intake stage. Hat: paralegal.\nWhat type of enterprise customer is this for? And which jurisdictions?");addFile(P+"/stages/intake/state.json")}]},
  {delay:2000,actions:[function(){addMsg("user","you","Fortune 500 financial services company. US-based but they operate in EU too. Need GDPR compliance baked in. Delaware governing law.")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1200,actions:[function(){removeTyping();addMsg("agent","agent","Got it. Multi-jurisdiction with financial services regulatory overlay. Let me map the requirements.");addFile(P+"/stages/intake/units/unit-01-requirements.md");addFile(P+"/stages/intake/units/unit-02-risk-assessment.md");addCard("intake","requirements","in-progress");addCard("intake","risk-assessment","")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: risk-assessor. Risk assessment complete. Key risks identified:\n  High: Data processing obligations under GDPR Art. 28\n  High: Financial services data residency requirements\n  Medium: Liability caps for regulated industry\n  Medium: SOC 2 / ISO 27001 compliance attestation requirements\n  Low: Force majeure scope");updateCard("intake","requirements","completed");updateCard("intake","risk-assessment","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("20")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Legal brief complete. Parties identified, governing law mapped (Delaware + GDPR overlay), all 5 risks categorized with mitigation strategies.");addFile(P+"/knowledge/LEGAL-BRIEF.md");updateCard("intake","risk-assessment","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Intake complete. Review gate: auto. All criteria met \u2014 advancing.")}]},

  // === RESEARCH (hats: researcher, analyst | review: auto) ===
  {delay:1000,actions:[function(){activateStage("research");addMsg("agent","agent","Entering research stage. Hat: researcher.\nLoading intake outputs...");addFile(P+"/stages/research/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 intake/legal-brief (knowledge/LEGAL-BRIEF.md)");addFile(P+"/stages/research/units/unit-01-precedent-research.md");addFile(P+"/stages/research/units/unit-02-regulatory-review.md");addCard("research","precedent-research","in-progress");addCard("research","regulatory-review","")}]},
  {delay:500,actions:[function(){addFastForward("45")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Precedent research found 4 relevant cases:\n  1. SaaS liability cap precedent (Delaware Chancery 2024)\n  2. GDPR processor obligations enforcement (EU CJEU 2025)\n  3. Financial data residency ruling (NYDFS guidance 2025)\n  4. Force majeure in cloud services (9th Circuit 2024)\nEach analyzed for applicability to our matter.");updateCard("research","precedent-research","completed");updateCard("research","regulatory-review","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: analyst. Regulatory landscape mapped:\n  \u2022 GDPR Articles 28, 32, 33 (processor obligations)\n  \u2022 NYDFS 23 NYCRR 500 (cybersecurity requirements)\n  \u2022 SOX implications for financial data handling\nAll requirements mapped to specific contract provisions needed.");addFile(P+"/knowledge/RESEARCH-MEMO.md");updateCard("research","regulatory-review","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Research complete. Review gate: auto. Sources verified \u2014 advancing.")}]},

  // === DRAFT (hats: drafter, editor | review: ask) ===
  {delay:1000,actions:[function(){activateStage("draft");addMsg("agent","agent","Entering draft stage. Hat: drafter.\nLoading upstream outputs...");addFile(P+"/stages/draft/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 research/research-memo (knowledge/RESEARCH-MEMO.md), intake/legal-brief (knowledge/LEGAL-BRIEF.md)");addFile(P+"/stages/draft/units/unit-01-contract-draft.md");addFile(P+"/stages/draft/units/unit-02-dpa-annex.md");addCard("draft","contract-draft","in-progress");addCard("draft","dpa-annex","")}]},
  {delay:500,actions:[function(){addFastForward("60")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Initial draft complete. Key terms for your review:\n  \u2022 Liability cap: 12 months of fees (standard for enterprise SaaS)\n  \u2022 SLA: 99.9% uptime with service credits\n  \u2022 Data processing: Full GDPR DPA as Annex B\n  \u2022 Indemnification: Mutual with carve-outs for IP and data breach\n  \u2022 Term: 3 years with auto-renewal\n\nAnything you want to adjust?")}]},
  {delay:2200,actions:[function(){addMsg("user","you","Liability cap should be 24 months for data breaches specifically. Keep 12 months for everything else. Also add a data residency clause \u2014 US and EU only, no third-country transfers without consent.")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1200,actions:[function(){removeTyping();addMsg("agent","agent","Updated. Tiered liability cap: 24 months for data breach, 12 months general. Data residency clause added with explicit third-country transfer prohibition. Each protective clause maps to an identified risk from intake.");updateCard("draft","contract-draft","completed");updateCard("draft","dpa-annex","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: editor. DPA annex complete with GDPR Article 28 standard clauses, sub-processor list, and data breach notification within 48 hours. All defined terms consistent throughout. Cross-references verified.");addFile(P+"/stages/draft/artifacts/enterprise-license-agreement-v1.md");addFile(P+"/stages/draft/artifacts/dpa-annex-b.md");updateCard("draft","dpa-annex","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Draft stage complete. Review gate: ask.")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Draft looks solid. Send it to compliance.");addMsg("agent","agent","Advancing to review stage.")}]},

  // === REVIEW (hats: reviewer, compliance-officer | review: external) ===
  {delay:1000,actions:[function(){activateStage("review");addMsg("agent","agent","Entering review stage. Hat: reviewer.\nLoading draft and research...");addFile(P+"/stages/review/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 draft/draft-document (stages/draft/artifacts/), research/research-memo (knowledge/RESEARCH-MEMO.md), intake/legal-brief (knowledge/LEGAL-BRIEF.md)");addFile(P+"/stages/review/units/unit-01-legal-review.md");addFile(P+"/stages/review/units/unit-02-compliance-check.md");addCard("review","legal-review","in-progress");addCard("review","compliance-check","")}]},
  {delay:500,actions:[function(){addFastForward("50")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: compliance-officer. Review findings:\n  Critical: None\n  Important: 2 items\n    1. Sub-processor notification period should be 30 days (currently 14)\n    2. Audit rights clause needs annual frequency cap\n  Advisory: 1 item\n    1. Consider adding AI-specific data processing terms\n\nCompliance check: GDPR mapped \u2713, NYDFS mapped \u2713, SOX provisions \u2713");updateCard("review","legal-review","completed");updateCard("review","compliance-check","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("20")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","Both important items remediated in draft. AI data processing addendum included as advisory enhancement. Residual risk: low across all categories.");addFile(P+"/knowledge/REVIEW-FINDINGS.md");updateCard("review","compliance-check","completed")}]},
  {delay:800,actions:[function(){addMsg("system","system","Review stage complete. Review gate: external.");addMsg("agent","agent","Sharing review findings for General Counsel approval...")}]},
  {delay:1000,actions:[function(){showCriteriaReview("Review","saas-enterprise-license-agreement",["All critical issues resolved (none found)","Important findings remediated in draft","GDPR compliance verified across all provisions","NYDFS cybersecurity requirements addressed","Residual risk documented and accepted"],"external")}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:2400,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("system","system","General Counsel approved. Advancing to execution.")}]},

  // === EXECUTE (hats: closer, administrator | review: await) ===
  {delay:1000,actions:[function(){activateStage("execute");addMsg("agent","agent","Entering execute stage. Hat: closer.\nLoading review findings and final draft...");addFile(P+"/stages/execute/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 review/review-findings (knowledge/REVIEW-FINDINGS.md), draft/draft-document (stages/draft/artifacts/)");addFile(P+"/stages/execute/units/unit-01-finalization.md");addFile(P+"/stages/execute/units/unit-02-signature-coordination.md");addCard("execute","finalization","in-progress");addCard("execute","signatures","")}]},
  {delay:500,actions:[function(){addFastForward("25")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Final document incorporates all review findings. Change log documents each modification from v1 to final. All conditions precedent satisfied.");updateCard("execute","finalization","completed");updateCard("execute","signatures","in-progress")}]},
  {delay:1000,actions:[function(){addMsg("agent","agent","Hat: administrator. Signature coordination:\n  1. Our CEO (internal) \u2014 DocuSign envelope prepared\n  2. Their General Counsel (counterparty) \u2014 awaiting signature\n\nThis is an await gate \u2014 pausing for external signatures.")}]},
  {delay:800,actions:[function(){addMsg("system","system","Execute stage: await gate active. Waiting for counterparty signature...")}]},
  {delay:2000,actions:[function(){addMsg("system","system","Signature received from counterparty. Both parties have executed.")}]},
  {delay:800,actions:[function(){addMsg("agent","agent","Document fully executed. Filed with complete audit trail including all draft versions and review comments.");addFile(P+"/stages/execute/artifacts/executed-agreement-final.pdf");addFile(P+"/stages/execute/artifacts/dpa-annex-b-executed.pdf");updateCard("execute","signatures","completed")}]},

  // === COMPLETE ===
  {delay:1200,actions:[function(){completeAllStages();addMsg("agent","agent","All 5 stages complete for saas-enterprise-license-agreement.\n\nDelivered:\n  \u2022 Legal brief with multi-jurisdiction risk assessment (GDPR + NYDFS + SOX)\n  \u2022 Research memo with 4 relevant precedents and regulatory mapping\n  \u2022 Enterprise license agreement with tiered liability caps and data residency clause\n  \u2022 GDPR DPA annex with sub-processor controls and 48hr breach notification\n  \u2022 Compliance review with all findings remediated\n  \u2022 Fully executed agreement with audit trail\n\nIntent status: complete.")}]},
  {delay:1500,actions:[function(){overlay.classList.add("visible")}]}
]
};
