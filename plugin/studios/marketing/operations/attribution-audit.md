---
name: attribution-audit
type: scheduled
owner: agent
schedule: "0 9 1 * *"
runtime: node
---

**Purpose:** Verify tracking and attribution are working correctly. Bad attribution leads to bad decisions.

**Procedure:**
- Test all UTM parameters and tracking links
- Verify conversion pixels are firing on target pages
- Check that attribution model is producing sensible results
- Compare attributed conversions against actual transactions

**Signals:**
- Monthly audit cadence
- After any tracking code changes
- After any landing page redesign
