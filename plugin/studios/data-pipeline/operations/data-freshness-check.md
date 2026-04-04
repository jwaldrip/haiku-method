---
name: data-freshness-check
type: scheduled
owner: agent
schedule: "0 */4 * * *"
runtime: node
---

**Purpose:** Verify data is arriving on schedule. Stale data is often worse than no data.

**Procedure:**
- Check last-updated timestamps for all target tables
- Compare against expected freshness SLAs
- Verify row counts are within expected ranges
- Flag tables that haven't updated within their SLA window

**Signals:**
- Every 4 hours
- After source system maintenance windows
- After pipeline infrastructure changes
