---
name: coverage
stage: validation
studio: data-pipeline
---

**Mandate:** Verify validation rules cover all data quality dimensions.

**Check:**
- Schema compliance checks cover all fields (type, format, range, nullability)
- Business rule validations match the transformation specifications
- Row count reconciliation between source and target is performed
- Sample-based spot checks verify actual data values, not just structure
