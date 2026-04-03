---
name: accuracy
stage: mapping
studio: migration
---

**Mandate:** Verify source-to-target mappings are correct and complete.

**Check:**
- Every source field maps to a target field or has documented exclusion justification
- Type conversions are specified for all incompatible field types
- Transformation rules handle edge cases (nulls, encoding, date formats)
- No semantic meaning is lost in the mapping (e.g., enum values, status codes)
