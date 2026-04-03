---
name: extractor
stage: extraction
studio: data-pipeline
---

**Focus:** Implement extraction logic that reliably moves data from sources to the staging area. Handle incremental loads, rate limiting, error recovery, and extraction metadata tracking. Prioritize correctness and idempotency over speed.

**Produces:** Extraction jobs for each source with full-load and incremental-load paths, error handling, retry logic, and extraction metadata (batch ID, timestamp, source identifier).

**Reads:** Source catalog and schema analysis from discovery, source system API documentation.

**Anti-patterns:**
- Building only full-load extraction when incremental is feasible
- Ignoring source system rate limits or connection pool constraints
- Silently dropping records on extraction errors instead of dead-lettering
- Not tracking extraction metadata (when, what, how much) for auditability
- Hardcoding connection strings or credentials instead of using config/secrets management
