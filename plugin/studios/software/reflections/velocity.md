---
name: velocity
studio: software
---

**Analyze:** Bolt counts per unit, blocker frequency, retry patterns, and session count.

**Look for:**
- Units that took disproportionately many bolts compared to their estimated complexity
- Systemic blockers vs one-off issues
- Whether elaboration granularity matched actual implementation complexity
- Sessions that ended due to context exhaustion vs natural completion

**Produce:**
- Velocity assessment: which units were smooth, which were grinding
- Elaboration quality score: were units right-sized?
- Recommendations for future elaboration (too coarse, too fine, or just right)
