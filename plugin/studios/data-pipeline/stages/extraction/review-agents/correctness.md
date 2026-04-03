---
name: correctness
stage: extraction
studio: data-pipeline
---

**Mandate:** Verify extraction logic faithfully captures source data without loss or corruption.

**Check:**
- All fields from the source schema are accounted for (extracted or explicitly excluded with justification)
- Incremental extraction handles late-arriving data and schema evolution
- Error handling covers connection failures, timeouts, and malformed records
- Extraction does not impose excessive load on source systems
