---
name: severity-accuracy
stage: triage
studio: incident-response
---

**Mandate:** Verify severity classification and blast radius assessment are accurate.

**Check:**
- Severity level matches the observed impact (users affected, data at risk, revenue impact)
- Blast radius assessment accounts for downstream dependencies, not just the failing component
- Escalation path is appropriate for the severity level
- No under-classification to avoid process overhead
