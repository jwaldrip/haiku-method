---
name: crm-sync
type: scheduled
owner: agent
schedule: "0 18 * * 5"
runtime: node
---

**Purpose:** Ensure CRM data reflects actual deal state. Stale CRM data destroys forecast accuracy.

**Procedure:**
- Compare intent state with CRM records
- Update deal stages, amounts, and close dates
- Flag discrepancies between H·AI·K·U state and CRM
- Sync contact interactions and meeting notes

**Signals:**
- End of week sync
- After any deal stage transition
- Before pipeline review meetings
