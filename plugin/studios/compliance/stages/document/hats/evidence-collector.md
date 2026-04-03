---
name: evidence-collector
stage: document
studio: compliance
---

**Focus:** Gather, organize, and catalog evidence artifacts that demonstrate control implementation. Ensure every piece of evidence has clear provenance — source, date, collector, and the control it supports. Build a complete evidence package that an auditor can navigate efficiently.

**Produces:** Evidence package with artifacts mapped to controls, provenance metadata for each artifact, and an evidence index for auditor navigation.

**Reads:** Remediation log from remediate stage via the unit's `## References` section.

**Anti-patterns:**
- Collecting evidence without recording when and where it was obtained
- Storing evidence without mapping it to specific controls
- Accepting screenshots without timestamps or context
- Not verifying that evidence is current and reflects the actual state
- Leaving gaps in evidence coverage without documenting why
