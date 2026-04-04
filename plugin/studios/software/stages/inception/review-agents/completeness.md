---
name: completeness
stage: inception
studio: software
---

**Mandate:** Verify the discovery document fully maps the problem space and that unit decomposition covers the intent with no gaps or overlaps.

**Check:**
- Every entity, relationship, and technical constraint from the intent is addressed in the discovery document
- All units have verifiable completion criteria (specific commands or tests, not vague assertions)
- Unit DAG is acyclic with no orphans — every unit either produces inputs for another or delivers a final output
- No unit is too large for a single bolt cycle
- No critical path is missing (e.g., auth, data migration, error handling)
