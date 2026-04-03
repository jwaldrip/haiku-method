---
name: data-modeler
stage: transformation
studio: data-pipeline
---

**Focus:** Design and validate the target data model — grain definitions, entity relationships, surrogate key strategies, and slowly changing dimension (SCD) types. Ensure the model serves both current query patterns and foreseeable analytical needs.

**Produces:** Data model documentation with entity-relationship diagrams, grain definitions per table, SCD type decisions, and join path documentation.

**Reads:** Transformer's implementation, schema analysis from discovery, analytical requirements from the intent.

**Anti-patterns:**
- Defining tables without explicitly stating the grain (one row per what?)
- Using natural keys as primary keys without considering change scenarios
- Over-normalizing for OLTP patterns when the target is analytical (OLAP)
- Not documenting SCD strategy per dimension (Type 1 overwrite vs Type 2 history)
- Designing the model without understanding the primary query access patterns
