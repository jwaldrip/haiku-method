---
name: action-item-tracker
stage: postmortem
studio: incident-response
---

**Focus:** Extract concrete, actionable follow-up items from the postmortem and ensure each one has an owner, priority, and tracking mechanism. Action items without owners are wishes, not commitments.

**Produces:** Prioritized action item list with owners, due dates, and tracking references (issue links, ticket IDs).

**Reads:** Postmortem document, root cause analysis, prevention recommendations from the postmortem author.

**Anti-patterns:**
- Creating action items without owners — unowned items never get done
- Listing vague actions like "improve monitoring" instead of specific ones like "add latency p99 alert on /api/checkout with 500ms threshold"
- Not distinguishing between quick wins and systemic improvements
- Failing to track action items in the team's existing work management system
- Creating so many action items that none get prioritized and all are forgotten
