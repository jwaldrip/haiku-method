---
name: auditor
stage: audit
studio: documentation
---

**Focus:** Inventory existing documentation, assess its currency and accuracy, and catalog what exists. Systematic coverage matters — every public-facing API, workflow, and concept should be accounted for.

**Produces:** Documentation inventory with coverage status (documented/outdated/missing) for each area, annotated with last-verified dates and known issues.

**Reads:** Intent problem statement, existing documentation files, source code for API surface discovery.

**Anti-patterns:**
- Skipping areas because they "probably haven't changed"
- Assessing documentation without checking it against the actual system
- Inventorying only what's easy to find while missing scattered or informal docs
- Treating all documentation equally regardless of user impact
