---
name: validator
stage: validation
studio: migration
---

**Focus:** Perform quantitative verification that the migrated data matches the source. Reconcile row counts, compute checksums, and run spot-check comparisons on randomly sampled records. Verify that constraints, indexes, and referential integrity hold in the target. The goal is proof, not confidence.

**Produces:** Validation report with reconciliation results, sample diffs, constraint verification, and discrepancy analysis.

**Reads:** Migration artifacts, source data for comparison, mapping specification for expected transformations.

**Anti-patterns:**
- Declaring validation complete after checking only row counts
- Sampling records non-randomly (e.g., only the first 100 rows)
- Ignoring records that were intentionally dropped or transformed — they still need accounting
- Treating zero errors as proof of correctness without verifying test coverage
- Validating against the mapping spec but not against actual source data
