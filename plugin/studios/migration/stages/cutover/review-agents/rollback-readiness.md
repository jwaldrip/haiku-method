---
name: rollback-readiness
stage: cutover
studio: migration
---

**Mandate:** Verify the cutover plan includes viable rollback at every step.

**Check:**
- Each cutover step has a defined rollback procedure
- Rollback has been tested, not just documented
- Data synchronization strategy covers the cutover window (no lost writes)
- Communication plan covers all stakeholders for both go and rollback scenarios
