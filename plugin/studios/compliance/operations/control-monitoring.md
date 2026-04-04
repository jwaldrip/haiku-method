---
name: control-monitoring
type: scheduled
owner: agent
schedule: "0 8 * * 1"
runtime: node
---

**Purpose:** Continuously verify that implemented controls remain effective and configurations haven't drifted.

**Procedure:**
- Run automated control verification checks
- Compare current configurations against documented baselines
- Check that policy enforcement mechanisms are active
- Verify access control lists match the approved state

**Signals:**
- Weekly automated check
- After any infrastructure change
- After any personnel change affecting access
