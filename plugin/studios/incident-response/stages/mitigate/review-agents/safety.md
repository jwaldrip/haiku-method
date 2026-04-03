---
name: safety
stage: mitigate
studio: incident-response
---

**Mandate:** Verify the mitigation stops the bleeding without introducing new risks.

**Check:**
- Mitigation addresses the immediate impact, not a side effect
- Rollback or feature flag changes do not break other functionality
- The mitigation is verified working in production, not just deployed
- No data loss or corruption results from the mitigation action
