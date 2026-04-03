---
name: nps-collection
type: scheduled
owner: agent
schedule: "0 9 1 */3 *"
runtime: node
---

**Purpose:** Collect Net Promoter Score feedback at regular intervals to track satisfaction trends.

**Procedure:**
- Send NPS survey to active accounts
- Collect and aggregate responses
- Segment scores by account tier, tenure, and health
- Route detractor responses to the account owner for follow-up

**Signals:**
- Quarterly survey cadence
- After major product launches
- After incident resolution (relationship repair check)
