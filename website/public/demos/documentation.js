window.HAIKU_DEMO_CONFIG = {
  title: "documentation",
  studio: "documentation",
  stages: ["audit","outline","draft","review","publish"],
  completionText: "All 5 stages passed. rewrite-api-reference-docs delivered.",
  steps: [
  // === User invokes ===
  {delay:800,actions:[function(){addMsg("user","you","/haiku:new")}]},
  {delay:1200,actions:[function(){addMsg("agent","agent","What do you want to accomplish?")}]},
  {delay:1500,actions:[function(){addMsg("user","you","Rewrite the API reference docs")}]},
  {delay:1200,actions:[function(){addMsg("agent","agent","Creating intent: rewrite-api-reference-docs...");addFile(".haiku/intents/rewrite-api-reference-docs/intent.md")}]},
  {delay:800,actions:[function(){addMsg("system","system","Intent created. Studio: documentation. 5 stages: audit \u2192 outline \u2192 draft \u2192 review \u2192 publish")}]},

  // === AUDIT ===
  {delay:1000,actions:[function(){activateStage("audit");addMsg("agent","agent","Entering audit stage. Hat: auditor.\nWhere are your current API docs? What\u2019s the source of truth \u2014 OpenAPI spec, code annotations?");addFile(".haiku/intents/rewrite-api-reference-docs/stages/audit/state.json")}]},
  {delay:2000,actions:[function(){addMsg("user","you","Docs in /docs/api/. Source of truth is openapi.yaml. But months out of date.")}]},
  {delay:1000,actions:[function(){addMsg("agent","agent","I\u2019ll diff the spec against existing docs.");addFile(".haiku/intents/rewrite-api-reference-docs/stages/audit/units/unit-01-inventory.md");addFile(".haiku/intents/rewrite-api-reference-docs/stages/audit/units/unit-02-gap-analysis.md");addCard("audit","inventory","in-progress");addCard("audit","gap-analysis","")}]},
  {delay:500,actions:[function(){addFastForward("40")}]},
  {delay:2000,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: gap-analyst. 47 endpoints in spec, docs cover 31.\n  \u2022 16 undocumented (mostly v2)\n  \u2022 8 outdated schemas\n  \u2022 12 missing error codes\n  \u2022 0 working code examples\nPriority: auth endpoints (most tickets), billing (revenue), then CRUD.");updateCard("audit","inventory","completed");updateCard("audit","gap-analysis","completed");addFile(".haiku/intents/rewrite-api-reference-docs/knowledge/AUDIT-REPORT.md")}]},
  {delay:800,actions:[function(){addMsg("system","system","Audit complete. Review gate: auto. All criteria met \u2014 advancing.")}]},

  // === OUTLINE ===
  {delay:1000,actions:[function(){activateStage("outline");addMsg("agent","agent","Entering outline stage. Hat: architect.");addFile(".haiku/intents/rewrite-api-reference-docs/stages/outline/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 audit/audit-report (knowledge/AUDIT-REPORT.md)");addCard("outline","ia-design","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Proposed IA:\n  1. Getting Started (auth, keys, rate limits)\n  2. Users & Teams (CRUD, roles)\n  3. Billing (plans, invoices)\n  4. Webhooks (setup, verification)\n  5. Error Reference\n\nTask-oriented, not endpoint-oriented. Thoughts?")}]},
  {delay:2000,actions:[function(){addMsg("user","you","Move Webhooks before Billing \u2014 teams set up webhooks first in onboarding.")}]},
  {delay:1000,actions:[function(){addMsg("agent","agent","Done. Webhooks now section 3. Outline reviewer validated: no orphaned sections, progressive disclosure.");updateCard("outline","ia-design","completed");addFile(".haiku/intents/rewrite-api-reference-docs/knowledge/DOCUMENT-OUTLINE.md")}]},
  {delay:1000,actions:[function(){addMsg("system","system","Outline complete. Review gate: ask.");showCriteriaReview("Outline","rewrite-api-reference-docs",["Clear hierarchy with max 3 levels of nesting","Each section has a purpose statement","Task-oriented architecture follows onboarding flow"])}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:1800,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("user","you","Approved.")}]},

  // === DRAFT ===
  {delay:1000,actions:[function(){activateStage("draft");addMsg("agent","agent","Entering draft stage. Hat: writer.");addFile(".haiku/intents/rewrite-api-reference-docs/stages/draft/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 outline/document-outline (knowledge/DOCUMENT-OUTLINE.md)");addCard("draft","getting-started","in-progress");addCard("draft","users-teams","");addCard("draft","webhooks","");addCard("draft","billing","");addCard("draft","error-reference","")}]},
  {delay:500,actions:[function(){addFastForward("45")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Getting Started drafted. Code examples in cURL, Python, Node.js.");updateCard("draft","getting-started","completed");updateCard("draft","users-teams","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("40")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: technical-reviewer. Found discrepancy \u2014 OpenAPI says invite returns 201, actual API returns 200. Which is correct?")}]},
  {delay:2000,actions:[function(){addMsg("user","you","API returns 200. Known bug, not fixing. Document actual behavior.");updateCard("draft","users-teams","completed");updateCard("draft","webhooks","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("60")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","All 5 sections drafted. 47 endpoints with code examples, error codes, troubleshooting. Technical reviewer verified against running API.");updateCard("draft","webhooks","completed");updateCard("draft","billing","completed");updateCard("draft","error-reference","completed");addFile(".haiku/intents/rewrite-api-reference-docs/knowledge/DRAFT-DOCUMENTATION.md");addFile("docs/api/getting-started.md");addFile("docs/api/users-teams.md");addFile("docs/api/webhooks.md");addFile("docs/api/billing.md");addFile("docs/api/error-reference.md")}]},
  {delay:1000,actions:[function(){addMsg("system","system","Draft complete. Review gate: ask.");showCriteriaReview("Draft","rewrite-api-reference-docs",["Every code example is syntactically valid and tested","All 47 endpoints documented with error codes","Technical reviewer verified against running API"])}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:1800,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("user","you","Approved. The code examples are excellent.")}]},

  // === REVIEW ===
  {delay:1000,actions:[function(){activateStage("review");addMsg("agent","agent","Entering review stage. Hat: editor.");addFile(".haiku/intents/rewrite-api-reference-docs/stages/review/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 draft/draft-documentation (knowledge/DRAFT-DOCUMENTATION.md)");addCard("review","editorial","in-progress");addCard("review","consistency","")}]},
  {delay:500,actions:[function(){addFastForward("35")}]},
  {delay:1800,actions:[function(){removeFastForward();addMsg("agent","agent","Hat: subject-matter-expert. Found 4 issues:\n  1. Major: Webhook examples use SHA-1 but API uses SHA-256\n  2. Minor: Inconsistent \"API key\" vs \"api key\" capitalization\n  3. Minor: Billing section uses passive voice\n  4. Info: Getting Started should link to SDK libraries\n\nConsistency check passed. All links resolve.");updateCard("review","editorial","completed");updateCard("review","consistency","completed");addFile(".haiku/intents/rewrite-api-reference-docs/knowledge/REVIEW-REPORT.md")}]},
  {delay:1000,actions:[function(){addMsg("system","system","Review complete. Review gate: ask.");showCriteriaReview("Review","rewrite-api-reference-docs",["Technical claims verified against source code","Terminology consistent with project glossary","SHA-256 verified for webhook examples"])}]},
  {delay:800,actions:[function(){animateCheckmarks()}]},
  {delay:1800,actions:[function(){highlightApproveBtn()}]},
  {delay:1200,actions:[function(){hideReviewOverlay();addMsg("user","you","Approved. The SHA-1 catch was critical.")}]},

  // === PUBLISH ===
  {delay:1000,actions:[function(){activateStage("publish");addMsg("agent","agent","Entering publish stage. Hat: publisher.");addFile(".haiku/intents/rewrite-api-reference-docs/stages/publish/state.json")}]},
  {delay:800,actions:[function(){addMsg("system","system","Resolved inputs \u2192 draft/draft-documentation, review/review-report");addCard("publish","finalize","in-progress")}]},
  {delay:500,actions:[function(){addFastForward("30")}]},
  {delay:1500,actions:[function(){removeFastForward();addMsg("agent","agent","All findings addressed: SHA-256 corrected, capitalization standardized, active voice, SDK links added. Links validated. Accuracy review agent passed. Tagging as v2.0.0.");updateCard("publish","finalize","completed");addFile("docs/api/CHANGELOG.md")}]},
  {delay:800,actions:[function(){addMsg("system","system","Publish complete. Review gate: auto. All criteria met \u2014 advancing.")}]},

  // === Complete ===
  {delay:1200,actions:[function(){completeAllStages();addMsg("agent","agent","All 5 stages complete for rewrite-api-reference-docs.\n\nDelivered:\n  \u2022 Audit: 16 undocumented, 8 outdated, 12 missing error codes\n  \u2022 Task-oriented IA (5 sections, reordered per onboarding flow)\n  \u2022 47 endpoints documented with code examples in 3 languages\n  \u2022 Editorial review with SHA-256 correction and consistency fixes\n  \u2022 Published as v2.0.0 with validated links and metadata\n\nIntent status: complete.")}]},
  {delay:1500,actions:[function(){overlay.classList.add("visible")}]}
]
};
