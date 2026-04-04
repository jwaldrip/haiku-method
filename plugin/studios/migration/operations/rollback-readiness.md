---
name: rollback-readiness
type: scheduled
owner: human
frequency: "daily"
---

**Purpose:** During active migration, verify rollback capability daily. The window for safe rollback narrows over time.

**Procedure:**
- [ ] Confirm source system is still operational and data-current
- [ ] Verify rollback scripts/procedures are tested
- [ ] Document new data written to target since last check
- [ ] Assess rollback complexity (point-of-no-return approaching?)
- [ ] Confirm all stakeholders know the rollback trigger criteria

**Signals:**
- Daily during active cutover period
- After any data sync issue
- When approaching point-of-no-return
