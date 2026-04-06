window.HAIKU_DEMO_CONFIG = {
  title: "security-assessment",
  studio: "security-assessment",
  stages: ["reconnaissance","enumeration","exploitation","post-exploitation","reporting"],
  completionText: "All 5 stages passed. annual-pentest-web-app delivered.",
  steps: [
  // === User invokes ===
  {delay:800,actions:[function(){addMsg("user","you","/haiku:new")}]},
  {delay:1200,actions:[function(){addMsg("agent","agent","What do you want to accomplish?")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Annual penetration test for our web application")}]},
  {delay:1200,actions:[function(){addMsg("agent","agent","Creating intent: annual-pentest-web-app...");addFile(".haiku/intents/annual-pentest-web-app/intent.md")}]},
  {delay:800,actions:[function(){addMsg("system","system","Intent created. Studio: security-assessment. 5 stages: reconnaissance \u2192 enumeration \u2192 exploitation \u2192 post-exploitation \u2192 reporting")}]},

  // === RECONNAISSANCE ===
  {delay:1000,actions:[function(){activateStage("reconnaissance");addMsg("agent","agent","Entering reconnaissance stage. Hat: osint-analyst.\nWhat\u2019s the target scope? Domains, IP ranges, out-of-scope systems?");addFile(".haiku/intents/annual-pentest-web-app/stages/reconnaissance/state.json")}]},
  {delay:2000,actions:[function(){addMsg("user","you","Target: app.example.com and api.example.com. Out of scope: staging.example.com and third-party services.")}]},
  {delay:1000,actions:[function(){addMsg("agent","agent","Confirmed. Starting passive and active recon.");addCard("reconnaissance","passive-recon","in-progress");addCard("reconnaissance","active-recon","")}]},
  {delay:500,actions:[function(){addFastForward("45")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: network-mapper. Recon complete:\n  \u2022 6 subdomains (2 in scope), tech: React + Node.js + PostgreSQL + Redis\n  \u2022 Cloudflare WAF, TLS 1.2+, only 80/443 exposed\n  \u2022 47 API endpoints from OpenAPI spec at /docs\n  \u2022 /admin endpoint returns 403 \u2014 admin panel exists");updateCard("reconnaissance","passive-recon","completed");updateCard("reconnaissance","active-recon","completed");addFile(".haiku/intents/annual-pentest-web-app/knowledge/TARGET-PROFILE.md")}]},
  {delay:800,actions:[function(){addMsg("system","system","Reconnaissance complete. Review gate: auto. All criteria met \u2014 advancing.")}]},

  // === ENUMERATION ===
  {delay:1000,actions:[function(){activateStage("enumeration");addMsg("agent","agent","Entering enumeration stage. Hat: enumerator.");addFile(".haiku/intents/annual-pentest-web-app/stages/enumeration/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 reconnaissance/target-profile (knowledge/TARGET-PROFILE.md)");addCard("enumeration","service-enum","in-progress");addCard("enumeration","vuln-scan","");addCard("enumeration","attack-surface","")}]},
  {delay:500,actions:[function(){addFastForward("50")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: vulnerability-scanner. Services: Node.js 18.x, Express 4.18, React 18.2 (94% version coverage).\n\nVulnerabilities:\n  \u2022 HIGH: Reflected XSS in search parameter\n  \u2022 HIGH: JWT tokens have no exp claim\n  \u2022 MEDIUM: No rate limiting on /api/auth/login\n  \u2022 MEDIUM: CORS wildcard on one endpoint\n  \u2022 LOW: Server version header disclosed\n\nPriority targets: XSS, JWT, /admin behind 403.");updateCard("enumeration","service-enum","completed");updateCard("enumeration","vuln-scan","completed");updateCard("enumeration","attack-surface","completed");addFile(".haiku/intents/annual-pentest-web-app/knowledge/VULNERABILITY-CATALOG.md")}]},
  {delay:1000,actions:[function(){addMsg("system","system","Enumeration complete. Review gate: ask.");showCriteriaReview("Enumeration","annual-pentest-web-app",["Vulnerability catalog with CVE references and CVSS scores","Service versions identified for 90%+ of services","Attack surface categorized by risk level"])}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:1800,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("user","you","Approved. The JWT issue is concerning \u2014 proceed.")}]},

  // === EXPLOITATION ===
  {delay:1000,actions:[function(){activateStage("exploitation");addMsg("agent","agent","Entering exploitation stage. Hat: exploit-developer.\nAll exploitation follows responsible disclosure \u2014 no data destruction, no service disruption.");addFile(".haiku/intents/annual-pentest-web-app/stages/exploitation/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 enumeration/vulnerability-catalog (knowledge/VULNERABILITY-CATALOG.md)");addCard("exploitation","xss-exploit","in-progress");addCard("exploitation","jwt-exploit","");addCard("exploitation","auth-bypass","")}]},
  {delay:500,actions:[function(){addFastForward("40")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: attack-operator. XSS confirmed \u2014 double-encoding bypasses Cloudflare WAF. PoC: session cookie theft via crafted link.");updateCard("exploitation","xss-exploit","completed");updateCard("exploitation","jwt-exploit","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","JWT exploit confirmed. No exp claim, weak HMAC secret (\"secret123\") brute-forced. Can forge admin JWT.\n\nWith forged JWT, /admin returns 200. Should I document accessible capabilities? Read-only.")}]},
  {delay:2000,actions:[function(){addMsg("user","you","Yes, document what\u2019s accessible but do NOT modify any data.")}]},
  {delay:500,actions:[function(){addFastForward("20")}]},
  {delay:1200,actions:[function(){removeFastForward();addMsg("agent","agent","Admin panel: user management, billing config, feature flags, database export. All documented, nothing modified.");updateCard("exploitation","jwt-exploit","completed");updateCard("exploitation","auth-bypass","completed");addFile(".haiku/intents/annual-pentest-web-app/knowledge/ACCESS-LOG.md")}]},
  {delay:1000,actions:[function(){addMsg("system","system","Exploitation complete. Review gate: ask.");showCriteriaReview("Exploitation","annual-pentest-web-app",["Each exploit logged with timestamp, technique, outcome","PoC demonstrates impact without harm","Access chains documented with reproduction steps","All activity within authorized scope"])}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:1800,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("user","you","Approved. The JWT finding is critical.")}]},

  // === POST-EXPLOITATION ===
  {delay:1000,actions:[function(){activateStage("post-exploitation");addMsg("agent","agent","Entering post-exploitation stage. Hat: post-exploit-analyst.");addFile(".haiku/intents/annual-pentest-web-app/stages/post-exploitation/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 exploitation/access-log (knowledge/ACCESS-LOG.md)");addCard("post-exploitation","impact-assessment","in-progress");addCard("post-exploitation","lateral-movement","")}]},
  {delay:500,actions:[function(){addFastForward("40")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: impact-assessor.\n  \u2022 Blast radius: 12,000 user accounts, PII + billing + feature flags\n  \u2022 Lateral movement: admin panel\u2019s DB export could dump full PostgreSQL, Redis has all session tokens\n  \u2022 No network segmentation between app and data tiers\n\nAll analysis theoretical \u2014 no exfiltration performed.");updateCard("post-exploitation","impact-assessment","completed");updateCard("post-exploitation","lateral-movement","completed");addFile(".haiku/intents/annual-pentest-web-app/knowledge/IMPACT-ASSESSMENT.md")}]},
  {delay:1000,actions:[function(){addMsg("system","system","Post-exploitation complete. Review gate: ask.");showCriteriaReview("Post-Exploitation","annual-pentest-web-app",["Max access level and blast radius documented","Lateral movement paths mapped","Data exposure categorized by sensitivity","No actual exfiltration"])}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:1800,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("user","you","Approved. Let\u2019s get the report.")}]},

  // === REPORTING ===
  {delay:1000,actions:[function(){activateStage("reporting");addMsg("agent","agent","Entering reporting stage. Hat: report-writer.");addFile(".haiku/intents/annual-pentest-web-app/stages/reporting/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 post-exploitation/impact-assessment (knowledge/IMPACT-ASSESSMENT.md)");addCard("reporting","executive-summary","in-progress");addCard("reporting","technical-findings","");addCard("reporting","remediation-plan","")}]},
  {delay:500,actions:[function(){addFastForward("60")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: remediation-advisor. Report complete.\n  \u2022 Executive summary: risk posture HIGH (2 critical, 2 medium, 1 low)\n  \u2022 Technical findings with CVSS scores and reproduction steps\n  \u2022 Remediation priorities:\n    1. Immediate: Rotate JWT key, add expiration\n    2. Immediate: Fix XSS with output encoding\n    3. Short-term: Rate limiting, CORS fix, network segmentation");updateCard("reporting","executive-summary","completed");updateCard("reporting","technical-findings","completed");updateCard("reporting","remediation-plan","completed");addFile(".haiku/intents/annual-pentest-web-app/knowledge/PENTEST-REPORT.md");addFile(".haiku/intents/annual-pentest-web-app/knowledge/REMEDIATION-PLAN.md")}]},
  {delay:800,actions:[function(){addMsg("system","system","Reporting complete. Review gate: external.");addMsg("agent","agent","Sharing browse URL for external stakeholder review...")}]},
  {delay:1000,actions:[function(){showCriteriaReview("Reporting","annual-pentest-web-app",["Findings have CVSS scores and reproduction steps","Executive summary in business terms","Remediation prioritized by risk-reduction impact"],"external gate")}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:2000,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("system","system","External stakeholder review approved via browse page.")}]},

  // === Complete ===
  {delay:1200,actions:[function(){completeAllStages();addMsg("agent","agent","All 5 stages complete for annual-pentest-web-app.\n\nDelivered:\n  \u2022 Target profile with 6 subdomains and full tech stack\n  \u2022 Vulnerability catalog: 2 high, 2 medium, 1 low, 1 info\n  \u2022 3 exploit chains with PoC artifacts\n  \u2022 Impact assessment: 12K users, PII + financial at risk\n  \u2022 Remediation plan with immediate and short-term priorities\n  \u2022 Executive summary and full technical report\n\nIntent status: complete.")}]},
  {delay:1500,actions:[function(){overlay.classList.add("visible")}]}
]
};
