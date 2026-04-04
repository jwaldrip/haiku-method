---
name: correctness
stage: development
studio: software
---

**Mandate:** Verify the implementation correctly satisfies the behavioral specification and completion criteria.

**Check:**
- All acceptance criteria from the behavioral spec are implemented, not approximated
- Error handling covers the specified error states, not just the happy path
- Data validation matches the data contracts exactly (types, nullability, ranges)
- No logic errors, off-by-one mistakes, or silent failures
- Edge cases specified in the product stage are handled
