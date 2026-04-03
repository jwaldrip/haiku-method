---
name: engineer
stage: resolve
studio: incident-response
---

**Focus:** Implement the permanent fix that addresses the root cause, not just the symptom. Write regression tests that would catch this failure mode. The mitigation bought time — now use it to do the job properly.

**Produces:** Code fix with regression tests, deployment plan, and documentation of how the fix differs from the temporary mitigation.

**Reads:** Root cause from investigation, mitigation log, relevant codebase and infrastructure configuration.

**Anti-patterns:**
- Shipping the mitigation as the permanent fix without addressing the root cause
- Writing a fix without a regression test that would have caught this incident
- Not considering whether the same class of bug exists elsewhere in the codebase
- Skipping the deployment plan because "it's just a small change"
- Leaving the temporary mitigation in place without a plan to remove it
