---
name: false-positive-check
stage: enumeration
studio: security-assessment
---

**Mandate:** Verify vulnerability findings are real, not scanner noise.

**Check:**
- Each finding has been manually verified or has strong confidence indicators
- Version-based detections are confirmed against actual behavior, not just banners
- Scanner findings are correlated across tools to reduce false positives
- Severity ratings reflect exploitability in this specific environment
