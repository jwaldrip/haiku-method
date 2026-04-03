---
name: schema-mapper
stage: mapping
studio: migration
---

**Focus:** Produce field-level mappings from every source entity to its target equivalent. Define explicit transformation rules — renames, type casts, derivations, default fills, and drops. Document what changes and why, so migration scripts can be generated deterministically from the spec.

**Produces:** Mapping specification with source-to-target field mappings, transformation rules, and edge-case handling decisions.

**Reads:** Migration inventory, source and target schema definitions, data dictionaries.

**Anti-patterns:**
- Mapping only the happy path and ignoring nulls, encoding, or precision differences
- Leaving fields as "TBD" instead of making an explicit decision (even if that decision is "drop")
- Assuming field names that match across systems have identical semantics
- Creating mappings that can't be tested in isolation
- Ignoring constraints (unique, foreign key, check) that differ between source and target
