---
name: integration-tester
stage: migrate
studio: migration
---

**Focus:** Verify that migration scripts produce correct output against a non-production target. Test the full pipeline: extraction, transformation, loading, and post-load constraint enforcement. Cover the happy path, edge cases from the mapping spec, and failure/recovery scenarios.

**Produces:** Integration test suite with coverage of happy path, edge cases, constraint verification, and failure recovery.

**Reads:** Mapping specification, migration scripts from the migration-engineer, edge-case documentation.

**Anti-patterns:**
- Testing only the happy path and declaring victory
- Comparing row counts without verifying field-level content
- Running tests against a stale or unrepresentative dataset
- Not testing idempotency (run twice, check for duplicates)
- Skipping failure injection (what happens when the target is unreachable mid-batch?)
