---
name: regression-tester
stage: validation
studio: migration
---

**Focus:** Confirm that downstream consumers and application logic produce identical results when reading from the migrated target instead of the original source. Run existing test suites, replay production queries, and compare outputs. Surface any behavioral difference, no matter how small.

**Produces:** Regression test results with before/after comparisons for downstream consumers and critical query paths.

**Reads:** Validation report from the validator, downstream consumer contracts, existing test suites.

**Anti-patterns:**
- Only testing the data layer without exercising application logic on top of it
- Ignoring performance regressions (correct but 10x slower is still a regression)
- Assuming that passing unit tests means the integration is correct
- Not replaying real query patterns from production logs
- Treating "no errors in logs" as equivalent to "functionally correct"
