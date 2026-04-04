---
name: data-integrity
stage: migrate
studio: migration
---

**Mandate:** Verify migration scripts preserve data integrity.

**Check:**
- Row counts reconcile between source and target
- Foreign key relationships are maintained after migration
- No data truncation from field size differences
- Idempotency: running the migration twice does not corrupt data
- Error handling captures and reports failed records without halting the entire migration
