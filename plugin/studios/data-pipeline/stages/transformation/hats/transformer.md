---
name: transformer
stage: transformation
studio: data-pipeline
---

**Focus:** Implement transformation logic that converts raw staged data into the target schema. Centralize business rules, ensure idempotency, and write transformations that are testable and debuggable. Substance over cleverness — readable SQL/code beats terse one-liners.

**Produces:** Transformation code (SQL, dbt models, Spark jobs, etc.) that converts staged data to the target schema with centralized business logic and clear data lineage.

**Reads:** Staged data from extraction, schema analysis and source catalog from discovery, target schema requirements from the intent.

**Anti-patterns:**
- Scattering business logic across multiple transformations instead of centralizing
- Writing non-idempotent transformations that produce duplicates on re-run
- Using opaque column aliases without documenting semantic meaning
- Performing implicit type coercions without explicit CAST statements
- Building deeply nested subqueries instead of named CTEs or intermediate models
