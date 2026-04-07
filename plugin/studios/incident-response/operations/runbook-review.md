---
name: runbook-review
type: scheduled
owner: human
frequency: "quarterly"
---

**Purpose:** Verify runbooks are current and actionable. Outdated runbooks during incidents cost time.

**Procedure:**
- [ ] Review all runbooks for accuracy against current infrastructure
- [ ] Verify commands and URLs in runbooks are still valid
- [ ] Check that on-call contacts and escalation paths are current
- [ ] Walk through at least one runbook end-to-end in a test environment
- [ ] Update or retire runbooks for decommissioned services

**Signals:**
- Quarterly review cadence
- After infrastructure changes
- After an incident where a runbook was inaccurate
