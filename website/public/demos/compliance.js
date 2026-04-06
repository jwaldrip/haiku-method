var P = ".haiku/intents/soc2-type-ii-certification";
window.HAIKU_DEMO_CONFIG = {
  title: "compliance",
  studio: "compliance",
  stages: ["scope","assess","remediate","document","certify"],
  completionText: "All 5 stages passed. soc2-type-ii-certification delivered.",
  steps: [
  // User invokes
  {delay:800,actions:[function(){addMsg("user","you","/haiku:new")}]},
  {delay:1000,actions:[function(){addTyping()}]},
  {delay:800,actions:[function(){removeTyping();addMsg("agent","agent","What do you want to accomplish?")}]},
  {delay:1500,actions:[function(){addMsg("user","you","SOC 2 Type II certification for our SaaS platform")}]},

  // Intent created
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1000,actions:[function(){removeTyping();addMsg("agent","agent","Creating intent: soc2-type-ii-certification...");addFile(P+"/intent.md")}]},
  {delay:800,actions:[function(){addMsg("system","system","Intent created. Studio: compliance. 5 stages: scope \u2192 assess \u2192 remediate \u2192 document \u2192 certify")}]},

  // === SCOPE ===
  {delay:1000,actions:[function(){activateStage("scope");addMsg("agent","agent","Entering scope stage. Hat: compliance-analyst.\nWhat\u2019s the target framework and which Trust Service Criteria are in scope?");addFile(P+"/stages/scope/state.json")}]},
  {delay:2000,actions:[function(){addMsg("user","you","SOC 2 Type II. All five TSC: security, availability, processing integrity, confidentiality, and privacy. Our platform handles healthcare data so we need the full set.")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1200,actions:[function(){removeTyping();addMsg("agent","agent","All five TSC \u2014 understood. Healthcare data means we\u2019ll pay extra attention to confidentiality and privacy controls. Decomposing scope work...")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/scope/units/unit-01-framework-mapping.md");addFile(P+"/stages/scope/units/unit-02-system-inventory.md");addFile(P+"/stages/scope/units/unit-03-scope-boundary.md");addCard("scope","framework-mapping","in-progress");addCard("scope","system-inventory","");addCard("scope","scope-boundary","")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: scope-definer. Framework mapping complete. 87 controls identified across 5 TSC categories:\n  \u2022 Security (CC): 33 controls\n  \u2022 Availability (A): 12 controls\n  \u2022 Processing Integrity (PI): 14 controls\n  \u2022 Confidentiality (C): 16 controls\n  \u2022 Privacy (P): 12 controls");updateCard("scope","framework-mapping","completed");updateCard("scope","system-inventory","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("25")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","System inventory: 14 in-scope services, 3 data stores (PostgreSQL, Redis, S3), 2 third-party integrations (Stripe, Twilio). Data classification: PHI in PostgreSQL and S3, PII in all three stores.");updateCard("scope","system-inventory","completed");updateCard("scope","scope-boundary","in-progress")}]},
  {delay:1200,actions:[function(){addMsg("agent","agent","I see your marketing website and blog are on separate infrastructure. Should those be in scope or excluded?")}]},
  {delay:2000,actions:[function(){addMsg("user","you","Exclude them. They don\u2019t touch customer data. Only the SaaS platform and its supporting infrastructure.")}]},
  {delay:800,actions:[function(){addMsg("agent","agent","Excluded with documented rationale. Scope boundary finalized.");updateCard("scope","scope-boundary","completed");addFile(P+"/knowledge/CONTROL-MAPPING.md")}]},

  // Scope gate - auto
  {delay:800,actions:[function(){addMsg("system","system","Scope complete. Review gate: auto. All criteria met \u2014 advancing.");addMsg("agent","agent","Advancing to assess stage.")}]},

  // === ASSESS ===
  {delay:1000,actions:[function(){activateStage("assess");addMsg("agent","agent","Entering assess stage. Hat: auditor.\nLoading control mapping...");addFile(P+"/stages/assess/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 scope/control-mapping (knowledge/CONTROL-MAPPING.md)");addMsg("agent","agent","Evaluating 87 controls against current implementation. This is the big one...")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/assess/units/unit-01-gap-analysis.md");addFile(P+"/stages/assess/units/unit-02-risk-assessment.md");addCard("assess","gap-analysis","in-progress");addCard("assess","risk-assessment","")}]},
  {delay:500,actions:[function(){addFastForward("60")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: risk-assessor. Gap analysis complete. Results:\n  \u2022 Met: 61 controls (70%)\n  \u2022 Partially met: 18 controls (21%)\n  \u2022 Unmet: 8 controls (9%)\n\nCritical gaps:\n  1. No formal access review process (CC6.1)\n  2. Encryption at rest not enabled on Redis cache (CC6.7)\n  3. No incident response plan documented (CC7.3)\n  4. Missing data retention policy for PHI (P6.1)")}]},
  {delay:1200,actions:[function(){addMsg("user","you","The Redis gap is a surprise. I thought we enabled encryption everywhere. What\u2019s cached there?")}]},
  {delay:800,actions:[function(){addTyping()}]},
  {delay:1000,actions:[function(){removeTyping();addMsg("agent","agent","Redis caches session tokens and some user profile data (names, emails). No PHI directly, but it\u2019s still PII. The cache was provisioned before your encryption-at-rest policy was adopted. Easy fix \u2014 enable TLS and encryption at rest on the ElastiCache cluster.");updateCard("assess","gap-analysis","completed");updateCard("assess","risk-assessment","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("20")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","Risk assessment scored all 26 gaps. 4 critical, 8 high, 14 medium. No low-risk items \u2014 everything unmet matters for certification.");updateCard("assess","risk-assessment","completed");addFile(P+"/knowledge/GAP-REPORT.md")}]},

  // Assess gate - ask
  {delay:800,actions:[function(){addMsg("system","system","Assess stage complete. Review gate: ask.")}]},
  {delay:800,actions:[function(){showCriteriaReview("Assess",INTENT,["87 controls evaluated with evidence","61 met, 18 partial, 8 unmet","4 critical gaps identified and risk-scored","Redis encryption gap flagged with PII exposure","Risk assessment uses consistent scoring methodology"],"ask gate")}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:2200,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("user","you","Approved. Let\u2019s fix these gaps.");addMsg("agent","agent","Advancing to remediate stage.")}]},

  // === REMEDIATE ===
  {delay:1000,actions:[function(){activateStage("remediate");addMsg("agent","agent","Entering remediate stage. Hat: remediation-engineer.\nLoading gap report...");addFile(P+"/stages/remediate/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 assess/gap-report (knowledge/GAP-REPORT.md)");addMsg("agent","agent","26 gaps to remediate. Starting with the 4 critical items...")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/remediate/units/unit-01-access-review.md");addFile(P+"/stages/remediate/units/unit-02-redis-encryption.md");addFile(P+"/stages/remediate/units/unit-03-incident-response-plan.md");addFile(P+"/stages/remediate/units/unit-04-data-retention-policy.md");addCard("remediate","access-review","in-progress");addCard("remediate","redis-encryption","");addCard("remediate","ir-plan","");addCard("remediate","retention-policy","")}]},
  {delay:500,actions:[function(){addFastForward("40")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Access review process implemented:\n  \u2022 Quarterly access reviews with automated report generation\n  \u2022 Role-based access matrix documented for all 14 services\n  \u2022 Automated deprovisioning on termination via SCIM integration");updateCard("remediate","access-review","completed");updateCard("remediate","redis-encryption","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("20")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","Redis encryption enabled \u2014 TLS in-transit and AES-256 at rest on ElastiCache. Verified no session disruption during migration.");updateCard("remediate","redis-encryption","completed");updateCard("remediate","ir-plan","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: policy-writer. Incident response plan drafted. Do you want the escalation path to go through PagerDuty or your internal ticketing system?")}]},
  {delay:2000,actions:[function(){addMsg("user","you","PagerDuty for SEV-1 and SEV-2. Internal ticketing for SEV-3 and below. Make sure on-call rotation is referenced.")}]},
  {delay:800,actions:[function(){addMsg("agent","agent","Updated. IR plan references PagerDuty for critical incidents with on-call rotation schedule linked.");updateCard("remediate","ir-plan","completed");updateCard("remediate","retention-policy","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("25")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","Data retention policy: PHI retained 7 years per HIPAA, PII retained per customer agreement with 30-day deletion on request. Automated purge jobs configured.");updateCard("remediate","retention-policy","completed");addFile(P+"/knowledge/REMEDIATION-LOG.md")}]},

  // Remediate gate - ask
  {delay:800,actions:[function(){addMsg("system","system","Remediate stage complete. Review gate: ask.")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Approved. All critical gaps addressed.");addMsg("agent","agent","Advancing to document stage.")}]},

  // === DOCUMENT ===
  {delay:1000,actions:[function(){activateStage("document");addMsg("agent","agent","Entering document stage. Hat: evidence-collector.\nLoading remediation log...");addFile(P+"/stages/document/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 remediate/remediation-log (knowledge/REMEDIATION-LOG.md)");addMsg("agent","agent","Building evidence packages for all 87 controls. Each needs at least one artifact with timestamps and provenance...")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/document/units/unit-01-evidence-collection.md");addFile(P+"/stages/document/units/unit-02-audit-trail.md");addFile(P+"/stages/document/units/unit-03-control-matrix.md");addCard("document","evidence-collection","in-progress");addCard("document","audit-trail","");addCard("document","control-matrix","")}]},
  {delay:500,actions:[function(){addFastForward("50")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Evidence collected for 87/87 controls. Artifacts include:\n  \u2022 Screenshots of access control configurations\n  \u2022 Terraform state files proving encryption settings\n  \u2022 Policy documents with approval signatures\n  \u2022 Log samples demonstrating monitoring and alerting\n  \u2022 Automated test results for CI/CD controls");updateCard("document","evidence-collection","completed");updateCard("document","audit-trail","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: documentation-writer. Audit trail links every control through the full chain: scope definition \u2192 assessment finding \u2192 remediation action \u2192 verification evidence.");updateCard("document","audit-trail","completed");updateCard("document","control-matrix","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("20")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","Control matrix organized for auditor navigation. Index page with cross-references to all evidence. Framework-compliant format.");updateCard("document","control-matrix","completed");addFile(P+"/knowledge/EVIDENCE-PACKAGE.md")}]},

  // Document gate - ask
  {delay:800,actions:[function(){addMsg("system","system","Document stage complete. Review gate: ask.")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Evidence looks comprehensive. Proceed to certify.");addMsg("agent","agent","Advancing to certify stage.")}]},

  // === CERTIFY ===
  {delay:1000,actions:[function(){activateStage("certify");addMsg("agent","agent","Entering certify stage. Hat: audit-liaison.\nLoading evidence package...");addFile(P+"/stages/certify/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 document/evidence-package (knowledge/EVIDENCE-PACKAGE.md)");addMsg("agent","agent","Preparing audit readiness package for the external auditor...")}]},
  {delay:800,actions:[function(){addFile(P+"/stages/certify/units/unit-01-audit-prep.md");addFile(P+"/stages/certify/units/unit-02-finding-resolution.md");addCard("certify","audit-prep","in-progress");addCard("certify","finding-resolution","")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Audit readiness checklist complete. All evidence is current, indexed, and mapped to the auditor\u2019s standard request list. Running review agents from assess and remediate stages for final thoroughness check...");updateCard("certify","audit-prep","completed");updateCard("certify","finding-resolution","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("20")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: finding-resolver. Pre-audit self-assessment found 2 minor items:\n  1. One access review screenshot is from staging, not production \u2014 replaced\n  2. Encryption evidence for S3 bucket was missing KMS key rotation proof \u2014 added\n\nBoth resolved. No critical findings.")}]},
  {delay:800,actions:[function(){addMsg("system","system","Await gate: waiting for external auditor to complete review...")}]},
  {delay:1500,actions:[function(){addMsg("system","system","Await resolved \u2014 external auditor completed review. 1 observation: recommend adding MFA to the CI/CD pipeline service account. Not a finding \u2014 observation only.");updateCard("certify","finding-resolution","completed");addFile(P+"/knowledge/AUDIT-RESULT.md")}]},

  // Certify gate - external + await
  {delay:800,actions:[function(){addMsg("system","system","Certify stage complete. Review gate: external + await.")}]},
  {delay:800,actions:[function(){showCriteriaReview("Certify",INTENT,["All evidence current and mapped to auditor request list","Pre-audit self-assessment: 2 minor items resolved","External auditor: clean report with 1 observation","No unaddressed critical findings","MFA observation noted for future improvement"],"external gate")}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:2400,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("system","system","External review approved. SOC 2 Type II certification achieved.")}]},

  // Complete
  {delay:1200,actions:[function(){completeAllStages();addMsg("agent","agent","All 5 stages complete for soc2-type-ii-certification.\n\nDelivered:\n  \u2022 Scope: 87 controls across 5 TSC, 14 services, 3 data stores\n  \u2022 Assessment: 61 met, 18 partial, 8 unmet \u2014 4 critical gaps identified\n  \u2022 Remediation: access reviews, Redis encryption, IR plan, retention policy\n  \u2022 Documentation: evidence package with full audit trail for 87 controls\n  \u2022 Certification: clean audit report with 1 observation (MFA for CI/CD)\n\nIntent status: complete.")}]},
  {delay:1500,actions:[function(){overlay.classList.add("visible")}]}
]
};
