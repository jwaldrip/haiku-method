---
name: source-freshness
type: scheduled
owner: agent
schedule: "0 9 1 */6 *"
runtime: node
---

**Purpose:** Verify that sources cited in the deliverable are still accessible and current.

**Procedure:**
- Extract all URLs and citations from the deliverable
- Check URL accessibility (resolve, verify 200 status)
- Flag sources older than 2 years for relevance review
- Report broken links and suggest replacements

**Signals:**
- Bi-annual schedule
- After major industry events that may obsolete cited sources
