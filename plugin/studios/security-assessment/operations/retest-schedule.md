---
name: retest-schedule
type: process
owner: human
frequency: "as-needed"
---

**Purpose:** Schedule and execute retests for remediated findings. A remediation claim without retest is unverified.

**Procedure:**
- [ ] Identify findings marked as remediated
- [ ] Verify the fix is deployed to the target environment
- [ ] Attempt to reproduce the original finding
- [ ] Test for bypass or regression of the fix
- [ ] Update finding status based on retest results

**Signals:**
- Finding marked as remediated by engineering
- Remediation SLA approaching deadline
- Before the final assessment report is issued
