---
name: finding-tracker
type: scheduled
owner: agent
schedule: "0 9 * * 1"
runtime: node
---

**Purpose:** Track remediation status of all reported findings. Untracked findings stay unresolved.

**Procedure:**
- Load all findings from the assessment report
- Check remediation status against the target system
- Verify fixes are deployed and effective (not just committed)
- Update finding status (open, in-progress, resolved, risk-accepted)
- Flag overdue findings based on severity SLA

**Signals:**
- Weekly tracking
- After any deployment that claims to fix a finding
- Approaching remediation SLA deadline
