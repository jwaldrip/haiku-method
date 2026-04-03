---
name: correctness
stage: resolve
studio: incident-response
---

**Mandate:** Verify the permanent fix addresses the root cause with adequate testing.

**Check:**
- Fix addresses the root cause identified in the investigation, not just the symptom
- Test coverage includes the specific failure scenario that caused the incident
- Regression tests prevent this class of failure, not just this exact instance
- Fix does not reintroduce the conditions that led to the incident
