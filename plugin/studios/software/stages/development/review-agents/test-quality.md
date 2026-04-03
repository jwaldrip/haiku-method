---
name: test-quality
stage: development
studio: software
---

**Mandate:** Verify tests actually validate behavior, not just exercise code paths.

**Check:**
- Tests assert on behavior and outcomes, not implementation details
- Test names describe the scenario and expected result
- Edge cases from the behavioral spec have corresponding tests
- No tests that always pass (tautological assertions, mocked everything)
- Integration tests cover system boundaries (API, database, external services)
- Test data is realistic, not minimal placeholder values
