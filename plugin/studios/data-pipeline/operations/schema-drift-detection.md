---
name: schema-drift-detection
type: reactive
owner: agent
trigger: "source schema change detected"
runtime: node
---

**Purpose:** Detect and alert on source schema changes before they break extraction or transformation.

**Procedure:**
- Compare current source schemas against documented baselines
- Identify added, removed, or modified columns
- Assess impact on downstream transformations
- Generate a change report with affected pipelines

**Signals:**
- Source system deployment or migration
- Extraction errors indicating schema mismatch
- New columns appearing in staging that aren't in the model
