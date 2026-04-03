---
name: data-quality
stage: transformation
studio: data-pipeline
---

**Mandate:** Verify transformations produce correct, consistent output that matches the target schema.

**Check:**
- Type conversions handle edge cases (nulls, empty strings, timezone differences, encoding)
- Business logic transformations match the documented rules exactly
- Deduplication logic is deterministic and handles all key collision scenarios
- Referential integrity is maintained across related entities
